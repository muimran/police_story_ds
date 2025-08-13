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
	let rankBoundingCircles = [];
	let activeStep = 0;

	// --- Tooltip State (Manual DOM method) ---
	let tooltipElement;

	// --- Chart Configuration ---
	const width = 500;
	const height = 500;
	let dynamicDotRadius = 6;
	const mobileBreakpoint = 820;
	// NEW: Dynamic variable for label position
	let labelXPosition = width * 0.65;

	// --- Scrollytelling Data ---
	const steps = [
		{
			title: 'The Entire Group',
			description: 'During the July uprising, 365 officers with the rank of Assistant Commissioner (AC) or higher were posted in the DMP area. Each circles represents every individual police officer'
		},
		{
			title: '88% are forced out',
			description: 'Of these, 45 remain in their posts. The other 320 have either been transferred out, retired, or fled. The Daily Star acquired the transfer information of 236 senior officers. '
		},
		{
			title: 'A Split in Command',
			description: 'Among them, 64 were <span style="background-color: #fdba74; color: white; padding: 2px 6px; border-radius: 4px; font-weight: 600;">higher ranking</span> officials (Deputy Commissioner or above), while the <span style="background-color: #4E79A7; color: white; padding: 2px 6px; border-radius: 4px; font-weight: 600;">remaining 172</span> were ranked AC or ADC.'
		},
		{
			title: 'Destinations of Transfers',
			description: 'These officers were reassigned to 21 different outposts, which we grouped into five categories. 45% of the senior-most officers (DC or above) are transferred to range DIG’s offices (central and regional administration). The largest share of transfers overall went to specialized operational units such as RAB and APBn.'
		},
		{
			title: 'A Question of Attachment',
			description: '14% of all transferred officers were “attached” to their new outposts. In police terminology, an attached officer has no assigned duties or post and is merely stationed at a location—effectively sidelined without formal suspension. Notably, half of all DCs and higher-ranked officers ended up in this attached status.'
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
		
		const distance = (p1, p2) => Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

		const desktopClusterPositions = {
			'Specialized Operational Units':     { x: 160, y: 0 },
			'Training & Development':            { x: 165, y: 193 },
			'Central & Regional Administration': { x: 160, y: 340 },
			'Investigation & Intelligence':      { x: 160, y: 455 },
			'Geographic Field Commands':         { x: 160, y: 550 }
		};

		const mobileClusterPositions = {
			'Specialized Operational Units':     { x: 160, y: 75 },
			'Training & Development':            { x: 165, y: 220 },
			'Central & Regional Administration': { x: 160, y: 330 },
			'Investigation & Intelligence':      { x: 160, y: 420 },
			'Geographic Field Commands':         { x: 160, y: 495 }
		};

		function runAllSimulations() {
			const isMobile = window.innerWidth <= mobileBreakpoint;
			const activeClusterPositions = isMobile ? mobileClusterPositions : desktopClusterPositions;
			const transferredData = data.filter(d => d.status === 'transferred');

			const sim1 = forceSimulation(data).force('x', forceX(width / 2).strength(0.05)).force('y', forceY(height / 2).strength(0.05)).force('collide', forceCollide(dynamicDotRadius + 1.5)).stop();
			for (let i = 0; i < 200; ++i) sim1.tick();
			data.forEach(d => { d.x1 = d.x; d.y1 = d.y; });

			const sim2 = forceSimulation(transferredData).force('x', forceX(d => d.rank_level === 'High' ? width * 0.2 : width * 0.65).strength(0.3)).force('y', forceY(height / 2).strength(0.3)).force('collide', forceCollide(dynamicDotRadius + 1.5)).stop();
			for (let i = 0; i < 200; ++i) sim2.tick();
			const rankPositionMap = new Map(transferredData.map(d => [d.id, { x: d.x, y: d.y }]));
			data.forEach(d => { d.x2 = rankPositionMap.has(d.id) ? rankPositionMap.get(d.id).x : d.x1; d.y2 = rankPositionMap.has(d.id) ? rankPositionMap.get(d.id).y : d.y1; });

			const defaultPos = { x: width / 2, y: height / 2 };
			const sim3 = forceSimulation(transferredData).force('x', forceX(d => (activeClusterPositions[d.destination_cluster] || defaultPos).x).strength(0.4)).force('y', forceY(d => (activeClusterPositions[d.destination_cluster] || defaultPos).y).strength(0.4)).force('collide', forceCollide(dynamicDotRadius + 2)).stop();
			for (let i = 0; i < 200; ++i) sim3.tick();
			const clusterPositionMap = new Map(transferredData.map(d => [d.id, { x: d.x, y: d.y }]));
			data.forEach(d => { d.x3 = clusterPositionMap.has(d.id) ? clusterPositionMap.get(d.id).x : d.x2; d.y3 = clusterPositionMap.has(d.id) ? clusterPositionMap.get(d.id).y : d.y2; });

			const sim4 = forceSimulation(transferredData).force('x', forceX(d => (d.attachment === 1 ? width * 0.25 : width * 0.75)).strength(0.1)).force('y', forceY(height / 2).strength(0.1)).force('collide', forceCollide(dynamicDotRadius + 1.5)).stop();
			for (let i = 0; i < 200; ++i) sim4.tick();
			const attachmentPositionMap = new Map(transferredData.map(d => [d.id, { x: d.x, y: d.y }]));
			data.forEach(d => { d.x4 = attachmentPositionMap.has(d.id) ? attachmentPositionMap.get(d.id).x : d.x3; d.y4 = attachmentPositionMap.has(d.id) ? attachmentPositionMap.get(d.id).y : d.y3; });

			const rankGroups = { 'High': transferredData.filter(d => d.rank_level === 'High'), 'Low': transferredData.filter(d => d.rank_level !== 'High') };
			const rankClusterCenters = { 'High': { x: width * 0.2, y: height / 2, key: 'High Rank' }, 'Low': { x: width * 0.65, y: height / 2, key: 'Low Rank' } };
			rankBoundingCircles = Object.entries(rankGroups).map(([key, group]) => {
				if (group.length === 0) return null;
				const center = rankClusterCenters[key];
				let maxDist = 0;
				group.forEach(d => { const pos = { x: d.x2, y: d.y2 }; const dist = distance(pos, center); if (dist > maxDist) maxDist = dist; });
				const radius = maxDist + dynamicDotRadius * 2;
				return { cx: center.x, cy: center.y, r: radius, key: center.key, circumference: 2 * Math.PI * radius };
			}).filter(Boolean);

			const destinationGroups = transferredData.reduce((acc, d) => { const key = d.destination_cluster; if (!acc[key]) acc[key] = []; acc[key].push(d); return acc; }, {});
			boundingCircles = Object.values(destinationGroups).map(group => {
				if (group.length === 0) return null;
				const { x: targetX, y: targetY } = activeClusterPositions[group[0].destination_cluster] || defaultPos;
				let maxDist = 0;
				group.forEach(d => { const pos = {x: d.x3, y: d.y3}; const dist = distance(pos, { x: targetX, y: targetY }); if (dist > maxDist) maxDist = dist; });
				const radius = maxDist + dynamicDotRadius * 2;
				return { cx: targetX, cy: targetY, r: radius, key: group[0].destination_cluster, circumference: 2 * Math.PI * radius };
			}).filter(Boolean);

			const attachmentGroups = { '1': transferredData.filter(d => d.attachment === 1), '0': transferredData.filter(d => d.attachment === 0) };
			const attachmentClusterCenters = { '1': { x: width * 0.25, y: height / 2, key: 'Attached' }, '0': { x: width * 0.75, y: height / 2, key: 'Others' } };
			attachmentBoundingCircles = Object.entries(attachmentGroups).map(([key, group]) => {
				if (group.length === 0) return null;
				const center = attachmentClusterCenters[key];
				let maxDist = 0;
				group.forEach(d => { const pos = { x: d.x4, y: d.y4 }; const dist = distance(pos, center); if (dist > maxDist) maxDist = dist; });
				const radius = maxDist + dynamicDotRadius * 2;
				return { cx: center.x, cy: center.y, r: radius, key: center.key, circumference: 2 * Math.PI * radius };
			}).filter(Boolean);
			
			allTransfers = [...data];
		}

		const mediaQuery = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`);
		function handleScreenChange(e) {
			dynamicDotRadius = e.matches ? 4 : 6;
			labelXPosition = e.matches ? width * 0.55 : width * 0.65;
			runAllSimulations();
		}
		mediaQuery.addEventListener('change', handleScreenChange);
		handleScreenChange(mediaQuery);

		const scroller = scrollama();
		scroller.setup({ step: '.step', offset: 0.6, debug: false }).onStepEnter(response => { activeStep = Math.min(response.index, steps.length - 1); });
		window.addEventListener('resize', scroller.resize);
		
		return () => { 
			window.removeEventListener('resize', scroller.resize);
			mediaQuery.removeEventListener('change', handleScreenChange);
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
					<p>{@html step.description}</p>
				</div>
			</div>
		{/each}
		<div class="step"></div>
	</div>

	<div class="scrolly-graphic">
		<div class="chart-wrapper">
			<svg {width} {height} viewBox="0 0 {width} {height}">
				{#if activeStep === 2}
					<g class="bounding-circles-group">
						{#each rankBoundingCircles as circle (circle.key)}
							<circle cx={circle.cx} cy={circle.cy} r={circle.r} class="bounding-circle" style="stroke-dasharray: {circle.circumference}; stroke-dashoffset: {circle.circumference};" />
						{/each}
					</g>
				{/if}
				{#if activeStep === 3}
					<g class="bounding-circles-group">
						{#each boundingCircles as circle (circle.key)}
							<circle cx={circle.cx} cy={circle.cy} r={circle.r} class="bounding-circle" style="stroke-dasharray: {circle.circumference}; stroke-dashoffset: {circle.circumference};" />
							<text x={labelXPosition} y={circle.cy} class="cluster-label" dominant-baseline="middle">{circle.key}</text>
						{/each}
					</g>
				{/if}
				{#if activeStep === 4}
					<g class="bounding-circles-group">
						{#each attachmentBoundingCircles as circle (circle.key)}
							{@const lineY1 = circle.cy + circle.r + 10}
							{@const lineY2 = lineY1 + 50}
							{@const labelY = lineY2 + 20}

							<circle 
								cx={circle.cx} 
								cy={circle.cy} 
								r={circle.r} 
								class="bounding-circle" 
								style="stroke-dasharray: {circle.circumference}; stroke-dashoffset: {circle.circumference};"
							/>
							
							<line 
								x1={circle.cx} 
								y1={lineY1} 
								x2={circle.cx} 
								y2={lineY2} 
								class="cluster-connector-line"
							/>

							<text 
								x={circle.cx} 
								y={labelY} 
								class="cluster-label" 
								text-anchor="middle"
							>
								{circle.key}
							</text>
						{/each}
					</g>
				{/if}
				<g class="dots">
					{#each renderedTransfers as d (d.id)}
						<circle
							r={dynamicDotRadius}
							fill={getColor(d)}
							class:faded={d.faded}
							style="transform: translate({ activeStep < 2 ? d.x1 : (activeStep === 2 ? d.x2 : (activeStep === 3 ? d.x3 : d.x4)) }px, { activeStep < 2 ? d.y1 : (activeStep === 2 ? d.y2 : (activeStep === 3 ? d.y3 : d.y4)) }px);"
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
	/* --- Keyframe Animations --- */
	@keyframes draw-circle {
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes fade-in {
		to {
			opacity: 1;
		}
	}

	/* --- SVG Element Styles --- */
	.bounding-circle {
		fill: none;
		stroke: #4b5563; /* Darker stroke for better contrast on white */
		stroke-width: 1.5px;
		animation: draw-circle 0.9s ease-out forwards;
	}
	
	.cluster-connector-line {
		stroke: #1f2937; /* Darker line */
		stroke-width: 1.5px;
		animation: fade-in 0.8s 0.4s ease-out forwards;
		opacity: 0;
	}

	/* MODIFIED: Stylize SVG labels */
	.cluster-label {
		fill: #111827; /* Darker text */
		font-size: 15px;
		font-family: 'Inter', sans-serif;
		font-weight: 600; /* Bolder */
		animation: fade-in 0.8s 0.2s ease-out forwards;
		opacity: 0;
	}

	.dots circle {
		transition: transform 0.8s ease-in-out, opacity 0.5s ease-in-out, fill 0.5s ease-in-out, r 0.5s ease-in-out;
		cursor: pointer;
	}
	.dots circle:hover {
		stroke: black;
		stroke-width: 2px;
	}
	.dots circle.faded {
		opacity: 0.1;
	}

	/* --- Tooltip --- */
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

	/* --- Scrollytelling Layout (Desktop) --- */
	.scrolly-container-transparent {
		display: grid;
		justify-content: center; 
		grid-template-columns: auto auto; 
		gap: 4rem; 
		padding: 5vh 5vw;
		font-family: 'Inter', sans-serif;
	}

	.scrolly-steps {
		grid-column: 1 / 2;
		position: relative;
		z-index: 10;
		width: 380px;
	}

	.step {
		min-height: 85vh;
		display: flex;
		align-items: center;
	}

	/* MODIFIED: New styling for the step content box */
	.step-content {
		width: 100%;
		background: #ffffff; /* Dark slate gray background */
		color: #000000; /* Light gray text */
		border: 1px solid #ffffff;
		padding: 1.5rem 2rem;
		border-radius: 8px;
		box-sizing: border-box;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0,0,0,0.08);
	}

	/* MODIFIED: New styling for the title ribbon */
	.step-content h3 {
		background: #111827; /* Very dark background for ribbon */
		color: #f3f4f6; /* Off-white text */
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		text-align: center;
		letter-spacing: 0.05em;
		padding: 0.5rem 1.9rem;
		/* Use negative margin to make it span the parent's padding */
		margin: -1.5rem -2rem 1.5rem -2rem;
		border-top-left-radius: 7px; /* Match parent's border-radius */
		border-top-right-radius: 7px;
	}
	.step-content p {
		line-height: 1.7;
		font-size: 0.95rem;
	}

	/* --- Sticky Graphic (Desktop) --- */
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
        max-width: 500px;
	}
	svg {
		overflow: visible;
	}

	/* --- Responsive Styles (Mobile) --- */
	@media (max-width: 820px) {
		.scrolly-container-transparent {
			display: flex;
			flex-direction: column-reverse;
			padding: 0;
			gap: 0;
		}

		.scrolly-graphic {
			position: sticky;
			top: 0;
			height: 65vh;
			z-index: 1;
			background: white; /* Keep background white for mobile graphic */
			width: 100%;
			border-bottom: 1px solid #e0e0e0;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.chart-wrapper {
			padding: 1rem;
			box-sizing: border-box;
			max-width: none;
		}
		
		.chart-wrapper svg {
			width: 100%;
			height: 100%;
		}

		.cluster-label {
			font-size: 12px;
		}

		.scrolly-steps {
			width: 100%;
			z-index: 0;
			background-color: #ffffff; /* Add a light background to the steps area on mobile */
		}

		.step {
			min-height: auto;
			padding: 1rem;
			margin-bottom: 60vh;
			display: block;
		}

		.step:last-of-type {
			margin-bottom: 30vh;
		}

		.step-content {
			width: 90%;
			margin: 0 auto;
			padding: 1rem 1.25rem;
		}

		/* Adjust ribbon margin for mobile padding */
		.step-content h3 {
			margin: -1rem -1.25rem 1rem -1.25rem;
		}
	}
</style>