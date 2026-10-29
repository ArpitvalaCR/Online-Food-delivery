import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

export default function CustomizerModal({ dish, onClose }) {
  const { addToCart } = useCart();

  const [spiceLevel, setSpiceLevel] = useState('Medium');
  const [isJain, setIsJain] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);

  useEffect(() => {
    if (dish) {
      setSpiceLevel('Medium');
      setIsJain(false);
      setSelectedAddons([]);
    }
  }, [dish]);

  if (!dish) return null;

  const defaultAddons = [
    { id: 'extra_ghee', name: 'Extra Desi Ghee Drizzle', price: 25 },
    { id: 'extra_cheese', name: 'Extra Grated Amul Cheese', price: 40 },
    { id: 'extra_pav', name: 'Extra Butter Pav Pair (2 pcs)', price: 30 },
    { id: 'extra_roti', name: 'Extra Tawa Butter Roti', price: 15 },
    { id: 'chutney_duo', name: 'Mint & Imli Chutney Duo', price: 20 },
    { id: 'roasted_papad', name: 'Roasted Papad & Pickle', price: 20 }
  ];

  const availableAddons = dish.addonOptions && dish.addonOptions.length > 0 ? dish.addonOptions : defaultAddons;

  const toggleAddon = (addon) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const addonSum = selectedAddons.reduce((sum, a) => sum + (Number(a.price) || 0), 0);
  const totalCustomPrice = (Number(dish.price) || 0) + addonSum;

  const handleAdd = () => {
    addToCart(dish, {
      spiceLevel,
      isJain,
      selectedAddons
    });
    onClose();
  };

  const spiceLevels = dish.availableSpiceLevels && dish.availableSpiceLevels.length > 0
    ? dish.availableSpiceLevels
    : ['Mild', 'Medium', 'Desi Teekha', 'Extra Spicy'];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      <div className="bg-surface-bright rounded-3xl shadow-2xl border border-outline-variant max-w-lg w-full p-6 sm:p-7 transform transition-transform duration-300">

        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-outline-variant/60">
          <div className="flex items-center gap-3">
            <img
              id="custom-dish-image"
              className="w-14 h-14 rounded-2xl object-cover border border-outline-variant/60"
              src={dish.image}
              alt={dish.name}
            />
            <div>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Custom Preparation</span>
              <h3 className="text-lg font-bold text-on-surface leading-tight">{dish.name}</h3>
              <span className="text-sm font-extrabold text-primary">₹{dish.price}</span>
            </div>
          </div>
          <button
            className="w-8 h-8 rounded-full hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors cursor-pointer"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="text-xs text-on-surface-variant my-3 leading-relaxed">{dish.description}</p>

        {/* Spice Level Segmented Selector */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-on-surface mb-2">Select Spice Level</label>
          <div className="flex items-center gap-2">
            {spiceLevels.map((lvl) => {
              const isSelected = spiceLevel === lvl;
              return (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setSpiceLevel(lvl)}
                  className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'border-2 border-primary bg-primary/10 text-primary'
                      : 'border border-outline-variant bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {lvl} {lvl.includes('Teekha') || lvl.includes('Spicy') ? '🌶️🌶️' : (lvl.includes('Medium') ? '🌶️' : '🌿')}
                </button>
              );
            })}
          </div>
        </div>

        {/* 100% Jain Toggle */}
        <div className="mb-4 p-3 rounded-2xl bg-surface-container border border-outline-variant/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-tertiary rounded-sm flex items-center justify-center p-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
            </span>
            <div>
              <h4 className="text-xs font-bold text-on-surface">100% Jain Preparation</h4>
              <p className="text-[11px] text-on-surface-variant">Prepared without onion, garlic, or root vegetables</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isJain}
              onChange={(e) => setIsJain(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-tertiary"></div>
          </label>
        </div>

        {/* Addon Checkboxes */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-on-surface mb-2">Popular Addons &amp; Extras</label>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
            {availableAddons.map((addon) => {
              const isChecked = selectedAddons.some((a) => a.id === addon.id);
              return (
                <label
                  key={addon.id}
                  onClick={() => toggleAddon(addon)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    isChecked
                      ? 'border-primary bg-primary/5'
                      : 'border-outline-variant/60 bg-surface-container hover:border-secondary'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}} // handled by parent label
                      className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-on-surface">{addon.name}</span>
                  </div>
                  <span className="text-xs font-extrabold text-primary">+₹{addon.price}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-3 border-t border-outline-variant/60 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-outline block">Total with Addons:</span>
            <span className="text-xl font-extrabold text-primary">₹{totalCustomPrice}</span>
          </div>
          <button
            className="px-6 py-3 rounded-xl btn-primary font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            onClick={handleAdd}
          >
            <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
            <span>Add Customized Dish</span>
          </button>
        </div>

      </div>
    </div>
  );
}
