<!-- src/lib/components/MapOverlay.svelte -->
<script>
    export let color = 'transparent'; // The color of the overlay
</script>

{#if color && color !== 'transparent'}
    <div class="map-overlay" style="background-color: {color};"></div>
{/if}

<style>
    .map-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2; /* ABOVE the gradients */
        pointer-events: none; /* Allows clicks/drags to pass through to the map */
        transition: background-color 0.5s ease-in-out; /* Smooth fade effect */
    }
</style>