// All prices in LEK (Albanian Lek)

export interface Treatment {
  name: { sq: string; en: string };
  options: { duration: string; price: number }[];
}

export interface Category {
  id: string;
  name: { sq: string; en: string };
  treatments: Treatment[];
}

export const pricingData: Category[] = [
  {
    id: "massages",
    name: { sq: "Masazhe", en: "Massages" },
    treatments: [
      {
        name: { sq: "Masazh Relaksues", en: "Relaxing Massage" },
        options: [
          { duration: "30 min", price: 3000 },
          { duration: "60 min", price: 4500 },
          { duration: "90 min", price: 6000 },
        ],
      },
      {
        name: { sq: "Deep Tissue Massage", en: "Deep Tissue Massage" },
        options: [
          { duration: "30 min", price: 3500 },
          { duration: "60 min", price: 5000 },
          { duration: "90 min", price: 6500 },
        ],
      },
      {
        name: { sq: "Masazh Sportiv", en: "Sport Massage" },
        options: [
          { duration: "30 min", price: 3500 },
          { duration: "60 min", price: 5000 },
          { duration: "90 min", price: 6500 },
        ],
      },
      {
        name: { sq: "Masazh Tajlandez", en: "Thai Massage (Traditional)" },
        options: [
          { duration: "30 min", price: 4000 },
          { duration: "60 min", price: 5500 },
          { duration: "90 min", price: 7000 },
        ],
      },
      {
        name: { sq: "Hot Stone Massage", en: "Hot Stone Massage" },
        options: [
          { duration: "30 min", price: 3500 },
          { duration: "60 min", price: 5000 },
          { duration: "90 min", price: 6500 },
        ],
      },
      {
        name: { sq: "Aromatherapy Massage", en: "Aromatherapy Massage" },
        options: [
          { duration: "30 min", price: 3500 },
          { duration: "60 min", price: 4500 },
          { duration: "90 min", price: 6000 },
        ],
      },
      {
        name: { sq: "Lymphatic Drainage Massage", en: "Lymphatic Drainage Massage" },
        options: [
          { duration: "30 min", price: 3500 },
          { duration: "60 min", price: 5000 },
          { duration: "90 min", price: 6500 },
        ],
      },
      {
        name: { sq: "Anti-Stres Shpinë / Qafë / Kokë", en: "Anti-Stress Back / Neck / Head" },
        options: [
          { duration: "30 min", price: 2500 },
          { duration: "45 min", price: 3500 },
        ],
      },
      {
        name: { sq: "Four Hands Massage (2 terapistë)", en: "Four-Hands Massage (2 therapists)" },
        options: [
          { duration: "60 min", price: 8000 },
          { duration: "90 min", price: 11500 },
        ],
      },
      {
        name: { sq: "Masazh Çift (2 persona)", en: "Couples Massage (2 people)" },
        options: [
          { duration: "60 min", price: 9000 },
          { duration: "90 min", price: 12000 },
        ],
      },
    ],
  },
  {
    id: "face",
    name: { sq: "Trajtime Fytyre", en: "Face Treatments" },
    treatments: [
      {
        name: { sq: "Face Lifting Massage (manual)", en: "Face Lifting Massage (manual)" },
        options: [
          { duration: "30 min", price: 2500 },
          { duration: "60 min", price: 2500 },
        ],
      },
      {
        name: { sq: "Deep Facial Cleansing", en: "Deep Facial Cleansing" },
        options: [{ duration: "40 min", price: 3500 }],
      },
      {
        name: { sq: "Face Mask Treatment", en: "Face Mask Treatment" },
        options: [{ duration: "15 min", price: 1500 }],
      },
      {
        name: { sq: "Hydrating Facial Massage", en: "Hydrating Facial Massage" },
        options: [{ duration: "30 min", price: 2500 }],
      },
      {
        name: { sq: "Anti-Age Facial Massage", en: "Anti-Age Facial Massage" },
        options: [
          { duration: "30 min", price: 3000 },
          { duration: "60 min", price: 3500 },
        ],
      },
      {
        name: { sq: "Glow Facial (scrub + massage + mask)", en: "Glow Facial (scrub + massage + mask)" },
        options: [{ duration: "40 min", price: 3500 }],
      },
    ],
  },
  {
    id: "body",
    name: { sq: "Trajtime Trupi", en: "Body Treatments" },
    treatments: [
      {
        name: { sq: "Body Scrub", en: "Body Scrub" },
        options: [
          { duration: "30 min", price: 3500 },
          { duration: "60 min", price: 5000 },
        ],
      },
      {
        name: { sq: "Body Mask + Massage", en: "Body Mask + Massage" },
        options: [{ duration: "60 min", price: 5500 }],
      },
      {
        name: { sq: "Cold Wrap", en: "Cold Wrap" },
        options: [{ duration: "75 min", price: 5000 }],
      },
      {
        name: { sq: "Hot Wrap", en: "Hot Wrap" },
        options: [{ duration: "75 min", price: 5000 }],
      },
      {
        name: { sq: "Anti-Cellulite Massage", en: "Anti-Cellulite Massage" },
        options: [
          { duration: "30 min", price: 3000 },
          { duration: "60 min", price: 4500 },
        ],
      },
      {
        name: { sq: "Slimming Massage", en: "Slimming Massage" },
        options: [
          { duration: "45 min", price: 4000 },
          { duration: "60 min", price: 5500 },
        ],
      },
    ],
  },
  {
    id: "reflexology",
    name: { sq: "Refleksologji", en: "Reflexology" },
    treatments: [
      {
        name: { sq: "Foot Reflexology", en: "Foot Reflexology" },
        options: [{ duration: "40 min", price: 2500 }],
      },
      {
        name: { sq: "Hand Reflexology", en: "Hand Reflexology" },
        options: [{ duration: "40 min", price: 2500 }],
      },
      {
        name: { sq: "Head & Scalp Reflexology", en: "Head & Scalp Reflexology" },
        options: [{ duration: "30 min", price: 2000 }],
      },
    ],
  },
  {
    id: "pregnancy",
    name: { sq: "Masazhe Shtatzënie", en: "Pregnancy Massages" },
    treatments: [
      {
        name: { sq: "Masazh Pre-Natal", en: "Pre-Natal Massage" },
        options: [
          { duration: "30 min", price: 3000 },
          { duration: "60 min", price: 4500 },
        ],
      },
      {
        name: { sq: "Masazh Post-Natal", en: "Post-Natal Massage" },
        options: [
          { duration: "30 min", price: 3000 },
          { duration: "60 min", price: 4500 },
        ],
      },
    ],
  },
];

// Service categories for the menu with descriptions
export const serviceCategories = [
  {
    id: "massages",
    icon: "massage",
    name: { sq: "Masazhe", en: "Massages" },
    description: {
      sq: "Lironi tensionin dhe rivendosni vitalitetin me teknikat tona profesionale të masazhit.",
      en: "Release tension and restore vitality with our professional massage techniques.",
    },
  },
  {
    id: "face",
    icon: "facial",
    name: { sq: "Trajtime Fytyre", en: "Face Treatments" },
    description: {
      sq: "Rigjallëroni lëkurën tuaj me trajtimet tona të specializuara për fytyrë.",
      en: "Revitalize your skin with our specialized facial treatments.",
    },
  },
  {
    id: "body",
    icon: "body",
    name: { sq: "Trajtime Trupi", en: "Body Treatments" },
    description: {
      sq: "Trajtime luksoze trupi që detoksifikojnë dhe rigjenerojnë lëkurën tuaj.",
      en: "Luxurious body treatments that detoxify and rejuvenate your skin.",
    },
  },
  {
    id: "reflexology",
    icon: "reflexology",
    name: { sq: "Refleksologji", en: "Reflexology" },
    description: {
      sq: "Teknika të specializuara për këmbë, duar dhe kokë që rivendosin ekuilibrin.",
      en: "Specialized techniques for feet, hands and head that restore balance.",
    },
  },
  {
    id: "pregnancy",
    icon: "pregnancy",
    name: { sq: "Masazhe Shtatzënie", en: "Pregnancy Massages" },
    description: {
      sq: "Trajtime të sigurta dhe relaksuese për nënat shtatzëna dhe të reja.",
      en: "Safe and relaxing treatments for expecting and new mothers.",
    },
  },
];
