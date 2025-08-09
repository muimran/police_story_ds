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

	const AMMO_STYLES = {
		t56:              { color: '#d7263d', label: 'Type 56',         offset: [0, -3.5] },
		lethal:           { color: '#f46a4e', label: 'Lethal',          offset: [0, -2.5] },
		rubber_cartridge: { color: '#0077b6', label: 'Rubber Cartridge',offset: [0, -1.5] },
		shotgun_shell:    { color: '#5e548e', label: 'Shotgun Shell',   offset: [0, -0.5] },
		tear_gas_grenade: { color: '#80b918', label: 'Tear Gas',        offset: [0, 0.5]  },
		baton_rounds:     { color: '#fca311', label: 'Baton Rounds',    offset: [0, 1.5]  },
		non_lethal:       { color: '#48cae4', label: 'Non-Lethal',      offset: [0, 2.5]  }
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
        if (!dateString || typeof dateString !== 'string') return '';
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const day = parts[0].padStart(2, '0');
            const month = parts[1].padStart(2, '0');
            let year = parts[2];
            if (year.length === 2) year = `20${year}`;
            return `${day}/${month}/${year}`;
        }
        return dateString;
    }

	function updateMap(stepIndex) {
		if (!chapters || !chapters[stepIndex]) return;
		const chapter = chapters[stepIndex];
		
		map.flyTo({ ...chapter.view, duration: 1200, essential: true });
        
        if (chapter.media_src && chapter.media_lnglat) {
            activeMediaSrc = chapter.media_src;
            activeMediaLngLat = chapter.media_lnglat;
        } else {
            activeMediaSrc = '';
            activeMediaLngLat = null;
        }

		const features = chapter.layers.map(layer => {
			const properties = {
                thana: layer.thana,
                highlight: layer.highlight || false 
            };
			Object.keys(AMMO_STYLES).forEach(ammoType => {
				properties[`${ammoType}_total`] = layer.totals[ammoType] || 0;
			});
            properties.has_data = Object.values(layer.totals).some(total => total > 0);
			return { type: 'Feature', geometry: { type: 'Point', coordinates: layer.coords }, properties };
		});
		const geojsonData = { type: 'FeatureCollection', features };
		
		const source = map.getSource('ammo_data_source');
		if (source) { source.setData(geojsonData); }
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

		const thanaCoords = amoData.reduce((acc, row) => {
			if (row.thana && !acc[row.thana]) { acc[row.thana] = { lat: +row.lat, lon: +row.lon }; }
			return acc;
		}, {});

        const allThanaNames = [...new Set(amoData.map(d => d.thana).filter(Boolean))];
        
		chapters = scrollyData.map(step => {
			const chapter = {
				sl: step.sl, textbox: step.textbox, view: { center: [+step.lon, +step.lat], zoom: +step.zoom },
                media_src: step.media_src, media_lnglat: (step.media_lng && step.media_lat) ? [+step.media_lng, +step.media_lat] : null,
				layers: []
			};

            let thanasToProcess;
            if (step.thana === "All") {
                thanasToProcess = allThanaNames;
            } else if (step.thana && step.thana !== "0") {
                thanasToProcess = step.thana.split(',').map(t => t.trim());
            } else {
                thanasToProcess = [];
            }

			const amoTypes = (step.amo_type && step.amo_type !== '0') ? step.amo_type.split(',').map(t => t.trim()) : [];
            const stepDateNormalized = normalizeDate(step.date);

			if (thanasToProcess.length > 0 && amoTypes.length > 0) {
                thanasToProcess.forEach(thanaName => {
					if (!thanaCoords[thanaName]) { return; }
					const layerData = { thana: thanaName, coords: [thanaCoords[thanaName].lon, thanaCoords[thanaName].lat], totals: {} };
					const filteredAmo = amoData.filter(d => d.thana === thanaName && normalizeDate(d.date) === stepDateNormalized);
					amoTypes.forEach(type => {
						layerData.totals[type] = filteredAmo.reduce((sum, row) => {
							let value = (type === 'rubber_cartridge') ? (Number(row.rubber_cartridge_1) || 0) + (Number(row.rubber_cartridge_2) || 0) : (Number(row[type]) || 0);
							return sum + value;
						}, 0);
					});
					chapter.layers.push(layerData);
				});
			} else if (thanasToProcess.length > 0) {
                thanasToProcess.forEach(thanaName => {
                    if (!thanaCoords[thanaName]) { return; }
                    chapter.layers.push({
                        thana: thanaName,
                        coords: [thanaCoords[thanaName].lon, thanaCoords[thanaName].lat],
                        totals: {}, 
                        highlight: true
                    });
                });
            }
			return chapter;
		});

		map = new mapboxgl.Map({ container: mapContainer, style: MAP_STYLE, center: [90.39159, 23.75466], zoom: 11, interactive: false });
		map.on('load', () => {
			map.addSource('ammo_data_source', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
			
            map.addLayer({
                id: 'thana-label',
                type: 'symbol',
                source: 'ammo_data_source',
                layout: {
                    'text-field': ['case', ['any', ['get', 'has_data'], ['get', 'highlight']], ['get', 'thana'], ''],
                    'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
                    'text-size': 14,
                    'text-offset': [0, -4.5],
                    'text-anchor': 'left',
                    'text-allow-overlap': true,
                },
                paint: {
                    'text-color': '#ffffff',
                    'text-halo-color': 'rgba(0, 0, 0, 0.9)',
                    'text-halo-width': 2
                }
            });

			Object.entries(AMMO_STYLES).forEach(([type, style]) => {
				map.addLayer({
					id: `ammo-circle-${type}`, type: 'circle', source: 'ammo_data_source',
					paint: {
						'circle-color': style.color,
						// --- THIS IS THE MODIFIED LINE FOR LARGER CIRCLES ---
						'circle-radius': ['interpolate',['linear'],['sqrt', ['get', `${type}_total`]],0,0,1,8,100,30,1000,75,10000,225],
						'circle-opacity': 0.7, 'circle-stroke-color': 'white', 'circle-stroke-width': 1,
						'circle-stroke-opacity': ['case', ['>', ['get', `${type}_total`], 0], 1, 0]
					}
				});

				map.addLayer({
					id: `ammo-label-${type}`, type: 'symbol', source: 'ammo_data_source',
					layout: {
						'text-field': [
							'case',
							['>', ['get', `${type}_total`], 0],
							['format', style.label, {}, ': ', {}, ['get', `${type}_total`], {}],
							''
						],
						'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
						'text-size': 12,
						'text-offset': style.offset,
						'text-anchor': 'left',
						'text-allow-overlap': true
					},
					paint: {
						'text-color': style.color,
						'text-halo-color': 'rgba(0, 0, 0, 0.85)',
						'text-halo-width': 1.5
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
			<div class="scrolly-step" data-index={i}>
				<div class="step-content">
					{@html chapter.textbox}
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