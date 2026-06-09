import React, { useState, useEffect } from "react";
import { useCMS } from "../context/CMSContext";
import { Menu, X, Landmark, ShieldCheck, Mail, PhoneCall } from "lucide-react";

interface NavbarProps {
  onAdminToggle: () => void;
  isAdminView: boolean;
  onNavigateToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAdminToggle, isAdminView, onNavigateToSection }) => {
  const { cmsConfig } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Properties", id: "properties" },
    { name: "Gallery", id: "gallery" },
    { name: "Reviews", id: "reviews" },
    { name: "Contact", id: "contact" },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    if (isAdminView) {
      onAdminToggle(); // Toggle out of admin dashboard first to show sections
    }
    setTimeout(() => {
      onNavigateToSection(id);
    }, 100);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled || isAdminView
          ? "py-3 glass-nav shadow-lg"
          : "py-5 bg-gradient-to-b from-[#0B1F3A]/90 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleLinkClick("hero")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-luxury-gold flex items-center justify-center bg-luxury-blue shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all">
              <Landmark className="w-5 h-5 sm:w-6 sm:h-6 text-luxury-gold group-hover:rotate-6 transition-transform" />
            </div>
            <div>
              <span className="block font-sans font-bold text-white text-base sm:text-lg tracking-wider uppercase group-hover:text-luxury-gold transition-colors">
                {cmsConfig.logoText || "Aaradhana Realty"}
              </span>
              <span className="block text-[8px] sm:text-[9px] text-luxury-gold tracking-widest uppercase font-semibold">
                Builders & Developers
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-gray-300 hover:text-luxury-gold font-sans font-medium text-sm tracking-wider uppercase transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-luxury-gold hover:after:w-full after:transition-all pointer-events-auto"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Desktop Callouts - Contact & Admin Gate */}
          <div className="hidden md:flex items-center gap-4">
            {/* Admin Switcher */}
            <button
              onClick={onAdminToggle}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all ${
                isAdminView
                  ? "bg-luxury-gold text-luxury-blue border-luxury-gold"
                  : "bg-transparent text-[#D4AF37] border-luxury-gold/40 hover:bg-luxury-gold hover:text-luxury-blue"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              {isAdminView ? "Visitor View" : "Admin Dashboard"}
            </button>

            {/* Quick Consultation CTA */}
            <button
              onClick={() => handleLinkClick("contact")}
              className="bg-linear-to-r from-luxury-gold via-luxury-gold-light to-luxury-gold-dark hover:from-luxury-gold-dark hover:to-luxury-gold text-luxury-blue text-xs font-bold tracking-widest uppercase px-4 py-2.5 rounded-sm transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg active:scale-95"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile Right Controls (Mobile-First responsive trigger) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onAdminToggle}
              className={`p-2 rounded-full border transition-all ${
                isAdminView
                  ? "bg-luxury-gold text-luxury-blue border-luxury-gold"
                  : "bg-transparent text-luxury-gold border-luxury-gold/50"
              }`}
              title="Admin Dashboard"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:text-luxury-gold transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Burger Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-nav absolute w-full left-0 border-t border-luxury-gold/10 px-4 py-6 shadow-2xl flex flex-col gap-4 animate-fadeIn">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left text-gray-200 hover:text-luxury-gold font-sans font-medium text-sm tracking-widest uppercase py-2 border-b border-white/5"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onAdminToggle();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 border border-luxury-gold/40 text-luxury-gold font-semibold text-xs tracking-widest uppercase rounded-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              {isAdminView ? "Go to Main Website" : "Open Admin Panel"}
            </button>

            <button
              onClick={() => handleLinkClick("contact")}
              className="w-full text-center bg-luxury-gold text-luxury-blue font-bold text-xs tracking-widest uppercase py-3 rounded-sm shadow-md"
            >
              Enquire Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
