import { goodManners } from "@/data/goodManners";
import { Card, CardContent } from "@/components/ui/card";

export default function MannersTab() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {goodManners.map((manner) => (
        <Card key={manner.title} className="border-2 border-primary/10 hover:border-primary/30 transition-colors">
          <CardContent className="p-5">
            <div className="text-3xl mb-3">{manner.emoji}</div>
            <h3 className="font-semibold text-primary mb-1.5">{manner.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{manner.tip}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
