// audioSrc points at a shared local placeholder tone — no real nasheed
// recordings exist in this project yet. Swap in real hosted audio URLs here
// once licensed recordings are available; everything else (player, mini-bar,
// progress) already works against this placeholder.
const PLACEHOLDER_AUDIO = "/audio/nasheed-placeholder.wav";

export const kidsNasheeds = [
  {
    id: "arabic-alphabet-song",
    title: "The Arabic Alphabet Song",
    category: "Learning",
    duration: "2:15",
    emoji: "🔤",
    audioSrc: PLACEHOLDER_AUDIO,
  },
  {
    id: "bismillah-before-we-eat",
    title: "Bismillah (Before We Eat)",
    category: "Daily Manners",
    duration: "1:48",
    emoji: "🍽️",
    audioSrc: PLACEHOLDER_AUDIO,
  },
  {
    id: "five-pillars",
    title: "Five Pillars of Islam",
    category: "Basics of Faith",
    duration: "2:40",
    emoji: "🕋",
    audioSrc: PLACEHOLDER_AUDIO,
  },
  {
    id: "asma-ul-husna",
    title: "Asma-ul-Husna (Names of Allah)",
    category: "Remembrance",
    duration: "3:05",
    emoji: "📿",
    audioSrc: PLACEHOLDER_AUDIO,
  },
];
