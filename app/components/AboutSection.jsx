'use client';

import { motion } from 'framer-motion';
import { Award, ShieldAlert, Leaf } from 'lucide-react';

const iconMap = {
  CustomerFirst: Award,
  Transparency: ShieldAlert,
  SustainableLiving: Leaf
};

export default function AboutSection() {
  const cards = [
    { title: 'Customer First', text: 'Tailored personal concierge services guiding dynamic post-sale structural modification requests.', iconName: 'CustomerFirst' },
    { title: 'Transparency', text: 'Escrow managed clear capital accounts backed by real-time construction stage reporting.', iconName: 'Transparency' },
    { title: 'Sustainable Living', text: 'Optimized net-zero energy design paradigms integrated into daily living structures.', iconName: 'SustainableLiving' }
  ];

  return (
    <section id="about" className="py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column - Large Premium Visual */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl group"
        >
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80"
            alt="Luxury Architecture"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>

        {/* Right Column - Text & Value Icons */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col space-y-8"
        >
          <div>
            <span className="text-sm uppercase tracking-widest font-bold text-[#B88A44]">About Us</span>
            <h2 className="text-4xl md:text-5xl font-light text-[#111111] tracking-tight mt-2 leading-tight">
              We Build Homes. <br />
              <span className="font-semibold">We Build Trust.</span>
            </h2>
            <p className="mt-4 text-gray-600 font-light leading-relaxed">
              For over a decade, our development company has sculpted structural landmarks across premier skylines. We unify architectural audacity with rigorous execution standards, setting unprecedented high-end modern residential benchmarks.
            </p>
          </div>

          {/* Icon Cards Stack */}
          <div className="flex flex-col space-y-4">
            {cards.map((card, idx) => {
              const IconComp = iconMap[card.iconName];
              return (
                <div
                  key={idx}
                  className="flex items-start space-x-4 bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-3 bg-[#FAF7F2] text-[#B88A44] rounded-xl shrink-0">
                    <IconComp size={24} />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#111111]">{card.title}</h4>
                    <p className="text-sm text-gray-500 font-light mt-1">{card.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}