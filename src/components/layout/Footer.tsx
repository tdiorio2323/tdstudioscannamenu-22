import React from "react";
import { Instagram, Mail, Dribbble } from "lucide-react";
import { LiquidButton } from "@/components/LiquidGlass";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative isolate bg-black text-zinc-300 border-t border-white/10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 -top-24 h-48 bg-[radial-gradient(40%_60%_at_50%_0%,rgba(10,87,255,0.18),transparent)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <a href="/" className="inline-flex items-center gap-2">
              <span className="text-white font-semibold tracking-wide">TD STUDIOS</span>
            </a>
            <p className="mt-3 text-sm text-zinc-400 max-w-md">
              Premium design for cannabis, packaging, and digital.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <SocialIcon href="https://instagram.com/tdstudiosny" label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="mailto:hello@tdstudiosny.com" label="Email">
                <Mail className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="https://dribbble.com/" label="Dribbble">
                <Dribbble className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>

          <nav className="md:col-span-4" aria-label="Footer">
            <div className="text-[11px] uppercase tracking-widest text-zinc-500">Site</div>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                ["Home", "/"],
                ["Shop", "/shop"],
                ["Websites", "/custom-websites"],
                ["Referral", "/referral"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={label as string}>
                  <a
                    href={href as string}
                    className="group inline-flex items-center justify-between gap-3 text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(10,87,255,0.45)] rounded"
                  >
                    <span>{label}</span>
                    <span className="h-px w-0 bg-white/50 transition-all duration-300 group-hover:w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <div className="text-[11px] uppercase tracking-widest text-zinc-500">Get in touch</div>
            <div className="mt-3 text-sm">
              <a className="hover:text-white" href="mailto:hello@tdstudiosny.com">
                hello@tdstudiosny.com
              </a>
              <p className="mt-1 text-zinc-400">NYC • Worldwide</p>
            </div>
            <LiquidButton asChild size="xl" className="mt-5 rounded-2xl text-white">
              <a href="/contact">Start your project</a>
            </LiquidButton>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {year} TD Studios • Premium design for cannabis, packaging, and digital</p>
          <ul className="flex items-center gap-4">
            <li><a className="hover:text-zinc-300" href="/privacy">Privacy</a></li>
            <li><a className="hover:text-zinc-300" href="/terms">Terms</a></li>
            <li><a className="hover:text-zinc-300" href="/sitemap">Sitemap</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="text-zinc-400 hover:text-white rounded-full p-2 ring-1 ring-white/10 hover:ring-white/30 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(10,87,255,0.45)]"
    >
      {children}
    </a>
  );
}
