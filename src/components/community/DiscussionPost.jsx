import { useState } from "react";
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
import { ThumbsUp, MessageCircle, Share2, Flag, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORY_STYLES = {
  Reflection: "bg-primary/10 text-primary border-primary/20",
  "Verse Insight": "bg-accent/10 text-accent border-accent/20",
  "General Question": "bg-[hsl(var(--chart-3)/0.15)] text-[hsl(var(--chart-3))] border-[hsl(var(--chart-3)/0.3)]",
};

function initialsOf(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function DiscussionPost({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");

  const toggleLike = () => {
    setLikes((c) => (hasLiked ? c - 1 : c + 1));
    setHasLiked((v) => !v);
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    setComments((c) => [
      ...c,
      { id: `local-${Date.now()}`, author: "You", content: newComment.trim(), timeAgo: "Just now" },
    ]);
    setNewComment("");
  };

  return (
    <Card className="bg-card border-border glow-shadow">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                {initialsOf(post.authorName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-medium text-foreground">{post.authorName}</p>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-secondary text-secondary-foreground border-border">
                  {post.authorRole}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
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
          <Button variant="ghost" size="sm" onClick={() => setExpanded((v) => !v)}>
            <MessageCircle className="w-4 h-4 mr-1.5" />
            {comments.length}
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
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-2.5">
                <Avatar className="h-7 w-7 shrink-0">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-[10px]">
                    {initialsOf(comment.author)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 bg-secondary rounded-lg px-3 py-2">
                  <div className="flex items-baseline gap-2">
                    <p className="text-xs font-medium text-foreground">{comment.author}</p>
                    <p className="text-[10px] text-muted-foreground">{comment.timeAgo}</p>
                  </div>
                  <p className="text-sm text-foreground/90 mt-0.5 break-words">{comment.content}</p>
                </div>
              </div>
            ))}
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
