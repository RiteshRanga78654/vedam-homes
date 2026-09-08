"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PiPlayFill, PiPauseFill, PiSpeakerHighLight, PiSpeakerXLight } from "react-icons/pi";
import { project } from "@/app/project/data";
import { Reveal, SectionHeading } from "./common";

export default function ProjectExperience() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section id="experience" className="relative overflow-hidden bg-[#f4efe3] py-24 text-[#0d2b22] sm:py-32">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrowText="The Film"
            title="Watch the valley"
            accent="breathe."
          />
          <Reveal delay={0.2}>
            <p className="max-w-sm pb-2 text-sm font-light leading-relaxed text-[#0d2b22]/60">
              A cinematic walk through the township — gardens, architecture and
              the life between them.
            </p>
          </Reveal>
        </div>

        <Reveal y={40} className="mt-14">
          <div className="relative aspect-video overflow-hidden rounded-[30px] border border-[#0d2b22]/10 bg-[#0a221b] shadow-[0_50px_100px_-30px_rgba(10,34,27,0.55)]">
            <video
              ref={videoRef}
              src={project.heroVideo}
              poster="/flower-valley/building.png"
              playsInline
              preload="metadata"
              loop
              muted
              controls={false}
              className="h-full w-full object-cover"
              onClick={togglePlay}
            />

            {/* Poster blend when idle */}
            {!playing && (
              <Image
                src="/flower-valley/building.png"
                alt=""
                fill
                sizes="100vw"
                priority
                className="pointer-events-none object-cover"
              />
            )}

            {/* Overlay gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a221b]/70 via-transparent to-[#0a221b]/20" />

            {/* Center play button */}
            {!playing && (
              <motion.button
                type="button"
                onClick={togglePlay}
                aria-label="Play film"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#c6a15b] text-[#0a221b] shadow-[0_20px_60px_-10px_rgba(198,161,91,0.6)] transition-transform duration-500 hover:scale-110"
              >
                <PiPlayFill size={34} className="ml-1" />
              </motion.button>
            )}

            {/* Controls bar */}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 sm:p-7">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Pause film" : "Play film"}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#f4efe3]/30 bg-[#f4efe3]/10 text-[#f4efe3] backdrop-blur transition-colors duration-300 hover:bg-[#c6a15b] hover:text-[#0a221b]"
              >
                {playing ? <PiPauseFill size={18} /> : <PiPlayFill size={18} className="ml-0.5" />}
              </button>
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.26em] text-[#f4efe3]/80">
                <span>Central Park Flower Valley</span>
                <span className="h-1 w-1 rounded-full bg-[#c6a15b]" />
                <span>Film</span>
              </div>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#f4efe3]/30 bg-[#f4efe3]/10 text-[#f4efe3] backdrop-blur transition-colors duration-300 hover:bg-[#c6a15b] hover:text-[#0a221b]"
              >
                {muted ? <PiSpeakerXLight size={18} /> : <PiSpeakerHighLight size={18} />}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}