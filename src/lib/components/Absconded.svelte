<script>
	import { onMount } from 'svelte';
	import { csv } from 'd3-fetch';
	import { base } from '$app/paths';

	// --- 1. STATE ---
	let officerData = [];
	let isLoading = true;
	let error = null;

	// --- NEW STATE for TOUCH/TAP ---
	let isTouchDevice = false;
	let activeOfficerId = null;
	let chartContainer; // To bind to the chart div for outside click detection

	// --- Tooltip State ---
	let timeoutId;
	let tooltipWrapper;

	// --- 2. CONFIGURATION & HELPERS ---
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

	// --- REUSABLE TOOLTIP LOGIC ---
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
				// Only hide if not actively tapped
				tooltipWrapper.style.visibility = 'hidden';
			}
		}, 100);
	}

	// --- Tooltip Handlers for DESKTOP (HOVER) and MOBILE (TAP) ---
	onMount(() => {
		// Detect if it's a touch device
		isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

		tooltipWrapper = document.createElement('div');
		tooltipWrapper.className = 'tooltip-container';
		document.body.appendChild(tooltipWrapper);

		// Add a listener to close the tooltip if a tap happens outside
		if (isTouchDevice) {
			window.addEventListener('click', handleWindowClick);
		}

		return () => {
			document.body.removeChild(tooltipWrapper);
			if (isTouchDevice) {
				window.removeEventListener('click', handleWindowClick);
			}
		};
	});

	// For desktop hover
	function handleMouseOver(event, officer) {
		if (isTouchDevice) return; // Do nothing on touch devices
		showTooltip(event, officer);
	}

	// For desktop hover
	function handleMouseOut() {
		if (isTouchDevice) return; // Do nothing on touch devices
		hideTooltip();
	}

	// For mobile tap
	function handleDotClick(event, officer) {
		if (!isTouchDevice) return; // Do nothing on non-touch devices
		event.stopPropagation(); // Prevent the window click handler from firing immediately

		if (activeOfficerId === officer.id) {
			// If tapping the same dot, hide it
			activeOfficerId = null;
			tooltipWrapper.style.visibility = 'hidden';
		} else {
			// If tapping a new dot, show it
			activeOfficerId = officer.id;
			showTooltip(event, officer);
		}
	}

	// For closing the tooltip by tapping outside on mobile
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
		tooltipWrapper.style.left = `${pageX + offsetX}px`;
		tooltipWrapper.style.top = `${pageY + offsetY}px`;

		const tooltipRect = tooltipWrapper.getBoundingClientRect();
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		if (pageX + offsetX + tooltipRect.width > windowWidth) {
			tooltipWrapper.style.left = `${pageX - offsetX - tooltipRect.width}px`;
		}
		if (pageY + offsetY + tooltipRect.height > windowHeight) {
			tooltipWrapper.style.top = `${pageY - offsetY - tooltipRect.height}px`;
		}
	}

	// --- 3. DATA FETCHING & PROCESSING ---
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
			console.error('Error loading CSV:', e);
		} finally {
			isLoading = false;
		}
	});

	// --- 4. REACTIVE DATA TRANSFORMATION ---
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

<div class="timeline-container">
	<!-- Title and Caption -->
	<h2 class="chart-title">A Timeline of Fleeing Officials</h2>
	<p class="chart-caption">
		Each dot represents an official who has fled.
		<span class="legend-item"><span class="legend-dot" style="background-color: #fdba74;"></span
			>Top-Ranked</span>
		<span class="legend-item"><span class="legend-dot" style="background-color: #4E79A7;"></span
			>Other Ranks</span>
	</p>

	{#if isLoading}
		<p>Loading timeline...</p>
	{:else if error}
		<p class="error">{error}</p>
	{:else if processedData.length}
		<!-- bind the chart div to our variable -->
		<div class="chart" bind:this={chartContainer}>
			{#each processedData as group}
				<div class="week-column" style="left: {group.positionPercent}%">
					{#each group.officers as officer}
						<div
							class="dot"
							style="background-color: {rankColors[officer.rank] || '#BAB0AC'}"
							on:mouseover={(e) => handleMouseOver(e, officer)}
							on:mouseout={handleMouseOut}
							on:mousemove={handleMouseMove}
							on:click={(e) => handleDotClick(e, officer)}
						></div>
					{/each}
				</div>
			{/each}

			<!-- MODIFIED ANNOTATION -->
			<div class="annotation" style="left: 27%; top: -10px;">
				<div class="annotation-content">
					<div class="annotation-text" style="padding-left: 10px;">
						Most top-ranked<br />officials fled on<br />August 6
					</div>
					<svg width="50" height="50" viewBox="0 0 50 50" class="annotation-arrow">
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
							d="M 48 2 C 40 20, 20 35, 5 45"
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
			{#each axisLabels as label}
				<div class="axis-label" style="left: {label.positionPercent}%">
					<div class="axis-tick"></div>
					<span class="axis-text">{label.text}</span>
				</div>
			{/each}
		</div>
	{:else}
		<p>No data available to display.</p>
	{/if}
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
		transition: padding 0.3s ease;
		font-family: 'Georgia', serif;
	}

	.chart {
		position: relative;
		height: 250px;
		margin-bottom: 10px;
		transition: height 0.3s ease;
	}

	/* --- Title, Caption, Annotations Styles --- */
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
		/* MODIFIED: Changed alignment */
		text-align: left;
	}

	.annotation-text {
		font-family: 'Georgia', serif;
		font-size: 0.85rem;
		line-height: 1.4;
		color: #333;
	}

	.annotation-arrow {
		position: absolute;
		top: 25px;
		/* MODIFIED: Positioned from the left */
		left: -25px;
	}
	/* --- END NEW STYLES --- */

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

	.dot:hover {
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
		transition: font-size 0.3s ease;
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
		.chart-caption,
		.annotation-text {
			font-size: 0.8rem;
		}
	}
</style>