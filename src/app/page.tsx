"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BellRing,
  Check,
  Copy,
  Filter,
  ListChecks,
  Loader2,
  Lock,
  MapPin,
  MessageSquareText,
  Navigation,
  QrCode,
  RefreshCcw,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import ShareButtons from "../components/ShareButtons";
import {
  buildShareLink,
  loadInbox,
  saveInbox,
  useBusinessProfile,
  type InboxReview,
} from "../lib/business";

/* Reads ?shop= & ?city= from shared links */
function SharedParamsSync() {
  const params = useSearchParams();
  const { setShop, setCity } = useBusinessProfile();
  useEffect(() => {
    const s = params.get("shop");
    const c = params.get("city");
    if (s) setShop(s);
    if (c) setCity(c);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return null;
}

const STEPS = [
  {
    icon: Send,
    title: "Send after every job",
    text: "After detailing, ceramic, or PPF handover, text the client your smart review link. One tap — no app needed.",
  },
  {
    icon: Star,
    title: "Client rates 1–5 stars",
    text: "The 30-second mobile funnel captures the rating instantly while the experience is fresh.",
  },
  {
    icon: Filter,
    title: "Smart routing",
    text: "4–5 stars go straight to your Google review page. 1–3 stars stay private and land in your dashboard inbox.",
  },
  {
    icon: TrendingUp,
    title: "Rank higher, win jobs",
    text: "More 5-star reviews plus keyword-rich AI replies push you into Google's Top 3 Local Map Pack.",
  },
];

export default function Home() {
  const {
    shop,
    setShop,
    city,
    setCity,
    displayName,
    displayCity,
    reviewUrl,
  } = useBusinessProfile();

  /* Funnel state */
  const [rating, setRating] = useState<number | null>(null);
  const [hoverStar, setHoverStar] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [privateSent, setPrivateSent] = useState(false);

  /* AI demo state */
  const [aiReply, setAiReply] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Share link (client-side origin) */
  const [shareUrl, setShareUrl] = useState("/");
  useEffect(() => {
    setShareUrl(buildShareLink(displayName, displayCity));
  }, [displayName, displayCity]);

  const fullAiReply =
    `Thank you so much for trusting ${displayName} with your Corvette's Full Front PPF! ` +
    `We're thrilled you loved the attention to detail. As ${displayCity}'s top-rated shop for ` +
    `auto detailing, ceramic coating, and paint protection film, we use only premium films and ` +
    `meticulous prep for a flawless finish. Your Corvette is now protected against rock chips, ` +
    `UV, and road debris here in ${displayCity}. Thanks again for choosing ${displayName}!`;

  const resetFunnel = () => {
    setRating(null);
    setHoverStar(null);
    setFeedbackText("");
    setPhoneNumber("");
    setPrivateSent(false);
  };

  const submitPrivateFeedback = () => {
    const item: InboxReview = {
      id: `demo-${Date.now()}`,
      name: phoneNumber ? `SMS Client ••${phoneNumber.slice(-4)}` : "Mike (Demo)",
      rating: rating ?? 2,
      text: feedbackText || "(No details provided)",
      service: "Ceramic Coating",
      date: "Just now",
      status: "new",
    };
    try {
      const items = loadInbox();
      saveInbox([item, ...items]);
    } catch {
      /* ignore */
    }
    setPrivateSent(true);
  };

  const generateAiReply = () => {
    if (typingRef.current) clearInterval(typingRef.current);
    setIsTyping(true);
    setCopied(false);
    setAiReply("");
    let i = 0;
    typingRef.current = setInterval(() => {
      i += 2;
      setAiReply(fullAiReply.slice(0, i));
      if (i >= fullAiReply.length) {
        if (typingRef.current) clearInterval(typingRef.current);
        setIsTyping(false);
      }
    }, 15);
  };

  const copyReply = async () => {
    try {
      await navigator.clipboard.writeText(aiReply || fullAiReply);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = aiReply || fullAiReply;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToFunnel = () => {
    document.getElementById("funnel")?.scrollIntoView({ behavior: "smooth" });
  };

  const activeStar = hoverStar ?? rating ?? 0;

  return (
    <div className="relative bg-[#0f172a] text-white antialiased">
      <Suspense fallback={null}>
        <SharedParamsSync />
      </Suspense>

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-emerald-900/20 via-slate-900 to-[#020617]" />
      <div className="pointer-events-none fixed -top-32 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[140px]" />

      {/* ============ Hero + Personalizer ============ */}
      <section className="relative mx-auto max-w-7xl px-4 pt-12 text-center lg:px-6 lg:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">
            <Zap className="h-3.5 w-3.5" />
            AI REVIEW AUTOMATION FOR DETAILING, CERAMIC &amp; PPF SHOPS
          </p>
          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight lg:text-6xl">
            Turn Every Detail Into a{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
              5-Star Google Review
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300 lg:text-lg">
            ReputronAI routes happy clients straight to Google and intercepts
            unhappy ones privately — so your shop climbs into the Top 3 Local
            Map Pack on autopilot.
          </p>

          {/* Personalizer */}
          <div className="mx-auto mt-7 flex max-w-2xl flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl sm:flex-row sm:items-center">
            <label className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 transition-colors focus-within:border-emerald-400/60">
              <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Shop Name
              </span>
              <input
                value={shop}
                onChange={(e) => setShop(e.target.value)}
                placeholder="Apex Auto Spa"
                className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500"
              />
            </label>
            <label className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 transition-colors focus-within:border-emerald-400/60">
              <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                City
              </span>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Austin, TX"
                className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500"
              />
            </label>
            <button
              onClick={scrollToFunnel}
              className="whitespace-nowrap rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5 hover:bg-emerald-400"
            >
              Preview My Custom Funnel
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Type your shop name — the entire live demo below personalizes
            instantly.
          </p>
        </motion.div>
      </section>

      {/* ============ How to use (steps) ============ */}
      <section className="relative mx-auto max-w-7xl px-4 pt-14 lg:px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
          How it works
        </p>
        <h2 className="mx-auto mt-2 max-w-2xl text-center text-2xl font-bold lg:text-3xl">
          From job completion to 5-star review in 30 seconds
        </h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-emerald-400/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/25">
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-3xl font-extrabold text-white/10">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-3 font-bold">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="mt-5 text-center">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-300 transition-colors hover:text-emerald-200"
          >
            Read the full guide <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ============ Funnel + Dashboard preview ============ */}
      <main
        id="funnel"
        className="relative mx-auto grid max-w-7xl scroll-mt-24 gap-8 px-4 py-14 lg:grid-cols-12 lg:px-6"
      >
        {/* LEFT : Phone funnel */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
              Live Demo • 30-Second Client Funnel
            </p>
            <h2 className="mb-5 text-2xl font-bold lg:text-3xl">
              What your customer sees after pickup at {displayName}
            </h2>

            <div className="mx-auto w-[340px] rounded-[48px] border border-white/10 bg-black p-2.5 shadow-[0_30px_80px_-20px_rgba(16,185,129,0.35)]">
              <div className="relative overflow-hidden rounded-[38px] bg-slate-950">
                <div className="absolute left-1/2 top-2.5 z-20 h-7 w-28 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
                <div className="flex items-center justify-between px-7 pb-1 pt-3 text-[11px] font-semibold text-slate-300">
                  <span>9:41</span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                    5G
                  </span>
                </div>
                <div className="flex items-center gap-3 border-b border-white/5 bg-slate-900/80 px-5 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-sm font-extrabold">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{displayName}</p>
                    <p className="text-[11px] text-emerald-400">● Online • SMS</p>
                  </div>
                  <MessageSquareText className="ml-auto h-5 w-5 text-slate-500" />
                </div>

                <div className="min-h-[520px] bg-gradient-to-b from-slate-900 to-[#020617] p-4">
                  <AnimatePresence mode="wait">
                    {rating === null && (
                      <motion.div
                        key="screen1"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4"
                      >
                        <div className="rounded-2xl rounded-tl-md border border-white/10 bg-slate-800 p-3.5 text-[13px] leading-relaxed text-slate-100 shadow">
                          Hi Mike! Your Ceramic Coating on the Porsche 911 is
                          complete. How was your experience with {displayName}{" "}
                          today?
                          <span className="mt-1 block text-[10px] text-slate-400">
                            Today 5:42 PM • {displayCity}
                          </span>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-center backdrop-blur-xl">
                          <p className="text-sm font-bold">Tap a star to rate us</p>
                          <p className="mb-3 text-[11px] text-slate-400">
                            Takes 5 seconds
                          </p>
                          <div className="flex justify-center gap-1.5">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <button
                                key={n}
                                onClick={() => setRating(n)}
                                onMouseEnter={() => setHoverStar(n)}
                                onMouseLeave={() => setHoverStar(null)}
                                aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                                className="rounded-lg p-1 transition-all hover:scale-125 active:scale-95"
                              >
                                <Star
                                  className={`h-8 w-8 transition-colors ${
                                    n <= activeStar
                                      ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                                      : "text-slate-600"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                          <p className="mt-2 text-[11px] text-slate-500">
                            1–3 stars → private feedback • 4–5 stars → Google
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {rating !== null && rating >= 4 && (
                      <motion.div
                        key="screen2a"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.25 }}
                        className="relative space-y-4 overflow-hidden rounded-2xl border border-emerald-400/20 bg-emerald-950/30 p-4 text-center"
                      >
                        <div className="pointer-events-none absolute inset-0">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 1, x: 0, y: -10, rotate: 0, scale: 1 }}
                              animate={{
                                opacity: 0,
                                x: (i % 2 === 0 ? 1 : -1) * (20 + ((i * 13) % 90)),
                                y: 220 + ((i * 17) % 140),
                                rotate: 360 + i * 40,
                                scale: 0.6,
                              }}
                              transition={{
                                duration: 1.8 + (i % 5) * 0.2,
                                repeat: Infinity,
                                delay: (i % 10) * 0.12,
                                ease: "easeOut",
                              }}
                              className={`absolute left-1/2 top-6 h-2 w-2 rounded-[2px] ${
                                ["bg-emerald-400", "bg-amber-400", "bg-cyan-300", "bg-white", "bg-teal-300"][i % 5]
                              }`}
                            />
                          ))}
                        </div>

                        <div className="relative">
                          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40">
                            <Check className="h-7 w-7 text-white" />
                          </div>
                          <h3 className="mt-3 text-lg font-extrabold leading-snug">
                            Awesome! We&apos;re so glad you loved the results! 🎉
                          </h3>
                          <p className="mt-1 text-xs leading-relaxed text-slate-300">
                            Thanks for trusting {displayName} with your Porsche
                            911. One tap posts your 5 stars to Google.
                          </p>
                          <a
                            href={reviewUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-500/40 transition-all hover:-translate-y-0.5 hover:bg-emerald-400 active:translate-y-0"
                          >
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-base font-black text-blue-600">
                              G
                            </span>
                            Leave a 5-Star Google Review
                          </a>
                          <p className="mt-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-[11px] font-semibold leading-relaxed text-emerald-200">
                            🚀 Pushes {displayName} into Google&apos;s Top 3
                            Local Map Pack!
                          </p>
                          <button
                            onClick={resetFunnel}
                            className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 transition-colors hover:text-white"
                          >
                            <RefreshCcw className="h-3 w-3" /> Reset demo
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {rating !== null && rating <= 3 && (
                      <motion.div
                        key="screen2b"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-3 rounded-2xl border border-amber-400/20 bg-amber-950/20 p-4"
                      >
                        {!privateSent ? (
                          <>
                            <h3 className="text-[15px] font-extrabold leading-snug">
                              We Sincerely Apologize For Not Meeting Your
                              Expectations.
                            </h3>
                            <p className="text-[11px] leading-relaxed text-slate-300">
                              Tell the owner of {displayName} what went wrong —
                              we&apos;ll make it right within 24 hours.
                            </p>
                            <textarea
                              value={feedbackText}
                              onChange={(e) => setFeedbackText(e.target.value)}
                              rows={3}
                              placeholder="What disappointed you? (e.g. swirl marks, missed spot…)"
                              className="w-full resize-none rounded-xl border border-white/10 bg-slate-900 p-3 text-xs text-white outline-none transition-colors placeholder:text-slate-500 focus:border-amber-400/60"
                            />
                            <input
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              type="tel"
                              placeholder="Your phone for a callback"
                              className="w-full rounded-xl border border-white/10 bg-slate-900 p-3 text-xs text-white outline-none transition-colors placeholder:text-slate-500 focus:border-amber-400/60"
                            />
                            <button
                              onClick={submitPrivateFeedback}
                              className="w-full rounded-xl bg-amber-500 px-4 py-3 text-sm font-extrabold text-black shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-0.5 hover:bg-amber-400 active:translate-y-0"
                            >
                              Send Private Feedback
                            </button>
                            <p className="flex items-start gap-1.5 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-[10px] leading-relaxed text-slate-300">
                              <Lock className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
                              🔒 This feedback goes directly to the owner. It is
                              NEVER posted publicly to Google.
                            </p>
                            <button
                              onClick={resetFunnel}
                              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 transition-colors hover:text-white"
                            >
                              <RefreshCcw className="h-3 w-3" /> Reset demo
                            </button>
                          </>
                        ) : (
                          <div className="py-6 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500">
                              <Check className="h-7 w-7 text-white" />
                            </div>
                            <h3 className="mt-3 text-base font-extrabold">
                              Feedback received
                            </h3>
                            <p className="mt-1 text-xs text-slate-300">
                              The owner of {displayName} will call{" "}
                              {phoneNumber || "you"} shortly. Nothing was posted
                              to Google — it&apos;s already in the owner&apos;s
                              dashboard inbox.
                            </p>
                            <button
                              onClick={resetFunnel}
                              className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-[11px] font-semibold text-slate-200 transition-colors hover:border-emerald-400/50 hover:text-white"
                            >
                              <RefreshCcw className="h-3 w-3" /> Try again
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <p className="mt-3 text-center text-[10px] text-slate-600">
                    Secure • Powered by ReputronAI for {displayName}
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-slate-500">
              Try it: tap 5 stars, then reset and tap 2 stars — the private
              feedback lands in your{" "}
              <Link href="/dashboard" className="font-bold text-emerald-300 hover:text-emerald-200">
                dashboard inbox
              </Link>
              .
            </p>
          </div>
        </div>

        {/* RIGHT : Metrics + AI demo */}
        <div className="lg:col-span-7">
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
            Owner Results Snapshot
          </p>
          <h2 className="text-2xl font-bold lg:text-3xl">
            {displayName} — {displayCity} performance
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-emerald-400/30">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <TrendingUp className="h-4 w-4 text-emerald-400" /> Google
                Reviews This Month
              </div>
              <p className="mt-2 text-4xl font-extrabold text-emerald-400">+28</p>
              <p className="mt-1 text-xs text-slate-400">
                +40% vs last month at {displayName}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-amber-400/30">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Award className="h-4 w-4 text-amber-400" /> Average Rating
              </div>
              <p className="mt-2 text-4xl font-extrabold">
                4.9 <span className="text-2xl text-amber-400">★</span>
              </p>
              <p className="mt-1 text-xs text-slate-400">Top 1% in {displayCity}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-emerald-400/30">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Filter className="h-4 w-4 text-emerald-400" /> Negative Reviews
                Filtered Privately
              </div>
              <p className="mt-2 text-4xl font-extrabold">6</p>
              <p className="mt-1 text-xs text-slate-400">
                Saved from going public this month
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-emerald-400/30">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Navigation className="h-4 w-4 text-emerald-400" /> Local Map
                Pack Rank
              </div>
              <p className="mt-2 text-4xl font-extrabold">#2</p>
              <p className="mt-1 text-xs text-slate-400">
                in {displayCity} • Ceramic + PPF keywords
              </p>
            </div>
          </div>

          {/* AI demo */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              <h3 className="text-lg font-bold">AI Auto-Reply Generator</h3>
              <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                SEO-optimized
              </span>
            </div>
            <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-2 text-xs text-slate-400">
                  Michael R. • Google review
                </span>
              </div>
              <p className="mt-2 text-sm italic leading-relaxed text-slate-200">
                &ldquo;Just got full front PPF done on my Corvette. Incredible
                work and attention to detail!&rdquo;
              </p>
            </div>
            <button
              onClick={generateAiReply}
              disabled={isTyping}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5 hover:bg-emerald-400 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
            >
              {isTyping ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Typing SEO
                  reply…
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" /> Generate AI Response
                </>
              )}
            </button>
            {(aiReply || isTyping) && (
              <div className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4">
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                  <BadgeCheck className="h-3.5 w-3.5" /> Reply for {displayName}
                  {isTyping && <Loader2 className="h-3 w-3 animate-spin" />}
                </p>
                <p className="min-h-[80px] whitespace-pre-wrap text-sm leading-relaxed text-emerald-50">
                  {aiReply}
                  {isTyping && (
                    <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-emerald-300" />
                  )}
                </p>
                {!isTyping && aiReply && (
                  <button
                    onClick={copyReply}
                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-400"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy &amp; Post to Google
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>

          <Link
            href="/dashboard"
            className="mt-5 flex items-center justify-between rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-5 transition-all hover:-translate-y-0.5 hover:border-emerald-400/50"
          >
            <span className="flex items-center gap-3">
              <ListChecks className="h-6 w-6 text-emerald-300" />
              <span>
                <span className="block font-bold">
                  Open the owner dashboard
                </span>
                <span className="block text-xs text-slate-400">
                  Review inbox, AI replies, SMS tools, QR code &amp; settings
                </span>
              </span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 text-emerald-300" />
          </Link>
        </div>
      </main>

      {/* ============ Share ============ */}
      <section className="relative mx-auto max-w-5xl px-4 pb-4 lg:px-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl lg:p-8">
          <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/25">
              <Share2 className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                Share this demo for {displayName}
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Send your personalized funnel to a partner, manager, or client.
                The link opens this page pre-filled with {displayName} in{" "}
                {displayCity}.
              </p>
              <p className="mt-2 break-all rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-mono text-[11px] text-emerald-300">
                {shareUrl}
              </p>
              <div className="mt-3">
                <ShareButtons
                  url={shareUrl}
                  title={`${displayName} — Review Funnel Demo`}
                  text={`See how ${displayName} turns jobs into 5-star Google reviews:`}
                />
              </div>
            </div>
          </div>
          <div className="mt-5 grid gap-3 border-t border-white/10 pt-5 text-sm text-slate-400 sm:grid-cols-3">
            <p className="flex items-start gap-2">
              <BellRing className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              Text it to your next customer right after handover.
            </p>
            <p className="flex items-start gap-2">
              <QrCode className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              Print the dashboard QR code for your front counter.
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              Every 5-star review lifts {displayName} in {displayCity} search.
            </p>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative mx-auto max-w-5xl px-4 pb-24 pt-8 lg:px-6">
        <div className="rounded-[32px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 p-[1px] shadow-[0_20px_80px_-20px_rgba(16,185,129,0.5)]">
          <div className="rounded-[31px] bg-slate-900 px-6 py-10 text-center lg:px-12">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5" /> Done-for-you setup for
              detailing pros
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold leading-tight lg:text-4xl">
              Get this automated system running for {displayName} this week
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-300">
              We configure your review funnel, Google link, SMS templates, and
              AI replies — personalized for your shop and city.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-2xl bg-emerald-500 px-8 py-4 text-sm font-extrabold text-white shadow-lg shadow-emerald-500/40 transition-all hover:-translate-y-0.5 hover:bg-emerald-400 active:translate-y-0"
              >
                Get Started
              </Link>
              <Link
                href="/pricing"
                className="rounded-2xl border border-white/15 bg-white/[0.06] px-8 py-4 text-sm font-extrabold text-white backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-white/10 active:translate-y-0"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile sticky banner */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0f172a]/95 p-3 backdrop-blur-xl lg:hidden">
        <Link
          href="/contact"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-emerald-500/40 transition-all hover:bg-emerald-400 active:scale-[0.98]"
        >
          Get Started for {displayName}
        </Link>
      </div>
      <div className="h-16 lg:hidden" />
    </div>
  );
}
