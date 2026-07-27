export const duaCategories = ["Health", "Family", "Guidance", "Provision", "General"];

export const initialDuaRequests = [
  {
    id: "d1",
    name: null,
    gender: "sister",
    category: "Health",
    request: "Please make dua for my mother who is undergoing surgery next week. May Allah grant her a full and swift recovery.",
    timeAgo: "2 hours ago",
    aameenCount: 48,
  },
  {
    id: "d2",
    name: "Ahmed K.",
    gender: "brother",
    category: "Guidance",
    request: "Ya Allah, guide me in a difficult decision I need to make about my career. Please make dua that I choose the path that pleases Allah.",
    timeAgo: "5 hours ago",
    aameenCount: 31,
  },
  {
    id: "d3",
    name: null,
    gender: "brother",
    category: "Family",
    request: "Requesting dua for reconciliation between me and my brother. We haven't spoken in months and it weighs heavily on my heart.",
    timeAgo: "8 hours ago",
    aameenCount: 62,
  },
  {
    id: "d4",
    name: "Fatima R.",
    gender: "sister",
    category: "Provision",
    request: "Please make dua for ease in finding halal employment. It's been a tough few months for my family.",
    timeAgo: "1 day ago",
    aameenCount: 27,
  },
  {
    id: "d5",
    name: null,
    gender: "sister",
    category: "General",
    request: "Dua for all the Muslims suffering around the world, that Allah grants them ease, safety, and relief.",
    timeAgo: "1 day ago",
    aameenCount: 104,
  },
  {
    id: "d6",
    name: "Yusuf M.",
    gender: "brother",
    category: "Guidance",
    request: "Please make dua that I can memorize the Qur'an with sincerity and consistency. I keep struggling to stay disciplined.",
    timeAgo: "2 days ago",
    aameenCount: 39,
  },
];

export const postCategories = ["Reflection", "Verse Insight", "General Question"];
export const postFilters = ["All Posts", "Reflections", "Questions", "Most Popular"];

export const initialDiscussionPosts = [
  {
    id: "p1",
    authorName: "Sarah A.",
    authorRole: "Community Member",
    category: "Reflection",
    content: "Reading Surah Al-Kahf this Friday, the story of the two garden owners really struck me — how easily we can take blessings for granted. A good reminder to say Alhamdulillah more often.",
    timeAgo: "1 hour ago",
    likes: 23,
    comments: [
      { id: "c1", author: "Bilal H.", content: "SubhanAllah, that story always humbles me too.", timeAgo: "45 minutes ago" },
      { id: "c2", author: "Aisha N.", content: "JazakAllah khair for sharing this reflection.", timeAgo: "20 minutes ago" },
    ],
  },
  {
    id: "p2",
    authorName: "Omar F.",
    authorRole: "Verified Helper",
    category: "General Question",
    content: "A brother asked me today: is it permissible to combine Dhuhr and Asr prayers while traveling long distance by car? Would love to hear the community's understanding, though please confirm with a qualified scholar for a binding ruling.",
    timeAgo: "3 hours ago",
    likes: 15,
    comments: [
      { id: "c3", author: "Khalid S.", content: "Generally yes for musafir, but the specifics of distance/duration matter — worth checking Fiqh Rulings section.", timeAgo: "2 hours ago" },
    ],
  },
  {
    id: "p3",
    authorName: "Maryam T.",
    authorRole: "Community Member",
    category: "Verse Insight",
    content: "\"And whoever relies upon Allah — then He is sufficient for him.\" (65:3) — I've been repeating this verse to myself all week during a hard time. It genuinely brings peace.",
    timeAgo: "6 hours ago",
    likes: 41,
    comments: [],
  },
  {
    id: "p4",
    authorName: "Ibrahim D.",
    authorRole: "Community Member",
    category: "Reflection",
    content: "Small reminder for myself and everyone: consistency in small good deeds is beloved to Allah more than a burst of worship that fades. Even one dhikr a day, done consistently, is a means of growth.",
    timeAgo: "1 day ago",
    likes: 57,
    comments: [
      { id: "c4", author: "Layla Z.", content: "Needed to hear this today, thank you.", timeAgo: "20 hours ago" },
    ],
  },
];

export const newMuslimPosts = [
  {
    id: "n1",
    authorName: "Anonymous New Muslim",
    authorRole: "Community Member",
    category: "General Question",
    content: "I took my shahada three weeks ago and I'm still learning how to pray properly. Is it okay that I'm using a transliteration sheet during salah for now?",
    timeAgo: "4 hours ago",
    likes: 34,
    comments: [
      { id: "nc1", author: "Hassan B.", content: "Welcome to Islam! Yes, that's completely fine while you're learning — many of us started that way. Be proud of every step.", timeAgo: "3 hours ago" },
      { id: "nc2", author: "Amina W.", content: "MashaAllah, so happy for you. The Kids Corner and Guidance sections here also have simple prayer walkthroughs that might help.", timeAgo: "2 hours ago" },
    ],
  },
  {
    id: "n2",
    authorName: "Anonymous New Muslim",
    authorRole: "Community Member",
    category: "General Question",
    content: "How do I explain my new faith to my family without causing conflict? They're worried about me.",
    timeAgo: "1 day ago",
    likes: 52,
    comments: [
      { id: "nc3", author: "Verified Helper", content: "Patience and gentle consistency go a long way — showing good character often speaks louder than words. You're not alone in this, many of us have walked this path.", timeAgo: "22 hours ago" },
    ],
  },
];

export const communityStats = {
  duasToday: 37,
  activeDiscussions: 12,
};

export const dailyReflectionPrompt = "What Ayah from Surah Al-Kahf resonated with you today?";
