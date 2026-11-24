import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { createOrderRecord } from '../lib/supabase';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Start with 1 item pre-populated to match reference image (1 in bag badge!)
  const [cart, setCart] = useState([
    {
      id: 'steak-ribeye-hero',
      name: 'Prime Tomahawk Ribeye',
      subtitle: 'Charcoal Flame-Grilled Steak',
      price: 4800,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
      category: 'main'
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState(null);

  const addToCart = (dish, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === dish.id);
      if (existing) {
        return prev.map(item =>
          item.id === dish.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: dish.id,
          name: dish.name,
          subtitle: dish.subtitle,
          price: dish.price,
          quantity: quantity,
          image: dish.image,
          category: dish.category
        }
      ];
    });

    // Show toast notification
    setNotification({
      message: `Added ${dish.name} to your order`,
      timestamp: Date.now()
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const completeCheckout = async (checkoutData) => {
    const orderId = 'FD-' + Math.floor(100000 + Math.random() * 900000);
    const subtotal = checkoutData.subtotal ?? cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = checkoutData.discount ?? 0;
    const tax = checkoutData.tax ?? Math.round((subtotal - discount) * 0.16);
    const total = checkoutData.total ?? (subtotal - discount + tax);

    const orderRecord = {
      orderId,
      items: [...cart],
      subtotal,
      discount,
      tax,
      total,
      customer: {
        name: checkoutData.name,
        phone: checkoutData.phone,
        orderType: checkoutData.orderType,
        tableNumber: checkoutData.tableNumber
      },
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      savedToSupabase: true
    };

    // Persist order in Supabase
    const result = await createOrderRecord(orderRecord);
    if (!result.success) {
      console.error('[CartContext] Failed to save order to Supabase:', result.error);
      orderRecord.savedToSupabase = false;
    }

    setLastOrderDetails(orderRecord);
    setIsCheckoutSuccess(true);
    setIsCartOpen(false);
    clearCart();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#B21818', '#E63946', '#F4A261', '#2A9D8F', '#E76F51']
      });
    } catch {
      // safe fallback
    }
  };

  // Auto clear toast
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        notification,
        completeCheckout,
        isCheckoutSuccess,
        setIsCheckoutSuccess,
        lastOrderDetails
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
