"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { desktopMenu } from "@/data/catalog";
import { company } from "@/data/company";

const field =
  "w-full rounded-2xl border border-line bg-white/70 px-5 py-4 text-[1rem] text-ink placeholder:text-fog outline-none transition-colors focus:border-ink focus:bg-white";

// Until a form backend is chosen, the enquiry opens the visitor's email app with everything filled in.
/** Pre-selects the service when a page links here with ?subject=… (rendered inside <Suspense>). */
export function ContactFormFromUrl() {
  const params = useSearchParams();
  return <ContactForm initialSubject={params.get("subject") ?? ""} />;
}

export function ContactForm({ initialSubject = "" }: { initialSubject?: string }) {
  const [subject, setSubject] = useState(initialSubject);
  const [sent, setSent] = useState(false);

  const services = Array.from(new Set(desktopMenu.flatMap((g) => g.links ?? []).map((l) => l.label)));

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const body = [
          `Name: ${f.get("name")}`,
          `Company: ${f.get("company") || "-"}`,
          `Email: ${f.get("email")}`,
          `Phone: ${f.get("phone") || "-"}`,
          `Service: ${f.get("service") || "-"}`,
          "",
          String(f.get("message") || ""),
        ].join("\n");
        window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(`Enquiry: ${f.get("service") || "General"}`)}&body=${encodeURIComponent(body)}`;
        setSent(true);
      }}
    >
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
        <span className="text-[0.9rem] font-medium text-ink">Service</span>
        <select name="service" value={subject} onChange={(e) => setSubject(e.target.value)} className={`${field} appearance-none`}>
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
          {subject && !services.includes(subject) ? <option value={subject}>{subject}</option> : null}
          <option value="Other">Other</option>
        </select>
      </label>
      <label className="grid gap-2">
        <span className="text-[0.9rem] font-medium text-ink">Message</span>
        <textarea required name="message" rows={5} className={`${field} resize-y`} placeholder="Tell us about the job, site and timing" />
      </label>
      <div className="mt-2 flex flex-wrap items-center gap-4">
        <button type="submit" className="pill bg-ink text-white hover:bg-ink-3">
          Send enquiry
          <span className="pill-disc bg-amber text-ink">
            <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
          </span>
        </button>
        {sent ? (
          <p role="status" className="text-[0.95rem] text-mute">
            Your email app should open with the enquiry ready to send. If it didn’t, email us at {company.email}.
          </p>
        ) : null}
      </div>
    </form>
  );
}
