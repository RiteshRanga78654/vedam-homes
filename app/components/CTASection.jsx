'use client';

import { motion } from 'framer-motion';
import { Briefcase, Building2 } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Work With Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6 hover:bg-white/10 transition-colors duration-300"
        >
          <div className="p-4 bg-[#B88A44] rounded-xl text-white">
            <Briefcase size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-semibold tracking-wide">Work With Us</h3>
            <p className="text-sm text-gray-400 font-light mt-2 max-w-sm leading-relaxed">
              Join an industry-leading engineering development firm pushing benchmarks in global custom luxury construction.
            </p>
            <button className="mt-6 bg-white text-[#111111] hover:bg-[#B88A44] hover:text-white px-6 py-3 rounded-xl text-sm font-semibold tracking-wide transition-colors duration-300">
              Explore Careers
            </button>
          </div>
        </motion.div>

        {/* Partner With Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6 hover:bg-white/10 transition-colors duration-300"
        >
          <div className="p-4 bg-[#B88A44] rounded-xl text-white">
            <Building2 size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-semibold tracking-wide">Partner With Us</h3>
            <p className="text-sm text-gray-400 font-light mt-2 max-w-sm leading-relaxed">
              Align joint-venture capital or premium landowner parameters with our transparent enterprise development network.
            </p>
            <button className="mt-6 bg-[#B88A44] hover:bg-[#a37939] text-white px-6 py-3 rounded-xl text-sm font-semibold tracking-wide transition-colors duration-300">
              Become Partner
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}