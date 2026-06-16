import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
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
      if (window.scrollY > 50) {
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
            ? "bg-white text-slate-800 shadow-md py-3"
            : "bg-transparent text-white py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-16">
          
          {/* Logo Brand Link */}
          <button onClick={() => handleNavClick({ path: "/" })} className="flex items-center outline-none border-0 bg-transparent cursor-pointer">
            <img
              src="/logo.png"
              alt="Indienne Cuisine Logo"
              className="h-10 md:h-12 w-auto transition-all duration-300"
            />
          </button>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = activeLink === link.name;
              return (
                <li key={link.name} className="relative py-2">
                  <button
                    onClick={() => handleNavClick(link)}
                    className={`font-semibold tracking-wide text-sm uppercase transition-colors duration-300 cursor-pointer focus:outline-none bg-transparent border-0 ${
                      isActive
                        ? "text-[#d4af37]"
                        : isScrolled
                        ? "text-slate-800 hover:text-[#d4af37]"
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
                className={`font-bold tracking-wide text-sm uppercase transition-colors duration-300 cursor-pointer focus:outline-none bg-transparent border-0 flex items-center gap-1.5 ${
                  isScrolled
                    ? "text-slate-800 hover:text-[#d4af37]"
                    : "text-white hover:text-[#d4af37]"
                }`}
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

          {/* Mobile Hamburger Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`text-2xl cursor-pointer focus:outline-none transition-colors duration-300 bg-transparent border-0 ${
                isScrolled ? "text-slate-800 hover:text-[#d4af37]" : "text-white hover:text-[#d4af37]"
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`md:hidden overflow-hidden border-t ${
                isScrolled
                  ? "bg-white border-slate-100 text-slate-800 shadow-lg"
                  : "bg-zinc-950/95 border-zinc-900 text-white backdrop-blur-md"
              }`}
            >
              <ul className="flex flex-col px-6 py-4 gap-4">
                {navLinks.map((link) => {
                  const isActive = activeLink === link.name;
                  return (
                    <li key={link.name} className="w-full">
                      <button
                        onClick={() => handleNavClick(link)}
                        className={`w-full text-left font-semibold uppercase tracking-wider text-sm py-2 block border-l-2 pl-3 transition-colors duration-300 bg-transparent border-0 ${
                          isActive
                            ? "text-[#d4af37] border-[#d4af37]"
                            : "border-transparent hover:text-[#d4af37]"
                        }`}
                      >
                        {getTranslatedName(link.name)}
                      </button>
                    </li>
                  );
                })}

                {/* Mobile Language Switcher */}
                <li className="w-full border-t border-zinc-200/10 pt-4 flex justify-between items-center px-3 mt-2">
                  <span className={`text-[10px] uppercase font-bold tracking-widest ${isScrolled ? "text-slate-500" : "text-white/60"}`}>
                    Language
                  </span>
                  <div className="flex gap-2.5">
                    <button
                      onClick={() => setLanguage("en")}
                      className={`px-3 py-1 text-xs font-bold tracking-wider rounded border transition-colors duration-200 ${
                        language === "en"
                          ? "bg-[#c29b57] text-zinc-950 border-[#c29b57]"
                          : isScrolled
                          ? "bg-white text-slate-800 border-slate-200 hover:bg-slate-50"
                          : "bg-transparent text-white border-white/20 hover:bg-white/10"
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => setLanguage("fr")}
                      className={`px-3 py-1 text-xs font-bold tracking-wider rounded border transition-colors duration-200 ${
                        language === "fr"
                          ? "bg-[#c29b57] text-zinc-950 border-[#c29b57]"
                          : isScrolled
                          ? "bg-white text-slate-800 border-slate-200 hover:bg-slate-50"
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
    </>
  );
}
