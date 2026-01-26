import { motion } from "framer-motion";
import { Instagram, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="spa-container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl mb-4">
              Serenity<span className="text-primary">.</span>
            </h3>
            <p className="text-background/70 text-sm leading-relaxed">
              A sanctuary dedicated to your wellness journey. Experience
              tranquility, renewal, and the art of self-care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-6 text-background/80">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["About", "Services", "Pricing", "Gallery", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-background/70 hover:text-background transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-6 text-background/80">
              Follow Us
            </h4>
            <div className="flex gap-4 mb-8">
              <motion.a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </motion.a>
            </div>
            <p className="text-background/50 text-xs">
              Subscribe to our newsletter for exclusive offers and wellness
              tips.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-sm">
              © {currentYear} Serenity Spa. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-background/50">
              <a href="#" className="hover:text-background transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-background transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
