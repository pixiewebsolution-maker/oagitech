// Homepage content. Services and courses come from data/services.ts and data/training.ts
// (the OAGITECH master lists); all wording here is original to this site.
import { divisionCount, divisions, type DivisionKey } from "./services";
import { courseCount, trainingCategories } from "./training";

// Local copies of Unsplash photos (free licence), stored in /public/photos.
const p = (name: string) => `/photos/${name}.jpg`;

export const photos = {
  heroRefinery: p("hero-refinery"),
  refineryNight: p("refinery-night"),
  welderBlue: p("welder-blue"),
  welderSparks: p("welder-sparks"),
  diverDeep: p("diver-deep"),
  diverWork: p("diver-work"),
  gaugeDark: p("gauge-dark"),
  gaugeBrass: p("gauge-brass"),
  offshoreHaze: p("offshore-haze"),
  crewHiVis: p("crew-hivis"),
  engineerPointing: p("engineer-pointing"),
  siteWorker: p("site-worker"),
  pipework: p("pipework"),
  pipeworkGrey: p("pipework-grey"),
  sphereTanks: p("sphere-tanks"),
};

export const hero = {
  title: ["Keeping industry", "safe, accurate", "and certified"],
  intro:
    "Safety and PPE inspection, NDT, civil and pressure testing, calibration, underwater services and HSE training from one team in Yanbu, serving all five regions of the Kingdom.",
};

export const about = {
  statement:
    "OAGITECH brings inspection, testing, calibration, underwater work and training under one roof, so industrial clients can prove their equipment is safe and their people are competent.",
  body: "Our inspectors, technicians, divers and trainers work across oil and gas, petrochemical, marine, power and construction projects. Every job ends with clear records: certificates, test reports and training results you can show to clients and auditors.",
  sectors: ["Oil & Gas", "Petrochemical", "Marine & Offshore", "Power Generation", "Infrastructure & Construction", "Process Industries"],
};

const order: DivisionKey[] = ["safety", "ndt", "calibration", "underwater", "pressure", "civil", "ppe", "software"];
const serviceImage: Record<DivisionKey, string> = {
  safety: p("crane-blue"),
  ndt: p("pipework"),
  calibration: p("gauge-dark"),
  underwater: p("diver-work"),
  pressure: p("pipework-grey"),
  civil: p("site-plans"),
  ppe: p("hard-hats"),
  software: p("server-room"),
};

/** "What we offer" rows: the eight service divisions. */
export const services = order.map((key) => ({
  title: divisions[key].name,
  text: divisions[key].blurb,
  image: serviceImage[key],
  href: divisions[key].hub,
  count: divisionCount(key),
}));

export const totalServices = order.reduce((n, k) => n + divisionCount(k), 0);

/** Horizontal cards: the eight training categories. */
export const trainingCards = trainingCategories.map((c) => ({
  name: c.name,
  href: c.route,
  image: c.hero,
  text: c.tagline,
  items: c.courses.map((x) => x.title),
}));

export const reasons = [
  { title: "One team, many disciplines", text: "Inspection, NDT, calibration, testing, diving and training from a single contractor and a single point of contact." },
  { title: "Qualified people", text: "Work is carried out by inspectors, technicians, divers and trainers qualified for the method and the equipment." },
  { title: "Clear records", text: "Certificates, reports and training records that stand up to client and regulator review." },
  { title: "Kingdom-wide reach", text: "Based in Yanbu and mobilising to the Eastern, Western, Northern, Southern and Central regions." },
];

export const industries = [
  { title: "Oil & Gas", text: "Inspection, NDT and pressure testing for upstream, pipeline and terminal assets." },
  { title: "Petrochemical", text: "Shutdown inspection, calibration and process safety training for plants." },
  { title: "Marine & Offshore", text: "Underwater inspection, hull surveys, cleaning and repair for ports and vessels." },
  { title: "Power Generation", text: "Calibration, NDT and intake and penstock inspection for power and water plants." },
  { title: "Infrastructure & Construction", text: "Civil testing, lifting equipment inspection and scaffolding training on site." },
  { title: "Process Industries", text: "Instrument calibration, PPE inspection and HSE training for operating facilities." },
];

export const diving = {
  title: ["Underwater inspection", "& marine"],
  text: "Diver and ROV teams for jetties, piers, hulls, intakes and offshore structures, from inspection and NDT to cleaning, survey and underwater welding.",
  items: [
    { title: "Inspection & NDT", text: "Structural inspection, thickness measurement, crack detection and corrosion surveys.", href: "/underwater-marine/ndt-corrosion" },
    { title: "Ship hull services", text: "In-water hull, propeller and rudder inspection, cleaning and damage assessment.", href: "/underwater-marine/ship-hull-inspection" },
    { title: "Welding & repair", text: "Wet and hyperbaric welding, patch plates, anodes and underwater cutting.", href: "/underwater-marine/welding-cutting-repair" },
  ],
};

export const training = {
  courseCount,
  categories: trainingCategories.length,
  sites: ["Saudi Aramco", "SABIC", "Ma'aden", "SEC", "NEOM", "Royal Commission"],
};

/** Short names of the certifications and approvals confirmed by OAGITECH (logos on the Certifications page). */
export const certifications = ["ISO 9001:2015", "ISO/IEC 17025", "NEBOSH", "IOSH", "OSHA", "AOSH", "LEEA", "MEDIC First Aid", "SASO", "Saudi Accreditation Center", "TVTC", "Transport General Authority", "NRRC"];

export const faqs = [
  {
    q: "Which services does OAGITECH provide?",
    a: "Safety inspection of lifting, plant, access and pressure equipment, PPE inspection, non-destructive testing, civil and pressure testing, calibration, underwater inspection and repair, HSE and technical training, and software development.",
  },
  {
    q: "Do you work outside Yanbu?",
    a: "Yes. Yanbu is our base, and our teams support projects in the Eastern, Western, Northern, Southern and Central regions of the Kingdom.",
  },
  {
    q: "Can you prepare workers for Saudi Aramco, SABIC or Ma'aden sites?",
    a: "Our client-specific training category covers site safety orientations and permit training for Ma'aden, Saudi Aramco, SABIC, SEC, NEOM and Royal Commission sites.",
  },
  {
    q: "How are training courses delivered?",
    a: "Each course can be taken in the classroom, online, or as classroom plus practical sessions. You choose the method when you register.",
  },
  {
    q: "What do I receive after an inspection or calibration?",
    a: "A report or certificate for each item, with findings, results and the next due date, so you have a traceable record for audits.",
  },
];
