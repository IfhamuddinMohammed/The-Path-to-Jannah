import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Search,
  Play,
  Pause,
  Bookmark,
  BookmarkCheck,
  Volume2,
  AlertCircle,
  Download,
  Trash2,
  CheckCircle,
  Loader2,
  Smartphone,
  Music,
  FileText,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { surahs as quranSurahs } from "@/data/quranData";
import { useQuranVerses } from "@/hooks/useQuranVerses";
import { useBookmarks } from "@/hooks/useBookmarks";
import VerseCard from "@/components/quran/VerseCard";
import { useQuranDownloads } from "@/hooks/useQuranDownloads";
import { useRomanUrdu } from "@/hooks/useRomanUrdu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

// Short, frequently-recited surahs surfaced as "Recommended" after finishing a surah.
const POPULAR_SURAH_IDS = [1, 18, 36, 55, 56, 67, 112, 113, 114];

function getRecommendedSurahs(excludeIds, count = 3) {
  return POPULAR_SURAH_IDS.filter((id) => !excludeIds.includes(id))
    .slice(0, count)
    .map((id) => quranSurahs.find((s) => s.id === id))
    .filter(Boolean);
}

const ARABIC_INDIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
function toArabicNumeral(num) {
  return String(num)
    .split("")
    .map((d) => ARABIC_INDIC_DIGITS[Number(d)] ?? d)
    .join("");
}

// Continuous, traditional Mushaf-style page — flowing justified Arabic text
// with a decorative ayah-end marker between verses, no per-verse cards/translations.
function ContinuousMushafView({ verses, loading, error, retry }) {
  if (loading) {
    return (
      <div className="mt-6 p-6 md:p-10 rounded-xl bg-card border border-border space-y-3">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-2/3" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 mx-auto text-destructive mb-4" />
        <p className="text-foreground font-medium mb-4">{error}</p>
        <Button variant="outline" size="sm" onClick={retry}>
          Try Again
        </Button>
      </div>
    );
  }

  if (!verses || verses.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No verses to display.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 p-6 md:p-10 rounded-xl bg-card border border-border relative overflow-hidden">
      <div className="absolute inset-0 geometric-bg opacity-20 pointer-events-none"></div>
      <p
        dir="rtl"
        className="relative arabic-font text-2xl md:text-3xl leading-loose text-primary text-justify"
      >
        {verses.map((verse) => (
          <span key={verse.numberInSurah}>
            {verse.arabic}
            <span className="text-accent mx-1" aria-hidden="true">
              {" "}
              ۝{toArabicNumeral(verse.numberInSurah)}{" "}
            </span>
          </span>
        ))}
      </p>
    </div>
  );
}

export default function QuranPage() {
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReciter, setSelectedReciter] = useState("mishary");
  const [activeTab, setActiveTab] = useState("translation");
  const [readingMode, setReadingMode] = useState("verse");
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const audioRef = useRef(null);

  const { verses, loading, error, retry, isOffline } = useQuranVerses(
    selectedSurah?.id,
    selectedReciter
  );
  const {
    isVerseBookmarked,
    isSurahBookmarked,
    toggleVerseBookmark,
    toggleSurahBookmark,
    savedVersesForSurah,
  } = useBookmarks();
  const {
    isDownloaded,
    downloadSurah,
    removeDownload,
    downloadProgress,
    downloadSurahToDevice,
    downloadSurahPDF,
    deviceDownloadProgress,
  } = useQuranDownloads();
  const { toast } = useToast();
  const { romanUrdu, loading: romanUrduLoading, error: romanUrduError } = useRomanUrdu(
    selectedSurah?.id,
    verses,
    activeTab === "romanurdu"
  );

  useEffect(() => {
    setCurrentPlaying(null);
    audioRef.current?.pause();
    if (selectedSurah) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedSurah?.id]);

  useEffect(() => {
    audioRef.current?.pause();
    setCurrentPlaying(null);
  }, [selectedReciter]);

  useEffect(() => {
    audioRef.current?.pause();
    setCurrentPlaying(null);
  }, [activeTab]);

  useEffect(() => {
    if (currentPlaying !== null && verses && audioRef.current) {
      audioRef.current.src = verses[currentPlaying].audio;
      audioRef.current.play().catch(() => setCurrentPlaying(null));
    }
  }, [currentPlaying]);

  const playVerse = (index) => {
    if (!verses || !verses[index]) return;
    if (currentPlaying === index) {
      audioRef.current?.pause();
      setCurrentPlaying(null);
      return;
    }
    audioRef.current?.pause();
    setCurrentPlaying(index);
  };

  const playAll = () => {
    if (verses && verses.length > 0) setCurrentPlaying(0);
  };

  const pauseAll = () => {
    audioRef.current?.pause();
    setCurrentPlaying(null);
  };

  const handleAudioEnded = () => {
    if (currentPlaying !== null && verses && currentPlaying + 1 < verses.length) {
      setCurrentPlaying(currentPlaying + 1);
    } else {
      setCurrentPlaying(null);
    }
  };

  const handleDownload = async () => {
    if (!selectedSurah) return;
    await downloadSurah(selectedSurah.id, selectedReciter);
    retry();
  };

  const handleRemoveDownload = async () => {
    if (!selectedSurah) return;
    await removeDownload(selectedSurah.id);
    retry();
  };

  const handleDownloadToDevice = async () => {
    if (!selectedSurah) return;
    const result = await downloadSurahToDevice(
      selectedSurah.id,
      selectedReciter,
      selectedSurah.name
    );
    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Audio download failed",
        description: "Couldn't fetch the recitation audio. Check your connection and try again.",
      });
    } else if (result.failedCount > 0) {
      toast({
        title: "Audio downloaded with some gaps",
        description: result.native
          ? `${result.failedCount} of ${result.totalCount} verses couldn't be fetched. Choose where to save the rest from the share sheet.`
          : `${result.failedCount} of ${result.totalCount} verses couldn't be fetched and were skipped.`,
      });
    } else if (result.native) {
      toast({
        title: "Choose where to save",
        description: `Pick Downloads, Drive, or Files to save ${selectedSurah.name} — Full Recitation.mp3.`,
      });
    } else {
      toast({
        title: "Audio downloaded",
        description: `${selectedSurah.name} — Full Recitation.mp3 saved to your device.`,
      });
    }
  };

  const handleDownloadPDF = async () => {
    if (!selectedSurah) return;
    const result = await downloadSurahPDF(
      selectedSurah.id,
      selectedSurah.name,
      selectedSurah.arabic
    );
    if (!result.success) {
      toast({
        variant: "destructive",
        title: "PDF download failed",
        description: "Something went wrong generating the PDF. Please try again.",
      });
    } else if (result.native) {
      toast({
        title: "Choose where to save",
        description: `Pick Downloads, Drive, or Files to save ${selectedSurah.name}.pdf.`,
      });
    } else {
      toast({
        title: "PDF downloaded",
        description: `${selectedSurah.name}.pdf saved to your device.`,
      });
    }
  };

  const surahBookmarked = selectedSurah
    ? isSurahBookmarked(selectedSurah.id)
    : false;
  const savedVerses = selectedSurah
    ? savedVersesForSurah(selectedSurah.id)
    : [];

  const selectedSurahIndex = selectedSurah
    ? quranSurahs.findIndex((s) => s.id === selectedSurah.id)
    : -1;
  const prevSurah = selectedSurahIndex > 0 ? quranSurahs[selectedSurahIndex - 1] : null;
  const nextSurah =
    selectedSurahIndex >= 0 && selectedSurahIndex < quranSurahs.length - 1
      ? quranSurahs[selectedSurahIndex + 1]
      : null;
  const recommendedSurahs = selectedSurah
    ? getRecommendedSurahs(
        [selectedSurah.id, prevSurah?.id, nextSurah?.id].filter((id) => id != null)
      )
    : [];

  const renderVerseList = (
    showTranslation,
    showTransliteration,
    verseList = verses
  ) => {
    if (loading) {
      return (
        <div className="space-y-4 mt-6">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="p-4 border border-border rounded-xl glow-shadow">
              <div className="flex items-start gap-4">
                <Skeleton className="h-9 w-9 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4 ml-auto" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 mx-auto text-destructive mb-4" />
          <p className="text-foreground font-medium mb-4">{error}</p>
          <Button variant="outline" size="sm" onClick={retry}>
            Try Again
          </Button>
        </div>
      );
    }

    if (!verseList || verseList.length === 0) {
      return (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No verses to display.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4 mt-6">
        {verseList.map((verse, index) => {
          const verseIndex = verses
            ? verses.findIndex((v) => v.numberInSurah === verse.numberInSurah)
            : -1;
          const actualIndex = verseIndex >= 0 ? verseIndex : index;
          return (
            <VerseCard
              key={`${verse.numberInSurah}-${index}`}
              verse={verse}
              surahName={selectedSurah?.name}
              isPlaying={currentPlaying === actualIndex}
              onTogglePlay={() => playVerse(actualIndex)}
              isBookmarked={isVerseBookmarked(
                selectedSurah.id,
                verse.numberInSurah
              )}
              onToggleBookmark={() =>
                toggleVerseBookmark({
                  surahNumber: selectedSurah.id,
                  ayahNumber: verse.numberInSurah,
                  surahName: selectedSurah.name,
                  surahArabic: selectedSurah.arabic,
                  arabic: verse.arabic,
                  translation: verse.translation,
                  transliteration: verse.transliteration,
                })
              }
              showTranslation={showTranslation}
              showTransliteration={showTransliteration}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <audio ref={audioRef} onEnded={handleAudioEnded} />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-accent/40"></div>
            <BookOpen className="w-12 h-12 text-accent" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-accent/40"></div>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-2">
            The Holy Qur'an
          </h1>
          <p className="text-2xl text-accent mb-2 arabic-font">القرآن الكريم</p>
          <p className="text-muted-foreground font-body">
            Read, listen, and reflect upon the words of Allah (SWT)
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 bg-card border-border glow-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search surahs by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={selectedReciter} onValueChange={setSelectedReciter}>
                <SelectTrigger className="w-full md:w-56">
                  <Volume2 className="w-4 h-4 mr-2 text-accent" />
                  <SelectValue placeholder="Reciter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mishary">Mishary Al-Afasy</SelectItem>
                  <SelectItem value="sudais">Abdul Rahman Al-Sudais</SelectItem>
                  <SelectItem value="husary">Mahmoud Khalil Al-Husary</SelectItem>
                  <SelectItem value="minshawi">
                    Mohamed Siddiq Al-Minshawi
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Surahs List — hidden on mobile once a surah is selected, so the reader takes over the screen */}
          <div className={`lg:col-span-1 ${selectedSurah ? "hidden lg:block" : ""}`}>
            <Card className="lg:sticky lg:top-20 bg-card border-border glow-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-primary">
                  <BookOpen className="w-5 h-5 text-accent" />
                  Surahs (Chapters)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 lg:max-h-96 lg:overflow-y-auto">
                {quranSurahs
                  .filter(
                    (surah) =>
                      !searchQuery ||
                      surah.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      surah.transliteration
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      surah.arabic.includes(searchQuery)
                  )
                  .map((surah) => (
                    <div
                      key={surah.id}
                      className={`p-4 border-b border-border cursor-pointer transition-colors ${
                        selectedSurah?.id === surah.id
                          ? "bg-accent/10 border-l-4 border-l-accent"
                          : "hover:bg-accent/5"
                      }`}
                      onClick={() => setSelectedSurah(surah)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-primary font-body">
                            {surah.id}. {surah.name}
                          </h4>
                          <p className="text-lg text-accent arabic-font">
                            {surah.arabic}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {surah.verses} verses
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {isDownloaded(surah.id) && (
                            <CheckCircle className="w-3 h-3 text-accent" />
                          )}
                          {isSurahBookmarked(surah.id) && (
                            <BookmarkCheck className="w-3 h-3 text-accent" />
                          )}
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              surah.revelation === "Meccan"
                                ? "bg-accent/10 text-accent border-accent/20"
                                : "bg-primary/10 text-primary border-primary/20"
                            }`}
                          >
                            {surah.revelation}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>

          {/* Quran Reader */}
          <div className="lg:col-span-2">
            {selectedSurah ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden mb-4 -ml-2"
                  onClick={() => setSelectedSurah(null)}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Surahs
                </Button>
                <Card className="bg-card border-border glow-shadow-lg overflow-hidden">
                <CardHeader className="border-b border-border">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div>
                      <CardTitle className="font-display text-2xl text-primary">
                        {selectedSurah.name}
                      </CardTitle>
                      <p className="text-2xl text-accent arabic-font mt-2">
                        {selectedSurah.arabic}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2 font-body">
                        {selectedSurah.verses} verses • {selectedSurah.revelation}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {currentPlaying !== null ? (
                        <Button variant="outline" size="sm" onClick={pauseAll}>
                          <Pause className="w-4 h-4 mr-2" /> Pause
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={playAll}
                          disabled={loading || !verses}
                        >
                          <Play className="w-4 h-4 mr-2" /> Play Surah
                        </Button>
                      )}
                      {isDownloaded(selectedSurah.id) ? (
                        <>
                          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                            <CheckCircle className="w-3 h-3 mr-1" /> Offline
                          </Badge>
                          <Button variant="outline" size="icon" onClick={handleRemoveDownload}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      ) : downloadProgress?.surahNumber === selectedSurah.id ? (
                        <div className="flex items-center gap-2 px-3">
                          <Loader2 className="w-4 h-4 animate-spin text-accent" />
                          <span className="text-sm text-muted-foreground">
                            {downloadProgress.current}/{downloadProgress.total}
                          </span>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" onClick={handleDownload} disabled={loading}>
                          <Download className="w-4 h-4 mr-2" /> Download
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          toggleSurahBookmark({
                            surahNumber: selectedSurah.id,
                            surahName: selectedSurah.name,
                            surahArabic: selectedSurah.arabic,
                            verses: selectedSurah.verses,
                            revelation: selectedSurah.revelation,
                          })
                        }
                      >
                        {surahBookmarked ? (
                          <BookmarkCheck className="w-4 h-4 text-accent" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </Button>
                      {deviceDownloadProgress ? (
                        <div className="flex items-center gap-2 px-3">
                          <Loader2 className="w-4 h-4 animate-spin text-accent" />
                          <span className="text-sm text-muted-foreground">
                            {deviceDownloadProgress.current}/{deviceDownloadProgress.total}
                          </span>
                        </div>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" title="Save to Device">
                              <Smartphone className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={handleDownloadToDevice}>
                              <Music className="w-4 h-4 mr-2" />
                              Audio (MP3)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleDownloadPDF}>
                              <FileText className="w-4 h-4 mr-2" />
                              Text (PDF)
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Bismillah */}
                  {selectedSurah.id !== 1 && selectedSurah.id !== 9 && (
                    <div className="text-center mb-8 p-6 rounded-xl bg-gradient-to-br from-accent/8 to-primary/8 gold-border relative overflow-hidden">
                      <div className="absolute inset-0 geometric-bg opacity-50"></div>
                      <p className="relative text-2xl arabic-font text-accent mb-2">
                        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                      </p>
                      <p className="relative text-sm text-muted-foreground italic font-body">
                        In the name of Allah, the Most Gracious, the Most Merciful
                      </p>
                    </div>
                  )}

                  {/* Reading mode toggle */}
                  <div className="flex justify-center mb-6">
                    <div className="inline-flex p-1 rounded-full bg-muted border border-border">
                      <button
                        type="button"
                        onClick={() => setReadingMode("verse")}
                        className={cn(
                          "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                          readingMode === "verse"
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        Verse View
                      </button>
                      <button
                        type="button"
                        onClick={() => setReadingMode("page")}
                        className={cn(
                          "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                          readingMode === "page"
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        Page View
                      </button>
                    </div>
                  </div>

                  {readingMode === "verse" ? (
                    <Tabs
                      value={activeTab}
                      onValueChange={setActiveTab}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
                        <TabsTrigger value="translation" className="text-xs sm:text-sm">Translation</TabsTrigger>
                        <TabsTrigger value="transliteration" className="text-xs sm:text-sm">
                          Roman English
                        </TabsTrigger>
                        <TabsTrigger value="romanurdu" className="text-xs sm:text-sm">
                          Roman Urdu
                        </TabsTrigger>
                        <TabsTrigger value="saved" className="text-xs sm:text-sm">
                          Saved ({savedVerses.length})
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="translation">
                        {renderVerseList(true, false)}
                      </TabsContent>

                      <TabsContent value="transliteration">
                        {renderVerseList(false, true)}
                      </TabsContent>

                      <TabsContent value="romanurdu">
                        {romanUrduLoading ? (
                          <div className="text-center py-12">
                            <Loader2 className="w-12 h-12 mx-auto text-accent animate-spin mb-4" />
                            <p className="text-muted-foreground font-medium">Generating Roman Urdu translation...</p>
                            <p className="text-xs text-muted-foreground mt-2">This may take a moment</p>
                          </div>
                        ) : romanUrduError ? (
                          <div className="text-center py-12">
                            <AlertCircle className="w-12 h-12 mx-auto text-destructive mb-4" />
                            <p className="text-muted-foreground">{romanUrduError}</p>
                          </div>
                        ) : romanUrdu ? (
                          renderVerseList(true, false, romanUrdu.map(v => ({ ...v, translation: v.romanUrdu })))
                        ) : null}
                      </TabsContent>

                      <TabsContent value="saved">
                        {savedVerses.length > 0 ? (
                          renderVerseList(true, true, savedVerses)
                        ) : (
                          <div className="text-center py-12">
                            <Bookmark className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                            <h3 className="font-display text-xl font-medium text-primary mb-2">
                              No Saved Verses
                            </h3>
                            <p className="text-muted-foreground">
                              Bookmark verses from this surah to see them here.
                            </p>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  ) : (
                    <ContinuousMushafView
                      verses={verses}
                      loading={loading}
                      error={error}
                      retry={retry}
                    />
                  )}

                  {/* End of surah navigation */}
                  <div className="mt-10 pt-8 border-t border-border">
                    <div className="flex justify-center mb-6 lg:hidden">
                      <button
                        type="button"
                        onClick={() => setSelectedSurah(null)}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back to Surah List
                      </button>
                    </div>

                    <div className="flex items-stretch gap-3 mb-8">
                      {prevSurah ? (
                        <button
                          type="button"
                          onClick={() => setSelectedSurah(prevSurah)}
                          className="group flex-1 flex items-center gap-3 p-4 rounded-xl border border-border hover:border-accent/40 hover:bg-accent/5 transition-colors text-left min-w-0"
                        >
                          <ArrowLeft className="w-5 h-5 text-accent shrink-0 group-hover:-translate-x-0.5 transition-transform" />
                          <div className="min-w-0">
                            <p className="text-xs text-muted-foreground">Previous</p>
                            <p className="font-display font-medium text-primary truncate">
                              {prevSurah.id}. {prevSurah.name}
                            </p>
                          </div>
                        </button>
                      ) : (
                        <div className="flex-1" />
                      )}

                      {nextSurah ? (
                        <button
                          type="button"
                          onClick={() => setSelectedSurah(nextSurah)}
                          className="group flex-1 flex items-center justify-end gap-3 p-4 rounded-xl border border-border hover:border-accent/40 hover:bg-accent/5 transition-colors text-right min-w-0"
                        >
                          <div className="min-w-0">
                            <p className="text-xs text-muted-foreground">Next</p>
                            <p className="font-display font-medium text-primary truncate">
                              {nextSurah.id}. {nextSurah.name}
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-accent shrink-0 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      ) : (
                        <div className="flex-1" />
                      )}
                    </div>

                    {recommendedSurahs.length > 0 && (
                      <div>
                        <h4 className="font-display text-lg font-semibold text-primary mb-4 text-center">
                          Recommended Surahs
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {recommendedSurahs.map((surah) => (
                            <button
                              key={surah.id}
                              type="button"
                              onClick={() => setSelectedSurah(surah)}
                              className="group p-4 rounded-xl border border-border bg-card hover:border-accent/40 hover:glow-gold transition-all duration-300 text-left"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-muted-foreground">
                                  {surah.id} · {surah.revelation}
                                </span>
                                <BookOpen className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <p className="font-display font-medium text-primary">{surah.name}</p>
                              <p className="text-accent arabic-font text-sm mt-1">{surah.arabic}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              </>
            ) : (
              <Card className="bg-card border-border glow-shadow">
                <CardContent className="p-12 text-center">
                  <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-display text-xl font-medium text-primary mb-2">
                    Select a Surah to Begin
                  </h3>
                  <p className="text-muted-foreground">
                    Choose a chapter from the list to start reading the Qur'an
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}