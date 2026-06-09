import React, { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { GalleryItem } from "../types";
import { ZoomIn, Eye, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const Gallery: React.FC = () => {
  const { gallery } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    "All",
    "Residential",
    "Commercial",
    "Luxury Homes",
    "Construction Projects",
    "Site Visits",
    "Office Photos"
  ];

  const filteredGallery = selectedCategory === "All"
    ? gallery
    : gallery.filter((item) => item.category === selectedCategory);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + filteredGallery.length) % filteredGallery.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % filteredGallery.length);
  };

  return (
    <section id="gallery" className="py-24 bg-[#0B1F3A] text-white relative overflow-hidden self-stretch">
      <div className="absolute top-0 left-0 w-80 h-80 bg-luxury-gold/[0.04] rounded-full filter blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs tracking-[0.25em] text-luxury-gold uppercase font-bold relative pl-7 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-[2px] before:bg-luxury-gold">
            MEDIA STREAM
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight mt-2">
            Corporate Gallery
          </h2>
          <div className="w-16 h-[2px] bg-luxury-gold mx-auto mt-4" />
          <p className="text-gray-300 text-xs sm:text-sm font-light mt-3">
            A comprehensive photographic trace of our physical site operations, structural project developments, office lounge, and active listings in Raipur.
          </p>
        </div>

        {/* Filter categories tabs inline scroll */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-4 py-2 font-semibold tracking-wider uppercase rounded-sm border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-luxury-gold text-luxury-blue border-luxury-gold shadow-md font-bold"
                  : "bg-white/5 text-gray-300 border-white/10 hover:border-luxury-gold/50 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-like Flex Columns / Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid relative overflow-hidden rounded-sm group cursor-pointer border border-white/10 shadow-sm hover:shadow-xl hover:border-luxury-gold transition-all bg-white/5"
                onClick={() => setLightboxIndex(idx)}
              >
                {/* Image */}
                <img
                  src={item.imageUrl}
                  alt={item.caption}
                  className="w-full h-auto object-cover max-h-[480px] group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Cover Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-blue/90 via-luxury-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                  <div className="flex justify-end">
                    <span className="bg-luxury-gold text-luxury-blue text-[8px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-sm font-bold">
                      {item.category}
                    </span>
                  </div>

                  <div className="text-left text-white">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-3">
                      <ZoomIn className="w-4 h-4 text-luxury-gold" />
                    </div>
                    <p className="text-xs font-serif italic text-gray-200 leading-relaxed font-light font-sans z-10 text-left">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredGallery.length === 0 && (
          <div className="text-center py-16 border border-dashed border-white/10 rounded-sm">
            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-base font-serif text-gray-300">No images inside this media category</h3>
            <p className="text-xs text-gray-400 mt-1">Check back soon for new construction project snaps.</p>
          </div>
        )}

      </div>

      {/* Gallery Lightbox Zoom Screen */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
          <div
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Cross */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 text-white hover:text-luxury-gold text-2xl p-2 z-10 focus:outline-none cursor-pointer"
            >
              ✕
            </button>

            {/* Lightbox Canvas Frame with arrows */}
            <div className="relative w-full max-w-4xl max-h-[80vh] flex items-center justify-center">
              
              {/* Prev Button */}
              <button
                onClick={handlePrevImage}
                className="absolute left-2 sm:-left-16 w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white hover:border-luxury-gold hover:text-luxury-gold flex items-center justify-center cursor-pointer z-10 focus:outline-none"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.img
                key={filteredGallery[lightboxIndex].id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                src={filteredGallery[lightboxIndex].imageUrl}
                alt={filteredGallery[lightboxIndex].caption}
                className="max-w-full max-h-[75vh] object-contain rounded-xs border border-white/5"
                onClick={(e) => e.stopPropagation()} // Prevent closing on click
              />

              {/* Next Button */}
              <button
                onClick={handleNextImage}
                className="absolute right-2 sm:-right-16 w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white hover:border-luxury-gold hover:text-luxury-gold flex items-center justify-center cursor-pointer z-10 focus:outline-none"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>

            {/* Bottom Caption strip details */}
            <div 
              className="mt-4 text-center max-w-lg text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="bg-luxury-gold text-luxury-blue text-[9px] tracking-[0.2em] uppercase font-bold px-2 py-0.5 rounded-sm">
                {filteredGallery[lightboxIndex].category}
              </span>
              <p className="font-serif italic text-sm mt-2 text-gray-300">
                {filteredGallery[lightboxIndex].caption}
              </p>
              <span className="text-[10px] text-gray-500 font-mono mt-1 block">
                Showing {lightboxIndex + 1} of {filteredGallery.length}
              </span>
            </div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
