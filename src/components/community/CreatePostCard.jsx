import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postCategories } from "@/data/communityData";

export default function CreatePostCard({
  onSubmit,
  placeholder = "Share a reflection, verse insight, or question with the community...",
}) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(postCategories[0]);

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit({
      authorName: "You",
      authorRole: "Community Member",
      category,
      content: content.trim(),
      timeAgo: "Just now",
      likes: 0,
      comments: [],
    });
    setContent("");
  };

  return (
    <Card className="bg-card border-border glow-shadow">
      <CardContent className="p-4 space-y-3">
        <Textarea
          placeholder={placeholder}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
        />
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
