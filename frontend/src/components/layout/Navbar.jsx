import React from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ onSearchChange, searchQuery }) {
  const { totalItemCount, setIsDrawerOpen } = useCart();
  const { currentUser, setIsAuthModalOpen, logout } = useAuth();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface-bright/95 backdrop-blur-md border-b border-outline-variant/60 shadow-sm">
      <div className="h-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

        {/* Brand & Location */}
        <div className="flex items-center gap-6">
          <a className="flex items-center gap-3 group" href="#">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-primary-container text-white flex items-center justify-center shadow-md border border-white/20">
              <span className="material-symbols-outlined text-[24px]">restaurant</span>
            </div>
            <div className="flex flex-col">
              <span className="font-royal text-xl sm:text-2xl text-primary font-bold tracking-wide leading-none">Padmavati Bhojnalaya</span>
            </div>
          </a>

        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <button onClick={() => scrollToSection('menu-section')} className="text-primary font-bold text-sm tracking-wide border-b-2 border-primary py-1 cursor-pointer">
            Menu &amp; Thalis
          </button>
          <button onClick={() => scrollToSection('offers-section')} className="text-on-surface-variant hover:text-primary font-medium text-sm transition-colors cursor-pointer">
            Offers &amp; Combos
          </button>
          <button onClick={() => scrollToSection('tracking-section')} className="text-on-surface-variant hover:text-primary font-medium text-sm transition-colors cursor-pointer">
            Live Order Tracking
          </button>

        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Search Input */}
          <div className="hidden sm:flex items-center bg-surface-container px-3.5 py-2 rounded-full border border-outline-variant/50 w-36 md:w-52 focus-within:w-64 focus-within:border-secondary transition-all">
            <span className="material-symbols-outlined text-outline text-[18px] mr-2">search</span>
            <input
              className="w-full bg-transparent text-xs text-on-surface placeholder:text-outline focus:outline-none"
              placeholder="Search Thali, Dal, Paneer..."
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Live Tracking Quick Button */}
          <button
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-primary font-bold text-xs border border-primary/20 transition-all cursor-pointer"
            onClick={() => scrollToSection('tracking-section')}
          >
            <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
            <span className="material-symbols-outlined text-[16px]">moped</span>
            <span>Track Live Order</span>
          </button>



          {/* User Sign In / Profile */}
          {currentUser ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-secondary text-secondary bg-secondary/5 text-xs font-bold">
              <span className="material-symbols-outlined text-[16px]">account_circle</span>
              <span className="max-w-[80px] truncate">{currentUser.name.split(' ')[0]}</span>
              <button onClick={logout} className="text-[10px] text-primary/70 hover:text-primary ml-1 cursor-pointer" title="Sign Out">
                (Exit)
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-secondary text-secondary hover:bg-secondary hover:text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">person</span>
              <span>Sign In</span>
            </button>
          )}

          {/* Cart Button */}
          <button
            className="relative flex items-center justify-center p-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary border border-outline-variant/50 transition-colors cursor-pointer"
            onClick={() => setIsDrawerOpen(true)}
            title="View Cart"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">shopping_basket</span>
            {totalItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                {totalItemCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
