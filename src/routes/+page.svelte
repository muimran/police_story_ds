<script>
  import PoliceMap from '$lib/components/PoliceMap.svelte';
  import Transfers from '$lib/components/Transfers.svelte';
  import OfficerTable from '$lib/components/OfficerTable.svelte';
  import Absconded from '$lib/components/Absconded.svelte';
  import TransfersExperiemnt from '$lib/components/TransfersExperiemnt.svelte';
  import Navbar from '$lib/components/NavBar.svelte';
  import Hero from '$lib/components/Hero.svelte'; // Your new component
  import PoliceMapMobile from '$lib/components/PoliceMapSave.svelte';

  import { page } from '$app/stores';
	import Headline from '$lib/components/Headline.svelte';

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
  <meta name="description" content=" " />
  <meta name="author" content="Muhammad Imran" />
  <meta name="keywords" content=" " />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:title" content="Police Story | The Daily Star" />
  <meta property="og:description" content=" " />
  <meta property="og:image" content={socialImageURL} />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:type" content="article" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Police Story | The Daily Star" />
  <meta name="twitter:description" content=" " />
  <meta name="twitter:image" content={socialImageURL} />
  <meta name="twitter:creator" content={yourTwitterHandle} />

  <!-- Canonical URL -->
  <link rel="canonical" href={canonicalURL} />

  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": " ",
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

<Hero />

<Headline publishedDate={new Date('Wed Aug 13, 2025 12:06 PM')} />

<!-- Accessibility Skip Link -->
<div class="article-text">
  <p>In the early hours of August 5, 2024, Sheikh Hasina reportedly convened a secret meeting with the chiefs of army, navy, air force, and police. With hundreds already dead, multiple sources confirmed she chastised the military leadership for their handling of the situation. Pointing to the inspector general of police (IGP), she reportedly remarked, “But they’re doing really well.”</p>

  <p>That statement is emblematic of the July crackdown.</p>

  <p>Police records, photos and videos of police shootings, eyewitness accounts and prosecutors investigating police firing reveal the sheer scale of the deployment of military-grade lethal weapons by police.</p>

  <p>This investigation has also tracked down some of the police officers who were in charge of each unit in Dhaka that opened fire at the protesters, and where they are now.</p>

  <h2>Shift to lethal weapons</h2>
  <p>For over a month since the beginning of the  movement on June 6, 2024, demanding quota reform, security forces refrained from major intervention.</p>

  <p>All that changed on July 16, which marked the first documented force by police. Though most weapons used that day were classified as non-lethal, six protesters died across the country including Abu Sayed, a final-year student at Begum Rokeya University. He was shot by metal pellets.</p>

  </div>
  
  <PoliceMap />

  <div class="article-text">
  <h2>Command responsibility</h2>
  <p>Under Bangladeshi law, police officers may use firearms without prior authorisation under specific legal provisions. Section 153(a) of the Bengal Police Regulations, 1943, lays down the conditions under which firearms may be discharged:</p>

  <p>(i) In exercise of the right of private defence of person or property (in accordance with Sections 96–106 of the Penal Code); and</p>

  <p>(ii) For the dispersal of unlawful assemblies (in accordance with Sections 127–128 of the Code of Criminal Procedure).</p>

  <p>Former Inspector General of Police (IGP) Nurul Huda, told The Daily Star, “The police don’t need permission from anybody before opening fire. They can shoot if there's a threat to their own body, or the bodies of others working beside them, or to public property.”</p>

  <p>Yet, an extensive review of FIRs filed between July 15–21 shows a striking pattern: nearly all shots were fired by sub-inspectors (SIs) or lower-ranking constables, suggesting that the front-line enforcement was almost entirely delegated to rank-and-file officers.</p>

  <p>In these FIRs, each round discharged is attributed to a named officer, providing an unusually detailed record of state violence.</p>

  <p>An SI posted in Mohammadpur, speaking in the background, described the internal climate: “We’re the henchmen of order. If anyone refuses to fire, their job might be in danger.”</p>

  <p>Commenting on this chain of responsibility, Supreme Court lawyer Dr Qazi Zahed Iqbal said, “If someone executes an unlawful order, they must be held personally liable. But those who issued the order or coerced them are also, for very valid reasons, considered abettors -- and they, too, fall within the scope of the crime.”</p>

  <h2>The commanders</h2>
  <p>Using FIRs and firsthand testimony from junior officers, The Daily Star has compiled a list of 39 police officers across 15 protest hotspots who directly ordered the use of lethal force between July 18 and 20.</p>

  <p>They include deputy commissioners, additional deputy commissioners (ADCs), and assistant commissioners (ACs) who either gave explicit orders to shoot or oversaw units that deployed live ammunition.</p>

  <p>One of the intense police operations occurred in Jatrabari, under the jurisdiction of the then deputy commissioner Mohammad Iqbal Hossain.</p>

  <p>During the uprising, a video surfaced showing Iqbal presenting footage of the crackdown to the then home minister Asaduzzaman Khan Kamal. In the video, Iqbal remarks, “We shoot one, one falls, the rest keeps marching.”</p>

  <p>According to a police headquarters transfer order, DC Iqbal was moved to the Khulna range on August 13, 2024. He was reportedly detained by the Detective Branch (DB) on August 20, but has not faced any formal charges.</p>

  <p>A public security division notice confirms he absconded from duty on August 28, 2024. He was officially suspended on July 18, 2025, almost 11 months after his desertion. He could not be contacted for comment.</p>

  <p>Three additional deputy commissioners oversaw the Jatrabari violence. Of them, Md Masudur Rahman Monir (Demra Zone), transferred to Rab on August 4, 2024, has been missing since November 13. SM Shamim (Wari Zone), transferred to Gaibandha on August 27, 2024, has not reported to duty since September 18. Mohammad Alauddin (Shyampur Zone) was reassigned to APBN on August 17, 2024, and remains in service.</p>

  <p>In addition, two assistant commissioners (AC) -- Nahid Ferdous (Demra) and Shamsul Islam (Shyampur) -- are currently posted at Rab. Shamsul was promoted to additional superintendent of police on March 3, 2025.</p>

  <p>Promotions have not been limited to junior commanders only. At least four officers under potential command responsibility have also been promoted.</p>

  <p>Among them is Sattaki Kabiraj Jhulan, former ADC of public order management (POM)—DMP’s riot-control reserve force.</p>

  <p>Jhulan, in charge of POM-North, was present at Mirpur 13 on July 19. FIR from this police station shows his unit fired 141 live rounds, 104 from Type 56 assault rifles. Not a single non-lethal round was fired there.</p>

  <p>Of the 41 identified commanding officers, 26 remain in service. Only two -- DC Jasim Uddin Mollah and ADC MM Mainul Islam of Mirpur Division --  have been arrested. At least 13 others have fled their posts.</p>

  <OfficerTable />

  <h2>The great desertion</h2>
  <p>At least 10 former DMP officials, including Commissioner Habibur Rahman and Detective Branch chief Harun Or Rashid, absconded from their posts on August 6, immediately after Hasina fled. Eight of the ten held the rank of DC or higher, and most were widely believed to be close associates of the ousted regime.</p>

  <p>On October 1, Home Affairs Adviser Lt Gen (retd) Jahangir Alam announced that officers who failed to report to their posts would be treated as "criminals" and vowed they would be “arrested and brought to justice.”</p>

  <p>On October 6, a leading national newspaper published a story titled “90 Police Officers on Arrest List.” Citing unnamed police sources, the report stated that the police authorities compiled a confidential list of 90 officers, marked for arrest. The list itself was not made public.</p>

  <p>Two police officers told The Daily Star confirmed that the list existed and had indeed been circulated informally within the police fraternity.</p>

  <p>One of these two officers, now living abroad, said: “They didn’t do any investigation. The current high command asked officers close to them from some (BCS) batches to compile a list of pro-Awami League officers. That’s how the list was made.”</p>

  <p>He also claimed that many officers on the list initially tried to negotiate with the current leadership: “Those who couldn’t negotiate and didn’t have any other option left the country, like me.”</p>

  <p>Two of the officers believed to have fled were on medical leave in Thailand during the first week of October 2024. The officers are ADC Rajib Das and SM Jahangir Hasan. Neither have returned.</p>

  <p>Sources within the police suggest that most of the missing officers are now believed to be abroad. However, none were intercepted at international departure points, and as of writing this report, not a single fugitive officer has been apprehended.</p>

  <p>Since October, at least 13 former DMP officers have deserted their posts, of them 11 were ranked ADC. Like ADC Hasan Arafat and Rashedul Islam, some fled after arrest warrants had been issued.</p>

  <p>“Not every batch was targeted,” the ADC added. “They picked names from a few junior batches. We were made scapegoats, so they could show that some kind of trial was happening, and that the police, as a force, were being punished.”</p>

  <p>Asked about the status of absconding police officers, police headquarters in a statement to The Daily Star said that the fugitives had “evaded arrest because the police was in a state of total disarray at that time.”</p>

  <p>However, records show that desertions have continued well into March this year, months after the initial unrest had subsided.</p>

  <p>In its statement, the police headquarters also added, “Efforts are underway to identify the current whereabouts of the police members who are absconding. Police are actively working to locate them and are committed to taking appropriate legal and administrative measures in accordance with rules.”</p>

  <Absconded />

  <h2>The ones behind bars</h2>
  <p>So far, at least 11 ex-DMP officers have been arrested on charges related to the July uprising. Of them, eight were ADCs or ACs, and three were DCs.</p>

  <p>Despite the scale of violence and documented evidence of command responsibility, of the 22 high-ranking officers—including the police commissioner, additional police commissioners, and joint commissioners—only one has been detained.</p>

  <p>The officer is Mohammad Shahidullah, a joint commissioner. However, he was arrested on charges of “extra-judicial killing” of a BNP leader, an incident unrelated to the July uprising.</p>

  <p>Of the eight DCs in charge of  DMP’s eight operational divisions, only the one from Mirpur has been arrested.</p>

  <h2>Transfers</h2>
  <p>The Daily Star has obtained and reviewed 97 official transfer notices issued by the police between August 2024 and May 2025, and analysed more than 1,300 transfer orders in total.</p>

  <TransfersExperiemnt />

  <p>In February, the home ministry designated 82 senior police officials as Officers on Special Duty (OSD). Eighteen of them had been stationed at DMP during the uprising, of whom 13 officers were ranked DC or higher.</p>

  <p>The pattern suggests that top-ranked officials—DC and above—rarely fled or were arrested after August. Instead, the majority were either attached to posts with no active duties or made OSD.</p>

  <p>Sources within the police say that being attached or made an OSD is considered the “harshest punishment” senior officers typically face.</p>

  <h2>No enquiry, no reform</h2>
  <p>Under Sections 156 and 157 of the Bengal Police Regulations, any use of firearms—whether authorized in advance or not—requires the officer in command to prepare a detailed written report. The law also mandates a “full executive enquiry” following any firing from weapons, to determine whether the use of force was justified.</p>

  <p>One year on since the new administration took over, these mandatory post-firing enquiries have not been conducted—not even at police stations where repeated instances of live ammunition use were documented.</p>

  <p>Asked whether internal investigations had been initiated, police headquarters told The Daily Star that officers are being investigated “with utmost seriousness” based on the cases filed against them.</p>

  <p>The trials of officers allegedly responsible for excessive force also remain opaque, and the institutional reforms promised by both the police and the government have yet to materialise.</p>

  <p>The laws governing the police’s use of lethal force remain unchanged. Section 153 of the Bengal Police Regulations still permits officers to open fire to defend “person or property,” but the provision fails to define what precisely constitutes “defense.”</p>

  <p>In every FIR documenting firearm use during the protests, the justification given was nearly identical: officers fired to “protect themselves and private property.”</p>

  <p>“Many laws are designed with some discretion, so they can be adapted to context,” said Javed Iqbal, the Supreme Court lawyer. “But when the enforcers themselves are corrupt, that discretion can easily be weaponised.”</p>

  <p>“That’s why safeguards must exist on both ends,” he added. “Enforcers need training that discourages misuse, and the laws themselves must be specific enough to minimise opportunities for abuse.”</p>

  <p>Unless this legal ambiguity is addressed, Iqbal warned, the risk of excessive force -- like that seen in July and August -- will persist.</p>
</div>



 
