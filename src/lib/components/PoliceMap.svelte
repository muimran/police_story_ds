<script>
	import { onMount, onDestroy, tick } from 'svelte';
	import { base } from '$app/paths';
	import mapboxgl from 'mapbox-gl';
	import scrollama from 'scrollama';
	import { csvParse } from 'd3-dsv';
	import GifOverlay from './GifOverlay.svelte';

	mapboxgl.accessToken = 'pk.eyJ1IjoiaW1yYW5kYXRhIiwiYSI6ImNtMDRlaHh1YTA1aDEybHI1ZW12OGh4cDcifQ.fHLLFYQx7JKPUp2Sl1jtYg';
	const MAP_STYLE = 'mapbox://styles/imrandata/cme33sg5c00qn01sd0iz01lyy';

	let map;
	let mapContainer;
	let scroller;
	let chapters = [];
	let activeIndex = 0;
    
    let activeMediaSrc = '';
    let activeMediaLngLat = null;

	const AMMO_COLORS = {
		t56: '#d7263d', lethal: '#f46a4e', rubber_cartridge: '#0077b6',
		tear_gas_grenade: '#80b918', baton_rounds: '#fca311', shotgun_shell: '#5e548e',
		non_lethal: '#48cae4'
	};
	
	$: if (map && map.isStyleLoaded()) { updateMap(activeIndex); }
	
	function handleStepEnter(response) { activeIndex = response.index; }

    function handleStepProgress(response) {
        const fadeInEnd = 0.3;
        const fadeOutStart = 0.7;
        let opacity = 1;
        if (response.progress < fadeInEnd) { opacity = response.progress / fadeInEnd; } 
        else if (response.progress > fadeOutStart) { opacity = 1 - (response.progress - fadeOutStart) / (1 - fadeOutStart); }
        response.element.querySelector('.step-content').style.opacity = opacity;
    }

    function normalizeDate(dateString) {
        if (!dateString) return '';
        const parts = dateString.split('/');
        if (parts.length === 3 && parts[2].length === 2) { return `${parts[0]}/${parts[1]}/20${parts[2]}`; }
        return dateString;
    }

	function updateMap(stepIndex) {
		if (!chapters || !chapters[stepIndex]) return;
		const chapter = chapters[stepIndex];
		console.group(`--- Updating Map for Step ${chapter.sl} (Index: ${stepIndex}) ---`);
		
		map.flyTo({ ...chapter.view, duration: 1200, essential: true });
        
        if (chapter.media_src && chapter.media_lnglat) {
            activeMediaSrc = chapter.media_src;
            activeMediaLngLat = chapter.media_lnglat;
        } else {
            activeMediaSrc = '';
            activeMediaLngLat = null;
        }

		const features = chapter.layers.map(layer => {
			const properties = {};
			Object.keys(AMMO_COLORS).forEach(ammoType => {
				properties[`${ammoType}_total`] = layer.totals[ammoType] || 0;
			});
			return { type: 'Feature', geometry: { type: 'Point', coordinates: layer.coords }, properties };
		});
		const geojsonData = { type: 'FeatureCollection', features };
		
		console.log('Final GeoJSON for map source:', geojsonData);
        
		const source = map.getSource('ammo_circles_source');
		if (source) { source.setData(geojsonData); }
        console.groupEnd();
	}
	
	onMount(async () => {
		const [scrollyRes, amoRes] = await Promise.all([ fetch(`${base}/scrolly.csv`), fetch(`${base}/amo_data.csv`) ]);
		const scrollyText = await scrollyRes.text();
		const amoText = await amoRes.text();
		const amoLines = amoText.split('\n');
		const amoHeader = amoLines[0].replace('rubber_cartridge', 'rubber_cartridge_1').replace('rubber_cartridge', 'rubber_cartridge_2');
		const correctedAmoText = [amoHeader, ...amoLines.slice(1)].join('\n');
		const scrollyData = csvParse(scrollyText);
		const amoData = csvParse(correctedAmoText);

        console.log(`Loaded ${scrollyData.length} steps from scrolly.csv`);
        console.log(`Loaded ${amoData.length} records from amo_data.csv`);

		const thanaCoords = amoData.reduce((acc, row) => {
			if (row.thana && !acc[row.thana]) { acc[row.thana] = { lat: +row.lat, lon: +row.lon }; }
			return acc;
		}, {});
        
		chapters = scrollyData.map(step => {
            console.groupCollapsed(`Processing Step ${step.sl}`);
            console.log('Raw step data:', step);

			const chapter = {
				sl: step.sl, textbox: step.textbox, view: { center: [+step.lon, +step.lat], zoom: +step.zoom },
                media_src: step.media_src, media_lnglat: (step.media_lng && step.media_lat) ? [+step.media_lng, +step.media_lat] : null,
				layers: []
			};
			const thanas = (step.thana && step.thana !== "0") ? step.thana.split(',').map(t => t.trim()) : [];
			const amoTypes = (step.amo_type) ? step.amo_type.split(',').map(t => t.trim()) : [];
            
            console.log(`Thanas to process:`, thanas);
            console.log(`Ammo types to process:`, amoTypes);
            console.log(`Date to filter by:`, step.date);

			if (thanas.length > 0 && amoTypes.length > 0) {
				thanas.forEach(thanaName => {
					if (!thanaCoords[thanaName]) {
                        console.warn(`Could not find coordinates for thana: "${thanaName}"`);
                        return;
                    }
					const layerData = { thana: thanaName, coords: [thanaCoords[thanaName].lon, thanaCoords[thanaName].lat], totals: {} };
					const filteredAmo = amoData.filter(d => d.thana === thanaName && normalizeDate(d.date) === step.date);
                    
                    console.log(`For thana "${thanaName}" on date "${step.date}", found ${filteredAmo.length} matching records in amo_data.csv.`);
                    if (filteredAmo.length > 0) {
                        console.table(filteredAmo);
                    }

					amoTypes.forEach(type => {
						layerData.totals[type] = filteredAmo.reduce((sum, row) => {
							let value = (type === 'rubber_cartridge') ? (Number(row.rubber_cartridge_1) || 0) + (Number(row.rubber_cartridge_2) || 0) : (Number(row[type]) || 0);
							return sum + value;
						}, 0);
                        console.log(`  - Calculated Total for "${type}":`, layerData.totals[type]);
					});
					chapter.layers.push(layerData);
				});
			}
            console.groupEnd();
			return chapter;
		});

		map = new mapboxgl.Map({ container: mapContainer, style: MAP_STYLE, center: [90.39159, 23.75466], zoom: 11, interactive: false });
		map.on('load', () => {
			map.addSource('ammo_circles_source', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
			Object.keys(AMMO_COLORS).forEach(type => {
				map.addLayer({
					id: `ammo-circle-${type}`, type: 'circle', source: 'ammo_circles_source',
					paint: {
						'circle-color': AMMO_COLORS[type],
						'circle-radius': ['interpolate',['linear'],['sqrt', ['get', `${type}_total`]],0,0,1,5,100,20,1000,50,10000,150],
						'circle-opacity': 0.7, 'circle-stroke-color': 'white', 'circle-stroke-width': 1,
						'circle-stroke-opacity': ['case', ['>', ['get', `${type}_total`], 0], 1, 0]
					}
				});
			});
			updateMap(0);
		});
		await tick();
		scroller = scrollama();
		scroller.setup({
			step: '.scrolly-step', 
			offset: 0.6, 
			progress: true, 
			debug: false
		})
		.onStepEnter(handleStepEnter)
		.onStepProgress(handleStepProgress);
		
		window.addEventListener('resize', scroller.resize);
	});
	
	onDestroy(() => {
		if (map) map.remove();
		if (scroller) {
			window.removeEventListener('resize', scroller.resize);
			scroller.destroy();
		}
	});
</script>

<svelte:head>
	<link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet" />
</svelte:head>

<div class="scrolly-container">
	<div class="graphic-container">
        <div class="gradient-top"></div>
        <div class="gradient-bottom"></div>
		<div bind:this={mapContainer} id="map" />
	</div>
    <GifOverlay map={map} isActive={!!activeMediaSrc} mediaSrc={activeMediaSrc} lngLat={activeMediaLngLat}/>
	<div class="scrolly-steps">
		{#each chapters as chapter, i}
			<div class="scrolly-step">
				<div class="step-content">
					<p>{chapter.textbox}</p>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.scrolly-container { position: relative; }
	.graphic-container { position: sticky; top: 0; height: 100vh; width: 100%; z-index: 1; }
	#map { width: 100%; height: 100%; }
	.scrolly-steps { position: relative; z-index: 2; max-width: 500px; margin-left: 5%; }
	.scrolly-step { min-height: 80vh; display: flex; align-items: center; }
	.step-content { width: 100%; padding: 2rem; background: rgba(20, 20, 20, 0.85); color: #f0f0f0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5); }
    .gradient-top, .gradient-bottom { position: absolute; left: 0; right: 0; z-index: 10; pointer-events: none; }
    .gradient-top { top: 0; height: 15%; background: linear-gradient(to bottom, white 0%, transparent 100%); }
    .gradient-bottom { bottom: 0; height: 15%; background: linear-gradient(to top, white 0%, transparent 100%); }
</style>