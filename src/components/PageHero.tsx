import { motion } from "framer-motion";
import { useImagePreloader } from "@/contexts/ImagePreloader";

interface PageHeroProps {
  image: string;
  title: string;
  subtitle?: string;
  label?: string;
}

const PageHero = ({ image, title, subtitle, label }: PageHeroProps) => {
  const { isImageLoaded } = useImagePreloader();

  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        {!isImageLoaded(image) && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <motion.img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isImageLoaded(image) ? "opacity-100" : "opacity-0"
          }`}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 spa-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {label && (
            <motion.p
              className="text-sm md:text-base uppercase tracking-[0.3em] text-white/90 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {label}
            </motion.p>
          )}

          <motion.h1
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
