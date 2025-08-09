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
  :root {
    --red-accent: #0e0d0d;
  }
  
  .top-ribbon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1rem 2rem;
    background-color: #f5f5f5;
    border-bottom: 2px solid var(--red-accent);
  }

  /* --- THIS IS THE SECTION TO EDIT --- */
  .ribbon-logo {
    height: 50px; /* Set your desired desktop logo height here */
    width: auto;
  }

  @media (max-width: 768px) {
    .top-ribbon {
      padding: 1rem;
    }
    .ribbon-logo {
      height: 35px; /* Set your desired mobile logo height here */
    }
  }
  /* --- END OF SECTION --- */
</style>