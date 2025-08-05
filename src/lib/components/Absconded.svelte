<script>
	import { onMount } from 'svelte';
	import { csv } from 'd3-fetch';
	import { base } from '$app/paths';

	// --- 1. STATE ---
	let officerData = [];
	let isLoading = true;
	let error = null;

	// --- Tooltip State ---
	let timeoutId;

	// --- 2. CONFIGURATION & HELPERS ---
	const rankColors = {
		'Additional Deputy Police Commissioner': '#4E79A7', // Blue
		'Additional Police Commissioner': '#BAB0AC',       // Gray
		'Assistant Police Commissioner': '#4E79A7',        // Blue
		'Deputy Police Commissioner': '#4E79A7',           // Blue
		'Joint Police Commissioner': '#BAB0AC',            // Gray
		'Police Commissioner': '#BAB0AC'                   // Gray
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
		if (date.getMonth() === 0 || axisLabels.length === 0) {
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

	// --- Tooltip Handlers ---
	let tooltip;
	onMount(() => {
		tooltip = document.createElement('div');
		tooltip.className = 'tooltip';
		document.body.appendChild(tooltip);
	});

	function handleMouseOver(event, officer) {
		clearTimeout(timeoutId);
		console.log('mouseover:', officer.officer, officer.rank, officer.date);
		tooltip.style.visibility = 'visible';
		tooltip.innerHTML = `<strong>${officer.officer}</strong><br>Rank: ${officer.rank}<br>Date: ${formatFullDate(officer.dateObj)}`;
		updateTooltipPosition(event.pageX, event.pageY);
	}

	function handleMouseMove(event) {
		console.log('mousemove at', event.pageX, event.pageY);
		updateTooltipPosition(event.pageX, event.pageY);
	}

	function handleMouseOut() {
		console.log('mouseout');
		timeoutId = setTimeout(() => {
			tooltip.style.visibility = 'hidden';
		}, 100);
	}

	function updateTooltipPosition(pageX, pageY) {
		const offsetX = 10;
		const offsetY = 10;
		const tooltipWidth = 200; // Approximate width
		const tooltipHeight = 80; // Approximate height
		tooltip.style.left = Math.max(offsetX, Math.min(pageX + offsetX, window.innerWidth - tooltipWidth)) + 'px';
		tooltip.style.top = Math.max(offsetY, Math.min(pageY + offsetY, window.innerHeight - tooltipHeight)) + 'px';
	}

	// --- 3. DATA FETCHING & PROCESSING ---
	onMount(async () => {
		try {
			const data = await csv(`${base}/absconded.csv`);
			const processed = data
				.map((d) => {
					const officer = d.officers?.trim();
					const rank = d.rank?.trim();
					const date = d.date?.trim();
					if (!date) return null;
					const dateObj = new Date(date);
					return { officer, rank, date, dateObj };
				})
				.filter((d) => d && d.officer && d.rank && !isNaN(d.dateObj.getTime()));
			officerData = processed;
			console.log('Loaded officerData:', officerData);
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
		console.log('Processed axisLabels:', axisLabels);
	}

	// Debug tooltip state
	$: console.log('Tooltip state:', { visibility: tooltip?.style.visibility, left: tooltip?.style.left, top: tooltip?.style.top, innerHTML: tooltip?.innerHTML });
</script>

<div class="timeline-container">
	{#if isLoading}
		<p>Loading timeline...</p>
	{:else if error}
		<p class="error">{error}</p>
	{:else if processedData.length}
		<div class="chart" on:mousemove={handleMouseMove}>
			{#each processedData as group}
				<div class="week-column" style="left: {group.positionPercent}%">
					{#each group.officers as officer}
						<!-- Default gray from Tableau 10 is used if rank is not found -->
						<div
							class="dot"
							style="background-color: {rankColors[officer.rank] || '#BAB0AC'}"
							on:mouseover={(e) => handleMouseOver(e, officer)}
							on:mouseout={handleMouseOut}
						></div>
					{/each}
				</div>
			{/each}
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
	.tooltip {
		position: absolute;
		visibility: hidden;
		background: rgba(0, 0, 0, 0.8);
		color: #fff;
		padding: 6px 10px;
		border-radius: 4px;
		font-size: 0.85rem;
		white-space: nowrap;
		z-index: 1000;
		max-width: 300px;
	}

	.timeline-container {
		width: 100%;
		margin: 2rem auto;
		padding: 0 20px;
		box-sizing: border-box;
	}

	.chart {
		position: relative;
		height: 250px;
		margin-left: -20px;
		margin-bottom: 10px;
	}

	.week-column {
		position: absolute;
		bottom: 6px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		transform: translateX(-50%);
		min-width: 12px;
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		margin-bottom: 4px;
		border: 1px solid rgba(0, 0, 0, 0.2);
		cursor: pointer;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.dot:hover {
		transform: scale(1.4);
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
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
</style>