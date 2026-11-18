"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, ChevronRight, Phone } from "lucide-react";
import { company } from "@/data/company";
import { LineReveal } from "../Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export type Crumb = { label: string; href?: string };

/** Inner-page hero: the homepage's framed cinematic photo, scaled down for detail pages. */
export function PageHero({
  title,
  tagline,
  image,
  crumbs,
  cta = { label: "Request a quote", href: "/contact" },
}: {
  title: string;
  tagline?: string;
  image: string;
  crumbs: Crumb[];
  cta?: { label: string; href: string };
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  // Long titles get a smaller size so they never break mid-word
  const size =
    title.length > 34 ? "text-[clamp(2.6rem,5.2vw,6rem)]" : title.length > 22 ? "text-[clamp(2.9rem,6.2vw,7.2rem)]" : "text-[clamp(3.2rem,7.6vw,8.6rem)]";

  return (
    <section ref={ref} aria-labelledby="page-title" className="bg-ink p-2.5 md:p-3">
      <div className="relative h-[min(86svh,880px)] min-h-[600px] overflow-hidden rounded-[22px] md:rounded-[30px]">
        <motion.div className="absolute inset-0" style={reduce ? undefined : { y }}>
          <motion.div className="absolute inset-0" initial={reduce ? false : { scale: 1.15 }} animate={{ scale: 1.03 }} transition={{ duration: 2.4, ease }}>
            <Image src={image} alt="" fill priority sizes="(min-width:768px) 100vw, 200vw" quality={85} className="object-cover" />
          </motion.div>
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,14,15,0.55)_0%,rgba(13,14,15,0.1)_30%,rgba(13,14,15,0.25)_55%,rgba(13,14,15,0.9)_100%)]" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,14,15,0.5)_0%,rgba(13,14,15,0)_65%)]" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_88%_88%,rgba(13,14,15,0.7)_0%,rgba(13,14,15,0)_100%)]" />

        <div className="absolute inset-x-0 bottom-0 px-6 pb-8 md:px-12 md:pb-12 xl:px-16 xl:pb-14">
          <motion.nav
            aria-label="Breadcrumb"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.4 }}
          >
            <ol className="mb-6 flex flex-wrap items-center gap-1.5 text-[0.9rem] text-white/70">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  {i > 0 ? <ChevronRight aria-hidden className="h-3.5 w-3.5 text-white/40" /> : null}
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>

          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {/* Zero-width spaces after slashes let titles like "Civil/Structural/Geo" wrap on phones */}
              <LineReveal as="h1" immediate delay={0.2} lines={[title.replace(/\//g, "/​")]} className={`display ${size} text-paper`} />
            </div>
            <motion.div
              className="lg:col-span-4 lg:pb-2"
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease, delay: 0.75 }}
            >
              {tagline ? <p className="max-w-[26rem] text-[1.05rem] leading-relaxed text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.65)]">{tagline}</p> : null}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href={cta.href} className="pill bg-amber text-ink hover:bg-amber-2">
                  {cta.label}
                  <span className="pill-disc bg-ink text-white">
                    <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
                  </span>
                </Link>
                <a href={company.phoneHref} className="pill glass text-white">
                  Call us
                  <span className="pill-disc bg-white text-ink">
                    <Phone aria-hidden className="h-4 w-4" strokeWidth={2} />
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
