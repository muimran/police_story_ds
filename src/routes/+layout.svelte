<script>
  // 1. Import the Header component you created in 'src/lib/components/'
  import Header from '$lib/components/Header.svelte';
  import 'mapbox-gl/dist/mapbox-gl.css';

</script>

<!-- 2. Place the Header component here -->
<!-- It will take up the full screen, and the content below will appear on scroll -->
<Header />

<!-- 
  3. The <slot /> renders your individual page content (e.g., +page.svelte).
     Wrapping it in <main> is good practice for accessibility.
-->
<main>
  <slot />
</main>

<style>
  /* This is your original global style block, which is good to keep */
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: system-ui, sans-serif;
    background: #ffffff;
  }

  /* I removed the #svelte selector as it's not typically needed and 
     the body/html rule covers it */
  :global(html), :global(body) {
    height: 100%;
    width: 100%; /* Use 100% instead of 100vw to avoid potential horizontal scrollbars */
    margin: 0;
    padding: 0;
  }

  /* Optional: Add some padding to your main content area so it's not
     stuck to the edges of the screen once you scroll past the header. */
  main {
  }
</style>