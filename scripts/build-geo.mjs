// Generates the SVG path data used by the "Where we work" map (components/sections/Regions).
// Run with: node scripts/build-geo.mjs
// Sources: world-atlas (Natural Earth, public domain) and Natural Earth admin-1 provinces
// for Saudi Arabia (scripts/sau-provinces.geojson, public domain).
import { readFileSync, writeFileSync } from "node:fs";
import { geoMercator, geoNaturalEarth1, geoPath, geoCentroid } from "d3-geo";
import { feature, merge, mesh } from "topojson-client";
import { topology } from "topojson-server";
import { presimplify, simplify, quantile } from "topojson-simplify";

const read = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url), "utf8"));
const out = (name, data) => writeFileSync(new URL(`../data/geo/${name}.json`, import.meta.url), JSON.stringify(data));

const ISO = { saudi: "682", kazakhstan: "398" };
const ANTARCTICA = "010";

// ---------- World overview ----------
const w110 = read("../node_modules/world-atlas/countries-110m.json");
const w50 = read("../node_modules/world-atlas/countries-50m.json");
const W = 1000;
const H = 470;

const world110 = feature(w110, w110.objects.countries);
const withoutAntarctica = { type: "FeatureCollection", features: world110.features.filter((f) => f.id !== ANTARCTICA) };
// Centred on 12°E so the seam falls in the Bering Strait.
const worldProj = geoNaturalEarth1().rotate([-12, 0]).fitExtent([[8, 8], [W - 8, H - 8]], withoutAntarctica);
const worldPath = geoPath(worldProj).digits(1);

const landGeoms = w110.objects.countries.geometries.filter((g) => g.id !== ANTARCTICA);
const land = worldPath(merge(w110, landGeoms));
const borders = worldPath(mesh(w110, { type: "GeometryCollection", geometries: landGeoms }, (a, b) => a !== b));

const pick = (fc, id) => fc.find((x) => x.id === id);
const countries110 = world110.features;

// Detail shapes: 50m outlines, simplified while keeping their shape.
const countries50 = feature(w50, w50.objects.countries).features;
const detail = (id) => {
  let t = topology({ c: { type: "FeatureCollection", features: [pick(countries50, id)] } }, 1e5);
  t = presimplify(t);
  t = simplify(t, quantile(t, 0.5));
  return feature(t, t.objects.c).features[0];
};

const YANBU = [38.06, 24.09];
const worldCountries = Object.fromEntries(
  Object.entries(ISO).map(([key, id]) => {
    const f = pick(countries110, id);
    const anchor = key === "saudi" ? YANBU : geoCentroid(f);
    const [x, y] = worldProj(anchor);
    return [key, { d: worldPath(f), x: +x.toFixed(1), y: +y.toFixed(1) }];
  }),
);
const [hx, hy] = worldProj(YANBU);
out("world", { width: W, height: H, land, borders, countries: worldCountries, hq: { x: +hx.toFixed(1), y: +hy.toFixed(1) } });

// ---------- Saudi Arabia: 13 provinces grouped into the five operating regions ----------
const provinces = read("./sau-provinces.geojson");
const REGION_OF = {
  "Ash Sharqiyah": "eastern",
  Makkah: "western",
  "Al Madinah": "western",
  Tabuk: "western",
  "Al Hudud ash Shamaliyah": "northern",
  "Al Jawf": "northern",
  "Ha'il": "northern",
  "`Asir": "southern",
  Jizan: "southern",
  Najran: "southern",
  "Al Bahah": "southern",
  "Ar Riyad": "central",
  "Al Quassim": "central",
};
for (const f of provinces.features) {
  if (!REGION_OF[f.properties.name]) throw new Error(`Unmapped province ${f.properties.name}`);
}
let topo = topology({ provinces }, 1e5);
topo = presimplify(topo);
topo = simplify(topo, quantile(topo, 0.35));

const SW = 1000;
const SH = 820;
const saFc = feature(topo, topo.objects.provinces);
const saProj = geoMercator().fitExtent([[30, 30], [SW - 30, SH - 30]], saFc);
const saPath = geoPath(saProj).digits(1);

const regionKeys = ["eastern", "western", "northern", "southern", "central"];
const saRegions = regionKeys.map((key) => {
  const geoms = topo.objects.provinces.geometries.filter((g) => REGION_OF[g.properties.name] === key);
  const shape = merge(topo, geoms);
  const [cx, cy] = saProj(geoCentroid(shape));
  return { key, d: saPath(shape), cx: +cx.toFixed(1), cy: +cy.toFixed(1) };
});
const outline = saPath(merge(topo, topo.objects.provinces.geometries));

// Main cities (approximate city-centre coordinates).
const CITIES = {
  Dammam: [50.1, 26.43], Khobar: [50.21, 26.28], Dhahran: [50.11, 26.29], Jubail: [49.66, 27.01], "Al Ahsa": [49.59, 25.38], Qatif: [50.01, 26.56],
  Jeddah: [39.19, 21.49], Makkah: [39.86, 21.39], Madinah: [39.61, 24.47], Yanbu: [38.06, 24.09], Taif: [40.42, 21.27], Tabuk: [36.57, 28.38],
  Turaif: [38.66, 31.67], Arar: [41.04, 30.98], Rafha: [43.5, 29.63], Sakaka: [40.21, 29.97], Qurayyat: [37.34, 31.33], Hail: [41.69, 27.52],
  Abha: [42.51, 18.22], "Khamis Mushait": [42.73, 18.31], Jazan: [42.55, 16.89], Najran: [44.13, 17.49], "Al Bahah": [41.47, 20.01],
  Riyadh: [46.68, 24.71], Buraydah: [43.97, 26.33], Unaizah: [43.99, 26.08], "Al Kharj": [47.31, 24.15], "Al Majma'ah": [45.35, 25.9],
};
const cities = Object.fromEntries(Object.entries(CITIES).map(([n, c]) => {
  const [x, y] = saProj(c);
  return [n, [+x.toFixed(1), +y.toFixed(1)]];
}));
out("saudi", { width: SW, height: SH, outline, regions: saRegions, cities });

// ---------- Other countries (single shape until their regions are added) ----------
const single = (key, proj, w, h) => {
  const f = detail(ISO[key]);
  proj.fitExtent([[30, 30], [w - 30, h - 30]], f);
  return { width: w, height: h, d: geoPath(proj).digits(1)(f) };
};
out("countries", {
  kazakhstan: single("kazakhstan", geoMercator(), 1000, 600),
});

const size = (n) => (readFileSync(new URL(`../data/geo/${n}.json`, import.meta.url)).length / 1024).toFixed(0) + "KB";
console.log("world", size("world"), "saudi", size("saudi"), "countries", size("countries"));
