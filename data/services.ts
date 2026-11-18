// OAGITECH service catalogue. Service names and codes come from the company master lists in /SERVICES.
// All descriptive copy is original to this site.

export type ServiceItem = { code?: string; name: string; text?: string };
export type ServiceGroup = { name: string; intro?: string; items: ServiceItem[] };
export type Point = { title: string; text: string };
export type ExtraSection = { heading: string; body?: string[]; points?: Point[] };
export type Faq = { q: string; a: string };

export type ServicePage = {
  route: string;
  division: DivisionKey;
  navLabel: string;
  tagline: string;
  hero: string;
  intro: string[];
  groups: ServiceGroup[];
  extra?: ExtraSection[];
  faqs?: Faq[];
  note?: string;
};

export type DivisionKey = "safety" | "ppe" | "ndt" | "civil" | "pressure" | "calibration" | "underwater" | "software";

export type Division = {
  key: DivisionKey;
  name: string;
  short: string;
  hub: string; // overview route
  photo: string;
  blurb: string;
};

const ph = (n: string) => `/photos/${n}.jpg`;

const code = (prefix: string, start: number, names: string[]): ServiceItem[] =>
  names.map((name, i) => ({ code: `${prefix}-${String(start + i).padStart(3, "0")}`, name }));
const plain = (names: string[]): ServiceItem[] => names.map((name) => ({ name }));

export const divisions: Record<DivisionKey, Division> = {
  safety: {
    key: "safety",
    name: "Safety Inspection",
    short: "Safety Inspection",
    hub: "/safety-inspection",
    photo: ph("crane-blue"),
    blurb: "Third party inspection of cranes, lifting gear, heavy plant, access equipment, pressure systems, fire equipment and workshop tools.",
  },
  ppe: {
    key: "ppe",
    name: "PPE Inspection",
    short: "PPE Inspection",
    hub: "/ppe-inspection",
    photo: ph("hard-hats"),
    blurb: "Inspection of fall protection, respiratory, electrical, chemical and marine protective equipment before it reaches your workforce.",
  },
  ndt: {
    key: "ndt",
    name: "NDT Services",
    short: "NDT",
    hub: "/ndt",
    photo: ph("pipework"),
    blurb: "Conventional and advanced non-destructive testing that finds defects in welds, plate, pipe and plant without damaging them.",
  },
  civil: {
    key: "civil",
    name: "Civil Testing & Inspection",
    short: "Civil Testing",
    hub: "/civil-testing",
    photo: ph("site-plans"),
    blurb: "In-situ testing of concrete, piles, soil and pavement, plus structural condition assessment for buildings and infrastructure.",
  },
  pressure: {
    key: "pressure",
    name: "Pressure Testing",
    short: "Pressure Testing",
    hub: "/pressure-testing",
    photo: ph("pipework-grey"),
    blurb: "Hydrostatic, pneumatic and leak testing for pipelines, vessels, tanks, boilers, valves, hoses and manifolds.",
  },
  calibration: {
    key: "calibration",
    name: "Calibration Services",
    short: "Calibration",
    hub: "/calibration",
    photo: ph("gauge-brass"),
    blurb: "Calibration of 100 instrument types across ten disciplines, from pressure gauges to flaw detectors.",
  },
  underwater: {
    key: "underwater",
    name: "Underwater Inspection & Marine",
    short: "Underwater & Marine",
    hub: "/underwater-marine",
    photo: ph("diver-deep"),
    blurb: "Diver and ROV inspection, underwater NDT, hull work, cleaning, and underwater welding, cutting and repair.",
  },
  software: {
    key: "software",
    name: "Software Development & IT",
    short: "Software & IT",
    hub: "/software-it",
    photo: ph("server-room"),
    blurb: "Custom business, inspection and training software, web and mobile apps, AI, integrations and digital certificate verification.",
  },
};

// ---------------------------------------------------------------------------------------------
// Safety Inspection
// ---------------------------------------------------------------------------------------------

const safetyInspection: ServicePage = {
  route: "/safety-inspection",
  division: "safety",
  navLabel: "Safety Inspection",
  tagline: "Independent inspection of the equipment your people rely on every shift.",
  hero: ph("crane-blue"),
  intro: [
    "Equipment that lifts, holds pressure, carries people or fights fire has to be proven safe before it goes to work.",
    "Our inspectors examine cranes, lifting accessories, heavy plant, access equipment, pressure systems, electrical tools and emergency equipment against the manufacturer's data, the applicable standard and your site rules. Every item is recorded, tagged and reported so you know exactly what is fit for use and what needs attention.",
  ],
  groups: [
    { name: "Cranes & lifting equipment", items: plain(["Mobile Crane", "Crawler Crane", "Tower Crane", "Rough Terrain Crane", "All Terrain Crane", "Truck Mounted Crane", "Knuckle Boom Crane", "Slewing Jib Crane", "Gantry Crane", "Overhead / EOT Crane", "Monorail Hoist", "Electric Chain Hoist", "Manual Chain Block", "Lever Hoist", "Wire Rope Hoist", "Construction Material Hoist", "Passenger / Material Hoist", "Winch", "Davit Crane", "Lifting Beam / Spreader Beam"]) },
    { name: "Lifting accessories & rigging equipment", items: plain(["Wire Rope Sling", "Webbing Sling", "Round Sling", "Chain Sling", "Bow Shackle", "D Shackle", "Lifting Hook", "Swivel Hook", "Eye Bolt", "Lifting Eye Nut", "Turnbuckle", "Plate Lifting Clamp", "Beam Clamp", "Drum Lifting Clamp", "Magnetic Lifter", "Vacuum Lifter", "Lifting Magnet", "Wire Rope Grip", "Snatch Block / Pulley Block", "Lifting Spreader Bar"]) },
    { name: "Heavy equipment & earthmoving machinery", items: plain(["Excavator", "Backhoe Loader", "Wheel Loader", "Bulldozer", "Motor Grader", "Skid Steer Loader", "Mini Excavator", "Dump Truck", "Articulated Dump Truck", "Road Roller", "Soil Compactor", "Vibratory Roller", "Asphalt Paver", "Trencher", "Rock Breaker / Hydraulic Hammer", "Piling Rig", "Drilling Rig", "Concrete Pump Truck", "Transit Mixer", "Telehandler"]) },
    { name: "Forklifts & aerial work platforms", items: plain(["Diesel Forklift", "Electric Forklift", "LPG Forklift", "Reach Truck", "Pallet Stacker", "Electric Pallet Truck", "Manual Pallet Jack", "Boom Lift (Telescopic)", "Boom Lift (Articulating)", "Scissor Lift", "Vertical Mast Lift", "Truck Mounted Aerial Platform", "Suspended Access Platform", "Mast Climbing Work Platform", "Personnel Lifting Basket"]) },
    { name: "Scaffolding & working at height", items: plain(["Tube & Coupler Scaffolding", "Ringlock Scaffolding", "Cuplock Scaffolding", "Frame Scaffolding", "Mobile Scaffolding Tower", "Suspended Scaffolding", "Cantilever Scaffolding", "Birdcage Scaffolding", "Aluminium Access Tower", "Extension Ladder", "Step Ladder", "Platform Ladder", "Fixed Vertical Ladder", "Temporary Work Platform", "Lifeline / Anchor System"]) },
    { name: "Personal protective equipment & fall protection", items: plain(["Full Body Safety Harness", "Shock Absorbing Lanyard", "Self-Retracting Lifeline (SRL)", "Fall Arrest Block", "Anchorage Connector", "Tripod Rescue System", "Rescue Winch", "Horizontal Lifeline System", "Vertical Lifeline System", "Self-Contained Breathing Apparatus (SCBA)", "Escape Breathing Apparatus", "Portable Gas Detector", "Multi-Gas Detector", "Welding PPE"]) },
    { name: "Pressure equipment & industrial systems", items: plain(["Air Receiver", "Pressure Vessel", "Air Compressor", "Steam Boiler", "Hot Water Boiler", "Pressure Safety Valve", "Pressure Relief Valve", "Hydraulic Power Unit", "Hydraulic Jack", "Hydraulic Cylinder", "Pressure Gauge", "Industrial Gas Cylinder", "Storage Tank", "Heat Exchanger", "Pressure Piping System"]) },
    { name: "Electrical equipment & power tools", items: plain(["Portable Generator", "Diesel Generator", "Welding Machine", "Angle Grinder", "Electric Drill", "Magnetic Drill", "Electric Impact Wrench", "Extension Cable Reel", "Portable Distribution Board", "Temporary Electrical Panel", "Portable Floodlight", "Cable Cutting Machine", "Cable Crimping Machine", "Electrical Insulation Tester", "Earth Leakage Protection Device"]) },
    { name: "Fire fighting & emergency equipment", items: plain(["Portable Fire Extinguisher", "Wheeled Fire Extinguisher", "Fire Hose Reel", "Fire Hydrant", "Fire Pump", "Fire Sprinkler System", "Fire Alarm Control Panel", "Emergency Lighting System", "Fire Suppression System", "Emergency Escape Equipment", "Fire Blanket", "Emergency Shower & Eyewash Station"]) },
    { name: "Welding, fabrication & workshop equipment", items: plain(["Welding Rectifier", "Gas Cutting Set", "Plasma Cutting Machine", "Pipe Cutting Machine", "Pipe Threading Machine", "Bench Grinder", "Hydraulic Press", "Lathe Machine", "Drilling Machine", "Portable Air Compressor", "Sandblasting Machine", "Hydrojetting Machine", "Hydraulic Torque Wrench", "Pipe Bending Machine", "Industrial Jack Stand"]) },
    { name: "Marine & underwater equipment", items: plain(["Marine Davit Crane", "Ship Deck Crane", "Marine Winch", "Gangway / Accommodation Ladder", "Lifeboat Davit", "Rescue Boat Launching Appliance", "Diving Air Compressor", "Diving Air Supply System", "Diving Umbilical", "Commercial Diving Helmet", "Diving Communication System", "Underwater Hydraulic Tools", "Underwater Hull Cleaning Machine", "Diving Basket / Stage", "Diving Chamber"]) },
    { name: "Industrial & construction safety systems", items: plain(["Temporary Edge Protection System", "Safety Net System", "Excavation Trench Box", "Temporary Shoring System", "Formwork Support System", "Temporary Access Bridge", "Confined Space Ventilation Blower", "Portable Gas Monitoring System", "Emergency Rescue Tripod", "Portable Lighting Tower"]) },
  ],
  extra: [
    {
      heading: "How an inspection runs",
      points: [
        { title: "Scope and records", text: "We agree the equipment list, the standard to inspect against and review previous certificates and maintenance history." },
        { title: "On-site examination", text: "Visual and functional checks, measurements and, where required, load or pressure tests carried out by qualified inspectors." },
        { title: "Tagging", text: "Each item is identified and tagged so crews can see its status at a glance." },
        { title: "Report and certificate", text: "Clear findings, defects and recommended actions, issued with a certificate for every item that passes." },
      ],
    },
  ],
  faqs: [
    { q: "How often should lifting equipment be inspected?", a: "Intervals depend on the equipment, how it is used and the rules that apply to your site. Most lifting accessories are examined at least every six months and lifting machines at least every twelve months, with more frequent checks for heavy or harsh use." },
    { q: "Do you inspect on our site?", a: "Yes. Inspections are carried out where the equipment works, so it stays in service with the least disruption." },
    { q: "What happens if an item fails?", a: "It is clearly marked as not fit for use and the report explains the defect and what is needed before it can return to service." },
  ],
};

// ---------------------------------------------------------------------------------------------
// PPE Inspection
// ---------------------------------------------------------------------------------------------

const ppeInspection: ServicePage = {
  route: "/ppe-inspection",
  division: "ppe",
  navLabel: "PPE Inspection",
  tagline: "75 types of protective equipment, checked before they are trusted with a life.",
  hero: ph("hard-hats"),
  intro: [
    "Protective equipment only works when it is in good condition, correctly sized and within its service life.",
    "We inspect fall protection, head and face protection, gloves and protective clothing, respiratory equipment, footwear, hearing and electrical protection, and marine and diving PPE. Each item is checked against the manufacturer's instructions and the relevant standard, then recorded so you have a traceable register for every worker.",
  ],
  groups: [
    { name: "Fall protection equipment", items: plain(["Full Body Safety Harness", "Work Positioning Harness", "Rescue Harness", "Safety Lanyard", "Shock Absorbing Lanyard", "Twin-Leg / Double Lanyard", "Self-Retracting Lifeline (SRL)", "Fall Arrest Block", "Vertical Lifeline", "Horizontal Lifeline", "Rope Grab / Fall Arrester", "Anchorage Connector", "Anchorage Sling", "Safety Karabiner", "Fall Protection Hook", "Descender Device", "Ascender Device", "Rescue Rope", "Rescue Tripod", "Rescue Winch"]) },
    { name: "Head, eye & face protection", items: plain(["Industrial Safety Helmet", "Electrical Insulating Helmet", "Climbing Safety Helmet", "Safety Goggles", "Safety Spectacles", "Face Shield", "Welding Helmet", "Welding Goggles", "Arc Flash Face Shield", "Chemical Splash Face Shield"]) },
    { name: "Hand, arm & body protection", items: plain(["Cut-Resistant Gloves", "Chemical-Resistant Gloves", "Electrical Insulating Gloves", "Heat-Resistant Gloves", "Welding Gloves", "Impact-Resistant Gloves", "Cryogenic Gloves", "Chemical Protective Suit", "Disposable Chemical Coverall", "Flame-Resistant Coverall", "Arc-Rated Protective Clothing", "Welding Apron", "Chemical Protective Apron", "High-Visibility Safety Vest", "Cut-Resistant Sleeves"]) },
    { name: "Respiratory protection", items: plain(["Disposable Particulate Respirator", "Half-Face Respirator", "Full-Face Respirator", "Powered Air-Purifying Respirator (PAPR)", "Supplied-Air Respirator", "Self-Contained Breathing Apparatus (SCBA)", "Emergency Escape Breathing Apparatus", "Escape Respirator", "Respirator Filter / Cartridge", "Breathing Air Hose"]) },
    { name: "Foot, hearing & electrical protection", items: plain(["Safety Shoes", "Steel-Toe Safety Boots", "Electrical Insulating Boots", "Chemical-Resistant Boots", "Metatarsal Protection Boots", "Earplugs", "Earmuffs", "Electrical Insulating Mat", "Electrical Insulating Sleeves", "Arc Flash Hood"]) },
    { name: "Marine, water & specialised PPE", items: plain(["Life Jacket", "Personal Flotation Device (PFD)", "Immersion Suit", "Marine Survival Suit", "Diving Dry Suit", "Commercial Diving Helmet", "Diving Harness", "Diving Umbilical", "Diving Bailout Cylinder", "Chemical Splash Hood"]) },
  ],
  extra: [
    {
      heading: "What we check",
      points: [
        { title: "Condition", text: "Cuts, abrasion, burns, corrosion, chemical damage, deformed metal parts and worn stitching." },
        { title: "Function", text: "Locking mechanisms, retracting lifelines, valves, seals and indicators working as designed." },
        { title: "Service life", text: "Manufacture dates, expiry limits and any history of falls or overload." },
        { title: "Traceability", text: "Serial numbers and inspection records linked to each item and its user." },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------------------------
// NDT
// ---------------------------------------------------------------------------------------------

const ndtShared: ExtraSection = {
  heading: "Why test with OAGITECH",
  points: [
    { title: "Qualified technicians", text: "Testing is performed and interpreted by personnel qualified for the method and the component." },
    { title: "Approved procedures", text: "Every inspection follows a written procedure matched to the code or specification you work to." },
    { title: "Clear reporting", text: "Findings are reported with locations, sizing and acceptance against your criteria." },
  ],
};

const ndtPages: ServicePage[] = [
  {
    route: "/ndt/ultrasonic-testing",
    division: "ndt",
    navLabel: "Ultrasonic & Advanced Ultrasonic",
    tagline: "Sound waves that see inside welds, plate and pipe.",
    hero: ph("pipework"),
    intro: [
      "Ultrasonic methods send high frequency sound into a material and read the echoes that come back from flaws, back walls and changes in thickness.",
      "From quick thickness readings to phased array and TOFD weld inspection, ultrasonic testing gives accurate sizing of internal defects and a permanent digital record without radiation or interruption to nearby work.",
    ],
    groups: [
      {
        name: "Ultrasonic methods",
        items: [
          { code: "NDT-001", name: "Ultrasonic Testing (UT)", text: "Detects and sizes internal flaws such as lack of fusion, cracks and inclusions in welds, forgings and plate." },
          { code: "NDT-002", name: "Ultrasonic Thickness Measurement (UTM)", text: "Measures remaining wall thickness on pipes, vessels, tanks and hulls to track corrosion and erosion." },
          { code: "NDT-003", name: "Phased Array Ultrasonic Testing (PAUT)", text: "Steers and focuses multiple beams to image welds in detail and record every scan for review." },
          { code: "NDT-004", name: "Time of Flight Diffraction (TOFD)", text: "Uses diffracted signals from crack tips for precise through-wall sizing of weld defects." },
          { code: "NDT-019", name: "Ultrasonic Corrosion Mapping (UCM)", text: "Builds a colour coded thickness map across an area to reveal pitting and general wall loss." },
          { code: "NDT-023", name: "Guided Wave Ultrasonic Testing (GWUT)", text: "Screens long lengths of pipe from a single position, including insulated, buried and elevated lines." },
        ],
      },
    ],
    extra: [ndtShared],
    faqs: [
      { q: "When is PAUT or TOFD used instead of conventional UT?", a: "They are chosen when welds need full coverage, accurate defect sizing or a recorded result, for example on thick wall pressure equipment or as an alternative to radiography." },
      { q: "Can ultrasonic testing be done while the plant is running?", a: "Many ultrasonic inspections, especially thickness measurement and corrosion mapping, can be carried out on equipment in service." },
    ],
  },
  {
    route: "/ndt/radiographic-testing",
    division: "ndt",
    navLabel: "Radiographic Testing",
    tagline: "A permanent image of what lies inside the weld.",
    hero: ph("pipeline"),
    intro: [
      "Radiography passes X-rays or gamma rays through a component and records the result on film or a digital detector, showing porosity, slag, cracks and incomplete fusion as clear indications.",
      "Digital and computed radiography shorten exposure times, remove chemical processing and give images that can be enhanced, measured and archived.",
    ],
    groups: [
      {
        name: "Radiographic methods",
        items: [
          { code: "NDT-005", name: "Radiographic Testing (RT)", text: "Film based radiography for welds, castings and components, accepted by most construction codes." },
          { code: "NDT-006", name: "Digital Radiography (DR)", text: "Real time digital detectors give images in seconds with lower exposure and easy sharing." },
          { code: "NDT-007", name: "Computed Radiography (CR)", text: "Reusable imaging plates scanned into digital images, well suited to pipe welds and corrosion profiling." },
        ],
      },
    ],
    extra: [
      {
        heading: "Working safely with radiation",
        body: ["Radiographic work is planned with controlled areas, barriers and monitoring so other trades can keep working nearby with confidence. Exposure times and isotope selection are matched to the material thickness to keep dose as low as possible."],
      },
      ndtShared,
    ],
  },
  {
    route: "/ndt/surface-visual-testing",
    division: "ndt",
    navLabel: "Surface & Visual Examination",
    tagline: "Finding the cracks that start at the surface.",
    hero: ph("weld-grinder"),
    intro: [
      "Most fatigue and stress cracks start at the surface. Surface methods are fast, portable and sensitive enough to find indications far smaller than the eye can see.",
      "Visual testing is the foundation of every inspection, and remote visual tools extend it into pipes, vessels and machinery that cannot be entered.",
    ],
    groups: [
      {
        name: "Surface & visual methods",
        items: [
          { code: "NDT-008", name: "Magnetic Particle Testing (MT)", text: "Reveals surface and near surface cracks in ferromagnetic steel using a magnetic field and fine particles." },
          { code: "NDT-009", name: "Liquid Penetrant Testing (PT)", text: "Draws penetrant into surface breaking flaws on any non porous material, including stainless steel and aluminium." },
          { code: "NDT-010", name: "Visual Testing (VT)", text: "Structured visual examination of welds, fit up and condition with gauges and measuring tools." },
          { code: "NDT-020", name: "Remote Visual Inspection / Borescope (RVI)", text: "Cameras and borescopes that inspect the inside of pipes, vessels, turbines and engines without dismantling." },
        ],
      },
    ],
    extra: [ndtShared],
  },
  {
    route: "/ndt/electromagnetic-testing",
    division: "ndt",
    navLabel: "Electromagnetic Methods",
    tagline: "Fast inspection through coatings and insulation.",
    hero: ph("pipes-silver"),
    intro: [
      "Electromagnetic methods detect changes in electrical and magnetic behaviour caused by cracks, wall loss and corrosion.",
      "Many of them work through paint, coatings and even insulation, so assets can be screened quickly with little or no surface preparation.",
    ],
    groups: [
      {
        name: "Electromagnetic methods",
        items: [
          { code: "NDT-011", name: "Eddy Current Testing (ET)", text: "Detects surface cracks and inspects heat exchanger and condenser tubing for wall loss and pitting." },
          { code: "NDT-016", name: "Magnetic Flux Leakage Testing (MFL)", text: "Scans storage tank floors and pipe walls for corrosion and pitting from the accessible side." },
          { code: "NDT-024", name: "Alternating Current Field Measurement (ACFM)", text: "Detects and sizes surface breaking cracks through coatings, including on offshore and subsea structures." },
          { code: "NDT-025", name: "Pulsed Eddy Current Testing (PEC)", text: "Measures average wall thickness through insulation and fireproofing without removing it." },
        ],
      },
    ],
    extra: [ndtShared],
  },
  {
    route: "/ndt/supplementary-testing",
    division: "ndt",
    navLabel: "Other NDT & Supplementary Testing",
    tagline: "Material checks, leak tests and condition monitoring.",
    hero: ph("steel-coils"),
    intro: [
      "Alongside the core NDT methods, these tests confirm materials, find leaks and watch for change in operating equipment.",
      "They are often combined with UT, RT and surface methods to give a complete picture of an asset before handover or during a shutdown.",
    ],
    groups: [
      {
        name: "Supplementary methods",
        items: [
          { code: "NDT-012", name: "Positive Material Identification (PMI)", text: "Confirms alloy grade and chemistry on site so the right material is in the right place." },
          { code: "NDT-013", name: "Hardness Testing (HT)", text: "Checks welds, heat affected zones and heat treated parts against specified hardness limits." },
          { code: "NDT-014", name: "Ferrite Content Measurement (FN)", text: "Measures ferrite in austenitic and duplex stainless steel welds to control cracking and corrosion resistance." },
          { code: "NDT-015", name: "Vacuum Box Leak Testing (VBT)", text: "Finds leaks in tank floor and roof welds using a vacuum chamber and bubble solution." },
          { code: "NDT-017", name: "Acoustic Emission Testing (AE)", text: "Listens for active defects in vessels and tanks while they are loaded or pressurised." },
          { code: "NDT-018", name: "Infrared Thermography (IRT)", text: "Maps surface temperatures to reveal hot spots, insulation loss and electrical faults." },
          { code: "NDT-021", name: "Leak Testing (LT)", text: "Locates and quantifies leaks in sealed systems, piping and components." },
          { code: "NDT-022", name: "Holiday / Coating Discontinuity Testing (HDT)", text: "Detects pinholes and gaps in protective coatings and linings before they lead to corrosion." },
        ],
      },
    ],
    extra: [ndtShared],
    note: "Some of these are supplementary material examination or condition testing services rather than separate ISO 9712 NDT methods.",
  },
];

// ---------------------------------------------------------------------------------------------
// Civil testing
// ---------------------------------------------------------------------------------------------

const civilTesting: ServicePage = {
  route: "/civil-testing",
  division: "civil",
  navLabel: "Civil Testing & Inspection",
  tagline: "Evidence about the strength and condition of concrete, piles and ground.",
  hero: ph("site-plans"),
  intro: [
    "Whether a structure is being built, extended or assessed for continued use, decisions depend on knowing the real strength and condition of its materials.",
    "We carry out in-situ concrete tests, pile integrity and load testing, soil and compaction tests, pavement testing and structural condition surveys, and report the results in a form engineers can act on.",
  ],
  groups: [
    { name: "Concrete testing", items: code("CIV", 1, ["Concrete Rebound Hammer Test", "Ultrasonic Pulse Velocity (UPV) Test", "Concrete Core Testing", "Rebar Scanning / Cover Meter Test", "Ground Penetrating Radar (GPR)", "Half-Cell Potential Test", "Concrete Carbonation Test", "Concrete Chloride Content Test", "Concrete Pull-Off Adhesion Test", "Concrete Pull-Out Test", "Concrete Crack Width Measurement", "Concrete Moisture Testing"]) },
    { name: "Pile testing", items: code("CIV", 13, ["Pile Integrity Test (PIT)", "Crosshole Sonic Logging (CSL)", "Pile Dynamic Load Test (PDA)"]) },
    { name: "Soil & ground testing", items: code("CIV", 16, ["Plate Load Test", "Field Density Test (FDT)", "Soil Compaction Test", "Soil Bearing Capacity Testing"]) },
    { name: "Structural inspection & assessment", items: code("CIV", 20, ["Structural Concrete Inspection", "Building Structural Condition Assessment", "Concrete Honeycomb & Defect Inspection", "Waterproofing Integrity Testing"]) },
    { name: "Pavement testing", items: code("CIV", 24, ["Asphalt Core Testing", "Pavement Thickness Testing"]) },
  ],
  extra: [
    {
      heading: "Where these tests help",
      points: [
        { title: "Quality control", text: "Confirming new concrete, piles and compacted layers meet the design before the next stage starts." },
        { title: "Condition surveys", text: "Assessing ageing buildings, bridges and industrial structures for repair or change of use." },
        { title: "Corrosion risk", text: "Measuring cover, carbonation, chlorides and half-cell potential to judge reinforcement corrosion." },
      ],
    },
  ],
  note: "Some civil tests involve sampling or laboratory analysis and are scoped with you before work starts.",
};

// ---------------------------------------------------------------------------------------------
// Pressure testing
// ---------------------------------------------------------------------------------------------

const pressureTesting: ServicePage = {
  route: "/pressure-testing",
  division: "pressure",
  navLabel: "Pressure Testing",
  tagline: "Proving strength and tightness before the system goes live.",
  hero: ph("pipework-grey"),
  intro: [
    "A pressure test is the final proof that a pipeline, vessel or component can safely hold its design pressure without leaking.",
    "We plan and carry out hydrostatic, pneumatic and nitrogen tests with calibrated gauges and recorders, controlled pressurisation and clear hold periods, then issue a test record your client and inspector can sign off.",
  ],
  groups: [
    {
      name: "Pipeline testing",
      items: [
        ...code("PRT", 1, ["Carbon Steel Pipeline Hydrostatic Testing", "Stainless Steel Pipeline Hydrostatic Testing", "HDPE Pipeline Hydrostatic Testing", "GRP / FRP Pipeline Hydrostatic Testing", "PVC / UPVC Pipeline Pressure Testing", "Fire Water Pipeline Hydrostatic Testing", "Potable Water Pipeline Hydrostatic Testing", "Underground Pipeline Hydrostatic Testing", "Aboveground Pipeline Hydrostatic Testing", "Process Piping Hydrostatic Testing"]),
        ...code("PRT", 24, ["Pipeline Pressure & Leak Testing", "Pipeline Strength & Tightness Testing"]),
      ],
    },
    { name: "Vessels, tanks, boilers & exchangers", items: code("PRT", 11, ["Pressure Vessel Hydrostatic Testing", "Storage Tank Hydrostatic Testing", "Boiler Hydrostatic Testing", "Heat Exchanger Hydrostatic Testing"]) },
    { name: "Valve testing", items: code("PRT", 15, ["Valve Shell Hydrostatic Testing", "Valve Seat Leakage Testing"]) },
    { name: "Pneumatic & leak testing", items: code("PRT", 17, ["Pneumatic Pressure Testing", "Pneumatic Leak Testing", "Nitrogen Leak Testing", "Air Pressure Testing"]) },
    { name: "Hoses & manifolds", items: [...code("PRT", 21, ["Hydrostatic Testing of Fire Hoses", "Hydrostatic Testing of Flexible Hoses", "Hydrostatic Testing of Hydraulic Hoses"]), { code: "PRT-026", name: "Manifold Hydrostatic Testing" }] },
  ],
  extra: [
    {
      heading: "A controlled test, start to finish",
      points: [
        { title: "Test plan", text: "Test pressure, medium, hold time and acceptance criteria agreed against the design code." },
        { title: "Calibrated instruments", text: "Gauges and chart recorders with valid calibration, so the result stands up to review." },
        { title: "Safe pressurisation", text: "Staged pressure increase with exclusion zones, especially for pneumatic tests." },
        { title: "Test record", text: "Signed records and charts ready for handover and certification." },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------------------------
// Calibration
// ---------------------------------------------------------------------------------------------

const calShared: ExtraSection = {
  heading: "How calibration works with us",
  points: [
    { title: "Traceable standards", text: "Instruments are compared against reference standards with known accuracy." },
    { title: "As found and as left", text: "Readings are recorded before and after adjustment so you can see any drift." },
    { title: "Certificate", text: "Each instrument receives a calibration certificate with results and the next due date." },
  ],
};

const calPage = (slug: string, navLabel: string, tagline: string, hero: string, intro: string[], start: number, names: string[]): ServicePage => ({
  route: `/calibration/${slug}`,
  division: "calibration",
  navLabel,
  tagline,
  hero: ph(hero),
  intro,
  groups: [{ name: "Instruments we calibrate", items: code("CAL", start, names) }],
  extra: [calShared],
});

const calibrationPages: ServicePage[] = [
  calPage("pressure-vacuum", "Pressure & Vacuum Calibration", "Accurate pressure readings for safe, stable processes.", "gauge-dark", [
    "Pressure instruments protect people and plant. A gauge that reads low can hide a dangerous condition, and one that reads high can trip a process for no reason.",
    "We calibrate gauges, transmitters, switches, recorders and calibrators across vacuum and high pressure ranges so your readings can be trusted.",
  ], 1, ["Pressure Gauge", "Digital Pressure Gauge", "Pressure Transmitter", "Differential Pressure Transmitter", "Pressure Switch", "Pressure Recorder", "Vacuum Gauge", "Pressure Calibrator", "Manometer", "Hydraulic Pressure Gauge"]),
  calPage("temperature", "Temperature Calibration", "Confidence in every temperature reading.", "thermometer", [
    "Temperature measurement controls reactions, protects equipment and proves product quality.",
    "We calibrate thermocouples, RTDs, transmitters, switches, infrared thermometers, thermal cameras and data loggers so process temperatures are measured correctly.",
  ], 11, ["Temperature Gauge", "Digital Thermometer", "Thermocouple", "RTD / PT100 Sensor", "Temperature Transmitter", "Temperature Switch", "Infrared Thermometer", "Thermal Imaging Camera", "Temperature Data Logger", "Temperature Recorder"]),
  calPage("electrical", "Electrical Calibration", "Test equipment you can rely on for safe electrical work.", "multimeter", [
    "Electricians and engineers make safety decisions based on what their meters tell them.",
    "We calibrate multimeters, clamp meters, insulation and earth testers, power and frequency meters, multifunction calibrators and oscilloscopes.",
  ], 21, ["Digital Multimeter", "Clamp Meter", "Insulation Resistance Tester", "Earth Resistance Tester", "Voltage Meter", "Current Meter", "Frequency Meter", "Power Meter", "Electrical Multifunction Calibrator", "Oscilloscope"]),
  calPage("dimensional", "Dimensional Calibration", "Measuring tools that hold their accuracy.", "measuring", [
    "Fabrication, machining and inspection all depend on dimensional tools that measure what they claim to.",
    "We calibrate calipers, micrometers, depth and height gauges, dial indicators, feeler gauges, tapes and rulers.",
  ], 31, ["Vernier Caliper", "Digital Caliper", "Outside Micrometer", "Inside Micrometer", "Depth Gauge", "Dial Indicator", "Height Gauge", "Feeler Gauge", "Measuring Tape", "Steel Ruler"]),
  calPage("mass-weight-force", "Mass, Weight & Force Calibration", "Correct loads, weights and forces every time.", "scale", [
    "From weighing product to proving the capacity of lifting equipment, mass and force measurements need to be right.",
    "We calibrate scales and balances, crane scales, load cells and indicators, force gauges, dynamometers and compression and tensile testing machines.",
  ], 41, ["Weighing Scale", "Digital Balance", "Platform Scale", "Crane Weighing Scale", "Load Cell", "Load Indicator", "Force Gauge", "Dynamometer", "Compression Testing Machine", "Tensile Testing Machine"]),
  calPage("torque-mechanical", "Torque & Mechanical Calibration", "Every bolt tightened to the value it was designed for.", "torque-wrench", [
    "Bolted joints on flanges, structures and rotating equipment rely on the right torque. An out of tolerance wrench can cause leaks or failures.",
    "We calibrate manual, digital and hydraulic torque tools, torque transducers, tachometers and vibration meters.",
  ], 51, ["Torque Wrench", "Digital Torque Wrench", "Torque Screwdriver", "Torque Multiplier", "Hydraulic Torque Wrench", "Torque Transducer", "Tachometer", "Vibration Meter", "Dial Torque Gauge", "Rotational Speed Meter"]),
  calPage("flow-level", "Flow & Level Calibration", "Accurate flow and level for custody, control and safety.", "pipeline", [
    "Flow and level instruments decide how much product is moved, sold and stored, and they protect tanks from overfilling.",
    "We calibrate electromagnetic, ultrasonic, turbine and Coriolis flow meters, rotameters, flow transmitters and switches, and level transmitters, switches and gauges.",
  ], 61, ["Electromagnetic Flow Meter", "Ultrasonic Flow Meter", "Turbine Flow Meter", "Coriolis Flow Meter", "Rotameter", "Flow Transmitter", "Flow Switch", "Level Transmitter", "Level Switch", "Level Gauge"]),
  calPage("gas-detection-environmental", "Gas Detection & Environmental Calibration", "Detectors that respond when it matters.", "gas-detector", [
    "A gas detector is often the only warning a worker gets before entering a hazardous atmosphere.",
    "We calibrate portable, multi-gas and fixed detectors, oxygen analysers, H2S, CO and combustible gas detectors, and sound, light and humidity meters.",
  ], 71, ["Portable Gas Detector", "Multi-Gas Detector", "Fixed Gas Detector", "Oxygen Analyzer", "H2S Gas Detector", "CO Gas Detector", "Combustible Gas Detector", "Sound Level Meter", "Lux Meter", "Humidity Meter"]),
  calPage("laboratory-analytical", "Laboratory & Analytical Calibration", "Lab results built on calibrated instruments.", "control-room", [
    "Water treatment, process labs and quality control rely on analytical instruments that give repeatable, correct results.",
    "We calibrate pH, conductivity, TDS, dissolved oxygen and turbidity meters, refractometers, spectrophotometers, lab thermometers, balances and moisture analysers.",
  ], 81, ["pH Meter", "Conductivity Meter", "TDS Meter", "Dissolved Oxygen Meter", "Turbidity Meter", "Refractometer", "Spectrophotometer", "Laboratory Thermometer", "Laboratory Balance", "Moisture Analyzer"]),
  calPage("ndt-specialised", "NDT & Specialised Instrument Calibration", "Inspection instruments verified before they inspect.", "steel-coils", [
    "Inspection results are only as reliable as the instruments that produce them.",
    "We calibrate ultrasonic flaw detectors and thickness gauges, coating thickness gauges, holiday detectors, hardness testers, ferrite meters, magnetic yokes, UV light meters, surface roughness testers and rebound hammers.",
  ], 91, ["Ultrasonic Flaw Detector", "Ultrasonic Thickness Gauge", "Coating Thickness Gauge", "Holiday Detector", "Hardness Tester", "Ferrite Meter", "Magnetic Particle Yoke", "UV Light Meter", "Surface Roughness Tester", "Concrete Rebound Hammer"]),
];

// ---------------------------------------------------------------------------------------------
// Underwater & marine
// ---------------------------------------------------------------------------------------------

const uwShared: ExtraSection = {
  heading: "How we work underwater",
  points: [
    { title: "Planned dives", text: "Each operation is planned around the asset, water conditions and the inspection scope." },
    { title: "Live supervision", text: "Topside teams follow the work in real time through video and communications." },
    { title: "Recorded evidence", text: "Video, photographs and readings are logged against locations on the structure." },
  ],
};

const uwPage = (slug: string, navLabel: string, tagline: string, hero: string, intro: string[], start: number, names: string[]): ServicePage => ({
  route: `/underwater-marine/${slug}`,
  division: "underwater",
  navLabel,
  tagline,
  hero: ph(hero),
  intro,
  groups: [{ name: "Services", items: code("UWI", start, names) }],
  extra: [uwShared],
});

const underwaterPages: ServicePage[] = [
  uwPage("structural-inspection", "Underwater Structural Inspection", "Seeing the condition of what sits below the waterline.", "jetty", [
    "Jetties, piers, bridges, dams and offshore platforms carry heavy loads in a harsh environment that is hidden from view.",
    "Our divers inspect submerged steel and concrete structures, welds, pipelines and tanks, recording damage, scour, marine growth and deterioration.",
  ], 1, ["Underwater Visual Inspection", "Underwater Structural Inspection", "Underwater Weld Inspection", "Underwater Pipeline Inspection", "Underwater Storage Tank Inspection", "Underwater Dam Inspection", "Underwater Bridge & Pier Inspection", "Underwater Jetty & Berth Inspection", "Underwater Offshore Platform Inspection", "Underwater Concrete Structure Inspection"]),
  uwPage("ndt-corrosion", "Underwater NDT & Corrosion Inspection", "Measured data on wall thickness, cracks and corrosion.", "hull-underwater", [
    "Visual inspection shows what a structure looks like. Underwater NDT shows how much material is left and whether cracks are present.",
    "We carry out thickness measurement, ultrasonic and magnetic particle testing, cathodic protection and anode surveys, and coating and corrosion assessments below the waterline.",
  ], 11, ["Underwater Ultrasonic Thickness Measurement", "Underwater Ultrasonic Testing", "Underwater Magnetic Particle Testing", "Underwater Cathodic Protection Inspection", "Underwater Corrosion Assessment", "Underwater Coating Inspection", "Underwater Crack Detection", "Underwater Anode Inspection", "Underwater Weld NDT", "Underwater Pipeline Wall Thickness Survey"]),
  uwPage("ship-hull-inspection", "Ship Hull & Marine Vessel Inspection", "Hull surveys without taking the vessel out of the water.", "vessel-2", [
    "In-water inspection lets owners check the hull, propeller and steering gear between dry dockings and after incidents.",
    "We inspect hulls, propellers, rudders, sea chests, thrusters and keels, measure hull thickness and assess coating, corrosion and damage.",
  ], 21, ["Ship Hull Underwater Inspection", "Ship Hull Thickness Measurement", "Ship Propeller Inspection", "Ship Rudder Inspection", "Ship Sea Chest Inspection", "Ship Thruster Inspection", "Ship Keel Inspection", "Ship Hull Coating Inspection", "Ship Hull Corrosion Inspection", "Underwater Ship Damage Assessment"]),
  uwPage("cleaning-maintenance", "Underwater Cleaning & Maintenance", "Cleaner hulls, intakes and structures that perform as designed.", "diver-work", [
    "Marine growth adds drag to vessels, blocks intakes and hides defects on structures.",
    "We clean hulls, propellers, sea chests, pipelines, tanks, intakes and jetties, remove marine growth and debris, and use high pressure water jetting where needed.",
  ], 31, ["Underwater Ship Hull Cleaning", "Underwater Propeller Cleaning", "Underwater Sea Chest Cleaning", "Underwater Marine Growth Removal", "Underwater Pipeline Cleaning", "Underwater Tank Cleaning", "Underwater Intake Structure Cleaning", "Underwater Jetty & Pier Cleaning", "Underwater High-Pressure Water Jet Cleaning", "Underwater Debris Removal"]),
  uwPage("survey-rov", "Underwater Survey & ROV Inspection", "Video, sonar and survey data from below the surface.", "wreck", [
    "Some inspections are best done by remotely operated vehicles, and some questions need survey data rather than a diver's view.",
    "We provide ROV inspection of structures, pipelines and hulls, video and photographic surveys, sonar, bathymetric, scour and seabed surveys and full asset condition surveys.",
  ], 41, ["ROV Underwater Visual Inspection", "ROV Pipeline Inspection", "ROV Ship Hull Inspection", "Underwater Video Survey", "Underwater Photographic Survey", "Underwater Sonar Inspection", "Underwater Bathymetric Survey", "Underwater Scour Inspection", "Underwater Seabed Inspection", "Underwater Asset Condition Survey"]),
  uwPage("industrial-specialised", "Underwater Industrial & Specialised Inspection", "Inspection for water, power and mooring infrastructure.", "diver-deep", [
    "Reservoirs, cooling water intakes, outfalls, pump stations and penstocks keep plants running and are difficult to take out of service.",
    "We inspect these assets along with gates, valves, mooring systems, anchor chains and subsea cables, and respond to emergency damage.",
  ], 51, ["Underwater Water Reservoir Inspection", "Underwater Cooling Water Intake Inspection", "Underwater Outfall Pipeline Inspection", "Underwater Pump Station Inspection", "Underwater Penstock Inspection", "Underwater Gate & Valve Inspection", "Underwater Mooring System Inspection", "Underwater Anchor Chain Inspection", "Underwater Cable Inspection", "Underwater Emergency Damage Inspection"]),
  uwPage("welding-cutting-repair", "Underwater Welding, Cutting & Repair", "Repairs carried out where the damage is.", "offshore-haze", [
    "When a structure or vessel is damaged below the waterline, repairing it in place saves the time and cost of removal or dry docking.",
    "We carry out wet and dry hyperbaric welding, patch plates and anode installation, arc, oxy-arc and exothermic cutting, and inspection and verification of underwater weld repairs.",
  ], 61, ["Underwater Wet Welding", "Underwater Dry / Hyperbaric Welding", "Underwater Structural Welding", "Underwater Pipeline Welding", "Underwater Ship Hull Welding", "Underwater Welding Repair", "Underwater Patch Plate Welding", "Underwater Anode Welding & Installation", "Underwater Arc Cutting", "Underwater Oxy-Arc Cutting", "Underwater Exothermic Cutting", "Underwater Structural Steel Cutting", "Underwater Pipe Cutting", "Underwater Weld Inspection & Testing", "Underwater Weld Repair Verification"]),
];

// ---------------------------------------------------------------------------------------------
// Software & IT
// ---------------------------------------------------------------------------------------------

const softwareIt: ServicePage = {
  route: "/software-it",
  division: "software",
  navLabel: "Software Development & IT",
  tagline: "Software built by a team that knows inspection, training and industrial work.",
  hero: ph("server-room"),
  intro: [
    "Paper inspection reports, spreadsheets for training records and certificates that are easy to fake all slow a business down.",
    "We build custom software, web and mobile apps, business systems and AI tools, with particular experience in inspection management, training and examination platforms and QR code certificate verification.",
  ],
  groups: [
    { name: "Software & web development", items: code("SWD", 1, ["Custom Software Development", "Web Application Development", "Mobile Application Development (Android & iOS)", "Website Design & Development"]) },
    { name: "Business systems", items: code("SWD", 5, ["ERP Software Development", "CRM Software Development", "HR & Payroll Software Development", "Project Management Software Development"]) },
    { name: "Industry & operations software", items: code("SWD", 9, ["Inspection Management Software Development", "Training Management Software Development", "Examination & Certification Software Development", "Document Management System Development", "Inventory & Asset Management Software", "Procurement Management Software", "Accounting & Finance Software"]) },
    { name: "AI, automation & integration", items: code("SWD", 16, ["AI-Based Software Development", "AI Chatbot Development & Integration", "Business Process Automation", "API Development & System Integration", "Cloud Application Development", "Database Design & Development"]) },
    { name: "Quality, design & support", items: code("SWD", 22, ["Software Testing & Quality Assurance", "UI/UX Design", "Software Maintenance & Technical Support", "Software Modernization & Migration", "E-Commerce Website Development", "Customer Portal Development", "Digital Certificate & QR Verification Systems", "Business Intelligence & Dashboard Development", "IT Consulting & Digital Transformation"]) },
  ],
  extra: [
    {
      heading: "How a project runs",
      points: [
        { title: "Discovery", text: "We map your current process, users and data before writing any code." },
        { title: "Design", text: "Screens and workflows are agreed with your team early, so the system fits how people work." },
        { title: "Build and test", text: "Delivered in stages with testing at each step." },
        { title: "Support", text: "Maintenance, updates and help after launch." },
      ],
    },
  ],
};

export const servicePages: ServicePage[] = [
  safetyInspection,
  ppeInspection,
  ...ndtPages,
  civilTesting,
  pressureTesting,
  ...calibrationPages,
  ...underwaterPages,
  softwareIt,
];

/** Hubs for divisions that have several pages (NDT, Calibration, Underwater). */
export const hubIntro: Partial<Record<DivisionKey, string[]>> = {
  ndt: [
    "Non-destructive testing lets you check the integrity of welds, castings, plate and pipe without cutting or damaging them.",
    "Our NDT services cover 25 methods in five groups, from conventional ultrasonic and radiographic testing to phased array, electromagnetic and acoustic techniques.",
  ],
  calibration: [
    "Every measurement on site, from a pressure reading to a torque setting, is only as good as the instrument behind it.",
    "We calibrate 100 instrument types across ten disciplines and issue a certificate for each one.",
  ],
  underwater: [
    "Below the waterline, structures and vessels deteriorate out of sight.",
    "Our underwater and marine services cover 75 services in seven groups, from inspection and NDT to cleaning, survey and underwater welding and repair.",
  ],
};

export const pagesInDivision = (key: DivisionKey) => servicePages.filter((p) => p.division === key);
export const itemCount = (p: ServicePage) => p.groups.reduce((n, g) => n + g.items.length, 0);
export const divisionCount = (key: DivisionKey) => pagesInDivision(key).reduce((n, p) => n + itemCount(p), 0);
