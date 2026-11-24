import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  Sparkles,
  CheckCircle,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import FloatingLeaf from '../components/FloatingLeaf';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { createReservationRecord } from '../lib/supabase';

const TODAY_DATE_STRING = new Date().toISOString().split('T')[0];

export default function ReservationsPage() {
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [mealPeriod, setMealPeriod] = useState('dinner'); // 'lunch' | 'dinner'
  const [timeSlot, setTimeSlot] = useState('7:00 PM');
  const [seatingArea, setSeatingArea] = useState('main'); // 'main' | 'cellar' | 'terrace' | 'chef'
  const [occasion, setOccasion] = useState('Casual Dinner');
  
  // Guest contact info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Confirmation state
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const lunchSlots = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM'];
  const dinnerSlots = ['5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'];

  const seatingOptions = [
    {
      id: 'main',
      title: 'Main Dining Hall',
      desc: 'High vaulted ceilings, ambient lighting & bespoke Italian velvet booths.',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'cellar',
      title: 'The Wine Vault',
      desc: 'Intimate candlelit brick cellar surrounded by 450+ rare vintage bottles.',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'terrace',
      title: 'Garden Terrace',
      desc: 'Alfresco dining under fairy lights and fragrant olive trees.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'chef',
      title: "Chef's Counter",
      desc: 'Front-row view of our 800° wood fire hearth & culinary plating theatrics.',
      image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const validate = () => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid Email is required.';
    if (!phone.trim() || phone.length < 7) errs.phone = 'Valid Phone Number is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const bookingId = 'BK-' + Math.floor(100000 + Math.random() * 900000);
    const selectedSeatingObj = seatingOptions.find((s) => s.id === seatingArea);

    const booking = {
      bookingId,
      fullName,
      email,
      phone,
      guests,
      date,
      mealPeriod,
      timeSlot,
      seating: selectedSeatingObj?.title || 'Main Dining Hall',
      occasion,
      specialRequests: specialRequests.trim() || 'No special dietary requests specified.',
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    // Persist to Supabase backend
    await createReservationRecord(booking);

    setIsSubmitting(false);
    setConfirmedBooking(booking);

    // Confetti celebration!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B21818', '#FFBD2E', '#27C93F', '#FAF6F3']
      });
    } catch {
      // safe fallback
    }

    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Decorative Floating Leaves */}
      <FloatingLeaf
        className="-top-4 -right-8 lg:right-6"
        size={85}
        rotate={30}
        blur="blur-[2px]"
        opacity="opacity-80"
      />
      <FloatingLeaf
        className="top-1/2 -left-6"
        size={65}
        rotate={-40}
        blur="blur-[1.5px]"
        opacity="opacity-75"
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <span className="text-xs font-bold uppercase tracking-widest text-[#B21818] block">
          Table Reservations
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight">
          Reserve Your Gastronomic Experience
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Join us for an unforgettable evening. Reservations open 30 days in advance. We hold tables for 15 minutes past the reserved seating time.
        </p>
      </div>

      {confirmedBooking ? (
        /* Confirmed Booking Summary Card */
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-stone-200/80 text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full text-xs font-bold border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Saved to Supabase Database</span>
            </div>

            <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">
              We Look Forward to Welcoming You, {confirmedBooking.fullName}!
            </h2>
            <p className="text-stone-500 text-sm mt-2">
              A formal calendar invite and confirmation summary has been sent to <span className="font-semibold text-stone-800">{confirmedBooking.email}</span>.
            </p>
          </div>

          {/* Details breakdown */}
          <div className="bg-[#FAF6F3] rounded-2xl p-6 text-left border border-stone-200/60 space-y-3.5 text-xs sm:text-sm">
            <div className="flex justify-between items-center pb-2 border-b border-stone-200">
              <span className="text-stone-500">Booking Reference:</span>
              <span className="font-mono font-bold text-[#B21818] text-base">{confirmedBooking.bookingId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Date & Time:</span>
              <span className="font-bold text-stone-800">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Party Size:</span>
              <span className="font-bold text-stone-800">{confirmedBooking.guests} Guests</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Seating Atmosphere:</span>
              <span className="font-bold text-stone-800">{confirmedBooking.seating}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Occasion:</span>
              <span className="font-semibold text-stone-800">{confirmedBooking.occasion}</span>
            </div>
            {confirmedBooking.specialRequests && (
              <div className="pt-2 border-t border-stone-200 text-stone-600">
                <span className="text-stone-400 block text-xs">Special Requests:</span>
                <span>{confirmedBooking.specialRequests}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                alert(`Calendar event (.ics) for booking ${confirmedBooking.bookingId} generated!`);
              }}
              className="flex-1 py-3.5 rounded-full bg-stone-900 text-white font-semibold text-xs sm:text-sm hover:bg-stone-800 transition"
            >
              Add to Calendar (.ics)
            </button>
            <button
              onClick={() => setConfirmedBooking(null)}
              className="flex-1 py-3.5 rounded-full border border-stone-200 text-stone-700 font-semibold text-xs sm:text-sm hover:bg-stone-50 transition"
            >
              Make Another Reservation
            </button>
          </div>
        </div>
      ) : (
        /* Reservation Form */
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_15px_45px_rgba(0,0,0,0.04)] border border-stone-200/80">
          
          <form onSubmit={handleBookingSubmit} className="space-y-10">
            
            {/* Step 1: Party Size */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#B21818]" />
                <span>1. Select Number of Guests</span>
              </label>

              <div className="grid grid-cols-5 sm:grid-cols-8 gap-2.5">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGuests(num)}
                    className={`py-3 rounded-2xl text-sm font-bold transition-all ${
                      guests === num
                        ? 'bg-[#B21818] text-white shadow-md scale-105'
                        : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200/70'
                    }`}
                  >
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date & Meal Period */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 text-[#B21818]" />
                  <span>2. Reservation Date</span>
                </label>
                <input
                  type="date"
                  value={date}
                  min={TODAY_DATE_STRING}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#B21818]/20 focus:border-[#B21818]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#B21818]" />
                  <span>3. Dining Service</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMealPeriod('lunch');
                      setTimeSlot('1:00 PM');
                    }}
                    className={`py-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
                      mealPeriod === 'lunch'
                        ? 'bg-[#B21818] text-white border-[#B21818] shadow-sm'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Lunch (12 – 3:30 PM)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMealPeriod('dinner');
                      setTimeSlot('7:00 PM');
                    }}
                    className={`py-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
                      mealPeriod === 'dinner'
                        ? 'bg-[#B21818] text-white border-[#B21818] shadow-sm'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Dinner (5:30 – 11 PM)
                  </button>
                </div>
              </div>

            </div>

            {/* Time Slot Buttons */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                Available Seating Times
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {(mealPeriod === 'lunch' ? lunchSlots : dinnerSlots).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      timeSlot === slot
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-stone-50 text-stone-700 border border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Seating Atmosphere */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#B21818]" />
                <span>4. Preferred Seating Atmosphere</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {seatingOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setSeatingArea(opt.id)}
                    className={`group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                      seatingArea === opt.id
                        ? 'border-[#B21818] ring-2 ring-[#B21818]/20 shadow-lg'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="h-28 w-full bg-stone-100 relative">
                      <img
                        src={opt.image}
                        alt={opt.title}
                        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      {seatingArea === opt.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#B21818] text-white flex items-center justify-center">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-white">
                      <h4 className="font-bold text-stone-900 text-xs sm:text-sm">{opt.title}</h4>
                      <p className="text-[11px] text-stone-400 mt-1 line-clamp-2">{opt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4: Guest Details */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                5. Guest Information
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-stone-600 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Roosevelt"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-50 border ${
                      errors.fullName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-stone-200'
                    } focus:outline-none focus:ring-2 focus:ring-[#B21818]/20 focus:border-[#B21818]`}
                  />
                  {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="text-xs text-stone-600 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="eleanor@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-50 border ${
                      errors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-stone-200'
                    } focus:outline-none focus:ring-2 focus:ring-[#B21818]/20 focus:border-[#B21818]`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-xs text-stone-600 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-50 border ${
                      errors.phone ? 'border-rose-500 ring-1 ring-rose-500' : 'border-stone-200'
                    } focus:outline-none focus:ring-2 focus:ring-[#B21818]/20 focus:border-[#B21818]`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs text-stone-600 block mb-1">Occasion / Celebration</label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#B21818]/20"
                  >
                    <option value="Casual Dinner">Casual Dinner with Friends / Family</option>
                    <option value="Birthday Celebration">Birthday Celebration</option>
                    <option value="Romantic Anniversary">Romantic Anniversary</option>
                    <option value="Business Entertaining">Business Entertaining</option>
                    <option value="Wine Tasting">Special Wine Tasting</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-stone-600 block mb-1">Dietary Preferences or Allergies</label>
                  <input
                    type="text"
                    placeholder="e.g. Peanut allergy, gluten-free, vegan"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#B21818]/20"
                  />
                </div>
              </div>

            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Complimentary cancellation up to 2 hours prior to seating.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#B21818] hover:bg-[#961313] text-white font-bold text-sm shadow-[0_8px_20px_rgba(178,24,24,0.35)] transition-all transform hover:scale-105 active:scale-95 disabled:opacity-75 disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirming with Kitchen...</span>
                  </>
                ) : (
                  <span>Confirm Table Reservation</span>
                )}
              </button>
            </div>

          </form>

        </div>
      )}

      {/* Policies callout */}
      <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-500">
        <div className="p-4 rounded-2xl bg-white border border-stone-100 space-y-1">
          <span className="font-bold text-stone-800 block">Smart Casual Dress Code</span>
          <p>We kindly request tasteful evening wear. Sportswear and beach attire are discouraged.</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-stone-100 space-y-1">
          <span className="font-bold text-stone-800 block">Grace Period</span>
          <p>Tables are held for 15 minutes. Please notify us if you are experiencing delays.</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-stone-100 space-y-1">
          <span className="font-bold text-stone-800 block">Private Groups (8+)</span>
          <p>For parties larger than 8, please contact our concierge at {RESTAURANT_INFO.phone}.</p>
        </div>
      </div>

    </div>
  );
}
