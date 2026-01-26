import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import contactHero from "@/assets/contact-hero.jpg";

const Contact = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual email sending logic)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent",
      description:
        "Thank you for reaching out. We'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="spa-section bg-secondary/30">
      {/* Hero Image */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden mb-20">
        <img
          src={contactHero}
          alt="Spa reception"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/20 to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-primary-foreground/80 mb-4">
              Get in Touch
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground">
              Contact <span className="italic">Us</span>
            </h2>
          </motion.div>
        </div>
      </div>

      <div className="spa-container">
        <div
          ref={headerRef}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20"
        >
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-serif text-2xl md:text-3xl mb-8 text-foreground">
              We'd Love to Hear From You
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Whether you have questions about our treatments, want to schedule
              an appointment, or simply wish to learn more about our sanctuary,
              we're here for you.
            </p>

            <div className="space-y-6">
              <ContactItem
                icon={Phone}
                label="Phone"
                value="+1 (555) 123-4567"
                delay={0.2}
                isInView={isHeaderInView}
              />
              <ContactItem
                icon={Mail}
                label="Email"
                value="hello@serenityspa.com"
                delay={0.3}
                isInView={isHeaderInView}
              />
              <ContactItem
                icon={MapPin}
                label="Address"
                value="123 Tranquil Lane, Wellness City, WC 12345"
                delay={0.4}
                isInView={isHeaderInView}
              />
              <ContactItem
                icon={Clock}
                label="Hours"
                value="Mon - Sat: 9:00 AM - 8:00 PM | Sun: 10:00 AM - 6:00 PM"
                delay={0.5}
                isInView={isHeaderInView}
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm uppercase tracking-wider text-muted-foreground mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 bg-background border border-border rounded-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm uppercase tracking-wider text-muted-foreground mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 bg-background border border-border rounded-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm uppercase tracking-wider text-muted-foreground mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-4 bg-background border border-border rounded-sm focus:outline-none focus:border-primary transition-colors text-foreground resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="spa-button-primary w-full flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({
  icon: Icon,
  label,
  value,
  delay,
  isInView,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  delay: number;
  isInView: boolean;
}) => (
  <motion.div
    className="flex items-start gap-4"
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay }}
  >
    <div className="w-12 h-12 rounded-full bg-spa-sage-light flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div>
      <span className="block text-sm uppercase tracking-wider text-muted-foreground mb-1">
        {label}
      </span>
      <span className="text-foreground">{value}</span>
    </div>
  </motion.div>
);

export default Contact;
