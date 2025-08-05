<script>
  // 1. Import the data
  import { commandResponsibilityData } from '$lib/CommandResponsibility.js';

  // 2. Use Svelte 5's $state for reactive data
  let data = $state(commandResponsibilityData);
  let sortKey = $state('name');
  let sortDirection = $state('asc');
  
  // NEW: State for the "Show More" functionality
  let showAll = $state(false);
  const initialVisibleRows = 5; // How many rows to show initially

  // NEW: A derived value that automatically computes the visible data
  // It shows either the initial slice or the full data array based on `showAll`
  let visibleData = $derived(showAll ? data : data.slice(0, initialVisibleRows));


  // 3. The sorting logic (unchanged, it correctly sorts the full `data` array)
  function sortBy(key) {
    if (sortKey === key) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortKey = key;
        sortDirection = 'asc';
    }

    data.sort((a, b) => {
        const valA = a[key];
        const valB = b[key];
        
        // Skip sorting if either value is "Unknown"
        if (valA === 'Unknown' || valB === 'Unknown') return 0;
        
        // Special handling for date sorting
        if (key === 'date') {
            // Parse dates in dd/mm/yy format
            const parseDate = (dateStr) => {
                const [day, month, year] = dateStr.split('/').map(Number);
                return new Date(2000 + year, month - 1, day);
            };
            
            const dateA = parseDate(valA);
            const dateB = parseDate(valB);
            
            return sortDirection === 'asc' 
                ? dateA - dateB 
                : dateB - dateA;
        }
        
        // Default string comparison for other columns
        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
}

  // 4. A helper function to show a sort indicator
  function getSortIndicator(key) {
    if (sortKey !== key) return '';
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  }
</script>

<!-- 5. The HTML markup for your table (No changes needed here) -->
<div class="table-wrapper">
  <table>
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
      <!-- The #each block now iterates over the `visibleData` derived state -->
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

  <!-- NEW: "Show More" button container, positioned to the right -->
  {#if data.length > initialVisibleRows}
    <div class="show-more-container">
      <button class="show-more-button" on:click={() => showAll = !showAll}>
        {#if showAll}
          Show Less
        {:else}
          + Show More ({data.length - initialVisibleRows} more)
        {/if}
      </button>
    </div>
  {/if}
</div>

<!-- 6. The completely revamped styling -->

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
  
  /* --- Header Styling --- */
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
      top: 60px; /* Or better: top: var(--header-height); */

  background: white; 
  z-index: 1;
    
    /* === ADD THIS FOR THE STICKY HEADER === */
    position: sticky;
    top: 0;
    background: white; /* Or your page's background color */
    z-index: 1; /* Ensures the header stays on top of the body content */
  }


  th span {
    display: inline-block;
    width: 1em;
  }
  
  /* --- Body Styling --- */
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
  
  /* --- "Show More" Button Styling --- */
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