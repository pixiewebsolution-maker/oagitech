import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/page/PageHero";
import { RegisterForm, RegisterFormFromUrl } from "@/components/page/RegisterForm";
import { Reveal } from "@/components/Reveal";
import { courseCount, trainingCategories, trainingMethods } from "@/data/training";

export const metadata: Metadata = {
  title: "Course Registration",
  description: `Register your team for any of OAGITECH's ${courseCount} safety and technical courses, delivered in the classroom, online or with practical sessions.`,
  alternates: { canonical: "/training/register" },
};

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Course Registration"
          tagline={`Choose from ${courseCount} courses in ${trainingCategories.length} categories and tell us how you would like it delivered.`}
          image="/photos/classroom.jpg"
          crumbs={[{ label: "Home", href: "/" }, { label: "Training", href: "/training" }, { label: "Course Registration" }]}
          cta={{ label: "Browse courses", href: "/training" }}
        />
        <section className="bg-paper">
          <div className="mx-auto grid max-w-[1500px] gap-14 px-5 py-20 md:px-12 md:py-28 lg:grid-cols-12 xl:px-16">
            <div className="lg:col-span-4">
              <p className="label text-mute">How it works</p>
              <Reveal>
                <h2 className="heading mt-5 text-[clamp(2rem,3.4vw,3.2rem)] text-ink">Register in three steps.</h2>
              </Reveal>
              <ol className="mt-10 grid gap-4">
                {[
                  { title: "Pick a course", text: "Choose the category, then the course you need." },
                  { title: "Choose the format", text: `${trainingMethods.join(", ")}.` },
                  { title: "Send your details", text: "We confirm dates, location and the final quotation." },
                ].map((s, i) => (
                  <li key={s.title} className="flex gap-4 rounded-2xl border border-line p-5">
                    <span className="display text-[2rem] leading-none text-amber">{i + 1}</span>
                    <span>
                      <span className="block text-[1.05rem] font-medium text-ink">{s.title}</span>
                      <span className="mt-1 block text-[0.95rem] leading-relaxed text-mute">{s.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="rounded-[28px] bg-paper-2 p-6 md:p-10">
                <Suspense fallback={<RegisterForm />}>
                  <RegisterFormFromUrl />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
