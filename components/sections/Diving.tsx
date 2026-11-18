"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { diving, photos } from "@/data/site";
import { LineReveal, Reveal } from "../Reveal";

export function Diving() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const inset = useTransform(scrollYProgress, [0, 0.35], ["6%", "0%"]);
  const radius = useTransform(scrollYProgress, [0, 0.35], [48, 30]);

  return (
    <section id="diving" ref={ref} aria-labelledby="diving-title" className="bg-paper-2 px-2.5 pb-2.5 md:px-3 md:pb-3">
      <motion.div
        className="relative overflow-hidden"
        style={reduce ? { borderRadius: 30 } : { marginInline: inset, borderRadius: radius }}
      >
        <motion.div className="absolute inset-[-14%_0]" style={reduce ? undefined : { y }}>
          <Image src={photos.diverDeep} alt="Diver descending through deep blue water" fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,18,34,0.25)_0%,rgba(4,18,34,0.55)_55%,rgba(4,18,34,0.92)_100%)]" />

        <div className="relative flex min-h-[115svh] flex-col justify-between px-6 py-12 text-white md:px-12 md:py-16 xl:px-16">
          <p className="label text-white/75">Diver and ROV teams</p>

          <div>
            <LineReveal lines={diving.title} className="display text-[clamp(3rem,9.5vw,10rem)] uppercase" />
            <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
              <Reveal className="lg:col-span-5">
                <p className="max-w-[30rem] text-[1.1rem] leading-relaxed text-white/80">{diving.text}</p>
                <Link href="/underwater-marine" className="pill mt-8 bg-white text-ink hover:bg-amber">
                  Explore underwater services
                  <span className="pill-disc bg-ink text-white">
                    <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
                  </span>
                </Link>
              </Reveal>
              <ul className="grid gap-3 sm:grid-cols-3 lg:col-span-7">
                {diving.items.map((it, i) => (
                  <li key={it.title} className="h-full">
                    <Reveal delay={0.1 + i * 0.08} className="h-full">
                      <Link href={it.href} className="glass block h-full rounded-2xl p-5 transition-colors hover:bg-white/20">
                        <h3 className="text-[1.1rem] font-medium tracking-[-0.02em]">{it.title}</h3>
                        <p className="mt-2 text-[0.9rem] leading-relaxed text-white/75">{it.text}</p>
                      </Link>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
