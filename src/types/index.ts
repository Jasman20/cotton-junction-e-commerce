export type ProductCategory = "Men" | "Women" | "Kids";

export type ProductOccasion = "Everyday" | "Festive/Diwali" | "Wedding" | "Casual";

export type GarmentType = 
  | "kurta" 
  | "shirt" 
  | "saree" 
  | "anarkali" 
  | "frock" 
  | "dhoti-kurta" 
  | "lehenga";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  garmentType: GarmentType;
  fabric: "pure cotton" | "premium fabrics" | "cotton blend";
  occasion: ProductOccasion[];
  colours: string[];
  sizes: string[];
  ageGroup?: string; // For kids: "2-4Y", "5-7Y", "8-11Y", "12-15Y"
  price: number; // in INR
  originalPrice?: number;
  stock: number;
  isSurplusBranded?: boolean; // Branded surplus stock
  image: string; // URL in /stock/ or /products/ or fallback
  careNotes?: string;
  description?: string;
  isSample?: boolean;
}

export interface BasketItem {
  product: Product;
  selectedSize: string;
  selectedColour: string;
  quantity: number;
}

export type OrderStatus = 
  | "New" 
  | "Confirmed" 
  | "Ready for Trial" 
  | "Visited" 
  | "Purchased" 
  | "Cancelled";

export interface StoreReservation {
  id: string;
  customerName: string;
  customerPhone: string;
  orderType: "pickup" | "delivery";
  visitDate?: string;
  visitSlot?: string; // e.g. "5:00 PM - 7:00 PM"
  items: BasketItem[];
  totalAmount: number;
  notes?: string;
  status: OrderStatus;
  createdAt: string;
}

export interface FamilyMember {
  id: string;
  role: "father" | "mother" | "son" | "daughter";
  name: string;
  gender: "man" | "woman" | "boy" | "girl";
  age?: number;
  size: string;
  birthMonth?: string;
}

export interface FamilyAccount {
  phone: string;
  headName: string;
  members: FamilyMember[];
  pointsBalance: number;
  joinedDate: string;
  language: "en" | "hi";
  consentGiven: boolean;
}
