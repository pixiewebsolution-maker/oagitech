import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { menu } from "@/data/catalog";
import { company } from "@/data/company";
import { certifications, photos } from "@/data/site";
import { Reveal } from "./Reveal";

const footerGroups = menu
  .filter((g) => g.links)
  .map((g) => ({ label: g.label, hub: g.feature?.href, links: g.links! }))
  .concat([{ label: "More", hub: undefined, links: [{ label: "Home", href: "/" }, { label: "Software & IT", href: "/software-it" }, { label: "Course Registration", href: "/training/register" }] }]);

export function Footer() {
  return (
    <footer id="contact" className="bg-ink p-2.5 text-paper md:p-3">
      {/* Call to action panel */}
      <div className="relative overflow-hidden rounded-[22px] md:rounded-[30px]">
        <Image src={photos.offshoreHaze} alt="" fill sizes="100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,14,15,0.88)_0%,rgba(13,14,15,0.55)_55%,rgba(13,14,15,0.25)_100%)]" />
        <div className="relative grid gap-12 px-6 py-20 md:px-12 md:py-28 lg:grid-cols-12 xl:px-16">
          <div className="lg:col-span-7">
            <p className="label text-white/70">Get in touch</p>
            <Reveal>
              <h2 className="display mt-6 text-[clamp(3.4rem,8vw,8rem)] uppercase">
                Let’s talk about
                <br />
                your next job.
              </h2>
            </Reveal>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="pill bg-amber text-ink hover:bg-amber-2">
                Request a quote
                <span className="pill-disc bg-ink text-white">
                  <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
                </span>
              </Link>
              <a href={company.whatsappHref} target="_blank" rel="noopener noreferrer" className="pill glass text-white hover:bg-white/25">
                WhatsApp us
                <span className="pill-disc bg-white text-ink">
                  <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
                </span>
              </a>
            </div>
          </div>

          <ul className="grid content-end gap-3 lg:col-span-4 lg:col-start-9">
            <li>
              <a href={company.phoneHref} className="glass flex items-center gap-4 rounded-2xl p-5 transition-colors hover:bg-white/20">
                <Phone aria-hidden className="h-5 w-5 text-amber" strokeWidth={1.8} />
                <span>
                  <span className="label block text-white/60">Call</span>
                  <span className="text-[1.1rem] font-medium">{company.phone}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="glass flex items-center gap-4 rounded-2xl p-5 transition-colors hover:bg-white/20">
                <Mail aria-hidden className="h-5 w-5 text-amber" strokeWidth={1.8} />
                <span>
                  <span className="label block text-white/60">Email</span>
                  <span className="text-[1.1rem] font-medium">{company.email}</span>
                </span>
              </a>
            </li>
            <li className="glass flex items-center gap-4 rounded-2xl p-5">
              <MapPin aria-hidden className="h-5 w-5 shrink-0 text-amber" strokeWidth={1.8} />
              <span>
                <span className="label block text-white/60">Visit</span>
                <span className="text-[1rem] font-medium leading-snug">{company.address}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Link columns: every page from the menu */}
      <div className="mx-auto max-w-[1500px] px-3 pb-10 pt-20 md:px-9 xl:px-13">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <span className="inline-flex rounded-full bg-white px-4 py-1.5">
              <Image src="/brand/oagitech-logo.png" alt="OAGITECH" width={500} height={150} className="h-9 w-auto" />
            </span>
            <p className="mt-6 max-w-[20rem] text-[0.98rem] leading-relaxed text-fog">
              Inspection, testing, calibration, underwater services and HSE training from Yanbu, Kingdom of Saudi Arabia.
            </p>
            <a href={company.brochure} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-[0.95rem] font-medium text-paper underline underline-offset-4">
              Download company profile <ArrowUpRight aria-hidden className="h-4 w-4" />
            </a>
            <p className="label mt-10 text-fog">
              <Link href="/about/certifications-and-awards" className="hover:text-paper">
                Certifications & accreditations
              </Link>
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-[0.88rem] text-white/70">
              {certifications.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:col-span-9 xl:grid-cols-4">
            {footerGroups.map((g) => (
              <nav key={g.label} aria-label={g.label}>
                <p className="label text-fog">{g.hub ? <Link href={g.hub} className="hover:text-paper">{g.label}</Link> : g.label}</p>
                <ul className="mt-4 grid gap-2 text-[0.92rem]">
                  {g.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} className="text-white/75 transition-colors hover:text-amber">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-3 md:px-9 xl:px-13">
        <p aria-hidden className="display select-none text-center text-[25vw] leading-[0.8] text-ink-3 xl:text-[25rem]">
          OAGITECH
        </p>
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-[0.85rem] text-fog md:flex-row md:justify-between">
          <p>© 2026 OAGITECH, Oil & Gas Inspection Technology. All rights reserved.</p>
          <p>Yanbu · Kingdom of Saudi Arabia</p>
        </div>
      </div>
    </footer>
  );
}
