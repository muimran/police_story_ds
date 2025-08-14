<script>
	import { onMount, tick } from 'svelte';
	import { csv } from 'd3-fetch';
	import { base } from '$app/paths';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let windowWidth;

	let officerData = [];
	let isLoading = true;
	let error = null;

	let isTouchDevice = false;
	let activeOfficerId = null;
	let chartContainer;

	let timeoutId;
	let tooltipWrapper;

	const TARGET_OFFICER_NAME = 'Mohammad Harun Or Rashid, BPM-Bar, PPM-Bar';

	// --- NEW: Function to preload all images ---
	// This will trigger the browser to download and cache the images
	// without actually displaying them on the page.
	function preloadImages() {
		if (!officerData || officerData.length === 0) return;

		officerData.forEach((officer) => {
			// Construct the URL exactly as you do in the tooltip
			const imageUrl = `${base}/images/absconded/${officer.id}.jpeg`;

			// Create a new Image object in memory. Setting its 'src'
			// is enough to make the browser start downloading it.
			const img = new Image();
			img.src = imageUrl;
		});
	}

	// Svelte Action for Intersection Observer.
	// This function runs when an element is created.
	// It triggers a callback when the element scrolls into view.
	function onView(node, callback) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						callback();
						// Stop observing once it has been triggered once
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.1 } // Trigger when 10% of the chart is visible
		);

		observer.observe(node);

		return {
			destroy() {
				// Cleanup when the component is destroyed
				observer.disconnect();
			}
		};
	}

	// --- MODIFIED: This function now handles all logic for when the chart becomes visible ---
	async function handleChartInView() {
		// 1. Start preloading all images as soon as the chart is visible.
		// This is the key change for instant image loading on hover.
		preloadImages();

		// 2. Continue with the existing logic to show the initial tooltip.
		const targetOfficer = officerData.find((o) => o.officer === TARGET_OFFICER_NAME);

		if (targetOfficer) {
			// Wait for the DOM just in case, though it should be ready
			await tick();
			showInitialTooltip(targetOfficer);
		}
	}

	const mobileBreakpoint = 768;

	let annoContainerX_desktop = 19;
	let annoContainerY_desktop = -8;
	let annoTextX_desktop = 26;
	let annoTextY_desktop = 0;
	let annoArrowX_desktop = -25;
	let annoArrowY_desktop = 25;
	let arrowPath_desktop = 'M 48 2 C 40 20, 20 35, 5 45';

	let annoContainerX_mobile = 23;
	let annoContainerY_mobile = -20;
	let annoTextX_mobile = 30;
	let annoTextY_mobile = 0;
	let annoArrowX_mobile = -20;
	let annoArrowY_mobile = 30;
	let arrowPath_mobile = 'M 45 5 C 30 15, 15 30, 2 42';

	let annoContainerX, annoContainerY, annoTextX, annoTextY, annoArrowX, annoArrowY, arrowPath;

	$: if (windowWidth) {
		if (windowWidth <= mobileBreakpoint) {
			annoContainerX = annoContainerX_mobile;
			annoContainerY = annoContainerY_mobile;
			annoTextX = annoTextX_mobile;
			annoTextY = annoTextY_mobile;
			annoArrowX = annoArrowX_mobile;
			annoArrowY = annoArrowY_mobile;
			arrowPath = arrowPath_mobile;
		} else {
			annoContainerX = annoContainerX_desktop;
			annoContainerY = annoContainerY_desktop;
			annoTextX = annoTextX_desktop;
			annoTextY = annoTextY_desktop;
			annoArrowX = annoArrowX_desktop;
			annoArrowY = annoArrowY_desktop;
			arrowPath = arrowPath_desktop;
		}
	}

	const rankColors = {
		'Additional Deputy Police Commissioner': '#4E79A7',
		'Additional Police Commissioner': '#fdba74',
		'Assistant Police Commissioner': '#4E79A7',
		'Deputy Police Commissioner': '#fdba74',
		'Joint Police Commissioner': '#fdba74',
		'Police Commissioner': '#fdba74'
	};

	function getStartOfWeek(date) {
		const d = new Date(date);
		const day = d.getDay();
		const diff = d.getDate() - day;
		const startOfWeek = new Date(d.setDate(diff));
		startOfWeek.setHours(0, 0, 0, 0);
		return startOfWeek;
	}

	function formatMonthYear(date) {
		const month = date.toLocaleString('default', { month: 'short' });
		if (date.getMonth() === 0) {
			return `${month} ${date.getFullYear()}`;
		}
		return month;
	}

	function formatFullDate(date) {
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function showTooltip(event, officer) {
		clearTimeout(timeoutId);
		tooltipWrapper.style.visibility = 'visible';
		const imageUrl = `${base}/images/absconded/${officer.id}.jpeg`;
		tooltipWrapper.innerHTML = `
			<div class="tooltip-card">
				<div class="tooltip-header">${officer.officer.toUpperCase()}</div>
				<div class="tooltip-body">
					Rank: ${officer.rank}<br>
					Date: ${formatFullDate(officer.dateObj)}
				</div>
			</div>
			<img src="${imageUrl}" class="tooltip-image" alt="Photo of ${officer.officer}" onerror="this.style.display='none'" onload="this.style.display='block'"/>
		`;
		updateTooltipPosition(event.pageX, event.pageY);
	}

	function hideTooltip() {
		timeoutId = setTimeout(() => {
			if (activeOfficerId === null) {
				tooltipWrapper.style.visibility = 'hidden';
			}
		}, 100);
	}

	onMount(() => {
		isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		tooltipWrapper = document.createElement('div');
		tooltipWrapper.className = 'tooltip-container';
		document.body.appendChild(tooltipWrapper);
		window.addEventListener('click', handleWindowClick);

		return () => {
			document.body.removeChild(tooltipWrapper);
			window.removeEventListener('click', handleWindowClick);
		};
	});

	function handleMouseOver(event, officer) {
		if (isTouchDevice) return;
		activeOfficerId = null;
		showTooltip(event, officer);
	}

	function handleMouseOut() {
		if (isTouchDevice) return;
		hideTooltip();
	}

	function handleDotClick(event, officer) {
		event.stopPropagation();
		if (activeOfficerId === officer.id) {
			activeOfficerId = null;
			tooltipWrapper.style.visibility = 'hidden';
		} else {
			activeOfficerId = officer.id;
			showTooltip(event, officer);
		}
	}

	function handleWindowClick(event) {
		if (activeOfficerId !== null && !event.target.closest('.dot')) {
			activeOfficerId = null;
			tooltipWrapper.style.visibility = 'hidden';
		}
	}

	function handleMouseMove(event) {
		if (isTouchDevice) return;
		updateTooltipPosition(event.pageX, event.pageY);
	}

	function updateTooltipPosition(pageX, pageY) {
		const offsetX = 15;
		const offsetY = 15;
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		tooltipWrapper.style.left = `${pageX + offsetX}px`;
		tooltipWrapper.style.top = `${pageY + offsetY}px`;
		const tooltipRect = tooltipWrapper.getBoundingClientRect();

		let finalX = pageX + offsetX;
		if (finalX + tooltipRect.width > windowWidth) {
			finalX = pageX - offsetX - tooltipRect.width;
		}
		if (finalX < 0) {
			finalX = 5;
		}
		tooltipWrapper.style.left = `${finalX}px`;

		let finalY;
		finalY = pageY + offsetY;
		if (finalY + tooltipRect.height > windowHeight) {
			finalY = pageY - offsetY - tooltipRect.height;
		}
		if (finalY < 0) {
			finalY = pageY + offsetY;
		}
		tooltipWrapper.style.top = `${finalY}px`;
	}

	function showInitialTooltip(officer) {
		if (!officer || !chartContainer) return;

		const dotElement = chartContainer.querySelector(`[data-officer-id='${officer.id}']`);
		if (!dotElement) return;

		activeOfficerId = officer.id;

		const rect = dotElement.getBoundingClientRect();
		const fakeEvent = {
			pageX: rect.left + rect.width / 2 + window.scrollX,
			pageY: rect.top + rect.height / 2 + window.scrollY
		};

		showTooltip(fakeEvent, officer);
	}

	onMount(async () => {
		try {
			const data = await csv(`${base}/absconded.csv`);
			const processed = data
				.map((d) => {
					const id = d.id?.trim();
					const officer = d.officers?.trim();
					const rank = d.rank?.trim();
					const date = d.date?.trim();
					if (!date || !id) return null;
					const dateObj = new Date(date);
					return { id, officer, rank, date, dateObj };
				})
				.filter((d) => d && d.officer && d.rank && !isNaN(d.dateObj.getTime()));
			officerData = processed;
		} catch (e) {
			error = 'Failed to load officer data.';
			console.error(e);
		} finally {
			isLoading = false;
		}
	});

	let processedData = [];
	let axisLabels = [];
	$: if (officerData.length > 0) {
		const sorted = [...officerData].sort((a, b) => a.dateObj - b.dateObj);
		const minDate = sorted[0].dateObj;
		const maxDate = sorted[sorted.length - 1].dateObj;

		const padding = 1;
		const displayMin = new Date(minDate);
		displayMin.setMonth(displayMin.getMonth() - padding);
		displayMin.setDate(1);

		const displayMax = new Date(maxDate);
		displayMax.setMonth(displayMax.getMonth() + padding);
		displayMax.setDate(1);

		const totalDur = displayMax - displayMin;

		const grouped = new Map();
		for (const d of sorted) {
			const wkStr = getStartOfWeek(d.dateObj).toISOString();
			if (!grouped.has(wkStr)) {
				grouped.set(wkStr, { weekStart: new Date(wkStr), officers: [] });
			}
			grouped.get(wkStr).officers.push(d);
		}

		processedData = Array.from(grouped.values())
			.map((g) => ({
				...g,
				positionPercent:
					totalDur > 0
						? ((g.weekStart - displayMin) / totalDur) * 100
						: 0
			}))
			.sort((a, b) => a.weekStart - b.weekStart);

		const labels = new Map();
		let cur = new Date(displayMin);
		while (cur < displayMax) {
			if (cur.getMonth() === 6 && cur.getFullYear() === 2024) {
				cur.setMonth(cur.getMonth() + 1);
				continue;
			}
			const pct = totalDur > 0 ? ((cur - displayMin) / totalDur) * 100 : 0;
			const txt = formatMonthYear(cur);
			labels.set(txt, { text: txt, positionPercent: pct });
			cur.setMonth(cur.getMonth() + 1);
		}
		axisLabels = Array.from(labels.values());
	}
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="timeline-container">
	<h2 class="chart-title">Timeline of Desertion</h2>
	<p class="chart-caption">
		Each dot represents an ex DMP official who has fled
		<span class="legend-item"
			><span class="legend-dot" style="background-color: #fdba74;"></span>Top-Ranked</span
		>
		<span class="legend-item"
			><span class="legend-dot" style="background-color: #4E79A7;"></span>Other Ranks</span
		>
	</p>

	{#if isLoading}
		<p>Loading timeline...</p>
	{:else if error}
		<p class="error">{error}</p>
	{:else if processedData.length}
		<!-- --- MODIFIED: The 'use:onView' action now calls our new combined function --- -->
		<div class="chart" bind:this={chartContainer} use:onView={handleChartInView}>
			{#each processedData as group (group.weekStart)}
				<div class="week-column" style="left: {group.positionPercent}%">
					{#each group.officers as officer, i (officer.id)}
						<div
							class="dot"
							class:selected={activeOfficerId === officer.id}
							data-officer-id={officer.id}
							style="background-color: {rankColors[officer.rank] || '#BAB0AC'}"
							on:mouseover={(e) => handleMouseOver(e, officer)}
							on:mouseout={handleMouseOut}
							on:mousemove={handleMouseMove}
							on:click={(e) => handleDotClick(e, officer)}
							transition:fly={{ y: -20, duration: 400, delay: 50 + i * 30, easing: quintOut }}
						></div>
					{/each}
				</div>
			{/each}

			<div class="annotation" style="left: {annoContainerX}%; top: {annoContainerY}px;">
				<div class="annotation-content">
					<div class="annotation-text" style="left: {annoTextX}px; top: {annoTextY}px;">
						Most top-ranked<br />officials fled on<br />August 6
					</div>
					<svg
						width="50"
						height="50"
						viewBox="0 0 50 50"
						class="annotation-arrow"
						style="left: {annoArrowX}px; top: {annoArrowY}px;"
					>
						<defs>
							<marker
								id="arrowhead"
								viewBox="0 0 10 10"
								refX="5"
								refY="5"
								markerWidth="6"
								markerHeight="6"
								orient="auto-start-reverse"
								fill="black"
							>
								<path d="M 0 0 L 10 5 L 0 10 z" />
							</marker>
						</defs>
						<path
							d={arrowPath}
							stroke="black"
							stroke-width="1.5"
							fill="none"
							marker-end="url(#arrowhead)"
						/>
					</svg>
				</div>
			</div>
		</div>
		<div class="axis">
			<div class="axis-line"></div>
			{#each axisLabels as label (label.text)}
				<div class="axis-label" style="left: {label.positionPercent}%">
					<div class="axis-tick"></div>
					<span class="axis-text">{label.text}</span>
				</div>
			{/each}
		</div>
	{:else}
		<p>No data available to display.</p>
	{/if}

	<p class="chart-footnote">
		Since October, 13 ex-DMP officers deserted their posts—11 of them ADCs
	</p>
</div>

<style>
	:global(.tooltip-container) {
		position: absolute;
		visibility: hidden;
		z-index: 1000;
		pointer-events: none;
		display: flex;
		align-items: center;
		gap: 12px;
	}

	:global(.tooltip-card) {
		font-size: 0.9rem;
		white-space: nowrap;
		background-color: #fff;
		border-radius: 6px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
		overflow: hidden;
		border: 1px solid #e2e8f0;
		color: #333;
	}

	:global(.tooltip-header) {
		background-color: #2d3748;
		color: #fff;
		padding: 5px 12px;
		font-weight: bold;
		text-align: center;
		font-size: 0.8rem;
	}

	:global(.tooltip-body) {
		padding: 8px 12px;
	}

	:global(.tooltip-image) {
		width: 70px;
		height: 70px;
		border-radius: 50%;
		object-fit: cover;
		border: 3px solid white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
		background-color: #f0f0f0;
		display: none;
	}

	.timeline-container {
		width: 100%;
		margin: 2rem auto;
		padding: 0 20px;
		box-sizing: border-box;
		font-family: 'Georgia', serif;
	}

	.chart {
		position: relative;
		height: 250px;
		margin-bottom: 10px;
	}

	.chart-title {
		text-align: center;
		font-size: 1.6rem;
		font-weight: 500;
		color: #2d3748;
		margin-bottom: 0.5rem;
	}

	.chart-caption {
		text-align: center;
		font-size: 0.95rem;
		color: #4a5568;
		margin-bottom: 3rem;
		line-height: 1.5;
	}

	.chart-footnote {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		margin-top: 20px;
		padding-left: 12px;
		font-size: 12px;
		line-height: 1.4;
		color: #555;
		font-style: italic;
		text-align: left;
	}

	.legend-item {
		display: inline-flex;
		align-items: center;
		margin: 0 10px;
		white-space: nowrap;
	}

	.legend-dot {
		display: inline-block;
		width: 11px;
		height: 11px;
		border-radius: 50%;
		margin-right: 6px;
		border: 1px solid rgba(0, 0, 0, 0.2);
	}

	.annotation {
		position: absolute;
		z-index: 5;
		pointer-events: none;
		display: flex;
		align-items: flex-start;
	}

	.annotation-content {
		position: relative;
		text-align: left;
		width: 150px;
		height: 100px;
	}

	.annotation-text {
		position: absolute;
		font-family: 'Georgia', serif;
		font-size: 0.85rem;
		line-height: 1.4;
		color: #333;
		white-space: nowrap;
		font-weight: normal;
		font-style: italic;
	}

	.annotation-arrow {
		position: absolute;
	}

	.week-column {
		position: absolute;
		bottom: 6px;
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		transform: translateX(-50%);
		min-width: 12px;
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		margin-top: 4px;
		border: 1px solid rgba(0, 0, 0, 0.2);
		cursor: pointer;
		transition: all 0.2s;
	}

	.dot:hover,
	.dot.selected {
		transform: scale(1.4);
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
		z-index: 10;
	}

	.axis {
		position: relative;
		height: 30px;
	}

	.axis-line {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: #ccc;
	}

	.axis-label {
		position: absolute;
		transform: translateX(-50%);
		text-align: center;
		min-width: 60px;
		color: #555;
	}

	.axis-tick {
		width: 1px;
		height: 6px;
		background: #ccc;
		margin: 0 auto 4px;
	}

	.axis-text {
		font-size: 0.8rem;
		white-space: nowrap;
	}

	.error {
		color: #f44336;
		font-weight: bold;
	}

	@media (max-width: 768px) {
		.chart {
			height: 200px;
		}
		.dot {
			width: 10px;
			height: 10px;
			margin-top: 3px;
		}
		.timeline-container {
			padding: 0 10px;
		}
		.axis-text {
			font-size: 0.75rem;
		}
		.chart-title {
			font-size: 1.2rem;
		}

		.chart-caption {
			font-size: 0.8rem;
		}
		
		.annotation-text {
			font-size: 0.8rem;
			white-space: normal;
		}

		.chart-footnote {
			font-size: 11px;
			padding-left: 6px;
		}

		:global(.tooltip-container) {
			flex-direction: column-reverse;
			align-items: center;
			gap: 8px;
		}
		
		:global(.tooltip-card) {
			max-width: 220px;
			white-space: normal;
			text-align: center;
			box-sizing: border-box;
		}

		:global(.tooltip-header) {
			font-size: 0.75rem;
			padding: 4px 10px;
		}

		:global(.tooltip-body) {
			font-size: 0.8rem;
			padding: 6px 10px;
		}
	}
</style>