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
import Home from './pages/Home';
import Quran from './pages/Quran';
import Guidance from './pages/Guidance';
import Hadith from './pages/Hadith';
import Stories from './pages/Stories';
import Videos from './pages/Videos';
import Duas from './pages/Duas';
import FAQ from './pages/FAQ';
import Community from './pages/Community';
import PrayerTimes from './pages/PrayerTimes';
import Qibla from './pages/Qibla';
import Names from './pages/Names';
import Tasbeeh from './pages/Tasbeeh';
import Seerah from './pages/Seerah';
import Quiz from './pages/Quiz';
import Kids from './pages/Kids';
import NewMuslims from './pages/NewMuslims';
import Fiqh from './pages/Fiqh';
import Huqooq from './pages/Huqooq';
import About from './pages/About';
import { AdhaanProvider } from '@/hooks/useAdhaan';
import AdhaanBanner from '@/components/adhaan/AdhaanBanner';
import { QuranAudioProvider } from '@/hooks/useQuranAudio';
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
        {/* Add your page Route elements here */}
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
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
              <Router>
                <ScrollToTop />
                <AuthenticatedApp />
              </Router>
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