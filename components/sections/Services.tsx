"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/site";
import { Reveal } from "../Reveal";

export function Services() {
  const [active, setActive] = useState<number | null>(null);
  const area = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  return (
    <section id="services" aria-labelledby="services-title" className="bg-ink text-paper">
      <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-12 md:py-36 xl:px-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <p className="label text-fog lg:col-span-3">What we offer</p>
          <Reveal className="lg:col-span-6">
            <h2 id="services-title" className="heading text-[clamp(2.4rem,4.6vw,4.4rem)]">
              Eight service divisions. One team on site.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3">
            <p className="text-[1rem] leading-relaxed text-fog">From lifting gear inspection to underwater repair, every service comes with the records that prove it.</p>
          </Reveal>
        </div>

        <div
          ref={area}
          className="relative mt-16 md:mt-24"
          onMouseMove={(e) => {
            const r = area.current?.getBoundingClientRect();
            if (!r) return;
            x.set(e.clientX - r.left);
            y.set(e.clientY - r.top);
          }}
          onMouseLeave={() => setActive(null)}
        >
          {/* Cursor-following preview (pointer devices) */}
          <motion.div aria-hidden className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block" style={{ x: sx, y: sy }}>
            <AnimatePresence>
              {active !== null ? (
                <motion.div
                  key={active}
                  className="relative -ml-[9rem] -mt-[11rem] h-[14rem] w-[18rem] overflow-hidden rounded-2xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]"
                  initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image src={services[active].image} alt="" fill sizes="288px" className="object-cover" />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>

          <ul className="border-t border-white/12">
            {services.map((s, i) => (
              <li key={s.title} className="border-b border-white/12">
                <Link
                  href={s.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className="group grid grid-cols-[1fr_auto] items-center gap-4 py-7 md:grid-cols-[1.2fr_1fr_auto] md:gap-8 md:py-9"
                >
                  <span className="heading text-[clamp(1.7rem,3.6vw,3.4rem)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                    {s.title}
                  </span>
                  <span className="col-span-2 col-start-1 row-start-2 max-w-[28rem] text-[0.98rem] leading-relaxed text-fog md:col-span-1 md:col-start-2 md:row-start-1">
                    {s.text}
                  </span>
                  <span className="col-start-2 row-start-1 grid h-12 w-12 place-items-center rounded-full border border-white/20 transition-all duration-500 group-hover:border-amber group-hover:bg-amber group-hover:text-ink md:col-start-3 md:h-14 md:w-14">
                    <ArrowUpRight aria-hidden className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.8} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
