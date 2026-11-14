"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs as homeFaqs } from "@/data/site";
import { Reveal } from "../Reveal";

export function Faq({
  faqs = homeFaqs,
  label = "FAQ",
  title = "Frequently asked questions",
  tone = "paper",
}: {
  faqs?: { q: string; a: string }[];
  label?: string;
  title?: string;
  tone?: "paper" | "paper-2";
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section aria-labelledby="faq-title" className={tone === "paper" ? "bg-paper" : "bg-paper-2"}>
      <div className="mx-auto grid max-w-[1500px] gap-14 px-5 py-24 md:px-12 md:py-36 lg:grid-cols-12 xl:px-16">
        <div className="lg:col-span-4">
          <p className="label text-mute">{label}</p>
          <Reveal>
            <h2 id="faq-title" className="heading mt-5 text-[clamp(2.4rem,4.6vw,4.4rem)] text-ink">
              {title}
            </h2>
          </Reveal>
        </div>
        <ul className="border-t border-line lg:col-span-7 lg:col-start-6">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-[1.2rem] font-medium tracking-[-0.02em] text-ink md:text-[1.4rem]"
                  >
                    {f.q}
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-500 ${isOpen ? "rotate-45 bg-ink text-white" : "border border-line"}`}>
                      <Plus aria-hidden className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[40rem] pb-7 text-[1.02rem] leading-relaxed text-mute">{f.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
