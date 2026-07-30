import { useState, useEffect, useMemo } from "react";
import { HuqooqEntry } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { HeartHandshake, BookMarked, ShieldCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CATEGORY_META = {
  mutual: { label: "Mutual & Shared", shortLabel: "Mutual" },
  wife: { label: "Rights of the Wife", shortLabel: "Wife" },
  husband: { label: "Rights of the Husband", shortLabel: "Husband" },
  parents: { label: "Rights of Parents", shortLabel: "Parents" },
  dispute_resolution: { label: "Dispute Resolution", shortLabel: "Disputes" },
};

const CATEGORY_ORDER = ["mutual", "wife", "husband", "parents", "dispute_resolution"];

export default function HuqooqPage() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("mutual");

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await HuqooqEntry.list("-created_date");
        setEntries(data);
      } catch (error) {
        console.error("Error loading Huqooq entries:", error);
      }
      setIsLoading(false);
    };
    load();
  }, []);

  const groupedEntries = useMemo(() => {
    const groups = {};
    for (const e of entries) {
      if (!groups[e.category]) groups[e.category] = [];
      groups[e.category].push(e);
    }
    return groups;
  }, [entries]);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <HeartHandshake className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
            Huqooq — Rights &amp; Duties in Islam
          </h1>
          <p className="text-xl text-accent mb-2 arabic-font">الحقوق والواجبات</p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Authentic Qur'an and Hadith references on the rights spouses and parents hold over
            one another, in Arabic, English, and Roman Urdu.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto">
            {CATEGORY_ORDER.map((key) => (
              <TabsTrigger key={key} value={key} className="text-xs sm:text-sm py-2">
                {CATEGORY_META[key].shortLabel}
              </TabsTrigger>
            ))}
          </TabsList>

          {CATEGORY_ORDER.map((key) => (
            <TabsContent key={key} value={key} className="space-y-4 mt-6">
              <h2 className="font-display text-xl font-semibold text-primary text-center mb-2">
                {CATEGORY_META[key].label}
              </h2>
              {isLoading ? (
                <div className="space-y-4">
                  {Array(3).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-40 w-full rounded-lg" />
                  ))}
                </div>
              ) : (groupedEntries[key] || []).length > 0 ? (
                (groupedEntries[key] || []).map((entry) => (
                  <HuqooqCard key={entry.id} entry={entry} />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No entries in this section yet.
                </p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

function HuqooqCard({ entry }) {
  return (
    <Card className="bg-card border-border glow-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <CardTitle className="font-display text-lg text-primary">{entry.theme}</CardTitle>
          <Badge
            variant="outline"
            className="bg-accent/10 text-accent border-accent/20 min-w-0 max-w-full whitespace-normal text-left"
          >
            <BookMarked className="w-3 h-3 mr-1 shrink-0" />
            {entry.reference}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xl arabic-font text-accent text-right leading-loose">
          {entry.text_arabic}
        </p>
        <p className="text-foreground/90 leading-relaxed italic">"{entry.text_english}"</p>
        <p className="text-foreground/70 leading-relaxed">{entry.text_roman_urdu}</p>
        {entry.authenticity_notes && (
          <div className="flex items-start gap-1.5 pt-2 border-t border-border text-xs text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary" />
            <span>{entry.authenticity_notes}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
