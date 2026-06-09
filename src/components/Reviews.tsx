import React, { useState, useEffect } from "react";
import { useCMS } from "../context/CMSContext";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const Reviews: React.FC = () => {
  const { reviews } = useCMS();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [reviews]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  if (reviews.length === 0) return null;

  return (
    <section id="reviews" className="py-24 bg-[#050f1b] text-white relative overflow-hidden self-stretch">
      {/* Dynamic light overlays */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-luxury-gold font-bold uppercase">
            PATRON ENDORSEMENTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight mt-2">
            Raipur client Testimonials
          </h2>
          <div className="w-16 h-[2px] bg-luxury-gold mx-auto mt-4" />
          <p className="text-gray-400 text-xs sm:text-sm font-light mt-3">
            With over 22 verified five-star consultations, our priority remains absolute corporate fidelity.
          </p>
        </div>

        {/* Carousel Frame */}
        <div className="relative min-h-[280px] sm:min-h-[250px] flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="glass-card-dark rounded-sm p-8 sm:p-12 border border-luxury-gold/15 max-w-2xl w-full text-center relative shadow-2xl overflow-hidden"
            >
              {/* Giant gold quote icon in background */}
              <Quote className="absolute -top-6 -right-6 w-32 h-32 text-white/[0.02] pointer-events-none" />

              <div className="flex flex-col items-center">
                {/* 5 Stars with micro pulse animations */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: reviews[activeIndex]?.rating || 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.7 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.08, type: "spring" }}
                    >
                      <Star className="w-5 h-5 text-luxury-gold fill-luxury-gold gold-glow" />
                    </motion.div>
                  ))}
                </div>

                {/* Quote Content */}
                <p className="font-serif italic text-base sm:text-lg text-gray-100 leading-relaxed max-w-xl">
                  "{reviews[activeIndex]?.text}"
                </p>

                {/* Divider Line */}
                <div className="w-10 h-[1px] bg-luxury-gold/30 my-6" />

                {/* Author Name */}
                <h4 className="font-sans font-bold text-sm sm:text-base text-white tracking-wider uppercase">
                  {reviews[activeIndex]?.author}
                </h4>
                
                {/* Author Location/Title role */}
                <p className="text-[10px] text-luxury-gold-light/80 font-mono tracking-widest uppercase mt-1">
                  {reviews[activeIndex]?.role || "Verified Client Raipur"}
                </p>
                
                <p className="text-[9px] text-gray-500 font-mono mt-2">
                  Dated • {reviews[activeIndex]?.date}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-14 w-10 h-10 rounded-full border border-white/10 hover:border-luxury-gold bg-luxury-blue/50 hover:bg-luxury-gold hover:text-luxury-blue text-white transition-all flex items-center justify-center cursor-pointer z-10"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow button */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-14 w-10 h-10 rounded-full border border-white/10 hover:border-luxury-gold bg-luxury-blue/50 hover:bg-luxury-gold hover:text-luxury-blue text-white transition-all flex items-center justify-center cursor-pointer z-10"
            aria-label="Next Review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === activeIndex ? "w-6 bg-luxury-gold" : "w-1.5 bg-white/20"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
