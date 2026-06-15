import React, { createContext, useState, useContext, useEffect } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    // Navigation
    home: "Home",
    aboutUs: "About Us",
    menu: "Menu",
    contactUs: "Contact Us",
    checkout: "Checkout",
    
    // Categories
    starters: "STARTERS",
    chicken: "CHICKEN",
    lambSeafood: "LAMB & SEAFOOD",
    vegetarian: "VEGETARIAN",
    biryaniRice: "BIRYANI & RICE",
    freshSides: "FRESH & SIDES",
    drinksDesserts: "DRINKS & DESSERTS",
    
    // Menu Page
    categories: "Categories",
    addToCart: "Add to Cart",
    cartTitle: "Your Selection",
    subtotal: "Subtotal",
    total: "Total",
    proceedToCheckout: "Proceed to Checkout",
    emptyCart: "Your cart is empty.",
    
    // Checkout Page
    billingDetails: "Billing Details",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    phone: "Phone Number",
    address: "Street Address",
    city: "City",
    postalCode: "Postal Code",
    additionalInfo: "Additional Notes (Optional)",
    yourOrder: "Your Order",
    product: "Product",
    paymentOption: "Payment Option",
    cashOnDelivery: "Cash on Delivery",
    payWithCash: "Pay with cash upon delivery.",
    placeOrder: "Place Order",
    successMsg: "Success!",
    certifiedQuality: "Certified Quality - Indienne Cuisine",
    processingOrder: "Processing your order...",
    orderCompleted: "Thank you! Your order has been placed successfully.",
  },
  fr: {
    // Navigation
    home: "Accueil",
    aboutUs: "À Propos",
    menu: "Menu",
    contactUs: "Contact",
    checkout: "Paiement",
    
    // Categories
    starters: "ENTRÉES",
    chicken: "POULET",
    lambSeafood: "AGNEAU & FRUITS DE MER",
    vegetarian: "VÉGÉTARIEN",
    biryaniRice: "BIRYANI & RIZ",
    freshSides: "ACCOMPAGNEMENTS",
    drinksDesserts: "BOISSONS & DESSERTS",
    
    // Menu Page
    categories: "Catégories",
    addToCart: "Ajouter au panier",
    cartTitle: "Votre Sélection",
    subtotal: "Sous-total",
    total: "Total",
    proceedToCheckout: "Passer au paiement",
    emptyCart: "Votre panier est vide.",
    
    // Checkout Page
    billingDetails: "Détails de la facturation",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Adresse e-mail",
    phone: "Numéro de téléphone",
    address: "Adresse",
    city: "Ville",
    postalCode: "Code postal",
    additionalInfo: "Notes supplémentaires (Optionnel)",
    yourOrder: "Votre Commande",
    product: "Produit",
    paymentOption: "Option de paiement",
    cashOnDelivery: "Paiement à la livraison",
    payWithCash: "Payez en espèces dès la livraison.",
    placeOrder: "Passer la commande",
    successMsg: "Succès !",
    certifiedQuality: "Qualité certifiée - Indienne Cuisine",
    processingOrder: "Traitement de votre commande...",
    orderCompleted: "Merci ! Votre commande a été enregistrée avec succès.",
  }
};

export function LanguageProvider({ children }) {
  // Try to load initial language from localStorage, default to English
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem("app_lang");
    return saved === "fr" || saved === "en" ? saved : "en";
  });

  const setLanguage = (lang) => {
    if (lang === "en" || lang === "fr") {
      setLanguageState(lang);
      localStorage.setItem("app_lang", lang);
    }
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
