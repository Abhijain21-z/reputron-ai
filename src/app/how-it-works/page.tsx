import Link from "next/link";
import {
  ArrowRight,
  Car,
  Filter,
  QrCode,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";

const AUDIENCE = [
  {
    icon: Car,
    title: "Auto Detailing Studios",
    text: "Interior + exterior details, paint correction, maintenance plans — every handover becomes a review opportunity.",
  },
  {
    icon: ShieldCheck,
    title: "Ceramic Coating Specialists",
    text: "High-ticket jobs deserve high-visibility proof. Coating clients are your best reviewers when asked at the right moment.",
  },
  {
    icon: Sparkles,
    title: "PPF Installers",
    text: "Full-front and full-body PPF clients research heavily — your Google profile decides who gets the job.",
  },
];

const GUIDE = [
  {
    title: "Connect your Google review link",
    text: "Paste your real Google review URL once in the Dashboard settings. Every 4–5 star tap then lands exactly on your review page — no friction, no drop-off.",
  },
  {
    title: "Personalize your shop profile",
    text: "Set your shop name and city. The SMS text, funnel screens, AI replies, and share links all update automatically.",
  },
  {
    title: "Send the link after every job",
    text: "Text the smart link or show the counter QR code at pickup. The client rates you in 30 seconds — no app, no account needed.",
  },
  {
    title: "Let routing do the work",
    text: "Happy clients (4–5 stars) are guided to Google. Unhappy clients (1–3 stars) submit private feedback that goes only to you — never public.",
  },
  {
    title: "Reply and resolve from the inbox",
    text: "Answer every review with one-click SEO-optimized AI replies, call back private complaints within 24 hours, and watch your rating and Map Pack rank climb.",
  },
];

export default function HowItWorks() {
  return (
    <div className="relative bg-[#0f172a] text-white antialiased">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-emerald-900/20 via-slate-900 to-[#020617]" />

      <section className="relative mx-auto max-w-5xl px-4 pt-12 text-center lg:px-6 lg:pt-16">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">
          <Star className="h-3.5 w-3.5" /> What it is &amp; how to use it
        </p>
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold leading-tight lg:text-5xl">
          What is ReputronAI?
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-slate-300 lg:text-lg">
          ReputronAI is a review automation system for car-care businesses. It
          asks every customer for feedback at the perfect moment — right after
          pickup — then <span className="font-bold text-white">routes happy
          reviewers to Google</span> and <span className="font-bold text-white">
          keeps unhappy feedback private</span> so you can fix it before it ever
          goes public. The result: more 5-star reviews, a higher rating, and a
          stronger position in Google&apos;s Local Map Pack.
        </p>
      </section>

      {/* Routing visual */}
      <section className="relative mx-auto grid max-w-5xl gap-4 px-4 pt-10 md:grid-cols-2 lg:px-6">
        <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-6">
          <p className="flex items-center gap-2 text-sm font-extrabold text-emerald-300">
            <Star className="h-4 w-4 fill-emerald-300" /> 4–5 STARS → GOOGLE
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">
            The client sees a celebration screen with a single big button that
            opens your Google review page. The review includes your shop name,
            service, and city keywords — fuel for local rankings.
          </p>
        </div>
        <div className="rounded-2xl border border-amber-400/25 bg-amber-500/10 p-6">
          <p className="flex items-center gap-2 text-sm font-extrabold text-amber-300">
            <Filter className="h-4 w-4" /> 1–3 STARS → PRIVATE INBOX
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">
            The client sees an apology screen and submits feedback that goes
            only to the owner. It appears in your dashboard inbox instantly —
            nothing is ever posted to Google.
          </p>
        </div>
      </section>

      {/* Step-by-step guide */}
      <section className="relative mx-auto max-w-5xl px-4 pt-12 lg:px-6">
        <h2 className="text-center text-2xl font-bold lg:text-3xl">
          How to use it — 5 steps
        </h2>
        <div className="mt-7 space-y-4">
          {GUIDE.map((g, i) => (
            <div
              key={g.title}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl transition-all hover:border-emerald-400/30"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-base font-extrabold shadow-lg shadow-emerald-500/25">
                {i + 1}
              </span>
              <div>
                <h3 className="font-bold">{g.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">
                  {g.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section className="relative mx-auto max-w-5xl px-4 pt-12 lg:px-6">
        <h2 className="text-center text-2xl font-bold lg:text-3xl">
          Who is it for?
        </h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {AUDIENCE.map((a) => (
            <div
              key={a.title}
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-emerald-400/30"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/25">
                <a.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-3 font-bold">{a.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">
                {a.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools strip */}
      <section className="relative mx-auto max-w-5xl px-4 pt-12 lg:px-6">
        <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl sm:grid-cols-3 lg:p-8">
          <div className="flex items-start gap-3">
            <Send className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            <p className="text-sm text-slate-300">
              <span className="font-bold text-white">SMS templates</span> —
              copy-paste ready text for every job type.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <QrCode className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            <p className="text-sm text-slate-300">
              <span className="font-bold text-white">Counter QR code</span> —
              clients scan and rate before leaving the shop.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            <p className="text-sm text-slate-300">
              <span className="font-bold text-white">Owner dashboard</span> —
              inbox, AI replies, stats, and settings in one place.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-3 pb-20 pt-8 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-8 py-4 text-sm font-extrabold text-white shadow-lg shadow-emerald-500/40 transition-all hover:-translate-y-0.5 hover:bg-emerald-400"
          >
            Open the Dashboard <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-8 py-4 text-sm font-extrabold text-white backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-white/10"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
