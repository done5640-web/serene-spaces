import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const images = [
  { src: gallery1, alt: "Spa reception area with orchids", span: "row-span-2" },
  { src: gallery2, alt: "Hot stones and essential oils", span: "" },
  { src: gallery3, alt: "Zen garden pathway", span: "row-span-2" },
  { src: gallery4, alt: "Facial treatment session", span: "" },
  { src: gallery5, alt: "Relaxation lounge", span: "row-span-2" },
  { src: gallery6, alt: "Hand massage treatment", span: "" },
];

const Gallery = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="spa-section">
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
            Visual Journey
          </p>
          <h2 className="spa-heading">
            Our <span className="italic">Gallery</span>
          </h2>
          <p className="spa-subheading mx-auto mt-4">
            Step inside our sanctuary and experience the serene atmosphere that
            awaits you.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
          {images.map((image, index) => (
            <GalleryImage
              key={index}
              image={image}
              index={index}
              onClick={() => setSelectedImage(image.src)}
            />
          ))}
        </div>
      </div>

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
    </section>
  );
};

const GalleryImage = ({
  image,
  index,
  onClick,
}: {
  image: (typeof images)[0];
  index: number;
  onClick: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-sm cursor-pointer group ${image.span}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="text-background text-sm uppercase tracking-widest font-medium">
          View
        </span>
      </div>
    </motion.div>
  );
};

export default Gallery;
