"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  CalendarCheck,
  Copy,
  Check,
  Filter,
  Loader2,
  Lock,
  MapPin,
  MessageSquareText,
  Navigation,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";

export default function Home() {
  /* ---------- FEATURE 1 : Business Personalizer ---------- */
  const [businessName, setBusinessName] = useState("Apex Auto Spa");
  const [city, setCity] = useState("Austin, TX");
  const displayName = businessName || "Apex Auto Spa";
  const displayCity = city || "Austin, TX";

  /* ---------- FEATURE 2 : Review Funnel ---------- */
  const [rating, setRating] = useState<number | null>(null);
  const [hoverStar, setHoverStar] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [privateSent, setPrivateSent] = useState(false);

  const resetFunnel = () => {
    setRating(null);
    setHoverStar(null);
    setFeedbackText("");
    setPhoneNumber("");
    setPrivateSent(false);
  };

  const scrollToFunnel = () => {
    document.getElementById("funnel")?.scrollIntoView({ behavior: "smooth" });
  };

  /* ---------- FEATURE 3 : AI Auto-Reply ---------- */
  const [aiReply, setAiReply] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fullAiReply = `Thank you so much for trusting ${displayName} with your Corvette's Full Front PPF! We're thrilled you loved the attention to detail. As ${displayCity}'s top-rated shop for full front PPF, ceramic coating, and auto detailing, we use only premium films and meticulous prep for a flawless, long-lasting finish. Your Corvette is now protected against rock chips, UV, and road debris here in ${displayCity}. Thanks again for choosing ${displayName} — we appreciate your 5-star support!`;

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

  const copyToClipboard = async () => {
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

  const activeStar = hoverStar ?? rating ?? 0;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white antialiased">
      {/* Background: fixed radial gradient + blur circle */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-emerald-900/20 via-slate-900 to-[#020617]" />
      <div className="pointer-events-none fixed -top-32 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[140px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-[320px] w-[420px] rounded-full bg-teal-500/10 blur-[120px]" />

      {/* ============ FEATURE 1 : Sticky Header ============ */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f172a]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/30">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              REPUTRON<span className="text-emerald-400">.AI</span>
            </span>
            <span className="ml-2 hidden rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300 sm:inline-block">
              Auto Detailing • Ceramic • PPF
            </span>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 backdrop-blur-xl transition-colors focus-within:border-emerald-400/60">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Shop Name
              </span>
              <input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Apex Auto Spa"
                className="w-36 bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500"
              />
            </label>
            <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 backdrop-blur-xl transition-colors focus-within:border-emerald-400/60">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                City
              </span>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Austin, TX"
                className="w-28 bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500"
              />
            </label>
            <button
              onClick={scrollToFunnel}
              className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-emerald-400/40 active:translate-y-0"
            >
              Preview My Custom Funnel
            </button>
          </div>
        </div>
      </header>

      {/* ============ Hero ============ */}
      <section className="relative mx-auto max-w-7xl px-4 pt-12 text-center lg:px-6 lg:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">
            <Zap className="h-3.5 w-3.5" />
            AI REVIEW AUTOMATION FOR {displayName.toUpperCase()}
          </p>
          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight lg:text-6xl">
            Turn Every Detail Into a{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
              5-Star Google Review
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300 lg:text-lg">
            {displayName} in {displayCity} filters unhappy clients privately and
            pushes happy drivers straight to Google — climbing into the Top 3
            Local Map Pack on autopilot.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 backdrop-blur-xl">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Negative
              reviews intercepted
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 backdrop-blur-xl">
              <Star className="h-3.5 w-3.5 text-amber-400" /> 4.9★ average rating
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 backdrop-blur-xl">
              <MapPin className="h-3.5 w-3.5 text-emerald-400" /> #2 in {displayCity}
            </span>
          </div>
        </motion.div>
      </section>

      {/* ============ FEATURE 2 + 3 : grid ============ */}
      <main
        id="funnel"
        className="relative mx-auto grid max-w-7xl scroll-mt-24 gap-8 px-4 py-12 lg:grid-cols-12 lg:px-6"
      >
        {/* ===== LEFT : Phone funnel (5 cols) ===== */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
              Live Demo • 30-Second Client Funnel
            </p>
            <h2 className="mb-5 text-2xl font-bold lg:text-3xl">
              What your customer sees after pickup at {displayName}
            </h2>

            {/* Smartphone mockup */}
            <div className="mx-auto w-[340px] rounded-[48px] border border-white/10 bg-black p-2.5 shadow-[0_30px_80px_-20px_rgba(16,185,129,0.35)]">
              <div className="relative overflow-hidden rounded-[38px] bg-slate-950">
                {/* Notch */}
                <div className="absolute left-1/2 top-2.5 z-20 h-7 w-28 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
                {/* Status bar */}
                <div className="flex items-center justify-between px-7 pb-1 pt-3 text-[11px] font-semibold text-slate-300">
                  <span>9:41</span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                    5G
                  </span>
                </div>
                {/* SMS header */}
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

                {/* Screen body */}
                <div className="min-h-[520px] bg-gradient-to-b from-slate-900 to-[#020617] p-4">
                  <AnimatePresence mode="wait">
                    {/* SCREEN 1 : Trigger */}
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
                          <p className="text-sm font-bold">
                            Tap a star to rate us
                          </p>
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

                    {/* SCREEN 2A : 4-5 stars */}
                    {rating !== null && rating >= 4 && (
                      <motion.div
                        key="screen2a"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.25 }}
                        className="relative space-y-4 overflow-hidden rounded-2xl border border-emerald-400/20 bg-emerald-950/30 p-4 text-center"
                      >
                        {/* 20 confetti particles */}
                        <div className="pointer-events-none absolute inset-0">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <motion.span
                              key={i}
                              initial={{
                                opacity: 1,
                                x: 0,
                                y: -10,
                                rotate: 0,
                                scale: 1,
                              }}
                              animate={{
                                opacity: 0,
                                x: (i % 2 === 0 ? 1 : -1) * (20 + (i * 13) % 90),
                                y: 220 + (i * 17) % 140,
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
                                [
                                  "bg-emerald-400",
                                  "bg-amber-400",
                                  "bg-cyan-300",
                                  "bg-white",
                                  "bg-teal-300",
                                ][i % 5]
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
                            href="https://www.google.com/maps"
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

                    {/* SCREEN 2B : 1-3 stars */}
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
                              onClick={() => setPrivateSent(true)}
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
                              to Google.
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
              👆 Try it: tap 5 stars, then reset and tap 2 stars to see the
              private-save flow.
            </p>
          </div>
        </div>

        {/* ===== RIGHT : Dashboard (7 cols) ===== */}
        <div className="lg:col-span-7">
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
            Detailer ROI &amp; Control Dashboard
          </p>
          <h2 className="text-2xl font-bold lg:text-3xl">
            {displayName} — {displayCity} performance
          </h2>

          {/* Metrics 2x2 */}
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
              <p className="mt-1 text-xs text-slate-400">
                Top 1% in {displayCity}
              </p>
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

          {/* AI Auto-Reply Generator */}
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
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                  />
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
                  <Loader2 className="h-4 w-4 animate-spin" /> Typing
                  SEO reply…
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
                  {isTyping && (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  )}
                </p>
                <p className="min-h-[80px] whitespace-pre-wrap text-sm leading-relaxed text-emerald-50">
                  {aiReply}
                  {isTyping && (
                    <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-emerald-300" />
                  )}
                </p>
                {!isTyping && aiReply && (
                  <button
                    onClick={copyToClipboard}
                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-400 active:translate-y-0"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy &amp; Post to
                        Google
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
            <p className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
              <MapPin className="h-3 w-3" /> Auto-includes {displayName} +{" "}
              {displayCity} + service keywords for Map Pack rankings.
            </p>
          </div>
        </div>
      </main>

      {/* ============ FEATURE 4 : CTA ============ */}
      <section className="relative mx-auto max-w-5xl px-4 pb-24 pt-4 lg:px-6">
        <div className="rounded-[32px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 p-[1px] shadow-[0_20px_80px_-20px_rgba(16,185,129,0.5)]">
          <div className="rounded-[31px] bg-slate-900 px-6 py-10 text-center lg:px-12">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">
              <CalendarCheck className="h-3.5 w-3.5" /> Free 14-day setup •
              Valued at $500
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold leading-tight lg:text-4xl">
              Want this automated system set up for {displayName} this week?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-300">
              Test it on your next 10 clients with zero risk. Valued at $500 —
              Yours Free for 14 Days.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="mailto:jaintechsolution9@gmail.com?subject=Claim 14-Day Free Trial"
                className="rounded-2xl bg-emerald-500 px-8 py-4 text-sm font-extrabold text-white shadow-lg shadow-emerald-500/40 transition-all hover:-translate-y-0.5 hover:bg-emerald-400 active:translate-y-0"
              >
                Claim 14-Day Free Trial
              </a>
              <a
                href="mailto:jaintechsolution9@gmail.com?subject=Book 15-Minute Setup Call"
                className="rounded-2xl border border-white/15 bg-white/[0.06] px-8 py-4 text-sm font-extrabold text-white backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-white/10 active:translate-y-0"
              >
                Book 15-Minute Setup Call
              </a>
            </div>
            <p className="mt-6 text-xs text-slate-400">
              Powered by Jain Tech Solution | Contact:
              jaintechsolution9@gmail.com
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              © 2025 ReputronAI. Built for US Auto Detailing, Ceramic &amp; PPF
              Pros.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile sticky banner */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0f172a]/95 p-3 backdrop-blur-xl lg:hidden">
        <a
          href="mailto:jaintechsolution9@gmail.com?subject=Claim 14-Day Free Trial"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-emerald-500/40 transition-all hover:bg-emerald-400 active:scale-[0.98]"
        >
          Claim Free Trial for {displayName}
        </a>
      </div>
      <div className="h-16 lg:hidden" />
    </div>
  );
}
