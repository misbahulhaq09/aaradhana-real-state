import React, { useEffect, useState } from "react";
import { useCMS } from "../context/CMSContext";
import { ArrowRight, Phone, MessageSquare, Star, Landmark } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onExploreClick: () => void;
}

const CountUp: React.FC<{ valueStr: string; label: string }> = ({ valueStr, label }) => {
  const numberPart = parseInt(valueStr.replace(/\D/g, ""), 10) || 0;
  const nonNumberPart = valueStr.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = numberPart;
    if (end === 0) {
      setCount(0);
      return;
    }
    const duration = 1500;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [numberPart]);

  return (
    <div className="text-center md:text-left px-4 py-3 border-r last:border-0 border-white/10">
      <div className="text-2xl sm:text-3xl md:text-4xl font-sans font-extrabold text-white tracking-tight flex items-center justify-center md:justify-start gap-1">
        <span className="text-luxury-gold gold-glow">{count}</span>
        <span className="text-luxury-gold-light">{nonNumberPart}</span>
      </div>
      <div className="text-[10px] sm:text-xs text-gray-300 font-sans tracking-widest uppercase font-semibold mt-1">
        {label}
      </div>
    </div>
  );
};

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const { cmsConfig } = useCMS();
  const hp = cmsConfig.homepage;

  // Static high-quality background slide images
  const slides = [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleWhatsApp = () => {
    const cleanPhone = cmsConfig.contact.whatsapp.replace(/\+/g, "").replace(/\s/g, "");
    const url = `https://wa.me/${cleanPhone}?text=Hi,%20I'm%20interested%20in%20Aaradhana%20Realty%20listings.`;
    window.open(url, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:${cmsConfig.contact.phone}`;
  };

  return (
    <section id="hero" className="relative self-stretch min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background Hero Slides Interface */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1500 ease-in-out z-0 ${
            idx === currentSlide ? "opacity-35 scale-100" : "opacity-0 scale-105"
          }`}
          style={{
            backgroundImage: `url(${slide})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Radial Darkening Gradient with Gold Ambient Highlights */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#05101F] via-[#0B1F3A]/95 to-transparent z-0" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-luxury-gold/5 blur-[130px] rounded-full pointer-events-none" />

      {/* Bottom Architectural Overlay Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle, #D4AF37 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />

      {/* Main Content Area */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-24 pb-16 md:py-32 flex flex-col justify-between min-h-screen">
        
        {/* Placeholder spacer */}
        <div className="hidden md:block h-6" />

        {/* Center Intro Block */}
        <div className="max-w-3xl my-auto text-left flex flex-col items-start gap-4">
          
          {/* Elite Raipur Label Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 border border-luxury-gold/30 px-3 py-1.5 rounded-full bg-luxury-blue/90 font-mono text-[9px] tracking-[0.25em] uppercase text-luxury-gold shadow-md"
          >
            <Star className="w-3.5 h-3.5 text-luxury-gold fill-luxury-gold" />
            ⭐ 5.0 Rated builder in Raipur, CG
          </motion.div>

          {/* Dynamic Headline Text */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight tracking-tight text-left"
          >
            {hp.heroTitle || "Your Trusted Real Estate Partner In Raipur"}
          </motion.h2>

          {/* Golden Highlight bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "90px" }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-1 bg-luxury-gold rounded-full"
          />

          {/* Subtitle Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-gray-300 font-sans text-base sm:text-lg leading-relaxed max-w-2xl text-left font-light"
          >
            {hp.heroSubtitle || "Buy, Sell, Invest and Build with Confidence. Premium Residential, Commercial and Investment Opportunities Across Raipur."}
          </motion.p>

          {/* Action CTAs Button Group */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mt-4"
          >
            {/* Primary explore button */}
            <button
              onClick={onExploreClick}
              className="group bg-linear-to-r from-luxury-gold via-luxury-gold-light to-luxury-gold-dark text-luxury-blue font-bold px-6 py-4.5 rounded-sm transition-all duration-300 hover:scale-[1.03] shadow-lg hover:shadow-luxury-gold/20 flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-widest"
            >
              Explore Properties
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>

            {/* WhatsApp CTA */}
            <button
              onClick={handleWhatsApp}
              className="bg-[#128C7E] hover:bg-[#075E54] text-white font-bold px-5 py-4.5 rounded-sm transition-all duration-300 hover:scale-[1.03] flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-widest shadow-md"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              WhatsApp Now
            </button>

            {/* Direct Call CTA */}
            <button
              onClick={handleCall}
              className="bg-transparent hover:bg-white/10 text-white font-bold px-5 py-4.5 rounded-sm border border-white/20 hover:border-white/55 transition-all duration-300 hover:scale-[1.03] flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-widest"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </button>
          </motion.div>

        </div>

        {/* Dynamic Numerical Statistics Grid Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="glass-card mt-12 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 rounded-sm p-2 sm:p-5 shadow-2xl relative overflow-hidden"
        >
          {/* Shine effect inside board */}
          <div className="absolute -inset-x-full inset-y-0 bg-linear-to-r from-transparent via-white/5 to-transparent -skew-x-25 animate-gold-sweep" />
          
          <CountUp valueStr={hp.statProperties || "500+"} label="Premium Properties" />
          <CountUp valueStr={hp.statClients || "300+"} label="Happy Clients" />
          <CountUp valueStr={hp.statDeals || "100+"} label="Successful Deals" />
          <CountUp valueStr={hp.statRating || "5.0 ★"} label="Avg Google Rating" />
        </motion.div>

      </div>
    </section>
  );
};
