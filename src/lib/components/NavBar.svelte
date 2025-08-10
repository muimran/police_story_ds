<!-- src/lib/components/Navbar.svelte -->
<script>
  import { base } from '$app/paths';
</script>

<div class="top-ribbon">
  <a href="https://www.thedailystar.net" rel="noopener noreferrer" target="_blank">
    <img src="{base}/images/ds_logo.svg" alt="The Daily Star Logo" class="ribbon-logo" />
  </a>
</div>

<style>
  .top-ribbon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    
    display: flex;
    align-items: center;
    justify-content: flex-start;

    padding: 2rem;
    box-sizing: border-box; 
  }

  /* --- THIS IS THE SECTION TO EDIT --- */
  .ribbon-logo {
    height: 70px; /* CHANGED: Was 40px. Adjust this for desktop size. */
    width: auto;  /* Keep this as 'auto' to prevent stretching */
  }

  @media (max-width: 768px) {
    .top-ribbon {
      padding: 1.5rem;
    }
    .ribbon-logo {
      height: 35px; /* CHANGED: Was 30px. Adjust this for mobile size. */
    }
  }
  /* --- END OF SECTION --- */
</style>