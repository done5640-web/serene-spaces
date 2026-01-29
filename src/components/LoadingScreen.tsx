import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  isLoading: boolean;
  variant?: "full" | "nav";
}

const LoadingScreen = ({ isLoading, variant = "full" }: LoadingScreenProps) => {
  // Lock body scroll while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  const isFull = variant === "full";
  // For nav transitions, speed everything up
  const speed = isFull ? 1 : 0.4;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: isFull ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            enter: { duration: isFull ? 0 : 0.25 },
            exit: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          {/* SVG Logo with line-drawing animation */}
          <div className={isFull ? "w-48 h-48 md:w-64 md:h-64 mb-8" : "w-32 h-32 md:w-40 md:h-40 mb-6"}>
            <svg
              viewBox="0 0 500 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Hair bun */}
              <motion.path
                d="M 260 68 C 260 52, 280 42, 290 50 C 300 58, 295 72, 280 72 C 270 72, 262 70, 260 68 Z"
                stroke="#C8A951"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4 * speed, ease: "easeInOut", delay: 0 }}
              />
              {/* Head */}
              <motion.path
                d="M 268 75 C 250 85, 235 110, 250 135 C 265 155, 295 155, 310 135 C 325 115, 315 85, 295 75"
                stroke="#C8A951"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 * speed, ease: "easeInOut", delay: 0.3 * speed }}
              />
              {/* Body / back curve */}
              <motion.path
                d="M 255 140 C 235 170, 220 210, 225 250 C 228 270, 240 285, 255 295"
                stroke="#C8A951"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6 * speed, ease: "easeInOut", delay: 0.7 * speed }}
              />
              {/* Arms / hands working - line 1 */}
              <motion.path
                d="M 260 230 C 270 240, 285 252, 275 268"
                stroke="#C8A951"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3 * speed, ease: "easeInOut", delay: 1.2 * speed }}
              />
              {/* Arms / hands working - line 2 */}
              <motion.path
                d="M 250 245 C 265 255, 280 268, 270 285"
                stroke="#C8A951"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3 * speed, ease: "easeInOut", delay: 1.4 * speed }}
              />
              {/* Person lying down - body */}
              <motion.path
                d="M 270 300 C 310 290, 350 295, 380 310 C 410 325, 420 345, 395 355 C 370 365, 340 350, 320 340"
                stroke="#C8A951"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6 * speed, ease: "easeInOut", delay: 1.6 * speed }}
              />
              {/* Table / flowing line underneath */}
              <motion.path
                d="M 60 340 C 120 310, 190 300, 255 298 C 300 296, 340 300, 390 320 C 420 332, 440 345, 450 355"
                stroke="#C8A951"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 * speed, ease: "easeInOut", delay: 2.0 * speed }}
              />
            </svg>
          </div>

          {/* Brand name fades in after drawing */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4 * speed, duration: 0.6 * speed }}
          >
            <h1
              className="font-serif text-2xl md:text-3xl tracking-wide text-foreground"
            >
              Sensea
            </h1>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mt-1">
              Massage Therapy
            </p>
          </motion.div>

          {/* Subtle loading indicator - only on full load */}
          {isFull && (
            <motion.div
              className="mt-8 w-32 h-px bg-border overflow-hidden rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.4 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: "#C8A951" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  delay: 2.6,
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
