import React, { useState, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { daysMenuData, COMPANION_MENUS } from "../data/menuData";
import CustomButton from "./CustomButton";
import { useLanguage } from "../context/LanguageContext.jsx";
import { translateFood } from "../utils/menuTranslations.js";

// Order mapping for sequence rotation (covering all 7 days)
const DAYS_ORDER = [
  "Saturday menu",
  "Sunday menu",
  "Monday menu",
  "Tuesday menu",
  "Wednesday menu",
  "Thursday menu",
  "Friday menu"
];

// Helper to determine initial day on page load (reverts to today's day)
const getCurrentDayName = () => {
  const dayIndex = new Date().getDay();
  // Standard getDay() return values: 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday
  const dayMap = {
    0: "Sunday menu",
    1: "Monday menu",
    2: "Tuesday menu",
    3: "Wednesday menu",
    4: "Thursday menu",
    5: "Friday menu",
    6: "Saturday menu"
  };
  return dayMap[dayIndex] || "Saturday menu";
};

// Helper to format seconds into HH:MM:SS
const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [
    h.toString().padStart(2, "0"),
    m.toString().padStart(2, "0"),
    s.toString().padStart(2, "0")
  ].join(":");
};

// Helper for circular offsets in 7-card carousel
const getCircularOffset = (i, activeIndex, total) => {
  let diff = i - activeIndex;
  while (diff < -total / 2) diff += total;
  while (diff > total / 2) diff -= total;
  return diff;
};

// Configurable Timer (2 hours in milliseconds)
const TIMER_DURATION_SECONDS = 2 * 60 * 60;
const TIMER_DURATION_MS = TIMER_DURATION_SECONDS * 1000;

// Framer Motion Animation Variants using pure numeric spacing for hardware-acceleration (smoother)
// Refactored to implement the "V" shape layout with specific transitions and hardware acceleration.
const cardVariants = {
  animate: ({ diff, windowWidth }) => {
    const isMobile = windowWidth < 640;
    const isTablet = windowWidth >= 640 && windowWidth < 1024;
    
    // Spacing (horizontal spread) based on screen width
    let spacing = 240;
    if (isMobile) {
      spacing = 70;
    } else if (isTablet) {
      spacing = 150;
    }
    
    let x = diff * spacing;
    let y = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = 50;

    const absDiff = Math.abs(diff);

    if (isMobile) {
      if (absDiff === 0) {
        y = 10;
        scale = 1.0;
        opacity = 1;
        zIndex = 50;
      } else if (absDiff === 1) {
        y = -25;
        scale = 0.8;
        opacity = 0.7;
        zIndex = 40;
      } else {
        // Hide outer cards on mobile to avoid horizontal overflow
        y = -50;
        scale = 0.6;
        opacity = 0;
        zIndex = 20;
      }
    } else if (isTablet) {
      if (absDiff === 0) {
        y = 15;
        scale = 1.0;
        opacity = 1;
        zIndex = 50;
      } else if (absDiff === 1) {
        y = -45;
        scale = 0.85;
        opacity = 0.8;
        zIndex = 40;
      } else if (absDiff === 2) {
        y = -90;
        scale = 0.7;
        opacity = 0.4;
        zIndex = 30;
      } else {
        y = -120;
        scale = 0.55;
        opacity = 0;
        zIndex = 10;
      }
    } else {
      // Desktop
      if (absDiff === 0) {
        y = 20;
        scale = 1.0;
        opacity = 1;
        zIndex = 50;
      } else if (absDiff === 1) {
        y = -60;
        scale = 0.85;
        opacity = 0.8;
        zIndex = 40;
      } else if (absDiff === 2) {
        y = -120;
        scale = 0.7;
        opacity = 0.5;
        zIndex = 30;
      } else {
        // Outside of visible cards
        y = -160;
        scale = 0.55;
        opacity = 0;
        zIndex = 10;
      }
    }

    return {
      x,
      y,
      scale,
      opacity,
      zIndex,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 24,
        mass: 0.6
      }
    };
  }
};

// Intricate Corner Ornament SVG component
const CornerOrnament = memo(({ className }) => (
  <svg className={`absolute text-yellow-600/80 ${className}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M0,0 L20,0 M0,0 L0,20" />
    <path d="M3,3 L15,3 M3,3 L3,15" strokeWidth="0.6" />
    <circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none" />
  </svg>
));

CornerOrnament.displayName = "CornerOrnament";

// Top gold crown flourish
const GoldFlourish = memo(() => (
  <div className="flex items-center justify-center gap-1.5 text-yellow-500/70 py-1 w-full shrink-0">
    <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-yellow-500/40" />
    <svg className="w-5 h-3" viewBox="0 0 24 12" fill="currentColor">
      <path d="M12,0 L15,5 L19,3 L16,8 L12,6 L8,8 L5,3 L9,5 Z" />
      <circle cx="12" cy="10" r="1" />
    </svg>
    <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-yellow-500/40" />
  </div>
));

GoldFlourish.displayName = "GoldFlourish";

// Bottom gold flourish
const BottomFlourish = memo(() => (
  <div className="flex items-center justify-center gap-1.5 text-yellow-500/70 py-1 w-full shrink-0">
    <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-yellow-500/40" />
    <svg className="w-5 h-3 rotate-180" viewBox="0 0 24 12" fill="currentColor">
      <path d="M12,0 L15,5 L19,3 L16,8 L12,6 L8,8 L5,3 L9,5 Z" />
      <circle cx="12" cy="10" r="1" />
    </svg>
    <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-yellow-500/40" />
  </div>
));

BottomFlourish.displayName = "BottomFlourish";

// Independent countdown component to avoid parent component re-renders
const Countdown = memo(({ isCenter, duration }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isCenter) {
      return;
    }

    const updateTime = () => {
      try {
        const endTimeStr = localStorage.getItem("daily_menu_timer_end");
        if (endTimeStr) {
          const endTime = parseInt(endTimeStr, 10);
          const now = Date.now();
          setSeconds(Math.max(0, Math.ceil((endTime - now) / 1000)));
        }
      } catch (e) {
        console.error(e);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isCenter]);

  return (
    <div className={`mb-3.5 px-4 py-1.5 bg-black/80 backdrop-blur-sm border border-yellow-600/35 rounded-full text-xs font-mono text-yellow-500 tracking-wider flex items-center gap-2 shadow-xl transition-all duration-300 shrink-0 ${
      isCenter ? "opacity-100 scale-100" : "opacity-50 scale-90"
    }`}>
      <span className={`w-2 h-2 rounded-full ${isCenter ? "bg-green-500 animate-pulse" : "bg-zinc-600"}`} />
      <span>{isCenter ? formatTime(seconds) : formatTime(duration)}</span>
    </div>
  );
});

Countdown.displayName = "Countdown";

// Memoized DailyMenuCard to ensure animations are optimized and component is not needlessly re-rendered.
const DailyMenuCard = memo(({ day, diff, onClick, windowWidth }) => {
  const { t, language } = useLanguage();
  const isCenter = diff === 0;
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 768;

  const getTranslatedDay = (dayName) => {
    switch(dayName) {
      case "Saturday menu": return language === 'fr' ? "Menu du Samedi" : "Saturday menu";
      case "Sunday menu": return language === 'fr' ? "Menu du Dimanche" : "Sunday menu";
      case "Monday menu": return language === 'fr' ? "Menu du Lundi" : "Monday menu";
      case "Tuesday menu": return language === 'fr' ? "Menu du Mardi" : "Tuesday menu";
      case "Wednesday menu": return language === 'fr' ? "Menu du Mercredi" : "Wednesday menu";
      case "Thursday menu": return language === 'fr' ? "Menu du Jeudi" : "Thursday menu";
      case "Friday menu": return language === 'fr' ? "Menu du Vendredi" : "Friday menu";
      default: return dayName;
    }
  };

  // Responsive dimensions to ensure the specialties fit without vertical compression
  const getDimensions = () => {
    if (windowWidth < 640) return { w: 190, h: 280 };
    if (windowWidth < 768) return { w: 230, h: 335 };
    return { w: 290, h: 420 };
  };
  const { w, h } = getDimensions();

  const handleClick = () => {
    onClick(day.day);
  };

  return (
    <motion.div
      custom={{ diff, windowWidth }}
      variants={cardVariants}
      animate="animate"
      onClick={handleClick}
      className="absolute cursor-pointer rounded-2xl overflow-visible flex flex-col items-center select-none will-change-transform"
      style={{ width: w, height: h, willChange: "transform, opacity" }}
    >
      {/* Countdown Timer Badge */}
      <Countdown isCenter={isCenter} duration={day.duration} />

      {/* Card Body Container */}
      <div className="relative flex-1 w-full rounded-xl p-5 md:p-8 border border-yellow-600/50 bg-[#080808] shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-center items-center overflow-hidden">
        
        {/* Inner Gold Frame Border */}
        <div className="absolute inset-1.5 border border-yellow-600/20 rounded-lg pointer-events-none" />

        {/* Inner Gold Corner Ornaments */}
        <CornerOrnament className={`top-2 left-2 ${isMobile ? "w-3.5 h-3.5" : "w-5 h-5"}`} />
        <CornerOrnament className={`top-2 right-2 rotate-90 ${isMobile ? "w-3.5 h-3.5" : "w-5 h-5"}`} />
        <CornerOrnament className={`bottom-2 left-2 -rotate-90 ${isMobile ? "w-3.5 h-3.5" : "w-5 h-5"}`} />
        <CornerOrnament className={`bottom-2 right-2 rotate-180 ${isMobile ? "w-3.5 h-3.5" : "w-5 h-5"}`} />

        {/* Top Flourish */}
        <div className="shrink-0 w-full">
          <GoldFlourish />
        </div>

        {/* Day Header */}
        <h3 className={`shrink-0 font-serif font-bold text-[#d4af37] tracking-[0.2em] uppercase text-center mt-2.5 mb-2.5 md:mb-4 ${
          isMobile ? "text-base" : isTablet ? "text-xl" : "text-2xl"
        }`}>
          {getTranslatedDay(day.day)}
        </h3>

        {/* Specialties List */}
        <ul className={`flex flex-col w-full max-w-[85%] md:max-w-[80%] shrink-0 ${isMobile ? "gap-2" : "gap-3"}`}>
          {day.specialties.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2.5 text-left">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-yellow-500/90 shadow-[0_0_8px_rgba(234,179,8,0.6)] shrink-0" />
              <span className={`font-sans font-semibold text-zinc-100 uppercase tracking-wider truncate
                ${isMobile ? "text-[9px]" : "text-xs md:text-sm"}`}>
                {translateFood(item, language)}
              </span>
            </li>
          ))}
        </ul>

        {/* Bottom Flourish */}
        <div className="shrink-0 w-full mt-2.5">
          <BottomFlourish />
        </div>
      </div>
    </motion.div>
  );
});

DailyMenuCard.displayName = "DailyMenuCard";

// Helper to initialize or restore timer and active day on mount
const getInitialTimerAndDay = () => {
  try {
    const savedEndTimeStr = localStorage.getItem("daily_menu_timer_end");
    const savedActiveDay = localStorage.getItem("daily_menu_active_day");
    
    const todayDay = getCurrentDayName();
    const todayObj = daysMenuData.find(d => d.day === todayDay) || daysMenuData[0];
    
    if (!savedEndTimeStr || !savedActiveDay) {
      // No saved timer, start fresh with today
      const endTime = Date.now() + todayObj.duration * 1000;
      localStorage.setItem("daily_menu_active_day", todayDay);
      localStorage.setItem("daily_menu_timer_end", endTime.toString());
      return { day: todayDay };
    }
    
    let endTime = parseInt(savedEndTimeStr, 10);
    let activeDayName = savedActiveDay;
    const now = Date.now();
    
    if (now < endTime) {
      // Saved timer has not expired yet
      return { day: activeDayName };
    }
    
    // Timer expired while app was closed, calculate how many steps to advance
    let elapsedMs = now - endTime;
    let activeIdx = DAYS_ORDER.indexOf(activeDayName);
    if (activeIdx === -1) activeIdx = DAYS_ORDER.indexOf(todayDay);
    
    while (true) {
      activeIdx = (activeIdx + 1) % DAYS_ORDER.length;
      const nextDayName = DAYS_ORDER[activeIdx];
      const nextDayObj = daysMenuData.find(d => d.day === nextDayName) || { duration: 7200 };
      const durationMs = nextDayObj.duration * 1000;
      
      if (elapsedMs < durationMs) {
        const newEndTime = now + (durationMs - elapsedMs);
        localStorage.setItem("daily_menu_active_day", nextDayName);
        localStorage.setItem("daily_menu_timer_end", newEndTime.toString());
        return { day: nextDayName };
      }
      
      elapsedMs -= durationMs;
    }
  } catch (e) {
    console.error("Error restoring initial timer:", e);
    const todayDay = getCurrentDayName();
    return { day: todayDay };
  }
};

export default function MenuShowcase() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState(() => {
    const init = getInitialTimerAndDay();
    return init.day;
  });
  
  // Responsive screen width listener for smooth vector transitions
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  // State to hold dynamically loaded companion menus data
  const [companionMenus, setCompanionMenus] = useState([]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load companion menus from static import
  useEffect(() => {
    setCompanionMenus(COMPANION_MENUS || []);
  }, []);

  const activeIndex = DAYS_ORDER.indexOf(activeDay);

  // Silent timer check in parent to handle activeDay transitions upon expiration (no second-by-second re-renders)
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const endTimeStr = localStorage.getItem("daily_menu_timer_end");
        if (!endTimeStr) return;
        
        const endTime = parseInt(endTimeStr, 10);
        const now = Date.now();
        
        if (now >= endTime) {
          // Timer expired: switch to the next day in sequence
          setActiveDay((currentDay) => {
            const currentIndex = DAYS_ORDER.indexOf(currentDay);
            const nextIndex = (currentIndex + 1) % DAYS_ORDER.length;
            const nextDayName = DAYS_ORDER[nextIndex];
            
            // Look up duration of the next day
            const nextDayObj = daysMenuData.find(d => d.day === nextDayName);
            const nextDuration = nextDayObj ? nextDayObj.duration : 7200;
            
            const elapsed = now - endTime;
            // Set the new end time for the next day, adjusting for elapsed scheduling delay
            const newEndTime = now + (nextDuration * 1000) - elapsed;
            
            localStorage.setItem("daily_menu_active_day", nextDayName);
            localStorage.setItem("daily_menu_timer_end", newEndTime.toString());
            
            return nextDayName;
          });
        }
      } catch (e) {
        console.error("Timer tick error:", e);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Stable card click handler (resets target timer to selected day's duration)
  const handleCardClick = useCallback((dayName) => {
    setActiveDay(dayName);
    try {
      const clickedDayObj = daysMenuData.find(d => d.day === dayName);
      if (clickedDayObj) {
        const endTime = Date.now() + clickedDayObj.duration * 1000;
        localStorage.setItem("daily_menu_active_day", dayName);
        localStorage.setItem("daily_menu_timer_end", endTime.toString());
      }
    } catch (e) {
      console.error("Failed to reset timer on card click:", e);
    }
  }, []);

  const getTranslatedCompanionTitle = (title) => {
    if (title === "Drinks Menu" || title === "Drinks") return language === 'fr' ? "Carte des Boissons" : "Drinks Menu";
    if (title === "Appetizers Menu" || title === "Appetizers") return language === 'fr' ? "Carte des Entrées" : "Appetizers Menu";
    return title;
  };

  return (
    <section className="min-h-screen bg-zinc-950 text-white py-24 px-4 flex flex-col items-center justify-center font-serif overflow-hidden relative w-full">
      {/* Subtle luxury radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-zinc-950 to-zinc-950 z-0 pointer-events-none"></div>

      {/* Center Header Block */}
      <div className="text-center mb-10 flex flex-col items-center relative z-10">
        <h2 className="text-xs md:text-sm tracking-[0.4em] text-yellow-600 uppercase mb-3 font-sans">
          {language === "fr" ? "DES SAVEURS POUR LA ROYAUTÉ" : "FLAVORS FOR ROYALTY"}
        </h2>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-wide mb-6 uppercase text-yellow-55 leading-tight">
          {language === "fr" ? "Notre Menu du Jour" : "Our Day Menu"}
        </h1>
        <p className="text-slate-400 text-xs md:text-sm max-w-md font-sans mb-8 leading-relaxed">
          {language === "fr" ? "Découvrez l'excellence culinaire préparée par des maîtres chefs avec des ingrédients de qualité supérieure." : "Experience culinary excellence crafted by master chefs using premium ingredients to create royal tastes."}
        </p>
      </div>   
       {/* Companion Cards Section: Drinks & Appetizers */}
      <div className="relative z-10 w-full max-w-5xl px-4 border-t border-zinc-900/60 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto mt-16">
          {companionMenus.map((menu) => (
            <div
              key={menu.title}
              className="group relative rounded-2xl p-6 md:p-8 border border-yellow-600/30 bg-[#080808] shadow-2xl flex flex-col justify-center items-center overflow-hidden transition-all duration-500 hover:border-yellow-600/60 hover:scale-[1.01] hover:shadow-[0_15px_40px_rgba(234,179,8,0.1)]"
            >
              {/* Inner Gold Frame Border */}
              <div className="absolute inset-2 border border-yellow-600/20 rounded-lg pointer-events-none" />

              {/* Inner Gold Corner Ornaments */}
              <CornerOrnament className="top-2.5 left-2.5 w-4 h-4" />
              <CornerOrnament className="top-2.5 right-2.5 rotate-90 w-4 h-4" />
              <CornerOrnament className="bottom-2.5 left-2.5 -rotate-90 w-4 h-4" />
              <CornerOrnament className="bottom-2.5 right-2.5 rotate-180 w-4 h-4" />

              {/* Top Flourish */}
              <div className="shrink-0 w-full mb-1">
                <GoldFlourish />
              </div>

              {/* Main Centered Title */}
              <h3 className="shrink-0 font-serif font-bold text-[#d4af37] tracking-[0.2em] uppercase text-center text-lg md:text-xl my-2 z-10">
                {getTranslatedCompanionTitle(menu.title)}
              </h3>

              {/* Menu Items Grid (2 Columns) */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 w-full max-w-[90%] z-10 my-2">
                {menu.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-left">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/90 shadow-[0_0_8px_rgba(234,179,8,0.6)] shrink-0" />
                    <span className="font-sans font-semibold text-zinc-100 uppercase tracking-wider text-[9px] md:text-xs truncate">
                      {translateFood(item, language)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Flourish */}
              <div className="shrink-0 w-full mt-1">
                <BottomFlourish />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 3D Stack Carousel Container with "V" Layout */}
      <div className="relative w-full max-w-5xl h-[380px] sm:h-[450px] md:h-[520px] flex items-center justify-center overflow-visible mt-4 z-10 px-4">
        {daysMenuData.map((day, idx) => {
          const diff = getCircularOffset(idx, activeIndex, daysMenuData.length);
          return (
            <DailyMenuCard
              key={day.day}
              day={day}
              diff={diff}
              onClick={handleCardClick}
              windowWidth={windowWidth}
            />
          );
        })}
      </div>

      {/* CTA Button */}
      <div className="mt-12 z-10 flex justify-center">
        <CustomButton
          onClick={() => navigate("/menu")}
          className="bg-brandOrange hover:bg-brandOrange/80 text-white font-sans tracking-widest px-10 py-4 text-sm hover:scale-105 transition-all duration-300 shadow-[0_10px_25px_rgba(234,88,12,0.3)]"
        >
          {t("orderNow").toUpperCase()}
        </CustomButton>
      </div>
      
    </section>
  );
}
