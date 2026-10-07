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
    <div className="relative bg-[#FAF6ED] text-stone-900 antialiased">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-emerald-100/70 via-[#FAF6ED] to-[#F1EAD9]" />

      <section className="relative mx-auto max-w-6xl px-4 pt-12 text-center lg:px-6 lg:pt-16">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-600/25 bg-emerald-600/10 px-4 py-1.5 text-xs font-semibold text-emerald-800">
          <BadgeCheck className="h-3.5 w-3.5" /> Simple, honest pricing
        </p>
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold leading-tight lg:text-5xl">
          Plans that pay for themselves with one extra job
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-stone-600">
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
                ? "bg-gradient-to-b from-emerald-500 via-teal-600 to-cyan-700 shadow-[0_20px_60px_-20px_rgba(5,150,105,0.45)]"
                : "bg-stone-200"
            }`}
          >
            <div className="flex flex-1 flex-col rounded-[23px] bg-white p-7">
              {p.featured && (
                <span className="mb-3 inline-flex w-fit rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">
                  Most Popular
                </span>
              )}
              <h2 className="text-xl font-extrabold">{p.name}</h2>
              <p className="mt-1 text-sm text-stone-500">{p.tagline}</p>
              <p className="mt-4">
                <span className="text-5xl font-extrabold">{p.price}</span>
                <span className="text-sm text-stone-500">{p.per}</span>
              </p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-stone-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact?plan=${p.id}`}
                className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-extrabold transition-all hover:-translate-y-0.5 ${
                  p.featured
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-700"
                    : "border border-stone-300 bg-white text-stone-900 hover:border-emerald-600 hover:bg-emerald-50"
                }`}
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section className="relative mx-auto max-w-4xl px-4 pb-20 pt-10 text-center lg:px-6">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-[0_2px_12px_rgba(28,25,23,0.05)]">
          <p className="text-sm leading-relaxed text-stone-600">
            Need something custom — franchises, dealer groups, or white-label?
            Tell us about your operation and we&apos;ll build a plan around it.
          </p>
          <Link
            href="/contact?plan=custom"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-emerald-600/40 bg-emerald-600/10 px-6 py-3 text-sm font-bold text-emerald-800 transition-all hover:-translate-y-0.5 hover:bg-emerald-600/15"
          >
            Request Custom Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
