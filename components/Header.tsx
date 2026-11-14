"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { categories, desktopMenu, menu, type NavGroup } from "@/data/catalog";
import { company } from "@/data/company";

const ease = [0.16, 1, 0.3, 1] as const;

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full bg-white px-4 py-1.5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)] ${className}`}>
      <Image src="/brand/oagitech-logo.png" alt="OAGITECH — Oil & Gas Inspection Technology" width={500} height={150} priority className="h-8 w-auto md:h-9" />
    </span>
  );
}

function DropPanel({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  const cat = group.category ? categories[group.category] : undefined;
  const links = group.links ?? [];
  const twoCol = links.length > 6;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.35, ease }}
      className="absolute left-1/2 top-full mt-3 border border-white/10 bg-ink/[0.94] backdrop-blur-xl w-[min(56rem,calc(100vw-4rem))] -translate-x-1/2 overflow-hidden rounded-[26px] p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]"
    >
      <div className="grid grid-cols-[17rem_1fr] gap-3">
        {cat ? (
          <Link
            href={cat.hub ?? links[0]?.href ?? "/"}
            onClick={onNavigate}
            className="group relative flex min-h-[18rem] flex-col justify-end overflow-hidden rounded-[20px] p-5 text-white"
          >
            <Image src={cat.photo} alt="" fill sizes="272px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <span aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,14,15,0)_30%,rgba(13,14,15,0.9)_100%)]" />
            <span className="relative text-[1.35rem] font-medium tracking-[-0.02em]">{cat.name}</span>
            <span className="relative mt-1.5 text-[0.85rem] leading-snug text-white/75">{cat.blurb}</span>
            {cat.hub ? (
              <span className="relative mt-4 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-amber">
                View all <ArrowUpRight aria-hidden className="h-4 w-4" />
              </span>
            ) : null}
          </Link>
        ) : null}
        <ul className={`grid content-start gap-0.5 p-2 ${twoCol ? "grid-cols-2" : "grid-cols-1"}`}>
          {links.map((l) => (
            <li key={l.href + l.label}>
              <Link
                href={l.href}
                onClick={onNavigate}
                className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-[0.95rem] text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              >
                {l.label}
                <ArrowUpRight aria-hidden className="h-4 w-4 shrink-0 text-white/30 transition-all group-hover:rotate-45 group-hover:text-amber" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > window.innerHeight * 0.6));

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setActive(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openGroup = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActive(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActive(null), 160);
  };
  const closeAll = () => {
    setActive(null);
    setOpen(false);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-5 pt-5 md:px-8 md:pt-7">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
          <Link href="/" aria-label="OAGITECH home" onClick={closeAll}>
            <Logo />
          </Link>

          <nav aria-label="Main" className="relative hidden xl:block" onMouseLeave={scheduleClose}>
            <ul className={`flex items-center rounded-full p-1.5 transition-colors duration-500 ${scrolled || active ? "glass-dark" : "glass"}`}>
              {desktopMenu.map((g) => {
                const isOpen = active === g.label;
                const current = g.links?.some((l) => pathname === l.href) || (g.category && pathname === categories[g.category].hub);
                return (
                  <li key={g.label} onMouseEnter={() => openGroup(g.label)}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setActive(isOpen ? null : g.label)}
                      onFocus={() => openGroup(g.label)}
                      className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.88rem] font-medium transition-colors ${
                        isOpen || current ? "bg-white/15 text-white" : "text-white/85 hover:text-white"
                      }`}
                    >
                      {g.label}
                      <ChevronDown aria-hidden className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                  </li>
                );
              })}
            </ul>
            <AnimatePresence>
              {active ? (
                <div key={active} onMouseEnter={() => openGroup(active)} onMouseLeave={scheduleClose}>
                  <DropPanel group={desktopMenu.find((g) => g.label === active)!} onNavigate={closeAll} />
                </div>
              ) : null}
            </AnimatePresence>
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <Link href="/contact" className="pill bg-white text-ink hover:bg-amber" onClick={closeAll}>
                Enquire now
                <span className="pill-disc bg-ink text-white">
                  <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
                </span>
              </Link>
            </span>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={`grid h-12 w-12 place-items-center rounded-full text-white xl:hidden ${scrolled ? "glass-dark" : "glass"}`}
            >
              <Menu aria-hidden className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            data-lenis-prevent
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink px-5 pb-10 pt-5 text-white md:px-8"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-12 w-12 place-items-center rounded-full bg-white/10">
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-10 flex-1 divide-y divide-white/10 border-y border-white/10">
              {menu.map((g) => {
                const isExp = expanded === g.label;
                return (
                  <li key={g.label}>
                    {g.links ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={isExp}
                          onClick={() => setExpanded(isExp ? null : g.label)}
                          className="flex w-full items-center justify-between py-4 text-left text-[1.5rem] font-medium tracking-[-0.02em]"
                        >
                          {g.label}
                          <ChevronDown aria-hidden className={`h-5 w-5 transition-transform duration-300 ${isExp ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence initial={false}>
                          {isExp ? (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease }}
                              className="overflow-hidden"
                            >
                              {g.category && categories[g.category].hub ? (
                                <li>
                                  <Link href={categories[g.category].hub!} onClick={closeAll} className="block py-2.5 pl-4 text-[1.02rem] text-amber">
                                    All {g.label}
                                  </Link>
                                </li>
                              ) : null}
                              {g.links.map((l) => (
                                <li key={l.href + l.label}>
                                  <Link href={l.href} onClick={closeAll} className="block py-2.5 pl-4 text-[1.02rem] text-white/75">
                                    {l.label}
                                  </Link>
                                </li>
                              ))}
                              <li className="h-3" />
                            </motion.ul>
                          ) : null}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link href={g.href!} onClick={closeAll} className="block py-4 text-[1.5rem] font-medium tracking-[-0.02em]">
                        {g.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 grid gap-3">
              <Link href="/contact" onClick={closeAll} className="pill justify-between bg-amber text-ink">
                Enquire now
                <span className="pill-disc bg-ink text-white">
                  <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
                </span>
              </Link>
              <a href={company.phoneHref} className="text-lg text-white/80">
                {company.phone}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
