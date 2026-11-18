"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { trainingCards, training } from "@/data/site";

/**
 * Pinned horizontal gallery: the section sticks while vertical scroll drives the cards sideways.
 * Below lg it becomes a native swipeable row.
 */
export function Divisions() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      const t = track.current;
      if (!t) return;
      // Pinned scrolling only on large screens; below that the row is a native swipe.
      setDistance(window.innerWidth >= 1024 ? Math.max(0, t.scrollWidth - window.innerWidth) : 0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.04, 0.96], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0.04, 0.96], ["0%", "100%"]);

  return (
    <section id="training-categories" ref={wrap} aria-labelledby="divisions-title" className="relative bg-paper lg:h-[400vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden">
        <div className="mx-auto w-full max-w-[1500px] px-5 pt-24 md:px-12 lg:pt-16 xl:px-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label text-mute">Training categories</p>
              <h2 id="divisions-title" className="heading mt-5 max-w-[16ch] text-[clamp(2.4rem,4.6vw,4.4rem)] text-ink">
                {`Eight categories. ${training.courseCount} courses.`}
              </h2>
            </div>
            <div className="hidden w-60 lg:block">
              <div className="h-px w-full bg-line">
                <motion.div className="h-px bg-ink" style={{ width: progress }} />
              </div>
              <p className="label mt-3 text-mute">Scroll to explore</p>
            </div>
          </div>
        </div>

        <motion.div
          ref={track}
          style={{ x }}
          className="no-scrollbar mt-12 flex gap-5 overflow-x-auto px-5 pb-24 md:px-12 lg:mt-10 lg:overflow-visible lg:pb-0 xl:px-16"
        >
          {trainingCards.map((d) => (
            <Link key={d.name} href={d.href} className="group relative flex h-[34rem] w-[19rem] shrink-0 flex-col justify-between overflow-hidden rounded-[26px] bg-ink text-paper md:w-[24rem] lg:h-[min(34rem,58vh)] lg:w-[27rem]">
              <Image src={d.image} alt="" fill sizes="(min-width:1024px) 58vw, 160vw" className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
              {/* Shade only where text sits: the top for the title, the bottom for the course chips */}
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,14,15,0.78)_0%,rgba(13,14,15,0.35)_32%,rgba(13,14,15,0)_50%,rgba(13,14,15,0)_58%,rgba(13,14,15,0.7)_100%)]" />

              {/* Title block pinned to the top so every card's heading sits on the same line */}
              <div className="relative p-6 md:p-7">
                <h3 className="heading text-[2rem] leading-[1.05] [text-shadow:0_2px_18px_rgba(0,0,0,0.45)] md:text-[2.2rem]">{d.name}</h3>
                <p className="mt-3 max-w-[22rem] text-[0.95rem] leading-relaxed text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">{d.text}</p>
              </div>

              <ul className="relative flex flex-wrap gap-1.5 p-6 md:p-7">
                {d.items.slice(0, 4).map((it) => (
                  <li key={it} className="rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[0.8rem] font-medium text-white backdrop-blur-md">
                    {it}
                  </li>
                ))}
                {d.items.length > 4 ? (
                  <li className="rounded-full bg-amber px-3 py-1.5 text-[0.8rem] font-medium text-ink">+{d.items.length - 4} more</li>
                ) : null}
              </ul>
            </Link>
          ))}
          <div aria-hidden className="w-1 shrink-0 lg:w-[8vw]" />
        </motion.div>
      </div>
    </section>
  );
}
