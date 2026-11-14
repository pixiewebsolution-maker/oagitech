import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { courses, photos } from "@/data/site";
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
                Courses and exams that get crews site-ready.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[28rem] text-[1.05rem] leading-relaxed text-fog">
                Practical training and competency assessment, from safety orientation and permit receiver to rigging, scaffolding, welding inspection and
                NDT, with bespoke courses on request.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[26px]">
                <Image src={photos.crewHiVis} alt="Site crew in hard hats and hi-vis vests in a briefing" fill sizes="(min-width:1024px) 38vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="border-t border-white/12">
              {courses.map((c) => (
                <li key={c} className="border-b border-white/12">
                  <Link href="/training" className="group flex items-center gap-5 py-5">
                    <span className="flex-1 text-[1.15rem] font-medium tracking-[-0.015em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:text-[1.3rem]">
                      {c}
                    </span>
                    <ArrowUpRight aria-hidden className="h-5 w-5 text-fog transition-all duration-500 group-hover:rotate-45 group-hover:text-amber" strokeWidth={1.8} />
                  </Link>
                </li>
              ))}
            </ul>
            <a href="#contact" className="pill mt-10 bg-amber text-ink hover:bg-amber-2">
              Enrol your team
              <span className="pill-disc bg-ink text-white">
                <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
