import React from "react";
import { useCMS } from "../context/CMSContext";
import { Shield, Eye, Flame, Landmark, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export const AboutUs: React.FC = () => {
  const { cmsConfig } = useCMS();
  const hp = cmsConfig.homepage;

  const features = [
    { name: "Raipur Realty Services", desc: "Premium legal counseling, customized buy/sell agency, and clear title local verification." },
    { name: "Turnkey Construction", desc: "Chhattisgarh-registered Grade-A building material works, architectural planning & engineering." },
    { name: "Investment Advisory", desc: "Data-driven commercial plots & Naya Raipur luxury villa selection yielding heavy capital gains." },
    { name: "Property Management", desc: "Overseas investor care, structural routine audits, lease contracting & high-yield renting solutions." },
  ];

  return (
    <section id="about" className="py-24 bg-luxury-blue text-white relative overflow-hidden self-stretch">
      <div className="absolute top-0 left-0 w-64 h-64 bg-luxury-gold/[0.04] rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-luxury-gold/[0.04] rounded-full filter blur-3xl pointer-events-none" />
      
      {/* Visual blueprint layout line */}
      <div className="absolute left-8 top-12 bottom-12 w-[1px] bg-white/10 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Imagery and Golden Seal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span- così lg:col-span-5 relative"
          >
            <div className="relative overflow-hidden rounded-sm shadow-2xl group cursor-pointer">
              {/* Premium presentation picture */}
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Aaradhana Real Estate Raipur"
                className="w-full object-cover h-[350px] sm:h-[450px] md:h-[500px] group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-blue/90 via-transparent to-transparent opacity-85" />
              
              {/* Real estate office overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <span className="font-mono text-[9px] tracking-widest text-luxury-gold-light uppercase font-bold">
                  Flagship Office Lobby
                </span>
                <p className="text-sm font-serif italic text-gray-100 mt-1">
                  "Building trust block by block across Chhattisgarh."
                </p>
              </div>
            </div>

            {/* floating Luxury Golden Medallion */}
            <div className="absolute -bottom-6 -right-6 bg-luxury-blue text-white p-6 rounded-xs shadow-2xl border border-luxury-gold flex flex-col items-center justify-center text-center w-36 h-36">
              <Landmark className="w-7 h-7 text-luxury-gold mb-1 animate-pulse" />
              <span className="font-serif font-bold text-lg text-luxury-gold tracking-tight">⭐ 5.0</span>
              <span className="text-[9px] text-gray-300 font-mono tracking-widest uppercase font-semibold">
                Google Rating
              </span>
            </div>
          </motion.div>

          {/* Right Column - Text Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col items-start gap-4"
          >
            <span className="font-mono text-xs tracking-[0.25em] text-luxury-gold uppercase font-bold relative pl-7 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-[2px] before:bg-luxury-gold">
              CORPORATE INSIGHTS
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
              {hp.aboutTitle || "Aaradhana Realty And RealProperties Pvt. Ltd."}
            </h2>

            <p className="text-sm font-sans font-medium text-luxury-gold-light uppercase tracking-widest leading-relaxed">
              {hp.aboutSubtitle || "Leader in Construction, Builders & High-Trust Property Advisory"}
            </p>

            <hr className="w-16 border-t-2 border-luxury-gold my-1" />

            <div className="text-gray-300 space-y-4 text-sm sm:text-base leading-relaxed font-light">
              <p>{hp.aboutParagraph1}</p>
              <p>{hp.aboutParagraph2}</p>
            </div>

            {/* Services Bullet list cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-6">
              {features.map((feat, idx) => (
                <div key={idx} className="flex gap-3 bg-white/5 p-3.5 border border-white/10 rounded-sm hover:border-luxury-gold hover:bg-white/10 transition-all">
                  <CheckCircle className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold font-sans text-white uppercase tracking-wider">
                      {feat.name}
                    </h4>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
