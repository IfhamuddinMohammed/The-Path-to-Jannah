import { lazy, Suspense, useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import Layout from './Layout';

// Lazy-loaded per route: previously every page was statically imported here, so visiting "/"
// downloaded the code for all 21+ pages (Quran, Hadith, Seerah, Kids, Quiz, MosqueFinder, etc.)
// up front in one ~2.3MB bundle before anything could render. Splitting per-route means each
// page's code only loads when its route is actually visited.
const Home = lazy(() => import('./pages/Home'));
const Quran = lazy(() => import('./pages/Quran'));
const Guidance = lazy(() => import('./pages/Guidance'));
const Hadith = lazy(() => import('./pages/Hadith'));
const Stories = lazy(() => import('./pages/Stories'));
const Videos = lazy(() => import('./pages/Videos'));
const Duas = lazy(() => import('./pages/Duas'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Community = lazy(() => import('./pages/Community'));
const PrayerTimes = lazy(() => import('./pages/PrayerTimes'));
const Qibla = lazy(() => import('./pages/Qibla'));
const Names = lazy(() => import('./pages/Names'));
const Tasbeeh = lazy(() => import('./pages/Tasbeeh'));
const Seerah = lazy(() => import('./pages/Seerah'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Kids = lazy(() => import('./pages/Kids'));
const NewMuslims = lazy(() => import('./pages/NewMuslims'));
const Fiqh = lazy(() => import('./pages/Fiqh'));
const Huqooq = lazy(() => import('./pages/Huqooq'));
const About = lazy(() => import('./pages/About'));
const MosqueFinder = lazy(() => import('./pages/MosqueFinder'));
const PrayerAcademy = lazy(() => import('./pages/PrayerAcademy'));
import { AdhaanProvider } from '@/hooks/useAdhaan';
import AdhaanBanner from '@/components/adhaan/AdhaanBanner';
import { QuranAudioProvider } from '@/hooks/useQuranAudio';
import { PrayerPreferencesProvider } from '@/hooks/usePrayerPreferences';
import { useHardwareBackButton } from '@/hooks/useHardwareBackButton';
import SplashScreen from '@/components/SplashScreen';
// Add page imports here

// Minimum time the branded splash stays up, regardless of how fast the app-state check
// resolves. Without this, on a warm connection it can resolve in well under a second — too
// quick for anyone to actually read the wordmark/tagline it exists to show.
const MIN_SPLASH_DURATION_MS = 2000;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  const [splashReady, setSplashReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // Hold the splash until BOTH the minimum duration has passed AND the Home page's own
    // chunk has actually finished downloading — not just a fixed timer. A fixed timer alone
    // only guarantees people can read the wordmark; it says nothing about whether Home is
    // ready right after, so on a slow connection this splash was immediately followed by a
    // second, plainer loading screen (the <Suspense> fallback below, still waiting on
    // Home.jsx) — two disconnected screens back to back instead of one continuous one.
    // Waiting on the chunk itself means that fallback has (almost) nothing left to wait for
    // by the time this splash goes away, regardless of connection speed.
    Promise.all([
      new Promise((resolve) => setTimeout(resolve, MIN_SPLASH_DURATION_MS)),
      import('./pages/Home'),
    ]).then(() => {
      if (!cancelled) setSplashReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Shown while checking app public settings/auth, and until splashReady above
  if (isLoadingPublicSettings || isLoadingAuth || !splashReady) {
    return <SplashScreen />;
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app. Home's chunk is prefetched above during the splash's minimum-
  // duration window, so this fallback rarely shows on first launch — but React.lazy still
  // takes one extra render tick to flip from pending to resolved even with an already-cached
  // module, so a brief flash here is essentially unavoidable. Reusing SplashScreen itself
  // (not a smaller/differently-styled spinner) means there's no visible change at all across
  // that flash — it just reads as one continuous screen the whole time until Home mounts.
  return (
    <Suspense fallback={<SplashScreen />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Quran" element={<Quran />} />
          <Route path="/Guidance" element={<Guidance />} />
          <Route path="/Hadith" element={<Hadith />} />
          <Route path="/Stories" element={<Stories />} />
          <Route path="/Videos" element={<Videos />} />
          <Route path="/Duas" element={<Duas />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/PrayerTimes" element={<PrayerTimes />} />
          <Route path="/Qibla" element={<Qibla />} />
          <Route path="/Names" element={<Names />} />
          <Route path="/Tasbeeh" element={<Tasbeeh />} />
          <Route path="/Seerah" element={<Seerah />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/Kids" element={<Kids />} />
          <Route path="/NewMuslims" element={<NewMuslims />} />
          <Route path="/Fiqh" element={<Fiqh />} />
          <Route path="/Huqooq" element={<Huqooq />} />
          <Route path="/About" element={<About />} />
          <Route path="/MosqueFinder" element={<MosqueFinder />} />
          <Route path="/PrayerAcademy" element={<PrayerAcademy />} />
          {/* Add your page Route elements here */}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};


function App() {
  useHardwareBackButton();

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <AdhaanProvider>
            <QuranAudioProvider>
              <PrayerPreferencesProvider>
                <Router>
                  <ScrollToTop />
                  <AuthenticatedApp />
                </Router>
              </PrayerPreferencesProvider>
            </QuranAudioProvider>
            <AdhaanBanner />
          </AdhaanProvider>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App