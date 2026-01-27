import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import PageHero from "@/components/PageHero";
import { images as preloadedImages, useImagePreloader } from "@/contexts/ImagePreloader";

const AboutPage = () => {
  const { t } = useLanguage();
  const { isImageLoaded } = useImagePreloader();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        image={preloadedImages.img3128}
        title={t.about.title1 + " " + t.about.title2}
        label={t.about.label}
      />

      <section className="spa-section">
        <div className="spa-container">
          <div
            ref={ref}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative overflow-hidden rounded-sm h-[500px]">
                {!isImageLoaded(preloadedImages.aboutImage) && (
                  <div className="absolute inset-0 bg-muted animate-pulse" />
                )}
                <img
                  src={preloadedImages.aboutImage}
                  alt="Peaceful spa treatment room"
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    isImageLoaded(preloadedImages.aboutImage) ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-primary/30 rounded-sm -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
                {t.about.label}
              </p>
              <h2 className="spa-heading">
                {t.about.title1}
                <br />
                <span className="italic">{t.about.title2}</span>
              </h2>
              <div className="w-16 h-px bg-primary/50 my-8" />
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t.about.paragraph1}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t.about.paragraph2}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
