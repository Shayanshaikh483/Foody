import React, { useState } from 'react';
import { ShoppingBag, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../utils/currency';

export default function DishCard({ dish, onOpenDetails }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(dish, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <div
      onClick={() => onOpenDetails && onOpenDetails(dish)}
      className="group relative bg-white/95 rounded-3xl pt-24 sm:pt-28 pb-7 px-5 text-center cursor-pointer transition-all duration-300 hover:-translate-y-2.5 shadow-[0_12px_30px_rgba(30,20,15,0.05)] hover:shadow-[0_22px_45px_rgba(178,24,24,0.12)] border border-stone-100 flex flex-col justify-between"
    >
      {/* Floating Circular Plate matching reference */}
      <div className="absolute -top-16 sm:-top-20 left-1/2 -translate-x-1/2 w-36 h-36 sm:w-42 sm:h-42">
        <div className="relative w-full h-full rounded-full p-1.5 bg-white shadow-[0_12px_28px_rgba(0,0,0,0.14)] ring-4 ring-stone-100/70 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
          <img
            src={dish.image}
            alt={dish.name}
            loading="lazy"
            className="w-full h-full object-cover rounded-full shadow-inner"
          />

          {/* Black circle quick-add cart button positioned at top right of plate (Exact reference design) */}
          <button
            onClick={handleAdd}
            aria-label={`Add ${dish.name} to order`}
            title={`Add ${dish.name} to cart`}
            className={`absolute -top-1 -right-1 w-9 h-9 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 transform ${
              isAdding
                ? 'bg-emerald-600 scale-110'
                : 'bg-stone-900 hover:bg-[#B21818] active:scale-90 group-hover:scale-110'
            }`}
          >
            {isAdding ? (
              <Check className="w-4 h-4 text-white" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Top badges if present */}
      <div className="pt-2">
        {dish.discountBadge && (
          <span className="inline-block text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full mb-1">
            {dish.discountBadge}
          </span>
        )}
        {dish.tags && dish.tags.length > 0 && !dish.discountBadge && (
          <span className="inline-block text-[11px] font-medium text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full mb-1">
            {dish.tags[0]}
          </span>
        )}

        {/* Title matching reference */}
        <h3 className="font-bold text-stone-900 text-lg md:text-xl tracking-tight mt-1 line-clamp-1 group-hover:text-[#B21818] transition-colors">
          {dish.name}
        </h3>

        {/* Subtitle matching reference */}
        <p className="text-stone-400 text-xs md:text-sm font-medium mt-0.5 line-clamp-1">
          {dish.subtitle}
        </p>
      </div>

      {/* Bottom section with Price & Details */}
      <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between px-2">
        <div className="text-left">
          <span className="text-[11px] text-stone-400 uppercase tracking-wider block font-semibold">Price</span>
          <span className="font-bold text-stone-900 text-base md:text-lg">
            {formatPKR(dish.price)}
          </span>
        </div>

        <button
          onClick={handleAdd}
          className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-stone-100 text-stone-800 hover:bg-[#B21818] hover:text-white transition-all duration-200 flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}
