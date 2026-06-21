import React from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { translateFood, translateDesc } from "../utils/menuTranslations.js";

export default function MenuItem({ item, onAddToCart, onOpenDetails }) {
  const { language } = useLanguage();

  const getTranslatedBadge = (badge) => {
    if (!badge) return badge;
    if (badge === "SIGNATURE") return language === 'fr' ? "SIGNATURE" : "SIGNATURE";
    if (badge === "MUST TRY") return language === 'fr' ? "À ESSAYER" : "MUST TRY";
    if (badge === "NEW") return language === 'fr' ? "NOUVEAU" : "NEW";
    return badge;
  };

  return (
    <div 
      className="flex items-start gap-5 group cursor-pointer"
      onClick={() => onAddToCart && onAddToCart(item)}
    >
      {/* Thumbnail Image */}
      <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden relative">
        <img
          src={item.image}
          alt={translateFood(item.name, language)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Subtle dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
      </div>

      {/* Content Container */}
      <div className="flex-grow flex flex-col justify-center pt-1">
        {/* Top Row: Title, Badge, Dashed Line, Price */}
        <div className="flex items-baseline justify-between w-full mb-1.5">
          <div className="flex items-center gap-3">
            <h3 className="text-white font-serif text-lg tracking-wide group-hover:text-[#c29b57] transition-colors">
              {translateFood(item.name, language)}
            </h3>
            
            {/* Optional Badge (Seasonal/New) */}
            {item.badge && (
              <span className="bg-[#c29b57]/10 text-[#c29b57] text-[10px] tracking-widest px-1.5 py-0.5 uppercase border border-[#c29b57]/20">
                {getTranslatedBadge(item.badge)}
              </span>
            )}
          </div>

          {/* Flex-grow Dashed Line */}
          <div className="flex-grow border-b border-dashed border-gray-700 mx-4 relative top-[-4px]"></div>

          {/* Price & Hover '+' Icon Container */}
          <div className="relative flex flex-col items-end shrink-0 min-w-[60px]">
            <span className="text-[#c29b57] font-serif text-lg">
              {item.price}
            </span>
            <div className="absolute top-full right-0 mt-1 z-10">
              <div className="w-6 h-6 rounded-full bg-[#c29b57] text-zinc-950 flex items-center justify-center font-bold text-sm opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-[0_4px_12px_rgba(194,155,87,0.4)]">
                +
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-xs leading-relaxed max-w-[85%] font-sans font-light">
          {translateDesc(item.description, language)}
        </p>

        {/* Details button appearing only on hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails && onOpenDetails(item);
          }}
          className="mt-2.5 self-start text-[10px] tracking-widest text-[#c29b57] uppercase font-bold border border-[#c29b57]/30 hover:border-[#c29b57] hover:bg-[#c29b57]/10 px-3 py-1.5 rounded transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
        >
          {language === 'fr' ? "Détails" : "Details"}
        </button>
      </div>
    </div>
  );
}