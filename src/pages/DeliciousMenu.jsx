import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MenuItem from "../components/MenuItem";
import { useLanguage } from "../context/LanguageContext.jsx";
import { translateFood, translateDesc } from "../utils/menuTranslations.js";

// Category definitions with round illustrative food images
const CATEGORIES = [
  {
    id: "STARTERS",
    name: "STARTERS",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "CHICKEN",
    name: "CHICKEN",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "LAMB & SEAFOOD",
    name: "LAMB & SEAFOOD",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "VEGETARIAN",
    name: "VEGETARIAN",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "BIRYANI & RICE",
    name: "BIRYANI & RICE",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "FRESH & SIDES",
    name: "FRESH & SIDES",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "DRINKS & DESSERTS",
    name: "DRINKS & DESSERTS",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&auto=format&fit=crop&q=80"
  }
];

// Luxury menu items data list (27 items correctly categorized)
export const ALL_MENU_ITEMS = [
  {
    id: 1,
    name: "Tandoori Lamb Chops",
    description: "Succulent chops marinated in spices, yoghurt and garlic, roasted over hardwood charcoal.",
    price: "$28.50",
    image: "https://images.unsplash.com/photo-1544025162-811114215f79?w=400&auto=format&fit=crop&q=60",
    badge: "SIGNATURE",
    category: "LAMB & SEAFOOD"
  },
  {
    id: 2,
    name: "Butter Chicken Delhi Style",
    description: "Tender chicken simmered in a velvety tomato, fresh butter, cream, and cashew nut sauce.",
    price: "$22.00",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&auto=format&fit=crop&q=60",
    badge: "MUST TRY",
    category: "CHICKEN"
  },
  {
    id: 3,
    name: "Paneer Tikka Masala",
    description: "Charred paneer cubes in a rich, spiced bell pepper and tomato cream sauce.",
    price: "$19.50",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&auto=format&fit=crop&q=60",
    badge: null,
    category: "VEGETARIAN"
  },
  {
    id: 4,
    name: "Awadhi Mutton Biryani",
    description: "Fragrant basmati rice layered with spiced mutton, saffron, and mint, cooked under seal.",
    price: "$24.00",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop&q=60",
    badge: "NEW",
    category: "BIRYANI & RICE"
  },
  {
    id: 5,
    name: "Garlic Naan Basket",
    description: "Soft, leavened flatbread topped with minced garlic and butter, baked fresh in the clay oven.",
    price: "$7.50",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=60",
    badge: null,
    category: "FRESH & SIDES"
  },
  {
    id: 6,
    name: "Amritsari Fish Tikka",
    description: "Spiced carom-flavored fish chunks, grilled over charcoal and served with mint chutney.",
    price: "$21.00",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&auto=format&fit=crop&q=60",
    badge: null,
    category: "LAMB & SEAFOOD"
  },
  {
    id: 7,
    name: "Samosa Chaat Royal",
    description: "Crushed potato samosas with chickpeas, sweetened yoghurt, tamarind, and mint chutney.",
    price: "$11.00",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=400&auto=format&fit=crop&q=60",
    badge: "SEASONAL",
    category: "STARTERS"
  },
  {
    id: 8,
    name: "Dal Bukhara Classic",
    description: "Black lentils slow-cooked overnight with tomatoes, butter, and cream for a smoky finish.",
    price: "$16.50",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&auto=format&fit=crop&q=60",
    badge: null,
    category: "VEGETARIAN"
  },
  {
    id: 9,
    name: "Royal Malai Kofta",
    description: "Paneer and potato dumplings filled with raisins, served in a rich cardamom cashew gravy.",
    price: "$18.00",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&auto=format&fit=crop&q=60",
    badge: null,
    category: "VEGETARIAN"
  },
  {
    id: 10,
    name: "Exotic Vegetable Korma",
    description: "Seasonal handpicked garden vegetables simmered in a mildly spiced coconut cashew milk.",
    price: "$17.00",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&auto=format&fit=crop&q=60",
    badge: null,
    category: "VEGETARIAN"
  },
  {
    id: 11,
    name: "Goan Prawn Curry",
    description: "Juicy prawns cooked in a traditional spiced coconut and red chili paste broth.",
    price: "$26.00",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&auto=format&fit=crop&q=60",
    badge: "SIGNATURE",
    category: "LAMB & SEAFOOD"
  },
  {
    id: 12,
    name: "Saffron Rasmalai",
    description: "Poached paneer dumplings soaked in sweet saffron milk, garnished with almond flakes.",
    price: "$9.00",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop&q=60",
    badge: null,
    category: "DRINKS & DESSERTS"
  },
  {
    id: 13,
    name: "Gulab Jamun Flambé",
    description: "Warm milk dumplings soaked in cardamom rose syrup, served with vanilla bean gelato.",
    price: "$9.50",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&auto=format&fit=crop&q=60",
    badge: null,
    category: "DRINKS & DESSERTS"
  },
  {
    id: 14,
    name: "Aromatic Saffron Rice",
    description: "Long-grain basmati rice steamed with saffron, green peas, and whole warm spices.",
    price: "$8.00",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&auto=format&fit=crop&q=60",
    badge: null,
    category: "BIRYANI & RICE"
  },
  {
    id: 15,
    name: "Palak Patta Chaat",
    description: "Crispy batter-fried spinach leaves topped with spiced potatoes, sweet chutneys, and sev.",
    price: "$12.50",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60",
    badge: "NEW",
    category: "STARTERS"
  },
  {
    id: 16,
    name: "Chicken Seekh Kebab",
    description: "Spiced minced chicken skewers grilled over hot coals, served with a tangy onion salad.",
    price: "$19.00",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&auto=format&fit=crop&q=60",
    badge: null,
    category: "CHICKEN"
  },
  {
    id: 17,
    name: "Mango Lassi Mousse",
    description: "A velvety modern take on mango lassi, served chilled in a glass with crushed pistachios.",
    price: "$10.00",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&auto=format&fit=crop&q=60",
    badge: null,
    category: "DRINKS & DESSERTS"
  },
  {
    id: 18,
    name: "Goan Fish Curry",
    description: "Premium kingfish cutlets simmered in a sharp, sour-and-spicy coconut tamarind gravy.",
    price: "$25.00",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&auto=format&fit=crop&q=60",
    badge: null,
    category: "LAMB & SEAFOOD"
  },
  {
    id: 19,
    name: "Imperial Keema Samosa",
    description: "Crisp triangular pastry pockets filled with minced spiced lamb and fresh cilantro.",
    price: "$14.00",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=400&auto=format&fit=crop&q=60",
    badge: null,
    category: "STARTERS"
  },
  {
    id: 20,
    name: "Kesar Pistachio Kulfi",
    description: "Traditional slow-reduced dense milk ice cream flavored with saffron threads and pistachios.",
    price: "$8.50",
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&auto=format&fit=crop&q=60",
    badge: null,
    category: "DRINKS & DESSERTS"
  },
  {
    id: 21,
    name: "Crispy Papadam Basket",
    description: "Thin, crispy spiced lentil wafers served with sweet mango chutney and fresh mint dip.",
    price: "$5.50",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=400&auto=format&fit=crop&q=60",
    badge: null,
    category: "STARTERS"
  },
  {
    id: 22,
    name: "Tandoori Chicken Classic",
    description: "Half chicken on-the-bone marinated in yoghurt and fresh tandoori spices, roasted in clay oven.",
    price: "$18.90",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&auto=format&fit=crop&q=60",
    badge: "POPULAR",
    category: "CHICKEN"
  },
  {
    id: 23,
    name: "Kashmiri Lamb Rogan Josh",
    description: "Tender lamb chunks slow-cooked in a rich, aromatic gravy flavored with Kashmiri red chilies.",
    price: "$24.50",
    image: "https://images.unsplash.com/photo-1544025162-811114215f79?w=400&auto=format&fit=crop&q=60",
    badge: null,
    category: "LAMB & SEAFOOD"
  },
  {
    id: 24,
    name: "Bhindi Masala Sauté",
    description: "Fresh tender lady fingers (okra) dry cooked with onions, tomatoes, and tangy spice blend.",
    price: "$15.90",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&auto=format&fit=crop&q=60",
    badge: null,
    category: "VEGETARIAN"
  },
  {
    id: 25,
    name: "Hyderabadi Dum Biryani",
    description: "Aromatic basmati rice cooked on steam (dum) with saffron-marinated chicken, mint and fried onions.",
    price: "$22.50",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop&q=60",
    badge: "SIGNATURE",
    category: "BIRYANI & RICE"
  },
  {
    id: 26,
    name: "Clay-Oven Butter Naan",
    description: "Traditional soft and pillowy leavened flatbread brushed with premium quality melted butter.",
    price: "$4.50",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=60",
    badge: null,
    category: "FRESH & SIDES"
  },
  {
    id: 27,
    name: "Spiced Cucumber Raita",
    description: "Cool whisked yoghurt with grated English cucumber, roasted cumin powder, and fresh mint.",
    price: "$4.90",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60",
    badge: null,
    category: "FRESH & SIDES"
  }
];

export default function DeliciousMenu({ cart, setCart, setIsCartOpen }) {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("STARTERS");

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

  // Add item to shopping cart drawer
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((cartItem) => cartItem.item.id === item.id);
      if (existing) {
        return prevCart.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { item, quantity: 1 }];
    });
    setIsCartOpen(true); // Automatically slide open cart drawer when item is clicked
  };

  // Dynamic filtering based on active selection
  const filteredItems = useMemo(() => {
    return ALL_MENU_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="bg-[#111111] min-h-screen py-24 px-6 relative overflow-hidden flex flex-col items-center">
      
      {/* Optional: Subtle Background pattern simulation */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/food.png')] mix-blend-overlay"></div>

      <div className="w-full max-w-6xl relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[#c29b57] text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase mb-4">
            {language === "fr" ? "SÉLECTION SPÉCIALE" : "SPECIAL SELECTION"}
          </p>
          
          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-[1px] bg-[#c29b57]/40"></div>
            <div className="w-1.5 h-1.5 rotate-45 border border-[#c29b57] bg-transparent"></div>
            <div className="w-1.5 h-1.5 rotate-45 bg-[#c29b57]"></div>
            <div className="w-1.5 h-1.5 rotate-45 border border-[#c29b57] bg-transparent"></div>
            <div className="w-8 h-[1px] bg-[#c29b57]/40"></div>
          </div>

          <div className="flex justify-center mb-1">
            <img 
              src="/halal.png" 
              alt="Halal Certified" 
              className="h-20 md:h-28 w-auto object-contain drop-shadow-[0_4px_10px_rgba(212,175,55,0.3)]"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-wide">
            {t("menu")}
          </h2>
        </div>

        {/* Categories Menu (Horizontal Scroll on Mobile, Centered on Desktop) */}
        <div className="w-full flex flex-col items-center mb-16 relative z-10">
          <div className="w-full overflow-x-auto scrollbar-none flex justify-start md:justify-center items-center gap-6 md:gap-10 pb-4 border-b border-white/10">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex flex-col items-center gap-3 cursor-pointer group shrink-0 relative pb-3 select-none outline-none border-0 bg-transparent"
                >
                  {/* Circle image container */}
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-2 transition-all duration-300 overflow-hidden flex items-center justify-center bg-zinc-900 shadow-md ${
                    isActive ? "border-[#c29b57] scale-105 shadow-[0_0_15px_rgba(194,155,87,0.3)]" : "border-transparent group-hover:border-white/40 group-hover:scale-105"
                  }`}>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover select-none pointer-events-none"
                    />
                  </div>
                  
                  {/* Category Label */}
                  <span className={`text-[10px] md:text-xs tracking-[0.15em] font-sans font-bold transition-colors duration-300 ${
                    isActive ? "text-[#c29b57]" : "text-gray-400 group-hover:text-white"
                  }`}>
                    {getTranslatedCategoryName(cat.id)}
                  </span>

                  {/* Red/Gold Underline Indicator */}
                  {isActive && (
                    <div className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 h-[3px] bg-[#c29b57] w-12 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Grid Container */}
        <div className="w-full relative">
          
          {/* Center Vertical Divider (Hidden on mobile, visible on desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-800/80 -translate-x-1/2"></div>

          {/* Grid Layout with smooth fade-in list */}
          <div key={activeCategory} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-12 w-full max-w-5xl mx-auto animate-fade">
            {filteredItems.map((item) => (
              <MenuItem 
                key={item.id} 
                item={item} 
                onAddToCart={handleAddToCart}
                onOpenDetails={(selected) => {
                  navigate(`/menu/${selected.id}`);
                }}
              />
            ))}
          </div>
        </div>

        {/* Section Footer */}
        <div className="mt-20 flex flex-col items-center gap-6">
          <p className="text-gray-300 text-sm font-light tracking-wide">
            {language === "fr" ? (
              <>En hiver tous les jours de <span className="text-[#c29b57] font-medium">19h00</span> à <span className="text-[#c29b57] font-medium">21h00</span></>
            ) : (
              <>During winter daily from <span className="text-[#c29b57] font-medium">7:00 pm</span> to <span className="text-[#c29b57] font-medium">9:00 pm</span></>
            )}
          </p>
        </div>

      </div>

      {/* Floating Cart Trigger Badge */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#c29b57] text-zinc-950 p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border border-[#c29b57]/20"
        aria-label="Open Order Cart"
      >
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M2 17h20M12 3a9 9 0 00-9 9v3h18v-3a9 9 0 00-9-9zM10 3V1h4v2" />
          </svg>
          {cart && cart.length > 0 && (
            <span className="absolute -top-2.5 -right-2.5 bg-[#8c2328] text-white text-[9px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#111111]">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </div>
      </button>


    </section>
  );
}