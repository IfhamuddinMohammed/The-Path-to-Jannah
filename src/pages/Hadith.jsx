import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, Search, Book, ChevronRight, ArrowLeft, AlertCircle } from "lucide-react";
import LanguageToggle from "@/components/hadith/LanguageToggle";
import HadithCard from "@/components/hadith/HadithCard";
import { HADITH_COLLECTIONS } from "@/data/hadithCollections";
import { useHadithBook } from "@/hooks/useHadithBook";
import { cn } from "@/lib/utils";

export default function HadithPage() {
  const [selectedCollectionKey, setSelectedCollectionKey] = useState(null);
  const [selectedBookNumber, setSelectedBookNumber] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("Arabic + English");

  const selectedCollection = HADITH_COLLECTIONS.find((c) => c.key === selectedCollectionKey) || null;
  const selectedBook = selectedCollection?.books.find((b) => b.number === selectedBookNumber) || null;
  const needsUrdu = language === "Urdu (اردو)";

  const { hadiths, loading, error } = useHadithBook(selectedCollectionKey, selectedBookNumber, needsUrdu);

  const displayHadiths = useMemo(
    () =>
      hadiths.map((h) => ({
        ...h,
        collection: selectedCollection?.name,
        reference: `${selectedCollection?.name} #${h.hadithnumber}`,
      })),
    [hadiths, selectedCollection]
  );

  const filteredHadiths = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return displayHadiths;
    return displayHadiths.filter(
      (h) =>
        h.english?.toLowerCase().includes(query) ||
        h.narrator?.toLowerCase().includes(query)
    );
  }, [displayHadiths, searchQuery]);

  const selectCollection = (key) => {
    setSelectedCollectionKey(key);
    setSelectedBookNumber(null);
    setSearchQuery("");
  };

  const selectBook = (number) => {
    setSelectedBookNumber(number);
    setSearchQuery("");
  };

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
            Explore the six canonical collections of Prophet Muhammad's ﷺ sayings and teachings
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <LanguageToggle value={language} onChange={setLanguage} />
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Collections list — hidden on mobile once a collection is picked */}
          <div className={cn("lg:col-span-1 space-y-4", selectedCollectionKey ? "hidden lg:block" : "")}>
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
                    key={collection.key}
                    className={cn(
                      "p-4 border-b border-border cursor-pointer transition-colors",
                      selectedCollectionKey === collection.key
                        ? "bg-accent/10 border-l-4 border-l-accent"
                        : "hover:bg-accent/5"
                    )}
                    onClick={() => selectCollection(collection.key)}
                  >
                    <h4 className="font-medium text-primary flex items-center justify-between font-body gap-2">
                      <span className="min-w-0 truncate">{collection.name}</span>
                      {selectedCollectionKey === collection.key && (
                        <ChevronRight className="w-4 h-4 text-accent shrink-0" />
                      )}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {collection.books.length} books • {collection.totalHadiths.toLocaleString()} hadiths
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            {!selectedCollection ? (
              <Card className="bg-card border-border glow-shadow">
                <CardContent className="p-12 text-center">
                  <Book className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-display text-xl font-medium text-primary mb-2">
                    Select a Collection
                  </h3>
                  <p className="text-muted-foreground">
                    Choose one of the six canonical collections to browse its books.
                  </p>
                </CardContent>
              </Card>
            ) : !selectedBook ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden mb-4 -ml-2"
                  onClick={() => selectCollection(null)}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collections
                </Button>
                <Card className="bg-card border-border glow-shadow">
                  <CardHeader>
                    <CardTitle className="font-display text-primary">{selectedCollection.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {selectedCollection.books.length} books • {selectedCollection.totalHadiths.toLocaleString()}{" "}
                      hadiths
                    </p>
                  </CardHeader>
                  <CardContent className="p-0">
                    {selectedCollection.books.map((book) => (
                      <div
                        key={book.number}
                        className="p-4 border-b border-border last:border-b-0 cursor-pointer transition-colors hover:bg-accent/5"
                        onClick={() => selectBook(book.number)}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <h4 className="font-medium text-primary truncate">
                              {book.number}. {book.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Hadiths {book.firstHadith}–{book.lastHadith}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="mb-4 -ml-2" onClick={() => selectBook(null)}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to {selectedCollection.name}
                </Button>

                <Card className="mb-6 bg-card border-border glow-shadow">
                  <CardContent className="p-4 space-y-2">
                    <p className="font-medium text-primary">
                      {selectedBook.number}. {selectedBook.title}
                    </p>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search hadiths in this book..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  {loading ? (
                    Array(3)
                      .fill(0)
                      .map((_, i) => <Skeleton key={i} className="h-48 w-full rounded-lg" />)
                  ) : error ? (
                    <Card className="bg-card border-border glow-shadow">
                      <CardContent className="p-8 text-center text-muted-foreground">
                        <AlertCircle className="w-10 h-10 mx-auto text-destructive mb-3" />
                        {error}
                      </CardContent>
                    </Card>
                  ) : (
                    <>
                      {filteredHadiths.map((hadith) => (
                        <HadithCard key={hadith.id} hadith={hadith} language={language} />
                      ))}
                      {filteredHadiths.length === 0 && (
                        <Card className="bg-card border-border glow-shadow">
                          <CardContent className="p-8 text-center text-muted-foreground">
                            No Hadith found for this search query.
                          </CardContent>
                        </Card>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
