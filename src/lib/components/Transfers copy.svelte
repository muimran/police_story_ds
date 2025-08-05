<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { base } from '$app/paths';

	let container;

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
			const dataUrl = `${base}/transfers.csv`;
			const data = await d3.csv(dataUrl);
			if (!data) return;

			data.forEach(d => { d.parsedDate = parseDate(d.date); });
			const transferredData = data.filter(d => d.status?.trim() === 'transferred' && d.parsedDate);
			console.log('Transferred data:', transferredData); // Debug log
			if (transferredData.length === 0) return;

			// --- SVG & SCALES SETUP ---
			const width = 1200;
			const height = 500;
			const margin = { top: 20, right: 30, bottom: 50, left: 30 };
			const svg = d3.select(container).append('svg').attr('viewBox', `0 0 ${width} ${height}`).style('max-width', '100%').style('overflow', 'visible');
			const xDomain = d3.extent(transferredData, d => d.parsedDate);
			const xScale = d3.scaleTime().domain(xDomain).range([margin.left, width - margin.right]).nice();
			const colorScale = d3.scaleOrdinal(d3.schemeTableau10);
			const tooltip = d3.select(container).append('div').attr('class', 'tooltip');

			// --- DRAW AXIS ---
			const xAxis = d3.axisBottom(xScale).ticks(d3.timeMonth.every(2)).tickFormat(d3.timeFormat('%b %Y'));
			svg.append('g').attr('transform', `translate(0, ${height - margin.bottom})`).call(xAxis).call(g => g.select(".domain").remove()).call(g => g.selectAll(".tick line").attr('stroke-opacity', 0.2).attr('y2', -(height - margin.top - margin.bottom)));

			// --- DRAW BUBBLES ---
			const bubbles = svg.append('g')
				.selectAll('circle')
				.data(transferredData)
				.join('circle')
					.attr('r', 5.5)
					.attr('fill', d => colorScale(d.rank))
					.attr('fill-opacity', 0);

			bubbles.transition().duration(800).delay((d,i) => i * 2)
				.attr('fill-opacity', 0.9);

			// --- CONTINUOUS FORCE SIMULATION ---
			const simulation = d3.forceSimulation(transferredData)
				.force('x', d3.forceX(d => xScale(d.parsedDate)).strength(0.2))
				.force('y', d3.forceY(height / 2).strength(0.02))
				.force('collide', d3.forceCollide(7))
				.on('tick', ticked);

			function ticked() {
				bubbles
					.attr('cx', d => d.x)
					.attr('cy', d => d.y);
			}

			// --- DRAG HANDLER ---
			function drag(simulation) {
				function dragstarted(event, d) {
					if (!event.active) simulation.alphaTarget(0.3).restart();
					d.fx = d.x;
					d.fy = d.y;
				}
				function dragged(event, d) {
					d.fx = event.x;
					d.fy = event.y;
				}
				function dragended(event, d) {
					if (!event.active) simulation.alphaTarget(0);
					d.fx = null;
					d.fy = null;
				}
				return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
			}

			// --- INTERACTIVITY ---
			bubbles
				.call(drag(simulation))
				.style('cursor', 'grab')
				.on('mouseover', (event, d) => {
					tooltip.style('visibility', 'visible').html(`<b>Rank:</b> ${d.rank}<br><b>Destination:</b> ${d.destination}<br><b>Date:</b> ${d.date}`);
					bubbles.transition().duration(200).style('fill-opacity', 0.15);
					d3.selectAll(bubbles.nodes().filter(node => node.__data__.rank === d.rank))
						.transition().duration(200).style('fill-opacity', 1).attr('stroke', '#333').attr('stroke-width', 2);
				})
				.on('mousemove', (event, d) => {
					const offsetX = 15;
					const offsetY = -15;
					const tooltipWidth = 200;
					const tooltipHeight = 80;
					tooltipX = Math.max(offsetX, Math.min(event.pageX + offsetX, window.innerWidth - tooltipWidth));
					tooltipY = Math.max(offsetY, Math.min(event.pageY + offsetY, window.innerHeight - tooltipHeight));
					tooltip.style('left', tooltipX + 'px').style('top', tooltipY + 'px');
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
		z-index: 1000;
	}
</style>

<div class="chart-container" bind:this={container}>
	<!-- D3 renders everything here -->
</div>