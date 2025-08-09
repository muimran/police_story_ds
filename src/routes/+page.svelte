<script>
  import PoliceMap from '$lib/components/PoliceMap.svelte';
  import BarChart from '$lib/components/BarChart.svelte';
  import Transfers from '$lib/components/Transfers.svelte';
  import OfficerTable from '$lib/components/OfficerTable.svelte';
  import Absconded from '$lib/components/Absconded.svelte';
  import TransfersExperiemnt from '$lib/components/TransfersExperiemnt.svelte';
  import Navbar from '$lib/components/NavBar.svelte';
  import Headline from '$lib/components/Headline.svelte'; // Your new component

  import { page } from '$app/stores';

  export let data;

  // Dynamic URL handling
  const canonicalURL = "https://www.thedailystar.net/surveillance-republic";
  const socialImageURL = "https://www.thedailystar.net/images/surveillance-og.jpg";
  const yourTwitterHandle = "@DailyStarNews";
  
  // Publication dates
  const pubDate = new Date('2025-08-01').toISOString();
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>Police Story | The Daily Star</title>
  <meta name="description" content="‘Surveillance Republic’ is a data-driven investigation by Muhammad Imran, published in The Daily Star. It explores how surveillance technology is reshaping governance and civil liberties in Bangladesh." />
  <meta name="author" content="Muhammad Imran" />
  <meta name="keywords" content="Surveillance Republic, Muhammad Imran, The Daily Star, data journalism, Bangladesh, surveillance, civil liberties, visual storytelling, investigative reporting" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:title" content="Surveillance Republic | The Daily Star" />
  <meta property="og:description" content="A data-rich visual investigation into surveillance in Bangladesh, by Muhammad Imran." />
  <meta property="og:image" content={socialImageURL} />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:type" content="article" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Surveillance Republic | The Daily Star" />
  <meta name="twitter:description" content="How surveillance technology is reshaping governance in Bangladesh. A data journalism piece by Muhammad Imran." />
  <meta name="twitter:image" content={socialImageURL} />
  <meta name="twitter:creator" content={yourTwitterHandle} />

  <!-- Canonical URL -->
  <link rel="canonical" href={canonicalURL} />

  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": "Surveillance Republic",
      "author": {
        "@type": "Person",
        "name": "Muhammad Imran",
        "url": "https://muhammadimran.me"
      },
      "publisher": {
        "@type": "Organization",
        "name": "The Daily Star",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.thedailystar.net/images/logo.png"
        }
      },
      "image": socialImageURL,
      "datePublished": pubDate,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalURL
      }
    }
  </script>
</svelte:head>

<style>
  .ds-body {
    max-width: 680px;
    margin: 2.5rem auto;
    font-family: 'Georgia', serif;
    font-size: 1.16rem;
    line-height: 1.5;
    color: #222;
    padding: 0 25px;
  }

  @media (max-width: 700px) {
    .ds-body {
      padding: 0 5vw;
    }
  }

  .ds-body p {
    margin: 1.2em 0;
  }

  /* Accessibility improvements */
  .skip-to-content {
    position: absolute;
    left: -9999px;
    z-index: 999;
    padding: 1em;
    background-color: #fff;
  }
  .skip-to-content:focus {
    left: 50%;
    transform: translateX(-50%);
  }
</style>

<Headline />
<!-- Accessibility Skip Link -->
<a href="#main-content" class="skip-to-content">Skip to main content</a>

<!-- ======================= MAIN CONTENT ======================= -->
<main id="main-content">
  <!-- Text above the Bar Chart -->

  
  <article class="ds-body">
    <p>Meanwhile over at NTMC...</p>
    <p>While Rab and the police were focusing on specific target-based surveillance, NTMC dedicated its efforts to building an Integrated Lawful Interception System, the ultimate manifestation of a surveillance state.</p>
    <p>By 2022, they had purchased all the components necessary to monitor and intercept the everyday communications of citizens, store that data centrally, and ensure access by various law enforcement agencies.</p>
    <p>The NTMC imported Tk 115 crores worth of surveillance equipment (1,154,214,166). The supplier which aided the NTMC in setting up the surveillance machine was US-based Yaana Technologies.</p>
  </article>

  <!-- Bar Chart Component -->
  <section class="ds-body" aria-label="Surveillance spending data visualization">
    <Absconded data={data.spending} />
  </section>

  <!-- Continue text after Bar Chart -->
  <article class="ds-body">
    <p>The Daily Star shared the list of components purchased by the NTMC between 2018 and 2022 with its in-house network specialists and using information about the components, they reconstructed the ILIS network.</p>
    <p>The first step of interception was recording and analysing data packets that travelled over a computer network. This involved gaining access to internet infrastructure, tapping undersea fibre optic cables, accessing satellite landing systems, intercepting core routes of Internet Service Providers, and forcing telecom companies to cooperate and share data.</p>
    <p>They purchased two units of Copper Tap Modules (10/100/1000), which were used to clone unencrypted ethernet traffic. The Tap module separated the incoming and outgoing traffic into two distinct streams and sent them to two separate monitoring ports.</p>
    <p>They also purchased a Passive Fibre Tap, which is a hardware that mirrors fiber optic traffic and captures high-speed data invisibly. This is then redirected to monitoring ports. For monitoring ports, they purchased six of the Yaana DeepProbe series. These DeepProbes receive internet traffic intercepted from taps and prepare it for inspection.</p>
    <p>The second step is the decryption of the encrypted traffic. For this, they purchased an SSL (secure sockets layer) decryption platform. SSL is a way to keep data safe when it travels between a browser and a website by locking it with encryption. This device intercepts SSL connections between devices and positions itself in the middle of the connection. When a sender sends traffic to a receiver, it intercepts the incoming traffic halfway, decrypts it, inspects it, reencrypts it, and passes it along to the unsuspecting receiver.</p>
  </article>


  <article class="ds-body">
    <p>The Daily Star shared the list of components purchased by the NTMC between 2018 and 2022 with its in-house network specialists and using information about the components, they reconstructed the ILIS network.</p>
    <p>The first step of interception was recording and analysing data packets that travelled over a computer network. This involved gaining access to internet infrastructure, tapping undersea fibre optic cables, accessing satellite landing systems, intercepting core routes of Internet Service Providers, and forcing telecom companies to cooperate and share data.</p>
    <p>They purchased two units of Copper Tap Modules (10/100/1000), which were used to clone unencrypted ethernet traffic. The Tap module separated the incoming and outgoing traffic into two distinct streams and sent them to two separate monitoring ports.</p>
    <p>They also purchased a Passive Fibre Tap, which is a hardware that mirrors fiber optic traffic and captures high-speed data invisibly. This is then redirected to monitoring ports. For monitoring ports, they purchased six of the Yaana DeepProbe series. These DeepProbes receive internet traffic intercepted from taps and prepare it for inspection.</p>
    <p>The second step is the decryption of the encrypted traffic. For this, they purchased an SSL (secure sockets layer) decryption platform. SSL is a way to keep data safe when it travels between a browser and a website by locking it with encryption. This device intercepts SSL connections between devices and positions itself in the middle of the connection. When a sender sends traffic to a receiver, it intercepts the incoming traffic halfway, decrypts it, inspects it, reencrypts it, and passes it along to the unsuspecting receiver.</p>
  </article>

    <Transfers />


  <article class="ds-body">
    <p>The Daily Star shared the list of components purchased by the NTMC between 2018 and 2022 with its in-house network specialists and using information about the components, they reconstructed the ILIS network.</p>
    <p>The first step of interception was recording and analysing data packets that travelled over a computer network. This involved gaining access to internet infrastructure, tapping undersea fibre optic cables, accessing satellite landing systems, intercepting core routes of Internet Service Providers, and forcing telecom companies to cooperate and share data.</p>
    <p>They purchased two units of Copper Tap Modules (10/100/1000), which were used to clone unencrypted ethernet traffic. The Tap module separated the incoming and outgoing traffic into two distinct streams and sent them to two separate monitoring ports.</p>
    <p>They also purchased a Passive Fibre Tap, which is a hardware that mirrors fiber optic traffic and captures high-speed data invisibly. This is then redirected to monitoring ports. For monitoring ports, they purchased six of the Yaana DeepProbe series. These DeepProbes receive internet traffic intercepted from taps and prepare it for inspection.</p>
    <p>The second step is the decryption of the encrypted traffic. For this, they purchased an SSL (secure sockets layer) decryption platform. SSL is a way to keep data safe when it travels between a browser and a website by locking it with encryption. This device intercepts SSL connections between devices and positions itself in the middle of the connection. When a sender sends traffic to a receiver, it intercepts the incoming traffic halfway, decrypts it, inspects it, reencrypts it, and passes it along to the unsuspecting receiver.</p>
  </article>
  
  <article class="ds-body">
    <OfficerTable />
  </article>

  <article class="ds-body">
    <TransfersExperiemnt />
  </article>


  <!-- Text below the scrolly -->
  <article class="ds-body">
    <p>The third step is routing content to NTMC, and for this, they purchased two specialised ethernet switches and a networking device called an aggregation router.</p>
    <p>The fourth step is deep packet inspection, which involves examining the content and user behavior. To do that NTMC purchased five DeepProbe monitor ports, which would perform content inspection and identify data like which app is being used for sending the internet traffic (such as Signal, WhatsApp, or Messenger), the time when the traffic are being sent, how much data is being transferred, who is communicating with whom, their IP (internet protocol) addresses, whether the communication is a voice or video call, file transfer, or chat, and the frequency and duration of those interactions.</p>
  </article>

  <!-- Map component -->
  <section aria-label="Surveillance locations map">
    <PoliceMap points={data.points} />
  </section>

  <!-- Final text section -->
  <article class="ds-body">
    <p>It can not, however, breach end-to-end encryption, which is a feature of apps like Signal, so it could not peek into the messages themselves, unless the device itself had spyware like Pegasus installed.</p>
  </article>
</main>


 
