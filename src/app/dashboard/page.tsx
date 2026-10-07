"use client";

import { useEffect, useRef, useState } from "react";
import {
  Award,
  BadgeCheck,
  Check,
  Copy,
  ExternalLink,
  Filter,
  Loader2,
  Lock,
  QrCode,
  Save,
  Send,
  Settings2,
  Star,
  TrendingUp,
} from "lucide-react";
import ShareButtons from "../../components/ShareButtons";
import {
  buildAiReply,
  buildShareLink,
  buildSmsText,
  loadInbox,
  saveInbox,
  useBusinessProfile,
  type InboxReview,
} from "../../lib/business";

type FilterKey = "all" | "action" | "private" | "resolved";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "action", label: "Needs Action" },
  { key: "private", label: "Private (1–3★)" },
  { key: "resolved", label: "Resolved" },
];

const WEEK = [
  { day: "Mon", v: 3 },
  { day: "Tue", v: 5 },
  { day: "Wed", v: 2 },
  { day: "Thu", v: 6 },
  { day: "Fri", v: 8 },
  { day: "Sat", v: 7 },
  { day: "Sun", v: 4 },
];

function Stars({ n, size = "h-4 w-4" }: { n: number; size?: string }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${size} ${i <= n ? "fill-amber-500 text-amber-500" : "text-stone-300"}`}
        />
      ))}
    </span>
  );
}

const inputCls =
  "w-full rounded-xl border border-stone-300 bg-[#FAF6ED] p-3 text-sm text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-emerald-600";

export default function Dashboard() {
  const {
    shop,
    setShop,
    city,
    setCity,
    googleLink,
    setGoogleLink,
    ownerEmail,
    setOwnerEmail,
    ownerPhone,
    setOwnerPhone,
    displayName,
    displayCity,
    reviewUrl,
  } = useBusinessProfile();

  const [inbox, setInbox] = useState<InboxReview[]>([]);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [typingId, setTypingId] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedTick, setSavedTick] = useState(false);
  const [smsCopied, setSmsCopied] = useState(false);
  const [service, setService] = useState("Ceramic Coating");
  const [shareUrl, setShareUrl] = useState("/");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setInbox(loadInbox());
  }, []);

  useEffect(() => {
    setShareUrl(buildShareLink(displayName, displayCity));
  }, [displayName, displayCity]);

  const update = (items: InboxReview[]) => {
    setInbox(items);
    saveInbox(items);
  };

  const total = inbox.length;
  const avg = total
    ? (inbox.reduce((a, r) => a + r.rating, 0) / total).toFixed(1)
    : "0.0";
  const fiveStar = inbox.filter((r) => r.rating === 5).length;
  const filtered = inbox.filter((r) => r.rating <= 3).length;

  const visible = inbox.filter((r) => {
    if (filter === "action") return r.status === "new";
    if (filter === "private") return r.rating <= 3;
    if (filter === "resolved") return r.status === "resolved";
    return true;
  });

  const generateFor = (review: InboxReview) => {
    if (timer.current) clearInterval(timer.current);
    setTypingId(review.id);
    setTyped("");
    const full = buildAiReply({
      name: review.name,
      service: review.service,
      shop: displayName,
      city: displayCity,
    });
    let i = 0;
    timer.current = setInterval(() => {
      i += 3;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        if (timer.current) clearInterval(timer.current);
        setTypingId(null);
        update(
          inbox.map((r) =>
            r.id === review.id ? { ...r, reply: full, status: "replied" as const } : r
          )
        );
      }
    }, 15);
  };

  const copyText = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copySms = async () => {
    await copyText(
      buildSmsText({ shop: displayName, service, link: shareUrl }),
      "sms"
    );
    setSmsCopied(true);
    setTimeout(() => setSmsCopied(false), 2000);
  };

  const markSaved = () => {
    setSavedTick(true);
    setTimeout(() => setSavedTick(false), 2000);
  };

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=${encodeURIComponent(shareUrl)}`;

  const labelCls =
    "mb-1 block text-[11px] font-bold uppercase tracking-wider text-stone-500";

  return (
    <div className="relative bg-[#FAF6ED] text-stone-900 antialiased">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-emerald-100/70 via-[#FAF6ED] to-[#F1EAD9]" />

      <section className="relative mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
          Owner Control Center
        </p>
        <h1 className="mt-1 text-3xl font-extrabold lg:text-4xl">
          {displayName} Dashboard
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-stone-600 lg:text-base">
          Every rating, private complaint, AI reply, and send-tool for your
          shop in {displayCity} — everything saves automatically on this
          device.
        </p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_2px_12px_rgba(28,25,23,0.05)]">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-700" /> Total reviews
            </p>
            <p className="mt-1 text-3xl font-extrabold">{total}</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_2px_12px_rgba(28,25,23,0.05)]">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              <Award className="h-3.5 w-3.5 text-amber-600" /> Average rating
            </p>
            <p className="mt-1 text-3xl font-extrabold">
              {avg} <span className="text-xl text-amber-500">★</span>
            </p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_2px_12px_rgba(28,25,23,0.05)]">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              <Star className="h-3.5 w-3.5 text-emerald-700" /> 5-star reviews
            </p>
            <p className="mt-1 text-3xl font-extrabold text-emerald-700">{fiveStar}</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_2px_12px_rgba(28,25,23,0.05)]">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              <Filter className="h-3.5 w-3.5 text-amber-600" /> Kept private
            </p>
            <p className="mt-1 text-3xl font-extrabold">{filtered}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 pb-20 lg:grid-cols-12">
          {/* Inbox */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_2px_12px_rgba(28,25,23,0.05)] lg:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-bold">Review Inbox</h2>
                <div className="flex flex-wrap gap-1.5">
                  {FILTERS.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setFilter(f.key)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                        filter === f.key
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25"
                          : "border border-stone-300 bg-white text-stone-600 hover:border-emerald-600 hover:text-stone-900"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              <p className="mt-1 text-xs text-stone-500">
                Private 1–3 star feedback from your funnel appears here
                instantly. Nothing here is ever posted to Google.
              </p>

              <div className="mt-4 space-y-3">
                {visible.length === 0 && (
                  <p className="rounded-xl border border-dashed border-stone-300 p-6 text-center text-sm text-stone-500">
                    No reviews in this view. Try the demo funnel on the home
                    page — tap 2 stars and it will show up here.
                  </p>
                )}
                {visible.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-xl border border-stone-200 bg-stone-50 p-4"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Stars n={r.rating} />
                      {r.rating <= 3 && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800">
                          <Lock className="h-3 w-3" /> Private
                        </span>
                      )}
                      {r.status === "resolved" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                          <Check className="h-3 w-3" /> Resolved
                        </span>
                      )}
                      <span className="ml-auto text-[11px] text-stone-500">
                        {r.date}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-bold">
                      {r.name}{" "}
                      <span className="font-normal text-stone-500">
                        • {r.service}
                      </span>
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-stone-700">
                      {r.text}
                    </p>

                    {typingId === r.id && (
                      <div className="mt-3 rounded-lg border border-emerald-600/30 bg-emerald-50 p-3">
                        <p className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                          <Loader2 className="h-3 w-3 animate-spin" /> Typing
                          reply…
                        </p>
                        <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-emerald-950">
                          {typed}
                          <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-emerald-600" />
                        </p>
                      </div>
                    )}

                    {r.reply && typingId !== r.id && (
                      <div className="mt-3 rounded-lg border border-emerald-600/30 bg-emerald-50 p-3">
                        <p className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                          <BadgeCheck className="h-3 w-3" /> AI reply ready
                        </p>
                        <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-emerald-950">
                          {r.reply}
                        </p>
                      </div>
                    )}

                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => generateFor(r)}
                        disabled={typingId !== null}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white transition-all hover:bg-emerald-700 disabled:opacity-50"
                      >
                        {typingId === r.id ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Typing…
                          </>
                        ) : (
                          <>Generate AI Reply</>
                        )}
                      </button>
                      {r.reply && (
                        <button
                          onClick={() => copyText(r.reply ?? "", r.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3.5 py-2 text-xs font-bold text-stone-700 transition-colors hover:border-emerald-600 hover:text-stone-900"
                        >
                          {copiedId === r.id ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-700" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" /> Copy Reply
                            </>
                          )}
                        </button>
                      )}
                      <button
                        onClick={() =>
                          update(
                            inbox.map((x) =>
                              x.id === r.id
                                ? {
                                    ...x,
                                    status:
                                      x.status === "resolved" ? ("new" as const) : ("resolved" as const),
                                  }
                                : x
                            )
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3.5 py-2 text-xs font-bold text-stone-700 transition-colors hover:border-emerald-600 hover:text-stone-900"
                      >
                        {r.status === "resolved" ? "Reopen" : "Mark Resolved"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly chart */}
            <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_2px_12px_rgba(28,25,23,0.05)] lg:p-6">
              <h2 className="text-lg font-bold">Reviews this week</h2>
              <p className="text-xs text-stone-500">
                New Google reviews per day for {displayName}
              </p>
              <div className="mt-4 flex h-36 items-end gap-2">
                {WEEK.map((d) => (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-1.5">
                    <span className="text-[11px] font-bold text-emerald-700">{d.v}</span>
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-emerald-700 to-emerald-500 transition-all"
                      style={{ height: `${(d.v / 8) * 100}%` }}
                    />
                    <span className="text-[11px] text-stone-500">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Settings + Send tools */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_2px_12px_rgba(28,25,23,0.05)] lg:p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <Settings2 className="h-5 w-5 text-emerald-700" /> Shop Settings
              </h2>
              <div className="mt-4 space-y-3">
                <label className="block">
                  <span className={labelCls}>Shop name</span>
                  <input value={shop} onChange={(e) => setShop(e.target.value)} className={inputCls} />
                </label>
                <label className="block">
                  <span className={labelCls}>City</span>
                  <input value={city} onChange={(e) => setCity(e.target.value)} className={inputCls} />
                </label>
                <label className="block">
                  <span className={labelCls}>Google review link</span>
                  <input
                    value={googleLink}
                    onChange={(e) => setGoogleLink(e.target.value)}
                    placeholder="https://g.page/r/… (your real review URL)"
                    className={inputCls}
                  />
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className={labelCls}>Owner email</span>
                    <input
                      value={ownerEmail}
                      onChange={(e) => setOwnerEmail(e.target.value)}
                      placeholder="you@shop.com"
                      className={inputCls}
                    />
                  </label>
                  <label className="block">
                    <span className={labelCls}>Owner phone</span>
                    <input
                      value={ownerPhone}
                      onChange={(e) => setOwnerPhone(e.target.value)}
                      placeholder="(512) 555-0100"
                      className={inputCls}
                    />
                  </label>
                </div>
                <button
                  onClick={markSaved}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-emerald-700"
                >
                  {savedTick ? (
                    <>
                      <Check className="h-4 w-4" /> Saved
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" /> Save Settings
                    </>
                  )}
                </button>
                <div>
                  <a
                    href={reviewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    Test my Google review link <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_2px_12px_rgba(28,25,23,0.05)] lg:p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <Send className="h-5 w-5 text-emerald-700" /> Send Tools
              </h2>
              <label className="mt-4 block">
                <span className={labelCls}>Job type for SMS</span>
                <input value={service} onChange={(e) => setService(e.target.value)} className={inputCls} />
              </label>
              <div className="mt-3 rounded-xl border border-stone-200 bg-stone-50 p-3 text-[13px] leading-relaxed text-stone-700">
                {buildSmsText({ shop: displayName, service, link: shareUrl })}
              </div>
              <button
                onClick={copySms}
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-emerald-700"
              >
                {smsCopied ? (
                  <>
                    <Check className="h-4 w-4" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copy SMS Text
                  </>
                )}
              </button>

              <div className="mt-5 border-t border-stone-200 pt-5">
                <p className="flex items-center gap-2 text-sm font-bold">
                  <QrCode className="h-4 w-4 text-emerald-700" /> Counter QR code
                </p>
                <div className="mt-3 flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrSrc}
                    alt={`QR code for ${displayName} review link`}
                    width={120}
                    height={120}
                    className="rounded-xl border border-stone-200 bg-white p-1"
                  />
                  <p className="text-xs leading-relaxed text-stone-600">
                    Print and place at checkout. Clients scan, rate, and finish
                    in 30 seconds.
                  </p>
                </div>
                <p className="mt-3 break-all rounded-lg bg-stone-900 px-3 py-2 font-mono text-[11px] text-emerald-300">
                  {shareUrl}
                </p>
                <div className="mt-3">
                  <ShareButtons
                    url={shareUrl}
                    title={`${displayName} — Review Funnel`}
                    text={`Rate your experience at ${displayName}:`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
