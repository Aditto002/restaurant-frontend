import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedMandalaButton is a luxury, circular call-to-action button.
 * It features a repeating lotus mandala SVG outline border that rotates continuously.
 * On hover, the rotation speeds up, the gold border glows, and the central text scales up.
 * 
 * @param {string} label - The text displayed in the center of the button (e.g., "ORDER", "MENU").
 * @param {function} onClick - The click handler function.
 */
export default function AnimatedMandalaButton({ label = "ORDER", onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center w-[220px] h-[220px] bg-transparent border-0 outline-none focus:outline-none select-none group cursor-pointer"
    >
      {/* 1. Rotating Mandala SVG Outline */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{
          duration: isHovered ? 12 : 24, // Rotates faster on hover
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full text-[#B39868]"
          fill="none"
          stroke="currentColor"
        >
          <defs>
            {/* Inner Petal shape */}
            <path
              id="inner-petal"
              d="M 100,55 C 88,50 88,35 100,35 C 112,35 112,50 100,55 Z"
              strokeWidth="0.8"
            />
            {/* Outer Petal shape, slightly larger and interlaced */}
            <path
              id="outer-petal"
              d="M 100,42 C 76,32 76,14 100,14 C 124,14 124,32 100,42 Z"
              strokeWidth="0.5"
              opacity="0.8"
            />
          </defs>

          {/* Central base rings */}
          <circle cx="100" cy="100" r="46" strokeWidth="1.2" />
          <circle cx="100" cy="100" r="50" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.6" />
          
          {/* Inner Petal Ring (24 interlaced petals) */}
          {Array.from({ length: 24 }).map((_, i) => (
            <use
              key={`inner-${i}`}
              href="#inner-petal"
              transform={`rotate(${i * 15} 100 100)`}
            />
          ))}

          {/* Outer Petal Ring (24 interlaced petals offset by 7.5 degrees) */}
          {Array.from({ length: 24 }).map((_, i) => (
            <use
              key={`outer-${i}`}
              href="#outer-petal"
              transform={`rotate(${i * 15 + 7.5} 100 100)`}
            />
          ))}

          {/* Outer framing geometric rings */}
          <circle cx="100" cy="100" r="88" strokeWidth="0.6" strokeDasharray="4 2" opacity="0.5" />
          <circle cx="100" cy="100" r="91" strokeWidth="0.8" />
        </svg>
      </motion.div>

      {/* 2. Central Clickable Circle & Text */}
      <motion.div
        animate={{ scale: isHovered ? 1.12 : 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-[94px] h-[94px] rounded-full bg-zinc-950/90 border border-[#B39868]/40 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.8)] group-hover:border-[#B39868]/80 group-hover:shadow-[0_0_20px_rgba(179,152,104,0.3)] transition-all duration-350 z-10"
      >
        <span className="font-serif text-[#B39868] text-xs md:text-sm tracking-[0.25em] font-medium uppercase select-none transition-colors duration-300 group-hover:text-amber-100">
          {label}
        </span>
      </motion.div>
    </button>
  );
}
