import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Bookmark, BookmarkCheck, Share2, CheckCircle2 } from "lucide-react";
import { useHadithBookmarks } from "@/hooks/useHadithBookmarks";
import { useToast } from "@/components/ui/use-toast";

const TRANSLATION_FIELD = {
  "Arabic + English": "english",
  "Roman Urdu": "romanUrdu",
  "Urdu (اردو)": "urdu",
  "Arabic Only": null,
};

export default function HadithCard({ hadith, language }) {
  const { isBookmarked, toggleBookmark } = useHadithBookmarks();
  const { toast } = useToast();
  const bookmarked = isBookmarked(hadith.id);

  const translationField = TRANSLATION_FIELD[language];
  const translation = translationField ? hadith[translationField] : null;
  const isUrduScript = translationField === "urdu";

  const buildSnippet = () => {
    const parts = [hadith.arabic];
    if (translation) parts.push(translation);
    parts.push(`— ${hadith.reference}, narrated by ${hadith.narrator}`);
    return parts.join("\n\n");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildSnippet());
      toast({ title: "Copied to clipboard" });
    } catch {
      toast({ variant: "destructive", title: "Couldn't copy text" });
    }
  };

  const handleShare = async () => {
    const text = buildSnippet();
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch {
        // user cancelled the share sheet — no error needed
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Link copied", description: "Sharing isn't supported here, so the snippet was copied instead." });
    } catch {
      toast({ variant: "destructive", title: "Couldn't share" });
    }
  };

  return (
    <Card className="relative bg-card border-border glow-shadow hover:glow-gold transition-all duration-300 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
      <CardHeader>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <CardTitle className="font-display text-lg text-primary">{hadith.reference}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              {hadith.authenticity}
            </Badge>
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              {hadith.collection}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground font-body">Narrated by {hadith.narrator}:</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xl arabic-font text-accent text-right leading-loose">{hadith.arabic}</p>

        {translation && (
          <p
            dir={isUrduScript ? "rtl" : "ltr"}
            className={`text-foreground/80 leading-relaxed italic font-body ${isUrduScript ? "text-right arabic-font" : ""}`}
          >
            "{translation}"
          </p>
        )}

        <div className="flex items-center gap-1 pt-2 border-t border-border">
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            <Copy className="w-4 h-4 mr-1.5" />
            Copy
          </Button>
          <Button variant="ghost" size="sm" onClick={() => toggleBookmark(hadith.id)} className={bookmarked ? "text-accent" : undefined}>
            {bookmarked ? <BookmarkCheck className="w-4 h-4 mr-1.5 fill-current" /> : <Bookmark className="w-4 h-4 mr-1.5" />}
            {bookmarked ? "Saved" : "Bookmark"}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-1.5" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
