import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Bookmark, BookmarkCheck } from "lucide-react";

export default function VerseCard({
  verse,
  surahName,
  isPlaying,
  onTogglePlay,
  isBookmarked,
  onToggleBookmark,
  showTranslation = true,
  showTransliteration = false,
}) {
  return (
    <div
      className={`relative p-5 md:p-6 rounded-xl transition-all duration-300 overflow-hidden ${
        isPlaying
          ? "bg-accent/8 gold-border glow-gold"
          : "bg-card border border-border glow-shadow hover:glow-gold"
      }`}
    >
      {isPlaying && (
        <div className="absolute inset-0 geometric-bg opacity-30 pointer-events-none"></div>
      )}
      <div className="relative flex items-start gap-4">
        {/* Ayah number badge — gold octagon style */}
        <div className="relative shrink-0">
          <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-lg">
            <span className="text-sm font-semibold text-accent font-body">
              {verse.numberInSurah}
            </span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-2xl md:text-3xl text-primary mb-4 arabic-font leading-loose text-right">
            {verse.arabic}
          </p>
          {showTransliteration && verse.transliteration && (
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed italic mb-2 font-body">
              {verse.transliteration}
            </p>
          )}
          {showTranslation && verse.translation && (
            <p className="text-foreground/95 text-base md:text-lg leading-relaxed font-body">
              {verse.translation}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1 shrink-0">
          <Button variant="ghost" size="icon" onClick={onTogglePlay} className="h-8 w-8 hover:bg-accent/10">
            {isPlaying ? (
              <Pause className="w-4 h-4 text-accent" />
            ) : (
              <Play className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={onToggleBookmark} className="h-8 w-8 hover:bg-accent/10">
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-accent" />
            ) : (
              <Bookmark className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}