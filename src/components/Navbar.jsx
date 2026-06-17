import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import { translateFood } from "../utils/menuTranslations.js";

export default function Navbar({ cart = [], setCart, isCartOpen, setIsCartOpen }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleIncrement = (itemId) => {
    if(!setCart) return;
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.item.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const handleDecrement = (itemId) => {
    if(!setCart) return;
    setCart((prevCart) =>
      prevCart.map((cartItem) => {
        if (cartItem.item.id === itemId) {
          const newQty = cartItem.quantity - 1;
          return newQty > 0 ? { ...cartItem, quantity: newQty } : null;
        }
        return cartItem;
      }).filter(Boolean)
    );
  };

  const handleRemove = (itemId) => {
    if(!setCart) return;
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.item.id !== itemId)
    );
  };

  const subtotal = useMemo(() => {
    return cart?.reduce((total, cartItem) => {
      const priceNum = parseFloat(cartItem.item.price.replace(/[^0-9.]/g, "")) || 0;
      return total + priceNum * cartItem.quantity;
    }, 0) || 0;
  }, [cart]);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Menu", path: "/menu" },
    // { name: "Gallery", path: "/#gallery" },
    { name: "Contact Us", path: "/contact" },
  ];

  // Dynamically determine the active link based on current path
  let activeLink = "Home";
  if (location.pathname === "/menu") {
    activeLink = "Menu";
  } else if (location.pathname === "/about") {
    activeLink = "About Us";
  } else if (location.pathname === "/contact") {
    activeLink = "Contact Us";
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavClick = (link) => {
    setIsOpen(false);
    if (link.path.startsWith("/#")) {
      navigate("/");
      setTimeout(() => {
        const id = link.path.substring(2);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      navigate(link.path);
      window.scrollTo(0, 0);
    }
  };  const getTranslatedName = (name) => {
    switch (name) {
      case "Home": return t("home");
      case "About Us": return t("aboutUs");
      case "Menu": return t("menu");
      case "Contact Us": return t("contactUs");
      default: return name;
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-gradient-to-b from-black via-black/80 to-transparent text-white shadow-xl py-3"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white py-5"
        }`}
      >
        <div className={`max-w-7xl mx-auto flex justify-between items-center px-6 md:px-16 relative ${isOpen ? "z-50" : ""}`}>
          
          {/* Mobile Hamburger Toggle Button (Moved to the left for mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl cursor-pointer focus:outline-none transition-colors duration-300 bg-transparent border-0 text-white hover:text-[#d4af37]"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>

          {/* Mobile Logo (Visible only on mobile homepage) */}
          {location.pathname === "/" && (
            <button 
              onClick={() => {
                if (isOpen) setIsOpen(false);
                navigate("/");
              }} 
              className={`md:hidden flex items-center outline-none border-0 bg-transparent cursor-pointer absolute left-1/2 -translate-x-1/2 transition-opacity duration-300 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              <img
                src="/logo.png"
                alt="Indienne Cuisine Logo"
                className={`w-auto transition-all duration-150 ${isScrolled ? "h-12" : "h-[150px] pt-7 drop-shadow-lg"}`}
              />
            </button>
          )}

          {/* Cart Toggle Button (Replacing Logo on Desktop, Right side on Mobile) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className={`flex items-center justify-center cursor-pointer md:order-last transition-opacity duration-300 outline-none border-0 bg-transparent text-[#c29b57] hover:scale-110 active:scale-95 ${isOpen ? "opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto" : "opacity-100"}`}
            aria-label="Open Order Cart"
          >
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 drop-shadow-lg animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M2 17h20M12 3a9 9 0 00-9 9v3h18v-3a9 9 0 00-9-9zM10 3V1h4v2" />
              </svg>
              {cart?.length > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-[#8c2328] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-zinc-950">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-10 md:order-first">
            {navLinks.map((link) => {
              const isActive = activeLink === link.name;
              return (
                <li key={link.name} className="relative py-2">
                  <button
                    onClick={() => handleNavClick(link)}
                    className={`font-semibold tracking-wide text-sm uppercase transition-colors duration-300 cursor-pointer focus:outline-none bg-transparent border-0 ${
                      isActive
                        ? "text-[#d4af37]"
                        : "text-white hover:text-[#d4af37]"
                    }`}
                  >
                    {getTranslatedName(link.name)}
                  </button>
                  
                  {/* Underline for Active Link */}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d4af37] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}

            {/* Desktop Language Switcher Dropdown */}
            <li ref={dropdownRef} className="relative py-2 list-none">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="font-bold tracking-wide text-sm uppercase transition-colors duration-300 cursor-pointer focus:outline-none bg-transparent border-0 flex items-center gap-1.5 text-white hover:text-[#d4af37]"
              >
                <span>{language.toUpperCase()}</span>
                {/* Custom SVG Chevron Up/Down */}
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${
                    langDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3.5"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3.5 w-32 bg-white border border-white shadow-2xl overflow-hidden z-50 rounded-sm"
                  >
                    <button
                      onClick={() => {
                        setLanguage("en");
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-center px-4 py-3.5 text-xs font-bold tracking-wider uppercase border-b border-zinc-100 transition-colors duration-200 cursor-pointer block ${
                        language === "en"
                          ? "bg-[#c29b57] text-zinc-950"
                          : "bg-white text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      ENGLISH
                    </button>
                    <button
                      onClick={() => {
                        setLanguage("fr");
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-center px-4 py-3.5 text-xs font-bold tracking-wider uppercase transition-colors duration-200 cursor-pointer block ${
                        language === "fr"
                          ? "bg-[#c29b57] text-zinc-950"
                          : "bg-white text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      FRANÇAIS
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>


        </div>

        {/* Mobile Full-Screen Overlay Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden fixed inset-0 w-screen h-screen bg-gradient-to-r from-black via-black/90 to-transparent text-white z-40 flex flex-col pt-[100px] px-8 pb-8 overflow-y-auto"
            >
              {/* Large Logo inside the menu */}
              <div className="flex justify-start mb-10">
                <img
                  src="/logo.png"
                  alt="Indienne Cuisine Logo"
                  className="h-28 w-auto drop-shadow-xl"
                />
              </div>

              <ul className="flex flex-col gap-6">
                {navLinks.map((link) => {
                  const isActive = activeLink === link.name;
                  return (
                    <li key={link.name} className="w-full">
                      <button
                        onClick={() => handleNavClick(link)}
                        className={`text-left font-serif font-bold uppercase tracking-widest text-lg md:text-xl transition-colors duration-300 bg-transparent border-0 ${
                          isActive
                            ? "text-[#c29b57]"
                            : "text-zinc-300 hover:text-white"
                        }`}
                      >
                        {getTranslatedName(link.name)}
                      </button>
                    </li>
                  );
                })}

                {/* Mobile Language Switcher */}
                <li className="w-full border-t border-zinc-800/50 pt-8 mt-4 flex flex-col gap-4">
                  <span className="text-xs uppercase font-bold tracking-widest text-zinc-500">
                    Language
                  </span>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setLanguage("en")}
                      className={`px-6 py-2 text-xs font-bold tracking-widest uppercase rounded border transition-colors duration-200 ${
                        language === "en"
                          ? "bg-[#c29b57] text-zinc-950 border-[#c29b57]"
                          : "bg-transparent text-white border-white/20 hover:bg-white/10"
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => setLanguage("fr")}
                      className={`px-6 py-2 text-xs font-bold tracking-widest uppercase rounded border transition-colors duration-200 ${
                        language === "fr"
                          ? "bg-[#c29b57] text-zinc-950 border-[#c29b57]"
                          : "bg-transparent text-white border-white/20 hover:bg-white/10"
                      }`}
                    >
                      FR
                    </button>
                  </div>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Slide-out Order Cart Drawer Panel */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
            />

            {/* Sidebar Drawer Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-zinc-950 text-slate-100 shadow-2xl z-50 flex flex-col justify-between font-sans border-l border-zinc-800"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                <h2 className="text-xl font-serif font-bold tracking-wider uppercase text-white">
                  {t("yourOrder")}
                </h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer outline-none border-0 bg-transparent p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6">
                {!cart || cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="text-sm font-medium tracking-wide">{t("emptyCart")}</span>
                  </div>
                ) : (
                  cart.map(({ item, quantity }) => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b border-zinc-800/80 items-start">
                      {/* Item Thumbnail */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-900 shrink-0 shadow-sm">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      {/* Item Details */}
                      <div className="flex-grow flex flex-col gap-2">
                        <div className="flex justify-between items-start w-full">
                          <h3 className="font-serif font-bold text-sm text-zinc-100 uppercase tracking-wide max-w-[70%] leading-tight">
                            {translateFood(item.name, language)}
                          </h3>
                          <span className="font-serif font-bold text-sm text-[#c29b57] whitespace-nowrap">
                            ${(parseFloat(item.price.replace(/[^0-9.]/g, "")) * quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Quantity controls & remove */}
                        <div className="flex items-center gap-4 mt-1">
                          {/* Quantity selector */}
                          <div className="flex items-center bg-zinc-900/70 rounded-md border border-zinc-700/60 overflow-hidden">
                            <button 
                              onClick={() => handleDecrement(item.id)}
                              className="px-2.5 py-1 text-zinc-300 hover:bg-zinc-800/80 transition-colors font-bold text-xs outline-none border-0 bg-transparent cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-3 text-xs font-bold text-zinc-100 select-none">
                              {quantity}
                            </span>
                            <button 
                              onClick={() => handleIncrement(item.id)}
                              className="px-2.5 py-1 text-zinc-300 hover:bg-zinc-800/80 transition-colors font-bold text-xs outline-none border-0 bg-transparent cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          {/* Remove text button */}
                          <button 
                            onClick={() => handleRemove(item.id)}
                            className="text-[10px] font-bold text-red-500 uppercase tracking-wider hover:text-red-400 transition-colors cursor-pointer outline-none border-0 bg-transparent flex items-center gap-1"
                          >
                            {language === "fr" ? "✕ Retirer" : "✕ Remove"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Subtotal & Action buttons */}
              <div className="p-6 border-t border-zinc-800 bg-[#0b0f19]/80 flex flex-col gap-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                    {t("subtotal")}
                  </span>
                  <span className="text-2xl font-serif font-bold text-white">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                
                <p className="text-[10px] text-zinc-500 tracking-wider uppercase leading-relaxed">
                  {language === "fr" ? "Taxes et livraison calculées à la caisse." : "Taxes and shipping calculated at checkout."}
                </p>

                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate("/checkout");
                  }}
                  disabled={!cart || cart.length === 0}
                  className={`w-full py-4 text-xs font-bold uppercase tracking-widest rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-300 select-none border-0 ${
                    !cart || cart.length === 0 
                      ? "bg-zinc-800 text-zinc-500 cursor-not-allowed shadow-none" 
                      : "bg-[#c29b57] hover:bg-[#b58c49] text-zinc-950 font-bold cursor-pointer hover:shadow-xl active:scale-[0.99]"
                  }`}
                >
                  {language === "fr" ? "PRO CÉDER AU PAIEMENT ➔" : "PROCEED TO CHECKOUT ➔"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
