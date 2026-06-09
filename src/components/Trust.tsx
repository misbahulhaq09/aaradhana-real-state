import React from "react";
import { ShieldCheck, UserCheck, Star, Zap, Award, FileText } from "lucide-react";
import { motion } from "motion/react";

export const Trust: React.FC = () => {
  const trustBadges = [
    { icon: <ShieldCheck className="w-5 h-5 text-luxury-gold" />, title: "Verified Real Estate Company" },
    { icon: <UserCheck className="w-5 h-5 text-luxury-gold" />, title: "Trusted Local Experts" },
    { icon: <Star className="w-5 h-5 text-luxury-gold fill-luxury-gold" />, title: "5 Star Client Rating" },
    { icon: <Zap className="w-5 h-5 text-luxury-gold" />, title: "Fast Response Team" },
    { icon: <Award className="w-5 h-5 text-luxury-gold" />, title: "Property Investment Experts" },
    { icon: <FileText className="w-5 h-5 text-luxury-gold" />, title: "Full Documentation Support" },
  ];

  return (
    <section className="bg-[#050f1b] py-10 border-y border-luxury-gold/15 relative overflow-hidden self-stretch">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle, #D4AF37 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />
           
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-6">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-luxury-gold-light font-bold">
            Gold-Grade Standards
          </span>
          <h3 className="text-white text-xs sm:text-sm font-sans tracking-widest uppercase font-semibold mt-1">
            WHY CLIENTS PLENTIFULLY TRUST AARADHANA REALTY
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {trustBadges.map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass-card-dark rounded-sm p-4 hover:border-luxury-gold/50 transition-all flex flex-col items-center text-center justify-center gap-3 group relative overflow-hidden h-28 gold-shadow-hover cursor-default"
            >
              {/* Subtle sweep line on hover */}
              <div className="absolute -inset-x-full inset-y-0 bg-linear-to-r from-transparent via-luxury-gold/10 to-transparent -skew-x-25 group-hover:animate-gold-sweep" />
              
              <div className="w-10 h-10 rounded-full bg-luxury-blue border border-luxury-gold/20 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                {badge.icon}
              </div>
              <span className="text-white text-[11px] sm:text-xs font-sans tracking-wide leading-tight group-hover:text-luxury-gold transition-colors font-medium">
                {badge.title}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
