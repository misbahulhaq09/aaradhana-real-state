import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
  cmsConfig: {
    companyName: string;
    loadingLogo: string;
    loadingSubtitle: string;
    loadingTagline: string;
  };
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, cmsConfig }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fill the progress bar smoothly over 2.7s
    const start = Date.now();
    const duration = 2700;
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const calculated = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(calculated);
      
      if (elapsed >= duration) {
        clearInterval(interval);
        // Add a small extra delay for the smooth 3-second completion experience
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  const words = cmsConfig.companyName.split(" ");

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-radial from-[#122c50] to-[#050e1b] overflow-hidden">
      {/* Dynamic Golden light overlay background */}
      <div className="absolute inset-x-0 -top-40 h-[300px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-x-0 -bottom-40 h-[300px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-3xl px-6 flex flex-col items-center relative z-10 text-center">
        {/* 1. App Emblem/Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-18 h-18 sm:w-22 sm:h-22 rounded-full border-2 border-luxury-gold flex items-center justify-center text-3xl sm:text-4xl bg-[#0B1F3A]/80 shadow-[0_0_30px_rgba(212,175,55,0.25)] relative mb-6 overflow-hidden"
        >
          {/* Subtle gold shine loop overlay */}
          <div className="absolute -inset-x-full inset-y-0 bg-linear-to-r from-transparent via-luxury-gold/30 to-transparent -skew-x-25 animate-gold-sweep" />
          <span className="gold-glow">{cmsConfig.loadingLogo || "🏛️"}</span>
        </motion.div>

        {/* 2. Company Name Word & Letter Reveal */}
        <div className="mb-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase text-white flex flex-wrap justify-center gap-x-3 gap-y-1">
            {words.map((word, wordIdx) => (
              <span key={wordIdx} className="inline-block whitespace-nowrap">
                {word.split("").map((letter, letterIdx) => (
                  <motion.span
                    key={letterIdx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.2 + (wordIdx * 4 + letterIdx) * 0.03,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    className={word === "AARADHANA" || word.startsWith("AARAD") ? "text-luxury-gold gold-glow" : "text-white"}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
        </div>

        {/* 3. Gold light sweep effect overlay divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "160px" }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          className="h-[1px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent relative mb-5 overflow-hidden"
        >
          <div className="absolute inset-y-0 -inset-x-full bg-linear-to-r from-transparent via-white to-transparent animate-gold-sweep" />
        </motion.div>

        {/* 4. Tagline & Subtitle reveal */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-luxury-gold-light/90 font-serif italic text-base sm:text-lg mb-2"
        >
          {cmsConfig.loadingSubtitle || "Building Dreams. Creating Value."}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-gray-300 text-xs sm:text-sm tracking-widest uppercase mb-10"
        >
          {cmsConfig.loadingTagline || "Trusted Real Estate Experts In Raipur"}
        </motion.p>

        {/* 5. Progress Bar */}
        <div className="w-56 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-linear-to-r from-luxury-gold to-luxury-gold-light rounded-full shadow-[0_0_8px_rgba(212,175,55,0.7)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Small percentage readout */}
        <span className="text-luxury-gold/50 font-mono text-[10px] tracking-widest uppercase mt-2">
          Securing Connection • {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};
