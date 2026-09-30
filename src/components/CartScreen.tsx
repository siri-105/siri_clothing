import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AVAILABLE_COUPONS } from '../data/mockData';
import { Address } from '../types';

export const CartScreen: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    updateCartItemQty,
    updateCartItemSize,
    moveCartItemToWishlist,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    selectedAddress,
    setSelectedAddress,
    addresses,
    addAddress,
    setCurrentScreen,
    placeOrder,
  } = useApp();

  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [selectedPayment, setSelectedPayment] = useState<'UPI' | 'Cards' | 'Banking' | 'COD'>('UPI');
  const [isCouponsModalOpen, setIsCouponsModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');
  const [couponInput, setCouponInput] = useState('');

  // New address form state
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddrName, setNewAddrName] = useState('Priya Sharma');
  const [newAddrPincode, setNewAddrPincode] = useState('560034');
  const [newAddrLine, setNewAddrLine] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('Bengaluru');
  const [newAddrState, setNewAddrState] = useState('Karnataka');
  const [newAddrPhone, setNewAddrPhone] = useState('+91 98765 43210');

  // Math calculations
  const totalMrp = cartItems.reduce(
    (acc, item) => acc + item.product.originalPrice * item.quantity,
    0
  );
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discountOnMrp = totalMrp - subtotal;
  const couponDiscount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const totalAmount = Math.max(0, subtotal - couponDiscount);
  const totalSavings = discountOnMrp + couponDiscount;
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handlePlaceOrder = () => {
    if (activeStep === 1) {
      setActiveStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (activeStep === 2) {
      setActiveStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const orderId = placeOrder();
      setConfirmedOrderId(orderId);
      setIsOrderPlaced(true);
    }
  };

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrLine || !newAddrPincode) return;

    const newAddr: Address = {
      id: 'addr-' + Date.now(),
      name: newAddrName,
      pincode: newAddrPincode,
      addressLine: newAddrLine,
      city: newAddrCity,
      state: newAddrState,
      phone: newAddrPhone,
      isDefault: true,
    };
    addAddress(newAddr);
    setShowNewAddressForm(false);
    setIsAddressModalOpen(false);
  };

  if (isOrderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center max-w-lg mx-auto select-none">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
          <span className="material-symbols-outlined text-[42px]">check_circle</span>
        </div>
        <span className="font-headline-lg text-2xl sm:text-3xl text-slate-900 font-extrabold">
          Order Placed Successfully!
        </span>
        <p className="text-sm text-slate-500 mt-2">
          Thank you for choosing Siri Clothing. Your celebration wardrobe is on its way.
        </p>

        <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mt-6 text-left shadow-xs">
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
            <span className="text-xs uppercase font-bold text-slate-500">Order ID</span>
            <span className="font-mono font-bold text-pink-600">{confirmedOrderId}</span>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-slate-200">
            <span className="text-xs uppercase font-bold text-slate-500">Estimated Delivery</span>
            <span className="text-sm font-bold text-slate-800">Tomorrow by 7:00 PM</span>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-slate-200">
            <span className="text-xs uppercase font-bold text-slate-500">Delivery Address</span>
            <span className="text-xs text-slate-800 font-medium truncate max-w-[200px]">
              {selectedAddress.name}, {selectedAddress.pincode}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2.5">
            <span className="text-xs uppercase font-bold text-slate-500">Payment Status</span>
            <span className="text-xs font-bold text-emerald-600">
              {selectedPayment} (Payment Verified)
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full gap-3 mt-8">
          <button
            className="flex-1 py-3.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase shadow-md active:scale-95 transition-all"
            onClick={() => {
              setIsOrderPlaced(false);
              setActiveStep(1);
              setCurrentScreen('home');
            }}
          >
            Continue Shopping
          </button>
          <button
            className="flex-1 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold text-xs uppercase hover:bg-slate-50 transition-colors"
            onClick={() => {
              setIsOrderPlaced(false);
              setActiveStep(1);
              setCurrentScreen('catalog');
            }}
          >
            Explore Kurtas &amp; Sets
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center max-w-lg mx-auto select-none">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
          <span className="material-symbols-outlined text-[40px]">shopping_bag</span>
        </div>
        <h2 className="font-headline-sm text-xl text-slate-900 font-bold">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-xs">
          Explore our trending festive handcrafted Kurtas, Anarkalis &amp; Lehengas.
        </p>
        <button
          className="mt-6 px-8 py-3.5 rounded-full bg-pink-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-pink-700 active:scale-95 transition-all"
          onClick={() => setCurrentScreen('catalog')}
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="w-full pb-32 select-none max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Stepper Header Navigation */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs py-4 px-6 mb-6">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {/* Step 1 */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActiveStep(1)}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                activeStep === 1
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'bg-pink-100 text-pink-700'
              }`}
            >
              1
            </span>
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                activeStep === 1 ? 'text-pink-600' : 'text-slate-700'
              }`}
            >
              Bag
            </span>
          </div>

          <div
            className={`h-0.5 flex-1 mx-4 transition-colors ${
              activeStep >= 2 ? 'bg-pink-600' : 'bg-slate-200'
            }`}
          />

          {/* Step 2 */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActiveStep(2)}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                activeStep === 2
                  ? 'bg-pink-600 text-white shadow-xs'
                  : activeStep > 2
                  ? 'bg-pink-100 text-pink-700'
                  : 'bg-slate-200 text-slate-500'
              }`}
            >
              2
            </span>
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                activeStep === 2
                  ? 'text-pink-600'
                  : activeStep > 2
                  ? 'text-slate-700'
                  : 'text-slate-400'
              }`}
            >
              Address
            </span>
          </div>

          <div
            className={`h-0.5 flex-1 mx-4 transition-colors ${
              activeStep === 3 ? 'bg-pink-600' : 'bg-slate-200'
            }`}
          />

          {/* Step 3 */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActiveStep(3)}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                activeStep === 3
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'bg-slate-200 text-slate-500'
              }`}
            >
              3
            </span>
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                activeStep === 3 ? 'text-pink-600' : 'text-slate-400'
              }`}
            >
              Payment
            </span>
          </div>
        </div>
      </div>

      {/* 2-Column Responsive Layout for Website */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Items, Address, Policies) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Delivery Address Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[20px]">location_on</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-slate-800">
                    Deliver to:{' '}
                    <strong className="text-slate-900 font-bold">{selectedAddress.name}</strong>,{' '}
                    {selectedAddress.pincode}
                  </span>
                  {selectedAddress.isDefault && (
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {selectedAddress.addressLine}, {selectedAddress.city}, {selectedAddress.state}
                </p>
                <div className="flex items-center gap-1.5 mt-2 text-emerald-700 text-xs font-semibold">
                  <span className="material-symbols-outlined text-[15px]">local_shipping</span>
                  <span>Express Delivery by tomorrow evening</span>
                </div>
              </div>
            </div>
            <button
              className="shrink-0 bg-pink-50 hover:bg-pink-100 text-pink-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase active:scale-95 transition-all"
              onClick={() => setIsAddressModalOpen(true)}
            >
              Change
            </button>
          </div>

          {/* Savings Notification Banner */}
          <div className="bg-emerald-50 border border-emerald-200/80 p-3.5 rounded-xl flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px]">celebration</span>
            </div>
            <p className="text-xs text-emerald-900 flex-1">
              Yay! You&apos;re saving{' '}
              <strong className="text-emerald-700 font-bold">
                ₹{totalSavings.toLocaleString('en-IN')}
              </strong>{' '}
              on this shopping bag.
            </p>
          </div>

          {/* Cart Items List */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Items in Bag ({totalItemCount})
              </span>
              <span className="text-xs text-slate-500">
                Subtotal: ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col gap-3 relative overflow-hidden"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-32 rounded-xl bg-slate-100 overflow-hidden shrink-0 relative">
                    <img
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      src={item.product.image}
                    />
                    <span className="absolute bottom-1 left-1 bg-white/90 backdrop-blur-sm text-pink-700 text-[9px] px-1 py-0.5 rounded font-bold uppercase shadow-2xs">
                      {item.product.id.includes('chanderi') ? 'SILK BLEND' : 'ANGRAKHA'}
                    </span>
                  </div>

                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-bold text-pink-600 uppercase tracking-wider">
                          {item.product.brand}
                        </p>
                        <h2 className="text-sm font-semibold text-slate-800 line-clamp-1">
                          {item.product.name}
                        </h2>
                      </div>
                      <button
                        aria-label="Remove item"
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                      </button>
                    </div>

                    {/* Attributes Dropdowns */}
                    <div className="flex items-center gap-3 mt-2.5">
                      <div className="relative bg-slate-100 px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer">
                        <span className="text-[11px] text-slate-500">Size:</span>
                        <select
                          className="text-xs text-slate-900 font-bold bg-transparent border-none outline-none appearance-none cursor-pointer pr-3"
                          value={item.size}
                          onChange={(e) => updateCartItemSize(item.id, e.target.value)}
                        >
                          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                            <option key={sz} value={sz}>
                              {sz}
                            </option>
                          ))}
                        </select>
                        <span className="material-symbols-outlined text-[14px] text-slate-500 pointer-events-none -ml-3">
                          arrow_drop_down
                        </span>
                      </div>

                      <div className="relative bg-slate-100 px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer">
                        <span className="text-[11px] text-slate-500">Qty:</span>
                        <select
                          className="text-xs text-slate-900 font-bold bg-transparent border-none outline-none appearance-none cursor-pointer pr-3"
                          value={item.quantity}
                          onChange={(e) => updateCartItemQty(item.id, Number(e.target.value))}
                        >
                          {[1, 2, 3, 4, 5].map((q) => (
                            <option key={q} value={q}>
                              {q}
                            </option>
                          ))}
                        </select>
                        <span className="material-symbols-outlined text-[14px] text-slate-500 pointer-events-none -ml-3">
                          arrow_drop_down
                        </span>
                      </div>
                    </div>

                    {/* Price Row */}
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-sm font-bold text-slate-900">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-emerald-600 font-bold">
                        {item.product.discountPercentage}% OFF
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1 text-slate-500 text-[11px]">
                      <span className="material-symbols-outlined text-[14px] text-emerald-600">
                        assignment_return
                      </span>
                      <span>14 days return available • Express delivery</span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center pt-2 mt-1 border-t border-slate-100 justify-around text-xs font-bold text-slate-600 uppercase">
                  <button
                    className="flex items-center gap-1 hover:text-pink-600 transition-colors"
                    onClick={() => moveCartItemToWishlist(item.id)}
                  >
                    <span className="material-symbols-outlined text-[16px]">favorite</span>
                    Move to Wishlist
                  </button>
                  <span className="w-px h-3.5 bg-slate-200" />
                  <button
                    className="flex items-center gap-1 hover:text-rose-600 transition-colors"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-center">
            <div className="flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-[20px] text-pink-600">
                verified_user
              </span>
              <span className="text-xs font-bold text-slate-800">100% Genuine</span>
              <span className="text-[10px] text-slate-500">Directly from Brands</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-[20px] text-emerald-600">
                published_with_changes
              </span>
              <span className="text-xs font-bold text-slate-800">Easy Returns</span>
              <span className="text-[10px] text-slate-500">14-Day Guarantee</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-[20px] text-amber-600">lock</span>
              <span className="text-xs font-bold text-slate-800">Secure Payments</span>
              <span className="text-[10px] text-slate-500">256-Bit SSL Encrypted</span>
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Summary & Payment (Sticky on Desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-6 sticky top-28">
          {/* Coupons & Offers Box */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-pink-600 text-[18px]">
                  local_offer
                </span>
                Coupons &amp; Offers
              </span>
              {appliedCoupon && (
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  1 Applied
                </span>
              )}
            </div>

            {appliedCoupon ? (
              <div className="bg-emerald-50 border border-emerald-200/60 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-900">
                      {appliedCoupon.code}
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-200/80 text-emerald-900 px-1.5 py-0.5 rounded">
                      SAVED ₹{appliedCoupon.discountAmount}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    {appliedCoupon.description}
                  </p>
                </div>
                <button
                  className="text-xs font-bold text-rose-600 hover:text-rose-800 uppercase px-2 py-1"
                  onClick={removeCoupon}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  className="flex-1 bg-slate-100 px-3.5 py-2 rounded-xl text-xs font-mono uppercase outline-none"
                />
                <button
                  className="px-4 py-2 bg-pink-600 text-white rounded-xl text-xs font-bold uppercase hover:bg-pink-700 transition-colors"
                  onClick={() => {
                    if (couponInput) applyCoupon(couponInput);
                    setCouponInput('');
                  }}
                >
                  Apply
                </button>
              </div>
            )}

            <button
              className="w-full mt-3 text-left flex items-center justify-between text-pink-600 font-bold text-xs hover:underline"
              onClick={() => setIsCouponsModalOpen(true)}
            >
              <span>View 4 more available coupons</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          {/* Payment Methods Quick Selector */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-3">
              Payment Method
            </span>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'UPI', icon: 'account_balance_wallet', label: 'UPI' },
                { id: 'Cards', icon: 'credit_card', label: 'Cards' },
                { id: 'Banking', icon: 'account_balance', label: 'Banking' },
                { id: 'COD', icon: 'payments', label: 'COD' },
              ].map((p) => {
                const isSelected = selectedPayment === p.id;
                return (
                  <button
                    key={p.id}
                    className={`p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 border transition-all ${
                      isSelected
                        ? 'border-pink-600 bg-pink-50 text-pink-700 shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                    onClick={() => setSelectedPayment(p.id as any)}
                  >
                    <span className="material-symbols-outlined text-[20px]">{p.icon}</span>
                    <span className="text-xs font-bold">{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Breakdown Details */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100">
              Price Details ({totalItemCount} Items)
            </span>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Total MRP</span>
              <span className="text-slate-900 font-medium">
                ₹{totalMrp.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Discount on MRP</span>
              <span className="text-emerald-600 font-bold">
                -₹{discountOnMrp.toLocaleString('en-IN')}
              </span>
            </div>

            {appliedCoupon && (
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Coupon Discount ({appliedCoupon.code})</span>
                <span className="text-emerald-600 font-bold">
                  -₹{appliedCoupon.discountAmount}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Platform Convenience Fee</span>
              <span className="text-emerald-600 font-bold uppercase">FREE</span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Delivery Fee</span>
              <span className="text-emerald-600 font-bold uppercase">FREE</span>
            </div>

            <div className="h-px bg-slate-100 my-1" />

            <div className="flex items-center justify-between text-slate-900">
              <span className="font-bold text-base">Total Amount</span>
              <span className="font-extrabold text-2xl text-slate-900">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="bg-amber-50 border border-amber-200/60 p-2.5 rounded-xl text-center">
              <span className="text-xs font-bold text-amber-900 tracking-wide">
                🌟 TOTAL SAVINGS ON THIS PURCHASE: ₹{totalSavings.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Desktop Place Order Button */}
            <button
              className="w-full mt-2 py-4 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-pink-600/25 active:scale-98 transition-all flex items-center justify-center gap-2"
              onClick={handlePlaceOrder}
            >
              <span>
                {activeStep === 1
                  ? 'Place Order'
                  : activeStep === 2
                  ? 'Confirm Delivery Address'
                  : `Pay ₹${totalAmount.toLocaleString('en-IN')} via ${selectedPayment}`}
              </span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-[0_-4px_16px_rgba(22,27,45,0.08)] pb-safe border-t border-slate-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-slate-900">
              ₹{totalAmount.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-pink-600 font-bold uppercase">
              Savings: ₹{totalSavings.toLocaleString('en-IN')}
            </span>
          </div>
          <button
            className="bg-pink-600 text-white font-bold px-6 py-3 rounded-xl shadow-md flex items-center gap-2 active:scale-98 text-xs uppercase tracking-wider"
            onClick={handlePlaceOrder}
          >
            <span>{activeStep === 1 ? 'Place Order' : 'Proceed'}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Available Coupons Modal */}
      {isCouponsModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsCouponsModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-base text-slate-900">Available Coupons</span>
              <button
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                onClick={() => setIsCouponsModalOpen(false)}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-1">
              {AVAILABLE_COUPONS.map((cpn) => {
                const isSelected = appliedCoupon?.code === cpn.code;
                return (
                  <div
                    key={cpn.code}
                    className={`p-3.5 rounded-xl border flex items-center justify-between ${
                      isSelected ? 'border-pink-600 bg-pink-50/50' : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-slate-900">
                          {cpn.code}
                        </span>
                        <span className="text-emerald-700 font-bold text-xs bg-emerald-100 px-2 py-0.5 rounded">
                          Save ₹{cpn.discountAmount}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{cpn.description}</p>
                    </div>
                    <button
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
                        isSelected
                          ? 'bg-slate-300 text-slate-700'
                          : 'bg-pink-600 text-white hover:bg-pink-700'
                      }`}
                      onClick={() => {
                        if (isSelected) removeCoupon();
                        else applyCoupon(cpn.code);
                        setIsCouponsModalOpen(false);
                      }}
                    >
                      {isSelected ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Address Selection / Add Modal */}
      {isAddressModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsAddressModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-base text-slate-900">
                {showNewAddressForm ? 'Add New Address' : 'Select Delivery Address'}
              </span>
              <button
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                onClick={() => {
                  setShowNewAddressForm(false);
                  setIsAddressModalOpen(false);
                }}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {!showNewAddressForm ? (
              <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
                {addresses.map((addr) => {
                  const isCurrent = selectedAddress.id === addr.id;
                  return (
                    <div
                      key={addr.id}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isCurrent
                          ? 'border-pink-600 bg-pink-50/40 ring-1 ring-pink-600/30'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                      onClick={() => {
                        setSelectedAddress(addr);
                        setIsAddressModalOpen(false);
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-slate-900 text-sm">{addr.name}</span>
                        {addr.isDefault && (
                          <span className="bg-pink-600 text-white text-[9px] px-2 py-0.5 rounded font-bold uppercase">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 text-xs mt-1">{addr.addressLine}</p>
                      <p className="text-slate-600 text-xs">
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-slate-400 text-[11px] mt-1 font-mono">{addr.phone}</p>
                    </div>
                  );
                })}

                <button
                  className="mt-2 py-3 rounded-xl border-2 border-dashed border-pink-500 text-pink-600 font-bold text-xs uppercase flex items-center justify-center gap-1.5 hover:bg-pink-50 transition-colors"
                  onClick={() => setShowNewAddressForm(true)}
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Add New Delivery Address
                </button>
              </div>
            ) : (
              <form onSubmit={handleSaveNewAddress} className="flex flex-col gap-3">
                <div>
                  <label className="text-xs text-slate-600 font-medium">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newAddrName}
                    onChange={(e) => setNewAddrName(e.target.value)}
                    className="w-full bg-slate-100 px-3.5 py-2 rounded-lg text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-600 font-medium">PIN Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={newAddrPincode}
                    onChange={(e) => setNewAddrPincode(e.target.value)}
                    className="w-full bg-slate-100 px-3.5 py-2 rounded-lg text-sm outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-600 font-medium">Street Address / Flat</label>
                  <textarea
                    required
                    rows={2}
                    value={newAddrLine}
                    onChange={(e) => setNewAddrLine(e.target.value)}
                    className="w-full bg-slate-100 px-3.5 py-2 rounded-lg text-sm outline-none"
                    placeholder="House/Flat No., Building, Street Area"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-600 font-medium">City</label>
                    <input
                      type="text"
                      required
                      value={newAddrCity}
                      onChange={(e) => setNewAddrCity(e.target.value)}
                      className="w-full bg-slate-100 px-3.5 py-2 rounded-lg text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 font-medium">State</label>
                    <input
                      type="text"
                      required
                      value={newAddrState}
                      onChange={(e) => setNewAddrState(e.target.value)}
                      className="w-full bg-slate-100 px-3.5 py-2 rounded-lg text-sm outline-none"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-3">
                  <button
                    type="button"
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs uppercase"
                    onClick={() => setShowNewAddressForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-pink-600 text-white font-bold text-xs uppercase"
                  >
                    Save &amp; Use
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
