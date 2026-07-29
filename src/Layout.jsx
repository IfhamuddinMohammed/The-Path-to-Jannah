import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  BookOpen,
  Video,
  Heart,
  Users,
  MessageSquare,
  Sparkles,
  MoonStar,
  Moon,
  Sun,
  ShieldQuestion,
  BookUser,
  Clock,
  Compass,
  Star,
  Brain,
  Baby,
  Scale,
  Instagram,
  Radio,
  Info,
  CircleDashed,
  X,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import GlobalSearch from "@/components/layout/GlobalSearch";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import ThemeToggle from "@/components/layout/ThemeToggle";

const navigationItems = [
  { title: "Home", url: createPageUrl("Home"), icon: Sparkles, group: "main" },
  { title: "Qur'an", url: createPageUrl("Quran"), icon: BookOpen, group: "main" },
  { title: "Hadith", url: createPageUrl("Hadith"), icon: MessageSquare, group: "main" },
  { title: "Stories", url: createPageUrl("Stories"), icon: BookUser, group: "main" },
  { title: "Guidance", url: createPageUrl("Guidance"), icon: Sun, group: "main" },
  { title: "Prayer Times", url: createPageUrl("PrayerTimes"), icon: Clock, group: "worship" },
  { title: "Qibla", url: createPageUrl("Qibla"), icon: Compass, group: "worship" },
  { title: "99 Names", url: createPageUrl("Names"), icon: Star, group: "worship" },
  { title: "Tasbeeh", url: createPageUrl("Tasbeeh"), icon: CircleDashed, group: "worship" },
  { title: "Seerah", url: createPageUrl("Seerah"), icon: Heart, group: "learning" },
  { title: "Videos", url: createPageUrl("Videos"), icon: Video, group: "learning" },
  { title: "Duas", url: createPageUrl("Duas"), icon: Moon, group: "learning" },
  { title: "Quiz", url: createPageUrl("Quiz"), icon: Brain, group: "learning" },
  { title: "Kids Corner", url: createPageUrl("Kids"), icon: Baby, group: "special" },
  { title: "New Muslims", url: createPageUrl("NewMuslims"), icon: Heart, group: "special" },
  { title: "Fiqh Rulings", url: createPageUrl("Fiqh"), icon: Scale, group: "special" },
  { title: "FAQ", url: createPageUrl("FAQ"), icon: ShieldQuestion, group: "support" },
  { title: "Community", url: createPageUrl("Community"), icon: Users, group: "support" },
  { title: "About", url: createPageUrl("About"), icon: Info, group: "support" },
];

const groupedNavigation = navigationItems.reduce((acc, item) => {
  if (!acc[item.group]) acc[item.group] = [];
  acc[item.group].push(item);
  return acc;
}, {});

const groupTitles = {
  main: "Core Resources",
  worship: "Daily Worship",
  learning: "Learning & Growth",
  special: "Special Sections",
  support: "Support & Community",
};

// Official channels only — read-only announcements, not the in-app Community features.
// TODO: replace with the real Instagram/broadcast channel URLs.
const officialLinks = [
  { label: "Official Instagram", href: "#", icon: Instagram },
  { label: "Broadcast Channel", href: "#", icon: Radio },
];

function NavLink({ item, isActive }) {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarMenuButton
      asChild
      tooltip={item.title}
      className={`hover:bg-accent/10 hover:text-accent transition-all duration-200 rounded-lg mb-0.5 no-select ${
        isActive ? "bg-accent/15 text-accent border-r-2 border-accent nav-active-glow" : ""
      }`}
    >
      <Link
        to={item.url}
        className="flex items-center gap-3 px-3 py-2"
        onClick={() => {
          if (isMobile) setOpenMobile(false);
        }}
      >
        <item.icon className="w-4 h-4 shrink-0" />
        <span className="font-medium text-sm group-data-[collapsible=icon]:hidden">{item.title}</span>
      </Link>
    </SidebarMenuButton>
  );
}

const MENU_HINT_KEY = "sirat_menu_hint_seen";

export default function Layout() {
  const location = useLocation();
  const [showMenuHint, setShowMenuHint] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(MENU_HINT_KEY)) return;
    const timer = setTimeout(() => setShowMenuHint(true), 900);
    return () => clearTimeout(timer);
  }, []);

  const dismissMenuHint = () => {
    setShowMenuHint(false);
    try {
      localStorage.setItem(MENU_HINT_KEY, "true");
    } catch {
      // ignore
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full marble-gradient">
        {/* Desktop Sidebar */}
        <Sidebar collapsible="icon" className="hidden md:flex border-r border-border bg-sidebar backdrop-blur-sm">
          <SidebarHeader className="border-b border-border p-6 group-data-[collapsible=icon]:p-3 geometric-bg">
            <div className="text-center">
              <div className="w-14 h-14 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 mx-auto mb-3 group-data-[collapsible=icon]:mb-0 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center glow-gold transition-all">
                <MoonStar className="w-7 h-7 group-data-[collapsible=icon]:w-4 group-data-[collapsible=icon]:h-4 text-primary-foreground" />
              </div>
              <div className="group-data-[collapsible=icon]:hidden">
                <h2 className="font-display text-xl font-semibold text-primary">SIRAT</h2>
                <p className="text-sm text-accent mt-0.5 arabic-font">صراط</p>
                <p className="text-xs text-muted-foreground mt-1">Bismillah hir Rahman nir Rahim</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-2">
            {Object.entries(groupedNavigation).map(([groupKey, items]) => (
              <SidebarGroup key={groupKey}>
                <SidebarGroupLabel className="text-xs font-medium text-accent uppercase tracking-wider px-3 py-2">
                  {groupTitles[groupKey]}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <NavLink item={item} isActive={location.pathname === item.url} />
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}

            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
              <SidebarGroupLabel className="text-xs font-medium text-accent uppercase tracking-wider px-3 py-2">
                Daily Reminder
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-3 py-4 bg-gradient-to-br from-accent/8 to-primary/8 rounded-lg mx-2 gold-border">
                  <p className="text-sm text-primary font-medium mb-2 font-display">Today's Dhikr</p>
                  <p className="text-base text-primary arabic-font leading-loose">
                    سُبْحَانَ اللَّهِ وَبِحَمْدِهِ
                  </p>
                  <p className="text-xs text-accent mt-1.5 font-body">SubhanAllahi wa bihamdihi</p>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-border p-4 group-data-[collapsible=icon]:p-2 geometric-bg">
            <div className="text-center group-data-[collapsible=icon]:hidden">
              <p className="text-xs text-primary font-medium">May Allah guide us all</p>
              <p className="text-sm text-accent mt-1 arabic-font">اللهم اهدنا فيمن هديت</p>
              <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-border/60">
                {officialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.label}
                    aria-label={link.label}
                    className="text-muted-foreground/60 hover:text-accent transition-colors duration-200"
                  >
                    <link.icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
            <div className="hidden group-data-[collapsible=icon]:flex justify-center">
              <Heart className="w-4 h-4 text-accent" />
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0">
          {/* Top Header with safe-area notch support */}
          <header className="pt-safe bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
            <div className="px-4 py-3 flex items-center gap-3">
              <div className="relative shrink-0">
                <SidebarTrigger
                  className="flex hover:bg-accent/10 p-2 rounded-lg transition-colors duration-200 no-select"
                  onClick={dismissMenuHint}
                />
                {showMenuHint && (
                  <div className="md:hidden absolute left-0 top-full mt-2 z-50 w-60 animate-in fade-in slide-in-from-top-1">
                    <div className="relative bg-primary text-primary-foreground text-sm rounded-xl px-3.5 py-2.5 shadow-lg">
                      <div className="absolute -top-1.5 left-5 w-3 h-3 bg-primary rotate-45"></div>
                      <p className="pr-4">
                        Tap here to explore Qur'an, Duas, Prayer Times & more
                      </p>
                      <button
                        type="button"
                        onClick={dismissMenuHint}
                        aria-label="Dismiss"
                        className="absolute top-1.5 right-1.5 text-primary-foreground/70 hover:text-primary-foreground"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* Mobile brand logo */}
              <div className="md:hidden flex items-center gap-2 shrink-0">
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center glow-gold">
                  <MoonStar className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
              <div className="hidden md:block">
                <Breadcrumbs />
              </div>
              <div className="flex-1 min-w-0 max-w-[260px] sm:max-w-sm md:ml-auto">
                <GlobalSearch />
              </div>
              <div className="shrink-0">
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Page Content — extra bottom padding on mobile for bottom nav */}
          <div className="flex-1 overflow-auto pb-16 md:pb-0">
            <Outlet />
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
      </div>
    </SidebarProvider>
  );
}