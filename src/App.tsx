import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { CatalogScreen } from './components/CatalogScreen';
import { PdpScreen } from './components/PdpScreen';
import { CartScreen } from './components/CartScreen';
import { WishlistScreen } from './components/WishlistScreen';
import { StudioScreen } from './components/StudioScreen';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { ProfileModal } from './components/ProfileModal';

const MainApp: React.FC = () => {
  const { currentScreen, setCurrentScreen, toastMessage } = useApp();

  // Determine header mode and title
  let headerMode: 'home' | 'catalog' | 'detail' | 'cart' = 'home';
  let headerTitle = '';

  if (currentScreen === 'home') {
    headerMode = 'home';
  } else if (currentScreen === 'catalog') {
    headerMode = 'catalog';
  } else if (currentScreen === 'pdp') {
    headerMode = 'detail';
    headerTitle = 'Product Details';
  } else if (currentScreen === 'cart') {
    headerMode = 'cart';
    headerTitle = 'Shopping Bag';
  } else if (currentScreen === 'wishlist') {
    headerMode = 'detail';
    headerTitle = 'My Wishlist';
  } else if (currentScreen === 'studio') {
    headerMode = 'home';
  }

  const handleBack = () => {
    if (currentScreen === 'pdp') {
      setCurrentScreen('catalog');
    } else if (currentScreen === 'cart') {
      setCurrentScreen('home');
    } else if (currentScreen === 'wishlist' || currentScreen === 'studio') {
      setCurrentScreen('home');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col justify-between relative selection:bg-pink-100 selection:text-pink-900">
      {/* Dynamic Responsive Website Header */}
      <Header mode={headerMode} title={headerTitle} onBack={handleBack} />

      {/* Main Content Area */}
      <main
        className={`flex-1 w-full bg-slate-50/50 ${
          headerMode === 'detail' || headerMode === 'cart'
            ? 'pt-16 lg:pt-28'
            : 'pt-28 lg:pt-36'
        }`}
      >
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'catalog' && <CatalogScreen />}
        {currentScreen === 'pdp' && <PdpScreen />}
        {currentScreen === 'cart' && <CartScreen />}
        {currentScreen === 'wishlist' && <WishlistScreen />}
        {currentScreen === 'studio' && <StudioScreen />}
      </main>

      {/* Full E-Commerce Website Footer */}
      <Footer />

      {/* Mobile-Only Bottom Navigation Bar (Hidden on Desktop) */}
      {currentScreen !== 'cart' && (
        <div className="lg:hidden">
          <BottomNav />
        </div>
      )}

      {/* Overlays & Modals */}
      <SearchModal />
      <ProfileModal />

      {/* Global Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-slate-900 text-white font-medium text-xs sm:text-sm shadow-2xl flex items-center gap-2.5 pointer-events-none transition-all duration-300 animate-in fade-in zoom-in-95">
          <span className="material-symbols-outlined text-pink-400 text-[18px]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
