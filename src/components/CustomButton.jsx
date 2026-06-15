import React from "react";

const CustomButton = ({ 
  children, 
  className = "", 
  onClick, 
  ...props 
}) => {

  const baseStyles = "bg-black text-white font-bold rounded-full px-8 py-3 transition-colors duration-300 hover:bg-zinc-800 cursor-pointer shadow-md";

  return (
    <button
      onClick={onClick}
      // Dynamically merge the base styles with any custom classes passed from the parent
      className={`${baseStyles} ${className}`.trim()}
      {...props} // Spreads native HTML attributes like disabled, type="submit", etc.
    >
      {children}
    </button>
  );
};

export default CustomButton;