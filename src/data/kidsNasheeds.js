// No real, safely-licensed nasheed recordings could be sourced for this app —
// see the summary given to the user: paid-license catalogs (NoCopyrightNasheeds),
// unlicensed fan uploads (Archive.org), and stock-music instrumentals (Pixabay,
// bot-blocked anyway) were all checked and ruled out. Each track below instead
// gets its own distinct locally-generated placeholder tone (matching its mood)
// so at least the four cards don't sound identical. Swap in real licensed audio
// URLs here once available — everything else (player, mini-bar, progress) is
// already wired up and works against whatever audioSrc points to.
export const kidsNasheeds = [
  {
    id: "arabic-alphabet-song",
    title: "The Arabic Alphabet Song",
    category: "Learning",
    duration: "2:15",
    emoji: "🔤",
    audioSrc: "/audio/nasheed-alphabet-song.wav",
  },
  {
    id: "bismillah-before-we-eat",
    title: "Bismillah (Before We Eat)",
    category: "Daily Manners",
    duration: "1:48",
    emoji: "🍽️",
    audioSrc: "/audio/nasheed-bismillah.wav",
  },
  {
    id: "five-pillars",
    title: "Five Pillars of Islam",
    category: "Basics of Faith",
    duration: "2:40",
    emoji: "🕋",
    audioSrc: "/audio/nasheed-five-pillars.wav",
  },
  {
    id: "asma-ul-husna",
    title: "Asma-ul-Husna (Names of Allah)",
    category: "Remembrance",
    duration: "3:05",
    emoji: "📿",
    audioSrc: "/audio/nasheed-asma-ul-husna.wav",
  },
];
