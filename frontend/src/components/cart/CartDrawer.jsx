import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer({ onProceedToCheckout }) {
  const {
    cart,
    isDrawerOpen,
    setIsDrawerOpen,
    updateItemQty,
    appliedCoupon,
    applyCoupon,
    couponStatusMsg,
    subtotal,
    totalItemCount,
    tax,
    deliveryFee,
    discount,
    grandTotal
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isDrawerOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
    }
  };

  const scrollToMenu = () => {
    setIsDrawerOpen(false);
    const el = document.getElementById('menu-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 flex justify-end">
      <div className="max-w-md w-full bg-surface-bright shadow-2xl flex flex-col justify-between h-full transform transition-transform duration-300 ease-in-out">

        {/* Header */}
        <div className="p-6 bg-surface-bright border-b border-outline-variant/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">restaurant_menu</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface">Your Selected Dishes</h3>
              <span className="text-xs text-on-surface-variant font-medium">
                {totalItemCount} {totalItemCount === 1 ? 'dish' : 'dishes'} selected
              </span>
            </div>
          </div>
          <button
            className="w-8 h-8 rounded-full hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors cursor-pointer"
            onClick={() => setIsDrawerOpen(false)}
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
          {cart.length === 0 ? (
            <div className="text-center py-14 flex flex-col items-center justify-center text-outline">
              <span className="material-symbols-outlined text-[54px] text-outline-variant">lunch_dining</span>
              <h4 className="font-bold text-sm text-on-surface mt-2">Your Cart is Empty</h4>
              <p className="text-xs mt-1 text-on-surface-variant">Add authentic delicacies from our royal kitchen!</p>
              <button
                className="mt-4 px-4 py-2 rounded-full btn-primary text-xs font-bold cursor-pointer"
                onClick={scrollToMenu}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cart.map((item, idx) => {
              const addonsText = item.selectedAddons && item.selectedAddons.length > 0
                ? item.selectedAddons.map((a) => a.name).join(', ')
                : '';
              const unitPrice = (item.itemTotal / item.qty) || item.price;

              return (
                <div
                  key={`${item.dishId}-${idx}`}
                  className="p-3.5 rounded-2xl bg-surface-container flex flex-col gap-2 border border-outline-variant/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2.5">
                      <span className="veg-badge mt-0.5" title="100% Pure Veg"></span>
                      <div>
                        <h4 className="text-xs font-bold text-on-surface leading-tight">{item.name}</h4>
                        <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] bg-primary/10 text-primary font-semibold px-1.5 py-0.2 rounded">
                            {item.spiceLevel || 'Medium'}
                          </span>
                          {item.isJain && (
                            <span className="text-[10px] bg-tertiary-fixed text-tertiary font-bold px-1.5 py-0.2 rounded">
                              Jain Pure
                            </span>
                          )}
                        </div>
                        {addonsText && (
                          <p className="text-[10px] text-outline mt-0.5">+ {addonsText}</p>
                        )}
                        <span className="text-xs font-extrabold text-primary mt-1 inline-block">
                          ₹{item.itemTotal?.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-outline ml-1">
                          (₹{unitPrice} × {item.qty})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-surface-bright px-2 py-1 rounded-full shadow-sm border border-outline-variant/40 shrink-0">
                      <button
                        onClick={() => updateItemQty(idx, -1)}
                        className="w-6 h-6 rounded-full hover:bg-surface-container font-bold text-sm text-on-surface flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-bold text-xs px-1">{item.qty}</span>
                      <button
                        onClick={() => updateItemQty(idx, 1)}
                        className="w-6 h-6 rounded-full hover:bg-surface-container font-bold text-sm text-on-surface flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Coupon Input */}
        <div className="px-6 py-3 bg-surface-container border-y border-outline-variant/50">
          <form onSubmit={handleApplyCoupon} className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">local_activity</span>
            <input
              className="w-full bg-surface-bright text-xs px-3 py-2 rounded-xl border border-outline-variant text-on-surface placeholder:text-outline uppercase font-bold focus:outline-none focus:border-secondary"
              placeholder="Enter coupon (e.g. GHARKA20)"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-secondary text-white font-bold text-xs rounded-xl hover:bg-secondary/90 transition-all cursor-pointer"
            >
              Apply
            </button>
          </form>
          {couponStatusMsg && (
            <div className={`text-[11px] font-bold mt-1.5 ${couponStatusMsg.type === 'error' ? 'text-primary' : 'text-tertiary'}`}>
              {couponStatusMsg.text}
            </div>
          )}
        </div>

        {/* Pricing Summary & Checkout Button */}
        <div className="p-6 bg-surface-bright border-t border-outline-variant/60 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-on-surface-variant">
            <span>Item Total</span>
            <span className="font-bold text-on-surface">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-on-surface-variant">
            <span>GST &amp; Restaurant Packaging (5%)</span>
            <span className="font-bold text-on-surface">₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-on-surface-variant">
            <span>Doorstep Express Delivery</span>
            <span className="font-bold text-tertiary">
              {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
            </span>
          </div>
          {discount > 0 && (
            <div className="flex items-center justify-between text-xs text-secondary font-bold">
              <span>Coupon Savings ({appliedCoupon})</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-base font-extrabold text-on-surface pt-2 border-t border-outline-variant/50">
            <span>Grand Total</span>
            <span className="text-primary text-xl">₹{grandTotal.toFixed(2)}</span>
          </div>

          <button
            className="w-full mt-2 py-3.5 rounded-xl btn-primary font-bold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            disabled={cart.length === 0}
            onClick={() => {
              setIsDrawerOpen(false);
              onProceedToCheckout();
            }}
          >
            <span>Proceed to Order (Checkout)</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

      </div>
    </div>
  );
}
