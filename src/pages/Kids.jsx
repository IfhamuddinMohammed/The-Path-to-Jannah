import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Baby, BookOpen, Gamepad2, Heart, Music } from "lucide-react";
import StoriesTab from "@/components/kids/StoriesTab";
import AlphabetTab from "@/components/kids/AlphabetTab";
import QuizTab from "@/components/kids/QuizTab";
import MannersTab from "@/components/kids/MannersTab";
import NasheedsTab from "@/components/kids/NasheedsTab";

export default function KidsPage() {
  const [activeTab, setActiveTab] = useState("stories");

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Baby className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">Kids Corner</h1>
          <p className="text-accent mb-2 arabic-font text-xl">ركن الأطفال</p>
          <p className="text-muted-foreground">Fun Islamic learning for young Muslims</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto gap-1">
            <TabsTrigger value="stories" className="text-xs sm:text-sm py-2 gap-1.5">
              <BookOpen className="w-4 h-4 hidden sm:inline" /> Stories
            </TabsTrigger>
            <TabsTrigger value="alphabet" className="text-xs sm:text-sm py-2 gap-1.5">
              <span className="arabic-font hidden sm:inline">أ</span> Letters
            </TabsTrigger>
            <TabsTrigger value="quiz" className="text-xs sm:text-sm py-2 gap-1.5">
              <Gamepad2 className="w-4 h-4 hidden sm:inline" /> Quiz Time
            </TabsTrigger>
            <TabsTrigger value="manners" className="text-xs sm:text-sm py-2 gap-1.5">
              <Heart className="w-4 h-4 hidden sm:inline" /> Manners
            </TabsTrigger>
            <TabsTrigger value="nasheeds" className="text-xs sm:text-sm py-2 gap-1.5">
              <Music className="w-4 h-4 hidden sm:inline" /> Nasheeds
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stories" className="mt-6">
            <StoriesTab />
          </TabsContent>
          <TabsContent value="alphabet" className="mt-6">
            <AlphabetTab />
          </TabsContent>
          <TabsContent value="quiz" className="mt-6">
            <QuizTab />
          </TabsContent>
          <TabsContent value="manners" className="mt-6">
            <MannersTab />
          </TabsContent>
          <TabsContent value="nasheeds" className="mt-6">
            <NasheedsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
