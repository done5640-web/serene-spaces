import { createContext, useContext, useState, ReactNode } from "react";

type Language = "sq" | "en";

interface Translations {
  // Navigation
  nav: {
    home: string;
    about: string;
    services: string;
    pricing: string;
    gallery: string;
    contact: string;
  };
  // Hero
  hero: {
    welcome: string;
    title1: string;
    title2: string;
    subtitle: string;
    cta: string;
  };
  // About
  about: {
    label: string;
    title1: string;
    title2: string;
    paragraph1: string;
    paragraph2: string;
    years: string;
    treatments: string;
    clients: string;
  };
  // Services
  services: {
    label: string;
    title: string;
    subtitle: string;
    items: {
      massage: { title: string; description: string };
      facial: { title: string; description: string };
      body: { title: string; description: string };
      aromatherapy: { title: string; description: string };
      couples: { title: string; description: string };
      meditation: { title: string; description: string };
    };
  };
  // Pricing
  pricing: {
    label: string;
    title: string;
    subtitle: string;
    note: string;
    categories: {
      massage: string;
      facial: string;
      body: string;
      packages: string;
    };
    treatments: {
      swedishMassage: string;
      deepTissue: string;
      hotStone: string;
      aromatherapyMassage: string;
      signatureMassage: string;
      classicFacial: string;
      hydratingFacial: string;
      antiAging: string;
      organicFacial: string;
      bodyWrap: string;
      saltScrub: string;
      hydratingCocoon: string;
      bodyPolish: string;
      halfDay: string;
      fullDay: string;
      couplesHarmony: string;
      bridalBliss: string;
    };
  };
  // Gallery
  gallery: {
    label: string;
    title: string;
    subtitle: string;
    view: string;
  };
  // Contact
  contact: {
    label: string;
    title: string;
    heading: string;
    subtitle: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
    hoursValue: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
    };
    toast: {
      title: string;
      description: string;
    };
  };
  // Footer
  footer: {
    description: string;
    quickLinks: string;
    followUs: string;
    newsletter: string;
    copyright: string;
    privacy: string;
    terms: string;
  };
}

const translations: Record<Language, Translations> = {
  sq: {
    nav: {
      home: "Kreu",
      about: "Rreth Nesh",
      services: "Shërbimet",
      pricing: "Çmimet",
      gallery: "Galeria",
      contact: "Kontakti",
    },
    hero: {
      welcome: "Mirësevini në Sensea Massage",
      title1: "Ku Qetësia",
      title2: "Takon Rinovimin",
      subtitle:
        "Largohuni nga e përditëshmja dhe zbuloni një strehë paqeje. Trajtimet tona holistike rivendosin ekuilibrin e trupit, mendjes dhe shpirtit.",
      cta: "Rezervoni Eksperiencën Tuaj",
    },
    about: {
      label: "Historia Jonë",
      title1: "Një Strehë për",
      title2: "Mirëqenien Tuaj",
      paragraph1:
        "Sensea Massage lindi nga dëshira për të krijuar një hapësirë ku çdo vizitor ndihet i mirëpritur dhe i kujdesur. Filozofia jonë qëndron në besimin se mirëqenia e vërtetë arrihet kur trupi, mendja dhe shpirti janë në harmoni të plotë.",
      paragraph2:
        "Çdo trajtim është krijuar me kujdes duke përdorur përbërësit më të mirë organikë, teknikat e lashta të shërimit dhe praktikat moderne të mirëqenies. Terapistët tanë të aftë janë të përkushtuar për t'ju ofruar një përvojë unike, të përshtatur sipas nevojave tuaja.",
      years: "Vite",
      treatments: "Trajtime",
      clients: "Klientë",
    },
    services: {
      label: "Çfarë Ofrojmë",
      title: "Trajtimet Tona",
      subtitle:
        "Zbuloni koleksionin tonë të kuruar me kujdes të trajtimeve të dizajnuara për të rikthyer ekuilibrin tuaj natyror dhe paqen e brendshme.",
      items: {
        massage: {
          title: "Masazh Terapeutik",
          description:
            "Lironi tensionin dhe rivendosni vitalitetin me teknikat tona të masazhit, të personalizuara për nevojat e trupit tuaj.",
        },
        facial: {
          title: "Trajtime Fytyre",
          description:
            "Rigjallëroni lëkurën tuaj me formulime organike që pastrojnë, ushqejnë dhe ndriçojnë shkëlqimin tuaj natyror.",
        },
        body: {
          title: "Rituale Trupi",
          description:
            "Mbështjellje dhe scrub luksoze trupi që detoksifikojnë, hidratojnë dhe lënë lëkurën tuaj të butë si mëndafsh.",
        },
        aromatherapy: {
          title: "Aromaterapia",
          description:
            "Shfrytëzoni fuqinë shëruese të vajrave esenciale për të qetësuar mendjen dhe për të ngritur shpirtin.",
        },
        couples: {
          title: "Masazh Çift",
          description:
            "Ndani një eksperiencë qetësuese me partnerin tuaj në suitën tonë private për çifte me trajtime të dyfishta.",
        },
        meditation: {
          title: "Meditim & Joga",
          description:
            "Seanca të udhëhequra për të përqendruar mendjen tuaj, për të përmirësuar fleksibilitetin dhe për të kultivuar paqen e brendshme.",
        },
      },
    },
    pricing: {
      label: "Investim në Mirëqenie",
      title: "Çmimet Tona",
      subtitle:
        "Çmime transparente për eksperienca transformuese. Çdo trajtim përfshin një konsultim për të personalizuar udhëtimin tuaj.",
      note: "* Të gjitha çmimet janë në EUR. Bakshishi nuk përfshihet. Ju lutem rezervoni paraprakisht për të siguruar kohën tuaj të preferuar.",
      categories: {
        massage: "Terapi Masazhi",
        facial: "Trajtime Fytyre",
        body: "Rituale Trupi",
        packages: "Paketa",
      },
      treatments: {
        swedishMassage: "Masazh Relaksues",
        deepTissue: "Deep Tissue Massage",
        hotStone: "Hot Stone Massage",
        aromatherapyMassage: "Masazh Aromaterapie",
        signatureMassage: "Masazhi Sensea",
        classicFacial: "Trajtim Klasik Fytyre",
        hydratingFacial: "Trajtim Hidratues Fytyre",
        antiAging: "Trajtim Anti-Age",
        organicFacial: "Trajtim Organik Fytyre",
        bodyWrap: "Body Wrap Detox",
        saltScrub: "Salt Scrub",
        hydratingCocoon: "Kokon Hidratues",
        bodyPolish: "Full Body Polish",
        halfDay: "Paketë Gjysmë Ditore",
        fullDay: "Paketë Ditore e Plotë",
        couplesHarmony: "Masazh Çift",
        bridalBliss: "Paketa e Nuses",
      },
    },
    gallery: {
      label: "Udhëtim Vizual",
      title: "Galeria Jonë",
      subtitle:
        "Hyni brenda në strehën tonë dhe përjetoni atmosferën qetësuese që ju pret.",
      view: "Shiko",
    },
    contact: {
      label: "Na Kontaktoni",
      title: "Kontakti",
      heading: "Do të Donim të Dëgjonim nga Ju",
      subtitle:
        "Nëse dëshironi të dini më shumë rreth shërbimeve tona, të rezervoni një takim, ose keni ndonjë pyetje, na kontaktoni me besim. Jemi gjithmonë gati t'ju ndihmojmë.",
      phone: "Telefoni",
      email: "Email",
      address: "Adresa",
      hours: "Orari",
      hoursValue: "Çdo ditë: 12:00 - 22:00",
      form: {
        name: "Emri i Plotë",
        namePlaceholder: "Emri juaj",
        email: "Adresa Email",
        emailPlaceholder: "email@juaj.com",
        message: "Mesazhi",
        messagePlaceholder: "Si mund t'ju ndihmojmë?",
        submit: "Dërgo Mesazhin",
        sending: "Duke Dërguar...",
      },
      toast: {
        title: "Mesazhi u Dërgua",
        description:
          "Faleminderit që na kontaktuat. Do t'ju përgjigjemi brenda 24 orëve.",
      },
    },
    footer: {
      description:
        "Një strehë e dedikuar për udhëtimin tuaj të mirëqenies. Përjetoni qetësinë, rinovimin dhe artin e vetëkujdesit.",
      quickLinks: "Lidhje të Shpejta",
      followUs: "Na Ndiqni",
      newsletter:
        "Abonohuni në buletinin tonë për oferta ekskluzive dhe këshilla mirëqenieje.",
      copyright: "© {year} Sensea Massage. Të gjitha të drejtat e rezervuara.",
      privacy: "Politika e Privatësisë",
      terms: "Kushtet e Shërbimit",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      pricing: "Pricing",
      gallery: "Gallery",
      contact: "Contact",
    },
    hero: {
      welcome: "Welcome to Sensea Massage",
      title1: "Where Tranquility",
      title2: "Meets Renewal",
      subtitle:
        "Escape the everyday and discover a sanctuary of peace. Our holistic treatments restore balance to body, mind, and spirit.",
      cta: "Book Your Experience",
    },
    about: {
      label: "Our Story",
      title1: "A Sanctuary for",
      title2: "Your Wellbeing",
      paragraph1:
        "Sensea Massage was born from a desire to create a space where every visitor feels welcomed and cared for. Our philosophy centers on the belief that true wellbeing is achieved when body, mind, and spirit are in complete harmony.",
      paragraph2:
        "Each treatment is thoughtfully crafted using the finest organic ingredients, ancient healing techniques, and modern wellness practices. Our skilled therapists are dedicated to providing a unique experience, tailored to your individual needs.",
      years: "Years",
      treatments: "Treatments",
      clients: "Clients",
    },
    services: {
      label: "What We Offer",
      title: "Our Treatments",
      subtitle:
        "Discover our carefully curated collection of treatments designed to restore your natural balance and inner peace.",
      items: {
        massage: {
          title: "Therapeutic Massage",
          description:
            "Release tension and restore vitality with our signature massage techniques, customized to your body's needs.",
        },
        facial: {
          title: "Facial Treatments",
          description:
            "Revitalize your skin with organic formulations that cleanse, nourish, and illuminate your natural glow.",
        },
        body: {
          title: "Body Rituals",
          description:
            "Luxurious body wraps and scrubs that detoxify, hydrate, and leave your skin silky smooth.",
        },
        aromatherapy: {
          title: "Aromatherapy",
          description:
            "Harness the healing power of essential oils to calm the mind and elevate your spirit.",
        },
        couples: {
          title: "Couples Retreat",
          description:
            "Share a serene experience with a loved one in our private couples suite with dual treatments.",
        },
        meditation: {
          title: "Meditation & Yoga",
          description:
            "Guided sessions to center your mind, improve flexibility, and cultivate inner peace.",
        },
      },
    },
    pricing: {
      label: "Investment in Wellness",
      title: "Our Pricing",
      subtitle:
        "Transparent pricing for transformative experiences. Each treatment includes a consultation to personalize your journey.",
      note: "* All prices are in EUR. Gratuity not included. Please book in advance to secure your preferred time.",
      categories: {
        massage: "Massage Therapy",
        facial: "Facial Treatments",
        body: "Body Rituals",
        packages: "Packages",
      },
      treatments: {
        swedishMassage: "Swedish Relaxation Massage",
        deepTissue: "Deep Tissue Massage",
        hotStone: "Hot Stone Therapy",
        aromatherapyMassage: "Aromatherapy Massage",
        signatureMassage: "Sensea Signature Massage",
        classicFacial: "Classic Cleansing Facial",
        hydratingFacial: "Hydrating Glow Facial",
        antiAging: "Anti-Aging Renewal",
        organicFacial: "Organic Radiance Facial",
        bodyWrap: "Detoxifying Body Wrap",
        saltScrub: "Exfoliating Salt Scrub",
        hydratingCocoon: "Hydrating Cocoon",
        bodyPolish: "Full Body Polish & Glow",
        halfDay: "Half Day Retreat",
        fullDay: "Full Day Sanctuary",
        couplesHarmony: "Couples Harmony",
        bridalBliss: "Bridal Bliss Package",
      },
    },
    gallery: {
      label: "Visual Journey",
      title: "Our Gallery",
      subtitle:
        "Step inside our sanctuary and experience the serene atmosphere that awaits you.",
      view: "View",
    },
    contact: {
      label: "Get in Touch",
      title: "Contact Us",
      heading: "We'd Love to Hear From You",
      subtitle:
        "If you'd like to learn more about our services, book an appointment, or have any questions, feel free to reach out. We're always happy to help.",
      phone: "Phone",
      email: "Email",
      address: "Address",
      hours: "Hours",
      hoursValue: "Every day: 12:00 - 22:00",
      form: {
        name: "Full Name",
        namePlaceholder: "Your name",
        email: "Email Address",
        emailPlaceholder: "your@email.com",
        message: "Message",
        messagePlaceholder: "How can we help you?",
        submit: "Send Message",
        sending: "Sending...",
      },
      toast: {
        title: "Message Sent",
        description:
          "Thank you for reaching out. We'll get back to you within 24 hours.",
      },
    },
    footer: {
      description:
        "A sanctuary dedicated to your wellness journey. Experience tranquility, renewal, and the art of self-care.",
      quickLinks: "Quick Links",
      followUs: "Follow Us",
      newsletter:
        "Subscribe to our newsletter for exclusive offers and wellness tips.",
      copyright: "© {year} Sensea Massage. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("sq");

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export type { Language, Translations };
