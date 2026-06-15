import React from "react";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-zinc-950 py-16 px-4 md:px-12 flex flex-col items-center justify-center gap-12">
      
      <div className="w-full max-w-6xl">
        <h3 className="text-zinc-500 text-xs tracking-widest uppercase mb-4">
          Default Footer View
        </h3>
        {/* Render with default prop text provided in requirements */}
        <Footer />
      </div>

      <div className="w-full max-w-6xl">
        <h3 className="text-zinc-500 text-xs tracking-widest uppercase mb-4">
          Overridden Props (Custom Location)
        </h3>
        {/* Easily reuse with custom props anywhere else in your layout */}
        <Footer
          address="12 CHAMPS-ÉLYSÉES, 75008 PARIS, FRANCE"
          phone="+33 1 42 25 15 15"
          email="PARIS-INFO@INDIENNE.COM"
        />
      </div>

    </main>
  );
}