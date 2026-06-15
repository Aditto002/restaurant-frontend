// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import MenuShowcase from "./components/MenuShowcase";
import ChefsSpecialMarquee from "./pages/ChefsSpecialMarquee";
import ContactPage from "./pages/ContactPage";
import DeliciousMenu from "./pages/DeliciousMenu";
import HomeView from "./pages/HomeView";
import HeroSection from "./pages/HeroSection";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import CheckoutPage from "./pages/CheckoutPage";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const showFooter = location.pathname !== "/contact" && location.pathname !== "/checkout";
  const [cart, setCart] = useState([]);

  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomeView />
              <MenuShowcase />
              <HeroSection />
              <ChefsSpecialMarquee />
              {/* <ContactPage/> */}
            </>
          }
        />
        <Route
          path="/menu"
          element={
            <>
              <DeliciousMenu cart={cart} setCart={setCart} />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <CheckoutPage cart={cart} setCart={setCart} />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <AboutUs />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <ContactUs />
            </>
          }
        />
      </Routes>
      {showFooter && <Footer />}
    </main>
  );
}

export default App;
