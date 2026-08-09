import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postCategories, POST_CONTENT_MAX_LENGTH } from "@/data/communityData";
import { markAsMine } from "@/lib/ownership";

export default function CreatePostCard({
  onSubmit,
  placeholder = "Share a reflection, verse insight, or question with the community...",
}) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(postCategories[0]);
  const [name, setName] = useState("");
  const [anonymous, setAnonymous] = useState(true);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    const created = await onSubmit({
      author_name: anonymous ? "Anonymous" : name.trim() || "Anonymous",
      author_role: "Community Member",
      category,
      content: content.trim().slice(0, POST_CONTENT_MAX_LENGTH),
    });
    if (created?.id) markAsMine("community_posts", created.id);
    setContent("");
  };

  return (
    <Card className="bg-card border-border glow-shadow">
      <CardContent className="p-4 space-y-3">
        <Textarea
          placeholder={placeholder}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={POST_CONTENT_MAX_LENGTH}
          rows={3}
        />
        <p className="text-xs text-muted-foreground text-right -mt-1">
          {content.length}/{POST_CONTENT_MAX_LENGTH}
        </p>

        <div className="flex items-center gap-2">
          <Checkbox
            id="post-anonymous"
            checked={anonymous}
            onCheckedChange={(checked) => setAnonymous(!!checked)}
          />
          <label htmlFor="post-anonymous" className="text-sm text-foreground cursor-pointer">
            Post anonymously
          </label>
        </div>

        {!anonymous && (
          <Input
            placeholder="Your name (shown to others)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
          />
        )}

        <div className="flex items-center gap-2 flex-wrap">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {postCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleSubmit} disabled={!content.trim()} className="ml-auto">
            Post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
