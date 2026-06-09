import React from "react";
import { useCMS } from "../context/CMSContext";
import { Phone, MapPin, Clock, Navigation, Map, Mail } from "lucide-react";
import { motion } from "motion/react";

export const Contact: React.FC = () => {
  const { cmsConfig } = useCMS();
  const c = cmsConfig.contact;

  // Real direction queries targetted to Raipur Progressive Point
  const mapDirectionUrl = "https://www.google.com/maps/dir/?api=1&destination=Progressive+Point+Raipur+Chhattisgarh";
  const openMapsUrl = "https://maps.app.goo.gl/uxm1bnygX6PZqjXw5";

  return (
    <section id="contact" className="py-24 bg-[#0B1F3A] text-white relative overflow-hidden self-stretch">
      <div className="absolute top-0 right-0 w-80 h-80 bg-luxury-gold/[0.04] rounded-full filter blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-12 text-center">
            <span className="font-mono text-xs tracking-[0.25em] text-luxury-gold uppercase font-bold relative pl-7 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-[2px] before:bg-luxury-gold">
              CORPORATE OUTPOSTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight mt-2">
              Visit Our Raipur Corporate Office
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm font-light mt-3">
              We look forward to hosting you for structural blueprints viewing, CG registration counseling, and investment briefs.
            </p>
          </div>
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column - Details info card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-between bg-[#050f1b] border border-white/10 text-white rounded-sm p-8 sm:p-10 shadow-2xl border-l-4 border-l-luxury-gold relative overflow-hidden text-left"
          >
            {/* Background luxury seal */}
            <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-luxury-gold/[0.04] rounded-full pointer-events-none" />

            <div className="space-y-8">
              <div>
                <span className="text-[10px] text-luxury-gold font-mono tracking-widest uppercase">
                  HEADQUARTERS
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-white uppercase tracking-wide mt-1 leading-tight">
                  {cmsConfig.companyName}
                </h3>
                <div className="w-12 h-[1px] bg-luxury-gold/50 mt-3" />
              </div>

              {/* Contacts info items */}
              <div className="space-y-6 text-sm">
                
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-luxury-gold" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-gray-300 text-xs tracking-widest uppercase">Corporate Address</h4>
                    <p className="text-gray-100 font-light mt-1.5 leading-relaxed">
                      {c.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-luxury-gold" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-gray-300 text-xs tracking-widest uppercase">Hotline Mobile</h4>
                    <p className="text-gray-100 text-base font-semibold mt-1">
                      {c.phone}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-luxury-gold" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-gray-300 text-xs tracking-widest uppercase">Business Hours</h4>
                    <p className="text-gray-100 text-sm font-light mt-1">
                      {c.hours}
                    </p>
                    <span className="text-[9px] text-[#A2C290] font-bold font-mono tracking-widest uppercase block mt-1">
                      ● Client Concierge Active
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* General email detail helper */}
            <div className="pt-8 border-t border-white/10 mt-8 flex items-center gap-2 text-xs text-gray-300">
              <Mail className="w-4 h-4 text-luxury-gold" />
              <span>enquiry@aaradhanarealty.com</span>
            </div>

          </motion.div>

          {/* Right Column - Map Block with direct navigation buttons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-between border border-white/10 bg-white/5 rounded-sm p-4 h-96 sm:h-[450px] md:h-auto"
          >
            {/* Embed google map iframe */}
            <div className="w-full flex-1 rounded-xs overflow-hidden relative border border-white/10">
              <iframe
                title="Aaradhana Corporate Raipur Coordinates"
                src={c.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Direct directions trigger footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
              <div className="text-left">
                <span className="text-[9px] text-gray-400 font-mono tracking-widest uppercase">ZONED LOCATION</span>
                <p className="text-xs text-gray-200 font-semibold font-serif leading-none mt-0.5 text-left">Progressive Point, Lalpur Raipur CG</p>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <a
                  href={mapDirectionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-luxury-gold hover:bg-luxury-gold-light text-luxury-blue font-bold px-4 py-2.5 rounded-sm text-xs tracking-wider uppercase transition-all"
                >
                  <Navigation className="w-3.5 h-3.5 shrink-0" />
                  Get Directions
                </a>

                <a
                  href={openMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/15 border border-white/15 hover:border-white/30 text-gray-250 font-bold px-4 py-2.5 rounded-sm text-xs tracking-wider uppercase transition-all"
                >
                  <Map className="w-3.5 h-3.5 shrink-0" />
                  Open in Google Maps
                </a>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
