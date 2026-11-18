"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { company } from "@/data/company";
import { allCourses, regions, trainingCategories, trainingMethods } from "@/data/training";

const field =
  "w-full rounded-2xl border border-line bg-white/70 px-5 py-4 text-[1rem] text-ink placeholder:text-fog outline-none transition-colors focus:border-ink focus:bg-white";

/** Reads ?course= or ?category= from the link that brought the visitor here. Rendered inside <Suspense>. */
export function RegisterFormFromUrl() {
  const params = useSearchParams();
  const course = params.get("course") ?? "";
  const fromCourse = allCourses.find((c) => c.code === course)?.category.slug;
  const category = fromCourse ?? (trainingCategories.some((c) => c.slug === params.get("category")) ? params.get("category")! : "");
  return <RegisterForm initialCategory={category} initialCourse={fromCourse ? course : ""} />;
}

export function RegisterForm({ initialCategory = "", initialCourse = "" }: { initialCategory?: string; initialCourse?: string }) {
  const [category, setCategory] = useState(initialCategory || trainingCategories[0].slug);
  const [course, setCourse] = useState(initialCourse);
  const [method, setMethod] = useState<string>(trainingMethods[0]);
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [sent, setSent] = useState(false);

  const cat = trainingCategories.find((c) => c.slug === category)!;
  const cities = useMemo(() => regions.find((r) => r.name === region)?.cities ?? [], [region]);

  return (
    <form
      className="grid gap-8"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const chosen = cat.courses.find((c) => c.code === course);
        const body = [
          `Course category: ${cat.name}`,
          `Course: ${chosen ? `${chosen.code} ${chosen.title}` : "-"}`,
          `Training method: ${method}`,
          `Number of trainees: ${f.get("trainees") || "-"}`,
          `Preferred date: ${f.get("date") || "-"}`,
          `Location: ${[city, region].filter(Boolean).join(", ") || "-"}`,
          "",
          `Name: ${f.get("name")}`,
          `Company: ${f.get("company") || "-"}`,
          `Email: ${f.get("email")}`,
          `Phone: ${f.get("phone") || "-"}`,
          "",
          String(f.get("notes") || ""),
        ].join("\n");
        const subject = `Course registration: ${chosen ? chosen.code : cat.name}`;
        window.location.assign(`mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        setSent(true);
      }}
    >
      <fieldset className="grid gap-4">
        <legend className="mb-2 text-[1.2rem] font-medium tracking-[-0.02em] text-ink">Course</legend>
        <Select
          label="Course category"
          value={category}
          onChange={(v) => {
            setCategory(v);
            setCourse("");
          }}
          options={trainingCategories.map((c) => ({ value: c.slug, label: c.name, hint: c.letter }))}
        />
        <Select
          label="Select course"
          name="course"
          required
          value={course}
          onChange={setCourse}
          placeholder="Choose a course"
          options={cat.courses.map((c) => ({ value: c.code, label: c.title, hint: c.code }))}
        />
        <div className="grid gap-2">
          <span className="text-[0.9rem] font-medium text-ink">Training method</span>
          <div role="radiogroup" aria-label="Training method" className="flex flex-wrap gap-2">
            {trainingMethods.map((m) => (
              <label
                key={m}
                className={`flex cursor-pointer items-center gap-3 rounded-full border px-5 py-3 text-[0.98rem] font-medium transition-colors ${method === m ? "border-ink bg-ink text-white" : "border-line bg-white/60 text-ink hover:border-ink"}`}
              >
                <input type="radio" name="method" value={m} checked={method === m} onChange={() => setMethod(m)} className="sr-only" />
                <span aria-hidden className={`grid h-4 w-4 place-items-center rounded-full border-2 ${method === m ? "border-amber" : "border-fog"}`}>
                  {method === m ? <span className="h-1.5 w-1.5 rounded-full bg-amber" /> : null}
                </span>
                {m}
              </label>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-[0.9rem] font-medium text-ink">Number of trainees</span>
            <input type="number" min={1} name="trainees" className={field} placeholder="1" />
          </label>
          <label className="grid gap-2">
            <span className="text-[0.9rem] font-medium text-ink">Preferred start date</span>
            <input type="date" name="date" className={field} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Region"
            value={region}
            onChange={(v) => {
              setRegion(v);
              setCity("");
            }}
            placeholder="Choose a region"
            options={regions.map((r) => ({ value: r.name, label: r.name }))}
          />
          <Select
            label="City"
            value={city}
            onChange={setCity}
            disabled={!cities.length}
            placeholder={cities.length ? "Choose a city" : "Choose a region first"}
            options={cities.map((c) => ({ value: c, label: c }))}
          />
        </div>
      </fieldset>

      <fieldset className="grid gap-4">
        <legend className="mb-2 text-[1.2rem] font-medium tracking-[-0.02em] text-ink">Your details</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-[0.9rem] font-medium text-ink">Full name</span>
            <input required name="name" autoComplete="name" className={field} placeholder="Your name" />
          </label>
          <label className="grid gap-2">
            <span className="text-[0.9rem] font-medium text-ink">Company</span>
            <input name="company" autoComplete="organization" className={field} placeholder="Company name" />
          </label>
          <label className="grid gap-2">
            <span className="text-[0.9rem] font-medium text-ink">Email</span>
            <input required type="email" name="email" autoComplete="email" className={field} placeholder="you@company.com" />
          </label>
          <label className="grid gap-2">
            <span className="text-[0.9rem] font-medium text-ink">Phone</span>
            <input type="tel" name="phone" autoComplete="tel" className={field} placeholder="+966" />
          </label>
        </div>
        <label className="grid gap-2">
          <span className="text-[0.9rem] font-medium text-ink">Notes</span>
          <textarea name="notes" rows={4} className={`${field} resize-y`} placeholder="Anything we should know, such as on-site delivery or language needs" />
        </label>
      </fieldset>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="pill bg-ink text-white hover:bg-ink-3">
          Send registration
          <span className="pill-disc bg-amber text-ink">
            <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
          </span>
        </button>
        {sent ? (
          <p role="status" className="text-[0.95rem] text-mute">
            Your email app should open with the registration ready to send. If it did not, email us at {company.email}.
          </p>
        ) : null}
      </div>
    </form>
  );
}
