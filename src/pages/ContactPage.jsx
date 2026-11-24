import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle,
  ChevronDown,
  Navigation,
  Car,
  Loader2
} from 'lucide-react';
import FloatingLeaf from '../components/FloatingLeaf';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { createContactInquiryRecord } from '../lib/supabase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Please fill out all required fields.');
      return;
    }
    setIsSubmitting(true);
    await createContactInquiryRecord(formData);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Decorative Floating Leaves */}
      <FloatingLeaf
        className="-top-4 -left-6 lg:left-8"
        size={80}
        rotate={-15}
        blur="blur-[2px]"
        opacity="opacity-80"
      />
      <FloatingLeaf
        className="top-1/3 -right-6"
        size={65}
        rotate={45}
        blur="blur-[1.5px]"
        opacity="opacity-70"
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#B21818] block">
          Get in Touch
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight">
          We’d Love to Hear From You
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Whether you have questions about bespoke private dining, sommelier selections, or dietary requests, our concierge is at your service.
        </p>
      </div>

      {/* Main 2-column grid: Info Cards & Inquiry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-24">
        
        {/* Left Column: Direct Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card: Location & Address */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-stone-200/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#B21818]/10 text-[#B21818] flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900">Visit Foody</h3>
              <p className="text-stone-600 text-sm mt-1 leading-relaxed">
                {RESTAURANT_INFO.address.street} <br />
                {RESTAURANT_INFO.address.city}, {RESTAURANT_INFO.address.state} {RESTAURANT_INFO.address.zip}
              </p>
              <div className="mt-3 p-3 bg-stone-50 rounded-xl text-xs text-stone-500 flex items-start gap-2">
                <Car className="w-4 h-4 text-stone-700 flex-shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address.directions}</span>
              </div>
            </div>
          </div>

          {/* Card: Phone & Reservations */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-stone-200/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#B21818]/10 text-[#B21818] flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900">Call Us Directly</h3>
              <div className="space-y-1.5 mt-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">Concierge:</span>
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="font-bold text-stone-900 hover:text-[#B21818]">
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Private Events:</span>
                  <a href={`tel:${RESTAURANT_INFO.reservationPhone}`} className="font-bold text-stone-900 hover:text-[#B21818]">
                    {RESTAURANT_INFO.reservationPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Operating Hours */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-stone-200/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#B21818]/10 text-[#B21818] flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900">Service Hours</h3>
              <div className="space-y-3 mt-3 text-xs sm:text-sm">
                {RESTAURANT_INFO.hours.map((h, i) => (
                  <div key={i} className="pb-2 border-b border-stone-100 last:border-0 last:pb-0">
                    <span className="font-bold text-stone-900 block">{h.days}</span>
                    <div className="flex justify-between text-stone-500 text-xs mt-0.5">
                      <span>Lunch: {h.lunch}</span>
                      <span>Dinner: {h.dinner}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_15px_45px_rgba(0,0,0,0.04)] border border-stone-200/80">
          
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-9 h-9" />
              </div>
              <div className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full text-xs font-bold border border-emerald-200">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Saved to Supabase Database</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Message Sent Successfully!
              </h3>
              <p className="text-stone-500 text-sm max-w-md mx-auto">
                Thank you for reaching out, <span className="font-semibold text-stone-800">{formData.name}</span>. Our hospitality concierge will respond within 4 business hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                }}
                className="px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B21818] block">
                  Send A Message
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                  How may we curate your dining experience?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Hayes"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#B21818]/20 focus:border-[#B21818]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="julian@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#B21818]/20 focus:border-[#B21818]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">Subject / Area of Interest</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#B21818]/20"
                >
                  <option value="General Inquiry">General Dining Inquiry</option>
                  <option value="Private Event">Private Room / Corporate Event (8+ Guests)</option>
                  <option value="Sommelier & Wine">Wine Pairing & Cellar Inquiries</option>
                  <option value="Press & Media">Press & Media Relations</option>
                  <option value="Chef Feedback">Guest Feedback & Culinary Appreciation</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">Your Message *</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tell us about your celebration, date preference, or any special culinary details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#B21818]/20 focus:border-[#B21818]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#B21818] hover:bg-[#961313] text-white font-bold text-sm shadow-[0_8px_20px_rgba(178,24,24,0.35)] transition-all flex items-center justify-center gap-2 group disabled:opacity-75 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Delivering Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Inquiry</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>

      {/* Styled Location Section & Visual Map Card */}
      <div className="bg-stone-900 rounded-3xl overflow-hidden shadow-2xl text-white mb-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          <div className="lg:col-span-5 p-8 sm:p-12 space-y-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold w-fit">
              <Navigation className="w-3.5 h-3.5" />
              <span>Location Landmark</span>
            </div>

            <h3 className="font-serif text-3xl font-bold leading-tight">
              Nestled in the Historic Culinary Quarter
            </h3>

            <p className="text-stone-300 text-sm leading-relaxed">
              Surrounded by historic cobblestone streets and artisan galleries, Foody offers an intimate retreat from the bustling city rhythm.
            </p>

            <div className="space-y-3 pt-2 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Subway: Mercer St Station (Lines N, Q, R, W) — 2 min walk</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Complimentary white-glove valet from 5:00 PM onwards</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-stone-900 text-xs font-bold hover:bg-stone-100 transition shadow-md"
              >
                <span>Open in Google Maps</span>
                <Navigation className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[340px] bg-stone-800">
            {/* Visual map simulation with pin */}
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80"
              alt="Map view of culinary quarter"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-stone-900/40" />

            {/* Pulsing Pin for Foody */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#B21818] text-white flex items-center justify-center shadow-2xl ring-4 ring-white animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="w-12 h-12 rounded-full bg-[#B21818]/40 absolute top-0 left-0 animate-ping pointer-events-none" />
              </div>
              <div className="mt-2 bg-stone-900/90 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-bold shadow-lg border border-white/20 whitespace-nowrap">
                Foody Restaurant & Wine Vault
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B21818] block">
            Common Inquiries
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {RESTAURANT_INFO.faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-stone-50 transition"
                >
                  <span className="font-serif font-bold text-stone-900 text-base sm:text-lg">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-[#B21818]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-stone-600 text-xs sm:text-sm leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
