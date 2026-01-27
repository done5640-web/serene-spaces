import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { pricingData } from "@/data/pricing";

const PricingSection = () => {
  const { t, language } = useLanguage();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  // Show first 2 categories as preview (Massages + Face Treatments)
  const previewCategories = pricingData.slice(0, 2);

  return (
    <section id="pricing" className="spa-section">
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
            {t.pricing.label}
          </p>
          <h2 className="spa-heading">
            {t.pricing.title.split(" ")[0]}{" "}
            <span className="italic">{t.pricing.title.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="spa-subheading mx-auto mt-4">{t.pricing.subtitle}</p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {previewCategories.map((category, index) => (
            <PricingCategory
              key={category.id}
              category={category}
              language={language}
              index={index}
            />
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
              {language === "sq" ? "Shiko Të Gjitha Çmimet" : "View All Prices"}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const PricingCategory = ({
  category,
  language,
  index,
}: {
  category: (typeof pricingData)[0];
  language: "sq" | "en";
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Show first 3 treatments as preview
  const previewTreatments = category.treatments.slice(0, 3);

  return (
    <motion.div
      ref={ref}
      className="bg-card rounded-sm overflow-hidden"
      style={{ boxShadow: "var(--shadow-soft)" }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="bg-spa-sage-light px-6 py-4">
        <h3 className="font-serif text-xl text-foreground">
          {category.name[language]}
        </h3>
      </div>
      <div className="p-6">
        <ul className="space-y-4">
          {previewTreatments.map((treatment, idx) => (
            <li
              key={treatment.name[language]}
              className={`flex items-center justify-between ${
                idx !== previewTreatments.length - 1
                  ? "pb-4 border-b border-border/50"
                  : ""
              }`}
            >
              <div className="flex-1">
                <span className="block text-foreground font-medium">
                  {treatment.name[language]}
                </span>
                <span className="text-sm text-muted-foreground">
                  {treatment.options.map((o) => o.duration).join(" / ")}
                </span>
              </div>
              <span className="font-serif text-lg text-primary ml-4">
                {treatment.options[0].price.toLocaleString()} LEK
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default PricingSection;
