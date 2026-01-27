import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { pricingData, Category } from "@/data/pricing";
import PageHero from "@/components/PageHero";
import { images as preloadedImages } from "@/contexts/ImagePreloader";

const ServicesPage = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("massages");

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activeData = pricingData.find((cat) => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        image={preloadedImages.img3174}
        title={t.services.title}
        label={t.services.label}
        subtitle={t.services.subtitle}
      />

      <section className="spa-section">
        <div className="spa-container">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            {pricingData.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card text-foreground hover:bg-primary/10 border border-border"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category.name[language]}
              </motion.button>
            ))}
          </div>

          {/* Category Title */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              {activeData?.name[language]}
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4" />
          </motion.div>

          {/* Treatments Grid */}
          <motion.div
            key={`treatments-${activeCategory}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto"
          >
            {activeData?.treatments.map((treatment, index) => (
              <TreatmentCard
                key={treatment.name[language]}
                treatment={treatment}
                language={language}
                index={index}
              />
            ))}
          </motion.div>

          {/* Price Note */}
          <motion.p
            className="text-center text-sm text-muted-foreground mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {language === "sq"
              ? "* Të gjitha çmimet janë në LEK. Rezervoni paraprakisht për të siguruar kohën tuaj të preferuar."
              : "* All prices are in LEK. Please book in advance to secure your preferred time."}
          </motion.p>
        </div>
      </section>
    </div>
  );
};

const TreatmentCard = ({
  treatment,
  language,
  index,
}: {
  treatment: Category["treatments"][0];
  language: "sq" | "en";
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-card rounded-lg p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow border border-border/50"
    >
      <h3 className="font-serif text-lg md:text-xl text-foreground mb-4">
        {treatment.name[language]}
      </h3>
      <div className="space-y-2">
        {treatment.options.map((option, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-2 border-b border-border/30 last:border-b-0"
          >
            <span className="text-muted-foreground text-sm">{option.duration}</span>
            <span className="font-semibold text-primary text-lg">
              {option.price.toLocaleString()} LEK
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ServicesPage;
