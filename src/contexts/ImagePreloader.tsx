import { createContext, useContext, useEffect, useState, useCallback } from "react";

// Import ALL images used across the app
import heroImage from "@/assets/header1 compress.opt.jpeg";
import aboutImage from "@/assets/header24 compress.opt.jpeg";
import contactHero from "@/assets/contact-hero.jpg";
import kontaktiHeader from "@/assets/kontakti header.opt.jpeg";
import logoImage from "@/assets/logo sensea 2.png";
import img3128 from "@/assets/IMG_3128.JPG.opt.jpeg";
import img3174 from "@/assets/IMG_3174.JPG.jpeg";
import img3301 from "@/assets/IMG_3301.JPG.opt.jpeg";
import img3304 from "@/assets/IMG_3304.JPG.opt.jpeg";
import img3307 from "@/assets/IMG_3307.JPG.opt.jpeg";
import img3309 from "@/assets/IMG_3309.JPG.opt.jpeg";
import img3311 from "@/assets/IMG_3311.JPG.opt.jpeg";
import img3312 from "@/assets/IMG_3312.JPG.opt.jpeg";
import img3313 from "@/assets/IMG_3313.JPG.opt.jpeg";
import img3298 from "@/assets/IMG_3298.JPG.opt.jpeg";

// Export images so components can import from here
export const images = {
  heroImage,
  aboutImage,
  contactHero,
  kontaktiHeader,
  logoImage,
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

// Critical images: only these block the loading screen (above-the-fold on home page)
const CRITICAL_IMAGE_URLS = [heroImage, logoImage, aboutImage];

// All remaining images load in the background after the site is shown
const ALL_IMAGE_URLS = Object.values(images);

interface ImagePreloaderContextType {
  isImageLoaded: (src: string) => boolean;
  allLoaded: boolean;
  criticalLoaded: boolean;
  loadedCount: number;
  totalCount: number;
}

const ImagePreloaderContext = createContext<ImagePreloaderContextType>({
  isImageLoaded: () => false,
  allLoaded: false,
  criticalLoaded: false,
  loadedCount: 0,
  totalCount: ALL_IMAGE_URLS.length,
});

export const useImagePreloader = () => useContext(ImagePreloaderContext);

export const ImagePreloaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [criticalDone, setCriticalDone] = useState(false);

  useEffect(() => {
    const markLoaded = (src: string) => {
      setLoadedImages((prev) => {
        const next = new Set(prev);
        next.add(src);
        return next;
      });
    };

    // Load critical images first
    let criticalCount = 0;
    const criticalTotal = CRITICAL_IMAGE_URLS.length;

    CRITICAL_IMAGE_URLS.forEach((src) => {
      const img = new Image();
      const done = () => {
        markLoaded(src);
        criticalCount++;
        if (criticalCount >= criticalTotal) {
          setCriticalDone(true);
          // Now load the rest in the background
          ALL_IMAGE_URLS.forEach((bgSrc) => {
            if (CRITICAL_IMAGE_URLS.includes(bgSrc)) return; // already loaded
            const bgImg = new Image();
            bgImg.onload = () => markLoaded(bgSrc);
            bgImg.onerror = () => markLoaded(bgSrc);
            bgImg.src = bgSrc;
          });
        }
      };
      img.onload = done;
      img.onerror = done;
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
    criticalLoaded: criticalDone,
    loadedCount: loadedImages.size,
    totalCount: ALL_IMAGE_URLS.length,
  };

  return (
    <ImagePreloaderContext.Provider value={value}>
      {children}
    </ImagePreloaderContext.Provider>
  );
};
