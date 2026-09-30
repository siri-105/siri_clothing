import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_DATA } from '../data/mockData';
import { generateInfiniteProducts } from '../utils/productGenerator';
import { Product } from '../types';

export const HomeScreen: React.FC = () => {
  const {
    setCurrentScreen,
    setSelectedProduct,
    isInWishlist,
    toggleWishlist,
    applyCoupon,
  } = useApp();

  // Dynamic countdown timer
  const [secondsLeft, setSecondsLeft] = useState(8 * 3600 + 42 * 60 + 19);

  // Infinite recommended products stream
  const [recommendedPage, setRecommendedPage] = useState(1);
  const [recommendedList, setRecommendedList] = useState<Product[]>(() =>
    generateInfiniteProducts(1, 12)
  );
  const [loadingMoreRecommended, setLoadingMoreRecommended] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(
      seconds
    ).padStart(2, '0')}s`;
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('pdp');
  };

  const loadMoreRecommended = () => {
    if (loadingMoreRecommended) return;
    setLoadingMoreRecommended(true);
    setTimeout(() => {
      setRecommendedPage((p) => {
        const next = p + 1;
        setRecommendedList((prev) => [...prev, ...generateInfiniteProducts(next, 8)]);
        return next;
      });
      setLoadingMoreRecommended(false);
    }, 350);
  };

  // Steal deal items
  const stealDeals = generateInfiniteProducts(2, 6);

  return (
    <div className="w-full pb-20 space-y-8 select-none max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Flash Notification Banner */}
      <div className="pt-2">
        <div
          className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-2.5 rounded-xl bg-pink-100/80 border border-pink-200 text-pink-900 shadow-xs cursor-pointer active:scale-98 transition-transform"
          onClick={() => {
            applyCoupon('FREE49');
          }}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-pink-700">
              local_shipping
            </span>
            <span className="font-bold text-xs sm:text-sm tracking-wide">
              Festive Express Delivery Available on First Order Across India
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1 sm:mt-0">
            <span className="text-xs text-pink-700 font-medium">Use Code:</span>
            <span className="font-bold text-xs uppercase px-2 py-0.5 rounded bg-pink-700 text-white shadow-2xs">
              FREE49
            </span>
          </div>
        </div>
      </div>

      {/* Hero Festive Banner Carousel Card */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-900 via-pink-700 to-rose-700 p-6 sm:p-10 text-white shadow-xl">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col space-y-2 max-w-xl">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs uppercase tracking-wider font-extrabold">
                  Grand Festive Sale
                </span>
                {/* Dynamic Countdown Timer Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 backdrop-blur-md border border-white/10">
                  <span className="material-symbols-outlined text-[15px] text-emerald-300">
                    schedule
                  </span>
                  <span className="text-xs font-mono font-bold tracking-wider text-emerald-200">
                    {formatCountdown(secondsLeft)}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <h2 className="font-headline-lg text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
                  50% TO 80% OFF
                </h2>
                <p className="text-pink-100 text-sm sm:text-base font-medium pt-1">
                  Handcrafted Chanderi Silk Kurtas, Regal Anarkalis &amp; Festive Couture
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
              <div
                className="flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-xl cursor-pointer hover:bg-white/25 transition-colors"
                onClick={() => {
                  navigator.clipboard?.writeText('SIRI200');
                  applyCoupon('SIRI200');
                }}
              >
                <span className="text-xs text-pink-200 font-bold">PROMO:</span>
                <span className="font-mono text-sm tracking-wider font-black text-amber-300">
                  SIRI200
                </span>
              </div>

              <button
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-pink-700 font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-pink-50 active:scale-95 transition-all"
                onClick={() => setCurrentScreen('catalog')}
              >
                <span>Shop Infinite Collection</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Circular Category Rail */}
      <section className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-lg sm:text-xl text-slate-900 font-bold uppercase tracking-tight">
            Explore Categories
          </h3>
          <button
            className="text-xs font-bold text-pink-600 tracking-wide hover:underline uppercase"
            onClick={() => setCurrentScreen('catalog')}
          >
            View All Categories
          </button>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 sm:gap-6 py-2 overflow-x-auto no-scrollbar">
          {CATEGORIES_DATA.map((cat, idx) => (
            <div
              key={cat.id}
              className="flex flex-col items-center gap-2 cursor-pointer group"
              onClick={() => setCurrentScreen('catalog')}
            >
              <div
                className={`relative w-18 h-18 sm:w-22 sm:h-22 rounded-full p-1 transition-transform group-hover:scale-105 duration-300 ${
                  idx < 3
                    ? 'bg-gradient-to-tr from-pink-600 via-rose-400 to-amber-300'
                    : 'bg-gradient-to-tr from-slate-300 to-slate-200'
                }`}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 shadow-inner">
                  <img
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={cat.image}
                  />
                </div>
              </div>
              <span className="text-xs font-bold text-slate-800 text-center group-hover:text-pink-600 transition-colors">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Steal Deals Section */}
      <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-pink-600 animate-pulse" />
            <h3 className="font-headline-sm text-lg sm:text-xl text-slate-900 tracking-tight uppercase font-extrabold">
              Steal Deals
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-xs font-bold">
              UP TO 75% OFF
            </span>
          </div>
          <span className="text-xs font-bold text-slate-500 tracking-wider">STARTS AT ₹499</span>
        </div>

        {/* Horizontal Scroller / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {stealDeals.map((prod) => (
            <div
              key={prod.id}
              className="flex flex-col rounded-xl bg-white border border-slate-200/60 overflow-hidden shadow-2xs hover:shadow-md cursor-pointer group transition-all"
              onClick={() => handleProductClick(prod)}
            >
              <div className="relative aspect-[3/4] w-full bg-slate-100 overflow-hidden">
                <img
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={prod.image}
                />
                <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold">
                  {prod.discountPercentage}% OFF
                </span>
              </div>
              <div className="p-2.5 flex flex-col space-y-0.5">
                <span className="text-xs font-bold text-slate-900 uppercase truncate">
                  {prod.brand}
                </span>
                <span className="text-xs text-slate-500 truncate">{prod.name}</span>
                <div className="flex items-baseline gap-1.5 pt-1">
                  <span className="text-sm font-extrabold text-slate-900">
                    ₹{prod.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-400 line-through">
                    ₹{prod.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Curated Brand Spotlight */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-lg sm:text-xl text-slate-900 uppercase tracking-tight font-bold">
            Trending Spotlight
          </h3>
          <span className="text-xs font-bold text-pink-600 uppercase">Curated Brands</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              title: 'Biba Festive Luxe',
              sub: 'Min. 50% Off',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBv1J0oNEuc8X5jyxbpaVOqAzvsciKbp0yoeQa81MDaELVYOGL0hVWeH5JIw7LkUE3_yU3erjO3nhGs-uwpUL0weQXpBI_sIdcSfHC_RGc63XXuNQ_hRcoICEIxSkRDvVkeslbiLXpwTpOnJ9g_ZCZnr0DCpgcGLb8h95V1bHpKZRhRz_JH4eD2oL4fuh9TQFwZFQzNS4rVlFu7QssxkMAgLpFaXhE1XUSeHNKtpVbpaJn-dkt8vHe3g',
            },
            {
              title: 'Libas Chikankari',
              sub: 'Under ₹1,499',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdCJz4RNdoVXp38hHNCh5VlQS4Qc_T6JwemtoK2OuZGEOgiGJt9qKLtzYMN9Y84pwsecY6pPI9DCG2bKf7Be2VXLcaY6p1xQt6aOiFiT512JpyTKTHm1yTA8YQBBH3XIBvyXMcQScowRdq7VQsvwHc-Nijj9tpl2FFfqgg2U0FpXFZdYXft3Gl52xoeDxXKFWfefgLO4HmdhfbNsar1SJp5e_zW8D4qVr4w2KZxnz0QLLEhL0aVHEnrQ',
            },
            {
              title: 'W for Woman',
              sub: 'Flat 60% Off',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0cVELnNPN-sygrgmVt5MGRDZ_tHxdGDH7IzKQHbpzkqi_w9pvpoYEJOi84qMUb4kAm5sXahZHwDGufqaJyR498ifMIokb4pMbd9ObcELJqY9GM6W-89Y3qvzZ1WJ3Q5g37AIBoYZpJ2gA4db8ef1cpaVVmZOC8ZmGzpWzbmIWlEBh1p_NQ5b6GgyLXyz8ejVCARNrFLf5URR_ONrQ4gLLshSsXtF-BFRVd3LfNdm7Zndmveh8WE8IFQ',
            },
            {
              title: 'Siri Exclusives',
              sub: 'New Season Drops',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBA4CP-ORQt9zUEBtLz4M4qCqmsE9e5H6G4yqtokIBQE7lTsE315a4u0yK3U5yEwNnikvQUonvAMj22MEgNSVyz3tFMBaE8IBS7beQxBh5PbEUFSyzAPaDIzoUe-QNMkRluEa7zM-kzoMKpj50XuPoRQJCvx0v6L8lV60q7zaYBfvCEjVBJiOarDbtsBuHgRkyohMr6LAbvsXbCJ4BnXkqSDqsIUe2aAFJO2_IxMO6xkDlljjyaB2jLww',
            },
          ].map((b, i) => (
            <div
              key={i}
              className="relative h-32 rounded-xl overflow-hidden shadow-sm flex flex-col justify-end p-4 group cursor-pointer"
              onClick={() => setCurrentScreen('catalog')}
            >
              <img
                alt={b.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src={b.img}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
              <div className="relative z-10 flex flex-col">
                <span className="text-white font-bold text-sm">{b.title}</span>
                <span className="text-xs text-emerald-300 font-semibold">{b.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Infinite Recommended Stream */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline-sm text-lg sm:text-2xl text-slate-900 uppercase tracking-tight font-bold">
              Recommended For You
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Curated from over 14,000+ festive and handloom collections
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400 hidden sm:inline">
            Infinite Catalog Active
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {recommendedList.map((prod) => {
            const inWishlist = isInWishlist(prod.id);

            return (
              <div
                key={prod.id}
                className="flex flex-col rounded-xl bg-white border border-slate-100 shadow-xs hover:shadow-lg overflow-hidden group cursor-pointer active:scale-98 transition-all duration-300"
                onClick={() => handleProductClick(prod)}
              >
                <div className="relative aspect-[3/4] w-full bg-slate-100 overflow-hidden">
                  <img
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={prod.image}
                    loading="lazy"
                  />

                  {/* Wishlist Heart Button */}
                  <button
                    aria-label="Add to Wishlist"
                    className={`wishlist-btn absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xs active:scale-75 transition-all ${
                      inWishlist ? 'text-pink-600' : 'text-slate-500 hover:text-pink-600'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(prod.id);
                    }}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{
                        fontVariationSettings: inWishlist
                          ? "'FILL' 1, 'wght' 600, 'opsz' 20"
                          : "'FILL' 0, 'wght' 400, 'opsz' 20",
                      }}
                    >
                      favorite
                    </span>
                  </button>

                  {/* Star Rating Pill */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-900">{prod.rating}</span>
                    <span
                      className="material-symbols-outlined text-[12px] text-amber-500"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="text-[9px] text-slate-500 pl-0.5">| {prod.ratingCount}</span>
                  </div>
                </div>

                <div className="p-3.5 flex flex-col space-y-1">
                  <span className="text-xs font-bold text-slate-900 uppercase truncate">
                    {prod.brand}
                  </span>
                  <span className="text-xs text-slate-500 truncate">{prod.name}</span>
                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span className="text-sm font-extrabold text-slate-900">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{prod.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-emerald-600 font-bold">
                      {prod.discountPercentage}% OFF
                    </span>
                  </div>
                  <div className="flex items-center gap-1 pt-0.5 text-emerald-700 text-[11px] font-medium">
                    <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                    <span>Fast 2-Day Delivery</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button for Infinite Recommendations */}
        <div className="py-6 flex justify-center">
          <button
            onClick={loadMoreRecommended}
            disabled={loadingMoreRecommended}
            className="px-8 py-3 rounded-full bg-slate-900 hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            {loadingMoreRecommended ? (
              <>
                <span className="material-symbols-outlined text-[16px] animate-spin">
                  progress_activity
                </span>
                <span>Discovering more outfits...</span>
              </>
            ) : (
              <>
                <span>Load More Recommendations</span>
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};
