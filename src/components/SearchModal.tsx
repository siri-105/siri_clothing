import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_PRODUCTS } from '../data/mockData';
import { generateInfiniteProducts } from '../utils/productGenerator';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setSelectedProduct, setCurrentScreen } = useApp();
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  if (!isSearchOpen) return null;

  // Search across first 60 infinite products + core products
  const pool = [...ALL_PRODUCTS, ...generateInfiniteProducts(2, 24), ...generateInfiniteProducts(3, 24)];

  const filtered = query.trim()
    ? pool.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const trendingTags = [
    'Chanderi Silk',
    'Angrakha Kurti',
    'Anarkali Gown',
    'Lehenga Choli',
    'Pure Cotton',
    'Organza Suit',
    'Velvet Kurta',
    'Banarasi Brocade',
  ];

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setQuery('Chanderi Silk');
      setIsListening(false);
    }, 1200);
  };

  const handleCameraSearch = () => {
    setIsCameraActive(true);
    setTimeout(() => {
      setQuery('Angrakha');
      setIsCameraActive(false);
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-start p-4 sm:p-6"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="w-full bg-white shadow-2xl p-5 sm:p-6 flex flex-col max-w-2xl mx-auto rounded-2xl animate-in slide-in-from-top duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3.5">
          <span className="material-symbols-outlined text-slate-400 text-[24px]">search</span>
          <input
            autoFocus
            type="text"
            placeholder="Search for Kurtas, Dresses, Brands, Fabrics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-slate-900 font-medium text-sm sm:text-base outline-none bg-transparent"
          />
          {query ? (
            <button
              className="text-slate-400 hover:text-slate-700 p-1"
              onClick={() => setQuery('')}
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <button
                className={`p-1.5 rounded-full hover:bg-slate-100 transition-colors ${
                  isCameraActive ? 'text-pink-600 animate-pulse' : 'text-slate-400 hover:text-pink-600'
                }`}
                onClick={handleCameraSearch}
                title="Visual Search"
              >
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
              </button>
              <button
                className={`p-1.5 rounded-full hover:bg-slate-100 transition-colors ${
                  isListening ? 'text-pink-600 animate-pulse' : 'text-slate-400 hover:text-pink-600'
                }`}
                onClick={handleVoiceSearch}
                title="Voice Search"
              >
                <span className="material-symbols-outlined text-[20px]">mic</span>
              </button>
            </div>
          )}
          <button
            className="text-pink-600 font-bold text-xs uppercase px-2 hover:text-pink-800"
            onClick={() => setIsSearchOpen(false)}
          >
            Cancel
          </button>
        </div>

        {isListening && (
          <div className="p-3 my-2 bg-pink-50 rounded-xl flex items-center gap-2 text-pink-700 font-bold text-xs border border-pink-200">
            <span className="material-symbols-outlined text-[18px] animate-spin">mic</span>
            Listening for voice input... (e.g. &quot;Chanderi Silk&quot;)
          </div>
        )}

        {isCameraActive && (
          <div className="p-3 my-2 bg-pink-50 rounded-xl flex items-center gap-2 text-pink-700 font-bold text-xs border border-pink-200">
            <span className="material-symbols-outlined text-[18px] animate-spin">photo_camera</span>
            Analyzing visual motif &amp; matching catalog...
          </div>
        )}

        {/* Content based on query */}
        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-1">
          {query.trim() === '' ? (
            <div className="flex flex-col gap-3 py-2">
              <span className="text-xs uppercase text-slate-400 font-bold tracking-wider">
                Trending Searches in Indian Festive
              </span>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-pink-50 hover:text-pink-700 hover:border-pink-200 border border-slate-200/60 text-slate-700 text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition-all"
                    onClick={() => setQuery(tag)}
                  >
                    <span className="material-symbols-outlined text-[14px] text-emerald-600">
                      trending_up
                    </span>
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs uppercase text-slate-500 font-bold">
                  {filtered.length} Results for &quot;{query}&quot;
                </span>
                <span className="text-xs text-emerald-600 font-semibold">Instant Search</span>
              </div>
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-slate-500">
                  <p className="font-bold text-sm text-slate-800">No exact matches found</p>
                  <p className="text-xs mt-1">Try searching for Silk, Angrakha, Cotton, or Lehenga</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {filtered.slice(0, 16).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedProduct(item);
                        setIsSearchOpen(false);
                        setCurrentScreen('pdp');
                      }}
                    >
                      <img
                        alt={item.name}
                        className="w-12 h-16 rounded-lg object-cover bg-slate-100"
                        src={item.image}
                      />
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-bold text-xs uppercase text-pink-600 truncate">
                          {item.brand}
                        </span>
                        <p className="font-medium text-xs text-slate-800 truncate">{item.name}</p>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="font-bold text-xs text-slate-900">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-emerald-600 font-bold">
                            {item.discountPercentage}% OFF
                          </span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[18px] text-slate-400">
                        chevron_right
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
