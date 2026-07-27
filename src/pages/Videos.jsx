import React, { useState, useEffect } from "react";
import { Video } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Video as VideoIcon, User, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function VideosPage() {
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
    <div className="min-h-screen bg-background p-6">
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
          : filteredVideos.map((video) => (
            <a href={video.video_url} target="_blank" rel="noopener noreferrer" key={video.id}>
              <Card className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img src={video.thumbnail_url || `https://i.ytimg.com/vi/${new URL(video.video_url).searchParams.get('v')}/hqdefault.jpg`} alt={video.title} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{video.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1"><User className="w-3 h-3" /> {video.scholar || 'N/A'}</div>
                  <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {video.duration || 'N/A'}</div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}