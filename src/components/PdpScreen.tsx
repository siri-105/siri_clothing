import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';

export const PdpScreen: React.FC = () => {
  const {
    selectedProduct,
    setCurrentScreen,
    addToCart,
    isInWishlist,
    toggleWishlist,
    showToast,
  } = useApp();

  const product = selectedProduct;
  const inWishlist = isInWishlist(product.id);

  // Carousel slide index
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Color selection
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || 'Magenta Pink'
  );

  // Size selection
  const [selectedSize, setSelectedSize] = useState('M');

  // Size chart modal
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  // PIN Code check
  const [pincode, setPincode] = useState('560001');
  const [pinStatus, setPinStatus] = useState<string | null>(null);

  // Copied coupon state
  const [couponCopied, setCouponCopied] = useState(false);

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, offsetWidth } = carouselRef.current;
      const index = Math.round(scrollLeft / offsetWidth);
      setCurrentSlideIndex(index);
    }
  };

  const handlePincodeCheck = () => {
    if (pincode.trim().length === 6) {
      setPinStatus('Delivery verified! Express dispatch available within 24 hours.');
      showToast(`Delivery verified for PIN: ${pincode}`);
    } else {
      showToast('Please enter a valid 6-digit PIN code');
    }
  };

  const handleCopyCoupon = () => {
    navigator.clipboard?.writeText('SIRI300');
    setCouponCopied(true);
    showToast('Coupon "SIRI300" copied to clipboard!');
    setTimeout(() => setCouponCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: `Check out this gorgeous ${product.name} on Siri Clothing!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  const handleAddToBag = () => {
    addToCart(product, selectedSize, selectedColor);
  };

  return (
    <div className="w-full pb-28 select-none max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Micro Breadcrumb & Category Bar */}
      <nav className="flex items-center gap-2 py-3 text-secondary text-xs font-medium whitespace-nowrap overflow-x-auto no-scrollbar">
        <button
          className="hover:text-pink-600 transition-colors"
          onClick={() => setCurrentScreen('home')}
        >
          Home
        </button>
        <span className="text-slate-300">/</span>
        <button
          className="hover:text-pink-600 transition-colors"
          onClick={() => setCurrentScreen('catalog')}
        >
          Women
        </button>
        <span className="text-slate-300">/</span>
        <button
          className="hover:text-pink-600 transition-colors"
          onClick={() => setCurrentScreen('catalog')}
        >
          Ethnic Wear
        </button>
        <span className="text-slate-300">/</span>
        <button
          className="hover:text-pink-600 transition-colors"
          onClick={() => setCurrentScreen('catalog')}
        >
          Kurta Sets
        </button>
        <span className="text-slate-300">/</span>
        <span className="text-slate-900 font-bold truncate">{product.brand}</span>
      </nav>

      {/* Main 2-Column Responsive Layout for Website & Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Showcase / Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-4">
          {/* Desktop Thumbnail Rail */}
          <div className="hidden lg:flex flex-col gap-3 shrink-0 w-20">
            {images.map((imgSrc, idx) => (
              <button
                key={idx}
                className={`w-20 h-28 rounded-lg overflow-hidden border-2 transition-all ${
                  currentSlideIndex === idx
                    ? 'border-pink-600 ring-2 ring-pink-600/30'
                    : 'border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100'
                }`}
                onClick={() => {
                  setCurrentSlideIndex(idx);
                  if (carouselRef.current) {
                    carouselRef.current.scrollTo({
                      left: idx * carouselRef.current.offsetWidth,
                      behavior: 'smooth',
                    });
                  }
                }}
              >
                <img
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover object-top"
                  src={imgSrc}
                />
              </button>
            ))}
          </div>

          {/* Main Visual Display */}
          <div className="flex-1 relative aspect-[3/4] bg-slate-100 rounded-2xl overflow-hidden shadow-sm">
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
            >
              {images.map((imgSrc, idx) => (
                <div key={idx} className="min-w-full h-full snap-start relative">
                  <img
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover object-top"
                    src={imgSrc}
                  />
                </div>
              ))}
            </div>

            {/* Floating Badges */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <button
                aria-label="Share Product"
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-slate-800 hover:text-pink-600 active:scale-95 transition-all"
                onClick={handleShare}
              >
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
              <button
                aria-label="Save to Wishlist"
                className={`w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center active:scale-90 transition-all ${
                  inWishlist ? 'text-pink-600' : 'text-slate-800 hover:text-pink-600'
                }`}
                onClick={() => toggleWishlist(product.id)}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{
                    fontVariationSettings: inWishlist
                      ? "'FILL' 1, 'wght' 600, 'opsz' 24"
                      : "'FILL' 0, 'wght' 400, 'opsz' 24",
                  }}
                >
                  favorite
                </span>
              </button>
            </div>

            {/* Slide Counter Badge */}
            <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm text-white font-label-sm text-xs flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-[14px]">photo_camera</span>
              <span>
                {currentSlideIndex + 1}/{images.length}
              </span>
            </div>

            {/* Social Proof Rating Badge */}
            <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center gap-1.5">
              <span className="font-headline-sm text-sm text-slate-900 font-bold">
                {product.rating}
              </span>
              <span
                className="material-symbols-outlined text-[16px] text-amber-500"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="text-slate-300 text-xs">|</span>
              <span className="font-body-sm text-xs text-slate-500 font-medium">
                {product.ratingCount || '1,428'} Ratings
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="lg:col-span-5 flex flex-col gap-5 bg-white lg:p-6 rounded-2xl lg:border lg:border-slate-200/80 lg:shadow-xs">
          {/* Brand Row */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-label-md text-sm uppercase tracking-wider text-slate-900 font-extrabold">
                  {product.brand}
                </span>
                <span
                  className="material-symbols-outlined text-pink-600 text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold tracking-wide">
                BESTSELLER
              </span>
            </div>

            <h1 className="mt-2 font-headline-sm text-lg sm:text-xl text-slate-900 font-bold leading-snug">
              {product.name}
            </h1>

            {/* Pricing */}
            <div className="mt-3 flex items-baseline gap-3 flex-wrap">
              <span className="font-price-lg text-2xl sm:text-3xl font-extrabold text-slate-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-base text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-pink-600 text-white font-bold text-xs uppercase tracking-tight">
                {product.discountPercentage}% OFF
              </span>
            </div>
            <p className="mt-1 text-xs text-emerald-700 font-semibold">
              Inclusive of all taxes • Free Express Shipping on this order
            </p>
          </div>

          {/* Desktop Direct Action Buttons */}
          <div className="hidden lg:flex items-center gap-4 pt-2">
            <button
              className="flex-1 h-13 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-pink-600/25 active:scale-98 transition-all"
              onClick={handleAddToBag}
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              <span>Add To Bag</span>
            </button>
            <button
              className={`h-13 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${
                inWishlist
                  ? 'border-pink-600 bg-pink-50 text-pink-700'
                  : 'border-slate-300 text-slate-700 hover:border-slate-400 bg-white'
              }`}
              onClick={() => toggleWishlist(product.id)}
            >
              <span
                className="material-symbols-outlined text-[20px] text-pink-600"
                style={{
                  fontVariationSettings: inWishlist
                    ? "'FILL' 1, 'wght' 600, 'opsz' 20"
                    : "'FILL' 0, 'wght' 400, 'opsz' 20",
                }}
              >
                favorite
              </span>
              <span>{inWishlist ? 'Wishlisted' : 'Save'}</span>
            </button>
          </div>

          {/* Coupon Offers */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-pink-600 text-[18px]">
                  local_offer
                </span>
                Best Available Offer
              </span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                SPECIAL
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-slate-900">Flat ₹300 OFF</span>
                <span className="ml-2 font-mono text-xs bg-slate-200 px-1.5 py-0.5 rounded font-bold">
                  SIRI300
                </span>
                <p className="text-xs text-slate-500 mt-0.5">On minimum cart value of ₹1,999</p>
              </div>
              <button
                className="px-4 py-1.5 rounded-full bg-pink-600 text-white text-xs font-bold shrink-0 uppercase active:scale-95 shadow-2xs"
                onClick={handleCopyCoupon}
              >
                {couponCopied ? 'COPIED!' : 'COPY'}
              </button>
            </div>
          </div>

          {/* Color Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase">Color:</span>
              <span className="text-xs font-bold text-pink-600">{selectedColor}</span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((c) => {
                const isSelected = selectedColor === c.name;
                return (
                  <button
                    key={c.name}
                    aria-label={`Select ${c.name}`}
                    className={`relative w-10 h-10 rounded-full p-0.5 ring-offset-2 transition-transform active:scale-95 ${
                      isSelected ? 'ring-2 ring-pink-600' : 'ring-transparent'
                    }`}
                    onClick={() => {
                      setSelectedColor(c.name);
                      showToast(`Selected color: ${c.name}`);
                    }}
                  >
                    <span
                      className="block w-full h-full rounded-full shadow-inner"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-baseline gap-1">
                <span className="text-xs font-bold text-slate-700 uppercase">Select Size:</span>
                <span className="text-[11px] text-slate-400">(Standard UK/IN)</span>
              </div>
              <button
                className="text-pink-600 font-bold text-xs uppercase underline"
                onClick={() => setIsSizeChartOpen(true)}
              >
                Size Chart
              </button>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((s) => {
                const isSelected = selectedSize === s.size;
                if (!s.available) {
                  return (
                    <button
                      key={s.size}
                      disabled
                      className="h-11 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs relative overflow-hidden cursor-not-allowed"
                    >
                      <span>{s.size}</span>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-full h-0.5 bg-slate-300 rotate-45" />
                      </span>
                    </button>
                  );
                }

                return (
                  <div key={s.size} className="relative flex flex-col items-center">
                    {s.stock <= 3 && s.stock > 0 && (
                      <span className="absolute -top-2 px-1 rounded-full bg-amber-500 text-white text-[8px] font-extrabold tracking-tighter whitespace-nowrap z-10">
                        {s.stock} LEFT
                      </span>
                    )}
                    <button
                      className={`w-full h-11 rounded-xl font-bold text-xs transition-all active:scale-95 ${
                        isSelected
                          ? 'bg-pink-600 text-white shadow-md'
                          : 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-50'
                      }`}
                      onClick={() => setSelectedSize(s.size)}
                    >
                      {s.size}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery & PIN Checker */}
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-700 uppercase mb-2 block">
              Delivery Options
            </span>
            <div className="flex items-center rounded-xl bg-slate-100 px-3 py-1 border border-slate-200 focus-within:border-pink-600">
              <input
                className="w-full bg-transparent text-sm py-1.5 outline-none font-medium text-slate-800"
                maxLength={6}
                placeholder="Enter 6-digit delivery PIN"
                type="tel"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              <button
                className="text-xs font-bold text-pink-600 uppercase px-2 hover:opacity-80 transition-opacity"
                onClick={handlePincodeCheck}
              >
                Check
              </button>
            </div>
            {pinStatus && (
              <p className="text-xs text-emerald-700 font-semibold mt-2 bg-emerald-50 p-2 rounded-lg">
                {pinStatus}
              </p>
            )}
            <div className="flex flex-col gap-1.5 mt-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">
                  local_shipping
                </span>
                <span>Get it by Thursday, 24 Oct (Express Shipping)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">
                  payments
                </span>
                <span>Cash on Delivery Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">
                  published_with_changes
                </span>
                <span>14-Day Easy Return &amp; Exchange Guarantee</span>
              </div>
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 mb-3">
              Product Specifications &amp; Care
            </h3>
            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-400">Fabric</span>
                <p className="font-semibold text-xs text-slate-800 mt-0.5">
                  {product.fabric || 'Pure Chanderi Silk'}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-400">Weave Type</span>
                <p className="font-semibold text-xs text-slate-800 mt-0.5">
                  {product.weaveType || 'Handloom Art'}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-400">Ornamentation</span>
                <p className="font-semibold text-xs text-slate-800 mt-0.5">
                  {product.ornamentation || 'Zari & Thread Work'}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-400">Wash Care</span>
                <p className="font-semibold text-xs text-slate-800 mt-0.5">
                  {product.washCare || 'Dry Clean Only'}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mt-4 pt-3 border-t border-slate-100">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Size Chart Modal */}
      {isSizeChartOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsSizeChartOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-base text-slate-900">Size Guide (Inches)</span>
              <button
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                onClick={() => setIsSizeChartOpen(false)}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-2.5">Size</th>
                    <th className="py-2.5">Bust (in)</th>
                    <th className="py-2.5">Waist (in)</th>
                    <th className="py-2.5">Hip (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2 font-bold">XS</td>
                    <td>32</td>
                    <td>26</td>
                    <td>36</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold">S</td>
                    <td>34</td>
                    <td>28</td>
                    <td>38</td>
                  </tr>
                  <tr className="bg-pink-50 font-bold text-pink-700">
                    <td className="py-2">M</td>
                    <td>36</td>
                    <td>30</td>
                    <td>40</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold">L</td>
                    <td>38</td>
                    <td>32</td>
                    <td>42</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold">XL</td>
                    <td>40</td>
                    <td>34</td>
                    <td>44</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold">XXL</td>
                    <td>42</td>
                    <td>36</td>
                    <td>46</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              className="w-full mt-5 py-2.5 rounded-xl bg-pink-600 text-white font-bold text-xs uppercase"
              onClick={() => setIsSizeChartOpen(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Mobile Fixed Bottom Sticky Action Dock */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl px-4 py-3 pb-safe shadow-[0_-4px_16px_rgba(22,27,45,0.08)] border-t border-slate-100">
        <div className="flex items-center gap-3">
          <button
            className={`w-[38%] h-12 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-transform ${
              inWishlist
                ? 'bg-pink-100 text-pink-700'
                : 'bg-slate-100 text-slate-800'
            }`}
            onClick={() => toggleWishlist(product.id)}
          >
            <span
              className="material-symbols-outlined text-[20px] text-pink-600"
              style={{
                fontVariationSettings: inWishlist
                  ? "'FILL' 1, 'wght' 600, 'opsz' 20"
                  : "'FILL' 0, 'wght' 400, 'opsz' 20",
              }}
            >
              favorite
            </span>
            <span>{inWishlist ? 'Wishlisted' : 'Wishlist'}</span>
          </button>

          <button
            className="w-[62%] h-12 rounded-xl bg-pink-600 text-white font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-pink-600/25 active:scale-95 transition-transform"
            onClick={handleAddToBag}
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            <span>Add To Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
