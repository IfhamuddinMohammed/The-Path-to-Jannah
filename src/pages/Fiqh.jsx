import React, { useState, useEffect, useMemo } from "react";
import { FiqhRuling } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Scale, Book, Droplets, Coins, Calendar, Heart } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CATEGORY_META = {
  purification: {
    label: "Purification (Taharah)",
    icon: Droplets,
    color: "bg-[hsl(var(--chart-3)/0.15)] text-[hsl(var(--chart-3))]",
  },
  prayer: {
    label: "Prayer (Salah)",
    icon: Calendar,
    color: "bg-primary/10 text-primary",
  },
  charity: {
    label: "Charity (Zakat)",
    icon: Coins,
    color: "bg-accent/10 text-accent",
  },
  family: {
    label: "Family & Marriage",
    icon: Heart,
    color: "bg-[hsl(var(--chart-4)/0.15)] text-[hsl(var(--chart-4))]",
  },
};

const CATEGORY_ORDER = ["purification", "prayer", "charity", "family"];

export default function FiqhPage() {
  const [rulings, setRulings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await FiqhRuling.list("-created_date");
        setRulings(data);
      } catch (error) {
        console.error("Error loading Fiqh rulings:", error);
      }
      setIsLoading(false);
    };
    load();
  }, []);

  const groupedCategories = useMemo(() => {
    return CATEGORY_ORDER.map((key) => ({
      key,
      ...CATEGORY_META[key],
      topics: rulings.filter((r) => r.category === key),
    })).filter((category) => category.topics.length > 0);
  }, [rulings]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Scale className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
            Islamic Fiqh (Jurisprudence)
          </h1>
          <p className="text-xl text-accent/80 mb-2 font-arabic">الفقه الإسلامي</p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practical Islamic rulings for daily life based on the Qur'an and Sunnah
          </p>
        </div>

        <Card className="mb-8 bg-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Book className="w-8 h-8 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-display font-semibold text-primary mb-2">Important Note</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These are general guidelines based on mainstream Islamic jurisprudence.
                  For specific situations or complex matters, always consult with qualified Islamic scholars
                  or your local imam. Different schools of thought may have varying opinions on certain issues.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-40 w-full rounded-lg" />)
          ) : (
            groupedCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.key}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Icon className="w-6 h-6 text-primary" />
                      <span>{category.label}</span>
                      <Badge className={category.color}>{category.topics.length} Topics</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.topics.map((topic) => (
                        <AccordionItem key={topic.id} value={topic.id}>
                          <AccordionTrigger className="text-left font-medium text-foreground">
                            {topic.title}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pt-2 pb-4">
                              <p className="text-muted-foreground leading-relaxed mb-4">
                                {topic.content}
                              </p>
                              <div className="p-4 bg-secondary rounded-lg border border-border">
                                <p className="text-sm text-secondary-foreground">
                                  <strong>Note:</strong> For detailed rulings and specific situations,
                                  consult authentic Islamic sources or speak with a knowledgeable scholar.
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-center">Sources of Islamic Law</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-primary/10 rounded-lg">
                <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-3 flex items-center justify-center text-primary-foreground font-bold">1</div>
                <h4 className="font-display font-semibold text-primary mb-2">Qur'an</h4>
                <p className="text-sm text-muted-foreground">The Holy Book of Allah</p>
              </div>
              <div className="p-4 bg-accent/10 rounded-lg">
                <div className="w-12 h-12 bg-accent rounded-full mx-auto mb-3 flex items-center justify-center text-accent-foreground font-bold">2</div>
                <h4 className="font-display font-semibold text-accent mb-2">Sunnah</h4>
                <p className="text-sm text-muted-foreground">Prophet's ﷺ teachings</p>
              </div>
              <div className="p-4 bg-[hsl(var(--chart-3)/0.1)] rounded-lg">
                <div className="w-12 h-12 bg-[hsl(var(--chart-3))] rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold">3</div>
                <h4 className="font-display font-semibold text-[hsl(var(--chart-3))] mb-2">Ijma</h4>
                <p className="text-sm text-muted-foreground">Scholarly consensus</p>
              </div>
              <div className="p-4 bg-[hsl(var(--chart-4)/0.1)] rounded-lg">
                <div className="w-12 h-12 bg-[hsl(var(--chart-4))] rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold">4</div>
                <h4 className="font-display font-semibold text-[hsl(var(--chart-4))] mb-2">Qiyas</h4>
                <p className="text-sm text-muted-foreground">Analogical reasoning</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
