import React from "react";
import { 
  Home, Building2, Sparkles, Landmark, LayoutGrid, Map, 
  Factory, Warehouse, Hammer, TrendingUp, ChevronRight 
} from "lucide-react";
import { motion } from "motion/react";

export const Services: React.FC = () => {
  const servicesList = [
    {
      icon: <Home className="w-6 h-6 text-luxury-gold" />,
      title: "Residential Properties",
      description: "Exclusive family homes, modern premium apartments, and customized villas across Raipur's green zones."
    },
    {
      icon: <Building2 className="w-6 h-6 text-luxury-gold" />,
      title: "Commercial Properties",
      description: "High-visibility retail showrooms, dual-floor shopping complex spaces, and central business corporate offices."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-luxury-gold" />,
      title: "Luxury Homes",
      description: "Bespoke architectural estates styled with royal Italian marble, landscaped pools, and central automation."
    },
    {
      icon: <Landmark className="w-6 h-6 text-luxury-gold" />,
      title: "Elite Villas",
      description: "Double-height gated community villas on VIP Road with round-the-clock patrol security and leisure clubhouses."
    },
    {
      icon: <LayoutGrid className="w-6 h-6 text-luxury-gold" />,
      title: "Premium Apartments",
      description: "Spacious 3 BHK & 4 BHK high-rise penthouses near Ambuja Mall with panoramic city skyline views."
    },
    {
      icon: <Map className="w-6 h-6 text-luxury-gold" />,
      title: "Agricultural Land",
      description: "Securely boundary-walled farm plots and vast development acreage along outer Raipur growth coordinates."
    },
    {
      icon: <Factory className="w-6 h-6 text-luxury-gold" />,
      title: "Industrial Properties",
      description: "Durable manufacturing layouts, structural processing zones, and heavy industrial yards in Raipur Siltara."
    },
    {
      icon: <Warehouse className="w-6 h-6 text-luxury-gold" />,
      title: "Smart Warehouses",
      description: "High-clearance pre-engineered storage logistics warehouses with loaded multi-truck parking bays."
    },
    {
      icon: <Hammer className="w-6 h-6 text-luxury-gold" />,
      title: "Construction Works",
      description: "Aaradhana brand construction providing end-to-end foundation, premium structural concrete, and classic finishes."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-luxury-gold" />,
      title: "Investment Consulting",
      description: "Data-backed advisory pointing you to future expansion corridors in Raipur to capture high multi-fold yields."
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#0B1F3A] text-white relative overflow-hidden self-stretch">
      {/* Structural Golden Orbs */}
      <div className="absolute right-0 top-1/4 w-80 h-80 bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Grid Alignment lines for blueprints */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle, #D4AF37 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-luxury-gold font-bold uppercase">
            COMPREHENSIVE EXPERTISE
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight mt-2">
            Signature Real Estate & Construction Services
          </h2>
          <div className="w-16 h-[2px] bg-luxury-gold mx-auto mt-4" />
          <p className="text-gray-300 text-xs sm:text-sm font-light mt-3 leading-relaxed">
            From premier building works to legal Chhattisgarh land consultancy, Aaradhana Realty delivers legendary value.
          </p>
        </div>

        {/* Animated Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {servicesList.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: (idx % 5) * 0.08, duration: 0.6 }}
              className="glass-card rounded-sm p-5 hover:border-luxury-gold/50 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between cursor-default relative overflow-hidden text-left"
            >
              {/* Card Gold Shine Overlay on Hover */}
              <div className="absolute -inset-x-full inset-y-0 bg-linear-to-r from-transparent via-luxury-gold/5 to-transparent -skew-x-25 group-hover:animate-gold-sweep" />

              <div>
                {/* Icon wrapper */}
                <div className="w-11 h-11 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-luxury-gold/10 group-hover:border-luxury-gold/30 transition-all">
                  {service.icon}
                </div>

                <h3 className="text-white font-sans font-bold text-sm sm:text-base uppercase tracking-wider group-hover:text-luxury-gold transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-gray-300 font-light mt-2.5 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Subtle learn details card indicator */}
              <div className="flex items-center gap-1.5 text-luxury-gold/40 group-hover:text-luxury-gold text-[10px] tracking-widest uppercase font-semibold mt-4 pt-4 border-t border-white/5 group-hover:border-luxury-gold/10 transition-all">
                Corporate Service
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
