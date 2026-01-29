import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ImagePreloaderProvider, useImagePreloader } from "@/contexts/ImagePreloader";
import { NavigationLoaderProvider, useNavigationLoader } from "@/contexts/NavigationLoader";
import LoadingScreen from "@/components/LoadingScreen";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import PricingPage from "./pages/PricingPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const MIN_LOADING_MS = 2400; // Minimum time to show loading (let SVG animation finish)

const AppShell = () => {
  // const { isNavigating } = useNavigationLoader();

  return (
    <>
      {/* <LoadingScreen isLoading={isNavigating} variant="nav" /> */}
      <ScrollToTop />
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

const AppContent = () => {
  const { criticalLoaded } = useImagePreloader();
  const [showLoading, setShowLoading] = useState(true);
  const [minTimePassed, setMinTimePassed] = useState(false);

  // Minimum display time for the loading animation
  useEffect(() => {
    const timer = setTimeout(() => setMinTimePassed(true), MIN_LOADING_MS);
    return () => clearTimeout(timer);
  }, []);

  // Hide loading once critical images are ready and animation has played
  useEffect(() => {
    if (criticalLoaded && minTimePassed) {
      setShowLoading(false);
    }
  }, [criticalLoaded, minTimePassed]);

  return (
    <>
      <LoadingScreen isLoading={showLoading} variant="full" />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <NavigationLoaderProvider>
            <AppShell />
          </NavigationLoaderProvider>
        </BrowserRouter>
      </TooltipProvider>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ImagePreloaderProvider>
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
    </ImagePreloaderProvider>
  </QueryClientProvider>
);

export default App;
