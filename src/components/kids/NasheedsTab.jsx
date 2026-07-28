import { Card, CardContent } from "@/components/ui/card";
import { Music } from "lucide-react";

export default function NasheedsTab() {
  return (
    <Card className="bg-secondary border-border">
      <CardContent className="p-10 text-center">
        <Music className="w-12 h-12 mx-auto text-primary mb-4" />
        <h3 className="font-display text-xl font-bold text-primary mb-2">Nasheeds Coming Soon</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We're curating a collection of beautiful, family-friendly nasheeds to add here.
          Check back soon, or visit the admin panel to add your favorites!
        </p>
      </CardContent>
    </Card>
  );
}
