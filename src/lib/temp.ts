export const CATEGORIES = [
  { id: 1, name: "Momo Specials", slug: "momo", order: 1 },
  { id: 2, name: "Pizzas", slug: "pizza", order: 2 },
  { id: 3, name: "Appetizers & Snacks", slug: "snacks", order: 3 },
  { id: 4, name: "Cold Beverages", slug: "cold-drinks", order: 4 },
  { id: 5, name: "Hard Drinks", slug: "hard-drinks", order: 5 },
];

export const MENU_ITEMS = [
  // --- Category 1: Momo Specials ---
  {
    id: 1,
    name: "Veg Steam Momo",
    price: 150,
    dietary: "veg",
    categoryId: 1,
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
  },
  {
    id: 2,
    name: "Chicken Steam Momo",
    price: 220,
    dietary: "non-veg",
    categoryId: 1,
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
  },
  {
    id: 3,
    name: "Buff Fried Momo",
    price: 200,
    dietary: "non-veg",
    categoryId: 1,
    image:
      "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
  },
  {
    id: 4,
    name: "Veg Chilly Momo",
    price: 220,
    dietary: "veg",
    categoryId: 1,
    image:
      "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
  },
  {
    id: 5,
    name: "Chicken Jhol Momo",
    price: 260,
    dietary: "non-veg",
    categoryId: 1,
    image:
      "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80",
    isAvailable: false, // Out of stock for testing
  },

  // --- Category 2: Pizzas ---
  {
    id: 6,
    name: "Margherita Pizza",
    price: 450,
    dietary: "veg",
    categoryId: 2,
    image:
      "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
  },
  {
    id: 7,
    name: "Spicy Chicken Pizza",
    price: 580,
    dietary: "non-veg",
    categoryId: 2,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
  },

  // --- Category 3: Appetizers & Snacks ---
  {
    id: 8,
    name: "French Fries",
    price: 120,
    dietary: "veg",
    categoryId: 3,
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
  },
  {
    id: 9,
    name: "Crispy Chicken Wings",
    price: 320,
    dietary: "non-veg",
    categoryId: 3,
    image:
      "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
  },

  // --- Category 4: Cold Beverages ---
  {
    id: 10,
    name: "Coca-Cola",
    price: 60,
    dietary: null,
    categoryId: 4,
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
  },
  {
    id: 11,
    name: "Fresh Lemon Mint Soda",
    price: 110,
    dietary: null,
    categoryId: 4,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
  },

  // --- Category 5: Hard Drinks ---
  {
    id: 12,
    name: "Gorkha Premium Beer",
    price: 420,
    dietary: null,
    categoryId: 5,
    image:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
  },
  {
    id: 13,
    name: "Tuborg Classic Beer",
    price: 450,
    dietary: null,
    categoryId: 5,
    image:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=80",
    isAvailable: false, // Out of stock for testing
  },
];
