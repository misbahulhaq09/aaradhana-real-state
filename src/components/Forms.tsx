import React, { useState, useEffect } from "react";
import { useCMS } from "../context/CMSContext";
import { Send, CheckCircle2, CircleDollarSign, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FormsProps {
  prefilledProperty?: string;
  prefilledType?: string;
  clearPrefills?: () => void;
}

export const Forms: React.FC<FormsProps> = ({ prefilledProperty, prefilledType, clearPrefills }) => {
  const { submitBuyerLead, submitSellerLead, cmsConfig } = useCMS();
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Buy Form State
  const [buyerData, setBuyerData] = useState({
    name: "",
    mobile: "",
    propertyType: "Residential",
    location: "",
    budget: "",
    message: ""
  });

  // Sell Form State
  const [sellerData, setSellerData] = useState({
    name: "",
    mobile: "",
    locationLink: "",
    propertyType: "Residential",
    size: "",
    frontage: "",
    depth: "",
    expectedPrice: "",
    message: ""
  });

  // Listen to external prefill requests
  useEffect(() => {
    if (prefilledProperty) {
      setActiveTab("buy");
      setBuyerData((prev) => ({
        ...prev,
        propertyType: prefilledType || "Residential",
        message: `Hi, I am interested in viewing details and arranging a site audit for: "${prefilledProperty}". Please provide catalogs.`
      }));
    }
  }, [prefilledProperty, prefilledType]);

  const handleBuyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setBuyerData({ ...buyerData, [e.target.name]: e.target.value });
  };

  const handleSellChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setSellerData({ ...sellerData, [e.target.name]: e.target.value });
  };

  const handleBuySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerData.name || !buyerData.mobile) {
      alert("Please provide name and mobile number.");
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      submitBuyerLead({
        name: buyerData.name,
        mobile: buyerData.mobile,
        propertyType: buyerData.propertyType,
        location: buyerData.location,
        budget: buyerData.budget,
        message: buyerData.message
      });
      setIsSubmitting(false);
      setSuccessMessage("Your inquiry has been logged! Our senior Raipur consultant will reach you in 15 minutes.");
      
      // Reset
      setBuyerData({
        name: "",
        mobile: "",
        propertyType: "Residential",
        location: "",
        budget: "",
        message: ""
      });
      if (clearPrefills) clearPrefills();
    }, 1200);
  };

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellerData.name || !sellerData.mobile) {
      alert("Please provide name and mobile number.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitSellerLead({
        name: sellerData.name,
        mobile: sellerData.mobile,
        locationLink: sellerData.locationLink,
        propertyType: sellerData.propertyType,
        size: sellerData.size,
        frontage: sellerData.frontage,
        depth: sellerData.depth,
        expectedPrice: sellerData.expectedPrice,
        message: sellerData.message
      });
      setIsSubmitting(false);
      setSuccessMessage("Your property valuation sheet is scheduled! Our technical surveyors will coordinate a site visit.");
      
      // Reset
      setSellerData({
        name: "",
        mobile: "",
        locationLink: "",
        propertyType: "Residential",
        size: "",
        frontage: "",
        depth: "",
        expectedPrice: "",
        message: ""
      });
    }, 1200);
  };

  return (
    <section id="contact-forms" className="py-24 bg-[#0B1F3A] text-white relative overflow-hidden self-stretch">
      {/* Background aesthetics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-luxury-blue/50 blur-[130px] rounded-full pointer-events-none" />

      {/* Grid aligned lines */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle, #D4AF37 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs tracking-[0.3em] text-luxury-gold font-bold uppercase">
            REGISTRATION & ASSISTANCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight mt-2">
            Secure Your Raipur Opportunity
          </h2>
          <div className="w-16 h-[2px] bg-luxury-gold mx-auto mt-4" />
          <p className="text-gray-300 text-xs sm:text-sm font-light mt-3">
            Register your criteria below. Our executive Raipur offices directly coordinate site acquisitions, valuations, and registration support.
          </p>
        </div>

        {/* Custom Tab Selector Switcher */}
        <div className="flex border border-white/10 rounded-sm overflow-hidden mb-8 gap-[1px] bg-white/5">
          <button
            onClick={() => {
              setActiveTab("buy");
              if (clearPrefills) clearPrefills();
            }}
            className={`flex-1 py-4 text-xs sm:text-sm font-bold tracking-widest uppercase transition-all cursor-pointer ${
              activeTab === "buy"
                ? "bg-luxury-gold text-luxury-blue shadow-lg"
                : "bg-transparent text-gray-300 hover:text-white"
            }`}
          >
            BUY PROPERTY ENQUIRY
          </button>
          
          <button
            onClick={() => {
              setActiveTab("sell");
              if (clearPrefills) clearPrefills();
            }}
            className={`flex-1 py-4 text-xs sm:text-sm font-bold tracking-widest uppercase transition-all cursor-pointer ${
              activeTab === "sell"
                ? "bg-luxury-gold text-luxury-blue shadow-lg"
                : "bg-transparent text-gray-300 hover:text-white"
            }`}
          >
            SELL PROPERTY LISTING
          </button>
        </div>

        {/* Tab Forms Board */}
        <div className="glass-card rounded-sm p-6 sm:p-10 shadow-2xl relative">
          
          {/* Success Dialog overlay */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 bg-[#0B1F3A] z-20 rounded-sm flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-luxury-gold/10 border border-luxury-gold flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-luxury-gold" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white uppercase tracking-wider">
                  Registration Complete
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm font-light mt-2 max-w-md">
                  {successMessage}
                </p>
                <div className="font-mono text-[9px] text-luxury-gold/50 tracking-widest uppercase mt-6">
                  OFFICE PHONE: {cmsConfig.contact.phone}
                </div>
                <button
                  onClick={() => setSuccessMessage(null)}
                  className="mt-6 border border-luxury-gold/30 hover:border-luxury-gold text-luxury-gold text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-sm transition-all cursor-pointer"
                >
                  Dismiss
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Content Rendering */}
          {activeTab === "buy" ? (
            /* BUY PROPERTY FORM */
            <form onSubmit={handleBuySubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-luxury-gold-light font-bold mb-2">
                    Your Full Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={buyerData.name}
                    onChange={handleBuyChange}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 rounded-sm bg-white/5 border border-white/10 text-white font-sans text-sm focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-luxury-gold-light font-bold mb-2">
                    Mobile Number*
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={buyerData.mobile}
                    onChange={handleBuyChange}
                    placeholder="Enter phone with country code (+91...)"
                    className="w-full px-4 py-3 rounded-sm bg-white/5 border border-white/10 text-white font-sans text-sm focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-luxury-gold-light font-bold mb-2">
                    Property Category
                  </label>
                  <select
                    name="propertyType"
                    value={buyerData.propertyType}
                    onChange={handleBuyChange}
                    className="w-full px-4 py-3 rounded-sm bg-luxury-blue border border-white/10 text-white font-sans text-sm focus:border-luxury-gold focus:outline-none transition-all"
                  >
                    <option value="Residential">Residential Property</option>
                    <option value="Commercial">Commercial Office/Shop</option>
                    <option value="Luxury">Luxury Estates</option>
                    <option value="Villa">Villa Layout</option>
                    <option value="Apartment">Apartments Suite</option>
                    <option value="Land">Agricultural Plot</option>
                    <option value="Industrial">Industrial Yard/Warehouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-luxury-gold-light font-bold mb-2">
                    Preferred Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={buyerData.location}
                    onChange={handleBuyChange}
                    placeholder="e.g. VIP Road, Shankar Nagar"
                    className="w-full px-4 py-3 rounded-sm bg-white/5 border border-white/10 text-white font-sans text-sm focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-luxury-gold-light font-bold mb-2">
                    Preferred Budget
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={buyerData.budget}
                    onChange={handleBuyChange}
                    placeholder="e.g. ₹1.5 Crore, ₹80 Lakh"
                    className="w-full px-4 py-3 rounded-sm bg-white/5 border border-white/10 text-white font-sans text-sm focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-widest uppercase text-luxury-gold-light font-bold mb-2">
                  Special Instructions / Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={buyerData.message}
                  onChange={handleBuyChange}
                  placeholder="Detail your timing parameters, floor selections, or developer priorities..."
                  className="w-full px-4 py-3 rounded-sm bg-white/5 border border-white/10 text-white font-sans text-sm focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold focus:outline-none transition-all resize-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-linear-to-r from-luxury-gold via-luxury-gold-light to-luxury-gold-dark hover:from-luxury-gold hover:to-luxury-gold-dark text-luxury-blue font-bold px-8 py-4 rounded-sm text-xs uppercase tracking-widest shadow-lg flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      SUBMITTING...
                    </>
                  ) : (
                    <>
                      BOOK AUDIT NOW
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* SELL PROPERTY FORM */
            <form onSubmit={handleSellSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-luxury-gold-light font-bold mb-2">
                    Owner Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={sellerData.name}
                    onChange={handleSellChange}
                    placeholder="Enter owner name"
                    className="w-full px-4 py-3 rounded-sm bg-white/5 border border-white/10 text-white font-sans text-sm focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-luxury-gold-light font-bold mb-2">
                    Mobile Number*
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={sellerData.mobile}
                    onChange={handleSellChange}
                    placeholder="Enter phone with country code (+91...)"
                    className="w-full px-4 py-3 rounded-sm bg-white/5 border border-white/10 text-white font-sans text-sm focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-luxury-gold-light font-bold mb-2">
                    Google Maps Location Link
                  </label>
                  <input
                    type="url"
                    name="locationLink"
                    value={sellerData.locationLink}
                    onChange={handleSellChange}
                    placeholder="e.g. https://maps.app.goo.gl/..."
                    className="w-full px-4 py-3 rounded-sm bg-white/5 border border-white/10 text-white font-sans text-sm focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-luxury-gold-light font-bold mb-2">
                    Property Category
                  </label>
                  <select
                    name="propertyType"
                    value={sellerData.propertyType}
                    onChange={handleSellChange}
                    className="w-full px-4 py-3 rounded-sm bg-luxury-blue border border-white/10 text-white font-sans text-sm focus:border-luxury-gold focus:outline-none transition-all"
                  >
                    <option value="Residential">Residential Plot/House</option>
                    <option value="Commercial">Commercial Office/Shop</option>
                    <option value="Land">Agricultural Acreage</option>
                    <option value="Villa">Luxury Villa Setup</option>
                    <option value="Apartment">Apartment Flat</option>
                    <option value="Industrial">Industrial Warehouse/Land</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[9px] tracking-wider uppercase text-luxury-gold-light font-bold mb-2">
                    Property Size
                  </label>
                  <input
                    type="text"
                    name="size"
                    value={sellerData.size}
                    onChange={handleSellChange}
                    placeholder="e.g. 1200 sqft"
                    className="w-full px-3 py-3 rounded-sm bg-white/5 border border-white/10 text-white font-sans text-xs focus:border-luxury-gold focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[9px] tracking-wider uppercase text-luxury-gold-light font-bold mb-2">
                    Frontage Size (ft)
                  </label>
                  <input
                    type="text"
                    name="frontage"
                    value={sellerData.frontage}
                    onChange={handleSellChange}
                    placeholder="e.g. 40 ft"
                    className="w-full px-3 py-3 rounded-sm bg-white/5 border border-white/10 text-white font-sans text-xs focus:border-luxury-gold focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[9px] tracking-wider uppercase text-luxury-gold-light font-bold mb-2">
                    Depth Size (ft)
                  </label>
                  <input
                    type="text"
                    name="depth"
                    value={sellerData.depth}
                    onChange={handleSellChange}
                    placeholder="e.g. 60 ft"
                    className="w-full px-3 py-3 rounded-sm bg-white/5 border border-white/10 text-white font-sans text-xs focus:border-luxury-gold focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[9px] tracking-wider uppercase text-luxury-gold-light font-bold mb-2">
                    Expected Price
                  </label>
                  <input
                    type="text"
                    name="expectedPrice"
                    value={sellerData.expectedPrice}
                    onChange={handleSellChange}
                    placeholder="e.g. ₹95 Lakh"
                    className="w-full px-3 py-3 rounded-sm bg-white/5 border border-white/10 text-white font-sans text-xs focus:border-luxury-gold focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-widest uppercase text-luxury-gold-light font-bold mb-2">
                  Property Description / Status
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={sellerData.message}
                  onChange={handleSellChange}
                  placeholder="Mention construction age, clear boundary configurations, RERA compliance certificates..."
                  className="w-full px-4 py-3 rounded-sm bg-white/5 border border-white/10 text-white font-sans text-sm focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold focus:outline-none transition-all resize-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-linear-to-r from-luxury-gold via-luxury-gold-light to-luxury-gold-dark hover:from-luxury-gold hover:to-luxury-gold-dark text-luxury-blue font-bold px-8 py-4 rounded-sm text-xs uppercase tracking-widest shadow-lg flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      ANALYZING LISTING...
                    </>
                  ) : (
                    <>
                      REQUEST VALUATION
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};
