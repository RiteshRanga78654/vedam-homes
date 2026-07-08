'use client';

import { Mail, Phone, MapPin, ArrowUpRight, Instagram, Linkedin, Facebook, Youtube } from 'lucide-react';
import { navigationLinks } from '../data/mockData';

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] text-white pt-24 overflow-hidden">

      {/* Giant background wordmark */}
      <div className="absolute top-8 left-0 w-full flex justify-center pointer-events-none select-none">
        <span className="text-[18vw] leading-none font-bold tracking-tighter text-white/[0.03] whitespace-nowrap">
          ESTATEAVANT
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Hero CTA row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-16">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-[#B88A44] mb-5 font-medium">
              Estateavant &mdash; 2026
            </p>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.05]">
              Redefining <span className="italic text-[#D9B877]">luxury</span><br />
              living, one skyline at a time.
            </h2>
          </div>

          <a
            href="#contact"
            className="group shrink-0 flex items-center justify-between gap-8 w-full lg:w-72 border border-white/15 rounded-2xl px-6 py-5 hover:border-[#B88A44] hover:bg-[#B88A44]/10 transition-all duration-300"
          />
            <div>
              <div className="text-sm font-medium text-white">Book a Consultation</div>
              <div className="text-xs text-white/40 font-light mt-1">Response within 24 hours</div>
            </div>
            <span className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-[#B88A44] text-black group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight size={18} />
            </span>
          </a>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 py-16">

          {/* Nav links spread horizontally */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-6">
              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold text-white/40 mb-5">Explore</h4>
                <ul className="space-y-3">
                  {navigationLinks.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-sm text-white/70 hover:text-[#B88A44] transition-colors font-light">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold text-white/40 mb-5">Company</h4>
                <ul className="space-y-3">
                  {['About Us', 'Careers', 'Press', 'Sustainability'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm text-white/70 hover:text-[#B88A44] transition-colors font-light">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold text-white/40 mb-5">Follow</h4>
                <ul className="space-y-3">
                  {[
                    { name: 'Instagram', icon: Instagram },
                    { name: 'LinkedIn', icon: Linkedin },
                    { name: 'Facebook', icon: Facebook },
                    { name: 'YouTube', icon: Youtube },
                  ].map(({ name, icon: Icon }) => (
                    <li key={name}>
                      <a href="#" className="flex items-center gap-2 text-sm text-white/70 hover:text-[#B88A44] transition-colors font-light">
                        <Icon size={14} />
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Glass contact card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 h-full flex flex-col justify-between">
              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold text-[#B88A44] mb-6">Contact Desk</h4>
                <ul className="space-y-5">
                  <li>
                    <a href="tel:+1234567890" className="flex items-center gap-4 group">
                      <span className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 group-hover:border-[#B88A44] group-hover:bg-[#B88A44]/10 transition-all shrink-0">
                        <Phone size={15} className="text-[#B88A44]" />
                      </span>
                      <div>
                        <div className="text-xs text-white/40 font-light">Call us</div>
                        <div className="text-sm text-white group-hover:text-[#B88A44] transition-colors">+1 (234) 567-890</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:concierge@estateavant.com" className="flex items-center gap-4 group">
                      <span className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 group-hover:border-[#B88A44] group-hover:bg-[#B88A44]/10 transition-all shrink-0">
                        <Mail size={15} className="text-[#B88A44]" />
                      </span>
                      <div>
                        <div className="text-xs text-white/40 font-light">Email us</div>
                        <div className="text-sm text-white group-hover:text-[#B88A44] transition-colors">concierge@estateavant.com</div>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 shrink-0">
                      <MapPin size={15} className="text-[#B88A44]" />
                    </span>
                    <div>
                      <div className="text-xs text-white/40 font-light">Visit us</div>
                      <div className="text-sm text-white leading-snug mt-0.5">742 Premium Corporate Skytower, Financial Plaza, Core District</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 font-light">
          <div>&copy; 2026 ESTATEAVANT Development Enterprise. All Architectural Rights Reserved.</div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-[#B88A44] transition-colors">Privacy Framework</a>
            <a href="#" className="hover:text-[#B88A44] transition-colors">Terms of Operations</a>
          </div>
        </div>
      </div>
    </footer>
  );
}