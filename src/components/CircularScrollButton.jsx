import React from "react";

const CircularScrollButton = ({ label, icon, onClick, className = "" }) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center cursor-pointer group ${className}`}
      role="button"
      aria-label={label}
    >
      {/* Outer Thin Circular Border */}
      <div className="relative w-20 h-20 rounded-full border border-white/30 flex items-center justify-center transition-colors duration-300 group-hover:border-white/70">
        
        {/* Inner Solid Blue Circle */}
        <div className="w-[60px] h-[60px] bg-blue-300 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-105 shadow-xl">
          {/* Bouncing Arrow */}
          <span className="text-3xl animate-bounce mt-1">
            {icon}
          </span>
        </div>

      </div>
      
      {/* Label Below */}
      <span className="text-white text-xs tracking-[0.2em] mt-4 uppercase font-semibold">
        {label}
      </span>
    </div>
  );
};

export default CircularScrollButton;