import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Plus, Sprout } from "lucide-react";
import EtiquetteBanner from "@/components/community/EtiquetteBanner";
import DuaCard from "@/components/community/DuaCard";
import RequestDuaModal from "@/components/community/RequestDuaModal";
import CreatePostCard from "@/components/community/CreatePostCard";
import DiscussionPost from "@/components/community/DiscussionPost";
import CommunitySidebar from "@/components/community/CommunitySidebar";
import {
  initialDuaRequests,
  initialDiscussionPosts,
  newMuslimPosts as initialNewMuslimPosts,
  postFilters,
} from "@/data/communityData";

export default function CommunityPage() {
  const [duaRequests, setDuaRequests] = useState(initialDuaRequests);
  const [requestModalOpen, setRequestModalOpen] = useState(false);

  const [posts, setPosts] = useState(initialDiscussionPosts);
  const [activeFilter, setActiveFilter] = useState("All Posts");

  const [newMuslimPosts, setNewMuslimPosts] = useState(initialNewMuslimPosts);

  const addDuaRequest = (dua) => {
    setDuaRequests((prev) => [{ ...dua, id: `local-${Date.now()}` }, ...prev]);
  };

  const addPost = (post) => {
    setPosts((prev) => [{ ...post, id: `local-${Date.now()}` }, ...prev]);
  };

  const addNewMuslimPost = (post) => {
    setNewMuslimPosts((prev) => [{ ...post, id: `local-${Date.now()}` }, ...prev]);
  };

  const visiblePosts = useMemo(() => {
    let list = [...posts];
    if (activeFilter === "Reflections") {
      list = list.filter((p) => p.category === "Reflection" || p.category === "Verse Insight");
    } else if (activeFilter === "Questions") {
      list = list.filter((p) => p.category === "General Question");
    } else if (activeFilter === "Most Popular") {
      list.sort((a, b) => b.likes - a.likes);
    }
    return list;
  }, [posts, activeFilter]);

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
                <div className="grid sm:grid-cols-2 gap-4">
                  {duaRequests.map((dua) => (
                    <DuaCard key={dua.id} dua={dua} />
                  ))}
                </div>
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
                <div className="space-y-4">
                  {visiblePosts.map((post) => (
                    <DiscussionPost key={post.id} post={post} />
                  ))}
                </div>
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
                <div className="space-y-4">
                  {newMuslimPosts.map((post) => (
                    <DiscussionPost key={post.id} post={post} />
                  ))}
                </div>
              </TabsContent>
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <CommunitySidebar />
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
