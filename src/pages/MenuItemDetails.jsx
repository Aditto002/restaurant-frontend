import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";
import { translateFood, translateDesc } from "../utils/menuTranslations.js";
import { ALL_MENU_ITEMS } from "./DeliciousMenu.jsx";

export default function MenuItemDetails({ cart, setCart, setIsCartOpen }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [modalQty, setModalQty] = useState(1);

  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const item = ALL_MENU_ITEMS.find((x) => x.id === parseInt(id));

  if (!item) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex flex-col items-center justify-center p-6 pt-32">
        <h2 className="text-2xl md:text-3xl font-serif text-[#c29b57] mb-4">
          {language === "fr" ? "Article non trouvé" : "Item Not Found"}
        </h2>
        <p className="text-gray-400 mb-8 max-w-md text-center">
          {language === "fr" 
            ? "Désolé, nous ne parvenons pas à trouver le plat que vous recherchez."
            : "Sorry, we couldn't find the menu item you are looking for."}
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="bg-[#c29b57] text-zinc-950 px-6 py-2.5 font-bold uppercase tracking-widest text-xs hover:bg-[#a68045] transition-all rounded-lg"
        >
          {language === "fr" ? "Retour au Menu" : "Back to Menu"}
        </button>
      </div>
    );
  }

  const getSpiciness = (foodItem) => {
    const name = foodItem.name.toLowerCase();
    const category = foodItem.category;
    if (category === "DRINKS & DESSERTS" || category === "FRESH & SIDES") {
      return "none";
    }
    if (name.includes("rogan josh") || name.includes("seekh") || name.includes("goan fish") || name.includes("madras")) {
      return "hot";
    }
    if (name.includes("tikka") || name.includes("masala") || name.includes("curry") || name.includes("biryani") || name.includes("samosa chaat")) {
      return "medium";
    }
    return "mild";
  };

  const getDietaryTags = (foodItem) => {
    const tags = [];
    if (foodItem.category === "VEGETARIAN") {
      tags.push(language === "fr" ? "Végétarien" : "Vegetarian");
    }
    const name = foodItem.name.toLowerCase();
    if (name.includes("naan") || name.includes("samosa") || name.includes("papadam")) {
      tags.push(language === "fr" ? "Contient du Gluten" : "Contains Gluten");
    } else {
      tags.push(language === "fr" ? "Sans Gluten" : "Gluten-Free");
    }
    if (name.includes("butter") || name.includes("paneer") || name.includes("kofta") || name.includes("korma") || name.includes("raita") || name.includes("rasmalai") || name.includes("kulfi") || name.includes("flambé") || name.includes("mousse")) {
      tags.push(language === "fr" ? "Contient du Lait" : "Contains Dairy");
    }
    return tags;
  };

  const handleAddSelectedToCart = () => {
    setCart((prevCart) => {
      const existing = prevCart.find((cartItem) => cartItem.item.id === item.id);
      if (existing) {
        return prevCart.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + modalQty }
            : cartItem
        );
      }
      return [...prevCart, { item, quantity: modalQty }];
    });
    setIsCartOpen(true);
  };

  const renderSpicinessBadges = (level) => {
    const label = level === "hot" ? t("hot") : level === "medium" ? t("medium") : level === "mild" ? t("mild") : t("spicinessNone");
    const color = level === "hot" ? "bg-red-500/10 text-red-500 border border-red-500/20" : level === "medium" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" : level === "mild" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-zinc-800 text-zinc-400 border border-zinc-700/50";
    return (
      <div className="flex items-center gap-2">
        <span className={`text-[10px] md:text-xs tracking-wider font-semibold uppercase px-2 py-0.5 rounded ${color}`}>
          {label}
        </span>
        <div className="flex items-center">
          {level === "hot" && <span className="text-red-500 text-base">🌶️🌶️🌶️</span>}
          {level === "medium" && <span className="text-amber-500 text-base">🌶️🌶️</span>}
          {level === "mild" && <span className="text-emerald-500 text-base">🌶️</span>}
          {level === "none" && <span className="text-emerald-600 text-base">🍃</span>}
        </div>
      </div>
    );
  };

  const calculateSubtotal = (priceStr, qty) => {
    const priceNum = parseFloat(priceStr.replace("$", ""));
    return `$${(priceNum * qty).toFixed(2)}`;
  };

  const getTranslatedCategoryName = (catId) => {
    switch (catId) {
      case "STARTERS": return t("starters");
      case "CHICKEN": return t("chicken");
      case "LAMB & SEAFOOD": return t("lambSeafood");
      case "VEGETARIAN": return t("vegetarian");
      case "BIRYANI & RICE": return t("biryaniRice");
      case "FRESH & SIDES": return t("freshSides");
      case "DRINKS & DESSERTS": return t("drinksDesserts");
      default: return catId;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col md:flex-row w-full relative overflow-hidden">
      
      {/* Left Column: 50% Image Column with overlay Brand elements */}
      <div className="w-full md:w-1/2 h-[55vh] md:h-screen relative flex flex-col items-center justify-between p-8 md:p-12 z-10 pt-24 md:pt-28">
        {/* Cover image background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 hover:scale-105"
          style={{ backgroundImage: `url(${item.image})` }}
        />
        {/* Dark gradient overlay to blend food highlights and logo visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/70 z-0" />

        {/* Brand Logo at the top center of the column */}
        <div className="relative z-10 flex flex-col items-center">
          <img 
            src="/logo.png" 
            alt="Indienne Cuisine Logo" 
            className="h-28 md:h-36 w-auto object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.85)]"
          />
        </div>

        {/* Halal Seal absolute positioned in the bottom-right corner of the column */}
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20">
          <img 
            src="/halal.png" 
            alt="Halal Certified Seal" 
            className="h-20 md:h-24 w-auto object-contain drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>

      {/* Right Column: 50% Content Details panel */}
      <div className="w-full md:w-1/2 min-h-[45vh] md:h-screen overflow-y-auto bg-[#0a0a0a] text-white p-6 md:p-16 pt-12 md:pt-32 flex flex-col justify-between relative z-10 border-t md:border-t-0 md:border-l border-white/5">
        {/* Food background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/food.png')] mix-blend-overlay z-0"></div>

        <div className="relative z-10 flex flex-col gap-6 md:gap-8">

          {/* Category Header with Gold underline like ENTRÉES in the picture */}
          <div className="flex flex-col gap-2 mt-4">
            <h4 className="text-[#c29b57] text-2xl md:text-3.5xl font-serif tracking-widest uppercase font-semibold">
              {getTranslatedCategoryName(item.category)}
            </h4>
            <div className="w-16 h-[2px] bg-[#c29b57]"></div>
          </div>

          {/* Title & Price Connected by Dotted/Dashed Line */}
          <div className="flex items-baseline justify-between w-full mt-4 flex-wrap sm:flex-nowrap gap-2">
            <h2 className="text-white text-2xl md:text-3xl font-serif font-bold uppercase tracking-wide">
              {translateFood(item.name, language)}
            </h2>
            <div className="hidden sm:block flex-grow border-b border-dashed border-[#c29b57]/20 mx-4 relative top-[-6px]"></div>
            <span className="text-[#c29b57] text-2xl md:text-3xl font-serif font-bold shrink-0">
              {item.price}
            </span>
          </div>

          {/* Optional Badge (SIGNATURE / MUST TRY etc.) */}
          {item.badge && (
            <div className="self-start bg-[#c29b57]/10 text-[#c29b57] text-[10px] tracking-widest px-2.5 py-1 uppercase font-bold border border-[#c29b57]/20 rounded">
              {item.badge === "MUST TRY" && language === "fr" ? "À ESSAYER" : item.badge === "NEW" && language === "fr" ? "NOUVEAU" : item.badge}
            </div>
          )}

          {/* Description */}
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans font-light mt-2 max-w-xl">
            {translateDesc(item.description, language)}
          </p>

          {/* Spiciness indicator */}
          <div className="flex flex-col gap-1.5 mt-4">
            <span className="text-gray-500 text-[10px] tracking-wider uppercase font-semibold">
              {t("spiciness")}
            </span>
            {renderSpicinessBadges(getSpiciness(item))}
          </div>

          {/* Dietary Info Tags */}
          <div className="flex flex-col gap-1.5 mt-4 mb-8">
            <span className="text-gray-500 text-[10px] tracking-wider uppercase font-semibold">
              {t("dietary")}
            </span>
            <div className="flex flex-wrap gap-2">
              {getDietaryTags(item).map((tag, idx) => (
                <span key={idx} className="bg-white/5 border border-white/10 text-slate-300 text-[10px] font-sans px-2.5 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Controls (Quantity Stepper & Cart Integration) */}
        <div className="relative z-10 pt-6 border-t border-white/5 flex flex-col gap-4 mt-auto">
          {/* Quantity selector */}
          <div className="flex items-center justify-between">
            <span className="text-white text-xs tracking-wider uppercase font-bold">
              {t("quantity")}
            </span>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-2 py-1 rounded-lg">
              <button
                onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                className="w-8 h-8 rounded-full border border-white/10 hover:border-[#c29b57] hover:text-[#c29b57] flex items-center justify-center text-white transition-all bg-transparent cursor-pointer font-bold outline-none"
              >
                -
              </button>
              <span className="text-white font-serif text-lg font-bold w-6 text-center select-none">
                {modalQty}
              </span>
              <button
                onClick={() => setModalQty(modalQty + 1)}
                className="w-8 h-8 rounded-full border border-white/10 hover:border-[#c29b57] hover:text-[#c29b57] flex items-center justify-center text-white transition-all bg-transparent cursor-pointer font-bold outline-none"
              >
                +
              </button>
            </div>
          </div>

          {/* Large CTA Add to Order */}
          <button
            onClick={handleAddSelectedToCart}
            className="w-full bg-[#c29b57] hover:bg-[#a68045] text-zinc-950 font-bold uppercase tracking-widest text-xs py-3.5 rounded-lg shadow-lg hover:shadow-[0_8px_20px_rgba(194,155,87,0.3)] transition-all duration-300 hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-[#c29b57]/20 outline-none"
          >
            <span>{t("addToOrder")}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-950/40"></span>
            <span>{calculateSubtotal(item.price, modalQty)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
