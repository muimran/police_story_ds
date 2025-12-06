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
  const bengaliDigits = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
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
    heading: "New Section",
    text: "Of the 38 commanding officers identified in this investigation, two are confirmed to be in custody, 14 are confirmed to be absconding, and 22 are believed to be in active service.",
          "The Daily Star contacted 18 of the 22 officers currently in service. The remaining four could not be reached by phone or through the contact numbers of their outposts.",
          "All five DCs currently in service have denied involvement in police shootings, stating they neither gave orders to fire nor were they physically present at the locations where the protesters were shot.",
          "Of the nine senior AC and ADCs believed to be in service, contact was made with five. Four of them either denied involvement or declined to comment, citing the ongoing investigation.",
          "Only one officer, Ihsanul Firdous, former ADC of the Dhanmondi zone, offered a detailed account of his involvement.",
    accordionTitle: "Placeholder Name",
    items: [
      {
        headline: "Placeholder Headline One",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non."
      },
      {
        headline: "Placeholder Headline Two",
        text: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et.",
        iframeSrc: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/12345678"
      },
      {
        headline: "Placeholder Headline Three",
        text: "Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt."
      },
      {
        headline: "Placeholder Headline Four",
        text: "Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac.",
        iframeSrc: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/87654321"
      },
      {
        headline: "Placeholder Headline Five",
        text: "Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla et lacus et lectus vestibulum nonummy. In hac habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis. Curabitur a felis in nunc fringilla tristique. Morbi mattis ullamcorper velit. Phasellus gravida semper nisi. Nullam vel."
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
    { type: 'p', content: "২০২৪ সালের ৫ই আগস্ট। সকালবেলা। প্রধানমন্ত্রী শেখ হাসিনা তখনো জানেন না কয়েক ঘণ্টার মধ্যে সবকিছু নিয়ে দেশ ছেড়ে পালাতে হবে তার। আন্দোলন নিয়ন্ত্রণ করতে পুলিশ ও তিন বাহিনীর প্রধানদের গণভবনে তলব করেন তিনি।" },
    { type: 'p', content: "একাধিক সূত্র জানায়, এই ‘শেষ বৈঠকে’ আন্দোলন দমনে যথেষ্ঠ কঠোর না হওয়ায় সামরিক কর্মকর্তাদের তুলোধুনো করেন হাসিনা। এরপর পুলিশের মহাপরিদর্শকের (আইজিপি) দিকে তাকিয়ে বলেন, ‘তারা (পুলিশ) তো ভালো করছে।’" },
    { type: 'p', content: "অভ্যুত্থানকালীন রাষ্ট্রীয় দমন-পীড়ন ও হত্যাকাণ্ডে পুলিশের ভূমিকা এই বাক্যেই উঠে এসেছে।" },
    { type: 'p', content: "জাতিসংঘের তথ্যানুসন্ধান প্রতিবেদন অনুযায়ী, ১৬ জুলাই থেকে ৫ আগস্ট পর্যন্ত চলা গণঅভ্যুত্থানে নিহতের সংখ্যা প্রায় ১৪০০। মানবাধিকার সংস্থা ও স্বাধীন অনুসন্ধান বলছে, অভ্যুত্থানে নিহতদের অধিকাংশই নিহত হয়েছে পুলিশের গুলিতে।" },
    { type: 'p', content: "আন্দোলনে বলপ্রয়োগ শুরু হওয়ার প্রথম ছয় দিন—১৬ থেকে ২১ জুলাইয়ের রাজধানীর মেট্রোপলিটন এলাকার ২২টি থানার অধীনে অন্তত ৩৪ হাজার ৪১২ রাউন্ড প্রাণঘাতি গুলি ছোড়া হয়েছে। এর মধ্যে যুদ্ধক্ষেত্রে ব্যবহার হওয়া টাইপ-৫৬ রাইফেলের গুলি ছিল চার হাজার ১৪২ রাউন্ড গুলি।" },
    { type: 'p', content: "মিরপুর, যাত্রাবাড়ী, উত্তরা এবং মোহাম্মদপুরের মতো যেসব এলাকায় সবচেয়ে বেশি হতাহতের ঘটনা ঘটেছে, সেখানে আনসার, র‍্যাবের মতো অন্যান্য বাহিনীর সঙ্গে মিলে প্রাণঘাতী অস্ত্র ব্যবহার করতে দেখা গেছে।" },
    { type: 'p', content: "গত তিন মাসে শত শত পৃষ্ঠার দাপ্তরিক নথি পর্যালোচনা করে দ্য ডেইলি স্টার ৩৯ জন পুলিশ কর্মকর্তাকে শনাক্ত করেছে, যাঁদের অধীনস্থ ইউনিটগুলো আন্দোলনকারীদের ওপর গুলি চালিয়ে। কিছু ক্ষেত্রে, এই কর্মকর্তারা ঘটনাস্থলে উপস্থিত থেকে সরাসরি গুলি চালানোর নির্দেশও দিয়েছেন।" },
    { type: 'p', content: "এই ৩৯ কর্মকর্তার মধ্যে ১৩ জন পলাতক, ২৬ জনকে দেশের বিভিন্ন স্থানে বদলি করা হয়েছে এবং মাত্র দুজন গ্রেপ্তার হয়েছেন।" },
    { type: 'h2', content: "আন্দোলন দমনে মরণাস্ত্র" }, 
    { type: 'p', content: "আদালতের রায়ে সরকারি চাকরিতে কোটা ব্যবস্থা পুনর্ব্যবহার হওয়ার পর শিক্ষার্থীরা গতবছরের ৬ জুন প্রথম কোটা সংস্কারের দাবিতে রাস্তায় নামে। আন্দোলন শুরুর প্রথম এক মাসে আইনশৃঙ্খলা বাহিনী এতে হস্তক্ষেপ করেনি।" },
    { type: 'p', content: "পরিস্থিতি পাল্টায় ১৪ জুলাই প্রধানমন্ত্রীর ‘রাজাকারের বাচ্চা’রা বক্তব্যের পর। এর পরই সারা দেশে সড়ক ও রেললাইন অবরোধ করতে শুরু করে আন্দোলনকারীরা।" },
    { type: 'component', name: 'PoliceMap' },
    { type: 'h2', content: "বন্দুকের পেছনের ব্যক্তিরা" },
    { type: 'p', content: "আইন অনুযায়ী নির্দিষ্ট পরিস্থিতিতে পূর্বানুমতি ছাড়াই আগ্নেয়াস্ত্র ব্যবহার করতে পারেন পুলিশ কর্মকর্তারা। বেঙ্গল পুলিশ রেগুলেশনস, ১৯৪৩-এর ১৫৩(ক) ধারা অনুযায়ী:" },
    { type: 'p', content: "(১) কোনো ব্যক্তির আত্মরক্ষা বা সম্পত্তি রক্ষা; এবং" },
    { type: 'p', content: "(২) বেআইনি সমাবেশ ছত্রভঙ্গ করতে" },
    { type: 'p', content: "কারো অনুমতি ছাড়াই গুলি চালাতে পারবে যেকোনো পুলিশ কর্মকর্তা।" },
    { type: 'p', content: "সাবেক আইজিপি নুরুল হুদার মতে, ‘গুলি চালানোর জন্য কারো অনুমতি নেওয়ার প্রয়োজন পড়ে না পুলিশের। নিজের বা সহকর্মীর জীবন ঝুঁকিতে পড়লে, অথবা সরকারি সম্পত্তি হুমকির মুখে পড়লে পুলিশ গুলি চালাতে পারবে।’" },
    { type: 'p', content: "অভ্যুত্থানকালীন সময়ে ঢাকার ২২টি থানার ১৬১টি এজাহার পর্যালোচনা করে আমরা দেখতে পাই, প্রতিটি এজাহারেই পুলিশের আত্মরক্ষা বা সরকারি সম্পত্তি রক্ষাকে গুলি ছোঁড়ার কারণ হিসেবে উল্লেখ করা হয়েছে। এবং প্রায় সব গুলিই ছুড়েছেন এসআই বা কনস্টেবলরা।" },
    { type: 'p', content: "তালিকায় থাকা অন্তত ৩০ জন এসআই বা কনস্টেবলের সঙ্গে যোগাযোগ করেছে দ্য ডেইলি স্টার। তাদের সিংহভাগই সরাসরি অস্বীকার করে বলেছেন, তারা কখনো কোনো প্রাণঘাতি গুলি ছোড়েননি। যারা স্বীকার করেছেন, তাদের দাবি ‘উপরের নির্দেশ’ ছিল গুলি করার। ঘটনাস্থলে উর্ধ্বতন কর্মকর্তাদের নির্দেশ অনুযায়ী গুলি না চালালে তাদের চাকরি চলে যাওয়ার ঝুঁকি ছিল।" },
    createQuote("বেআইনি আদেশ আসলে সেটি পালন করার দায় প্রতি কর্মকর্তার ব্যক্তিগতভাবে নিতে হবে। তবে যারা আদেশ দিয়েছেন বা আদেশ পালনে বাধ্য করেছেন, তারাও দুষ্কর্মের সহযোগী হিসেবে বিবেচিত হবেন। তারাও স্বাভাবিক নিয়মেই অপরাধের আওতায় পড়বেন।", "ড. কাজী জাহেদ ইকবাল, সুপ্রিম কোর্টের আইনজীবী"),
    { type: 'component', name: 'SourceDocuments' },
    { type: 'h2', content: "যাদের নির্দেশে গুলি" },
    { type: 'p', content: "পুলিশের তৎকালীন মহাপরিদর্শক (আইজিপি) চৌধুরী আবদুল্লাহ আল-মামুন আন্তর্জাতিক অপরাধ ট্রাইবুনালে দেওয়া তার জবানবন্দিতে সুনির্দিষ্টভাবে উল্লেখ করেছেন, মারণাস্ত্র ব্যবহারের নির্দেশ সরাসরি তৎকালীন প্রধানমন্ত্রী শেখ হাসিনার কাছ থেকেই এসেছে।" },
    { type: 'p', content: "তবে মাঠপর্যায়ে তা বাস্তবায়ন করেছেন প্রতি বাহিনীর কিছু উর্ধ্বতন কর্মকর্তা। স্বরাষ্ট্র মন্ত্রণালয়ের অধীনে পরিচালিত বাংলাদেশ পুলিশের নেতৃত্বে থাকেন আইজিপি। মেট্রোপলিটন পুলিশের দায়িত্বে থাকেন পুলিশের কমিশনার।" },
    { type: 'p', content: "ডিএমপি আটটি বিভাগের প্রতিটির দায়িত্বে থাকেন একজন করে উপকমিশনার (ডিসি)। প্রতিটি বিভাগের অধীনে থাকে একাধিক জোন, সেগুলোর নেতৃত্বে থাকেন অতিরিক্ত উপকমিশনার (এডিসি) ও সহকারী কমিশনাররা (এসি)।" },
    { type: 'p', content: "এফআইআর ও জুনিয়র কর্মকর্তাদের সঙ্গে কথা বলে দ্য ডেইলি স্টার আন্দোলনের ১৫টি হটস্পটের ৩৯ জন ডিসি, এডিসি ও এসিকে শনাক্ত করেছে যারা ১৬ থেকে ২১ জুলাইয়ের মধ্যে অধ্বন্তদের সরাসরি মারণাস্ত্র ব্যবহারের নির্দেশ দিয়েছেন বা মারণাস্ত্র ব্যবহার করা ইউনিটের নেতৃত্ব দিয়েছেন।" },
    { type: 'p', content: "এই সময়ে সবচেয়ে বেশি মারণাস্ত্র ব্যবহৃত হয়েছে জুলাইয়ের ‘স্তালিনগ্রাদ’ হিসেবে পরিচিত যাত্রাবাড়ীতে। এলাকাটি তৎকালীন ডিসি মোহাম্মদ ইকবাল হোসেনের অধীনে ছিল।" },
    { type: 'p', content: "হাসিনা পালানোর এক সপ্তাহ পর সামাজিক যোগাযোগ মাধ্যমে ছড়িয়ে পড়া এক ভিডিওতে দেখা যায় ইকবাল তৎকালীন স্বরাষ্ট্রমন্ত্রী আসাদুজ্জামান খান কামালকে আন্দোলনের ফুটেজ দেখিয়ে বলছেন, ‘গুলি করি, মরে একটা, একটাই যায় স্যার, বাকিডি যায় না।’" },
    { type: 'p', content: "অন্তর্বর্তী সরকার ক্ষমতা গ্রহণের পাঁচ দিনের মাথায়, ১৩ আগস্ট ইকবালকে খুলনা রেঞ্জে বদলি করা হয়। ২০ আগস্ট তাকে ডিবি হেফাজতে নেওয়ার খবর প্রকাশিত হয় একাধিক সংবাদমাধ্যমে।" },
    { type: 'p', content: "এ ব্যাপারে জানতে চাইলে, ডিএমপি মিডিয়া সেলের দায়িত্বে থাকা ডিসি জানান, তিনি এ ব্যাপারে কিছু জানেন না।" },
    { type: 'p', content: "জননিরাপত্তা বিভাগের একটি বিজ্ঞপ্তি অনুযায়ী, ২৮ জুলাই কর্মস্থল থেকে পলায়ন করেন ইকবাল। এর প্রায় ১১ মাস পর, ২০২৫ সালের ১৮ জুলাই পুলিশ কর্তৃপক্ষ তাকে সাময়িকভাবে বরখাস্ত করে।" },
    { type: 'p', content: "এফআইআর অনুযায়ী, সহিংসতা দমনে যাত্রাবাড়ী এলাকার দায়িত্বে তিনজন এডিসিও ছিলেন। তাদের মধ্যে ডেমরা জোনের মো. মাসুদুর রহমান মনিরকে ৪ সেপ্টেম্বর র‍্যাবে বদলি করা হয়, ১৩ নভেম্বর থেকে তিনি কর্মস্থলে অনুপস্থিত আছেন। ওয়ারী জোনের এস এম শামীমকে ২৭ আগস্ট গাইবান্ধায় বদলি করা হয়, ১৮ সেপ্টেম্বর থেকে তিনি নিখোঁজ। শ্যামপুর জোনের মোহাম্মদ আলাউদ্দিনকে ১৭ আগস্ট এপিবিএনে বদলি করা হয়, যেখানে তিনি এখনো কর্মরত আছেন।" },
    { type: 'p', content: "এছাড়া যাত্রাবাড়িতে দায়িত্ব পালন ডেমরা জোনের নাহিদ ফেরদৌস ও শ্যামপুর জোনের শামসুল ইসলাম—এই দুই এসিকেই র‍্যাবে বদলি করা হয়। শামসুল এরইমধ্যে অতিরিক্ত পুলিশ সুপার হিসেবে পদোন্নতি পেলেও নাহিদ কখনোই র‍্যাবের কর্মস্থলে যোগ দেননি বলে জানিয়েছে র‍্যাবের সূত্র।" },
    { type: 'p', content: "এজাহার থেকে করা ডেইলি স্টারের তালিকায় ৩৮ জন পুলিশ কর্তার মধ্যে … জন গ্রেপ্তার, … জন পলাতক, … জন এখনো বিভিন্ন জায়গায় কর্মরত আছেন।" },
    { type: 'component', name: 'OfficerTable' },
    { type: 'component', name: 'AudioSection' },
    { type: 'h2', content: "পুলিশ কর্তাদের গণ-পলায়ন" },
    { type: 'p', content: "তৎকালীন কমিশনার হাবিবুর রহমান এবং ডিবি প্রধান হারুন অর রশীদসহ ডিএমপির অন্তত ১০ জন ঊর্ধ্বতন কর্মকর্তাতে ৫ আগস্টের পর আর কর্মস্থলে দেখা যায়নি। এদের সিংহভাগই ক্ষমতাচ্যুত আওয়ামী সরকারঘনিষ্ঠ হিসেবে পরিচিত ছিলেন।" },
    { type: 'p', content: "গতবছরের ১ অক্টোবর স্বরাষ্ট্র উপদেষ্টা লেফটেন্যান্ট জেনারেল (অব.) জাহাঙ্গীর আলম চৌধুরী এক বক্তৃতায় বলেন, ‘যারা এখনও কাজে যোগদান করেনি তাদের আমরা পুলিশ বলবো না। তাদের ক্রিমিনাল বলবো।’" },
    { type: 'p', content: "পলাতক কর্মকর্তাদের গ্রেপ্তারের উদ্দেশ্যে খোঁজা শুরু হয়েছে বলেও দাবি করেন তিনি।" },
    { type: 'p', content: "এই ঘোষণার ছয় দিন পর একটি শীর্ষস্থানীয় জাতীয় দৈনিকে ‘গ্রেপ্তারের তালিকায় ৯০ পুলিশ কর্মকর্তা’ শিরোনামে একটি প্রতিবেদন প্রকাশিত হয়। অভ্যন্তরীণ সূত্রের বরাত দিয়ে প্রতিবেদনে বলা হয়, পুলিশ কর্তৃপক্ষ গ্রেপ্তারের জন্য ৯০ জন কর্মকর্তার একটি তালিকা তৈরি করেছে।" },
    { type: 'p', content: "তালিকাটি আনুষ্ঠানিকভাবে প্রকাশ না করা হলেও চারজন পুলিশ কর্মকর্তা দ্য ডেইলি স্টারকে নিশ্চিত করেছে, পুলিশের ভেতরে এই তালিকা তখনই ছড়িয়ে যায়।" },
    { type: 'p', content: "না প্রকাশ না করার শর্তে এই তালিকায় থাকা এক কর্মকর্তার দাবি, কয়েকটি ব্যাচকে ‘টার্গেট’ করে এই তালিকা করা হয়। তালিকায় থাকা সিংহভাগ কর্মকর্তাই এডিসি বা সমমানের র‍্যাংকধারী।" },
    { type: 'p', content: "তিনি আরও দাবি করেন, ‘লিস্টে যাদের নাম ঢুঁকে গেছে, তারা তখন উপর মহলে ঘুষ দিয়ে বা বিভিন্ন দলের নেতাদের ধরে তদবির করে, নাম কাটানোর চেষ্টা করে।’" },
    createQuote("যারা কোনোভাবেই ব্যবস্থা করতে পারেনি, তারা তখন আমার মতো দেশ ছেড়ে পালায়,", "বর্তমানে মালয়েশিয়ায় অবস্থানরত এই সাবেক এডিসি"),
    { type: 'p', content: "আরও তিনজন পলাতক কর্মকর্তা একইরকম দাবি করেছেন। কিন্তু এসব দাবি স্বাধীনভাবে যাচাই করতে পারেনি ডেইলি স্টার।" },
    { type: 'p', content: "অক্টোবরের স্বরাষ্ট্র উপদেষ্টার ঘোষণার পর আরও অন্তত ১৩ জন সাবেক ডিএমপি কর্মকর্তা তাদের কর্মস্থল ছেড়ে পালিয়েছেন। এই ১৩ জনের মধ্যে ১১ জনই এডিসি।" },
    { type: 'p', content: "পুলিশ অধিদপ্তর সূত্র জানিয়েছে, পলায়নের সময় বা পলায়নের পর কোনো কর্মকর্তা এখনো পর্যন্ত গ্রেপ্তার হননি।" },
    { type: 'component', name: 'Absconded' },
    { type: 'h2', content: "বদলি ও গ্রেপ্তার" },
    { type: 'p', content: "অভ্যুত্থানকালে ডিএমপি তিন শীর্ষ পদ—কমিশনার, অতিরিক্ত কমিশনার এবং যুগ্ম কমিশনার হিসেবে মোট ২২ জন কর্মকর্তা ছিলেন। এদের মধ্যে মাত্র একজন, যুগ্ম কমিশনার মোহাম্মদ শহীদুল্লাহ, আগস্ট-পরবর্তী সময়ে গ্রেপ্তার হয়েছেন। সেটিও জুলাই-সংক্রান্ত মামলায় না।" },
    { type: 'p', content: "অভ্যুত্থান সংক্রান্ত মামলায় ডিএমপির মোট ১১ জন সাবেক কর্মকর্তাকে কারাগারে পাঠানো হয়েছে। তাদের মধ্যে মাত্র দুজন অভ্যুত্থানের সময় পুলিশের আঞ্চলিক কমান্ড, অর্থাৎ কোনো বিভাগ বা জোনের দায়িত্বে ছিলেন। সেই দুজনই মিরপুর বিভাগের সাবেক ডিসি ও এডিসি।" },
    { type: 'p', content: "অভ্যুত্থানকালীন ডিএমপির আটটি বিভাগের দায়িত্বে থাকা ডিসিদের মধ্যে কেবল এই একজনই গ্রেপ্তার হয়েছেন।" },
    { type: 'p', content: "ডিএমপি কর্মকর্তারা কোথায় কোথায় বদলি হয়েছেন, তা বের করতে ২০২৪ সালের আগস্ট থেকে ২০২৫ সালের আগস্ট মাস পর্যন্ত পুলিশের বদলি সংক্রান্ত ৯৭টি সরকারি প্রজ্ঞাপন পর্যালোচনা করে ১৩ শতাধিক বদলির বিজ্ঞপ্তি ঘেঁটেছে দ্য ডেইলি স্টার।" },
    { type: 'component', name: 'Transfers' },
    { type: 'p', content: "পুলিশের একাধিক সূত্রের মতে, বাহিনীর ভেতরে ঊর্ধ্বতন কর্মকর্তাদের জন্য সংযুক্ত বা ওএসডিকেই ‘সবচেয়ে বড় শাস্তি’ হিসেবে দেখা হয়।" },
    { type: 'h2', content: "তদন্ত নেই, সংস্কারও নেই" },
    { type: 'p', content: "বেঙ্গল পুলিশ রেগুলেশনস অনুযায়ী, যেকোনো ধরনের আগ্নেয়াস্ত্র ব্যবহারের পর কমান্ডিং কর্মকর্তাকে একটি বিস্তারিত লিখিত প্রতিবেদন তৈরি করতে হয়। বলপ্রয়োগ যৌক্তিক ছিল কিনা তা নির্ধারণের জন্য একটি ‘পূর্ণাঙ্গ প্রশাসনিক তদন্ত’ বাধ্যতামূলক।" },
    { type: 'p', content: "নতুন প্রশাসন ক্ষমতা গ্রহণের এক বছর পরও বাধ্যতামূলক এই তদন্তগুলো করা হয়নি।" },
    { type: 'p', content: "অভ্যন্তরীণ তদন্ত শুরু হয়েছে কিনা জানতে চাইলে পুলিশ সদর দপ্তর জানায়, কর্মকর্তাদের বিরুদ্ধে দায়ের করা মামলার ভিত্তিতে ‘সর্বোচ্চ গুরুত্বের সঙ্গে’ তদন্ত করা হচ্ছে।" },
    { type: 'p', content: "কিন্তু মাত্রাতিরিক্ত বলপ্রয়োগের জন্য দায়ী কর্মকর্তাদের বিচারপ্রক্রিয়া এখনো অস্বচ্ছ এবং সরকার ও পুলিশের প্রতিশ্রুত প্রাতিষ্ঠানিক সংস্কারও আলোর মুখ দেখেনি।" },
    { type: 'p', content: "আইনের এই অস্বচ্ছতা দূর না করা হলে, জুলাই-আগস্টের মতো মাত্রাতিরিক্ত বলপ্রয়োগের ঝুঁকি ভবিষ্যতেও থেকেই যাবে বলে সতর্ক করেছেন বিশেষজ্ঞরা।" },
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
    heading: "নতুন সেকশন",
    text: "প্লেস হোল্ডার টেক্সট......",
    accordionTitle: "প্লেসহোল্ডার নাম",
    items: [
      {
        headline: "প্লেসহোল্ডার শিরোনাম এক",
        text: "এখানে প্রথম অনুচ্ছেদের জন্য কিছু বাংলা ডেমো টেক্সট থাকবে যা প্রায় পঞ্চাশ শব্দের মত দীর্ঘ। এটি শুধুমাত্র একটি উদাহরণ হিসেবে ব্যবহৃত হচ্ছে। বিষয়বস্তু পরিবর্তন করা প্রয়োজন হতে পারে। এই লেখাটি লেআউটের একটি ধারণা দেওয়ার জন্য তৈরি করা হয়েছে এবং এর কোনো প্রকৃত অর্থ নেই। ধন্যবাদ।"
      },
      {
        headline: "প্লেসহোল্ডার শিরোনাম দুই",
        text: "দ্বিতীয় অনুচ্ছেদের জন্য আরও কিছু বাংলা ডেমো টেক্সট এখানে দেওয়া হলো। এটিও প্রায় পঞ্চাশ শব্দের। এই পাঠ্যটি ডিজাইনের একটি অংশ হিসেবে কাজ করবে এবং চূড়ান্ত বিষয়বস্তু দ্বারা প্রতিস্থাপিত হবে। লেআউটের সামঞ্জস্যতা পরীক্ষার জন্য এটি একটি গুরুত্বপূর্ণ অংশ।",
        iframeSrc: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/12345678"
      },
      {
        headline: "প্লেসহোল্ডার শিরোনাম তিন",
        text: "তৃতীয় অনুচ্ছেদের এই ডেমো টেক্সটটি একটি ভিন্ন ফন্টের প্রয়োজন অনুযায়ী তৈরি করা হয়েছে। এই পাঠ্যের উদ্দেশ্য হল বিভিন্ন ফন্ট এবং শৈলী ব্যবহার করে বিষয়বস্তু কেমন দেখায় তা পরীক্ষা করা। এটি একটি ভিজ্যুয়াল গাইড হিসেবে কাজ করবে। চূড়ান্ত বিষয়বস্তু পরে যোগ করা হবে।"
      },
      {
        headline: "প্লেসহোল্ডার শিরোনাম চার",
        text: "চতুর্থ অনুচ্ছেদের জন্য প্লেসহোল্ডার টেক্সট এখানে যোগ করা হয়েছে। এই অনুচ্ছেদের নীচে একটি আইক্লাউড আইফ্রেম যুক্ত করা হবে। পাঠ্যটি আইফ্রেমের উপরের বিষয়বস্তুর স্থান পূরণ করার জন্য ডিজাইন করা হয়েছে। এটি শুধুমাত্র একটি লেআউট প্রদর্শনের জন্য ব্যবহৃত হচ্ছে।",
        iframeSrc: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/87654321"
      },
      {
        headline: "প্লেসহোল্ডার শিরোনাম পাঁচ",
        text: "শেষ এবং পঞ্চম অনুচ্ছেদের জন্য এই ডেমো টেক্সটটি তৈরি করা হয়েছে। এটি সম্পূর্ণ বিভাগের কাঠামোটি সম্পূর্ণ করতে সহায়তা করবে। এই পাঠ্যটি অন্যগুলোর মতোই পঞ্চাশ শব্দের কাছাকাছি এবং এটি একটি ভিন্ন ফন্টে প্রদর্শিত হবে, যা ব্যবহারকারীর দৃষ্টি আকর্ষণ করতে সাহায্য করবে।"
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