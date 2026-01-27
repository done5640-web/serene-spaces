import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { images as preloadedImages, useImagePreloader } from "@/contexts/ImagePreloader";
import AboutSection from "@/components/AboutSection";
import ServicesMenu from "@/components/ServicesMenu";
import PricingSection from "@/components/PricingSection";
import GalleryCarousel from "@/components/GalleryCarousel";
import ContactSection from "@/components/ContactSection";

const HomePage = () => {
  const { t } = useLanguage();
  const { isImageLoaded } = useImagePreloader();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          {!isImageLoaded(preloadedImages.heroImage) && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <motion.img
            src={preloadedImages.heroImage}
            alt="Sensea Massage spa environment"
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              isImageLoaded(preloadedImages.heroImage) ? "opacity-100" : "opacity-0"
            }`}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 spa-container text-center pt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <motion.p
              className="text-sm md:text-base uppercase tracking-[0.3em] text-white/90 mb-6 drop-shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {t.hero.welcome}
            </motion.p>

            <motion.h1
              className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {t.hero.title1}
              <br />
              <span className="italic text-primary-foreground">{t.hero.title2}</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12 drop-shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <motion.button
                onClick={() => scrollToSection("contact")}
                className="spa-button-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.hero.cta}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          onClick={() => scrollToSection("about")}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <div className="w-1 h-2 rounded-full bg-white/70" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Services Menu with Photos */}
      <ServicesMenu />

      {/* Pricing Section */}
      <PricingSection />

      {/* Gallery Carousel */}
      <GalleryCarousel />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default HomePage;
