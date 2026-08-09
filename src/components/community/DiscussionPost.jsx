import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThumbsUp, MessageCircle, Share2, Flag, Pencil, Trash2, MoreHorizontal, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommunityPost, PostComment } from "@/entities/all";
import { useToast } from "@/components/ui/use-toast";
import { markAsMine, unmarkAsMine, isMine } from "@/lib/ownership";
import { COMMENT_CONTENT_MAX_LENGTH, POST_CONTENT_MAX_LENGTH } from "@/data/communityData";
import { parseServerDate } from "@/lib/serverDate";

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

export default function DiscussionPost({ post, onLikeChange, onEdit, onDelete, onCommentCountChange }) {
  const [likes, setLikes] = useState(post.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [savingLike, setSavingLike] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState(null); // null = not loaded yet
  const [loadingComments, setLoadingComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [savingEdit, setSavingEdit] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const { toast } = useToast();

  const isMinePost = isMine("community_posts", post.id);
  const displayAuthor = isMinePost ? "You" : post.author_name;

  const timeAgo = post.created_date
    ? formatDistanceToNow(parseServerDate(post.created_date), { addSuffix: true })
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
    const content = newComment.trim().slice(0, COMMENT_CONTENT_MAX_LENGTH);
    setNewComment("");
    try {
      const created = await PostComment.create({ post_id: post.id, author: "Anonymous", content });
      markAsMine("post_comments", created.id);
      setComments((prev) => [created, ...(prev || [])]);
      const nextCount = (post.comment_count || 0) + 1;
      await CommunityPost.update(post.id, { comment_count: nextCount });
      onCommentCountChange?.(post.id, nextCount);
    } catch (error) {
      console.error("Error posting comment:", error);
      toast({
        variant: "destructive",
        title: "Couldn't post your comment",
        description: "Please check your connection and try again.",
      });
    }
  };

  const startEditPost = () => {
    setEditedContent(post.content);
    setIsEditingPost(true);
  };

  const saveEditPost = async () => {
    const trimmed = editedContent.trim();
    if (!trimmed || savingEdit) return;
    setSavingEdit(true);
    try {
      await CommunityPost.update(post.id, { content: trimmed });
      onEdit?.(post.id, { content: trimmed });
      setIsEditingPost(false);
    } catch (error) {
      console.error("Error editing post:", error);
      toast({
        variant: "destructive",
        title: "Couldn't save your edit",
        description: "Please check your connection and try again.",
      });
    }
    setSavingEdit(false);
  };

  const deletePost = async () => {
    if (!window.confirm("Delete this post? This can't be undone.")) return;
    try {
      await CommunityPost.delete(post.id);
      unmarkAsMine("community_posts", post.id);
      onDelete?.(post.id);
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        variant: "destructive",
        title: "Couldn't delete your post",
        description: "Please check your connection and try again.",
      });
    }
  };

  const startEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditedCommentContent(comment.content);
  };

  const saveEditComment = async (commentId) => {
    const trimmed = editedCommentContent.trim();
    if (!trimmed) return;
    try {
      await PostComment.update(commentId, { content: trimmed });
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, content: trimmed } : c))
      );
      setEditingCommentId(null);
    } catch (error) {
      console.error("Error editing comment:", error);
      toast({
        variant: "destructive",
        title: "Couldn't save your edit",
        description: "Please check your connection and try again.",
      });
    }
  };

  const deleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await PostComment.delete(commentId);
      unmarkAsMine("post_comments", commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      const nextCount = Math.max(0, (post.comment_count || 0) - 1);
      await CommunityPost.update(post.id, { comment_count: nextCount });
      onCommentCountChange?.(post.id, nextCount);
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast({
        variant: "destructive",
        title: "Couldn't delete your comment",
        description: "Please check your connection and try again.",
      });
    }
  };

  return (
    <Card className="bg-card border-border glow-shadow">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                {initialsOf(displayAuthor)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-medium text-foreground">{displayAuthor}</p>
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

        {isEditingPost ? (
          <div className="space-y-2">
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              maxLength={POST_CONTENT_MAX_LENGTH}
              rows={3}
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {editedContent.length}/{POST_CONTENT_MAX_LENGTH}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditingPost(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={saveEditPost} disabled={!editedContent.trim() || savingEdit}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-foreground/90 leading-relaxed">{post.content}</p>
        )}

        <div className="flex items-center gap-1 flex-wrap pt-2 border-t border-border">
          <Button variant="ghost" size="sm" onClick={toggleLike} className={cn(hasLiked && "text-primary")}>
            <ThumbsUp className={cn("w-4 h-4 mr-1.5", hasLiked && "fill-current")} />
            {likes}
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleExpanded}>
            <MessageCircle className="w-4 h-4 mr-1.5" />
            {comments === null ? post.comment_count || 0 : comments.length}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-auto">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isMinePost && (
                <>
                  <DropdownMenuItem onClick={startEditPost}>
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={deletePost} className="text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </>
              )}
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
              comments?.map((comment) => {
                const isMineComment = isMine("post_comments", comment.id);
                const commentAuthor = isMineComment ? "You" : comment.author;
                return (
                  <div key={comment.id} className="flex gap-2.5">
                    <Avatar className="h-7 w-7 shrink-0">
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-[10px]">
                        {initialsOf(commentAuthor)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 bg-secondary rounded-lg px-3 py-2">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-baseline gap-2">
                          <p className="text-xs font-medium text-foreground">{commentAuthor}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {comment.created_date
                              ? formatDistanceToNow(parseServerDate(comment.created_date), { addSuffix: true })
                              : "Just now"}
                          </p>
                        </div>
                        {isMineComment && editingCommentId !== comment.id && (
                          <div className="flex gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => startEditComment(comment)}
                              className="text-muted-foreground hover:text-foreground"
                              aria-label="Edit comment"
                            >
                              <Pencil className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteComment(comment.id)}
                              className="text-muted-foreground hover:text-destructive"
                              aria-label="Delete comment"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                      {editingCommentId === comment.id ? (
                        <div className="mt-1 space-y-1.5">
                          <Input
                            value={editedCommentContent}
                            onChange={(e) => setEditedCommentContent(e.target.value)}
                            maxLength={COMMENT_CONTENT_MAX_LENGTH}
                          />
                          <div className="flex gap-2 justify-end">
                            <Button variant="outline" size="sm" onClick={() => setEditingCommentId(null)}>
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => saveEditComment(comment.id)}
                              disabled={!editedCommentContent.trim()}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-foreground/90 mt-0.5 break-words">{comment.content}</p>
                      )}
                    </div>
                  </div>
                );
              })
            )}
            <div className="space-y-1">
              <div className="flex gap-2">
                <Input
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value.slice(0, COMMENT_CONTENT_MAX_LENGTH))}
                  maxLength={COMMENT_CONTENT_MAX_LENGTH}
                  onKeyDown={(e) => e.key === "Enter" && addComment()}
                />
                <Button size="sm" onClick={addComment} disabled={!newComment.trim()}>
                  Post
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-right">
                {newComment.length}/{COMMENT_CONTENT_MAX_LENGTH}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
