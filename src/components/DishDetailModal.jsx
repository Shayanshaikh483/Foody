import React from 'react';
import { X, Star, Clock, Flame, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../utils/currency';

export default function DishDetailModal({ dish, onClose }) {
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);

  if (!dish) return null;

  const handleAdd = () => {
    addToCart(dish, 1);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-100 flex flex-col max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-900/70 text-white flex items-center justify-center hover:bg-stone-900 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Plate Photo */}
        <div className="relative h-64 sm:h-72 w-full bg-stone-100 overflow-hidden">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover transition duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-5 right-5 text-white flex justify-between items-end">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block">
                {dish.subtitle}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">{dish.name}</h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-white">{formatPKR(dish.price)}</span>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Quick Stats Pill */}
          <div className="flex items-center gap-4 text-xs text-stone-600 bg-stone-50 p-3 rounded-2xl border border-stone-100">
            <div className="flex items-center gap-1 font-semibold text-stone-800">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{dish.rating} ({dish.reviewsCount} reviews)</span>
            </div>
            <div className="w-px h-4 bg-stone-200" />
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-stone-400" />
              <span>{dish.prepTime}</span>
            </div>
            <div className="w-px h-4 bg-stone-200" />
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-[#B21818]" />
              <span>{dish.calories}</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
              Culinary Description
            </h4>
            <p className="text-sm text-stone-600 leading-relaxed">
              {dish.description}
            </p>
          </div>

          {/* Tags */}
          {dish.tags && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                Dietary & Highlights
              </h4>
              <div className="flex flex-wrap gap-2">
                {dish.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Add to Order Button */}
          <div className="pt-2">
            <button
              onClick={handleAdd}
              className={`w-full py-3.5 rounded-full text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                added ? 'bg-emerald-600' : 'bg-[#B21818] hover:bg-[#961313]'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" /> Added to Order!
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Add to Order — {formatPKR(dish.price)}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
