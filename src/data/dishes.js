export const CATEGORIES = [
  { id: 'all', name: 'All Dishes', icon: 'Sparkles' },
  { id: 'starters', name: 'Starters', icon: 'UtensilsCrossed' },
  { id: 'main', name: 'Main Course', icon: 'Flame' },
  { id: 'pizza', name: 'Pizza', icon: 'Pizza' },
  { id: 'burgers', name: 'Burgers', icon: 'Sandwich' },
  { id: 'pasta', name: 'Pasta & Seafood', icon: 'Soup' },
  { id: 'desserts', name: 'Desserts', icon: 'Cake' },
  { id: 'drinks', name: 'Drinks & Wine', icon: 'Wine' }
];

export const DISHES = [
  {
    id: 'pizza-margherita',
    name: 'Margherita Pizza',
    subtitle: 'Classic Italian Pizza',
    category: 'pizza',
    price: 1850,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    description: 'San Marzano tomato coulis, fresh fior di latte mozzarella, fragrant sweet basil, and first cold-pressed Sicilian olive oil on naturally leavened dough.',
    calories: '680 kcal',
    prepTime: '15 mins',
    tags: ['Bestseller', 'Vegetarian'],
    isFeatured: true,
    isChefSpecial: false,
    discountBadge: 'Popular'
  },
  {
    id: 'pasta-creamy-truffle',
    name: 'Creamy Pasta',
    subtitle: 'With Mushroom & Truffle',
    category: 'pasta',
    price: 1650,
    rating: 4.8,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted bronze-die fettuccine tossed in a velvet Parmigiano-Reggiano emulsion, wild forest cremini mushrooms, and black winter truffle infusion.',
    calories: '610 kcal',
    prepTime: '20 mins',
    tags: ['Chef Signature', 'Vegetarian'],
    isFeatured: true,
    isChefSpecial: true,
    discountBadge: null
  },
  {
    id: 'burger-classic',
    name: 'Classic Burger',
    subtitle: 'Beef & Aged Cheese',
    category: 'burgers',
    price: 1450,
    rating: 4.9,
    reviewsCount: 185,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    description: 'Dry-aged prime Angus beef patty, melted Wisconsin cheddar, caramelized balsamic onions, crisp butter lettuce, and house heirloom aioli on a toasted brioche bun.',
    calories: '750 kcal',
    prepTime: '15 mins',
    tags: ['Customer Favorite'],
    isFeatured: true,
    isChefSpecial: false,
    discountBadge: null
  },
  {
    id: 'salad-fresh-burrata',
    name: 'Fresh Salad',
    subtitle: 'Healthy & Tasty Burrata',
    category: 'starters',
    price: 1250,
    rating: 4.7,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    description: 'Creamy Puglia burrata, colorful vine-ripened baby heirloom tomatoes, crisp wild arugula, roasted pine nuts, and aged balsamic glaze.',
    calories: '340 kcal',
    prepTime: '10 mins',
    tags: ['Healthy', 'Vegetarian', 'Gluten-Free'],
    isFeatured: true,
    isChefSpecial: false,
    discountBadge: null
  },
  {
    id: 'steak-ribeye-hero',
    name: 'Prime Tomahawk Ribeye',
    subtitle: 'Charcoal Flame-Grilled Steak',
    category: 'main',
    price: 4800,
    rating: 5.0,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    description: 'USDA Prime dry-aged 35 days, flame-seared over applewood coals. Served with rosemary roasted potato wedges, organic garden cherry tomatoes, and red wine demi-glace.',
    calories: '890 kcal',
    prepTime: '25 mins',
    tags: ['Chef Signature', 'Gluten-Free'],
    isFeatured: true,
    isChefSpecial: true,
    discountBadge: '15% Off 2 Orders'
  },
  {
    id: 'pizza-tartufo',
    name: 'Tartufo Nero Pizza',
    subtitle: 'Black Truffle & Prosciutto',
    category: 'pizza',
    price: 2450,
    rating: 4.9,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    description: 'White base with fior di latte, aged Prosciutto di Parma, shaved black truffles, organic mascarpone, and baby arugula dressed in white truffle oil.',
    calories: '720 kcal',
    prepTime: '16 mins',
    tags: ['Premium Special'],
    isFeatured: false,
    isChefSpecial: true,
    discountBadge: null
  },
  {
    id: 'burger-truffle-royale',
    name: 'Truffle Wagyu Royale',
    subtitle: 'A5 Wagyu & Black Truffle Mayo',
    category: 'burgers',
    price: 2650,
    rating: 5.0,
    reviewsCount: 164,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    description: '100% Japanese Wagyu blend, fontina cheese, sautéed chanterelles, summer black truffle mayo, and 24k gold leaf touch on artisanal squid-ink brioche.',
    calories: '810 kcal',
    prepTime: '18 mins',
    tags: ['Chef Signature'],
    isFeatured: false,
    isChefSpecial: true,
    discountBadge: null
  },
  {
    id: 'salmon-pan-seared',
    name: 'Atlantic Salmon Crisp',
    subtitle: 'Wild Salmon & Citrus Velouté',
    category: 'main',
    price: 3250,
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    description: 'Pan-crisped Norwegian salmon fillet, tender grilled asparagus spears, herb-infused fingerling potatoes, and Meyer lemon dill velouté.',
    calories: '540 kcal',
    prepTime: '20 mins',
    tags: ['Healthy', 'Gluten-Free'],
    isFeatured: false,
    isChefSpecial: false,
    discountBadge: null
  },
  {
    id: 'starter-calamari',
    name: 'Crispy Salt & Pepper Calamari',
    subtitle: 'With Smoked Paprika Aioli',
    category: 'starters',
    price: 1550,
    rating: 4.7,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    description: 'Tender Monterey squid lightly tossed in seasoned rice flour, flash-fried to golden perfection, served with garlic saffron aioli and charred lemon wedges.',
    calories: '420 kcal',
    prepTime: '12 mins',
    tags: ['Seafood'],
    isFeatured: false,
    isChefSpecial: false,
    discountBadge: null
  },
  {
    id: 'dessert-lava-cake',
    name: 'Valrhona Molten Cake',
    subtitle: 'Dark Chocolate Lava & Gelato',
    category: 'desserts',
    price: 1350,
    rating: 4.9,
    reviewsCount: 205,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    description: 'Warm 70% dark Valrhona molten center cake, dusted with powdered Dutch cocoa, paired with artisanal Tahitian vanilla bean gelato and raspberry coulis.',
    calories: '490 kcal',
    prepTime: '12 mins',
    tags: ['Bestseller', 'Vegetarian'],
    isFeatured: false,
    isChefSpecial: true,
    discountBadge: null
  },
  {
    id: 'dessert-tiramisu',
    name: 'Artisan Tiramisù',
    subtitle: 'Espresso & Crema Mascarpone',
    category: 'desserts',
    price: 1150,
    rating: 4.8,
    reviewsCount: 138,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    description: 'Savoiardi ladyfingers soaked in single-origin espresso and dark rum, layered with silky whipped mascarpone sabayon and Belgian dark chocolate curls.',
    calories: '440 kcal',
    prepTime: '8 mins',
    tags: ['Classic', 'Vegetarian'],
    isFeatured: false,
    isChefSpecial: false,
    discountBadge: null
  },
  {
    id: 'drink-smoke-bourbon',
    name: 'Smoked Velvet Reserve',
    subtitle: 'Botanical Infusion & Smoke',
    category: 'drinks',
    price: 1450,
    rating: 4.9,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    description: 'Craft reserve botanicals, raw Demerara sugar, Angostura & orange zest, expressed flamed peel, smoked table-side under a glass cloche.',
    calories: '180 kcal',
    prepTime: '5 mins',
    tags: ['Signature Drink'],
    isFeatured: false,
    isChefSpecial: true,
    discountBadge: null
  },
  {
    id: 'drink-hibiscus-spritz',
    name: 'Sparkling Hibiscus Berry',
    subtitle: 'Elderflower, Mint & Soda',
    category: 'drinks',
    price: 850,
    rating: 4.7,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    description: 'Wild hibiscus flower tea, St. Germain elderflower cordial, fresh crushed muddled blackberries, fresh spearmint, topped with sparkling water.',
    calories: '110 kcal',
    prepTime: '5 mins',
    tags: ['Mocktail / Non-Alcoholic'],
    isFeatured: false,
    isChefSpecial: false,
    discountBadge: null
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: 'Elena Rostova',
    role: 'Food & Wine Critic',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    title: 'An Unforgettable Culinary Masterpiece',
    comment: 'From the tender char on the Tomahawk steak to the delicate velvet truffle pasta, Foody redefines contemporary dining. The ambiance is warm, intimate, and effortlessly luxurious.',
    dish: 'Prime Tomahawk Ribeye'
  },
  {
    id: 2,
    name: 'Marcus Sterling',
    role: 'Sommelier & Restaurateur',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    title: 'Flawless Attention to Detail',
    comment: 'Every plate tells a thoughtful story of artisan heritage. The drink pairings elevate the dining experience into pure art. A must-visit gem in the city.',
    dish: 'Tartufo Nero Pizza'
  },
  {
    id: 3,
    name: 'Sophia Chen',
    role: 'Lifestyle Editor, Epicure Magazine',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    title: 'The Best Hospitality in Town',
    comment: 'The staff anticipates your every need before you even speak. The dessert molten cake alone is worth booking weeks in advance. Sublime in every aspect.',
    dish: 'Valrhona Molten Cake'
  }
];

export const AMBIANCE_GALLERY = [
  {
    title: 'The Grand Main Dining Hall',
    description: 'Vaulted ceilings, custom ambient lighting, and bespoke velvet seating.',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80',
    badge: 'Main Dining'
  },
  {
    title: 'The Secret Vault & Cellar',
    description: 'Over 450 vintage reserve labels carefully curated from renowned estates.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80',
    badge: 'Cellar'
  },
  {
    title: 'The Garden Lantern Terrace',
    description: 'Alfresco dining surrounded by fragrant olive trees, fairy lights, and live acoustic melodies.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    badge: 'Alfresco'
  },
  {
    title: 'The Chef\'s Interactive Counter',
    description: 'Front-row seats to culinary theatrical fire, precision plating, and tasting conversations.',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1000&q=80',
    badge: 'Chef Table'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    likes: '1.4k',
    comments: '82',
    caption: 'Golden hour moments at our central courtyard terrace.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=600&q=80',
    likes: '2.8k',
    comments: '134',
    caption: 'Fire, rosemary, and the perfection of dry-aged steak.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1579684947550-22e945225d9a?auto=format&fit=crop&w=600&q=80',
    likes: '980',
    comments: '46',
    caption: 'Freshly stretched sourdough dough ready for stone baking.'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    likes: '3.1k',
    comments: '210',
    caption: 'Handcrafted pasta ribbons prepared fresh every sunrise.'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
    likes: '1.2k',
    comments: '58',
    caption: 'Tonight’s culinary spotlight: handcrafted reserves.'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    likes: '4.5k',
    comments: '340',
    caption: 'It is not just food; it is an experience.'
  }
];
