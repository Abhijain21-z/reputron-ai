"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronDown, MessageCircleQuestion } from "lucide-react";

const FAQS = [
  {
    q: "What exactly does ReputronAI do?",
    a: "It sends every customer a 30-second mobile rating funnel right after their job. Clients who rate 4–5 stars are guided to your Google review page; clients who rate 1–3 stars submit private feedback that only you see. You also get an owner dashboard with a review inbox, one-click AI replies, SMS templates, and a printable QR code.",
  },
  {
    q: "How is this different from just asking for Google reviews?",
    a: "Asking everyone for Google reviews sends unhappy customers to Google too. ReputronAI filters first: happy reviewers boost your public rating while complaints stay private so you can resolve them — then many of those customers update or leave a positive review afterward.",
  },
  {
    q: "Will Google penalize my listing for this?",
    a: "No. You never incentivize, gate with conditions, or post fake reviews. Every Google review comes from a real customer who voluntarily chose 4–5 stars and tapped through to Google themselves. The private path simply gives unhappy clients a direct line to you first — standard customer-service practice.",
  },
  {
    q: "How long does setup take?",
    a: "Most shops are live the same week. You add your Google review link, shop name, and city in the dashboard, then start texting the link or showing the QR code at pickup. Done-for-you onboarding is included on Growth and Scale plans.",
  },
  {
    q: "Do my customers need to install anything?",
    a: "Nothing. The funnel is a mobile web page — clients tap the link, tap stars, and finish in about 30 seconds. No app, no account, no login.",
  },
  {
    q: "How do the AI replies help my rankings?",
    a: "Every AI reply is written with your shop name, service keywords (ceramic coating, PPF, detailing), and city — exactly the terms customers search. Active, keyword-rich owner responses are a known local-SEO signal and also convert profile visitors into callers.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Plans are month-to-month with no long-term contract. Your reviews stay on Google forever — nothing is ever removed if you leave.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="relative bg-[#0f172a] text-white antialiased">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-emerald-900/20 via-slate-900 to-[#020617]" />

      <section className="relative mx-auto max-w-3xl px-4 pt-12 text-center lg:px-6 lg:pt-16">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">
          <MessageCircleQuestion className="h-3.5 w-3.5" /> FAQ
        </p>
        <h1 className="mx-auto mt-5 text-4xl font-extrabold leading-tight lg:text-5xl">
          Questions, answered
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-300">
          Everything shop owners ask before putting ReputronAI to work.
        </p>
      </section>

      <section className="relative mx-auto max-w-3xl space-y-3 px-4 pb-20 pt-10 lg:px-6">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className={`overflow-hidden rounded-2xl border backdrop-blur-xl transition-colors ${
                isOpen
                  ? "border-emerald-400/30 bg-white/[0.08]"
                  : "border-white/10 bg-white/[0.06] hover:border-white/20"
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
              >
                <span className="font-bold">{f.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-emerald-400 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <p className="px-5 pb-5 text-sm leading-relaxed text-slate-300">
                  {f.a}
                </p>
              )}
            </div>
          );
        })}

        <div className="pt-4 text-center">
          <p className="text-sm text-slate-400">Still have questions?</p>
          <Link
            href="/contact"
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5 hover:bg-emerald-400"
          >
            Contact Us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
