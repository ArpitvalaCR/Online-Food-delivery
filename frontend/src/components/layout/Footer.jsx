import React from 'react';

export default function Footer({ onDishClick }) {
  return (
    <footer className="w-full bg-[#FAF5EE] border-t border-[#EADBCE] pt-14 pb-12 mt-16 text-[#3D332A]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            {/* Logo box matching reference */}
            <div className="inline-flex flex-col items-center justify-center bg-white px-6 py-2.5 rounded-2xl shadow-xs border border-[#EADBCE]/80 w-fit">
              <div className="w-7 h-7 rounded-full bg-[#F5DFDF] text-[#821425] flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-[16px]">restaurant</span>
              </div>
              <span className="text-[#821425] font-extrabold text-[15px] tracking-tight">Padmavati Bhojnalaya</span>
            </div>

            <p className="text-xs text-[#6B5E52] max-w-sm leading-relaxed">
              Preserving India's culinary richness with pure desi ghee thalis, stone-ground gravies, and fragrant tandoori rotis. Serving families with heartfelt hospitality and authentic culinary tradition.
            </p>
            <div className="text-xs text-[#6B5E52] space-y-2 pt-1">
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#D9531E] text-[16px]">location_on</span>
                <span>Central Kitchen: 142/2 Bhandarkar Road, Deccan Heritage Hub</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#D9531E] text-[16px]">phone</span>
                <span>Helpline: +91 98230 45678 / 020 2567 8900</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#D9531E] text-[16px]">mail</span>
                <span>support@padmavatieats.in</span>
              </p>
            </div>
          </div>

          {/* Column 2: Popular Dishes */}
          <div>
            <h5 className="text-[13px] font-bold text-[#2A1E17] mb-3.5">Popular Thalis</h5>
            <ul className="space-y-2.5 text-xs text-[#6B5E52]">
              <li className="hover:text-[#821425] transition-colors cursor-pointer" onClick={() => onDishClick?.('dish-1')}>Maharaja Special Thali</li>
              <li className="hover:text-[#821425] transition-colors cursor-pointer" onClick={() => onDishClick?.('dish-12')}>Shahi Paneer Deluxe Thali</li>
              <li className="hover:text-[#821425] transition-colors cursor-pointer" onClick={() => onDishClick?.('dish-7')}>Dal Baati Churma Special</li>
              <li className="hover:text-[#821425] transition-colors cursor-pointer" onClick={() => onDishClick?.('dish-3')}>Mini Executive Thali</li>
              <li className="hover:text-[#821425] transition-colors cursor-pointer" onClick={() => onDishClick?.('dish-4')}>Jain Swaminarayan Thali</li>
            </ul>
          </div>

          {/* Column 3: Pillars */}
          <div>
            <h5 className="text-[13px] font-bold text-[#2A1E17] mb-3.5">Culinary Pillars</h5>
            <ul className="space-y-2.5 text-xs text-[#6B5E52]">
              <li>100% Shuddh Desi Ghee</li>
              <li>No Added MSG / Soda</li>
              <li>Generational Masalas</li>
              <li>Hygienic Earthen Pots</li>
              <li>Corporate Thali Catering</li>
            </ul>
          </div>

          {/* Column 4: Timings */}
          <div>
            <h5 className="text-[13px] font-bold text-[#2A1E17] mb-3.5">Kitchen Timings</h5>
            <div className="text-xs text-[#6B5E52] space-y-2.5">
              <p><span className="font-bold text-[#2A1E17]">Lunch Service:</span><br />11:00 AM – 3:45 PM</p>
              <p><span className="font-bold text-[#2A1E17]">Dinner Service:</span><br />6:30 PM – 11:30 PM</p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4F7DF] text-[#0A6D38] font-bold text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A6D38]"></span> Kitchen Open Now
                </span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-[#EADBCE]/80 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7E72] gap-4">
          <p>© 2026 Padmavati Bhojnalaya. All rights reserved. Pure Vegetarian Heritage Kitchen.</p>
          <div className="flex items-center gap-4">
            <a className="hover:underline hover:text-[#821425]" href="#">FSSAI Lic. No: 11521034000129</a>
            <span>•</span>
            <a className="hover:underline hover:text-[#821425]" href="#">Privacy Policy</a>
            <span>•</span>
            <a className="hover:underline hover:text-[#821425]" href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
