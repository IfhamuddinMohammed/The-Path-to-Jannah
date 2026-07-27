import React, { useState, useEffect } from "react";
import { FAQ } from "@/entities/all";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldQuestion } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ReactMarkdown from "react-markdown";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFaqs = async () => {
      setIsLoading(true);
      try {
        const data = await FAQ.list('-created_date');
        setFaqs(data);
      } catch (error) {
        console.error("Error loading FAQs:", error);
      }
      setIsLoading(false);
    };
    loadFaqs();
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <ShieldQuestion className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">Ask a Scholar / FAQ</h1>
          <p className="text-muted-foreground">Common questions answered with Qur'an & Hadith.</p>
        </div>

        {isLoading ? <Skeleton className="h-96 w-full" /> :
        <Card className="border-border glow-shadow">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map(faq => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="prose max-w-none pt-2">
                    <ReactMarkdown>{faq.answer}</ReactMarkdown>
                    {faq.source_reference && <p><small><strong>Reference:</strong> {faq.source_reference}</small></p>}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
        }
      </div>
    </div>
  );
}