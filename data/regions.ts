// Countries and regions OAGITECH operates in (homepage "Where we work" map).
// Saudi regions and cities come from the training master list (data/training.ts).
// To add regions for another country later: add its province shapes to scripts/build-geo.mjs
// and list them here the same way as Saudi Arabia.
import { regions as saudiRegionList } from "./training";

export type CountryKey = "saudi" | "kazakhstan";
export type RegionKey = "eastern" | "western" | "northern" | "southern" | "central";

export type OperatingRegion = { key: RegionKey; name: string; cities: string[] };

export type OperatingCountry = {
  key: CountryKey;
  name: string;
  /** Short line under the name on the world map. */
  note: string;
  text: string;
  regions?: OperatingRegion[];
};

const regionKey = (name: string) => name.split(" ")[0].toLowerCase() as RegionKey;

export const saudiRegions: OperatingRegion[] = saudiRegionList.map((r) => ({ key: regionKey(r.name), name: r.name, cities: r.cities }));

export const operatingCountries: OperatingCountry[] = [
  {
    key: "saudi",
    name: "Saudi Arabia",
    note: "Head office, Yanbu",
    text: "From our head office in Yanbu, inspection, testing, calibration, diving and training teams mobilise to sites in all five regions of the Kingdom.",
    regions: saudiRegions,
  },
  {
    key: "kazakhstan",
    name: "Kazakhstan",
    note: "Operations",
    text: "OAGITECH supports clients and projects in Kazakhstan. Tell us where your site is and what you need, and we will plan the people and equipment for the job.",
  },
];

/**
 * Where each city label sits relative to its dot, in pixels: [dx, dy, anchor].
 * Cities that sit close together get pushed apart, with a short leader line.
 */
export const cityLabel: Record<string, [number, number, "start" | "end" | "middle"]> = {
  Jubail: [-10, -14, "end"],
  Qatif: [24, -28, "start"],
  Dammam: [36, -4, "start"],
  Khobar: [30, 20, "start"],
  Dhahran: [-14, 16, "end"],
  "Al Ahsa": [0, 18, "middle"],
  Jeddah: [-10, 6, "end"],
  Makkah: [4, -30, "middle"],
  Taif: [10, 10, "start"],
  Madinah: [10, -4, "start"],
  Yanbu: [-12, 4, "end"],
  Tabuk: [10, 4, "start"],
  Abha: [-10, 6, "end"],
  "Khamis Mushait": [8, -14, "start"],
  Jazan: [-10, 4, "end"],
  Najran: [10, 4, "start"],
  "Al Bahah": [-10, -2, "end"],
  Buraydah: [-10, -8, "end"],
  Unaizah: [-10, 10, "end"],
  "Al Majma'ah": [10, -8, "start"],
  Riyadh: [10, -2, "start"],
  "Al Kharj": [10, 8, "start"],
  Turaif: [10, -6, "start"],
  Qurayyat: [-10, 4, "end"],
  Arar: [10, -4, "start"],
  Sakaka: [-10, 8, "end"],
  Rafha: [10, 4, "start"],
  Hail: [10, 4, "start"],
};
