import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import DishCard from '../components/DishCard';
import FloatingLeaf from '../components/FloatingLeaf';
import { DISHES, CATEGORIES } from '../data/dishes';

export default function MenuPage({ onOpenDishModal }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDietary, setSelectedDietary] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const dietaryOptions = [
    { id: 'all', label: 'All Preferences' },
    { id: 'chef', label: "Chef's Special" },
    { id: 'veg', label: 'Vegetarian' },
    { id: 'bestseller', label: 'Bestsellers' },
    { id: 'gluten-free', label: 'Gluten-Free' },
  ];

  const filteredDishes = useMemo(() => {
    return DISHES.filter((dish) => {
      // Category match
      const categoryMatch = selectedCategory === 'all' || dish.category === selectedCategory;

      // Dietary match
      let dietaryMatch = true;
      if (selectedDietary === 'chef') {
        dietaryMatch = dish.isChefSpecial;
      } else if (selectedDietary === 'veg') {
        dietaryMatch = dish.tags?.includes('Vegetarian');
      } else if (selectedDietary === 'bestseller') {
        dietaryMatch = dish.tags?.includes('Bestseller') || dish.tags?.includes('Customer Favorite');
      } else if (selectedDietary === 'gluten-free') {
        dietaryMatch = dish.tags?.includes('Gluten-Free');
      }

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const searchMatch =
        !query ||
        dish.name.toLowerCase().includes(query) ||
        dish.subtitle.toLowerCase().includes(query) ||
        dish.description.toLowerCase().includes(query);

      return categoryMatch && dietaryMatch && searchMatch;
    });
  }, [selectedCategory, selectedDietary, searchQuery]);

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Decorative Floating Leaves */}
      <FloatingLeaf
        className="-top-4 -right-6 lg:right-10"
        size={80}
        rotate={25}
        blur="blur-[2px]"
        opacity="opacity-80"
      />
      <FloatingLeaf
        className="top-1/3 -left-8"
        size={60}
        rotate={-30}
        blur="blur-[1px]"
        opacity="opacity-70"
      />

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <span className="text-xs font-bold uppercase tracking-widest text-[#B21818] block">
          Artisanal Gastronomy
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight">
          The Savoria Tasting & A La Carte Menu
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Every recipe begins with regenerative organic produce, heirloom grains, and prime cuts seared to perfection over applewood coals.
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-stone-200/80 mb-16 space-y-6">
        
        {/* Search input & Dietary filters row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes, ingredients, wines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 rounded-full border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#B21818]/20 focus:border-[#B21818] transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dietary chips */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {dietaryOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedDietary(opt.id)}
                className={`px-3.5 py-1.5 text-xs rounded-full font-semibold transition-all ${
                  selectedDietary === opt.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

        </div>

        {/* Category Pills Row with smooth horizontal scroll */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-stone-100">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 flex-shrink-0 ${
                  isSelected
                    ? 'bg-[#B21818] text-white shadow-[0_4px_14px_rgba(178,24,24,0.35)] scale-105'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Dishes Count & Active indicator */}
      <div className="flex items-center justify-between mb-16 px-2">
        <p className="text-xs sm:text-sm text-stone-500 font-medium">
          Showing <span className="font-bold text-stone-900">{filteredDishes.length}</span> handcrafted dishes
        </p>

        {(selectedCategory !== 'all' || selectedDietary !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedDietary('all');
              setSearchQuery('');
            }}
            className="text-xs text-[#B21818] font-bold hover:underline"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Dishes Grid */}
      {filteredDishes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-24 pt-6">
          {filteredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onOpenDetails={onOpenDishModal}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8">
          <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-800">No matching culinary creations found</h3>
          <p className="text-stone-500 text-sm mt-1 max-w-md mx-auto">
            We couldn’t find anything matching your current filters. Try searching for "pizza", "pasta", or reset your selections.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedDietary('all');
              setSearchQuery('');
            }}
            className="mt-6 px-6 py-2.5 rounded-full bg-[#B21818] text-white text-xs font-bold hover:bg-[#961313] transition shadow-md"
          >
            Show All Dishes
          </button>
        </div>
      )}

      {/* Chef's Note callout */}
      <div className="mt-28 bg-[#FAF2EB] rounded-3xl p-8 sm:p-10 border border-stone-200/80 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B21818] block">
            Special Dietary Accommodations
          </span>
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            Have food allergies or bespoke dietary desires?
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Every dish is made from scratch in our open kitchen. Our culinary team will happily tailor ingredients, sauces, and preparations to your exact dietary needs.
          </p>
        </div>
        <div className="md:col-span-4 flex justify-start md:justify-end">
          <a
            href="tel:+15553827490"
            className="px-6 py-3 rounded-full bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition"
          >
            Speak with our Sommelier
          </a>
        </div>
      </div>

    </div>
  );
}
