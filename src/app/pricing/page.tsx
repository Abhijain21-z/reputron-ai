import Link from "next/link";
import { ArrowRight, BadgeCheck, Check } from "lucide-react";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "$79",
    per: "/month",
    tagline: "For single-bay shops getting their review engine started.",
    features: [
      "Smart 30-second review funnel",
      "Google + private routing",
      "50 AI review replies / month",
      "Private feedback inbox",
      "1 location",
      "Email support",
    ],
    featured: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: "$149",
    per: "/month",
    tagline: "For busy studios that live on Google rankings.",
    features: [
      "Everything in Starter",
      "Unlimited AI review replies",
      "SMS templates + counter QR code",
      "Map Pack rank tracking",
      "Review request reminders",
      "Up to 3 locations",
      "Priority support",
    ],
    featured: true,
  },
  {
    id: "scale",
    name: "Scale",
    price: "$299",
    per: "/month",
    tagline: "For multi-location operators and high-volume shops.",
    features: [
      "Everything in Growth",
      "Unlimited locations",
      "Done-for-you setup & onboarding",
      "Monthly performance report",
      "Team roles & permissions",
      "Dedicated account manager",
    ],
    featured: false,
  },
];

export default function Pricing() {
  return (
    <div className="relative bg-[#0f172a] text-white antialiased">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-emerald-900/20 via-slate-900 to-[#020617]" />

      <section className="relative mx-auto max-w-6xl px-4 pt-12 text-center lg:px-6 lg:pt-16">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">
          <BadgeCheck className="h-3.5 w-3.5" /> Simple, honest pricing
        </p>
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold leading-tight lg:text-5xl">
          Plans that pay for themselves with one extra job
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          One ceramic coating or PPF job won through better Google visibility
          covers months of ReputronAI. Cancel anytime.
        </p>
      </section>

      <section className="relative mx-auto grid max-w-6xl gap-5 px-4 pt-10 md:grid-cols-3 lg:px-6">
        {PLANS.map((p) => (
          <div
            key={p.id}
            className={`flex flex-col rounded-3xl p-[1px] transition-all hover:-translate-y-1 ${
              p.featured
                ? "bg-gradient-to-b from-emerald-400 via-teal-500 to-cyan-600 shadow-[0_20px_60px_-20px_rgba(16,185,129,0.5)]"
                : "bg-white/10"
            }`}
          >
            <div className="flex flex-1 flex-col rounded-[23px] bg-slate-900 p-7">
              {p.featured && (
                <span className="mb-3 inline-flex w-fit rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">
                  Most Popular
                </span>
              )}
              <h2 className="text-xl font-extrabold">{p.name}</h2>
              <p className="mt-1 text-sm text-slate-400">{p.tagline}</p>
              <p className="mt-4">
                <span className="text-5xl font-extrabold">{p.price}</span>
                <span className="text-sm text-slate-400">{p.per}</span>
              </p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-200">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact?plan=${p.id}`}
                className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-extrabold transition-all hover:-translate-y-0.5 ${
                  p.featured
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 hover:bg-emerald-400"
                    : "border border-white/15 bg-white/[0.06] text-white hover:border-emerald-400/40 hover:bg-white/10"
                }`}
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section className="relative mx-auto max-w-4xl px-4 pb-20 pt-10 text-center lg:px-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
          <p className="text-sm leading-relaxed text-slate-300">
            Need something custom — franchises, dealer groups, or white-label?
            Tell us about your operation and we&apos;ll build a plan around it.
          </p>
          <Link
            href="/contact?plan=custom"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-6 py-3 text-sm font-bold text-emerald-200 transition-all hover:-translate-y-0.5 hover:bg-emerald-500/20"
          >
            Request Custom Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
