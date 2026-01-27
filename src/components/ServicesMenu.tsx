import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { images as preloadedImages, useImagePreloader } from "@/contexts/ImagePreloader";

const ServicesMenu = () => {
  const { t } = useLanguage();
  const { isImageLoaded } = useImagePreloader();

  const menuItems = [
    {
      image: preloadedImages.img3307,
      title: t.services.items.massage.title,
      description: t.services.items.massage.description,
      link: "/services",
    },
    {
      image: preloadedImages.img3309,
      title: t.services.items.facial.title,
      description: t.services.items.facial.description,
      link: "/services",
    },
    {
      image: preloadedImages.img3311,
      title: t.services.items.body.title,
      description: t.services.items.body.description,
      link: "/services",
    },
    {
      image: preloadedImages.img3312,
      title: t.services.items.aromatherapy.title,
      description: t.services.items.aromatherapy.description,
      link: "/services",
    },
    {
      image: preloadedImages.img3174,
      title: t.services.items.couples.title,
      description: t.services.items.couples.description,
      link: "/services",
    },
    {
      image: preloadedImages.img3128,
      title: t.services.items.meditation.title,
      description: t.services.items.meditation.description,
      link: "/services",
    },
  ];

  return (
    <section className="spa-section bg-secondary/30" id="services-menu">
      <div className="spa-container">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
            {t.services.label}
          </p>
          <h2 className="spa-heading">
            {t.services.title.split(" ")[0]}{" "}
            <span className="italic">{t.services.title.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="spa-subheading mx-auto mt-4">{t.services.subtitle}</p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {menuItems.map((item) => (
            <div key={item.title}>
              <Link to={item.link} className="block group">
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="w-full h-full relative">
                      {!isImageLoaded(item.image) && (
                        <div className="absolute inset-0 bg-muted animate-pulse" />
                      )}
                      <img
                        src={item.image}
                        alt={item.title}
                        className={`w-full h-full object-cover group-hover:scale-110 ${
                          isImageLoaded(item.image) ? "opacity-100" : "opacity-0"
                        }`}
                        style={{ transition: "transform 0.7s ease, opacity 0.5s ease" }}
                      />
                    </div>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <h3 className="font-serif text-xl md:text-2xl text-white mb-2 drop-shadow-lg">
                        {item.title}
                      </h3>
                      <p className="text-white/80 text-sm line-clamp-2 drop-shadow-md">
                        {item.description}
                      </p>
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/services">
            <motion.button
              className="spa-button-outline"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.services.label}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesMenu;
