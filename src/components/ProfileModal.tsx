import React from 'react';
import { useApp } from '../context/AppContext';
import { USER_AVATAR_URL } from '../data/mockData';

export const ProfileModal: React.FC = () => {
  const { isProfileOpen, setIsProfileOpen, orders, addresses, selectedAddress } = useApp();

  if (!isProfileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={() => setIsProfileOpen(false)}
    >
      <div
        className="w-full max-w-sm bg-surface-container-lowest rounded-2xl p-space-md shadow-2xl flex flex-col gap-4 select-none max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <span className="font-headline-sm text-title-md text-on-surface">My Account</span>
          <button
            className="w-7 h-7 rounded-full bg-surface-container-low flex items-center justify-center text-secondary"
            onClick={() => setIsProfileOpen(false)}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-low">
          <img
            alt="Priya Sharma"
            className="w-14 h-14 rounded-full object-cover ring-2 ring-primary"
            src={USER_AVATAR_URL}
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-base text-on-surface font-bold">
              Priya Sharma
            </span>
            <span className="text-xs text-secondary">gangaraboinasiri@gmail.com</span>
            <span className="text-[11px] text-tertiary font-bold mt-0.5">Siri Gold Member ★</span>
          </div>
        </div>

        {/* Siri Cash Wallet */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-primary-fixed/30 border border-primary/20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">
              account_balance_wallet
            </span>
            <div>
              <p className="font-bold text-xs text-on-surface">Siri Wallet Cash</p>
              <p className="text-[11px] text-secondary">Instant checkout &amp; cashbacks</p>
            </div>
          </div>
          <span className="font-price-sm text-primary font-extrabold">₹100</span>
        </div>

        {/* Recent Orders */}
        <div className="flex flex-col gap-2">
          <span className="font-label-md text-xs uppercase text-secondary font-bold">
            Recent Orders ({orders.length})
          </span>
          {orders.length === 0 ? (
            <p className="text-xs text-secondary bg-surface-container-low p-3 rounded-xl text-center">
              No orders yet. Place your first order to get ₹100 cashback!
            </p>
          ) : (
            orders.map((ord) => (
              <div key={ord.id} className="p-3 rounded-xl border border-surface-container bg-surface-container-low text-xs">
                <div className="flex justify-between font-bold text-on-surface">
                  <span>Order #{ord.id}</span>
                  <span className="text-tertiary font-semibold">Confirmed</span>
                </div>
                <p className="text-secondary text-[11px] mt-0.5">Placed on {ord.date}</p>
                <div className="flex justify-between items-center mt-2 pt-1 border-t border-surface-container">
                  <span className="text-secondary">{ord.items.length} item(s)</span>
                  <span className="font-bold text-primary">₹{ord.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Saved Addresses Summary */}
        <div className="flex flex-col gap-2">
          <span className="font-label-md text-xs uppercase text-secondary font-bold">
            Saved Address
          </span>
          <div className="p-3 rounded-xl bg-surface-container-low text-xs">
            <p className="font-bold text-on-surface">{selectedAddress.name}</p>
            <p className="text-secondary mt-0.5">{selectedAddress.addressLine}</p>
            <p className="text-secondary">
              {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
            </p>
          </div>
        </div>

        <button
          className="w-full py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-xs font-bold uppercase tracking-wider"
          onClick={() => setIsProfileOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};
