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

// Static Hours Card to display current active menu timings
const HoursCard = memo(({ activeDay }) => {
  const { language } = useLanguage();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
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
  }, [activeDay]);

  const currentDayData = daysMenuData.find(d => d.day === activeDay);
  const timeDetails = currentDayData?.timeDetails;

  return (
    <div className="absolute -top-32 md:-top-40 mt-5 z-[60] flex flex-col items-center bg-white/5 backdrop-blur-2xl border border-white/15 rounded-2xl p-5 md:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.4)] w-56 md:w-64 pointer-events-none">
      {/* Decorative Top */}
      <div className="flex items-center gap-3 mb-5 w-full justify-center text-zinc-100">
        <span className="w-10 h-[1px] bg-[#c29b57]/40 relative">
          <div className="absolute -left-1.5 -top-[3px] w-2 h-2 border border-[#c29b57]/60 rotate-45 rounded-sm"></div>
        </span>
        <span className="font-serif tracking-[0.15em] text-sm md:text-base text-zinc-100 font-light">HOURS</span>
        <span className="w-10 h-[1px] bg-[#c29b57]/40 relative">
          <div className="absolute -right-1.5 -top-[3px] w-2 h-2 border border-[#c29b57]/60 rotate-45 rounded-sm"></div>
        </span>
      </div>

      {timeDetails && (
        <div className="w-full flex flex-col items-center font-sans">
          <span className="text-xs md:text-sm font-light tracking-wide text-zinc-100 mb-2">{timeDetails.topTitle}</span>
          
          <div className="w-full h-[1px] bg-white/10 mb-3"></div>
          
          <div className="w-full flex flex-col gap-1.5 mb-4">
            {timeDetails.topSchedules.map((schedule, idx) => (
              <div key={idx} className="flex justify-center w-full text-[11px] md:text-xs text-zinc-200">
                {schedule.label && <span className="font-semibold mr-2">{schedule.label}</span>}
                <span className="font-light">{schedule.time}</span>
              </div>
            ))}
          </div>
          
          <span className="text-xs md:text-sm font-light tracking-wide text-zinc-100 mb-2">{timeDetails.bottomTitle}</span>
          
          <div className="w-full h-[1px] bg-white/10 mb-3"></div>
          
          <div className="w-full flex flex-col gap-1.5 mb-1">
            {timeDetails.bottomSchedules.map((schedule, idx) => (
              <div key={idx} className="flex justify-center w-full text-[11px] md:text-xs text-zinc-200">
                {schedule.label && <span className="font-semibold mr-2">{schedule.label}</span>}
                <span className="font-light">{schedule.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

HoursCard.displayName = "HoursCard";

// Memoized DailyMenuCard — redesigned as a premium featured dish hero card
const DailyMenuCard = memo(({ day, diff, onClick, windowWidth, onAddToCheckout }) => {
  const { language } = useLanguage();
  const [hovered, setHovered] = useState(false);
  const isCenter = diff === 0;
  const isMobile = windowWidth < 640;

  // Responsive dimensions
  const getDimensions = () => {
    if (windowWidth < 640) return { w: 230, h: 340 };
    if (windowWidth < 768) return { w: 270, h: 390 };
    return { w: 330, h: 470 };
  };
  const { w, h } = getDimensions();

  const imgH = Math.round(h * 0.48);

  const handleClick = () => onClick(day.day);

  const handleAdd = (e) => {
    e.stopPropagation();
    if (onAddToCheckout) onAddToCheckout(day);
  };

  return (
    <motion.div
      custom={{ diff, windowWidth }}
      variants={cardVariants}
      animate="animate"
      onClick={handleClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="absolute cursor-pointer select-none will-change-transform"
      style={{ width: w, willChange: "transform, opacity" }}
    >
      {/* Card shell */}
      <div className="relative rounded-2xl overflow-hidden bg-[#111111] border border-white/8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col">

        {/* ── Image zone ── */}
        <div
          className="relative w-full overflow-hidden flex-shrink-0"
          style={{ height: imgH }}
        >
          {/* Dark gradient overlay so image blends into card */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#111111] z-10 pointer-events-none" />
          <img
            src={day.featuredImage}
            alt={day.featuredTitle}
            className="w-full h-full object-cover scale-105"
            loading="lazy"
          />
          {/* Day label badge */}
          <span className={`absolute top-2.5 left-2.5 z-20 bg-[#c29b57]/90 text-[#111] font-bold rounded-full px-2 py-0.5 uppercase tracking-wider leading-none ${isMobile ? "text-[8px]" : "text-[9px]"}`}>
            {day.day.replace(" menu", "")}
          </span>
        </div>

        {/* ── Text zone ── */}
        <div className="flex flex-col px-3.5 pb-3.5 pt-2 gap-1">
          {/* Title */}
          <h3 className={`font-bold text-white leading-tight ${isMobile ? "text-sm" : "text-base"}`}>
            {day.featuredTitle}
          </h3>

          {/* Description */}
          <p className={`text-zinc-400 leading-snug ${isMobile ? "text-[9px]" : "text-[11px]"}`} style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {day.featuredDesc}
          </p>

          {/* Price row + Add button */}
          <div className="flex items-center justify-between mt-1.5">
            <span className={`font-bold text-white ${isMobile ? "text-base" : "text-lg"}`}>
              {day.price}
            </span>

            {/* Add-to-checkout button */}
            <motion.button
              onClick={handleAdd}
              whileTap={{ scale: 0.9 }}
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
              transition={{ duration: 0.2 }}
              aria-label="Add to checkout"
              className={`relative w-8 h-8 rounded-lg border border-[#c29b57]/50 bg-[#1a1a1a] flex items-center justify-center overflow-hidden ${hovered ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              {/* Plus icon (shows on hover) */}
              <span className="absolute text-[#c29b57] font-bold text-xl leading-none">
                +
              </span>
            </motion.button>
          </div>
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

export default function MenuShowcase({ cart, setCart, setIsCartOpen }) {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState(() => {
    const init = getInitialTimerAndDay();
    return init.day;
  });
  
  // Responsive screen width listener for smooth vector transitions
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  const handleAddToCart = useCallback((item) => {
    if (!setCart) return;
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.item.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { item, quantity: 1 }];
    });
    if (setIsCartOpen) setIsCartOpen(true);
  }, [setCart, setIsCartOpen]);

  // Add the active card to checkout
  const handleAddToCheckout = useCallback((day) => {
    handleAddToCart({
      id: day.day,
      name: day.featuredTitle,
      price: day.price,
      image: day.featuredImage
    });
  }, [handleAddToCart]);

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
      <div className="relative z-10 w-full max-w-6xl px-4 border-t border-zinc-900/60 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full mx-auto mt-16">
          {COMPANION_MENUS.map((menu) => (
            <div
              key={menu.title}
              className="group relative rounded-[2.5rem] p-4 pr-6 border-[0.5px] border-white/20 bg-white/5 backdrop-blur-md shadow-2xl flex flex-row items-center overflow-visible transition-all duration-500 hover:border-white/40 hover:bg-white/10"
            >
              {/* Left Side: Overlapping Image */}
              <div className="w-32 h-32 md:w-44 md:h-44 shrink-0 relative -ml-6 md:-ml-10 z-10 drop-shadow-2xl">
                {/* Circular image mimicking a floating plate of food */}
                <img src={menu.image} alt={menu.title} className="w-full h-full object-cover rounded-full border-2 border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]" />
              </div>

              {/* Right Side: Content */}
              <div className="flex flex-col flex-1 pl-4 md:pl-6 py-2 text-left">
                <h3 className="font-sans font-bold text-white text-lg md:text-2xl mb-1.5 tracking-wide">
                  {getTranslatedCompanionTitle(menu.title)}
                </h3>
                <p className="text-zinc-300 text-[10px] md:text-xs leading-relaxed mb-4 max-w-[95%]">
                  {menu.description}
                </p>
                <div className="text-white font-bold text-lg md:text-xl mb-4 tracking-wider">
                  {menu.price}
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center mt-auto">
                  <button 
                    onClick={() => handleAddToCart({
                      id: menu.title,
                      name: getTranslatedCompanionTitle(menu.title),
                      price: menu.price,
                      image: menu.image
                    })}
                    className="bg-gradient-to-r from-[#c29b57] to-[#d4af37] hover:from-[#d4af37] hover:to-[#e5c158] text-[#111111] text-xs md:text-sm font-bold py-2 md:py-2.5 px-6 md:px-8 rounded-xl shadow-[0_4px_15px_rgba(194,155,87,0.3)] hover:shadow-[0_6px_20px_rgba(194,155,87,0.5)] transition-all duration-300 uppercase tracking-wider"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 3D Stack Carousel Container with "V" Layout */}
      <div className="relative w-full max-w-6xl h-[460px] sm:h-[560px] md:h-[640px] flex items-center justify-center overflow-visible mt-20 z-10 px-4">
        
        {/* Fixed Hours Info Card attached to the active center card */}
        <HoursCard activeDay={activeDay} />

        {daysMenuData.map((day, idx) => {
          const diff = getCircularOffset(idx, activeIndex, daysMenuData.length);
          return (
            <DailyMenuCard
              key={day.day}
              day={day}
              diff={diff}
              onClick={handleCardClick}
              windowWidth={windowWidth}
              onAddToCheckout={handleAddToCheckout}
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
