import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { bakeryItems } from '../data/bakery_items.js';
import { cafeItems } from '../data/cafe_items.js';
import AnimatedMandalaButton from '../components/AnimatedMandalaButton';
import CustomButton from '../components/CustomButton.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

/**
 * MarqueeTrack component renders a seamless infinite horizontal scroll of images.
 * It duplicates the items and utilizes Framer Motion to animate translation.
 * Adding 'pr-6' to the flex wrapper acts as a spacer equal to 'gap-6' (24px)
 * ensuring pixel-perfect alignment and loop resetting.
 */
/**
 * MarqueeTrack component renders a seamless infinite horizontal scroll of images.
 * It utilizes hardware-accelerated CSS animations for 60fps performance on the compositor thread.
 */
const MarqueeTrack = ({ items, duration, reverse = false, className = '' }) => {
  return (
    <div className={`overflow-hidden flex w-full ${className}`}>
      <div
        className={`carousel-track-css ${reverse ? 'reverse' : ''}`}
        style={{ '--marquee-duration': `${duration}s` }}
      >
        {/* Render original list */}
        {items.map((item, index) => (
          <img
            key={`orig-${item.id || index}`}
            src={item.image}
            onError={(e) => {
              e.currentTarget.src = '/assets/images/placeholder.svg';
            }}
            alt={item.name || 'Menu item'}
            className="w-[150px] md:w-[250px] h-[150px] md:h-[250px] object-cover rounded-[20px] shrink-0 select-none pointer-events-none"
            loading="eager"
          />
        ))}
        {/* Render duplicate list for seamless wrapping */}
        {items.map((item, index) => (
          <img
            key={`dup-${item.id || index}`}
            src={item.image}
            onError={(e) => {
              e.currentTarget.src = '/assets/images/placeholder.svg';
            }}
            alt={item.name || 'Menu item'}
            className="w-[150px] md:w-[250px] h-[150px] md:h-[250px] object-cover rounded-[20px] shrink-0 select-none pointer-events-none"
            loading="eager"
          />
        ))}
      </div>
    </div>
  );
};

export default function HomeView() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  const handleMenuClick = () => {
    navigateTo('/menu');
  };

  // Prepare products for background carousel once upon mount to prevent re-shuffle on re-renders
  const mixedProducts = useMemo(() => {
    const combined = [...bakeryItems.slice(0, 15), ...cafeItems.slice(0, 15)];
    return combined.sort(() => 0.5 - Math.random());
  }, []);

  // Compute reversed products list for the middle reverse track
  const reversedProducts = useMemo(() => {
    return [...mixedProducts].reverse();
  }, [mixedProducts]);

  return (
    <div className="home-view bg-[#0b0f19] text-white min-h-screen">
      {/* Hero Section */}
      <section className="section hero-bg h-screen flex items-center relative overflow-hidden bg-[#0b0f19]">
        
        {/* Background Carousel */}
        <div className="absolute inset-[-100px] z-0 opacity-20 flex flex-col gap-6 rotate-[-5deg] scale-110 pointer-events-none">
          {/* Track 1 */}
          <MarqueeTrack items={mixedProducts} duration={40} />
          
          {/* Track 2 */}
          <MarqueeTrack items={reversedProducts} duration={50} reverse={true} className="ml-[-300px]" />
          
          {/* Track 3 */}
          <MarqueeTrack items={mixedProducts} duration={45} className="ml-[-150px]" />
        </div>

        <div className="container mx-auto px-4 z-10 relative flex flex-col items-center">
          <div className="animate-fade max-w-[800px] mx-auto text-center p-8 md:p-14 rounded-[32px] bg-slate-900/90 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-7xl leading-[1.1] mb-6 font-bold text-white uppercase">
              {language === "fr" ? (
                <>BIENVENUE<span className="text-brandOrange"> CHEZ INDIENNE CUISINE</span></>
              ) : (
                <>WELCOME<span className="text-brandOrange"> TO INDIENNE CUISINE</span></>
              )}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-medium mb-8 uppercase">
              {language === "fr" ? "LÀ OÙ LE GOÛT RENCONTRE LA TRADITION" : "WHERE TASTE MEETS TRADITION"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 z-10">
              <CustomButton 
                onClick={() => navigateTo('/menu')} 
                className="bg-brandOrange hover:bg-brandOrange/80 text-white hover:scale-105 transition-all duration-300"
              >
                {language === "fr" ? "Commander" : "Call for order"}
              </CustomButton>
              <CustomButton 
                onClick={() => navigateTo('/contact')} 
                className="bg-transparent border border-white/30 hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                {language === "fr" ? "Réserver une table" : "Reserve a table"}
              </CustomButton>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="glass absolute w-[200px] md:w-[400px] h-[200px] md:h-[400px] right-[-50px] md:right-[-100px] top-[10%] rounded-full bg-gradient-to-br from-brandOrange to-brandPurple blur-[60px] md:blur-[100px] opacity-25 pointer-events-none z-1"></div>
        <div className="glass absolute w-[150px] md:w-[300px] h-[150px] md:h-[300px] left-[-50px] md:left-[-100px] bottom-[10%] rounded-full bg-gradient-to-br from-[#38bdf8] to-[#818cf8] blur-[60px] md:blur-[100px] opacity-15 pointer-events-none z-1"></div>
      </section>

    
    </div>
  );
}
