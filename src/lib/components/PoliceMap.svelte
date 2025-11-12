<script>
	import { onMount, onDestroy, tick } from 'svelte';
	import { base } from '$app/paths';
	import mapboxgl from 'mapbox-gl';
	import scrollama from 'scrollama';
	import { csvParse } from 'd3-dsv';
	import GifOverlay from './GifOverlay.svelte';
	import MapOverlay from './MapOverlay.svelte';
	import { slide } from 'svelte/transition';

	export let texts;
	export let locale;
	export let mapLanguage;
	export let mapAccessToken;

	mapboxgl.accessToken = mapAccessToken;

	const MAP_STYLE = 'mapbox://styles/imrandata/cme33sg5c00qn01sd0iz01lyy';

	let map;
	let mapContainer;
	let scroller;
	let chapters = [];
	let activeIndex = 0;
	let graphicContainer;
	let isVisible = false;
	let activeStarMarkers = new Map();
	let activeMediaSrc = '';
	let activeMediaLngLat = null;
	let tableVisible = true;
	let displayedLayerData = [];
	let isInitialLoad = true;
	let activeOverlayColor = 'transparent';

	let isMobilePopupOpen = false;
	let firstTableStepIndex = -1;

	// --- State for the final step expansion ---
	let isLastStepExpanded = false;

	let sortKey = 'total';
	let sortDirection = 'desc';

	// --- Reactive block to freeze background scrolling ---
	$: if (typeof document !== 'undefined') {
		if (isMobilePopupOpen) {
			document.body.classList.add('no-scroll');
		} else {
			document.body.classList.remove('no-scroll');
		}
	}

	$: activeAmmoTypesInStep = [...new Set(displayedLayerData.flatMap(layer => Object.keys(layer.totals).filter(type => layer.totals[type] > 0)))];

	$: sortedTableData = [...displayedLayerData]
		.map(layer => {
			const total = Object.values(layer.totals).reduce((sum, val) => sum + (val || 0), 0);
			return { ...layer, total };
		})
		.filter(layer => layer.total > 0)
		.sort((a, b) => {
			let valA, valB;
			if (sortKey === 'thana') {
				valA = texts.thanaNames[a.thana] || a.thana;
				valB = texts.thanaNames[b.thana] || b.thana;
			} else if (sortKey === 'total') {
				valA = a.total;
				valB = b.total;
			} else {
				valA = a.totals[sortKey] || 0;
				valB = b.totals[sortKey] || 0;
			}
			let comparison = 0;
			if (typeof valA === 'string') {
				comparison = valA.localeCompare(valB, locale || 'en-US');
			} else {
				comparison = valA - valB;
			}
			return sortDirection === 'asc' ? comparison : -comparison;
		});

	$: columnTotals = activeAmmoTypesInStep.reduce((acc, type) => { acc[type] = sortedTableData.reduce((sum, layer) => sum + (layer.totals[type] || 0), 0); return acc; }, {});
	$: grandTotal = Object.values(columnTotals).reduce((sum, val) => sum + val, 0);

	const AMMO_STYLES = { t56: { color: '#d7263d' }, lethal: { color: '#f46a4e' }, rubber_cartridge: { color: '#0077b6' }, shotgun_shell: { color: '#5e548e' }, tear_gas_grenade: { color: '#80b918' }, baton_rounds: { color: '#fca311' }, non_lethal: { color: '#48cae4' } };

	function handleSort(key) {
		if (sortKey === key) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortKey = key;
			sortDirection = key === 'thana' ? 'asc' : 'desc';
		}
	}

	function handleStepEnter(response) {
		activeIndex = response.index;
	}

	function handleStepProgress(response) {
		const fadeInEnd = 0.3;
		let opacity = 1;
		if (response.progress < fadeInEnd) { opacity = response.progress / fadeInEnd; }
		response.element.querySelector('.step-content').style.opacity = opacity;
	}

	function updateMap(stepIndex) {
		if (!chapters || !chapters[stepIndex] || !map.isStyleLoaded()) return;
		const chapter = chapters[stepIndex];
		activeOverlayColor = chapter.overlay_color || 'transparent';
		const viewOptions = { ...chapter.view };
		if (window.innerWidth <= 768) {
			viewOptions.zoom -= 1;
			viewOptions.center = [viewOptions.center[0] + 0.015, viewOptions.center[1] - 0.025];
		}
		map.flyTo({ ...viewOptions, duration: 1200, essential: true });
		const dhakaBoundaryLayerId = 'dhaka-boundary-layer';
		if (map.getLayer(dhakaBoundaryLayerId)) {
			if (chapter.sl == '1' || stepIndex === chapters.length - 1) {
				map.setLayoutProperty(dhakaBoundaryLayerId, 'visibility', 'visible');
			} else {
				map.setLayoutProperty(dhakaBoundaryLayerId, 'visibility', 'none');
			}
		}
		if (chapter.visual_cue && chapter.visual_cue.includes('Hasina')) { /* ... */ } else { activeMediaSrc = ''; activeMediaLngLat = null; }
		activeStarMarkers.forEach(marker => marker.remove());
		activeStarMarkers.clear();
		if (chapter.sl == '6') {
			chapter.layers.forEach(layer => {
				const el = document.createElement('div');
				el.className = 'star-marker';
				const marker = new mapboxgl.Marker({ element: el, anchor: 'center' }).setLngLat(layer.coords).addTo(map);
				activeStarMarkers.set(layer.thana, marker);
			});
		}
		const positionedLayers = addDynamicLabelPlacement(chapter.layers, map);
		const labelFeatures = positionedLayers.map(layer => ({
			type: 'Feature', geometry: { type: 'Point', coordinates: layer.coords },
			properties: {
				thana: layer.thana,
				highlight: layer.highlight || false,
				labelOffset: layer.placement ? layer.placement.offset : [0, 0],
				labelAnchor: layer.placement ? layer.placement.anchor : 'center',
				showLabel: layer.showLabel,
				has_data: Object.values(layer.totals).some(total => total > 0)
			}
		}));
		const labelSource = map.getSource('thana_labels_source');
		if (labelSource) { labelSource.setData({ type: 'FeatureCollection', features: labelFeatures }); }
		let circleFeatures = [];
		positionedLayers.forEach(layer => {
			Object.entries(layer.totals).forEach(([type, total]) => {
				if (total > 0) {
					circleFeatures.push({
						type: 'Feature', geometry: { type: 'Point', coordinates: layer.coords },
						properties: { ammo_type: type, total: total }
					});
				}
			});
		});
		circleFeatures.sort((a, b) => b.properties.total - a.properties.total);
		const circleSource = map.getSource('ammo_circles_source');
		if (circleSource) { circleSource.setData({ type: 'FeatureCollection', features: circleFeatures }); }
	}

	$: if (chapters.length > 0 && map?.isStyleLoaded()) {
		if (isInitialLoad) { /* Do nothing */ } else {
			tableVisible = false;
			setTimeout(() => {
				displayedLayerData = chapters[activeIndex].layers;
				sortKey = 'total';
				sortDirection = 'desc';
				tableVisible = true;
			}, 250);
			updateMap(activeIndex);
		}
	}

	let handleResize;
	function adjustLabelSizeForMobile() {
		if (!map || !map.isStyleLoaded() || !map.getLayer('thana-label')) return;
		const isMobile = window.innerWidth <= 768;
		const newSize = isMobile ? 9 : 12;
		map.setLayoutProperty('thana-label', 'text-size', newSize);
	}

	onMount(async () => {
		const observer = new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting; }, { rootMargin: "0px 0px -15% 0px", threshold: 0 });
		if (graphicContainer) { observer.observe(graphicContainer); }
		const [scrollyRes, amoRes, geojsonRes] = await Promise.all([ fetch(`${base}/scrolly.csv`), fetch(`${base}/amo_data.csv`), fetch(`${base}/images/dhaka.geojson`) ]);
		const scrollyText = await scrollyRes.text();
		const amoText = await amoRes.text();
		const dhakaGeojsonData = await geojsonRes.json();
		const cleanedScrollyText = scrollyText.replace(/^\uFEFF/, '');
		const scrollyData = csvParse(cleanedScrollyText);
		const amoData = csvParse(amoText);
		const thanaCoords = amoData.reduce((acc, row) => { if (row.thana && !acc[row.thana]) { acc[row.thana] = { lat: +row.lat, lon: +row.lon }; } return acc; }, {});
		const allThanaNames = [...new Set(amoData.map(d => d.thana).filter(Boolean))];
		chapters = scrollyData.map(step => {
			let position = (step.position || 'left').toLowerCase();
			if (position === 'centre') position = 'center';
			let overlayColor = step.overlay_color?.trim() ? `#${step.overlay_color.replace('#', '')}80` : null;
			const chapter = {
				sl: step.sl,
				textbox: texts.scrollyTextboxes[step.sl],
				displayDate: formatDateForRibbon(step.date),
				view: { center: [+step.lon, +step.lat], zoom: +step.zoom },
				visual_cue: step.visual_cue, position: position, overlay_color: overlayColor, layers: []
			};
			let thanasToProcess = (step.thana === "All") ? allThanaNames : (step.thana && step.thana !== "0" ? step.thana.split(',').map(t => t.trim()) : []);
			const amoTypes = (step.amo_type && step.amo_type !== '0') ? step.amo_type.split(',').map(t => t.trim()) : [];
			const stepDateNormalized = normalizeDate(step.date);
			if (thanasToProcess.length > 0 && amoTypes.length > 0) {
				thanasToProcess.forEach(thanaName => {
					if (!thanaCoords[thanaName]) return;
					const layerData = { thana: thanaName, coords: [thanaCoords[thanaName].lon, thanaCoords[thanaName].lat], totals: {} };
					const filteredAmo = amoData.filter(d => d.thana === thanaName && normalizeDate(d.date) === stepDateNormalized);
					amoTypes.forEach(type => { layerData.totals[type] = filteredAmo.reduce((sum, row) => sum + (Number(row[type]) || 0), 0); });
					chapter.layers.push(layerData);
				});
			} else if (thanasToProcess.length > 0) {
				thanasToProcess.forEach(thanaName => { if (!thanaCoords[thanaName]) return; chapter.layers.push({ thana: thanaName, coords: [thanaCoords[thanaName].lon, thanaCoords[thanaName].lat], totals: {}, highlight: true }); });
			}
			return chapter;
		});

		firstTableStepIndex = chapters.findIndex(ch => ch.layers.some(layer => Object.values(layer.totals).some(val => val > 0)));

		if (chapters.length > 0 && chapters[0].overlay_color) { activeOverlayColor = chapters[0].overlay_color; }
		map = new mapboxgl.Map({ container: mapContainer, style: MAP_STYLE, center: [90.38789, 23.7780453], zoom: 10, interactive: false });
		map.on('load', () => {
			map.setLanguage(mapLanguage);
			map.addSource('dhaka-boundary', { type: 'geojson', data: dhakaGeojsonData });
			map.addSource('thana_labels_source', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
			map.addSource('ammo_circles_source', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
			const isVisibleOnFirstLoad = chapters.length > 0 && chapters[0].sl === '1';
			map.addLayer({ id: 'thana-label', type: 'symbol', source: 'thana_labels_source', layout: { 'text-field': ['case', ['get', 'showLabel'], ['get', 'thana'], ''], 'text-font': ['Open Sans SemiBold', 'Arial Unicode MS Regular'], 'text-size': 12, 'text-offset': ['get', 'labelOffset'], 'text-anchor': ['get', 'labelAnchor'], 'text-allow-overlap': true, 'text-ignore-placement': true }, paint: { 'text-color': '#000000' } });
			map.addLayer({ id: 'ammo-circles', type: 'circle', source: 'ammo_circles_source', paint: { 'circle-color': ['match', ['get', 'ammo_type'], ...Object.entries(AMMO_STYLES).flatMap(([type, style]) => [type, style.color]), '#ccc'], 'circle-radius': ['interpolate', ['linear'], ['sqrt', ['get', 'total']], 0, 0, 1, 8, 100, 30, 1000, 75, 10000, 225], 'circle-opacity': 0.7, 'circle-stroke-color': 'white', 'circle-stroke-width': 1, 'circle-stroke-opacity': 1 } }, 'thana-label');
			map.addLayer({ id: 'dhaka-boundary-layer', type: 'line', source: 'dhaka-boundary', layout: { 'visibility': isVisibleOnFirstLoad ? 'visible' : 'none' }, paint: { 'line-color': '#d7263d', 'line-width': 2, 'line-opacity': 0.85 } }, 'ammo-circles');
			adjustLabelSizeForMobile();
			if (chapters.length > 0) {
				displayedLayerData = chapters[0].layers;
				isInitialLoad = false;
				updateMap(0);
			}
			map.on('moveend', () => { if (chapters[activeIndex]) { updateMap(activeIndex); } });
		});
		await tick();
		scroller = scrollama();
		handleResize = () => { if(scroller) scroller.resize(); adjustLabelSizeForMobile(); };
		scroller.setup({ step: '.scrolly-step', offset: 0.6, progress: true, debug: false }).onStepEnter(handleStepEnter).onStepProgress(handleStepProgress);
		window.addEventListener('resize', handleResize);
	});

	onDestroy(() => {
		activeStarMarkers.forEach(marker => marker.remove());
		if (map) map.remove();
		if (handleResize) { window.removeEventListener('resize', handleResize); }
		if (scroller) { scroller.destroy(); }
		if (typeof document !== 'undefined') {
			document.body.classList.remove('no-scroll');
		}
	});

	function getStepTotalForAmmoType(ammoType) { if (!chapters[activeIndex]?.layers) return 0; return chapters[activeIndex].layers.reduce((sum, layer) => sum + (layer.totals[ammoType] || 0), 0); }
	function formatNumber(num) { return num.toLocaleString(locale || 'en-US'); }
	function addDynamicLabelPlacement(layers, mapInstance) { if (!layers || layers.length === 0) return []; const FONT_SIZE = 12; const AVG_CHAR_WIDTH = FONT_SIZE * 0.6; const LABEL_HEIGHT = FONT_SIZE; const PADDING = 4; const potentialPlacements = [ { anchor: 'left', offset: [0.8, 0] }, { anchor: 'right', offset: [-0.8, 0] }, { anchor: 'bottom', offset: [0, -1.2] }, { anchor: 'top', offset: [0, 1.2] }, { anchor: 'bottom-left', offset: [0.7, -0.7] }, { anchor: 'top-left', offset: [0.7, 0.7] }, { anchor: 'bottom-right', offset: [-0.7, -0.7] }, { anchor: 'top-right', offset: [-0.7, 0.7] } ]; const placedLabelBounds = []; function doBboxesOverlap(box1, box2) { return !(box1.x2 < box2.x1 || box1.x1 > box2.x2 || box1.y2 < box2.y1 || box1.y1 > box2.y2); } function calculateLabelBbox(point, placement) { const labelWidth = (point.thana.length * AVG_CHAR_WIDTH) + PADDING * 2; const labelHeight = LABEL_HEIGHT + PADDING * 2; const offsetX = placement.offset[0] * FONT_SIZE; const offsetY = placement.offset[1] * FONT_SIZE; let x1 = point.screenCoords.x + offsetX; let y1 = point.screenCoords.y + offsetY; if (placement.anchor.includes('right')) { x1 -= labelWidth; } else if (!placement.anchor.includes('left')) { x1 -= labelWidth / 2; } if (placement.anchor.includes('bottom')) { y1 -= labelHeight; } else if (!placement.anchor.includes('top')) { y1 -= labelHeight / 2; } return { x1: x1, y1: y1, x2: x1 + labelWidth, y2: y1 + labelHeight }; } const points = layers.map(layer => { const total = Object.values(layer.totals).reduce((sum, val) => sum + (val || 0), 0); return { ...layer, total: total, screenCoords: mapInstance.project(layer.coords) }; }).sort((a, b) => b.total - a.total); return points.map(point => { let chosenPlacement = null; for (const placement of potentialPlacements) { const bbox = calculateLabelBbox(point, placement); const isColliding = placedLabelBounds.some(existingBbox => doBboxesOverlap(bbox, existingBbox)); if (!isColliding) { chosenPlacement = placement; placedLabelBounds.push(bbox); break; } } return { ...point, placement: chosenPlacement, showLabel: (!!chosenPlacement || point.highlight) && (point.total > 0 || point.highlight) }; }); }
	function normalizeDate(dateString) { if (!dateString || typeof dateString !== 'string') return ''; const parts = dateString.split('/'); if (parts.length === 3) { const day = parts[0].padStart(2, '0'); const month = parts[1].padStart(2, '0'); let year = parts[2]; if (year.length === 2) year = `20${year}`; return `${day}/${month}/${year}`; } return dateString; }
	function formatDateForRibbon(dateString) {
		if (!dateString || typeof dateString !== 'string') return '';
		const parts = dateString.split('/');
		if (parts.length === 3) {
			const monthNames = texts.uiText.monthNames;
			const day = parseInt(parts[0], 10);
			const monthIndex = parseInt(parts[1], 10) - 1;
			if (monthIndex >= 0 && monthIndex < 12) {
				const monthName = monthNames[monthIndex];
				const displayDay = day.toLocaleString(locale || 'en-US');
				return `${monthName} ${displayDay}`;
			}
		}
		return '';
	}
</script>

<svelte:head>
	<link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet" />
</svelte:head>

<div>
	<div class="scrolly-container">
		<div bind:this={graphicContainer} class="graphic-container">
			<div bind:this={mapContainer} id="map" />
			<div class="gradient-top"></div>
			<div class="gradient-bottom"></div>
			<MapOverlay color={activeOverlayColor} />
		</div>
		<GifOverlay map={map} isActive={!!activeMediaSrc} mediaSrc={activeMediaSrc} lngLat={activeMediaLngLat}/>
		<div class="scrolly-steps">
			{#each chapters as chapter, i}
				{@const hasTableData = i === activeIndex && chapter.layers.some(layer => Object.values(layer.totals).some(val => val > 0))}
				<div class="scrolly-step" data-index={i} class:is-center={chapter.position === 'center'} class:is-right={chapter.position === 'right'}>
					<div class="step-content" class:first-step={i === 0} class:last-step={i === chapters.length - 1} class:special-overlay={!!chapter.overlay_color}>
						{#if chapter.displayDate}
							<div class="step-header-ribbon"><span>{chapter.displayDate}</span></div>
						{/if}
						{@html chapter.textbox}
						{#if chapter.sl == 10}
							<img src="{base}/images/t56.png" alt="Type 56 Rifle" class="inline-t56-icon"/>
						{/if}

						{#if hasTableData}
							<div class="mobile-legend-summary">
								{#each activeAmmoTypesInStep as type}
									<div class="mobile-legend-item">
										<div>
											<span class="color-swatch" style="background-color: {AMMO_STYLES[type].color};"></span>
											<span>{texts.uiText.ammoLabels[type]}</span>
										</div>
										<span class="mobile-legend-total">{formatNumber(getStepTotalForAmmoType(type))}</span>
									</div>
								{/each}
							</div>
							
							<div class="detail-indicator-container" on:click={() => isMobilePopupOpen = true} role="button" tabindex="0">
								{#if i === firstTableStepIndex}
									<span class="see-detail-text">{texts.uiText.seeDetail || 'See Detail'}</span>
								{/if}
								<div class="dots-icon">
									<svg viewBox="0 0 100 20" fill="currentColor" width="24" height="6"><circle cx="10" cy="10" r="10"/><circle cx="50" cy="10" r="10"/><circle cx="90" cy="10" r="10"/></svg>
								</div>
							</div>
						{/if}
						
						{#if i === chapters.length - 1}
							<div class="expand-section">
								<button class="expand-toggle" on:click={() => isLastStepExpanded = !isLastStepExpanded} aria-label="Show additional notes">
									<svg class="expand-arrow" class:expanded={isLastStepExpanded} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
								</button>
								{#if isLastStepExpanded}
									<div class="expanded-content" transition:slide>
										<!-- ✅ FIX: Changed texts.policeMap.finalNote to texts.finalNote -->
										{#if texts.finalNote}
											{#each texts.finalNote as paragraph}
												<p>{paragraph}</p>
											{/each}
										{/if}
									</div>
								{/if}
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="legend-container legend-container-desktop" class:visible={isVisible}>
		{#if activeAmmoTypesInStep.length > 0}
			<div class="legend-table-wrapper" style="opacity: {tableVisible ? 1 : 0};">
				<table class="legend-table">
					<thead>
						<tr>
							<th class="thana-header sortable" on:click={() => handleSort('thana')}>
								{texts.uiText.thanaHeader}
								<span class="sort-arrow" class:active={sortKey === 'thana'} class:asc={sortDirection === 'asc'} class:desc={sortDirection === 'desc'}></span>
							</th>
							{#each activeAmmoTypesInStep as type}
								<th class="sortable" on:click={() => handleSort(type)}>
									<span class="color-swatch" style="background-color: {AMMO_STYLES[type].color};"></span>
									{texts.uiText.ammoLabels[type]}
									<span class="sort-arrow" class:active={sortKey === type} class:asc={sortDirection === 'asc'} class:desc={sortDirection === 'desc'}></span>
								</th>
							{/each}
							{#if activeAmmoTypesInStep.length > 1}
								<th class="sortable" on:click={() => handleSort('total')}>
									{texts.uiText.totalLabel}
									<span class="sort-arrow" class:active={sortKey === 'total'} class:asc={sortDirection === 'asc'} class:desc={sortDirection === 'desc'}></span>
								</th>
							{/if}
						</tr>
					</thead>
					<tbody>
						{#each sortedTableData as layer}
							<tr>
								<td>{texts.thanaNames[layer.thana] || layer.thana}</td>
								{#each activeAmmoTypesInStep as type}
									<td class="total-value">{formatNumber(layer.totals[type] || 0)}</td>
								{/each}
								{#if activeAmmoTypesInStep.length > 1}
									<td class="total-value total-row">{formatNumber(layer.total)}</td>
								{/if}
							</tr>
						{/each}
					</tbody>
					<tfoot>
						<tr>
							<td>{texts.uiText.totalLabel}</td>
							{#each activeAmmoTypesInStep as type}
								<td class="total-value">{formatNumber(columnTotals[type] || 0)}</td>
							{/each}
							{#if activeAmmoTypesInStep.length > 1}
								<td class="total-value total-row">{formatNumber(grandTotal)}</td>
							{/if}
						</tr>
					</tfoot>
				</table>
			</div>
		{/if}
	</div>

	{#if isMobilePopupOpen}
		<div class="mobile-popup-overlay" on:click={() => isMobilePopupOpen = false} role="dialog" aria-modal="true">
			<div class="mobile-popup-content" on:click|stopPropagation>
				{#if activeAmmoTypesInStep.length > 0}
					<div class="legend-table-wrapper">
						<table class="legend-table">
							<thead>
								<tr>
									<th class="thana-header sortable" on:click={() => handleSort('thana')}>
										{texts.uiText.thanaHeader}
										<span class="sort-arrow" class:active={sortKey === 'thana'} class:asc={sortDirection === 'asc'} class:desc={sortDirection === 'desc'}></span>
									</th>
									{#each activeAmmoTypesInStep as type}
										<th class="sortable" on:click={() => handleSort(type)}>
											<span class="color-swatch" style="background-color: {AMMO_STYLES[type].color};"></span>
											{texts.uiText.ammoLabels[type]}
											<span class="sort-arrow" class:active={sortKey === type} class:asc={sortDirection === 'asc'} class:desc={sortDirection === 'desc'}></span>
										</th>
									{/each}
									<th class="sortable total-col" on:click={() => handleSort('total')}>
										{texts.uiText.totalLabel}
										<span class="sort-arrow" class:active={sortKey === 'total'} class:asc={sortDirection === 'asc'} class:desc={sortDirection === 'desc'}></span>
									</th>
								</tr>
							</thead>
							<tbody>
								{#each sortedTableData as layer}
									<tr>
										<td>{texts.thanaNames[layer.thana] || layer.thana}</td>
										{#each activeAmmoTypesInStep as type}
											<td class="total-value">{formatNumber(layer.totals[type] || 0)}</td>
										{/each}
										<td class="total-value total-row">{formatNumber(layer.total)}</td>
									</tr>
								{/each}
							</tbody>
							<tfoot>
								<tr>
									<td>{texts.uiText.totalLabel}</td>
									{#each activeAmmoTypesInStep as type}
										<td class="total-value">{formatNumber(columnTotals[type] || 0)}</td>
									{/each}
									<td class="total-value total-row">{formatNumber(grandTotal)}</td>
								</tr>
							</tfoot>
						</table>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	/* --- ALL ORIGINAL STYLES --- */
	.scrolly-container { position: relative; }
	.graphic-container { position: sticky; top: 0; height: 100vh; width: 100%; z-index: 1; }
	#map { width: 100%; height: 100%; }
	.scrolly-steps { position: relative; z-index: 2; }
	.scrolly-step { min-height: 100vh; display: flex; align-items: center; justify-content: flex-start; padding-left: 5vw; padding-right: 5vw; }
	.scrolly-step.is-center { justify-content: center; }
	.scrolly-step.is-right { justify-content: flex-end; }
    .step-content { box-sizing: border-box; width: 100%; max-width: 360px; padding: 1.5rem; background: rgba(255, 255, 255, 0.9); color: #333; border-radius: 6px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0,0,0,0.1); border: 1px solid #e0e0e0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; font-size: 14px; transition: all 0.3s; }
    :global(.star-marker) { clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); background-color: #d7263d; width: 20px; height: 20px; cursor: pointer; }
    .step-content.first-step, .step-content.last-step, .step-content.special-overlay { background-color: #333; color: white; font-size: 16px; max-width: 450px; border-left: 4px solid #d7263d; }
	:global(.step-content.first-step a), :global(.step-content.last-step a), :global(.step-content.special-overlay a) { color: white !important; text-decoration: underline !important; }
    .first-step .mobile-legend-item, .last-step .mobile-legend-item, .special-overlay .mobile-legend-item { color: #f0f0f0; }
    .first-step .mobile-legend-total, .last-step .mobile-legend-total, .special-overlay .mobile-legend-total { background-color: #f0f0f0; color: #000; }
    .first-step .mobile-legend-summary, .last-step .mobile-legend-summary, .special-overlay .mobile-legend-summary { border-top-color: #555; }
    .inline-t56-icon { display: block; width: 100%; height: auto; margin-top: 1.5rem; }
    .step-header-ribbon { background-color: #333; color: white; text-align: center; padding: 5px 1.5rem; margin: -1.5rem -1.5rem 1.5rem -1.5rem; border-radius: 6px 6px 0 0; }
    .step-header-ribbon span { font-weight: 700; font-size: 12px; letter-spacing: 1.5px; font-family: 'Courier New', Courier, monospace; }
    .gradient-top, .gradient-bottom { position: absolute; left: 0; right: 0; z-index: 1; pointer-events: none; }
    .gradient-top { top: 0; height: 8%; background: linear-gradient(to bottom, white 0%, transparent 100%); }
    .gradient-bottom { bottom: 0; height: 8%; background: linear-gradient(to top, white 0%, transparent 100%); }
    .legend-container-desktop { position: fixed; bottom: 40px; right: 20px; left: auto; top: auto; transform: none; z-index: 5; width: auto; min-width: 320px; max-width: 500px; max-height: 63vh; display: flex; opacity: 0; pointer-events: none; transition: opacity 0.3s ease-in-out; }
    .legend-container-desktop.visible { opacity: 1; pointer-events: auto; }
	:root { --glass-bg: rgba(255, 255, 255, 0.2); --glass-blur: blur(10px); --glass-border-color: rgba(255, 255, 255, 0.25); --glass-separator-color: rgba(0, 0, 0, 0.15); --glass-text-color: #666; --glass-text-color-header: #333; }
    .legend-table-wrapper { width: 100%; overflow: auto; backdrop-filter: var(--glass-blur); border-radius: 8px; border: 1px solid var(--glass-border-color); transition: opacity 0.25s ease-in-out; }
    .legend-table { border-collapse: collapse; width: 100%; table-layout: auto; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    .legend-table th, .legend-table td { padding: 6px 10px; text-align: left; white-space: nowrap; background: var(--glass-bg); border: none; }
    .legend-table th { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; position: sticky; top: 0; z-index: 10; color: var(--glass-text-color-header); box-shadow: 0 1px 0 0 var(--glass-separator-color); }
	.legend-table tfoot { position: sticky; bottom: 0; z-index: 10; }
	.legend-table tfoot td { font-weight: 700; font-size: 12px; color: var(--glass-text-color-header); box-shadow: 0 -1px 0 0 var(--glass-separator-color); }
	.thana-header, .legend-table tbody td:first-child, .legend-table tfoot td:first-child { position: sticky; left: 0; z-index: 5; box-shadow: 1px 0 0 0 var(--glass-separator-color); }
	.legend-table th:first-child { z-index: 11; box-shadow: 1px 0 0 0 var(--glass-separator-color), 0 1px 0 0 var(--glass-separator-color); }
	.legend-table tfoot td:first-child { z-index: 11; box-shadow: 1px 0 0 0 var(--glass-separator-color), 0 -1px 0 0 var(--glass-separator-color); }
    .legend-table td { font-size: 11px; color: var(--glass-text-color); }
    .legend-table tbody td:first-child { font-weight: 500; }
    .legend-table tbody tr:nth-child(even) td { background-color: rgba(255, 255, 255, 0.05); }
    .legend-table tbody tr:hover td { background-color: rgba(255, 255, 255, 0.2); color: var(--glass-text-color-header); transition: background-color 0.15s ease-in-out; }
    .legend-table tbody tr:hover td.total-value { font-weight: 700; }
    .legend-table th:not(:first-child), .legend-table td.total-value { text-align: right; padding-right: 15px; }
	.legend-table td.total-value { font-family: 'Courier New', Courier, monospace; }
    .legend-table th.total-col, .legend-table td.total-row { box-shadow: -1px 0 0 0 var(--glass-separator-color); }
    .legend-table tfoot td:last-child { box-shadow: -1px 0 0 0 var(--glass-separator-color), 0 -1px 0 0 var(--glass-separator-color); }
    .legend-table th:last-child { box-shadow: -1px 0 0 0 var(--glass-separator-color), 0 1px 0 0 var(--glass-separator-color); }
	.sortable { cursor: pointer; user-select: none; transition: background-color 0.15s ease-in-out; }
    .sortable:hover { background-color: rgba(255, 255, 255, 0.15); }
	.sort-arrow { display: inline-block; width: 0; height: 0; margin-left: 6px; opacity: 0.4; vertical-align: middle; transition: opacity 0.2s; }
	.sort-arrow.active { opacity: 1; }
	.sort-arrow.asc { border-left: 4px solid transparent; border-right: 4px solid transparent; border-bottom: 4px solid currentColor; }
	.sort-arrow.desc { border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 4px solid currentColor; }
    .color-swatch { display: inline-block; width: 10px; height: 10px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.2); vertical-align: middle; margin-right: 6px; }
    .mobile-legend-summary { display: none; flex-direction: column; gap: 8px; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e0e0e0; }
    .mobile-legend-item { display: flex; align-items: center; justify-content: space-between; font-size: 12px; font-weight: 500; color: #555; }
    .mobile-legend-total { font-family: 'Courier New', Courier, monospace; font-weight: bold; color: #000; background-color: #f0f0f0; padding: 2px 6px; border-radius: 4px; font-size: 12px; }
    .detail-indicator-container { display: none; flex-direction: column; align-items: center; margin-top: 16px; padding-top: 12px; border-top: 1px solid #e0e0e0; cursor: pointer; }
    .see-detail-text { color: #0077b6; text-decoration: underline; font-weight: bold; font-size: 13px; margin-bottom: 4px; }
    .dots-icon { color: #888; }
    .mobile-popup-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(4px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 15px; box-sizing: border-box; }
    .mobile-popup-content { background: rgba(255, 255, 255, 0.9); border: 1px solid rgba(255, 255, 255, 0.3); backdrop-filter: blur(15px); border-radius: 16px; width: 100%; max-width: 500px; max-height: 85vh; position: relative; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); }
    .mobile-popup-content .legend-table-wrapper { flex-grow: 1; overflow-x: auto; background: transparent; backdrop-filter: none; border: none; padding: 0; position: relative; }
    .mobile-popup-content .legend-table-wrapper::after { content: ''; position: absolute; top: 0; right: 0; width: 25px; height: 100%; background: linear-gradient(to left, rgba(255,255,255,0.7), transparent); pointer-events: none; }
    .mobile-popup-content .legend-table th.total-col,
    .mobile-popup-content .legend-table td.total-row {
        display: none;
    }
	:global(body.no-scroll) {
        overflow: hidden;
    }
	.expand-section { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #ddd; }
    .special-overlay .expand-section { border-top-color: #555; }
    .expand-toggle { display: block; width: 100%; background: none; border: none; padding: 0; cursor: pointer; color: #888; text-align: center; }
    .special-overlay .expand-toggle { color: #aaa; }
    .expand-arrow { transition: transform 0.3s ease; }
    .expand-arrow.expanded { transform: rotate(180deg); }
    .expanded-content { margin-top: 0.75rem; overflow: hidden; }
    .expanded-content p { font-size: 12px; line-height: 1.6; color: #666; margin: 0 0 0.5rem 0; font-style: italic; }
    .special-overlay .expanded-content p { color: #ccc; }

    @media (max-width: 768px) {
        .legend-container-desktop { display: none; }
        .mobile-legend-summary { display: flex; }
        .scrolly-step, .scrolly-step.is-center, .scrolly-step.is-right { justify-content: center; }
        .scrolly-step { flex-direction: column; justify-content: center; min-height: 120vh; }
        :global(.star-marker) { width: 16px; height: 16px; }
        .step-content { font-size: 13px; max-width: 320px; padding: 1.2rem; }
        .step-content.first-step, .step-content.last-step, .step-content.special-overlay { font-size: 14px; }
        .step-header-ribbon { margin: -1.2rem -1.2rem 1.2rem -1.2rem; padding-left: 1.2rem; padding-right: 1.2rem; }
        .detail-indicator-container { display: flex; }
    }

    @media (min-width: 769px) {
        .mobile-popup-overlay { display: none; }
    }
</style>