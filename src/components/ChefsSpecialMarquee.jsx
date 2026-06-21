// src/components/ChefsSpecialMarquee.jsx
import React from "react";
import VideoCard from "./VideoCard";
import { chefVideos } from "../data/videoData";
import CustomButton from "./CustomButton";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function ChefsSpecialMarquee() {
  const { language } = useLanguage();
  // Duplicate videos enough times so that 50% of the track is wider than a 4K screen (3840px)
  // 1 set = 4 videos * ~364px = ~1456px.
  // 3 sets = ~4368px (wider than 4K). 
  // We need 6 sets total so that exactly 50% of the track perfectly mirrors the other 50%.
  const baseVideos = [...chefVideos, ...chefVideos, ...chefVideos];
  const duplicatedVideos = [...baseVideos, ...baseVideos];

  const handleMenuClick = () => {
    console.log("Navigating to the regular menu...");
  };

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] bg-zinc-950 overflow-hidden flex items-center py-10">

      {/* Static Text Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-serif font-bold uppercase tracking-widest drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] mb-4 text-center leading-tight">
          {language === "fr" ? (
            <>Spécialités<br />du Chef</>
          ) : (
            <>Indienne<br />Chefs Special</>
          )}
        </h1>
        <p className="text-yellow-600 text-sm md:text-base tracking-[0.5em] font-sans uppercase font-semibold drop-shadow-md">
          Angelo Brewing
        </p>
      </div>

      {/* ✅ Marquee wrapper — controls overflow, not the animation */}
      <div className="flex w-full overflow-hidden">
        {/*
          ✅ Key fix: Mathematically perfect loop
          - No gap or padding on the track container itself, to avoid miscalculating 50% width
          - margin-right on each item instead of gap, so (width + margin) is consistent
        */}
        <div
          className="flex"
          style={{
            width: "max-content",
            animation: "marquee-infinite 50s linear infinite",
            willChange: "transform",
          }}
        >
          {duplicatedVideos.map((video, index) => (
            <div key={`${video.id}-${index}`} className="mr-6">
              <VideoCard
                videoSrc={video.src}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Edge gradients */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-0 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-0 pointer-events-none" />
    </section>
  );
}
