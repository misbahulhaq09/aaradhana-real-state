import React, { createContext, useContext, useState, useEffect } from "react";
import { Property, Review, GalleryItem, BuyerLead, SellerLead, CMSConfig } from "../types";
import { initialProperties, initialReviews, initialGallery, initialCMSConfig } from "../data";

interface CMSContextType {
  cmsConfig: CMSConfig;
  properties: Property[];
  reviews: Review[];
  gallery: GalleryItem[];
  buyerLeads: BuyerLead[];
  sellerLeads: SellerLead[];
  isAuthenticated: boolean;
  updateCMSConfig: (config: CMSConfig) => void;
  // Properties CRUD
  addProperty: (property: Omit<Property, "id">) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: string) => void;
  // Reviews CRUD
  addReview: (review: Omit<Review, "id" | "date">) => void;
  updateReview: (review: Review) => void;
  deleteReview: (id: string) => void;
  // Gallery CRUD
  addGalleryItem: (item: Omit<GalleryItem, "id">) => void;
  deleteGalleryItem: (id: string) => void;
  // Leads management
  submitBuyerLead: (lead: Omit<BuyerLead, "id" | "date" | "status">) => void;
  submitSellerLead: (lead: Omit<SellerLead, "id" | "date" | "status">) => void;
  updateBuyerLeadStatus: (id: string, status: "New" | "Contacted" | "Closed") => void;
  updateSellerLeadStatus: (id: string, status: "New" | "Contacted" | "Closed") => void;
  deleteBuyerLead: (id: string) => void;
  deleteSellerLead: (id: string) => void;
  // Auth
  login: (password: string) => boolean;
  logout: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cmsConfig, setCmsConfigState] = useState<CMSConfig>(initialCMSConfig);
  const [properties, setPropertiesState] = useState<Property[]>(initialProperties);
  const [reviews, setReviewsState] = useState<Review[]>(initialReviews);
  const [gallery, setGalleryState] = useState<GalleryItem[]>(initialGallery);
  const [buyerLeads, setBuyerLeadsState] = useState<BuyerLead[]>([]);
  const [sellerLeads, setSellerLeadsState] = useState<SellerLead[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load state from localStorage on mount
  useEffect(() => {
    const storedConfig = localStorage.getItem("aaradhana_cms_config");
    if (storedConfig) {
      try { setCmsConfigState(JSON.parse(storedConfig)); } catch (e) { console.error(e); }
    }

    const storedProperties = localStorage.getItem("aaradhana_properties");
    if (storedProperties) {
      try { setPropertiesState(JSON.parse(storedProperties)); } catch (e) { console.error(e); }
    }

    const storedReviews = localStorage.getItem("aaradhana_reviews");
    if (storedReviews) {
      try { setReviewsState(JSON.parse(storedReviews)); } catch (e) { console.error(e); }
    }

    const storedGallery = localStorage.getItem("aaradhana_gallery");
    if (storedGallery) {
      try { setGalleryState(JSON.parse(storedGallery)); } catch (e) { console.error(e); }
    }

    const storedBuyerLeads = localStorage.getItem("aaradhana_buyer_leads");
    if (storedBuyerLeads) {
      try { setBuyerLeadsState(JSON.parse(storedBuyerLeads)); } catch (e) { console.error(e); }
    }

    const storedSellerLeads = localStorage.getItem("aaradhana_seller_leads");
    if (storedSellerLeads) {
      try { setSellerLeadsState(JSON.parse(storedSellerLeads)); } catch (e) { console.error(e); }
    }

    const storedAuth = localStorage.getItem("aaradhana_auth");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Sync helpers
  const updateCMSConfig = (config: CMSConfig) => {
    setCmsConfigState(config);
    localStorage.setItem("aaradhana_cms_config", JSON.stringify(config));
  };

  const addProperty = (property: Omit<Property, "id">) => {
    const newProperty = { ...property, id: `prop-${Date.now()}` };
    const updated = [newProperty, ...properties];
    setPropertiesState(updated);
    localStorage.setItem("aaradhana_properties", JSON.stringify(updated));
  };

  const updateProperty = (property: Property) => {
    const updated = properties.map((p) => (p.id === property.id ? property : p));
    setPropertiesState(updated);
    localStorage.setItem("aaradhana_properties", JSON.stringify(updated));
  };

  const deleteProperty = (id: string) => {
    const updated = properties.filter((p) => p.id !== id);
    setPropertiesState(updated);
    localStorage.setItem("aaradhana_properties", JSON.stringify(updated));
  };

  const addReview = (review: Omit<Review, "id" | "date">) => {
    const newReview = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split("T")[0]
    };
    const updated = [newReview, ...reviews];
    setReviewsState(updated);
    localStorage.setItem("aaradhana_reviews", JSON.stringify(updated));
  };

  const updateReview = (review: Review) => {
    const updated = reviews.map((r) => (r.id === review.id ? review : r));
    setReviewsState(updated);
    localStorage.setItem("aaradhana_reviews", JSON.stringify(updated));
  };

  const deleteReview = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviewsState(updated);
    localStorage.setItem("aaradhana_reviews", JSON.stringify(updated));
  };

  const addGalleryItem = (item: Omit<GalleryItem, "id">) => {
    const newItem = { ...item, id: `g-${Date.now()}` };
    const updated = [newItem, ...gallery];
    setGalleryState(updated);
    localStorage.setItem("aaradhana_gallery", JSON.stringify(updated));
  };

  const deleteGalleryItem = (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGalleryState(updated);
    localStorage.setItem("aaradhana_gallery", JSON.stringify(updated));
  };

  const submitBuyerLead = (lead: Omit<BuyerLead, "id" | "date" | "status">) => {
    const newLead: BuyerLead = {
      ...lead,
      id: `lead-b-${Date.now()}`,
      date: new Date().toLocaleString("en-IN"),
      status: "New"
    };
    const updated = [newLead, ...buyerLeads];
    setBuyerLeadsState(updated);
    localStorage.setItem("aaradhana_buyer_leads", JSON.stringify(updated));
  };

  const submitSellerLead = (lead: Omit<SellerLead, "id" | "date" | "status">) => {
    const newLead: SellerLead = {
      ...lead,
      id: `lead-s-${Date.now()}`,
      date: new Date().toLocaleString("en-IN"),
      status: "New"
    };
    const updated = [newLead, ...sellerLeads];
    setSellerLeadsState(updated);
    localStorage.setItem("aaradhana_seller_leads", JSON.stringify(updated));
  };

  const updateBuyerLeadStatus = (id: string, status: "New" | "Contacted" | "Closed") => {
    const updated = buyerLeads.map((l) => (l.id === id ? { ...l, status } : l));
    setBuyerLeadsState(updated);
    localStorage.setItem("aaradhana_buyer_leads", JSON.stringify(updated));
  };

  const updateSellerLeadStatus = (id: string, status: "New" | "Contacted" | "Closed") => {
    const updated = sellerLeads.map((l) => (l.id === id ? { ...l, status } : l));
    setSellerLeadsState(updated);
    localStorage.setItem("aaradhana_seller_leads", JSON.stringify(updated));
  };

  const deleteBuyerLead = (id: string) => {
    const updated = buyerLeads.filter((l) => l.id !== id);
    setBuyerLeadsState(updated);
    localStorage.setItem("aaradhana_buyer_leads", JSON.stringify(updated));
  };

  const deleteSellerLead = (id: string) => {
    const updated = sellerLeads.filter((l) => l.id !== id);
    setSellerLeadsState(updated);
    localStorage.setItem("aaradhana_seller_leads", JSON.stringify(updated));
  };

  const login = (password: string): boolean => {
    // Premium double protection simple logic: password is "aaradhana77" or standard "admin"
    if (password === "aaradhana77" || password === "admin" || password === "raipur") {
      setIsAuthenticated(true);
      localStorage.setItem("aaradhana_auth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("aaradhana_auth");
  };

  return (
    <CMSContext.Provider
      value={{
        cmsConfig,
        properties,
        reviews,
        gallery,
        buyerLeads,
        sellerLeads,
        isAuthenticated,
        updateCMSConfig,
        addProperty,
        updateProperty,
        deleteProperty,
        addReview,
        updateReview,
        deleteReview,
        addGalleryItem,
        deleteGalleryItem,
        submitBuyerLead,
        submitSellerLead,
        updateBuyerLeadStatus,
        updateSellerLeadStatus,
        deleteBuyerLead,
        deleteSellerLead,
        login,
        logout,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
};
