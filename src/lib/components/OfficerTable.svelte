<script>
  // --- CHANGE 1: ADD onMount TO IMPORTS ---
  import { tick, onMount } from 'svelte';
  import { commandResponsibilityData } from '$lib/CommandResponsibility.js';

  // 2. State variables
  let data = $state(commandResponsibilityData);
  let sortKey = $state('area'); 
  let sortDirection = $state('asc');
  let showAll = $state(false);
  const initialVisibleRows = 10;
  let tableElement;
  let visibleData = $derived(showAll ? data : data.slice(0, initialVisibleRows));
  
  // --- CHANGE 2: ADD STATE & ELEMENT BINDING FOR THE STICKY HEADER ---
  let headerSentinel; // This will be bound to our invisible sentinel div
  let headerIsStuck = $state(false); // This will track if the header is sticky

  // 3. Sorting Logic
  $effect(() => {
    data.sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (valA === 'Unknown' || valB === 'Unknown') return 0;
        if (sortKey === 'date') {
            const parseDate = (dateStr) => {
                const [day, month, year] = dateStr.split('/').map(Number);
                return new Date(2000 + year, month - 1, day);
            };
            const dateA = parseDate(valA);
            const dateB = parseDate(valB);
            return sortDirection === 'asc' ? dateA - dateB : dateB - a;
        }
        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
  });

  // 4. Function to update sort state
  function sortBy(key) {
    if (sortKey === key) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortKey = key;
        sortDirection = 'asc';
    }
  }

  // 5. Helper function for sort indicator
  function getSortIndicator(key) {
    if (sortKey !== key) return '';
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  }

  function getStatusClass(status) {
    if (!status) return ''; 
    const lowerCaseStatus = status.toLowerCase();
    if (lowerCaseStatus.includes('arrested')) return 'status-arrested';
    if (lowerCaseStatus.includes('absconded')) return 'status-absconded';
    return '';
  }

  // 6. Logic to handle "Show More/Less"
  async function toggleShowAll() {
    if (showAll && tableElement) {
      const heightBefore = tableElement.offsetHeight;
      showAll = false;
      await tick();
      const heightAfter = tableElement.offsetHeight;
      const heightDifference = heightBefore - heightAfter;
      window.scrollBy({ top: -heightDifference, behavior: 'auto' });
    } else {
      showAll = !showAll;
    }
  }

  // --- CHANGE 3: ADD onMount HOOK WITH INTERSECTION OBSERVER ---
  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the sentinel is NOT intersecting (i.e., it's scrolled out of view),
        // the header is stuck. We update our state variable accordingly.
        headerIsStuck = !entry.isIntersecting;
      },
      // The rootMargin of '-1px' ensures the change happens the moment
      // the sentinel is fully off-screen.
      { rootMargin: '-1px 0px 0px 0px', threshold: 0 }
    );

    // Start observing the sentinel element.
    if (headerSentinel) {
      observer.observe(headerSentinel);
    }
    
    // Cleanup function to stop observing when the component is destroyed.
    return () => {
      if (headerSentinel) {
        observer.unobserve(headerSentinel);
      }
    };
  });
</script>

<!-- 7. The HTML Markup -->
<div class="table-wrapper">
  
  <!-- CHANGE 4: ADD THE SENTINEL DIV & BIND IT -->
  <div class="header-sentinel" bind:this={headerSentinel}></div>
  
  <table bind:this={tableElement}>
    <!-- CHANGE 5: APPLY THE CONDITIONAL CLASS TO THEAD -->
    <thead class:is-stuck={headerIsStuck}>
      <tr>
        <th on:click={() => sortBy('name')}>Name<span>{getSortIndicator('name')}</span></th>
        <th on:click={() => sortBy('area')}>Area<span>{getSortIndicator('area')}</span></th>
        <th on:click={() => sortBy('rank_n_zone')}>Rank & Zone<span>{getSortIndicator('rank_n_zone')}</span></th>
        <th on:click={() => sortBy('status')}>Status<span>{getSortIndicator('status')}</span></th>
        <th on:click={() => sortBy('date')}>Date<span>{getSortIndicator('date')}</span></th>
      </tr>
    </thead>
    <tbody>
      {#each visibleData as row (row.id)}
        <tr>
          <td>{row.name}</td>
          <td>{row.area}</td>
          <td>{row.rank_n_zone}</td>
          <td class="{getStatusClass(row.status)}">
            {row.status}
          </td>
          <td>{row.date}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  {#if data.length > initialVisibleRows}
    <div class="show-more-container">
      <button class="show-more-button" on:click={toggleShowAll}>
        {#if showAll}
          Show Less
        {:else}
          + Show More ({data.length - initialVisibleRows} more)
        {/if}
      </button>
    </div>
  {/if}
</div>

<!-- 8. The Styling -->
<style>
  .table-wrapper {
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  table {
    width: 100%;
    border-collapse: collapse; 
    border-spacing: 0;
  }
  th, td {
    padding: 6px 12px; 
    text-align: left;
    vertical-align: middle; 
    white-space: normal;
    line-height: 1.3; 
  }

  /* --- CHANGE 6: UPDATE THE STYLES FOR TH --- */

  /* This is the sentinel element. It needs to be positioned correctly
     but should not take up any visible space. */
  .header-sentinel {
    height: 1px; /* Small height so it doesn't affect layout */
  }

  /* This is now the INITIAL state of the header (not stuck) */
  th {
    border-top: 1px solid #333;
    border-bottom: 2px solid #333;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    user-select: none;
    height: 40px;
    position: sticky;
    top: 0; /* Important for the sticky effect */
    z-index: 1;

    /* Initial state styles */
    background: #4a4a4a; /* Gray background */
    color: white;       /* White text */

    /* Add a smooth transition for the color change */
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }
  
  /* This is the STICKY state of the header. We override the colors. */
  thead.is-stuck th {
    background: white; /* White background */
    color: #555;      /* Black text (as before) */
  }

  /* The rest of the styles remain the same */

  th span {
    display: inline-block;
    width: 1em;
  }
  tbody tr {
    border-bottom: 1px solid #e5e5e5;
  }
  tbody td:first-child {
    font-weight: 600;
    color: #000;
  }
  td {
    font-size: 13px; 
    color: #333;
  }
  .show-more-container {
    text-align: right; 
    padding: 8px 0;
  }
  .show-more-button {
    background: none;
    border: none;
    padding: 6px 8px; 
    color: #555;
    font-weight: 700;
    font-size: 10px; 
    text-transform: uppercase;
    cursor: pointer;
    letter-spacing: 0.5px;
  }
  .show-more-button:hover {
    color: #000;
  }

  .status-arrested {
    background-color: #ffebee;
    color: #c62828;
    font-weight: 600;
  }
  .status-absconded {
    background-color: #fff3e0;
    color: #e65100;
    font-weight: 600;
  }
</style>