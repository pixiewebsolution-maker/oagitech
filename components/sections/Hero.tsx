"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { company } from "@/data/company";
import { hero, photos } from "@/data/site";
import { LineReveal } from "../Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} aria-labelledby="hero-title" className="bg-ink p-2.5 md:p-3">
      <div className="relative h-[calc(100svh-1.25rem)] min-h-[640px] overflow-hidden rounded-[22px] md:h-[calc(100svh-1.5rem)] md:rounded-[30px]">
        <motion.div className="absolute inset-0" style={reduce ? undefined : { y }}>
          <motion.div
            className="absolute inset-0"
            initial={reduce ? false : { scale: 1.18 }}
            animate={{ scale: 1.04 }}
            transition={{ duration: 2.6, ease }}
          >
            <Image src={photos.heroRefinery} alt="Refinery towers and storage tanks at dusk" fill priority sizes="(min-width:768px) 100vw, 200vw" quality={85} className="object-cover object-[60%_50%]" />
          </motion.div>
        </motion.div>

        {/* Legibility: warm haze at the top, deep shadow where the type sits */}
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,14,15,0.45)_0%,rgba(13,14,15,0)_28%,rgba(13,14,15,0.15)_55%,rgba(13,14,15,0.88)_100%)]" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,14,15,0.55)_0%,rgba(13,14,15,0)_60%)]" />
        {/* Extra shade behind the intro text on the right */}
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_88%_88%,rgba(13,14,15,0.8)_0%,rgba(13,14,15,0)_100%)]" />

        <motion.div style={reduce ? undefined : { opacity: fade }} className="absolute inset-x-0 bottom-0 px-6 pb-8 md:px-12 md:pb-12 xl:px-16 xl:pb-14">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <LineReveal
                as="h1"
                immediate
                delay={0.25}
                lines={hero.title}
                className="display text-[clamp(3.4rem,6.9vw,9rem)] text-paper"
              />
            </div>

            <motion.div
              className="lg:col-span-3 lg:pb-3"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease, delay: 0.9 }}
            >
              <p className="max-w-[26rem] text-[1.05rem] leading-relaxed text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.65)]">{hero.intro}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#contact" className="pill bg-amber text-ink hover:bg-amber-2">
                  Contact now
                  <span className="pill-disc bg-ink text-white">
                    <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
                  </span>
                </a>
                <a href={company.brochure} target="_blank" rel="noopener noreferrer" className="pill glass text-white hover:bg-white/25">
                  Download brochure
                  <span className="pill-disc bg-white text-ink">
                    <ArrowDown aria-hidden className="h-4 w-4" strokeWidth={2} />
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
