import { useLanguage, Language } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const languages: Language[] = ["sq", "en"];
  const labels: Record<Language, string> = { sq: "AL", en: "EN" };

  return (
    <div className="flex items-center">
      {languages.map((lang, i) => (
        <span key={lang} className="flex items-center">
          {i > 0 && <span className="text-muted-foreground/40 mx-1.5 text-xs">|</span>}
          <button
            onClick={() => setLanguage(lang)}
            className={`text-xs font-semibold uppercase tracking-wide transition-colors ${
              language === lang
                ? "text-foreground"
                : "text-muted-foreground/50 hover:text-foreground"
            }`}
            aria-label={`Switch to ${labels[lang]}`}
          >
            {labels[lang]}
          </button>
        </span>
      ))}
    </div>
  );
};

export default LanguageToggle;
