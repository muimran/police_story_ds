<script>
  // Import components
  import PoliceMap from '$lib/components/PoliceMap.svelte';
  import Transfers from '$lib/components/Transfers.svelte';
  import OfficerTable from '$lib/components/OfficerTable.svelte';
  import Absconded from '$lib/components/Absconded.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Headline from '$lib/components/Headline.svelte';
  import { base } from '$app/paths'; 
  import { slide } from 'svelte/transition';
  import { en as t } from '$lib/translations.js';

  let methodologyOpen = false;
  let documentsOpen = false;

  const contentChunks = t.articleContent.reduce((acc, block) => {
    if (block.type === 'component') {
      acc.push(block);
    } else {
      const lastChunk = acc[acc.length - 1];
      if (lastChunk && lastChunk.type === 'text') {
        lastChunk.items.push(block);
      } else {
        acc.push({ type: 'text', items: [block] });
      }
    }
    return acc;
  }, []);

  const canonicalURL = "https://policestory.thedailystar.net/";
  const socialImageURL = "https://policestory.thedailystar.net/images/social.jpeg";
  const yourTwitterHandle = "@dailystarnews";
  const pubDate = new Date('2025-08-14').toISOString();
</script>

<svelte:head>
  <title>{t.meta.title}</title>
  <meta name="description" content={t.meta.description} />
  <meta name="author" content={t.meta.author} />
  <meta name="keywords" content={t.meta.keywords} />
  <meta property="og:title" content={t.meta.title} />
  <meta property="og:description" content={t.meta.description} />
  <meta property="og:type" content="article" />
  <meta property="og:image" content={socialImageURL} />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={t.meta.title} />
  <meta name="twitter:description" content={t.meta.description} />
  <meta name="twitter:image" content={socialImageURL} />
  <meta name="twitter:creator" content={yourTwitterHandle} />
  <link rel="canonical" href="https://policestory.thedailystar.net/" />
  <link rel="alternate" hreflang="en" href="https://policestory.thedailystar.net/" />
  <link rel="alternate" hreflang="bn" href="https://policestory.thedailystar.net/bn/" />
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": t.meta.ldJsonHeadline,
      "author": { "@type": "Person", "name": "Muhammad Imran", "url": "https://muhammadimran.com" },
      "publisher": { "@type": "Organization", "name": "The Daily Star", "logo": { "@type": "ImageObject", "url": "https://tds-images.thedailystar.net/sites/all/themes/sloth/logo.svg" }},
      "image": socialImageURL,
      "datePublished": pubDate,
      "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalURL }
    }
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-DMC5FP8XF4"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-DMC5FP8XF4');
  </script>
</svelte:head>

<style>
  .article-text { max-width: 680px; margin: 2.5rem auto; font-family: 'Georgia', serif; font-size: 1.16rem; line-height: 1.5; color: #222; padding: 0 25px; }
  .article-start p:first-of-type::first-letter { font-size: 5.1em; font-weight: bold; color: #222; float: left; line-height: 0.8; padding-right: 8px; padding-top: 4px; }
  .article-quote { margin: 2.5em 0; padding-left: 1.5em; border-left: 3px solid #ccc; font-style: italic; font-size: 1.25rem; line-height: 1.6; color: #444; }
  .article-quote cite { display: block; text-align: right; margin-top: 0.8em; font-style: normal; font-size: 1rem; color: #666; }
  .credits-section { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 0.95rem; color: #555; line-height: 1.6; margin-top: 3.5rem; margin-bottom: -1rem; }
  .methodology-headline { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 1.4rem; font-weight: 500; color: #333; cursor: pointer; text-align: center; letter-spacing: 0.5px; user-select: none; display: flex; justify-content: center; align-items: center; gap: 0.6em; }
  .arrow { width: 10px; height: 10px; border-left: 2px solid #333; border-bottom: 2px solid #333; transform: rotate(-45deg); transition: transform 0.3s ease-out; }
  .methodology-headline.open .arrow { transform: rotate(135deg); margin-top: -5px; }
  .methodology-content { margin-top: 1.5rem; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 0.95rem; line-height: 1.6; color: #555; }
  .documents-section { background-color: #f7f7f7; border-top: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; margin-top: 2.5rem; margin-bottom: 2.5rem; padding: 1.5rem 0; }
  .document-figure { margin: 1.5rem 0; }
  .document-figure img { width: 100%; height: auto; display: block; border: 1px solid #ddd; }
  .document-caption { font-size: 0.85rem; color: #666; font-style: italic; text-align: center; margin-top: 0.5em; line-height: 1.4; padding: 0 1rem; }
  .methodology-section { border-top: 1px solid #e0e0e0; margin-top: 4rem; padding-top: 2rem; }
  .audio-player-wrapper { margin-top: 1.5rem; }
</style>

<Hero />
<Headline t={t.headline} locale={t.locale} publishedDate={new Date('Wed Aug 14, 2025 12:06 PM')} />

{#each contentChunks as chunk, i}
  {#if chunk.type === 'component'}
    <!-- Handle each component type separately -->
    {#if chunk.name === 'PoliceMap'}
      <PoliceMap 
        texts={t.policeMap} 
        locale={t.locale} 
        mapLanguage={t.locale.substring(0, 2)} 
        mapAccessToken={t.mapboxAccessToken}
      />
    {/if}

    {#if chunk.name === 'OfficerTable'}
      <div class="article-text">
        <OfficerTable t={t.officerTable} />
      </div>
    {/if}

    {#if chunk.name === 'Absconded'}
      <div class="article-text">
        <Absconded t={t.absconded} />
      </div>
    {/if}

    {#if chunk.name === 'Transfers'}
      <div class="article-text">
        <Transfers t={t.transfers} />
      </div>
    {/if}

    {#if chunk.name === 'SourceDocuments'}
      <div class="article-text">
        <div class="documents-section">
          <div class="methodology-headline" class:open={documentsOpen} on:click={() => (documentsOpen = !documentsOpen)}>
            <span>{t.documentsSection.title}</span>
            <div class="arrow"></div>
          </div>
          {#if documentsOpen}
            <div class="methodology-content" transition:slide>
              <figure class="document-figure">
                <img src="{base}/images/doc1.png" alt={t.documentsSection.alt_texts[0]} />
                <figcaption class="document-caption">{t.documentsSection.captions[0]}</figcaption>
              </figure>
              <figure class="document-figure">
                <img src="{base}/images/doc2.png" alt={t.documentsSection.alt_texts[1]} />
                <figcaption class="document-caption">{t.documentsSection.captions[1]}</figcaption>
              </figure>
            </div>
          {/if}
        </div>
      </div>
    {/if}

    {#if chunk.name === 'AudioSection'}
      <div class="article-text">
        <div>
          <h2>{t.audioSection.heading}</h2>
          <p>{t.audioSection.text}</p>
          <div class="audio-player-wrapper">
            {@html t.audioSection.embedCode}
          </div>
        </div>
      </div>
    {/if}

  {:else if chunk.type === 'text'}
    <div class="article-text {i === 0 ? 'article-start' : ''}">
      {#each chunk.items as block}
        {#if block.type === 'p'} <p>{block.content}</p>
        {:else if block.type === 'h2'} <h2>{block.content}</h2>
        {:else if block.type === 'blockquote'}
          <blockquote class="article-quote">
            {block.text}
            <cite>— {block.cite}</cite>
          </blockquote>
        {/if}
      {/each}
    </div>
  {/if}
{/each}

<div class="article-text">
  <div class="credits-section">
      <p>{@html t.credits.line}</p>
  </div>
</div>

<div class="article-text">
  <div class="methodology-section">
    <div class="methodology-headline" class:open={methodologyOpen} on:click={() => (methodologyOpen = !methodologyOpen)}>
      <span>{t.methodologySection.title}</span>
      <div class="arrow"></div>
    </div>
    {#if methodologyOpen}
      <div class="methodology-content" transition:slide>
        {#each t.methodologySection.content as paragraph}
          <p>{paragraph}</p>
        {/each}
      </div>
    {/if}
  </div>
</div>
<br>