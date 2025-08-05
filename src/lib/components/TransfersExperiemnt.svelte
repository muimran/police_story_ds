<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { csvParse } from 'd3-dsv';
	import scrollama from 'scrollama';
	import { forceSimulation, forceCollide, forceX, forceY } from 'd3-force';

	// --- Component State ---
	let allTransfers = [];
	let renderedTransfers = [];
	let boundingCircles = [];
	let attachmentBoundingCircles = [];
	let activeStep = 0;

	// --- Tooltip State (Manual DOM method) ---
	let tooltipElement;

	// --- Chart Configuration ---
	const width = 500;
	const height = 500;
	const dotRadius = 6;

	// --- Scrollytelling Data ---
	const steps = [
		{
			title: 'The Entire Group',
			description: 'In total, 365 officers were part of the reshuffle. These circles represent every individual, separated by their final status: Transferred (green), Remained (orange), or Unknown (grey).'
		},
		{
			title: 'Isolating the Transfers',
			description: 'To focus on the movement, we can fade out all but the 236 officers who were confirmed to have been transferred to a new post.'
		},
		{
			title: 'A Split in Command',
			description: 'The transferred officers are now separated by rank. The small group of high-ranking officials (orange) is separated from all other ranks (blue), illustrating the strategic placement of leadership.'
		},
		{
			title: 'Destinations of Transfers',
			description: 'The officers are regrouped into their destination departments, outlined here, revealing that the majority were sent to Specialized Units and Training facilities.'
		},
		{
			title: 'A Question of Attachment',
			description: 'Finally, the officers are split by whether their transfer included an "attachment." Attached transfers are often temporary, distinct from permanent reassignments.'
		}
	];

	// --- Reactive Updates ---
	$: {
		if (allTransfers.length > 0) {
			if (activeStep >= 2) {
				renderedTransfers = allTransfers.filter(d => d.status === 'transferred');
			} else {
				renderedTransfers = allTransfers;
			}
			allTransfers.forEach(d => {
				d.faded = activeStep === 1 && d.status !== 'transferred';
			});
			allTransfers = [...allTransfers];
		}
	}

	// --- Color Logic ---
	const getColor = (d) => {
		if (activeStep === 0) {
			return '#9ca3af'; 
		}
		if (activeStep >= 2 && d.rank_level === 'High') {
			return '#fdba74';
		}
		switch (d.status) {
			case 'transferred': return '#4E79A7';
			case 'remained': return '#9ca3af';
			case 'unknown': return '#9ca3af';
			default: return '#ccc';
		}
	};

	// --- Tooltip Functions ---
	const showTooltip = (event, d) => {
		if (!tooltipElement) return;
		tooltipElement.style.visibility = 'visible';
		tooltipElement.style.left = `${event.clientX + 10}px`;
		tooltipElement.style.top = `${event.clientY + 10}px`;
		tooltipElement.innerHTML = `
			<div>ID: ${d.id || 'N/A'}</div>
			<div>Rank: ${d.rank || 'N/A'}</div>
			<div>Rank Level: ${d.rank_level || 'N/A'}</div>
			<div>Destination Cluster: ${d.destination_cluster || 'N/A'}</div>
			<div>Attached: ${d.attachment === 1 ? 'Yes' : 'No'}</div>
		`;
	};

	const hideTooltip = () => {
		if (!tooltipElement) return;
		tooltipElement.style.visibility = 'hidden';
	};

	// --- Data and Simulation Setup ---
	onMount(async () => {
		tooltipElement = document.createElement('div');
		tooltipElement.className = 'tooltip';
		document.body.appendChild(tooltipElement);
		
		const response = await fetch(`${base}/transfers.csv`);
		const rawData = csvParse(await response.text());
		let data = rawData.map(d => ({ ...d, attachment: +d.attachment, faded: false }));

		// Layout 1: Single Cluster
		const sim1 = forceSimulation(data).force('x', forceX(width / 2).strength(0.05)).force('y', forceY(height / 2).strength(0.05)).force('collide', forceCollide(dotRadius + 1.5)).stop();
		for (let i = 0; i < 200; ++i) sim1.tick();
		data.forEach(d => { d.x1 = d.x; d.y1 = d.y; });

		const transferredData = data.filter(d => d.status === 'transferred');
		
		// Layout 2: Split by Rank Level
		const sim2 = forceSimulation(transferredData)
			.force('x', forceX(d => d.rank_level === 'High' ? width * 0.2 : width * 0.65).strength(0.1))
			.force('y', forceY(height / 2).strength(0.1)) // Matched strength for circular clusters
			.force('collide', forceCollide(dotRadius + 1.5)).stop();
		for (let i = 0; i < 200; ++i) sim2.tick();
		const rankPositionMap = new Map(transferredData.map(d => [d.id, { x: d.x, y: d.y }]));
		data.forEach(d => {
			d.x2 = rankPositionMap.has(d.id) ? rankPositionMap.get(d.id).x : d.x1;
			d.y2 = rankPositionMap.has(d.id) ? rankPositionMap.get(d.id).y : d.y1;
		});

		// --- FIX: RESTORED THE CODE FOR SIMULATION 3 ---
		// Layout 3: Split by Destination Cluster
		const clusterPositions = {
			'Specialized Operational Units': { x: width * 0.25, y: height * 0.3 },
			'Training & Development': { x: width * 0.75, y: height * 0.3 },
			'Central & Regional Administration': { x: width * 0.25, y: height * 0.75 },
			'Geographic Field Commands': { x: width * 0.75, y: height * 0.75 },
			'Investigation & Intelligence': { x: width * 0.5, y: height * 0.55 }
		};
		const defaultPos = { x: width / 2, y: height / 2 };
		const sim3 = forceSimulation(transferredData)
			.force('x', forceX(d => (clusterPositions[d.destination_cluster] || defaultPos).x).strength(0.4))
			.force('y', forceY(d => (clusterPositions[d.destination_cluster] || defaultPos).y).strength(0.4))
			.force('collide', forceCollide(dotRadius + 2)).stop();
		for (let i = 0; i < 200; ++i) sim3.tick();
		const clusterPositionMap = new Map(transferredData.map(d => [d.id, { x: d.x, y: d.y }]));
		data.forEach(d => {
			d.x3 = clusterPositionMap.has(d.id) ? clusterPositionMap.get(d.id).x : d.x2;
			d.y3 = clusterPositionMap.has(d.id) ? clusterPositionMap.get(d.id).y : d.y2;
		});

		// Layout 4: Split by Attachment
		const sim4 = forceSimulation(transferredData)
			.force('x', forceX(d => (d.attachment === 1 ? width * 0.25 : width * 0.75)).strength(0.1))
			.force('y', forceY(height / 2).strength(0.1)) // Matched strength for circular clusters
			.force('collide', forceCollide(dotRadius + 1.5))
			.stop();
		for (let i = 0; i < 200; ++i) sim4.tick();
		const attachmentPositionMap = new Map(transferredData.map(d => [d.id, { x: d.x, y: d.y }]));
		data.forEach(d => {
			d.x4 = attachmentPositionMap.has(d.id) ? attachmentPositionMap.get(d.id).x : d.x3;
			d.y4 = attachmentPositionMap.has(d.id) ? attachmentPositionMap.get(d.id).y : d.y3;
		});
		
		const distance = (p1, p2) => Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

		// --- FIX: RESTORED THE CODE FOR DESTINATION GROUPING & CIRCLES ---
		// Bounding Circles for Step 3 (Destinations)
		const destinationGroups = transferredData.reduce((acc, d) => {
			const key = d.destination_cluster;
			if (!acc[key]) acc[key] = [];
			acc[key].push(d);
			return acc;
		}, {});
		boundingCircles = Object.values(destinationGroups).map(group => {
			if (group.length === 0) return null;
			const { x: targetX, y: targetY } = clusterPositions[group[0].destination_cluster] || defaultPos;
			let maxDist = 0;
			group.forEach(d => {
				const pos = {x: d.x3, y: d.y3};
				const dist = distance(pos, { x: targetX, y: targetY });
				if (dist > maxDist) maxDist = dist;
			});
			const radius = maxDist + dotRadius * 2;
			return { 
				cx: targetX, cy: targetY, r: radius, key: group[0].destination_cluster,
				circumference: 2 * Math.PI * radius
			};
		}).filter(Boolean);

		// Bounding Circles for Step 4 (Attachment)
		const attachmentGroups = { '1': transferredData.filter(d => d.attachment === 1), '0': transferredData.filter(d => d.attachment === 0) };
		const attachmentClusterCenters = { '1': { x: width * 0.25, y: height / 2, key: 'Attached' }, '0': { x: width * 0.75, y: height / 2, key: 'Not Attached' } };
		attachmentBoundingCircles = Object.entries(attachmentGroups).map(([key, group]) => {
			if (group.length === 0) return null;
			const center = attachmentClusterCenters[key];
			let maxDist = 0;
			group.forEach(d => {
				const pos = { x: d.x4, y: d.y4 };
				const dist = distance(pos, center);
				if (dist > maxDist) maxDist = dist;
			});
			const radius = maxDist + dotRadius * 2;
			return { cx: center.x, cy: center.y, r: radius, key: center.key, circumference: 2 * Math.PI * radius };
		}).filter(Boolean);

		allTransfers = data;

		const scroller = scrollama();
		scroller.setup({ step: '.step', offset: 0.6, debug: false }).onStepEnter(response => { activeStep = Math.min(response.index, steps.length - 1); });
		window.addEventListener('resize', scroller.resize);
		
		return () => { 
			window.removeEventListener('resize', scroller.resize);
			if (tooltipElement) {
				document.body.removeChild(tooltipElement);
			}
		};
	});
</script>

<div class="scrolly-container-transparent">
	<div class="scrolly-steps">
		{#each steps as step, i}
			<div class="step" data-step-id={i}>
				<div class="step-content">
					<h3>{step.title}</h3>
					<p>{step.description}</p>
				</div>
			</div>
		{/each}
		<div class="step"></div>
	</div>

	<div class="scrolly-graphic">
		<div class="chart-wrapper" style="max-width: {width}px;">
			<svg {width} {height}>
				{#if activeStep === 3}
					<g class="bounding-circles">
						{#each boundingCircles as circle (circle.key)}
							<circle cx={circle.cx} cy={circle.cy} r={circle.r} class="bounding-circle" style="stroke-dasharray: {circle.circumference}; stroke-dashoffset: {circle.circumference};"/>
						{/each}
					</g>
				{/if}
				{#if activeStep === 4}
					<g class="bounding-circles">
						{#each attachmentBoundingCircles as circle (circle.key)}
							<circle cx={circle.cx} cy={circle.cy} r={circle.r} class="bounding-circle" style="stroke-dasharray: {circle.circumference}; stroke-dashoffset: {circle.circumference};"/>
						{/each}
					</g>
				{/if}
				<g class="dots">
					{#each renderedTransfers as d (d.id)}
						<circle
							r={dotRadius}
							fill={getColor(d)}
							class:faded={d.faded}
							style="transform: translate({
								activeStep < 2 ? d.x1 : (activeStep === 2 ? d.x2 : (activeStep === 3 ? d.x3 : d.x4))
							}px, {
								activeStep < 2 ? d.y1 : (activeStep === 2 ? d.y2 : (activeStep === 3 ? d.y3 : d.y4))
							}px);"
							on:mouseover={(e) => showTooltip(e, d)}
							on:mouseout={hideTooltip}
							on:focus={(e) => showTooltip(e, d)}
							on:blur={hideTooltip}
						>
							<title>{d.rank || 'N/A'} to {d.destination_cluster || 'N/A'}</title>
						</circle>
					{/each}
				</g>
			</svg>
		</div>
	</div>
</div>

<style>
	@keyframes draw-circle {
		to {
			stroke-dashoffset: 0;
		}
	}

	.bounding-circle {
		fill: none;
		stroke: #d1d5db;
		stroke-width: 2px;
		stroke-dasharray: 4 4;
		animation: draw-circle 0.9s ease-out forwards;
	}

	.tooltip {
		position: fixed;
		visibility: hidden;
		background: #1f2937;
		color: #ffffff;
		padding: 0.75rem;
		border-radius: 6px;
		pointer-events: none;
		z-index: 1000;
		font-size: 0.875rem;
		line-height: 1.4;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}
	.tooltip div {
		margin-bottom: 0.25rem;
	}
	.tooltip div:last-child {
		margin-bottom: 0;
	}

	.scrolly-container-transparent {
		display: grid;
		justify-content: center; 
		grid-template-columns: auto auto; 
		gap: 4rem; 
		padding: 5vh 5vw;
		color: #374151;
		font-family: 'Inter', sans-serif;
	}
	.scrolly-steps {
		grid-column: 1 / 2;
		position: relative;
		z-index: 10;
	}
	.step {
		min-height: 85vh;
		display: flex;
		align-items: center;
	}
	.step-content {
		background: #f9fafb;
		border: 1px solid #e5e7eb;
		padding: 1.5rem 2rem;
		border-radius: 12px;
		width: 380px;
		height: 380px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.step-content h3 {
		margin-top: 0;
		font-weight: 600;
		color: #111827;
	}
	.step-content p {
		line-height: 1.6;
	}
	.scrolly-graphic {
		grid-column: 2 / 3;
		position: sticky;
		top: 10vh;
		height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.chart-wrapper {
		width: 100%;
	}
	svg {
		overflow: visible;
	}
	.dots circle {
		transition: transform 0.8s ease-in-out, opacity 0.5s ease-in-out, fill 0.5s ease-in-out;
		cursor: pointer;
	}
	.dots circle:hover {
		stroke: black;
		stroke-width: 2px;
	}
	.dots circle.faded {
		opacity: 0.1;
	}
	@media (max-width: 820px) {
		.scrolly-container-transparent {
			display: block;
		}
		.scrolly-graphic {
			position: -webkit-sticky;
			position: sticky;
			top: 5vh;
			height: 50vh;
			z-index: 0;
			margin-bottom: 2rem;
		}
		.scrolly-steps {
			width: 90%;
			margin: 0 auto;
		}
		.step {
			min-height: auto;
			padding: 5vh 0;
			justify-content: center;
		}
		.step-content {
			width: 100%;
			height: auto;
			aspect-ratio: 1 / 1;
		}
	}
</style>