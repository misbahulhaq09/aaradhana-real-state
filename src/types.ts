export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  area: string;
  propertyType: "Residential" | "Commercial" | "Luxury" | "Villa" | "Apartment" | "Land" | "Industrial";
  image: string;
  beds?: number;
  baths?: number;
  featured: boolean;
  tag?: string;
  description?: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  text: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  category: "Residential" | "Commercial" | "Luxury Homes" | "Construction Projects" | "Site Visits" | "Office Photos";
  caption: string;
}

export interface BuyerLead {
  id: string;
  name: string;
  mobile: string;
  propertyType: string;
  location: string;
  budget: string;
  message: string;
  date: string;
  status: "New" | "Contacted" | "Closed";
}

export interface SellerLead {
  id: string;
  name: string;
  mobile: string;
  locationLink: string;
  propertyType: string;
  size: string;
  frontage: string;
  depth: string;
  expectedPrice: string;
  message: string;
  date: string;
  status: "New" | "Contacted" | "Closed";
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  address: string;
  hours: string;
  mapEmbedUrl: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
}

export interface SeoSettings {
  title: string;
  description: string;
  keywords: string;
}

export interface HomePageContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutSubtitle: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  statProperties: string;
  statClients: string;
  statDeals: string;
  statRating: string;
}

export interface CMSConfig {
  companyName: string;
  logoText: string;
  logoUrl: string;
  loadingLogo: string;
  loadingSubtitle: string;
  loadingTagline: string;
  contact: ContactInfo;
  socials: SocialLinks;
  seo: SeoSettings;
  homepage: HomePageContent;
}
