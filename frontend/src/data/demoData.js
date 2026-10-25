/**
 * Default storefront coupons, settings, and frequently asked questions.
 */

export const INITIAL_COUPONS = [
  {
    id: "coup-1",
    code: "BLUEBELLS10",
    discountType: "percentage",
    value: 10,
    minSpend: 50000,
    status: "active",
    description: "10% off on flagship smartphones and accessories above Rs. 50,000",
    expiresAt: "2026-12-31"
  },
  {
    id: "coup-2",
    code: "GALAXY5000",
    discountType: "fixed",
    value: 5000,
    minSpend: 100000,
    status: "active",
    description: "Flat Rs. 5,000 instant reduction on purchases over Rs. 100,000",
    expiresAt: "2026-11-30"
  },
  {
    id: "coup-3",
    code: "FREESHIP",
    discountType: "fixed",
    value: 1500,
    minSpend: 10000,
    status: "active",
    description: "Free express shipping coupon for orders above Rs. 10,000",
    expiresAt: "2026-12-31"
  }
];

export const INITIAL_SETTINGS = {
  storeName: "Blue Bells Electronics",
  tagline: "Certified & Official Member of Official iPhone Shop",
  currency: "PKR",
  currencySymbol: "Rs.",
  standardShippingFee: 1500,
  freeShippingThreshold: 50000,
  supportEmail: "nomanjvd9@gmail.com",
  supportPhone: "03005902425",
  whatsappNumber: "03005902425",
  storeAddress: "Blue Bells Electronics, Shop # 33, Sattagadai Plaza, 32 The Mall, Peshawar Cantt.",
  city: "Peshawar",
  announcementText: "⭐ Certified & Official Member of Official iPhone Shop | Blue Bells Electronics, Peshawar Cantt. | WhatsApp: 03005902425",
  announcementActive: true,
  isCertifiedIPhoneShop: true,
  certificationText: "Certified & Official Member of Official iPhone Shop"
};

export const STORE_FAQS = [
  {
    q: "Are all phones and accessories 100% genuine and authentic?",
    a: "Absolutely. BlueBells guarantees 100% genuine products directly sourced through authorized distribution channels. Every Apple and Samsung device arrives in factory-sealed boxes with official regional warranties and verifiable IMEI/serial numbers."
  },
  {
    q: "What warranty comes with devices purchased from BlueBells?",
    a: "All Apple devices carry 1-Year Official International & Local Apple Warranty. All Samsung devices carry Official Brand Warranty with PTA approval compliance."
  },
  {
    q: "What is your nationwide shipping timeframe?",
    a: "Orders in Lahore, Karachi, and Islamabad are delivered within 24 to 48 business hours. Deliveries to other cities across Pakistan take 2 to 4 working days via insured courier services (TCS / Leopards)."
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash on Delivery (COD) is available across Pakistan. Payment is collected when your order is delivered."
  },
  {
    q: "What is the return and replacement policy?",
    a: "We offer a 7-day hassle-free replacement policy for factory-sealed unopened products or any out-of-box verified technical defects."
  }
];
