<!-- src/lib/components/Headline.svelte -->
<script>
  // --- Component Props ---
  export let t; // Receives the 'headline' text object
  export let locale; // Receives the 'locale' for date formatting
  export let publishedDate;
  export let updatedDate;

  // --- MODIFIED LOGIC ---
  // This function now intelligently chooses the right formatter.
  const formatDate = (date) => {
    if (!date) return '';

    // If a custom 'formatDate' function exists in our translation object (e.g., in bn.headline), use it.
    if (t.formatDate && typeof t.formatDate === 'function') {
      return t.formatDate(date);
    }

    // Otherwise, use the default browser-based formatter (for English).
    return date.toLocaleDateString(locale || 'en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
  };

  // Reactive declarations now use our new, smarter formatDate function
  $: formattedPublished = formatDate(publishedDate);
  $: formattedUpdated = formatDate(updatedDate);
</script>

<!-- THE REST OF YOUR COMPONENT REMAINS EXACTLY THE SAME -->
<div class="headline-container">
  <h1 class="article-headline">
      <span class="line-1">{t.line1}</span>
      <span class="line-2">{t.line2}</span>
      <span class="line-3">{t.line3}</span>
  </h1>

  <div class="date-info">
      {#if formattedPublished}
          <p>
              <span class="date-label">{t.datePublished}</span>
              <time datetime={publishedDate.toISOString()}>
                  {formattedPublished}
              </time>
          </p>
      {/if}
      {#if updatedDate && formattedUpdated !== formattedPublished}
          <p>
              <span class="date-label">{t.dateUpdated}</span>
              <time datetime={updatedDate.toISOString()}>
                  {formattedUpdated}
              </time>
          </p>
      {/if}
  </div>

  <div class="byline">
      <p><span class="credit-label">{t.creditReporting}</span>{t.nameReporting}</p>
      <p><span class="credit-label">{t.creditDataViz}</span>{t.nameDataViz}</p>
      <p><span class="credit-label">{t.creditGraphics}</span>{t.nameGraphics}</p>
      <p><span class="credit-label">{t.creditEditing}</span>{t.nameEditing}</p>
  </div>
</div>

<!-- YOUR STYLES REMAIN UNCHANGED -->
<style>
  :root {
    --headline-red: #B91C1C;
    --headline-dark: #1F2937;
    --byline-gray: #4B5563;
  }
  .headline-container { max-width: 680px; margin: 0 auto; padding: 4rem 26px 0 26px; text-align: left; }
  .article-headline { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-weight: 700; line-height: 1.1; margin: 0 0 2rem 0; }
  .article-headline span { display: block; }
  .line-1 { color: var(--headline-red); font-size: 3rem; font-weight: 600; margin-bottom: 0.5rem; }
  .line-2 { color: var(--headline-dark); font-size: 4rem; font-weight: 800; white-space: nowrap; }
  .line-3 { color: var(--headline-dark); font-size: 2rem; font-weight: 600; margin-top: 0.5rem; white-space: nowrap; }
  .standfirst-text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 1.25rem; color: var(--headline-dark); line-height: 1.6; margin: 0 0 2rem 0; }
  .date-info { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 0.9rem; color: var(--byline-gray); margin-bottom: 2rem; line-height: 1.6; }
  .date-info p { margin: 0 0 0.25em 0; }
  .date-label { font-weight: 600; color: var(--headline-dark); margin-right: 0.5em; }
  .byline { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 0.9rem; font-weight: 400; color: var(--byline-gray); line-height: 1.6; padding-bottom: 4rem; }
  .byline p { margin: 0 0 0.25em 0; }
  .credit-label { font-weight: 600; color: var(--headline-dark); margin-right: 0.5em; }
  @media (max-width: 700px) {
    .headline-container { padding: 3rem 5vw 0 5vw; }
    .byline { padding-bottom: 3rem; }
    .line-1 { font-size: 1.8rem; }
    .line-2 { font-size: 8vw; white-space: normal; }
    .line-3 { font-size: 5.2vw; white-space: normal; }
    .standfirst-text { font-size: 1.1rem; }
  }
</style>