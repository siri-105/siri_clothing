import React from 'react';
import { useApp } from '../context/AppContext';
import { ALL_PRODUCTS } from '../data/mockData';
import { generateInfiniteProducts } from '../utils/productGenerator';

export const WishlistScreen: React.FC = () => {
  const { wishlistIds, toggleWishlist, addToCart, setCurrentScreen, setSelectedProduct } = useApp();

  // Combine products from catalog & infinite pool to find all wishlisted items
  const allPool = [...ALL_PRODUCTS, ...generateInfiniteProducts(2, 50)];
  const wishlistedProducts = allPool.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="w-full pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
      <div className="flex items-center justify-between py-4 border-b border-slate-200 mb-6">
        <div className="flex items-baseline gap-2">
          <h1 className="font-headline-sm text-xl sm:text-2xl text-slate-900 font-bold">
            My Wishlist
          </h1>
          <span className="text-xs sm:text-sm text-slate-500 font-medium">
            ({wishlistedProducts.length} item{wishlistedProducts.length !== 1 ? 's' : ''})
          </span>
        </div>
        <button
          className="text-xs font-bold text-pink-600 uppercase hover:underline"
          onClick={() => setCurrentScreen('catalog')}
        >
          Explore More Styles
        </button>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="w-18 h-18 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
            <span className="material-symbols-outlined text-[36px]">favorite_border</span>
          </div>
          <p className="font-headline-sm text-lg text-slate-900 font-bold">
            Your Wishlist is Empty
          </p>
          <p className="text-xs text-slate-500 mt-1 max-w-xs">
            Save items that you love from our infinite festive catalog so you can easily purchase them
            later.
          </p>
          <button
            className="mt-6 px-8 py-3 rounded-full bg-pink-600 text-white font-bold text-xs uppercase shadow-md hover:bg-pink-700 active:scale-95 transition-all"
            onClick={() => setCurrentScreen('catalog')}
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {wishlistedProducts.map((prod) => (
            <div
              key={prod.id}
              className="flex flex-col bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-lg border border-slate-200/80 transition-all duration-300"
            >
              <div
                className="relative aspect-[3/4] w-full bg-slate-100 cursor-pointer overflow-hidden group"
                onClick={() => {
                  setSelectedProduct(prod);
                  setCurrentScreen('pdp');
                }}
              >
                <img
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={prod.image}
                />
                <button
                  aria-label="Remove from Wishlist"
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-500 hover:text-rose-600 active:scale-90 transition-all shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(prod.id);
                  }}
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <div className="p-3.5 flex flex-col gap-1">
                <span className="text-xs font-bold text-slate-900 uppercase truncate">
                  {prod.brand}
                </span>
                <p className="text-xs text-slate-500 truncate" title={prod.name}>
                  {prod.name}
                </p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-sm font-bold text-slate-900">
                    ₹{prod.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-slate-400 line-through">
                    ₹{prod.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-emerald-600 font-bold">
                    {prod.discountPercentage}% OFF
                  </span>
                </div>

                <button
                  className="mt-3 w-full py-2.5 rounded-lg bg-pink-50 hover:bg-pink-600 hover:text-white text-pink-700 text-xs font-bold uppercase flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                  onClick={() => addToCart(prod, 'M')}
                >
                  <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                  Move To Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
