import { useState, useEffect, useMemo } from "react";
import { Hadith } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, Search, Book, ChevronsRight } from "lucide-react";
import LanguageToggle from "@/components/hadith/LanguageToggle";
import HadithCard from "@/components/hadith/HadithCard";
import { cn } from "@/lib/utils";

const COLLECTIONS = [
  "Sahih al-Bukhari",
  "Sahih Muslim",
  "Sunan an-Nasa'i",
  "Sunan Abi Dawood",
  "Jami` at-Tirmidhi",
  "Sunan Ibn Majah",
  "Riyad as-Salihin",
];

const TOPIC_LABELS = {
  faith: "Faith",
  prayer: "Prayer",
  charity: "Charity",
  fasting: "Fasting",
  pilgrimage: "Pilgrimage",
  family: "Family",
  akhlaq: "Manners (Akhlaq)",
  knowledge: "Knowledge",
  quran: "Qur'an",
  repentance: "Repentance",
  purity: "Purity (Taharah)",
};

export default function HadithPage() {
  const [hadiths, setHadiths] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState("Sahih Muslim");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("Arabic + English");

  useEffect(() => {
    const loadHadiths = async () => {
      setIsLoading(true);
      try {
        const data = await Hadith.list("-created_date");
        setHadiths(data);
      } catch (error) {
        console.error("Error loading hadiths:", error);
      }
      setIsLoading(false);
    };
    loadHadiths();
  }, []);

  const displayHadiths = useMemo(
    () =>
      hadiths.map((h) => ({
        id: h.id,
        collection: h.collection,
        reference: h.hadith_number ? `${h.collection} #${h.hadith_number}` : h.collection,
        narrator: h.narrator,
        topic: h.topic,
        authenticity: h.authenticity || "Sahih",
        arabic: h.arabic_text,
        english: h.english_text,
        urdu: h.urdu_text,
        romanUrdu: h.roman_urdu_text,
      })),
    [hadiths]
  );

  const collectionCounts = useMemo(() => {
    const counts = {};
    for (const h of displayHadiths) {
      counts[h.collection] = (counts[h.collection] || 0) + 1;
    }
    return counts;
  }, [displayHadiths]);

  const availableTopics = useMemo(() => {
    const topics = new Set(displayHadiths.map((h) => h.topic).filter(Boolean));
    return ["All Topics", ...Array.from(topics)];
  }, [displayHadiths]);

  const filteredHadiths = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return displayHadiths.filter((h) => {
      if (h.collection !== selectedCollection) return false;
      if (selectedTopic !== "All Topics" && h.topic !== selectedTopic) return false;
      if (
        query &&
        !(h.english?.toLowerCase().includes(query) || h.narrator?.toLowerCase().includes(query))
      ) {
        return false;
      }
      return true;
    });
  }, [displayHadiths, selectedCollection, selectedTopic, searchQuery]);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-accent/40"></div>
            <MessageSquare className="w-12 h-12 text-accent" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-accent/40"></div>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-2">
            Authentic Hadith
          </h1>
          <p className="text-2xl text-accent mb-2 arabic-font">الحديث الشريف</p>
          <p className="text-muted-foreground font-body">
            Explore the sayings and teachings of Prophet Muhammad ﷺ
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <LanguageToggle value={language} onChange={setLanguage} />
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card className="lg:sticky lg:top-20 bg-card border-border glow-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-primary">
                  <Book className="w-5 h-5 text-accent" />
                  Collections
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {COLLECTIONS.map((collectionName) => (
                  <div
                    key={collectionName}
                    className={cn(
                      "p-4 border-b border-border cursor-pointer transition-colors",
                      selectedCollection === collectionName
                        ? "bg-accent/10 border-l-4 border-l-accent"
                        : "hover:bg-accent/5"
                    )}
                    onClick={() => setSelectedCollection(collectionName)}
                  >
                    <h4 className="font-medium text-primary flex items-center justify-between font-body">
                      {collectionName}
                      {selectedCollection === collectionName && (
                        <ChevronsRight className="w-4 h-4 text-accent shrink-0" />
                      )}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {collectionCounts[collectionName] || 0} Hadiths
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="mb-6 bg-card border-border glow-shadow">
              <CardContent className="p-4 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder={`Search in ${selectedCollection}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedCollection} • {collectionCounts[selectedCollection] || 0} Hadiths
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableTopics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => setSelectedTopic(topic)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                        selectedTopic === topic
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary text-muted-foreground border-border hover:bg-secondary/70"
                      )}
                    >
                      {topic === "All Topics" ? topic : TOPIC_LABELS[topic] || topic}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {isLoading ? (
                Array(3)
                  .fill(0)
                  .map((_, i) => <Skeleton key={i} className="h-48 w-full rounded-lg" />)
              ) : (
                <>
                  {filteredHadiths.map((hadith) => (
                    <HadithCard key={hadith.id} hadith={hadith} language={language} />
                  ))}
                  {filteredHadiths.length === 0 && (
                    <Card className="bg-card border-border glow-shadow">
                      <CardContent className="p-8 text-center text-muted-foreground">
                        No Hadith found for this collection or search query.
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
