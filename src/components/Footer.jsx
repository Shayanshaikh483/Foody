import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight, Heart, CheckCircle } from 'lucide-react';
import { InstagramIcon, FacebookIcon, TwitterIcon } from './SocialIcons';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { createNewsletterSubscription } from '../lib/supabase';

export default function Footer({ onNavigate }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      const emailToSave = newsletterEmail.trim();
      setSubscribed(true);
      setNewsletterEmail('');
      await createNewsletterSubscription(emailToSave);
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-3xl font-bold text-white tracking-tight">
                Food<span className="text-[#B21818]">y</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-[#B21818] inline-block mb-1"></span>
            </div>
            
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              {RESTAURANT_INFO.storySnippet}
            </p>

            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-stone-400 font-bold block mb-2">
                Join our Epicurean Circle
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-stone-800/90 text-white placeholder-stone-500 text-xs px-4 py-2.5 rounded-full flex-1 border border-stone-700 focus:outline-none focus:border-[#B21818]"
                />
                <button
                  type="submit"
                  className="bg-[#B21818] hover:bg-[#961313] text-white px-5 py-2.5 rounded-full text-xs font-bold transition flex items-center gap-1 shadow-sm"
                >
                  Join
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
              {subscribed && (
                <p className="text-emerald-400 text-xs font-medium mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Thank you for subscribing to our private tastings!
                </p>
              )}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-serif font-bold text-base tracking-wide">Explore</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition">
                  Home Experience
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('menu')} className="hover:text-white transition">
                  A La Carte Menu
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition">
                  Our Culinary Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reservations')} className="hover:text-white transition">
                  Book A Table
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition">
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours */}
          <div className="space-y-3">
            <h4 className="text-white font-serif font-bold text-base tracking-wide">Dining Hours</h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div>
                <p className="font-semibold text-stone-200">Monday – Thursday</p>
                <p>12:00 PM – 10:30 PM</p>
              </div>
              <div>
                <p className="font-semibold text-stone-200">Friday & Saturday</p>
                <p>12:00 PM – 11:30 PM</p>
              </div>
              <div>
                <p className="font-semibold text-stone-200">Sunday Brunch & Dinner</p>
                <p>11:30 AM – 10:00 PM</p>
              </div>
            </div>
          </div>

          {/* Col 4: Contact info */}
          <div className="space-y-3">
            <h4 className="text-white font-serif font-bold text-base tracking-wide">Connect</h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B21818] flex-shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address.street}, {RESTAURANT_INFO.address.city}, {RESTAURANT_INFO.address.state}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B21818] flex-shrink-0" />
                <span>{RESTAURANT_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B21818] flex-shrink-0" />
                <span>{RESTAURANT_INFO.email}</span>
              </div>
            </div>

            {/* Socials */}
            <div className="pt-2 flex items-center gap-3 text-stone-400">
              <a href="#" className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-[#B21818] hover:text-white transition">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-[#B21818] hover:text-white transition">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-[#B21818] hover:text-white transition">
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Foody Experience Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-[#B21818] fill-[#B21818]" /> for unforgettable gastronomic moments
          </p>
        </div>

      </div>
    </footer>
  );
}
