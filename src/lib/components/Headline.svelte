<script>
  // --- SVELTE SCRIPT REMAINS THE SAME ---

  /**
   * The date the article was originally published.
   * @type {Date}
   */
  export let publishedDate;

  /**
   * The date the article was last updated. This is optional.
   * @type {Date | undefined}
   */
  export let updatedDate;

  // A helper function to format dates into a readable string like "July 22, 2024"
  const formatDate = (date) => {
  if (!date) return '';

  // Add the 'weekday' option to the options object
  return date.toLocaleDateString('en-US', {
      weekday: 'long', // This is the new addition
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });
};

  // Reactive declarations to automatically format dates when the props change
  $: formattedPublished = formatDate(publishedDate);
  $: formattedUpdated = formatDate(updatedDate);

</script>

<div class="headline-container">
  <h1 class="article-headline">
      <span class="line-1">July Uprising</span>
      <span class="line-2">Commanders of crackdown</span>
      <span class="line-3">Police leadership during July uprising uncovered</span>
  </h1>
  
  

  <p class="standfirst-text">

  </p>

  <!-- ADDED: Date information block -->
  <div class="date-info">
      {#if formattedPublished}
          <p>
              <span class="date-label">Published:</span>
              <!-- The <time> tag is semantically correct for dates and good for SEO/accessibility -->
              <time datetime={publishedDate.toISOString()}>
                  {formattedPublished}
              </time>
          </p>
      {/if}
      <!-- Only show the updated date if it exists and is different from the published date -->
      {#if formattedUpdated && formattedUpdated !== formattedPublished}
          <p>
              <span class="date-label">Updated:</span>
              <time datetime={updatedDate.toISOString()}>
                  {updatedDate}
              </time>
          </p>
      {/if}
  </div>

  <div class="byline">
      <p><span class="credit-label">Reporting:</span>Keero Adhnan Ahmed</p>
      <p><span class="credit-label">Data Visualisation and Map:</span>Muhammad Imran</p>
      <p><span class="credit-label">Graphics:</span>Anwar Sohel</p>
      <p><span class="credit-label">Editing:</span>Martin Swapan Pandey</p>
  </div>
</div>


<!-- REVISED STYLE BLOCK -->
<style>
  :root {
    --headline-red: #B91C1C;
    --headline-dark: #1F2937;
    --byline-gray: #4B5563;
  }

  .headline-container {
    max-width: 680px;
    margin: 0 auto;
    padding: 4rem 26px 0 26px;
    text-align: left;
  }

  .article-headline {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-weight: 700;
    line-height: 1.1;
    margin: 0 0 2rem 0;
  }

  .article-headline span {
    display: block;
  }
  
  .line-1 {
    color: var(--headline-red);
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .line-2 {
    color: var(--headline-dark);
    font-size: 4rem;
    font-weight: 800;
    white-space: nowrap; /* Keep this to prevent wrapping */
  }

  .line-3 {
    color: var(--headline-dark);
    font-size: 2rem;
    font-weight: 600;
    margin-top: 0.5rem;
    white-space: nowrap; /* Keep this to prevent wrapping */
  }

  .standfirst-text {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 1.25rem;
    color: var(--headline-dark);
    line-height: 1.6;
    margin: 0 0 2rem 0;
  }

  .date-info {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 0.9rem;
    color: var(--byline-gray);
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .date-info p {
    margin: 0 0 0.25em 0;
  }

  .date-label {
    font-weight: 600;
    color: var(--headline-dark);
    margin-right: 0.5em;
  }

  .byline {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 0.9rem;
    font-weight: 400;
    color: var(--byline-gray);
    line-height: 1.6;
    padding-bottom: 4rem;
  }

  .byline p {
    margin: 0 0 0.25em 0;
  }

  .credit-label {
    font-weight: 600;
    color: var(--headline-dark);
    margin-right: 0.5em;
  }

  /* --- MOBILE STYLES (REVISED) --- */
  @media (max-width: 700px) {
    .headline-container {
      padding: 3rem 5vw 0 5vw; 
    }
    .byline {
      padding-bottom: 3rem;
    }

    /* 1. Made slightly smaller on mobile */
    .line-1 { 
      font-size: 1.8rem; 
    }
    
    /* 2. Made responsive to screen width to fit on one line */
    .line-2 {
      font-size: 8vw;
      white-space: normal; /* FIX: Allow this line to wrap on mobile */
    }

    /* 3. Also made responsive, and smaller than line-2 because it's longer */
    .line-3 {
      font-size: 5.2vw;
      white-space: normal; /* FIX: Allow this line to wrap, 'wrap' is not a valid value */
    }
    
    .standfirst-text { 
      font-size: 1.1rem; 
    }
  }
</style>