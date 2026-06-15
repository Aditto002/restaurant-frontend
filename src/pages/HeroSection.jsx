import React from "react";
import AnimatedMandalaButton from "../components/AnimatedMandalaButton";
import FloatingInfoCard from "../components/FloatingInfoCard";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function HeroSection() {
  const { t, language } = useLanguage();
  const handleOrderClick = () => {
    // Navigate or trigger order logic
    console.log("Order CTA Clicked!");
  };
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };


  return (
    <section className="relative w-full h-screen bg-black overflow-hidden font-sans">
      
      {/* 1. Background Image & Dark Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          // Placeholder luxury food image
          backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000')",
        }}
      />
      <div className="absolute inset-0 bg-black/60 z-0" /> {/* Dark gradient overlay */}

      {/* 2. Main Content (Perfectly Centered via Flexbox) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
        
        {/* Top Tagline */}
        <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-5 text-gray-300">
          {language === "fr" ? "Entreprise Écologique Certifiée" : "Certified Green Business"}
        </p>
        
        {/* Main Heading (Elegant Serif) */}
        <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-serif leading-tight mb-4 drop-shadow-lg max-w-4xl mx-auto">
          {language === "fr" ? "DÉCOUVREZ LA MEILLEURE CUISINE INDIENNE DE" : "DISCOVER THE BEST INDIAN FOOD IN"}
        </h1>
        
        {/* Sub-Heading (Bold Sans-Serif) */}
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider uppercase mb-8 text-yellow-50 drop-shadow-md">
          Indienne Cuisine
        </h2>

        {/* 3. Reusable Animated Mandala Button (CTA) */}
        <div className="mt-2">
          <AnimatedMandalaButton
            label={t("menu")}
           onClick={() => navigateTo('/menu')} 
          />
        </div>
      </div>

      {/* 4. Reusable Floating Info Card (Pinned to Bottom Center) */}
      <FloatingInfoCard
        title={language === "fr" ? "Notre Restaurant" : "Restaurants"}
        subtitle={language === "fr" ? "Heures d'Ouverture et de Fermeture" : "Opening & Closing Hours"}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 w-max"
      />
      
    </section>
  );
}
