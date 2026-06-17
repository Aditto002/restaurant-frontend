import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function OrderFormPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    apartment: "",
    street: "",
    city: "",
    zip: "",
    state: "",
    notes: ""
  });
  const [isOrdered, setIsOrdered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert(language === "fr" ? "Veuillez remplir votre nom et téléphone." : "Please fill in your name and phone number.");
      return;
    }
    
    setIsOrdered(true);
    setTimeout(() => {
      setIsOrdered(false);
      navigate("/");
    }, 3500);
  };

  const inputClass = "w-full bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 focus:border-[#c29b57] focus:ring-1 focus:ring-[#c29b57] rounded-lg px-4 py-3 text-white placeholder-zinc-500 outline-none transition-all duration-300 font-sans shadow-sm text-sm";

  return (
    <div className="order-form-page bg-[#0b0f19] min-h-screen flex flex-col font-sans text-zinc-200 relative overflow-hidden">
      {/* Decorative Background Orbs */}
      <div className="absolute w-[400px] h-[400px] right-[-100px] top-[15%] rounded-full bg-gradient-to-br from-[#c29b57] to-orange-800 blur-[120px] opacity-10 pointer-events-none z-0"></div>
      <div className="absolute w-[300px] h-[300px] left-[-100px] bottom-[15%] rounded-full bg-gradient-to-br from-[#38bdf8] to-[#818cf8] blur-[120px] opacity-[0.05] pointer-events-none z-0"></div>

      {/* 1. Header Banner */}
      <section 
        className="relative w-full h-[220px] md:h-[280px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000')"
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="relative z-10 text-center text-white px-4 flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-serif tracking-widest uppercase mb-3 text-white">
            {language === "fr" ? "PASSER UNE COMMANDE" : "PLACE AN ORDER"}
          </h1>
          <div className="flex items-center gap-2 text-xs md:text-sm font-sans tracking-widest uppercase text-gray-300">
            <Link to="/" className="hover:text-white transition-colors">{t("home")}</Link>
            <span>➔</span>
            <span className="text-[#c29b57]">{language === "fr" ? "COMMANDE" : "ORDER"}</span>
          </div>
        </div>
      </section>

      {/* 2. Main Content Form Section */}
      <section className="relative py-16 px-6 w-full flex-grow overflow-hidden flex justify-center items-start">
        {/* Giant Faded Text Overlay */}
        <div className="absolute inset-0 select-none pointer-events-none flex items-center justify-center opacity-[0.02] text-[#c29b57] text-[6vw] font-serif font-black tracking-widest uppercase leading-none text-center">
          {language === "fr" ? "RÉSERVATION RAPIDE" : "QUICK ORDER REQUEST"}
        </div>

        {isOrdered ? (
          /* Order Placement Success View */
          <div className="max-w-md w-full mx-auto bg-[#1a1a1a] p-8 rounded-2xl shadow-2xl border border-zinc-800/80 text-center relative z-10 flex flex-col items-center gap-4 animate-fade mt-10">
            <div className="w-16 h-16 rounded-full bg-green-950/30 flex items-center justify-center text-green-400 text-3xl font-bold border border-green-800 shadow-sm">
              ✓
            </div>
            <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-wide">
              {t("successMsg")}
            </h2>
            <p className="text-sm text-zinc-350 font-sans leading-relaxed">
              {language === "fr" ? (
                <>Merci, <span className="font-bold text-[#c29b57]">{formData.name}</span>. Votre demande a bien été envoyée et notre équipe vous contactera bientôt.</>
              ) : (
                <>Thank you, <span className="font-bold text-[#c29b57]">{formData.name}</span>. Your request has been sent successfully and our team will contact you shortly.</>
              )}
            </p>
            <span className="text-xs text-zinc-500 font-sans animate-pulse mt-4">
              {language === "fr" ? "Redirection vers la page d'accueil..." : "Redirecting you to the home page..."}
            </span>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="w-full max-w-2xl relative z-10 bg-[#1a1a1a] p-8 md:p-10 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.5)] border border-zinc-800/80 flex flex-col gap-6 text-white"
          >
            <div className="text-center pb-4 border-b border-zinc-800/80">
              <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-wide uppercase text-white">
                {language === "fr" ? "VOTRE DEMANDE" : "PLACE YOUR ORDER"}
              </h2>
              <div className="w-12 h-[2px] bg-[#c29b57] mx-auto mt-4" />
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mt-2">
              {/* Name */}
              <div className="flex flex-col gap-1.5 sm:col-span-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {language === "fr" ? "VOTRE NOM*" : "YOUR NAME*"}
                </label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={language === "fr" ? "EX. JEAN DUPONT" : "E.G. JOHN DOE"}
                  className={inputClass}
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5 sm:col-span-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {language === "fr" ? "TÉLÉPHONE*" : "PHONE*"}
                </label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="E.G. +33 6 12 34 56 78"
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {language === "fr" ? "E-MAIL*" : "EMAIL*"}
                </label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={language === "fr" ? "EX. JEANDUPONT@EMAIL.COM" : "E.G. JOHNDOE@EMAIL.COM"}
                  className={inputClass}
                />
              </div>

              {/* House / Apt */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {language === "fr" ? "BATIMENT/APPARTEMENT*" : "HOUSE/SUITE/APARTMENT*"}
                </label>
                <input 
                  type="text" 
                  name="apartment" 
                  required 
                  value={formData.apartment}
                  onChange={handleChange}
                  placeholder={language === "fr" ? "EX. APPARTEMENT 4B" : "E.G. APARTMENT 4B"}
                  className={inputClass}
                />
              </div>

              {/* Street */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {language === "fr" ? "RUE/VOIE*" : "STREET/PLAZA*"}
                </label>
                <input 
                  type="text" 
                  name="street" 
                  required 
                  value={formData.street}
                  onChange={handleChange}
                  placeholder={language === "fr" ? "EX. 15 RUE DE LA PAIX" : "E.G. 15 RUE DE LA PAIX"}
                  className={inputClass}
                />
              </div>

              {/* City */}
              <div className="flex flex-col gap-1.5 sm:col-span-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {language === "fr" ? "VILLE*" : "CITY*"}
                </label>
                <input 
                  type="text" 
                  name="city" 
                  required 
                  value={formData.city}
                  onChange={handleChange}
                  placeholder={language === "fr" ? "EX. PARIS" : "E.G. PARIS"}
                  className={inputClass}
                />
              </div>

              {/* Zip */}
              <div className="flex flex-col gap-1.5 sm:col-span-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {language === "fr" ? "CODE POSTAL*" : "ZIP/POSTAL CODE*"}
                </label>
                <input 
                  type="text" 
                  name="zip" 
                  required 
                  value={formData.zip}
                  onChange={handleChange}
                  placeholder={language === "fr" ? "EX. 75002" : "E.G. 75002"}
                  className={inputClass}
                />
              </div>

              {/* State */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {language === "fr" ? "RÉGION*" : "STATE/REGION*"}
                </label>
                <input 
                  type="text" 
                  name="state" 
                  required 
                  value={formData.state}
                  onChange={handleChange}
                  placeholder={language === "fr" ? "EX. ÎLE-DE-FRANCE" : "E.G. ÎLE-DE-FRANCE"}
                  className={inputClass}
                />
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {language === "fr" ? "NOTE SUPPLÉMENTAIRE" : "ADDITIONAL NOTE"}
                </label>
                <textarea 
                  name="notes" 
                  rows="4"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder={language === "fr" ? "ÉCRIVEZ VOTRE NOTE ICI..." : "TYPE YOUR NOTE HERE..."}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            {/* Place Order Submit Button */}
            <button
              type="submit"
              className="w-full py-4 text-xs font-bold uppercase tracking-widest rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-300 select-none border-0 mt-6 bg-[#c29b57] hover:bg-[#b58c49] text-zinc-950 cursor-pointer hover:shadow-xl active:scale-[0.99]"
            >
              {language === "fr" ? "ENVOYER LA DEMANDE" : "SEND ORDER REQUEST"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
