import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();
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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: t.contact.toast.title,
      description: t.contact.toast.description,
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="spa-section bg-secondary/30">
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
            {t.contact.label}
          </p>
          <h2 className="spa-heading">
            {t.contact.title.split(" ")[0]}{" "}
            <span className="italic">{t.contact.title.split(" ").slice(1).join(" ")}</span>
          </h2>
        </motion.div>

        <div ref={headerRef} className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-serif text-2xl md:text-3xl mb-8 text-foreground">
              {t.contact.heading}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-10">
              {t.contact.subtitle}
            </p>

            <div className="space-y-6">
              <ContactItem
                icon={Phone}
                label={t.contact.phone}
                value="+355 69 123 4567"
                delay={0.2}
                isInView={isHeaderInView}
              />
              <ContactItem
                icon={Mail}
                label={t.contact.email}
                value="info@senseamassage.com"
                delay={0.3}
                isInView={isHeaderInView}
              />
              <ContactItem
                icon={MapPin}
                label={t.contact.address}
                value="Rruga e Kavajës, Tiranë, Shqipëri"
                delay={0.4}
                isInView={isHeaderInView}
              />
              <ContactItem
                icon={Clock}
                label={t.contact.hours}
                value={t.contact.hoursValue}
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
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 bg-background border border-border rounded-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                  placeholder={t.contact.form.namePlaceholder}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm uppercase tracking-wider text-muted-foreground mb-2"
                >
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 bg-background border border-border rounded-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                  placeholder={t.contact.form.emailPlaceholder}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm uppercase tracking-wider text-muted-foreground mb-2"
                >
                  {t.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-4 bg-background border border-border rounded-sm focus:outline-none focus:border-primary transition-colors text-foreground resize-none"
                  placeholder={t.contact.form.messagePlaceholder}
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
                  <span>{t.contact.form.sending}</span>
                ) : (
                  <>
                    <span>{t.contact.form.submit}</span>
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

export default ContactSection;
