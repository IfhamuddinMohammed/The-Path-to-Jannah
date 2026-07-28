import { useState } from "react";
import { kidsStories } from "@/data/kidsStories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StoryDialog from "./StoryDialog";

export default function StoriesTab() {
  const [activeStory, setActiveStory] = useState(null);
  const [open, setOpen] = useState(false);

  const openStory = (story) => {
    setActiveStory(story);
    setOpen(true);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {kidsStories.map((story) => (
        <Card
          key={story.id}
          onClick={() => openStory(story)}
          className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-primary/10 hover:border-primary/30"
        >
          <CardHeader>
            <div className="text-4xl mb-2">{story.emoji}</div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs">Ages {story.ageGroup}</Badge>
            </div>
            <CardTitle className="text-lg text-primary leading-snug">{story.title}</CardTitle>
            <p className="text-accent arabic-font text-sm">{story.arabicTitle}</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{story.summary}</p>
          </CardContent>
        </Card>
      ))}

      <StoryDialog story={activeStory} open={open} onOpenChange={setOpen} />
    </div>
  );
}
