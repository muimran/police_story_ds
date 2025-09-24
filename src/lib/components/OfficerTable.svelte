<script>
  import { tick, onMount } from 'svelte';

  // Use the modern $props() rune to declare component properties
  let { t } = $props();

  // Get data from the prop
  let data = $state(t.data);
  let sortKey = $state('area'); 
  let sortDirection = $state('asc');
  let showAll = $state(false);
  const initialVisibleRows = 10;
  let tableElement;
  let visibleData = $derived(showAll ? data : data.slice(0, initialVisibleRows));
  
  let headerSentinel;
  let headerIsStuck = $state(false);

  $effect(() => {
    // This robust function parses dates from a standard 'DD/MM/YY' string.
    // It relies on the source data having English numerals in the 'date' field.
    const parseDate = (dateStr) => {
      if (!dateStr || typeof dateStr !== 'string' || dateStr.toLowerCase().includes('unknown')) {
        return new Date(8640000000000000); // A very large date to sort unknown values to the bottom.
      }
      const [day, month, year] = dateStr.split('/').map(Number);
      if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return new Date(8640000000000000); // Also handles malformed dates.
      }
      const fullYear = year < 50 ? 2000 + year : 1900 + year; 
      return new Date(fullYear, month - 1, day);
    };

    data.sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (sortKey === 'date') {
        const dateA = parseDate(valA);
        const dateB = parseDate(valB);
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }

      // Standard string comparison for all other columns
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      
      // Fallback for non-string, non-date values (though not expected in this data)
      return (valA < valB ? -1 : 1) * (sortDirection === 'asc' ? 1 : -1);
    });
  });

  function sortBy(key) {
    if (sortKey === key) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey = key;
      sortDirection = 'asc';
    }
  }

  function getSortIndicator(key) {
    if (sortKey !== key) return ' ';
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  }

  function getStatusClass(status) {
    if (!status) return ''; 
    const lowerCaseStatus = status.toLowerCase();
    // Check for both English and Bengali keywords for styling
    if (lowerCaseStatus.includes('arrested') || lowerCaseStatus.includes('গ্রেপ্তার')) return 'status-arrested';
    if (lowerCaseStatus.includes('absconded') || lowerCaseStatus.includes('পলাতক')) return 'status-absconded';
    return '';
  }

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

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        headerIsStuck = !entry.isIntersecting;
      },
      { rootMargin: '-1px 0px 0px 0px', threshold: 0 }
    );

    if (headerSentinel) {
      observer.observe(headerSentinel);
    }
    
    return () => {
      if (headerSentinel) {
        observer.unobserve(headerSentinel);
      }
    };
  });
</script>

<div class="table-wrapper">
  
  <div class="header-sentinel" bind:this={headerSentinel}></div>
  
  <table bind:this={tableElement}>
    <thead class:is-stuck={headerIsStuck}>
      <tr>
        <th class="col-name" on:click={() => sortBy('name')}>{t.uiText.nameHeader}<span class="sort-indicator">{getSortIndicator('name')}</span></th>
        <th class="col-area" on:click={() => sortBy('area')}>{t.uiText.areaHeader}<span class="sort-indicator">{getSortIndicator('area')}</span></th>
        <th class="col-rank" on:click={() => sortBy('rank_n_zone')}>{t.uiText.rankHeader}<span class="sort-indicator">{getSortIndicator('rank_n_zone')}</span></th>
        <th class="col-status" on:click={() => sortBy('status')}>{t.uiText.statusHeader}<span class="sort-indicator">{getSortIndicator('status')}</span></th>
        <th class="col-date" on:click={() => sortBy('date')}>{t.uiText.dateHeader}<span class="sort-indicator">{getSortIndicator('date')}</span></th>
      </tr>
    </thead>
    <tbody>
      {#each visibleData as row (row.id)}
        <tr>
          <td>{row.name}</td>
          <td>{row.area}</td>
          <td>{row.rank_n_zone}</td>
          <td class="{getStatusClass(row.status)}">
            {@html row.status.replace(/\n/g, '<br/>')}
          </td>
          <!-- Show the display version if it exists, otherwise fall back to the raw date -->
          <td>{row.date_display || row.date}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  {#if data.length > initialVisibleRows}
    <div class="show-more-container">
      <button class="show-more-button" on:click={toggleShowAll}>
        {#if showAll}
          {t.uiText.showLess}
        {:else}
          {t.uiText.showMorePrefix} ({(data.length - initialVisibleRows).toLocaleString(t.locale || 'en-US')}) {t.uiText.showMoreSuffix}
        {/if}
      </button>
    </div>
  {/if}

  <div class="table-caption">
    {t.uiText.caption}
  </div>
</div>

<style>
  .table-wrapper {
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  table {
    width: 100%;
    border-collapse: collapse; 
    border-spacing: 0;
    table-layout: fixed; 
  }
  th, td {
    padding: 6px 12px; 
    text-align: left;
    vertical-align: middle; 
    white-space: normal;
    line-height: 1.3; 
    overflow-wrap: break-word; 
  }

  .header-sentinel {
    height: 1px;
  }

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
    top: 0;
    z-index: 1;
    background: #4a4a4a;
    color: white;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }
  
  thead.is-stuck th {
    background: white;
    color: #555;
  }

  th.col-name { width: 25%; }
  th.col-area { width: 12%; }
  th.col-rank { width: 26%; }
  th.col-status { width: 25%; }
  th.col-date { width: 12%; }

  .sort-indicator {
    display: inline-block;
    width: 1.5em; /* Give it a bit more space */
    text-align: left;
    color: #999; /* Make indicators less prominent */
    opacity: 0; /* Hide by default */
    transition: opacity 0.2s;
  }
  th:hover .sort-indicator,
  th .sort-indicator:not(:empty) { /* Show on hover or when active */
    opacity: 1;
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

  .table-caption {
    padding: 12px;
    font-size: 12px;
    line-height: 1.4;
    color: #555;
    font-style: italic;
    text-align: left;
  }

  .show-more-container {
    text-align: right; 
    padding: 8px 0;
    border-top: 1px solid #e5e5e5;
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

  @media (max-width: 600px) {
    th, td {
      padding-left: 6px;
      padding-right: 6px;
    }
    th {
      font-size: 9px;
    }
    td {
      font-size: 11px;
    }
  }

</style>