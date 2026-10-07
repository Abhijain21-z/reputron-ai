"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Loader2, Mail, Send } from "lucide-react";

const PLAN_OPTIONS = [
  { id: "starter", label: "Starter — $79/mo" },
  { id: "growth", label: "Growth — $149/mo" },
  { id: "scale", label: "Scale — $299/mo" },
  { id: "custom", label: "Custom quote" },
  { id: "demo", label: "Just want a walkthrough" },
];

function ContactForm() {
  const params = useSearchParams();
  const preselected = params.get("plan") ?? "growth";

  const [name, setName] = useState("");
  const [shop, setShop] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState(
    PLAN_OPTIONS.some((p) => p.id === preselected) ? preselected : "growth"
  );
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (name.trim().length < 2) errs.push("Please enter your name.");
    if (shop.trim().length < 2) errs.push("Please enter your shop name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errs.push("Please enter a valid email address.");
    setErrors(errs);
    if (errs.length > 0) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  };

  const mailto = `mailto:jaintechsolution9@gmail.com?subject=${encodeURIComponent(
    `ReputronAI setup request — ${shop} (${plan})`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nShop: ${shop}\nEmail: ${email}\nPhone: ${phone}\nPlan: ${plan}\n\nDetails:\n${message}`
  )}`;

  const inputCls =
    "w-full rounded-xl border border-stone-300 bg-[#FAF6ED] p-3 text-sm text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-emerald-600";

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-600/30 bg-emerald-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600">
          <Check className="h-7 w-7 text-white" />
        </div>
        <h2 className="mt-4 text-2xl font-extrabold">Request received!</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-600">
          Thanks {name} — your {plan} request for{" "}
          <span className="font-bold text-stone-900">{shop}</span> is noted. To
          send it to our team right now, tap below to open your email app with
          everything pre-filled.
        </p>
        <a
          href={mailto}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:-translate-y-0.5 hover:bg-emerald-700"
        >
          <Mail className="h-4 w-4" /> Send via Email App
        </a>
        <p className="mt-3 text-xs text-stone-500">
          Prefer to write directly? jaintechsolution9@gmail.com
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {errors.length > 0 && (
        <div className="rounded-xl border border-red-400/40 bg-red-50 p-4 text-sm text-red-800">
          {errors.map((e) => (
            <p key={e}>• {e}</p>
          ))}
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Your name *
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex Carter"
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Shop name *
          </span>
          <input
            value={shop}
            onChange={(e) => setShop(e.target.value)}
            placeholder="Apex Auto Spa"
            className={inputCls}
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Email *
          </span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@shop.com"
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Phone
          </span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            placeholder="(512) 555-0100"
            className={inputCls}
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-stone-500">
          I&apos;m interested in
        </span>
        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          className={`${inputCls} appearance-none`}
        >
          {PLAN_OPTIONS.map((p) => (
            <option key={p.id} value={p.id} className="bg-white">
              {p.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-stone-500">
          Tell us about your shop
        </span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Services, location, monthly job volume, current Google rating…"
          className={`${inputCls} resize-none`}
        />
      </label>
      <button
        type="submit"
        disabled={sending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-600/25 transition-all hover:-translate-y-0.5 hover:bg-emerald-700 disabled:opacity-70 sm:w-auto"
      >
        {sending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Request Setup
          </>
        )}
      </button>
    </form>
  );
}

export default function Contact() {
  return (
    <div className="relative bg-[#FAF6ED] text-stone-900 antialiased">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-emerald-100/70 via-[#FAF6ED] to-[#F1EAD9]" />

      <section className="relative mx-auto max-w-3xl px-4 pt-12 lg:px-6 lg:pt-16">
        <div className="text-center">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-600/25 bg-emerald-600/10 px-4 py-1.5 text-xs font-semibold text-emerald-800">
            <Mail className="h-3.5 w-3.5" /> Get started
          </p>
          <h1 className="mx-auto mt-5 text-4xl font-extrabold leading-tight lg:text-5xl">
            Let&apos;s set up your shop
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-stone-600">
            Tell us about your business and we&apos;ll configure your review
            funnel, Google link, and AI replies — personalized for your shop.
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-[0_4px_24px_rgba(28,25,23,0.06)] lg:p-8">
          <Suspense
            fallback={
              <p className="py-8 text-center text-sm text-stone-500">
                Loading form…
              </p>
            }
          >
            <ContactForm />
          </Suspense>
        </div>
        <div className="h-20" />
      </section>
    </div>
  );
}
