import React from "react";
import { useCMS } from "../context/CMSContext";
import { Facebook, Instagram, Linkedin, Youtube, Landmark, Phone, MapPin, Mail, ChevronRight } from "lucide-react";

export const Footer: React.FC = () => {
  const { cmsConfig } = useCMS();
  const c = cmsConfig.contact;
  const s = cmsConfig.socials;

  const quickLinks = [
    { name: "Story & Team", id: "about" },
    { name: "Expert Services", id: "services" },
    { name: "Portfolio Listings", id: "properties" },
    { name: "Media Gallery", id: "gallery" },
    { name: "User Endorsements", id: "reviews" },
    { name: "Support Desk", id: "contact" }
  ];

  const coreServices = [
    "Residential Layouts",
    "Commercial Complexes",
    "Elite Custom Villas",
    "Smart Industrial Warehouses",
    "Grade-A Construction Works",
    "High-Growth Land Portfolios"
  ];

  const handleScrollToSegment = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050e1b] text-white pt-20 pb-8 border-t border-luxury-gold/15 relative overflow-hidden self-stretch">
      {/* Background soft designs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-luxury-gold/[0.02] filter blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-luxury-blue/50 filter blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-10">
          
          {/* Column 1 - Brand & Philosophy */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full border border-luxury-gold flex items-center justify-center bg-luxury-blue shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                <Landmark className="w-5 h-5 text-luxury-gold" />
              </div>
              <div>
                <span className="block font-sans font-extrabold text-sm sm:text-base tracking-wider uppercase text-white hover:text-luxury-gold transition-colors">
                  {cmsConfig.logoText || "Aaradhana Realty"}
                </span>
                <span className="block text-[8px] text-luxury-gold tracking-widest uppercase font-semibold">
                  Builders & Developers
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed font-light">
              Raipur's premier builders & construction company. Serving elite commercial and luxury residential avenues with absolute Chhattisgarh regulatory transparency and pristine legal verification.
            </p>

            {/* Socials Icons List */}
            <div className="flex items-center gap-3 pt-2">
              <a href={s.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-blue text-white hover:border-luxury-gold transition-colors block" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={s.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-blue text-white hover:border-luxury-gold transition-colors block" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={s.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-blue text-white hover:border-luxury-gold transition-colors block" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={s.youtube} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-blue text-white hover:border-luxury-gold transition-colors block" title="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Navigation links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-luxury-gold uppercase border-l-2 border-luxury-gold pl-3 mb-6">
              Corporate Links
            </h4>
            <ul className="space-y-3.5 text-xs">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleScrollToSegment(link.id)}
                    className="text-gray-300 hover:text-luxury-gold transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-luxury-gold/40 shrink-0" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services summary */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-luxury-gold uppercase border-l-2 border-luxury-gold pl-3 mb-6">
              Our Services
            </h4>
            <ul className="space-y-3.5 text-xs text-gray-300">
              {coreServices.map((srv, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-luxury-gold/60" />
                  <span>{srv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Office Info */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-luxury-gold uppercase border-l-2 border-luxury-gold pl-3 mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-4 text-xs font-serif italic text-gray-300 leading-relaxed">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span className="not-italic font-sans text-xs font-light text-gray-300">
                  {c.address}
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-luxury-gold shrink-0" />
                <span className="not-italic font-sans text-sm font-semibold text-white">
                  {c.phone}
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-luxury-gold shrink-0" />
                <span className="not-italic font-sans text-xs font-light text-gray-300">
                  enquiry@aaradhanarealty.com
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright stamp */}
        <div className="border-t border-white/10 mt-16 pt-8 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
          <div className="text-left font-sans tracking-wide">
            <span className="font-serif font-bold text-luxury-gold block mb-1">
              {cmsConfig.companyName}
            </span>
            Residential | Commercial | Construction | Investment
          </div>

          <div className="text-center sm:text-right">
            © 2026 Aaradhana Realty And RealProperties Pvt. Ltd. All Rights Reserved.
            <span className="block text-[8px] text-gray-500 font-mono tracking-widest uppercase mt-0.5">
              Grade-A Builders Licensure • RERA Chhattisgarh Approved
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
