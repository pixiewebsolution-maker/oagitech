"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { clients } from "@/data/company";
import { about, courses, divisions, photos } from "@/data/site";
import { Reveal } from "../Reveal";

const totalServices = divisions.reduce((n, d) => n + d.items.length, 0);

const stats = [
  { value: String(divisions.length), label: "Service divisions" },
  { value: `${totalServices}+`, label: "Specialised services" },
  { value: String(courses.length), label: "Training programmes" },
  { value: String(about.sectors.length), label: "Industries served" },
];

// Inline photo "pills" dropped between words of the statement
const pills: Record<number, { src: string; alt: string }> = {
  4: { src: photos.welderBlue, alt: "Welder at work" },
  15: { src: photos.offshoreHaze, alt: "Offshore platform" },
};

function Word({ word, index, total, progress }: { word: string; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total;
  const opacity = useTransform(progress, [start * 0.85, start * 0.85 + 0.12], [0.16, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

export function ClientStrip() {
  const row = [...clients, ...clients, ...clients];
  return (
    <section aria-label="Clients" className="border-b border-line bg-paper">
      <div className="mx-auto flex max-w-[1500px] items-center gap-8 px-5 py-7 md:px-12 xl:px-16">
        <p className="label shrink-0 text-mute">Trusted by</p>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee items-center gap-16 bg-paper" style={{ ["--marquee-dur" as string]: "32s" }}>
            {[...row, ...row].map((c, i) => (
              <Image key={i} src={c.src} alt={i < row.length ? c.name : ""} aria-hidden={i >= row.length} width={400} height={100} className="h-10 w-auto shrink-0 mix-blend-multiply grayscale transition hover:grayscale-0" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = about.statement.split(" ");

  return (
    <section id="about" aria-labelledby="about-title" className="bg-paper">
      <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-12 md:py-36 xl:px-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="about-title" className="label pt-3 text-mute lg:col-span-3">
            About OAGITECH
          </h2>
          <p ref={ref} className="heading text-[clamp(1.9rem,3.6vw,3.5rem)] text-ink lg:col-span-9">
            {words.map((w, i) => (
              <span key={i}>
                <Word word={w} index={i} total={words.length} progress={scrollYProgress} />
                {pills[i] ? (
                  <span className="relative mx-1 inline-block h-[0.82em] w-[1.9em] translate-y-[0.08em] overflow-hidden rounded-full align-baseline">
                    <Image src={pills[i].src} alt={pills[i].alt} fill sizes="120px" className="object-cover" />
                  </span>
                ) : null}
              </span>
            ))}
          </p>
        </div>

        <div className="mt-20 grid gap-12 md:mt-28 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[26px]">
              <Image src={photos.engineerPointing} alt="Site engineer directing work on an industrial project" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 p-5 backdrop-blur md:inset-x-6 md:bottom-6">
                <p className="label text-mute">Who we are</p>
                <p className="mt-2 text-[1.02rem] font-medium leading-snug text-ink">
                  A trusted provider of testing, inspection, engineering consultancy and training & certification.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col justify-between gap-12 lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <p className="text-[1.15rem] leading-relaxed text-mute">{about.body}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {about.sectors.map((s) => (
                  <li key={s} className="rounded-full border border-line px-4 py-2 text-[0.92rem] font-medium text-ink">
                    {s}
                  </li>
                ))}
              </ul>
              <a href="#divisions" className="pill mt-10 bg-ink text-white hover:bg-ink-3">
                Explore our divisions
                <span className="pill-disc bg-amber text-ink">
                  <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="grid grid-cols-2 gap-y-8 border-t border-line pt-8 md:grid-cols-4">
                {stats.map((s, i) => (
                  <div key={s.label} className={`flex flex-col-reverse justify-end gap-3 ${i > 0 ? "md:border-l md:border-line md:pl-6" : ""} ${i % 2 === 1 ? "border-l border-line pl-6 md:pl-6" : ""}`}>
                    <dt className="label text-mute">{s.label}</dt>
                    <dd className="display text-[3.6rem] leading-none text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
