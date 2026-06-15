import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import { translateFood } from "../utils/menuTranslations.js";

export default function CheckoutPage({ cart, setCart }) {
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

  const subtotal = useMemo(() => {
    return cart.reduce((total, cartItem) => {
      const priceNum = parseFloat(cartItem.item.price.replace(/[^0-9.]/g, "")) || 0;
      return total + priceNum * cartItem.quantity;
    }, 0);
  }, [cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert(language === "fr" ? "Votre panier est vide. Veuillez ajouter des articles pour passer commande." : "Your cart is empty. Please add items to checkout.");
      return;
    }
    // Set order placed state, clear cart after delay
    setIsOrdered(true);
    setTimeout(() => {
      setCart([]);
      setIsOrdered(false);
      navigate("/");
    }, 3500);
  };

  const inputClass = "w-full bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 focus:border-[#c29b57] focus:ring-1 focus:ring-[#c29b57] rounded-lg px-4 py-3 text-white placeholder-zinc-500 outline-none transition-all duration-300 font-sans shadow-sm text-sm";

  return (
    <div className="checkout-page bg-[#111111] min-h-screen flex flex-col font-sans text-zinc-200">
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
            {t("checkout")}
          </h1>
          <div className="flex items-center gap-2 text-xs md:text-sm font-sans tracking-widest uppercase text-gray-300">
            <Link to="/" className="hover:text-white transition-colors">{t("home")}</Link>
            <span>➔</span>
            <span className="text-[#c29b57]">{t("checkout")}</span>
          </div>
        </div>
      </section>

      {/* 2. Main Content Form Section */}
      <section className="relative py-16 px-6 w-full flex-grow overflow-hidden">
        {/* Giant Faded Text Overlay */}
        <div className="absolute inset-0 select-none pointer-events-none flex items-center justify-center opacity-[0.02] text-[#c29b57] text-[6vw] font-serif font-black tracking-widest uppercase leading-none text-center">
          {language === "fr" ? "NOUS LIVRONS LE MEILLEUR" : "WE DELIVER BEST & DELICIOUS"}
        </div>

        {isOrdered ? (
          /* Order Placement Success View */
          <div className="max-w-md mx-auto bg-[#1a1a1a] p-8 rounded-2xl shadow-2xl border border-zinc-800/80 text-center relative z-10 flex flex-col items-center gap-4 animate-fade">
            <div className="w-16 h-16 rounded-full bg-green-950/30 flex items-center justify-center text-green-400 text-3xl font-bold border border-green-800 shadow-sm">
              ✓
            </div>
            <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-wide">
              {t("successMsg")}
            </h2>
            <p className="text-sm text-zinc-350 font-sans leading-relaxed">
              {language === "fr" ? (
                <>Merci, <span className="font-bold text-[#c29b57]">{formData.name}</span>. Votre commande a été enregistrée avec succès avec paiement à la livraison et est en cours de préparation par nos chefs.</>
              ) : (
                <>Thank you, <span className="font-bold text-[#c29b57]">{formData.name}</span>. Your order has been placed successfully via Cash on Delivery and is being prepared by our chefs.</>
              )}
            </p>
            <span className="text-xs text-zinc-500 font-sans animate-pulse mt-4">
              {language === "fr" ? "Redirection vers la page d'accueil..." : "Redirecting you to the home page..."}
            </span>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-6xl mx-auto relative z-10"
          >
            {/* Left Column: Billing Address Fields */}
            <div className="lg:col-span-7 bg-[#1a1a1a] p-8 md:p-10 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.5)] border border-zinc-800/80 flex flex-col gap-6 text-white">
              <div className="text-center pb-4 border-b border-zinc-800/80">
                <h2 className="text-2xl font-serif font-bold tracking-wide uppercase text-white">
                  {language === "fr" ? "PASSER COMMANDE" : "PLACE YOUR ORDER"}
                </h2>
                <div className="w-12 h-[2px] bg-[#c29b57] mx-auto mt-2" />
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
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
                    rows="3"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder={language === "fr" ? "ÉCRIVEZ VOTRE NOTE ICI..." : "TYPE YOUR NOTE HERE..."}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Placement */}
            <div className="lg:col-span-5 bg-[#1a1a1a] p-6 md:p-8 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.5)] border border-zinc-800/80 self-start flex flex-col gap-6 text-white">
              <div>
                <h3 className="text-lg font-serif font-bold tracking-wider uppercase text-white mb-1">
                  {t("yourOrder")}
                </h3>
                <div className="w-12 h-[2px] bg-[#c29b57]" />
              </div>

              {/* Order Items Table */}
              <div className="flex flex-col w-full text-xs font-sans">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-800 font-bold text-zinc-400 tracking-wider">
                  <span>{t("product")}</span>
                  <span>{t("total")}</span>
                </div>

                <div className="flex flex-col max-h-[220px] overflow-y-auto pr-1">
                  {cart.length === 0 ? (
                    <span className="py-4 text-zinc-500 text-center">{language === "fr" ? "Aucun article sélectionné" : "No items selected"}</span>
                  ) : (
                    cart.map(({ item, quantity }) => (
                      <div key={item.id} className="flex justify-between items-center py-3 border-b border-white/5 text-zinc-300">
                        <span className="font-semibold text-zinc-350">{translateFood(item.name, language)} x {quantity}</span>
                        <span className="font-serif font-bold text-white">
                          ${(parseFloat(item.price.replace(/[^0-9.]/g, "")) * quantity).toFixed(2)}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                {/* Subtotal */}
                <div className="flex justify-between items-center py-3 border-b border-zinc-800 font-semibold text-zinc-300">
                  <span>{t("subtotal")}</span>
                  <span className="font-serif font-bold text-white">${subtotal.toFixed(2)}</span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center py-4 border-b border-zinc-800 text-sm font-bold text-[#c29b57]">
                  <span>{t("total")}</span>
                  <span className="font-serif text-base font-black text-[#c29b57]">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Option */}
              <div className="flex flex-col gap-3 font-sans">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {t("paymentOption")}
                </h4>
                <div className="flex items-start gap-3 p-3.5 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                  <input 
                    type="radio" 
                    name="payment" 
                    defaultChecked 
                    className="mt-1 cursor-pointer accent-[#c29b57]" 
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-white">{t("cashOnDelivery")}</span>
                    <span className="text-[10px] text-zinc-500">{t("payWithCash")}</span>
                  </div>
                </div>
              </div>

              {/* Certified Quality / Success Badge */}
              <div className="flex items-center gap-3 p-4 bg-green-950/20 border border-green-900/50 rounded-xl font-sans mt-2">
                <span className="w-8 h-8 rounded-full bg-green-950 flex items-center justify-center text-green-400 border border-green-800 font-bold shrink-0 shadow-sm">
                  ✓
                </span>
                <div className="flex-grow">
                  <span className="text-xs font-bold text-green-400 block">{t("successMsg")}</span>
                  <span className="text-[10px] text-zinc-500 font-medium">{t("certifiedQuality")}</span>
                </div>
                <img 
                  src="/logo.png" 
                  alt="Indienne Cuisine Logo" 
                  className="w-10 h-10 object-contain rounded-full border border-zinc-800" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>

              {/* Place Order Submit Button */}
              <button
                type="submit"
                disabled={cart.length === 0}
                className={`w-full py-4 text-xs font-bold uppercase tracking-widest rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-300 select-none border-0 mt-4 ${
                  cart.length === 0 
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed shadow-none" 
                    : "bg-[#c29b57] hover:bg-[#b58c49] text-zinc-950 font-bold cursor-pointer hover:shadow-xl active:scale-[0.99]"
                }`}
              >
                {t("placeOrder")}
              </button>
            </div>
          </form>
        )}
      </section>

      {/* 3. Themed Checkout Footer */}
      <footer className="bg-black text-white py-14 px-6 flex flex-col items-center justify-center w-full relative overflow-hidden font-sans border-t border-white/10">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-white/5 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full gap-5">
          {/* Circular Logo image */}
          <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10 border border-white/20 p-1 flex items-center justify-center shadow-lg">
            <img 
              src="/logo.png" 
              alt="Indienne Cuisine Logo" 
              className="w-full h-full object-cover rounded-full" 
              onError={(e) => {
                // Fallback crossed utensils SVG if image is missing
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Contact details */}
          <div className="flex flex-col gap-1.5 text-xs md:text-sm tracking-wide text-white/90">
            <p className="font-semibold uppercase tracking-wider text-[#f4f1ea]">
              7 BD DE LA LIBÉRATION 05000 GAP
            </p>
            <p className="hover:text-white transition-colors">
              INFO@INDIENNECUISINE.FR
            </p>
            <p className="text-base font-bold text-[#f4f1ea] mt-1">
              +33 012345678
            </p>
          </div>

          {/* Divider */}
          <div className="w-16 h-[1px] bg-white/20" />

          {/* Social Links */}
          <div className="flex items-center gap-6 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/80">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Instagram
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Tiktok
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
