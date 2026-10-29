import React from 'react';
import { useCart } from '../../context/CartContext';

export default function OffersBento() {
  const { applyCoupon, setIsDrawerOpen } = useCart();

  const handleApply = (code) => {
    applyCoupon(code);
    setIsDrawerOpen(true);
  };

  return (
    <section className="w-full py-12 bg-[#FDFBF7]" id="offers-section">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-7">
          <div>
            <span className="text-xs font-bold text-[#D9531E] uppercase tracking-wider">Aapke Parivaar Ke Liye</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1916]">Special Offers &amp; Combos</h2>
          </div>
          <span className="text-xs text-[#1C6B38] font-bold flex items-center gap-1.5 bg-[#D3F5DD]/60 px-3 py-1.5 rounded-full">
            <span className="material-symbols-outlined text-[16px]">verified</span> Coupons auto-applicable in Cart
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Offer 1 */}
          <div className="relative rounded-[26px] bg-gradient-to-br from-[#7D1128] to-[#630B1E] text-white p-7 flex flex-col justify-between shadow-md overflow-hidden group min-h-[220px]">
            <div className="flex items-center justify-between">
              <span className="bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">CODE: GHARKA20</span>
              <span className="material-symbols-outlined text-[26px] text-white/90">celebration</span>
            </div>
            <div className="my-4">
              <h3 className="text-2xl font-black leading-tight tracking-tight">Flat 20% OFF</h3>
              <p className="text-xs text-white/90 mt-1.5 leading-relaxed">On orders above ₹399. Fresh home-style meals with genuine Desi Ghee.</p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/20">
              <span className="text-[11px] text-white/80">Max savings up to ₹100</span>
              <button
                className="px-5 py-2 rounded-full bg-white text-[#7D1128] font-bold text-xs hover:bg-[#FFF8F6] transition-all shadow-xs cursor-pointer"
                onClick={() => handleApply('GHARKA20')}
              >
                Apply Code
              </button>
            </div>
          </div>

          {/* Offer 2 */}
          <div className="relative rounded-[26px] bg-gradient-to-br from-[#38221A] to-[#251610] text-white p-7 flex flex-col justify-between shadow-md overflow-hidden group min-h-[220px]">
            <div className="flex items-center justify-between">
              <span className="bg-[#D9531E] text-white px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">PADMAVATI PASS</span>
              <span className="material-symbols-outlined text-[26px] text-[#F28C28]">workspace_premium</span>
            </div>
            <div className="my-4">
              <h3 className="text-2xl font-black leading-tight tracking-tight">₹0 Free Express Delivery</h3>
              <p className="text-xs text-white/90 mt-1.5 leading-relaxed">Unlimited free doorstep deliveries on orders above ₹199.</p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/20">
              <span className="text-[11px] text-white/80">Valid for 30 Days</span>
              <button
                className="px-5 py-2 rounded-full bg-[#D9531E] text-white font-bold text-xs hover:bg-[#BF4414] transition-all shadow-xs cursor-pointer"
                onClick={() => handleApply('FREESHIP')}
              >
                Activate Pass
              </button>
            </div>
          </div>

          {/* Offer 3 */}
          <div className="relative rounded-[26px] bg-gradient-to-br from-[#165E34] to-[#0E4724] text-white p-7 flex flex-col justify-between shadow-md overflow-hidden group min-h-[220px]">
            <div className="flex items-center justify-between">
              <span className="bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">CODE: THALIDAY</span>
              <span className="material-symbols-outlined text-[26px] text-white/90">restaurant</span>
            </div>
            <div className="my-4">
              <h3 className="text-2xl font-black leading-tight tracking-tight">Free Gulab Jamun Duo</h3>
              <p className="text-xs text-white/90 mt-1.5 leading-relaxed">Order any 2 Royal Thalis and get piping hot Desi Ghee Gulab Jamuns free!</p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/20">
              <span className="text-[11px] text-white/80">Every Tuesday &amp; Thursday</span>
              <button
                className="px-5 py-2 rounded-full bg-white text-[#165E34] font-bold text-xs hover:bg-[#F2FAF4] transition-all shadow-xs cursor-pointer"
                onClick={() => handleApply('THALIDAY')}
              >
                Claim Sweet
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
