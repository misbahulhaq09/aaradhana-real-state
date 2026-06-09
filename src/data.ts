import { Property, Review, GalleryItem, CMSConfig } from "./types";

export const initialProperties: Property[] = [
  {
    id: "prop-1",
    title: "Aaradhana Grandeur Mansion",
    location: "VIP Road, Near Airport Road, Raipur",
    price: "₹4.50 Crore",
    area: "6,500 Sq.Ft.",
    propertyType: "Villa",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    beds: 5,
    baths: 6,
    featured: true,
    tag: "Ultra Luxury",
    description: "An architecturally stunning signature villa offering bespoke Italian marble layouts, zero-edge infinity pool, formal banquet lounge, and complete smart home integration. Located in Raipur's most elite address."
  },
  {
    id: "prop-2",
    title: "The Progressive Heights Office Suite",
    location: "Lalpur, Progressive Point, Raipur",
    price: "₹1.75 Crore",
    area: "2,200 Sq.Ft.",
    propertyType: "Commercial",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tag: "Prime Location",
    description: "Premium state-of-the-art office spaces beside Fruit Market with central climate controls, multi-level dedicated parking, and scenic views of Lalpur's central business zone. Ideal for high-profile corporations."
  },
  {
    id: "prop-3",
    title: "Royal Palms Elite Duplex",
    location: "Shankar Nagar, Raipur",
    price: "₹2.20 Crore",
    area: "3,800 Sq.Ft.",
    propertyType: "Luxury",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    beds: 4,
    baths: 4,
    featured: true,
    tag: "Hot Deal",
    description: "A gorgeous 4 BHK duplex featuring expansive private terrace lawns, customized gourmet kitchen, high-security double-door entry system, and direct connectivity to Raipur's best elite schools and clubs."
  },
  {
    id: "prop-4",
    title: "Greenfield Investment Acres",
    location: "Sector 24, Naya Raipur",
    price: "₹75 Lakh",
    area: "10,000 Sq.Ft.",
    propertyType: "Land",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    featured: false,
    tag: "Investment High-Yield",
    description: "Clear-title, investment-grade boundary walled plot facing the wide trunk avenues of smart city Naya Raipur. Exceptionally positioned for residential township development or long-term high valuation hold."
  },
  {
    id: "prop-5",
    title: "Aaradhana Premium Apex Penthouse",
    location: "Saddu, Near Ambuja Mall, Raipur",
    price: "₹1.85 Crore",
    area: "4,100 Sq.Ft.",
    propertyType: "Apartment",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    beds: 4,
    baths: 5,
    featured: true,
    tag: "Exclusive",
    description: "An elegant rooftop retreat overlooking local landmarks, designed with custom dynamic modular interiors, separate servant chambers, private elevator login access, and continuous energy backups."
  },
  {
    id: "prop-6",
    title: "Industrial Logistics Hub",
    location: "Siltara Industrial Area, Raipur",
    price: "By Quotation",
    area: "45,000 Sq.Ft.",
    propertyType: "Industrial",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    featured: false,
    tag: "Heavy Logistics",
    description: "Pre-engineered structural facility with overhead gantry cranes, high floor load capacities, dedicated 11KV power feeds, and high truck clearance gates, built by Aaradhana Builders."
  }
];

export const initialReviews: Review[] = [
  {
    id: "rev-1",
    author: "Dr. Alok Agrawal",
    role: "Senior Consultant Cardiologist",
    rating: 5,
    text: "Excellent service and professional guidance. aaradhana Realty handled our villa purchase in Shankar Nagar with absolute transparency and premium coordination.",
    date: "2026-04-10"
  },
  {
    id: "rev-2",
    author: "Sanjay Shrivastava",
    role: "Industrialist",
    rating: 5,
    text: "Smooth property buying experience. Their construction standards are unmatched in Raipur. Highly recommend them for high-value residential developments.",
    date: "2026-05-02"
  },
  {
    id: "rev-3",
    author: "Meghna Baghel",
    role: "Tech Entrepreneur",
    rating: 5,
    text: "Very supportive team from start to finish. They assisted step-by-step with Chhattisgarh documentation and legal registrations, saving us immense hours.",
    date: "2026-05-18"
  },
  {
    id: "rev-4",
    author: "Rakesh Dewangan",
    role: "Investor",
    rating: 5,
    text: "Best real estate consultation in Raipur. They recommended high-growth land sectors in Naya Raipur, which have already scaled 30% in yield. Solid team.",
    date: "2026-05-29"
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: "g-1",
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    category: "Luxury Homes",
    caption: "Aaradhana Grandeur Front elevation, VIP Road Raipur."
  },
  {
    id: "g-2",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    category: "Commercial",
    caption: "Sleek glass architecture at Lalpur Commercial Hub."
  },
  {
    id: "g-3",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
    category: "Construction Projects",
    caption: "Structural casting of our flagship township project in Raipur."
  },
  {
    id: "g-4",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    category: "Site Visits",
    caption: "Our advisory experts accompanying clients on Shankar Nagar site audits."
  },
  {
    id: "g-5",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    category: "Office Photos",
    caption: "Aaradhana corporate discussion lounge & consultation lobby."
  },
  {
    id: "g-6",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    category: "Residential",
    caption: "Finished premium modular kitchen layouts of Aaradhana Imperial Villas."
  }
];

export const initialCMSConfig: CMSConfig = {
  companyName: "AARADHANA REALTY AND REALPROPERTIES PVT. LTD.",
  logoText: "Aaradhana Realty",
  logoUrl: "",
  loadingLogo: "🏛️",
  loadingSubtitle: "Building Dreams. Creating Value.",
  loadingTagline: "Trusted Real Estate Experts In Raipur",
  contact: {
    phone: "+91 91588 77448",
    whatsapp: "+91 91588 77448",
    address: "220, 2nd Floor, Besides Fruit Market, Progressive Point, Rishabh Nagar & Pawan Vihar Colony, Lalpur, Raipur, Tikrapara, Chhattisgarh 492015",
    hours: "Open Until 7 PM (Mon - Sat)",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.141973007559!2d81.65063!3d21.22627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dd29a1b55555%3A0xe543e06ef1ad8ebf!2sProgressive%20Point%20Raipur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  },
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com"
  },
  seo: {
    title: "Aaradhana Realty | Best Real Estate Builders & Construction Raipur",
    description: "Aaradhana Realty And RealProperties Pvt. Ltd. represents Raipur's premier real estate consultancy, trusted building constructors, and high-growth land advisor.",
    keywords: "Real Estate Company Raipur, Property Dealer Raipur, Buy Property Raipur, Sell Property Raipur, Construction Company Raipur, Real Estate Consultant Raipur, Investment Property Raipur"
  },
  homepage: {
    heroTitle: "Your Trusted Real Estate Partner In Raipur",
    heroSubtitle: "Buy, Sell, Invest and Build with Confidence. Premium Residential, Commercial and Investment Opportunities Across Raipur.",
    aboutTitle: "Aaradhana Realty And RealProperties Pvt. Ltd.",
    aboutSubtitle: "Leader in Construction, Builders & High-Trust Property Advisory",
    aboutParagraph1: "Empowered by a gold double-decade standard in Raipur's competitive commercial and luxury segments, we build landmark residences and advise smart investments. Operating out of our corporate office in Progressive Point, Lalpur, we prioritize absolute legal transparency and dynamic building standards.",
    aboutParagraph2: "Whether you represent a family seeking an ultimate smart villa in VIP Road, or a conglomerate seeking premier retail warehouses, our structural teams and Chhattisgarh registration consultants manage your lifecycle from blueprinted conceptualization to final keys.",
    statProperties: "500+",
    statClients: "300+",
    statDeals: "100+",
    statRating: "5.0 ★"
  }
};
