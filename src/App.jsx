import React, { useState } from 'react';
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
import { Check } from 'lucide-react';

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
      {/* Toast Notification when adding items to cart - Fully responsive for all mobile screens */}
      {notification && (
        <div className="fixed bottom-4 inset-x-3 sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 bg-stone-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between sm:justify-start gap-2.5 border border-stone-700/80 animate-fade-in max-w-sm sm:max-w-md mx-auto sm:mx-0">
          <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-medium truncate flex-1 min-w-0">
            {notification.message}
          </span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-xs font-bold text-[#FFBD2E] underline hover:text-white flex-shrink-0 ml-1 py-1"
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
