// Per-route <title>/description, keyed by the exact path strings used in src/App.jsx's <Route>
// definitions. Every route previously rendered under the same static "SIRAT" title with no
// description at all — src/components/seo/Seo.jsx reads this map (via the current route's
// pathname) to fix that. Add an entry here whenever a new <Route> is added to App.jsx; unmapped
// paths fall back to DEFAULT_META rather than rendering nothing.
export const DEFAULT_META = {
  title: "SIRAT — Guiding Hearts Toward Islam",
  description:
    "A free, authentic Islamic platform: the Qur'an with translations and audio, Hadith, Seerah, prayer times, Qibla finder, and daily worship tools — grounded in the Qur'an and Sunnah.",
};

export const PAGE_META = {
  "/": {
    title: "SIRAT — Qur'an, Hadith & Daily Worship Tools",
    description:
      "Read the Qur'an with translations and audio recitation, explore Hadith and the Seerah, find prayer times and Qibla direction, and learn to pray — all free, forever.",
  },
  "/Home": {
    title: "SIRAT — Qur'an, Hadith & Daily Worship Tools",
    description:
      "Read the Qur'an with translations and audio recitation, explore Hadith and the Seerah, find prayer times and Qibla direction, and learn to pray — all free, forever.",
  },
  "/Quran": {
    title: "Read the Holy Qur'an Online — Translation & Audio | SIRAT",
    description:
      "Read the Qur'an online with English translation, transliteration, and audio recitation from renowned Qaris. Bookmark verses, track your reading progress, and download surahs offline.",
  },
  "/Guidance": {
    title: "Islamic Guidance & Articles | SIRAT",
    description:
      "Practical, authentic Islamic guidance and articles on faith, worship, and daily life, sourced from the Qur'an and Sunnah.",
  },
  "/Hadith": {
    title: "Hadith Collection — Sahih al-Bukhari, Sahih Muslim & More | SIRAT",
    description:
      "Browse and search authentic Hadith from Sahih al-Bukhari, Sahih Muslim, and other major collections, with translations and references.",
  },
  "/Stories": {
    title: "Islamic Stories — Prophets & Companions | SIRAT",
    description:
      "Stories of the Prophets and the Companions of the Prophet Muhammad ﷺ, told with authentic sources and lessons for today.",
  },
  "/Videos": {
    title: "Islamic Lecture Videos | SIRAT",
    description:
      "Curated Islamic lecture and Seerah video series from well-known scholars, organized by topic.",
  },
  "/Duas": {
    title: "Duas — Daily Islamic Supplications | SIRAT",
    description:
      "Authentic duas (supplications) for daily life, with Arabic text, transliteration, and translation, sourced from the Qur'an and Sunnah.",
  },
  "/FAQ": {
    title: "Frequently Asked Questions | SIRAT",
    description: "Answers to common questions about Islam, worship, and using the SIRAT platform.",
  },
  "/Community": {
    title: "Community | SIRAT",
    description: "Connect with the SIRAT community — share reflections, ask questions, and support one another in faith.",
  },
  "/PrayerTimes": {
    title: "Prayer Times — Accurate Salah Times for Your Location | SIRAT",
    description:
      "Accurate daily prayer (Salah) times for your exact location, with Adhan notifications and multiple calculation methods.",
  },
  "/Qibla": {
    title: "Qibla Direction Finder | SIRAT",
    description: "Find the exact Qibla direction toward the Ka'bah from your current location, with a live compass and map.",
  },
  "/Names": {
    title: "99 Names of Allah (Asma-ul-Husna) | SIRAT",
    description: "The 99 Names of Allah (Asma-ul-Husna) with Arabic, transliteration, and meaning.",
  },
  "/Tasbeeh": {
    title: "Digital Tasbeeh Counter | SIRAT",
    description: "A simple digital Tasbeeh counter for dhikr and daily remembrance of Allah.",
  },
  "/Seerah": {
    title: "Seerah of Prophet Muhammad ﷺ — Full Life History | SIRAT",
    description:
      "The complete, sourced life story of Prophet Muhammad ﷺ — birth, prophethood, migration to Madinah, and the major events of his life, with an interactive timeline reader.",
  },
  "/Quiz": {
    title: "Islamic Knowledge Quiz | SIRAT",
    description: "Test and grow your Islamic knowledge with quizzes covering the Qur'an, Hadith, Seerah, and Fiqh.",
  },
  "/Kids": {
    title: "Kids Corner — Islamic Learning for Children | SIRAT",
    description: "Fun, age-appropriate Islamic learning content for children — stories, lessons, and activities.",
  },
  "/NewMuslims": {
    title: "For New Muslims — Getting Started in Islam | SIRAT",
    description: "Essential guidance for new Muslims: the basics of belief, prayer, and daily practice, explained simply.",
  },
  "/Fiqh": {
    title: "Fiqh Rulings | SIRAT",
    description: "Islamic Fiqh rulings on everyday matters, presented clearly with sourcing and, where relevant, differences between schools of thought.",
  },
  "/Huqooq": {
    title: "Huqooq — Rights in Islam | SIRAT",
    description: "Understanding the rights (Huqooq) Islam establishes — of Allah, of others, and of oneself.",
  },
  "/About": {
    title: "About SIRAT",
    description: "Learn about SIRAT's mission: a free, authentic Islamic platform built to make the Qur'an, Hadith, and guidance accessible to everyone, everywhere.",
  },
  "/MosqueFinder": {
    title: "Find Nearby Mosques | SIRAT",
    description: "Find mosques near your current location, with directions and prayer facility details.",
  },
  "/PrayerAcademy": {
    title: "Prayer Academy — Learn How to Pray | SIRAT",
    description:
      "Learn how to perform Wudu and pray Salah step by step, with an interactive rak'ah walkthrough, the Sunnah/Farz/Nafl breakdown for every prayer, and lessons on Jummah and Eid.",
  },
};
