import React, { useState, useEffect } from "react";
import { Video } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Search, Video as VideoIcon, User, Clock, Play } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Handles every common YouTube URL shape (watch?v=, youtu.be/, /embed/, /shorts/), each of which
// can also carry extra query params (&t=, &list=, ?si=, etc.) that a naive split would leave
// stuck onto the id. Returns null for anything else (a non-YouTube video_url, or a malformed
// one) so callers can fall back to linking out instead of embedding a broken player.
function getYouTubeId(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return parsed.pathname.slice(1).split("/")[0] || null;
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") return parsed.searchParams.get("v");
      const match = parsed.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/);
      if (match) return match[1];
    }
    return null;
  } catch {
    return null;
  }
}

export default function VideosPage() {
  const [playingVideo, setPlayingVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ query: "", category: "all", scholar: "all", language: "all" });

  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      try {
        const data = await Video.list('-created_date');
        setVideos(data);
      } catch (error) {
        console.error("Error loading videos:", error);
      }
      setIsLoading(false);
    };
    loadVideos();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredVideos = videos.filter(video => {
    const queryMatch = filters.query === "" || video.title.toLowerCase().includes(filters.query.toLowerCase());
    const categoryMatch = filters.category === "all" || video.category === filters.category;
    const scholarMatch = filters.scholar === "all" || video.scholar === filters.scholar;
    const languageMatch = filters.language === "all" || video.language === filters.language;
    return queryMatch && categoryMatch && scholarMatch && languageMatch;
  });

  const uniqueScholars = [...new Set(videos.map(v => v.scholar).filter(Boolean))];

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <VideoIcon className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">Islamic Videos</h1>
          <p className="text-muted-foreground">Watch curated lectures, reminders, and documentaries.</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search videos..." value={filters.query} onChange={(e) => handleFilterChange('query', e.target.value)} className="pl-10" />
              </div>
              <Select value={filters.category} onValueChange={(v) => handleFilterChange('category', v)}><SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger><SelectContent><SelectItem value="all">All Categories</SelectItem><SelectItem value="lecture">Lecture</SelectItem><SelectItem value="reminder">Reminder</SelectItem><SelectItem value="documentary">Documentary</SelectItem></SelectContent></Select>
              <Select value={filters.scholar} onValueChange={(v) => handleFilterChange('scholar', v)}><SelectTrigger><SelectValue placeholder="Scholar" /></SelectTrigger><SelectContent><SelectItem value="all">All Scholars</SelectItem>{uniqueScholars.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? Array(6).fill(0).map((_, i) => <Card key={i}><Skeleton className="aspect-video rounded-t-lg" /><CardHeader><Skeleton className="h-6 w-full" /></CardHeader><CardContent><Skeleton className="h-4 w-1/2" /></CardContent></Card>)
          : filteredVideos.map((video) => {
            const youtubeId = getYouTubeId(video.video_url);
            return (
              // A YouTube video plays inline via the embed below; anything that isn't a
              // recognized YouTube URL (a different host, or malformed) still opens in a new
              // tab, since there's no embeddable player to open for it.
              <button
                type="button"
                onClick={() => (youtubeId ? setPlayingVideo(video) : window.open(video.video_url, "_blank", "noopener,noreferrer"))}
                key={video.id}
                className="text-left"
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden group">
                    <img
                      src={video.thumbnail_url || (youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : undefined)}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">{video.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-between gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1 min-w-0"><User className="w-3 h-3 shrink-0" /> <span className="truncate">{video.scholar || 'N/A'}</span></div>
                    <div className="flex items-center gap-1 shrink-0"><Clock className="w-3 h-3" /> {video.duration || 'N/A'}</div>
                  </CardContent>
                </Card>
              </button>
            );
          })}
        </div>
      </div>

      <Dialog open={!!playingVideo} onOpenChange={(open) => !open && setPlayingVideo(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-black border-0 [&>button]:text-white [&>button]:opacity-90 [&>button]:hover:opacity-100">
          {playingVideo && (
            <div className="aspect-video">
              <DialogTitle className="sr-only">{playingVideo.title}</DialogTitle>
              <iframe
                key={playingVideo.id}
                src={`https://www.youtube.com/embed/${getYouTubeId(playingVideo.video_url)}?autoplay=1`}
                title={playingVideo.title}
                className="w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}