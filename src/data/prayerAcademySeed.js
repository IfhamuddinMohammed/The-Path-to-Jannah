// Initial "Learn Salah" lesson and Wudu-step content for the Prayer Academy.
//
// Every claim below is grounded in the Qur'an or a named, well-known hadith collection.
// Hadith are cited by collection + topic rather than a bare number, since printed editions of
// the same collection (e.g. Sahih Muslim) use different numbering schemes — a bare number
// without specifying which scheme risks pointing to the wrong hadith. Anywhere a specific
// classical ruling is genuinely contested or sensitive (e.g. the gravity of abandoning prayer
// entirely), it's deliberately left out rather than stated as settled fact for a beginner
// audience. This content should still go through a scholar/community review pass before being
// treated as fully authoritative — see the Prayer Academy plan notes.

export const SEED_LESSONS = [
  {
    section: "why_we_pray",
    order: 1,
    title: "Why Muslims Pray",
    description: "The purpose and spiritual meaning behind Salah",
    description_roman_urdu: "Namaz ke peeche maqsad aur ruhani ma'ni",
    content: `Prayer (Salah) is the direct link between a believer and Allah. It is not a ritual performed out of obligation alone, but an act of remembrance, gratitude, and submission that shapes the rhythm of a Muslim's entire day.

Allah says in the Qur'an: *"Indeed, prayer has been decreed upon the believers a decree of specified times."* (Qur'an 4:103)

Beyond fulfilling a command, prayer:

- **Connects** — five times a day, the worshipper pauses whatever they are doing to stand before Allah.
- **Purifies** — the Prophet ﷺ compared the five daily prayers to a river a person bathes in five times a day, washing away sin (Sahih Muslim, the parable of the river).
- **Disciplines** — regular prayer builds consistency, mindfulness, and gratitude into daily life.
- **Unites** — praying in congregation, facing the same Qibla as every other Muslim on Earth, is a visible expression of the unity of the Ummah.

Prayer is ultimately an act of love and remembrance: *"And establish prayer for My remembrance."* (Qur'an 20:14)`,
    content_roman_urdu: `Namaz Allah aur bande ke darmiyan seedha ta'alluq hai. Ye sirf ek rasm nahi jo majboori mein ada ki jaye, balke yaad-e-Ilahi, shukr, aur ita'at ka aik amal hai jo Musalman ki puri din ki raftaar ko tarteeb deta hai.

Allah Qur'an mein farmata hai: *"Beshak namaz mu'mino par muqarrara waqton mein farz ki gayi hai."* (Qur'an 4:103)

Ek hukum poora karne ke ilawa, namaz:

- **Rabta jorti hai** — din mein panch martaba, banda apna har kaam rok kar Allah ke huzoor khada hota hai.
- **Pak karti hai** — Nabi ﷺ ne panch waqt ki namazon ko us dariya se tashbih di jis mein insan din mein panch baar gusal kare, gunah dho dete hain (Sahih Muslim, dariya ki misaal).
- **Nazm-o-zabt sikhati hai** — mustaqil namaz zindagi mein tarteeb, tawajjuh, aur shukr guzari paida karti hai.
- **Muttahid karti hai** — jama'at mein namaz parhna, aur duniya ke har Musalman ki tarah usi Qibla ki taraf rukh karna, Ummat ki wahdat ka zahiri izhaar hai.

Namaz ba-alaakhir mohabbat aur yaad ka amal hai: *"Aur meri yaad ke liye namaz qaim karo."* (Qur'an 20:14)`,
    hadith_reference: "Qur'an 4:103; Qur'an 20:14; Sahih Muslim (the parable of the river)",
  },
  {
    section: "importance",
    order: 1,
    title: "The Importance of Salah",
    description: "Why prayer is considered the pillar of Islam",
    description_roman_urdu: "Namaz ko Islam ka satoon kyun kaha jata hai",
    content: `Salah is the second of the Five Pillars of Islam and the first act of worship a person will be asked about on the Day of Judgment. The Prophet ﷺ said: *"The first thing for which a person will be brought to account on the Day of Resurrection is prayer. If it is sound, the rest of his deeds will be sound; if it is deficient, the rest of his deeds will be deficient."* (Sunan al-Tirmidhi, on the primacy of prayer)

The Prophet ﷺ also described prayer as the pillar of the religion: *"The head of the matter is Islam, its pillar is prayer, and its peak is jihad in the way of Allah."* (Sunan al-Tirmidhi)

If you have missed prayers, are inconsistent, or are only just learning — that is completely normal and nothing to feel discouraged about. What matters is starting, and building consistency one prayer at a time. Allah is Most Forgiving and Most Merciful, and every prayer offered sincerely is accepted and rewarded.`,
    content_roman_urdu: `Namaz Islam ke Panch Satoon mein doosra satoon hai, aur Qayamat ke din insan se sab se pehle jis amal ka hisaab liya jayega wo namaz hai. Nabi ﷺ ne farmaya: *"Qayamat ke din sab se pehle jis cheez ka hisaab liya jayega wo namaz hai. Agar wo durust hui to baqi tamam amal durust honge; agar wo naqis hui to baqi amal bhi naqis honge."* (Sunan al-Tirmidhi, namaz ki ahmiyat ke baare mein)

Nabi ﷺ ne namaz ko deen ka satoon bhi qarar diya: *"Deen ki bunyad Islam hai, iska satoon namaz hai, aur iski choti Allah ke raste mein jihad hai."* (Sunan al-Tirmidhi)

Agar aap ki namazein chhoot gayi hain, ya aap mein tasalsul nahi, ya abhi seekh rahe hain — to ye bilkul normal baat hai aur mayoos hone ki koi zarurat nahi. Asal baat shuru karna hai, aur ek ek namaz se tasalsul banana hai. Allah bahut Bakhshne wala aur Reham karne wala hai, aur khalis niyat se ki gayi har namaz qabool aur ba-ajr hoti hai.`,
    hadith_reference: "Sunan al-Tirmidhi (on the primacy and pillar of prayer)",
  },
  {
    section: "conditions",
    order: 1,
    title: "Conditions of Prayer",
    description: "What must be true before a prayer is considered valid",
    description_roman_urdu: "Namaz sahih hone se pehle kin baaton ka hona zaruri hai",
    content: `Scholars generally describe several conditions that must be met **before** starting prayer, distinct from the actions performed *within* it:

1. **Being Muslim** — Salah is an act of worship specific to believers.
2. **Sanity and having reached the age of discernment** — young children are encouraged to practice, but are not yet held accountable.
3. **Purity (Taharah)** — being free of major and minor ritual impurity.
4. **Clean body, clothing, and place of prayer** — free from visible impurity.
5. **Covering the Awrah** — dressing appropriately.
6. **Facing the Qibla** — the direction of the Ka'bah in Makkah.
7. **Entry of the prayer's time** — each of the five prayers has a defined window.
8. **Intention (Niyyah)** — a sincere intention, in the heart, to perform that specific prayer.

If any of these is genuinely impossible to fulfil (for example, no clean water is available, or the Qibla direction is unknown), Islam provides accommodations — such as Tayammum instead of Wudu, or praying in the direction one reasonably believes is correct — rather than skipping prayer altogether.`,
    content_roman_urdu: `Ulama aam taur par kuch shara'it bayan karte hain jo namaz shuru karne se **pehle** poori honi chahiye, un a'maal se alag jo namaz *ke andar* kiye jate hain:

1. **Musalman hona** — Namaz sirf momino ke liye khaas ek ibadat hai.
2. **Aql-mand hona aur samajhne ki umar ko pohanchna** — chhote bachon ko amal ki tarbiyat di jati hai, lekin abhi un par farz nahi hota.
3. **Paaki (Taharah)** — bari aur chhoti napaki se pak hona.
4. **Jism, kapre, aur namaz ki jagah ka saaf hona** — zahiri napaki se paak.
5. **Awrah ka dhakna** — mauzu tareeqe se libaas pehna.
6. **Qibla ki taraf rukh karna** — Makkah mein Ka'bah ki simt.
7. **Namaz ka waqt dakhil hona** — har paanch namazon ka ek muqarrara waqt hai.
8. **Niyyah (Iraada)** — dil mein khalis niyyah, us khaas namaz ko ada karne ki.

Agar in mein se koi shart waqai poori na ho sake (maslan, saaf pani mojood na ho, ya Qibla ki simt maloom na ho), to Islam mein aasaniyan mojood hain — jaise Wudu ke badle Tayammum, ya jis simt ko banda munasib samjhe usi taraf namaz parhna — namaz chhorne ke bajaye.`,
    madhab_notes: "Minor differences exist on some details — for example, the precise boundary of the Awrah, or whether Niyyah must be verbalized aloud rather than simply intended in the heart.",
    hadith_reference: "Qur'an 5:6 (purification before prayer); Qur'an 2:144 (facing the Qibla)",
  },
  {
    section: "who_must_pray",
    order: 1,
    title: "Who Must Pray",
    description: "Who prayer is obligatory upon, and who is exempted",
    description_roman_urdu: "Namaz kis par farz hai, aur kise chhoot hai",
    content: `The five daily prayers are obligatory upon every Muslim who is sane and has reached puberty. Several groups are treated with specific accommodations:

- **Children** — not yet obligated, but parents are encouraged to introduce prayer gradually from around age seven, so it becomes second nature by puberty.
- **Those who are asleep or have forgotten** — not blamed, but should pray the missed prayer as soon as they remember or wake.
- **The sick** — prayer is adapted, not dropped: those unable to stand may sit, and those unable to sit may lie down and pray with whatever movement they can manage, even if only with the eyes or heart.
- **Travellers** — may shorten certain prayers and combine others, as a mercy given the hardship of travel.
- **Menstruating and post-natal bleeding women** — are exempted from prayer (and fasting) during that period, and do not need to make up the missed prayers afterward, unlike missed fasts.

The underlying principle across all of these rulings is that Allah does not intend to place a hardship on anyone — the *obligation* is constant, but *how* it is fulfilled adapts to a person's real circumstances.`,
    content_roman_urdu: `Panch waqt ki namazein har us Musalman par farz hain jo aqal-mand ho aur baligh ho chuka ho. Kuch giroh ko khaas riayat di gayi hai:

- **Bachche** — abhi un par farz nahi, lekin walidain ko chahiye ke taqreeban saat saal ki umar se aahista aahista namaz sikhayen, taake baligh hone tak ye un ki aadat ban jaye.
- **So jane wale ya bhool jane wale** — un par gunah nahi, lekin jaise hi yaad aaye ya neend se uthen, chhooti hui namaz parhein.
- **Bimar log** — namaz mauqoof nahi hoti, balke uski soorat badal jati hai: jo khada na ho sake wo baith kar parhe, jo baith na sake wo let kar jitni harkat mumkin ho us se parhe, chahe sirf aankhon ya dil se.
- **Musafir** — safar ki mushkil ki wajah se, kuch namazein qasar (mukhtasar) kar sakte hain aur kuch ko jama' (mila) sakte hain.
- **Haiz aur nifas wali khawateen** — is arse mein namaz (aur roze) se mustasna hain, aur roze ki tarah unhein ye namazein baad mein qaza nahi karni parti.

In tamam ehkam ke peeche usool ye hai ke Allah kisi par sakhti nahi chahta — *farziyat* hamesha qaim rehti hai, lekin *usay kis tarah ada kiya jaye* har insan ke haalaat ke mutabiq badalta hai.`,
    madhab_notes: "Exact ages/thresholds for children, and the specifics of combining prayers while travelling, vary somewhat by madhab.",
    hadith_reference: "Qur'an 2:286 (Allah does not burden a soul beyond its capacity); Sahih al-Bukhari (rulings on prayer for the sick)",
  },
  {
    section: "purity",
    order: 1,
    title: "Purity (Taharah)",
    description: "Understanding ritual purity and why it matters before prayer",
    description_roman_urdu: "Taharah (paaki) ko samajhna aur namaz se pehle iski ahmiyat",
    content: `Taharah (purity) is a prerequisite for prayer — Allah says: *"Indeed, Allah loves those who purify themselves."* (Qur'an 2:222) There are two categories of impurity a Muslim must address:

**Minor impurity (Hadath Asghar)** — caused by everyday things like using the toilet, passing wind, or sleeping deeply. This is removed by performing **Wudu**.

**Major impurity (Hadath Akbar)** — caused by things like sexual intercourse, or for women, the end of a menstrual or post-natal bleeding cycle. This requires **Ghusl** (a full ritual bath covering the entire body).

If water is unavailable, or using it would be harmful, **Tayammum** — dry purification using clean earth or sand — may be used instead of either Wudu or Ghusl.

Purity is not just physical — it reflects an intention to approach prayer in a clean, prepared state, both outwardly and inwardly.`,
    content_roman_urdu: `Taharah (paaki) namaz ke liye zaruri shart hai — Allah farmata hai: *"Beshak Allah unhein pasand karta hai jo paak rehte hain."* (Qur'an 2:222) Napaki ki do qismein hain jinka khayal rakhna zaruri hai:

**Chhoti napaki (Hadath Asghar)** — rozmarra ke kaamon se hoti hai, jaise toilet istemal karna, hawa nikalna, ya gehri neend sona. Ye **Wudu** karne se dur hoti hai.

**Bari napaki (Hadath Akbar)** — jaisi cheezon se hoti hai jinsi ta'alluq, ya khawateen ke liye haiz ya nifas ke khatam hone se. Isay dur karne ke liye **Ghusl** (poore jism ka gusal) zaruri hota hai.

Agar pani mojood na ho, ya iska istemal nuqsan-deh ho, to Wudu ya Ghusl ke badle **Tayammum** — saaf mitti ya ret se paaki — istemal ki ja sakti hai.

Paaki sirf zahiri nahi hoti — ye ye zahir karti hai ke insan namaz ke liye zahiri aur batini, dono tarah se saaf aur tayyar hokar aana chahta hai.`,
    hadith_reference: "Qur'an 2:222; Qur'an 5:6",
  },
  {
    section: "wudu_overview",
    order: 1,
    title: "Wudu — Overview",
    description: "What Wudu is, what breaks it, and when it's needed",
    description_roman_urdu: "Wudu kya hai, kya cheezein isay tor deti hain, aur kab iski zarurat hoti hai",
    content: `Wudu is the ritual washing that removes minor impurity and prepares a Muslim for prayer. Its method is described directly in the Qur'an:

*"O you who believe, when you rise to perform prayer, wash your faces and your hands to the elbows, wipe your heads, and wash your feet to the ankles."* (Qur'an 5:6)

**Wudu is required before** each of the five daily prayers (unless the previous Wudu is still intact), and is recommended before sleeping.

**Common things that break Wudu:**
- Using the toilet (urination, defecation, passing wind)
- Deep sleep or loss of consciousness
- Bleeding or discharge from the private parts

Once Wudu is broken, it must be performed again before the next prayer. A single Wudu can be used for multiple prayers as long as nothing has broken it in between — there's no need to repeat it unnecessarily.

For the full step-by-step method, open the interactive **How to Perform Wudu** tutorial from the Prayer Academy hub.`,
    content_roman_urdu: `Wudu wo mukhsoos gusal hai jo chhoti napaki dur karta hai aur Musalman ko namaz ke liye tayyar karta hai. Iska tareeqa Qur'an mein seedha bayan kiya gaya hai:

*"Aey imaan walo, jab tum namaz ke liye khare ho to apne chehre aur kohniyon tak haath dho lo, apne saron ka masah karo, aur apne paon takhno tak dho lo."* (Qur'an 5:6)

**Wudu zaruri hai** har panch waqt ki namaz se pehle (jab tak pehla Wudu qaim ho), aur sone se pehle bhi karna mustahsan hai.

**Wo cheezein jo aam taur par Wudu tor deti hain:**
- Toilet istemal karna (peshab, paikhana, hawa nikalna)
- Gehri neend ya behoshi
- Sharamgah se khoon ya rutubat nikalna

Jab Wudu toot jaye to agli namaz se pehle dobara karna zaruri hai. Ek Wudu se ek se zyada namazein parhi ja sakti hain jab tak beech mein koi cheez usay na tore — isay bila zarurat dobara karne ki zarurat nahi.

Mukammal marhala-war tareeqa jaanne ke liye, Prayer Academy hub se interactive **How to Perform Wudu** tutorial kholein.`,
    madhab_notes: "Scholars differ on a few specific things that break Wudu — for example, whether touching the opposite gender without a barrier, or bleeding from a wound, invalidates it. These differences don't change the core method, only some edge cases.",
    hadith_reference: "Qur'an 5:6",
  },
  {
    section: "tayammum",
    order: 1,
    title: "Tayammum (Dry Purification)",
    description: "The alternative to Wudu or Ghusl when water isn't available",
    description_roman_urdu: "Jab pani mojood na ho to Wudu ya Ghusl ka alternative",
    content: `Tayammum is a mercy from Allah for situations where water is unavailable, insufficient, or would cause harm (such as illness where water would worsen the condition). It replaces both Wudu and Ghusl.

*"...and if you do not find water, then seek clean earth and wipe your faces and hands with it."* (Qur'an 5:6)

**How it's performed (general method):**
1. Make the intention to purify yourself for prayer.
2. Strike both palms gently on clean earth, sand, or a dust-bearing surface.
3. Wipe the face once with both hands.
4. Strike the palms again, then wipe each arm with the other hand.

Tayammum remains valid until the same things that would break Wudu occur, or until water becomes available again — at which point Wudu or Ghusl should be used once possible.`,
    content_roman_urdu: `Tayammum Allah ki taraf se ek rahmat hai un halaat ke liye jab pani mojood na ho, kaafi na ho, ya nuqsan-deh ho (maslan bimari jisme pani istemal karne se haalat bigar jaye). Ye Wudu aur Ghusl dono ki jagah le leta hai.

*"...aur agar tumhein pani na mile to paak mitti talash karo aur usse apne chehre aur haathon ka masah karo."* (Qur'an 5:6)

**Ye kis tarah kiya jata hai (aam tareeqa):**
1. Namaz ke liye paak hone ki niyyah karein.
2. Dono hathelian halke se paak mitti, ret, ya gubaar wali satah par maarain.
3. Dono haathon se ek baar chehre ka masah karein.
4. Hathelian dobara maarain, phir doosre haath se har baazu ka masah karein.

Tayammum us waqt tak durust rehta hai jab tak wo cheezein na hon jo Wudu torti hain, ya jab tak pani dobara mojood na ho jaye — jiske baad jaldi Wudu ya Ghusl istemal karna chahiye.`,
    madhab_notes: "Madhabs differ on some details — for example, whether the wiping covers the hands to the wrists or to the elbows, and exactly which surfaces qualify as 'clean earth.' The core method above is agreed upon across all four schools.",
    hadith_reference: "Qur'an 5:6; Qur'an 4:43",
  },
  {
    section: "awrah",
    order: 1,
    title: "Awrah — Covering Appropriately for Prayer",
    description: "What must be covered during prayer",
    description_roman_urdu: "Namaz ke doran kya dhakna zaruri hai",
    content: `Awrah refers to the parts of the body that must be covered during prayer. Dressing appropriately is one of the conditions for a valid prayer.

**For men:** at minimum, the area between the navel and the knees must be covered. It's recommended to cover the shoulders as well, and to dress modestly and respectably for prayer rather than the bare minimum.

**For women:** the entire body must be covered except the face and hands, with loose, non-transparent clothing. A headscarf covering the hair is required during prayer.

The clothing should not be so tight or transparent that it reveals the shape of the body underneath. The Qur'an says: *"O children of Adam, take your adornment [wear your best clothing] at every masjid."* (Qur'an 7:31)`,
    content_roman_urdu: `Awrah us jism ke un hisson ko kehte hain jinka namaz mein dhakna zaruri hai. Munasib libaas pehnna namaz ke sahih hone ki shara'it mein se ek hai.

**Mardon ke liye:** kam az kam naaf se ghutno tak ka hissa dhakna zaruri hai. Kandhon ko bhi dhakna mustahsan hai, aur namaz ke liye sirf kam se kam ke bajaye ba-hushmat aur muhtaram libaas pehnna chahiye.

**Khawateen ke liye:** poora jism, chehre aur haathon ke siwa, dhakna zaruri hai, dheele aur ghair-shaffaf kapron se. Namaz mein baalon ko dhakne wala dupatta/scarf zaruri hai.

Libaas itna tang ya shaffaf nahi hona chahiye ke jism ka hulya zahir ho. Qur'an farmata hai: *"Aey Bani Adam, har masjid mein apni zeenat (achhe kapre) pehno."* (Qur'an 7:31)`,
    madhab_notes: "Scholars differ slightly on some specifics — for example, whether a woman's feet must be covered, and the precise boundary of a man's Awrah. Dress modestly, and consult a knowledgeable teacher for your specific situation if unsure.",
    hadith_reference: "Qur'an 7:31; Qur'an 24:31",
  },
  {
    section: "facing_qibla",
    order: 1,
    title: "Facing the Qibla",
    description: "Why Muslims face the Ka'bah, and what to do if unsure of the direction",
    description_roman_urdu: "Musalman Ka'bah ki taraf rukh kyun karte hain, aur simt maloom na ho to kya karein",
    content: `Every prayer must be performed facing the Qibla — the direction of the Ka'bah in Makkah.

*"So turn your face toward the Sacred Mosque. And wherever you [believers] are, turn your faces toward it."* (Qur'an 2:144)

Facing the same direction, wherever a Muslim is on Earth, is a powerful expression of the unity of the Ummah.

**If you don't know the exact direction:** make your best reasonable effort based on available information (a compass, a mosque's orientation, or Sirat's own Qibla finder). If it later turns out you were slightly off, your prayer is still valid — Allah does not hold a sincere, reasonable effort against a person.

Use Sirat's **Qibla** page for a live compass and map-based Qibla finder for your current location.`,
    content_roman_urdu: `Har namaz Qibla ki taraf rukh karke ada ki jati hai — yani Makkah mein Ka'bah ki simt.

*"To apna chehra Masjid-e-Haram ki taraf phair lo. Aur jahan bhi tum [momineen] ho, apne chehre usi ki taraf karo."* (Qur'an 2:144)

Duniya mein jahan bhi Musalman ho, usi ek simt ki taraf rukh karna, Ummat ki wahdat ka ek zabardast izhaar hai.

**Agar aapko theek simt maloom na ho:** mojood ma'loomat (qutub-numa, masjid ka rukh, ya Sirat ka apna Qibla finder) ke mutabiq apni behtareen koshish karein. Agar baad mein pata chale ke aap kuch had tak galat the, tab bhi aapki namaz sahih hai — Allah khalis, munasib koshish ko kabhi zaya nahi karta.

Apni maujooda location ke liye live compass aur map-based Qibla finder ke liye Sirat ka **Qibla** page istemal karein.`,
    hadith_reference: "Qur'an 2:144, 2:150",
  },
  {
    section: "prayer_times",
    order: 1,
    title: "The Five Prayer Times",
    description: "When each of the five daily prayers is due",
    description_roman_urdu: "Har ek panch waqt ki namaz ka waqt kab hota hai",
    content: `Allah has appointed five specific windows across the day and night for prayer: *"Indeed, prayer has been decreed upon the believers a decree of specified times."* (Qur'an 4:103)

| Prayer | Window |
|---|---|
| **Fajr** | From dawn (first light) until just before sunrise |
| **Dhuhr** | From just after the sun passes its highest point until Asr begins |
| **Asr** | From mid-afternoon until just before sunset |
| **Maghrib** | From sunset until the last light of dusk fades |
| **Isha** | From nightfall until (ideally) before midnight, though it remains valid until Fajr begins |

Each prayer has a *preferred* early window and a wider *valid* window — praying as early as reasonably possible within a prayer's time is generally the better practice, though praying later (but still within the window) remains fully valid.

Use Sirat's **Prayer Times** page for exact daily timings calculated for your location.`,
    content_roman_urdu: `Allah ne din aur raat mein namaz ke liye paanch khaas waqt muqarrar kiye hain: *"Beshak namaz mu'mino par muqarrara waqton mein farz ki gayi hai."* (Qur'an 4:103)

| Namaz | Waqt |
|---|---|
| **Fajr** | Subah sadiq (pehli roshni) se lekar tuloo-e-aftab se thori der pehle tak |
| **Zuhar** | Sooraj apne sab se buland muqam se dhalne ke thori der baad se Asr shuru hone tak |
| **Asr** | Dopeher baad se lekar ghuroob-e-aftab se thori der pehle tak |
| **Maghrib** | Ghuroob-e-aftab se lekar shafaq (sham ki aakhri roshni) khatam hone tak |
| **Isha** | Raat hone se lekar (behtar ye ke) aadhi raat se pehle tak, agarche ye Fajr shuru hone tak durust rehti hai |

Har namaz ka ek *behtareen* ibtidai waqt aur ek zyada wasee' *durust* waqt hota hai — namaz ko uske waqt mein jitni jaldi mumkin ho parhna aam taur par behtar amal hai, halanke der se (magar waqt ke andar) parhna bhi mukammal taur par durust hai.

Apni location ke liye theek roz-marra ke awqaat jaanne ke liye Sirat ka **Prayer Times** page istemal karein.`,
    madhab_notes: "Different calculation authorities use slightly different astronomical conventions (e.g. the angle of the sun defining the start of Fajr), which is why prayer-time apps let you choose a calculation method.",
    hadith_reference: "Qur'an 4:103; Qur'an 17:78; Qur'an 11:114",
  },
  {
    section: "adhan",
    order: 1,
    title: "The Adhan (Call to Prayer)",
    description: "The call announcing that a prayer's time has begun",
    description_roman_urdu: "Wo azaan jo namaz ka waqt shuru hone ka elaan karti hai",
    content: `The Adhan is the call that announces a prayer time has begun. Its wording proclaims the core of the Islamic testimony of faith:

> Allahu Akbar (Allah is the Greatest) — 4 times
> Ash-hadu an la ilaha illallah (I bear witness there is no god but Allah) — 2 times
> Ash-hadu anna Muhammadan rasulullah (I bear witness Muhammad is the Messenger of Allah) — 2 times
> Hayya 'ala-s-Salah (Come to prayer) — 2 times
> Hayya 'ala-l-Falah (Come to success) — 2 times
> *(For Fajr only: As-Salatu khayrun min an-nawm — Prayer is better than sleep — 2 times)*
> Allahu Akbar — 2 times
> La ilaha illallah — 1 time

It's a Sunnah for anyone who hears the Adhan to quietly repeat each line after the caller (except the "Hayya 'ala" lines, responded to with "La hawla wala quwwata illa billah"), and to make a supplication after it finishes.

Sirat can play the Adhan automatically at prayer time — see the Adhan settings from the Prayer Times page.`,
    content_roman_urdu: `Azaan wo call hai jo elaan karti hai ke namaz ka waqt shuru ho gaya hai. Iske alfaz Islam ke buniyadi shahadat ko bayan karte hain:

> Allahu Akbar (Allah sab se bara hai) — 4 martaba
> Ash-hadu an la ilaha illallah (Main gawahi deta hoon ke Allah ke siwa koi ma'bood nahi) — 2 martaba
> Ash-hadu anna Muhammadan rasulullah (Main gawahi deta hoon ke Muhammad Allah ke Rasool hain) — 2 martaba
> Hayya 'ala-s-Salah (Namaz ki taraf aao) — 2 martaba
> Hayya 'ala-l-Falah (Kaamyabi ki taraf aao) — 2 martaba
> *(Sirf Fajr ke liye: As-Salatu khayrun min an-nawm — Namaz neend se behtar hai — 2 martaba)*
> Allahu Akbar — 2 martaba
> La ilaha illallah — 1 martaba

Jo shakhs azaan sune, uske liye ye Sunnah hai ke muezzin ke peeche aahista aahista har jumla dohraye (siwaye "Hayya 'ala" ke jumlon ke, jinka jawab "La hawla wala quwwata illa billah" se diya jata hai), aur azaan khatam hone ke baad dua karay.

Sirat namaz ke waqt par khud-ba-khud Azaan bajaa sakta hai — Prayer Times page se Azaan ki settings dekhein.`,
    madhab_notes: "The wording above reflects the standard Sunni Adhan used by the majority of mosques worldwide. Minor regional and historical variations in phrasing exist; follow your local mosque's practice if you notice small differences.",
    hadith_reference: "Sahih al-Bukhari and Sahih Muslim (wording and method of the Adhan)",
  },
  {
    section: "iqamah",
    order: 1,
    title: "The Iqamah (Second Call)",
    description: "The shorter call given just before the congregational prayer begins",
    description_roman_urdu: "Wo mukhtasar call jo jama'at wali namaz shuru hone se pehle di jati hai",
    content: `The Iqamah is a second, shorter call given immediately before the congregational prayer starts, signalling that everyone should stand and line up. It follows similar wording to the Adhan, but shorter, and adds one line:

> Qad qamat-is-Salah (The prayer has now begun) — said twice

Where the Adhan announces that a prayer's *time* has begun (and may be called well before the congregation gathers), the Iqamah signals that the prayer itself is about to start *right now* — everyone should stop talking, straighten the rows, and prepare to follow the Imam.

If praying alone (not in congregation), calling the Iqamah is not required, though some choose to say it quietly before beginning.`,
    content_roman_urdu: `Iqamah ek doosri, mukhtasar call hai jo jama'at wali namaz shuru hone se foran pehle di jati hai, jo elaan karti hai ke sab khare hokar saf bandhein. Iske alfaz Azaan se milte hain, magar mukhtasar, aur ek jumla barhta hai:

> Qad qamat-is-Salah (Namaz shuru ho gayi hai) — do martaba

Jahan Azaan namaz ke *waqt* ka elaan karti hai (aur jama'at jama ho, us se kaafi pehle bhi kahi ja sakti hai), Iqamah elaan karti hai ke namaz *abhi is waqt* shuru hone wali hai — sab ko baat karna band karna chahiye, safen seedhi karni chahiye, aur Imam ki pairvi ke liye tayyar hona chahiye.

Agar tanha namaz parh rahe hain (jama'at mein nahi), to Iqamah kehna zaruri nahi, halanke kuch log shuru karne se pehle isay aahista se keh lete hain.`,
    madhab_notes: "The exact number of repetitions in the Iqamah varies slightly between schools — some traditions closely mirror the Adhan's repetitions, while others say each phrase only once.",
    hadith_reference: "Sahih al-Bukhari and Sahih Muslim (Adhan and Iqamah described together)",
  },
  {
    section: "khutbah",
    order: 1,
    title: "The Khutbah (Sermon)",
    description: "What the Khutbah is, its requirements, and how it differs for Jummah and Eid",
    description_roman_urdu: "Khutbah kya hai, iski shara'it, aur Jummah aur Eid ke liye ye kis tarah mukhtalif hai",
    content: `The Khutbah is a sermon delivered by an Imam or Khatib, reminding the congregation of Allah, drawing from the Qur'an and Sunnah, and offering guidance for daily life. It's a core part of both the Friday (Jummah) prayer and the two Eid prayers — but its role differs between them.

**For Jummah, the Khutbah comes *before* the prayer, and is a condition for it to be valid** — Jummah cannot be prayed without one. It consists of two sermons (Khutbatayn), separated by a brief sitting roughly the length of reciting Surah Al-Ikhlas. The Prophet ﷺ always delivered his khutbahs standing, and always as two sermons — narrated from Ibn 'Umar and Jabir ibn Samurah.

**For Eid, the Khutbah comes *after* the prayer, and is Sunnah rather than a condition for the prayer's validity** — the Eid prayer is still valid even if someone leaves before it. Staying to listen is still strongly encouraged.

**While the Khutbah is being delivered:**
- Listen attentively and remain silent — even telling someone else to be quiet is considered idle talk that reduces the reward of attending. The Prophet ﷺ said: *"If you say to your companion, 'Be quiet,' while the Imam is delivering the khutbah on Friday, you have engaged in idle talk."* (Sahih al-Bukhari and Sahih Muslim)
- Avoid starting a conversation, eating, or other unrelated activity.
- If you arrive while the khutbah is already in progress, join and listen — many scholars hold that a brief, light prayer (like the two rak'ah of Tahiyyatul Masjid) upon entering is still permitted even during the khutbah, though views differ on this.

Scholars commonly describe four elements that belong in every khutbah: praising Allah, sending Salah upon the Prophet ﷺ, exhorting the congregation toward taqwa (God-consciousness), and reciting at least one verse of the Qur'an.`,
    content_roman_urdu: `Khutbah ek waaz hai jo Imam ya Khatib deta hai, jisme jama'at ko Allah ki yaad dilai jati hai, Qur'an-o-Sunnah se rahnumai li jati hai, aur roz-marra ki zindagi ke liye hidayat di jati hai. Ye Jum'ah ki namaz aur dono Eid ki namazon ka ek buniyadi hissa hai — lekin iska kirdaar dono mein mukhtalif hai.

**Jum'ah mein, Khutbah namaz se *pehle* hoti hai, aur namaz ke sahih hone ki shart hai** — Jum'ah Khutbah ke bina nahi ho sakti. Ye do khutbon (Khutbatayn) par mushtamil hoti hai, jinke darmiyan ek mukhtasar baithak hoti hai, taqreeban Surah Al-Ikhlas parhne jitni. Nabi ﷺ hamesha khare hokar khutba dete the, aur hamesha do khutbe dete the — Ibn 'Umar aur Jabir ibn Samurah ki riwayaton mein aya hai.

**Eid mein, Khutbah namaz ke *baad* hoti hai, aur namaz ke sahih hone ki shart nahi, balke Sunnah hai** — agar koi Khutbah se pehle chala jaye, tab bhi uski Eid namaz sahih hoti hai. Phir bhi rukna aur sunna bohot pasandida amal hai.

**Khutbah ke doran:**
- Tawajjuh se sunein aur khamosh rahein — kisi ko khamosh karne ke liye kehna bhi be-faida baat shumar hoti hai jo hazri ka ajr kam kar deti hai. Nabi ﷺ ne farmaya: *"Agar tum jumme ke din, jab Imam khutba de raha ho, apne saathi se kaho 'khamosh raho,' to tumne behuda baat ki."* (Sahih al-Bukhari aur Sahih Muslim)
- Baat-cheet, khana, ya kisi aur ghair-mutalliq kaam se bachein.
- Agar aap Khutbah shuru hone ke baad pohanchen, to shamil hokar sunein — kai ulama ke nazdeek masjid mein dakhil hote waqt ek mukhtasar, halki namaz (jaise Tahiyyatul Masjid ke do rak'ah) Khutbah ke doran bhi jaiz hai, halanke is par ulama ke mukhtalif nazariyat hain.

Ulama aam taur par har khutbe ke char zaruri arkaan bayan karte hain: Allah ki hamd, Nabi ﷺ par Salat bhejna, jama'at ko taqwa ki taraghib dena, aur kam az kam Qur'an ki ek ayat ki tilawat.`,
    madhab_notes: "The majority of scholars require two sermons for Jummah's validity, and the Hanbali school explicitly holds this as a condition for the prayer itself. Schools differ on some specifics — for example, whether the khutbah's obligatory portions must be delivered in Arabic, and exactly what invalidates it.",
    hadith_reference: "Sahih al-Bukhari and Sahih Muslim (silence during the khutbah); narrations of Ibn 'Umar and Jabir ibn Samurah (two sermons)",
  },
  {
    section: "eid",
    order: 1,
    title: "The Eid Prayer — How It's Performed",
    description: "No Adhan, extra Takbirs, and a Khutbah delivered afterward",
    description_roman_urdu: "Na Azaan, izafi Takbirat, aur namaz ke baad Khutbah",
    content: `The Eid prayer — for both Eid ul-Fitr and Eid ul-Adha — is 2 rak'ah, prayed only in congregation, ideally outdoors or in a large open space, shortly after sunrise.

**What's different from an ordinary prayer:**
- **No Adhan or Iqamah** is called before it — narrated from Ibn 'Abbas and Jabir ibn 'Abdullah, who both stated the Prophet ﷺ prayed Eid without either call (Sahih al-Bukhari and Sahih Muslim).
- **Extra Takbirs are added** — in the Hanafi school, 3 extra Takbirs right after the opening Takbir in the 1st rak'ah (before reciting Al-Fatihah), and 3 more in the 2nd rak'ah, right before bowing into Ruku' — 6 in total. Other schools count differently (see the interactive walkthrough's notes on this step).
- **The Khutbah comes *after* the prayer**, not before — the reverse of Jummah — and is Sunnah rather than a condition for the prayer's validity.

Beyond those differences, the rak'ahs themselves follow the same Fatihah → Surah → Ruku' → Sujood structure as any other prayer.

Follow along rak'ah by rak'ah, including exactly where the extra Takbirs go, in the **Rak'ah Walkthrough** from the Prayer Academy hub.`,
    content_roman_urdu: `Eid ki namaz — Eid ul-Fitr aur Eid ul-Adha dono ke liye — 2 rak'ah hai, jo sirf jama'at mein parhi jati hai, tarjihan khuli jagah mein, tuloo-e-aftab ke thori der baad.

**Ek aam namaz se ye kya farq hai:**
- **Na Azaan na Iqamah** iske pehle di jati hai — Ibn 'Abbas aur Jabir ibn 'Abdullah ki riwayat hai ke Nabi ﷺ ne Eid ki namaz bila Azaan-o-Iqamah parhi (Sahih al-Bukhari aur Sahih Muslim).
- **Izafi Takbirat shamil ki jati hain** — Hanafi mazhab mein, pehle rak'ah mein takbir-e-tahrima ke foran baad 3 izafi takbirat (Al-Fatihah se pehle), aur doosre rak'ah mein Ruku' mein jane se pehle 3 aur — kul 6. Doosre mazahib mein ginti mukhtalif hai (is qadam ke interactive walkthrough ke notes dekhein).
- **Khutbah namaz ke *baad* hoti hai**, pehle nahi — Jum'ah ke bar-aks — aur ye namaz ke sahih hone ki shart nahi, balke Sunnah hai.

In farqon ke ilawa, rak'aten khud usi Fatihah → Surah → Ruku' → Sujood tarteeb par chalti hain jo kisi bhi doosri namaz mein hoti hai.

Rak'ah ba-rak'ah is tareeqe se chalne ke liye, aur ye jaanne ke liye ke izafi takbirat kahan aati hain, Prayer Academy hub se **Rak'ah Walkthrough** istemal karein.`,
    madhab_notes: "The Hanafi school classifies the Eid prayer itself as Wajib (obligatory, one rank below Farz); the Shafi'i, Maliki, and Hanbali schools classify it as a strongly recommended Sunnah. This mirrors the same kind of classification difference as Witr.",
    hadith_reference: "Sahih al-Bukhari and Sahih Muslim (no Adhan/Iqamah before Eid prayer, narrated from Ibn 'Abbas and Jabir ibn 'Abdullah)",
  },
  {
    section: "eid",
    order: 2,
    title: "Eid ul-Fitr",
    description: "Marking the end of Ramadan — Zakat al-Fitr, the Sunnahs of the day, and the prayer",
    description_roman_urdu: "Ramzan ke ikhtitam ka nishan — Zakat al-Fitr, is din ki Sunnaten, aur namaz",
    content: `Eid ul-Fitr ("Festival of Breaking the Fast") marks the end of Ramadan, on the 1st of Shawwal. It's a day of gratitude for the strength to complete the month's fasting.

**Before leaving for the prayer:**
- **Zakat al-Fitr** (also called Sadaqat al-Fitr) — a small obligatory charity, given on behalf of oneself and each dependent, due before the Eid prayer (though it can be paid any time during Ramadan). The Prophet ﷺ made this obligatory on every Muslim, whether young or old, male or female (Sahih al-Bukhari and Sahih Muslim, from Ibn 'Umar).
- **Ghusl and wearing your best clothes** are recommended, along with perfume for men.
- **Eating something — typically an odd number of dates — before leaving for the prayer**, unlike other prayers. Anas (RA) reported: *"The Prophet ﷺ would not go out on the morning of Eid al-Fitr until he had eaten some dates, and he would eat an odd number."* (Sahih al-Bukhari)
- **Saying the Takbir out loud on the way to the prayer** — a widely followed Sunnah.

**The prayer itself** is 2 rak'ah with extra Takbirs — see "The Eid Prayer — How It's Performed" for the exact structure, and the **Rak'ah Walkthrough** to follow along.

**Afterward**, a khutbah is delivered, and it's customary to exchange Eid greetings ("Eid Mubarak") and, where practiced, take a different route home than the one taken to the prayer — narrated as the Prophet's ﷺ practice by Jabir ibn 'Abdullah (Sahih al-Bukhari).`,
    content_roman_urdu: `Eid ul-Fitr ("Roze khatam karne ka jashn") Ramzan ke ikhtitam par, 1 Shawwal ko manaya jata hai. Ye ek mahine ke roze poore karne ki taufeeq par shukr guzari ka din hai.

**Namaz ke liye nikalne se pehle:**
- **Zakat al-Fitr** (jise Sadaqat al-Fitr bhi kehte hain) — ek chhota farz sadqa, jo apni aur har zer-e-kafalat shakhs ki taraf se diya jata hai, Eid ki namaz se pehle wajib hota hai (agarche ye Ramzan ke kisi bhi waqt diya ja sakta hai). Nabi ﷺ ne isay har Musalman par farz kiya, chahe chhota ho ya bara, mard ho ya aurat (Sahih al-Bukhari aur Sahih Muslim, Ibn 'Umar se).
- **Ghusl karna aur behtareen kapre pehnna** mustahsan hai, aur mardon ke liye khushbu lagana bhi.
- **Namaz ke liye nikalne se pehle kuch khana — aam taur par taaq (odd) tadaad mein khajoorein** — doosri namazon ke bar-aks. Anas (RA) ne bayan kiya: *"Nabi ﷺ Eid al-Fitr ki subah ghar se nahi nikalte the jab tak kuch khajoorein na kha lete, aur wo taaq tadaad mein khate the."* (Sahih al-Bukhari)
- **Namaz ki taraf jaate huye buland awaaz se Takbir kehna** — ek wasee' taur par apnai jane wali Sunnah.

**Khud namaz** 2 rak'ah hai izafi takbirat ke saath — iski poori tarteeb "The Eid Prayer — How It's Performed" mein dekhein, aur sath chalne ke liye **Rak'ah Walkthrough** istemal karein.

**Baad mein**, khutbah di jati hai, aur ye maroof hai ke log Eid ki mubarakbad dete hain ("Eid Mubarak") aur, jahan iska riwaj ho, namaz ki taraf jane wale raste se alag raste se wapas aate hain — Jabir ibn 'Abdullah ne Nabi ﷺ ke amal ke taur par bayan kiya (Sahih al-Bukhari).`,
    madhab_notes: "The exact amount and permissible types of Zakat al-Fitr (staple food vs. its cash equivalent) vary somewhat by school and by local scholarly guidance — check with a local Imam or trusted source for the current amount in your area.",
    hadith_reference: "Sahih al-Bukhari and Sahih Muslim (Zakat al-Fitr, eating dates before the prayer, taking a different route home)",
  },
  {
    section: "eid",
    order: 3,
    title: "Eid ul-Adha",
    description: "The Festival of Sacrifice — Qurbani, the days of Tashreeq, and the prayer",
    description_roman_urdu: "Qurbani ka Jashn — Qurbani, Ayyam-e-Tashreeq, aur namaz",
    content: `Eid ul-Adha ("Festival of Sacrifice") falls on the 10th of Dhul-Hijjah, coinciding with the days of Hajj, and commemorates Prophet Ibrahim's (AS) willingness to sacrifice his son in obedience to Allah, and Allah's mercy in ransoming him with a sacrifice instead (Qur'an 37:102–107).

**Before the prayer:**
- Unlike Eid ul-Fitr, it's Sunnah to **delay eating until after the prayer** — ideally from the meat of one's own sacrifice, if performing Qurbani.
- **Ghusl and best clothes** are recommended, as with Eid ul-Fitr.
- **For anyone intending to perform Qurbani (the sacrifice) themselves**, it's recommended to avoid cutting their hair or nails from the 1st of Dhul-Hijjah until after the sacrifice is made (Sahih Muslim, from Umm Salamah).

**The prayer itself** follows the same structure as Eid ul-Fitr's — 2 rak'ah with extra Takbirs, no Adhan or Iqamah, and a khutbah delivered afterward. See "The Eid Prayer — How It's Performed" and the **Rak'ah Walkthrough** for the exact steps.

**Qurbani (the sacrifice):**
- An animal (sheep, goat, cow, or camel, meeting age and health conditions) is sacrificed after the Eid prayer, over the 3 days that follow, and the meat is shared — commonly divided into thirds for one's own household, relatives/friends, and the poor, though this exact split is common practice rather than a fixed requirement.
- Qurbani is obligatory on every financially able adult Muslim in the Hanafi school; the other three schools consider it a strongly recommended Sunnah rather than an obligation.

**Takbir at-Tashreeq** — a specific Takbir recited out loud after every Fard prayer from Fajr on the 9th of Dhul-Hijjah (the Day of Arafah) through Asr on the 13th, marking these as the "Days of Tashreeq."`,
    content_roman_urdu: `Eid ul-Adha ("Qurbani ka Jashn") 10 Dhul-Hijjah ko, Hajj ke dinon mein manaya jata hai, aur Nabi Ibrahim (AS) ki apne bete ki Allah ki ita'at mein qurbani dene ki razamandi, aur Allah ke uski jagah aik qurbani se fidya dene ke waqia ki yaad taaza karta hai (Qur'an 37:102–107).

**Namaz se pehle:**
- Eid ul-Fitr ke bar-aks, namaz ke baad tak **khana rok kar rakhna** Sunnah hai — behtar ye ke apni qurbani ke gosht se, agar Qurbani ki ja rahi ho.
- **Ghusl aur behtareen kapre**, Eid ul-Fitr ki tarah, mustahsan hain.
- **Jo shakhs khud Qurbani karne ka iraada rakhta ho**, uske liye mustahsan hai ke 1 Dhul-Hijjah se qurbani hone tak apne baal ya naakhun na katwaye (Sahih Muslim, Umm Salamah se).

**Khud namaz** Eid ul-Fitr ki tarah hi hoti hai — 2 rak'ah izafi takbirat ke saath, bila Azaan-o-Iqamah, aur namaz ke baad khutbah. Poore marahil ke liye "The Eid Prayer — How It's Performed" aur **Rak'ah Walkthrough** dekhein.

**Qurbani:**
- Ek janwar (bhera, bakri, gai, ya oont, jo umar aur sehat ki shara'it poori kare) Eid ki namaz ke baad, agle 3 dinon mein qurban kiya jata hai, aur gosht taqseem kiya jata hai — aam taur par teen hisson mein: apne ghar ke liye, rishtedaron/doston ke liye, aur ghuraba ke liye — agarche ye taqseem sirf aam riwaj hai, koi pukhta shart nahi.
- Hanafi mazhab mein Qurbani har sahib-e-nisab baaligh Musalman par farz hai; baqi teen mazahib mein ye Sunnah-e-Mu'akkadah shumar hoti hai, farz nahi.

**Takbir at-Tashreeq** — ek khaas Takbir jo har farz namaz ke baad, 9 Dhul-Hijjah (Yaum-e-Arafah) ki Fajr se lekar 13 Dhul-Hijjah ki Asr tak, buland awaaz se kahi jati hai, jinhein "Ayyam-e-Tashreeq" kaha jata hai.`,
    madhab_notes: "Qurbani's obligatory-vs-Sunnah classification differs by school, as noted above. The exact wording and repetition count of Takbir at-Tashreeq also varies slightly by school and region.",
    hadith_reference: "Qur'an 37:102–107 (the sacrifice of Ibrahim, AS); Sahih Muslim (avoiding cutting hair/nails before one's own sacrifice)",
  },
];

export const SEED_WUDU_STEPS = [
  {
    order: 1,
    title: "Niyyah & Washing the Hands",
    instructions: `Begin by making the intention (Niyyah) in your heart to perform Wudu for prayer — this doesn't need to be said out loud.

Say **"Bismillah"** (In the name of Allah), then wash both hands up to and including the wrists, three times, making sure water reaches between the fingers.`,
    instructions_roman_urdu: `Wudu ki niyyah apne dil mein karein, ke ye namaz ke liye Wudu kar rahe hain — ise zaban se kehna zaruri nahi.

**"Bismillah"** (Allah ke naam se) kahein, phir dono haath kalaiyon tak, teen martaba dhoyein, aur khayal rakhein ke pani unglion ke darmiyan bhi pohanche.`,
    importance: "Sunnah (recommended) — not obligatory in itself, but strongly encouraged to open Wudu correctly.",
    common_mistakes: "- Forgetting to wash between the fingers.\n- Not washing all the way up to the wrist.",
    madhab_notes: "Saying 'Bismillah' before starting is at least a recommended practice in all schools; some scholars consider it obligatory if remembered.",
    hadith_reference: "Sahih Muslim (Humran's narration describing 'Uthman's Wudu, the basis for most descriptions of the Prophet's ﷺ method)",
  },
  {
    order: 2,
    title: "Rinsing the Mouth",
    instructions: "Take water into your mouth, swish it around thoroughly, and spit it out. Repeat three times.",
    instructions_roman_urdu: "Muh mein pani lein, achhi tarah kulli karein, aur thook dein. Teen martaba dohrayein.",
    importance: "Sunnah in most schools; some Hanbali scholars consider it part of the obligatory act of washing the face.",
    common_mistakes: "- Rinsing too quickly without actually swishing the water around.\n- Skipping this step out of haste.",
    madhab_notes: "Hanafi and Shafi'i view this as Sunnah; some Hanbali scholars hold it to be obligatory alongside washing the face.",
    hadith_reference: "Sahih Muslim (Humran's narration of 'Uthman's Wudu)",
  },
  {
    order: 3,
    title: "Cleaning the Nose (Istinshaq)",
    instructions: "Sniff water gently into the nostrils, then blow it out (preferably using the left hand). Repeat three times.",
    instructions_roman_urdu: "Nathnon mein aahista se pani chadhayein, phir usay (tarjihan bayen haath se) nikaal dein. Teen martaba dohrayein.",
    importance: "Sunnah in most schools; obligatory in the Hanbali school, alongside rinsing the mouth.",
    common_mistakes: "- Sniffing too hard, causing discomfort.\n- Forgetting to actually expel the water afterward.",
    madhab_notes: "Same difference as rinsing the mouth — Hanbali view treats this as obligatory; other schools view it as strongly recommended.",
    hadith_reference: "Sahih al-Bukhari and Sahih Muslim (Humran's narration of 'Uthman's Wudu)",
  },
  {
    order: 4,
    title: "Washing the Face",
    instructions: "Wash your entire face, from the hairline to the chin and from ear to ear, three times, making sure water reaches every part, including a light beard if you have one.",
    instructions_roman_urdu: "Poora chehra dhoyein, hairline se thori tak aur ek kaan se doosre kaan tak, teen martaba, aur khayal rakhein ke pani har hisse tak pohanche, ba-shamool halki dari agar ho.",
    importance: "Fard (obligatory) — commanded directly in the Qur'an.",
    common_mistakes: "- Missing the hairline or jawline edges.\n- Not passing fingers through a thick beard.",
    madhab_notes: "Scholars differ on whether water must reach the skin beneath a thick beard or whether washing its visible surface is sufficient — most consider washing the visible surface of a thick beard sufficient.",
    hadith_reference: "Qur'an 5:6",
  },
  {
    order: 5,
    title: "Washing the Arms",
    instructions: "Wash the right arm from the fingertips to (and including) the elbow, three times, then do the same for the left arm.",
    instructions_roman_urdu: "Dahne baazu ko unglion ke sironse kohni tak (kohni ko shamil karte huye) teen martaba dhoyein, phir yehi amal bayen baazu ke liye karein.",
    importance: "Fard (obligatory) — commanded directly in the Qur'an.",
    common_mistakes: "- Not including the elbow itself.\n- Rushing through without covering the entire forearm.",
    hadith_reference: "Qur'an 5:6",
  },
  {
    order: 6,
    title: "Wiping the Head (Masah)",
    instructions: "Wipe over your head once with wet hands, from the front of the head to the back, covering as much of the head as reasonably possible.",
    instructions_roman_urdu: "Geele haathon se apne sar ka ek baar masah karein, sar ke aagle hisse se pichle hisse tak, jitna mumkin ho sar ka zyada hissa shamil karte huye.",
    importance: "Fard (obligatory) — commanded directly in the Qur'an.",
    common_mistakes: "- Wiping only a very small area when your school requires wiping most or all of the head.",
    madhab_notes: "The Shafi'i school considers wiping even a small portion of the head sufficient, while the Hanafi, Maliki, and Hanbali schools generally require wiping most or all of the head.",
    hadith_reference: "Qur'an 5:6",
  },
  {
    order: 7,
    title: "Wiping the Ears",
    instructions: "Using the water remaining on your hands from wiping the head, wipe the inside of your ears with your index fingers and the outside/back with your thumbs.",
    instructions_roman_urdu: "Sar ka masah karne se haathon par bacha hua pani istemal karte huye, apni shahadat wali unglion se kaanon ke andar ka aur angoothon se bahar/piche ka hissa masah karein.",
    importance: "Sunnah — considered by most scholars to be part of the same act as wiping the head, rather than a separate washing.",
    common_mistakes: "- Using fresh water instead of what remains from wiping the head (most scholars prefer reusing the same water).",
    hadith_reference: "Sunan Abu Dawud and Sunan Ibn Majah (narrations describing the Prophet ﷺ wiping his ears as part of Wudu)",
  },
  {
    order: 8,
    title: "Washing the Feet",
    instructions: "Wash the right foot up to and including the ankle, three times, making sure water reaches between the toes, then do the same for the left foot.",
    instructions_roman_urdu: "Dahna paon takhne tak (takhna shamil karte huye) teen martaba dhoyein, aur khayal rakhein ke pani ungliyon ke darmiyan bhi pohanche, phir yehi amal bayen paon ke liye karein.",
    importance: "Fard (obligatory) — commanded directly in the Qur'an.",
    common_mistakes: "- Missing the ankle bone itself.\n- Not washing between the toes.",
    hadith_reference: "Qur'an 5:6; Sahih al-Bukhari (the warning about dry heels left unwashed); Sunan Abu Dawud and Sunan al-Tirmidhi (instruction to wash between the toes)",
  },
  {
    order: 9,
    title: "Completing Wudu",
    arabic_text: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    transliteration: "Ash-hadu an la ilaha illallah wahdahu la sharika lah, wa ash-hadu anna Muhammadan 'abduhu wa rasuluh",
    translation: "I bear witness that there is no god but Allah alone, without any partner, and I bear witness that Muhammad is His servant and Messenger.",
    instructions: "With Wudu now complete, recite the testimony of faith below. It only takes a few seconds and carries a specific promised reward mentioned in an authentic hadith.",
    instructions_roman_urdu: "Wudu mukammal hone ke baad, neeche di gayi shahadat parhein. Ye sirf chand second lete hain aur ek sahih hadith mein iske liye khaas ajar ka wa'da kiya gaya hai.",
    importance: "Sunnah — reciting this after Wudu carries a specific promised reward.",
    common_mistakes: "- Rushing away immediately without pausing for this dua.",
    hadith_reference: "Sahih Muslim (on the reward for reciting the testimony of faith after completing Wudu)",
  },
];
