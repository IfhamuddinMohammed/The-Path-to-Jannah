// The 11 canonical Salah steps, from the opening Takbir through the closing Salam.
//
// Content is grounded in the Qur'an, named hadith collections, and cross-checked against
// "My Prayer — the Second Pillar of Islam" (IMAN Projects / New Muslim Care), a reference
// booklet the user provided. Hadith are cited by collection + topic rather than a bare number,
// since printed editions of the same collection number hadith differently. Two deliberate
// simplifications, matching that same booklet and this app's "understandable for everyone"
// goal, are called out in src/data/salahStructure.js's own comments rather than repeated here.
// This content should still go through a scholar/community review pass before being treated as
// fully authoritative.

export const SEED_SALAH_STEPS = [
  {
    step_key: "takbir_al_ihram",
    order: 1,
    title: "Takbir al-Ihram (Opening Takbir)",
    arabic_text: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    translation: "Allah is the Greatest",
    what_to_do:
      "Face the Qiblah and make your intention (silently, in the heart) for the specific prayer you're performing. Raise both hands so your fingertips are roughly in line with your shoulders or ears, palms facing outward, then say the Takbir. This opens the prayer — talking, eating, or unrelated movement are no longer permitted from this point.",
    what_to_do_roman_urdu:
      "Qibla ki taraf rukh karein aur (khamoshi se, dil mein) khaas namaz ki niyyah karein jo aap ada kar rahe hain. Dono haath itne buland karein ke ungliyon ke sire kandhon ya kanon ke barabar hon, hatheliyan bahar ki taraf, phir Takbir kahein. Ye namaz shuru kar deti hai — is nuqte se baat karna, khana, ya ghair-mutalliq harkat jaiz nahi.",
    ruling_status: "Fard (obligatory) — the opening act of the prayer",
    common_mistakes:
      "- Starting to recite before finishing the Takbir.\n- Rushing the hand-raising rather than a calm, deliberate motion.",
    madhab_notes:
      "Hand position/height at this Takbir varies slightly by madhab, and some schools keep the hands at the sides afterward rather than on the chest — the majority/common approach is shown here.",
    hadith_reference: "Sahih al-Bukhari and Sahih Muslim (description of the Prophet's ﷺ opening of prayer)",
  },
  {
    step_key: "taawwudh",
    order: 2,
    title: "Seeking Refuge (Ta'awwudh)",
    arabic_text: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    transliteration: "A'oothu billahi minash-shaytanir-rajeem",
    translation: "I seek refuge with Allah from Satan, the accursed",
    what_to_do:
      "Place your right hand over your left on your chest. Quietly recite this seeking refuge — it's said only once, here at the very start of the prayer, not repeated in later rak'ahs.",
    what_to_do_roman_urdu:
      "Apna dahna haath bayen haath par seene par rakhein. Aahista se ye ta'awwudh parhein — ye sirf yahan, namaz ke bilkul shuru mein, ek martaba kaha jata hai, ba'd ke rak'aton mein nahi dohraya jata.",
    ruling_status: "Sunnah",
    common_mistakes: "- Reciting it again in later rak'ahs — it's only said once, in the first rak'ah.",
    madhab_notes:
      "Some traditions also recite a separate opening praise (Sana, e.g. 'Subhanaka Allahumma...') before this — a valid, widely-taught addition left out of this core sequence to keep it simple; ask a local teacher if you'd like to add it.",
    hadith_reference: "Qur'an 16:98; Sunan Abu Dawud (reciting Ta'awwudh before recitation in prayer)",
  },
  {
    step_key: "al_fatiha",
    order: 3,
    title: "Al-Fatihah (The Opening Chapter)",
    arabic_text:
      "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَٰنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾",
    transliteration:
      "Bismillahir-Rahmanir-Raheem. Alhamdu lillahi Rabbil-'alameen. Ar-Rahmanir-Raheem. Maliki yawmid-deen. Iyyaka na'budu wa iyyaka nasta'een. Ihdinas-siratal-mustaqeem. Siratal-ladhina an'amta 'alayhim ghayril-maghdoobi 'alayhim wa lad-dalleen. (Ameen)",
    translation:
      "In the name of Allah, the Most Gracious, the Most Merciful. All praise is due to Allah, Lord of all the worlds. The Most Gracious, the Most Merciful. Master of the Day of Judgment. You alone we worship, and You alone we ask for help. Guide us to the straight path — the path of those upon whom You have bestowed favor, not of those who have earned Your anger, nor of those who have gone astray. (Ameen — O Allah, answer our prayer)",
    what_to_do:
      "Recite Surah Al-Fatihah, the opening chapter of the Qur'an, in every rak'ah of every prayer — required whether praying alone or being led by an Imam. Say 'Ameen' quietly after finishing (aloud if the Imam is reciting aloud).",
    what_to_do_roman_urdu:
      "Har namaz ke har rak'ah mein Surah Al-Fatihah, Qur'an ka pehla chapter, parhein — chahe tanha namaz parhen ya Imam ke peeche. Khatam karne ke baad aahista se 'Ameen' kahein (buland awaaz se agar Imam buland awaaz se parh raha ho).",
    ruling_status: "Fard (obligatory) — the prayer is not valid without it",
    common_mistakes:
      "- Rushing through without a brief pause between verses.\n- Mispronouncing similar-sounding letters in a way that changes the meaning — worth learning from a teacher if you're newer to Arabic recitation.",
    madhab_notes: "Whether to say 'Ameen' aloud or quietly, and a few minor recitation details, vary slightly by madhab.",
    hadith_reference:
      "Sahih al-Bukhari and Sahih Muslim ('There is no prayer for the one who does not recite the Opening of the Book')",
  },
  {
    step_key: "surah_after_fatiha",
    order: 4,
    title: "An Additional Surah",
    what_to_do:
      "In the first two rak'ahs only, recite another chapter or passage from the Qur'an after Al-Fatihah — commonly a short surah such as Al-Ikhlas, Al-Falaq, or An-Nas for those newer to reciting Qur'an. In the 3rd and 4th rak'ahs of prayers that have them, only Al-Fatihah is recited.",
    what_to_do_roman_urdu:
      "Sirf pehle do rak'aton mein, Al-Fatihah ke baad Qur'an ka ek aur chapter ya hissa parhein — aam taur par koi mukhtasar surah jaise Al-Ikhlas, Al-Falaq, ya An-Nas, khaas taur par un ke liye jo Qur'an ki tilawat mein naye hain. Un namazon ke 3re aur 4the rak'ah mein jinke ye rak'ah hote hain, sirf Al-Fatihah parhi jati hai.",
    ruling_status: "Sunnah Mu'akkadah — strongly recommended in the first two rak'ahs",
    common_mistakes: "- Reciting an extra surah in the 3rd/4th rak'ah too — it's only added in the first two.",
    madhab_notes: "Which surah, and how much is recited, is flexible — there's no single required chapter beyond Al-Fatihah.",
    hadith_reference:
      "Sahih al-Bukhari and Sahih Muslim (the Prophet's ﷺ recitation length varying by prayer)",
  },
  {
    step_key: "ruku",
    order: 5,
    title: "Ruku' (Bowing)",
    arabic_text: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
    transliteration: "Subhana Rabbiyal-'Adheem",
    translation: "Glory be to my Lord, the Supreme",
    what_to_do:
      "Say 'Allahu Akbar' as you bend forward at the waist into a bow, keeping your back flat and roughly level with your head, hands resting on your knees with fingers spread. Once settled in the bow, recite the phrase above three times.",
    what_to_do_roman_urdu:
      "'Allahu Akbar' kahte huye kamar se aagey ki taraf jhukein, apni kamar ko seedha aur sar ke taqreeban barabar rakhein, haath ghutno par unglion ko phaila kar rakhein. Jhukaav mein sattle hone ke baad, upar wala jumla teen martaba parhein.",
    ruling_status: "Fard (obligatory)",
    common_mistakes:
      "- Bowing too shallow — the back should be roughly level, not just a slight nod.\n- Rushing through without a calm pause (tuma'ninah) at the bottom of the bow.",
    hadith_reference: "Sahih al-Bukhari and Sahih Muslim (description of the Prophet's ﷺ Ruku')",
  },
  {
    step_key: "rising_from_ruku",
    order: 6,
    title: "Rising from Ruku'",
    arabic_text: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ رَبَّنَا وَلَكَ الْحَمْدُ",
    transliteration: "Sami' Allahu liman hamidah — Rabbana wa lakal hamd",
    translation: "Allah hears whoever praises Him — Our Lord, and to You belongs all praise",
    what_to_do:
      "Rise back up to a full standing position. Say 'Sami' Allahu liman hamidah' while rising, then once standing straight, say 'Rabbana wa lakal hamd.'",
    what_to_do_roman_urdu:
      "Poori tarah khare hone ki taraf wapas aayein. Uthte huye 'Sami' Allahu liman hamidah' kahein, phir seedhe khare hone ke baad 'Rabbana wa lakal hamd' kahein.",
    ruling_status: "Fard (obligatory) to return to standing; the recitation itself is Sunnah",
    madhab_notes:
      "Exact wording said by an Imam vs. the congregation vs. someone praying alone varies slightly by madhab and scholarly opinion.",
    hadith_reference: "Sahih al-Bukhari and Sahih Muslim",
  },
  {
    step_key: "sujood",
    order: 7,
    title: "Sujood (Prostration)",
    arabic_text: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
    transliteration: "Subhana Rabbiyal-A'la",
    translation: "Glory be to my Lord, the Most High",
    what_to_do:
      "Say 'Allahu Akbar' as you go down into prostration. Make sure your forehead and nose are touching the ground, your two palms are flat on the floor with fingers together, your two knees are on the ground, and your toes are curled upright (not lying flat). Once settled, recite the phrase above three times. This happens twice in every rak'ah.",
    what_to_do_roman_urdu:
      "'Allahu Akbar' kahte huye sajde mein jayein. Khayal rakhein ke aapki peshani aur naak zameen ko chhu rahe hon, dono hatheliyan unglion ko milaye zameen par barabar hon, dono ghutne zameen par hon, aur paon ki unglian khadi (seedhi nahi) hon. Sattle hone ke baad, upar wala jumla teen martaba parhein. Ye har rak'ah mein do martaba hota hai.",
    ruling_status: "Fard (obligatory)",
    common_mistakes:
      "- Only the forehead touching the ground, not the nose.\n- Toes lying flat instead of curled upright, facing the Qiblah.\n- Elbows resting flat on the ground instead of raised slightly off it.",
    hadith_reference: "Sahih al-Bukhari and Sahih Muslim (the points of contact in Sujood)",
  },
  {
    step_key: "sitting_between_sujood",
    order: 8,
    title: "Sitting Between the Two Prostrations",
    arabic_text: "رَبِّ اغْفِرْ لِي",
    transliteration: "Rabbighfirli",
    translation: "My Lord, forgive me",
    what_to_do:
      "Say 'Allahu Akbar' as you rise from the first prostration into a brief sitting position — sit on your left foot (laid flat along the ground) with your right foot upright, toes facing the Qiblah, hands resting on your knees. Recite the phrase above three times, then say 'Allahu Akbar' again as you go down into the second prostration, performed the same way as the first.",
    what_to_do_roman_urdu:
      "'Allahu Akbar' kahte huye pehle sajde se uth kar mukhtasar baithak mein aayein — bayen paon par baithein (zameen par bicha kar) aur dahna paon khada rakhein, ungliyan Qibla ki taraf, haath ghutno par. Upar wala jumla teen martaba parhein, phir 'Allahu Akbar' kahte huye doosre sajde mein jayein, wesa hi jaisa pehla tha.",
    ruling_status: "Fard (obligatory) to sit briefly; the recitation is Sunnah",
    hadith_reference: "Sahih al-Bukhari and Sahih Muslim",
  },
  {
    step_key: "tashahhud",
    order: 9,
    title: "At-Tashahhud (The Testimony)",
    arabic_text:
      "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    transliteration:
      "At-tahiyyatu lillahi was-salawatu wat-tayyibat. Assalamu 'alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuh. Assalamu 'alayna wa 'ala 'ibadillahis-saliheen. Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadan 'abduhu wa rasuluh.",
    translation:
      "All compliments, prayers, and pure words are due to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and on the righteous servants of Allah. I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and Messenger.",
    what_to_do:
      "After the second prostration of every second rak'ah, sit and recite the Tashahhud, raising your right index finger during the testimony of faith. If this is your final sitting, continue with the Salawat next. If it's a middle sitting (more rak'ahs to go), stand back up saying 'Allahu Akbar' and continue to the next rak'ah.",
    what_to_do_roman_urdu:
      "Har doosre rak'ah ke doosre sajde ke baad, baith kar Tashahhud parhein, shahadat ke doran apni dahni shahadat wali ungli uthayein. Agar ye aakhri baithak hai, to iske baad Salawat parhein. Agar ye darmiyani baithak hai (aur rak'aten baqi hain), to 'Allahu Akbar' kahte huye khare ho jayein aur agle rak'ah ki taraf badhein.",
    ruling_status: "Wajib in the Hanafi school; an integral pillar in several other schools — essential either way",
    common_mistakes:
      "- Forgetting to raise the index finger during the testimony.\n- Standing up for the next rak'ah before finishing the recitation.",
    madhab_notes:
      "The Tashahhud has a few authentically-reported wordings (e.g. Ibn Mas'ud's version used here vs. Ibn 'Abbas's slightly different version) — different madhabs commonly favor one; both are valid.",
    hadith_reference: "Sahih al-Bukhari and Sahih Muslim (Ibn Mas'ud's narration teaching the Tashahhud)",
  },
  {
    step_key: "salawat_ibrahimiyyah",
    order: 10,
    title: "Salawat upon the Prophet",
    arabic_text:
      "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ. اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    transliteration:
      "Allahumma salli 'ala Muhammadin wa 'ala aali Muhammad, kama sallayta 'ala Ibraheema wa 'ala aali Ibraheem, innaka Hameedum-Majeed. Allahumma barik 'ala Muhammadin wa 'ala aali Muhammad, kama barakta 'ala Ibraheema wa 'ala aali Ibraheem, innaka Hameedum-Majeed.",
    translation:
      "O Allah, send prayers upon Muhammad and upon the family of Muhammad, as You sent prayers upon Ibrahim and upon the family of Ibrahim — indeed You are Praiseworthy, Glorious. O Allah, send blessings upon Muhammad and upon the family of Muhammad, as You sent blessings upon Ibrahim and upon the family of Ibrahim — indeed You are Praiseworthy, Glorious.",
    what_to_do:
      "Recited only in the final sitting of the prayer, right after the Tashahhud. Many also add a short personal supplication here before the closing Salam, in Arabic or in your own language.",
    what_to_do_roman_urdu:
      "Ye sirf namaz ki aakhri baithak mein, Tashahhud ke foran baad parha jata hai. Bohot log yahan Salam se pehle ek mukhtasar zaati dua bhi shamil karte hain, Arabic mein ya apni zaban mein.",
    ruling_status: "Sunnah Mu'akkadah — strongly recommended; some scholars hold it to be Wajib",
    hadith_reference: "Sahih al-Bukhari and Sahih Muslim",
  },
  {
    step_key: "salam",
    order: 11,
    title: "Tasleem (Closing Salutation)",
    arabic_text: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
    transliteration: "Assalamu 'alaykum wa rahmatullah",
    translation: "May the peace and mercy of Allah be upon you",
    what_to_do:
      "Turn your head to the right and say the phrase above, then turn your head to the left and say it again. This ends the prayer.",
    what_to_do_roman_urdu:
      "Apna sar dahni taraf phera kar upar wala jumla kahein, phir sar bayen taraf pherein aur dobara kahein. Ye namaz ko khatam karta hai.",
    ruling_status: "Fard (obligatory) — the prayer formally concludes with the Tasleem",
    common_mistakes: "- Turning both times to the same side.\n- Not turning the head fully.",
    hadith_reference: "Sahih Muslim and Sunan Abu Dawud",
  },
  {
    step_key: "eid_takbirs",
    order: 12,
    title: "The Extra Eid Takbirs",
    arabic_text: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar (×3)",
    translation: "Allah is the Greatest",
    what_to_do:
      "Eid-prayer only — not part of the 5 daily prayers. Raise both hands to shoulder height and say 'Allahu Akbar,' then lower them, three times in a row. In the 1st rak'ah, these come right after the opening Takbir, before Al-Fatihah. In the 2nd rak'ah, they come after the additional surah, right before bowing into Ruku'.",
    what_to_do_roman_urdu:
      "Sirf Eid ki namaz mein — panch waqt ki namazon ka hissa nahi. Dono haath kandhon tak uthayein aur 'Allahu Akbar' kahein, phir unhein neeche kar lein, lagataar teen martaba. Pehle rak'ah mein, ye takbir-e-tahrima ke foran baad, Al-Fatihah se pehle aati hain. Doosre rak'ah mein, ye izafi surah ke baad, Ruku' mein jane se bilkul pehle aati hain.",
    ruling_status: "Wajib in the Hanafi school — a required part of the Eid prayer specifically",
    common_mistakes:
      "- Saying a different count than your school's — see the note below.\n- Forgetting to lower the hands between each Takbir (only the final one stays down, to begin recitation or Ruku').",
    madhab_notes:
      "The Hanafi school prescribes 3 extra Takbirs in each rak'ah (6 total). The Shafi'i, Maliki, and Hanbali schools prescribe more — commonly cited as 7 in the 1st rak'ah and 5 in the 2nd (12 total). The exact count was a matter of ijtihad among the Companions and early scholars, who reported more than ten distinct counts between them — follow whichever your local congregation/Imam follows.",
    hadith_reference:
      "Reports on the exact count vary among the Companions; scholars describe this specifically as a matter of ijtihad rather than one settled hadith (see Islamqa.info's summary of the differing narrations).",
  },
];
