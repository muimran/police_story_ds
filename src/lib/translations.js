// src/lib/translations.js

// 1. Import ALL data files
import { commandResponsibilityData as enOfficerData } from './enCommandResponsibility.js';
import { commandResponsibilityData as bnOfficerData } from './BnCommandResponsibility.js';
import { abscondedData as enAbscondedData } from './abscondedDataEn.js';
import { abscondedData as bnAbscondedData } from './abscondedDataBn.js';

// 2. Helper functions
const toBengaliNumerals = (engStr) => {
  if (typeof engStr !== 'string' && typeof engStr !== 'number') return engStr;
  const str = String(engStr);
  const bengaliDigits = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯', '19': '19' };
  return str.replace(/[0-9]/g, (digit) => bengaliDigits[digit]);
};

const createQuote = (text, cite) => ({ type: 'blockquote', text, cite });

const bnMonths = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
const bnWeekdays = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];

const formatBengaliDate = (date) => {
  if (!date) return '';
  const day = bnWeekdays[date.getDay()];
  const month = bnMonths[date.getMonth()];
  const dateNum = toBengaliNumerals(date.getDate());
  const year = toBengaliNumerals(date.getFullYear());
  return `${day}, ${dateNum} ${month}, ${year}`;
};

// ===================================================================================
// --- ENGLISH TEXT OBJECT (Complete) ---
// ===================================================================================
export const en = {
  locale: 'en-US',
  mapboxAccessToken: 'pk.eyJ1IjoiaW1yYW5kYXRhIiwiYSI6ImNtZHoxOXV3YTA1dHoya3F2dG5neXRxN2oifQ.1wSQLtAiXbRlFuzwlSJ9Gg',

  meta: {
    title: "Commanders of crackdown: Police leadership during July uprising uncovered | The Daily Star",
    description: "July 2024 Dhaka Police Shootings: Uncover the officers and orders behind the July 2024 Bangladesh massacre, where police gunfire left hundreds dead and key commanders fled justice.",
    author: "Keero Adhnan Ahmed, Muhammad Imran",
    keywords: "July 2024 Bangladesh protests, Bangladesh quota protest crackdown, Sheikh Hasina lethal force order, July 2024 Dhaka police shootings, Bangladesh police live fire protest, Jatrabari protest killings, Dhaka student protest deaths, Bangladesh police massacre July 2024, UN OHCHR Bangladesh protest report, Dhaka Metropolitan Police FIRs, Data Visualisation, Data Journalism",
    ldJsonHeadline: "Commanders of crackdown: Police leadership during July uprising uncovered | The Daily Star",
  },

  articleContent: [
    { type: 'p', content: "In the early hours of August 5, 2024, just hours before her fall, Sheikh Hasina reportedly convened one last secret meeting with the police and military leadership." },
    { type: 'p', content: "With hundreds already dead, she chastised the military leadership for their “handling of the situation,” multiple sources have confirmed. Pointing to the inspector general of police (IGP), she reportedly remarked, “But they’re doing really well.”" },
    { type: 'p', content: "That statement is emblematic of the July crackdown that, according to the UN Fact-Finding report, killed at least 1,400 people." },
    { type: 'p', content: "Police records, photos and videos of police shootings, and eyewitness accounts pieced together by The Daily Star now explain, at least partly, the heavy casualties." },
    { type: 'p', content: "In just six days from July 16-21, 2024, police fired at least 34,412 live rounds under 22 Dhaka Metropolitan Police Stations, including 4,142 rounds from 7.62mm Type 56 rifles. This means, police fired 690 rounds per day from this military-grade weapon in those six days alone, an investigation by The Daily Star has found." },
    { type: 'p', content: "Some of these areas such as Mirpur, Jatrabari, Uttara, and Mohammadpur saw high casualties where police were seen firing lethal weapons alongside other forces." },
    { type: 'p', content: "Over the last three months, The Daily Star reviewed hundreds of pages of official records, and identified 41 police officers with command responsibility over units that fired those bullets on protesters. In some cases, some of these officers were present on the spot and issued direct orders to shoot." },
    { type: 'p', content: "Of these officers, 13 have quietly abandoned their post, 26 have been transferred, and only two have been arrested and are currently facing trial." },
    { type: 'h2', content: "From non-lethal to lethal" },
    { type: 'p', content: "For over a month since the beginning of the movement on June 6, 2024, demanding quota reform in public service, security forces refrained from major intervention." },
    { type: 'p', content: "All that changed on July 16, which marked the first documented use of force by police leading to casualties in Dhaka and elsewhere. Though most weapons used that day were classified as non-lethal, six protesters died across the country, including Abu Sayed, a university student from Rangpur." },
    { type: 'p', content: "Police shot him with metal pellets in front of his campus." },
    { type: 'component', name: 'PoliceMap' },
    { type: 'h2', content: "Command Responsibility" },
    { type: 'p', content: "Under Bangladeshi law, police officers may use firearms without prior authorisation, but under specific legal provisions. Section 153(a) of the Bengal Police Regulations, 1943, lays down the conditions under which shots can be fired:" },
    { type: 'p', content: "(i) In exercise of the right of private defence of person or property (in accordance with Sections 96–106 of the Penal Code); and" },
    { type: 'p', content: "(ii) For the dispersal of unlawful assemblies (in accordance with Sections 127–128 of the Code of Criminal Procedure)." },
    { type: 'p', content: "“The police don’t need permission from anybody before opening fire. They can shoot if there's a threat to their own body, or the bodies of others working beside them, or to public property,” former IGP Nurul Huda told The Daily Star." },
    createQuote("Of the officers on the arrest list, those who couldn’t negotiate and didn’t have any other option, left the country like me.", "An absconding ADC, currently living abroad"),
    { type: 'p', content: "Yet, an extensive review of 161 First Information Reports (FIRs) that 22 police stations recorded during the uprising shows a striking pattern." },
    { type: 'p', content: "Nearly all shots were fired by sub-inspectors (SIs) or lower-ranking constables, suggesting that the front-line enforcement was almost entirely delegated to junior officers, who had no command responsibility and were obligated to follow orders." },
    { type: 'p', content: "In these FIRs, each round discharged is attributed to a named officer, providing an unusually detailed record of state violence unleashed on civilians, including children." },
    { type: 'p', content: "“We were simply the henchmen of official orders. If anyone refused to fire, they risked losing their job,” a sub-inspector posted in a police station in the capital said, describing the internal atmosphere at the time. He spoke on condition of anonymity." },
    { type: 'p', content: "Commenting on the chain of responsibility, Supreme Court lawyer Dr Qazi Zahed Iqbal said that if any junior officers executes an unlawful order, they must be held personally liable." },
    { type: 'p', content: "“But those who issued the order or coerced them are also, for very valid reasons, considered abettors. They also fall within the scope of the crime,” he told The Daily Star." },
    { type: 'component', name: 'SourceDocuments' },
    { type: 'h2', content: "The commanders" },
    { type: 'p', content: "Bangladesh police, headed by an inspector general, operate under the home ministry. In metropolitan areas, the force is led by a commissioner." },
    { type: 'p', content: "The whole DMP area is divided into eight operational divisions, each headed by a deputy commissioner (DC). Under each division, there are several zones headed by additional deputy commissioners (ADCs) and assistant commissioners (ACs)." },
    { type: 'p', content: "In turn, these officers command the officers-in-charge, sub-inspectors, assistant sub-inspectors and constables within their respective administrative zones." },
    { type: 'p', content: "Using the FIRs and firsthand testimony from junior officers, The Daily Star has identified 41 police officers across 15 protest hotspots who either directly ordered the use of lethal force or oversaw units that fired live bullets between July 16 and 21." },
    { type: 'p', content: "They include deputy commissioners, additional deputy commissioners and assistant commissioners." },
    { type: 'p', content: "Some of the heavy-handed police crackdowns took place in the capital’s Jatrabari, now dubbed the Stalingrad of the July Uprising. The area was under the jurisdiction of Mohammad Iqbal Hossain, then a deputy commissioner." },
    { type: 'p', content: "During the uprising, a now-infamous video surfaced showing Iqbal presenting footage of the crackdown to the then home minister, Asaduzzaman Khan Kamal. In the video, Iqbal remarks, “We shoot one, and only one collapses, but the rest don’t move, sir.”" },
    { type: 'p', content: "On August 13, 2024, five days after the interim government took office, Iqbal was transferred to the Khulna range. He was reportedly detained by the Detective Branch (DB) on August 20." },
    { type: 'p', content: "According to a public security division notice, he absconded from duty just eight days later. The police authorities finally suspended him on July 18, 2025, almost 11 months after his desertion. He could not be contacted for comment." },
    { type: 'p', content: "Three additional deputy commissioners oversaw the Jatrabari violence, according to the FIRs." },
    { type: 'p', content: "Of them, Md Masudur Rahman Monir (Demra Zone), who was transferred to Rab on August 4, 2024, has been missing since November 13. SM Shamim (Wari Zone), who was transferred to Gaibandha on August 27, 2024, has not reported to duty since September 18. The third, Mohammad Alauddin (Shyampur Zone), was reassigned to APBN on August 17, 2024, and remains in service." },
    { type: 'p', content: "In addition, two assistant commissioners (AC) -- Nahid Ferdous (Demra) and Shamsul Islam (Shyampur) -- with command responsibility in the Jatrabari area are currently posted at Rab. Shamsul was promoted to additional superintendent of police on March 3, 2025." },
    { type: 'p', content: "Promotions have not been limited to junior commanders only. At least four officers with potential command responsibility during the uprising have also been elevated." },
    { type: 'p', content: "Among them is Sattaki Kabiraj Jhulan, former ADC of Public Order Management (POM), a riot-control reserve force under DMP." },
    { type: 'p', content: "He was present in Mirpur 13 on July 19 during a face-off between protesters and law enforcers. The related FIR shows his unit fired 141 live rounds, 104 from Type 56 assault rifles. Not a single non-lethal round was fired there." },
    { type: 'component', name: 'OfficerTable' }, 
    { type: 'component', name: 'AudioSection' },
    { type: 'h2', content: "The great desertion" },
    { type: 'p', content: "At least 10 former DMP officials, including Commissioner Habibur Rahman and Detective Branch chief Harun Or Rashid, absconded from their posts on August 6, the day after Hasina fled to India." },
    { type: 'p', content: "Eight of them held the rank of DC or higher, and most were widely believed to have close ties with the political leadership of the ousted regime." },
    { type: 'p', content: "In a stern warning for the absconding officers, Home Affairs Adviser Lt Gen (retd) Jahangir Alam on October 1, 2024, said that the officers who failed to report to their posts would be treated as \"criminals\" and would be “arrested and brought to justice.”" },
    { type: 'p', content: "Just six days later, a leading national newspaper published a story titled “90 police officers on arrest list.” Citing unnamed police sources, the report stated that the police authorities compiled a confidential list of 90 officers, marked for arrest." },
    { type: 'p', content: "Although the list was never made public, two police officers told The Daily Star that it had been circulated informally within the police fraternity, alerting those on the list." },
    createQuote("If someone (in the law enforcement force) executes an unlawful order, they must be held personally liable. But those who issued the order or coerced them are also, for very valid reasons, considered abettors—and they, too, fall within the scope of the crime.", "Dr. Qazi Zahed Iqbal, Supreme Court lawyer and legal expert"),
    { type: 'p', content: "One of these two officers, now living abroad, said that many officers on the list initially tried to negotiate with the current leadership: “Those who couldn’t negotiate and didn’t have any other option, left the country like me.”" },
    { type: 'p', content: "Since October, at least 13 former DMP officers have deserted their posts, some even after facing arrest warrants. Eleven of these 13 officers were ADCs during the uprising, and police members under their command fired hundreds of live rounds on protesters, documents show." },
    { type: 'p', content: "Two of the officers -- ADC Rajib Das and ADC SM Jahangir Hasan -- were on medical leave in Thailand during the first week of October 2024. Neither have returned and their current whereabouts is unclear." },
    { type: 'p', content: "Like them, most of the missing officers are now believed to be abroad." },
    { type: 'p', content: "In a statement to The Daily Star, the police headquarters said that the fugitive officers had been to “evade arrest because the police force was in a state of total disarray at that time.”" },
    { type: 'p', content: "However, records show that desertions have continued well into March this year, months after the initial unrest had subsided. At least two officers left the country in recent months through an international airport without facing any obstacles." },
    { type: 'p', content: "“Efforts are underway to identify the current whereabouts of the police members who are absconding. Police are actively working to locate them and are committed to taking appropriate legal and administrative measures in accordance with rules,” the statement said." },
    { type: 'component', name: 'Absconded' },
    { type: 'h2', content: "Arrests and transfers" },
    { type: 'p', content: "Of the eight DCs in charge of DMP’s eight operational divisions during the uprising, only the one from Mirpur has been arrested." },
    { type: 'p', content: "Including him, 11 ex-DMP officers are currently behind the bars on charges related to the July killings. Of them, eight were ADCs or ACs, and three were DCs. Only two of these 11 were in commanding positions during the uprising." },
    { type: 'p', content: "Above them were 22 high-ranking officers with command responsibility, including the police commissioner, additional police commissioners, and joint commissioners." },
    { type: 'p', content: "Only one of them, Mohammad Shahidullah, a joint commissioner, has been arrested, but on charges of “extra-judicial killing” of a BNP leader, an incident unrelated to the July uprising." },
    { type: 'p', content: "The Daily Star has reviewed 97 official notices involving transfer of 1,300 police personnel issued by the police between August 2024 and May 2025." },
    { type: 'component', name: 'Transfers' },
    { type: 'p', content: "In February this year, 82 senior cops were made Officers on Special Duty (OSD). Eighteen of them had been stationed in the DMP area during the uprising, of whom 13 were ranked DC or higher." },
    { type: 'p', content: "This suggests that top-ranked officials -- DC and above -- rarely fled or were arrested after August 2024. Instead, the majority were either attached to posts with no active duties or made OSD." },
    { type: 'p', content: "Sources within the police say that being attached or made an OSD is considered the “harshest punishment” senior officers typically face." },
    { type: 'h2', content: "No enquiry, no reform" },
    { type: 'p', content: "Under Sections 156 and 157 of the Bengal Police Regulations, any use of firearms -- whether authorized in advance or not -- requires the officer in command to prepare a detailed written report." },
    { type: 'p', content: "The law also mandates a “full executive enquiry” following any firing from weapons, to determine whether the use of force was justified." },
    { type: 'p', content: "One year on since the new administration took office, these mandatory post-firing enquiries have not been conducted -- not even at police stations where repeated instances of live ammunition use were documented." },
    { type: 'p', content: "Asked whether internal investigations had been initiated, the police headquarters said officers are being investigated “with utmost seriousness” based on the cases filed against them." },
    { type: 'p', content: "But the trials of officers responsible for excessive force also remain opaque, and the institutional reforms promised by both the police and the government have yet to materialise." },
    { type: 'p', content: "The laws governing the police’s use of lethal force remain unchanged. Section 153 of the Bengal Police Regulations still permits officers to open fire to defend “person or property,” but the provision fails to define what precisely constitutes “defense.”" },
    { type: 'p', content: "In every FIR documenting firearm use during the protests, the justification given was nearly identical: officers fired to “protect themselves and private property.”" },
    { type: 'p', content: "“Many laws are designed with some discretion, so they can be adapted to context,” said Zahed Iqbal, the Supreme Court lawyer." },
    { type: 'p', content: "“But when the enforcers themselves are corrupt, that discretion can easily be weaponised. That’s why safeguards must exist on both ends." },
    { type: 'p', content: "“Enforcers need training that discourages misuse, and the laws themselves must be specific enough to minimise opportunities for abuse,” he added." },
    { type: 'p', content: "Unless this legal ambiguity is addressed, Iqbal warned, the risk of excessive force -- like the ones seen in July and August -- will persist." },
  ],

  documentsSection: {
    title: "Source Documents",
    captions: [ "In most FIRs, officers present at the scene were mentioned in this way.", "In some cases, officers were directly named as the ones who ‘ordered’ the shooting." ],
    alt_texts: [ "FIR document showing officers mentioned by rank", "FIR document showing a specific officer named as giving an order" ]
  },

  methodologySection: {
    title: "Methodology",
    content: [
      "The Daily Star obtained First Information Reports (FIRs) filed by police from 22 stations to the Chief Metropolitan Magistrate (CMM) Court in late July 2024. A portion of these FIRs, along with tabulated ammunition data, was shared with us by Lawyers for Energy, Environment & Development (LEED).",
      "Most FIRs listed the types and quantities of firearms used by police, and in some cases, by affiliated forces such as Ansar. They also recorded the senior officers present and the orders given to open fire -- although in most cases, these officers were identified only by rank and posting (e.g., “DC, Tejgaon Zone”) rather than by name.",
      "Using the Wayback Machine, we retrieved the roster of DMP officials, from Assistant Commissioner to Police Commissioner, as it appeared in March 2024. We cross-referenced this with police transfer notices issued between March and July 2024, available on the websites of the home ministry and police, to establish a definitive list of 365 officers posted in the DMP during the uprising.",
      "From the FIRs, we extracted the names of officers linked to incidents of discharging lethal firearms. These included officers explicitly recorded as having ordered police to open fire, those documented as being present at the scene when live rounds were discharged, and those referred to in the reports as “senior officials” who instructed or permitted the shootings. We then verified these identifications through interviews with multiple junior officers who served under their command at the time.",
      "We then compared the DMP roster during the uprising to the list of officials posted as of late July 2024. This revealed that only 45 officers remained in their original posts—meaning 320 had either been transferred, retired, or fled.",
      "We also compiled all transfer notices issued since August 2024 from official government websites, producing a final dataset containing transfer records for 236 DMP officers.",
      "For analytical clarity, officers in our charts are divided into two groups:",
      "<strong>Top rank officers:</strong> Police Commissioner, Additional Police Commissioner, Joint Police Commissioner, Deputy Police Commissioner.",
      "<strong>Other:</strong> Additional Deputy Police Commissioner, Assistant Police Commissioner.",
      "To simplify the data for visualisation, we grouped the 21 transfer destinations into five categories. The complete mapping is detailed below:",
    ],
    table: {
      headers: ["Training & Development", "Specialized Operational Units", "Geographic Field Commands", "Central & Regional Administration", "Investigation & Intelligence"],
      rows: [
        ["Bangladesh Police Academy", "Anti-Terrorism Unit", "Circle", "Police Headquarters", "CID"],
        ["In service training centre", "Armed Police Battelion (APBn)", "District Police", "Range Office", "PBI"],
        ["Police Staff Collage", "Highway Police", "Metropolitons", "", "SB"],
        ["Police Special Training School", "Industrial police", "", "", ""],
        ["Police Training Center", "Navy Police", "", "", ""],
        ["", "RAB", "", "", ""],
        ["", "Railway Police", "", "", ""],
        ["", "Tourist Police", "", "", ""]
      ]
    }
  },

  credits: {
    line: "<strong>Additional reporting:</strong> Emrul Hasan Bappi. <strong>Research:</strong> Sharmin Sikder, Mashfiq Mizan, Aunik Arnold Dhali, Subrata Roy, Samsul Arefin Khan, Khalid Hossain, Nabid Yeasin, Badshah Mollah, Tangila Tasnim, Usraat Fahmidah, and Rahee Nayab"
  },

  headline: {
    line1: "July Uprising", line2: "Commanders of crackdown", line3: "Police leadership during July uprising uncovered",
    datePublished: "Published:", dateUpdated: "Updated:",
    creditReporting: "Reporting:", creditDataViz: "Data, Visualisation and Web Development:", creditGraphics: "Graphics:", creditEditing: "Editing:",
    nameReporting: "Keero Adhnan Ahmed", nameDataViz: "Muhammad Imran", nameGraphics: "Anwar Sohel", nameEditing: "Martin Swapan Pandey",
  },
  
  policeMap: {
    scrollyTextboxes: {
        "1": "The Daily Star has calculated the amount of ammunition used by the police in Dhaka from July 16 to 21 by examining the FIRs of cases filed by the police during the uprising.",
        "2": "According to the documents, the first incident of firing in Dhaka took place at the Mohakhali railway gate. However, according to the FIR of Banani police station, most of the bullets fired by the police that day were rubber bullets.",
        "3": "After the death of Abu Sayed, the government ordered the closure of all universities. Police used intense force to remove students from the residential halls of Dhaka University (DU), the center of the movement. After 2007, for the first time, a state force fired on campus.",
        "4": "On the same day, Jatrabari became one of the main centers of the movement. That day, for the first time, police fired repeatedly to stop the protesters. However, they used more rubber bullets than lethal bullets, which was not seen from the next day.",
        "5": "Police used lethal weapons in at least 13 areas of Dhaka. According to the police FIR, more than 10,000 lethal bullets were fired in Dhaka metropolis that day, about half of which were in Jatrabari.",
        "6": "Three sub-inspectors (SIs) working at Shahbagh, Mohammadpur and Uttara West police stations said on condition of anonymity that they were instructed to take more lead cartridges instead of rubber for shotguns that day.",
        "7": "On the same day, then Prime Minister Sheikh Hasina approved the use of lethal weapons. In <a href=\"https://soundcloud.com/thedailystar/hasinas-deadly-order-during-july-uprising-1\" target=\"_blank\" rel=\"noopener noreferrer\">a phone conversation</a> verified by The Daily Star, she was heard saying that the protesters should be 'shot wherever they are found'. About 100 protesters were killed across the country that day.",
        "8": "Friday marked the bloodiest day of July. The death toll across the country stood at about 300. More than three times as many lethal bullets as rubber bullets were used in the capital that day.",
        "9": "More than 80 percent of the total ammunition in Uttara Sector 12, Gulshan, Mohakhali and Jatrabari was lethal.",
        "10": "The use of T56 assault rifles also increased dramatically on this day. According to the UN report, the highest number of people were killed by this weapon in the uprising.",
        "11": "On condition of anonymity, an SI told The Daily Star, 'This is the most lethal weapon. You can target from 300 meters away with it.'",
        "12": "Weapons experts say the Type 56 rifle is made for use on the battlefield and is capable of penetrating many bulletproof vests. This weapon is never used in law enforcement.",
        "13": "On the first day of the curfew, police fired about 5,000 more rounds of lethal ammunition in seven areas of Dhaka.",
        "14": "In the first six days of the crackdown (from July 16 to 21), police and affiliated forces in the DMP area fired at least 34,412 live rounds across 22 protest sites."
    },
    thanaNames: {
        "Kodomtoli": "Kodomtoli", "Jatrabari": "Jatrabari", "Kafrul": "Kafrul", "Uttara West": "Uttara West", "Mohammadpur": "Mohammadpur", "Rampura": "Rampura", "New Market": "New Market", "Banani": "Banani", "Paltan": "Paltan", "Pallabi": "Pallabi", "Shahbagh": "Shahbagh", "Malibagh": "Malibagh", "Uttara East": "Uttara East", "Gulshan": "Gulshan", "Adabor": "Adabor", "DU Area": "DU Area"
    },
    uiText: {
        thanaHeader: "Thana", totalLabel: "Total",
        seeDetail: "See Detail",
        ammoLabels: { t56: 'Type 56', lethal: 'Lethal', rubber_cartridge: 'R. Cartridge', shotgun_shell: 'Shotgun Shell', tear_gas_grenade: 'Tear Gas', baton_rounds: 'Baton Rounds', non_lethal: 'Non-Lethal' },
        monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    },
        finalNote: [
        "*The ammunition counts presented here are a partial estimate. This data is based on available FIRs, but some documents were illegible or could not be collected.",
        '*FIRs from some stations, such as Mirpur Model and Uttara East, did not specify ammunition quantities, instead used vague phrases like "a huge amount of ammunitions."',
        "*Actions documented by Shahbagh, Banani, and Shahjahanpur police were located to the Dhaka University area, Mohakhali, and Malibagh, respectively."
    ]
  },

  transfers: {
    scrollySteps: [
      { title: 'Total officers at DMP', description: 'During the July uprising, <span style="background-color: #9ca3af; color: white; padding: 2px 6px; border-radius: 4px; font-weight: 600;">365 officers</span> with the rank of Assistant Commissioner (AC) or higher were posted in the DMP area. Each dot represents one police officer.' },
      { title: '88% are forced out', description: 'Of these, 45 remain in their posts. The <span style="background-color: #663399; color: white; padding: 2px 6px; border-radius: 4px; font-weight: 600;">other 320</span> have either been transferred out, retired, or fled. The Daily Star acquired the transfer information of 236 officers.' },
      { title: 'A Split in Command', description: 'Among those 236 officers, 64 were <span style="background-color: #fdba74; color: white; padding: 2px 6px; border-radius: 4px; font-weight: 600;">higher ranking</span> officials (Deputy Commissioner or above), while the <span style="background-color: #4E79A7; color: white; padding: 2px 6px; border-radius: 4px; font-weight: 600;">remaining 172</span> were ranked AC or ADC.' },
      { title: 'Destinations of Transfers', description: 'These officers were reassigned to 21 different outposts, which we grouped into five categories. 45% of the senior-most officers (DC or above) are transferred to range DIG’s offices (central and regional administration). The largest share of transfers overall went to specialized operational units such as RAB and APBn.' },
      { title: 'Attached Officers', description: '14% of all transferred officers were “attached” to their new outposts. In police terminology, an attached officer has no assigned duties or post and is merely stationed at a location—effectively sidelined without formal suspension.' },
      { title: 'The Final Picture', description: 'Notably, half of all DCs and higher-ranked officers ended up in this attached status. And no one ranked lower than a DC was attached.' }
    ],
    tooltipLabels: { id: "ID", rank: "Rank", rank_level: "Rank Level", destination_cluster: "Destination Cluster", attached: "Attached", yes: "Yes", no: "No", not_applicable: "N/A" },
    clusterLabels: {
      high_rank: "High Rank", low_rank: "Low Rank", attached: "Attached", others: "Others",
      'Specialized Operational Units': 'Specialized Operational Units', 'Training & Development': 'Training & Development', 'Central & Regional Administration': 'Central & Regional Administration', 'Investigation & Intelligence': 'Investigation & Intelligence', 'Geographic Field Commands': 'Geographic Field Commands'
    }
  },

audioSection: {
    heading: "Accounts of the Accused",
    // I added <br><br> tags below to force new lines
    text: `Of the 38 commanding officers identified in this investigation, two are confirmed to be in custody, 14 are confirmed to be absconding, and 22 are believed to be in active service. The Daily Star contacted 18 of the 22 officers currently in service. The remaining four could not be reached by phone or through the contact numbers of their outposts.
    <br><br>
    All five DCs currently in service have denied involvement in police shootings, stating they neither gave orders to fire nor were they physically present at the locations where the protesters were shot.
    <br><br>
    Of the nine senior AC and ADCs believed to be in service, contact was made with five. Four of them either denied involvement or declined to comment, citing the ongoing investigation.
    <br><br>
    Only one officer, Ihsanul Firdous, former ADC of the Dhanmondi zone, offered a detailed account of his involvement.`,
    accordionTitle: "Read their full statements",
    items: [
      {
        headline: "",
text: `He stated he took a preventative measure, instructing all forces under his command, including attached DMP units, not to carry the Type 56 assault rifle. An analysis of FIR documents offers corroboration for this claim. While T-56 was documented in at least 15 locations across Dhaka on July 19, Dhanmondi was not listed among them.

<br><br>

Firdous described a chaotic scene at the Science Lab intersection, stating his forces were compelled to act. "We didn’t approach the protesters at first. But they were targeted from above by helicopters. Then they scattered, and we had to confront them," he said. 

<br><br>

When questioned about the heavy use of metal pellets over less-lethal rubber bullets in his zone, he acknowledged a failure of control. “Shotguns can load both rubber and metal pellets. Maybe I couldn’t control their use as I should have.” 

<br><br>

He alluded to pressure from the chain of command, stating, “As you already know, there were instructions from above... But I always tried to perform my duties with minimum possible damage.”

<br><br>

When asked directly if the city-wide overreliance on metal pellets indicated a lethal intent from the police force, his response was affirmative and emotional. “Yes, there was intent. And I still feel guilty about it. For both sides — for us police, and for the protesters. Because a lot of people died. It still torments me,” he said, audibly sobbing during the call. “I couldn’t sleep for three months after those days.”

<br><br>

Of the officers who provided a statement, Ihsanul was the only one to express remorse for his force's actions.

<br><br>

Masuk Mia, former ADC of the Mirpur zone, attributed the shoot orders to the highest level of the city's police command. “The central order came from the DMP commissioner himself. By his order, the DC and OCs of the respective places implemented the crackdown.” 

<br><br>

He claimed his role was purely administrative and that he was never present at operational sites. He also asserted that a Joint Commissioner or Additional Commissioner was always on duty in the Mirpur station during the uprising, negating his own authority to issue commands, though he provided no evidence to support this claim. 

<br><br>

Of the nine ACs currently in service, this newspaper contacted eight. 

<br><br>

Hasan Muhammad Muhtarim, former AC of the Mirpur zone, alleged that he objected to the handling of the protests in a meeting of senior officers on July 17 and was subsequently called a "Mir Jafar" by his superior. 

<br><br>

Muhtarim also alleged the existence of a "Gopalganj-based syndicate" within the Mirpur command, noting that DC Jasim Uddin and ADC M M Moinul Islam were both from the Gopalganj district. Jasim and Moinul are the only two officers from this investigation's list who are currently under arrest and could not be reached for comment.

<br><br>

A recurring defense among several Assistant Commissioners was that they were the most junior officers in their respective zones and lacked command authority, as superior officers were almost always present. 

<br><br>

Mithun Kumar Kundu, former AC (Patrol) of the Motijheel zone, stated his duties were limited to civic matters and he was not involved in protest control operations. Mizanur Rahman, AC (Patrol) of the Mohammadpur zone, confirmed his presence at the protests but claimed he was "beaten up while siding with the students," declining further comment as his role is under investigation.

<br><br>

Shafiqul Islam, former AC of the Gulshan zone, claimed he was injured on July 16 and, while present in the Mohakhali area, "never instructed anyone to shoot." When confronted with an FIR entry detailing use of force at the Mohakhali police box on July 20, he stated, “I don’t recall anything happening in Mohakhali that day.” 

<br><br>

“However, one thing I want to add, when the Setu Bhaban was attacked, the police went there to rescue people trapped inside. At that time, police fired some blank shots,’ he added.

<br><br>

Asked how a T-56 rifle can fire blanks, he replied, “If you shoot it upwards, it’s a blank shot, right?”

<br><br>

Shamsul Islam, former AC of the Shyampur zone, claimed he was not present at Jatrabari, a claim contradicted by multiple FIRs which note his presence there from July 17 to July 21.

<br><br>

Abu Taleb, former AC of the Dhanmondi zone; Refatul Islam, former AC of the New market zone; and Sumon Kar, former AC of the Uttara zone, refused to comment, citing legal and institutional restrictions.`,      },
      // ... keep the rest of your items the same ...
      {
        headline: "",
        text: "",
        iframeSrc: ""
      }
    ]
  },

  officerTable: {
    data: enOfficerData,
    formatDate: (dateStr) => dateStr,
    uiText: {
      nameHeader: 'Name',
      areaHeader: 'Area',
      rankHeader: 'Rank & Zone',
      statusHeader: 'Status',
      dateHeader: 'Date',
      showLess: 'Show Less',
      showMorePrefix: '+ Show More',
      showMoreSuffix: 'more',
      caption: '12 officers were explicitly named in the FIRs; the remaining identifications were confirmed through interviews with at least two lower-ranked officials who served under them at the time.'
    }
  },

  absconded: {
    data: enAbscondedData,
    title: 'Timeline of Desertion',
    caption: 'Each dot represents an ex DMP official who has fled',
    legendTopRanked: 'Top-Ranked',
    legendOtherRanks: 'Other Ranks',
    annotationText: 'Most top-ranked<br />officials fled on<br />August 6',
    footnote: 'Since October, 13 ex-DMP officers deserted their posts—11 of them ADCs',
    targetOfficerName: 'Mohammad Harun Or Rashid, BPM-Bar, PPM-Bar',
    tooltipRank: 'Rank:',
    tooltipDate: 'Date:',
    loading: 'Loading timeline...',
    error: 'Failed to load officer data.',
    noData: 'No data available to display.'
  },
};


// ===================================================================================
// --- BENGALI TEXT OBJECT (Complete) ---
// ===================================================================================
export const bn = {
  locale: 'bn-BD',
  mapboxAccessToken: 'pk.eyJ1IjoiaW1yYW5kYXRhIiwiYSI6ImNtZnducjc2ejAxNmkya3NmMDhqOWpyNDkifQ.dBdKqHtIII3RI5IgEG9ciw',

  meta: {
    title: "গুলির নির্দেশদাতা কর্মকর্তারা কে কোথায়? | দ্য ডেইলি স্টার",
    description: "জুলাই ২০২৪-এর অভ্যুত্থানে পুলিশের গুলির পেছনে থাকা কর্মকর্তা ও নির্দেশগুলো উন্মোচন, যেখানে শত শত মানুষ নিহত হয় এবং মূল নির্দেশদাতারা বিচার এড়িয়ে পালিয়ে যায়।",
    author: "কিরো আদনান আহমেদ, মুহাম্মদ ইমরান",
    keywords: "জুলাই ২০২৪ বাংলাদেশ, কোটা সংস্কার আন্দোলন, শেখ হাসিনা, পুলিশি নির্যাতন, ঢাকা পুলিশ শুটিং, Jatrabari, Mirpur, Uttara, ডেটা সাংবাদিকতা",
    ldJsonHeadline: "গুলির নির্দেশদাতা কর্মকর্তারা কে কোথায়?",
  },

  articleContent: [
    { type: 'p', content: "৫ আগস্ট সকালবেলা। তৎকালীন প্রধানমন্ত্রী শেখ হাসিনা তখনো জানেন না কয়েক ঘণ্টার মধ্যে দেশ ছেড়ে পালাতে হবে তাকে। আন্দোলন দমন করতে পুলিশের মহাপরিদর্শক ও ঊর্ধ্বতন সামরিক কর্মকর্তাদের গণভবনে তলব করেন তিনি।" },
    { type: 'p', content: "কর্মকর্তারা তাকে বোঝানোর চেষ্টা করেন, হাজারো ছাত্র-জনতা গণভবনের উদ্দেশ্যে যাত্রা শুরু করে দিয়েছে। বলপ্রয়োগ করেও বেশিক্ষণ আর তাদেরকে ঠেকিয়ে রাখা সম্ভব না।" },
    { type: 'p', content: "কিন্তু তখনো নাছোড়বান্দা শেখ হাসিনা সেনা কর্মকর্তাদের আরও কঠোর হওয়ার নির্দেশ দেন। তিনি পুলিশ প্রধানের দিকে তাকিয়ে বলেন, ‘ওরা (পুলিশ) তো ভালো করছে, সেনাবাহিনী কেন পারবে না?’" },
    { type: 'p', content: "এই একটি বাক্যই গণঅভ্যুত্থানের সময় রাষ্ট্রীয় হত্যাকাণ্ড ও দমন-পীড়নে পুলিশের ভূমিকা বোঝানোর জন্য যথেষ্ট।" },
    { type: 'p', content: "জাতিসংঘের তথ্যানুসন্ধান প্রতিবেদন অনুযায়ী, জুলাই গণঅভ্যুত্থানে নিহতের সংখ্যা প্রায় ১৪০০। একাধিক মানবাধিকার সংস্থা ও গণমাধ্যমের অনুসন্ধান অনুযায়ী, এদের অধিকাংশই মারা গেছেন পুলিশের গুলিতে।" },
    { type: 'p', content: "দ্য ডেইলি স্টারের অনুসন্ধানে উঠে এসেছে, ১৬ থেকে ২১ জুলাই পর্যন্ত—আন্দোলনে বলপ্রয়োগ শুরু হওয়ার প্রথম ছয় দিনে ঢাকা মহানগর পুলিশের (ডিএমপি) ২২টি থানার অধীনে অন্তত ৩৪ হাজার ৪১২ রাউন্ড প্রাণঘাতী গুলি ছোড়া হয়েছে। এর মধ্যে টাইপ-৫৬ রাইফেলের (চাইনিজ রাইফেল) গুলি ছিল অন্তত ৪ হাজার ১৪২ রাউন্ড। সাধারণত সীমান্তে সুরক্ষা ও যুদ্ধক্ষেত্রে এই অস্ত্র ব্যবহার হয়।" },
    { type: 'p', content: "মিরপুর, যাত্রাবাড়ী, উত্তরা এবং মোহাম্মদপুরের মতো যেসব এলাকায় সবচেয়ে বেশি হতাহতের ঘটনা ঘটেছে, সেখানে আনসার, র‍্যাবের মতো অন্যান্য বাহিনীর সঙ্গে পুলিশও প্রাণঘাতী অস্ত্র ব্যবহার করেছে।" },
    { type: 'p', content: "তিন মাসের এই অনুসন্ধানে শত শত পৃষ্ঠার দাপ্তরিক নথি পর্যালোচনা করে দ্য ডেইলি স্টার ৩৮ জন পুলিশ কর্মকর্তাকে শনাক্ত করেছে, যাদের অধীনস্থ ইউনিটগুলো আন্দোলনকারীদের ওপর গুলি চালিয়েছে। কিছু ক্ষেত্রে, কর্মকর্তারা ঘটনাস্থলে উপস্থিত থেকে সরাসরি গুলি চালানোর নির্দেশ দিয়েছেন।" },
    { type: 'p', content: "এই ৩৮ কর্মকর্তার মধ্যে ১৪ জন বর্তমানে পলাতক, ২২ জনকে দেশের বিভিন্ন স্থানে বদলি করা হয়েছে এবং দুজন গ্রেপ্তার হয়েছেন।" },

    
    { type: 'h2', content: "আন্দোলন দমনে মারণাস্ত্র" }, 
    
    { type: 'p', content: "আদালত থেকে সরকারি চাকরিতে কোটা ব্যবস্থা পুনর্বহালের রায় দেওয়ার পর ২০২৪ সালের ৬ জুন প্রথম কোটা সংস্কারের দাবিতে রাস্তায় নামেন শিক্ষার্থীরা। পরের এক মাসে এই শান্তিপূর্ণ আন্দোলনে বলপ্রয়োগ করতে দেখা যায়নি পুলিশকে।" },
    { type: 'p', content: "কিন্তু ১৪ জুলাই এক সংবাদ সম্মেলনে তৎকালীন প্রধানমন্ত্রী আন্দোলনকারীদের ‘রাজাকারের বাচ্চারা’ তকমা দেওয়ার পর পরিস্থিতি পাল্টাতে শুরু করে। এর পরই সারা দেশে সড়ক ও রেললাইন অবরোধ করতে শুরু করেন আন্দোলনকারীরা।" },
    
    { type: 'component', name: 'PoliceMap' },
		{ type: 'h2', content: "বন্দুকের পেছনের ব্যক্তিরা" },
    
    { type: 'p', content: "আইন অনুযায়ী নির্দিষ্ট পরিস্থিতিতে পূর্বানুমতি ছাড়া আগ্নেয়াস্ত্র ব্যবহার করতে পারেন পুলিশ কর্মকর্তারা। ১৯৪৩ সালের পুলিশ প্রবিধানাবলির ১৫৩(ক) ধারা অনুযায়ী:" },
    { type: 'p', content: "(১) কোনো ব্যক্তির আত্মরক্ষা বা সম্পত্তি রক্ষা; এবং" },
    { type: 'p', content: "(২) বেআইনি সমাবেশ ছত্রভঙ্গ করতে" },
    { type: 'p', content: "কারো অনুমতি ছাড়াই গুলি চালাতে পারবে যেকোনো পুলিশ কর্মকর্তা।" },
    { type: 'p', content: "সাবেক আইজিপি নুরুল হুদার মতে, ‘গুলি চালানোর জন্য কারো অনুমতি নেওয়ার প্রয়োজন পড়ে না পুলিশের। নিজের বা সহকর্মীর জীবন ঝুঁকিতে পড়লে, অথবা সরকারি সম্পত্তি হুমকির মুখে পড়লে পুলিশ গুলি চালাতে পারবে।’" },
    { type: 'p', content: "অভ্যুত্থান চলাকালে ঢাকার ২২টি থানার ১৬১টি এজাহার পর্যালোচনা করে আমরা দেখতে পাই, প্রতিটি এজাহারেই পুলিশের ‘আত্মরক্ষা বা সরকারি সম্পত্তি রক্ষা’কে গুলি ছোঁড়ার কারণ হিসেবে উল্লেখ করা হয়েছে। এবং প্রায় সব গুলিই ছুড়েছেন এসআই বা কনস্টেবলরা।" },
    { type: 'p', content: "এজাহারে থাকা এমন অন্তত ৩০ জন এসআই বা কনস্টেবলের সঙ্গে যোগাযোগ করেছে দ্য ডেইলি স্টার। তাদের বেশিরভাগই সরাসরি অস্বীকার করে বলেছেন, তারা কখনো কোনো প্রাণঘাতি গুলি ছোড়েননি। যারা স্বীকার করেছেন, তাদের দাবি ‘উপরের নির্দেশ’ ছিল গুলি করার। ঊর্ধ্বতন কর্মকর্তাদের নির্দেশ মেনে গুলি না চালালে তাদের চাকরি চলে যাওয়ার ঝুঁকি ছিল।" },
    createQuote("কেউ বেআইনি আদেশ পালন করলে তার দায় ব্যক্তিকেই নিতে হবে। তবে যারা আদেশ দিয়েছেন বা আদেশ পালনে বাধ্য করেছেন, তারাও দুষ্কর্মের সহযোগী হিসেবে বিবেচিত হবেন। তারাও স্বাভাবিক নিয়মে অপরাধের আওতায় পড়বেন।", "ড. কাজী জাহেদ ইকবাল, সুপ্রিম কোর্টের আইনজীবী"),
    
    { type: 'component', name: 'SourceDocuments' },
    
    { type: 'h2', content: "যাদের নির্দেশে গুলি" },
    { type: 'p', content: "পুলিশের তৎকালীন মহাপরিদর্শক (আইজিপি) চৌধুরী আবদুল্লাহ আল-মামুন আন্তর্জাতিক অপরাধ ট্রাইবুনালে দেওয়া তার জবানবন্দিতে সুনির্দিষ্টভাবে উল্লেখ করেছেন, মারণাস্ত্র ব্যবহারের নির্দেশ সরাসরি শেখ হাসিনার কাছ থেকেই এসেছে।" },
    { type: 'p', content: "পুলিশের নেতৃত্বে থাকেন আইজিপি। তার অধীনে থাকা ডিএমপির প্রধান হিসেবে থাকেন একজন কমিশনার। গুলি চালানোর নির্দেশ মাঠপর্যায়ে বাস্তবায়ন করেছেন বাহিনীর কিছু ঊর্ধ্বতন কর্মকর্তা।" },
    { type: 'p', content: "কাজের সুবিধার জন্য ডিএমপির আওতাধীন এলাকাকে আটটি বিভাগে ভাগ করা হয়েছে, যার প্রতিটির দায়িত্বে আছেন একজন করে উপকমিশনার (ডিসি)। প্রতিটি বিভাগকে আবার একাধিক জোনে ভাগ করা হয়। সেগুলোর নেতৃত্বে থাকেন অতিরিক্ত উপকমিশনার (এডিসি) ও সহকারী কমিশনাররা (এসি)।" },
    { type: 'p', content: "ঢাকায় সবচেয়ে বেশি মারণাস্ত্র ব্যবহার হয়েছে এবং সবচেয়ে বেশি আন্দোলনকারী নিহত হয়েছে যাত্রাবাড়ীতে। এই এলাকার দায়িত্বে ছিলেন ওয়ারী বিভাগের তৎকালীন ডিসি মোহাম্মদ ইকবাল হোসেন। শেখ হাসিনা পালানোর এক সপ্তাহ পর সামাজিক মাধ্যমে ছড়িয়ে পড়া এক ভিডিওতে তাকে দেখা যায়। অভ্যুত্থানকালে ধারণ করা সেই ভিডিওতে তিনি তৎকালীন স্বরাষ্ট্রমন্ত্রী আসাদুজ্জামান খান কামালকে আন্দোলনের ফুটেজ দেখিয়ে বলছেন, ‘গুলি করি, মরে একটা, একটাই যায় স্যার, বাকিডি যায় না।’" },
    { type: 'p', content: "এর পর আর জনসমক্ষে দেখা যায়নি ইকবালকে।" },
    { type: 'p', content: "১৩ আগস্ট, ভিডিও ভাইরাল হওয়ার সময়ই ইকবালকে বদলি করা হয় খুলনা রেঞ্জে। ২০ আগস্ট তাকে ডিবি হেফাজতে নেওয়ার খবর প্রকাশিত হয় একাধিক গণমাধ্যমে।" },
    { type: 'p', content: "কিন্তু পরে আর তার হদিস পাওয়া যায়নি। তাকে আসলেই ডিবি হেফাজতে নেওয়া হয়েছিল কি না জানতে চাইলে কোনো মন্তব্য করেনি ডিএমপি।" },
    { type: 'p', content: "তবে, জননিরাপত্তা বিভাগের বিজ্ঞপ্তি অনুযায়ী, ২৮ আগস্ট থেকে কর্মস্থলে অনুপস্থিত আছেন ইকবাল। এর প্রায় ১১ মাস পর, ২০২৫ সালের ১৮ জুলাই তাকে সাময়িকভাবে বরখাস্ত করা হয়।" },
    { type: 'p', content: "পুলিশের এজাহার অনুযায়ী, গণঅভ্যুত্থানের সময় যাত্রাবাড়ী এলাকায় দায়িত্বে ছিলেন ওয়ারী বিভাগের তিনজন এডিসি ও দুজন এসি। তাদের মধ্যে দুজন এখন এপিবিএন ও র‍্যাবে কর্মরত। তিনজন গত বছরের সেপ্টেম্বর ও নভেম্বর মাস থেকে নিখোঁজ।" },
    { type: 'p', content: "এজাহার ঘেঁটে ও আন্দোলনের সময় রাস্তায় থাকা এসআই-কনস্টেবলদের সঙ্গে কথা বলে ১৬ থেকে ২১ জুলাইয়ের মধ্যে ঢাকার অন্যান্য এলাকায় সক্রিয় ঊর্ধ্বতন কর্মকর্তাদের শনাক্ত করেছে দ্য ডেইলি স্টার।" },
    { type: 'p', content: "যাত্রাবাড়ীসহ ঢাকা মহানগর এলাকায় এরকম ৩৮ জন ডিসি, এডিসি ও এসির তালিকা তৈরি করেছে দ্য ডেইলি স্টার। তালিকার এই ৩৮ কর্মকর্তার মধ্যে দুজন বর্তমানে কারাগারে। ১৪ জন বিভিন্ন সময়ে পালিয়েছেন এবং বাকি ২২ জন এখনো চাকরিতে বহাল।" },
    
    { type: 'component', name: 'OfficerTable' },
    { type: 'component', name: 'AudioSection' },
    
    { type: 'h2', content: "পুলিশ কর্মকর্তাদের পলায়ন" },
    
    { type: 'p', content: "ডিএমপি কমিশনার হাবিবুর রহমান, ডিবি প্রধান হারুন অর রশীদ, যুগ্ম কমিশনার বিপ্লব কুমার সরকারসহ ডিএমপির অন্তত ১০ জন ঊর্ধ্বতন কর্মকর্তাকে ৫ আগস্টের পর আর কর্মস্থলে দেখা যায়নি।" },
    { type: 'p', content: "আগস্ট ও সেপ্টেম্বরে অনেক পুলিশ কর্মকর্তা পালিয়ে যাওয়ার পর ১ অক্টোবর স্বরাষ্ট্র উপদেষ্টা লেফটেন্যান্ট জেনারেল (অব.) জাহাঙ্গীর আলম চৌধুরী এক বক্তৃতায় বলেন, ‘যারা এখনো কাজে যোগদান করেনি তাদের আমরা পুলিশ বলব না। তাদের ক্রিমিনাল বলব।’" },
    { type: 'p', content: "পলাতক কর্মকর্তাদের খুঁজে বের করে গ্রেপ্তার করা হবে, এই আশ্বাসও দেন তিনি।" },
    { type: 'p', content: "উপদেষ্টার এই বক্তব্যের ছয় দিন পর ‘গ্রেপ্তারের তালিকায় ৯০ পুলিশ কর্মকর্তা’ শিরোনামে একটি প্রতিবেদন প্রকাশ করে একটি জাতীয় দৈনিক। অভ্যন্তরীণ সূত্রের বরাত দিয়ে প্রতিবেদনে বলা হয়, অভ্যুত্থান সংশ্লিষ্ট অপরাধের জন্য গ্রেপ্তারের লক্ষ্যে ৯০ জন কর্মকর্তার একটি তালিকা তৈরি করেছে পুলিশ কর্তৃপক্ষ।" },
    { type: 'p', content: "তালিকাটি আনুষ্ঠানিকভাবে কখনোই প্রকাশিত হয়নি। তবে চারজন এসি ও এডিসি দ্য ডেইলি স্টারকে নিশ্চিত করেছেন, পুলিশের ভেতরে এই তালিকা তখনই ছড়িয়ে যায়।" },
    { type: 'p', content: "নাম প্রকাশ না করার শর্তে এক কর্মকর্তার দাবি, কয়েকটি ব্যাচকে ‘টার্গেট’ করে এই তালিকা করা হয়েছিল। সেসব ব্যাচের কর্মকর্তারা অভ্যুত্থানের সময় এডিসি বা সমমানের র‍্যাংকধারী ছিলেন।" },
    { type: 'p', content: "তিনি আরও দাবি করেন, ‘লিস্টে নাম দেখার পর প্রায় সবাই নাম কাটানোর জন্য উপর মহলে ঘুষ দিয়ে বা বিভিন্ন দলের নেতাদের ধরে তদবির শুরু করে।’" },
    createQuote("যারা কোনোভাবেই ব্যবস্থা করতে পারেনি, তারা তখন আমার মতো দেশ ছেড়ে পালায়,", "বর্তমানে মালয়েশিয়ায় অবস্থানরত এই সাবেক এডিসি"),
    { type: 'p', content: "আরও তিনজন পলাতক কর্মকর্তা একই দাবি করেছেন। তবে, এসব দাবি স্বাধীনভাবে যাচাই করতে পারেনি ডেইলি স্টার।" },
    { type: 'p', content: "অক্টোবরে স্বরাষ্ট্র উপদেষ্টার ঘোষণা ও ৯০ জনের তালিকা প্রকাশের পর আরও অন্তত ১৩ জন সাবেক ডিএমপি কর্মকর্তা তাদের কর্মস্থল ছেড়ে পালিয়েছেন। এই ১৩ জনের মধ্যে ১২ জনই এডিসি।" },
    { type: 'p', content: "পুলিশ সদরদপ্তর সূত্র জানিয়েছে, পালানোর সময় বা পালানোর পর কোনো কর্মকর্তা গ্রেপ্তার হননি।" },
    
    { type: 'component', name: 'Absconded' },
    { type: 'h2', content: "বদলি ও গ্রেপ্তার" },
    
    { type: 'p', content: "অভ্যুত্থানকালে ডিএমপি তিন শীর্ষ পদে—কমিশনার, অতিরিক্ত কমিশনার এবং যুগ্ম কমিশনার হিসেবে মোট ২২ জন কর্মরত ছিলেন। তাদের মধ্যে শুধু যুগ্ম কমিশনার মোহাম্মদ শহীদুল্লাহ আগস্ট-পরবর্তী সময়ে গ্রেপ্তার হয়েছেন। তবে সেটা জুলাই-সংশ্লিষ্ট কোনো মামলা নয়।" },
    { type: 'p', content: "অভ্যুত্থান সংক্রান্ত মামলায় ডিএমপির মোট ১১ সাবেক কর্মকর্তাকে কারাগারে পাঠানো হয়েছে। তাদের মধ্যে দুজন অভ্যুত্থানের সময় পুলিশের আঞ্চলিক কমান্ড, অর্থাৎ কোনো বিভাগ বা জোনের দায়িত্বে ছিলেন। এই দুজন হচ্ছেন মিরপুর বিভাগের সাবেক ডিসি ও এডিসি।" },
    { type: 'p', content: "ডিএমপি কর্মকর্তারা কোথায় কোথায় বদলি হয়েছেন, তা বের করতে ২০২৪ সালের আগস্ট থেকে ২০২৫ সালের আগস্ট পর্যন্ত পুলিশের বদলি সংক্রান্ত ৯৭টি প্রজ্ঞাপন পর্যালোচনা করে ১৩ শতাধিক বদলির বিজ্ঞপ্তি পর্যালোচনা করেছে দ্য ডেইলি স্টার।" },
    { type: 'component', name: 'Transfers' },
    { type: 'p', content: "পুলিশের একাধিক সূত্রের মতে, বাহিনীর ভেতরে ঊর্ধ্বতন কর্মকর্তাদের জন্য সংযুক্ত বা ওএসডিকেই ‘সবচেয়ে বড় শাস্তি’ হিসেবে দেখা হয়।" },
    
    { type: 'h2', content: "আটকে আছে তদন্ত, বিচার, সংস্কার" },
    
    { type: 'p', content: "পুলিশ প্রবিধান অনুযায়ী, যেকোনো ধরনের আগ্নেয়াস্ত্র ব্যবহারের পর কমান্ডিং কর্মকর্তাকে একটি বিস্তারিত লিখিত প্রতিবেদন তৈরি করতে হয়। এরপর বলপ্রয়োগ যৌক্তিক ছিল কি না, তা নির্ধারণের জন্য বাধ্যতামূলকভাবে একটি ‘পূর্ণাঙ্গ প্রশাসনিক তদন্ত’ করতে হয়।" },
    { type: 'p', content: "নতুন প্রশাসন ক্ষমতা গ্রহণের ১৫ মাস পরও এই বাধ্যতামূলক তদন্তগুলো করা হয়নি।" },
    { type: 'p', content: "অভ্যন্তরীণ তদন্ত শুরু হয়েছে কি না, জানতে চাইলে পুলিশ সদর দপ্তর জানায়, কর্মকর্তাদের বিরুদ্ধে দায়ের করা মামলা ‘সর্বোচ্চ গুরুত্বের সঙ্গে’ তদন্ত করা হচ্ছে।" },
    { type: 'p', content: "ঢাকা মহানগর এলাকায় জুলাই-সংক্রান্ত মোট ৪৫৯টি হত্যা মামলা হয়েছে, যার অধিকাংশের প্রধান আসামি পুলিশ। পুলিশের বিরুদ্ধে হওয়া এসব মামলার তদন্ত করছে সংশ্লিষ্ট থানার পুলিশ কর্মকর্তারাই। ১৫ মাসেও এসব মামলার একটিরও তদন্তকাজ শেষ হয়নি।" },
    { type: 'p', content: "১৮ জুলাই বাড্ডা ও মোহাম্মদপুরে পৃথক ঘটনায় গুলিবিদ্ধ হয়ে মারা যান হাছান (১৮) ও ইসমাইল (১৬)। আন্দোলনের সঙ্গীদের বরাত দিয়ে এই দুই পরিবারের দাবি, পুলিশের গুলিতেই তাদের স্বজনের মারা গিয়েছিল। হাছানের পরিবার বাড্ডা থানায় ও ইসমাইলের পরিবার আন্তর্জাতিক অপরাধ ট্রাইব্যুনালে মামলা করেছিল।" },
    { type: 'p', content: "কিন্তু প্রায় দেড় বছর হয়ে গেলেও এই দুই পরিবার এখনো জানে না, তাদের সন্তানদের কারা হত্যা করেছিল।" },
    { type: 'p', content: "ইসমাইলের মা তাসলিমা আক্তার কান্নাভেজা কণ্ঠে ডেইলি স্টারকে বলেন, ‘আমার একমাত্র পুলাটারে নিয়া গেলো ওরা। বিচার পাওয়ার কোনো লক্ষণও দেখতেছি না।’" },  
    { type: 'p', content: "‘এতদিনে পুলিশ একবারও মামলার আপডেট জানায়নি আমাদের,’ বলেন হাছানের দুলাভাই আতাউর রহমান।" },
    { type: 'p', content: "এদিকে, যেসব আইনের বলে অতিরিক্ত বলপ্রয়োগ করতে পেরেছে পুলিশ, সেসব আইনও অপরিবর্তিত আছে।" },  
    { type: 'p', content: "আইনজীবী জাহেদ ইকবালের মতে, আসল আসামিরা শেষ পর্যন্ত বিচারের আওতায় না এলে এবং আইন অনুযায়ী বলপ্রয়োগে পুলিশের এখতিয়ার নিয়ে যেসব অস্বচ্ছতা আছে, সেগুলো দূর না করা হলে, আবারও জুলাই-আগস্টের মতো দৃশ্যপট দেখার সম্ভাবনা থেকেই যাবে।" },
  ],

  documentsSection: {
    title: "সোর্স ডকুমেন্টস",
    captions: [ "বেশিরভাগ এফআইআর-এ ঘটনাস্থলে উপস্থিত কর্মকর্তাদের এইভাবে উল্লেখ করা হয়েছে।", "কিছু ক্ষেত্রে, কর্মকর্তাদের সরাসরি গুলি করার 'আদেশ' দাতা হিসেবে নাম উল্লেখ করা হয়েছে।" ],
    alt_texts: [ "এফআইআর ডকুমেন্ট যেখানে কর্মকর্তাদের পদমর্যাদা অনুসারে উল্লেখ করা হয়েছে", "এফআইআর ডকুমেন্ট যেখানে একজন নির্দিষ্ট কর্মকর্তাকে গুলি করার আদেশদাতা হিসেবে নাম দেওয়া হয়েছে" ]
  },

  methodologySection: {
    title: "যেভাবে দ্য ডেইলি স্টার অনুসন্ধানটি করেছে",
    content: [
      "২০২৪ সালের জুলাইয়ের শেষদিকে ২২টি থানায় পুলিশের দায়ের করা মামলার এজাহার চিফ মেট্রোপলিটন ম্যাজিস্ট্রেট (সিএমএম) আদালতে জমা দেওয়া হয়। ডেইলি স্টার সেই এজাহারগুলো সংগ্রহ করেছে। এজাহার এবং ব্যবহৃত অস্ত্রের সারণিবদ্ধ তথ্য আমাদের সরবরাহ করেছে ‘ল’ইয়ার্স ফর এনার্জি, এনভায়রনমেন্ট অ্যান্ড ডেভেলপমেন্ট (লিড)’ নামের একটি সংগঠন।",
      "বেশিরভাগ এজাহারে পুলিশের, কিছু ক্ষেত্রে আনসারের মতো সহযোগী সংগঠনের ব্যবহৃত অস্ত্রের ধরন ও সংখ্যা উল্লেখ আছে। ঘটনাস্থলে উপস্থিত ঊর্ধ্বতন কর্মকর্তা এবং গুলি চালানোর আদেশের কথাও এজাহারে উল্লেখ ছিল। তবে বেশিরভাগ ক্ষেত্রেই এসব কর্মকর্তার নাম না দিয়ে তাদের পদবি ও কর্মস্থল (যেমন: ‘ডিসি, তেজগাঁও জোনের নির্দেশে’) উল্লেখ করা হয়েছে।",
      "আমরা ‘ওয়েব্যাক মেশিন’ ব্যবহার করে ২০২৪ সালের মার্চে ডিএমপির ওয়েবসাইটে থাকা কর্মকর্তাদের (সহকারী কমিশনার থেকে পুলিশ কমিশনার পর্যন্ত) তালিকা সংগ্রহ করি। এরপর স্বরাষ্ট্র মন্ত্রণালয় ও পুলিশের ওয়েবসাইটে প্রকাশিত মার্চ থেকে জুলাই পর্যন্ত বদলি সংক্রান্ত প্রজ্ঞাপনগুলোর সঙ্গে ওই তালিকা মিলিয়ে দেখি। এর মাধ্যমে অভ্যুত্থানের সময় ডিএমপিতে কর্মরত ৩৬৫ জন কর্মকর্তার একটি চূড়ান্ত তালিকা তৈরি করা হয়।",
      "এজাহার পর্যালোচনা করে আমরা প্রাণঘাতী অস্ত্র ব্যবহারের নির্দেশদাতা কর্মকর্তাদের একটি তালিকা তৈরি করি। এর মধ্যে এমন কর্মকর্তারাও ছিলেন, যাদের গুলি চালানোর নির্দেশ দেওয়ার কথা সরাসরি উল্লেখ আছে, গুলি ছোড়ার সময় ঘটনাস্থলে উপস্থিত থাকার কথা নথিভুক্ত আছে, অথবা যাদের ‘ঊর্ধ্বতন কর্মকর্তা’ হিসেবে গুলি চালানোর অনুমতি বা নির্দেশ দেওয়ার কথা বলা হয়েছে।",
      "এরপর আমরা তাদের অধীনে কর্মরত একাধিক জুনিয়র কর্মকর্তার সাক্ষাৎকার নিয়ে এই শনাক্তকরণ প্রক্রিয়াটি যাচাই করি।",
      "অভ্যুত্থানের সময়ের ডিএমপি তালিকার সঙ্গে ২০২৪ সালের জুলাইয়ের শেষদিকে দায়িত্বরত কর্মকর্তাদের তালিকা তুলনা করে আমরা দেখি, মাত্র ৪৫ কর্মকর্তা নিজ পদে বহাল ছিলেন। এর অর্থ, বাকি ৩২০ জন বদলি হয়েছেন, অবসরে গেছেন, কিংবা পালিয়েছেন।",
      "আমরা সরকারি ওয়েবসাইট থেকে ২০২৪ সালের আগস্টের পর জারি হওয়া সব বদলির প্রজ্ঞাপনও সংগ্রহ করি, যার মাধ্যমে ডিএমপির ২৩৬ কর্মকর্তার বদলির তথ্য পাওয়া যায়।",
      "বিশ্লেষণের সুবিধার জন্য আমাদের চার্টগুলোতে কর্মকর্তাদের দুটি ভাগে ভাগ করা হয়েছে।",
      "<strong>শীর্ষ পদমর্যাদার কর্মকর্তা</strong>: পুলিশ কমিশনার, অতিরিক্ত পুলিশ কমিশনার, যুগ্ম পুলিশ কমিশনার, উপকমিশনার।",
      "<strong>অন্যান্য</strong>: অতিরিক্ত উপকমিশনার, সহকারী কমিশনার।",
      "ডেটা ভিজ্যুয়ালাইজেশনের সুবিধার জন্য, আমরা কর্মকর্তাদের বদলির ২১টি ভিন্ন ভিন্ন কর্মস্থলকে পাঁচটি প্রধান ভাগে ভাগ করেছি। সম্পূর্ণ শ্রেণিবিন্যাসটি নিচে বিস্তারিত দেওয়া হলো:",
    ],
    table: {
      headers: ["প্রশিক্ষণ কেন্দ্র", "বিশেষায়িত অপারেশনাল ইউনিট", "ভৌগোলিক ফিল্ড কমান্ড", "কেন্দ্রীয় ও আঞ্চলিক প্রশাসন", "তদন্ত ও গোয়েন্দা সংস্থা"],
      rows: [
        ["বাংলাদেশ পুলিশ একাডেমি", "অ্যান্টি-টেরোরিজম ইউনিট", "সার্কেল", "পুলিশ হেডকোয়ার্টার্স", "সিআইডি"],
        ["ইন-সার্ভিস ট্রেনিং সেন্টার", "আর্মড পুলিশ ব্যাটালিয়ন (এপিবিএন)", "জেলা পুলিশ", "রেঞ্জ অফিস", ""],
        ["পুলিশ স্টাফ কলেজ", "হাইওয়ে পুলিশ", "মেট্রোপলিটন", "", "পিবিআই"],
        ["পুলিশ স্পেশাল ট্রেনিং স্কুল", "ইন্ডাস্ট্রিয়াল পুলিশ", "", "", ""],
        ["পুলিশ ট্রেনিং সেন্টার", "নৌ পুলিশ", "", "", ""],
        ["", "র‍্যাব", "", "", ""],
        ["", "রেলওয়ে পুলিশ", "", "", ""],
        ["", "ট্যুরিস্ট পুলিশ", "", "", ""]
      ]
    }
  },

  credits: {
    line: "<strong>অতিরিক্ত রিপোর্টিং:</strong> ইমরুল হাসান বাপ্পি, দীপংকর রায়, সুশান্ত ঘোষ ও সোহানুর রহমান রাফি। <strong>গবেষণা:</strong> শারমিন সিকদার, মাশফিক মিজান, অনিক আর্নল্ড ঢালী, সুব্রত রায়, সামসুল আরেফিন খান, খালিদ হোসাইন, নবিদ ইয়াসিন, বাদশা মোল্লা, তানজিলা তাসনিম, উসরাত ফাহমিদাহ ও রাহি নায়েব।"
  },

  headline: {
    line1: "জুলাই অভ্যুত্থান", line2: "গুলির নির্দেশদাতা", line3: "কর্মকর্তারা কে কোথায়?",
    datePublished: "প্রকাশিত:", dateUpdated: "আপডেট:",
    creditReporting: "রিপোর্টিং:", creditDataViz: "ডেটা, ভিজ্যুয়ালাইজেশন ও ওয়েব ডেভেলপমেন্ট:", creditGraphics: "গ্রাফিক্স:", creditEditing: "সম্পাদনা:",
    nameReporting: "কিরো আদনান আহমেদ", nameDataViz: "মুহাম্মদ ইমরান", nameGraphics: "আনোয়ার সোহেল", nameEditing: "মার্টিন স্বপন পান্ডে",
    formatDate: formatBengaliDate
  },

  policeMap: {
    scrollyTextboxes: {
      "1": "অভ্যুত্থানকালে পুলিশের করা মামলার এজাহার ঘেঁটে ১৬ থেকে ২১ জুলাই পর্যন্ত ঢাকায় কী পরিমাণ গোলা-বারুদ ব্যবহার করেছে পুলিশ, তার হিসেব বের করেছে দ্য ডেইলি স্টার।",
      "2": "নথি অনুযায়ী, ঢাকায় প্রথম গুলিবর্ষণের ঘটনা ঘটে মহাখালী রেলগেটে। তবে বনানী থানার এজাহার অনুযায়ী, সেদিন পুলিশের ছোঁড়া সিংহভাগ গুলিই ছিল রাবার বুলেট।",
      "3": "আবু সাঈদের মৃত্যুর পর সব বিশ্ববিদ্যালয় বন্ধ করে দেওয়ার নির্দেশ দেয় সরকার। আন্দোলনের কেন্দ্রবিন্দু ঢাকা বিশ্ববিদ্যালয়ের (ঢাবি) আবাসিক হলগুলো থেকে শিক্ষার্থীদের বের করতে তীব্র বলপ্রয়োগ করে পুলিশ। ২০০৭ সালের পর প্রথম ক্যাম্পাসে গুলি চালায় কোনো রাষ্ট্রীয় বাহিনী।",
      "4": "একইদিনে যাত্রাবাড়ী হয়ে ওঠে আন্দোলনের অন্যতম ভরকেন্দ্র। সেদিনই প্রথমবারের মতো আন্দোলনকারীদের ঠেকাতে দফায় দফায় গুলি চালিয়ে যায় পুলিশ। তবে প্রাণঘাতী বুলেটের চেয়ে রাবার বুলেট বেশি ব্যবহার করেছিল তারা, যা পরদিন থেকে আর দেখা যায়নি।",
      "5": "ঢাকার অন্তত ১৩টি এলাকায় মরণাস্ত্র ব্যবহার করে পুলিশ। পুলিশের এজাহার অনুযায়ী, সেদিন ঢাকা মহানগরে ১০ হাজারের বেশি প্রাণঘাতী বুলেট ছোড়া হয়, যার প্রায় অর্ধেকই ছিল যাত্রাবাড়ীতে।",
      "6": "শাহবাগ, মোহাম্মদপুর ও উত্তরা পশ্চিম থানায় কর্মরত তিনজন উপপরিদর্শক (এসআই) নাম প্রকাশ না করার শর্তে জানান, সেদিন শটগানের জন্য রাবারের বদলে বেশি করে সিসা কার্তুজ নেওয়ার নির্দেশ দেওয়া হয়েছিল তাদের।",
      "7": "একইদিনে তৎকালীন প্রধানমন্ত্রী শেখ হাসিনা ‘লিথাল' অস্ত্র অস্ত্র ব্যবহারের অনুমোদন দেন। দ্য ডেইলি স্টারের যাচাই করা <a href=\"https://soundcloud.com/thedailystar/hasinas-deadly-order-during-july-uprising-1\" target=\"_blank\" rel=\"noopener noreferrer\">একটি ফোনালাপে</a> তাকে বলতে শোনা যায়, আন্দোলনকারীদের ‘যেখানেই পাবে, গুলি করবে'। সারাদেশে প্রায় ১০০ আন্দোলনকারী নিহত হয় সেদিন।",
      "8": "শুক্রবার ছিল জুলাই মাসের সবচেয়ে রক্তক্ষয়ী দিন। সারাদেশে নিহতের সংখ্যা দাঁড়ায় প্রায় ৩০০। রাজধানীতে সেদিন রাবার বুলেটের চেয়ে তিনগুণেরও বেশি প্রাণঘাতী বুলেট ব্যবহার করা হয়।",
      "9": "উত্তরা ১২ নম্বর সেক্টর, গুলশান, মহাখালী ও যাত্রাবাড়ীতে মোট গোলাবারুদের ৮০ শতাংশেরও বেশি ছিল প্রাণঘাতী গুলি।",
      "10": "এদিন টি৫৬ (T56) অ্যাসল্ট রাইফেলের ব্যবহারও ব্যাপক হারে বেড়ে যায়। জাতিসংঘের প্রতিবেদন অনুযায়ী, অভ্যুত্থানে সর্বোচ্চ মানুষ মারা গেছে এই অস্ত্রের গুলিতেই।",
      "11": "নাম প্রকাশ না করার শর্তে একজন এসআই দ্য ডেইলি স্টারকে বলেন, ‘এটাই সবচেয়ে লিথাল অস্ত্র। এটা দিয়ে ৩০০ মিটার দূর থেকে টার্গেট করতে পারবেন আপনি।'",
      "12": "অস্ত্র বিশেষজ্ঞরা বলছেন, টাইপ ৫৬ রাইফেল যুদ্ধক্ষেত্রে ব্যবহারের জন্য তৈরি, যা অনেক বুলেটপ্রুফ ভেস্টকেও ভেদ করতে সক্ষম। আইনশৃঙ্খলা নিয়ন্ত্রণে কখনোই এই অস্ত্র ব্যবহার করা হয় না।",
      "13": "কারফিউয়ের প্রথম দিনে ঢাকার সাত এলাকায় আরও প্রায় ৫ হাজার রাউন্ড প্রাণঘাতী গুলি ছোড়ে পুলিশ।",
      "14": "জুলাই ১৬ থেকে ২১ পর্যন্ত, রক্তক্ষয়ী আন্দোলনের প্রথম ছয় দিনে ঢাকার ২২টি হটস্পটে পুলিশ ও সহযোগ সংস্থাগুলো অন্তত ৩৪ হাজার ৪১২ রাউন্ড প্রাণঘাতী বুলেট ছুঁড়েছে।"
    },
    thanaNames: {
        "Badda": "বাড্ডা", "Dhanmondi": "ধানমন্ডি", "Kalabagan": "কলাবাগান", "Kodomtoli": "কদমতলী", "Motijheel": "মতিঝিল", "Jatrabari": "যাত্রাবাড়ী", 
        "Kafrul": "কাফরুল", "Uttara West": "উত্তরা পশ্চিম", "Mohammadpur": "মোহাম্মদপুর", "Rampura": "রামপুরা", "New Market": "নিউ মার্কেট", "Banani": "বনানী", 
        "Paltan": "পল্টন", "Pallabi": "পল্লবী", "Shahbagh": "শাহবাগ", "Shahjahanpur": "শাহজাহানপুর", "Uttara East": "উত্তরা পূর্ব", "Gulshan": "গুলশান", "Adabor": "আদাবর", 
        "DU Area": "ঢাবি এলাকা", "Ramna": "রমনা"
      },
    uiText: {
        thanaHeader: "থানা", totalLabel: "মোট",
        seeDetail: "বিস্তারিত দেখুন",
        ammoLabels: { t56: 'টাইপ ৫৬', lethal: 'প্রাণঘাতী', rubber_cartridge: 'রাবার কার্তুজ', shotgun_shell: 'শটগান শেল', tear_gas_grenade: 'টিয়ার গ্যাস', baton_rounds: 'ব্যাটন রাউন্ড', non_lethal: 'অ-প্রাণঘাতী' },
        monthNames: [ "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর" ]
    },
        finalNote: [
        "*এখানে উপস্থাপিত গোলাবারুদের গণনা একটি আংশিক হিসাব। এই তথ্য প্রাপ্তিসাধ্য FIR-এর উপর ভিত্তি করে তৈরি, কিন্তু কিছু নথি পাঠযোগ্য ছিল না বা সংগ্রহ করা সম্ভব হয়নি।",
        "*কিছু থানার FIR-এ, যেমন মিরপুর মডেল ও উত্তরা পূর্ব, গোলাবারুদের পরিমাণ উল্লেখ না করে অস্পষ্টভাবে ‘বিপুল পরিমাণ গোলাবারুদ’ লেখা হয়েছে।",
        "*শাহবাগ, বনানী, এবং শাহজাহানপুর থানার নথিভুক্ত অভিযানগুলো যথাক্রমে ঢাকা বিশ্ববিদ্যালয় এলাকা, মহাখালী এবং মালিবাগে অবস্থিত ছিল।"
    ]
  },
  
  transfers: {
    scrollySteps: [
      { title: 'জুলাইয়ের ডিএমপি', description: 'অভ্যুত্থানকালে ঢাকা মহানগরে এসি ও উপরের র‍্যাংকের মোট <span style="background-color: #9ca3af; color: white; padding: 2px 6px; border-radius: 4px; font-weight: 600;">৩৬৫ জন</span> পুলিশ কর্মকর্তা ছিলেন। প্রতিটি ডট একজন পুলিশ কর্মকর্তাকে প্রতিনিধিত্ব করে।' },
      { title: '৮৮ শতাংশ ইতোমধ্যে ডিএমপি ছেড়েছেন', description: 'এক বছর পর, তাদের মধ্যে মাত্র ৪৫ জন এখনো ডিএমপিতে আছেন।<span style="background-color: #663399; color: white; padding: 2px 6px; border-radius: 4px; font-weight: 600;">বাকি ৩২০ জন</span> হয় বদলি হয়েছেন, অবসর নিয়েছেন বা পালিয়েছেন। ডেইলি স্টার ২৩৬ জন সিনিয়র কর্মকর্তার বদলির তথ্য পেয়েছে।' },
      { title: 'জেষ্ঠ্যতার ক্রমানুসারে কর্মকর্তাদের দুই ভাগ', description: 'বদলি হওয়া কর্মকর্তাদের মধ্যে ৬৪ জন <span style="background-color: #fdba74; color: white; padding: 2px 6px; border-radius: 4px; font-weight: 600;">ডিসি বা উপরের র‍্যাংকের।</span> বাকি ১৭২ জন <span style="background-color: #4E79A7; color: white; padding: 2px 6px; border-radius: 4px; font-weight: 600;">এডিসি বা এসি র‍্যাংকধারী।</span>' },
      { title: 'বদলির ধরন', description: 'ডিএমপি কর্মকর্তাদের মোট ২১টি ভিন্ন ভিন্ন দপ্তরে বদলি করা হয়েছে। সিনিয়র কর্মকর্তাদের ৪৫ শতাংশই বদলি হয়েছেন রেঞ্জ ডিআইজির কার্যালয়ে (কেন্দ্রীয় ও আঞ্চলিক প্রশাসন)। তবে সামগ্রিকভাবে সবচেয়ে বেশি কর্মকর্তা বদলি হয়েছেন র‍্যাব ও এপিবিএনের মতো বিশেষায়িত অপারেশনাল ইউনিটগুলোতে।' },
      { title: 'সংযুক্ত', description: 'বদলি হওয়া কর্মকর্তাদের মধ্যে ১৪ শতাংশকে ‘সংযুক্ত’ করা হয়েছে। পুলিশের পরিভাষায় যখন কোনো কর্মকর্তাকে সংযুক্ত করা হয়, তখন তার নির্দিষ্ট দায়িত্ব থাকে না। অর্থাৎ, আনুষ্ঠানিকভাবে বরখাস্ত না করে সেই কর্মকর্তাকে সংযুক্ত করা হয়।' },
      { title: 'সংযুক্ত সবাই সিনিয়র', description: 'ডিসি ও এর উপরের পদমর্যাদার কর্মকর্তাদের অর্ধেককেই বিভিন্ন জায়গায় সংযুক্ত করে রাখা হয়েছে। এবং ডিসির নিচে র‍্যাংকধারী একজন কর্মকর্তাকেও সংযুক্ত করা হয়নি।' }
    ],
    tooltipLabels: { id: "আইডি", rank: "পদমর্যাদা", rank_level: "পদের স্তর", destination_cluster: "বদলি ক্লাস্টার", attached: "সংযুক্ত", yes: "হ্যাঁ", no: "না", not_applicable: "প্রযোজ্য নয়" },
    clusterLabels: {
      high_rank: "উচ্চ পদমর্যাদা", low_rank: "নিম্ন পদমর্যাদা", attached: "সংযুক্ত", others: "অন্যান্য",
      'Specialized Operational Units': 'বিশেষায়িত অপারেশনাল ইউনিট', 'Training & Development': 'প্রশিক্ষণ কেন্দ্র', 'Central & Regional Administration': 'কেন্দ্রীয় ও আঞ্চলিক প্রশাসন', 'Investigation & Intelligence': 'তদন্ত ও গোয়েন্দা সংস্থা', 'Geographic Field Commands': 'ভৌগোলিক ফিল্ড কমান্ড'
    }
  },

audioSection: {
    heading: "অভিযুক্তদের বক্তব্য",
    text: `চাকরিতে বহাল থাকা ২২ কর্মকর্তার মধ্যে ১৮ জনের সঙ্গে যোগাযোগ করতে সক্ষম হয়েছে দ্য ডেইলি স্টার। বাকি চারজনের সঙ্গে তাদের নিজস্ব বা কর্মস্থলের নম্বরে যোগাযোগ করা সম্ভব হয়নি।
      <br><br>
      তালিকায় থাকা চাকরিরত পাঁচ ডিসি বলেছেন, তারা কখনো কাউকে গুলি চালানোর নির্দেশ দেননি। যদিও, এজাহারে তাদের নিজস্ব জোনে হওয়া আন্দোলনস্থলে গিয়ে অধস্তনদের নির্দেশনা দেওয়ার কথা সুর্নিদিষ্ট উল্লেখ আছে। কিন্তু ডেইলি স্টারকে তারা বলেছেন, সেই দিনগুলোতে তারা আন্দোলনস্থলে উপস্থিত ছিলেন না।
      <br><br>
      তালিকায় থাকা আট এডিসি ও এক সিনিয়র এসির মধ্যে পাঁচজনের সঙ্গে যোগাযোগ করা হয়েছে। তাদের মধ্যে চারজনই আন্দোলন দমনে কোনো ভূমিকা পালন করেননি বলে দাবি করেছেন, কিংবা চলমান তদন্তের কারণ দেখিয়ে কোনো মন্তব্য করতে রাজি হননি।
      <br><br>
      ডিসি-এডিসিদের মধ্যে শুধু একজন কর্মকর্তাই আন্দোলনের সময় নিজের ভূমিকা নিয়ে কথা বলেছেন।`,

    accordionTitle: "পুরো বক্তব্য পড়ুন",
    items: [
      {
        headline: "",
text: `ধানমন্ডি জোনের সাবেক এডিসি ইহসানুল ফেরদৌস বলেন, ‘আপনারা তো জানেনই, ওপর থেকে (গুলি করার) নির্দেশনা ছিল। কিন্তু আমি সবসময় চেষ্টা করেছি যতটা সম্ভব কম ক্ষয়ক্ষতি ঘটিয়ে দায়িত্ব পালন করে যেতে। আন্দোলনের সময় আমার অধীনস্থ সব ইউনিটকে আমি কড়া নির্দেশ দিয়েছিলাম, কেউ যেন স্পটে চাইনিজ রাইফেল না নিয়ে যায়।’

<br><br>

আন্দোলনে সবচেয়ে বেশি হত্যার ঘটনা ঘটে অ্যাসল্ট রাইফেলের গুলিতে। ঢাকার অন্তত ১৫টি থানা-পুলিশ এগুলো ব্যবহার করেছে। কিন্তু এর মধ্যে ধানমন্ডির নাম নেই।

<br><br>

ইহসানুল আরও বলেন, ১৮ জুলাই ধানমন্ডি থানাধীন ইউনিট কেবল রাবার বুলেট ও সাউন্ড গ্রেনেড ছুঁড়েছে।

<br><br>

একই ধরনের কথা উল্লেখ আছে নথিতে।

<br><br>

‘১৯ জুলাই আন্দোলনকারীরা সায়েন্স ল্যাব মোড়ে অবস্থান নিয়েছিল। আমরা দূরে দাঁড়িয়ে ছিলাম, তাদের কাছে যাইনি। বিকেলে যখন হেলিকপ্টার থেকে (গুলি) করা হয় এবং তারা আশেপাশে ছড়িয়ে যান। আমরা ছিলাম স্বরাষ্ট্রমন্ত্রীর বাসভবনের সামনে। সেখানে আন্দোলনকারীদের একটি অংশ আক্রমণ করলে আমরা বাসভবনের ভেতর ঢুকে যাই। ইটের আঘাতে আমি নিজেও আহত হই,’ বলেন ইহসানুল।

<br><br>

সেসময় ধানমন্ডি জোনে কর্মরত ছিলেন এমন দুই কর্মকর্তা ইহসানুলের আহত হওয়ার বিষয়টি নিশ্চিত করেছেন।

<br><br>

এজাহার অনুযায়ী, সেদিন ধানমন্ডি থানা পুলিশ ১১৫ রাউন্ড শটগানের গুলি ছুঁড়েছে। তবে এর মধ্যে কয়টি রাবার বুলেট, কয়টি ছররা গুলি, তা নির্দিষ্ট করা হয়নি।

<br><br>

ইহসানুল বলেন, ‘স্বরাষ্ট্রমন্ত্রীর বাসায় হামলা হওয়ার সাথে সাথেই সেখানে এপিবিএন, আনসার চলে আসে। ১০-১৫ মিনিটের মধ্যে র‍্যাব, বিজিবিও চলে আসে।’

<br><br>

‘এই এলাকায় তখন যারা মারা গেছে, সেগুলো এই ফোর্সগুলোর কারণে,’ দাবি করেন তিনি।

<br><br>

পুলিশের করা মামলার এজাহার অনুযায়ী, সেদিন স্বরাষ্ট্রমন্ত্রীর বাসভবনের সামনে যে ৩৩৭ রাউন্ড প্রাণঘাতি বুলেট ছোড়া হয়েছে, তার সবগুলোই করেছে সেখানে কর্মরত আনসার সদস্যরা।

<br><br>

আন্দোলন দমনে রাবার বুলেট, টিয়ার গ্যাসের মতো অপ্রাণঘাতি অস্ত্র ব্যবহার কমিয়ে পুলিশ শহরজুড়ে যে হারে ছররা গুলি ও চাইনিজ রাইফেল ব্যবহার করেছে, তা পুরো বাহিনীর প্রাণঘাতী উদ্দেশ্যকে ফুটিয়ে তোলে কি না, এমন প্রশ্নের জবাবে তিনি বলেন, ‘হ্যাঁ, ইনটেন্ট (উদ্দেশ্য) তো ছিল। ওই সময়ের কথা ভেবে আমার এখনো খারাপ লাগে। পুলিশ, আন্দোলনকারী—দুই পক্ষের জন্যই খারাপ লাগে। কারণ মানুষ মারা গেছে। তারা সবাই এদেশের মানুষ।’

<br><br>

কান্নাভেজা কণ্ঠে তিনি আরও বলেন, ‘আন্দোলনের পরের তিন মাস আমি রাতে ঘুমাতে পারিনি। এখনো চিন্তা করলে ভীষণ খারাপ লাগে।’

<br><br>

ডেইলি স্টারের সঙ্গে কথা বলা কর্মকর্তাদের মধ্যে একমাত্র ইহসানুলই তার বাহিনীর কর্মকাণ্ডের জন্য ‘অনুশোচনা’ প্রকাশ করেছেন।

<br><br>

মিরপুর জোনের সাবেক এডিসি মাসুক মিয়া বলেন, ‘গুলির নির্দেশদাতা হচ্ছেন ডিএমপি কমিশনার। তার নির্দেশ মাঠ পর্যায়ে বাস্তবায়নের দায়-দায়িত্ব সংশ্লিষ্ট ডিসি-ওসির।’

<br><br>

‘এডিসি হিসেবে আমার দায়িত্ব ছিল মিরপুর বিভাগের প্রশাসনিক কাজ—যেমন, ফোর্সের ছুটি, বদলির কাজে ডিসিকে সাহায্য করা। আমি মাঠ পর্যায়ে সরাসরি কোনো অপারেশনে কখনো উপস্থিত ছিলাম না,’ যোগ করেন তিনি।

<br><br>

তিনি আরও দাবি করেন, ‘জুলাই মাসজুড়ে মিরপুর থানায় একজন যুগ্ম কমিশনার অথবা অতিরিক্ত কমিশনার অবস্থান করেছেন। এছাড়া মিরপুরের ডিসিসহ সদরদপ্তর থেকে আসা সিনিয়র অফিসারদের উপস্থিতিতে একজন জুনিয়র অফিসার হিসেবে আমার পক্ষে এমন (গুলি করার) সিদ্ধান্ত দেওয়া সম্ভব না।’

<br><br>

চাকরিরত ৯ এসির মধ্যে আটজনের সঙ্গে যোগাযোগ করেছে ডেইলি স্টার।

<br><br>

মিরপুর জোনের সাবেক এসি হাসান মুহাম্মদ মুহতারিমের দাবি, ১৭ জুলাই মিরপুর অঞ্চলের ঊর্ধ্বতন পুলিশ কর্মকর্তাদের এক বৈঠকে পুলিশের আন্দোলন দমনের পদ্ধতি ঠিক হচ্ছে না বলে মতামত দিয়েছিলেন তিনি। এতে তাকে ‘মীরজাফর’ আখ্যা দেওয়া হয় বৈঠকে।

<br><br>

মুহতারিম আরও দাবি করেন, মিরপুরে পুলিশের একটি ‘গোপালগঞ্জ-ভিত্তিক সিন্ডিকেট’ ছিল, যাদের দৌরাত্ম্যের কারণে বাকি কর্মকর্তারা ‘পাত্তা পেতেন না’।

<br><br>

খোঁজ নিয়ে জানা গেছে, মিরপুরের ডিসি জসীম উদ্দীন ও এডিসি (দারুসসালাম) এম এম মঈনুল ইসলাম দুজনকে গ্রেপ্তার করা হয়েছে।

<br><br>

মুহতারিমের মতো অন্যান্য এসিরাও দাবি করেছেন, নিজে জোনে অফিসারদের মধ্যে সবচেয়ে জুনিয়র কর্মকর্তা হওয়ায় গুলি করার নির্দেশ দেওয়ার এখতিয়ার তাদের ছিল না। কারণ, সেসময় ঢাকাজুড়ে পুলিশের উচ্চপদস্থ কর্মকর্তারা দায়িত্ব পালন করছিলেন।

<br><br>

মতিঝিল জোনের সাবেক এসি (টহল) মিঠুন কুমার কুন্ডুর দাবি, তার দায়িত্ব ফুটপাত নিয়ন্ত্রণের মতো নাগরিক বিষয়াবলিতে সীমাবদ্ধ ছিল। তিনি কখনো আন্দোলন দমনের সঙ্গে জড়িত ছিলেন না।

<br><br>

মোহাম্মদপুর জোনের এসি (টহল) মিজানুর রহমান আন্দোলনস্থলে দায়িত্ব পালন করার কথা স্বীকার করে দাবি করেন, ‘ছাত্রদের পক্ষ’ নেওয়ায় মারধরের শিকার হয়েছিলেন তিনি। তার ভূমিকা বর্তমানে তদন্তাধীন আছে জানিয়ে তিনি আর কোনো মন্তব্য করতে রাজি হননি।

<br><br>

গুলশান জোনের সাবেক এসি শফিকুল ইসলাম দাবি করেন, ১৬ জুলাই মহাখালী পুলিশ বক্সে দায়িত্বরত অবস্থায় সেখানে আগুন লাগিয়ে দেয় আন্দোলনকারীরা। এতে আহত হন তিনি।

<br><br>

শফিকুল জানান, ডাক্তার বিশ্রাম নিতে বললেও সার্বিক আইনশৃঙ্খলা পরিস্থিতি বিবেচনায় তাকে মহাখালীতে দায়িত্ব পালন করতে হয়েছে। তবে তিনি ‘কখনোই কাউকে গুলি করার নির্দেশ দেননি’ বলে দাবি করেন।

<br><br>

‘তবে একটা কথা বলতে চাই, যেদিন সেতু ভবনে হামলা হয় (১৮ জুলাই), সেদিন পুলিশ ভেতরে আটকে পড়া মানুষদের উদ্ধার করতে গিয়েছিল। তখন কিছু ফাঁকা গুলি করে পুলিশ।’

<br><br>

এজাহার অনুযায়ী, সেদিন মহাখালীতে ৮০৮ রাউন্ড প্রাণঘাতী গুলি ছুড়েছিল পুলিশ। এজাহারে ৯১৪ রাউন্ড রাবার কার্তুজ থাকলেও কোনো ফাঁকা গুলির উল্লেখ নেই।

<br><br>

এ ব্যাপারে জানতে চাইলে শফিকুল বলেন, ‘ওপরের দিকে তাক করে মারলে সেটা তো ফাঁকা গুলিই।’

<br><br>

যদিও, পুলিশ প্রবিধিমালায় উপরের দিকে তাক করে প্রাণঘাতি অস্ত্র ব্যবহারের ব্যাপারে কড়া নিষেধাজ্ঞার কথা বলা আছে।

<br><br>

শ্যামপুর জোনের সাবেক এসি শামসুল ইসলাম দাবি করেন, আন্দোলনের সময় তিনি কখনো যাত্রাবাড়ীতে দায়িত্ব পালন করেননি। কিন্তু পুলিশের করা একাধিক এজাহার অনুযায়ী, ১৭ থেকে ২১ জুলাই পর্যন্ত যাত্রাবাড়ীতে দায়িত্বরত ছিলেন তিনি।

<br><br>

ধানমন্ডি জোনের সাবেক এসি আবু তালেব, নিউমার্কেট জোনের সাবেক এসি রেফাতুল ইসলাম এবং উত্তরা জোনের সাবেক এসি সুমন কর আইনি ও প্রাতিষ্ঠানিক বাধ্যবাধকতার কারণ দেখিয়ে মন্তব্য করতে রাজি হননি।`,      },
      // ... keep the rest of your items the same ...
      {
        headline: "",
        text: "",
        iframeSrc: ""
      }
    ]
  },

  officerTable: {
    data: bnOfficerData,
    formatDate: toBengaliNumerals,
    uiText: {
      nameHeader: 'নাম',
      areaHeader: 'এলাকা',
      rankHeader: 'পদবি ও জোন',
      statusHeader: 'স্ট্যাটাস',
      dateHeader: 'তারিখ',
      showLess: 'কম দেখান',
      showMorePrefix: '+ আরও',
      showMoreSuffix: 'দেখুন',
      caption: 'এফআইআর-এ ১২ জন কর্মকর্তার নাম স্পষ্টভাবে উল্লেখ করা হয়েছিল; বাকিদের শনাক্তকরণ সেই সময়ে তাদের অধীনে কর্মরত কমপক্ষে দুজন নিম্নপদস্থ কর্মকর্তার সাক্ষাৎকারের মাধ্যমে নিশ্চিত করা হয়েছে।'
    }
  },

  absconded: {
    data: bnAbscondedData,
    title: 'কর্মকর্তাদের পলায়নের সময়রেখা',
    caption: 'প্রতিটি ডট একজন পলাতক সাবেক ডিএমপি কর্মকর্তাকে প্রতিনিধিত্ব করে',
    legendTopRanked: 'শীর্ষ কর্মকর্তা',
    legendOtherRanks: 'অন্যান্য পদ',
    annotationText: 'শীর্ষ কর্মকর্তাদের<br />বেশিরভাগই পালিয়েছেন<br />৬ আগস্ট',
    footnote: 'অক্টোবরের পর থেকে ১৩ জন সাবেক ডিএমপি কর্মকর্তা তাদের পদ ছেড়েছেন—যাদের মধ্যে ১১ জনই এডিসি।',
    targetOfficerName: 'মোহাম্মদ হারুন অর রশীদ বিপিএম-বার, পিপিএম-বার',
    tooltipRank: 'পদ:',
    tooltipDate: 'তারিখ:',
    loading: 'টাইমলাইন লোড হচ্ছে...',
    error: 'কর্মকর্তাদের ডেটা লোড করা যায়নি।',
    noData: 'প্রদর্শনের জন্য কোনো ডেটা উপলব্ধ নেই।',
    rankMap: {
        'অতিরিক্ত পুলিশ কমিশনার': 'Additional Police Commissioner',
        'সহকারী পুলিশ কমিশনার': 'Assistant Police Commissioner',
        'উপপুলিশ কমিশনার': 'Deputy Police Commissioner',
        'যুগ্ম পুলিশ কমিশনার': 'Joint Police Commissioner',
        'পুলিশ কমিশনার': 'Police Commissioner',
        'অতিরিক্ত উপপুলিশ কমিশনার': 'Additional Deputy Police Commissioner'
    }
  },
};