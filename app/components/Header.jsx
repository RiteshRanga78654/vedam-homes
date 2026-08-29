
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiListBold, PiXBold, PiArrowUpRightLight } from "react-icons/pi";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Insights", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-colors duration-500 ${
          scrolled ? "bg-ivory/95 backdrop-blur-md border-b border-line" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 lg:h-24 lg:px-10">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-3 shrink-0" data-cursor="">
            <div className="leading-none">
              <p
                className={`font-display text-lg tracking-[0.02em] transition-colors duration-500 lg:text-xl ${
                  scrolled ? "text-charcoal" : "text-ivory"
                }`}
              >
                Vedam
              </p>
              <p
                className={`mt-0.5 text-[9px] tracking-[0.4em] transition-colors duration-500 ${
                  scrolled ? "text-stone" : "text-ivory/60"
                }`}
              >
                HOMES
              </p>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`link-arrow transition-colors duration-500 ${
                  scrolled ? "text-charcoal/75 hover:text-charcoal" : "text-ivory/80 hover:text-ivory"
                }`}
              >
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href="#contact"
              className={`hidden items-center gap-2 border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-500 sm:inline-flex ${
                scrolled
                  ? "border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory"
                  : "border-ivory/60 text-ivory hover:bg-ivory hover:text-charcoal"
              }`}
            >
              View Properties
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={`p-2 transition-colors duration-500 lg:hidden ${
                scrolled ? "text-charcoal" : "text-ivory"
              }`}
            >
              <PiListBold size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile / overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[70] flex flex-col bg-charcoal"
          >
            <div className="flex h-20 items-center justify-between px-6 lg:h-24 lg:px-10">
              <span className="font-display text-lg text-ivory">Vedam Homes</span>
              <button onClick={() => setOpen(false)} className="p-2 text-ivory" aria-label="Close menu">
                <PiXBold size={24} />
              </button>
            </div>

            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
              className="flex flex-1 flex-col justify-center gap-1 px-6 lg:px-10"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-baseline gap-4 border-b border-line-dark py-4 sm:py-5"
                >
                  <span className="font-sans text-xs text-stone">0{i + 1}</span>
                  <span className="font-display text-3xl text-ivory transition-colors group-hover:text-bronze-light sm:text-5xl">
                    {link.label}
                  </span>
                  <PiArrowUpRightLight className="ml-auto text-ivory/40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={22} />
                </motion.a>
              ))}
            </motion.nav>

            <div className="flex flex-col gap-4 border-t border-line-dark px-6 py-8 text-sm text-ivory/60 sm:flex-row sm:items-center sm:justify-between lg:px-10">
              <p>+91 90909 60413 &nbsp;·&nbsp; info@vedamhomes.com</p>
              <div className="flex gap-5">
                <a href="#" className="hover:text-ivory transition-colors">Instagram</a>
                <a href="#" className="hover:text-ivory transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-ivory transition-colors">Facebook</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}