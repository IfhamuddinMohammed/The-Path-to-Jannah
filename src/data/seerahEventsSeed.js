// Comprehensive, original narrative accounts of each Seerah timeline event — expanding the
// existing 2-3 sentence summaries into genuine book-chapter-length detail, matching the depth
// readers expect from a dedicated Seerah biography (the reference point requested was Ar-Raheeq
// Al-Makhtum / "The Sealed Nectar" by Safi-ur-Rahman al-Mubarakpuri).
//
// This is original writing, not a reproduction of any copyrighted book's text — Ar-Raheeq
// Al-Makhtum's own Darussalam edition explicitly reserves reproduction rights ("No part of this
// book may be reproduced... without written permission of the publisher"), and that permission
// was not something this pass could obtain. The content below is grounded in the same underlying
// classical sources (Sahih al-Bukhari, Sahih Muslim, Ibn Hisham's As-Sirah an-Nabawiyyah, the
// Qur'an) that Ar-Raheeq Al-Makhtum and other authentic Seerah works themselves draw from, cited
// directly per event, with that book listed as one reference among several rather than as the
// source of the prose itself. Matched against existing SeerahEvent rows by `title` — see
// backfillSeed in src/lib/seedBackfill.js. This content should still go through a scholar/
// community review pass before being treated as fully authoritative, same standard as the rest
// of this app's Islamic content.

export const SEED_SEERAH_EVENTS = [
  {
    year_ce: "570 CE",
    title: "Birth of Prophet Muhammad ﷺ",
    title_arabic: "مولد النبي صلى الله عليه وسلم",
    era: "early",
    description: "Born in Makkah in the Year of the Elephant to Aminah bint Wahb and Abdullah ibn Abd al-Muttalib.",
    detailed_text: `Prophet Muhammad ﷺ was born in Makkah on a Monday, traditionally dated to the 12th of Rabi' al-Awwal, in the Year of the Elephant — so named because in that same year, Abraha, the Abyssinian governor of Yemen, marched an army with war elephants to destroy the Ka'bah, only to be miraculously repelled by flocks of birds pelting his forces with stones, an event described in Surah Al-Fil. His father, Abdullah ibn Abd al-Muttalib, had died on a trading journey to Syria before his son was born, leaving Muhammad ﷺ an orphan from birth. His mother, Aminah bint Wahb, belonged to the noble Banu Zuhrah clan.

Following the custom of Makkah's noble families, infants were sent to the desert to be nursed and raised by Bedouin foster-mothers, away from the crowding and illnesses of the city, and to learn pure, eloquent Arabic. Halimah bint Abi Dhuayb, of the Banu Sa'd tribe, initially hesitated to take an orphan child, since fostering families were customarily paid by the father — but she took him anyway when no wealthier infant was available to her. Sirah accounts describe an immediate, visible blessing following his arrival: her previously dry she-camel and barren sheep began producing abundant milk, and the household's fortunes noticeably improved during the years he stayed with them.

At around the age of five or six, while still with his foster family, an incident occurred that later commentators connect to his spiritual purification: two men in white approached him, opened his chest, and — as the Prophet ﷺ himself would later describe — removed a dark clot, understood as a symbolic cleansing of any trace of Satan's influence, though the exact nature of the experience is described only briefly and is among the matters left to Allah's knowledge.

Muhammad ﷺ returned to his mother Aminah shortly after, but she passed away when he was about six years old, during a journey back from visiting his father's grave in Madinah. He was then raised by his grandfather, Abd al-Muttalib, the chief of the Banu Hashim clan and custodian of the Ka'bah — a man who reportedly loved him dearly and treated him with unusual favor among his many grandchildren. When Abd al-Muttalib died only two years later, guardianship passed to his uncle, Abu Talib, who — despite never accepting Islam himself — would go on to protect and support his nephew for decades, through some of the most difficult years of his mission.

By the time he reached adulthood, Muhammad ﷺ had already lost his father before birth, his mother at six, and his grandfather at eight — a childhood of repeated loss that scholars often note as part of Allah's preparation of him for a life of hardship, patience, and complete reliance on Him rather than worldly protection.`,
    detailed_text_roman_urdu: `Nabi Muhammad ﷺ Makkah mein Peer (Monday) ke din paida hue, jiski tareekh aam taur par 12 Rabi' al-Awwal batayi jati hai, 'Aam-ul-Feel (Haathi wale saal) mein — is saal ka ye naam is liye para kyunke isi saal, Yemen ke Habshi hukmaran Abraha ne Ka'bah ko girane ke liye haathiyon wali fauj le kar hamla kiya tha, lekin parindon ke jhund ne unki fauj par pathar bara kar unhein mo'jizana taur par nakaam kar diya — is waqiye ka zikr Surah Al-Fil mein hai. Unke walid, Abdullah ibn Abd al-Muttalib, Syria ke tijarati safar mein apne bete ki paidaish se pehle hi wafat pa gaye the, is tarah Muhammad ﷺ paidaish se hi yateem the. Unki walida, Aminah bint Wahb, sharif Banu Zuhrah khandan se ta'alluq rakhti thin.

Makkah ke shurafa khandanon ke riwaj ke mutabiq, bachchon ko sehra mein Bedouin daaiyon ke sapurd kiya jata tha taake shehar ki bheer aur bimariyon se door, saaf-suthri Arabic zaban seekhein. Halimah bint Abi Dhuayb, Banu Sa'd qabeele se, pehle to yateem bachche ko lene mein hichkichai, kyunke aam taur par daaiyon ko bachche ke walid ki taraf se ujrat milti thi — lekin unhone phir bhi usay le liya jab koi behtar mo'awze wala bachcha na mila. Sirah ki riwayaton mein fauran nazar aane wali barkat ka zikr hai: unki pehle se khaali oontni aur bekaar bhairein ache doodh dene lagi, aur ghar ki halat un salon mein numayan taur par behtar ho gayi jab tak wo unke saath rahe.

Taqreeban paanch ya chhe saal ki umar mein, jab wo abhi apni daaya ke saath the, ek waqia hua jise ba'd ke sharihon ne unki ruhani paakizgi se joda: do safed poshak wale afraad unke qareeb aaye, unka seena khola, aur — jaisa ke Nabi ﷺ khud ba'd mein bayan karte the — ek kaala tukda nikaal diya, jise Shaitan ke asraat ki alamati safai samjha jata hai, agarche is tajurbe ki asal haqiqat mukhtasar hi bayan ki gayi hai aur is ka ilm Allah ke pass hai.

Muhammad ﷺ jald hi apni walida Aminah ke pass wapas aa gaye, lekin jab wo taqreeban chhe saal ke the to unki walida ka bhi inteqal ho gaya, Madinah mein apne walid ki qabr ki ziyarat se wapasi ke safar mein. Unki parwarish phir unke dada, Abd al-Muttalib ne ki, jo Banu Hashim khandan ke sardar aur Ka'bah ke nigran the — aik aisay insan jo unse bohot mohabbat karte the aur apne bohot se pote-potiyon mein unhein khaas tarjeeh dete the. Jab Abd al-Muttalib sirf do saal baad wafat pa gaye, to sarparasti unke chacha, Abu Talib ke sapurd hui, jo — khud Islam qabool na karne ke bawajood — dahaiyon tak apne bhatije ki hifazat aur madad karte rahe, unki risalat ke sab se mushkil salon mein bhi.

Jab tak Muhammad ﷺ baligh hue, wo apne walid ko paidaish se pehle, walida ko chhe saal ki umar mein, aur dada ko aath saal ki umar mein kho chuke the — mutawatir sadmaat se bhari ek bachpan, jise ulama aksar Allah ki taraf se unki tayyari samajhte hain, mushkilaat, sabr, aur dunyawi tahaffuz ke bajaye sirf Allah par mukammal bharose ki zindagi ke liye.`,
    key_lessons: [
      "Trust in Allah's decree during orphanhood",
      "Purity of character in youth",
      "Allah's care for the orphaned and vulnerable",
      "Every hardship carries wisdom, even when not immediately apparent",
    ],
    key_lessons_roman_urdu: [
      "Yateemi ke dauran Allah ke faisle par bharosa",
      "Bachpan mein hi kirdar ki pakeezgi",
      "Yateemon aur kamzoron ke liye Allah ki khaas tawajjuh",
      "Har mushkil mein hikmat hoti hai, chahe wo fauran nazar na aaye",
    ],
    authentic_sources: [
      "Ar-Raheeq Al-Makhtum, p. 52",
      "Sahih Ibn Hibban",
      "Sahih Muslim (the chest-opening narration)",
      "Ibn Hisham, As-Sirah an-Nabawiyyah",
      "Qur'an, Surah Al-Fil (105)",
    ],
  },
  {
    year_ce: "595 CE",
    title: "Marriage to Khadijah (RA)",
    title_arabic: "زواج النبي من خديجة",
    era: "early",
    description: "At age 25, the Prophet ﷺ married Khadijah bint Khuwaylid, a respected and wealthy businesswoman fifteen years his senior, beginning a marriage built on trust, partnership, and unwavering support.",
    detailed_text: `By the time he reached his twenties, Muhammad ﷺ had already earned a reputation across Makkah for his honesty and integrity, so much that people called him Al-Amin, "the Trustworthy," and As-Sadiq, "the Truthful" — titles earned, not given by birth. Khadijah bint Khuwaylid was a wealthy and highly respected widow of the Quraysh, who ran one of the largest trading operations in Makkah, employing agents to carry her merchandise on trade caravans to Syria in exchange for a share of the profit.

Having heard of Muhammad's ﷺ reputation, Khadijah offered him a larger share of profit than she gave others and sent him, along with her servant Maysarah, on a trading journey to Syria. Maysarah later reported to Khadijah remarkable signs he witnessed along the journey, and praised his conduct, honesty in trade, and the unusually large profit the journey returned.

Deeply impressed, and reportedly encouraged by a close friend, Nafisah bint Munabbih, who acted as an intermediary, Khadijah — herself already proposed to by several wealthy and prominent men of Quraysh whom she had turned down — sent Muhammad ﷺ a proposal of marriage. He consulted his uncles, and the marriage was arranged; at the time, he was about 25 years old, and she was around 40, fifteen years his senior, though some historical accounts give differing ages.

Their marriage lasted around twenty-five years, until Khadijah's death, and throughout it he did not take another wife — a rarity in a society where polygyny among the wealthy and prominent was common. She bore him several children, including his four surviving daughters. Beyond companionship, Khadijah became his most important source of emotional and material support: when revelation first came to him in Cave Hira and he returned home trembling, frightened that something had happened to him, it was Khadijah who comforted him, wrapped him in a cloak, and firmly reassured him of his own good character, telling him Allah would never let harm befall someone so honest, generous, and caring for his family and the needy.

She was the first human being to believe in his message without hesitation, and she spent her wealth generously in support of the early Muslim community during the most difficult years of persecution in Makkah. Her death in 619 CE, so close to the death of his uncle Abu Talib, marked such profound personal loss that the Prophet ﷺ came to call that year 'Am al-Huzn — the Year of Grief.`,
    detailed_text_roman_urdu: `Jab wo apni umar ke bees saal tak pohanche, Muhammad ﷺ Makkah mein apni sacchai aur imandari ki wajah se pehle hi mash'hoor ho chuke the, itna ke log unhein Al-Amin, 'Qabil-e-Aitmaad,' aur As-Sadiq, 'Sacha,' kehte the — ye laqab kamaye gaye the, paidaishi nahi mile the. Khadijah bint Khuwaylid Quraysh ki ek dolatmand aur ba-izzat bewa thi, jo Makkah ke sab se bare tijarati karobaron mein se ek chalati thi, apna maal Syria le jane wale tijarati qafilon mein bhejti aur munafe ka hissa deti thi.

Muhammad ﷺ ki shohrat sun kar, Khadijah ne unhein doosron se zyada munafe ka hissa pesh kiya aur unhein apne khadim Maysarah ke sath, Syria ke tijarati safar par bheja. Maysarah ne wapas aa kar Khadijah ko safar mein nazar aane wali khaas alamaat batayi, aur unki diyanatdari aur is se hasil hone wale ghair-ma'moli munafe ki taareef ki.

Bohot mutasir hokar, aur ek qareebi saheli, Nafisah bint Munabbih ke zariye, jo darmiyani kaam anjaam de rahi thin, Khadijah — jo pehle hi Quraysh ke kai daulatmand aur mash'hoor logon ke rishte thukra chuki thin — ne Muhammad ﷺ ko shaadi ka payam bheja. Unhone apne chachaon se mashwara kiya, aur nikah tay ho gaya; us waqt unki umar taqreeban 25 saal thi, aur Khadijah ki umar taqreeban 40 saal, unse pandrah saal bari, agarche kuch tareekhi riwayaton mein umr ka farq mukhtalif bataya gaya hai.

Unka nikah taqreeban pachees saal tak qaim raha, Khadijah ki wafat tak, aur is doran unhone koi doosra nikah nahi kiya — ek aisi baat jo us mua'shre mein na-mamool thi jahan daulatmand aur ba-asar logon mein aik se zyada shaadiyan aam theen. Khadijah ne unhein kai bachche diye, jin mein unki chaar zinda rehne wali betiyan shamil thin. Rifaqat ke ilawa, Khadijah unki jazbati aur maali madad ka sab se bara zariya bani: jab Ghar-e-Hira mein pehli wahi aayi aur wo kaanpte hue ghar wapas aaye, dar ke ke shayad unhein kuch ho gaya hai, to Khadijah ne unhein tasalli di, chadar mein lapeta, aur pukhta yaqeen dilaya ke Allah kabhi bhi itne sacche, faiyaz, aur apne ghar walon aur zaroorat manedon ka khayal rakhne wale insan ko ruswa nahi karega.

Wo pehli insan thi jisne bila kisi shak ke unke payam par imaan laya, aur unhone Makkah mein zulm ke sab se mushkil salon mein apni daulat khule dil se kharch ki. Unki wafat, 619 CE mein, jo unke chacha Abu Talib ki wafat ke itne qareeb hui, itna gehra sadma thi ke Nabi ﷺ ne us saal ko 'Am al-Huzn — Ghum ka Saal — kehna shuru kar diya.`,
    key_lessons: [
      "Character and integrity matter more than wealth or lineage in choosing a spouse",
      "A supportive marriage is a source of strength for facing life's greatest trials",
      "Khadijah (RA) is honored as the first person to believe in the Prophet's ﷺ message",
      "True partnership rests on faith and mutual support, not wealth alone",
    ],
    key_lessons_roman_urdu: [
      "Shareek-e-hayat chunne mein daulat ya nasab se zyada kirdar aur diyanatdari ahem hai",
      "Ek madadgar shaadi zindagi ke sab se bare imtihanon ka samna karne ke liye qooat ka zariya hoti hai",
      "Khadijah (RA) ko Nabi ﷺ ke payam par imaan lane wali pehli shakhsiyat ka sharaf hasil hai",
      "Sacha rishta imaan aur baham madad par qaim hota hai, sirf daulat par nahi",
    ],
    authentic_sources: [
      "Ibn Hisham, As-Sirah an-Nabawiyyah",
      "Ar-Raheeq Al-Makhtum",
      "Sahih al-Bukhari (the marriage and Khadijah's support narrated via 'Aisha, RA)",
    ],
  },
  {
    year_ce: "605 CE",
    title: "Arbitration of the Black Stone (Hajar al-Aswad)",
    title_arabic: "تحكيم الحجر الأسود",
    era: "early",
    description: "Resolved a major tribal feud over placing the Black Stone during the Kaaba's reconstruction.",
    detailed_text: `Around the year 605 CE, when Muhammad ﷺ was about 35 years old, the Ka'bah had suffered damage from flooding and years of wear, and the Quraysh undertook to rebuild its walls, reinforcing them with layers of wood and stone. All the major clans of Quraysh contributed to the reconstruction, each taking responsibility for a section of the wall, careful to use only wealth earned honestly — funds obtained through usury, theft, or prostitution were reportedly excluded from the building fund.

As the walls neared completion, a dispute arose over who would have the honor of restoring the sacred Black Stone (Al-Hajar al-Aswad) to its place in the corner of the Ka'bah. Each clan considered this honor too great to concede to another, and tensions escalated to the point that armed conflict between the clans seemed imminent — some accounts describe clans filling a basin with blood and dipping their hands in it as a pledge to fight to the death over the matter.

An elderly clan leader, Abu Umayyah ibn al-Mughirah, proposed a solution: that whoever entered the sacred precinct first the next morning be entrusted to arbitrate the dispute. That person turned out to be the young Muhammad ﷺ, already known and trusted across Makkah's rival clans for his fairness. On seeing him, the assembled leaders reportedly expressed relief, saying, 'This is Al-Amin (the Trustworthy); we accept his judgment.'

Muhammad ﷺ asked for a cloak to be spread on the ground, placed the Black Stone in its center, and asked a representative from each of the contending clans to take hold of an edge of the cloak and lift it together, so that no single clan could claim sole credit for the honor. Once the stone was raised to the appropriate height, he lifted it himself with his own hands and set it into its place in the wall — resolving a dispute that had threatened serious bloodshed through a solution that gave every clan an equal share in the honor, rather than a winner and losers.

This episode, occurring years before he received revelation, is often cited by scholars as an early demonstration of the wisdom, fairness, and natural leadership that would later define his prophethood — qualities Quraysh themselves had already recognized and relied upon, long before they would come to reject his message.`,
    detailed_text_roman_urdu: `Taqreeban 605 CE mein, jab Muhammad ﷺ ki umar taqreeban 35 saal thi, Ka'bah ko baarish aur salon ki tabahi se nuqsan pohancha tha, aur Quraysh ne iski diwaron ki tarmeem shuru ki, lakri aur pathar ki taheen laga kar unhein mazbooti dete hue. Quraysh ke tamam bare khandanon ne is tarmeem mein hissa liya, har khandan ne diwar ka ek hissa apni zimmedari li, aur khaas khayal rakha gaya ke sirf halal tareeqe se hasil ki gayi daulat istemal ki jaye — sood, chori, ya badkari se kamayi gayi raqam tarmeemi fund se bahar rakhi gayi.

Jab diwarein takmeel ke qareeb pohanchi, ek ikhtilaf khada ho gaya ke muqaddas Hajar al-Aswad (Black Stone) ko Ka'bah ke konay mein wapas rakhne ka sharaf kise milega. Har khandan is izzat ko doosre ke haq mein chhorne ke liye tayyar nahi tha, aur maamla itna bigar gaya ke khandano ke darmiyan mussalah jhagra namumkin nahi tha — kuch riwayaton mein zikr hai ke khandano ne ek bartan mein khoon bhar kar us mein apne haath dubaye, is baat ki qasam ke taur par ke wo aakhri dam tak larenge.

Ek buzurg khandani sardar, Abu Umayyah ibn al-Mughirah, ne ek hal pesh kiya: ke jo bhi kal subah sab se pehle Haram mein dakhil ho, usay is ikhtilaf ka faisla karne ki zimmedari di jaye. Wo shakhs jawan Muhammad ﷺ nikle, jo Makkah ke muqabil khandano mein apni diyanatdari ki wajah se pehle hi qabil-e-aitmaad the. Unhein dekh kar, mojood sardaron ne sukoon ka izhaar kiya, kehte hue, 'Ye Al-Amin (Qabil-e-Aitmaad) hai; hum iska faisla qabool karte hain.'

Muhammad ﷺ ne zameen par ek chadar bichane ka hukum diya, Hajar al-Aswad ko iske beech mein rakha, aur har muqabil khandan ke ek numainde se kaha ke wo chadar ka ek konah pakar kar sab mil kar isay uthayein, taake koi ek khandan is izzat ka tanha da'wa na kar sake. Jab pathar munasib buland tak pohanch gaya, to unhone khud apne haathon se usay utha kar diwar mein apni jagah rakh diya — ek aise tanaza ka hal jo shadeed khoon-kharabe ka khatra bana chuka tha, aisa hal jisne har khandan ko izzat mein barabar hissa diya, na koi jeetne wala na haarne wala.

Ye waqia, jo unhein wahi milne se saal pehle pesh aaya, aksar ulama ki taraf se unki hikmat, insaaf, aur fitri qiyadat ki ek ibtidai misaal ke taur par pesh kiya jata hai — wo khoobiyan jo Quraysh khud pehle hi tasleem kar chuke the aur jin par unhone inhisar kiya, un dahaiyon se bohot pehle jab wo unke payam ko rad karne wale the.`,
    key_lessons: [
      "Wisdom in dispute resolution",
      "Unifying leadership",
      "Creative compromise can defuse conflicts that force alone cannot",
    ],
    key_lessons_roman_urdu: [
      "Ikhtilaf ke hal mein hikmat",
      "Muttahid karne wali rehnumai",
      "Tahaffuz-pasand samjhaute wo jhagre khatam kar sakte hain jo zoor se hal nahi hote",
    ],
    authentic_sources: [
      "Musnad Ahmad 15502",
      "Ibn Hisham, As-Sirah an-Nabawiyyah",
      "Ar-Raheeq Al-Makhtum",
    ],
  },
  {
    year_ce: "610 CE",
    title: "The First Revelation in Cave Hira",
    title_arabic: "نزول الوحي الأول",
    era: "prophethood",
    description: "Angel Jibril (Gabriel) revealed the first five verses of Surah Al-'Alaq.",
    detailed_text: `As he entered his fortieth year, Muhammad ﷺ had developed a habit of withdrawing periodically to Cave Hira, a small cave on a mountain outside Makkah, to spend nights in solitary reflection and worship, taking provisions of food and water for several days at a time — a practice known as Tahannuth, already unusual among Quraysh but reflecting a growing discomfort with the idol-worship and moral corruption around him.

During the month of Ramadan, in one such retreat, the Angel Jibril (Gabriel) appeared to him and commanded, 'Iqra!' — 'Read!' Muhammad ﷺ replied honestly that he could not read, as he had never been taught. The angel embraced him tightly, to the point of exhaustion, then repeated the command; this happened three times, after which Jibril recited the first five verses of what would become Surah Al-'Alaq: 'Read, in the name of your Lord who created — created man from a clot. Read, and your Lord is the Most Generous — who taught by the pen — taught man that which he knew not.'

Terrified and shaking, Muhammad ﷺ hurried home to Khadijah, saying 'Cover me, cover me!' Once his fear subsided enough to speak, he told her what had happened, fearing he had perhaps been overtaken by something evil or lost his sanity. Khadijah, without hesitation, reassured him: 'By Allah, He would never disgrace you. You are true to your word, you bear people's burdens, you help the poor and needy, you're generous to your guests, and you assist those suffering hardship.'

She then took him to her elderly cousin Waraqah ibn Nawfal, a Christian scholar of scripture well-versed in the Torah and Gospel, who listened to the account and told Muhammad ﷺ that what he described matched the way revelation had come to earlier Prophets, and that he was, in fact, the Prophet awaited by this nation — adding, with sorrowful foresight, that he wished he could live to see the day when his people would drive him out, so that he could support him, since 'no man has ever brought what you have brought without being opposed.'

There followed a period — reported in most accounts to have lasted some months — in which no further revelation came, during which the Prophet ﷺ experienced considerable anguish and longing, before Jibril returned with further revelation and the mission of prophethood formally began.`,
    detailed_text_roman_urdu: `Jab wo apni chalisvi saal mein dakhil hue, Muhammad ﷺ Ghar-e-Hira mein, Makkah se bahar aik pahar par waqai chhoti gaar mein, waqfe waqfe se tanhai mein jane ki aadat bana chuke the, ta'abbud aur ghor-o-fikr ke liye, kai dinon ke liye khana-pani sath le kar — ye amal Tahannuth kehlata tha, jo Quraysh mein pehle se na-mamool tha lekin unke ird-gird mojood buth-parasti aur akhlaqi bigar se badhti hui bezaari ka izhaar karta tha.

Ramzan ke mahine mein, aik aisi hi khalwat mein, Farishta Jibril unke pass aaye aur hukum diya, 'Iqra!' — 'Parho!' Muhammad ﷺ ne sacchai se jawab diya ke wo parh nahi sakte, kyunke unhein kabhi nahi sikhaya gaya. Farishte ne unhein sakhti se gale lagaya, hatta ke wo thak gaye, phir hukum dohraya; ye teen martaba hua, jiske baad Jibril ne Surah Al-'Alaq ki pehli paanch ayaton ki tilawat ki: 'Parho, apne Rab ke naam se jisne paida kiya — insan ko ek lothde se paida kiya. Parho, aur tumhara Rab bara karam wala hai — jisne qalam se sikhaya — insan ko wo sikhaya jo wo nahi janta tha.'

Dahshat-zada aur kaanpte hue, Muhammad ﷺ jaldi se ghar Khadijah ke pass aaye, kehte hue 'Mujhe chadar do, mujhe chadar do!' Jab unka khauf itna kam hua ke wo baat kar sakein, to unhone Khadijah ko batya ke kya hua tha, is dar se ke shayad unhein kisi buri cheez ne aa liya ho ya wo apni aqal kho baithe hon. Khadijah ne bila kisi ta'akhur ke unhein tasalli di: 'Allah ki qasam, wo aap ko kabhi ruswa nahi karega. Aap apni baat ke sachche hain, log ka bojh uthate hain, ghareebon aur zaroorat mandon ki madad karte hain, mehmanon ke liye faiyaz hain, aur museebat mein logon ki madad karte hain.'

Phir unhone unhein apne buzurg cousin Waraqah ibn Nawfal ke pass le gaya, jo Tawrat aur Injeel ka gehra ilm rakhne wale Christian aalim the, jinhone poora waqia sun kar Muhammad ﷺ ko bataya ke jo unhone bayan kiya wo pehle Ambiya par wahi aane ke tareeqe se milta hai, aur ke wo waqai wo Nabi hain jinka is ummat ko intezar tha — sath hi ranj-o-gham se ye khwahish zahir ki ke kaash wo zinda hote taake dekh sakein jab unki qaum unhein nikal degi, taake wo unki madad kar sakein, kyunke 'koi shakhs jo aap ke jaisa laya hai usay mukhalifat ka samna kiye baghair nahi chhoda gaya.'

Iske baad ek arsa aaya — aksar riwayaton mein kuch mahinon ka bataya jata hai — jis mein koi aur wahi nahi ayi, jiske doran Nabi ﷺ ne bohot beqarari aur tarap ka samna kiya, is se pehle ke Jibril dobara wahi ke saath aaye aur risalat ka silsila baqaida shuru hua.`,
    key_lessons: [
      "Importance of seeking knowledge",
      "Support of a righteous spouse",
      "Revelation was overwhelming even for the one chosen to receive it — humanity and prophethood coexisted",
    ],
    key_lessons_roman_urdu: [
      "Ilm hasil karne ki ahmiyat",
      "Neik shareek-e-hayat ki himayat",
      "Wahi us insan ke liye bhi bohot bhari thi jise ye ata ki gayi — insaniyat aur nabuwwat sath-sath thi",
    ],
    authentic_sources: [
      "Sahih al-Bukhari 3",
      "Sahih Muslim 160",
      "Ar-Raheeq Al-Makhtum",
      "Qur'an, Surah Al-'Alaq (96):1-5",
    ],
  },
  {
    year_ce: "613 CE",
    title: "Public Call at Mount Safa",
    title_arabic: "الجهر بالدعوة على الصفا",
    era: "prophethood",
    description: "The transition from private gathering (Dar al-Arqam) to public invitation to Islam.",
    detailed_text: `For roughly the first three years after revelation began, the Prophet ﷺ invited people to Islam privately and quietly, primarily among close family, friends, and trusted acquaintances, meeting in the house of Al-Arqam ibn Abi al-Arqam (Dar al-Arqam) near Mount Safa — a discreet base from which the earliest Muslims, only a few dozen in number, gathered to learn and pray away from the hostility of Quraysh.

When Allah commanded him in Surah Al-Hijr to 'proclaim what you have been commanded and turn away from the polytheists,' the Prophet ﷺ climbed Mount Safa, overlooking the Ka'bah, and called out loudly to summon Quraysh by their clans — a customary way of alerting the whole city to urgent news. As people gathered, curious and confused, he asked them a rhetorical question: if he warned them that an enemy army was approaching to attack that very night, would they believe him? They answered, without hesitation, that they would, since they had never known him to lie.

Having secured their acknowledgment of his lifelong honesty, he then declared: 'I am a warner to you before a severe punishment.' He called them to abandon the worship of idols and worship Allah alone, warning of the consequences of rejecting this call. His uncle Abu Lahab, present among the crowd, responded with open hostility, cursing him and saying, 'May you perish! Is this why you gathered us?' — a moment that later prompted the revelation of Surah Al-Masad, condemning Abu Lahab and his wife by name.

This moment marked the definitive shift from a quiet, private invitation to open, public proclamation of Islam — and with it, the beginning of sustained, organized opposition from Quraysh, who until then had largely tolerated the new movement as a private curiosity. From this point forward, the Prophet ﷺ and his small community of followers faced escalating mockery, social boycott, economic pressure, and eventually violent persecution, testing the sincerity and endurance of the earliest believers.`,
    detailed_text_roman_urdu: `Wahi ke aane ke ba'd taqreeban pehle teen saal, Nabi ﷺ ne logon ko khufia aur khamoshi se Islam ki dawat di, khaas taur par qareebi ghar walon, doston, aur qabil-e-aitmaad jaan-pehchan walon mein, Al-Arqam ibn Abi al-Arqam ke ghar (Dar al-Arqam) Mount Safa ke qareeb miltay hue — ek khufia jagah jahan pehle chand Musalman, sirf mutthi bhar tadaad mein, Quraysh ki dushmani se door seekhne aur namaz parhne ke liye jama hote the.

Jab Allah ne Surah Al-Hijr mein hukum diya ke 'jis baat ka tumhein hukum diya gaya hai usay khule-aam bayan karo aur mushrikeen se munh phair lo,' to Nabi ﷺ Mount Safa par charhe, Ka'bah ki taraf dekhte hue, aur Quraysh ko unke khandano ke naam se buland awaaz se bulaya — ye zaroori khabar ke liye pori shehar ko khabardar karne ka riwaji tareeqa tha. Jab log hairan aur mutajassis hokar jama hue, to unhone ek sawal poocha: agar wo unhein khabardar karein ke usi raat ek dushman fauj hamla karne wali hai, to kya wo unki baat par yaqeen karenge? Unhone bila ta'akhur jawab diya ke haan, kyunke unhone kabhi unhein jhoot bolte nahi dekha tha.

Unki hameshgi ki sacchai ka iqrar hasil karne ke baad, unhone e'lan kiya: 'Main tumhein aane wale sakht azab se pehle khabardar karne wala hoon.' Unhone unhein buthon ki ibadat chhorne aur sirf Allah ki ibadat karne ki dawat di, is dawat ko rad karne ke natayej se khabardar karte hue. Unke chacha Abu Lahab, jo hujoom mein mojood the, ne khule taur par dushmani ka izhaar kiya, unhein la'nat bhejte hue kaha, 'Tera nuqsan ho! Kya isi liye humein jama kiya tha?' — is lehze ne Surah Al-Masad ki wahi ki wajah bani, jis mein Abu Lahab aur uski biwi ko naam le kar mazammat ki gayi.

Ye lehza khufia, niji dawat se khuli, aam dawat ki taraf faisla-kun tabdeeli ki alamat bana — aur is ke sath, Quraysh ki musalsal aur muntazam mukhalifat ka aghaz hua, jo is se pehle is naye tehreek ko sirf ek niji tajassub ke taur par bardasht karte the. Is lehze se aage, Nabi ﷺ aur unke chand pairokaron ko badhti hui tazheek, ijtimai boycott, maali dabao, aur aakhir mein tashaddud-amiz zulm ka samna karna para, jisne pehle imaan walon ki sacchai aur istiqamat ko azmaya.`,
    key_lessons: [
      "Courage in speaking truth",
      "Leveraging established character",
      "Establishing credibility before delivering hard truths",
    ],
    key_lessons_roman_urdu: [
      "Sach kehne ki himmat",
      "Qaim-shuda kirdar ka istemaal",
      "Sakht haqaiqat pesh karne se pehle aitmaad qaim karna",
    ],
    authentic_sources: [
      "Sahih al-Bukhari 4770",
      "Qur'an, Surah Al-Masad (111)",
      "Qur'an, Surah Al-Hijr (15):94",
      "Ar-Raheeq Al-Makhtum",
    ],
  },
  {
    year_ce: "615 CE",
    title: "The First Hijra to Abyssinia",
    title_arabic: "الهجرة الأولى إلى الحبشة",
    era: "prophethood",
    description: "Facing intensifying persecution in Makkah, a group of early Muslims migrated to the Christian kingdom of Abyssinia (modern Ethiopia) under the just rule of the Negus, seeking safety to practice their faith.",
    detailed_text: `As persecution of the Muslims in Makkah intensified — including physical torture of the weak and enslaved, economic boycotts of Muslim traders, and public humiliation of even prominent converts — the Prophet ﷺ, unable to guarantee their safety, advised a group of his followers to migrate to Abyssinia (modern-day Ethiopia), across the Red Sea, where a Christian king known as the Negus (An-Najashi) ruled with a reputation for justice, and no one, he said, would be wronged there.

A first small group of around a dozen Muslims, and later a larger group, made the journey — this migration, in 615 CE, predates the more famous Hijra to Madinah by seven years and is sometimes called the 'first Hijra.' Among them was Ja'far ibn Abi Talib, the Prophet's ﷺ cousin, who emerged as the group's spokesman, along with Uthman ibn Affan (RA) and his wife Ruqayyah (RA), the Prophet's ﷺ own daughter.

Alarmed that the Muslims had found safety and were spreading their message even abroad, Quraysh dispatched two envoys, Amr ibn al-As and Abdullah ibn Abi Rabi'ah, bearing gifts for the Negus and his court, to demand the migrants' extradition, describing them to the court as dangerous, ignorant youths who had abandoned the religion of their people without adopting Christianity or any other recognized faith.

The Negus, however, insisted on hearing directly from the Muslims themselves before making any decision. Ja'far ibn Abi Talib spoke on their behalf, describing the darkness of pre-Islamic ignorance — worshipping idols, eating carrion, severing family ties, and the strong oppressing the weak — and how Allah had sent a Prophet ﷺ among them who called them to honesty, kindness, prayer, charity, and the abandonment of these evils. Moved, the Negus asked Ja'far to recite something of what had been revealed to this Prophet ﷺ, and Ja'far recited from Surah Maryam, describing the miraculous birth of Jesus and the piety of his mother Mary. The Negus, a Christian deeply familiar with this story, wept until his beard was wet, and declared that this and the message of Jesus came from the same source, and refused to hand the Muslims over, returning the Quraysh envoys' gifts.

This episode is remembered as an early, powerful demonstration that Islam's message could resonate across religious lines when heard honestly, and as a model of seeking refuge and justice from a righteous ruler regardless of his faith — the Negus himself is widely reported to have secretly embraced Islam before his death, and the Prophet ﷺ later led a funeral prayer for him in absentia upon receiving news of his passing.`,
    detailed_text_roman_urdu: `Jab Makkah mein Musalmano par zulm shadeed hota gaya — kamzor aur ghulam logon par jismani tashaddud, Musalman tajiron ka maali boycott, aur namayan naye Musalmano ki aam be-izzati shamil thi — Nabi ﷺ, unki hifazat ki zamanat na de sakne ki wajah se, apne kuch pairokaron ko mashwara diya ke wo Abyssinia (aaj ka Ethiopia) hijrat kar jayein, Bahr-e-Qulzum ke us paar, jahan Najashi (Negus) naam ka aik Christian badshah insaaf ki shohrat rakhta tha, aur unke mutabiq wahan kisi ke sath zulm nahi hoga.

Pehla chhota giroh, taqreeban aik dozan Musalman, aur ba'd mein aik bara giroh, is safar par nikla — ye hijrat, 615 CE mein, Madinah ki mash'hoor Hijrat se saat saal pehle hui thi aur isay ba'ze waqt 'pehli Hijrat' kaha jata hai. Un mein Ja'far ibn Abi Talib, Nabi ﷺ ke cousin, shamil the, jo giroh ke tarjuman bane, sath hi Uthman ibn Affan (RA) aur unki biwi Ruqayyah (RA), Nabi ﷺ ki apni beti.

Is baat se pareshan hokar ke Musalmano ne hifazat pa li hai aur bahar bhi apna payam phaila rahe hain, Quraysh ne do sifarati numainde, Amr ibn al-As aur Abdullah ibn Abi Rabi'ah, tohfay le kar Najashi ke darbar mein bheje, taake muhajireen ki wapasi ka mutalba karein, unhein darbar mein khatarnak, na-samajh naujawan bata kar jinhone apni qaum ka deen chhor diya lekin Christianiyat ya koi aur ta'sleem-shuda deen bhi nahi apnaya.

Najashi ne, tab bhi, koi faisla lene se pehle khud Musalmano se sun'na zaroori samjha. Ja'far ibn Abi Talib ne unki taraf se baat ki, Islam se pehle ke tareek daur ka zikr kiya — buthon ki ibadat, murda janwaron ka gosht khana, khandani rishtay tor dena, aur kamzoron par zabardast logon ka zulm — aur kaise Allah ne unke darmiyan aik Nabi ﷺ bheja jisne unhein sacchai, mehrbani, namaz, sadqa, aur in buraiyon ko chhorne ki dawat di. Mutasir hokar, Najashi ne Ja'far se kaha ke wo is Nabi par nazil hone wali kuch wahi tilawat karein, aur Ja'far ne Surah Maryam se tilawat ki, Isa (AS) ki mo'jizana paidaish aur unki walida Maryam ki pakeezgi ka zikr karte hue. Najashi, aik Christian jo is qissay se gehri waqfiyat rakhta tha, apni dari tar hone tak roya, aur e'lan kiya ke ye aur Isa (AS) ka payam ek hi sarchashme se hai, aur Musalmano ko wapas karne se inkar kar diya, Quraysh ke numainde ke tohfay wapas kar diye.

Ye waqia us waqt ki yaad dilata hai jab Islam ka payam mazhabi hudood se paar bhi asar dikha saka jab sacchai se suna gaya, aur ek aadil hukmaran se panah aur insaaf talab karne ka namoona hai, chahe uska mazhab kuch ho — Najashi ke bare mein wasee taur par kaha jata hai ke unhone apni wafat se pehle khufia taur par Islam qabool kar liya tha, aur Nabi ﷺ ne unki khabar mil'ne par unki namaz-e-janaza gair-mojoodgi mein parhi.`,
    key_lessons: [
      "Islam calls for seeking refuge and protecting the vulnerable, even across faith lines",
      "Justice and character earn respect regardless of religion",
      "Patience and reliance on Allah in the face of persecution",
      "Justice transcends religious boundaries",
    ],
    key_lessons_roman_urdu: [
      "Islam panah talab karne aur kamzoron ki hifazat ki dawat deta hai, chahe deen mukhtalif hi ho",
      "Insaaf aur kirdar deen se qata-e-nazar izzat kamate hain",
      "Zulm ke samne sabr aur Allah par bharosa",
      "Insaaf mazhabi hudood se aage hai",
    ],
    authentic_sources: [
      "Ibn Hisham, As-Sirah an-Nabawiyyah",
      "Ar-Raheeq Al-Makhtum",
      "Musnad Ahmad (Ja'far's speech before the Negus)",
      "Qur'an, Surah Maryam (19)",
    ],
  },
  {
    year_ce: "616 CE",
    title: "The Boycott of Banu Hashim (Shi'b Abi Talib)",
    title_arabic: "مقاطعة بني هاشم في شعب أبي طالب",
    era: "prophethood",
    description: "Quraysh imposed a harsh three-year social and economic boycott on the Prophet's ﷺ own clan, Banu Hashim, confining them to a mountain pass and cutting off all trade and marriage ties in an attempt to force them to hand him over.",
    detailed_text: `Frustrated by their failure to suppress the growing movement through mockery, torture, and economic pressure on individuals, the leaders of Quraysh convened and drew up a formal written pact: no member of Quraysh would trade with, marry into, or otherwise associate with the clan of Banu Hashim (the Prophet's ﷺ own clan) and their allied clan Banu al-Muttalib, until they handed Muhammad ﷺ over to be killed. The document was signed and hung inside the Ka'bah to give it religious and social weight.

Crucially, this boycott bound the entire clan collectively, including its non-Muslim members — most notably Abu Talib, the Prophet's ﷺ uncle and guardian, who never accepted Islam himself but refused, as a matter of tribal honor and personal loyalty, to abandon his nephew to his enemies. As a result, the whole of Banu Hashim, Muslim and non-Muslim alike, withdrew to the narrow mountain pass known as Shi'b Abi Talib on the outskirts of Makkah, cut off from normal commerce and support.

The boycott lasted approximately three years, during which the clan endured severe hardship and hunger; some accounts describe the sound of children crying from hunger being audible from outside the pass, and instances of eating leaves and tree bark when food ran short, with occasional smuggled supplies from sympathetic individuals within Quraysh who quietly opposed the boycott's cruelty, such as Hisham ibn Amr.

The boycott finally ended when a group of Quraysh leaders — including Hisham ibn Amr, Zuhayr ibn Abi Umayyah, and others troubled by the injustice — organized to have the document annulled. According to the Sirah, the Prophet ﷺ informed his uncle Abu Talib that termites had eaten away the entire text of the document except for the phrase 'In the name of Allah.' Abu Talib went to the Ka'bah and challenged Quraysh's leaders to examine the document; when it was found exactly as described, several leaders publicly renounced the boycott, and it was formally lifted.

The episode illustrates both the depth of the persecution the early Muslim community endured, and the way tribal loyalty — even without shared faith — and eventually the conscience of some among their oppressors, played a role in its resolution.`,
    detailed_text_roman_urdu: `Tazheek, tashaddud, aur infiradi maali dabao se tehreek ko dabane mein na-kaam hokar, Quraysh ke sardaron ne ijlaas kiya aur ek baqaida tehreeri ma'ahida tayyar kiya: Quraysh ka koi rukun Banu Hashim (Nabi ﷺ ke apne khandan) aur unke saathi khandan Banu al-Muttalib ke sath tijarat, shaadi, ya koi aur ta'alluq nahi rakhega, jab tak wo Muhammad ﷺ ko qatal ke liye hawale nahi kar dete. Ma'ahide par dastkhat kiye gaye aur usay Ka'bah ke andar latka diya gaya taake usay mazhabi aur ijtimai wazn mile.

Nihayat ahem baat ye hai ke ye boycott poore khandan ko ba-ittihaad pabandi mein bandhta tha, iske ghair-Muslim arkaan bhi shamil the — khaas taur par Abu Talib, Nabi ﷺ ke chacha aur sarparast, jinhone khud Islam qabool nahi kiya lekin qabaili izzat aur zaati wafadari ki bunyad par apne bhatije ko dushmano ke hawale karne se inkar kiya. Iske natije mein, poora Banu Hashim, Musalman aur ghair-Musalman sab, Makkah ke bahar Shi'b Abi Talib ke tang darrey mein chale gaye, aam tijarat aur madad se katey hue.

Ye boycott taqreeban teen saal jari raha, jis doran khandan ne shadeed bhook aur museebat bardasht ki; kuch riwayaton mein zikr hai ke bachon ke bhook se rone ki awaaz darrey ke bahar se suni ja sakti thi, aur khane ki kami hone par patte aur darakhton ka chhal khane ki naubat aayi, sath hi Quraysh mein chupke se boycott ki sakhti ke khilaf logon, jaise Hisham ibn Amr, ki taraf se ki gayi khufia madad bhi milti rahi.

Boycott aakhirkar us waqt khatam hua jab Quraysh ke chand sardaron — Hisham ibn Amr, Zuhayr ibn Abi Umayyah, aur zulm se pareshan doosre logon — ne mil kar ma'ahide ko mansookh karne ka intezam kiya. Sirah ke mutabiq, Nabi ﷺ ne apne chacha Abu Talib ko batya ke deemak ne dastawez ka poora matan kha liya hai siwaye 'Allah ke naam se' ke alfaz ke. Abu Talib Ka'bah gaye aur Quraysh ke sardaron ko chunauti di ke wo dastawez ka mu'ayna karein; jab wo waisa hi paya gaya jaisa bataya gaya tha, to kai sardaron ne khule taur par boycott se inkar kar diya, aur usay baaqaida khatam kar diya gaya.

Ye waqia dono baaton ko zahir karta hai — jis had tak ibtidai Musalman qaum ne zulm bardasht kiya, aur jis tarah qabaili wafadari — imaan ke bawajood bhi — aur aakhir mein unke zalimon mein se ba'z ka zameer, is ke hal mein kaar-far raha.`,
    key_lessons: [
      "Steadfastness and patience in the face of collective hardship",
      "Truth ultimately prevails over oppression",
      "Family loyalty and protection of the vulnerable",
    ],
    key_lessons_roman_urdu: [
      "Ijtimai museebat mein sabat-qadmi aur sabr",
      "Sach aakhir mein zulm par ghalib aata hai",
      "Khandani wafadari aur kamzoron ki hifazat",
    ],
    authentic_sources: [
      "Sahih al-Bukhari",
      "Ibn Hisham, As-Sirah an-Nabawiyyah",
      "Ar-Raheeq Al-Makhtum",
    ],
  },
  {
    year_ce: "619 CE",
    title: "The Year of Grief ('Am al-Huzn)",
    title_arabic: "عام الحزن",
    era: "prophethood",
    description: "The passing of his beloved wife Khadijah (RA) and his supportive uncle Abu Talib.",
    detailed_text: `The year 619 CE, roughly a decade into his mission, brought a convergence of personal losses so severe that it became known in Islamic history as 'Am al-Huzn — the Year of Grief. Within a short span of time, the Prophet ﷺ lost both his wife Khadijah (RA), his closest companion and first believer of twenty-five years, and his uncle Abu Talib, who had protected and sheltered him since childhood despite never accepting Islam.

Khadijah's death removed not only a beloved spouse but his most steadfast source of comfort through every hardship of the preceding decade; it is said the Prophet ﷺ never stopped mentioning her with love and gratitude for the rest of his life, even after remarrying. Abu Talib's death, meanwhile, removed his most significant political protection within Quraysh — as clan chief, Abu Talib's standing had, until then, deterred the worst physical violence against his nephew, even as Quraysh's other forms of persecution intensified.

With this protection gone, hostility toward the Prophet ﷺ grew bolder. Seeking a new base of support, he traveled to the nearby town of Ta'if to invite its leading tribe, Thaqif, to Islam and to ask for their protection. He was met not merely with refusal but with open cruelty: the leaders mocked him, incited the town's youths and slaves to pelt him with stones, and chased him out of the town, leaving him injured and bleeding, until he took shelter in an orchard belonging to Utbah and Shaybah, sons of Rabi'ah.

It was there, exhausted, wounded, and utterly alone, that he offered one of the most moving supplications recorded in the Sirah, beginning: 'O Allah, to You I complain of my weakness, my lack of resources, and my humiliation before people... You are the Lord of the weak, and You are my Lord. To whom do You entrust me?' According to the account, the Angel Jibril then came to him along with the Angel of the Mountains, who offered — with Allah's permission — to crush the people of Ta'if between the mountains surrounding their valley in retribution. The Prophet ﷺ refused, saying he hoped that Allah would bring forth from their descendants people who would worship Him alone.

This combination of profound personal grief, loss of protection, and public rejection at Ta'if represents one of the lowest points of the entire Makkan period — and the Prophet's ﷺ response to it, choosing mercy and hope over vengeance even at his most vulnerable, is held up as one of the clearest examples of his character.`,
    detailed_text_roman_urdu: `Saal 619 CE, unki risalat ke taqreeban das saal ba'd, itne shadeed zaati sadmaat ka majmoo'a laya ke ye Islami tareekh mein 'Am al-Huzn — Ghum ka Saal — ke naam se mash'hoor hua. Thore hi arse mein, Nabi ﷺ ne apni biwi Khadijah (RA), pachees saal ki qareebi saathi aur pehli imaan lane wali, aur apne chacha Abu Talib, jinhone bachpan se unki hifazat aur sarparasti ki thi Islam qabool na karne ke bawajood, dono ko kho diya.

Khadijah ki wafat ne na sirf ek mahboob biwi balke unke pichle das saalon ki sab se pukhta tasalli ka zariya bhi cheen liya; kaha jata hai ke Nabi ﷺ ne baqi zindagi unhein mohabbat aur shukr-guzari se yaad karna kabhi nahi chhora. Abu Talib ki wafat ne, doosri taraf, Quraysh mein unki sab se ahem siyasi hifazat khatam kar di — khandani sardar ke taur par, Abu Talib ki hasiyat ne is se pehle unke bhatije ke khilaf sab se zyada shadeed jismani tashaddud ko roka tha, jabke Quraysh ke zulm ki doosri qismein badh rahi thin.

Is hifazat ke khatam hone par, Nabi ﷺ ke khilaf dushmani aur zyada dilairana ho gayi. Nayi madad ki talash mein, wo qareebi qasbe Ta'if gaye taake wahan ke sardar qabeele Thaqif ko Islam ki dawat dein aur unki hifazat talab karein. Unhein sirf inkar hi nahi mila balke khuli sakhti ka samna karna para: sardaron ne unhein tazheek ki, qasbe ke naujawano aur ghulamon ko unhein pathar marne par uksaya, aur unhein qasbe se nikal diya, zakhmi aur khoon-alooda halat mein, jab tak wo Utbah aur Shaybah, Rabi'ah ke betoon ke bagh mein panah na le sakein.

Wahan hi, thake maandey, zakhmi, aur mukammal tanhai mein, unhone Sirah mein darj ki gayi sab se dardnaak duaon mein se ek ki: 'Ae Allah, main tujh se apni kamzori, apne wasail ki kami, aur logon ke saamne apni be-izzati ki fariyaad karta hoon... Tu kamzoron ka Rab hai, aur Tu hi mera Rab hai. Tu mujhe kis ke sapurd karta hai?' Riwayat ke mutabiq, Farishta Jibril phir unke pass Pahadon ke Farishtay ke sath aaye, jisne — Allah ki ijazat se — Ta'if ke logon ko unke gird ke pahadon ke darmiyan kuchal dene ki peshkash ki. Nabi ﷺ ne inkar kar diya, ye kehte hue ke unhein ummeed hai Allah unki nasal se aisay log paida karega jo sirf usi ki ibadat karein.

Gehre zaati ghum, hifazat ke khatme, aur Ta'if mein aam rad ka ye majmoo'a Makki daur ke sab se nichle nuqta mein se ek hai — aur is par Nabi ﷺ ka rad-e-amal, sab se kamzor lehze mein bhi rehmat aur ummeed ko intiqam par tarjeeh dena, unke kirdar ki sab se wazeh misalon mein se ek samjha jata hai.`,
    key_lessons: [
      "Patience (Sabr) during immense trials",
      "Compassion even toward hostile adversaries",
      "Mercy toward one's enemies even at one's lowest point",
    ],
    key_lessons_roman_urdu: [
      "Shadeed azmaishon mein sabr",
      "Dushman se bhi hamdardi",
      "Apne sab se kamzor lehze mein bhi dushmano par rehmat",
    ],
    authentic_sources: [
      "Ar-Raheeq Al-Makhtum, p. 132",
      "Sahih al-Bukhari (the Ta'if narration, via 'Aisha, RA)",
      "Ibn Hisham, As-Sirah an-Nabawiyyah",
    ],
  },
  {
    year_ce: "621 CE",
    title: "The Night Journey & Ascension (Isra & Mi'raj)",
    title_arabic: "الإسراء والمعراج",
    era: "prophethood",
    description: "Miraculous journey from Makkah to Jerusalem, and ascension through the heavens where 5 daily prayers were prescribed.",
    detailed_text: `Shortly after the hardships of Ta'if and the Year of Grief, the Prophet ﷺ experienced one of the most extraordinary events of his life: in a single night, he was taken on a miraculous journey — Al-Isra — from the Sacred Mosque in Makkah to the Farthest Mosque (Al-Masjid al-Aqsa) in Jerusalem, a journey that would ordinarily take weeks by camel, riding a heavenly mount described as Al-Buraq, guided by the Angel Jibril.

At Al-Aqsa, the Prophet ﷺ led the souls of all the previous Prophets in prayer, affirming his place as the final Messenger continuing their shared mission. From there began Al-Mi'raj, the Ascension — he was raised through the seven heavens, meeting several of the earlier Prophets along the way, including Adam, Yahya (John) and Isa (Jesus) together, Yusuf (Joseph), Idris (Enoch), Harun (Aaron), Musa (Moses), and finally Ibrahim (Abraham) near the boundary of Sidrat al-Muntaha, the furthest point of creation any being could reach.

It was during this ascension that the five daily prayers were prescribed upon the Muslim nation. According to the widely reported account, Allah initially ordained fifty prayers a day; as the Prophet ﷺ descended, Musa (Moses), based on his own experience with the difficulty of his people, repeatedly urged him to return and ask for a reduction, saying his nation would not be able to bear such a number. The Prophet ﷺ went back and forth between Allah and Musa several times, each time securing a reduction, until the number was fixed at five — with the promise that the reward would remain equivalent to fifty, out of Allah's mercy.

When the Prophet ﷺ related this journey to the people of Makkah the next morning, it was met with disbelief and ridicule from many, who considered a journey to Jerusalem and back in one night, let alone an ascension through the heavens, to be an impossible claim. Abu Bakr (RA), upon hearing of others' doubt and being asked directly whether he believed it, responded immediately and without hesitation that if the Prophet ﷺ said it, then it was true — earning him, from that day, the title As-Siddiq, 'the one who affirms the truth without doubt.' Quraysh reportedly tested the account further by asking the Prophet ﷺ to describe Al-Aqsa in detail, and by asking about a caravan they knew was traveling toward Makkah, whose arrival time he was able to accurately predict.

The Night Journey stands as both a profound spiritual honor granted to the Prophet ﷺ at one of the hardest points of his mission, and the origin of the five daily prayers that remain, to this day, the central pillar of Muslim worship.`,
    detailed_text_roman_urdu: `Ta'if ki museebaton aur Ghum ke Saal ke thori der ba'd, Nabi ﷺ ko apni zindagi ke sab se ajeeb-o-ghareeb waqiat mein se ek pesh aaya: ek raat mein, unhein aik mo'jizana safar — Al-Isra — par le jaya gaya, Makkah ki Masjid-e-Haram se Jerusalem ki Masjid-e-Aqsa tak, jo safar oont par hafto lag jate, aik aasmani sawari Al-Buraq par, Jibril ki rahnumai mein.

Al-Aqsa mein, Nabi ﷺ ne tamam pichle Ambiya ki rooh ki imamat karayi, apne aakhri Rasool hone ki hasiyat ko unke sath ke mushtarka mission ko jari rakhte hue tasdeeq kiya. Wahan se Al-Mi'raj shuru hua, saat aasmano se guzarna — unhein saat aasmano tak le jaya gaya, raste mein kai pichle Ambiya se mulaqat hui, jin mein Adam (AS), Yahya (AS) aur Isa (AS) sath, Yusuf (AS), Idris (AS), Harun (AS), Musa (AS), aur aakhir mein Ibrahim (AS) Sidrat al-Muntaha ki hadood ke qareeb, wo hadd jahan takhleeq ka koi bhi wajood nahi pohanch sakta.

Isi mi'raj ke doran panch waqt ki namazein Muslim ummat par farz ki gayeen. Wasee taur par riwayat ki gayi baat ke mutabiq, Allah ne pehle din mein pachaas namazein farz ki thin; jab Nabi ﷺ neeche utar rahe the, Musa (AS), apni ummat ki mushkilaat ke tajurbe ki bunyad par, unhein bar-bar wapas jane aur kami ka mutalba karne par israr karte rahe, ye kehte hue ke unki ummat aisi tadaad bardasht nahi kar sakegi. Nabi ﷺ Allah aur Musa (AS) ke darmiyan kai bar aage-piche gaye, har baar kami hasil karte hue, jab tak tadaad panch tak mahdood na ho gayi — is wa'de ke sath ke ajar pachaas ke barabar hi rahega, Allah ki rehmat ki wajah se.

Jab Nabi ﷺ ne agli subah Makkah walon ko ye safar batya, to bohot logon ne is par yaqeen na kiya aur mazaq udaya, ek raat mein Jerusalem tak jana aur wapas aana, chahe saat aasmano ka safar ho, unke liye namumkin da'wa tha. Abu Bakr (RA) ne, jab dosron ke shak ke bare mein suna aur seedha poocha gaya ke kya wo yaqeen karte hain, to bila kisi ta'akhur jawab diya ke agar Nabi ﷺ ne kaha hai to ye zaroor sach hai — jis din se unhein 'As-Siddiq' ka laqab mila, 'wo jo bila shak sach ki tasdeeq kare.' Quraysh ne riwayat ke mutabiq is waqia ko is tarah bhi azmaya ke unhone Nabi ﷺ se Al-Aqsa ka tafseeli hulya poocha, aur ek qafile ke bare mein poocha jo unke ilm mein Makkah ki taraf aa raha tha, jiska Nabi ﷺ ne durust waqt bataya.

Shab-e-Isra wa Mi'raj Nabi ﷺ ki risalat ke sab se mushkil lehze mein aik azeem ruhani sharaf ka izhaar hai, aur panch waqt ki namazon ka aghaz bhi, jo aaj tak Muslim ibadat ka markazi satoon hain.`,
    key_lessons: [
      "Central importance of daily Salah",
      "Divine honor following hardship",
      "Steadfast faith (like Abu Bakr's) even when a matter defies easy explanation",
    ],
    key_lessons_roman_urdu: [
      "Rozana panch waqt ki namaz ki markazi ahmiyat",
      "Mushkilaat ke ba'd Ilahi izzat",
      "Sabit imaan (Abu Bakr (RA) ki tarah) jab koi baat asaan tashreeh se bala ho",
    ],
    authentic_sources: [
      "Qur'an, Surah Al-Isra (17):1",
      "Sahih al-Bukhari 3887",
      "Sahih Muslim (the detailed Mi'raj narration)",
      "Ar-Raheeq Al-Makhtum",
    ],
  },
  {
    year_ce: "622 CE",
    year_ah: "1 AH",
    title: "The Hijra (Migration to Madinah)",
    title_arabic: "الهجرة النبوية إلى المدينة",
    era: "medina",
    description: "Migration from Makkah to Yathrib (Madinah), establishing the Islamic calendar.",
    detailed_text: `By 622 CE, persecution in Makkah had escalated to the point that Quraysh's leadership convened to plan the Prophet's ﷺ assassination, settling on a plan in which a representative from every clan would strike him simultaneously, so that responsibility — and any resulting blood feud — would be shared collectively rather than falling on one clan alone. Warned of the plot, the Prophet ﷺ arranged for his cousin Ali ibn Abi Talib (RA) to remain behind in his bed, covered in his cloak, to give the impression he was still there while he and Abu Bakr (RA) slipped away undetected.

Rather than heading directly north toward Madinah, they first went south, to the cave of Thawr, where they hid for three days while Quraysh search parties combed the surrounding area. According to the Sirah, at one point their pursuers came so close to the cave's entrance that Abu Bakr (RA) grew fearful for the Prophet's ﷺ safety, to which the Prophet ﷺ responded with calm reassurance: 'Do not grieve; indeed Allah is with us' — a moment later referenced in the Qur'an (Surah At-Tawbah 9:40).

Once the search had subsided, they set out for Madinah with a hired guide, Abdullah ibn Uraiqit, taking an unconventional southern route to avoid detection — arriving after several days of travel through difficult desert terrain. Along the way, the Prophet ﷺ passed the tent of Umm Ma'bad, an elderly woman who, despite having little to offer, was met with a blessing that left her family's goat producing abundant milk for years afterward, an episode often cited alongside other accounts of blessing following hardship throughout his life.

Upon arriving in the outskirts of Madinah, the Prophet ﷺ was greeted by crowds of Ansar (the Madinan Muslims) who had eagerly awaited his arrival for weeks, some accounts describing them going out daily to the edge of the city to watch for him. He initially stopped in Quba, staying several days and establishing the first mosque of Islam there, before entering Madinah proper.

Once settled, one of his first major acts was to formally establish Al-Mu'akhah, a bond of brotherhood pairing each Muhajir (Makkan migrant) with an Ansari (Madinan host), instructing the Ansar to share their homes and wealth with their new brothers — an extraordinary act of solidarity that helped the penniless migrants rebuild their lives and cemented Madinah as the new center of the Muslim community. This migration marked such a decisive turning point that the Islamic (Hijri) calendar itself begins counting from this year.`,
    detailed_text_roman_urdu: `622 CE tak, Makkah mein zulm us hadd tak badh gaya tha ke Quraysh ki qiyadat ne Nabi ﷺ ke qatal ki mansoobandi ke liye ijlaas kiya, ek aisa mansooba tay kiya jisme har khandan ka ek numainda ek sath hamla karega, taake zimmedari — aur is se paida hone wali khoon ki dushmani — ek khandan par nahi balke sab par barabar taqseem ho. Is saazish ki khabar mil'ne par, Nabi ﷺ ne intezam kiya ke unke cousin Ali ibn Abi Talib (RA) unke bistar par unki chadar odh kar rukein, taake ye tasawwur bane ke wo abhi wahan hain, jab tak wo aur Abu Bakr (RA) khufia taur par nikal na gaye.

Seedha shumal mein Madinah ki taraf jane ke bajaye, wo pehle janoob mein, Ghar-e-Thawr ki taraf gaye, jahan wo teen din chhupe rahe jab tak Quraysh ke talash karne wale giroh gird-o-nawah ko chhaan te rahe. Sirah ke mutabiq, ek lehza aisa aaya jab unke ta'aqub karne wale ghar ke daryaze ke itne qareeb aa gaye ke Abu Bakr (RA) Nabi ﷺ ki hifazat ko lekar khaufzada ho gaye, jis par Nabi ﷺ ne sukoon se jawab diya: 'Ghum na karo; beshak Allah hamare sath hai' — ye lehza ba'd mein Qur'an (Surah At-Tawbah 9:40) mein bayan hua.

Talash mand hone ke ba'd, wo Madinah ki taraf ek kirai ke rahnuma, Abdullah ibn Uraiqit, ke sath rawana hue, ek ghair-ma'moli janoobi rasta lete hue takashif se bachne ke liye — kai dinon ke mushkil sehrai safar ke ba'd wo pohanche. Raste mein, Nabi ﷺ Umm Ma'bad ke khaimay se guzre, ek buzurg khatoon jinke pass dene ke liye bohot kam tha, magar unhein ek aisi barkat mili jisne unke ghar ki bhairh ko salon tak faraawan doodh dene wala bana diya, ek waqia jo unki zindagi ke doosre mushkilaat ke ba'd barkat ke waqiat ke sath aksar bayan hota hai.

Madinah ke bahri hisse mein pohanchne par, Nabi ﷺ ka Ansar (Madinah ke Musalmano) ke hujoom ne pur-josh istaqbal kiya, jo hafto se betaabi se unke intezar mein the, kuch riwayaton mein bataya jata hai ke wo roz shehar ke kinare tak jate the unhein dekhne ke liye. Wo pehle Quba mein theh're, kai din wahan guzarey aur Islam ki pehli masjid wahan qaim ki, is se pehle ke wo Madinah mein dakhil hote.

Ek baar sattle hone ke ba'd, unke pehle ahem kaamon mein Al-Mu'akhah qaim karna shamil tha, har Muhajir (Makki muhajir) ko ek Ansari (Madani mez'baan) ke sath bhai-chare mein joda, Ansar ko hukum diya ke wo apne naye bhaiyon ke sath apne ghar aur maal baant lein — ek ghair-ma'mool fal-o-karam ka amal jisne be-saro-saman muhajireen ko apni zindagi dobara banane mein madad ki aur Madinah ko Muslim qaum ka naya markaz bana diya. Ye hijrat itna faisla-kun lamha thi ke Islami (Hijri) calendar khud isi saal se shumar hona shuru hota hai.`,
    key_lessons: [
      "Pairing trust in Allah (Tawakkul) with thorough planning",
      "Brotherhood over tribalism",
      "Sacrifice and generosity build lasting community — the Ansar's example",
    ],
    key_lessons_roman_urdu: [
      "Allah par tawakkul ko mukammal mansoobandi ke sath jorna",
      "Qabailiyat par bhai-chara",
      "Qurbani aur sakhawat pukhta qaum banate hain — Ansar ki misaal",
    ],
    authentic_sources: [
      "Sahih al-Bukhari 3905",
      "Qur'an, Surah At-Tawbah (9):40",
      "Ibn Hisham, As-Sirah an-Nabawiyyah",
      "Ar-Raheeq Al-Makhtum",
    ],
  },
  {
    year_ce: "624 CE",
    year_ah: "2 AH",
    title: "Battle of Badr",
    title_arabic: "غزوة بدر",
    era: "medina",
    description: "The first major battle between the Muslims of Madinah and the Quraysh of Makkah, where a small, poorly-equipped Muslim force of about 313 decisively defeated a Makkan army three times its size.",
    detailed_text: `In March 624 CE (17 Ramadan, 2 AH), tension between the Muslims of Madinah and Quraysh of Makkah, which had simmered since the Hijra amid repeated raids and confiscated Muslim property left behind in Makkah, came to a head when the Prophet ﷺ learned of a large Quraysh trade caravan, led by Abu Sufyan, returning from Syria. He set out with a small force — traditionally numbered at 313 men, a mix of Muhajirun and Ansar, most on foot with only a handful of horses and camels between them — intending to intercept the caravan, not to fight a pitched battle.

Abu Sufyan, sensing danger, diverted the caravan's route and sent urgent word to Makkah, prompting Quraysh to dispatch a well-equipped army of roughly 1,000 men, including cavalry, to confront the Muslims and protect their trade interests, arriving near the wells of Badr before the Muslims realized the caravan itself had escaped and a battle with Quraysh's main force was now unavoidable.

On the eve of battle, the Prophet ﷺ inspected potential battle positions and, on the advice of a companion, Hubab ibn al-Mundhir, relocated the Muslim camp to secure control of the wells of Badr, denying the enemy easy access to water — an early example of tactical consultation (shura) shaping his military decisions. That night, he prayed at length in a small shelter built for him, reportedly supplicating with such intensity and humility — 'O Allah, if this small band is destroyed today, You will not be worshipped on earth again' — that Abu Bakr (RA), witnessing his distress, gently reassured him that Allah would surely fulfill His promise of victory.

The battle itself opened with single combat between champions of each side, followed by a general engagement. The Qur'an (Surah Al-Anfal, 8:9-12) describes Allah sending down a thousand angels in succession to support the believers, along with rainfall that firmed the sandy ground for the Muslims while hindering the enemy. Despite being outnumbered roughly three to one, the Muslims achieved a decisive victory: several prominent Quraysh leaders — including Abu Jahl, the movement's most virulent opponent — were killed, and around seventy prisoners were taken.

The treatment of these prisoners afterward became a notable example of mercy in war: rather than mass execution, most were held for ransom, and those unable to pay were freed on condition of teaching literacy to Muslim children in Madinah — an early instance of prioritizing knowledge even amid the aftermath of conflict. Badr's victory, against overwhelming odds, was seen by the early Muslim community as unmistakable divine confirmation of their cause, and it dramatically shifted the balance of power between Madinah and Makkah.`,
    detailed_text_roman_urdu: `March 624 CE (17 Ramzan, 2 AH) mein, Madinah ke Musalmano aur Makkah ke Quraysh ke darmiyan tanao, jo Hijrat ke ba'd se Musalman jaidad ki zabti aur musalsal chhape-marion ki wajah se ubal raha tha, us waqt sar uthaya jab Nabi ﷺ ko Abu Sufyan ki qiyadat mein Syria se wapas aane wale ek bare tijarati qafile ki khabar mili. Wo ek chhoti fauj — riwayat ke mutabiq 313 afraad — ke sath nikle, jo aksar paidal the aur sirf mutthi bhar ghore aur oont unke pass the — unka maqsad qafile ko rokna tha, jang larna nahi.

Abu Sufyan ne, khatra mehsoos karte hue, qafile ka rasta badal diya aur Makkah ko fauri paigham bheja, jis par Quraysh ne taqreeban 1,000 afraad ki achhi tarah muslah fauj, sawaar dasta shamil, Musalmano ka samna karne aur apne tijarati mufadaat ki hifazat ke liye bheji, jo Badr ke kuon ke qareeb pohanchi is se pehle ke Musalmano ko pata chalta ke qafila to bach gaya hai aur Quraysh ki mukammal fauj se jang ab la-guzeer hai.

Jang se ek raat pehle, Nabi ﷺ ne mumkin jang ki jagahon ka mu'ayna kiya aur, sahabi Hubab ibn al-Mundhir ke mashware par, Musalman khaime ko Badr ke kuon par qabza hasil karne ke liye munaqil kiya, dushman ko pani tak asaan rasai se mehroom karte hue — unki fauji faisla-sazi mein mashware (shura) ki ek ibtidai misaal. Us raat, unhone apne liye banaye gaye ek chhoti panah mein tawil dua ki, itni shadeed aur inkisari se — 'Ae Allah, agar aaj ye chhota giroh tabah ho gaya, to zameen par teri ibadat dobara nahi hogi' — ke Abu Bakr (RA), unki be-qarari dekh kar, unhein pyar se yaqeen dilaya ke Allah zaroor apna wa'da poora karega.

Jang ki ibtida dono taraf ke pehalwano ke aamne-samne muqable se hui, jiske ba'd aam mahaaz shuru hua. Qur'an (Surah Al-Anfal, 8:9-12) bayan karta hai ke Allah ne hazaron farishtay musalsal utar kar imaan walon ki madad ki, sath hi baarish jisne raetli zameen ko Musalmano ke liye mazboot kar diya jabke dushman ko rukawat di. Taqreeban teen guna zyada tadaad ke bawajood, Musalmano ne faisla-kun fatah hasil ki: Quraysh ke kai bare sardar — jin mein Abu Jahl, is tehreek ka sab se zyada shadeed mukhalif shamil tha — halak hue, aur taqreeban sattar qaidi pakre gaye.

Ba'd mein in qaidiyon ke sath sulook rehmat ki khaas misaal bana: bajaye ijtimai sazaye maut ke, aksar ko fidye ke badle rakha gaya, aur jo fidya nahi de sakte the unhein is shart par azad kiya gaya ke wo Madinah ke Musalman bachon ko parhna-likhna sikhayein — jang ke ba'd bhi ilm ko tarjeeh dene ki ek ibtidai misaal. Badr ki fatah, itni bhari kasrat ke khilaf, ibtidai Musalman qaum ke liye unke maqsad ki wazeh Ilahi tasdeeq samjhi gayi, aur is ne Madinah aur Makkah ke darmiyan taqat ka toazun tabdeel kar diya.`,
    key_lessons: [
      "Reliance on Allah (tawakkul) even against overwhelming odds",
      "Sincere supplication in times of hardship",
      "Mercy towards defeated enemies and prisoners of war",
      "Consultation (shura) even for a Prophet acting under revelation",
    ],
    key_lessons_roman_urdu: [
      "Bhari kasrat ke bawajood Allah par tawakkul",
      "Museebat mein khalis dua",
      "Shikast khuda dushmano aur qaidiyon ke sath rehmat",
      "Nabi ﷺ ke liye bhi, wahi ki bunyad par amal karte hue, mashware ki ahmiyat",
    ],
    authentic_sources: [
      "Qur'an, Surah Al-Anfal (8)",
      "Ibn Hisham, As-Sirah an-Nabawiyyah",
      "Sahih al-Bukhari",
      "Sahih Muslim",
      "Ar-Raheeq Al-Makhtum",
    ],
  },
  {
    year_ce: "625 CE",
    year_ah: "3 AH",
    title: "Battle of Uhud",
    title_arabic: "غزوة أحد",
    era: "medina",
    description: "A hard-fought battle near Mount Uhud in which the Muslims initially gained the upper hand but suffered heavy losses, including the martyrdom of the Prophet's ﷺ beloved uncle Hamzah, after a group of archers left their post.",
    detailed_text: `Seeking to avenge their defeat at Badr and restore their standing among the Arab tribes, Quraysh assembled a much larger force of some 3,000 men, including cavalry led by Khalid ibn al-Walid (who had not yet embraced Islam), and marched on Madinah in March 625 CE (Shawwal, 3 AH), camping near Mount Uhud on the city's outskirts.

After consulting his companions — some of whom favored remaining in Madinah for a defensive siege, while many younger companions, eager to fight, favored meeting the enemy in open battle — the Prophet ﷺ ultimately went with the majority view and led a force of around 700 men out to Uhud. He positioned fifty archers on a strategic hill (later known as Jabal ar-Rumah, the Archers' Hill) guarding the Muslim army's rear and flank, giving them an unusually explicit and repeated instruction: to hold their position no matter what happened in the battle below, until specifically ordered otherwise.

The battle initially went strongly in the Muslims' favor, and as Quraysh's ranks broke and fled, many of the archers, believing the battle won and eager to share in the spoils being collected, abandoned their post against their orders — leaving only a handful, led by their commander Abdullah ibn Jubair, who refused to leave. Khalid ibn al-Walid seized the opening, leading his cavalry around the now-undefended hill to attack the Muslim army from the rear, turning what had been a clear victory into chaos and heavy losses.

In the ensuing confusion, a false rumor spread that the Prophet ﷺ had been killed, causing many Muslims to despair, until they saw he was alive and rallied around him. He was struck in the face, losing a tooth and suffering a cut to his lip, and several companions were martyred shielding him with their own bodies. His beloved uncle Hamzah ibn Abd al-Muttalib, known for his fierce courage, was killed in the fighting, and his body was badly mutilated afterward by Hind bint Utbah, whose father and brother had been killed at Badr — an act of grief-driven vengeance that deeply pained the Prophet ﷺ.

In total, around seventy Muslims were martyred at Uhud, a significant toll for the small community. The Qur'an (Surah Aal-e-Imran, 3:121-175) reflects extensively on the battle's lessons, emphasizing that setbacks are part of the test of faith, that disobedience to clear instructions carries real consequences regardless of good intentions, and that ultimate outcomes — victory or apparent defeat — belong to Allah's wisdom, not merely to worldly measures of success.`,
    detailed_text_roman_urdu: `Badr ki shikast ka badla lene aur Arab qabaail mein apni hasiyat bahaal karne ki koshish mein, Quraysh ne taqreeban 3,000 afraad ki bahut bari fauj jama ki, jis mein Khalid ibn al-Walid (jo abhi Musalman nahi hue the) ki qiyadat mein sawaar dasta shamil tha, aur March 625 CE (Shawwal, 3 AH) mein Madinah ki taraf march kiya, Mount Uhud ke qareeb shehar ke bahar khaima laga diya.

Apne sahaba se mashware ke baad — jinme se kuch Madinah mein rukne aur dafai muhasare ki himayat karte the, jabke bohot se naujawan sahaba, jang ke liye betaab, khule maidan mein dushman se muqabla karne ki himayat karte the — Nabi ﷺ ne aakhirkar aksariyat ki raye par amal kiya aur taqreeban 700 afraad ki fauj lekar Uhud ki taraf nikle. Unhone pachaas teer-andazon ko ek ahem tilay (ba'd mein Jabal ar-Rumah, Teer-andazon ka Tila, kehlaya) par tainaat kiya, Musalman fauj ke peeche aur pehlu ki hifazat karte hue, unhein ek ghair-ma'mool wazeh aur mukarrar hukum diya: apni jagah har haal mein qaim rahein, jab tak khaas hukum na diya jaye.

Jang shuru mein Musalmano ke haq mein shadeed rahi, aur jab Quraysh ki safen tootin aur bhagne lagi, kai teer-andaz, jang jeeti hui samajh kar aur maal-e-ghanimat mein hissa lene ke liye betaab, apni jagah unke hukum ke khilaf chhor gaye — sirf mutthi bhar, jinki qiyadat unke commander Abdullah ibn Jubair karte the, ne jagah chhorne se inkar kiya. Khalid ibn al-Walid ne is khaali jagah se faida uthaya, apne sawaar dasta lekar tile ke gird se ghoom kar Musalman fauj par peeche se hamla kiya, ek wazeh fatah ko afra-tafri aur bhari nuqsan mein badal diya.

Is afra-tafri mein, ek ghalat khabar phail gayi ke Nabi ﷺ shaheed ho gaye hain, jis se bohot se Musalman mayoos ho gaye, jab tak unhone dekha ke wo zinda hain aur unke gird jama ho gaye. Unke chehre par zarb lagi, ek daant toot gaya aur lab par zakhm aaya, aur kai sahaba ne apne jismon se unki hifazat karte hue shahadat payi. Unke mehboob chacha Hamzah ibn Abd al-Muttalib, apni be-misaal shujaat ke liye mash'hoor, jang mein shaheed hue, aur unki laash ko ba'd mein Hind bint Utbah ne, jinke walid aur bhai Badr mein maare gaye the, be-hurmat kiya — ek ghum-zada intiqam ka amal jisne Nabi ﷺ ko gehra dukh diya.

Majmoo'i taur par, taqreeban sattar Musalman Uhud mein shaheed hue, chhoti qaum ke liye ek bara nuqsan. Qur'an (Surah Aal-e-Imran, 3:121-175) is jang ke asbaq par tafseel se ghor karta hai, is baat par zor deta hai ke museebatein imaan ke imtihaan ka hissa hain, ke wazeh hidayaat ki na-farmani ke haqiqi natayej hote hain neek niyyat ke bawajood, aur ke aakhri natayej — fatah ya bazahir shikast — sirf Allah ki hikmat ke sapurd hain, dunyawi kaamyabi ke miyar par nahi.`,
    key_lessons: [
      "The critical importance of obeying leadership and not abandoning one's post out of greed",
      "Trials and setbacks are part of Allah's wisdom and testing of believers",
      "Even the righteous face hardship — outcomes are not measured by worldly victory alone",
    ],
    key_lessons_roman_urdu: [
      "Qiyadat ki itaa'at aur lalach mein apni jagah na chhorna",
      "Museebatein aur naqamiyan Allah ki hikmat aur imaan walon ke imtihaan ka hissa hain",
      "Neik log bhi museebat ka samna karte hain — natayej sirf dunyawi fatah se nahi mape jate",
    ],
    authentic_sources: [
      "Qur'an, Surah Aal-E-Imran (3):121-175",
      "Ibn Hisham, As-Sirah an-Nabawiyyah",
      "Sahih al-Bukhari",
      "Ar-Raheeq Al-Makhtum",
    ],
  },
  {
    year_ce: "627 CE",
    year_ah: "5 AH",
    title: "Battle of the Trench (Al-Khandaq)",
    title_arabic: "غزوة الخندق",
    era: "medina",
    description: "Facing a massive confederate army of Quraysh and allied tribes besieging Madinah, the Muslims — on the suggestion of Salman al-Farisi (RA) — dug a deep trench around the city, a tactic unfamiliar to the Arabs, which held off the siege until it collapsed.",
    detailed_text: `By 627 CE (Shawwal, 5 AH), Quraysh sought to end the threat of Madinah once and for all by assembling the largest coalition yet against the Muslims: an alliance of Quraysh, the Bedouin tribe of Ghatafan, and several other tribes — collectively known as Al-Ahzab, 'the confederates' — bringing a combined force reportedly numbering around 10,000 men to besiege Madinah, encouraged in part by the Jewish tribe of Banu Nadir, who had been expelled from Madinah earlier and now sought revenge.

Facing an enemy force several times the size of any he had previously confronted, and with Madinah lacking natural defenses on its northern approach, the Prophet ﷺ convened his companions to decide how to respond. Salman al-Farisi (RA), a Persian companion familiar with siege warfare unfamiliar to the Arabs, suggested digging a deep trench (khandaq) across the city's exposed northern flank, a tactic that would neutralize the confederates' cavalry advantage. The Prophet ﷺ approved the plan, and the entire Muslim community — including the Prophet ﷺ himself, working alongside his companions — dug the trench over roughly six days, racing against the approaching army.

The siege that followed lasted around a month, with the confederate army unable to cross the trench in any organized way, reduced mostly to long-range exchanges of arrows and occasional attempts by individual horsemen, including the famed warrior Amr ibn Abd Wudd, to leap across — Amr was ultimately killed in single combat by Ali ibn Abi Talib (RA). Compounding the pressure on the Muslims, the Jewish tribe of Banu Qurayzah, previously allied with Madinah under treaty, broke their pact and began secret negotiations with the confederates, opening the frightening possibility of an attack from within the city itself.

During the siege, the Prophet ﷺ also sent Nu'aym ibn Mas'ud, a recent convert still trusted by the confederates as one of their own, to sow discord between the allied tribes by planting doubts about each other's loyalty and intentions — a strategy of psychological warfare that succeeded in fracturing their unity. The Qur'an (Surah Al-Ahzab, 33:9-27) describes how Allah then sent a violent, freezing windstorm that tore through the confederates' camp, overturning tents, extinguishing fires, and terrifying the exhausted, poorly-supplied army until its component tribes, already suspicious of one another, abandoned the siege and dispersed without a decisive battle ever being fought.

The Battle of the Trench marked the last major offensive Quraysh would ever mount against Madinah — after this failure, the strategic initiative shifted decisively and permanently in the Muslims' favor, setting the stage for the peace of Hudaybiyyah and the eventual conquest of Makkah.`,
    detailed_text_roman_urdu: `627 CE (Shawwal, 5 AH) tak, Quraysh ne Madinah ke khatre ko hamesha ke liye khatam karne ki koshish ki, Musalmano ke khilaf ab tak ka sab se bara ittehad jama karke: Quraysh, Bedouin qabeela Ghatafan, aur kai doosre qabaail ka ittehad — mile kar Al-Ahzab, 'muttahid fauj' — jo riwayat ke mutabiq taqreeban 10,000 afraad ki fauj le kar Madinah ka muhasira karne aaye, jise Banu Nadir, jo pehle Madinah se nikale gaye Yahudi qabeele ne, badla lene ki khwahish mein, husla-afzai di.

Apne pehle kabhi samna kiye gaye kisi bhi dushman fauj se kai guna zyada bari fauj ka samna karte hue, aur Madinah ke shumali rasta par qudrati hifazat na hone ki wajah se, Nabi ﷺ ne apne sahaba ko jama kiya taake tay karein ke kaise jawab dein. Salman al-Farisi (RA), ek Farsi sahabi jo gher-bandi ki jang se waqif the jo Arabon ke liye na-waqif thi, ne shehar ke khuli shumali simt mein ek gehri khandaq khodne ka mashwara diya, ek aisi taktik jo muttahid faujon ke sawaar dasta ke fayde ko be-asar kar degi. Nabi ﷺ ne mansooba manzoor kiya, aur poori Musalman qaum — khud Nabi ﷺ bhi apne sahaba ke sath mil kar — ne taqreeban chhe dinon mein khandaq khodi, qareeb aati fauj se pehle takmeel ki koshish mein.

Iske ba'd hone wala muhasira taqreeban ek maah tak jari raha, muttahid fauj kisi munazzam tareeqe se khandaq paar na kar saki, zyadatar door se teer-andazi tak mahdood, aur mash'hoor jangju Amr ibn Abd Wudd jaise chand sawaron ki khandaq ke uper se koodne ki koshishon tak — Amr aakhirkar Ali ibn Abi Talib (RA) ke sath aamne-samne muqable mein halak hue. Musalmano par dabao badhate hue, Yahudi qabeela Banu Qurayzah, jo pehle mahida ke tehat Madinah ke sath muttahid tha, ne apna ahd tor diya aur muttahid faujon se khufia mazakraat shuru kiye, shehar ke andar se hamle ka khaufnak imkan khol diya.

Muhasire ke doran, Nabi ﷺ ne Nu'aym ibn Mas'ud, ek naya Musalman jo abhi bhi muttahid faujon ke nazdeek qabil-e-aitmaad tha, ko bheja taake muttahid qabaail ke darmiyan ek-doosre ki wafadari aur niyyaton par shak paida karke phoot dalein — nafsiyati jang ki ye hikmat-e-amali unki ittehad ko torne mein kamyab hui. Qur'an (Surah Al-Ahzab, 33:9-27) bayan karta hai ke Allah ne phir ek shadeed, sardi bhari aandhi bheji jo muttahid faujon ke khaimon mein se guzri, khaimay ultati, aage bujhati, aur thaki hui, kam-saman fauj ko khaufzada karti rahi jab tak uske hissa banti qabaail, jo pehle hi ek-doosre par shak karte the, be-natija muhasira chhor kar mutafariq ho gaye, bila kisi faisla-kun jang ke.

Khandaq ki jang, Quraysh ki Madinah ke khilaf aakhri bari hamla-awarana koshish thi — is na-kamyabi ke ba'd, hikmat-e-amali ki bunyad hamesha ke liye Musalmano ke haq mein tabdeel ho gayi, Hudaybiyyah ke sulah aur aakhirkar Makkah ki fatah ki bunyad rakhte hue.`,
    key_lessons: [
      "Creative strategy and consultation (shura) within the bounds of Islam",
      "Allah's help often comes in unexpected ways",
      "Unity and cooperation among the believers in adversity",
    ],
    key_lessons_roman_urdu: [
      "Islam ki hudood ke andar tashkeeli hikmat-e-amali aur mashwara (shura)",
      "Allah ki madad aksar ghair-mutawaqqe tareeqon se aati hai",
      "Museebat mein imaan walon ka ittehad aur ta'awun",
    ],
    authentic_sources: [
      "Qur'an, Surah Al-Ahzab (33):9-27",
      "Ibn Hisham, As-Sirah an-Nabawiyyah",
      "Ar-Raheeq Al-Makhtum",
    ],
  },
  {
    year_ce: "628 CE",
    year_ah: "6 AH",
    title: "Treaty of Hudaybiyyah",
    title_arabic: "صلح الحديبية",
    era: "medina",
    description: "A landmark peace treaty between the Prophet ﷺ and Quraysh that, despite seemingly unfavorable terms for the Muslims at the time, the Qur'an itself later called 'a clear victory,' opening the way for Islam's rapid, peaceful spread.",
    detailed_text: `In 628 CE (Dhul-Qi'dah, 6 AH), the Prophet ﷺ set out from Madinah with around 1,400 companions, deliberately unarmed apart from ordinary travel swords, with the sole intention of performing Umrah at the Ka'bah — a right that, as pilgrims in the sacred months, they expected Quraysh to honor even amid ongoing hostility. Quraysh, however, viewed the approach of such a large group as a potential threat, and moved to block their entry into Makkah, meeting them at a place called Hudaybiyyah on the outskirts of the sanctuary.

Rather than force his way through and risk violating the sanctity of the sacred precinct, the Prophet ﷺ opened negotiations, eventually sending Uthman ibn Affan (RA) into Makkah as an emissary. When Uthman's return was delayed and rumors spread that he had been killed, the Prophet ﷺ gathered his companions beneath a tree and took from them a solemn pledge — known as Bay'at ar-Ridwan, 'the Pledge of Allah's Good Pleasure' — that they would fight to the death rather than abandon him, a moment of such devotion that the Qur'an later praised it directly (Surah Al-Fath, 48:18).

Quraysh, alarmed by the resolve this pledge demonstrated, sent their own negotiator, Suhail ibn Amr, and a treaty was eventually agreed: a ten-year truce between the two sides, the Muslims would return to Madinah that year without completing Umrah, any Quraysh who fled to Madinah without their guardian's permission would be returned, but Muslims who fled to Makkah would not be returned, and any tribe was free to ally with either side.

Several of the Prophet's ﷺ own companions, most notably Umar ibn al-Khattab (RA), were deeply troubled by these terms, which seemed one-sidedly unfavorable to the Muslims. The Prophet ﷺ responded with calm certainty that he was Allah's servant and Messenger, that Allah would not abandon him, and urged patience — a response Umar later said he spent the rest of his life seeking to atone for having doubted, through extensive charity and worship.

The Qur'an would soon vindicate this patience directly, opening Surah Al-Fath with the words: 'Indeed, We have granted you a clear victory.' In the two years of relative peace that followed, direct interaction between Muslims and the pagans of Makkah increased dramatically, and the number of converts to Islam multiplied far beyond what the preceding two decades of open hostility had produced, laying the direct groundwork for the peaceful conquest of Makkah only two years later, when Quraysh themselves broke the treaty.`,
    detailed_text_roman_urdu: `628 CE (Dhul-Qi'dah, 6 AH) mein, Nabi ﷺ Madinah se taqreeban 1,400 sahaba ke sath nikle, jaan-boojh kar aam safri talwaron ke ilawa be-silah, sirf Ka'bah par Umrah ada karne ki niyyat se — ek haq jo, muqaddas mahino mein zaaireen ke taur par, wo tawaqqo karte the ke Quraysh izzat dega chahe dushmani jari ho. Quraysh ne, tab bhi, itne bare giroh ki amad ko ek mumkin khatra samjha, aur unhein Makkah mein dakhil hone se rokne ki koshish ki, unhein Haram ke bahri hisse mein Hudaybiyyah naam ki jagah par mila.

Bajaye zabardasti raste banane aur muqaddas ilaqe ki hurmat ko khatre mein dalne ke, Nabi ﷺ ne mazakraat shuru kiye, aakhirkar Uthman ibn Affan (RA) ko sifarat kar ke Makkah bheja. Jab Uthman (RA) ki wapasi mein ta'akhur hua aur ye afwahain phaili ke unhein qatal kar diya gaya hai, to Nabi ﷺ ne apne sahaba ko ek darakht ke neeche jama kiya aur unse ek pukhta ahad liya — jise Bay'at ar-Ridwan, 'Allah ki khushnudi ka Bay'at' kaha jata hai — ke wo unhein chhorne ke bajaye aakhri dam tak larenge, itni ba-wafadari ka lehza ke Qur'an ne ba'd mein isi ki tareef ki (Surah Al-Fath, 48:18).

Quraysh, is ahad se zahir hone wale irade se pareshan hokar, apna numainda, Suhail ibn Amr, bheja, aur aakhirkar ek mahida tay hua: dono taraf ke darmiyan das saal ki sulah, Musalman us saal Umrah mukammal kiye baghair Madinah wapas jayenge, Quraysh ka koi bhi shakhs jo apne sarparast ki ijazat ke baghair Madinah bhaage usay wapas kar diya jayega, lekin Musalman jo Makkah bhaagein unhein wapas nahi kiya jayega, aur koi bhi qabeela dono taraf se muttahid hone mein azad hoga.

Nabi ﷺ ke apne sahaba mein se kai, khaas taur par Umar ibn al-Khattab (RA), in shara'it se bohot pareshan the, jo bazahir Musalmano ke liye ek-tarfa nuqsandeh dikhti thi. Nabi ﷺ ne pukhta yaqeen ke sath jawab diya ke wo Allah ke banda aur Rasool hain, ke Allah unhein kabhi tanha nahi chhorega, aur sabr ki taleem di — ek jawab jise Umar (RA) ne ba'd mein kaha ke unhone apni baqi zindagi is shak ke kaffare mein guzari, waseea sadqa aur ibadat ke zariye.

Qur'an ne jald hi is sabr ki tasdeeq ki, Surah Al-Fath ki ibtida in alfaz se ki: 'Beshak, hum ne tumhein wazeh fatah ata ki hai.' Ba'd ke do saal ki nisbatan aman mein, Musalmano aur Makkah ke mushrikeen ke darmiyan bilwasta bat-cheet mein zabardast izafa hua, aur Islam qabool karne walon ki tadaad in do dahaion ke khuli dushmani se zyada tez raftaar se badhi, sirf do saal ba'd Makkah ki pur-aman fatah ki bunyad rakhte hue, jab Quraysh ne khud mahida tor diya.`,
    key_lessons: [
      "Patience and trust in Allah's plan even when circumstances seem unfavorable",
      "Long-term wisdom often isn't apparent at first glance",
      "Prioritizing peace and reduced bloodshed over apparent short-term gains",
    ],
    key_lessons_roman_urdu: [
      "Sabr aur Allah ke mansoobe par yaqeen, chahe haalaat na-mufeed nazar aayein",
      "Tawil-muddat hikmat aksar pehli nazar mein zahir nahi hoti",
      "Zahiri kam faida ke bajaye aman aur kam khoon-kharabe ko tarjeeh",
    ],
    authentic_sources: [
      "Qur'an, Surah Al-Fath (48)",
      "Sahih al-Bukhari",
      "Ibn Hisham, As-Sirah an-Nabawiyyah",
      "Ar-Raheeq Al-Makhtum",
    ],
  },
  {
    year_ce: "630 CE",
    year_ah: "8 AH",
    title: "The Conquest of Makkah (Fath Makkah)",
    title_arabic: "فتح مكة",
    era: "medina",
    description: "Peaceful entry into Makkah with 10,000 Muslims, purifying the Kaaba of idols.",
    detailed_text: `In 630 CE (Ramadan, 8 AH), the ten-year truce of Hudaybiyyah collapsed when a clan allied to Quraysh, Banu Bakr, attacked the Banu Khuza'ah — allies of the Muslims — with covert Quraysh support, killing a number of them even as they sought sanctuary in the sacred precinct of the Ka'bah itself. This was a direct violation of the treaty's terms, and Quraysh's own leader Abu Sufyan traveled to Madinah in an attempt to renew the truce, but the Prophet ﷺ, aware of what had happened, gave him no response.

The Prophet ﷺ then mobilized a force of some 10,000 men — the largest army yet assembled under his leadership — and marched toward Makkah, moving with such careful secrecy about his true numbers and intentions that Quraysh had little accurate warning of the scale of what was approaching. En route, Abu Sufyan himself was intercepted and, under the Prophet's ﷺ uncle Abbas's protection, brought before the Prophet ﷺ, where he ultimately accepted Islam on the eve of the conquest.

The Prophet ﷺ organized his army into several columns entering Makkah from different directions, with strict instructions to avoid fighting except in self-defense — a small clash occurred with one column under Khalid ibn al-Walid against a group who resisted, resulting in limited casualties, but otherwise the city was entered almost entirely without bloodshed. He himself entered Makkah in a state of humility, reportedly riding with his head bowed low in gratitude, reciting verses of the Qur'an, rather than in the manner of a triumphant conqueror.

Perhaps the conquest's most remarkable feature was the general amnesty he declared for the population of Makkah — the very people who had exiled him, killed and tortured his followers, and fought him in three major battles over the preceding years. Standing at the Ka'bah, he asked the assembled Makkans what treatment they expected from him, and when they answered hopefully that he was noble and the son of a noble people, he responded, echoing the words of the Prophet Yusuf (Joseph) to his own brothers who had wronged him: 'Go, for you are free.' Only a small handful of individuals guilty of the most serious crimes were excluded from this general pardon.

He then proceeded to the Ka'bah itself and personally destroyed the 360 idols that had accumulated inside and around it over generations, restoring the sanctuary to the pure monotheistic worship it had originally been built for by Ibrahim (Abraham). The conquest of Makkah, achieved with minimal violence and crowned by sweeping forgiveness rather than retribution, stands as one of the most striking examples in history of victory exercised with humility and mercy rather than vengeance, and it opened the way for tribes across Arabia to embrace Islam in the two years that remained of the Prophet's ﷺ life.`,
    detailed_text_roman_urdu: `630 CE (Ramzan, 8 AH) mein, Hudaybiyyah ka das saala ma'ahida tab tota jab Quraysh ke saathi qabeele Banu Bakr ne, chupke Quraysh ki madad se, Musalmano ke saathi Banu Khuza'ah par hamla kiya, unme se kuch ko qatal kiya jabke wo Ka'bah ke muqaddas ilaqe mein panah lene ki koshish kar rahe the. Ye mahide ki shara'it ki seedhi khilaaf-warzi thi, aur Quraysh ke apne sardar Abu Sufyan Madinah gaye taake sulah ko ta'za karne ki koshish karein, lekin Nabi ﷺ, jo waqia se ba-khabar the, ne unhein koi jawab nahi diya.

Nabi ﷺ ne phir taqreeban 10,000 afraad ki fauj taiyar ki — unki qiyadat mein ab tak ki sab se bari fauj — aur Makkah ki taraf march kiya, apni haqiqi tadaad aur iraadon ke bare mein itni ehtiyaat se raaz rakhte hue ke Quraysh ko is amad ki asal miqdar ka bohot kam ilm tha. Raste mein, Abu Sufyan khud pakre gaye aur, Nabi ﷺ ke chacha Abbas ki hifazat mein, unke saamne laye gaye, jahan unhone fatah ki raat Islam qabool kar liya.

Nabi ﷺ ne apni fauj ko kai satoon mein taqseem kiya, jo Makkah mein mukhtalif simton se dakhil hui, sakht hukum ke sath ke sirf zaati difa mein hi jang ki jaye — Khalid ibn al-Walid ki qiyadat wale ek satoon aur mukhtasar muzahimat karne wale giroh ke darmiyan chhota jhagra hua, mahdood zaya'e ke sath, lekin baqi shehar taqreeban bila khoon-kharabe dakhil hua. Wo khud inkisari ke alam mein Makkah mein dakhil hue, riwayat ke mutabiq apna sar shukr mein neeche kiye, Qur'an ki ayaton ki tilawat karte hue, na ke ek fatah-mand fauji sardar ki tarah.

Fatah ki shayad sab se qabil-e-zikr khaasiyat Makkah ke bashindon ke liye unka aam maafi ka e'lan tha — wohi log jinhone unhein nikala tha, unke pairokaron ko qatal aur tashaddud diya tha, aur pichle salon mein teen bari jangon mein unse laray thay. Ka'bah par khare hokar, unhone jama Makki logon se poocha ke unhein unse kya sulook ki tawaqqo hai, aur jab unhone ummeed se jawab diya ke wo shareef hain aur shareef qaum ke bete hain, to unhone jawab diya, Nabi Yusuf (AS) ke apne bhaiyon ke alfaz ki tarah, jinhone unke sath zulm kiya tha: 'Jao, tum azad ho.' Sirf mutthi bhar afraad, sab se sangeen jaraim ke murtakib, is aam maafi se bahar rakhe gaye.

Wo phir Ka'bah gaye aur khud apne haathon se dahaion mein jama hui 360 buthon ko tabah kar diya, Haram ko us khalis touheedi ibadat ki taraf wapas laate hue jiske liye Ibrahim (AS) ne isay banaya tha. Makkah ki fatah, kam se kam tashaddud se hasil ki gayi aur intiqam ke bajaye waseea maafi se sarfaraz, tareekh mein azmat ke aik lamhe par inkisari aur rehmat se hasil ki gayi fatah ki sab se namayan misaal hai, aur is ne Nabi ﷺ ki zindagi ke baqi do saalon mein poore Arabistan ke qabaail ke liye Islam qabool karne ka rasta khol diya.`,
    key_lessons: [
      "Humility in victory",
      "Power of unconditional forgiveness",
      "True strength is shown in restraint and mercy at the moment of greatest power",
    ],
    key_lessons_roman_urdu: [
      "Fatah mein inkisari",
      "Bila-shart maafi ki taqat",
      "Sab se ziyada iqtidar ke lehze mein bhi asal taqat inkisari aur rehmat se zahir hoti hai",
    ],
    authentic_sources: [
      "Sahih al-Bukhari 4280",
      "Sunan Al-Kubra 18275",
      "Ibn Hisham, As-Sirah an-Nabawiyyah",
      "Ar-Raheeq Al-Makhtum",
    ],
  },
  {
    year_ce: "632 CE",
    year_ah: "10 AH",
    title: "The Farewell Pilgrimage & Sermon",
    title_arabic: "حجة الوداع والخطبة الشهيرة",
    era: "medina",
    description: "Delivered the historic universal human rights sermon at Mount Arafat.",
    detailed_text: `In the final year of his life, 632 CE (Dhul-Hijjah, 10 AH), the Prophet ﷺ performed his only complete Hajj pilgrimage since receiving revelation, joined by a vast gathering of companions — traditionally numbered around 100,000 or more — drawn from across the growing Muslim community in Arabia, all eager to learn the rites of pilgrimage directly from him. Sensing that this would be his final pilgrimage, he took the occasion to deliver what has become known as Khutbat al-Wada', the Farewell Sermon, delivered at Mount Arafat on the ninth day of the pilgrimage.

In this sermon, he addressed themes that remain foundational to Islamic ethics and law to this day. He declared the sanctity of human life and property, stating that these were as inviolable as the sanctity of that very day and place. He abolished the practice of usury (riba) and pre-Islamic blood feuds inherited from tribal custom, starting by explicitly forgiving debts owed to his own family as an example. He affirmed the rights of women, instructing men to treat their wives well and warning against mistreatment, while also reminding women of their responsibilities within the marriage — framing the relationship as one of mutual rights and obligations.

He addressed racial and tribal equality directly and unambiguously, declaring that no Arab has superiority over a non-Arab, nor a non-Arab over an Arab, nor a white person over a black person, nor a black person over a white person, except through righteousness and good deeds — a statement of universal human equality that stood in stark contrast to the tribal hierarchies of the society around him. He reminded the assembled Muslims that all believers are brothers, and reaffirmed the Qur'an and his own Sunnah (example) as the sources they must hold fast to after him.

At several points throughout the sermon, he paused to ask the crowd, 'Have I not conveyed the message?' — and they responded in unison that he had. He then raised his finger toward the sky and said, 'O Allah, You are my witness,' repeating this several times, formally discharging his responsibility as Messenger before the vast gathering and, by extension, before all of humanity to come.

It was during this same pilgrimage that the Qur'anic verse (Surah Al-Ma'idah, 5:3) was revealed declaring the completion of the religion: 'This day I have perfected for you your religion and completed My favor upon you and have approved for you Islam as religion.' Umar ibn al-Khattab (RA) reportedly wept upon hearing it, understanding — correctly, as events would soon confirm — that the completion of a mission often signals that its bearer's time is drawing to a close.`,
    detailed_text_roman_urdu: `Apni zindagi ke aakhri saal, 632 CE (Dhul-Hijjah, 10 AH) mein, Nabi ﷺ ne wahi milne ke ba'd apna wahid mukammal Hajj ada kiya, jis mein aik bohot bara giroh sahaba shamil hue — riwayat ke mutabiq taqreeban 100,000 ya zyada — jo Arabistan mein badhti hui Muslim qaum ke har hisse se aaye, sab unse Hajj ke arkaan seedha seekhne ke betaab. Ye ehsaas karte hue ke ye unka aakhri Hajj hoga, unhone is mauqe par Khutbat al-Wada', Khutba-e-Wida', pesh kiya, Hajj ke nawein din Mount Arafat par diya gaya.

Is khutbe mein, unhone aise mauzoo'at par baat ki jo aaj bhi Islami akhlaqiyat aur qanoon ki bunyad hain. Unhone insaani jaan aur maal ki hurmat ka e'lan kiya, ye kehte hue ke ye us din aur jagah ki hurmat ki tarah na-qabil-e-tajaawuz hain. Unhone sood aur qabaili nizam se miraas mein mile khoon ke bhaghde khatam kiye, apne khandan par baqaya karz ko maaf karke misaal qaim ki. Unhone khawateen ke huqooq ki tasdeeq ki, mardon ko apni biwiyon ke sath achha sulook karne ki taleem di aur bad-sulooki se khabardar kiya, sath hi khawateen ko nikah mein unki zimmedariyon ki yaad dilai — is rishte ko ek-tarfa iqtidar ke bajaye baham huqooq aur zimmedariyon ka rishta bataya.

Unhone nasli aur qabaili barabari ka wazeh aur be-abru zikr kiya, e'lan karte hue ke kisi Arab ko kisi ghair-Arab par, ya ghair-Arab ko Arab par, ya safed ko kaale par, ya kaale ko safed par koi fazilat nahi, siwaye nekamali aur achhe amaal ke — insaani barabari ka ye bayan us mua'shre ke qabaili darja-bandi ke bar-aks tha jo unke gird mojood tha. Unhone jama Musalmano ko yaad dilaya ke tamam mu'min bhai hain, aur Qur'an aur apni Sunnah ko un cheezon ke taur par dobara tasdeeq ki jinhein unke ba'd mazbooti se pakarna zaroori hai.

Khutbe ke doran kai maqamaat par, unhone ruk kar hujoom se poocha, 'Kya main ne paigham nahi pohanchaya?' — aur unhone ba-ittihaad jawab diya ke haan. Phir unhone apni ungli aasman ki taraf uthai aur kaha, 'Ae Allah, Tu meri gawah hai,' isay kai bar dohraya, is waseea majma ke saamne, aur is tarah poori insaniyat ke saamne, Rasool hone ki apni zimmedari baqaida ada karte hue.

Isi Hajj ke doran Qur'ani ayat (Surah Al-Ma'idah, 5:3) nazil hui jisme deen ki takmeel ka e'lan kiya gaya: 'Aaj main ne tumhare liye tumhara deen mukammal kar diya aur tum par apni ne'mat poori kar di aur tumhare liye Islam ko deen ke taur par pasand kar liya.' Umar ibn al-Khattab (RA) ne riwayat ke mutabiq ye sun kar roya, ye samajhte hue — jaisa ke waqiyat ne jald sabit kiya — ke kisi mission ki takmeel aksar iske hamil ka waqt qareeb aane ki alamat hoti hai.`,
    key_lessons: [
      "Universal human equality",
      "Finality of Islamic message",
      "A final message meant to outlive its speaker, addressed to every generation after",
    ],
    key_lessons_roman_urdu: [
      "Insaani barabari sab ke liye",
      "Islami payam ki qat'iyyat",
      "Ek aakhri paigham jo apne kehne wale se zyada arsa tak zinda rahne ke liye tha, har aane wali nasal ke naam",
    ],
    authentic_sources: [
      "Sahih Muslim 1218",
      "Qur'an, Surah Al-Ma'idah (5):3",
      "Sunan Abu Dawud (the fuller sermon text)",
      "Ar-Raheeq Al-Makhtum",
    ],
  },
  {
    year_ce: "632 CE",
    year_ah: "11 AH",
    title: "Return to Allah (Passing Away)",
    title_arabic: "وفاة النبي صلى الله عليه وسلم",
    era: "medina",
    description: "Passed away in Madinah in the apartment of Aisha (RA) at age 63.",
    detailed_text: `Only about two to three months after returning from the Farewell Pilgrimage, in Safar of 11 AH (632 CE), the Prophet ﷺ fell ill with a fever severe enough that, in its early days, he continued leading the congregational prayers despite visible weakness, until the illness intensified to the point that he could no longer stand at the front and appointed Abu Bakr (RA) to lead the prayers in his place — a decision widely understood afterward as an early, deliberate indication of who should succeed him in leading the community.

During his final days, spent in the small room of his wife Aisha (RA) adjoining the mosque in Madinah, he distributed the little wealth he had to charity, freed slaves he owned, and repeatedly emphasized care for prayer and for the weak and vulnerable among the community, reportedly saying at one point, 'Prayer, prayer, and fear Allah regarding those under your authority.' He asked forgiveness of anyone he might have wronged and offered to settle any outstanding debt, however small, before he met Allah.

On what would be his final full day, he was helped by Ali ibn Abi Talib (RA) and Al-Fadl ibn Abbas to the mosque to address the community one last time, warning them, among other things, against taking graves as places of worship, as earlier nations had done with their prophets, and reaffirming that he was only a servant and Messenger of Allah, not to be venerated beyond that station.

He passed away on the 12th of Rabi' al-Awwal, 11 AH, in the lap of Aisha (RA), his head resting against her chest. His final words, according to her account, alternated between moments of apparent pain and a repeated phrase understood to reference the highest spiritual station: 'Rather, the highest Companionship, in Paradise.'

The news of his death caused profound shock and disbelief among the companions; Umar ibn al-Khattab (RA), overcome with grief and denial, reportedly stood and declared that anyone who claimed the Prophet ﷺ had died was lying, insisting he had merely been taken up as Musa (Moses) once was. It was Abu Bakr (RA) who, entering and confirming what had happened, addressed the gathered community with words that steadied the entire Ummah at its most vulnerable moment: 'Whoever among you worshipped Muhammad, then Muhammad has died. But whoever worshipped Allah, then Allah is alive and does not die' — followed by the Qur'anic verse (Surah Aal-e-Imran, 3:144) reminding them that Muhammad ﷺ was but a Messenger, and Messengers before him had died.

He was buried where he died, in Aisha's (RA) room, which remains part of the Prophet's Mosque in Madinah to this day — bringing to a close, at the age of 63, a mission that had begun three decades earlier in the solitude of Cave Hira, and that would go on to shape the faith and lives of well over a billion people across the centuries that followed.`,
    detailed_text_roman_urdu: `Farewell Hajj se wapas aane ke sirf do se teen mahine ba'd, 11 AH (632 CE) ke Safar mein, Nabi ﷺ ko itna shadeed bukhar hua ke, ibtidai dinon mein, wo waazeh kamzori ke bawajood jama'at ki namaz ki imamat karte rahe, jab tak bimari itni badh gayi ke wo aage khare nahi ho sakte the aur unhone Abu Bakr (RA) ko apni jagah namaz ki imamat ke liye muqarrar kiya — ek faisla jise ba'd mein wasee taur par is baat ki ibtidai, iraadi alamat samjha gaya ke qaum ki qiyadat kise karni chahiye.

Apne aakhri dinon mein, jo unki biwi Aisha (RA) ke masjid se mutasil chhote kamre mein guzre, unhone apni thori si daulat sadqe mein taqseem ki, apne mamlook ghulamon ko azad kiya, aur namaz aur qaum ke kamzoron aur zaroorat manedon ki dekh-bhal par musalsal zor diya, riwayat ke mutabiq ek moqe par kaha, 'Namaz, namaz, aur apne ma-tehat logon ke bare mein Allah se daro.' Unhone har us shakhs se maafi mangi jise unhone shayad koi zulm kiya ho aur Allah se milne se pehle koi bhi baqaya, chahe kitna bhi chhota ho, tay karne ki peshkash ki.

Apne aakhri mukammal din, unhein Ali ibn Abi Talib (RA) aur Al-Fadl ibn Abbas ne masjid tak sahara diya taake wo aakhri baar qaum se khitab karein, unhein, doosri baaton ke ilawa, qabron ko ibadat ki jagah banane se khabardar kiya, jaisa pichli qaumon ne apne Ambiya ke sath kiya tha, aur dobara tasdeeq ki ke wo sirf Allah ke banda aur Rasool hain, is martabe se aage un ki ta'zeem nahi honi chahiye.

Unka inteqal 12 Rabi' al-Awwal, 11 AH ko hua, Aisha (RA) ki god mein, unka sar unke seene se lagaya hua. Unke aakhri alfaz, Aisha (RA) ki riwayat ke mutabiq, dard ke lehzon aur ek dohraye jane wale jumle ke darmiyan the jo sab se buland ruhani martabe ki taraf isharah samjha jata hai: 'Balke, sab se buland Rifaqat, Jannat mein.'

Unki wafat ki khabar ne sahaba mein gehra sadma aur be-yaqeeni paida ki; Umar ibn al-Khattab (RA), ghum aur inkar mein doobe hue, riwayat ke mutabiq khare hokar e'lan kiya ke jo koi bhi kahe ke Nabi ﷺ wafat pa gaye hain wo jhoot bol raha hai, is baat par israr karte hue ke unhein sirf Musa (AS) ki tarah utha liya gaya hai. Abu Bakr (RA) hi the jinhone aa kar jo hua tha usay tasdeeq ki aur jama qaum se un alfaz mein khitab kiya jinhone poori Ummat ko uske sab se kamzor lehze mein sambhala: 'Jo koi tum mein se Muhammad ki ibadat karta tha, to Muhammad wafat pa gaye hain. Lekin jo Allah ki ibadat karta tha, to Allah zinda hai aur kabhi nahi marega' — is ke ba'd Qur'ani ayat (Surah Aal-e-Imran, 3:144) jo unhein yaad dilati hai ke Muhammad ﷺ sirf ek Rasool the, aur un se pehle bhi Rasool wafat pa chuke hain.

Unhein wahin dafan kiya gaya jahan unka inteqal hua, Aisha (RA) ke kamre mein, jo aaj bhi Madinah ki Masjid-e-Nabawi ka hissa hai — 63 saal ki umar mein, ek aisi risalat ka khatma jo teen dahai pehle Ghar-e-Hira ki tanhai mein shuru hui thi, aur jo aage aane wale sadion mein aik arab se zyada logon ke imaan aur zindagiyon ko tarteeb degi.`,
    key_lessons: [
      "Fulfilling life purpose completely",
      "Focusing heart on the Hereafter",
      "The message and community must outlive any single individual, however beloved",
    ],
    key_lessons_roman_urdu: [
      "Zindagi ka maqsad mukammal taur par poora karna",
      "Dil ko Akhirat par markooz rakhna",
      "Payam aur qaum ko kisi bhi ek fard se, chahe kitna bhi mehboob ho, zyada arsa zinda rehna chahiye",
    ],
    authentic_sources: [
      "Sahih al-Bukhari 4440",
      "Sahih Muslim 2444",
      "Qur'an, Surah Aal-E-Imran (3):144",
      "Ar-Raheeq Al-Makhtum",
    ],
  },
];
