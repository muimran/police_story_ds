<!-- src/routes/+layout.svelte -->
<script>
  // 1. Import your Navbar component
  import Navbar from '$lib/components/NavBar.svelte';

  // Keep any global CSS imports
  import 'mapbox-gl/dist/mapbox-gl.css';
</script>

<!-- 2. Place the Navbar component here. It will now be on every page. -->
<Navbar />

<!-- 
  3. The <slot /> renders your individual page content. 
     The Hero will go inside the +page.svelte file, which gets rendered here.
-->
<main>
  <slot />
</main>

<style>
  /* --- ADD THIS RULE FOR DEBUGGING --- */


  :global(body) {
    margin: 0;
    padding: 0;
    font-family: system-ui, sans-serif;
    background: #ffffff;
  }

  :global(html), :global(body) {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }


  main {
    /* Since the Navbar is position:absolute, it doesn't take up space.
       The content inside <main> will start at the very top of the page,
       underneath the Navbar. This is usually what you want for a hero image. */
  }
</style>