import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag, CheckCircle, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../utils/currency';

export default function CartDrawer({ onProceedToBooking }) {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    completeCheckout,
    isCheckoutSuccess,
    setIsCheckoutSuccess,
    lastOrderDetails
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderType, setOrderType] = useState('dine-in'); // 'dine-in' | 'takeaway'
  const [tableNumber, setTableNumber] = useState('Table 14');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  if (!isCartOpen && !isCheckoutSuccess) return null;

  const discount = promoApplied ? subtotal * 0.15 : 0;
  const tax = (subtotal - discount) * 0.16;
  const finalTotal = subtotal - discount + tax;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'EXPERIENCE15' || promoCode.trim().toUpperCase() === 'FOODY15') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "FOODY15" for 15% off.');
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!guestName.trim()) {
      alert('Please enter your name for the order.');
      return;
    }
    setIsPlacingOrder(true);
    await completeCheckout({
      name: guestName,
      phone: guestPhone,
      orderType,
      tableNumber: orderType === 'dine-in' ? tableNumber : 'N/A (Curbside Pick-up)',
      subtotal,
      discount,
      tax,
      total: finalTotal
    });
    setIsPlacingOrder(false);
    setIsCheckingOut(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => {
          setIsCartOpen(false);
          setIsCheckoutSuccess(false);
        }}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6F3] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 bg-white border-b border-stone-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B21818]" />
              <h2 className="text-xl font-serif font-bold text-stone-900">
                {isCheckingOut ? 'Confirm Your Order' : 'Your Tasting Order'}
              </h2>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutSuccess(false);
              }}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-800">Your bag is empty</h3>
                <p className="text-stone-500 text-sm mt-1 max-w-xs mx-auto">
                  Explore our chef's hand-crafted specials and add your favorite dishes to begin.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#B21818] text-white text-sm font-semibold hover:bg-[#961313] transition"
                >
                  Explore Menu
                </button>
              </div>
            ) : !isCheckingOut ? (
              <>
                {/* Promo notice */}
                <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-3 flex items-center justify-between text-xs text-amber-900">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Special perk: Use code <strong>FOODY15</strong> for 15% off!</span>
                  </div>
                </div>

                {/* Items list */}
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 flex items-center gap-4 transition hover:shadow-md"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-full object-cover shadow-sm flex-shrink-0 ring-2 ring-stone-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-stone-900 text-sm truncate">{item.name}</h4>
                        <p className="text-stone-400 text-xs truncate">{item.subtitle}</p>
                        <p className="text-[#B21818] font-bold text-sm mt-1">
                          {formatPKR(item.price * item.quantity)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-stone-100 rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-stone-600 hover:text-stone-900 shadow-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-stone-800 w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-stone-600 hover:text-stone-900 shadow-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-300 hover:text-rose-600 transition p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (try FOODY15)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-4 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#B21818]/20 focus:border-[#B21818]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800 transition"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-emerald-700 text-xs font-medium mt-1 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> 15% discount applied!
                    </p>
                  )}
                  {promoError && (
                    <p className="text-rose-600 text-xs mt-1">{promoError}</p>
                  )}
                </form>
              </>
            ) : (
              /* Checkout Form */
              <form onSubmit={handlePlaceOrder} id="checkout-form" className="space-y-4">
                <div className="bg-white p-4 rounded-2xl border border-stone-200/80 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                    Service Preference
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('dine-in')}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        orderType === 'dine-in'
                          ? 'border-[#B21818] bg-[#B21818]/5 text-[#B21818]'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      Dine-In Table
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('takeaway')}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        orderType === 'takeaway'
                          ? 'border-[#B21818] bg-[#B21818]/5 text-[#B21818]'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      Artisan Curbside
                    </button>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200/80 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                    Guest Details
                  </span>
                  <div>
                    <label className="text-xs text-stone-600 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexander Vance"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#B21818]/20 focus:border-[#B21818]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-stone-600 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#B21818]/20 focus:border-[#B21818]"
                    />
                  </div>
                  {orderType === 'dine-in' && (
                    <div>
                      <label className="text-xs text-stone-600 block mb-1">Assigned Table Number</label>
                      <input
                        type="text"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#B21818]/20 focus:border-[#B21818]"
                      />
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Footer calculation & Action buttons */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-stone-200 space-y-4">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">{formatPKR(subtotal)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount (15%)</span>
                    <span>-{formatPKR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Tax / SST (16%)</span>
                  <span>{formatPKR(tax)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-100">
                  <span>Total Due</span>
                  <span className="text-[#B21818]">{formatPKR(finalTotal)}</span>
                </div>
              </div>

              {!isCheckingOut ? (
                <div className="space-y-2">
                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full py-3.5 rounded-full bg-[#B21818] text-white font-semibold text-sm hover:bg-[#961313] transition shadow-md flex items-center justify-center gap-2 group"
                  >
                    <span>Proceed to Order</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-[11px] text-center text-stone-400 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Kitchen direct preparation with contactless service
                  </p>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="flex-1 py-3 rounded-full border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50"
                  >
                    Back to Items
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isPlacingOrder}
                    className="flex-1 py-3 rounded-full bg-[#B21818] text-white text-xs font-bold hover:bg-[#961313] shadow-md transition disabled:opacity-75 flex items-center justify-center gap-1.5"
                  >
                    {isPlacingOrder ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending to Kitchen...</span>
                      </>
                    ) : (
                      <span>Send to Kitchen</span>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Checkout Success Modal */}
      {isCheckoutSuccess && lastOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2 animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Saved to Supabase Database</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Kitchen Has Received Your Order!
            </h3>

            <div className="bg-[#FAF6F3] rounded-2xl p-4 text-xs text-left space-y-2 border border-stone-200/70">
              <div className="flex justify-between">
                <span className="text-stone-500">Order Reference:</span>
                <span className="font-mono font-bold text-stone-900">{lastOrderDetails.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Guest Name:</span>
                <span className="font-semibold text-stone-900">{lastOrderDetails.customer?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Service:</span>
                <span className="font-semibold text-stone-900">{lastOrderDetails.customer?.tableNumber}</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-2 font-bold text-sm">
                <span>Total Charged:</span>
                <span className="text-[#B21818]">{formatPKR(lastOrderDetails.total)}</span>
              </div>
            </div>

            <p className="text-xs text-stone-500">
              Our culinary team is already heating the pans. Estimated wait time is approximately 18–22 minutes.
            </p>

            <button
              onClick={() => setIsCheckoutSuccess(false)}
              className="w-full py-3 rounded-full bg-[#B21818] text-white font-semibold text-sm hover:bg-[#961313] transition shadow-md"
            >
              Back to Experience
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
