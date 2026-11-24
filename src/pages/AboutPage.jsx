import React from 'react';
import { Award, Heart, ShieldCheck, Sparkles, Flame, Quote } from 'lucide-react';
import FloatingLeaf from '../components/FloatingLeaf';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { AMBIANCE_GALLERY } from '../data/dishes';

export default function AboutPage({ onNavigate, onBookTableClick }) {
  const values = [
    {
      icon: Flame,
      title: 'Purity of Fire & Iron',
      desc: 'We eschew microwaves and pre-processed shortcuts. Every protein and crust is kissed by genuine hardwood coals and cast iron pans.'
    },
    {
      icon: ShieldCheck,
      title: 'Regenerative Farm Sourcing',
      desc: 'Direct partnerships with biodynamic family growers ensure vegetables harvested at peak ripeness within 36 hours of your plate.'
    },
    {
      icon: Sparkles,
      title: 'Single-Origin Olive Oils',
      desc: 'First cold-pressed monovarietal oils flown directly from heritage groves in Lucca and Sicily each harvest season.'
    },
    {
      icon: Heart,
      title: 'Empathetic Hospitality',
      desc: 'Our waitstaff does not just deliver dishes; they read your cadence, curate your evening, and make every guest feel like cherished family.'
    }
  ];

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-24 relative overflow-hidden">
      {/* Decorative Floating Leaves */}
      <FloatingLeaf
        className="-top-4 -left-6 lg:left-6"
        size={85}
        rotate={-20}
        blur="blur-[2px]"
        opacity="opacity-80"
      />
      <FloatingLeaf
        className="top-1/2 -right-8"
        size={70}
        rotate={35}
        blur="blur-[3px]"
        opacity="opacity-70"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Editorial Story Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B21818] block">
              Our Journey Since 2012
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-[1.12]">
              Crafting memories one table, one wine, and one flame at a time.
            </h1>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-normal">
              Foody was born out of a quiet rebellion against sterile, rushed dining. We dreamed of creating a sanctuary where time softens, conversations flow effortlessly, and every mouthful honors generations of artisan craftsmanship.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              From our custom-built 800° wood-fire hearth to our underground brick wine vault, every inch of Foody has been deliberately designed to awaken the senses and make dining a true, heartfelt experience.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onBookTableClick}
                className="px-8 py-3.5 rounded-full bg-[#B21818] text-white font-semibold text-sm hover:bg-[#961313] transition shadow-md"
              >
                Experience Our Table
              </button>
              <button
                onClick={() => onNavigate('menu')}
                className="px-8 py-3.5 rounded-full bg-white text-stone-800 font-semibold text-sm hover:bg-stone-100 transition border border-stone-200 shadow-xs"
              >
                Explore The Menu
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-8 ring-white aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80"
                alt="Foody Restaurant Ambiance and Guests"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Experience Pill */}
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-stone-100 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Traveller's Choice 2024</h4>
                  <p className="text-[11px] text-stone-400">Ranked Top 1% of Dining Establishments</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white rounded-3xl p-8 sm:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.03)] border border-stone-100">
          {RESTAURANT_INFO.stats.map((stat, idx) => (
            <div key={idx} className="text-center space-y-1">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-[#B21818] block">
                {stat.number}
              </span>
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Executive Chef Spotlight */}
        <div className="bg-[#FAF2EB] rounded-3xl p-8 sm:p-14 border border-stone-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-xl ring-4 ring-white aspect-square">
                <img
                  src={RESTAURANT_INFO.chef.image}
                  alt={RESTAURANT_INFO.chef.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                    The Culinary Architect
                  </span>
                  <h3 className="font-serif text-2xl font-bold">{RESTAURANT_INFO.chef.name}</h3>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B21818] bg-[#B21818]/10 px-3 py-1 rounded-full">
                <span>Executive Culinary Director</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                Meet Chef Mateo Rossi
              </h2>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                {RESTAURANT_INFO.chef.bio}
              </p>

              {/* Chef Quote Card */}
              <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-stone-200/60">
                <Quote className="w-8 h-8 text-[#B21818]/20 absolute top-4 right-4" />
                <p className="font-serif italic text-stone-800 text-base leading-relaxed">
                  "{RESTAURANT_INFO.chef.quote}"
                </p>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Signature Creation
                  </span>
                  <span className="text-xs font-bold text-[#B21818]">
                    {RESTAURANT_INFO.chef.signatureDish}
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Our Culinary Philosophy & Values */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B21818] block">
              Core Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Our Uncompromising Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-7 shadow-sm border border-stone-100 hover:shadow-xl transition-all duration-300 space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#B21818]/10 text-[#B21818] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">{v.title}</h3>
                  <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interior & Cellar Ambiance Gallery */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B21818] block">
              Architectural Elegance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              The Architecture of Comfort
            </h2>
            <p className="text-stone-500 text-sm">
              Designed with bespoke walnut woodwork, hand-troweled stucco, and warm amber candlelight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AMBIANCE_GALLERY.map((item, idx) => (
              <div key={idx} className="group rounded-3xl overflow-hidden shadow-md bg-stone-900 relative h-72">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-serif text-base font-bold">{item.title}</h4>
                  <p className="text-[11px] text-stone-300 mt-1 line-clamp-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
