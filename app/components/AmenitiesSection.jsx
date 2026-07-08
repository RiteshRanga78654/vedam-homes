'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Box, Compass, Globe, Eye, Users, Trees } from 'lucide-react';

const iconSelector = {
  1: Shield,
  2: Zap,
  3: Box,
  4: Compass,
  5: Globe,
  6: Eye,
  7: Users,
  8: Trees
};

export default function AmenitiesSection() {
  const amenities = [
    { id: 1, title: '24x7 Security' },
    { id: 2, title: 'Power Backup' },
    { id: 3, title: 'Elevator Lounges' },
    { id: 4, title: 'Secure Parking' },
    { id: 5, title: 'Rainwater Harvesting' },
    { id: 6, title: 'Smart CCTV Networks' },
    { id: 7, title: 'The Club House' },
    { id: 8, title: 'Landscape Gardens' }
  ];

  return (
    <section id="amenities" className=" bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="text-sm uppercase tracking-widest font-bold text-[#B88A44]">Resort Lifestyle</span>
        <h2 className="text-4xl font-light text-[#111111] tracking-tight mt-2 mb-16">Curated Elite Amenities</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {amenities.map((item) => {
            const SelectedIcon = iconSelector[item.id];
            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -8 }}
                className="bg-white border border-gray-100 p-8 rounded-2xl flex flex-col items-center shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="p-4 bg-[#FAF7F2] rounded-full text-[#B88A44] mb-4">
                  <SelectedIcon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold tracking-wide text-[#111111]">{item.title}</h3>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Fully Maintained</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}