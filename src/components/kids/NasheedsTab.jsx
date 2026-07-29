import { useEffect, useRef, useState } from "react";
import { kidsNasheeds } from "@/data/kidsNasheeds";
import { Badge } from "@/components/ui/badge";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

function formatTime(seconds) {
  if (!seconds || !Number.isFinite(seconds)) return "--:--";
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function NasheedsTab() {
  const [playingId, setPlayingId] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  // The labels on each nasheed's data entry are just placeholder copy — the
  // actual audio files are short generated tones, not real recordings of that
  // length. Read each file's real duration instead of trusting a fabricated
  // string, so whatever audio ends up here (placeholder or real) is always
  // displayed accurately rather than potentially lying about play length.
  const [durations, setDurations] = useState({});
  const audioRef = useRef(null);

  const playing = kidsNasheeds.find((n) => n.id === playingId) || null;
  const playingDuration = playing ? durations[playing.id] : null;

  useEffect(() => {
    const probes = kidsNasheeds.map((nasheed) => {
      const probe = new Audio();
      probe.preload = "metadata";
      probe.src = nasheed.audioSrc;
      const handleLoaded = () => {
        setDurations((prev) => ({ ...prev, [nasheed.id]: probe.duration }));
      };
      probe.addEventListener("loadedmetadata", handleLoaded);
      return { probe, handleLoaded };
    });
    return () => {
      probes.forEach(({ probe, handleLoaded }) => {
        probe.removeEventListener("loadedmetadata", handleLoaded);
        probe.src = "";
      });
    };
  }, []);

  useEffect(() => {
    if (!playingId || !audioRef.current) return;
    const nasheed = kidsNasheeds.find((n) => n.id === playingId);
    if (!nasheed) return;
    audioRef.current.src = nasheed.audioSrc;
    audioRef.current.play().catch(() => setPlayingId(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playingId]);

  const toggle = (id) => {
    if (playingId === id) {
      audioRef.current?.pause();
      setPlayingId(null);
      setCurrentTime(0);
    } else {
      audioRef.current?.pause();
      setPlayingId(id);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) setCurrentTime(audio.currentTime);
  };

  const handleEnded = () => {
    setPlayingId(null);
    setCurrentTime(0);
  };

  const progressFraction = playingDuration ? Math.min(1, currentTime / playingDuration) : 0;

  return (
    <div className="pb-20">
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} />

      <p className="text-sm text-muted-foreground mb-4 text-center max-w-md mx-auto">
        Sing along to these family-friendly nasheeds!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {kidsNasheeds.map((nasheed) => {
          const isPlaying = playingId === nasheed.id;
          return (
            <div
              key={nasheed.id}
              className={cn(
                "flex items-center gap-4 p-4 rounded-2xl border transition-colors",
                isPlaying ? "border-accent bg-accent/10" : "border-border bg-card"
              )}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-3xl shrink-0">
                {nasheed.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-primary truncate">{nasheed.title}</p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <Badge
                    variant="outline"
                    className="text-xs bg-primary/5 text-primary border-primary/20"
                  >
                    {nasheed.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(durations[nasheed.id])}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggle(nasheed.id)}
                aria-label={isPlaying ? "Pause" : "Play"}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors",
                  isPlaying
                    ? "bg-accent text-accent-foreground"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {playing && (
        <div className="fixed bottom-16 md:bottom-4 inset-x-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-md z-40">
          <div className="flex items-center gap-3 bg-card border border-accent/30 shadow-lg rounded-2xl px-4 py-3 glow-shadow">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl shrink-0">
              {playing.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-primary truncate">{playing.title}</p>
                <span className="text-xs text-muted-foreground shrink-0 tabular-nums">
                  {formatTime(currentTime)} / {formatTime(playingDuration)}
                </span>
              </div>
              <div className="h-1.5 bg-border rounded-full mt-1.5 overflow-hidden">
                <div
                  className="h-full bg-accent transition-[width] duration-150"
                  style={{ width: `${progressFraction * 100}%` }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggle(playing.id)}
              aria-label="Pause"
              className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0"
            >
              <Pause className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
