import React from 'react';
import { useApp } from '../context/AppContext';
import { ScreenType } from '../types';

export const BottomNav: React.FC = () => {
  const { currentScreen, setCurrentScreen, cartItems, wishlistIds } = useApp();

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistIds.length;

  const navItems: { id: ScreenType; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'catalog', label: 'Categories', icon: 'dashboard' },
    { id: 'studio', label: 'Studio', icon: 'local_fire_department' },
    { id: 'wishlist', label: 'Wishlist', icon: 'favorite' },
    { id: 'cart', label: 'Bag', icon: 'shopping_bag' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full z-50 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-4px_16px_rgba(22,27,45,0.06)] border-t border-surface-container/60">
      <div className="flex items-center justify-around h-16 px-space-xs max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive =
            currentScreen === item.id || (item.id === 'catalog' && currentScreen === 'pdp');

          return (
            <button
              key={item.id}
              className={`relative flex flex-col items-center justify-center w-16 h-12 gap-0.5 transition-all active:scale-90 ${
                isActive ? 'text-primary font-bold' : 'text-secondary hover:text-on-surface'
              }`}
              onClick={() => setCurrentScreen(item.id)}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={{
                  fontVariationSettings: isActive
                    ? "'FILL' 1, 'wght' 600, 'opsz' 24"
                    : "'FILL' 0, 'wght' 400, 'opsz' 24",
                }}
              >
                {item.icon}
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-wide">
                {item.label}
              </span>

              {item.id === 'wishlist' && wishlistCount > 0 && (
                <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-primary" />
              )}

              {item.id === 'cart' && totalCartCount > 0 && (
                <span className="absolute top-0.5 right-3 min-w-[14px] h-3.5 px-1 rounded-full bg-primary text-on-primary font-label-sm text-[8px] leading-3.5 flex items-center justify-center font-bold">
                  {totalCartCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
