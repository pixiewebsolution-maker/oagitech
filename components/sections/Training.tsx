import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { photos, training } from "@/data/site";
import { trainingCategories, trainingMethods } from "@/data/training";
import { Reveal } from "../Reveal";

export function Training() {
  return (
    <section id="training" aria-labelledby="training-title" className="bg-ink text-paper">
      <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-12 md:py-36 xl:px-16">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label text-fog">Training & certification</p>
            <Reveal>
              <h2 id="training-title" className="heading mt-5 text-[clamp(2.4rem,4.6vw,4.4rem)]">
                Register your team in minutes.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[28rem] text-[1.05rem] leading-relaxed text-fog">
                Pick a category, choose the course and the format that suits your crew. We confirm dates, location and the quotation.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Delivery methods">
                {trainingMethods.map((m) => (
                  <li key={m} className="rounded-full border border-white/15 px-4 py-2 text-[0.92rem] font-medium">
                    {m}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[26px]">
                <Image src={photos.crewHiVis} alt="Site crew in hard hats and hi-vis vests at a briefing" fill sizes="(min-width:1024px) 38vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-fog">
              Site orientations available for {training.sites.join(", ")}.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="border-t border-white/12">
              {trainingCategories.map((c) => (
                <li key={c.slug} className="border-b border-white/12">
                  <Link href={c.route} className="group flex items-center gap-5 py-5">
                    <span className="w-8 shrink-0 text-[0.95rem] font-medium text-fog transition-colors group-hover:text-amber">{c.letter}</span>
                    <span className="flex-1">
                      <span className="block text-[1.15rem] font-medium tracking-[-0.015em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:text-[1.3rem]">
                        {c.name}
                      </span>
                      <span className="mt-0.5 block text-[0.9rem] text-fog">{c.courses.length} courses</span>
                    </span>
                    <ArrowUpRight aria-hidden className="h-5 w-5 text-fog transition-all duration-500 group-hover:rotate-45 group-hover:text-amber" strokeWidth={1.8} />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/training/register" className="pill bg-amber text-ink hover:bg-amber-2">
                Register for a course
                <span className="pill-disc bg-ink text-white">
                  <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
                </span>
              </Link>
              <Link href="/training" className="pill glass text-white">
                All {training.courseCount} courses
                <span className="pill-disc bg-white text-ink">
                  <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
