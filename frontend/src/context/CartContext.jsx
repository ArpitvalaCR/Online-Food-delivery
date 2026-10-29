import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('pb_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed parsing cart from localStorage', e);
    }
    return [
      {
        dishId: "dish-1",
        name: "Maharaja Special Thali",
        price: 280,
        qty: 1,
        spiceLevel: "Medium",
        isJain: false,
        selectedAddons: [{ id: "extra_ghee", name: "Extra Desi Ghee Drizzle", price: 25 }],
        itemTotal: 305
      },
      {
        dishId: "dish-2",
        name: "Shahi Dal Tadka & Jeera Rice Combo",
        price: 190,
        qty: 1,
        spiceLevel: "Desi Teekha",
        isJain: false,
        selectedAddons: [],
        itemTotal: 190
      }
    ];
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponStatusMsg, setCouponStatusMsg] = useState(null);

  useEffect(() => {
    localStorage.setItem('pb_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (dish, customization = null) => {
    setCart(prev => {
      const spiceLevel = customization?.spiceLevel || 'Medium';
      const isJain = Boolean(customization?.isJain);
      const selectedAddons = customization?.selectedAddons || [];
      const addonSum = selectedAddons.reduce((sum, a) => sum + (Number(a.price) || 0), 0);
      const unitTotal = (Number(dish.price) || 0) + addonSum;

      // Check if duplicate item exists
      const existingIdx = prev.findIndex(item =>
        (item.dishId === dish.id || item.dishId === dish.dishId) &&
        item.spiceLevel === spiceLevel &&
        item.isJain === isJain &&
        JSON.stringify(item.selectedAddons || []) === JSON.stringify(selectedAddons)
      );

      if (existingIdx !== -1) {
        const next = [...prev];
        const nextQty = next[existingIdx].qty + 1;
        next[existingIdx] = {
          ...next[existingIdx],
          qty: nextQty,
          itemTotal: unitTotal * nextQty
        };
        return next;
      }

      return [
        ...prev,
        {
          dishId: dish.id || dish.dishId,
          name: dish.name,
          price: dish.price,
          qty: 1,
          spiceLevel,
          isJain,
          selectedAddons,
          itemTotal: unitTotal
        }
      ];
    });

    setIsDrawerOpen(true);
  };

  const updateItemQty = (index, delta) => {
    setCart(prev => {
      if (!prev[index]) return prev;
      const item = prev[index];
      const newQty = item.qty + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      const unitPrice = item.itemTotal / item.qty;
      const next = [...prev];
      next[index] = {
        ...item,
        qty: newQty,
        itemTotal: unitPrice * newQty
      };
      return next;
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponStatusMsg(null);
  };

  const applyCoupon = (code) => {
    if (!code) return;
    const clean = code.trim().toUpperCase();
    if (['GHARKA20', 'FREESHIP', 'THALIDAY'].includes(clean)) {
      setAppliedCoupon(clean);
      setCouponStatusMsg({
        type: 'success',
        text: `✓ Coupon "${clean}" activated successfully!`
      });
    } else {
      setCouponStatusMsg({
        type: 'error',
        text: 'Invalid coupon. Try GHARKA20, FREESHIP, or THALIDAY'
      });
    }
  };

  // Pricing calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.itemTotal || (item.price * item.qty)), 0);
  const totalItemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const tax = Math.round(subtotal * 0.05 * 100) / 100;
  const deliveryFee = subtotal >= 200 || subtotal === 0 ? 0 : 30;

  let discount = 0;
  if (appliedCoupon === 'GHARKA20') {
    discount = Math.min(100, Math.round(subtotal * 0.20 * 100) / 100);
  } else if (appliedCoupon === 'FREESHIP') {
    discount = deliveryFee;
  } else if (appliedCoupon === 'THALIDAY') {
    discount = 40;
  }

  const grandTotal = Math.max(0, Math.round((subtotal + tax + deliveryFee - discount) * 100) / 100);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateItemQty,
      clearCart,
      isDrawerOpen,
      setIsDrawerOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      appliedCoupon,
      applyCoupon,
      couponStatusMsg,
      subtotal,
      totalItemCount,
      tax,
      deliveryFee,
      discount,
      grandTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
