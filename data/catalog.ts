// Page catalogue: every page carried over from oagitech.com, grouped the way the old menu grouped them.
import raw from "./pages.json";

export type Img = { src: string; w: number; h: number };
export type Item = { title: string; text: string };
export type Sub = { heading: string; body: string[]; items: Item[] };
export type Section = { heading: string; note?: string; body: string[]; items: Item[]; subs: Sub[]; images: Img[] };
export type Faq = { q: string; a: string };
export type CategoryKey =
  | "inspection"
  | "welding"
  | "ndt"
  | "civil"
  | "training"
  | "services"
  | "calibration"
  | "manufacturing"
  | "diving"
  | "underwater"
  | "about";

export type Page = {
  route: string;
  old: string;
  category: CategoryKey;
  navLabel: string;
  title: string;
  intro: string[];
  sections: Section[];
  faqs: Faq[];
  images: Img[];
};

export const pages = raw as Page[];

export type Category = {
  key: CategoryKey;
  name: string;
  hub?: string; // overview route for grouped categories
  photo: string;
  blurb: string;
};

export const categories: Record<CategoryKey, Category> = {
  inspection: {
    key: "inspection",
    name: "Inspection",
    hub: "/inspection",
    photo: "/photos/sphere-tanks.jpg",
    blurb: "Independent inspection, asset integrity and QA/QC that keep critical assets safe, compliant and reliable.",
  },
  welding: { key: "welding", name: "Welding", photo: "/photos/welder-sparks.jpg", blurb: "Certified welding services, inspection and consultancy." },
  ndt: {
    key: "ndt",
    name: "NDT",
    hub: "/ndt",
    photo: "/photos/pipework.jpg",
    blurb: "Conventional and advanced non-destructive testing that finds defects without damaging the component.",
  },
  civil: { key: "civil", name: "Civil/Structural/Geo", photo: "/photos/engineer-pointing.jpg", blurb: "Civil, structural and geotechnical engineering consultancy." },
  training: {
    key: "training",
    name: "Training",
    hub: "/training",
    photo: "/photos/crew-hivis.jpg",
    blurb: "Safety training, examinations and professional courses that build competent, certified crews.",
  },
  services: {
    key: "services",
    name: "Services",
    hub: "/services",
    photo: "/photos/refinery-night.jpg",
    blurb: "Mechanical, electrical and instrumentation works, operation & maintenance and site support across the Kingdom.",
  },
  calibration: {
    key: "calibration",
    name: "Calibration",
    hub: "/calibration",
    photo: "/photos/gauge-brass.jpg",
    blurb: "Onsite and lab calibration that keeps measurement accurate, traceable and audit-ready.",
  },
  manufacturing: {
    key: "manufacturing",
    name: "Manufacturing",
    hub: "/manufacturing",
    photo: "/photos/welder-blue.jpg",
    blurb: "Power protection, welding supplies and safety equipment for industrial sites.",
  },
  diving: {
    key: "diving",
    name: "Commercial Diving Services",
    hub: "/commercial-diving",
    photo: "/photos/diver-work.jpg",
    blurb: "Surface-supplied diving teams for underwater inspection, survey and certification of marine assets.",
  },
  underwater: { key: "underwater", name: "Underwater NDT Services", photo: "/photos/diver-deep.jpg", blurb: "Underwater NDT and cleaning for hulls and marine structures." },
  about: {
    key: "about",
    name: "About Us",
    hub: "/about",
    photo: "/photos/offshore-haze.jpg",
    blurb: "A multi-disciplinary engineering and technical services organisation based in Yanbu, Saudi Arabia.",
  },
};

export const pageByRoute = (route: string) => pages.find((p) => p.route === route);
export const pagesIn = (key: CategoryKey) => pages.filter((p) => p.category === key);
export const hubByRoute = (route: string) => Object.values(categories).find((c) => c.hub === route);

// A distinct high-resolution hero for each page (Unsplash, free licence; in /public/photos).
const ph = (n: string) => `/photos/${n}.jpg`;
const heroes: Record<string, string> = {
  "/inspection/qa-qc-project-management": ph("site-plans"),
  "/inspection/third-party-inspection": ph("crane-blue"),
  "/welding": ph("welder-sparks"),
  "/ndt/ultrasonic-testing": ph("pipework"),
  "/ndt/radiographic-testing": ph("pipeline"),
  "/ndt/magnetic-particle-testing": ph("weld-grinder"),
  "/ndt/positive-material-identification": ph("pipes-silver"),
  "/ndt/penetrant-testing": ph("welder-blue"),
  "/ndt/hardness-test": ph("steel-coils"),
  "/ndt/rope-access": ph("rope-access"),
  "/ndt/advanced-ndt-services": ph("advanced-ndt"),
  "/training/safety-orientation-induction-training": ph("classroom"),
  "/training/permit-receiver-training-examination": ph("site-workers"),
  "/training/safety-officer-training-examination": ph("crew-hivis"),
  "/training/rigger-training-examination": ph("crane-hook"),
  "/training/fire-watcher-training-examination": ph("firefighters"),
  "/training/flagman-traffic-marshal-training": ph("flagman"),
  "/training/equipment-operator-safety-training": ph("excavator"),
  "/training/work-at-height-safety-training": ph("work-at-height"),
  "/training/scaffolding-training-certification": ph("scaffolding"),
  "/training/welding-inspection-courses": ph("welding-inspection"),
  "/training/ndt-training-courses": ph("pipework-grey"),
  "/training/api-training-courses": ph("oil-tanks"),
  "/training/re-rto-renewal-stu-course": ph("site-workers-2"),
  "/training/bespoke-training": ph("engineer-pointing"),
  "/services/plant-industrial-services": ph("refinery-night"),
  "/services/operation-maintenance": ph("control-room"),
  "/services/plant-machinery-vehicle": ph("trucks"),
  "/services/housing-services": ph("camp-dusk"),
  "/services/remote-services": ph("desert-camp"),
  "/calibration/pressure-calibration": ph("gauge-dark"),
  "/calibration/dimensional-calibration": ph("measuring"),
  "/calibration/electrical-calibration": ph("multimeter"),
  "/calibration/thermal-calibration": ph("thermometer"),
  "/calibration/torque-calibration": ph("torque-wrench"),
  "/calibration/flow-meter-calibration": ph("pipeline"),
  "/calibration/mass-volume-calibration": ph("scale"),
  "/calibration/gas-detector-calibration": ph("gas-detector"),
  "/calibration/onsite-calibration": ph("gauge-brass"),
  "/calibration/ups-online-offline": ph("server-room"),
  "/manufacturing/servostabilizer": ph("electrical-panel"),
  "/manufacturing/welding-electrodes": ph("welder-helmet"),
  "/manufacturing/welding-machines-and-consumables": ph("welding-machine"),
  "/manufacturing/safety-equipment-and-accessories": ph("hard-hats"),
  "/commercial-diving/surface-supplied-diving": ph("diver-work"),
  "/commercial-diving/underwater-surveys": ph("wreck"),
  "/commercial-diving/marine-inspections": ph("jetty"),
  "/commercial-diving/inspection-certification": ph("vessel"),
  "/underwater-ndt-services": ph("hull-underwater"),
  "/about/certifications-and-awards": ph("vessel-2"),
  "/about/career": ph("site-workers"),
};

/** The hero photo for a page: its assigned photo, else its own large image, else the category photo. */
export function heroImage(p: Page): string {
  if (heroes[p.route]) return heroes[p.route];
  const all = [...p.images, ...p.sections.flatMap((s) => s.images)];
  const big = all.find((i) => i.w >= 1200 && i.w / Math.max(i.h, 1) >= 1.2);
  return big?.src ?? categories[p.category].photo;
}

/** Splits an SEO title like "Ultrasonic Testing - Accurate & Reliable NDT Evaluation" into a headline and tagline. */
export function splitTitle(p: Page): { headline: string; tagline?: string } {
  const m = p.title.match(/^(.+?)\s*[-–—]\s*(.+)$/);
  if (m && m[2].length > 8) return { headline: p.navLabel, tagline: m[2] };
  return { headline: p.title.length > 48 ? p.navLabel : p.title };
}

// ---- Navigation: every item from the old oagitech.com menu ----

export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; href?: string; category?: CategoryKey; links?: NavLink[] };

const linksFor = (key: CategoryKey) => pagesIn(key).map((p) => ({ label: p.navLabel, href: p.route }));

export const menu: NavGroup[] = [
  { label: "Home", href: "/" },
  { label: "Inspection", category: "inspection", links: linksFor("inspection") },
  { label: "Welding", href: "/welding" },
  { label: "NDT", category: "ndt", links: linksFor("ndt") },
  { label: "Civil/Structural/Geo", href: "/civil-structural-geo" },
  { label: "Training", category: "training", links: linksFor("training") },
  { label: "Services", category: "services", links: linksFor("services") },
  { label: "Calibration", category: "calibration", links: linksFor("calibration") },
  {
    label: "Manufacturing",
    category: "manufacturing",
    links: [
      ...linksFor("manufacturing").slice(0, 1),
      { label: "UPS Online & Offline", href: "/calibration/ups-online-offline" },
      ...linksFor("manufacturing").slice(1),
    ],
  },
  { label: "Commercial Diving Services", category: "diving", links: linksFor("diving") },
  { label: "Underwater NDT Services", href: "/underwater-ndt-services" },
  { label: "About Us", category: "about", links: [...linksFor("about"), { label: "Contact Us", href: "/contact" }] },
];

/** Groups shown in the desktop pill: dropdown groups, with the old single-link items folded into the nearest group. */
export const desktopMenu: NavGroup[] = [
  { label: "Inspection", category: "inspection", links: [...linksFor("inspection"), { label: "Welding", href: "/welding" }, { label: "Civil/Structural/Geo", href: "/civil-structural-geo" }] },
  { label: "NDT", category: "ndt", links: [...linksFor("ndt"), { label: "Underwater NDT Services", href: "/underwater-ndt-services" }] },
  { label: "Training", category: "training", links: linksFor("training") },
  { label: "Services", category: "services", links: linksFor("services") },
  { label: "Calibration", category: "calibration", links: linksFor("calibration") },
  { label: "Manufacturing", category: "manufacturing", links: menu[8].links },
  { label: "Diving", category: "diving", links: [...linksFor("diving"), { label: "Underwater NDT Services", href: "/underwater-ndt-services" }] },
  { label: "About", category: "about", links: menu[11].links },
];
