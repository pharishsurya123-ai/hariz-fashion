export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: 'shirts' | 't-shirts' | 'jeans' | 'shoes' | 'accessories';
  gender: 'men' | 'women' | 'unisex';
  images: string[]; // Image gallery
  description: string;
  details: string[];
  sizes: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface ShippingDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
}

export type ActiveView = 
  | 'home' 
  | 'shop' 
  | 'men' 
  | 'women' 
  | 'product-details' 
  | 'cart' 
  | 'checkout' 
  | 'about' 
  | 'contact' 
  | 'faq' 
  | 'shipping-policy' 
  | 'privacy-policy';
