import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Plus, Sprout } from "lucide-react";
import EtiquetteBanner from "@/components/community/EtiquetteBanner";
import DuaCard from "@/components/community/DuaCard";
import RequestDuaModal from "@/components/community/RequestDuaModal";
import CreatePostCard from "@/components/community/CreatePostCard";
import DiscussionPost from "@/components/community/DiscussionPost";
import CommunitySidebar from "@/components/community/CommunitySidebar";
import { postFilters } from "@/data/communityData";
import { DuaRequest, CommunityPost } from "@/entities/all";
import { useToast } from "@/components/ui/use-toast";

function isToday(dateString) {
  if (!dateString) return false;
  const d = new Date(dateString);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

export default function CommunityPage() {
  const [duaRequests, setDuaRequests] = useState([]);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [newMuslimPosts, setNewMuslimPosts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All Posts");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const [duas, discussionPosts, newMuslim] = await Promise.all([
        DuaRequest.list("-created_date").catch(() => []),
        CommunityPost.filter({ section: "discussions" }, "-created_date").catch(() => []),
        CommunityPost.filter({ section: "new_muslims" }, "-created_date").catch(() => []),
      ]);
      setDuaRequests(duas);
      setPosts(discussionPosts);
      setNewMuslimPosts(newMuslim);
    } catch (error) {
      console.error("Error loading community data:", error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const addDuaRequest = async (dua) => {
    try {
      const created = await DuaRequest.create(dua);
      setDuaRequests((prev) => [created, ...prev]);
    } catch (error) {
      console.error("Error posting dua request:", error);
      toast({
        variant: "destructive",
        title: "Couldn't post your dua request",
        description: "Please check your connection and try again.",
      });
    }
  };

  const addPost = async (post) => {
    try {
      const created = await CommunityPost.create({ ...post, section: "discussions" });
      setPosts((prev) => [created, ...prev]);
    } catch (error) {
      console.error("Error posting discussion:", error);
    }
  };

  const addNewMuslimPost = async (post) => {
    try {
      const created = await CommunityPost.create({ ...post, section: "new_muslims" });
      setNewMuslimPosts((prev) => [created, ...prev]);
    } catch (error) {
      console.error("Error posting question:", error);
    }
  };

  const handleAameenChange = (id, aameen_count) => {
    setDuaRequests((prev) => prev.map((d) => (d.id === id ? { ...d, aameen_count } : d)));
  };

  const handleDiscussionLikeChange = (id, likes) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, likes } : p)));
  };

  const handleNewMuslimLikeChange = (id, likes) => {
    setNewMuslimPosts((prev) => prev.map((p) => (p.id === id ? { ...p, likes } : p)));
  };

  const visiblePosts = useMemo(() => {
    let list = [...posts];
    if (activeFilter === "Reflections") {
      list = list.filter((p) => p.category === "Reflection" || p.category === "Verse Insight");
    } else if (activeFilter === "Questions") {
      list = list.filter((p) => p.category === "General Question");
    } else if (activeFilter === "Most Popular") {
      list.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
    return list;
  }, [posts, activeFilter]);

  const stats = useMemo(
    () => ({
      duasToday: duaRequests.filter((d) => isToday(d.created_date)).length,
      activeDiscussions: posts.length + newMuslimPosts.length,
    }),
    [duaRequests, posts, newMuslimPosts]
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-accent/40"></div>
            <Users className="w-12 h-12 text-accent" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-accent/40"></div>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-2">
            Islamic Community &amp; Dua Circle
          </h1>
          <p className="text-2xl text-accent mb-2 arabic-font">المجتمع والتعاضد</p>
          <p className="text-muted-foreground font-body">
            Connect, ask questions, and support one another on the journey of faith
          </p>
        </div>

        <EtiquetteBanner />

        <Tabs defaultValue="dua-circle">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <TabsList className="grid w-full grid-cols-3 h-auto">
                <TabsTrigger value="dua-circle" className="text-xs sm:text-sm py-2">
                  🤲 <span className="hidden sm:inline ml-1">Dua Circle</span>
                </TabsTrigger>
                <TabsTrigger value="discussions" className="text-xs sm:text-sm py-2">
                  💬 <span className="hidden sm:inline ml-1">Reflections &amp; Discussions</span>
                </TabsTrigger>
                <TabsTrigger value="new-muslims" className="text-xs sm:text-sm py-2">
                  🌱 <span className="hidden sm:inline ml-1">New Muslims</span>
                </TabsTrigger>
              </TabsList>

              {/* Dua Circle */}
              <TabsContent value="dua-circle" className="space-y-4 mt-0">
                <div className="flex justify-end">
                  <Button onClick={() => setRequestModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Request a Dua
                  </Button>
                </div>
                {isLoading ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {Array(4).fill(0).map((_, i) => (
                      <Skeleton key={i} className="h-40 w-full rounded-xl" />
                    ))}
                  </div>
                ) : duaRequests.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {duaRequests.map((dua) => (
                      <DuaCard key={dua.id} dua={dua} onAameenChange={handleAameenChange} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    No dua requests yet — be the first to share what's on your heart.
                  </div>
                )}
              </TabsContent>

              {/* Discussions */}
              <TabsContent value="discussions" className="space-y-4 mt-0">
                <CreatePostCard onSubmit={addPost} />
                <div className="flex items-center gap-2 flex-wrap">
                  {postFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-3 py-2 rounded-full text-xs font-medium border transition-colors ${
                        activeFilter === filter
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-muted-foreground border-border hover:bg-secondary"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                {isLoading ? (
                  <div className="space-y-4">
                    {Array(3).fill(0).map((_, i) => (
                      <Skeleton key={i} className="h-32 w-full rounded-xl" />
                    ))}
                  </div>
                ) : visiblePosts.length > 0 ? (
                  <div className="space-y-4">
                    {visiblePosts.map((post) => (
                      <DiscussionPost
                        key={post.id}
                        post={post}
                        onLikeChange={handleDiscussionLikeChange}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    No discussions yet — share a reflection or ask a question to start one.
                  </div>
                )}
              </TabsContent>

              {/* New Muslims */}
              <TabsContent value="new-muslims" className="space-y-4 mt-0">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <Sprout className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/90">
                    Welcome! This is a safe, judgment-free space for new and revert Muslims to ask
                    anything — no question is too basic. Our community is here to support you.
                  </p>
                </div>
                <CreatePostCard
                  onSubmit={addNewMuslimPost}
                  placeholder="Ask anything about Islam, prayer, or getting started — no question is too basic..."
                />
                {isLoading ? (
                  <div className="space-y-4">
                    {Array(2).fill(0).map((_, i) => (
                      <Skeleton key={i} className="h-32 w-full rounded-xl" />
                    ))}
                  </div>
                ) : newMuslimPosts.length > 0 ? (
                  <div className="space-y-4">
                    {newMuslimPosts.map((post) => (
                      <DiscussionPost
                        key={post.id}
                        post={post}
                        onLikeChange={handleNewMuslimLikeChange}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    No questions yet — be the first to ask, no question is too basic.
                  </div>
                )}
              </TabsContent>
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <CommunitySidebar stats={stats} />
            </div>
          </div>
        </Tabs>
      </div>

      <RequestDuaModal
        open={requestModalOpen}
        onOpenChange={setRequestModalOpen}
        onSubmit={addDuaRequest}
      />
    </div>
  );
}
