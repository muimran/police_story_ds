<script>
  // 1. Imports
  import { tick } from 'svelte';
  import { commandResponsibilityData } from '$lib/CommandResponsibility.js';

  // 2. State variables
  let data = $state(commandResponsibilityData);
  
  // DEFAULT SORT: The table will now load sorted by 'area' in ascending order.
  let sortKey = $state('area'); 
  let sortDirection = $state('asc');
  
  // State for the "Show More" functionality
  let showAll = $state(false);
  const initialVisibleRows = 5;

  // A variable to hold the HTML table element for height measurements
  let tableElement;

  // A derived value that automatically computes the visible data
  let visibleData = $derived(showAll ? data : data.slice(0, initialVisibleRows));

  // 3. Sorting Logic in an $effect
  // This runs on load and whenever sortKey or sortDirection changes.
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
            return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        }
        
        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
  });

  // 4. Function to update sort state when a header is clicked
  function sortBy(key) {
    if (sortKey === key) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortKey = key;
        sortDirection = 'asc';
    }
  }

  // 5. Helper function for sort indicator arrow
  function getSortIndicator(key) {
    if (sortKey !== key) return '';
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  }

  // 6. SMOOTH SCROLL: Logic to handle the "Show More/Less" click
  async function toggleShowAll() {
    // This special logic only runs when SHRINKING the table ("Show Less")
    if (showAll && tableElement) {
      // Measure height before the change
      const heightBefore = tableElement.offsetHeight;
      
      // Trigger the state change to shrink the table
      showAll = false;
      
      // Wait for the DOM to update
      await tick();
      
      // Measure the new, smaller height
      const heightAfter = tableElement.offsetHeight;
      
      // Calculate the difference
      const heightDifference = heightBefore - heightAfter;
      
      // Instantly scroll the window UP by that exact amount
      window.scrollBy({ top: -heightDifference, behavior: 'auto' });

    } else {
      // For showing more, just toggle the state normally
      showAll = !showAll;
    }
  }
</script>

<!-- 7. The HTML Markup -->
<div class="table-wrapper">
  <!-- Bind the table element to our variable -->
  <table bind:this={tableElement}>
    <thead>
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
          <td>{row.status}</td>
          <td>{row.date}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <!-- "Show More" button container -->
  {#if data.length > initialVisibleRows}
    <div class="show-more-container">
      <!-- The button now calls our new toggleShowAll function -->
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

<!-- 8. The Styling (unchanged) -->
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

  th,
  td {
    padding: 6px 12px; 
    text-align: left;
    vertical-align: middle; 
    white-space: normal;
    line-height: 1.3; 
  }
  
  th {
    border-top: 1px solid #333;
    border-bottom: 2px solid #333;
    color: #555; 
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    user-select: none;
    height: 40px;
    position: sticky;
    top: 0;
    background: white;
    z-index: 1;
  }

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
</style>