<script context="module">
  export const ssr = false;
</script>

<script>
  import { onMount, onDestroy } from 'svelte';
  import mapboxgl from 'mapbox-gl';
  import scrollama from 'scrollama';

  let map;
  let mapContainer;
  let scroller;
  let activeIndex = -1;

  mapboxgl.accessToken = 'pk.eyJ1IjoiaW1yYW5kYXRhIiwiYSI6ImNtMDRlaHh1YTA1aDEybHI1ZW12OGh4cDcifQ.fHLLFYQx7JKPUp2Sl1jtYg';

  const scrollySteps = Array.from({ length: 10 }, (_, i) => ({
    id: `step-${i + 1}`,
    title: `Step ${i + 1}`,
    text: `This is step ${i + 1}.`,
  }));

  function handleStepEnter(response) {
    activeIndex = response.index;
  }

  function setupScrollama() {
    scroller = scrollama();
    scroller
      .setup({
        step: '.scrolly-step',
        offset: 0.9,
        debug: false
      })
      .onStepEnter(handleStepEnter);

    const resize = () => scroller.resize();
    window.addEventListener('resize', resize);

    onDestroy(() => {
      window.removeEventListener('resize', resize);
      scroller.destroy();
    });
  }

  function initMap() {
    map = new mapboxgl.Map({
      container: mapContainer,
      style: 'mapbox://styles/imrandata/cmdott4fc001e01sgeux191ty',
      center: [90.43859112088921, 23.762459989380986],
      zoom: 14
    });
  }

  onMount(() => {
    initMap();
    setupScrollama();
  });

  onDestroy(() => {
    if (map) map.remove();
  });
</script>

<style>
  /* You can remove this global rule from this component since it's in your layout.
     It's not hurting anything, but it's redundant. */
  :global(body, html) {
    margin: 0;
    padding: 0;
    overflow-x: hidden; /* Prevents horizontal scrollbars */
  }

  @import 'mapbox-gl/dist/mapbox-gl.css';

  .scrolly-container {
    position: relative;
    width: 100vw; /* Ensure it goes full width of viewport */
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .graphic-container {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
    z-index: 0;
  }

  #map {
    position: relative; /* <-- THE FIX IS HERE */
    width: 100%;
    height: 100%;
  }

  .scrolly-steps {
    position: relative;
    z-index: 1;
    margin-top: -100vh;
    padding-top: 100vh;
  }

  .scrolly-step {
    margin: 0 auto 80vh auto;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.85);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    opacity: 0.4;
    transform: translateY(10px);
    transition: all 0.3s ease;
    max-width: 600px;
    border-radius: 8px;
  }

  .scrolly-step.active {
    opacity: 1;
    transform: translateY(0);
  }
</style>

<div class="scrolly-container">
  <div class="graphic-container">
    <div bind:this={mapContainer} id="map"></div>
  </div>

  <div class="scrolly-steps">
    {#each scrollySteps as step, i (step.id)}
      <div class="scrolly-step" class:active={activeIndex === i}>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
      </div>
    {/each}
  </div>
</div>