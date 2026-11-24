# 🍽️ Foody — Premium Artisan Restaurant & Dining Experience

> *"It's not just Food, It's an Experience."*

A modern, visually stunning, multi-page restaurant web application with dynamic cart, interactive table reservations, full menu exploration, and live Supabase backend persistence.

---

## ✨ Features

- **🎨 Modern Luxury Visual Design**:
  - Warm cream & blush background with deep crimson accents (`#B21818`).
  - High-contrast editorial serif typography (**Playfair Display**) + clean sans-serif (**Plus Jakarta Sans**).
  - Floating circular food plate cards with hover-lift micro-interactions.
  - Animated floating fresh basil leaves with realistic depth-of-field blur.
- **📄 5 Dedicated Pages**:
  - **Home**: Hero section matching the exact design prompt, signature dishes carousel, restaurant heritage preview, ambiance & spaces showcase, customer testimonials, seasonal discount promotion, and Instagram gallery.
  - **Menu**: Category filter pills (*All Dishes, Starters, Main Course, Pizza, Burgers, Pasta & Seafood, Desserts, Drinks & Wine*), live search filter, dietary tags (*Chef's Special, Vegetarian, Bestseller, Gluten-Free*), and dish detail modals.
  - **About Us**: Founding history since 2012, 14+ years mastery stats, Executive Chef Mateo Rossi spotlight & quote, core culinary principles, and interior gallery.
  - **Reservations**: Interactive party size selector (1–8+ guests), date picker, lunch/dinner time slots, seating atmosphere choice (*Main Dining, Wine Vault, Garden Terrace, Chef's Counter*), live validation, celebratory confetti, and instant booking summary.
  - **Contact**: Location & valet parking guide, direct telephone lines, operating hours breakdown, interactive inquiry form with validation, styled landmark map card, and FAQ accordion.
- **🛒 Interactive Food Bag / Cart Drawer**:
  - Slide-in side drawer with item quantity adjustments and dish removal.
  - Promo code discounts (e.g. `FOODY15` for 15% off).
  - Service options for *Dine-In Table* or *Artisan Curbside*.
  - Full checkout simulation with celebratory confetti.
- **⚡ Live Supabase Backend**:
  - Table reservations stored in `public.reservations`.
  - Guest inquiries stored in `public.contact_inquiries`.
  - Food bag orders stored in `public.orders`.
  - Newsletter subscriptions stored in `public.newsletter_subscribers`.
- **🇵🇰 Pakistani Rupees (PKR) Currency**:
  - All prices formatted in clean Pakistani format with thousands separators (e.g., `Rs. 850`, `Rs. 1,450`, `Rs. 1,850`, `Rs. 4,800`).

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visual Delight**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Backend / Database**: [Supabase](https://supabase.com/) (PostgreSQL with Row-Level Security)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Shayanshaikh483/Foody.git
cd Foody
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Production Build
```bash
npm run build
npm run preview
```

---

## 📜 License
Private proprietary project for Foody Restaurant. All rights reserved.
