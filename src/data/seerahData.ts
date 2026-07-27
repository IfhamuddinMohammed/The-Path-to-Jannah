export interface SeerahEvent {
  id: string;
  yearCE: string;
  yearAH?: string;
  title: string;
  titleArabic?: string;
  era: 'early' | 'prophethood' | 'medina';
  description: string;
  detailedText: string;
  keyLessons: string[];
  authenticSources: string[];
}

export interface SeerahLocation {
  name: string;
  arabicName: string;
  significance: string;
  eventsCount: number;
}

export interface ProphetName {
  arabic: string;
  transliteration: string;
  meaning: string;
  reference?: string;
}

export interface CharacterTrait {
  trait: string;
  arabicTrait: string;
  description: string;
  hadithCitation: string;
}

export const PROPHET_NAMES: ProphetName[] = [
  { arabic: "محمد", transliteration: "Muhammad", meaning: "The Praised One", reference: "Surah Ali 'Imran 3:144" },
  { arabic: "أحمد", transliteration: "Ahmad", meaning: "The Most Praised", reference: "Surah As-Saff 61:6" },
  { arabic: "الماحي", transliteration: "Al-Mahi", meaning: "The Eraser (of disbelief)", reference: "Sahih al-Bukhari 3532" },
  { arabic: "الحاشر", transliteration: "Al-Hashir", meaning: "The Gatherer", reference: "Sahih al-Bukhari 3532" },
  { arabic: "العاقب", transliteration: "Al-'Aqib", meaning: "The Last in Succession", reference: "Sahih al-Bukhari 3532" },
  { arabic: "نبي الرحمة", transliteration: "Nabi-yur-Rahmah", meaning: "The Prophet of Mercy", reference: "Sahih Muslim 2354" }
];

export const KEY_LOCATIONS: SeerahLocation[] = [
  { name: "Makkah Al-Mukarramah", arabicName: "مكة المكرمة", significance: "Birthplace of the Prophet ﷺ, location of the Kaaba, and site of early revelation.", eventsCount: 18 },
  { name: "Madinah Al-Munawwarah", arabicName: "المدينة المنورة", significance: "The city of migration (Hijra), establishment of the first Islamic state and Masjid An-Nabawi.", eventsCount: 24 },
  { name: "Cave Hira (Jabal Al-Nour)", arabicName: "غار حراء", significance: "Where Angel Jibril delivered the first revelation of the Holy Qur'an.", eventsCount: 2 },
  { name: "Ta'if", arabicName: "الطائف", significance: "Site of hardship where the Prophet ﷺ showed ultimate patience and prayed for his persecutors.", eventsCount: 3 },
  { name: "Badr", arabicName: "بدر", significance: "Location of the decisive first battle that established the Muslim community.", eventsCount: 1 }
];

export const CHARACTER_TRAITS: CharacterTrait[] = [
  {
    trait: "As-Sadiq Al-Amin (Truthful & Trustworthy)",
    arabicTrait: "الصادق الأمين",
    description: "Even before prophethood, the Quraysh trusted him with their most valuable belongings due to his absolute honesty.",
    hadithCitation: "Ar-Raheeq Al-Makhtum"
  },
  {
    trait: "Unmatched Forgiveness & Mercy",
    arabicTrait: "الرحمة والمغفرة",
    description: "During the Conquest of Makkah, he pardoned those who persecuted him for decades, declaring: 'Go, for you are free.'",
    hadithCitation: "Sunan Al-Kubra 18275"
  },
  {
    trait: "Generosity and Selflessness",
    arabicTrait: "الجود والكرم",
    description: "He never turned away anyone asking for help and spent everything he possessed for the sake of Allah.",
    hadithCitation: "Sahih al-Bukhari 3554"
  }
];

export const SEERAH_TIMELINE: SeerahEvent[] = [
  {
    id: "birth",
    yearCE: "570 CE",
    title: "Birth of Prophet Muhammad ﷺ",
    titleArabic: "مولد النبي صلى الله عليه وسلم",
    era: "early",
    description: "Born in Makkah in the Year of the Elephant to Aminah bint Wahb and Abdullah ibn Abd al-Muttalib.",
    detailedText: "Prophet Muhammad ﷺ was born an orphan; his father Abdullah passed away prior to his birth. He was entrusted to Halimah As-Sa'diyyah in the desert as per Arab custom for early upbringing.",
    keyLessons: ["Trust in Allah's decree during orphanhood", "Purity of character in youth"],
    authenticSources: ["Ar-Raheeq Al-Makhtum, p. 52", "Sahih Ibn Hibban"]
  },
  {
    id: "rebuilding-kaaba",
    yearCE: "605 CE",
    title: "Arbitration of the Black Stone (Hajar al-Aswad)",
    titleArabic: "تحكيم الحجر الأسود",
    era: "early",
    description: "Resolved a major tribal feud over placing the Black Stone during the Kaaba's reconstruction.",
    detailedText: "When Quraysh rebuilt the Kaaba, tribes fought over who would carry the Black Stone. Muhammad ﷺ placed it on a cloak and asked leaders of all tribes to raise it together, preventing bloodshed.",
    keyLessons: ["Wisdom in dispute resolution", "Unifying leadership"],
    authenticSources: ["Musnad Ahmad 15502"]
  },
  {
    id: "first-revelation",
    yearCE: "610 CE",
    title: "The First Revelation in Cave Hira",
    titleArabic: "نزول الوحي الأول",
    era: "prophethood",
    description: "Angel Jibril (Gabriel) revealed the first five verses of Surah Al-'Alaq.",
    detailedText: "At age 40, while isolating in worship in Cave Hira, Angel Jibril appeared commanding him 'Iqra!' (Read!). He returned home trembling to his wife Khadijah (RA), who reassured him of his virtuous character.",
    keyLessons: ["Importance of seeking knowledge", "Support of a righteous spouse"],
    authenticSources: ["Sahih al-Bukhari 3", "Sahih Muslim 160"]
  },
  {
    id: "public-da'wah",
    yearCE: "613 CE",
    title: "Public Call at Mount Safa",
    titleArabic: "الجهر بالدعوة على الصفا",
    era: "prophethood",
    description: "The transition from private gathering (Dar al-Arqam) to public invitation to Islam.",
    detailedText: "The Prophet ﷺ climbed Mount Safa and asked the Quraysh if they would believe him if he warned of an approaching army. When they agreed due to his honesty, he openly called them to Tawhid.",
    keyLessons: ["Courage in speaking truth", "Leveraging established character"],
    authenticSources: ["Sahih al-Bukhari 4770"]
  },
  {
    id: "year-of-grief",
    yearCE: "619 CE",
    title: "The Year of Grief ('Am al-Huzn)",
    titleArabic: "عام الحزن",
    era: "prophethood",
    description: "The passing of his beloved wife Khadijah (RA) and his supportive uncle Abu Talib.",
    detailedText: "Within a short span, he lost his primary emotional support and his chief political protector. Shortly after, he visited Ta'if to seek refuge, where he was rejected, yet prayed for their guidance.",
    keyLessons: ["Patience (Sabr) during immense trials", "Compassion even toward hostile adversaries"],
    authenticSources: ["Ar-Raheeq Al-Makhtum, p. 132"]
  },
  {
    id: "isra-wal-miraj",
    yearCE: "621 CE",
    title: "The Night Journey & Ascension (Isra & Mi'raj)",
    titleArabic: "الإسراء والمعراج",
    era: "prophethood",
    description: "Miraculous journey from Makkah to Jerusalem, and ascension through the heavens where 5 daily prayers were prescribed.",
    detailedText: "Guided by Jibril on Al-Buraq, the Prophet ﷺ led all Prophets in prayer at Al-Aqsa, then ascended to the heavens where Allah obligated the 5 daily prayers (Salah) upon the Muslim nation.",
    keyLessons: ["Central importance of daily Salah", "Divine honor following hardship"],
    authenticSources: ["Surah Al-Isra 17:1", "Sahih al-Bukhari 3887"]
  },
  {
    id: "hijra-medina",
    yearCE: "622 CE",
    yearAH: "1 AH",
    title: "The Hijra (Migration to Madinah)",
    titleArabic: "الهجرة النبوية إلى المدينة",
    era: "medina",
    description: "Migration from Makkah to Yathrib (Madinah), establishing the Islamic calendar.",
    detailedText: "Escaping a plot on his life, the Prophet ﷺ and Abu Bakr (RA) traveled with careful planning and hiding in Cave Thawr. Arriving in Yathrib, he established brotherhood (Mu'akhah) between Ansar and Muhajirun.",
    keyLessons: ["Pairing trust in Allah (Tawakkul) with thorough planning", "Brotherhood over tribalism"],
    authenticSources: ["Sahih al-Bukhari 3905", "Surah At-Tawbah 9:40"]
  },
  {
    id: "conquest-makkah",
    yearCE: "630 CE",
    yearAH: "8 AH",
    title: "The Conquest of Makkah (Fath Makkah)",
    titleArabic: "فتح مكة",
    era: "medina",
    description: "Peaceful entry into Makkah with 10,000 Muslims, purifying the Kaaba of idols.",
    detailedText: "Following Quraysh's breach of the Treaty of Hudaybiyyah, the Muslim army entered Makkah peacefully. The Prophet ﷺ cleansed the Kaaba and granted general amnesty to all Makkans.",
    keyLessons: ["Humility in victory", "Power of unconditional forgiveness"],
    authenticSources: ["Sahih al-Bukhari 4280", "Sunan Al-Kubra 18275"]
  },
  {
    id: "farewell-pilgrimage",
    yearCE: "632 CE",
    yearAH: "10 AH",
    title: "The Farewell Pilgrimage & Sermon",
    titleArabic: "حجة الوداع والخطبة الشهيرة",
    era: "medina",
    description: "Delivered the historic universal human rights sermon at Mount Arafat.",
    detailedText: "Over 100,000 companions joined the Prophet ﷺ. He declared equality among races, rights of women, prohibition of usury (Riba), and protection of human life and property.",
    keyLessons: ["Universal human equality", "Finality of Islamic message"],
    authenticSources: ["Sahih Muslim 1218"]
  },
  {
    id: "return-to-allah",
    yearCE: "632 CE",
    yearAH: "11 AH",
    title: "Return to Allah (Passing Away)",
    titleArabic: "وفاة النبي صلى الله عليه وسلم",
    era: "medina",
    description: "Passed away in Madinah in the apartment of Aisha (RA) at age 63.",
    detailedText: "After completing the divine message, the Prophet ﷺ suffered a fever in his final days, appointing Abu Bakr (RA) to lead prayers. His final words were 'To the highest Companionship (Allah)'.",
    keyLessons: ["Fulfilling life purpose completely", "Focusing heart on the Hereafter"],
    authenticSources: ["Sahih al-Bukhari 4440", "Sahih Muslim 2444"]
  }
];
