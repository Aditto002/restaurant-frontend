import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebookF, FaInstagram, FaTripadvisor } from "react-icons/fa";

export default function Footer({
  address = "7 Boulevard de la Liberation, 05000 Gap, France",
  phone = "+33 6 68 43 40 19",
  email = "ic05gap@gamil.com",
  className = "",
}) {
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <footer className={`relative bg-black text-white border-t border-white/10 pt-12 pb-6 px-6 md:px-12 lg:px-16 overflow-hidden font-sans w-full ${className}`}>
      {/* Decorative background glow elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-black/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: Info (Contact, Hours, Socials) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Quick Contact Links */}
            <div className="flex flex-col gap-4 text-sm md:text-base">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-200 mb-1">
                CONTACT DETAILS
              </h4>
              
              {/* Address */}
              <a 
                href={directionsUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-4 text-white/90 hover:text-white transition-colors duration-300 group"
              >
                <span className="p-2.5 rounded-lg bg-white/10 border border-white/10 text-white group-hover:bg-white/20 transition-colors shrink-0 mt-0.5">
                  <FaMapMarkerAlt />
                </span>
                <span className="leading-relaxed">{address}</span>
              </a>

              {/* Phone */}
              <a 
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-4 text-white/90 hover:text-white transition-colors duration-300 group"
              >
                <span className="p-2.5 rounded-lg bg-white/10 border border-white/10 text-white group-hover:bg-white/20 transition-colors shrink-0">
                  <FaPhoneAlt />
                </span>
                <span>{phone}</span>
              </a>

              {/* Email */}
              <a 
                href={`mailto:${email}`}
                className="flex items-center gap-4 text-white/90 hover:text-white transition-colors duration-300 group"
              >
                <span className="p-2.5 rounded-lg bg-white/10 border border-white/10 text-white group-hover:bg-white/20 transition-colors shrink-0">
                  <FaEnvelope />
                </span>
                <span className="break-all">{email}</span>
              </a>
            </div>

            {/* Opening Hours & Socials Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-white/10">
              
              {/* Business Hours */}
              <div className="flex flex-col gap-3">
                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-200 flex items-center gap-2">
                  <FaClock className="text-amber-200 text-xs" /> OPENING HOURS
                </h4>
                <ul className="text-white/80 text-xs md:text-sm leading-loose">
                  <li>
                    <span className="text-white font-medium">Mon - Sat:</span> 11:30 AM - 2:30 PM, 6:30 PM - 10:30 PM
                  </li>
                  <li>
                    <span className="text-white font-medium">Sunday:</span> 6:30 PM - 10:30 PM
                  </li>
                </ul>
              </div>

              {/* Social Channels */}
              <div className="flex flex-col gap-3">
                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-200">
                  FOLLOW US
                </h4>
                <p className="text-white/80 text-xs mb-1">Connect with us on social media for updates and offers.</p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="p-3 rounded-lg bg-white/10 border border-white/10 hover:border-white text-white hover:bg-white/25 transition-all duration-300 hover:scale-105"
                  >
                    <FaFacebookF className="text-sm md:text-base" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="p-3 rounded-lg bg-white/10 border border-white/10 hover:border-white text-white hover:bg-white/25 transition-all duration-300 hover:scale-105"
                  >
                    <FaInstagram className="text-sm md:text-base" />
                  </a>
                  <a
                    href="https://tripadvisor.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TripAdvisor"
                    className="p-3 rounded-lg bg-white/10 border border-white/10 hover:border-white text-white hover:bg-white/25 transition-all duration-300 hover:scale-105"
                  >
                    <FaTripadvisor className="text-sm md:text-base" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE: Interactive Map Iframe */}
          <div className="lg:col-span-6 flex flex-col gap-4 w-full">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-200 mb-1">
                  OUR LOCATION
                </h4>
                <p className="text-white/80 text-xs sm:text-sm">
                  Visit us in Gap, France. Click below to get directions.
                </p>
              </div>
              
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-white/90 transition-all duration-300 rounded-lg shadow-lg shadow-black/10 hover:scale-[1.02] shrink-0"
              >
                Get Directions
              </a>
            </div>

            {/* Map Frame Container */}
            <div className="relative group w-full overflow-hidden rounded-2xl border border-white/20 bg-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-white/30">
              
              {/* Map loading state indicator or overlay */}
              <div className="absolute inset-0 bg-black flex items-center justify-center -z-10 text-white/50 text-sm">
                Loading interactive map...
              </div>

              {/* Interactive Iframe Google Map */}
              <iframe
                title="Indienne Cuisine Restaurant Interactive Map"
                src={mapEmbedUrl}
                className="w-full h-[200px] md:h-[250px] border-0 block select-none"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Inner Vignette / Shadow Overlay to blend the map edges smoothly */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_35px_rgba(0,0,0,0.65)] border border-black/15 bg-gradient-to-t from-black/15 via-transparent to-black/10" />

              {/* Address Badge Overlay */}
              <div className="absolute bottom-4 left-4 bg-zinc-950/95 backdrop-blur-md border border-white/10 px-3.5 py-2 rounded-lg pointer-events-none flex items-center gap-2 max-w-[90%] shadow-xl z-10">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-red-500 absolute" />
                <span className="text-xs text-white/90 font-medium truncate">
                  {address.split(',')[0]}
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM SECTION: Copyright & Legal */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60 font-medium">
          <p>© {new Date().getFullYear()} Indienne Cuisine. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/80 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/80 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
