import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function ContactUs() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Add form submission handling logic here
    alert(language === "fr" ? "Merci ! Votre message a été envoyé." : "Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-zinc-950 text-white font-sans min-h-screen">
      
      {/* 1. Hero Section (Top) */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2000')"
          }}
        />
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="relative z-10 text-center px-4 mt-12">
          <motion.h1 
            className="text-4xl md:text-6xl font-serif font-bold text-white uppercase tracking-wider mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Contact
          </motion.h1>
          <motion.div 
            className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#B39868] flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <a href="/" className="hover:text-white transition-colors duration-300">{language === "fr" ? "ACCUEIL" : "HOME"}</a>
            <span>&gt;</span>
            <span className="text-white/80">{language === "fr" ? "CONTACTEZ-NOUS" : "CONTACT US"}</span>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Content - Split Layout (Middle) */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column (Google Maps) */}
          <motion.div 
            className="w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden border border-zinc-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative bg-zinc-900"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <iframe
              title="Restaurant Location Map"
              src="https://maps.google.com/maps?q=7%20Boulevard%20de%20la%20Liberation,%2005000%20Gap,%20France&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 opacity-90 brightness-95"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Inner Vignette / Shadow Overlay to blend the map edges smoothly */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_35px_rgba(0,0,0,0.65)] border border-black/15 bg-gradient-to-t from-black/15 via-transparent to-black/10" />
          </motion.div>

          {/* Right Column (Contact Form) */}
          <motion.div 
            className="flex flex-col text-left"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-[#B39868] mb-8 tracking-wide">
              {language === "fr" ? "Contactez-nous" : "Contact Us"}
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={language === "fr" ? "Votre Nom" : "Your Name"}
                  required
                  className="w-full bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 focus:border-[#B39868] focus:ring-1 focus:ring-[#B39868] rounded-md px-4 py-3 text-white placeholder-zinc-500 outline-none transition-all duration-300 font-sans shadow-sm hover:shadow-md"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={language === "fr" ? "Votre Adresse E-mail" : "Your Email"}
                  required
                  className="w-full bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 focus:border-[#B39868] focus:ring-1 focus:ring-[#B39868] rounded-md px-4 py-3 text-white placeholder-zinc-500 outline-none transition-all duration-300 font-sans shadow-sm hover:shadow-md"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={language === "fr" ? "Sujet" : "Subject"}
                  required
                  className="w-full bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 focus:border-[#B39868] focus:ring-1 focus:ring-[#B39868] rounded-md px-4 py-3 text-white placeholder-zinc-500 outline-none transition-all duration-300 font-sans shadow-sm hover:shadow-md"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={language === "fr" ? "Votre Message" : "Message"}
                  rows={5}
                  required
                  className="w-full bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 focus:border-[#B39868] focus:ring-1 focus:ring-[#B39868] rounded-md px-4 py-3 text-white placeholder-zinc-500 outline-none transition-all duration-300 font-sans resize-none shadow-sm hover:shadow-md"
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-max px-10 py-3.5 bg-[#B39868] text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#9a8053] hover:text-white transition-all duration-300 shadow-lg"
              >
                {language === "fr" ? "Envoyer le Message" : "Send Message"}
              </button>
            </form>
          </motion.div>

        </div>
      </section>

      {/* 3. Contact Information Grid (Bottom) */}
      <section className="bg-zinc-900/40 border-t border-zinc-900 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Address */}
            <motion.div 
              className="flex flex-col text-left border-l border-zinc-800/80 pl-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <h4 className="text-white text-sm font-bold tracking-widest uppercase mb-3 font-sans">
                {language === "fr" ? "Adresse :" : "Address:"}
              </h4>
              <p className="text-[#B39868] text-sm leading-relaxed font-light">
                7 Boulevard de la Liberation,<br />05000 Gap, France
              </p>
            </motion.div>

            {/* Phone */}
            <motion.div 
              className="flex flex-col text-left border-l border-zinc-800/80 pl-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h4 className="text-white text-sm font-bold tracking-widest uppercase mb-3 font-sans">
                {language === "fr" ? "Téléphone :" : "Phone:"}
              </h4>
              <a 
                href="tel:0605752471" 
                className="text-[#B39868] text-sm leading-relaxed hover:text-[#9a8053] transition-colors duration-300 font-light"
              >
                06 05 75 24 71
              </a>
            </motion.div>

            {/* Email */}
            <motion.div 
              className="flex flex-col text-left border-l border-zinc-800/80 pl-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h4 className="text-white text-sm font-bold tracking-widest uppercase mb-3 font-sans">
                {language === "fr" ? "E-mail :" : "Email:"}
              </h4>
              <a 
                href="mailto:is05@hotmail.com" 
                className="text-[#B39868] text-sm leading-relaxed hover:text-[#9a8053] transition-colors duration-300 font-light break-all"
              >
                is05@hotmail.com
              </a>
            </motion.div>

            {/* Website */}
            <motion.div 
              className="flex flex-col text-left border-l border-zinc-800/80 pl-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h4 className="text-white text-sm font-bold tracking-widest uppercase mb-3 font-sans">
                {language === "fr" ? "Site Internet :" : "Website:"}
              </h4>
              <a 
                href="https://indiennecuisine.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#B39868] text-sm leading-relaxed hover:text-[#9a8053] transition-colors duration-300 font-light"
              >
                indiennecuisine.com
              </a>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}
