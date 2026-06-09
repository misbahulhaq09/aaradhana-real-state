import React, { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { Property } from "../types";
import { MapPin, ZoomIn, Info, DollarSign, BedDouble, Bath, ArrowUpRight, Scale, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FeaturedPropertiesProps {
  onPreFillInquiry: (propertyName: string, propertyType: string) => void;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ onPreFillInquiry }) => {
  const { properties } = useCMS();
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Derive unique types from total properties
  const propertyFilters = ["All", ...Array.from(new Set(properties.map((p) => p.propertyType)))];

  const filteredProperties = selectedType === "All"
    ? properties
    : properties.filter((p) => p.propertyType === selectedType);

  const handleApplyNow = (prop: Property) => {
    setSelectedProperty(null);
    onPreFillInquiry(prop.title, prop.propertyType);
  };

  return (
    <section id="properties" className="py-24 bg-[#0B1F3A] text-white relative overflow-hidden self-stretch">
      <div className="absolute top-0 right-0 w-80 h-80 bg-luxury-gold/[0.04] rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-luxury-gold/[0.04] rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Copywriter Intro */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div className="text-left">
            <span className="font-mono text-xs tracking-[0.25em] text-luxury-gold uppercase font-bold relative pl-7 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-[2px] before:bg-luxury-gold">
              ELITE PROPERTIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight mt-2">
              Featured Portfolio
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm mt-3 leading-relaxed max-w-xl">
              Inspect verified luxury duplexes, smart industrial warehouses, and prime commercial retail suites constructed by Aaradhana Builders Raipur.
            </p>
          </div>

          {/* Luxury Filter Selector Pills */}
          <div className="flex flex-wrap gap-2 justify-start scrollbar-none">
            {propertyFilters.map((filter, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedType(filter)}
                className={`text-xs px-4 py-2 font-sans tracking-wide font-medium rounded-full border transition-all pointer-events-auto cursor-pointer ${
                  selectedType === filter
                    ? "bg-luxury-gold text-luxury-blue border-luxury-gold shadow-md font-bold"
                    : "bg-white/5 text-gray-300 border-white/10 hover:border-luxury-gold/50 hover:bg-white/10"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((prop) => (
              <motion.div
                key={prop.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="glass-card text-white rounded-sm hover:border-luxury-gold/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group uppercase-all text-left"
              >
                {/* Card Top Banner Image Area */}
                <div className="relative overflow-hidden h-64 bg-white/5">
                  {/* Badge */}
                  {prop.tag && (
                    <span className="absolute top-4 left-4 z-10 bg-luxury-blue/95 border border-luxury-gold/40 text-luxury-gold font-mono text-[9px] tracking-widest uppercase px-3 py-1 font-semibold rounded-sm shadow-md">
                      {prop.tag}
                    </span>
                  )}
                  {/* Image with hover zoom effect */}
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Hover magnifying look */}
                  <div className="absolute inset-0 bg-luxury-blue/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => setSelectedProperty(prop)}
                      className="bg-[#0B1F3A]/95 text-white hover:bg-luxury-gold hover:text-luxury-blue p-3.5 rounded-full shadow-lg transition-colors cursor-pointer"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                  </div>

                  <span className="absolute bottom-4 right-4 bg-luxury-gold text-luxury-blue font-sans font-extrabold text-sm px-3.5 py-1.5 rounded-xs shadow-md">
                    {prop.price}
                  </span>
                </div>

                {/* Card Details Panel */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-luxury-gold font-semibold tracking-widest uppercase">
                      {prop.propertyType}
                    </span>

                    <h3 className="font-serif font-bold text-lg text-white mt-1 hover:text-luxury-gold transition-colors block cursor-pointer"
                        onClick={() => setSelectedProperty(prop)}>
                      {prop.title}
                    </h3>

                    {/* Location coordinates */}
                    <p className="flex items-start gap-1.5 text-xs text-gray-300 font-light mt-3 leading-relaxed">
                      <MapPin className="w-3.5 h-3.5 text-luxury-gold shrink-0 mt-0.5" />
                      {prop.location}
                    </p>

                    {/* Stats strip */}
                    <div className="flex items-center gap-4 border-t border-b border-white/10 py-3.5 mt-4 text-xs text-gray-300 font-medium font-mono">
                      <span className="flex items-center gap-1.5">
                        <Scale className="w-4 h-4 text-gray-400" />
                        {prop.area}
                      </span>
                      {prop.beds && (
                        <span className="flex items-center gap-1.5">
                          <BedDouble className="w-4 h-4 text-gray-400" />
                          {prop.beds} Beds
                        </span>
                      )}
                      {prop.baths && (
                        <span className="flex items-center gap-1.5">
                          <Bath className="w-4 h-4 text-gray-400" />
                          {prop.baths} Baths
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-3 mt-5">
                    <button
                      onClick={() => setSelectedProperty(prop)}
                      className="flex-1 text-center py-2.5 rounded-xs border border-white/10 text-gray-200 font-bold hover:bg-white/10 hover:border-white/20 hover:text-white text-xs tracking-wider uppercase transition-all cursor-pointer"
                    >
                      Details
                    </button>

                    <button
                      onClick={() => onPreFillInquiry(prop.title, prop.propertyType)}
                      className="flex-1 bg-luxury-gold text-luxury-blue hover:bg-luxury-gold-light hover:text-luxury-blue py-2.5 rounded-xs font-bold text-xs tracking-widest uppercase transition-all cursor-pointer shadow-sm relative overflow-hidden group"
                    >
                      Enquire
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty status check */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12 glass-card rounded-sm">
            <Info className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-serif text-gray-300">No matched listings found</h3>
            <p className="text-gray-400 text-sm mt-1">Please select another option or contact our desk.</p>
          </div>
        )}

      </div>

      {/* Lightbox details modal overlay */}
      <AnimatePresence>
        {selectedProperty && (
          <div className="fixed inset-0 bg-[#050f1b]/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0B1F3A] border border-white/10 text-white rounded-sm overflow-hidden shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-luxury-gold text-white hover:text-luxury-blue transition-colors flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>

              {/* Scrollable Modal Content */}
              <div className="overflow-y-auto flex-1">
                {/* Images */}
                <div className="h-72 sm:h-80 relative bg-white/5">
                  <img
                    src={selectedProperty.image}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                    <div className="text-left">
                      <span className="bg-luxury-gold text-luxury-blue text-[9px] tracking-widest uppercase px-2 py-0.5 font-bold rounded-xs">
                        {selectedProperty.propertyType}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold mt-1.5">
                        {selectedProperty.title}
                      </h3>
                    </div>
                    <span className="text-lg font-bold text-luxury-gold-light shrink-0 font-mono">
                      {selectedProperty.price}
                    </span>
                  </div>
                </div>

                {/* Body details */}
                <div className="p-6 sm:p-8 text-left text-white">
                  <h4 className="text-xs uppercase font-bold text-luxury-gold tracking-widest">
                    About Property Specification
                  </h4>
                  <div className="w-8 h-[2px] bg-luxury-gold mt-1 mb-3" />
                  
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                    {selectedProperty.description || "A pristine Raipur real estate diamond engineered with supreme materials, optimal space guidelines, elite location advantages, and high investment yield holding parameters."}
                  </p>

                  {/* Fact sheet matrix */}
                  <h4 className="text-xs uppercase font-bold text-white tracking-widest mt-6 mb-3">
                    Listing Fact Sheet
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border border-white/10 rounded-sm p-4 bg-white/5">
                    <div className="text-left font-serif">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Location Zone</span>
                      <p className="text-xs sm:text-sm text-white font-bold mt-0.5">{selectedProperty.location.split(",").slice(-2)[0] || "Raipur"}</p>
                    </div>
                    <div className="text-left font-serif">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Sizing Area</span>
                      <p className="text-xs sm:text-sm text-white font-bold mt-0.5">{selectedProperty.area}</p>
                    </div>
                    <div className="text-left font-serif">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Listing Rating</span>
                      <p className="text-xs sm:text-sm text-luxury-gold font-bold mt-0.5">⭐⭐⭐⭐⭐ 5.0</p>
                    </div>
                    {selectedProperty.beds && (
                      <div className="text-left font-serif">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Bedrooms</span>
                        <p className="text-xs sm:text-sm text-white font-bold mt-0.5">{selectedProperty.beds} Layouts</p>
                      </div>
                    )}
                    {selectedProperty.baths && (
                      <div className="text-left font-serif">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Bathrooms</span>
                        <p className="text-xs sm:text-sm text-white font-bold mt-0.5">{selectedProperty.baths} Finished</p>
                      </div>
                    )}
                    <div className="text-left font-serif">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Status ID</span>
                      <p className="text-xs sm:text-sm text-green-450 font-bold mt-0.5">Active / Verified</p>
                    </div>
                  </div>

                  {/* Trust metrics bullet checklist */}
                  <h4 className="text-xs uppercase font-bold text-luxury-gold tracking-widest mt-6">
                    Aaradhana Client Guarantees
                  </h4>
                  <div className="w-8 h-[2px] bg-luxury-gold mt-1 mb-3" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      100% Legally Clean Title Guarantee
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      Onsite Guided Executive Inspection Tours
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      Complete Raipur Registrar Office Support
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      Chhattisgarh RERA Status Auditing
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Drawer Footer */}
              <div className="p-4 bg-black/30 border-t border-white/10 flex items-center justify-end gap-3 shrink-0">
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="px-4 py-2 text-xs font-semibold tracking-wider uppercase text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Close Specification
                </button>
                <button
                  onClick={() => handleApplyNow(selectedProperty)}
                  className="bg-luxury-gold hover:bg-luxury-gold-light text-luxury-blue px-5 py-2.5 rounded-xs font-bold text-xs tracking-widest uppercase transition-colors shadow-md hover:scale-103 transition-transform cursor-pointer"
                >
                  Book Site Visit
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
