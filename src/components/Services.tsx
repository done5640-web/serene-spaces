import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Droplets, Sun, Heart, Sparkles, Wind } from "lucide-react";

const services = [
  {
    icon: Droplets,
    title: "Therapeutic Massage",
    description:
      "Release tension and restore vitality with our signature massage techniques, customized to your body's needs.",
  },
  {
    icon: Sparkles,
    title: "Facial Treatments",
    description:
      "Revitalize your skin with organic formulations that cleanse, nourish, and illuminate your natural glow.",
  },
  {
    icon: Leaf,
    title: "Body Rituals",
    description:
      "Luxurious body wraps and scrubs that detoxify, hydrate, and leave your skin silky smooth.",
  },
  {
    icon: Sun,
    title: "Aromatherapy",
    description:
      "Harness the healing power of essential oils to calm the mind and elevate your spirit.",
  },
  {
    icon: Heart,
    title: "Couples Retreat",
    description:
      "Share a serene experience with a loved one in our private couples suite with dual treatments.",
  },
  {
    icon: Wind,
    title: "Meditation & Yoga",
    description:
      "Guided sessions to center your mind, improve flexibility, and cultivate inner peace.",
  },
];

const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="spa-card group cursor-default"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="mb-6">
        <div className="w-14 h-14 rounded-full bg-spa-sage-light flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
          <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
        </div>
      </div>
      <h3 className="font-serif text-xl mb-3 text-foreground">{service.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  );
};

const Services = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="spa-section">
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
            What We Offer
          </p>
          <h2 className="spa-heading">
            Our <span className="italic">Treatments</span>
          </h2>
          <p className="spa-subheading mx-auto mt-4">
            Discover our carefully curated collection of treatments designed to
            restore your natural balance and inner peace.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
