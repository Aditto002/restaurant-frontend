// src/components/ChefsSpecialMarquee.jsx
import React from "react";
import VideoCard from "../components/VideoCard";
import { chefVideos } from "../data/videoData";
import CustomButton from "../components/CustomButton";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function ChefsSpecialMarquee() {
  const { language } = useLanguage();
  const duplicatedVideos = [...chefVideos, ...chefVideos];
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
         {/* <CustomButton 
        onClick={handleMenuClick}
        className="absolute bottom-8 right-8 z-50 hover:scale-105"
        aria-label="View Regular Menu"
      >
        Regular Menu
      </CustomButton> */}
      </div>

      {/* ✅ Marquee wrapper — controls overflow, not the animation */}
      <div className="flex w-full overflow-hidden">
        {/*
          ✅ Key fix: CSS animation instead of framer-motion
          - will-change: transform  →  GPU layer promote করে, jank দূর করে
          - translateX(-50%)        →  original array এর width সরে যায়, তারপর reset
        */}
        <div
          className="flex gap-6 px-3"
          style={{
            width: "max-content",
            animation: "marquee 50s linear infinite",
            willChange: "transform",
          }}
        >
            
          {duplicatedVideos.map((video, index) => (
            <VideoCard
              key={`${video.id}-${index}`}
              videoSrc={video.src}
            />
          ))}
        </div>
      </div>

      {/* Edge gradients */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-0 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-0 pointer-events-none" />
    </section>
  );
}