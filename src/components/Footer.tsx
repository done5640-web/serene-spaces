import { motion } from "framer-motion";
import { Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import logoIcon from "@/assets/logo sensea 2.png";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: t.nav.about, href: "/about" },
    { name: t.nav.services, href: "/services" },
    { name: t.nav.gallery, href: "/gallery" },
    { name: t.nav.contact, href: "/contact" },
  ];

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="spa-container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src={logoIcon}
                alt="Sensea Massage Therapy"
                className="h-14 w-auto object-contain brightness-0 invert"
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-semibold text-background tracking-wide">
                  Sensea
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-background/70 -mt-1">
                  Massage Therapy
                </span>
              </div>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-6 text-background/80">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-6 text-background/80">
              {t.footer.followUs}
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
            <p className="text-background/50 text-xs">{t.footer.newsletter}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-sm">
              {t.footer.copyright.replace("{year}", currentYear.toString())}
            </p>
            <p className="text-background/40 text-xs">
              Zhvilluar nga{" "}
              <a
                href="https://www.alardev.al"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/60 hover:text-background transition-colors"
              >
                Alar Dev
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
