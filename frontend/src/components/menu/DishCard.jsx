import React from 'react';
import { useCart } from '../../context/CartContext';

export default function DishCard({ dish, onCustomize }) {
  const { addToCart } = useCart();

  return (
    <div className="dish-card bg-white rounded-2xl overflow-hidden p-4 shadow-sm border border-[#EADBCE] flex flex-col justify-between hover:shadow-lg hover:border-[#D9531E]/40 transition-all duration-300">
      <div>
        <div
          className="relative h-52 sm:h-56 w-full rounded-xl overflow-hidden mb-3.5 group cursor-pointer bg-[#F7EFE1]"
          onClick={() => onCustomize(dish)}
        >
          <img
            alt={dish.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            src={dish.image}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {dish.badge && (
            <div
              className={`absolute top-2.5 left-2.5 ${
                dish.badgeType === 'secondary' ? 'bg-[#D9531E]' : 'bg-[#9A1B2F]'
              } text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-sm tracking-wide`}
            >
              {dish.badge}
            </div>
          )}
          {dish.tag && (
            <div className="absolute bottom-2.5 left-2.5 bg-white/95 text-[#1F1916] text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-sm border border-black/5">
              {dish.tag}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-1 mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="veg-badge" title="100% Pure Vegetarian"></span>
            <span className="text-xs font-semibold text-[#5E524D]">{dish.category}</span>
          </div>
          <span className="text-xs font-bold text-[#D9531E] flex items-center gap-0.5 bg-[#FFF2EB] px-2 py-0.5 rounded-md">
            <span className="material-symbols-outlined text-[14px]">star</span>
            <span>{dish.rating} ({dish.reviewsCount || '1k+'})</span>
          </span>
        </div>

        <h3
          className="text-base font-bold text-[#1F1916] hover:text-[#9A1B2F] cursor-pointer transition-colors leading-snug line-clamp-1"
          onClick={() => onCustomize(dish)}
        >
          {dish.name}
        </h3>
        <p className="text-xs text-[#6E625D] line-clamp-2 mt-1 leading-relaxed">
          {dish.description}
        </p>
      </div>

      <div className="pt-3.5 flex items-center justify-between border-t border-[#F0E6DE] mt-4">
        <div>
          <span className="text-xl font-black text-[#1F1916]">₹{dish.price}</span>
          {dish.originalPrice && (
            <span className="text-xs line-through text-[#8E7F78] ml-1.5">₹{dish.originalPrice}</span>
          )}
        </div>

        <button
          className="px-4 py-2 rounded-full bg-[#9A1B2F] hover:bg-[#821425] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
          onClick={() => onCustomize(dish)}
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>ADD</span>
        </button>
      </div>
    </div>
  );
}
