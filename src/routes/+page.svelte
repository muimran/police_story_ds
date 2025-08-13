<script>
  import PoliceMap from '$lib/components/PoliceMap.svelte';
  import Transfers from '$lib/components/Transfers.svelte';
  import OfficerTable from '$lib/components/OfficerTable.svelte';
  import Absconded from '$lib/components/Absconded.svelte';
  import TransfersExperiemnt from '$lib/components/TransfersExperiemnt.svelte';
  import Navbar from '$lib/components/NavBar.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import PoliceMapMobile from '$lib/components/PoliceMapSave.svelte';
  import { page } from '$app/stores';
  import { base } from '$app/paths'; 
  import Headline from '$lib/components/Headline.svelte';
  import { slide } from 'svelte/transition';

  export let data;

  // State for collapsible sections
  let methodologyOpen = false;
  let documentsOpen = false; // State for the 'Documents' section

  // Dynamic URL handling
  const canonicalURL = "https://police-commanders.thedailystar.net/";
  const socialImageURL = "https://police-commanders.thedailystar.net/images/social.jpeg";
  const yourTwitterHandle = "@dailystarnews";
  
  // Publication dates
  const pubDate = new Date('2025-08-14').toISOString();
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>Commanders of crackdown: Police leadership during July uprising uncovered | The Daily Star</title>
  <meta name="description" content="July 2024 Dhaka Police Shootings: Uncover the officers and orders behind the July 2024 Bangladesh massacre, where police gunfire left hundreds dead and key commanders fled justice." />
  <meta name="author" content="  " />
  <meta name="keywords" content="July 2024 Bangladesh protests, Bangladesh quota protest crackdown, Sheikh Hasina lethal force order, July 2024 Dhaka police shootings, Bangladesh police live fire protest, Jatrabari protest killings, Dhaka student protest deaths, Bangladesh police massacre July 2024, UN OHCHR Bangladesh protest report, Dhaka Metropolitan Police FIRs" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:title" content="Commanders of crackdown: Police leadership during July uprising uncovered | The Daily Star" />
  <meta property="og:description" content="July 2024 Dhaka Police Shootings: Uncover the officers and orders behind the July 2024 Bangladesh massacre, where police gunfire left hundreds dead and key commanders fled justice." />
  <meta property="og:type" content="article" />
  <meta property="og:image" content={socialImageURL} />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Commanders of crackdown: Police leadership during July uprising uncovered | The Daily Star" />
  <meta name="twitter:description" content="uly 2024 Dhaka Police Shootings: Uncover the officers and orders behind the July 2024 Bangladesh massacre, where police gunfire left hundreds dead and key commanders fled justice." />
  <meta name="twitter:image" content={socialImageURL} />
  <meta name="twitter:creator" content={yourTwitterHandle} />

  <!-- Canonical URL -->
  <link rel="canonical" href={canonicalURL} />

  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": "Commanders of crackdown: Police leadership during July uprising uncovered | The Daily Star",
      "author": {
        "@type": "Person",
        "name": "Muhammad Imran",
        "url": "https://muhammadimran.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "The Daily Star",
        "logo": {
          "@type": "ImageObject",
          "url": "https://tds-images.thedailystar.net/sites/all/themes/sloth/logo.svg"
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
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-DMC5FP8XF4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-DMC5FP8XF4');
</script>
</svelte:head>

<style>
  .article-text {
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

  .article-text p {
    margin: 1.2em 0;
  }
  
  /* --- CLASSIC, UNBOXED DROP CAP STYLE (ONLY FOR THE FIRST PARAGRAPH) --- */
  .article-start p:first-of-type::first-letter {
    font-size: 5.1em;
    font-weight: bold;
    color: #222;
    float: left;
    line-height: 0.8;
    padding-right: 8px;
    padding-top: 4px;
  }

  /* Blockquotes */
  .article-quote {
    margin: 2.5em 0;
    padding-left: 1.5em;
    border-left: 3px solid #ccc;
    font-style: italic;
    font-size: 1.25rem;
    line-height: 1.6;
    color: #444;
  }

  .article-quote cite {
    display: block;
    text-align: right;
    margin-top: 0.8em;
    font-style: normal;
    font-size: 1rem;
    color: #666;
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
  
  .credits-section {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 0.95rem;
    color: #555;
    line-height: 1.6;
    margin-top: 3.5rem;
    margin-bottom: -1rem;
  }
  
  .credits-section p {
    margin: 0;
  }

  /* --- STYLES FOR COLLAPSIBLE SECTIONS --- */

  /* Shared styles for headline and content */
  .methodology-headline {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 1.4rem;
    font-weight: 500;
    color: #333;
    cursor: pointer;
    text-align: center;
    transition: color 0.2s ease-in-out;
    letter-spacing: 0.5px;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.6em;
  }

  .methodology-headline:hover {
    color: #000;
  }

  .arrow {
    width: 10px;
    height: 10px;
    border-left: 2px solid #333;
    border-bottom: 2px solid #333;
    transform: rotate(-45deg);
    transition: transform 0.3s ease-out;
  }

  .methodology-headline.open .arrow {
    transform: rotate(135deg);
    margin-top: -5px;
  }

  .methodology-content {
    margin-top: 1.5rem;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #555;
  }

  .methodology-headline:hover .arrow {
    border-color: #000;
  }
  
  /* --- NEW STYLES FOR THE 'SOURCE DOCUMENTS' SECTION --- */
  .documents-section {
    background-color: #f7f7f7; /* Light background color */
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
    padding: 1.5rem 0; /* Adjusted padding */
  }

  /* Styling for the original 'Methodology' section */
  .methodology-section {
    border-top: 1px solid #e0e0e0;
    margin-top: 4rem;
    padding-top: 2rem;
  }

  /* --- STYLES FOR DOCUMENT IMAGES --- */
  .document-figure {
    margin: 1.5rem 0;
  }

  .document-figure img {
    width: 100%;
    height: auto;
    display: block;
    border: 1px solid #ddd;
  }

  .document-caption {
    font-size: 0.85rem;
    color: #666;
    font-style: italic;
    text-align: center;
    margin-top: 0.5em;
    line-height: 1.4;
    padding: 0 1rem; /* Prevent caption from touching edges on small screens */
  }
</style>

<Hero />

<Headline publishedDate={new Date('Wed Aug 14, 2025 12:06 PM')} />

<!-- ADDED 'article-start' CLASS TO THIS DIV TO TARGET ONLY THE FIRST PARAGRAPH -->
<div class="article-text article-start">
  <p>In the early hours of August 5, 2024, just hours before her fall, Sheikh Hasina reportedly convened one last secret meeting with the police and military leadership.</p>
  <p>With hundreds already dead, she chastised the military leadership for their “handling of the situation,” multiple sources have confirmed. Pointing to the inspector general of police (IGP), she reportedly remarked, “But they’re doing really well.”</p>
  <p>That statement is emblematic of the July crackdown that, according to the UN Fact-Finding report, killed at least 1,400 people.</p>
  <p>Police records, photos and videos of police shootings, and eyewitness accounts pieced together by The Daily Star now explain, at least partly, the heavy casualties.</p>
  <p>In just six days from July 16-21, 2024, police fired at least 34,412 live rounds under 22 Dhaka Metropolitan Police Stations, including 4,142 rounds from 7.62mm Type 56 rifles. This means, police fired 690 rounds per day from this military-grade weapon in those six days alone, an investigation by The Daily Star has found.</p>
  <p>Some of these areas such as Mirpur, Jatrabari, Uttara, and Mohammadpur saw high casualties where police were seen firing lethal weapons alongside other forces.</p>
  <p>Over the last three months, The Daily Star reviewed hundreds of pages of official records, and identified 41 police officers with command responsibility over units that fired those bullets on protesters. In some cases, some of these officers were present on the spot and issued direct orders to shoot.</p>
  <p>Of these officers, 13 have quietly abandoned their post, 26 have been transferred, and only two have been arrested and are currently facing trial.</p>
  
  <h2>From non-lethal to lethal</h2>
  <p>For over a month since the beginning of the movement on June 6, 2024, demanding quota reform in public service, security forces refrained from major intervention.</p>
  <p>All that changed on July 16, which marked the first documented use of force by police leading to casualties in Dhaka and elsewhere. Though most weapons used that day were classified as non-lethal, six protesters died across the country, including Abu Sayed, a university student from Rangpur.</p>
  <p>Police shot him with metal pellets in front of his campus.</p>
</div>
  
<PoliceMap />

<div class="article-text">
  <h2>Command Responsibility</h2>

  <p>Under Bangladeshi law, police officers may use firearms without prior authorisation, but under specific legal provisions. Section 153(a) of the Bengal Police Regulations, 1943, lays down the conditions under which shots can be fired:</p>
  <p>(i) In exercise of the right of private defence of person or property (in accordance with Sections 96–106 of the Penal Code); and</p>
  <p>(ii) For the dispersal of unlawful assemblies (in accordance with Sections 127–128 of the Code of Criminal Procedure).</p>
  <p>“The police don’t need permission from anybody before opening fire. They can shoot if there's a threat to their own body, or the bodies of others working beside them, or to public property,” former IGP Nurul Huda told The Daily Star.</p>
  <blockquote class="article-quote">
    Of the officers on the arrest list, those who couldn’t negotiate and didn’t have any other option, left the country like me.
    <cite>— An absconding ADC, currently living abroad</cite>
  </blockquote>
  <p>Yet, an extensive review of 161 First Information Reports (FIRs) that 22 police stations recorded during the uprising shows a striking pattern.</p>
  <p>Nearly all shots were fired by sub-inspectors (SIs) or lower-ranking constables, suggesting that the front-line enforcement was almost entirely delegated to junior officers, who had no command responsibility and were obligated to follow orders.</p>
  <p>In these FIRs, each round discharged is attributed to a named officer, providing an unusually detailed record of state violence unleashed on civilians, including children.</p>
  <p>“We were simply the henchmen of official orders. If anyone refused to fire, they risked losing their job,” a sub-inspector posted in a police station in the capital said, describing the internal atmosphere at the time. He spoke on condition of anonymity.</p>
  <p>Commenting on the chain of responsibility, Supreme Court lawyer Dr Qazi Zahed Iqbal said that if any junior officers executes an unlawful order, they must be held personally liable.</p>
  <p>“But those who issued the order or coerced them are also, for very valid reasons, considered abettors. They also fall within the scope of the crime,” he told The Daily Star.</p>
  <!-- 'SOURCE DOCUMENTS' SECTION WITH IMPROVED STYLING -->
  <div class="documents-section">
    <div
      class="methodology-headline"
      class:open={documentsOpen}
      on:click={() => (documentsOpen = !documentsOpen)}
      role="button"
      tabindex="0"
      on:keydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          documentsOpen = !documentsOpen;
        }
      }}
    >
      <span>Source Documents</span>
      <div class="arrow"></div>
    </div>

    {#if documentsOpen}
      <div class="methodology-content" transition:slide={{ duration: 300 }}>
        <figure class="document-figure">
          <img src="{base}/images/doc1.png" alt="FIR document showing officers mentioned by rank" />
          <figcaption class="document-caption">
            In most FIRs, officers present at the scene were mentioned in this way.
          </figcaption>
        </figure>

        <figure class="document-figure">
          <img src="{base}/images/doc2.png" alt="FIR document showing a specific officer named as giving an order" />
          <figcaption class="document-caption">
            In some cases, officers were directly named as the ones who ‘ordered’ the shooting.
          </figcaption>
        </figure>
      </div>
    {/if}
  </div>
  <!-- 'SOURCE DOCUMENTS' SECTION ENDS HERE -->
  <h2>The commanders</h2>
  
  <p>Bangladesh police, headed by an inspector general,  operate under the home ministry. In metropolitan areas, the force is led by a commissioner.</p>
  <p>The whole DMP area is divided into eight operational divisions, each headed by a deputy commissioner (DC). Under each division, there are several zones headed by additional deputy commissioners (ADCs) and assistant commissioners (ACs).</p>
  <p>In turn, these officers command the officers-in-charge, sub-inspectors, assistant sub-inspectors and constables within their respective administrative zones.</p>
  <p>Using the FIRs and firsthand testimony from junior officers, The Daily Star has identified 41 police officers across 15 protest hotspots who either directly ordered the use of lethal force or oversaw units that fired live bullets between July 16 and 21.</p>
  <p>They include deputy commissioners, additional deputy commissioners and assistant commissioners.</p>
  <p>Some of the heavy-handed police crackdowns took place in the capital’s Jatrabari, now dubbed the Stalingrad of the July Uprising. The area was under the jurisdiction of Mohammad Iqbal Hossain, then a deputy commissioner.</p>
  <p>During the uprising, a now-infamous video surfaced showing Iqbal presenting footage of the crackdown to the then home minister, Asaduzzaman Khan Kamal. In the video, Iqbal remarks, “We shoot one, and only one collapses, but the rest don’t move, sir.”</p>
  <p>On August 13, 2024, five days after the interim government took office, Iqbal was transferred to the Khulna range. He was reportedly detained by the Detective Branch (DB) on August 20.</p>
  <p>According to a public security division notice, he absconded from duty just eight days later. The police authorities finally suspended him on July 18, 2025, almost 11 months after his desertion. He could not be contacted for comment.</p>
  <p>Three additional deputy commissioners oversaw the Jatrabari violence, according to the FIRs.</p>
  <p>Of them, Md Masudur Rahman Monir (Demra Zone), who was transferred to Rab on August 4, 2024, has been missing since November 13. SM Shamim (Wari Zone), who was transferred to Gaibandha on August 27, 2024, has not reported to duty since September 18. The third, Mohammad Alauddin (Shyampur Zone), was reassigned to APBN on August 17, 2024, and remains in service.</p>
  <p>In addition, two assistant commissioners (AC) -- Nahid Ferdous (Demra) and Shamsul Islam (Shyampur) -- with command responsibility in the Jatrabari area are currently posted at Rab. Shamsul was promoted to additional superintendent of police on March 3, 2025.</p>
  <p>Promotions have not been limited to junior commanders only. At least four officers with potential command responsibility during the uprising have also been elevated.</p>
  <p>Among them is Sattaki Kabiraj Jhulan, former ADC of Public Order Management (POM), a riot-control reserve force under DMP.</p>
  <p>He was present in Mirpur 13 on July 19 during a face-off between protesters and law enforcers. The  related FIR shows his unit fired 141 live rounds, 104 from Type 56 assault rifles. Not a single non-lethal round was fired there.</p>
  
  <OfficerTable />

  <h2>The great desertion</h2>
  <p>At least 10 former DMP officials, including Commissioner Habibur Rahman and Detective Branch chief Harun Or Rashid, absconded from their posts on August 6, the day after Hasina fled to India.</p>
  <p>Eight of them held the rank of DC or higher, and most were widely believed to have close ties with the political leadership of the ousted regime.</p>
  <p>In a stern warning for the absconding officers, Home Affairs Adviser Lt Gen (retd) Jahangir Alam on October 1, 2024, said that the officers who failed to report to their posts would be treated as "criminals" and would be “arrested and brought to justice.”</p>
  <p>Just six days later, a leading national newspaper published a story titled “90 police officers on arrest list.” Citing unnamed police sources, the report stated that the police authorities compiled a confidential list of 90 officers, marked for arrest.</p>
  <p>Although the list was never made public, two police officers told The Daily Star that it had been circulated informally within the police fraternity, alerting those on the list.</p>
  <blockquote class="article-quote">
    If someone (in the law enforcement force) executes an unlawful order, they must be held personally liable. But those who issued the order or coerced them are also, for very valid reasons, considered abettors—and they, too, fall within the scope of the crime.
    <cite>— Dr. Qazi Zahed Iqbal, Supreme Court lawyer and legal expert</cite>
  </blockquote>
  <p>One of these two officers, now living abroad, said that many officers on the list initially tried to negotiate with the current leadership: “Those who couldn’t negotiate and didn’t have any other option, left the country like me.”</p>
  <p>Since October, at least 13 former DMP officers have deserted their posts, some even after facing arrest warrants. Eleven of these 13 officers were ADCs during the uprising, and police members under their command fired hundreds of live rounds on protesters, documents show.</p>
  <p>Two of the officers -- ADC Rajib Das and ADC SM Jahangir Hasan -- were on medical leave in Thailand during the first week of October 2024. Neither have returned and their current whereabouts is unclear.</p>
  <p>Like them, most of the missing officers are now believed to be abroad.</p>
  <p>In a statement to The Daily Star, the police headquarters said that the fugitive officers had been able to “evade arrest because the police force was in a state of total disarray at that time.”</p>
  <p>However, records show that desertions have continued well into March this year, months after the initial unrest had subsided. At least two officers left the country in recent months through an international airport without facing any obstacles.</p>
  <p>“Efforts are underway to identify the current whereabouts of the police members who are absconding. Police are actively working to locate them and are committed to taking appropriate legal and administrative measures in accordance with rules,” the statement said.</p>
  <!-- SECOND QUOTE -->

  
  <Absconded />

  <h2>Arrests and transfers</h2>
  <p>Of the eight DCs in charge of  DMP’s eight operational divisions during the uprising, only the one from Mirpur has been arrested.</p>
  <p>Including him, 11 ex-DMP officers are currently behind the bars on charges related to the July killings. Of them, eight were ADCs or ACs, and three were DCs. Only two of these 11 were in commanding positions during the uprising.</p>
  <p>Above them were 22 high-ranking officers with command responsibility, including the police commissioner, additional police commissioners, and joint commissioners.</p>
  <p>Only one of them, Mohammad Shahidullah, a joint commissioner, has been arrested, but on charges of “extra-judicial killing” of a BNP leader, an incident unrelated to the July uprising.</p>
  <p>The Daily Star has reviewed 97 official notices involving transfer of 1,300 police personnel issued by the police between August 2024 and May 2025.</p>
  
  <TransfersExperiemnt />

  <p>In February this year, 82 senior cops were made Officers on Special Duty (OSD). Eighteen of them had been stationed in the DMP area during the uprising, of whom 13 were ranked DC or higher.</p>
  <p>This suggests that top-ranked officials -- DC and above -- rarely fled or were arrested after August 2024. Instead, the majority were either attached to posts with no active duties or made OSD.</p>
  <p>Sources within the police say that being attached or made an OSD is considered the “harshest punishment” senior officers typically face.</p>

  <h2>No enquiry, no reform</h2>

  <p>Under Sections 156 and 157 of the Bengal Police Regulations, any use of firearms -- whether authorized in advance or not -- requires the officer in command to prepare a detailed written report.</p>
  <p>The law also mandates a “full executive enquiry” following any firing from weapons, to determine whether the use of force was justified.</p>
  <p>One year on since the new administration took office, these mandatory post-firing enquiries have not been conducted -- not even at police stations where repeated instances of live ammunition use were documented.</p>
  <p>Asked whether internal investigations had been initiated, the police headquarters said officers are being investigated “with utmost seriousness” based on the cases filed against them.</p>
  <p>But the trials of officers responsible for excessive force also remain opaque, and the institutional reforms promised by both the police and the government have yet to materialise.</p>
  <p>The laws governing the police’s use of lethal force remain unchanged. Section 153 of the Bengal Police Regulations still permits officers to open fire to defend “person or property,” but the provision fails to define what precisely constitutes “defense.”</p>
  <p>In every FIR documenting firearm use during the protests, the justification given was nearly identical: officers fired to “protect themselves and private property.”</p>
  <p>“Many laws are designed with some discretion, so they can be adapted to context,” said Zahed Iqbal, the Supreme Court lawyer.</p>
  <p>“But when the enforcers themselves are corrupt, that discretion can easily be weaponised. That’s why safeguards must exist on both ends.</p>
  <p>“Enforcers need training that discourages misuse, and the laws themselves must be specific enough to minimise opportunities for abuse,” he added.</p>
  <p>Unless this legal ambiguity is addressed, Iqbal warned, the risk of excessive force -- like the ones seen in July and August -- will persist.</p>
  <!-- CREDITS SECTION STARTS HERE -->

  <div class="credits-section">
      <p>
        <strong>Additional reporting:</strong> Emrul Hasan Bappi. <strong>Research:</strong> Sharmin Sikder, Mashfiq Mizan, Aunik Arnold Dhali, Subrata Roy, Samsul Arefin Khan, Khalid Hossain, Nabid Yeasin, Badshah Mollah, Tangila Tasnim, Usraat Fahmidah, and Rahee Nayab
      </p>
  </div>
  <!-- CREDITS SECTION ENDS HERE -->

  <!-- METHODOLOGY SECTION STARTS HERE -->
  <div class="methodology-section">
    <div
      class="methodology-headline"
      class:open={methodologyOpen}
      on:click={() => (methodologyOpen = !methodologyOpen)}
      role="button"
      tabindex="0"
      on:keydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          methodologyOpen = !methodologyOpen;
        }
      }}
    >
      <span>Methodology</span>
      <div class="arrow"></div>
    </div>

    {#if methodologyOpen}
      <div class="methodology-content" transition:slide={{ duration: 300 }}>
 <p>The Daily Star obtained First Information Reports (FIRs) filed by police from 22 stations to the Chief Metropolitan Magistrate (CMM) Court in late July 2024. A portion of these FIRs, along with tabulated ammunition data, was shared with us by Lawyers for Energy, Environment & Development (LEED).</p>
<p>Most FIRs listed the types and quantities of firearms used by police, and in some cases, by affiliated forces such as Ansar. They also recorded the senior officers present and the orders given to open fire -- although in most cases, these officers were identified only by rank and posting (e.g., “DC, Tejgaon Zone”) rather than by name.</p>
<p>Using the Wayback Machine, we retrieved the roster of DMP officials, from Assistant Commissioner to Police Commissioner, as it appeared in March 2024. We cross-referenced this with police transfer notices issued between March and July 2024, available on the websites of the home ministry and police,  to establish a definitive list of 365 officers posted in the DMP during the uprising.</p>
<p>From the FIRs, we extracted the names of officers linked to incidents of discharging lethal firearms. These included officers explicitly recorded as having ordered police to open fire, those documented as being present at the scene when live rounds were discharged, and those referred to in the reports as “senior officials” who instructed or permitted the shootings. We then verified these identifications through interviews with multiple junior officers who served under their command at the time.</p>
<p>We then compared the DMP roster during the uprising to the list of officials posted as of late July 2024. This revealed that only 45 officers remained in their original posts—meaning 320 had either been transferred, retired, or fled.</p>
<p>We also compiled all transfer notices issued since August 2024 from official government websites, producing a final dataset containing transfer records for 236 DMP officers.</p>
<p>For analytical clarity, officers in our charts are divided into two groups:</p>
<p>Top rank officers: Police Commissioner, Additional Police Commissioner, Joint Police Commissioner, Deputy Police Commissioner.</p>
<p>Other: Additional Deputy Police Commissioner, Assistant Police Commissioner.</p>
      </div>
    {/if}
  </div>
</div>

<br>