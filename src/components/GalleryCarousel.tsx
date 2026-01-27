import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { images as preloadedImages, useImagePreloader } from "@/contexts/ImagePreloader";

const galleryImages = [
  { src: preloadedImages.img3301, alt: "Spa treatment room" },
  { src: preloadedImages.img3304, alt: "Relaxation area" },
  { src: preloadedImages.img3307, alt: "Massage therapy" },
  { src: preloadedImages.img3309, alt: "Spa interior" },
  { src: preloadedImages.img3311, alt: "Treatment room" },
  { src: preloadedImages.img3312, alt: "Wellness space" },
  { src: preloadedImages.img3313, alt: "Spa ambiance" },
  { src: preloadedImages.img3128, alt: "Reception area" },
  { src: preloadedImages.img3174, alt: "Therapy session" },
];

// Triple the images for seamless infinite scroll
const infiniteImages = [...galleryImages, ...galleryImages, ...galleryImages];

const GalleryCarousel = () => {
  const { t } = useLanguage();
  const { isImageLoaded } = useImagePreloader();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isResettingRef = useRef(false);

  // On mount, scroll to the middle set so we can scroll in both directions
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    // Wait for layout
    requestAnimationFrame(() => {
      const totalScrollWidth = el.scrollWidth;
      const oneSetWidth = totalScrollWidth / 3;
      el.scrollLeft = oneSetWidth;
    });
  }, []);

  // Check boundaries and reset scroll position seamlessly
  const handleScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el || isResettingRef.current) return;

    const totalScrollWidth = el.scrollWidth;
    const oneSetWidth = totalScrollWidth / 3;
    const scrollLeft = el.scrollLeft;

    // If scrolled past the end of the middle set, jump back
    if (scrollLeft >= oneSetWidth * 2) {
      isResettingRef.current = true;
      el.style.scrollBehavior = "auto";
      el.scrollLeft = scrollLeft - oneSetWidth;
      el.style.scrollBehavior = "";
      requestAnimationFrame(() => {
        isResettingRef.current = false;
      });
    }
    // If scrolled before the start of the middle set, jump forward
    else if (scrollLeft <= 0) {
      isResettingRef.current = true;
      el.style.scrollBehavior = "auto";
      el.scrollLeft = scrollLeft + oneSetWidth;
      el.style.scrollBehavior = "";
      requestAnimationFrame(() => {
        isResettingRef.current = false;
      });
    }
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      // On mobile, scroll exactly one card. On desktop, scroll 300px.
      const isMobile = window.innerWidth < 768;
      const gap = 16; // gap-4 = 1rem = 16px
      const scrollAmount = isMobile
        ? carouselRef.current.querySelector("div")?.offsetWidth! + gap
        : 300;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const openLightbox = (index: number) => {
    // Map the tripled index back to the real image index
    const realIndex = index % galleryImages.length;
    setSelectedIndex(realIndex);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "auto";
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (selectedIndex === null) return;
    if (direction === "prev") {
      setSelectedIndex(selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1);
    } else {
      setSelectedIndex(selectedIndex === galleryImages.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedIndex === null) return;
    if (e.key === "ArrowLeft") navigateLightbox("prev");
    if (e.key === "ArrowRight") navigateLightbox("next");
    if (e.key === "Escape") closeLightbox();
  };

  return (
    <section className="spa-section" id="gallery">
      <div className="spa-container">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scrollCarousel("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 -ml-4"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide py-4 snap-x snap-mandatory md:snap-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", paddingLeft: "1rem", paddingRight: "1rem" }}
          >
            {infiniteImages.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[calc(100vw-3rem)] h-80 md:w-72 md:h-96 relative rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow snap-start"
                onClick={() => openLightbox(index)}
              >
                <div className="w-full h-full relative">
                  {!isImageLoaded(image.src) && (
                    <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
                  )}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`w-full h-full object-cover group-hover:scale-110 ${
                      isImageLoaded(image.src) ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transition: "transform 0.7s ease, opacity 0.5s ease" }}
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white text-sm uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {t.gallery.view}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scrollCarousel("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 -mr-4"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
              onClick={closeLightbox}
              aria-label="Close gallery"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Previous Button */}
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("prev");
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              className="relative max-w-[90vw] max-h-[85vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {!isImageLoaded(galleryImages[selectedIndex].src) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
              <img
                src={galleryImages[selectedIndex].src}
                alt={galleryImages[selectedIndex].alt}
                className={`max-w-[90vw] max-h-[85vh] object-contain rounded-lg transition-opacity duration-300 ${
                  isImageLoaded(galleryImages[selectedIndex].src) ? "opacity-100" : "opacity-0"
                }`}
              />
            </motion.div>

            {/* Next Button */}
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("next");
              }}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryCarousel;
