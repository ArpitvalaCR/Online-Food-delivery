import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import CartDrawer from './components/cart/CartDrawer';
import CheckoutModal from './components/checkout/CheckoutModal';
import AuthModal from './components/auth/AuthModal';

function MainApp() {
  const { isCheckoutOpen, setIsCheckoutOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [customizerDish, setCustomizerDish] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);

  const handleOrderPlaced = (order) => {
    setActiveOrder(order);
    const trackingEl = document.getElementById('tracking-section');
    if (trackingEl) {
      trackingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFooterDishClick = (dishId) => {
    const el = document.getElementById('menu-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-on-surface">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <Home
        searchQuery={searchQuery}
        customizerDish={customizerDish}
        setCustomizerDish={setCustomizerDish}
        activeOrder={activeOrder}
      />

      <Footer onDishClick={handleFooterDishClick} />

      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderPlaced={handleOrderPlaced}
      />

      <AuthModal />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </AuthProvider>
  );
}
