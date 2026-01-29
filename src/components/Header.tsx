import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigationLoader } from "@/contexts/NavigationLoader";
import LanguageToggle from "./LanguageToggle";
import logoIcon from "@/assets/logo sensea 2.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  // const { triggerNavLoading } = useNavigationLoader();

  const navItems = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.about, href: "/about" },
    { name: t.nav.services, href: "/services" },
    { name: t.nav.gallery, href: "/gallery" },
    { name: t.nav.contact, href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname === href;
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // triggerNavLoading(() => navigate("/"));
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // e.preventDefault();
    // triggerNavLoading(() => navigate(href));
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm py-2">
      <nav className="spa-container flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src={logoIcon}
              alt="Sensea Massage Therapy"
              className="h-14 md:h-16 w-auto object-contain"
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))" }}
              loading="eager"
            />
            <div className="flex flex-col">
              <span className="font-serif text-xl md:text-2xl font-semibold text-foreground tracking-wide">
                Sensea
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground -mt-1">
                Massage Therapy
              </span>
            </div>
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.ul
          className="hidden lg:flex items-center gap-6 xl:gap-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {navItems.map((item, index) => (
            <li key={item.name}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link
                  to={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`spa-link text-xs uppercase tracking-widest font-medium ${
                    isActive(item.href) ? "text-primary after:w-full" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            </li>
          ))}
        </motion.ul>

        {/* Desktop Language Toggle */}
        <motion.div
          className="hidden lg:flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <LanguageToggle />
        </motion.div>

        {/* Mobile Menu Button & Language Toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <LanguageToggle />
          <motion.button
            className="p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 top-[76px] bg-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-2xl font-serif transition-colors ${
                      isActive(item.href)
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
