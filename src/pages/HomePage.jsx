import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Star,
  Percent,
  Sparkles,
  Flame,
  CheckCircle,
  Heart
} from 'lucide-react';
import { InstagramIcon } from '../components/SocialIcons';
import FloatingLeaf from '../components/FloatingLeaf';
import DishCard from '../components/DishCard';
import { DISHES, REVIEWS, AMBIANCE_GALLERY, INSTAGRAM_POSTS } from '../data/dishes';

export default function HomePage({ onNavigate, onOpenDishModal, onBookTableClick }) {
  // Carousel slide index for featured dishes
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Featured dishes (first 4 match reference image exactly)
  const featuredDishes = DISHES.slice(0, 6);

  const handlePrevSlide = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, featuredDishes.length - 4)));
  };

  const handleNextSlide = () => {
    setCarouselIndex((prev) => (prev < featuredDishes.length - 4 ? prev + 1 : 0));
  };

  return (
    <div className="relative overflow-hidden bg-[#FAF6F3]">
      
      {/* =========================================================================
          HERO SECTION — EXACT MATCH TO REFERENCE IMAGE
          ========================================================================= */}
      <section className="relative pt-28 sm:pt-36 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[85vh] flex flex-col justify-center">
        
        {/* Decorative Floating Basil Leaves & Peppercorns matching reference */}
        <FloatingLeaf
          className="-top-6 -left-10 lg:left-4"
          size={95}
          rotate={-35}
          blur="blur-[2px]"
          opacity="opacity-90"
          animation="animate-float-slow"
        />
        <FloatingLeaf
          className="top-12 -right-8 lg:right-10"
          size={75}
          rotate={40}
          blur="blur-[3px]"
          opacity="opacity-75"
          animation="animate-float-reverse"
        />
        <FloatingLeaf
          className="top-1/2 left-2 lg:left-1/3"
          size={55}
          rotate={-15}
          blur="blur-[0.5px]"
          opacity="opacity-80"
          animation="animate-float-slow"
        />
        <FloatingLeaf
          className="bottom-4 right-2 lg:right-1/4"
          size={85}
          rotate={55}
          blur="blur-[4px]"
          opacity="opacity-70"
          animation="animate-float-reverse"
        />

        {/* Scattered Peppercorn particles */}
        <div className="hidden lg:block absolute top-1/2 left-[48%] w-2 h-2 rounded-full bg-stone-800 opacity-60 shadow-sm" />
        <div className="hidden lg:block absolute top-[52%] left-[49.5%] w-1.5 h-1.5 rounded-full bg-stone-700 opacity-50" />
        <div className="hidden lg:block absolute top-[48%] left-[51%] w-2.5 h-2.5 rounded-full bg-stone-900 opacity-70" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text, CTAs, Reviews */}
          <div className="lg:col-span-6 z-20 space-y-7">
            
            {/* Main Headline matching reference styling */}
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-[4.5rem] leading-[1.08] text-stone-900 font-bold tracking-tight">
              it’s not just <br />
              Food, It’s an <br />
              Experience.
            </h1>

            {/* Subtitle / Value proposition */}
            <p className="text-stone-600 text-base sm:text-lg max-w-md leading-relaxed font-normal">
              Indulge in artisanal Tuscan flavors and prime wood-fired steaks, handcrafted with passion and served in an atmosphere of refined warmth.
            </p>

            {/* Buttons matching reference design:
                1. Crimson Capsule Button: View Menu →
                2. Soft White Capsule Button: Book A Table
            */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('menu')}
                className="px-8 py-3.5 rounded-full bg-[#B21818] hover:bg-[#961313] text-white font-semibold text-sm sm:text-base flex items-center gap-2.5 shadow-[0_8px_20px_rgba(178,24,24,0.35)] hover:shadow-[0_12px_28px_rgba(178,24,24,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 group"
              >
                <span>View Menu</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onBookTableClick}
                className="px-8 py-3.5 rounded-full bg-white hover:bg-stone-50 text-stone-800 font-semibold text-sm sm:text-base shadow-[0_6px_18px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-stone-200/60 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Book A Table
              </button>
            </div>

            {/* Reviews Section matching reference:
                "Reviews" text
                Stack of user avatar circles + "4.8+" pill
                5 golden stars below
            */}
            <div className="pt-3 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                Reviews
              </span>
              
              <div className="flex items-center gap-3">
                {/* Avatar Stack */}
                <div className="flex -space-x-2.5 overflow-hidden">
                  <img
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Guest review"
                  />
                  <img
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Guest review"
                  />
                  <img
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                    alt="Guest review"
                  />
                  <div className="h-9 px-2 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center ring-2 ring-white shadow-sm">
                    4.8+
                  </div>
                </div>

                <span className="text-stone-400 text-xs font-medium">Over 2,400+ Verified Guests</span>
              </div>

              {/* 5 Golden Stars */}
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Hero Food Plate, Discount Tag, Cut Tomato matching reference */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            
            {/* Floating 15% Discount Card matching reference */}
            <div className="absolute top-2 sm:top-6 left-2 sm:-left-4 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-[0_12px_28px_rgba(0,0,0,0.08)] border border-stone-100 flex items-center gap-3 animate-float-slow">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Percent className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-stone-900 font-extrabold text-sm sm:text-base leading-tight">15%</div>
                <div className="text-stone-400 text-[11px] font-medium">Discount for 2 Orders</div>
              </div>
            </div>

            {/* Cut Tomato Slice on right edge matching reference */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 hidden sm:block animate-float-reverse">
              <div className="w-14 h-14 rounded-full bg-rose-600/90 shadow-[0_10px_20px_rgba(225,29,72,0.3)] ring-4 ring-rose-200/50 flex items-center justify-center overflow-hidden">
                <div className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-300"></div>
                </div>
              </div>
            </div>

            {/* Main Ribeye Steak Skillet/Plate Image */}
            <div className="relative w-[320px] sm:w-[440px] md:w-[480px] lg:w-[520px] aspect-square rounded-full p-3 sm:p-5 bg-gradient-to-br from-white/80 via-white/40 to-transparent shadow-[0_30px_70px_rgba(30,20,15,0.18)]">
              <div className="w-full h-full rounded-full overflow-hidden shadow-2xl ring-8 ring-white relative group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
                  alt="Flame-grilled Prime Ribeye with rosemary and potato wedges"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />

                {/* Interactive quick dish tag */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-stone-900/85 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full font-medium shadow-lg flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Prime Tomahawk Ribeye • Rs. 4,800</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================================
            FEATURED DISHES CAROUSEL — EXACT MATCH TO REFERENCE CARDS ROW
            ========================================================================= */}
        <div className="mt-20 lg:mt-24 pt-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B21818] block mb-1">
                Artisan Favorites
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                Signature Crafted Dishes
              </h2>
            </div>

            {/* Navigation Arrows matching reference design: Dark Left arrow, Crimson Right arrow */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevSlide}
                aria-label="Previous dishes"
                className="w-11 h-11 rounded-full bg-stone-700 text-white flex items-center justify-center hover:bg-stone-900 active:scale-95 shadow-md transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextSlide}
                aria-label="Next dishes"
                className="w-11 h-11 rounded-full bg-[#B21818] text-white flex items-center justify-center hover:bg-[#961313] active:scale-95 shadow-md transition-all duration-200"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Grid / Carousel cards matching reference image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-24 pt-10">
            {featuredDishes.slice(carouselIndex, carouselIndex + 4).map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onOpenDetails={onOpenDishModal}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('menu')}
              className="inline-flex items-center gap-2 text-sm font-bold text-stone-800 hover:text-[#B21818] group transition"
            >
              <span>Explore complete tasting & a la carte menu</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>

      </section>


      {/* =========================================================================
          ABOUT THE RESTAURANT PREVIEW SECTION
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#F4EDE7]/60 border-y border-stone-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Imagery collage */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-lg h-56 sm:h-64">
                  <img
                    src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80"
                    alt="Dining hall interior"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-lg h-40 sm:h-48">
                  <img
                    src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80"
                    alt="Wine vault"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="rounded-3xl overflow-hidden shadow-lg h-44 sm:h-52">
                  <img
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80"
                    alt="Chef Mateo preparing plate"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-lg h-56 sm:h-64">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
                    alt="Garden terrace evening"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-900 text-white rounded-2xl p-4 shadow-2xl text-center border-4 border-white">
                <span className="font-serif text-2xl font-bold text-amber-400 block">14+</span>
                <span className="text-[11px] uppercase tracking-wider text-stone-300">Years of Mastery</span>
              </div>
            </div>

            {/* Content text */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B21818] block">
                Our Heritage & Soul
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
                Where culinary passion meets timeless hospitality.
              </h2>
              <p className="text-stone-600 text-base leading-relaxed">
                At Foody, dining transcends nourishment. It is a slow, sensory celebration of heritage olive oils, wood embers, naturally leavened doughs, and the quiet intimacy of gathering around an honest table.
              </p>

              {/* 3 Pillars */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#B21818] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">Farm-to-Table Integrity</h4>
                    <p className="text-stone-500 text-xs mt-0.5">We source directly from organic regenerative family farms across New York and Tuscany.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#B21818] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">Artisan Wood-Fired Craft</h4>
                    <p className="text-stone-500 text-xs mt-0.5">Every steak and pizza is cooked over aged applewood and charcoal at over 800 degrees.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#B21818] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">Curated 450+ Cellar Labels</h4>
                    <p className="text-stone-500 text-xs mt-0.5">Our in-house master sommeliers pair every course with rare vintages and biodynamic wines.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-6">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-7 py-3 rounded-full bg-stone-900 text-white font-semibold text-sm hover:bg-stone-800 transition shadow-md"
                >
                  Discover Our Story
                </button>
                <div className="border-l border-stone-300 pl-4">
                  <span className="font-handwriting text-2xl text-stone-800 block -rotate-3">Mateo Rossi</span>
                  <span className="text-[11px] text-stone-400 font-medium">Chef Mateo Rossi, Founder</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          RESTAURANT EXPERIENCE & AMBIANCE SECTION
          ========================================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B21818] block">
            Atmosphere & Spaces
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Spaces Designed for Unhurried Evenings
          </h2>
          <p className="text-stone-500 text-sm sm:text-base">
            From candlelit cellar dinners to our airy jasmine garden terrace, discover the perfect backdrop for your celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AMBIANCE_GALLERY.map((space, index) => (
            <div
              key={index}
              className="group relative rounded-3xl overflow-hidden shadow-md bg-stone-900 h-96 flex flex-col justify-end p-6 cursor-pointer"
            >
              <img
                src={space.image}
                alt={space.title}
                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="relative z-10 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md inline-block">
                  {space.badge}
                </span>
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                  {space.title}
                </h3>
                <p className="text-stone-300 text-xs leading-relaxed line-clamp-2">
                  {space.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* =========================================================================
          PROMOTIONAL BANNER: 15% DISCOUNT FOR SPECIAL EVENINGS
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 via-stone-850 to-stone-950 text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
          {/* Subtle decorative circles */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#B21818]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B21818] text-white text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Special Seasonal Invitation</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Enjoy 15% Off Your Tasting Order When You Dine In Pairs
              </h3>
              <p className="text-stone-300 text-sm sm:text-base max-w-xl">
                Experience Chef Mateo's 5-course tasting menu paired with regional sommelier reserves. Use code <span className="font-mono font-bold text-amber-300 bg-white/10 px-2 py-0.5 rounded">FOODY15</span> at checkout.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                onClick={onBookTableClick}
                className="px-8 py-3.5 rounded-full bg-white text-stone-900 font-bold text-sm hover:bg-stone-100 transition shadow-lg text-center"
              >
                Reserve Tasting Table
              </button>
              <button
                onClick={() => onNavigate('menu')}
                className="px-8 py-3.5 rounded-full bg-stone-800 text-white font-semibold text-sm hover:bg-stone-700 transition border border-stone-700 text-center"
              >
                View Seasonal Menu
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          CUSTOMER TESTIMONIALS SECTION
          ========================================================================= */}
      <section className="py-20 bg-[#F4EDE7]/60 border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B21818] block">
              Guest Praise
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Celebrated by Critics & Guests
            </h2>
            <div className="flex items-center justify-center gap-1 text-amber-400 pt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-2 text-stone-700 font-bold text-sm">4.9 / 5.0 Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <h4 className="font-serif text-lg font-bold text-stone-900">
                    "{review.title}"
                  </h4>

                  <p className="text-stone-600 text-sm leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center gap-3.5">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-stone-100"
                  />
                  <div>
                    <h5 className="font-bold text-stone-900 text-sm">{review.name}</h5>
                    <p className="text-stone-400 text-xs">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          INSTAGRAM / SOCIAL MEDIA GALLERY SECTION
          ========================================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B21818] block mb-1">
              Social Moments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Follow Our Gastronomic Journey
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-stone-700 hover:text-[#B21818] font-bold text-sm transition"
          >
            <InstagramIcon className="w-4 h-4 text-[#B21818]" />
            <span>@foody.experience</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative rounded-2xl overflow-hidden aspect-square bg-stone-100 cursor-pointer shadow-sm"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-white text-center">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500 mb-1" />
                <span className="text-xs font-bold">{post.likes}</span>
                <p className="text-[10px] text-stone-300 mt-1 line-clamp-2">{post.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
