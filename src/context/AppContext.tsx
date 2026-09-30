import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Address, Coupon, ScreenType } from '../types';
import { ALL_PRODUCTS, INITIAL_ADDRESSES, AVAILABLE_COUPONS } from '../data/mockData';

interface AppContextType {
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  selectedProduct: Product;
  setSelectedProduct: (product: Product) => void;
  cartItems: CartItem[];
  addToCart: (product: Product, size: string, color?: string, qty?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartItemQty: (cartItemId: string, qty: number) => void;
  updateCartItemSize: (cartItemId: string, size: string) => void;
  moveCartItemToWishlist: (cartItemId: string) => void;
  wishlistIds: string[];
  toggleWishlist: (productId: string) => boolean;
  isInWishlist: (productId: string) => boolean;
  addresses: Address[];
  selectedAddress: Address;
  setSelectedAddress: (address: Address) => void;
  addAddress: (address: Address) => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  orders: {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
    address: Address;
  }[];
  placeOrder: () => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(ALL_PRODUCTS[0]);
  
  // Initial cart matching screenshot
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      productId: ALL_PRODUCTS[0].id,
      product: ALL_PRODUCTS[0],
      size: 'M',
      quantity: 1,
      selectedColor: 'Magenta Pink',
    },
    {
      id: 'cart-2',
      productId: ALL_PRODUCTS[1].id,
      product: ALL_PRODUCTS[1],
      size: 'S',
      quantity: 1,
      selectedColor: 'Soft Peach',
    },
  ]);

  // Initial wishlist items (count = 4 matching badge)
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    ALL_PRODUCTS[0].id,
    ALL_PRODUCTS[2].id,
    ALL_PRODUCTS[4].id,
    ALL_PRODUCTS[6].id,
  ]);

  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState<Address>(INITIAL_ADDRESSES[0]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(AVAILABLE_COUPONS[0]); // FESTIVE300
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  const addToCart = (product: Product, size: string, color?: string, qty = 1) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.productId === product.id && item.size === size
    );
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += qty;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: 'cart-' + Date.now(),
        productId: product.id,
        product,
        size,
        quantity: qty,
        selectedColor: color || product.colors[0]?.name || 'Standard',
      };
      setCartItems((prev) => [...prev, newItem]);
    }
    showToast(`Added ${product.name} (Size ${size}) to Bag!`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from shopping bag');
  };

  const updateCartItemQty = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: qty } : item))
    );
  };

  const updateCartItemSize = (cartItemId: string, size: string) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, size } : item))
    );
    showToast(`Size updated to ${size}`);
  };

  const moveCartItemToWishlist = (cartItemId: string) => {
    const item = cartItems.find((i) => i.id === cartItemId);
    if (item) {
      if (!wishlistIds.includes(item.productId)) {
        setWishlistIds((prev) => [...prev, item.productId]);
      }
      removeFromCart(cartItemId);
      showToast('Moved item to Wishlist');
    }
  };

  const toggleWishlist = (productId: string) => {
    let nowIn = false;
    if (wishlistIds.includes(productId)) {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      nowIn = false;
      showToast('Removed from Wishlist');
    } else {
      setWishlistIds((prev) => [...prev, productId]);
      nowIn = true;
      showToast('Saved to Siri Wishlist ♥');
    }
    return nowIn;
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const applyCoupon = (code: string) => {
    const found = AVAILABLE_COUPONS.find(
      (c) => c.code.toLowerCase() === code.trim().toLowerCase()
    );
    if (found) {
      setAppliedCoupon(found);
      showToast(`Coupon ${found.code} applied! Saved ₹${found.discountAmount}`);
      return { success: true, message: `Coupon applied: ₹${found.discountAmount} savings` };
    }
    showToast('Invalid or expired coupon code');
    return { success: false, message: 'Invalid coupon' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  const addAddress = (newAddr: Address) => {
    setAddresses((prev) => [newAddr, ...prev.map((a) => ({ ...a, isDefault: false }))]);
    setSelectedAddress(newAddr);
    showToast('Delivery address saved & selected');
  };

  const placeOrder = () => {
    const orderId = 'SIRI-' + Math.floor(100000 + Math.random() * 900000);
    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const couponDiscount = appliedCoupon ? appliedCoupon.discountAmount : 0;
    const finalTotal = Math.max(0, subtotal - couponDiscount);

    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      items: [...cartItems],
      total: finalTotal,
      address: selectedAddress,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    return orderId;
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        selectedProduct,
        setSelectedProduct,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQty,
        updateCartItemSize,
        moveCartItemToWishlist,
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        addresses,
        selectedAddress,
        setSelectedAddress,
        addAddress,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isProfileOpen,
        setIsProfileOpen,
        toastMessage,
        showToast,
        orders,
        placeOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
