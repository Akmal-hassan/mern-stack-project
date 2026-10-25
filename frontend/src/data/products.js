export const INITIAL_PRODUCTS = [
  {
    id: "iphone-16-pro-max",
    name: "Apple iPhone 16 Pro Max",
    brand: "Apple",
    category: "iphone",
    price: 489000,
    originalPrice: 519000,
    rating: 4.9,
    reviewCount: 142,
    stock: 14,
    featured: true,
    isSale: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1695048133221-65e128148b3b?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=900&auto=format&fit=crop"
    ],
    storageOptions: ["256GB", "512GB", "1TB"],
    colors: [
      { name: "Desert Titanium", hex: "#C3B091" },
      { name: "Natural Titanium", hex: "#9A9895" },
      { name: "White Titanium", hex: "#F2F2F2" },
      { name: "Black Titanium", hex: "#2B2B2D" }
    ],
    description: "The crown jewel of mobile engineering. Featuring an expansive 6.9-inch Super Retina XDR OLED display with thinner borders, Apple Intelligence integration, Camera Control tactile button, 4K 120 fps Dolby Vision, and the class-leading A18 Pro silicon.",
    specifications: {
      "Display": "6.9-inch Super Retina XDR with ProMotion 120Hz & Always-On",
      "Chipset": "Apple A18 Pro (3nm) with 6-core GPU & 16-core Neural Engine",
      "Camera": "48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto periscope",
      "Battery": "Up to 33 hours video playback, MagSafe wireless fast charging",
      "Durability": "Grade 5 Titanium frame with next-gen Ceramic Shield",
      "Water Resistance": "IP68 water & dust resistance (up to 6m for 30 mins)"
    }
  },
  {
    id: "iphone-16-pro",
    name: "Apple iPhone 16 Pro",
    brand: "Apple",
    category: "iphone",
    price: 435000,
    originalPrice: 455000,
    rating: 4.8,
    reviewCount: 98,
    stock: 9,
    featured: true,
    isSale: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1695048133221-65e128148b3b?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1695048133221-65e128148b3b?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=900&auto=format&fit=crop"
    ],
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    colors: [
      { name: "Natural Titanium", hex: "#9A9895" },
      { name: "Desert Titanium", hex: "#C3B091" },
      { name: "White Titanium", hex: "#F2F2F2" },
      { name: "Black Titanium", hex: "#2B2B2D" }
    ],
    description: "Compact pro mastery in a 6.3-inch titanium frame. Powered by the A18 Pro chip, studio-quality four-mic array, revolutionary Camera Control sensor, and identical 5x optical telephoto zoom.",
    specifications: {
      "Display": "6.3-inch Super Retina XDR OLED with 120Hz ProMotion",
      "Chipset": "Apple A18 Pro processor",
      "Camera": "48MP Fusion main, 48MP Ultra Wide, 12MP 5x optical zoom",
      "Battery": "Up to 27 hours video playback",
      "Build": "Aerospace Grade 5 Titanium chassis",
      "Connectivity": "USB-C 3.0 up to 10Gbps, Wi-Fi 7, 5G"
    }
  },
  {
    id: "iphone-15",
    name: "Apple iPhone 15",
    brand: "Apple",
    category: "iphone",
    price: 269000,
    originalPrice: 289000,
    rating: 4.7,
    reviewCount: 185,
    stock: 22,
    featured: false,
    isSale: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=900&auto=format&fit=crop"
    ],
    storageOptions: ["128GB", "256GB"],
    colors: [
      { name: "Blue", hex: "#C4D8E2" },
      { name: "Pink", hex: "#EDD1D8" },
      { name: "Yellow", hex: "#F2E7B8" },
      { name: "Black", hex: "#35393D" }
    ],
    description: "Dynamic Island, 48MP Main camera with 2x Telephoto, universal USB-C charging, and durable color-infused matte glass back. Outstanding balance of value and performance.",
    specifications: {
      "Display": "6.1-inch Super Retina XDR OLED with Dynamic Island",
      "Chipset": "A16 Bionic 6-core processor",
      "Camera": "48MP Main sensor with sensor-shift OIS, 12MP Ultra-wide",
      "Port": "Universal USB-C port",
      "Battery": "Up to 20 hours video playback"
    }
  },
  {
    id: "samsung-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra 5G",
    brand: "Samsung",
    category: "samsung",
    price: 439000,
    originalPrice: 469000,
    rating: 4.9,
    reviewCount: 167,
    stock: 11,
    featured: true,
    isSale: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=900&auto=format&fit=crop"
    ],
    storageOptions: ["256GB", "512GB", "1TB"],
    colors: [
      { name: "Titanium Gray", hex: "#7E7E7E" },
      { name: "Titanium Black", hex: "#222222" },
      { name: "Titanium Violet", hex: "#5C5671" },
      { name: "Titanium Yellow", hex: "#E8DC9F" }
    ],
    description: "The ultimate Android powerhouse. Equipped with built-in S Pen, Corning Gorilla Armor anti-reflective glass, quad camera system with 200MP sensor, and groundbreaking Galaxy AI tools including Circle to Search and Live Translate.",
    specifications: {
      "Display": "6.8-inch Dynamic AMOLED 2X, 120Hz, 2600 nits peak, flat display",
      "Processor": "Qualcomm Snapdragon 8 Gen 3 for Galaxy (4nm)",
      "Camera": "200MP Main + 50MP 5x Optical + 10MP 3x Optical + 12MP Ultra Wide",
      "S Pen": "Embedded low-latency stylus with Bluetooth Air actions",
      "Battery": "5,000mAh with 45W Super Fast Charging",
      "Frame": "Robust Titanium armor with IP68 rating"
    }
  },
  {
    id: "samsung-galaxy-s24",
    name: "Samsung Galaxy S24 5G",
    brand: "Samsung",
    category: "samsung",
    price: 245000,
    originalPrice: 265000,
    rating: 4.7,
    reviewCount: 84,
    stock: 18,
    featured: false,
    isSale: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=900&auto=format&fit=crop"
    ],
    storageOptions: ["128GB", "256GB"],
    colors: [
      { name: "Onyx Black", hex: "#232323" },
      { name: "Marble Gray", hex: "#D6D6D6" },
      { name: "Cobalt Violet", hex: "#635878" },
      { name: "Amber Yellow", hex: "#F3DE97" }
    ],
    description: "A compact flagship marvel. Featuring symmetrical slim bezels around a radiant 6.2-inch FHD+ AMOLED screen, Galaxy AI smarts, 50MP camera with Nightography, and Armor Aluminum 2.0.",
    specifications: {
      "Display": "6.2-inch Dynamic AMOLED 2X, 1-120Hz variable refresh",
      "Processor": "Exynos 2400 / Snapdragon 8 Gen 3 flagship platform",
      "Camera": "50MP Wide with OIS, 12MP Ultra-wide, 10MP 3x Telephoto",
      "Battery": "4,000mAh battery with 25W fast charge & Fast Wireless",
      "Weight": "167 grams lightweight ergonomic design"
    }
  },
  {
    id: "samsung-galaxy-z-fold-6",
    name: "Samsung Galaxy Z Fold 6",
    brand: "Samsung",
    category: "samsung",
    price: 549000,
    originalPrice: 585000,
    rating: 4.9,
    reviewCount: 53,
    stock: 6,
    featured: true,
    isSale: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=900&auto=format&fit=crop"
    ],
    storageOptions: ["256GB", "512GB", "1TB"],
    colors: [
      { name: "Silver Shadow", hex: "#B8B9BB" },
      { name: "Navy", hex: "#1E2A44" },
      { name: "Pink", hex: "#F2D7D9" }
    ],
    description: "Foldable perfection reimagined. Thinner, lighter, with sharp symmetrical geometry, dual Dynamic AMOLED displays, S Pen foldable support, and split-screen productivity with Galaxy AI assistant.",
    specifications: {
      "Main Display": "7.6-inch Foldable Dynamic AMOLED 2X, 120Hz, 2600 nits",
      "Cover Screen": "6.3-inch Dynamic AMOLED 2X outer screen",
      "Processor": "Snapdragon 8 Gen 3 for Galaxy",
      "Hinge": "Dual Rail Flex Hinge with enhanced dust resistance (IP48)",
      "Battery": "4,400mAh dual-cell battery system"
    }
  },
  {
    id: "samsung-galaxy-a55",
    name: "Samsung Galaxy A55 5G",
    brand: "Samsung",
    category: "samsung",
    price: 139000,
    originalPrice: 149000,
    rating: 4.6,
    reviewCount: 112,
    stock: 25,
    featured: false,
    isSale: false,
    isNew: false,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=900&auto=format&fit=crop"
    ],
    storageOptions: ["128GB", "256GB"],
    colors: [
      { name: "Awesome Iceblue", hex: "#B7D8EC" },
      { name: "Awesome Navy", hex: "#22314E" },
      { name: "Awesome Lilac", hex: "#D6C7E8" },
      { name: "Awesome Lemon", hex: "#E9EDA8" }
    ],
    description: "Premium metal frame, Gorilla Glass Victus+ back, 50MP optical stabilization camera, 5000mAh two-day battery, and 4 generations of Android OS upgrades. Premium quality at an accessible price point.",
    specifications: {
      "Display": "6.6-inch Super AMOLED FHD+ 120Hz with Vision Booster",
      "Processor": "Exynos 1480 with AMD Xclipse 530 GPU",
      "Camera": "50MP Main OIS + 12MP Ultra-wide + 5MP Macro",
      "Battery": "5,000mAh with 25W fast charging",
      "Protection": "IP67 dust and water resistance rating"
    }
  },
  {
    id: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2 Titanium",
    brand: "Apple",
    category: "apple-watch",
    price: 259000,
    originalPrice: 279000,
    rating: 4.9,
    reviewCount: 78,
    stock: 8,
    featured: true,
    isSale: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=900&auto=format&fit=crop"
    ],
    storageOptions: ["64GB"],
    colors: [
      { name: "Natural Titanium", hex: "#A8A7A2" },
      { name: "Black Titanium", hex: "#272727" }
    ],
    description: "The most rugged and capable Apple Watch ever. Crafted from corrosion-resistant aerospace titanium with a 3,000-nit Always-On display, precision dual-frequency GPS, customizable Action button, and 36-hour battery life.",
    specifications: {
      "Case": "49mm Grade 5 Titanium casing with raised bezel",
      "Screen": "Sapphire crystal front, up to 3,000 nits brightness",
      "Chipset": "S9 SiP with 64-bit dual-core and 4-core Neural Engine",
      "Battery": "Up to 36 hours regular use / 72 hours low power mode",
      "Diving": "EN13319 certified dive computer capability down to 40m"
    }
  },
  {
    id: "apple-watch-series-10",
    name: "Apple Watch Series 10",
    brand: "Apple",
    category: "apple-watch",
    price: 149000,
    originalPrice: 159000,
    rating: 4.8,
    reviewCount: 91,
    stock: 15,
    featured: true,
    isSale: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=900&auto=format&fit=crop"
    ],
    storageOptions: ["64GB"],
    colors: [
      { name: "Jet Black", hex: "#111111" },
      { name: "Rose Gold", hex: "#E8D0C9" },
      { name: "Silver", hex: "#E4E4E6" }
    ],
    description: "The milestone 10th edition. Apple's thinnest smartwatch with its largest active display area yet. Fast charges to 80% in just 30 minutes, with integrated sleep apnea detection and depth sensor.",
    specifications: {
      "Case Thickness": "Ultra-slim 9.7mm aluminum chassis",
      "Display": "Wide-angle OLED Always-On Retina display",
      "Processor": "S10 SiP processor",
      "Sensors": "Depth gauge, water temperature, ECG, SpO2 sensor",
      "Charging": "Fast magnetic charger (0-80% in 30 mins)"
    }
  },
  {
    id: "airpods-pro-2",
    name: "Apple AirPods Pro (2nd Gen, USB-C)",
    brand: "Apple",
    category: "audio",
    price: 74900,
    originalPrice: 84900,
    rating: 4.9,
    reviewCount: 220,
    stock: 30,
    featured: true,
    isSale: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=900&auto=format&fit=crop"
    ],
    storageOptions: ["Standard"],
    colors: [
      { name: "White", hex: "#FFFFFF" }
    ],
    description: "Up to 2x more Active Noise Cancellation, Adaptive Audio that tailors sound control to your surroundings, Conversation Awareness, and MagSafe Charging Case with speaker and lanyard loop.",
    specifications: {
      "Chip": "Apple H2 headphone chip + Apple U1 in charging case",
      "Audio Technology": "Adaptive Audio, Active Noise Cancellation, Transparency mode",
      "Battery": "Up to 6 hours listening with ANC, 30 hours total with case",
      "Charging": "USB-C, MagSafe, Apple Watch charger compatible",
      "Resistance": "IP54 dust, sweat, and water resistance"
    }
  },
  {
    id: "samsung-galaxy-buds-3-pro",
    name: "Samsung Galaxy Buds 3 Pro",
    brand: "Samsung",
    category: "audio",
    price: 68900,
    originalPrice: 76900,
    rating: 4.8,
    reviewCount: 65,
    stock: 20,
    featured: false,
    isSale: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=900&auto=format&fit=crop"
    ],
    storageOptions: ["Standard"],
    colors: [
      { name: "Silver", hex: "#C7C9CC" },
      { name: "White", hex: "#F7F7F7" }
    ],
    description: "Blade design with glowing Blade Lights, Hi-Fi 24-bit 96kHz sound, dual amplifiers, and Galaxy AI-powered adaptive noise cancelling and voice interpretation.",
    specifications: {
      "Audio": "24-bit / 96kHz Hi-Fi codec, Dual dynamic drivers",
      "Noise Control": "Adaptive ANC, Ambient sound, Voice Detect",
      "Lights": "Integrated Blade Lights with gesture glow",
      "Battery": "Up to 7 hours playback (30 hours with case)"
    }
  },
  {
    id: "apple-magsafe-silicone-case",
    name: "Apple iPhone MagSafe Silicone Case",
    brand: "Apple",
    category: "accessories",
    price: 18500,
    originalPrice: 22000,
    rating: 4.7,
    reviewCount: 88,
    stock: 45,
    featured: false,
    isSale: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=900&auto=format&fit=crop"
    ],
    storageOptions: ["iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 15"],
    colors: [
      { name: "Midnight", hex: "#1C2430" },
      { name: "Denim Blue", hex: "#3B5998" },
      { name: "Plum", hex: "#5C2438" },
      { name: "Starfruit Yellow", hex: "#F9D71C" }
    ],
    description: "Silky, soft-touch exterior that feels great in your hand. Microfiber lining cushions your iPhone. Built-in magnets align perfectly for faster wireless charging and snappy MagSafe attachment.",
    specifications: {
      "Material": "Liquid silicone rubber with microfiber interior",
      "Compatibility": "Built-in neodymium MagSafe magnetic ring",
      "Protection": "Raised bezels for camera lens and display shield"
    }
  },
  {
    id: "samsung-45w-super-fast-charger",
    name: "Samsung 45W Super Fast Power Adapter",
    brand: "Samsung",
    category: "accessories",
    price: 12500,
    originalPrice: 14500,
    rating: 4.9,
    reviewCount: 140,
    stock: 60,
    featured: false,
    isSale: false,
    isNew: false,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=900&auto=format&fit=crop"
    ],
    storageOptions: ["45W (Includes 1.8m 5A Type-C Cable)"],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "White", hex: "#FAFAFA" }
    ],
    description: "Power up your Galaxy S24 Ultra and compatible devices at breakneck speeds. Power Delivery 3.0 and PPS protocol support ensures optimal, temperature-regulated charging.",
    specifications: {
      "Power": "45W Super Fast Charging 2.0 (USB-PD 3.0 PPS)",
      "Port": "Single USB Type-C high power output",
      "Safety": "Over-current, temperature, and short-circuit protection"
    }
  },
  {
    id: "magnetic-3in1-wireless-station",
    name: "BlueBells Pro 3-in-1 Magnetic Wireless Station",
    brand: "Apple",
    category: "accessories",
    price: 24900,
    originalPrice: 29900,
    rating: 4.8,
    reviewCount: 94,
    stock: 35,
    featured: true,
    isSale: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1622445262464-84b1456045b6?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1622445262464-84b1456045b6?q=80&w=900&auto=format&fit=crop"
    ],
    storageOptions: ["Standard Stand"],
    colors: [
      { name: "Matte Black", hex: "#1E1E1E" },
      { name: "Alpine White", hex: "#FFFFFF" }
    ],
    description: "Charge your iPhone, Apple Watch / Galaxy Watch, and wireless earbuds concurrently with a single cable. Premium aluminum stem, weighted base, and LED ambient charge status ring.",
    specifications: {
      "Total Output": "25W max simultaneous wireless output",
      "Materials": "CNC Machined Aluminum + anti-scratch silicone base",
      "MagSafe": "Fast 15W Qi2 / MagSafe phone stand orientation"
    }
  }
];
