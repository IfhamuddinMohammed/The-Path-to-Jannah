import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { surahs as quranSurahs } from "@/data/quranData";
import { getVoiceAudioUrl } from "@/lib/quranAudio";

const QuranAudioContext = createContext(null);
const VOLUME_STORAGE_KEY = "quran_audio_volume";

function loadStoredVolume() {
  try {
    const stored = Number(localStorage.getItem(VOLUME_STORAGE_KEY));
    return Number.isFinite(stored) && stored >= 0 && stored <= 1 ? stored : 1;
  } catch {
    return 1;
  }
}

// Ayah audio URLs are derived purely from surah/ayah numbers and the chosen
// voice (no network call needed), so the player can build a surah's playable
// verse list on its own — it doesn't need the Qur'an page's already-fetched
// (translation-text-bearing) verses. `voice` is { language, reciter }, where
// `language` is "arabic" | "urdu" | "english" and `reciter` only matters for
// "arabic" (Urdu/English translation-audio each have a single narrator).
function buildSurahVerses(surahMeta, voice) {
  return Array.from({ length: surahMeta.verses }, (_, i) => ({
    numberInSurah: i + 1,
    audio: getVoiceAudioUrl(surahMeta.id, i + 1, voice),
  }));
}

export function QuranAudioProvider({ children }) {
  const audioRef = useRef(null);
  // The verses array (with per-ayah .audio URLs) for whichever surah is
  // currently loaded into the player — kept here (not in the Qur'an page) so
  // playback can advance through ayahs even after the user navigates away.
  const [surah, setSurah] = useState(null); // { id, name, arabic, voice }
  const [verses, setVerses] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState({ currentTime: 0, duration: 0 });
  const [volume, setVolumeState] = useState(loadStoredVolume);
  const volumeBeforeMuteRef = useRef(1);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    try {
      localStorage.setItem(VOLUME_STORAGE_KEY, String(volume));
    } catch {
      // ignore
    }
  }, [volume]);

  const setVolume = useCallback((next) => {
    setVolumeState(Math.min(1, Math.max(0, next)));
  }, []);

  const toggleMute = useCallback(() => {
    setVolumeState((current) => {
      if (current > 0) {
        volumeBeforeMuteRef.current = current;
        return 0;
      }
      return volumeBeforeMuteRef.current || 1;
    });
  }, []);

  // Seek within the current ayah's audio — there's nothing before/after it in
  // the same <audio> element, so the browser naturally clamps to its start/end.
  const seek = useCallback((time) => {
    if (!audioRef.current || !Number.isFinite(audioRef.current.duration)) return;
    audioRef.current.currentTime = Math.min(
      Math.max(0, time),
      audioRef.current.duration
    );
  }, []);

  const playAt = useCallback((surahMeta, versesList, index, voice) => {
    if (!versesList || !versesList[index]) return;
    setSurah({ ...surahMeta, voice });
    setVerses(versesList);
    setCurrentIndex(index);
    if (audioRef.current) {
      audioRef.current.src = versesList[index].audio;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    if (!audioRef.current?.src) return;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  }, []);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
    setSurah(null);
    setVerses(null);
    setCurrentIndex(null);
  }, []);

  // Play/pause/resume a specific ayah, replacing whatever was playing before
  // if it's a different track (including a different language/reciter for
  // the same ayah — that's a different recording, not the same track).
  const toggleVerse = useCallback(
    (surahMeta, versesList, index, voice) => {
      const sameVoice =
        surah?.voice?.language === voice?.language &&
        (voice?.language !== "arabic" || surah?.voice?.reciter === voice?.reciter);
      const sameTrack = surah?.id === surahMeta.id && currentIndex === index && sameVoice;
      if (sameTrack && isPlaying) {
        pause();
      } else if (sameTrack && !isPlaying) {
        resume();
      } else {
        playAt(surahMeta, versesList, index, voice);
      }
    },
    [surah, currentIndex, isPlaying, pause, resume, playAt]
  );

  // Jump to the next/previous surah in Mushaf order, replacing the current track.
  const playAdjacentSurah = useCallback(
    (delta) => {
      if (!surah) return;
      const idx = quranSurahs.findIndex((s) => s.id === surah.id);
      const target = idx === -1 ? null : quranSurahs[idx + delta];
      if (!target) return;
      const versesList = buildSurahVerses(target, surah.voice);
      setSurah({ id: target.id, name: target.name, arabic: target.arabic, voice: surah.voice });
      setVerses(versesList);
      setCurrentIndex(0);
      if (audioRef.current) {
        audioRef.current.src = versesList[0].audio;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    },
    [surah]
  );

  const playNextSurah = useCallback(() => playAdjacentSurah(1), [playAdjacentSurah]);
  const playPreviousSurah = useCallback(() => playAdjacentSurah(-1), [playAdjacentSurah]);

  const handleEnded = useCallback(() => {
    setCurrentIndex((idx) => {
      if (verses && idx != null && idx + 1 < verses.length) {
        const next = idx + 1;
        if (audioRef.current) {
          audioRef.current.src = verses[next].audio;
          audioRef.current.play().catch(() => setIsPlaying(false));
        }
        return next;
      }

      // Surah finished — auto-continue into the next one, like a playlist.
      if (surah) {
        const idx2 = quranSurahs.findIndex((s) => s.id === surah.id);
        const nextSurahMeta = idx2 === -1 ? null : quranSurahs[idx2 + 1];
        if (nextSurahMeta) {
          const nextVerses = buildSurahVerses(nextSurahMeta, surah.voice);
          setSurah({
            id: nextSurahMeta.id,
            name: nextSurahMeta.name,
            arabic: nextSurahMeta.arabic,
            voice: surah.voice,
          });
          setVerses(nextVerses);
          if (audioRef.current) {
            audioRef.current.src = nextVerses[0].audio;
            audioRef.current.play().catch(() => setIsPlaying(false));
          }
          return 0;
        }
      }

      setIsPlaying(false);
      return null;
    });
  }, [verses, surah]);

  const handleTimeUpdate = useCallback(() => {
    if (!audioRef.current) return;
    setProgress({
      currentTime: audioRef.current.currentTime || 0,
      duration: audioRef.current.duration || 0,
    });
  }, []);

  const nowPlaying = useMemo(() => {
    if (!surah || currentIndex == null || !verses?.[currentIndex]) return null;
    const idx = quranSurahs.findIndex((s) => s.id === surah.id);
    return {
      surahId: surah.id,
      surahName: surah.name,
      surahArabic: surah.arabic,
      language: surah.voice?.language,
      reciter: surah.voice?.reciter,
      currentIndex,
      ayahNumber: verses[currentIndex].numberInSurah,
      totalVerses: verses.length,
      isPlaying,
      hasNextSurah: idx !== -1 && idx < quranSurahs.length - 1,
      hasPreviousSurah: idx > 0,
    };
  }, [surah, currentIndex, verses, isPlaying]);

  const value = {
    nowPlaying,
    progress,
    volume,
    setVolume,
    toggleMute,
    seek,
    playAt,
    toggleVerse,
    pause,
    resume,
    stop,
    playNextSurah,
    playPreviousSurah,
  };

  return (
    <QuranAudioContext.Provider value={value}>
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      {children}
    </QuranAudioContext.Provider>
  );
}

export function useQuranAudio() {
  const ctx = useContext(QuranAudioContext);
  if (!ctx) throw new Error("useQuranAudio must be used within QuranAudioProvider");
  return ctx;
}
