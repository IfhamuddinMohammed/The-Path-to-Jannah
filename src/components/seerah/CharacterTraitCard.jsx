import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function CharacterTraitCard({ trait }) {
  return (
    <Card className="bg-card border-border glow-shadow hover:glow-gold transition-shadow">
      <CardContent className="p-5 space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="w-4 h-4 text-accent shrink-0" />
          <h4 className="font-semibold font-display">{trait.trait}</h4>
        </div>
        <p className="text-lg text-accent arabic-font">{trait.arabicTrait}</p>
        <p className="text-sm text-foreground/90 leading-relaxed">{trait.description}</p>
        <Badge variant="outline" className="bg-secondary text-secondary-foreground border-border">
          {trait.hadithCitation}
        </Badge>
      </CardContent>
    </Card>
  );
}
