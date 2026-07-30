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
    content: `Prayer (Salah) is the direct link between a believer and Allah. It is not a ritual performed out of obligation alone, but an act of remembrance, gratitude, and submission that shapes the rhythm of a Muslim's entire day.

Allah says in the Qur'an: *"Indeed, prayer has been decreed upon the believers a decree of specified times."* (Qur'an 4:103)

Beyond fulfilling a command, prayer:

- **Connects** — five times a day, the worshipper pauses whatever they are doing to stand before Allah.
- **Purifies** — the Prophet ﷺ compared the five daily prayers to a river a person bathes in five times a day, washing away sin (Sahih Muslim, the parable of the river).
- **Disciplines** — regular prayer builds consistency, mindfulness, and gratitude into daily life.
- **Unites** — praying in congregation, facing the same Qibla as every other Muslim on Earth, is a visible expression of the unity of the Ummah.

Prayer is ultimately an act of love and remembrance: *"And establish prayer for My remembrance."* (Qur'an 20:14)`,
    hadith_reference: "Qur'an 4:103; Qur'an 20:14; Sahih Muslim (the parable of the river)",
  },
  {
    section: "importance",
    order: 1,
    title: "The Importance of Salah",
    description: "Why prayer is considered the pillar of Islam",
    content: `Salah is the second of the Five Pillars of Islam and the first act of worship a person will be asked about on the Day of Judgment. The Prophet ﷺ said: *"The first thing for which a person will be brought to account on the Day of Resurrection is prayer. If it is sound, the rest of his deeds will be sound; if it is deficient, the rest of his deeds will be deficient."* (Sunan al-Tirmidhi, on the primacy of prayer)

The Prophet ﷺ also described prayer as the pillar of the religion: *"The head of the matter is Islam, its pillar is prayer, and its peak is jihad in the way of Allah."* (Sunan al-Tirmidhi)

If you have missed prayers, are inconsistent, or are only just learning — that is completely normal and nothing to feel discouraged about. What matters is starting, and building consistency one prayer at a time. Allah is Most Forgiving and Most Merciful, and every prayer offered sincerely is accepted and rewarded.`,
    hadith_reference: "Sunan al-Tirmidhi (on the primacy and pillar of prayer)",
  },
  {
    section: "conditions",
    order: 1,
    title: "Conditions of Prayer",
    description: "What must be true before a prayer is considered valid",
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
    madhab_notes: "Minor differences exist on some details — for example, the precise boundary of the Awrah, or whether Niyyah must be verbalized aloud rather than simply intended in the heart.",
    hadith_reference: "Qur'an 5:6 (purification before prayer); Qur'an 2:144 (facing the Qibla)",
  },
  {
    section: "who_must_pray",
    order: 1,
    title: "Who Must Pray",
    description: "Who prayer is obligatory upon, and who is exempted",
    content: `The five daily prayers are obligatory upon every Muslim who is sane and has reached puberty. Several groups are treated with specific accommodations:

- **Children** — not yet obligated, but parents are encouraged to introduce prayer gradually from around age seven, so it becomes second nature by puberty.
- **Those who are asleep or have forgotten** — not blamed, but should pray the missed prayer as soon as they remember or wake.
- **The sick** — prayer is adapted, not dropped: those unable to stand may sit, and those unable to sit may lie down and pray with whatever movement they can manage, even if only with the eyes or heart.
- **Travellers** — may shorten certain prayers and combine others, as a mercy given the hardship of travel.
- **Menstruating and post-natal bleeding women** — are exempted from prayer (and fasting) during that period, and do not need to make up the missed prayers afterward, unlike missed fasts.

The underlying principle across all of these rulings is that Allah does not intend to place a hardship on anyone — the *obligation* is constant, but *how* it is fulfilled adapts to a person's real circumstances.`,
    madhab_notes: "Exact ages/thresholds for children, and the specifics of combining prayers while travelling, vary somewhat by madhab.",
    hadith_reference: "Qur'an 2:286 (Allah does not burden a soul beyond its capacity); Sahih al-Bukhari (rulings on prayer for the sick)",
  },
  {
    section: "purity",
    order: 1,
    title: "Purity (Taharah)",
    description: "Understanding ritual purity and why it matters before prayer",
    content: `Taharah (purity) is a prerequisite for prayer — Allah says: *"Indeed, Allah loves those who purify themselves."* (Qur'an 2:222) There are two categories of impurity a Muslim must address:

**Minor impurity (Hadath Asghar)** — caused by everyday things like using the toilet, passing wind, or sleeping deeply. This is removed by performing **Wudu**.

**Major impurity (Hadath Akbar)** — caused by things like sexual intercourse, or for women, the end of a menstrual or post-natal bleeding cycle. This requires **Ghusl** (a full ritual bath covering the entire body).

If water is unavailable, or using it would be harmful, **Tayammum** — dry purification using clean earth or sand — may be used instead of either Wudu or Ghusl.

Purity is not just physical — it reflects an intention to approach prayer in a clean, prepared state, both outwardly and inwardly.`,
    hadith_reference: "Qur'an 2:222; Qur'an 5:6",
  },
  {
    section: "wudu_overview",
    order: 1,
    title: "Wudu — Overview",
    description: "What Wudu is, what breaks it, and when it's needed",
    content: `Wudu is the ritual washing that removes minor impurity and prepares a Muslim for prayer. Its method is described directly in the Qur'an:

*"O you who believe, when you rise to perform prayer, wash your faces and your hands to the elbows, wipe your heads, and wash your feet to the ankles."* (Qur'an 5:6)

**Wudu is required before** each of the five daily prayers (unless the previous Wudu is still intact), and is recommended before sleeping.

**Common things that break Wudu:**
- Using the toilet (urination, defecation, passing wind)
- Deep sleep or loss of consciousness
- Bleeding or discharge from the private parts

Once Wudu is broken, it must be performed again before the next prayer. A single Wudu can be used for multiple prayers as long as nothing has broken it in between — there's no need to repeat it unnecessarily.

For the full step-by-step method, open the interactive **How to Perform Wudu** tutorial from the Prayer Academy hub.`,
    madhab_notes: "Scholars differ on a few specific things that break Wudu — for example, whether touching the opposite gender without a barrier, or bleeding from a wound, invalidates it. These differences don't change the core method, only some edge cases.",
    hadith_reference: "Qur'an 5:6",
  },
  {
    section: "tayammum",
    order: 1,
    title: "Tayammum (Dry Purification)",
    description: "The alternative to Wudu or Ghusl when water isn't available",
    content: `Tayammum is a mercy from Allah for situations where water is unavailable, insufficient, or would cause harm (such as illness where water would worsen the condition). It replaces both Wudu and Ghusl.

*"...and if you do not find water, then seek clean earth and wipe your faces and hands with it."* (Qur'an 5:6)

**How it's performed (general method):**
1. Make the intention to purify yourself for prayer.
2. Strike both palms gently on clean earth, sand, or a dust-bearing surface.
3. Wipe the face once with both hands.
4. Strike the palms again, then wipe each arm with the other hand.

Tayammum remains valid until the same things that would break Wudu occur, or until water becomes available again — at which point Wudu or Ghusl should be used once possible.`,
    madhab_notes: "Madhabs differ on some details — for example, whether the wiping covers the hands to the wrists or to the elbows, and exactly which surfaces qualify as 'clean earth.' The core method above is agreed upon across all four schools.",
    hadith_reference: "Qur'an 5:6; Qur'an 4:43",
  },
  {
    section: "awrah",
    order: 1,
    title: "Awrah — Covering Appropriately for Prayer",
    description: "What must be covered during prayer",
    content: `Awrah refers to the parts of the body that must be covered during prayer. Dressing appropriately is one of the conditions for a valid prayer.

**For men:** at minimum, the area between the navel and the knees must be covered. It's recommended to cover the shoulders as well, and to dress modestly and respectably for prayer rather than the bare minimum.

**For women:** the entire body must be covered except the face and hands, with loose, non-transparent clothing. A headscarf covering the hair is required during prayer.

The clothing should not be so tight or transparent that it reveals the shape of the body underneath. The Qur'an says: *"O children of Adam, take your adornment [wear your best clothing] at every masjid."* (Qur'an 7:31)`,
    madhab_notes: "Scholars differ slightly on some specifics — for example, whether a woman's feet must be covered, and the precise boundary of a man's Awrah. Dress modestly, and consult a knowledgeable teacher for your specific situation if unsure.",
    hadith_reference: "Qur'an 7:31; Qur'an 24:31",
  },
  {
    section: "facing_qibla",
    order: 1,
    title: "Facing the Qibla",
    description: "Why Muslims face the Ka'bah, and what to do if unsure of the direction",
    content: `Every prayer must be performed facing the Qibla — the direction of the Ka'bah in Makkah.

*"So turn your face toward the Sacred Mosque. And wherever you [believers] are, turn your faces toward it."* (Qur'an 2:144)

Facing the same direction, wherever a Muslim is on Earth, is a powerful expression of the unity of the Ummah.

**If you don't know the exact direction:** make your best reasonable effort based on available information (a compass, a mosque's orientation, or Sirat's own Qibla finder). If it later turns out you were slightly off, your prayer is still valid — Allah does not hold a sincere, reasonable effort against a person.

Use Sirat's **Qibla** page for a live compass and map-based Qibla finder for your current location.`,
    hadith_reference: "Qur'an 2:144, 2:150",
  },
  {
    section: "prayer_times",
    order: 1,
    title: "The Five Prayer Times",
    description: "When each of the five daily prayers is due",
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
    madhab_notes: "Different calculation authorities use slightly different astronomical conventions (e.g. the angle of the sun defining the start of Fajr), which is why prayer-time apps let you choose a calculation method.",
    hadith_reference: "Qur'an 4:103; Qur'an 17:78; Qur'an 11:114",
  },
  {
    section: "adhan",
    order: 1,
    title: "The Adhan (Call to Prayer)",
    description: "The call announcing that a prayer's time has begun",
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
    madhab_notes: "The wording above reflects the standard Sunni Adhan used by the majority of mosques worldwide. Minor regional and historical variations in phrasing exist; follow your local mosque's practice if you notice small differences.",
    hadith_reference: "Sahih al-Bukhari and Sahih Muslim (wording and method of the Adhan)",
  },
  {
    section: "iqamah",
    order: 1,
    title: "The Iqamah (Second Call)",
    description: "The shorter call given just before the congregational prayer begins",
    content: `The Iqamah is a second, shorter call given immediately before the congregational prayer starts, signalling that everyone should stand and line up. It follows similar wording to the Adhan, but shorter, and adds one line:

> Qad qamat-is-Salah (The prayer has now begun) — said twice

Where the Adhan announces that a prayer's *time* has begun (and may be called well before the congregation gathers), the Iqamah signals that the prayer itself is about to start *right now* — everyone should stop talking, straighten the rows, and prepare to follow the Imam.

If praying alone (not in congregation), calling the Iqamah is not required, though some choose to say it quietly before beginning.`,
    madhab_notes: "The exact number of repetitions in the Iqamah varies slightly between schools — some traditions closely mirror the Adhan's repetitions, while others say each phrase only once.",
    hadith_reference: "Sahih al-Bukhari and Sahih Muslim (Adhan and Iqamah described together)",
  },
];

export const SEED_WUDU_STEPS = [
  {
    order: 1,
    title: "Niyyah & Washing the Hands",
    instructions: `Begin by making the intention (Niyyah) in your heart to perform Wudu for prayer — this doesn't need to be said out loud.

Say **"Bismillah"** (In the name of Allah), then wash both hands up to and including the wrists, three times, making sure water reaches between the fingers.`,
    importance: "Sunnah (recommended) — not obligatory in itself, but strongly encouraged to open Wudu correctly.",
    common_mistakes: "- Forgetting to wash between the fingers.\n- Not washing all the way up to the wrist.",
    madhab_notes: "Saying 'Bismillah' before starting is at least a recommended practice in all schools; some scholars consider it obligatory if remembered.",
    hadith_reference: "Sahih Muslim (Humran's narration describing 'Uthman's Wudu, the basis for most descriptions of the Prophet's ﷺ method)",
  },
  {
    order: 2,
    title: "Rinsing the Mouth",
    instructions: "Take water into your mouth, swish it around thoroughly, and spit it out. Repeat three times.",
    importance: "Sunnah in most schools; some Hanbali scholars consider it part of the obligatory act of washing the face.",
    common_mistakes: "- Rinsing too quickly without actually swishing the water around.\n- Skipping this step out of haste.",
    madhab_notes: "Hanafi and Shafi'i view this as Sunnah; some Hanbali scholars hold it to be obligatory alongside washing the face.",
    hadith_reference: "Sahih Muslim (Humran's narration of 'Uthman's Wudu)",
  },
  {
    order: 3,
    title: "Cleaning the Nose (Istinshaq)",
    instructions: "Sniff water gently into the nostrils, then blow it out (preferably using the left hand). Repeat three times.",
    importance: "Sunnah in most schools; obligatory in the Hanbali school, alongside rinsing the mouth.",
    common_mistakes: "- Sniffing too hard, causing discomfort.\n- Forgetting to actually expel the water afterward.",
    madhab_notes: "Same difference as rinsing the mouth — Hanbali view treats this as obligatory; other schools view it as strongly recommended.",
    hadith_reference: "Sahih al-Bukhari and Sahih Muslim (Humran's narration of 'Uthman's Wudu)",
  },
  {
    order: 4,
    title: "Washing the Face",
    instructions: "Wash your entire face, from the hairline to the chin and from ear to ear, three times, making sure water reaches every part, including a light beard if you have one.",
    importance: "Fard (obligatory) — commanded directly in the Qur'an.",
    common_mistakes: "- Missing the hairline or jawline edges.\n- Not passing fingers through a thick beard.",
    madhab_notes: "Scholars differ on whether water must reach the skin beneath a thick beard or whether washing its visible surface is sufficient — most consider washing the visible surface of a thick beard sufficient.",
    hadith_reference: "Qur'an 5:6",
  },
  {
    order: 5,
    title: "Washing the Arms",
    instructions: "Wash the right arm from the fingertips to (and including) the elbow, three times, then do the same for the left arm.",
    importance: "Fard (obligatory) — commanded directly in the Qur'an.",
    common_mistakes: "- Not including the elbow itself.\n- Rushing through without covering the entire forearm.",
    hadith_reference: "Qur'an 5:6",
  },
  {
    order: 6,
    title: "Wiping the Head (Masah)",
    instructions: "Wipe over your head once with wet hands, from the front of the head to the back, covering as much of the head as reasonably possible.",
    importance: "Fard (obligatory) — commanded directly in the Qur'an.",
    common_mistakes: "- Wiping only a very small area when your school requires wiping most or all of the head.",
    madhab_notes: "The Shafi'i school considers wiping even a small portion of the head sufficient, while the Hanafi, Maliki, and Hanbali schools generally require wiping most or all of the head.",
    hadith_reference: "Qur'an 5:6",
  },
  {
    order: 7,
    title: "Wiping the Ears",
    instructions: "Using the water remaining on your hands from wiping the head, wipe the inside of your ears with your index fingers and the outside/back with your thumbs.",
    importance: "Sunnah — considered by most scholars to be part of the same act as wiping the head, rather than a separate washing.",
    common_mistakes: "- Using fresh water instead of what remains from wiping the head (most scholars prefer reusing the same water).",
    hadith_reference: "Sunan Abu Dawud and Sunan Ibn Majah (narrations describing the Prophet ﷺ wiping his ears as part of Wudu)",
  },
  {
    order: 8,
    title: "Washing the Feet",
    instructions: "Wash the right foot up to and including the ankle, three times, making sure water reaches between the toes, then do the same for the left foot.",
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
    importance: "Sunnah — reciting this after Wudu carries a specific promised reward.",
    common_mistakes: "- Rushing away immediately without pausing for this dua.",
    hadith_reference: "Sahih Muslim (on the reward for reciting the testimony of faith after completing Wudu)",
  },
];
