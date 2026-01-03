export interface Product {
  id: string;
  name: string;
  description: string;
  material: "Dolomite" | "Fiber" | "Concrete";
  sizes: { label: string; price: number }[];
  finishes: string[];
  deliveryTime: string;
  images: string[];
  category: "buddha-statues" | "custom-sculptures" | "decorative";
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "dolomite-meditation-buddha",
    name: "Meditation Buddha Statue",
    description: "A serene Buddha in meditation pose, handcrafted from premium Sri Lankan dolomite stone. Perfect for temples, meditation spaces, and garden sanctuaries.",
    material: "Dolomite",
    sizes: [
      { label: "2 ft", price: 45000 },
      { label: "3 ft", price: 85000 },
      { label: "4 ft", price: 135000 },
      { label: "5 ft", price: 195000 },
    ],
    finishes: ["Natural White", "Polished", "Antique"],
    deliveryTime: "2-4 weeks",
    images: ["/products/dolomite-buddha-1.jpg"],
    category: "buddha-statues",
    featured: true,
  },
  {
    id: "fiber-buddha-head",
    name: "Buddha Head Sculpture",
    description: "An artistic terracotta-colored Buddha head, crafted from durable fiber material. Ideal for indoor and outdoor display with minimal maintenance.",
    material: "Fiber",
    sizes: [
      { label: "1 ft", price: 15000 },
      { label: "1.5 ft", price: 25000 },
      { label: "2 ft", price: 38000 },
    ],
    finishes: ["Terracotta", "Bronze", "Gold Leaf"],
    deliveryTime: "1-2 weeks",
    images: ["/products/fiber-buddha-1.jpg"],
    category: "buddha-statues",
    featured: true,
  },
  {
    id: "concrete-garden-buddha",
    name: "Garden Buddha Statue",
    description: "A majestic seated Buddha designed for outdoor spaces. Made from weather-resistant concrete with intricate detailing that withstands the elements.",
    material: "Concrete",
    sizes: [
      { label: "3 ft", price: 55000 },
      { label: "4 ft", price: 95000 },
      { label: "5 ft", price: 145000 },
      { label: "6 ft", price: 215000 },
    ],
    finishes: ["Natural Grey", "Moss Green", "Weathered Stone"],
    deliveryTime: "3-5 weeks",
    images: ["/products/concrete-buddha-1.jpg"],
    category: "buddha-statues",
    featured: true,
  },
  {
    id: "standing-blessing-buddha",
    name: "Standing Blessing Buddha",
    description: "An elegant standing Buddha with hands in blessing mudra. Crafted from pure white dolomite, radiating peace and compassion.",
    material: "Dolomite",
    sizes: [
      { label: "3 ft", price: 95000 },
      { label: "4 ft", price: 145000 },
      { label: "5 ft", price: 210000 },
    ],
    finishes: ["Natural White", "Cream", "Gilded"],
    deliveryTime: "3-4 weeks",
    images: ["/products/standing-buddha-1.jpg"],
    category: "buddha-statues",
    featured: true,
  },
  {
    id: "artistic-buddha-face",
    name: "Artistic Buddha Face",
    description: "A dramatic Buddha face sculpture with museum-quality finish. Perfect as a statement piece for luxury interiors and hotel lobbies.",
    material: "Fiber",
    sizes: [
      { label: "1.5 ft", price: 28000 },
      { label: "2 ft", price: 42000 },
      { label: "3 ft", price: 68000 },
    ],
    finishes: ["Bronze Patina", "Antique Stone", "Dark Wood"],
    deliveryTime: "2-3 weeks",
    images: ["/products/buddha-face-1.jpg"],
    category: "decorative",
    featured: true,
  },
  {
    id: "temple-buddha-large",
    name: "Temple Grade Buddha",
    description: "A magnificent large-scale Buddha statue designed specifically for temples and religious institutions. Made with traditional craftsmanship and sacred proportions.",
    material: "Concrete",
    sizes: [
      { label: "6 ft", price: 285000 },
      { label: "8 ft", price: 425000 },
      { label: "10 ft", price: 650000 },
    ],
    finishes: ["Sacred White", "Golden", "Temple Grey"],
    deliveryTime: "6-8 weeks",
    images: ["/products/concrete-buddha-1.jpg"],
    category: "buddha-statues",
  },
];

export const materials = ["Dolomite", "Fiber", "Concrete"] as const;
export const categories = [
  { id: "buddha-statues", name: "Buddha Statues" },
  { id: "custom-sculptures", name: "Custom Sculptures" },
  { id: "decorative", name: "Decorative Art" },
] as const;

export const testimonials = [
  {
    id: 1,
    name: "Ven. Rathanasara Thero",
    role: "Chief Monk, Colombo Buddhist Temple",
    content: "Samudra Art Center created a magnificent 8ft Buddha statue for our temple. The craftsmanship is exceptional, and the sacred proportions are perfectly maintained. Truly blessed work.",
    rating: 5,
  },
  {
    id: 2,
    name: "Chaminda Perera",
    role: "Homeowner, Kandy",
    content: "The dolomite Buddha in my garden has transformed the entire space. Three years later, it still looks as beautiful as day one. Highly recommend their work.",
    rating: 5,
  },
  {
    id: 3,
    name: "Anura Silva",
    role: "General Manager, Heritance Hotels",
    content: "We commissioned custom sculptures for our resort, and the result exceeded our expectations. Professional service, timely delivery, and premium quality.",
    rating: 5,
  },
];
