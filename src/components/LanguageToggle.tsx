import { motion } from "framer-motion";
import { useLanguage, Language } from "@/contexts/LanguageContext";

const flags: Record<Language, { icon: JSX.Element; label: string }> = {
  sq: {
    icon: (
      <span className="text-xs font-semibold uppercase tracking-wide">AL</span>
    ),
    label: "Shqip",
  },
  en: {
    icon: (
      <span className="text-xs font-semibold uppercase tracking-wide">EN</span>
    ),
    label: "English",
  },
};

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const languages: Language[] = ["sq", "en"];

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => (
        <motion.button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`flex items-center gap-1.5 px-2 py-1 rounded transition-all ${
            language === lang
              ? "bg-primary/10 ring-1 ring-primary/30"
              : "hover:bg-muted opacity-70 hover:opacity-100"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Switch to ${flags[lang].label}`}
        >
          {flags[lang].icon}
        </motion.button>
      ))}
    </div>
  );
};

export default LanguageToggle;
