import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import PageHero from "@/components/PageHero";
import { images as preloadedImages } from "@/contexts/ImagePreloader";

const PricingPage = () => {
  const { t } = useLanguage();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const pricingItems = [
    {
      category: t.pricing.categories.massage,
      treatments: [
        { name: t.pricing.treatments.swedishMassage, duration: "60 min", price: 45 },
        { name: t.pricing.treatments.deepTissue, duration: "60 min", price: 55 },
        { name: t.pricing.treatments.hotStone, duration: "75 min", price: 65 },
        { name: t.pricing.treatments.aromatherapyMassage, duration: "60 min", price: 50 },
        { name: t.pricing.treatments.signatureMassage, duration: "90 min", price: 75 },
      ],
    },
    {
      category: t.pricing.categories.facial,
      treatments: [
        { name: t.pricing.treatments.classicFacial, duration: "45 min", price: 35 },
        { name: t.pricing.treatments.hydratingFacial, duration: "60 min", price: 45 },
        { name: t.pricing.treatments.antiAging, duration: "75 min", price: 60 },
        { name: t.pricing.treatments.organicFacial, duration: "60 min", price: 55 },
      ],
    },
    {
      category: t.pricing.categories.body,
      treatments: [
        { name: t.pricing.treatments.bodyWrap, duration: "60 min", price: 40 },
        { name: t.pricing.treatments.saltScrub, duration: "45 min", price: 35 },
        { name: t.pricing.treatments.hydratingCocoon, duration: "75 min", price: 50 },
        { name: t.pricing.treatments.bodyPolish, duration: "90 min", price: 70 },
      ],
    },
    {
      category: t.pricing.categories.packages,
      treatments: [
        { name: t.pricing.treatments.halfDay, duration: "3 orë", price: 130 },
        { name: t.pricing.treatments.fullDay, duration: "6 orë", price: 240 },
        { name: t.pricing.treatments.couplesHarmony, duration: "2 orë", price: 150 },
        { name: t.pricing.treatments.bridalBliss, duration: "4 orë", price: 190 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        image={preloadedImages.img3298}
        title={t.pricing.title}
        label={t.pricing.label}
        subtitle={t.pricing.subtitle}
      />

      <section className="spa-section bg-secondary/30">
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
            {pricingItems.map((category, index) => (
              <PricingCategory key={category.category} category={category} index={index} />
            ))}
          </div>

          {/* Note */}
          <motion.p
            className="text-center text-sm text-muted-foreground mt-12"
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {t.pricing.note}
          </motion.p>
        </div>
      </section>
    </div>
  );
};

const PricingCategory = ({
  category,
  index,
}: {
  category: {
    category: string;
    treatments: { name: string; duration: string; price: number }[];
  };
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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
        <h3 className="font-serif text-xl text-foreground">{category.category}</h3>
      </div>
      <div className="p-6">
        <ul className="space-y-4">
          {category.treatments.map((treatment, idx) => (
            <li
              key={treatment.name}
              className={`flex items-center justify-between ${
                idx !== category.treatments.length - 1
                  ? "pb-4 border-b border-border/50"
                  : ""
              }`}
            >
              <div className="flex-1">
                <span className="block text-foreground font-medium">
                  {treatment.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {treatment.duration}
                </span>
              </div>
              <span className="font-serif text-xl text-primary ml-4">
                €{treatment.price}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default PricingPage;
