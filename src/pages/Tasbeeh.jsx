import React from "react";
import { MoonStar } from "lucide-react";
import TasbeehCounter from "@/components/dhikr/TasbeehCounter";

export default function TasbeehPage() {
  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-accent/40"></div>
            <MoonStar className="w-12 h-12 text-accent" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-accent/40"></div>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-2">
            Tasbeeh Counter
          </h1>
          <p className="text-2xl text-accent mb-2 arabic-font">التسبيح</p>
          <p className="text-muted-foreground font-body">
            Remember Allah with every tap — SubhanAllah, Alhamdulillah, Allahu Akbar, and more
          </p>
        </div>

        <TasbeehCounter />
      </div>
    </div>
  );
}
