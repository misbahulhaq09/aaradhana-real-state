import React, { useState, useEffect } from "react";
import { useCMS } from "../context/CMSContext";
import { Phone, ArrowUp, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const FloatingActions: React.FC = () => {
  const { cmsConfig } = useCMS();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleWhatsAppClick = () => {
    const cleanPhone = cmsConfig.contact.whatsapp.replace(/\+/g, "").replace(/\s/g, "");
    const url = `https://wa.me/${cleanPhone}?text=Hi,%20I%20am%20enquiring%20about%20your%20Raipur%20properties.`;
    window.open(url, "_blank");
  };

  const handleCallClick = () => {
    window.location.href = `tel:${cmsConfig.contact.phone}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      
      {/* WhatsApp Chat Launcher */}
      <button
        onClick={handleWhatsAppClick}
        className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 relative group cursor-pointer"
        title="Chat on WhatsApp"
      >
        <span className="absolute right-14 py-1.5 px-3 rounded-md bg-zinc-950 text-white text-[10px] tracking-widest font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
          WhatsApp Desk
        </span>
        <MessageSquare className="w-5 h-5 fill-white text-[#25D366]" />
      </button>

      {/* Direct phone Call Launcher */}
      <button
        onClick={handleCallClick}
        className="w-12 h-12 rounded-full bg-luxury-blue border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-blue hover:border-luxury-gold flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 relative group cursor-pointer"
        title="Call Hotline"
      >
        <span className="absolute right-14 py-1.5 px-3 rounded-md bg-zinc-950 text-white text-[10px] tracking-widest font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
          Call Executive
        </span>
        <Phone className="w-5 h-5" />
      </button>

      {/* Back to top click button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-luxury-gold text-luxury-blue shadow-2xl flex items-center justify-center hover:bg-luxury-gold-light hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
};
