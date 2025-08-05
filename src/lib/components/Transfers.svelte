<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { base } from '$app/paths';
	import scrollama from 'scrollama';
	import { forceSimulation, forceCollide, forceX, forceY } from 'd3-force';

	let container;

	// <<< CHANGE: Declare key variables here to make them accessible to UI event handlers
	let simulation, bubbles, clusterLabels;
	let width = 1200;
	let height = 500;
	let margin = { top: 50, right: 30, bottom: 50, left: 30 }; // Increased top margin for labels
	let xScale;


	// --- STATE MANAGEMENT FUNCTIONS ---
	// This function sets the forces for the initial timeline view.
	function showTimelineView() {
		if (!simulation || !xScale) return;

		// Hide the cluster labels
		clusterLabels.transition().duration(500).attr('fill-opacity', 0);

		// Update the 'x' force to position circles along the timeline
		simulation.force('x', d3.forceX(d => xScale(d.parsedDate)).strength(0.2));

		// "Reheat" the simulation to make the nodes move to their new positions
		simulation.alpha(1).restart();
	}

	// <<< CHANGE: This is the new function for your attachment clusters
	// This function sets the forces to create two clusters based on the 'attachment' column.
	function showAttachmentClusters() {
		if (!simulation) return;

		// Show the cluster labels
		clusterLabels.transition().duration(500).attr('fill-opacity', 1);

		// Define the x-positions for the two clusters
		const nonAttachmentX = width * 0.25;
		const attachmentX = width * 0.75;

		// Update the 'x' force to use the new clustering logic
		// If attachment is '1', go to the right cluster; otherwise, go to the left.
		simulation.force('x', d3.forceX(d => {
			return d.attachment === '1' ? attachmentX : nonAttachmentX;
		}).strength(0.2)); // You can adjust strength for tighter/looser clusters

		// "Reheat" the simulation
		simulation.alpha(1).restart();
	}


	// --- DATA PARSING ---
	function parseDate(dateString) {
		if (!dateString || dateString.trim() === '0') return null;
		const formats = ['%B %d, %Y', '%d %B %Y', '%B %-d, %Y', '%d %B, %Y'];
		for (const format of formats) {
			const parsed = d3.timeParse(format)(dateString.trim());
			if (parsed) return parsed;
		}
		console.warn('Could not parse date:', dateString);
		return null;
	}


	onMount(async () => {
		try {
			// --- DATA LOADING & PROCESSING ---
			// IMPORTANT: Your transfers.csv file must have an 'attachment' column with values '0' or '1'
			const dataUrl = `${base}/transfers.csv`;
			const data = await d3.csv(dataUrl);
			if (!data) return;

			data.forEach(d => { d.parsedDate = parseDate(d.date); });
			const transferredData = data.filter(d => d.status?.trim() === 'transferred' && d.parsedDate);
			if (transferredData.length === 0) return;


			// --- SVG & SCALES SETUP ---
			const svg = d3.select(container).append('svg').attr('viewBox', `0 0 ${width} ${height}`).style('max-width', '100%');
			const xDomain = d3.extent(transferredData, d => d.parsedDate);
			// Assign to the component-level variable
			xScale = d3.scaleTime().domain(xDomain).range([margin.left, width - margin.right]).nice();
			const colorScale = d3.scaleOrdinal(d3.schemeTableau10);
			const tooltip = d3.select(container).append('div').attr('class', 'tooltip');


			// --- DRAW AXIS ---
			const xAxis = d3.axisBottom(xScale).ticks(d3.timeMonth.every(2)).tickFormat(d3.timeFormat('%b %Y'));
			svg.append('g').attr('transform', `translate(0, ${height - margin.bottom})`).call(xAxis).call(g => g.select(".domain").remove()).call(g => g.selectAll(".tick line").attr('stroke-opacity', 0.2).attr('y2', -(height - margin.top - margin.bottom)));


			// <<< CHANGE: Add labels for the attachment clusters
			// They will start hidden and we'll fade them in when needed.
			clusterLabels = svg.append('g')
				.attr('font-family', 'sans-serif')
				.attr('font-size', 16)
				.attr('text-anchor', 'middle')
				.attr('fill-opacity', 0); // Start hidden

			clusterLabels.append('text')
				.attr('x', width * 0.25)
				.attr('y', margin.top - 10)
				.text('Non-Attachment');

			clusterLabels.append('text')
				.attr('x', width * 0.75)
				.attr('y', margin.top - 10)
				.text('Attachment');


			// --- DRAW BUBBLES ---
			// Assign to the component-level variable
			bubbles = svg.append('g')
				.selectAll('circle')
				.data(transferredData)
				.join('circle')
					.attr('r', 5.5)
					.attr('fill', d => colorScale(d.rank))
					.attr('fill-opacity', 0);

			bubbles.transition().duration(800).delay((d,i) => i * 2)
				.attr('fill-opacity', 0.9);


			// --- CONTINUOUS FORCE SIMULATION ---
			// Assign to the component-level variable
			simulation = d3.forceSimulation(transferredData)
				// The initial forces will be set by showTimelineView()
				.force('y', d3.forceY(height / 2).strength(0.02))
				.force('collide', d3.forceCollide(7))
				.on('tick', ticked);

			function ticked() {
				bubbles
					.attr('cx', d => d.x)
					.attr('cy', d => d.y);
			}

			// <<< CHANGE: Set the initial view
			showTimelineView();


			// --- DRAG HANDLER (Unchanged) ---
			function drag(simulation) {
				function dragstarted(event, d) { if (!event.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; }
				function dragged(event, d) { d.fx = event.x; d.fy = event.y; }
				function dragended(event, d) { if (!event.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; }
				return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
			}

			// Apply drag handler and interactivity to bubbles
			bubbles
				.call(drag(simulation))
				.style('cursor', 'grab')
				.on('mouseover', (event, d) => {
					// <<< CHANGE: Added 'Attachment' to tooltip for clarity
					tooltip.style('visibility', 'visible').html(`<b>Rank:</b> ${d.rank}<br><b>Destination:</b> ${d.destination}<br><b>Date:</b> ${d.date}<br><b>Attachment:</b> ${d.attachment === '1' ? 'Yes' : 'No'}`);
					bubbles.transition().duration(200).style('fill-opacity', 0.15);
					d3.selectAll(bubbles.nodes().filter(node => node.__data__.rank === d.rank))
						.transition().duration(200).style('fill-opacity', 1).attr('stroke', '#333').attr('stroke-width', 2);
				})
				.on('mousemove', (event) => {
					tooltip.style('left', (event.pageX + 15) + 'px').style('top', (event.pageY - 15) + 'px');
				})
				.on('mouseout', () => {
					tooltip.style('visibility', 'hidden');
					bubbles.transition().duration(200).style('fill-opacity', 0.9).attr('stroke', null);
				});

		} catch (error) {
			console.error("A critical error occurred while creating the Transfers chart:", error);
		}
	});
</script>

<style>
	.chart-container {
		position: relative;
		font-family: sans-serif;
		width: 100%;
		max-width: 1200px;
		margin: 2rem auto;
	}

	/* <<< CHANGE: Styles for the control buttons */
	.controls {
		text-align: center;
		margin-bottom: 1rem;
	}
	.controls button {
		margin: 0 0.5rem;
		padding: 8px 16px;
		font-size: 14px;
		cursor: pointer;
		border: 1px solid #ccc;
		background-color: #f0f0f0;
		border-radius: 4px;
	}
	.controls button:hover {
		background-color: #e0e0e0;
	}

	:global(.tooltip) {
		position: absolute;
		visibility: hidden;
		background: rgba(255, 255, 255, 0.95);
		border: 1px solid #ccc;
		padding: 8px 12px;
		border-radius: 4px;
		pointer-events: none;
		font-size: 13px;
		line-height: 1.4;
		box-shadow: 0 2px 5px rgba(0,0,0,0.1);
		z-index: 10;
	}
</style>

<!-- <<< CHANGE: Add buttons to trigger the different views -->
<div class="controls">
	<button on:click={showTimelineView}>Show Timeline View</button>
	<button on:click={showAttachmentClusters}>Show Attachment Clusters</button>
</div>

<div class="chart-container" bind:this={container}>
	<!-- D3 renders everything here -->
</div>