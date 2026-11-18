// OAGITECH training catalogue. Course titles and codes come from the company master lists in /SERVICES.
// All descriptive copy is original to this site.

export type Course = { code: string; title: string };
export type TrainingCategory = {
  slug: string;
  route: string;
  letter: string;
  prefix: string;
  name: string;
  tagline: string;
  hero: string;
  intro: string[];
  audience: string[];
  courses: Course[];
};

const ph = (n: string) => `/photos/${n}.jpg`;

const list = (prefix: string, titles: string[]): Course[] =>
  titles.map((title, i) => ({ code: `${prefix}-${String(i + 1).padStart(3, "0")}`, title }));

/** Delivery options from the course registration screen. */
export const trainingMethods = ["Classroom", "Online", "Classroom + Practical"] as const;

export const regions = [
  { code: "REG-001", name: "Eastern Region", cities: ["Dammam", "Khobar", "Dhahran", "Jubail", "Al Ahsa", "Qatif"] },
  { code: "REG-002", name: "Western Region", cities: ["Jeddah", "Makkah", "Madinah", "Yanbu", "Taif", "Tabuk"] },
  { code: "REG-003", name: "Northern Region", cities: ["Turaif", "Arar", "Rafha", "Sakaka", "Qurayyat", "Hail"] },
  { code: "REG-004", name: "Southern Region", cities: ["Abha", "Khamis Mushait", "Jazan", "Najran", "Al Bahah"] },
  { code: "REG-005", name: "Central Region", cities: ["Riyadh", "Buraydah", "Unaizah", "Al Kharj", "Al Majma'ah"] },
];

const cat = (c: Omit<TrainingCategory, "route">): TrainingCategory => ({ ...c, route: `/training/${c.slug}` });

export const trainingCategories: TrainingCategory[] = [
  cat({
    slug: "general-safety-hse",
    letter: "A",
    prefix: "HSE",
    name: "General Safety & HSE Training",
    tagline: "The safety foundation every worker, supervisor and manager needs.",
    hero: ph("classroom"),
    intro: [
      "Good safety performance starts with people who understand the hazards around them and know what to do about them.",
      "These courses run from site induction and basic occupational health and safety to officer, supervisor and manager level training, risk assessment, incident investigation and safety leadership.",
    ],
    audience: ["New starters and contractors", "HSE officers, supervisors and managers", "Team leaders who run toolbox talks"],
    courses: list("HSE", ["General Safety Orientation / Induction", "Basic Occupational Health & Safety", "HSE Officer Training", "HSE Supervisor Training", "HSE Manager Training", "Hazard Identification & Risk Assessment (HIRA)", "Job Safety Analysis (JSA/JHA)", "Toolbox Talk (TBT) Training", "Incident & Accident Investigation", "Behavior-Based Safety (BBS)", "Personal Protective Equipment (PPE)", "Safety Leadership & Awareness", "Emergency Response & Evacuation", "Heat Stress Prevention", "Manual Handling & Ergonomics"]),
  }),
  cat({
    slug: "permit-to-work",
    letter: "B",
    prefix: "PTW",
    name: "Permit to Work & High-Risk Activities",
    tagline: "Controlling the jobs where a mistake costs the most.",
    hero: ph("site-workers"),
    intro: [
      "Hot work, confined spaces, isolations and work at height are where serious incidents happen. A permit system only works when the people issuing and receiving permits understand it fully.",
      "These courses cover permit issuer and receiver roles, the permit system itself and the high risk activities it controls.",
    ],
    audience: ["Permit issuers and receivers", "Supervisors of high risk work", "Confined space entrants and standby personnel"],
    courses: list("PTW", ["Permit Receiver Training", "Permit Issuer Training", "Permit to Work (PTW) System", "Hot Work Safety", "Cold Work Safety", "Confined Space Entry", "Confined Space Attendant / Standby Man", "Confined Space Rescue Awareness", "Lockout/Tagout (LOTO)", "Working at Height", "Excavation & Trenching Safety", "Electrical Isolation Safety", "Line Breaking & Process Isolation", "Simultaneous Operations (SIMOPS)"]),
  }),
  cat({
    slug: "fire-safety-emergency-response",
    letter: "C",
    prefix: "FIR",
    name: "Fire Safety & Emergency Response",
    tagline: "Ready to act in the first minutes of an emergency.",
    hero: ph("firefighters"),
    intro: [
      "When something goes wrong, the actions taken in the first few minutes decide the outcome.",
      "These courses prepare fire watchers, wardens and response teams, and cover firefighting, first aid, CPR, spill response, evacuation, H2S and breathing apparatus.",
    ],
    audience: ["Fire watchers and fire wardens", "Emergency response team members", "First aiders and site safety staff"],
    courses: list("FIR", ["Fire Watcher", "Fire Warden / Fire Marshal", "Basic Fire Fighting", "Fire Extinguisher Training", "Emergency Response Team Training", "Basic First Aid", "CPR & AED", "Chemical Spill Response", "Emergency Evacuation Drill", "H2S Awareness", "Breathing Apparatus Awareness"]),
  }),
  cat({
    slug: "lifting-rigging-crane-safety",
    letter: "D",
    prefix: "LFT",
    name: "Lifting, Rigging & Crane Safety",
    tagline: "Competent people for every role in a lift.",
    hero: ph("crane-hook"),
    intro: [
      "Every lift depends on a team: the rigger, the signalman, the operator, the supervisor and the person who planned it.",
      "These courses cover rigging from level I to level III, banksman duties, lifting supervision and appointed person roles, crane operation, lifting plans and critical lifts.",
    ],
    audience: ["Riggers and banksmen", "Crane operators", "Lifting supervisors and appointed persons"],
    courses: list("LFT", ["Rigger Level I", "Rigger Level II", "Rigger Level III", "Banksman / Signalman", "Lifting Supervisor", "Appointed Person (Lifting Operations)", "Basic Rigging & Slinging", "Mobile Crane Operator", "Tower Crane Operator", "Overhead Crane Operator", "Jib Crane Operator", "Lifting Equipment Inspection Awareness", "Critical Lifting Operations", "Lifting Plan Preparation"]),
  }),
  cat({
    slug: "heavy-equipment-operator-safety",
    letter: "E",
    prefix: "EQP",
    name: "Heavy Equipment & Operator Safety",
    tagline: "Safe, skilled operators for every machine on site.",
    hero: ph("excavator"),
    intro: [
      "Mobile plant is involved in a large share of site injuries. Operators need both machine skills and awareness of the people around them.",
      "These courses cover forklifts, telehandlers, aerial work platforms and earthmoving machines, plus spotters, defensive driving and industrial vehicle safety.",
    ],
    audience: ["Plant and equipment operators", "Spotters and banksmen", "Drivers of site and industrial vehicles"],
    courses: list("EQP", ["Forklift Operator", "Telehandler Operator", "Boom Lift Operator", "Scissor Lift Operator", "Excavator Operator", "Wheel Loader Operator", "Backhoe Loader Operator", "Bulldozer Operator", "Motor Grader Operator", "Roller/Compactor Operator", "Dump Truck Operator", "Manlift / MEWP Safety", "Heavy Equipment Spotter", "Defensive Driving", "Industrial Vehicle Safety"]),
  }),
  cat({
    slug: "scaffolding-construction-safety",
    letter: "F",
    prefix: "CON",
    name: "Scaffolding & Construction Safety",
    tagline: "Safer scaffolds and safer construction sites.",
    hero: ph("scaffolding"),
    intro: [
      "Scaffolds and temporary works carry people and materials at height, so they must be built, inspected and used correctly.",
      "These courses train scaffold erectors, supervisors, inspectors and users, and cover fall protection, ladders, formwork, demolition, tools, hot work and abrasive blasting.",
    ],
    audience: ["Scaffold erectors, supervisors and inspectors", "Construction workers and foremen", "Anyone working at height"],
    courses: list("CON", ["Scaffolding Erector", "Scaffolding Supervisor", "Scaffolding Inspector", "Scaffolding User Awareness", "Fall Protection & Harness Safety", "Ladder Safety", "Construction Site Safety", "Formwork & Shoring Safety", "Demolition Safety", "Hand & Power Tool Safety", "Grinding & Cutting Safety", "Welding Safety", "Abrasive Blasting Safety"]),
  }),
  cat({
    slug: "industrial-chemical-process-safety",
    letter: "G",
    prefix: "IND",
    name: "Industrial, Chemical & Process Safety",
    tagline: "Managing the hazards of plants and processes.",
    hero: ph("oil-tanks"),
    intro: [
      "Process plants bring chemicals, stored energy, pressure and electricity together in one place.",
      "These courses cover chemical handling, hazard communication, process safety management, pressure and hydro testing safety, gas cylinders, electrical and arc flash awareness, machinery guarding and hazardous areas.",
    ],
    audience: ["Plant operators and technicians", "Maintenance and testing crews", "Contractors working in process areas"],
    courses: list("IND", ["Chemical Handling Safety", "Hazardous Materials Awareness", "Safety Data Sheet (SDS) Awareness", "Hazard Communication (HAZCOM)", "Process Safety Management Awareness", "Pressure Testing Safety", "Hydrotesting Safety", "Pneumatic Testing Safety", "Industrial Gas Cylinder Safety", "Electrical Safety Awareness", "Arc Flash Awareness", "Machinery Guarding", "Industrial Housekeeping", "Phosphoric Acid Handling Safety", "Hazardous Area / ATEX Awareness"]),
  }),
  cat({
    slug: "client-specific-site-training",
    letter: "H",
    prefix: "CLT",
    name: "Client-Specific Site Training",
    tagline: "Site orientations and permit training for the Kingdom's major operators.",
    hero: ph("site-workers-2"),
    intro: [
      "Major operators set their own rules for contractors entering their sites.",
      "These courses prepare your workforce for site orientations and permit roles at Ma'aden, Saudi Aramco, SABIC, SEC, NEOM and Royal Commission sites, along with client and project specific inductions.",
    ],
    audience: ["Contractors mobilising to client sites", "Permit receivers and issuers on client sites", "Project teams starting new work"],
    courses: list("CLT", ["Ma'aden Site Safety Orientation", "Ma'aden Permit Receiver Training", "Ma'aden Permit Issuer Training", "Ma'aden Contractor Safety Training", "Saudi Aramco Site Safety Orientation", "Saudi Aramco Work Permit Receiver Preparation", "SABIC Site Safety Orientation", "SEC Site Safety Orientation", "NEOM Project Safety Orientation", "Royal Commission Site Safety Orientation", "Client-Specific Contractor Induction", "Project-Specific Safety Training"]),
  }),
];

export const allCourses = trainingCategories.flatMap((c) => c.courses.map((course) => ({ ...course, category: c })));
export const courseCount = allCourses.length;
export const trainingIntro = [
  "Competent people are the strongest safety control on any site.",
  `Our training catalogue covers ${courseCount} courses in eight categories, from site induction to crane operation and client site orientations, delivered in the classroom, online or as classroom plus practical sessions.`,
];
