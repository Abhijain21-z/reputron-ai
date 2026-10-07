import Link from "next/link";
import { Mail, MapPin, Sparkles } from "lucide-react";
import { NAV_LINKS } from "../lib/nav";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#020617]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white">
              REPUTRON<span className="text-emerald-400">.AI</span>
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            AI review automation and reputation management for US auto
            detailing, ceramic coating, and PPF businesses.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Product
          </p>
          <ul className="mt-3 space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-slate-300 transition-colors hover:text-emerald-300"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Built For
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>Auto Detailing Studios</li>
            <li>Ceramic Coating Specialists</li>
            <li>Paint Protection Film (PPF) Installers</li>
            <li>Car Wash &amp; Tint Shops</li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Contact
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-400" />
              jaintechsolution9@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-400" />
              Serving shops across the USA
            </li>
          </ul>
          <p className="mt-3 text-xs text-slate-500">Powered by Jain Tech Solution</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-slate-500 lg:px-6">
          © 2026 ReputronAI. Built for US Auto Detailing, Ceramic &amp; PPF
          Pros.
        </p>
      </div>
    </footer>
  );
}
