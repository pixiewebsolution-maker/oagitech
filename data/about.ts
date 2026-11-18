// About pages. Copy is original to this site; accreditation logos are the ones confirmed by OAGITECH.

const ph = (n: string) => `/photos/${n}.jpg`;
const logo = (f: string) => `/accreditations/${f}`;

export type AboutPage = {
  route: string;
  navLabel: string;
  tagline: string;
  hero: string;
  intro: string[];
  sections: { heading: string; body?: string[]; points?: { title: string; text: string }[]; list?: string[]; logos?: { src: string; name: string }[] }[];
};

export const aboutPages: AboutPage[] = [
  {
    route: "/about",
    navLabel: "About OAGITECH",
    tagline: "Inspection, testing, calibration, underwater services and training from one team in Yanbu.",
    hero: ph("offshore-haze"),
    intro: [
      "OAGITECH, Oil & Gas Inspection Technology, is a multi-disciplinary technical services company based in Yanbu, Kingdom of Saudi Arabia.",
      "We help industrial, commercial and government clients keep their equipment safe, their measurements accurate and their people competent. Our work spans safety and PPE inspection, non-destructive testing, civil and pressure testing, calibration, underwater inspection and repair, HSE training and software for the industries we serve.",
    ],
    sections: [
      {
        heading: "What we do",
        points: [
          { title: "Inspect", text: "Safety inspection of lifting, plant, access, pressure and emergency equipment, and inspection of PPE." },
          { title: "Test", text: "Non-destructive testing, civil engineering tests and hydrostatic, pneumatic and leak testing." },
          { title: "Calibrate", text: "Calibration of 100 instrument types across ten measurement disciplines." },
          { title: "Go below the waterline", text: "Diver and ROV inspection, underwater NDT, cleaning, welding, cutting and repair." },
          { title: "Train", text: "109 safety and technical courses, including site orientations for major operators." },
          { title: "Digitise", text: "Inspection, training and certification software, and QR code certificate verification." },
        ],
      },
      {
        heading: "Industries we serve",
        list: ["Oil & Gas", "Petrochemical", "Marine & Offshore", "Power Generation", "Infrastructure & Construction", "Process Industries"],
      },
      {
        heading: "Where we work",
        body: ["From our base in Yanbu we support projects in all five regions of the Kingdom: Eastern, Western, Northern, Southern and Central."],
      },
    ],
  },
  {
    route: "/about/certifications-and-awards",
    navLabel: "Certifications & Accreditations",
    tagline: "Working to recognised standards, approved by the bodies that set them.",
    hero: ph("vessel-2"),
    intro: [
      "Clients need to know that inspection, testing and training is carried out to recognised standards by people who are qualified to do it.",
      "OAGITECH holds the certifications, accreditations and training approvals below, covering our quality system, laboratories and safety training.",
    ],
    sections: [
      {
        heading: "Accreditations & approvals",
        logos: [
          { src: logo("aosh.jpg"), name: "AOSH" },
          { src: logo("iosh.jpg"), name: "IOSH" },
          { src: logo("saso.jpg"), name: "Saudi Standards, Metrology and Quality Organization (SASO)" },
          { src: logo("iso-iec-17025.jpg"), name: "ISO/IEC 17025 Testing and Calibration Laboratories Accreditation" },
          { src: logo("nebosh.jpg"), name: "NEBOSH" },
          { src: logo("iso-9001.jpg"), name: "ISO 9001:2015" },
          { src: logo("nrrc.jpg"), name: "Nuclear and Radiological Regulatory Commission" },
          { src: logo("medic-first-aid.jpg"), name: "MEDIC First Aid" },
          { src: logo("osha.jpg"), name: "OSHA" },
          { src: logo("leea.jpg"), name: "LEEA" },
          { src: logo("tvtc.jpg"), name: "Technical and Vocational Training Corporation" },
          { src: logo("tga.jpg"), name: "Transport General Authority" },
          { src: logo("saudi-accreditation-center.jpg"), name: "Saudi Accreditation Center" },
        ],
      },
    ],
  },
  {
    route: "/about/career",
    navLabel: "Careers",
    tagline: "Build your career in inspection, testing and training.",
    hero: ph("site-workers"),
    intro: [
      "Our work depends on skilled inspectors, technicians, divers, trainers and engineers who care about doing the job properly.",
      "If you want to work on real industrial projects across the Kingdom and keep developing your qualifications, we would like to hear from you.",
    ],
    sections: [
      {
        heading: "Who we look for",
        points: [
          { title: "Inspectors & NDT technicians", text: "Qualified personnel for safety inspection, NDT, civil and pressure testing." },
          { title: "Calibration technicians", text: "Technicians experienced with pressure, temperature, electrical and dimensional instruments." },
          { title: "Commercial divers", text: "Divers and supervisors for underwater inspection, NDT and repair work." },
          { title: "Trainers & assessors", text: "Experienced HSE, rigging, operator and scaffolding instructors." },
        ],
      },
      {
        heading: "How to apply",
        body: ["Send your CV and copies of your certificates to info@oagitech.com with the role you are interested in. We keep applications on file and contact candidates when a suitable role opens."],
      },
    ],
  },
];
