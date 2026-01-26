import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const pricingItems = [
  {
    category: "Massage Therapy",
    treatments: [
      { name: "Swedish Relaxation Massage", duration: "60 min", price: 95 },
      { name: "Deep Tissue Massage", duration: "60 min", price: 115 },
      { name: "Hot Stone Therapy", duration: "75 min", price: 135 },
      { name: "Aromatherapy Massage", duration: "60 min", price: 105 },
      { name: "Signature Serenity Massage", duration: "90 min", price: 155 },
    ],
  },
  {
    category: "Facial Treatments",
    treatments: [
      { name: "Classic Cleansing Facial", duration: "45 min", price: 75 },
      { name: "Hydrating Glow Facial", duration: "60 min", price: 95 },
      { name: "Anti-Aging Renewal", duration: "75 min", price: 125 },
      { name: "Organic Radiance Facial", duration: "60 min", price: 110 },
    ],
  },
  {
    category: "Body Rituals",
    treatments: [
      { name: "Detoxifying Body Wrap", duration: "60 min", price: 85 },
      { name: "Exfoliating Salt Scrub", duration: "45 min", price: 70 },
      { name: "Hydrating Cocoon", duration: "75 min", price: 105 },
      { name: "Full Body Polish & Glow", duration: "90 min", price: 140 },
    ],
  },
  {
    category: "Packages",
    treatments: [
      { name: "Half Day Retreat", duration: "3 hours", price: 275 },
      { name: "Full Day Sanctuary", duration: "6 hours", price: 495 },
      { name: "Couples Harmony", duration: "2 hours", price: 320 },
      { name: "Bridal Bliss Package", duration: "4 hours", price: 395 },
    ],
  },
];

const PricingCategory = ({
  category,
  index,
}: {
  category: (typeof pricingItems)[0];
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
                ${treatment.price}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Pricing = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="spa-section bg-secondary/30">
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
            Investment in Wellness
          </p>
          <h2 className="spa-heading">
            Our <span className="italic">Pricing</span>
          </h2>
          <p className="spa-subheading mx-auto mt-4">
            Transparent pricing for transformative experiences. Each treatment
            includes a consultation to personalize your journey.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {pricingItems.map((category, index) => (
            <PricingCategory
              key={category.category}
              category={category}
              index={index}
            />
          ))}
        </div>

        {/* Note */}
        <motion.p
          className="text-center text-sm text-muted-foreground mt-12"
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          * All prices are in USD. Gratuity not included. Please book in advance
          to secure your preferred time.
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
