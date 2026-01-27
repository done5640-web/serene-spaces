import { motion } from "framer-motion";
import { useLanguage, Language } from "@/contexts/LanguageContext";

const flags: Record<Language, { icon: JSX.Element; label: string }> = {
  sq: {
    icon: (
      <svg viewBox="0 0 28 20" className="w-6 h-4 rounded-sm overflow-hidden shadow-sm">
        <rect width="28" height="20" fill="#E41E20" />
        <g transform="translate(14, 10)">
          <path
            d="M-5.5,-4 L-4.5,-2 L-6,-1.5 L-4.5,-1 L-5,-0.5 L-4,0 L-5,0.5 L-4.5,1 L-6,1.5 L-4.5,2 L-5.5,4 L-3,2.5 L-2,4 L0,2 L2,4 L3,2.5 L5.5,4 L4.5,2 L6,1.5 L4.5,1 L5,0.5 L4,0 L5,-0.5 L4.5,-1 L6,-1.5 L4.5,-2 L5.5,-4 L3,-2.5 L2,-4 L0,-2 L-2,-4 L-3,-2.5 Z"
            fill="#000000"
          />
        </g>
      </svg>
    ),
    label: "Shqip",
  },
  en: {
    icon: (
      <svg viewBox="0 0 28 20" className="w-6 h-4 rounded-sm overflow-hidden shadow-sm">
        <rect width="28" height="20" fill="#012169" />
        <path d="M0,0 L28,20 M28,0 L0,20" stroke="#fff" strokeWidth="3" />
        <path d="M0,0 L28,20 M28,0 L0,20" stroke="#C8102E" strokeWidth="2" />
        <path d="M14,0 V20 M0,10 H28" stroke="#fff" strokeWidth="5" />
        <path d="M14,0 V20 M0,10 H28" stroke="#C8102E" strokeWidth="3" />
      </svg>
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
