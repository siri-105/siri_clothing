export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  ratingCount: string;
  image: string;
  images: string[];
  tag?: string;
  tagType?: 'trending' | 'low_stock' | 'fast_delivery';
  colors: { name: string; hex: string; previewImage?: string }[];
  sizes: { size: string; stock: number; available: boolean }[];
  fabric: string;
  weaveType: string;
  ornamentation: string;
  washCare: string;
  description: string;
  isBestseller?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  size: string;
  quantity: number;
  selectedColor: string;
}

export interface Address {
  id: string;
  name: string;
  pincode: string;
  addressLine: string;
  city: string;
  state: string;
  phone: string;
  isDefault: boolean;
}

export interface Coupon {
  code: string;
  discountAmount: number;
  minSpend: number;
  description: string;
}

export type ScreenType = 'home' | 'catalog' | 'pdp' | 'cart' | 'wishlist' | 'studio' | 'profile';
