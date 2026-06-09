/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { CMSProvider, useCMS } from "./context/CMSContext";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Trust } from "./components/Trust";
import { AboutUs } from "./components/AboutUs";
import { Services } from "./components/Services";
import { FeaturedProperties } from "./components/FeaturedProperties";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { Forms } from "./components/Forms";
import { Reviews } from "./components/Reviews";
import { Gallery } from "./components/Gallery";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { FloatingActions } from "./components/FloatingActions";
import { AdminDashboard } from "./components/AdminDashboard";

function MainAppContent() {
  const { cmsConfig } = useCMS();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminView, setIsAdminView] = useState(false);
  
  // Property Enquiry Prefills
  const [prefillProp, setPrefillProp] = useState("");
  const [prefillType, setPrefillType] = useState("");

  // Sync document page title & description with SEO settings dynamically
  useEffect(() => {
    if (cmsConfig?.seo) {
      document.title = cmsConfig.seo.title || "Aaradhana Realty And RealProperties Pvt. Ltd.";
      
      // Update or construct Meta Description Tag
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", cmsConfig.seo.description);

      // Update or construct Meta Keywords Tag
      let metaKey = document.querySelector('meta[name="keywords"]');
      if (!metaKey) {
        metaKey = document.createElement("meta");
        metaKey.setAttribute("name", "keywords");
        document.head.appendChild(metaKey);
      }
      metaKey.setAttribute("content", cmsConfig.seo.keywords);
    }
  }, [cmsConfig]);

  const handlePreFillAndScroll = (propertyName: string, propertyType: string) => {
    setPrefillProp(propertyName);
    setPrefillType(propertyType);
    
    // Smooth scroll down to forms coordinates
    setTimeout(() => {
      const el = document.getElementById("contact-forms");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleNavigateToSection = (sectionId: string) => {
    setIsAdminView(false);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  const handleAdminToggle = () => {
    setIsAdminView(!isAdminView);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <LoadingScreen
        onComplete={() => setIsLoading(false)}
        cmsConfig={cmsConfig}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#050f1b] flex flex-col items-stretch relative">
      
      <Navbar
        onAdminToggle={handleAdminToggle}
        isAdminView={isAdminView}
        onNavigateToSection={handleNavigateToSection}
      />

      {isAdminView ? (
        /* Admin CMS Config Views */
        <main className="flex-grow">
          <AdminDashboard />
        </main>
      ) : (
        /* Front customer web sections */
        <main className="flex flex-col items-stretch">
          <Hero onExploreClick={() => handleNavigateToSection("properties")} />
          <Trust />
          <AboutUs />
          <Services />
          <FeaturedProperties onPreFillInquiry={handlePreFillAndScroll} />
          <WhyChooseUs />
          
          <Forms
            prefilledProperty={prefillProp}
            prefilledType={prefillType}
            clearPrefills={() => {
              setPrefillProp("");
              setPrefillType("");
            }}
          />
          
          <Reviews />
          <Gallery />
          <Contact />
        </main>
      )}

      <Footer />
      
      <FloatingActions />

    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <MainAppContent />
    </CMSProvider>
  );
}
