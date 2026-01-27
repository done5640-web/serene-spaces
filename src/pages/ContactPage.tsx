import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import PageHero from "@/components/PageHero";
import { images as preloadedImages } from "@/contexts/ImagePreloader";

const WEB3FORMS_ACCESS_KEY = "525b4524-e995-4f60-953e-a7403e674642";

const ContactPage = () => {
  const { t, language } = useLanguage();
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

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Mesazh i ri nga ${formData.name} - Sensea Massage`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: t.contact.toast.title,
          description: t.contact.toast.description,
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast({
          title: language === "sq" ? "Gabim" : "Error",
          description:
            language === "sq"
              ? "Mesazhi nuk u dërgua. Ju lutem provoni përsëri."
              : "Message could not be sent. Please try again.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: language === "sq" ? "Gabim" : "Error",
        description:
          language === "sq"
            ? "Mesazhi nuk u dërgua. Ju lutem provoni përsëri."
            : "Message could not be sent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        image={preloadedImages.contactHero}
        title={t.contact.title}
        label={t.contact.label}
      />

      <section className="spa-section bg-secondary/30">
        <div className="spa-container">
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
                  value="+355 69 601 7662"
                  href="tel:+355696017662"
                  delay={0.2}
                  isInView={isHeaderInView}
                />
                <ContactItem
                  icon={Mail}
                  label={t.contact.email}
                  value="alar.dev2@gmail.com"
                  href="mailto:alar.dev2@gmail.com"
                  delay={0.3}
                  isInView={isHeaderInView}
                />
                <ContactItem
                  icon={MapPin}
                  label={t.contact.address}
                  value="Sensea Massage, Tiranë, Shqipëri"
                  href="https://maps.app.goo.gl/fFKHeAwfat8XiB8bA"
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

      {/* Google Maps Embed - click overlay opens directions */}
      <section className="w-full relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.2!2d19.8096234!3d41.3198739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13503173d90f706f%3A0xbfddf6c748928ffe!2sSensea%20Massage!5e0!3m2!1sen!2s!4v1706000000000"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title="Sensea Massage Location"
          className="w-full h-[300px] md:h-[450px]"
        />
        {/* Clickable overlay to open Google Maps */}
        <a
          href="https://maps.app.goo.gl/fFKHeAwfat8XiB8bA"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0"
          aria-label={language === "sq" ? "Shiko në Google Maps" : "View on Google Maps"}
        />
      </section>
    </div>
  );
};

const ContactItem = ({
  icon: Icon,
  label,
  value,
  href,
  delay,
  isInView,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
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
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="text-foreground hover:text-primary transition-colors"
        >
          {value}
        </a>
      ) : (
        <span className="text-foreground">{value}</span>
      )}
    </div>
  </motion.div>
);

export default ContactPage;
