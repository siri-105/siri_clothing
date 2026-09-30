import React from 'react';
import { useApp } from '../context/AppContext';
import { USER_AVATAR_URL } from '../data/mockData';
import { BrandLogo, BrandLogoIcon } from './BrandLogo';

interface HeaderProps {
  mode?: 'home' | 'catalog' | 'detail' | 'cart';
  title?: string;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ mode = 'home', title, onBack }) => {
  const {
    currentScreen,
    setCurrentScreen,
    cartItems,
    wishlistIds,
    setIsSearchOpen,
    setIsProfileOpen,
  } = useApp();

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistIds.length;

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white/95 backdrop-blur-xl shadow-[0_1px_10px_rgba(0,0,0,0.05)] border-b border-slate-100 transition-all">
      {/* Desktop Top Promo Notification Strip */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 bg-gradient-to-r from-pink-900 via-pink-700 to-rose-700 text-white text-xs font-medium tracking-wide">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-amber-300">
              local_shipping
            </span>
            <span>Grand Festive Sale Live: Extra 10% OFF on ICICI &amp; HDFC Cards</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-bold text-amber-300">Use Code: FIRST200 for ₹200 OFF</span>
            <span className="text-white/60">|</span>
            <button
              onClick={() => setCurrentScreen('catalog')}
              className="hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Explore 14,000+ Festive Styles</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Responsive Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {mode === 'detail' || mode === 'cart' ? (
          /* Stacked Header for Checkout & Detail view */
          <div className="h-14 lg:h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                aria-label="Go Back"
                className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-800 hover:text-pink-600 transition-colors"
                onClick={onBack || (() => setCurrentScreen('catalog'))}
              >
                <span className="material-symbols-outlined text-[24px]">arrow_back</span>
              </button>
              <BrandLogo
                size="sm"
                variant="full"
                onClick={() => setCurrentScreen('home')}
              />
              <span className="text-slate-300 text-lg hidden sm:inline">/</span>
              <h1 className="font-title-md text-base lg:text-lg font-bold text-slate-800 truncate max-w-[200px] capitalize">
                {title || (mode === 'cart' ? 'Cart' : 'Product Details')}
              </h1>
            </div>

            {/* Desktop Navigation Links when in detail */}
            <nav className="hidden lg:flex items-center gap-8">
              <button
                onClick={() => setCurrentScreen('home')}
                className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                  currentScreen === 'home' ? 'text-pink-600' : 'text-slate-600 hover:text-pink-600'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentScreen('catalog')}
                className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                  currentScreen === 'catalog'
                    ? 'text-pink-600'
                    : 'text-slate-600 hover:text-pink-600'
                }`}
              >
                Kurtas &amp; Sets
              </button>
              <button
                onClick={() => setCurrentScreen('studio')}
                className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                  currentScreen === 'studio'
                    ? 'text-pink-600'
                    : 'text-slate-600 hover:text-pink-600'
                }`}
              >
                Studio Lookbook
              </button>
            </nav>

            <div className="flex items-center gap-2 sm:gap-4">
              <button
                aria-label="Search"
                className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 hover:text-pink-600 transition-colors"
                onClick={() => setIsSearchOpen(true)}
              >
                <span className="material-symbols-outlined text-[22px]">search</span>
              </button>
              <button
                aria-label="Wishlist"
                className="relative w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 hover:text-pink-600 transition-colors"
                onClick={() => setCurrentScreen('wishlist')}
              >
                <span className="material-symbols-outlined text-[22px]">favorite</span>
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-pink-600 text-white font-label-sm text-[9px] leading-4 flex items-center justify-center font-bold shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button
                aria-label="Bag"
                className="relative w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 hover:text-pink-600 transition-colors"
                onClick={() => setCurrentScreen('cart')}
              >
                <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                {totalCartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-pink-600 text-white font-label-sm text-[9px] leading-4 flex items-center justify-center font-bold shadow-sm">
                    {totalCartCount}
                  </span>
                )}
              </button>
              <div
                className="flex items-center gap-2 pl-2 cursor-pointer group"
                onClick={() => setIsProfileOpen(true)}
              >
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-pink-500/20 group-hover:ring-pink-600 transition-all"
                  src={USER_AVATAR_URL}
                />
                <span className="hidden lg:inline text-xs font-bold text-slate-700 group-hover:text-pink-600">
                  Priya
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Full Website Header */
          <div>
            {/* Desktop Single-Row Luxury Layout */}
            <div className="hidden lg:flex items-center justify-between h-20 gap-6">
              {/* Brand Logo with Vector Emblem */}
              <BrandLogo
                size="md"
                variant="full"
                onClick={() => setCurrentScreen('home')}
              />

              {/* Desktop Nav Links */}
              <nav className="flex items-center gap-7 text-sm font-bold tracking-wide">
                <button
                  onClick={() => setCurrentScreen('home')}
                  className={`transition-colors py-1 relative ${
                    currentScreen === 'home'
                      ? 'text-pink-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-pink-600'
                      : 'text-slate-700 hover:text-pink-600'
                  }`}
                >
                  HOME
                </button>
                <button
                  onClick={() => setCurrentScreen('catalog')}
                  className={`transition-colors py-1 relative ${
                    currentScreen === 'catalog'
                      ? 'text-pink-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-pink-600'
                      : 'text-slate-700 hover:text-pink-600'
                  }`}
                >
                  KURTAS &amp; SETS
                </button>
                <button
                  onClick={() => setCurrentScreen('catalog')}
                  className="text-slate-700 hover:text-pink-600 transition-colors py-1"
                >
                  ANARKALIS
                </button>
                <button
                  onClick={() => setCurrentScreen('catalog')}
                  className="text-slate-700 hover:text-pink-600 transition-colors py-1"
                >
                  LEHENGAS
                </button>
                <button
                  onClick={() => setCurrentScreen('studio')}
                  className={`transition-colors py-1 relative ${
                    currentScreen === 'studio'
                      ? 'text-pink-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-pink-600'
                      : 'text-slate-700 hover:text-pink-600'
                  }`}
                >
                  STUDIO
                  <span className="ml-1 text-[9px] px-1.5 py-0.2 rounded-full bg-pink-100 text-pink-700 font-bold">
                    NEW
                  </span>
                </button>
              </nav>

              {/* Center Search Bar */}
              <div className="flex-1 max-w-md">
                <div
                  className="w-full h-11 px-4 rounded-full bg-slate-100/90 border border-slate-200/80 flex items-center gap-3 text-slate-500 cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-all shadow-inner"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <span className="material-symbols-outlined text-[20px] text-slate-400">
                    search
                  </span>
                  <span className="flex-1 text-xs text-slate-500 truncate">
                    Search 14,000+ Kurtas, Silk Suits, Anarkalis...
                  </span>
                  <button
                    aria-label="Search with Camera"
                    className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-pink-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSearchOpen(true);
                    }}
                  >
                    <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                  </button>
                  <button
                    aria-label="Search with Voice"
                    className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-pink-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSearchOpen(true);
                    }}
                  >
                    <span className="material-symbols-outlined text-[18px]">mic</span>
                  </button>
                </div>
              </div>

              {/* Action Icons with Labels */}
              <div className="flex items-center gap-6 shrink-0">
                <button
                  className="flex flex-col items-center gap-0.5 text-slate-700 hover:text-pink-600 transition-colors group cursor-pointer"
                  onClick={() => setIsProfileOpen(true)}
                >
                  <div className="relative">
                    <img
                      alt="Profile"
                      className="w-7 h-7 rounded-full object-cover ring-2 ring-pink-500/20 group-hover:ring-pink-600 transition-all"
                      src={USER_AVATAR_URL}
                    />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider">Profile</span>
                </button>

                <button
                  className="flex flex-col items-center gap-0.5 text-slate-700 hover:text-pink-600 transition-colors relative group"
                  onClick={() => setCurrentScreen('wishlist')}
                >
                  <span className="material-symbols-outlined text-[22px]">favorite</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider">Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 right-2 min-w-[16px] h-4 px-1 rounded-full bg-pink-600 text-white font-label-sm text-[9px] leading-4 flex items-center justify-center font-bold shadow-sm">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                <button
                  className="flex flex-col items-center gap-0.5 text-slate-700 hover:text-pink-600 transition-colors relative group"
                  onClick={() => setCurrentScreen('cart')}
                >
                  <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider">Bag</span>
                  {totalCartCount > 0 && (
                    <span className="absolute -top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-pink-600 text-white font-label-sm text-[9px] leading-4 flex items-center justify-center font-bold shadow-sm">
                      {totalCartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile / Tablet 2-Row Header Layout (Matches Screenshots Exactly) */}
            <div className="lg:hidden h-28 flex flex-col justify-between py-space-xs">
              <div className="flex items-center justify-between h-14">
                <BrandLogo
                  size="md"
                  variant="full"
                  onClick={() => setCurrentScreen('home')}
                />
                <div className="flex items-center gap-space-xs">
                  <button
                    aria-label="Wishlist"
                    className="relative w-11 h-11 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
                    onClick={() => setCurrentScreen('wishlist')}
                  >
                    <span className="material-symbols-outlined text-[24px]">favorite</span>
                    {wishlistCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-primary text-on-primary font-label-sm text-[9px] leading-4 flex items-center justify-center font-bold">
                        {wishlistCount}
                      </span>
                    )}
                  </button>
                  <button
                    aria-label="Shopping Bag"
                    className="relative w-11 h-11 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
                    onClick={() => setCurrentScreen('cart')}
                  >
                    <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
                    {totalCartCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-primary text-on-primary font-label-sm text-[9px] leading-4 flex items-center justify-center font-bold">
                        {totalCartCount}
                      </span>
                    )}
                  </button>
                  <div
                    className="w-11 h-11 flex items-center justify-center pl-space-xs cursor-pointer"
                    onClick={() => setIsProfileOpen(true)}
                  >
                    <img
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20 hover:ring-primary transition-all"
                      src={USER_AVATAR_URL}
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Search Bar */}
              <div className="h-12 pb-space-xs flex items-center">
                <div
                  className="w-full h-10 px-space-md rounded-full bg-surface-container-low flex items-center gap-space-sm text-secondary cursor-pointer hover:bg-surface-container transition-colors"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <span className="material-symbols-outlined text-[20px] text-secondary">
                    search
                  </span>
                  <span className="flex-1 font-body-sm text-body-sm text-secondary truncate">
                    Search for Kurtas, Dresses, Brands...
                  </span>
                  <button
                    aria-label="Search with Camera"
                    className="w-8 h-8 flex items-center justify-center text-secondary hover:text-on-surface transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSearchOpen(true);
                    }}
                  >
                    <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                  </button>
                  <button
                    aria-label="Search with Voice"
                    className="w-8 h-8 flex items-center justify-center text-secondary hover:text-on-surface transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSearchOpen(true);
                    }}
                  >
                    <span className="material-symbols-outlined text-[18px]">mic</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
