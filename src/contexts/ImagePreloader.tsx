import { createContext, useContext, useEffect, useState, useCallback } from "react";

// Import ALL images used across the app
import heroImage from "@/assets/hero-spa.jpg";
import aboutImage from "@/assets/about-spa.jpg";
import contactHero from "@/assets/contact-hero.jpg";
import img3128 from "@/assets/IMG_3128.JPG.jpeg";
import img3174 from "@/assets/IMG_3174.JPG.jpeg";
import img3301 from "@/assets/IMG_3301.JPG.jpeg";
import img3304 from "@/assets/IMG_3304.JPG.jpeg";
import img3307 from "@/assets/IMG_3307.JPG.jpeg";
import img3309 from "@/assets/IMG_3309.JPG.jpeg";
import img3311 from "@/assets/IMG_3311.JPG.jpeg";
import img3312 from "@/assets/IMG_3312.JPG.jpeg";
import img3313 from "@/assets/IMG_3313.JPG.jpeg";
import img3298 from "@/assets/IMG_3298.JPG.jpeg";

// Export images so components can import from here
export const images = {
  heroImage,
  aboutImage,
  contactHero,
  img3128,
  img3174,
  img3298,
  img3301,
  img3304,
  img3307,
  img3309,
  img3311,
  img3312,
  img3313,
} as const;

// All image URLs to preload
const ALL_IMAGE_URLS = Object.values(images);

interface ImagePreloaderContextType {
  isImageLoaded: (src: string) => boolean;
  allLoaded: boolean;
  loadedCount: number;
  totalCount: number;
}

const ImagePreloaderContext = createContext<ImagePreloaderContextType>({
  isImageLoaded: () => false,
  allLoaded: false,
  loadedCount: 0,
  totalCount: ALL_IMAGE_URLS.length,
});

export const useImagePreloader = () => useContext(ImagePreloaderContext);

export const ImagePreloaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Start preloading all images immediately
    ALL_IMAGE_URLS.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages((prev) => {
          const next = new Set(prev);
          next.add(src);
          return next;
        });
      };
      img.onerror = () => {
        // Still mark as "loaded" so we don't block rendering
        setLoadedImages((prev) => {
          const next = new Set(prev);
          next.add(src);
          return next;
        });
      };
      img.src = src;
    });
  }, []);

  const isImageLoaded = useCallback(
    (src: string) => loadedImages.has(src),
    [loadedImages]
  );

  const value: ImagePreloaderContextType = {
    isImageLoaded,
    allLoaded: loadedImages.size >= ALL_IMAGE_URLS.length,
    loadedCount: loadedImages.size,
    totalCount: ALL_IMAGE_URLS.length,
  };

  return (
    <ImagePreloaderContext.Provider value={value}>
      {children}
    </ImagePreloaderContext.Provider>
  );
};
