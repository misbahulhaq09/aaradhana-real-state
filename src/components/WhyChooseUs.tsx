import React from "react";
import { 
  BadgeCheck, UserCheck, MapPin, Eye, 
  HelpCircle, Car, FolderGit, Heart 
} from "lucide-react";
import { motion } from "motion/react";

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: <BadgeCheck className="w-5 h-5 text-luxury-gold" />,
      title: "100% Verified Listings",
      desc: "Every plot, duplex, or office suite undergoes strict legal title checking before portfolio listing."
    },
    {
      icon: <UserCheck className="w-5 h-5 text-luxury-gold" />,
      title: "Expert Raipur Advisory Team",
      desc: "Our advisors possess extensive market tenure in Chhattisgarh local zoning regulations."
    },
    {
      icon: <MapPin className="w-5 h-5 text-luxury-gold" />,
      title: "Local Market Knowledge",
      desc: "Instant access to high-yield future growth sectors in Lalpur, VIP Road, Siltara, and Naya Raipur."
    },
    {
      icon: <Eye className="w-5 h-5 text-luxury-gold" />,
      title: "Transparent, Zero-Markup Deals",
      desc: "No hidden charges or surprise commissions. Direct-owner coordination and builder rates."
    },
    {
      icon: <HelpCircle className="w-5 h-5 text-luxury-gold" />,
      title: "Investment Growth Guidance",
      desc: "Smart ROI analysis calculations mapped over standard state development parameters."
    },
    {
      icon: <Car className="w-5 h-5 text-luxury-gold" />,
      title: "Executive Guided Site Visits",
      desc: "Complimentary AC site chauffeured visits matching your calendar at short notices."
    },
    {
      icon: <FolderGit className="w-5 h-5 text-luxury-gold" />,
      title: "Registry & RERA Support",
      desc: "End-to-end liaison with the Raipur Sub-registrar desk for documentation and deed typing."
    },
    {
      icon: <Heart className="w-5 h-5 text-luxury-gold" />,
      title: "Flawless Rating Record",
      desc: "⭐ 5.0 Star Rated profile over dozens of Raipur's highest profile business reviews."
    }
  ];

  return (
    <section className="py-24 bg-luxury-blue text-white relative overflow-hidden self-stretch">
      {/* Background soft grids */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-luxury-gold/[0.04] rounded-full filter blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs tracking-[0.25em] text-luxury-gold uppercase font-bold">
            TRUST GUARANTEE
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight mt-2">
            Why Capital Investors Partner With Aaradhana
          </h2>
          <div className="w-16 h-[2px] bg-luxury-gold mx-auto mt-4" />
          <p className="text-gray-300 text-xs sm:text-sm font-light mt-3">
            An uncompromising commitment to legal safety, construction engineering, and customer prosperity.
          </p>
        </div>
 
        {/* Content Points Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="bg-white/5 border border-white/10 hover:border-luxury-gold hover:bg-white/10 rounded-sm p-6 group transition-all duration-300 shadow-xs hover:shadow-lg text-left"
            >
              <div className="w-10 h-10 rounded-sm bg-[#050f1b] border border-luxury-gold/20 flex items-center justify-center shrink-0 mb-4 group-hover:scale-106 transition-transform">
                {point.icon}
              </div>
 
              <h3 className="font-sans font-bold text-sm sm:text-base text-white uppercase tracking-wider group-hover:text-luxury-gold transition-colors">
                {point.title}
              </h3>
 
              <p className="text-xs text-gray-400 font-light mt-2.5 leading-relaxed">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>
 
      </div>
    </section>
  );
};
