import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PageHero from "@/components/PageHero";
import { images as preloadedImages, useImagePreloader } from "@/contexts/ImagePreloader";

const GalleryPage = () => {
  const { t } = useLanguage();
  const { isImageLoaded } = useImagePreloader();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { src: preloadedImages.img3301, alt: "Spa treatment room", span: "row-span-2" },
    { src: preloadedImages.img3304, alt: "Relaxation area", span: "" },
    { src: preloadedImages.img3307, alt: "Massage therapy", span: "row-span-2" },
    { src: preloadedImages.img3309, alt: "Spa interior", span: "" },
    { src: preloadedImages.img3311, alt: "Treatment room", span: "row-span-2" },
    { src: preloadedImages.img3312, alt: "Wellness space", span: "" },
    { src: preloadedImages.img3313, alt: "Spa ambiance", span: "" },
    { src: preloadedImages.img3128, alt: "Reception area", span: "row-span-2" },
    { src: preloadedImages.img3174, alt: "Therapy session", span: "" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        image={preloadedImages.img3307}
        title={t.gallery.title}
        label={t.gallery.label}
        subtitle={t.gallery.subtitle}
      />

      <section className="spa-section">
        <div className="spa-container">
          {/* Header */}
          <motion.div
            ref={headerRef}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
              {t.gallery.label}
            </p>
            <h2 className="spa-heading">
              {t.gallery.title.split(" ")[0]}{" "}
              <span className="italic">{t.gallery.title.split(" ").slice(1).join(" ")}</span>
            </h2>
            <p className="spa-subheading mx-auto mt-4">{t.gallery.subtitle}</p>
          </motion.div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
            {images.map((image, index) => (
              <GalleryImage
                key={index}
                image={image}
                index={index}
                onClick={() => setSelectedImage(image.src)}
                viewText={t.gallery.view}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-background/80 hover:text-background transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close gallery"
          >
            <X size={32} />
          </button>
          <motion.img
            src={selectedImage}
            alt="Gallery full view"
            className="max-w-full max-h-full object-contain rounded-sm"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )}
    </div>
  );
};

const GalleryImage = ({
  image,
  onClick,
  viewText,
}: {
  image: { src: string; alt: string; span: string };
  index: number;
  onClick: () => void;
  viewText: string;
}) => {
  const { isImageLoaded } = useImagePreloader();

  return (
    <div
      className={`relative overflow-hidden rounded-sm cursor-pointer group ${image.span}`}
      onClick={onClick}
    >
      {!isImageLoaded(image.src) && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      <img
        src={image.src}
        alt={image.alt}
        className={`w-full h-full object-cover group-hover:scale-110 ${
          isImageLoaded(image.src) ? "opacity-100" : "opacity-0"
        }`}
        style={{ transition: "transform 0.7s ease, opacity 0.5s ease" }}
      />
      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="text-background text-sm uppercase tracking-widest font-medium">
          {viewText}
        </span>
      </div>
    </div>
  );
};

export default GalleryPage;
