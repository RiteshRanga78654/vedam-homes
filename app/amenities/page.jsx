"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Navbar from "@/app/homepage/components/Header";
import Footer from "@/app/homepage/components/Footer";
import {
  FaLandmark,
  FaDumbbell,
  FaTree,
  FaSwimmer,
  FaUtensils,
  FaShieldAlt,
  FaGolfBall,
  FaTableTennis,
  FaSchool,
  FaCut,
  FaChild,
  FaBaseballBall,
  FaFutbol,
  FaConciergeBell,
  FaPrayingHands,
  FaHorse,
  FaStore,
  FaHospital,
  FaArchway,
} from "react-icons/fa";
import { MdOutlineSportsTennis } from "react-icons/md";

/* ================================================================
   1. TOP AMENITIES GRID DATA
================================================================ */
export const quickAmenities = [
  // Row 1
  { title: "Multiple Clubhouses", icon: FaLandmark },
  { title: "Multiple Gymnasium", icon: FaDumbbell },
  { title: "Acres of Greenery", icon: FaTree },
  { title: "Swimming Pools", icon: FaSwimmer },
  { title: "Multi-cuisine Restaurants", icon: FaUtensils },
  { title: "Multi-tier Security", icon: FaShieldAlt },
  { title: "Golf", icon: FaGolfBall },

  // Row 2
  { title: "Tennis Courts", icon: MdOutlineSportsTennis },
  { title: "Badminton Courts", icon: FaTableTennis },
  { title: "Vedanya Schools", icon: FaSchool },
  { title: "Salon", icon: FaCut },
  { title: "Kids Play Area", icon: FaChild },
  { title: "Cricket Stadium", icon: FaBaseballBall },
  { title: "Football", icon: FaFutbol },

  // Row 3
  { title: "Concierge", icon: FaConciergeBell },
  { title: "Spiritual Haven", icon: FaPrayingHands },
  { title: "Horse Riding", icon: FaHorse },
  { title: "Gazebo", icon: FaArchway },
  { title: "Upcoming Commercial", icon: FaStore },
  { title: "Upcoming Hospital", icon: FaHospital },
];

/* ================================================================
   2. DETAILED JOURNEY AMENITIES DATA
================================================================ */
export const amenities = [
  {
    id: "arrival",
    title: "SWIMMING POOL",
    desc: "Immerse yourself in the crystalline waters of our resort-style swimming pool, a haven of tranquility and rejuvenation that adds exceptional value to an investment property in Gurgaon. Lounge on plush sunbeds, sip refreshing beverages, and soak up the sun's warm embrace. Whether you seek a vigorous workout or a leisurely afternoon, our pool provides the perfect aquatic escape.",
    image: "/amenities-swimming.png",
  },
  {
    id: "pool",
    title: "Fitness Center",
    desc: "Elevate your well-being in our cutting-edge fitness center, featuring top-of-the-line equipment and personalized training programs. Stay motivated with panoramic views and a variety of classes, from invigorating cardio to restorative yoga. Achieve your fitness goals in a luxurious and inspiring environment.",
    image: "/amenities-gym.png",
  },
  {
    id: "clubhouse",
    title: "Clubhouse",
    desc: "Indulge in the exclusive ambiance of our grand clubhouse at Vedam Homes Central Park Flower Valley, a social hub for residents to connect, celebrate, and create lasting memories. Host private events in our elegant banquet hall, unwind in the comfortable lounge areas, or enjoy a friendly game of billiards. Our clubhouse offers a refined and sophisticated setting for every occasion.",
    image: "/amenities-clubhouse.png",
  },
  {
    id: "garden",
    title: "Landscaped Gardens",
    desc: "Escape to our meticulously manicured gardens, a verdant sanctuary designed for serene strolls and moments of peaceful reflection, perfectly complementing luxury apartments near GD Goenka University. Discover hidden pathways, admire the vibrant blooms, and breathe in the fresh, fragrant air. Our gardens provide a tranquil retreat from the city bustle, a place to reconnect with nature and find inner peace.",
    image: "/amenities-landscape.png",
  },
  {
    id: "play",
    title: "Children Play Area",
    desc: "Nurture your children's imagination and joy in our thoughtfully designed play area, a secure and stimulating environment that enhances the appeal of quality luxury real estate in Gurugram. Featuring age-appropriate equipment and soft, safe surfaces, our play area encourages active play, creativity, and social interaction. Let your little ones explore, discover, and create unforgettable childhood memories.",
    image: "/amenities-children.png",
  },
  {
    id: "security",
    title: "24/7 Security",
    desc: "Experience unparalleled peace of mind with our comprehensive 24/7 security at Central Park Flower Valley, ensuring a safe and secure environment for you and your loved ones. Our trained security personnel are vigilant and responsive, while our advanced surveillance systems provide an extra layer of protection. Your safety is our utmost priority.",
    image: "/amenities-security.png",
  },
  {
    id: "hall",
    title: "Multipurpose Hall",
    desc: "Host grand celebrations and memorable events in our versatile multipurpose hall, equipped to cater to your every need and enhancing the lifestyle appeal for those looking to buy luxury homes in Gurgaon near Sohna. From weddings and receptions to corporate gatherings and birthday parties, our spacious hall can be transformed to suit your specific requirements. Our dedicated event staff is on hand to assist with planning and execution, ensuring a seamless and unforgettable experience.",
    image: "/amenities-multi-hall.png",
  },
  {
    id: "outdoor",
    title: "Outdoor Sports Facilities",
    desc: "Embrace an active lifestyle with our premium outdoor sports facilities, including tennis courts, basketball courts, jogging tracks, and open fitness zones designed for recreation and friendly competition. Challenge your friends to a game, join a league, or simply enjoy a workout in the fresh air. Our outdoor sports facilities provide opportunities for residents of all ages to stay active and healthy.",
    image: "/amenities-outdoor.png",
  },
];

export default function VedamAmenities() {
  const containerRef = useRef(null);
  const circleRefs = useRef([]);
  const [pathD, setPathD] = useState("");
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });

  const recalculatePath = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const points = [];

    circleRefs.current.forEach((el) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        points.push({
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        });
      }
    });

    if (points.length < 2) return;

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const pCurrent = points[i];
      const pNext = points[i + 1];
      const midY = (pCurrent.y + pNext.y) / 2;
      d += ` C ${pCurrent.x} ${midY}, ${pNext.x} ${midY}, ${pNext.x} ${pNext.y}`;
    }

    setPathD(d);
    setSvgSize({
      w: containerRect.width,
      h: containerRect.height,
    });
  };

  useEffect(() => {
    recalculatePath();
    window.addEventListener("resize", recalculatePath);
    return () => window.removeEventListener("resize", recalculatePath);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <>
      <Navbar />
      <br />
      <br />
      <section className="relative w-full bg-canvas py-20 text-ink overflow-hidden transition-colors duration-500">
        {/* Top Amenities Grid */}
        <div className="max-w-7xl mx-auto px-6 mb-28">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-ink mb-16 tracking-wide">
            Amenities
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-y-12 gap-x-4 items-start justify-items-center">
            {quickAmenities.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.03 }}
                  className="flex flex-col items-center text-center group cursor-pointer w-full max-w-[140px]"
                >
                  <div className="text-ink/80 text-4xl sm:text-5xl mb-4 transition-all duration-300 group-hover:scale-110 group-hover:text-accent">
                    <IconComponent />
                  </div>
                  <span className="text-accent text-xs sm:text-[13px] font-medium leading-snug">
                    {item.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Middle Header */}
        <div className="max-w-4xl mx-auto px-6 mb-20 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-accent mb-3 block font-mono">
            The Journey
          </span>
          <h2 className="text-4xl sm:text-6xl font-light tracking-tight">
            Every amenity,{" "}
            <span className="italic font-display text-accent">one path</span>
          </h2>
        </div>

        {/* Flow Container (Zigzag Image Circle + Text Card) */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto px-6">
          {pathD && (
            <svg
              className="pointer-events-none absolute inset-0 z-0 h-full w-full"
              viewBox={`0 0 ${svgSize.w} ${svgSize.h}`}
              fill="none"
            >
              <path
                d={pathD}
                stroke="var(--border)"
                strokeOpacity={0.14}
                strokeWidth={2.5}
                strokeDasharray="8 8"
                strokeLinecap="round"
              />
              <motion.path
                d={pathD}
                stroke="var(--accent)"
                strokeWidth={3}
                strokeLinecap="round"
                style={{
                  pathLength: smoothProgress,
                }}
              />
            </svg>
          )}

          <div className="relative z-10 flex flex-col gap-28 md:gap-36">
            {amenities.map((item, index) => {
              const isImageLeft = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-14 ${
                    isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Circle Image Container */}
                  <div
                    ref={(el) => {
                      circleRefs.current[index] = el;
                    }}
                    className="relative shrink-0"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] rounded-full p-2 border-2 border-accent/40 shadow-[0_20px_60px_-25px_rgba(2,6,4,0.55)] bg-surface"
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-full border border-ink/10">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 300px, 350px"
                          className="object-cover transition-transform duration-700 hover:scale-110"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Rounded Rectangle Text Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isImageLeft ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full md:w-1/2"
                  >
                    <div className="relative rounded-3xl border border-ink/10 bg-surface/80 p-8 md:p-10 backdrop-blur-xl shadow-xl">
                      <span className="font-mono text-xs uppercase tracking-widest text-accent mb-3 block">
                        0{index + 1} &mdash; Feature
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">
                        {item.title}
                      </h3>
                      <p className="text-ink/65 text-base leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}