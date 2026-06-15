import { useState, useRef } from "react";
import { motion } from "framer-motion";

const MenuCard = ({ menu, isActive, onClick }) => {
  return (
    <motion.div
      layoutId={menu.id}
      onClick={onClick}
      layout
      transition={{
        layout: {
          type: "spring",
          stiffness: 220,
          damping: 25,
          mass: 0.8,
        },
      }}
      className={`relative cursor-pointer rounded-sm overflow-hidden flex-shrink-0 ${
        isActive
          ? "z-10 w-[85vw] md:w-[460px] border-2 border-yellow-500 shadow-[0_0_40px_rgba(234,179,8,0.35)] opacity-100"
          : "z-0 w-[60vw] md:w-[280px] opacity-50 hover:opacity-80"
      }`}
      style={{ aspectRatio: "3/4" }}
    >
      <img
        src={menu.img}
        alt={`${menu.type} Menu`}
        className="w-full h-full object-cover"
      />
      {!isActive && (
        <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 hover:opacity-40 pointer-events-none" />
      )}
    </motion.div>
  );
};

// ✅ Parent component — swap logic is here
const MenuCarousel = ({ menus }) => {
  const [activeId, setActiveId] = useState(menus[1]?.id ?? menus[0].id);
  const midIndex = Math.floor(menus.length / 2);

  // Always keep active card at center position
  const orderedMenus = (() => {
    const arr = [...menus];
    const activeIdx = arr.findIndex((m) => m.id === activeId);
    if (activeIdx !== midIndex) {
      // Swap active card with middle card
      [arr[midIndex], arr[activeIdx]] = [arr[activeIdx], arr[midIndex]];
    }
    return arr;
  })();

  const handleClick = (clickedId) => {
    if (clickedId === activeId) return;
    setActiveId(clickedId);
  };

  return (
    <motion.div
      layout
      className="flex gap-4 items-center justify-center overflow-hidden py-8"
    >
      {orderedMenus.map((menu) => (
        <MenuCard
          key={menu.id}
          menu={menu}
          isActive={menu.id === activeId}
          onClick={() => handleClick(menu.id)}
        />
      ))}
    </motion.div>
  );
};

export default MenuCard;