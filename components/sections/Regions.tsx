"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, ChevronDown } from "lucide-react";
import world from "@/data/geo/world.json";
import saudi from "@/data/geo/saudi.json";
import shapes from "@/data/geo/countries.json";
import { cityLabel, operatingCountries, type CountryKey, type OperatingCountry, type RegionKey } from "@/data/regions";
import { Reveal } from "../Reveal";

const ease = [0.16, 1, 0.3, 1] as const;
const pct = (v: number, total: number) => `${(v / total) * 100}%`;
const LIFT = 12;

/** Graphite tones for the five regions; the selected one turns amber. */
const regionTone: Record<RegionKey, string> = {
  eastern: "#2a2e32",
  western: "#33373c",
  northern: "#272a2e",
  southern: "#2f3337",
  central: "#373b40",
};

export function Regions() {
  const [country, setCountry] = useState<CountryKey | null>(null);
  const current = operatingCountries.find((c) => c.key === country) ?? null;

  return (
    <section id="regions" aria-labelledby="regions-title" className="bg-paper px-2.5 py-2.5 md:px-3 md:py-3">
      <div className="relative overflow-clip rounded-[22px] bg-ink text-white md:rounded-[30px]">
        {/* Dot grid and a warm glow behind the map */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div aria-hidden className="pointer-events-none absolute -right-40 top-1/3 h-[38rem] w-[38rem] rounded-full bg-amber/10 blur-[120px]" />

        <div className="relative px-5 pb-10 pt-16 md:px-12 md:pb-14 md:pt-24 xl:px-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="label text-white/60">Where we work</p>
              <Reveal>
                <h2 id="regions-title" className="heading mt-5 text-[clamp(2.4rem,4.6vw,4.4rem)]">
                  Working across Saudi Arabia and Kazakhstan.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="max-w-[30rem] text-[1.05rem] leading-relaxed text-white/70">
                Headquartered in Yanbu, our teams serve clients across the Kingdom and in Kazakhstan. Select a country to see where we work.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 flex flex-wrap gap-2" aria-label="Choose a country">
            <CountryButton active={!country} onClick={() => setCountry(null)}>
              All countries
            </CountryButton>
            {operatingCountries.map((c) => (
              <CountryButton key={c.key} active={country === c.key} onClick={() => setCountry(c.key)}>
                {c.name}
              </CountryButton>
            ))}
          </div>

          <motion.div key={country ?? "world"} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="mt-10">
            {current ? <CountryView country={current} onBack={() => setCountry(null)} /> : <WorldMap onPick={setCountry} />}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CountryButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full px-5 py-2.5 text-[0.92rem] font-medium transition-colors duration-300 ${
        active ? "bg-amber text-ink" : "border border-white/15 bg-white/[0.04] text-white/80 hover:border-white/35 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

/* ---------------- World overview ---------------- */

type Side = "left" | "right" | "top" | "bottom";
const labelSide: Record<CountryKey, Side> = { saudi: "left", kazakhstan: "right" };
const sideClass: Record<Side, string> = {
  left: "right-[14px] top-0 -translate-y-1/2",
  right: "left-[14px] top-0 -translate-y-1/2",
  top: "bottom-[14px] left-0 -translate-x-1/2",
  bottom: "top-[14px] left-0 -translate-x-1/2",
};

function WorldMap({ onPick }: { onPick: (k: CountryKey) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<CountryKey | null>(null);
  const { width: W, height: H, hq } = world;

  const arcs = (["kazakhstan"] as const).map((k) => {
    const t = world.countries[k];
    const dist = Math.hypot(t.x - hq.x, t.y - hq.y);
    return { k, d: `M${hq.x},${hq.y} Q${(hq.x + t.x) / 2},${Math.min(hq.y, t.y) - dist * 0.45} ${t.x},${t.y}` };
  });

  return (
    <div ref={ref}>
      {/* On phones the map is cropped to the part of the world we work in */}
      <div className="relative aspect-[2/1] overflow-clip sm:aspect-auto sm:overflow-visible">
        <div className="absolute left-0 top-0 w-[263.2%] -translate-x-[42%] -translate-y-[12.8%] sm:relative sm:w-full sm:translate-x-0 sm:translate-y-0">
          <div className="relative aspect-[1000/470]">
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
              <defs>
                <linearGradient id="wm-amber" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ffc552" />
                  <stop offset="1" stopColor="#e8930f" />
                </linearGradient>
                <linearGradient id="wm-arc" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0.6" />
                </linearGradient>
                <filter id="wm-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>

              <path d={world.land} fill="#1a1d20" />
              <path d={world.borders} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={0.5} />

              {/* Highlighted countries with a soft glow */}
              {operatingCountries.map((c) => (
                <path key={`g-${c.key}`} d={world.countries[c.key].d} fill="#f2a31b" opacity={hover === c.key ? 0.55 : 0.28} filter="url(#wm-glow)" className="transition-opacity duration-300" />
              ))}
              {operatingCountries.map((c) => (
                <path
                  key={c.key}
                  d={world.countries[c.key].d}
                  fill="url(#wm-amber)"
                  stroke="#ffd98a"
                  strokeWidth={0.6}
                  opacity={hover && hover !== c.key ? 0.7 : 0.95}
                  className="cursor-pointer transition-opacity duration-300"
                  onMouseEnter={() => setHover(c.key)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => onPick(c.key)}
                />
              ))}

              {/* Routes from the Yanbu head office */}
              {arcs.map((a, i) => (
                <g key={a.k}>
                  <motion.path
                    d={a.d}
                    fill="none"
                    stroke="#0d0e0f"
                    strokeOpacity={0.55}
                    strokeWidth={4}
                    strokeLinecap="round"
                    initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
                    transition={{ duration: 1.6, delay: 0.3 + i * 0.2, ease }}
                  />
                  <motion.path
                    d={a.d}
                    fill="none"
                    stroke="url(#wm-arc)"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
                    transition={{ duration: 1.6, delay: 0.3 + i * 0.2, ease }}
                  />
                  {inView && !reduce ? (
                    <circle r={2.4} fill="#ffb935" stroke="#0d0e0f" strokeWidth={1}>
                      <animateMotion dur="3.4s" begin={`${1.6 + i * 0.4}s`} repeatCount="indefinite" path={a.d} />
                    </circle>
                  ) : null}
                  <circle cx={world.countries[a.k].x} cy={world.countries[a.k].y} r={2.6} fill="#0d0e0f" stroke="#fff" strokeWidth={1.2} />
                </g>
              ))}
              <circle cx={hq.x} cy={hq.y} r={3.4} fill="#fff" />
              {!reduce ? (
                <circle cx={hq.x} cy={hq.y} r={3} fill="none" stroke="#ffb935" strokeWidth={1.2}>
                  <animate attributeName="r" from="3" to="16" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.9" to="0" dur="2.4s" repeatCount="indefinite" />
                </circle>
              ) : null}
            </svg>

            {/* Country labels */}
            {operatingCountries.map((c) => {
              const p = world.countries[c.key];
              return (
                <div key={c.key} className="absolute h-0 w-0" style={{ left: pct(p.x, W), top: pct(p.y, H) }}>
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden
                    onClick={() => onPick(c.key)}
                    onMouseEnter={() => setHover(c.key)}
                    onMouseLeave={() => setHover(null)}
                    className={`absolute flex flex-col whitespace-nowrap rounded-lg border bg-ink/85 px-2 py-1 text-left sm:rounded-xl sm:px-3 sm:py-1.5 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md transition-colors duration-300 ${sideClass[labelSide[c.key]]} ${
                      hover === c.key ? "border-amber/70" : "border-white/10"
                    }`}
                  >
                    <span className="text-[0.72rem] font-medium leading-tight sm:text-[0.88rem]">{c.name}</span>
                    <span className="hidden text-[0.72rem] leading-tight text-white/55 sm:block">{c.note}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <p className="mt-6 text-[0.9rem] text-white/50">Click a highlighted country to see where we work.</p>
    </div>
  );
}

/* ---------------- Country close-up ---------------- */

function CountryView({ country, onBack }: { country: OperatingCountry; onBack: () => void }) {
  const [selected, setSelected] = useState<RegionKey>("western");
  const [hover, setHover] = useState<RegionKey | null>(null);
  const regions = country.regions;

  return (
    <div className="grid gap-10 xl:grid-cols-12 xl:items-center xl:gap-14">
      <div className="xl:col-span-7">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-[0.9rem] font-medium text-white/60 transition-colors hover:text-white">
          <ArrowLeft aria-hidden className="h-4 w-4" /> World map
        </button>
        <div className="mt-4">
          {country.key === "saudi" ? (
            <SaudiMap selected={selected} hover={hover} onSelect={setSelected} onHover={setHover} />
          ) : (
            <CountryShape k={country.key} />
          )}
        </div>
      </div>

      <div className="xl:col-span-5">
        <h3 className="heading text-[clamp(2rem,3.2vw,3rem)]">{country.name}</h3>
        <p className="mt-4 max-w-[32rem] text-[1.02rem] leading-relaxed text-white/70">{country.text}</p>

        {regions ? (
          <ul className="mt-8 border-t border-white/10">
            {regions.map((r) => {
              const open = r.key === selected;
              return (
                <li key={r.key} className="border-b border-white/10">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setSelected(r.key)}
                    onMouseEnter={() => setHover(r.key)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(r.key)}
                    onBlur={() => setHover(null)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <span className="flex items-center gap-3">
                      <span aria-hidden className={`h-2.5 w-2.5 rounded-full transition-colors ${open ? "bg-amber" : hover === r.key ? "bg-white/60" : "bg-white/25"}`} />
                      <span className={`text-[1.12rem] font-medium tracking-[-0.01em] transition-colors ${open ? "text-white" : "text-white/70"}`}>{r.name}</span>
                    </span>
                    <ChevronDown aria-hidden className={`h-4 w-4 text-white/50 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open ? (
                    <ul className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pb-5 pl-[1.4rem] text-[0.98rem] text-white/70">
                      {r.cities.map((c, i) => (
                        <li key={c} className="flex items-center gap-3">
                          {i > 0 ? <span aria-hidden className="h-1 w-1 rounded-full bg-white/30" /> : null}
                          {c === "Yanbu" ? <span className="text-amber-2">Yanbu (head office)</span> : c}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : (
          <Link href="/contact" className="pill mt-8 bg-amber text-ink hover:bg-amber-2">
            Discuss a project
            <span className="pill-disc bg-ink text-white">
              <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

type Tip = { key: RegionKey; x: number; y: number; w: number };

function SaudiMap({
  selected,
  hover,
  onSelect,
  onHover,
}: {
  selected: RegionKey;
  hover: RegionKey | null;
  onSelect: (k: RegionKey) => void;
  onHover: (k: RegionKey | null) => void;
}) {
  const reduce = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);
  const { width: W, height: H } = saudi;
  const regionByKey = Object.fromEntries((operatingCountries[0].regions ?? []).map((r) => [r.key, r]));
  const activeCities = new Set(regionByKey[selected]?.cities ?? []);

  // Draw the selected and hovered regions last so their raised edges sit on top.
  const rank = (k: string) => (k === selected ? 2 : k === hover ? 1 : 0);
  const order = [...saudi.regions].sort((a, b) => rank(a.key) - rank(b.key));
  const entryIndex = Object.fromEntries(saudi.regions.map((r, i) => [r.key, i]));

  const move = (key: RegionKey) => (e: MouseEvent) => {
    const rect = stage.current?.getBoundingClientRect();
    if (!rect) return;
    setTip({ key, x: e.clientX - rect.left, y: e.clientY - rect.top, w: rect.width });
    onHover(key);
  };

  return (
    <div
      ref={stage}
      className="relative mx-auto w-full max-w-[780px]"
      style={{ aspectRatio: `${W}/${H}` }}
      onMouseLeave={() => {
        setTip(null);
        onHover(null);
      }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="sa-amber" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffc552" />
            <stop offset="1" stopColor="#e8930f" />
          </linearGradient>
          <pattern id="sa-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
          </pattern>
          <filter id="sa-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        {/* Ground shadow and the side walls that give the map its depth */}
        <path d={saudi.outline} transform="translate(0,46)" fill="#000" opacity={0.65} filter="url(#sa-blur)" />
        <path d={saudi.outline} transform="translate(0,18)" fill="#060707" stroke="#060707" strokeWidth={2} />

        {order.map((r) => {
          const key = r.key as RegionKey;
          const isSel = key === selected;
          const isHover = key === hover && !isSel;
          return (
            <motion.g
              key={key}
              initial={reduce ? false : { opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 + entryIndex[key] * 0.08, ease }}
            >
              <g style={{ transform: `translateY(${isSel ? -LIFT : isHover ? -5 : 0}px)`, transition: "transform 500ms cubic-bezier(0.16,1,0.3,1)" }}>
                {isSel || isHover ? <path d={r.d} transform={`translate(0,${isSel ? LIFT + 18 : 23})`} fill="#060707" /> : null}
                <path
                  d={r.d}
                  fill={isSel ? "url(#sa-amber)" : isHover ? "#454a50" : regionTone[key]}
                  stroke="#0d0e0f"
                  strokeWidth={2.5}
                  strokeLinejoin="round"
                  className="cursor-pointer transition-[fill] duration-300"
                  onMouseMove={move(key)}
                  onClick={() => onSelect(key)}
                />
                <path d={r.d} fill="url(#sa-hatch)" pointerEvents="none" />
              </g>
            </motion.g>
          );
        })}

        {saudi.regions.map((r) =>
          r.key === selected ? null : (
            <text
              key={`t-${r.key}`}
              x={r.cx}
              y={r.cy}
              textAnchor="middle"
              pointerEvents="none"
              className="hidden fill-white/40 text-[17px] font-medium uppercase tracking-[0.22em] sm:inline"
            >
              {regionByKey[r.key]?.name.split(" ")[0]}
            </text>
          ),
        )}
      </svg>

      {/* City markers: every city as a small dot, the selected region's cities labelled */}
      {Object.entries(saudi.cities).map(([name, [x, y]]) => {
        const active = activeCities.has(name);
        const isHq = name === "Yanbu";
        const [dx, dy, anchor] = cityLabel[name] ?? [10, 0, "start"];
        const shift = anchor === "start" ? "translate(0,-50%)" : anchor === "end" ? "translate(-100%,-50%)" : "translate(-50%,-50%)";
        const leader = Math.hypot(dx, dy) > 16;
        return (
          <div
            key={name}
            className="pointer-events-none absolute h-0 w-0 transition-[top] duration-500"
            style={{ left: pct(x, W), top: pct(active ? y - LIFT : y, H) }}
          >
            {isHq ? <span className="absolute -left-3 -top-3 h-6 w-6 animate-ping rounded-full bg-amber/40 motion-reduce:hidden" /> : null}
            <span
              className={`absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                isHq ? "h-3 w-3 bg-white ring-[3px] ring-amber" : active ? "h-2.5 w-2.5 bg-ink ring-2 ring-white" : "h-1.5 w-1.5 bg-white/35"
              }`}
            />
            {active ? (
              // Labels from tablet width up; on phones the city list under the map names them.
              <span className="hidden sm:block">
                {leader ? (
                  <svg className="absolute left-0 top-0 overflow-visible" width="1" height="1" aria-hidden>
                    <line x1="0" y1="0" x2={dx} y2={dy} stroke="rgba(13,14,15,0.7)" strokeWidth="1.2" />
                  </svg>
                ) : null}
                <span
                  className="absolute whitespace-nowrap rounded-full border border-white/10 bg-ink/90 px-2.5 py-0.5 text-[0.76rem] font-medium text-white shadow-[0_6px_16px_-6px_rgba(0,0,0,0.7)]"
                  style={{ left: dx, top: dy, transform: shift }}
                >
                  {name}
                </span>
              </span>
            ) : null}
          </div>
        );
      })}

      {/* Hover card */}
      {tip ? (
        <div
          className="pointer-events-none absolute z-10 hidden w-max rounded-2xl border border-white/10 bg-ink/90 px-4 py-3 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.9)] backdrop-blur-md md:block"
          style={{ left: tip.x > tip.w - 240 ? tip.x - 16 : tip.x + 16, top: tip.y + 16, transform: tip.x > tip.w - 240 ? "translateX(-100%)" : undefined }}
        >
          <p className="text-[0.95rem] font-medium text-white">{regionByKey[tip.key]?.name}</p>
          <p className="mt-0.5 text-[0.8rem] text-white/55">{tip.key === selected ? "Main cities shown on the map" : "Click to see main cities"}</p>
        </div>
      ) : null}
    </div>
  );
}

function CountryShape({ k }: { k: Exclude<CountryKey, "saudi"> }) {
  const reduce = useReducedMotion();
  const s = shapes[k];
  return (
    <div className="relative mx-auto w-full max-w-[780px]" style={{ aspectRatio: `${s.width}/${s.height}` }}>
      <svg viewBox={`0 0 ${s.width} ${s.height}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id={`cs-amber-${k}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffc552" />
            <stop offset="1" stopColor="#e8930f" />
          </linearGradient>
          <pattern id={`cs-hatch-${k}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" stroke="rgba(13,14,15,0.08)" strokeWidth="2.5" />
          </pattern>
          <filter id={`cs-blur-${k}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>
        <path d={s.d} transform="translate(0,44)" fill="#000" opacity={0.65} filter={`url(#cs-blur-${k})`} />
        <path d={s.d} transform="translate(0,16)" fill="#3a2606" stroke="#3a2606" strokeWidth={2} />
        <motion.g initial={reduce ? false : { opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease }}>
          <path d={s.d} fill={`url(#cs-amber-${k})`} stroke="#ffd98a" strokeWidth={1.2} strokeLinejoin="round" />
          <path d={s.d} fill={`url(#cs-hatch-${k})`} />
        </motion.g>
      </svg>
    </div>
  );
}
