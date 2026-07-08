"use client";

import { useState } from "react";
import {
  PiFacebookLogoLight,
  PiInstagramLogoLight,
  PiLinkedinLogoLight,
  PiYoutubeLogoLight,
  PiPhoneLight,
  PiEnvelopeLight,
  PiMapPinLight,
  PiArrowRightLight,
} from "react-icons/pi";

const QUICK_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Amenities", href: "#amenities" },
  { label: "Articles", href: "#articles" },
  { label: "Partners", href: "#partners" },
];

const SOCIALS = [
  { label: "Facebook", icon: PiFacebookLogoLight },
  { label: "Instagram", icon: PiInstagramLogoLight },
  { label: "LinkedIn", icon: PiLinkedinLogoLight },
  { label: "YouTube", icon: PiYoutubeLogoLight },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <footer id="csr" className="bg-dark text-white/60">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <svg width="30" height="30" viewBox="0 0 40 40" fill="none" className="text-primary-light">
              <path d="M20 3 L36 15 V36 H4 V15 Z" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M14 36 V22 H26 V36" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M9 15 L20 7 L31 15" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            <div className="leading-tight">
              <p className="font-display text-base font-semibold text-white">VEDAM</p>
              <p className="text-[9px] tracking-[0.3em] -mt-1">HOMES</p>
            </div>
          </div>
          <p className="mt-4 text-sm max-w-[220px]">
            Building better spaces, enriching lives — premium residential
            developments in prime locations.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-primary hover:text-white transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white tracking-wide">QUICK LINKS</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-primary-light transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white tracking-wide">CONTACT US</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <PiPhoneLight size={16} className="mt-0.5 shrink-0" />
              <a href="tel:+919090960413" className="hover:text-primary-light transition-colors">
                +91 90909 60413
              </a>
            </li>
            <li className="flex items-start gap-2">
              <PiEnvelopeLight size={16} className="mt-0.5 shrink-0" />
              <a href="mailto:info@vedamhomes.com" className="hover:text-primary-light transition-colors">
                info@vedamhomes.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <PiMapPinLight size={16} className="mt-0.5 shrink-0" />
              <span>
                D No. 10-3-44/2, 3rd Floor, Opp. Diamond Park, Dwaraka Nagar,
                Visakhapatnam, Andhra Pradesh 530016
              </span>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white tracking-wide">NEWSLETTER</p>
          <p className="mt-4 text-sm">
            Subscribe for the latest project updates and offers.
          </p>
          <form onSubmit={handleSubmit} className="mt-4 flex">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-l-xl bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="rounded-r-xl bg-primary px-4 text-white hover:bg-primary-light transition-colors"
            >
              <PiArrowRightLight size={18} />
            </button>
          </form>
          {submitted && (
            <p className="mt-2 text-xs text-primary-light">Thanks for subscribing!</p>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© 2024 Vedam Homes. All Rights Reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-primary-light transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-light transition-colors">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
