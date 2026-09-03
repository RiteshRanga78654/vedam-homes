// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectFade, Mousewheel, Autoplay, Keyboard } from "swiper/modules";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   PiArrowUpRightLight, 
//   PiCaretLeftLight, 
//   PiCaretRightLight,
//   PiCompassLight,
// } from "react-icons/pi";
// import projects from "@/data/projects";

// import "swiper/css";
// import "swiper/css/effect-fade";

// export default function ProjectSlider() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [swiperInstance, setSwiperInstance] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const progressTimerRef = useRef(null);

//   const currentProject = projects[activeIndex] || projects[0];
//   const AUTOPLAY_DELAY = 6500;

//   // Continuous micro-progress bar driver for active slide
//   useEffect(() => {
//     setProgress(0);
//     const start = Date.now();
//     clearInterval(progressTimerRef.current);

//     progressTimerRef.current = setInterval(() => {
//       const elapsed = Date.now() - start;
//       const pct = Math.min((elapsed / AUTOPLAY_DELAY) * 100, 100);
//       setProgress(pct);
//       if (pct >= 100) clearInterval(progressTimerRef.current);
//     }, 40);

//     return () => clearInterval(progressTimerRef.current);
//   }, [activeIndex]);

//   return (
//     <section className="relative h-screen w-full bg-[#08080a] text-[#f4f2ed] select-none overflow-hidden font-sans">
      
//       {/* 1. Cinematic Background Layer with Smooth Subtle Scale */}
//       <div className="absolute inset-0 z-0">
//         <Swiper
//           modules={[EffectFade, Mousewheel, Autoplay, Keyboard]}
//           effect="fade"
//           fadeEffect={{ crossFade: true }}
//           speed={1800}
//           keyboard={{ enabled: true }}
//           mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
//           autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false }}
//           onSwiper={setSwiperInstance}
//           onSlideChange={(s) => setActiveIndex(s.realIndex)}
//           className="h-full w-full"
//         >
//           {projects.map((p, i) => (
//             <SwiperSlide key={p.id} className="relative h-full w-full overflow-hidden">
//               <div
//                 className={`h-full w-full transition-transform duration-[4500ms] ease-out will-change-transform ${
//                   activeIndex === i ? "scale-105" : "scale-100"
//                 }`}
//               >
//                 <img
//                   src={p.image}
//                   alt={p.name}
//                   className="h-full w-full object-cover filter brightness-[0.72] contrast-[1.1]"
//                 />
//               </div>

//               {/* Seamless Vignette & Dark Backing */}
//               <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/40 to-[#08080a]/60 pointer-events-none" />
//               <div className="absolute inset-0 bg-gradient-to-r from-[#08080a]/85 via-transparent to-[#08080a]/50 pointer-events-none" />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* 2. Precision Framing Hairlines */}
//       <div className="pointer-events-none absolute inset-0 z-10 border-x border-white/[0.06] mx-6 sm:mx-12 lg:mx-20" />
//       <div className="pointer-events-none absolute inset-x-0 top-20 z-10 border-t border-white/[0.06]" />
//       <div className="pointer-events-none absolute inset-x-0 bottom-24 z-10 border-b border-white/[0.06]" />

//       {/* 3. Main Foreground Stage */}
//       <div className="relative z-20 flex h-full flex-col justify-between px-8 sm:px-14 lg:px-24 py-8">
        
//         {/* Top Minimal Telemetry Strip */}
//         <header className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 pt-1">
//           <div className="flex items-center gap-3">
//             <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
//             <span className="text-white/80">Archival Series</span>
//             <span className="text-white/20">/</span>
//             <span>Index 2014—2026</span>
//           </div>

//           <div className="flex items-center gap-2">
//             <PiCompassLight size={13} className="text-amber-300" />
//             <span className="hidden sm:inline">Visakhapatnam, AP</span>
//             <span className="text-white/30 hidden sm:inline">•</span>
//             <span>17.6868° N, 83.2185° E</span>
//           </div>
//         </header>

//         {/* Central Content Area (Clean Split) */}
//         <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto py-8">
          
//           {/* Left Column: Project Identity & Specs */}
//           <div className="lg:col-span-8 space-y-5">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={currentProject.id}
//                 initial={{ opacity: 0, y: 25 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
//               >
//                 {/* Micro Category Tag */}
//                 <div className="flex items-center gap-3 font-mono text-xs text-amber-300 tracking-[0.25em] uppercase">
//                   <span>Plate 0{activeIndex + 1}</span>
//                   <span className="h-px w-8 bg-amber-300/40" />
//                   <span className="text-white/60">{currentProject.location}</span>
//                 </div>

//                 {/* Main Headline */}
//                 <h1 className="font-display mt-4 text-5xl sm:text-7xl lg:text-[5.5rem] font-light tracking-tight text-white leading-[0.98]">
//                   {currentProject.name}
//                 </h1>

//                 {/* Subtitle / Excerpt */}
//                 <p className="mt-5 max-w-xl text-sm sm:text-base font-light leading-relaxed text-white/65">
//                   {currentProject.description}
//                 </p>

//                 {/* Integrated Architectural Specs */}
//                 <div className="mt-8 flex flex-wrap items-center gap-8 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-wider text-white/50">
//                   <div>
//                     <span className="block text-[9px] text-white/30 tracking-[0.3em]">Typology</span>
//                     <span className="text-white/90 mt-0.5 block">{currentProject.type || "Private Residence"}</span>
//                   </div>
//                   <div className="h-6 w-px bg-white/10" />
//                   <div>
//                     <span className="block text-[9px] text-white/30 tracking-[0.3em]">Status</span>
//                     <span className="text-white/90 mt-0.5 block">{currentProject.status || "Commissioned"}</span>
//                   </div>
//                   <div className="h-6 w-px bg-white/10 hidden sm:block" />
//                   <div className="hidden sm:block">
//                     <span className="block text-[9px] text-white/30 tracking-[0.3em]">Scope</span>
//                     <span className="text-white/90 mt-0.5 block">Full Architecture &amp; Interior</span>
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Right Column: Discrete Controls & Primary CTA */}
//           <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end gap-6">
            
//             {/* Primary Action Button */}
//             <a
//               href={`#${currentProject.id}`}
//               className="group inline-flex items-center gap-4 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-500 hover:border-amber-300 hover:bg-amber-300 hover:text-[#08080a]"
//             >
//               <span>Explore Residence</span>
//               <PiArrowUpRightLight 
//                 size={15} 
//                 className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
//               />
//             </a>

//             {/* Stepper Navigation Pod */}
//             <div className="flex items-center gap-3 border border-white/10 rounded-full bg-black/40 p-1.5 backdrop-blur-md">
//               <button
//                 onClick={() => swiperInstance?.slidePrev()}
//                 aria-label="Previous plate"
//                 className="flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white active:scale-95"
//               >
//                 <PiCaretLeftLight size={17} />
//               </button>

//               <div className="font-mono text-xs tracking-widest text-white/80 px-3">
//                 <span>0{activeIndex + 1}</span>
//                 <span className="mx-1 text-white/25">/</span>
//                 <span className="text-white/40">0{projects.length}</span>
//               </div>

//               <button
//                 onClick={() => swiperInstance?.slideNext()}
//                 aria-label="Next plate"
//                 className="flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white active:scale-95"
//               >
//                 <PiCaretRightLight size={17} />
//               </button>
//             </div>

//           </div>
//         </main>

//         {/* Bottom Architectural Timeline Strip */}
//         <footer className="w-full">
//           <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6 border-t border-white/[0.08] pt-4">
//             {projects.map((p, idx) => {
//               const isCurrent = idx === activeIndex;
//               return (
//                 <button
//                   key={p.id}
//                   onClick={() => swiperInstance?.slideToLoop(idx)}
//                   className="group text-left focus:outline-none"
//                 >
//                   <div className="relative h-[2px] w-full bg-white/10 overflow-hidden">
//                     {isCurrent ? (
//                       <motion.div
//                         className="h-full bg-amber-400"
//                         style={{ width: `${progress}%` }}
//                       />
//                     ) : (
//                       <div className="h-full w-0 bg-white/40 transition-all duration-300 group-hover:w-full" />
//                     )}
//                   </div>
//                   <div className="mt-2 flex items-center justify-between font-mono text-[10px] tracking-wider">
//                     <span className={isCurrent ? "text-amber-300 font-semibold" : "text-white/30 group-hover:text-white/60"}>
//                       0{idx + 1}
//                     </span>
//                     <span className={`truncate max-w-[120px] ${isCurrent ? "text-white" : "text-white/25 group-hover:text-white/50"}`}>
//                       {p.name}
//                     </span>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         </footer>

//       </div>
//     </section>
//   );
// }