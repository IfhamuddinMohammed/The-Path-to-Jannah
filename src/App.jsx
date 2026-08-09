import { lazy, Suspense } from 'react';
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
// Add page imports here

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
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

  // Render the main app
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
        </div>
      }
    >
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