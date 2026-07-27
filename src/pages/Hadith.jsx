import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Search, Book, ChevronsRight } from "lucide-react";
import { HADITH_COLLECTIONS, HADITH_TOPICS, SAMPLE_HADITHS } from "@/data/hadithData";
import LanguageToggle from "@/components/hadith/LanguageToggle";
import HadithCard from "@/components/hadith/HadithCard";
import { cn } from "@/lib/utils";

export default function HadithPage() {
  const [selectedCollection, setSelectedCollection] = useState("Sahih Muslim");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("Arabic + English");

  const activeCollectionStats = HADITH_COLLECTIONS.find((c) => c.name === selectedCollection);

  const filteredHadiths = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return SAMPLE_HADITHS.filter((h) => {
      if (h.collection !== selectedCollection) return false;
      if (selectedTopic !== "All Topics" && h.topic !== selectedTopic) return false;
      if (query && !(h.english.toLowerCase().includes(query) || h.narrator.toLowerCase().includes(query))) {
        return false;
      }
      return true;
    });
  }, [selectedCollection, selectedTopic, searchQuery]);

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
                {HADITH_COLLECTIONS.map((collection) => (
                  <div
                    key={collection.name}
                    className={cn(
                      "p-4 border-b border-border cursor-pointer transition-colors",
                      selectedCollection === collection.name
                        ? "bg-accent/10 border-l-4 border-l-accent"
                        : "hover:bg-accent/5"
                    )}
                    onClick={() => setSelectedCollection(collection.name)}
                  >
                    <h4 className="font-medium text-primary flex items-center justify-between font-body">
                      {collection.name}
                      {selectedCollection === collection.name && <ChevronsRight className="w-4 h-4 text-accent shrink-0" />}
                    </h4>
                    {selectedCollection === collection.name && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {collection.name} • {collection.count} Hadiths
                      </p>
                    )}
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
                {activeCollectionStats && (
                  <p className="text-xs text-muted-foreground">
                    {activeCollectionStats.name} • {activeCollectionStats.count} Hadiths
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {HADITH_TOPICS.map((topic) => (
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
                      {topic}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
