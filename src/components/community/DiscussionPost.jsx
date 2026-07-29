import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThumbsUp, MessageCircle, Share2, Flag, MoreHorizontal, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommunityPost, PostComment } from "@/entities/all";

const CATEGORY_STYLES = {
  Reflection: "bg-primary/10 text-primary border-primary/20",
  "Verse Insight": "bg-accent/10 text-accent border-accent/20",
  "General Question": "bg-[hsl(var(--chart-3)/0.15)] text-[hsl(var(--chart-3))] border-[hsl(var(--chart-3)/0.3)]",
};

function initialsOf(name) {
  return (name || "?")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function DiscussionPost({ post, onLikeChange }) {
  const [likes, setLikes] = useState(post.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [savingLike, setSavingLike] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState(null); // null = not loaded yet
  const [loadingComments, setLoadingComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const timeAgo = post.created_date
    ? formatDistanceToNow(new Date(post.created_date), { addSuffix: true })
    : "Just now";

  const toggleLike = async () => {
    if (savingLike) return;
    const next = hasLiked ? likes - 1 : likes + 1;
    setLikes(next);
    setHasLiked((v) => !v);

    setSavingLike(true);
    try {
      await CommunityPost.update(post.id, { likes: next });
      onLikeChange?.(post.id, next);
    } catch (error) {
      console.error("Error updating like count:", error);
      setLikes(likes);
      setHasLiked((v) => !v);
    }
    setSavingLike(false);
  };

  const toggleExpanded = async () => {
    const next = !expanded;
    setExpanded(next);
    if (next && comments === null) {
      setLoadingComments(true);
      try {
        const loaded = await PostComment.filter({ post_id: post.id }, "-created_date");
        setComments(loaded);
      } catch (error) {
        console.error("Error loading comments:", error);
        setComments([]);
      }
      setLoadingComments(false);
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) return;
    const content = newComment.trim();
    setNewComment("");
    try {
      const created = await PostComment.create({ post_id: post.id, author: "You", content });
      setComments((prev) => [created, ...(prev || [])]);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <Card className="bg-card border-border glow-shadow">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                {initialsOf(post.author_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-medium text-foreground">{post.author_name}</p>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-secondary text-secondary-foreground border-border">
                  {post.author_role}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{timeAgo}</p>
            </div>
          </div>
          <Badge variant="outline" className={cn("text-xs shrink-0", CATEGORY_STYLES[post.category])}>
            {post.category}
          </Badge>
        </div>

        <p className="text-sm text-foreground/90 leading-relaxed">{post.content}</p>

        <div className="flex items-center gap-1 pt-2 border-t border-border">
          <Button variant="ghost" size="sm" onClick={toggleLike} className={cn(hasLiked && "text-primary")}>
            <ThumbsUp className={cn("w-4 h-4 mr-1.5", hasLiked && "fill-current")} />
            {likes}
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleExpanded}>
            <MessageCircle className="w-4 h-4 mr-1.5" />
            {comments === null ? "" : comments.length}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-auto">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Flag className="w-4 h-4 mr-2" />
                Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {expanded && (
          <div className="pt-3 border-t border-border space-y-3">
            {loadingComments ? (
              <div className="flex items-center justify-center py-4 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin mr-2" /> Loading comments…
              </div>
            ) : (
              comments?.map((comment) => (
                <div key={comment.id} className="flex gap-2.5">
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-[10px]">
                      {initialsOf(comment.author)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 bg-secondary rounded-lg px-3 py-2">
                    <div className="flex items-baseline gap-2">
                      <p className="text-xs font-medium text-foreground">{comment.author}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {comment.created_date
                          ? formatDistanceToNow(new Date(comment.created_date), { addSuffix: true })
                          : "Just now"}
                      </p>
                    </div>
                    <p className="text-sm text-foreground/90 mt-0.5 break-words">{comment.content}</p>
                  </div>
                </div>
              ))
            )}
            <div className="flex gap-2">
              <Input
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addComment()}
              />
              <Button size="sm" onClick={addComment} disabled={!newComment.trim()}>
                Post
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
