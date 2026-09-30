import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { generateInfiniteProducts } from '../utils/productGenerator';
import { Product } from '../types';

export const CatalogScreen: React.FC = () => {
  const { setCurrentScreen, setSelectedProduct, isInWishlist, toggleWishlist } = useApp();

  // Infinite product state
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>(() => generateInfiniteProducts(1, 16));
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Filter drawer & sort modal states (for mobile)
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState<
    'category' | 'size' | 'price' | 'color' | 'discount' | 'fabric'
  >('category');

  // Active filters state
  const [activeFilters, setActiveFilters] = useState<string[]>([
    'Kurta Sets',
    'Pink / Magenta',
  ]);
  const [currentSort, setCurrentSort] = useState<string>('Popularity');

  // Filter selections
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Kurta Sets']);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['S', 'M']);
  const [selectedColors, setSelectedColors] = useState<string[]>(['Pink / Magenta']);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedDiscount, setSelectedDiscount] = useState<string>('all');
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);

  // Infinite scroll observer target
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);

    setTimeout(() => {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        const newBatch = generateInfiniteProducts(nextPage, 16);
        setProducts((prev) => [...prev, ...newBatch]);
        return nextPage;
      });
      setIsLoadingMore(false);
    }, 400);
  }, [isLoadingMore]);

  // Infinite scroll intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: '400px' }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMore]);

  // Filter & Sort Logic
  let displayProducts = products.filter((prod) => {
    // Category filter
    if (selectedCategories.length > 0) {
      const match = selectedCategories.some(
        (cat) =>
          prod.category.toLowerCase().includes(cat.toLowerCase()) ||
          prod.name.toLowerCase().includes(cat.toLowerCase())
      );
      if (!match) return false;
    }

    // Size filter
    if (selectedSizes.length > 0) {
      const match = prod.sizes.some(
        (s) => selectedSizes.includes(s.size) && s.available
      );
      if (!match) return false;
    }

    // Color filter
    if (selectedColors.length > 0) {
      const match = prod.colors.some((c) =>
        selectedColors.some(
          (sc) =>
            c.name.toLowerCase().includes(sc.toLowerCase()) ||
            sc.toLowerCase().includes(c.name.toLowerCase())
        )
      );
      if (!match) return false;
    }

    // Fabric filter
    if (selectedFabrics.length > 0) {
      const match = selectedFabrics.some((f) =>
        prod.fabric.toLowerCase().includes(f.toLowerCase())
      );
      if (!match) return false;
    }

    // Price range filter
    if (selectedPriceRange === 'under-1000' && prod.price >= 1000) return false;
    if (selectedPriceRange === '1000-2500' && (prod.price < 1000 || prod.price > 2500))
      return false;
    if (selectedPriceRange === '2500-5000' && (prod.price < 2500 || prod.price > 5000))
      return false;
    if (selectedPriceRange === 'above-5000' && prod.price <= 5000) return false;

    // Discount filter
    if (selectedDiscount === '30' && prod.discountPercentage < 30) return false;
    if (selectedDiscount === '50' && prod.discountPercentage < 50) return false;
    if (selectedDiscount === '70' && prod.discountPercentage < 70) return false;

    return true;
  });

  // Sorting
  if (currentSort === 'Price: Low to High') {
    displayProducts.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'Price: High to Low') {
    displayProducts.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'Customer Rating') {
    displayProducts.sort((a, b) => b.rating - a.rating);
  } else if (currentSort === 'Better Discount') {
    displayProducts.sort((a, b) => b.discountPercentage - a.discountPercentage);
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('pdp');
  };

  const removeFilter = (filterName: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filterName));
    setSelectedCategories((prev) => prev.filter((c) => c !== filterName));
    setSelectedColors((prev) => prev.filter((c) => c !== filterName));
    setSelectedFabrics((prev) => prev.filter((f) => f !== filterName));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedFabrics([]);
    setSelectedPriceRange('all');
    setSelectedDiscount('all');
  };

  const toggleCategory = (catName: string) => {
    if (selectedCategories.includes(catName)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== catName));
      setActiveFilters(activeFilters.filter((c) => c !== catName));
    } else {
      setSelectedCategories([...selectedCategories, catName]);
      setActiveFilters([...activeFilters, catName]);
    }
  };

  const toggleColor = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(selectedColors.filter((c) => c !== colorName));
      setActiveFilters(activeFilters.filter((c) => c !== colorName));
    } else {
      setSelectedColors([...selectedColors, colorName]);
      setActiveFilters([...activeFilters, colorName]);
    }
  };

  const toggleSize = (sz: string) => {
    if (selectedSizes.includes(sz)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== sz));
    } else {
      setSelectedSizes([...selectedSizes, sz]);
    }
  };

  const toggleFabric = (fab: string) => {
    if (selectedFabrics.includes(fab)) {
      setSelectedFabrics(selectedFabrics.filter((f) => f !== fab));
      setActiveFilters(activeFilters.filter((f) => f !== fab));
    } else {
      setSelectedFabrics([...selectedFabrics, fab]);
      setActiveFilters([...activeFilters, fab]);
    }
  };

  return (
    <div className="w-full pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation on Desktop */}
      <nav className="hidden lg:flex items-center gap-2 py-3 text-xs text-slate-500 font-medium">
        <button
          onClick={() => setCurrentScreen('home')}
          className="hover:text-pink-600 transition-colors"
        >
          Home
        </button>
        <span>/</span>
        <span className="text-slate-400">Women</span>
        <span>/</span>
        <span className="text-slate-400">Ethnic Wear</span>
        <span>/</span>
        <span className="text-slate-900 font-bold">Kurtas &amp; Sets (Infinite Collection)</span>
      </nav>

      {/* Top Header Filter Bar */}
      <section className="bg-white rounded-xl shadow-xs border border-slate-100 p-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-baseline gap-3">
            <h1 className="font-headline-sm text-lg sm:text-2xl text-slate-900 font-bold">
              Kurtas &amp; Sets
            </h1>
            <span className="text-xs sm:text-sm text-slate-500 font-medium">
              - 14,280+ infinite styles available
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase hidden sm:inline">
              Sort by:
            </span>
            <div className="relative">
              <button
                aria-label="Sort Options"
                className="h-9 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-2 font-bold text-xs transition-colors shadow-xs"
                onClick={() => setIsSortOpen(true)}
              >
                <span className="material-symbols-outlined text-[16px] text-slate-500">
                  swap_vert
                </span>
                <span>{currentSort}</span>
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>
            </div>

            {/* Mobile Filter Button */}
            <button
              aria-label="Open Filters"
              className="lg:hidden relative h-9 px-4 rounded-lg bg-slate-900 text-white flex items-center gap-2 font-bold text-xs shadow-sm"
              onClick={() => setIsFilterOpen(true)}
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>Filter</span>
              <span className="w-4 h-4 rounded-full bg-pink-600 text-white text-[9px] flex items-center justify-center font-bold">
                {activeFilters.length > 0 ? activeFilters.length : 3}
              </span>
            </button>
          </div>
        </div>

        {/* Applied Filter Chips */}
        <div className="flex items-center justify-between gap-2 pt-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-semibold hidden md:inline">
              Applied Filters:
            </span>
            {activeFilters.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-bold shadow-2xs"
              >
                <span>{f}</span>
                <button
                  aria-label={`Remove ${f}`}
                  className="hover:bg-pink-200/60 rounded-full p-0.5"
                  onClick={() => removeFilter(f)}
                >
                  <span className="material-symbols-outlined text-[13px]">close</span>
                </button>
              </span>
            ))}

            {activeFilters.length === 0 && (
              <span className="text-xs text-slate-400 italic">No filters applied</span>
            )}
          </div>

          {activeFilters.length > 0 && (
            <button
              className="text-xs font-bold uppercase tracking-wider text-pink-600 hover:text-pink-800 transition-colors"
              onClick={clearAllFilters}
            >
              Clear All Filters
            </button>
          )}
        </div>
      </section>

      {/* Main Layout: Desktop Sidebar + Infinite Products Grid */}
      <div className="flex items-start gap-8">
        {/* Desktop Left Filter Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs sticky top-36">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <span className="font-headline-sm text-sm font-bold uppercase tracking-wider text-slate-900">
              Filters
            </span>
            <button
              className="text-xs font-bold text-pink-600 uppercase hover:underline"
              onClick={clearAllFilters}
            >
              Reset All
            </button>
          </div>

          <div className="flex flex-col gap-6 max-h-[70vh] overflow-y-auto pr-2 no-scrollbar">
            {/* Category Filter */}
            <div>
              <h4 className="font-bold text-xs uppercase text-slate-800 tracking-wider mb-2.5">
                Categories
              </h4>
              <div className="flex flex-col gap-2 text-xs text-slate-600">
                {[
                  { name: 'Kurta Sets', count: '5,420' },
                  { name: 'Kurtas & Tunics', count: '3,840' },
                  { name: 'Anarkali Suits', count: '2,310' },
                  { name: 'Lehenga Choli', count: '1,185' },
                  { name: 'Fusion Dresses', count: '940' },
                ].map((cat) => (
                  <label key={cat.name} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.name)}
                      onChange={() => toggleCategory(cat.name)}
                      className="accent-pink-600 w-3.5 h-3.5 rounded"
                    />
                    <span className="group-hover:text-slate-900 flex-1">{cat.name}</span>
                    <span className="text-[10px] text-slate-400">{cat.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-bold text-xs uppercase text-slate-800 tracking-wider mb-2.5">
                Size
              </h4>
              <div className="grid grid-cols-3 gap-1.5">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => {
                  const isSelected = selectedSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      className={`h-8 rounded text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-pink-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                      onClick={() => toggleSize(sz)}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-bold text-xs uppercase text-slate-800 tracking-wider mb-2.5">
                Price Range
              </h4>
              <div className="flex flex-col gap-2 text-xs text-slate-600">
                {[
                  { label: 'All Prices', val: 'all' },
                  { label: 'Under ₹1,000', val: 'under-1000' },
                  { label: '₹1,000 - ₹2,500', val: '1000-2500' },
                  { label: '₹2,500 - ₹5,000', val: '2500-5000' },
                  { label: 'Above ₹5,000', val: 'above-5000' },
                ].map((item) => (
                  <label key={item.val} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="desktop-price"
                      checked={selectedPriceRange === item.val}
                      onChange={() => setSelectedPriceRange(item.val)}
                      className="accent-pink-600"
                    />
                    <span className="group-hover:text-slate-900">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-bold text-xs uppercase text-slate-800 tracking-wider mb-2.5">
                Colors
              </h4>
              <div className="flex flex-col gap-2 text-xs text-slate-600">
                {[
                  { name: 'Pink / Magenta', color: 'bg-pink-600' },
                  { name: 'Emerald Green', color: 'bg-emerald-600' },
                  { name: 'Mustard Gold', color: 'bg-amber-400' },
                  { name: 'Soft Peach', color: 'bg-rose-200' },
                  { name: 'Royal Navy', color: 'bg-slate-800' },
                  { name: 'Mint Green', color: 'bg-teal-300' },
                ].map((col) => (
                  <label key={col.name} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(col.name)}
                      onChange={() => toggleColor(col.name)}
                      className="accent-pink-600 w-3.5 h-3.5"
                    />
                    <span className={`w-3.5 h-3.5 rounded-full ${col.color} shadow-2xs`} />
                    <span className="group-hover:text-slate-900 flex-1">{col.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fabric Filter */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-bold text-xs uppercase text-slate-800 tracking-wider mb-2.5">
                Fabric
              </h4>
              <div className="flex flex-col gap-2 text-xs text-slate-600">
                {['Pure Chanderi Silk', 'Pure Cotton', 'Organza', 'Georgette', 'Micro Velvet'].map(
                  (fab) => (
                    <label key={fab} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedFabrics.includes(fab)}
                        onChange={() => toggleFabric(fab)}
                        className="accent-pink-600 w-3.5 h-3.5 rounded"
                      />
                      <span className="group-hover:text-slate-900 flex-1">{fab}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Discount Filter */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-bold text-xs uppercase text-slate-800 tracking-wider mb-2.5">
                Discount
              </h4>
              <div className="flex flex-col gap-2 text-xs text-slate-600">
                {[
                  { label: 'All Discounts', val: 'all' },
                  { label: '30% and above', val: '30' },
                  { label: '50% and above', val: '50' },
                  { label: '70% and above', val: '70' },
                ].map((d) => (
                  <label key={d.val} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="desktop-disc"
                      checked={selectedDiscount === d.val}
                      onChange={() => setSelectedDiscount(d.val)}
                      className="accent-pink-600"
                    />
                    <span className="group-hover:text-slate-900">{d.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Product Grid Area */}
        <div className="flex-1 min-w-0">
          {/* Active Product Count Header */}
          <div className="flex items-center justify-between pb-4">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">
              Showing{' '}
              <strong className="text-slate-900 font-bold">{displayProducts.length}</strong> styles
              (Infinite Catalog)
            </span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold">
              <span className="material-symbols-outlined text-[15px]">all_inclusive</span>
              <span>Infinite Scroll Active</span>
            </div>
          </div>

          {/* Responsive Multi-Column Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {displayProducts.map((prod) => {
              const inWishlist = isInWishlist(prod.id);

              return (
                <div
                  key={prod.id}
                  className="flex flex-col bg-white rounded-xl shadow-xs hover:shadow-md border border-slate-100 overflow-hidden group cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => handleProductClick(prod)}
                >
                  <div className="relative w-full aspect-[3/4] bg-slate-100 overflow-hidden">
                    <img
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={prod.image}
                      loading="lazy"
                    />

                    {/* Tags */}
                    {prod.tag === 'TRENDING #1' && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-pink-600 text-white font-label-sm text-[9px] font-bold tracking-wide shadow-sm uppercase">
                        Trending #1
                      </span>
                    )}
                    {prod.tag === 'ONLY 3 LEFT' && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-500 text-white font-label-sm text-[9px] font-bold tracking-wide shadow-sm uppercase flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[10px]">alarm</span> Only 3
                        left
                      </span>
                    )}
                    {prod.tag === '1-DAY DELIVERY' && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-emerald-600 text-white font-label-sm text-[9px] font-bold tracking-wide flex items-center gap-0.5 shadow-sm">
                        <span className="material-symbols-outlined text-[10px]">bolt</span> 1-Day
                      </div>
                    )}
                    {prod.tag === 'BESTSELLER' && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900 text-white font-label-sm text-[9px] font-bold tracking-wide shadow-sm uppercase">
                        Bestseller
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      aria-label="Add to Wishlist"
                      className={`wishlist-btn absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center active:scale-75 transition-all shadow-sm ${
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

                    {/* Rating Badge */}
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/95 backdrop-blur-sm shadow-xs">
                      <span className="font-label-sm text-[10px] font-bold text-slate-800 leading-none">
                        {prod.rating}
                      </span>
                      <span
                        className="material-symbols-outlined text-[11px] text-amber-500"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="font-body-sm text-[9px] text-slate-500 leading-none">
                        | {prod.ratingCount}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col p-3 gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-xs font-bold text-slate-900 uppercase truncate">
                        {prod.brand}
                      </span>
                      {prod.colors && prod.colors.length > 0 && (
                        <div className="flex items-center gap-1 shrink-0">
                          {prod.colors.slice(0, 3).map((col, idx) => (
                            <span
                              key={idx}
                              className="w-2.5 h-2.5 rounded-full ring-1 ring-white"
                              style={{ backgroundColor: col.hex }}
                              title={col.name}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="font-body-sm text-xs text-slate-500 truncate" title={prod.name}>
                      {prod.name}
                    </p>
                    <div className="flex items-baseline gap-1.5 mt-0.5 flex-wrap">
                      <span className="font-price-sm text-sm font-bold text-slate-900">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                      <span className="font-body-sm text-xs text-slate-400 line-through">
                        ₹{prod.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="font-label-sm text-xs text-emerald-600 font-bold">
                        {prod.discountPercentage}% OFF
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Infinite Scroll Trigger & Skeleton loader */}
          <div ref={observerTarget} className="w-full py-8 flex flex-col items-center justify-center">
            {isLoadingMore ? (
              <div className="flex items-center gap-3 text-pink-600 font-bold text-sm bg-pink-50 px-6 py-3 rounded-full border border-pink-100 shadow-xs animate-pulse">
                <span className="material-symbols-outlined text-[20px] animate-spin">
                  progress_activity
                </span>
                <span>Loading more handcrafted styles...</span>
              </div>
            ) : (
              <button
                onClick={loadMore}
                className="px-8 py-3 rounded-full bg-slate-900 hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <span>Load More Styles</span>
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Floating Filter Button */}
      <div className="lg:hidden fixed bottom-20 right-4 z-40">
        <button
          className="h-11 px-5 rounded-full bg-pink-600 text-white font-bold text-xs shadow-xl flex items-center gap-2 active:scale-95 transition-all hover:bg-pink-700"
          onClick={() => setIsFilterOpen(true)}
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          <span>FILTERS ({activeFilters.length > 0 ? activeFilters.length : 3})</span>
        </button>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      {isFilterOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-end transition-opacity duration-300"
          onClick={() => setIsFilterOpen(false)}
        >
          <div
            className="w-full bg-white rounded-t-2xl shadow-2xl flex flex-col max-h-[750px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-t-2xl border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-pink-600 text-[20px]">
                  filter_alt
                </span>
                <span className="font-bold text-slate-900 text-sm">Filter Collection</span>
                <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 text-[10px] font-bold">
                  {selectedCategories.length + selectedColors.length + selectedSizes.length} Active
                </span>
              </div>
              <button
                className="w-8 h-8 rounded-full bg-slate-200/60 flex items-center justify-center text-slate-600"
                onClick={() => setIsFilterOpen(false)}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden min-h-[340px]">
              <div className="w-1/3 bg-slate-50 flex flex-col overflow-y-auto">
                {(['category', 'size', 'price', 'color', 'discount', 'fabric'] as const).map(
                  (tab) => (
                    <button
                      key={tab}
                      className={`px-3 py-3 text-left font-bold text-xs uppercase tracking-wider flex items-center justify-between transition-colors ${
                        activeFilterTab === tab
                          ? 'text-pink-600 bg-white border-l-3 border-pink-600'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      onClick={() => setActiveFilterTab(tab)}
                    >
                      <span className="capitalize">{tab}</span>
                    </button>
                  )
                )}
              </div>

              <div className="w-2/3 p-4 overflow-y-auto bg-white">
                {activeFilterTab === 'category' && (
                  <div className="flex flex-col gap-2">
                    {[
                      { name: 'Kurta Sets', count: '5,420' },
                      { name: 'Kurtas & Tunics', count: '3,840' },
                      { name: 'Anarkali Suits', count: '2,310' },
                      { name: 'Lehenga Choli', count: '1,185' },
                      { name: 'Fusion Dresses', count: '940' },
                    ].map((cat) => (
                      <label key={cat.name} className="flex items-center gap-2 py-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.name)}
                          onChange={() => toggleCategory(cat.name)}
                          className="accent-pink-600 w-4 h-4 rounded"
                        />
                        <span className="text-xs font-medium text-slate-800 flex-1">
                          {cat.name}
                        </span>
                        <span className="text-[10px] text-slate-400">{cat.count}</span>
                      </label>
                    ))}
                  </div>
                )}

                {activeFilterTab === 'size' && (
                  <div className="grid grid-cols-3 gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                      <button
                        key={sz}
                        className={`h-10 rounded font-bold text-xs ${
                          selectedSizes.includes(sz)
                            ? 'bg-pink-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                        onClick={() => toggleSize(sz)}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                )}

                {activeFilterTab === 'color' && (
                  <div className="flex flex-col gap-2">
                    {[
                      { name: 'Pink / Magenta', color: 'bg-pink-600' },
                      { name: 'Emerald Green', color: 'bg-emerald-600' },
                      { name: 'Mustard Gold', color: 'bg-amber-400' },
                      { name: 'Soft Peach', color: 'bg-rose-200' },
                      { name: 'Royal Navy', color: 'bg-slate-800' },
                    ].map((col) => (
                      <label key={col.name} className="flex items-center gap-2 py-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(col.name)}
                          onChange={() => toggleColor(col.name)}
                          className="accent-pink-600 w-4 h-4"
                        />
                        <span className={`w-3.5 h-3.5 rounded-full ${col.color}`} />
                        <span className="text-xs font-medium text-slate-800 flex-1">
                          {col.name}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white border-t border-slate-100">
              <button
                className="text-xs uppercase font-bold text-slate-500 hover:text-slate-900"
                onClick={clearAllFilters}
              >
                Reset
              </button>
              <button
                className="h-10 px-6 rounded-full bg-pink-600 text-white text-xs font-bold uppercase tracking-wider shadow-md"
                onClick={() => setIsFilterOpen(false)}
              >
                Apply Filters ({displayProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sort Modal */}
      {isSortOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsSortOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-base text-slate-900">Sort By</span>
              <button
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
                onClick={() => setIsSortOpen(false)}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-1.5">
              {[
                'Popularity',
                "What's New",
                'Customer Rating',
                'Price: Low to High',
                'Price: High to Low',
                'Better Discount',
              ].map((opt) => {
                const isSelected = currentSort === opt;
                return (
                  <button
                    key={opt}
                    className={`flex items-center justify-between p-3 rounded-lg text-xs font-bold transition-colors text-left ${
                      isSelected
                        ? 'bg-pink-50 text-pink-700'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                    onClick={() => {
                      setCurrentSort(opt);
                      setIsSortOpen(false);
                    }}
                  >
                    <span>{opt}</span>
                    {isSelected && (
                      <span className="material-symbols-outlined text-[18px] text-pink-600">
                        check_circle
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
