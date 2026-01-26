import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import aboutImage from "@/assets/about-spa.jpg";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="spa-section bg-secondary/30">
      <div className="spa-container">
        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Image */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative overflow-hidden rounded-sm">
              <img
                src={aboutImage}
                alt="Peaceful spa treatment room"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-primary/30 rounded-sm -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
              Our Story
            </p>
            <h2 className="spa-heading">
              A Sanctuary for
              <br />
              <span className="italic">Your Wellbeing</span>
            </h2>
            <div className="w-16 h-px bg-primary/50 my-8" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              Founded with a vision to create a haven of tranquility, Serenity Spa
              has been nurturing wellness journeys since 2010. Our philosophy
              centers on the belief that true beauty emerges when body, mind, and
              spirit are in harmony.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Each treatment is thoughtfully crafted using the finest organic
              ingredients, ancient healing techniques, and modern wellness
              practices. Our skilled therapists are dedicated to providing
              personalized experiences that address your unique needs.
            </p>
            <div className="grid grid-cols-3 gap-8">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <span className="block font-serif text-3xl text-primary">14+</span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  Years
                </span>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <span className="block font-serif text-3xl text-primary">50+</span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  Treatments
                </span>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <span className="block font-serif text-3xl text-primary">10k+</span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  Clients
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
