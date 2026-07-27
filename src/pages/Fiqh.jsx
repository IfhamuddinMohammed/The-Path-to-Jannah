import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, Book, Droplets, Coins, Calendar, Heart } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FiqhPage() {
  const fiqhCategories = [
    {
      title: "Purification (Taharah)",
      icon: Droplets,
      color: "bg-[hsl(var(--chart-3)/0.15)] text-[hsl(var(--chart-3))]",
      topics: [
        {
          title: "Wudu (Ablution)",
          content: "Learn the proper steps for performing ablution before prayer, including the conditions that break wudu and how to renew it."
        },
        {
          title: "Ghusl (Full Body Ablution)",
          content: "When and how to perform the complete washing of the body, required after certain states of impurity."
        },
        {
          title: "Najasah (Impurities)",
          content: "Understanding what constitutes impurity in Islamic law and how to purify oneself and one's clothing."
        }
      ]
    },
    {
      title: "Prayer (Salah)",
      icon: Calendar,
      color: "bg-primary/10 text-primary",
      topics: [
        {
          title: "Five Daily Prayers",
          content: "Timing, conditions, and proper performance of the obligatory prayers: Fajr, Dhuhr, Asr, Maghrib, and Isha."
        },
        {
          title: "Friday Prayer (Jummah)",
          content: "Special rulings for the congregational Friday prayer and its importance in Islam."
        },
        {
          title: "Missed Prayers (Qada)",
          content: "How to make up prayers that were missed due to sleep, forgetfulness, or other valid reasons."
        }
      ]
    },
    {
      title: "Charity (Zakat)",
      icon: Coins,
      color: "bg-accent/10 text-accent",
      topics: [
        {
          title: "Zakat Calculation",
          content: "How to calculate the obligatory charity (2.5%) on different types of wealth including money, gold, silver, and business assets."
        },
        {
          title: "Who Receives Zakat",
          content: "The eight categories of people eligible to receive Zakat according to Islamic law."
        },
        {
          title: "Zakat al-Fitr",
          content: "The special charity given at the end of Ramadan before Eid prayers."
        }
      ]
    },
    {
      title: "Family & Marriage",
      icon: Heart,
      color: "bg-[hsl(var(--chart-4)/0.15)] text-[hsl(var(--chart-4))]",
      topics: [
        {
          title: "Marriage Contract",
          content: "Islamic requirements for a valid marriage, including the marriage contract, witnesses, and mahr (dower)."
        },
        {
          title: "Rights and Duties",
          content: "The rights and responsibilities of spouses towards each other in Islamic marriage."
        },
        {
          title: "Divorce Rulings",
          content: "Islamic laws regarding divorce, including types of divorce and waiting periods (iddah)."
        }
      ]
    }
  ];

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
          {fiqhCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-primary" />
                    <span>{category.title}</span>
                    <Badge className={category.color}>{category.topics.length} Topics</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.topics.map((topic, topicIndex) => (
                      <AccordionItem key={topicIndex} value={`${categoryIndex}-${topicIndex}`}>
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
          })}
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