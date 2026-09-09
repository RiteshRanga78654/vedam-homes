'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Fraunces, Work_Sans } from 'next/font/google';
import Navbar from '@/app/homepage/components/Header';
import Footer from '@/app/homepage/components/Footer';
import SmoothScroll from '@/app/homepage/components/SmoothScroll';
import {
  PiArrowUpRightLight,
  PiPhoneLight,
  PiEnvelopeLight,
  PiCheckBold
} from 'react-icons/pi';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
};

const INQUIRY_TYPES = [
  'Residential commission',
  'Private estate acquisition',
  'Commercial architecture',
  'General advisory'
];

const STUDIO_ROWS = [
  {
    label: 'Corporate office',
    value: 'Unit 1225, 12th Floor, JMD Megapolis, Sector 48, Gurugram, Haryana – 122018'
  },
  {
    label: 'Design studio',
    value: 'D-42, First Floor, Central Park Flower Valley, South of Gurugram'
  },
  { label: 'Response time', value: 'Within one business day, reviewed by a partner directly' },
];

const STUDIO_PHONES = ['+91 98715 34959', '+91 78382 39239'];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Residential commission',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // 3D tilt for the form card — follows the cursor, settles back on leave
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const cardRotateX = useTransform(cardY, [-160, 160], [7, -7]);
  const cardRotateY = useTransform(cardX, [-160, 160], [-7, 7]);

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cardX.set(e.clientX - rect.left - rect.width / 2);
    cardY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleCardMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Please tell us your name';
    if (!form.phone.trim()) errs.phone = 'Please share a phone number';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const response = await fetch('/api/v1/mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message || 'Private commission inquiry',
          requestHeading: `Vedam Homes inquiry — ${form.interest}`,
          keyRequest: form.interest,
          source: 'Contact page',
          interest: form.interest
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Something went wrong sending your message. Please call the studio directly.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SmoothScroll>
      <div
        className={`${fraunces.variable} ${workSans.variable} ${workSans.className} min-h-screen text-[#221D15] selection:bg-[#221D15] selection:text-[#EAE3D2]`}
        style={{ backgroundColor: 'var(--contact-canvas)' }}
      >
        <Navbar />

        {/* ── HERO ── */}
        <section className="pt-40 pb-16 px-6 lg:px-12 border-b border-[#221D15]/12">
          <div className="max-w-[1400px] mx-auto">
            <motion.div initial="hidden" animate="show" variants={staggerContainer} className="max-w-3xl">
              <motion.p
                variants={fadeUp}
                className={`${fraunces.className} italic text-lg text-[#22423F] mb-5`}
              >
                Studio inquiries
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className={`${fraunces.className} text-[42px] sm:text-6xl lg:text-[76px] font-light tracking-tight leading-[1.05] text-[#221D15]`}
              >
                A conversation before the first drawing.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-7 max-w-[52ch] text-base sm:text-lg font-light leading-relaxed text-[#221D15]/70"
              >
                Every Vedam residence starts with a discussion about site, light, and how you actually want to
                live. Reach the studio directly — your inquiry goes to a partner, not a call centre.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── STUDIO DETAILS + FORM ── */}
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* LEFT: studio spec block */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="lg:col-span-5 flex flex-col"
            >
              <motion.div variants={fadeUp} className="border border-[#221D15]/15">
                <div className="px-7 py-5 border-b border-[#221D15]/15">
                  <h3 className={`${fraunces.className} text-2xl font-light`}>Principal studio</h3>
                  <p className="text-sm text-[#221D15]/55 mt-1">Gurugram, Haryana</p>
                </div>

                {STUDIO_ROWS.map((row, i) => (
                  <div
                    key={row.label}
                    className={`px-7 py-5 ${i !== STUDIO_ROWS.length - 1 ? 'border-b border-[#221D15]/10' : ''}`}
                  >
                    <span className="block text-xs text-[#221D15]/50 mb-1.5">{row.label}</span>
                    <p className="text-[15px] leading-relaxed text-[#221D15]/85">{row.value}</p>
                    {row.aside && (
                      <span className="block text-xs text-[#221D15]/45 mt-1.5">{row.aside}</span>
                    )}
                  </div>
                ))}

                <div className="grid grid-cols-2 border-t border-[#221D15]/15">
                  <div className="px-7 py-5 border-r border-[#221D15]/15">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <PiPhoneLight size={17} className="text-[#96432B]" />
                      <span className="text-xs text-[#221D15]/50">Call the studio</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {STUDIO_PHONES.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/\s+/g, '')}`}
                          className="text-sm text-[#221D15]/85 hover:text-[#221D15] transition-colors"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                  <a
                    href="mailto:info@vedamhomes.com"
                    className="group flex flex-col justify-center gap-1.5 px-7 py-5 hover:bg-[#221D15]/[0.03] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <PiEnvelopeLight size={17} className="text-[#96432B]" />
                      <span className="text-xs text-[#221D15]/50">Email us</span>
                    </div>
                    <span className="text-sm text-[#221D15]/85 group-hover:text-[#221D15] truncate">info@vedamhomes.com</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT: form — 3D tilt card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: 1400 }}
              className="lg:col-span-7"
            >
              <motion.div
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                style={{
                  rotateX: cardRotateX,
                  rotateY: cardRotateY,
                  transformStyle: 'preserve-3d',
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
                className="relative overflow-hidden rounded-[32px] bg-[#F4EFE3] p-8 sm:p-12 shadow-[0_2px_4px_rgba(34,29,21,0.06),0_24px_48px_-12px_rgba(34,29,21,0.28)]"
              >
                {/* glass highlight, gives the card a lit, curved-glass feel */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/50 to-transparent" />

                {submitted ? (
                  <div className="relative py-14 text-center space-y-5">
                    <div className="h-14 w-14 rounded-full bg-[#22423F] text-[#F4EFE3] flex items-center justify-center mx-auto text-xl shadow-lg">
                      <PiCheckBold />
                    </div>
                    <h3 className={`${fraunces.className} text-3xl font-light`}>Message sent</h3>
                    <p className="max-w-md mx-auto text-[15px] font-light text-[#221D15]/70 leading-relaxed">
                      Thank you — we've received your inquiry. A partner will call or email you within one
                      business day.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#221D15]/25 px-6 py-3 text-sm text-[#221D15] hover:bg-[#221D15] hover:text-[#F4EFE3] transition-colors cursor-pointer"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="relative space-y-8">
                    <div>
                      <h3 className={`${fraunces.className} text-2xl sm:text-3xl font-light`}>
                        Tell us about your project
                      </h3>
                      <p className="text-sm text-[#221D15]/55 mt-2">
                        A few details help us route your inquiry to the right partner.
                      </p>
                    </div>

                    {/* Nature of project — rounded pill selector */}
                    <div>
                      <span className="block text-xs text-[#221D15]/50 mb-3">Nature of project</span>
                      <div className="flex flex-wrap gap-2">
                        {INQUIRY_TYPES.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setForm({ ...form, interest: type })}
                            className={`rounded-full px-4 py-2 text-sm transition-all cursor-pointer ${
                              form.interest === type
                                ? 'bg-[#22423F] text-[#F4EFE3] shadow-md'
                                : 'bg-[#221D15]/[0.05] text-[#221D15]/60 hover:bg-[#221D15]/[0.09]'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#221D15]/50 pl-1">Full name</label>
                        <input
                          type="text"
                          value={form.name}
                          placeholder="Your name"
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={`w-full rounded-2xl bg-[#221D15]/[0.045] px-5 py-3.5 text-[15px] text-[#221D15] placeholder-[#221D15]/30 outline-none transition-all focus:bg-white focus:shadow-[0_0_0_2px_rgba(34,66,63,0.35)] ${
                            errors.name ? 'shadow-[0_0_0_2px_rgba(150,67,43,0.45)]' : ''
                          }`}
                        />
                        {errors.name && <p className="text-xs text-[#96432B] pl-1">{errors.name}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs text-[#221D15]/50 pl-1">Phone number</label>
                        <input
                          type="tel"
                          value={form.phone}
                          placeholder="+91"
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className={`w-full rounded-2xl bg-[#221D15]/[0.045] px-5 py-3.5 text-[15px] text-[#221D15] placeholder-[#221D15]/30 outline-none transition-all focus:bg-white focus:shadow-[0_0_0_2px_rgba(34,66,63,0.35)] ${
                            errors.phone ? 'shadow-[0_0_0_2px_rgba(150,67,43,0.45)]' : ''
                          }`}
                        />
                        {errors.phone && <p className="text-xs text-[#96432B] pl-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-[#221D15]/50 pl-1">Email address</label>
                      <input
                        type="email"
                        value={form.email}
                        placeholder="you@domain.com"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={`w-full rounded-2xl bg-[#221D15]/[0.045] px-5 py-3.5 text-[15px] text-[#221D15] placeholder-[#221D15]/30 outline-none transition-all focus:bg-white focus:shadow-[0_0_0_2px_rgba(34,66,63,0.35)] ${
                          errors.email ? 'shadow-[0_0_0_2px_rgba(150,67,43,0.45)]' : ''
                        }`}
                      />
                      {errors.email && <p className="text-xs text-[#96432B] pl-1">{errors.email}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-[#221D15]/50 pl-1">Tell us about the site or project</label>
                      <textarea
                        rows={3}
                        value={form.message}
                        placeholder="Location, scale, timeline — whatever you have so far"
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full rounded-2xl bg-[#221D15]/[0.045] px-5 py-3.5 text-[15px] text-[#221D15] placeholder-[#221D15]/30 outline-none transition-all resize-none focus:bg-white focus:shadow-[0_0_0_2px_rgba(34,66,63,0.35)]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group w-full flex items-center justify-between rounded-2xl bg-[#22423F] px-7 py-4 text-sm font-medium text-[#F4EFE3] transition-all hover:bg-[#221D15] hover:shadow-lg disabled:opacity-50 cursor-pointer"
                    >
                      <span>{loading ? 'Sending…' : 'Send inquiry'}</span>
                      <PiArrowUpRightLight
                        size={17}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── MAP ── */}
        <section className="border-t border-[#221D15]/12 py-16 px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
              <h4 className={`${fraunces.className} text-2xl sm:text-3xl font-light`}>
                JMD Megapolis, Sector 48, Gurugram
              </h4>
              <a
                href="https://maps.google.com/?q=JMD+Megapolis+Sector+48+Gurugram"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-[#221D15]/70 hover:text-[#221D15] transition-colors"
              >
                Open in Google Maps
                <PiArrowUpRightLight size={14} />
              </a>
            </div>

            <div className="relative h-[320px] w-full border border-[#221D15]/15">
              <iframe
                src="https://www.google.com/maps?q=JMD+Megapolis,+Sector+48,+Gurugram,+Haryana+122018&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(45%) contrast(1.02) opacity(0.9)' }}
                allowFullScreen=""
                loading="lazy"
                title="Vedam Homes studio location"
              />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </SmoothScroll>
  );
}