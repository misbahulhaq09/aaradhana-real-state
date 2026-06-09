import React, { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { Property, Review, GalleryItem } from "../types";
import { 
  KeyRound, ShieldAlert, LayoutDashboard, Plus, Pencil, 
  Trash2, FileText, CheckCircle, Smartphone, HelpCircle, 
  MapPin, Globe, LogOut, Check, X, Star, Eye, Calendar,
  Activity, ArrowRight, Save, UserCheck, Inbox, ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const AdminDashboard: React.FC = () => {
  const {
    cmsConfig, updateCMSConfig,
    properties, addProperty, updateProperty, deleteProperty,
    reviews, addReview, updateReview, deleteReview,
    gallery, addGalleryItem, deleteGalleryItem,
    buyerLeads, sellerLeads, updateBuyerLeadStatus, updateSellerLeadStatus, deleteBuyerLead, deleteSellerLead,
    isAuthenticated, login, logout
  } = useCMS();

  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "properties" | "reviews" | "gallery" | "leads" | "seo">("general");

  // Forms editing states
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [propertyData, setPropertyData] = useState({
    title: "",
    location: "",
    price: "",
    area: "",
    propertyType: "Residential" as any,
    image: "",
    beds: "",
    baths: "",
    tag: "",
    featured: true,
    description: ""
  });

  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({
    author: "",
    role: "",
    rating: 5,
    text: ""
  });

  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [galleryData, setGalleryData] = useState({
    imageUrl: "",
    category: "Residential" as any,
    caption: ""
  });

  // Settings states initialized from cmsConfig
  const [generalSettings, setGeneralSettings] = useState(cmsConfig);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      setLoginError(false);
      setPassword("");
      // Sync local settings panel
      setGeneralSettings(cmsConfig);
    } else {
      setLoginError(true);
    }
  };

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateCMSConfig(generalSettings);
    alert("General Homepage Configurations updated instantly on client-facing channels!");
  };

  // Property handlers
  const handleOpenPropertyForm = (prop: Property | null) => {
    if (prop) {
      setEditingProperty(prop);
      setPropertyData({
        title: prop.title,
        location: prop.location,
        price: prop.price,
        area: prop.area,
        propertyType: prop.propertyType,
        image: prop.image,
        beds: prop.beds ? prop.beds.toString() : "",
        baths: prop.baths ? prop.baths.toString() : "",
        tag: prop.tag || "",
        featured: prop.featured,
        description: prop.description || ""
      });
    } else {
      setEditingProperty(null);
      setPropertyData({
        title: "",
        location: "",
        price: "",
        area: "",
        propertyType: "Residential",
        image: "",
        beds: "",
        baths: "",
        tag: "",
        featured: true,
        description: ""
      });
    }
    setShowPropertyForm(true);
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: propertyData.title,
      location: propertyData.location,
      price: propertyData.price,
      area: propertyData.area,
      propertyType: propertyData.propertyType,
      image: propertyData.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      beds: propertyData.beds ? parseInt(propertyData.beds, 10) : undefined,
      baths: propertyData.baths ? parseInt(propertyData.baths, 10) : undefined,
      tag: propertyData.tag || undefined,
      featured: propertyData.featured,
      description: propertyData.description
    };

    if (editingProperty) {
      updateProperty({ ...payload, id: editingProperty.id });
    } else {
      addProperty(payload);
    }
    setShowPropertyForm(false);
    setEditingProperty(null);
  };

  // Review handlers
  const handleOpenReviewForm = (rev: Review | null) => {
    if (rev) {
      setEditingReview(rev);
      setReviewData({
        author: rev.author,
        role: rev.role,
        rating: rev.rating,
        text: rev.text
      });
    } else {
      setEditingReview(null);
      setReviewData({
        author: "",
        role: "",
        rating: 5,
        text: ""
      });
    }
    setShowReviewForm(true);
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReview) {
      updateReview({
        ...editingReview,
        author: reviewData.author,
        role: reviewData.role,
        rating: reviewData.rating,
        text: reviewData.text
      });
    } else {
      addReview(reviewData);
    }
    setShowReviewForm(false);
    setEditingReview(null);
  };

  // Gallery handler
  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    addGalleryItem({
      imageUrl: galleryData.imageUrl || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
      category: galleryData.category,
      caption: galleryData.caption
    });
    setShowGalleryForm(false);
    setGalleryData({
      imageUrl: "",
      category: "Residential",
      caption: ""
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-28 pb-16 min-h-screen flex items-center justify-center bg-gray-50 uppercase-all p-4">
        <div className="max-w-md w-full bg-white rounded-sm border border-gray-200 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-luxury-blue text-white p-6 text-center border-b border-luxury-gold relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 blur-[35px] rounded-full" />
            <KeyRound className="w-10 h-10 text-luxury-gold mx-auto mb-3" />
            <h2 className="font-serif font-bold text-lg tracking-wider uppercase">
              RESOURCES CMS SECURITY GATE
            </h2>
            <p className="text-[10px] text-gray-300 font-mono tracking-widest uppercase mt-1">
              Authorized admin staff entry protocols only
            </p>
          </div>

          {/* Form wrapper */}
          <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-4 text-left">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1.5">
                ADMIN STAFF PASSWORD
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (aaradhana77)"
                className="w-full px-4 py-3 rounded-sm border border-gray-200 text-sm focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold focus:outline-none transition-all font-sans"
              />
            </div>

            {loginError && (
              <div className="flex gap-2 items-start p-3 bg-red-50 text-red-700 text-xs rounded-sm border border-red-100">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Authentication credentials failed. Please verify management sheets.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-luxury-blue hover:bg-luxury-gold hover:text-luxury-blue text-white py-3 rounded-sm font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              Sign In Admin Panel
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer note */}
          <div className="p-4 bg-gray-50 border-t border-gray-100 text-center text-[10px] text-gray-400">
            © 2026 Aaradhana Realty Pvt. Ltd. • Raipur CG
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 self-stretch flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col">
        
        {/* Top welcome status bar */}
        <div className="bg-luxury-blue text-white p-5 sm:p-6 rounded-sm border-l-4 border-luxury-gold shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 text-left">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-luxury-gold" />
              <span className="font-mono text-[9px] tracking-widest text-[#A2C290] font-bold uppercase">
                ● Live Synchronized CMS Console
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight mt-1">
              Welcome, Administrator
            </h1>
            <p className="text-xs text-gray-300 font-light mt-0.5">
              Any changes committed instantly update the customer-facing Chhattisgarh portfolio without coding.
            </p>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center gap-2 border border-white/20 hover:border-red-400 text-gray-300 hover:text-red-400 text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-sm transition-all cursor-pointer bg-white/5"
          >
            <LogOut className="w-4 h-4" />
            Logout CMS
          </button>
        </div>

        {/* CMS main panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-grow">
          
          {/* Navigation Sidebar Drawer */}
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-sm p-4 space-y-2 text-left shadow-sm">
            <span className="block text-[9px] font-mono tracking-widest text-gray-400 font-bold uppercase px-3 mb-2">
              CMS NAVIGATION HUB
            </span>

            {[
              { id: "general", name: "Homepage & Logo", icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: "properties", name: "Portfolio Listings", icon: <Plus className="w-4 h-4" /> },
              { id: "reviews", name: "Client Reviews", icon: <Star className="w-4 h-4" /> },
              { id: "gallery", name: "Media Gallery", icon: <FileText className="w-4 h-4" /> },
              { id: "leads", name: "Registered Leads", icon: <Inbox className="w-4 h-4" /> },
              { id: "seo", name: "SEO Metatags", icon: <Globe className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left px-4 py-3 text-xs font-bold tracking-wider uppercase rounded-sm flex items-center gap-3 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-luxury-blue text-white"
                    : "bg-transparent text-gray-600 hover:bg-gray-50 hover:text-luxury-blue"
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>

          {/* Core Panel Content */}
          <div className="lg:col-span-9 bg-white border border-gray-200 rounded-sm p-6 sm:p-8 shadow-sm text-left">
            
            {/* T1: GENERAL HOMEPAGE & LOGO */}
            {activeTab === "general" && (
              <form onSubmit={handleSaveGeneral} className="space-y-6">
                <div>
                  <h2 className="text-lg font-serif font-bold text-luxury-blue border-b border-gray-100 pb-3 uppercase">
                    Homepage Texts & Load Screen Logo
                  </h2>
                  <p className="text-gray-400 text-xs mt-1">Configure loading screens, hero captions, and corporate statements.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-1.5">
                      Company Full Name Designation
                    </label>
                    <input
                      type="text"
                      required
                      value={generalSettings.companyName}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, companyName: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-sm border border-gray-200 text-sm focus:border-luxury-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-1.5">
                      Short Wordmark Logo Text
                    </label>
                    <input
                      type="text"
                      required
                      value={generalSettings.logoText}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, logoText: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-sm border border-gray-200 text-sm focus:border-luxury-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-1.5">
                      Load Splash Logo (Emoji/Symbol)
                    </label>
                    <input
                      type="text"
                      value={generalSettings.loadingLogo}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, loadingLogo: e.target.value })}
                      placeholder="🏛️"
                      className="w-full px-3 py-2.5 rounded-sm border border-gray-200 text-sm focus:border-luxury-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-1.5">
                      Splash Loading Title
                    </label>
                    <input
                      type="text"
                      value={generalSettings.loadingSubtitle}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, loadingSubtitle: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-sm border border-gray-200 text-sm focus:border-luxury-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-1.5">
                      Splash Loading Tagline
                    </label>
                    <input
                      type="text"
                      value={generalSettings.loadingTagline}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, loadingTagline: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-sm border border-gray-200 text-sm focus:border-luxury-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-1.5">
                      Hero Headline Headline
                    </label>
                    <input
                      type="text"
                      value={generalSettings.homepage.heroTitle}
                      onChange={(e) => setGeneralSettings({
                        ...generalSettings,
                        homepage: { ...generalSettings.homepage, heroTitle: e.target.value }
                      })}
                      className="w-full px-3 py-2.5 rounded-sm border border-gray-200 text-sm focus:border-luxury-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-1.5">
                      Hero Subheadline Caption
                    </label>
                    <textarea
                      rows={3}
                      value={generalSettings.homepage.heroSubtitle}
                      onChange={(e) => setGeneralSettings({
                        ...generalSettings,
                        homepage: { ...generalSettings.homepage, heroSubtitle: e.target.value }
                      })}
                      className="w-full px-3 py-2.5 rounded-sm border border-gray-200 text-sm focus:border-luxury-gold focus:outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[9px] tracking-wider uppercase text-gray-400 font-bold mb-1">Properties Stat</label>
                    <input
                      type="text"
                      value={generalSettings.homepage.statProperties}
                      onChange={(e) => setGeneralSettings({
                        ...generalSettings,
                        homepage: { ...generalSettings.homepage, statProperties: e.target.value }
                      })}
                      className="w-full px-2 py-2 rounded-sm border border-gray-200 text-xs focus:border-luxury-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-wider uppercase text-gray-400 font-bold mb-1">Clients Stat</label>
                    <input
                      type="text"
                      value={generalSettings.homepage.statClients}
                      onChange={(e) => setGeneralSettings({
                        ...generalSettings,
                        homepage: { ...generalSettings.homepage, statClients: e.target.value }
                      })}
                      className="w-full px-2 py-2 rounded-sm border border-gray-200 text-xs focus:border-luxury-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-wider uppercase text-gray-400 font-bold mb-1">Deals Stat</label>
                    <input
                      type="text"
                      value={generalSettings.homepage.statDeals}
                      onChange={(e) => setGeneralSettings({
                        ...generalSettings,
                        homepage: { ...generalSettings.homepage, statDeals: e.target.value }
                      })}
                      className="w-full px-2 py-2 rounded-sm border border-gray-200 text-xs focus:border-luxury-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-wider uppercase text-gray-400 font-bold mb-1">Rating Stat</label>
                    <input
                      type="text"
                      value={generalSettings.homepage.statRating}
                      onChange={(e) => setGeneralSettings({
                        ...generalSettings,
                        homepage: { ...generalSettings.homepage, statRating: e.target.value }
                      })}
                      className="w-full px-2 py-2 rounded-sm border border-gray-200 text-xs focus:border-luxury-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[#0B1F3A] font-bold border-b border-gray-100 pb-2 mb-4">
                    About Us Editorial Text Content
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-1">About Headline</label>
                      <input
                        type="text"
                        value={generalSettings.homepage.aboutTitle}
                        onChange={(e) => setGeneralSettings({
                          ...generalSettings,
                          homepage: { ...generalSettings.homepage, aboutTitle: e.target.value }
                        })}
                        className="w-full px-3 py-2.5 rounded-sm border border-gray-200 text-sm focus:border-luxury-gold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-1">About Subtitle</label>
                      <input
                        type="text"
                        value={generalSettings.homepage.aboutSubtitle}
                        onChange={(e) => setGeneralSettings({
                          ...generalSettings,
                          homepage: { ...generalSettings.homepage, aboutSubtitle: e.target.value }
                        })}
                        className="w-full px-3 py-2.5 rounded-sm border border-gray-200 text-sm focus:border-luxury-gold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-1">About Paragraph 1</label>
                      <textarea
                        rows={3}
                        value={generalSettings.homepage.aboutParagraph1}
                        onChange={(e) => setGeneralSettings({
                          ...generalSettings,
                          homepage: { ...generalSettings.homepage, aboutParagraph1: e.target.value }
                        })}
                        className="w-full px-3 py-2.5 rounded-sm border border-gray-200 text-xs focus:border-luxury-gold focus:outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-1">About Paragraph 2</label>
                      <textarea
                        rows={3}
                        value={generalSettings.homepage.aboutParagraph2}
                        onChange={(e) => setGeneralSettings({
                          ...generalSettings,
                          homepage: { ...generalSettings.homepage, aboutParagraph2: e.target.value }
                        })}
                        className="w-full px-3 py-2.5 rounded-sm border border-gray-200 text-xs focus:border-luxury-gold focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[#0B1F3A] font-bold border-b border-gray-100 pb-2 mb-4">
                    Contact Metrics Hotlines
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-1">Office Contact Phone</label>
                      <input
                        type="text"
                        value={generalSettings.contact.phone}
                        onChange={(e) => setGeneralSettings({
                          ...generalSettings,
                          contact: { ...generalSettings.contact, phone: e.target.value }
                        })}
                        className="w-full px-3 py-2.5 rounded-sm border border-gray-200 text-sm focus:border-luxury-gold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-1">Office WhatsApp Desk</label>
                      <input
                        type="text"
                        value={generalSettings.contact.whatsapp}
                        onChange={(e) => setGeneralSettings({
                          ...generalSettings,
                          contact: { ...generalSettings.contact, whatsapp: e.target.value }
                        })}
                        className="w-full px-3 py-2.5 rounded-sm border border-gray-200 text-sm focus:border-luxury-gold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-1">Corporate Hours Label</label>
                      <input
                        type="text"
                        value={generalSettings.contact.hours}
                        onChange={(e) => setGeneralSettings({
                          ...generalSettings,
                          contact: { ...generalSettings.contact, hours: e.target.value }
                        })}
                        className="w-full px-3 py-2.5 rounded-sm border border-gray-200 text-sm focus:border-luxury-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 mt-4">
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-1">Corporate Physical Address Layout</label>
                      <input
                        type="text"
                        value={generalSettings.contact.address}
                        onChange={(e) => setGeneralSettings({
                          ...generalSettings,
                          contact: { ...generalSettings.contact, address: e.target.value }
                        })}
                        className="w-full px-3 py-2.5 rounded-sm border border-gray-200 text-sm focus:border-luxury-gold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-1">Google Maps Frame Embed Link (URL)</label>
                      <input
                        type="text"
                        value={generalSettings.contact.mapEmbedUrl}
                        onChange={(e) => setGeneralSettings({
                          ...generalSettings,
                          contact: { ...generalSettings.contact, mapEmbedUrl: e.target.value }
                        })}
                        className="w-full px-3 py-2.5 rounded-sm border border-gray-200 text-xs focus:border-luxury-gold focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[#0B1F3A] font-bold border-b border-gray-100 pb-2 mb-4">
                    Social Media Channels URLs
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">Facebook Handle</label>
                      <input
                        type="url"
                        value={generalSettings.socials.facebook}
                        onChange={(e) => setGeneralSettings({
                          ...generalSettings,
                          socials: { ...generalSettings.socials, facebook: e.target.value }
                        })}
                        className="w-full px-3 py-2 rounded-sm border border-gray-200 text-xs focus:border-luxury-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">Instagram Link</label>
                      <input
                        type="url"
                        value={generalSettings.socials.instagram}
                        onChange={(e) => setGeneralSettings({
                          ...generalSettings,
                          socials: { ...generalSettings.socials, instagram: e.target.value }
                        })}
                        className="w-full px-3 py-2 rounded-sm border border-gray-200 text-xs focus:border-luxury-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">LinkedIn Profile</label>
                      <input
                        type="url"
                        value={generalSettings.socials.linkedin}
                        onChange={(e) => setGeneralSettings({
                          ...generalSettings,
                          socials: { ...generalSettings.socials, linkedin: e.target.value }
                        })}
                        className="w-full px-3 py-2 rounded-sm border border-gray-200 text-xs focus:border-luxury-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">YouTube Channel</label>
                      <input
                        type="url"
                        value={generalSettings.socials.youtube}
                        onChange={(e) => setGeneralSettings({
                          ...generalSettings,
                          socials: { ...generalSettings.socials, youtube: e.target.value }
                        })}
                        className="w-full px-3 py-2 rounded-sm border border-gray-200 text-xs focus:border-luxury-gold"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-luxury-blue text-white hover:bg-luxury-gold hover:text-luxury-blue hover:scale-[1.02] text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-sm transition-all shadow-md cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    COMMIT HOMEPAGE CMS
                  </button>
                </div>
              </form>
            )}

            {/* T2: PORTFOLIO PROPERTIES */}
            {activeTab === "properties" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="text-lg font-serif font-bold text-luxury-blue uppercase">
                      Manage Real Estate Properties Portfolio
                    </h2>
                    <p className="text-gray-400 text-xs mt-1">Add, edit details, or strip properties from the portfolio.</p>
                  </div>

                  <button
                    onClick={() => handleOpenPropertyForm(null)}
                    className="inline-flex items-center gap-1.5 bg-luxury-blue text-white hover:bg-luxury-gold hover:text-luxury-blue px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-sm transition-all cursor-pointer shadow"
                  >
                    <Plus className="w-4 h-4" />
                    ADD PROPERTY
                  </button>
                </div>

                {/* Form popup conditional rendering */}
                <AnimatePresence>
                  {showPropertyForm && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-5 border border-luxury-gold/30 bg-gray-50/70 rounded-sm mb-6"
                    >
                      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
                        <h3 className="text-xs font-bold font-sans uppercase text-[#0B1F3A] tracking-wider">
                          {editingProperty ? "EDITING PROPERTY LISTING" : "ADD NEW LUXURY REAL ESTATE LISTING"}
                        </h3>
                        <button
                          onClick={() => {
                            setShowPropertyForm(false);
                            setEditingProperty(null);
                          }}
                          className="text-gray-400 hover:text-gray-700 font-extrabold text-sm focus:outline-none"
                        >
                          ✕ CLOSING
                        </button>
                      </div>

                      <form onSubmit={handleSaveProperty} className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Property Title Name*</label>
                          <input
                            type="text"
                            required
                            value={propertyData.title}
                            onChange={(e) => setPropertyData({ ...propertyData, title: e.target.value })}
                            className="w-full px-3 py-2 border rounded-sm text-xs bg-white focus:outline-none"
                            placeholder="e.g. Aaradhana Silver Crest Villa"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Raipur Site Location address*</label>
                          <input
                            type="text"
                            required
                            value={propertyData.location}
                            onChange={(e) => setPropertyData({ ...propertyData, location: e.target.value })}
                            className="w-full px-3 py-2 border rounded-sm text-xs bg-white focus:outline-none"
                            placeholder="e.g. VIP Road Near Ambuja Mall, Raipur"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Standard Valuation / Price*</label>
                          <input
                            type="text"
                            required
                            value={propertyData.price}
                            onChange={(e) => setPropertyData({ ...propertyData, price: e.target.value })}
                            className="w-full px-3 py-2 border rounded-sm text-xs bg-white focus:outline-none"
                            placeholder="e.g. ₹2.40 Crore"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Category Type Selector</label>
                          <select
                            value={propertyData.propertyType}
                            onChange={(e) => setPropertyData({ ...propertyData, propertyType: e.target.value as any })}
                            className="w-full px-3 py-2 border rounded-sm text-xs bg-white focus:outline-none"
                          >
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Luxury">Luxury</option>
                            <option value="Villa">Villa</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Land">Land</option>
                            <option value="Industrial">Industrial</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Built Size Area*</label>
                          <input
                            type="text"
                            required
                            value={propertyData.area}
                            onChange={(e) => setPropertyData({ ...propertyData, area: e.target.value })}
                            className="w-full px-3 py-2 border rounded-sm text-xs bg-white focus:outline-none"
                            placeholder="e.g. 3,450 Sq.Ft."
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Tag Headline Designation</label>
                          <input
                            type="text"
                            value={propertyData.tag}
                            onChange={(e) => setPropertyData({ ...propertyData, tag: e.target.value })}
                            className="w-full px-3 py-2 border rounded-sm text-xs bg-white focus:outline-none"
                            placeholder="e.g. Rare Portfolio Deal"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Property Image Source link (URL)</label>
                          <input
                            type="text"
                            value={propertyData.image}
                            onChange={(e) => setPropertyData({ ...propertyData, image: e.target.value })}
                            className="w-full px-3 py-2 border rounded-sm text-xs bg-white focus:outline-none"
                            placeholder="e.g. https://images.unsplash.com/..."
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Bedrooms Layout count (Optional)</label>
                          <input
                            type="number"
                            value={propertyData.beds}
                            onChange={(e) => setPropertyData({ ...propertyData, beds: e.target.value })}
                            className="w-full px-3 py-2 border rounded-sm text-xs bg-white focus:outline-none"
                            placeholder="e.g. 4"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Bathrooms Finished count (Optional)</label>
                          <input
                            type="number"
                            value={propertyData.baths}
                            onChange={(e) => setPropertyData({ ...propertyData, baths: e.target.value })}
                            className="w-full px-3 py-2 border rounded-sm text-xs bg-white focus:outline-none"
                            placeholder="e.g. 5"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Full Description Narrative Text</label>
                          <textarea
                            rows={3}
                            value={propertyData.description}
                            onChange={(e) => setPropertyData({ ...propertyData, description: e.target.value })}
                            className="w-full px-3 py-2 border rounded-sm text-xs bg-white focus:outline-none resize-none"
                            placeholder="Detail full design metrics, luxury highlights..."
                          />
                        </div>

                        <div className="sm:col-span-2 flex justify-end gap-2 pt-2 border-t border-gray-200">
                          <button
                            type="button"
                            onClick={() => {
                              setShowPropertyForm(false);
                              setEditingProperty(null);
                            }}
                            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-sm text-xs uppercase"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-luxury-blue text-white px-5 py-2 rounded-sm text-xs uppercase font-bold"
                          >
                            Save Listing
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Properties List Table */}
                <div className="overflow-x-auto border rounded-sm">
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-100 uppercase text-[9px] text-gray-500 tracking-wider">
                        <th className="p-4 border-b text-left">Property</th>
                        <th className="p-4 border-b text-left">Type</th>
                        <th className="p-4 border-b text-left">Price</th>
                        <th className="p-4 border-b text-left">Location</th>
                        <th className="p-4 border-b text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-left">
                      {properties.map((prop) => (
                        <tr key={prop.id} className="hover:bg-gray-50/55">
                          <td className="p-4 flex items-center gap-3">
                            <img src={prop.image} className="w-10 h-10 object-cover rounded-xs border shrink-0" alt="" />
                            <div>
                              <p className="font-bold text-gray-800">{prop.title}</p>
                              <p className="text-[10px] text-gray-400 font-mono">{prop.area}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="bg-gray-100 border text-gray-600 px-2.5 py-0.5 rounded-sm font-semibold uppercase">{prop.propertyType}</span>
                          </td>
                          <td className="p-4 font-bold text-luxury-gold-dark">{prop.price}</td>
                          <td className="p-4 text-gray-500 max-w-xs truncate">{prop.location}</td>
                          <td className="p-4 text-right">
                            <div className="inline-flex gap-2.5">
                              <button
                                onClick={() => handleOpenPropertyForm(prop)}
                                className="p-1 px-2 border hover:border-luxury-gold text-gray-500 hover:text-luxury-gold-dark font-bold uppercase text-[9px] rounded-sm transition-colors cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Remove property "${prop.title}"?`)) {
                                    deleteProperty(prop.id);
                                  }
                                }}
                                className="p-1 px-2 border border-red-100 hover:border-red-400 text-red-500 hover:text-red-700 font-bold uppercase text-[9px] rounded-sm transition-colors cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* T3: CLIENT REVIEWS */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="text-lg font-serif font-bold text-luxury-blue uppercase">
                      Manage Client Reviews & Endorsements
                    </h2>
                    <p className="text-gray-400 text-xs mt-1">Configure live auto-carousel reviews from high-profile partners.</p>
                  </div>

                  <button
                    onClick={() => handleOpenReviewForm(null)}
                    className="inline-flex items-center gap-1.5 bg-luxury-blue text-white hover:bg-luxury-gold hover:text-luxury-blue px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-sm transition-all cursor-pointer shadow"
                  >
                    <Plus className="w-4 h-4" />
                    ADD TESTIMONIAL
                  </button>
                </div>

                {/* Review Form Drawer */}
                <AnimatePresence>
                  {showReviewForm && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-5 border border-luxury-gold/30 bg-gray-50/70 rounded-sm mb-6"
                    >
                      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
                        <h3 className="text-xs font-bold font-sans uppercase text-[#0B1F3A] tracking-wider">
                          Testimonial Config
                        </h3>
                        <button
                          onClick={() => {
                            setShowReviewForm(false);
                            setEditingReview(null);
                          }}
                          className="text-gray-400 hover:text-gray-700 text-xs"
                        >
                          ✕ CANCEL
                        </button>
                      </div>

                      <form onSubmit={handleSaveReview} className="space-y-4 text-left">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Author client Name*</label>
                            <input
                              type="text"
                              required
                              value={reviewData.author}
                              onChange={(e) => setReviewData({ ...reviewData, author: e.target.value })}
                              className="w-full px-3 py-2 border rounded-sm text-xs bg-white"
                              placeholder="e.g. Dr. Rakesh Baghel"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Corporate Role Designation*</label>
                            <input
                              type="text"
                              required
                              value={reviewData.role}
                              onChange={(e) => setReviewData({ ...reviewData, role: e.target.value })}
                              className="w-full px-3 py-2 border rounded-sm text-xs bg-white"
                              placeholder="e.g. High-court Advocate / Investor Coordinator"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Star rating (Scale 1-5)</label>
                            <select
                              value={reviewData.rating}
                              onChange={(e) => setReviewData({ ...reviewData, rating: parseInt(e.target.value, 10) })}
                              className="w-full px-3 py-2 border rounded-sm text-xs bg-white focus:outline-none"
                            >
                              <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
                              <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
                              <option value={3}>⭐⭐⭐ 3 Stars</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Quote Description Message*</label>
                          <textarea
                            rows={3}
                            required
                            value={reviewData.text}
                            onChange={(e) => setReviewData({ ...reviewData, text: e.target.value })}
                            className="w-full px-3 py-2 border rounded-sm text-xs bg-white resize-none"
                            placeholder="Detail real estate acquisition review content..."
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
                          <button
                            type="button"
                            onClick={() => {
                              setShowReviewForm(false);
                              setEditingReview(null);
                            }}
                            className="border text-gray-600 px-4 py-2 rounded-sm text-xs uppercase"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-luxury-blue text-white px-5 py-2 rounded-sm text-xs uppercase font-bold"
                          >
                            Save Review
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Reviews List */}
                <div className="grid grid-cols-1 gap-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="border p-4 rounded-sm flex items-start justify-between gap-4">
                      <div>
                        {/* Rating stars */}
                        <div className="flex gap-1 mb-2">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 text-luxury-gold fill-luxury-gold" />
                          ))}
                        </div>
                        <p className="text-gray-700 italic text-xs">"{rev.text}"</p>
                        <p className="font-semibold text-gray-800 text-xs font-sans mt-2">
                          {rev.author} • <span className="text-gray-400 font-light">{rev.role}</span>
                        </p>
                        <span className="text-[10px] text-gray-400 font-mono mt-1 block">Dated: {rev.date}</span>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => handleOpenReviewForm(rev)}
                          className="p-1.5 px-2.5 border text-gray-500 hover:text-luxury-gold hover:border-luxury-gold uppercase text-[9px] font-bold rounded-sm cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Strip client review from table?`)) {
                              deleteReview(rev.id);
                            }
                          }}
                          className="p-1.5 px-2.5 border border-red-100 hover:border-red-400 text-red-500 hover:text-red-700 font-bold uppercase text-[9px] rounded-sm cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* T4: MEDIA GALLERY */}
            {activeTab === "gallery" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="text-lg font-serif font-bold text-luxury-blue uppercase">
                      Manage Photographic Gallery Files
                    </h2>
                    <p className="text-gray-400 text-xs mt-1">Upload pictures to Site visits, residential catalog, or construction projects.</p>
                  </div>

                  <button
                    onClick={() => setShowGalleryForm(true)}
                    className="inline-flex items-center gap-1.5 bg-luxury-blue text-white hover:bg-luxury-gold hover:text-luxury-blue px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-sm transition-all cursor-pointer shadow"
                  >
                    <Plus className="w-4 h-4" />
                    ADD PHOTO
                  </button>
                </div>

                {/* Add Photo Form drawer */}
                <AnimatePresence>
                  {showGalleryForm && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-5 border border-luxury-gold/30 bg-gray-50/70 rounded-sm mb-6"
                    >
                      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
                        <h3 className="text-xs font-bold font-sans uppercase text-[#0B1F3A] tracking-wider">
                          UPLOADING FILE DETAILS
                        </h3>
                        <button onClick={() => setShowGalleryForm(false)} className="text-gray-400 hover:text-gray-700 text-xs">
                          ✕ CLOSE
                        </button>
                      </div>

                      <form onSubmit={handleSaveGallery} className="space-y-4 text-left grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Image source URL*</label>
                          <input
                            type="text"
                            required
                            value={galleryData.imageUrl}
                            onChange={(e) => setGalleryData({ ...galleryData, imageUrl: e.target.value })}
                            className="w-full px-3 py-2 border rounded-sm text-xs bg-white focus:outline-none"
                            placeholder="https://images.unsplash.com/..."
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Category Category Tab*</label>
                          <select
                            value={galleryData.category}
                            onChange={(e) => setGalleryData({ ...galleryData, category: e.target.value as any })}
                            className="w-full px-3 py-2 border rounded-sm text-xs bg-white focus:outline-none"
                          >
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Luxury Homes">Luxury Homes</option>
                            <option value="Construction Projects">Construction Projects</option>
                            <option value="Site Visits">Site Visits</option>
                            <option value="Office Photos">Office Photos</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Description Caption*</label>
                          <input
                            type="text"
                            required
                            value={galleryData.caption}
                            onChange={(e) => setGalleryData({ ...galleryData, caption: e.target.value })}
                            className="w-full px-3 py-2 border rounded-sm text-xs bg-white focus:outline-none"
                            placeholder="e.g. Executive Shankar Nagar Site audit project"
                          />
                        </div>

                        <div className="sm:col-span-2 flex justify-end gap-2 pt-2 border-t border-gray-200">
                          <button
                            type="button"
                            onClick={() => setShowGalleryForm(false)}
                            className="border text-gray-600 px-4 py-2 rounded-sm text-xs"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-luxury-blue text-white px-5 py-2 rounded-sm text-xs font-bold uppercase"
                          >
                            Save Photo File
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Gallery List Grid View */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {gallery.map((g) => (
                    <div key={g.id} className="border rounded-sm overflow-hidden group relative bg-gray-50 text-left flex flex-col justify-between">
                      <div className="h-32 bg-gray-200 overflow-hidden relative">
                        <img src={g.imageUrl} className="w-full h-full object-cover" alt="" />
                        <span className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[8px] font-mono uppercase px-2 py-0.5 rounded-sm">
                          {g.category}
                        </span>
                      </div>
                      <div className="p-3">
                        <p className="text-[11px] text-gray-500 italic line-clamp-2 leading-snug">{g.caption}</p>
                        <button
                          onClick={() => {
                            if (confirm("Remove file from gallery catalog?")) {
                              deleteGalleryItem(g.id);
                            }
                          }}
                          className="mt-3 w-full border border-red-50 hover:border-red-400 hover:bg-red-50 text-red-500 py-1 rounded-sm text-[9px] font-bold uppercase cursor-pointer"
                        >
                          Strip File
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* T5: REGISTERED LEADS */}
            {activeTab === "leads" && (
              <div className="space-y-8 text-left">
                
                {/* Section header */}
                <div>
                  <h2 className="text-lg font-serif font-bold text-luxury-blue uppercase border-b border-gray-100 pb-3">
                    Inbound Customer Leads Management
                  </h2>
                  <p className="text-gray-400 text-xs mt-1">
                    Manage client registrations dynamically saved from buying and listing site forms.
                  </p>
                </div>

                {/* Leads lists cards */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs uppercase font-bold tracking-widest text-luxury-gold-dark mb-4 border-l-2 border-luxury-gold pl-2">
                      Buyer Purchase inquiries ({buyerLeads.length})
                    </h3>

                    {buyerLeads.length === 0 ? (
                      <p className="text-xs text-gray-400 bg-gray-50 border p-4 rounded-sm">No buy property inquiries logged yet.</p>
                    ) : (
                      <div className="space-y-4">
                        {buyerLeads.map((bl) => (
                          <div key={bl.id} className="border p-5 rounded-sm bg-stone-50/50 flex flex-col sm:flex-row justify-between gap-4 items-start relative overflow-hidden">
                            
                            <div className="space-y-2 flex-1">
                              {/* status block */}
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-sm ${
                                  bl.status === "New" ? "bg-red-100 text-red-800" :
                                  bl.status === "Contacted" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                                }`}>
                                  Status: {bl.status}
                                </span>
                                <span className="font-mono text-[9px] text-gray-400">Logged on {bl.date}</span>
                              </div>

                              <h4 className="font-sans font-bold text-sm text-gray-900">{bl.name}</h4>
                              
                              {/* Metrics */}
                              <div className="grid grid-cols-2 gap-4 text-xs font-serif italic text-gray-600 font-light pt-1">
                                <div>
                                  <span className="text-[9px] text-gray-400 not-italic uppercase font-bold tracking-widest font-mono block">Hotline Phone</span>
                                  <a href={`tel:${bl.mobile}`} className="text-[#0B1F3A] font-semibold font-sans not-italic block">{bl.mobile}</a>
                                </div>
                                <div>
                                  <span className="text-[9px] text-gray-400 not-italic uppercase font-bold tracking-widest font-mono block">Budget Range</span>
                                  <span className="text-luxury-gold-dark font-sans not-italic block">{bl.budget || "Not Specified"}</span>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-[9px] text-gray-400 not-italic uppercase font-bold tracking-widest font-mono block">Acquisition preferences</span>
                                  <span className="text-gray-800 font-sans not-italic text-xs block mt-0.5 font-bold">
                                    Type: {bl.propertyType} • Zone: {bl.location || "Any Raipur"}
                                  </span>
                                </div>
                              </div>

                              <div className="bg-white border rounded-sm p-3 text-xs text-gray-600 leading-relaxed font-light mt-2 max-w-2xl">
                                <span className="font-bold text-[9px] uppercase tracking-widest font-mono block text-gray-400 mb-1">Message</span>
                                "{bl.message || "No custom comment."}"
                              </div>
                            </div>

                            {/* Status changer buttons */}
                            <div className="flex flex-row sm:flex-col gap-2 shrink-0 justify-end w-full sm:w-auto">
                              <select
                                value={bl.status}
                                onChange={(e) => updateBuyerLeadStatus(bl.id, e.target.value as any)}
                                className="px-2 py-1.5 border text-xs bg-white rounded-sm focus:outline-none"
                              >
                                <option value="New">Set New</option>
                                <option value="Contacted">Set Contacted</option>
                                <option value="Closed">Set Closed</option>
                              </select>

                              <button
                                onClick={() => deleteBuyerLead(bl.id)}
                                className="p-1.5 px-3 border border-red-100 hover:border-red-400 text-red-500 hover:text-red-700 text-[10px] font-bold uppercase rounded-sm cursor-pointer"
                              >
                                Delete Lead
                              </button>
                            </div>

                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xs uppercase font-bold tracking-widest text-luxury-gold-dark mb-4 border-l-2 border-luxury-gold pl-2">
                      Seller Property listings ({sellerLeads.length})
                    </h3>

                    {sellerLeads.length === 0 ? (
                      <p className="text-xs text-gray-400 bg-gray-50 border p-4 rounded-sm">No sell listings submitted yet.</p>
                    ) : (
                      <div className="space-y-4">
                        {sellerLeads.map((sl) => (
                          <div key={sl.id} className="border p-5 rounded-sm bg-stone-50/50 flex flex-col sm:flex-row justify-between gap-4 items-start relative overflow-hidden">
                            
                            <div className="space-y-2 flex-grow">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-sm ${
                                  sl.status === "New" ? "bg-red-100 text-red-800" :
                                  sl.status === "Contacted" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                                }`}>
                                  Status: {sl.status}
                                </span>
                                <span className="font-mono text-[9px] text-gray-400">Logged on {sl.date}</span>
                              </div>

                              <h4 className="font-sans font-bold text-sm text-gray-900">{sl.name}</h4>
                              
                              {/* Specs matrix table */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-1 border-t border-gray-200/50 mt-3 pt-3">
                                <div>
                                  <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest font-mono block">Mobile Phone</span>
                                  <a href={`tel:${sl.mobile}`} className="text-[#0B1F3A] font-semibold font-sans block">{sl.mobile}</a>
                                </div>
                                <div>
                                  <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest font-mono block">Property Category</span>
                                  <span className="text-gray-800 font-sans block font-semibold">{sl.propertyType}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest font-mono block">Prop Size</span>
                                  <span className="text-gray-800 font-sans block font-semibold">{sl.size || "Not Specified"}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest font-mono block">Expected Valuation</span>
                                  <span className="text-luxury-gold-dark font-sans block font-bold">{sl.expectedPrice || "Not Specified"}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest font-mono block">Dimensions</span>
                                  <span className="text-gray-600 block text-[11px]">F: {sl.frontage || "-"} • D: {sl.depth || "-"} (ft)</span>
                                </div>
                                <div className="sm:col-span-3">
                                  <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest font-mono block">Google Location coordinates</span>
                                  {sl.locationLink ? (
                                    <a href={sl.locationLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate block max-w-sm mt-0.5">
                                      🔗 Open Coordinates Link
                                    </a>
                                  ) : (
                                    <span className="text-gray-400 text-xs block">Coordinates Not provided</span>
                                  )}
                                </div>
                              </div>

                              <div className="bg-white border rounded-sm p-3 text-xs text-gray-600 leading-relaxed font-light mt-2 max-w-2xl">
                                <span className="font-bold text-[9px] uppercase tracking-widest font-mono block text-gray-400 mb-1">Message</span>
                                "{sl.message || "No custom message."}"
                              </div>
                            </div>

                            {/* Status controls */}
                            <div className="flex flex-row sm:flex-col gap-2 shrink-0 justify-end w-full sm:w-auto">
                              <select
                                value={sl.status}
                                onChange={(e) => updateSellerLeadStatus(sl.id, e.target.value as any)}
                                className="px-2 py-1.5 border text-xs bg-white rounded-sm focus:outline-none"
                              >
                                <option value="New">Set New</option>
                                <option value="Contacted">Set Contacted</option>
                                <option value="Closed">Set Closed</option>
                              </select>

                              <button
                                onClick={() => deleteSellerLead(sl.id)}
                                className="p-1.5 px-3 border border-red-100 hover:border-red-400 text-red-500 hover:text-red-700 text-[10px] font-bold uppercase rounded-sm cursor-pointer"
                              >
                                Delete Lead
                              </button>
                            </div>

                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* T6: SEO SETTINGS CODES */}
            {activeTab === "seo" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateCMSConfig(generalSettings);
                  // Update tab title and description dynamically on submission
                  document.title = generalSettings.seo.title;
                  alert("SEO Metatags committed perfectly. Search spiders will index customized keywords.");
                }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-lg font-serif font-bold text-luxury-blue uppercase border-b border-gray-100 pb-3">
                    Corporate SEO & Metatags Crawler Setup
                  </h2>
                  <p className="text-gray-400 text-xs mt-1">Configure meta title tags, descriptions, and Raipur real-estate query phrases for web search optimization.</p>
                </div>

                <div className="space-y-4 text-left">
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-1">
                      Web Page Meta Title Line*
                    </label>
                    <input
                      type="text"
                      required
                      value={generalSettings.seo.title}
                      onChange={(e) => setGeneralSettings({
                        ...generalSettings,
                        seo: { ...generalSettings.seo, title: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-sm border border-gray-200 text-sm focus:border-luxury-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-1">
                      Search Engine Page Meta Description*
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={generalSettings.seo.description}
                      onChange={(e) => setGeneralSettings({
                        ...generalSettings,
                        seo: { ...generalSettings.seo, description: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-sm border border-gray-200 text-xs focus:border-luxury-gold focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-1">
                      Target Indexing Keywords (Comma-Separated)*
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={generalSettings.seo.keywords}
                      onChange={(e) => setGeneralSettings({
                        ...generalSettings,
                        seo: { ...generalSettings.seo, keywords: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-sm border border-gray-200 text-xs focus:border-luxury-gold focus:outline-none resize-none font-sans"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-luxury-blue text-white hover:bg-luxury-gold hover:text-luxury-blue hover:scale-[1.02] text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-sm transition-all shadow-md cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    SAVE SEARCH METRICS
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
