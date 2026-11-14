// Homepage content, taken from the live oagitech.com (Nov 2026) and tidied for the new site.
// Photos are Unsplash stock (free licence) as placeholders until OAGITECH supplies its own.

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
  kicker: "Oil & Gas Inspection Technology",
  title: ["Building excellence", "through innovation", "& quality"],
  intro:
    "Inspection, non-destructive testing, engineering consultancy and technical training & certification for marine, oil & gas, petrochemical, power and infrastructure.",
};

export const about = {
  statement:
    "OAGITECH is a multi-disciplinary engineering and technical services organisation, helping industrial, commercial and government clients keep the highest standards of safety, quality and operational efficiency.",
  body: "Our team combines strong technical knowledge with practical field experience. Working closely with clients and industry partners, we deliver dependable solutions that meet international standards, regulatory requirements and project expectations.",
  sectors: ["Marine", "Oil & Gas", "Petrochemical", "Power Generation", "Infrastructure", "Process Industries"],
};

export const services = [
  {
    title: "Safety Inspection",
    text: "Thorough inspections to identify hazards, ensure compliance and maintain safe working conditions.",
    image: photos.crewHiVis,
    href: "/inspection/third-party-inspection",
  },
  {
    title: "Training & Assessment",
    text: "Practical training and competency assessments to strengthen skills, safety awareness and performance.",
    image: photos.engineerPointing,
    href: "/training",
  },
  {
    title: "NDT & Asset Integrity",
    text: "Non-destructive testing and integrity checks to assess asset condition and support operational reliability.",
    image: photos.pipework,
    href: "/ndt",
  },
  {
    title: "Calibration",
    text: "Reliable calibration services to maintain measurement accuracy, equipment performance and traceability.",
    image: photos.gaugeDark,
    href: "/calibration",
  },
  {
    title: "QA/QC Inspection",
    text: "Quality assurance and control inspections to verify workmanship, specifications and project standards.",
    image: photos.siteWorker,
    href: "/inspection/qa-qc-project-management",
  },
  {
    title: "Documentation",
    text: "Accurate technical reports, inspection records and project documents for clear, organised reporting.",
    image: photos.pipeworkGrey,
    href: "/inspection/qa-qc-project-management",
  },
];

export const divisions = [
  {
    name: "Inspection",
    href: "/inspection",
    image: photos.sphereTanks,
    text: "Independent inspection and expediting to local regulations and international standards.",
    items: ["Asset Integrity", "QA/QC Project Management", "Third-Party Inspection", "Welding & Consultancy"],
  },
  {
    name: "Non-Destructive Testing",
    href: "/ndt",
    image: photos.pipework,
    text: "Conventional and advanced NDT that finds internal and surface defects without damaging the component.",
    items: ["Ultrasonic Testing", "Radiographic Testing", "Magnetic Particle Testing", "Penetrant Testing", "Positive Material Identification", "Hardness Test", "Rope Access", "Advanced NDT", "Civil / Structural / Geo"],
  },
  {
    name: "Training & Certification",
    href: "/training",
    image: photos.crewHiVis,
    text: "Safety training, examinations and professional courses that build competent, certified crews.",
    items: ["Safety Orientation & Induction", "Permit Receiver", "Safety Officer", "Rigger", "Fire Watcher", "Work at Height", "Scaffolding", "Welding Inspection", "NDT & API Courses"],
  },
  {
    name: "Calibration",
    href: "/calibration",
    image: photos.gaugeBrass,
    text: "Onsite and lab calibration that keeps measurement accurate, traceable and audit-ready.",
    items: ["Pressure", "Dimensional", "Electrical", "Thermal", "Torque", "Flow Meter", "Mass & Volume", "Gas Detector", "Onsite Calibration"],
  },
  {
    name: "Industrial Services",
    href: "/services",
    image: photos.refineryNight,
    text: "Mechanical, electrical and instrumentation works for brownfield projects across the Kingdom.",
    items: ["Plant Industrial Services", "Operation & Maintenance", "Plant Machinery & Vehicle", "Housing Services", "Remote Services"],
  },
  {
    name: "Commercial Diving",
    href: "/commercial-diving",
    image: photos.diverWork,
    text: "Surface-supplied diving teams for underwater inspection, survey and NDT of marine assets.",
    items: ["Surface-Supplied Diving", "Underwater Surveys", "Marine Inspections", "Inspection & Certification", "Underwater NDT"],
  },
  {
    name: "Manufacturing & Supply",
    href: "/manufacturing",
    image: photos.welderSparks,
    text: "Power protection, welding supplies and safety equipment for industrial sites.",
    items: ["Servostabilizers", "UPS Online & Offline", "Welding Electrodes", "Welding Machines & Consumables", "Safety Equipment"],
  },
];

export const activities = [
  { title: "Third-Party Inspection", text: "Cranes, trucks, forklifts, lifting equipment, safety slings and harnesses, scaffolding, machinery and tools." },
  { title: "Industrial Safety Training", text: "Professional programmes that raise safety awareness, operational skill and hazard prevention." },
  { title: "Personnel Certification", text: "Competency assessment and qualification checks that keep your people compliant." },
  { title: "Equipment Testing", text: "Testing that verifies performance, reliability and safety for dependable operations." },
  { title: "Non-Destructive Testing", text: "Identifying material defects and structural flaws without damaging the component." },
  { title: "Calibration", text: "Accurate calibration so measuring instruments deliver reliable, precise results." },
];

export const reasons = [
  { title: "Industry expertise", text: "Experienced professionals delivering reliable engineering and technical support." },
  { title: "Quality assurance", text: "High standards of quality, precision and performance on every job." },
  { title: "Safety first", text: "Workplace safety and dependable execution at every stage." },
  { title: "Efficient execution", text: "Cost-effective solutions for smooth, on-time project completion." },
];

export const diving = {
  title: "Below the surface",
  text: "Surface-supplied diving teams with continuous air supply and live communication for jetties, piers, vessel hulls, pipelines and submerged structures.",
  items: [
    { title: "Underwater NDT", text: "UT thickness measurement, weld inspection and corrosion assessment." },
    { title: "Marine Inspections", text: "Jetties, piers, hulls, pipelines and underwater structures." },
    { title: "Underwater Surveys", text: "Visual inspection and video documentation of submerged assets." },
  ],
};

export const courses = [
  "Safety Orientation & Induction Training",
  "Permit Receiver Training & Examination",
  "Safety Officer Training & Examination",
  "Rigger Training & Examination",
  "Fire Watcher Training & Examination",
  "Flagman / Traffic Marshal Training",
  "Equipment Operator Safety Training",
  "Work at Height Safety Training",
  "Scaffolding Training & Certification",
  "Welding Inspection Courses",
  "NDT Training Courses",
  "API Training Courses",
  "RE/RTO Renewal STU Course",
  "Bespoke Training",
];

export const memberships = [
  "Singapore Welding Society (SWS)",
  "IRATA International",
  "Association of Consulting Engineers Singapore (ACES)",
  "Association for Process Industry (ASPRI)",
  "Non-Destructive Testing Society (Singapore)",
];

export const faqs = [
  {
    q: "Which industries does OAGITECH serve?",
    a: "Marine, oil & gas, petrochemical, power generation, infrastructure and process industries, for industrial, commercial and government clients.",
  },
  {
    q: "What does OAGITECH inspect?",
    a: "Cranes, trucks, forklifts and lifting equipment, safety slings and harnesses, scaffolding, machinery and tools, plus pressure vessels, piping and plant through our asset integrity and third-party inspection services.",
  },
  {
    q: "Which NDT methods do you offer?",
    a: "Ultrasonic, radiographic, magnetic particle and penetrant testing, positive material identification and hardness testing, with advanced NDT and rope access for hard-to-reach assets.",
  },
  {
    q: "Do you provide training and certification?",
    a: "Yes. We run safety orientation, permit receiver, safety officer, rigger, fire watcher, work at height, scaffolding and equipment operator courses with examinations, plus welding inspection, NDT, API and bespoke courses.",
  },
  {
    q: "Can you calibrate equipment on site?",
    a: "Yes. We offer onsite and lab calibration for pressure, dimensional, electrical, thermal, torque, flow, mass & volume instruments and gas detectors.",
  },
];
