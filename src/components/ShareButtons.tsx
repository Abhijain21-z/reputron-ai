"use client";

import { useState } from "react";
import { Check, Copy, Mail, MessageCircle, Share2, Smartphone } from "lucide-react";

type Props = {
  url: string;
  title: string;
  text: string;
};

export default function ShareButtons({ url, title, text }: Props) {
  const [copied, setCopied] = useState(false);
  const canNative =
    typeof navigator !== "undefined" && "share" in navigator;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title, text, url });
    } catch {
      /* user cancelled */
    }
  };

  const encoded = encodeURIComponent(`${text} ${url}`);
  const wa = `https://wa.me/?text=${encoded}`;
  const sms = `sms:?&body=${encoded}`;
  const mail = `mailto:?subject=${encodeURIComponent(title)}&body=${encoded}`;

  const btn =
    "inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-xs font-bold text-stone-900 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-600 hover:bg-emerald-50 active:translate-y-0";

  return (
    <div className="flex flex-wrap gap-2">
      {canNative && (
        <button onClick={nativeShare} className={btn}>
          <Share2 className="h-4 w-4 text-emerald-700" /> Share
        </button>
      )}
      <a href={wa} target="_blank" rel="noreferrer" className={btn}>
        <MessageCircle className="h-4 w-4 text-emerald-700" /> WhatsApp
      </a>
      <a href={sms} className={btn}>
        <Smartphone className="h-4 w-4 text-emerald-700" /> SMS
      </a>
      <a href={mail} className={btn}>
        <Mail className="h-4 w-4 text-emerald-700" /> Email
      </a>
      <button onClick={copy} className={btn}>
        {copied ? (
          <>
            <Check className="h-4 w-4 text-emerald-700" /> Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 text-emerald-700" /> Copy Link
          </>
        )}
      </button>
    </div>
  );
}
