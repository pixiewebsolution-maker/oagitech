// Site structure: navigation, hubs and page lookup, built from the service, training and about data.
import { aboutPages } from "./about";
import { divisions, hubIntro, pagesInDivision, servicePages, type DivisionKey } from "./services";
import { trainingCategories, trainingIntro } from "./training";

export type NavLink = { label: string; href: string };
export type NavFeature = { title: string; text: string; photo: string; href: string };
export type NavGroup = { label: string; href?: string; feature?: NavFeature; links?: NavLink[] };

const svc = (key: DivisionKey) => pagesInDivision(key).map((p) => ({ label: p.navLabel, href: p.route }));
const feature = (key: DivisionKey): NavFeature => ({ title: divisions[key].name, text: divisions[key].blurb, photo: divisions[key].photo, href: divisions[key].hub });

const inspection: NavGroup = {
  label: "Inspection",
  feature: { title: "Inspection & Testing", text: "Safety and PPE inspection, pressure testing and civil engineering tests.", photo: "/photos/crane-blue.jpg", href: "/safety-inspection" },
  links: [
    { label: "Safety Inspection", href: "/safety-inspection" },
    { label: "PPE Inspection", href: "/ppe-inspection" },
    { label: "Pressure Testing", href: "/pressure-testing" },
    { label: "Civil Testing & Inspection", href: "/civil-testing" },
  ],
};
const ndt: NavGroup = { label: "NDT", feature: feature("ndt"), links: svc("ndt") };
const calibration: NavGroup = { label: "Calibration", feature: feature("calibration"), links: svc("calibration") };
const underwater: NavGroup = { label: "Underwater & Marine", feature: feature("underwater"), links: svc("underwater") };
const training: NavGroup = {
  label: "Training",
  feature: { title: "HSE & Technical Training", text: "109 courses in eight categories, classroom, online or with practical sessions.", photo: "/photos/crew-hivis-hd.jpg", href: "/training" },
  links: [...trainingCategories.map((c) => ({ label: c.name, href: c.route })), { label: "Course Registration", href: "/training/register" }],
};
const about: NavGroup = {
  label: "About Us",
  feature: { title: "About OAGITECH", text: "A multi-disciplinary technical services company based in Yanbu.", photo: "/photos/offshore-haze.jpg", href: "/about" },
  links: [...aboutPages.map((p) => ({ label: p.navLabel, href: p.route })), { label: "Contact Us", href: "/contact" }],
};

/** Full menu, used on phones and in the footer. */
export const menu: NavGroup[] = [
  { label: "Home", href: "/" },
  inspection,
  ndt,
  calibration,
  underwater,
  training,
  { label: "Software & IT", href: "/software-it" },
  about,
];

/** Desktop pill: the same groups without Home (the logo links home). */
export const desktopMenu: NavGroup[] = [inspection, ndt, calibration, { ...underwater, label: "Underwater" }, training, { label: "Software & IT", href: "/software-it" }, { ...about, label: "About" }];

// ---- Route lookup ----

export type HubPage = { kind: "hub"; route: string; title: string; tagline: string; hero: string; intro: string[]; cards: { title: string; text: string; href: string; photo: string; count?: number }[] };

export const hubs: HubPage[] = [
  ...(["ndt", "calibration", "underwater"] as DivisionKey[]).map((key) => ({
    kind: "hub" as const,
    route: divisions[key].hub,
    title: divisions[key].name,
    tagline: divisions[key].blurb,
    hero: divisions[key].photo,
    intro: hubIntro[key] ?? [divisions[key].blurb],
    cards: pagesInDivision(key).map((p) => ({ title: p.navLabel, text: p.tagline, href: p.route, photo: p.hero, count: p.groups.reduce((n, g) => n + g.items.length, 0) })),
  })),
  {
    kind: "hub",
    route: "/training",
    title: "Training & Certification",
    tagline: "109 safety and technical courses in eight categories.",
    hero: "/photos/crew-hivis-hd.jpg",
    intro: trainingIntro,
    cards: trainingCategories.map((c) => ({ title: c.name, text: c.tagline, href: c.route, photo: c.hero, count: c.courses.length })),
  },
];

export const servicePageByRoute = (route: string) => servicePages.find((p) => p.route === route);
export const trainingByRoute = (route: string) => trainingCategories.find((c) => c.route === route);
export const aboutByRoute = (route: string) => aboutPages.find((p) => p.route === route);
export const hubByRoute = (route: string) => hubs.find((h) => h.route === route);

/** Every route served by the catch-all page. */
export const contentRoutes = [
  ...servicePages.map((p) => p.route),
  ...hubs.map((h) => h.route),
  ...trainingCategories.map((c) => c.route),
  ...aboutPages.map((p) => p.route),
];
