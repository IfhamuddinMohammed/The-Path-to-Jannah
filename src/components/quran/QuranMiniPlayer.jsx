import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Play,
  Pause,
  X,
  SkipBack,
  SkipForward,
  BookOpen,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useQuranAudio } from "@/hooks/useQuranAudio";
import { createPageUrl } from "@/utils";

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function QuranMiniPlayer() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    nowPlaying,
    progress,
    volume,
    setVolume,
    toggleMute,
    seek,
    pause,
    resume,
    stop,
    playNextSurah,
    playPreviousSurah,
  } = useQuranAudio();

  if (!nowPlaying) return null;

  const onQuranPage = location.pathname === createPageUrl("Quran");

  return (
    <div className="fixed inset-x-0 bottom-16 md:bottom-0 z-40 bg-card/95 backdrop-blur-lg border-t border-border shadow-lg">
      <div className="flex items-center gap-2 px-3 pt-1.5 sm:px-6">
        <span className="text-[10px] text-muted-foreground tabular-nums w-8 shrink-0">
          {formatTime(progress.currentTime)}
        </span>
        <input
          type="range"
          min={0}
          max={progress.duration || 0}
          step={0.1}
          value={Math.min(progress.currentTime, progress.duration || 0)}
          onChange={(e) => seek(Number(e.target.value))}
          disabled={!progress.duration}
          className="flex-1 h-1 accent-accent cursor-pointer disabled:cursor-default"
          aria-label="Seek within ayah"
        />
        <span className="text-[10px] text-muted-foreground tabular-nums w-8 shrink-0 text-right">
          {formatTime(progress.duration)}
        </span>
      </div>

      <div className="max-w-7xl mx-auto flex items-center gap-1 px-3 py-2 sm:px-6">
        <button
          type="button"
          onClick={() => !onQuranPage && navigate(createPageUrl("Quran"))}
          className="flex items-center gap-2 flex-1 min-w-0 text-left"
        >
          <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 text-accent" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {nowPlaying.surahName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Ayah {nowPlaying.ayahNumber} of {nowPlaying.totalVerses}
              {nowPlaying.language && nowPlaying.language !== "arabic" && (
                <span className="capitalize"> · {nowPlaying.language} audio</span>
              )}
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground shrink-0"
          aria-label={volume === 0 ? "Unmute" : "Mute"}
        >
          {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="hidden sm:block w-16 h-1 accent-accent cursor-pointer shrink-0"
          aria-label="Volume"
        />

        <button
          type="button"
          onClick={playPreviousSurah}
          disabled={!nowPlaying.hasPreviousSurah}
          className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 shrink-0"
          aria-label="Previous surah"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => (nowPlaying.isPlaying ? pause() : resume())}
          className="w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0"
          aria-label={nowPlaying.isPlaying ? "Pause" : "Play"}
        >
          {nowPlaying.isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" />
          )}
        </button>

        <button
          type="button"
          onClick={playNextSurah}
          disabled={!nowPlaying.hasNextSurah}
          className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 shrink-0"
          aria-label="Next surah"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={stop}
          className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground shrink-0"
          aria-label="Stop"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
