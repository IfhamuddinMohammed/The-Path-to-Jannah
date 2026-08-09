import React, { useState, useEffect, useRef } from "react";
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
  Languages,
  X,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { surahs as quranSurahs } from "@/data/quranData";
import { useQuranVerses } from "@/hooks/useQuranVerses";
import { useBookmarks } from "@/hooks/useBookmarks";
import VerseCard from "@/components/quran/VerseCard";
import PageView from "@/components/quran/PageView";
import { getPageAt } from "@/lib/mushaf";
import { getLastRead, clearLastRead } from "@/lib/quranProgress";
import { useQuranDownloads } from "@/hooks/useQuranDownloads";
import { useRomanUrdu } from "@/hooks/useRomanUrdu";
import { useQuranAudio } from "@/hooks/useQuranAudio";
import { AUDIO_LANGUAGES, TRANSLATION_AUDIO_EDITIONS } from "@/lib/quranAudio";
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

export default function QuranPage() {
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReciter, setSelectedReciter] = useState("mishary");
  const [audioLanguage, setAudioLanguage] = useState("arabic");
  const [activeTab, setActiveTab] = useState("translation");
  const [readingMode, setReadingMode] = useState("verse");
  const [resumeTarget, setResumeTarget] = useState(null);
  const [lastRead, setLastRead] = useState(() => getLastRead());
  const {
    nowPlaying,
    toggleVerse: toggleAudioVerse,
    pause: pauseAudio,
    resume: resumeAudio,
    changeVoice,
  } = useQuranAudio();

  const { verses, loading, error, retry, isOffline } = useQuranVerses(
    selectedSurah?.id,
    selectedReciter,
    audioLanguage
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

  // Note: switching surah/reciter/tab intentionally does NOT touch playback —
  // audio lives in QuranAudioProvider and keeps playing independent of what's
  // being browsed, like a normal music player.
  useEffect(() => {
    if (selectedSurah) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedSurah?.id]);

  // Keep the active surah visible within the sidebar's own scroll box — selecting via the
  // prev/next-surah buttons (rather than clicking the list directly) would otherwise leave
  // the highlighted item scrolled out of view inside that small internal scroll area.
  const activeSurahItemRef = useRef(null);
  useEffect(() => {
    activeSurahItemRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedSurah?.id]);

  // Picking a surah normally (list, prev/next, recommended) always starts fresh at its first
  // ayah — only the explicit "Continue Reading" action should resume mid-surah.
  const openSurah = (surah) => {
    setSelectedSurah(surah);
    setResumeTarget(null);
  };

  const handleContinueReading = () => {
    if (!lastRead) return;
    const surah = quranSurahs.find((s) => s.id === lastRead.surahId);
    if (!surah) return;
    setSelectedSurah(surah);
    setReadingMode("page");
    setResumeTarget({ pageNumber: lastRead.pageNumber, verseKey: `${lastRead.surahId}:${lastRead.ayah}` });
  };

  const handleDismissLastRead = () => {
    clearLastRead();
    setLastRead(null);
  };

  const surahMeta = selectedSurah
    ? { id: selectedSurah.id, name: selectedSurah.name, arabic: selectedSurah.arabic }
    : null;
  const voice = { language: audioLanguage, reciter: selectedReciter };

  // Picking a new reciter/language mid-playback should re-point the ayah that's already
  // playing at that voice right away, not silently keep the old one going until some unrelated
  // future play click. Skipped on first mount (nothing is playing yet, and this must only fire
  // on an actual picker change, not whenever `nowPlaying` itself changes for other reasons like
  // normal ayah advancement).
  const isFirstVoiceRender = useRef(true);
  useEffect(() => {
    if (isFirstVoiceRender.current) {
      isFirstVoiceRender.current = false;
      return;
    }
    if (nowPlaying) changeVoice({ language: audioLanguage, reciter: selectedReciter });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedReciter, audioLanguage]);

  const isThisSurahActive =
    !!nowPlaying && !!selectedSurah && nowPlaying.surahId === selectedSurah.id;
  const isThisSurahPlaying = isThisSurahActive && nowPlaying.isPlaying;

  const playVerse = (index) => {
    if (!verses || !verses[index] || !surahMeta) return;
    toggleAudioVerse(surahMeta, verses, index, voice);
  };

  const handleHeaderPlayButton = () => {
    if (!surahMeta) return;
    if (isThisSurahActive) {
      if (nowPlaying.isPlaying) {
        pauseAudio();
      } else {
        resumeAudio();
      }
    } else if (verses && verses.length > 0) {
      toggleAudioVerse(surahMeta, verses, 0, voice);
    }
  };

  const handleDownload = async () => {
    if (!selectedSurah) return;
    await downloadSurah(selectedSurah.id, voice);
    retry();
  };

  const handleRemoveDownload = async () => {
    if (!selectedSurah) return;
    await removeDownload(selectedSurah.id, voice);
    retry();
  };

  const handleDownloadToDevice = async () => {
    if (!selectedSurah) return;
    const result = await downloadSurahToDevice(
      selectedSurah.id,
      voice,
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
              isPlaying={isThisSurahPlaying && nowPlaying.currentIndex === actualIndex}
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

        {/* Continue Reading — only shown when browsing the surah list, not while already reading */}
        {!selectedSurah && lastRead && (
          <Card className="mb-8 bg-card border-border glow-shadow">
            <CardContent className="p-4 md:p-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleContinueReading}
                className="flex items-center gap-4 min-w-0 text-left flex-1"
              >
                <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Continue Reading</p>
                  <p className="font-display font-medium text-primary truncate">
                    {lastRead.surahName}{" "}
                    <span className="arabic-font text-accent">{lastRead.surahArabic}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Ayah {lastRead.ayah} · Page {lastRead.pageNumber} of 604
                  </p>
                </div>
              </button>
              <div className="flex items-center gap-2 shrink-0">
                <Button size="sm" onClick={handleContinueReading}>
                  Continue
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDismissLastRead}
                  aria-label="Dismiss continue reading"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

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

              <Select value={audioLanguage} onValueChange={setAudioLanguage}>
                <SelectTrigger className="w-full md:w-56">
                  <Languages className="w-4 h-4 mr-2 text-accent" />
                  <SelectValue placeholder="Listen in" />
                </SelectTrigger>
                <SelectContent>
                  {AUDIO_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.id} value={lang.id}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {audioLanguage === "arabic" ? (
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
              ) : (
                <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground w-full md:w-56 shrink-0">
                  <Volume2 className="w-4 h-4 text-accent shrink-0" />
                  Narrated by {TRANSLATION_AUDIO_EDITIONS[audioLanguage]?.narrator}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Surahs List — hidden on mobile once a surah is selected, so the reader takes over the screen */}
          <div className={`lg:col-span-1 lg:self-start ${selectedSurah ? "hidden lg:block" : ""}`}>
            <Card className="lg:sticky lg:top-20 bg-card border-border glow-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-primary">
                  <BookOpen className="w-5 h-5 text-accent" />
                  Surahs (Chapters)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 max-h-96 overflow-y-auto">
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
                      ref={selectedSurah?.id === surah.id ? activeSurahItemRef : null}
                      className={`p-4 border-b border-border cursor-pointer transition-colors ${
                        selectedSurah?.id === surah.id
                          ? "bg-accent/10 border-l-4 border-l-accent"
                          : "hover:bg-accent/5"
                      }`}
                      onClick={() => openSurah(surah)}
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
                  onClick={() => openSurah(null)}
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
                      {isThisSurahPlaying ? (
                        <Button variant="outline" size="sm" onClick={handleHeaderPlayButton}>
                          <Pause className="w-4 h-4 mr-2" /> Pause
                        </Button>
                      ) : isThisSurahActive ? (
                        <Button variant="outline" size="sm" onClick={handleHeaderPlayButton}>
                          <Play className="w-4 h-4 mr-2" /> Resume
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleHeaderPlayButton}
                          disabled={loading || !verses}
                        >
                          <Play className="w-4 h-4 mr-2" /> Play Surah
                        </Button>
                      )}
                      {isDownloaded(selectedSurah.id, voice) ? (
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

                  {readingMode === "verse" && (
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
                  )}

                  {readingMode === "page" && (
                    <PageView
                      initialPageNumber={resumeTarget?.pageNumber ?? getPageAt(selectedSurah.id, 1)}
                      initialVerseKey={resumeTarget?.verseKey}
                      totalPages={604}
                      onExit={() => {
                        setReadingMode("verse");
                        setResumeTarget(null);
                        setLastRead(getLastRead());
                      }}
                      reciter={selectedReciter}
                      audioLanguage={audioLanguage}
                    />
                  )}

                  {/* End of surah navigation */}
                  <div className="mt-10 pt-8 border-t border-border">
                    <div className="flex justify-center mb-6 lg:hidden">
                      <button
                        type="button"
                        onClick={() => openSurah(null)}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back to Surah List
                      </button>
                    </div>

                    <div className="flex items-stretch gap-3 mb-8">
                      {prevSurah ? (
                        <button
                          type="button"
                          onClick={() => openSurah(prevSurah)}
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
                          onClick={() => openSurah(nextSurah)}
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
                              onClick={() => openSurah(surah)}
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