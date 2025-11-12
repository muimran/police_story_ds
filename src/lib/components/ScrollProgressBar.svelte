<!-- src/lib/components/ScrollProgressBar.svelte -->
<script>
  export let progress = 0; // 0 to 100
  export let isVisible = true;

  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  // Reactive statement to calculate the SVG stroke offset
  $: dashoffset = circumference - (progress / 100) * circumference;

  // --- NEW: Reactive variable to track the completed state ---
  $: isComplete = progress >= 100;
</script>

{#if isVisible}
  <!-- Add a conditional class for the completed state -->
  <div class="progress-container" class:completed={isComplete}>
    <svg width="50" height="50" viewBox="0 0 50 50">
      <!-- Background track -->
      <circle
        class="track-circle"
        cx="25"
        cy="25"
        r={radius}
        fill="transparent"
        stroke="#e6e6e6"
        stroke-width="3"
      />
      <!-- Progress arc -->
      <circle
        class="progress-arc"
        cx="25"
        cy="25"
        r={radius}
        fill="transparent"
        stroke="#333"
        stroke-width="3"
        stroke-dasharray={circumference}
        stroke-dashoffset={dashoffset}
        stroke-linecap="round"
      />
      <!-- --- NEW: Checkmark icon that appears when complete --- -->
      {#if isComplete}
        <polyline
          class="checkmark"
          points="15,25 22,32 35,18"
        />
      {/if}
    </svg>
  </div>
{/if}

<style>
  .progress-container {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1000;
    pointer-events: none;
    transition: opacity 0.3s ease, background-color 0.4s ease; /* Added background-color transition */
    border-radius: 50%; /* Prepare for filled state */
    width: 50px;
    height: 50px;
  }

  .progress-arc {
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    transition: stroke-dashoffset 0.1s linear;
  }

  /* --- NEW STYLES FOR THE COMPLETED STATE --- */
  .progress-container.completed {
    background-color: #333; /* The solid fill color */
  }

  /* Hide the track and make the arc fill the circle in the completed state */
  .progress-container.completed .track-circle,
  .progress-container.completed .progress-arc {
    stroke: #333; /* Match the background to create a solid look */
  }

  /* Style the checkmark */
  .checkmark {
    fill: none;
    stroke: white; /* White for contrast */
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    /* Animate the checkmark drawing itself */
    animation: draw-checkmark 0.4s ease-out forwards;
  }
  
  @keyframes draw-checkmark {
    to {
      stroke-dashoffset: 0;
    }
  }

  /* --- HIDE ON MOBILE / TABLET --- */
  @media (max-width: 768px) {
    .progress-container {
      display: none;
    }
  }
</style>