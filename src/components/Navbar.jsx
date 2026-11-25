import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Calendar } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar({ currentPage, setCurrentPage, onBookTableClick }) {
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'About Us' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF6F3]/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.04)] py-3'
            : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Window Dots (inspired by reference) & Brand Logo */}
            <div className="flex items-center gap-6">
              {/* Three playful window dots from reference image */}
              <div className="hidden sm:flex items-center gap-1.5 opacity-80" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block shadow-sm"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block shadow-sm"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block shadow-sm"></span>
              </div>

              {/* Logo matching reference "Foody" */}
              <button
                onClick={() => handleNavClick('home')}
                className="group flex items-center text-left focus:outline-none"
              >
                <span className="font-serif text-3xl font-bold tracking-tight text-stone-900 group-hover:text-[#B21818] transition-colors">
                  Food<span className="text-[#B21818]">y</span>
                </span>
                <span className="ml-1 w-2 h-2 rounded-full bg-[#B21818] inline-block mb-2 group-hover:scale-125 transition-transform"></span>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative py-1 text-sm font-semibold tracking-wide transition-colors ${
                      isActive
                        ? 'text-stone-900 font-bold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[2.5px] bg-[#B21818] rounded-full transition-all" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right actions: Cart Bag & Sign Up / Reservation Button */}
            <div className="flex items-center gap-4">
              {/* Shopping Bag with red count badge matching reference */}
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label={`Shopping Cart with ${totalItems} items`}
                className="relative p-2.5 text-stone-800 hover:text-[#B21818] transition-colors rounded-full hover:bg-stone-200/50"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#B21818] text-white text-[10px] font-bold flex items-center justify-center shadow-sm animate-pulse-subtle">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Red Pill Primary Button matching reference */}
              <button
                onClick={() => {
                  if (onBookTableClick) onBookTableClick();
                  else handleNavClick('reservations');
                }}
                className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-[#B21818] hover:bg-[#961313] active:scale-95 shadow-[0_4px_14px_rgba(178,24,24,0.35)] transition-all duration-200"
              >
                Book A Table
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-stone-700 hover:text-stone-900 focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-stone-900/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="fixed inset-y-0 right-0 w-3/4 max-w-xs bg-[#FAF6F3] shadow-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-stone-200">
                <span className="font-serif text-2xl font-bold text-stone-900">
                  Food<span className="text-[#B21818]">y</span>
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full text-stone-600 hover:text-stone-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-8 flex flex-col space-y-4">
                {navLinks.map((link) => {
                  const isActive = currentPage === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`text-left text-lg font-semibold py-2 px-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-[#B21818]/10 text-[#B21818] font-bold'
                          : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-stone-200">
              <button
                onClick={() => {
                  handleNavClick('reservations');
                }}
                className="w-full py-3 rounded-full text-sm font-semibold text-white bg-[#B21818] hover:bg-[#961313] transition shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Reserve Table
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full py-3 rounded-full text-sm font-semibold text-stone-800 bg-white border border-stone-200 hover:bg-stone-50 transition flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                View Bag ({totalItems})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
