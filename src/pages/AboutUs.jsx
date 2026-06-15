import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";

// Reusable PortraitCard Component for Staggered Image Sections
const PortraitCard = ({ image, title, subtitle }) => {
  return (
    <motion.div 
      className="relative overflow-hidden group rounded-lg shadow-2xl h-[300px] md:h-[450px] w-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <img
        src={image}
        alt={title || "About image"}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-end p-6">
        <h4 className="text-white text-lg font-serif tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {title}
        </h4>
        {subtitle && (
          <p className="text-[#B39868] text-xs font-sans tracking-widest uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default function AboutUs() {
  const { t, language } = useLanguage();
  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8 }
  };

  const handleBookTable = () => {
    console.log("Book Table Clicked!");
  };

  return (
    <div className="bg-black text-white font-sans overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2000')"
          }}
        />
        <div className="absolute inset-0 bg-black/70 z-0" />
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-[0.3em] text-white uppercase mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("aboutUs")}
          </motion.h1>
          <motion.p 
            className="text-sm md:text-base tracking-[0.4em] uppercase text-[#B39868]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Indienne Cuisine & Angelo Brewing
          </motion.p>
        </div>
      </section>

      {/* 2. Heritage Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center flex flex-col items-center">
        <motion.div {...fadeInUp} className="max-w-3xl">
          <h2 className="text-[#B39868] text-sm md:text-base tracking-[0.35em] uppercase font-bold mb-4">
            {language === "fr" ? "Plus De 30 Ans De Riche Tradition" : "More Than 30 Years Of Rich Tradition"}
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif font-normal tracking-wide text-white uppercase mb-8 leading-tight">
            {language === "fr" ? "Notre Héritage & Histoire" : "Our Heritage & Story"}
          </h3>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-12 font-light">
            {language === "fr" ? (
              "Depuis l'ouverture de notre premier restaurant en 1992, nous réunissons notre passion pour la famille, la nourriture et les expériences de restauration exceptionnelles. Chaque fois que vous nous visitez, nous vous ferons découvrir la fraîcheur de notre cuisine et notre engagement."
            ) : (
              "Since opening our first restaurant in 1992, we bring together our passion for family, food, and exceptional restaurant experiences. Every time you visit us, we will show you the tasting power of fresh food, our stories, and commitment to good food."
            )}
          </p>
        </motion.div>

        <motion.div 
          className="w-full h-[350px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1500"
            alt="Restaurant Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </section>

      {/* 3. Awards/Social Proof Strip */}
      <section className="bg-zinc-950/80 border-y border-[#B39868]/20 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { name: "NEW YORK TIMES", desc: "Best Steakhouse West Area.", date: "Since Oct, 98" },
            { name: "BUSINESS INSIDER", desc: "Top Steakhouse in Area.", date: "Year 2012" },
            { name: "OPEN TABLE", desc: "Excellent Reviews in Area.", date: "Las Vegas, NV" },
            { name: "TRIP ADVISOR", desc: "2024 Traveler's Choice.", date: "Best of the Best" },
          ].map((award, index) => (
            <motion.div 
              key={award.name}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Crown/Crest Logo Mark */}
              <svg className="w-8 h-8 text-[#B39868] mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 4L5 12L12 6L19 12L22 4L17 18H7L2 4Z" fill="currentColor" fillOpacity="0.1" />
                <circle cx="12" cy="5" r="1" fill="currentColor" />
                <circle cx="2" cy="3" r="1" fill="currentColor" />
                <circle cx="22" cy="3" r="1" fill="currentColor" />
              </svg>
              <h4 className="text-white text-xs md:text-sm tracking-[0.2em] font-serif font-bold uppercase mb-2">
                {award.name}
              </h4>
              <p className="text-gray-400 text-[10px] md:text-xs tracking-wide">
                {award.desc}
              </p>
              <span className="text-[#B39868] text-[9px] md:text-[10px] tracking-widest uppercase mt-1 font-semibold">
                {award.date}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Portrait Gallery / Mature Taste Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Staggered Portrait Cards */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <div className="pt-8">
            <PortraitCard
              image="https://images.unsplash.com/photo-1544025162-811114215f79?auto=format&fit=crop&q=80&w=800"
              title="Searing Grill"
              subtitle="Mature Taste"
            />
          </div>
          <div className="pb-8">
            <PortraitCard
              image="https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=800"
              title="Prime Steaks"
              subtitle="Brought By Time"
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <motion.div {...fadeInUp} className="flex flex-col items-start text-left">
          <span className="text-[#B39868] text-xs md:text-sm tracking-[0.3em] font-semibold uppercase mb-3">
            {language === "fr" ? "La Sélection Spéciale" : "The Aged Selection"}
          </span>
          <h3 className="text-3xl md:text-5xl font-serif text-white uppercase tracking-wide mb-6 leading-tight">
            {language === "fr" ? <>Un Goût Authentique<br />Affiné par le Temps</> : <>Mature Taste<br />Brought By Time</>}
          </h3>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 font-light">
            {language === "fr" ? (
              "Toutes nos viandes de qualité supérieure sont marinées avec soin avec les meilleures épices pour créer un équilibre parfait des saveurs, une texture tendre et une expérience gustative inégalée."
            ) : (
              "All of our prime meats and chops are dry-aged in our custom, hand-built red clay rooms. This setting creates the perfect moisture balance for a seasoned flavor, tender texture, and dining experience that is truly matchless."
            )}
          </p>
          <a 
            href="#menu" 
            className="text-[#B39868] text-xs font-bold tracking-[0.25em] uppercase border-b border-[#B39868] pb-1 hover:text-white hover:border-white transition-colors duration-300"
          >
            {language === "fr" ? "Nos Spécialités" : "Our Highlight"}
          </a>
        </motion.div>
      </section>

      {/* 5. Discover Our Cuisine Section (Staggered Grid) */}
      <section className="py-24 px-6 bg-zinc-950/40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <motion.div {...fadeInUp} className="flex flex-col items-start text-left order-2 lg:order-1">
            <span className="text-[#B39868] text-xs md:text-sm tracking-[0.3em] font-semibold uppercase mb-3">
              {language === "fr" ? "Les Saveurs Classiques" : "The Classic Flavors"}
            </span>
            <h3 className="text-3xl md:text-5xl font-serif text-white uppercase tracking-wide mb-6 leading-tight">
              {language === "fr" ? <>Découvrez Notre<br />Cuisine</> : <>Discover Our<br />Cuisine</>}
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 font-light">
              {language === "fr" ? (
                "Découvrez des saveurs uniques, les fruits de mer les plus frais, des viandes raffinées et un service personnalisé de premier ordre."
              ) : (
                "Experience signature flavors, the freshest seafood, fine meat steaks and personal service. Our menu includes aged USDA Prime steaks, a range of dry-aged seafood selections, bespoke specialty cocktails, and an extensive selection of vintage wines."
              )}
            </p>
            <a 
              href="#menu" 
              className="text-[#B39868] text-xs font-bold tracking-[0.25em] uppercase border-b border-[#B39868] pb-1 hover:text-white hover:border-white transition-colors duration-300"
            >
              {language === "fr" ? "Voir la Carte Complète" : "View Full Menu"}
            </a>
          </motion.div>

          {/* Right Side: 2x2 Square Images Grid */}
          <div className="grid grid-cols-2 gap-4 order-1 lg:order-2">
            {[
              "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1544025162-811114215f79?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
            ].map((img, idx) => (
              <motion.div 
                key={idx}
                className="overflow-hidden rounded-md shadow-lg aspect-square"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <img
                  src={img}
                  alt={`Dish ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Premium Wines Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Staggered Portrait Cards */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <div className="pt-8">
            <PortraitCard
              image="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800"
              title="Red Vintage"
              subtitle="Impeccable Quality"
            />
          </div>
          <div className="pb-8">
            <PortraitCard
              image="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800"
              title="Fine Cellar"
              subtitle="Grapes & Passion"
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <motion.div {...fadeInUp} className="flex flex-col items-start text-left">
          <span className="text-[#B39868] text-xs md:text-sm tracking-[0.3em] font-semibold uppercase mb-3">
            Sommelier Selection
          </span>
          <h3 className="text-3xl md:text-5xl font-serif text-white uppercase tracking-wide mb-6 leading-tight">
            Premium Wines Of<br />Impeccable Quality
          </h3>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 font-light">
            All of our prime meats and chops are dry-aged and paired by food and knowledge staff with years of world-class experience. Premium wines paired with seasoned flavors, tender steaks, and fine desserts are a family celebration.
          </p>
          <a 
            href="#menu" 
            className="text-[#B39868] text-xs font-bold tracking-[0.25em] uppercase border-b border-[#B39868] pb-1 hover:text-white hover:border-white transition-colors duration-300"
          >
            Wine Pairing
          </a>
        </motion.div>
      </section>

      {/* 7. Reservation Footer Section */}
      <section className="relative w-full py-28 px-6 flex flex-col items-center justify-center overflow-hidden text-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1544025162-811114215f79?auto=format&fit=crop&q=80&w=2000')"
          }}
        />
        <div className="absolute inset-0 bg-black/85 z-0" />
        
        <motion.div 
          className="relative z-10 max-w-2xl flex flex-col items-center"
          {...fadeInUp}
        >
          {/* Gold Decorative Stars */}
          <div className="flex gap-2 mb-6">
            <span className="text-[#B39868] text-xl">★</span>
            <span className="text-[#B39868] text-xl">★</span>
            <span className="text-[#B39868] text-xl">★</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif text-white uppercase tracking-wider mb-6">
            MAKE A RESERVATION
          </h2>

          {/* Gold Divider */}
          <div className="w-24 h-[1px] bg-[#B39868] mb-8"></div>

          {/* Book A Table CTA */}
          <button 
            onClick={handleBookTable}
            className="px-8 py-3.5 border border-[#B39868] text-[#B39868] hover:bg-[#B39868] hover:text-black transition-all duration-300 text-xs font-bold uppercase tracking-[0.25em] mb-8"
          >
            BOOK A TABLE
          </button>

          <p className="text-gray-300 text-xs md:text-sm tracking-wide leading-relaxed font-light">
            For banquet inquiries or to speak to our Group Dining Coordinator, please call us at{" "}
            <span className="text-[#B39868] font-semibold">(201) 723-6611</span>. You may also email reservations@indienne.com
          </p>

          {/* Gold Decorative Stars Bottom */}
          <div className="flex gap-2 mt-8">
            <span className="text-[#B39868] text-xl">★</span>
            <span className="text-[#B39868] text-xl">★</span>
            <span className="text-[#B39868] text-xl">★</span>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
