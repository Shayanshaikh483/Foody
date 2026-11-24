import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import DishDetailModal from './components/DishDetailModal';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import ReservationsPage from './pages/ReservationsPage';
import ContactPage from './pages/ContactPage';
import { Check, ShoppingBag } from 'lucide-react';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDishForModal, setSelectedDishForModal] = useState(null);
  const { notification, setIsCartOpen, totalItems } = useCart();

  // Scroll to top on page change
  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookTable = () => {
    navigateTo('reservations');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F3] text-stone-800 font-sans selection:bg-[#B21818] selection:text-white">
      {/* Toast Notification when adding items to cart */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-stone-700 animate-fade-in">
          <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-medium">{notification.message}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-xs font-bold text-[#FFBD2E] underline ml-2 hover:text-white"
          >
            View Bag ({totalItems})
          </button>
        </div>
      )}

      {/* Global Navbar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={navigateTo}
        onBookTableClick={handleBookTable}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenDishModal={setSelectedDishForModal}
            onBookTableClick={handleBookTable}
          />
        )}
        {currentPage === 'menu' && (
          <MenuPage
            onOpenDishModal={setSelectedDishForModal}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage
            onNavigate={navigateTo}
            onBookTableClick={handleBookTable}
          />
        )}
        {currentPage === 'reservations' && (
          <ReservationsPage />
        )}
        {currentPage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Global Dish Detail Modal */}
      {selectedDishForModal && (
        <DishDetailModal
          dish={selectedDishForModal}
          onClose={() => setSelectedDishForModal(null)}
        />
      )}

      {/* Global Shopping Cart Side Drawer */}
      <CartDrawer
        onProceedToBooking={handleBookTable}
      />

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
