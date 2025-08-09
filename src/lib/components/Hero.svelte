<!-- src/lib/components/Hero.svelte -->
<script>
  import { base } from '$app/paths';
</script>

<div class="header-container">
  <!-- Your existing image -->
  <img src="{base}/images/header.jpg" alt="An illustration of puppet hands controlling police and soldiers." class="header-image" />
  
  <!-- The gradient overlay will be created purely with the CSS below -->
</div>
  
<style>
  .header-container {
    position: relative; /* This is CRITICAL for the overlay to work */
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  .header-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; 
  }

  /* --- ADD THIS CODE FOR THE FADE EFFECT --- */
  .header-container::after {
    /* This creates a new "virtual" element inside the container */
    content: ''; 
    
    /* Position it at the bottom of the container */
    position: absolute;
    bottom: 0;
    left: 0;
    
    /* Make it span the full width */
    width: 100%;

    /* This is the height of the fade area. Adjust as you like. */
    height: 8%;
    
    /* This creates the gradient from transparent to white */
    background: linear-gradient(
      to bottom,           /* Direction of the gradient */
      rgba(255, 255, 255, 0), /* Start color: fully transparent white */
      rgba(255, 255, 255, 1)  /* End color: fully opaque white */
    );

    /* Prevents the overlay from blocking mouse clicks on the image if needed */
    pointer-events: none;
  }
  /* --- END OF NEW CODE --- */

</style>