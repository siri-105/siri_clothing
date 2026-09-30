import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const { setCurrentScreen, showToast, applyCoupon } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    applyCoupon('FIRST200');
    showToast(`Welcome! Coupon FIRST200 applied for ₹200 off.`);
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#161b2d] text-slate-300 pt-16 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Proposition Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-800/50">
            <span className="material-symbols-outlined text-[32px] text-pink-500">
              verified
            </span>
            <div>
              <h4 className="font-bold text-white text-sm">100% Authentic</h4>
              <p className="text-xs text-slate-400">Directly sourced from master weavers</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-800/50">
            <span className="material-symbols-outlined text-[32px] text-emerald-400">
              published_with_changes
            </span>
            <div>
              <h4 className="font-bold text-white text-sm">14-Day Easy Returns</h4>
              <p className="text-xs text-slate-400">Hassle-free doorstep exchanges</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-800/50">
            <span className="material-symbols-outlined text-[32px] text-amber-400">
              local_shipping
            </span>
            <div>
              <h4 className="font-bold text-white text-sm">Express Shipping</h4>
              <p className="text-xs text-slate-400">Next-day dispatch across India</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-800/50">
            <span className="material-symbols-outlined text-[32px] text-cyan-400">
              security
            </span>
            <div>
              <h4 className="font-bold text-white text-sm">100% Secure Payment</h4>
              <p className="text-xs text-slate-400">UPI, Cards, EMI &amp; Cash on Delivery</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <BrandLogo
              variant="light"
              size="lg"
              onClick={() => setCurrentScreen('home')}
            />
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              India&apos;s premier destination for bespoke festive couture, handloom Chanderi silks,
              artisanal Anarkalis, and modern ethnic silhouettes crafted with heirloom heritage.
            </p>

            {/* Newsletter Subscription */}
            <div className="mt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
                Get ₹200 OFF on your first order
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2 mt-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 px-3.5 py-2.5 rounded-lg text-sm text-white placeholder:text-slate-500 outline-none focus:border-pink-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-md shadow-pink-600/30 active:scale-95"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Online Shopping */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Online Shopping
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentScreen('catalog')}
                  className="hover:text-pink-400 transition-colors text-left"
                >
                  Kurtas &amp; Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentScreen('catalog')}
                  className="hover:text-pink-400 transition-colors text-left"
                >
                  Anarkali Suits
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentScreen('catalog')}
                  className="hover:text-pink-400 transition-colors text-left"
                >
                  Lehenga Choli
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentScreen('catalog')}
                  className="hover:text-pink-400 transition-colors text-left"
                >
                  Fusion Maxi Dresses
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentScreen('catalog')}
                  className="hover:text-pink-400 transition-colors text-left"
                >
                  Men&apos;s Silk Kurtas
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentScreen('catalog')}
                  className="hover:text-pink-400 transition-colors text-left"
                >
                  Embroidered Mojaris
                </button>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Customer Policies
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              <li>
                <a href="#contact" className="hover:text-pink-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-pink-400 transition-colors">
                  FAQs &amp; Help Center
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-pink-400 transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#track" className="hover:text-pink-400 transition-colors">
                  Track Your Order
                </a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-pink-400 transition-colors">
                  Shipping &amp; Delivery
                </a>
              </li>
              <li>
                <a href="#returns" className="hover:text-pink-400 transition-colors">
                  Cancellation &amp; Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Experience App & Social */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Experience App
            </h4>
            <p className="text-xs text-slate-400">
              Shop on the go with fast checkout and exclusive mobile drops.
            </p>
            <div className="flex flex-col gap-2 mt-1">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800 border border-slate-700 cursor-pointer hover:border-slate-600 transition-colors">
                <span className="material-symbols-outlined text-[24px] text-white">
                  phone_iphone
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase">Available on</span>
                  <span className="text-xs font-bold text-white">iOS App Store</span>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800 border border-slate-700 cursor-pointer hover:border-slate-600 transition-colors">
                <span className="material-symbols-outlined text-[24px] text-emerald-400">
                  android
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase">Get it on</span>
                  <span className="text-xs font-bold text-white">Google Play</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Payment Methods */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Siri Clothing Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-3 font-semibold text-slate-400">
            <span>UPI</span>
            <span>•</span>
            <span>VISA</span>
            <span>•</span>
            <span>MASTERCARD</span>
            <span>•</span>
            <span>RUPAY</span>
            <span>•</span>
            <span>NET BANKING</span>
            <span>•</span>
            <span>CASH ON DELIVERY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
