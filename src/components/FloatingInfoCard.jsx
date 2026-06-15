import React from "react";

const FloatingInfoCard = ({ title, subtitle, className = "" }) => {
  return (
    <div 
      className={`bg-[#8C6B42] text-white px-8 py-3 rounded-full flex flex-col items-center justify-center shadow-lg text-center ${className}`}
    >
      <span className="text-[10px] md:text-xs tracking-widest uppercase mb-0.5 opacity-90">
        {subtitle}
      </span>
      <span className="text-sm md:text-base font-bold tracking-widest uppercase">
        {title}
      </span>
    </div>
  );
};

export default FloatingInfoCard;