export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}
// membuat daftar menu array of object
export const menuData: Product[] = [
  // Kopi (6)
  {
    id: 1,
    name: "Kopi Susu Aren",
    description:
      "Espresso murni dipadukan dengan susu segar dan manisnya gula aren alami.",
    price: 20000,
    image:
      "https://images.unsplash.com/photo-1593443320739-77f74939d0da?w=500&q=80",
    category: "Kopi",
  },
  {
    id: 2,
    name: "Americano",
    description:
      "Paduan espresso murni dengan air es. Sangat segar dan cocok untuk cuaca panas.",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=500&q=80",
    category: "Kopi",
  },
  {
    id: 10,
    name: "Cafe Latte",
    description:
      "Espresso diseduh dengan susu *steamed* yang lembut, menghasilkan rasa seimbang.",
    price: 22000,
    image:
      "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=500&q=80",
    category: "Kopi",
  },
  {
    id: 11,
    name: "Cappuccino",
    description:
      "Kopi klasik italia dengan takaran espresso, susu, dan foam yang pas.",
    price: 22000,
    image:
      "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&q=80",
    category: "Kopi",
  },
  {
    id: 12,
    name: "Caramel Macchiato",
    description:
      "Paduan sirup karamel manis dan espresso murni. Pilihan favorit banyak orang.",
    price: 26000,
    image:
      "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=500&q=80",
    category: "Kopi",
  },
  {
    id: 13,
    name: "Mocha Latte",
    description:
      "Paduan rasa espresso dan cokelat belgia pekat, disajikan panas atau dingin.",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80",
    category: "Kopi",
  },

  // Aneka Minuman (6)
  {
    id: 3,
    name: "Matcha Latte",
    description:
      "Serbuk matcha premium jepang dipadukan dengan susu segar yang creamy.",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=500&q=80",
    category: "Aneka Minuman",
  },
  {
    id: 4,
    name: "Ice Chocolate",
    description:
      "Cokelat belgia asli yang kaya rasa disajikan dingin untuk menyegarkan harimu.",
    price: 22000,
    image:
      "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=500&q=80",
    category: "Aneka Minuman",
  },
  {
    id: 14,
    name: "Taro Latte",
    description:
      "Minuman taro yang khas dan *creamy*. Manisnya pas, cocok untuk relaksasi.",
    price: 20000,
    image:
      "https://images.unsplash.com/photo-1558024220-b4afce66b962?w=500&q=80",
    category: "Aneka Minuman",
  },
  {
    id: 15,
    name: "Red Velvet Latte",
    description:
      "Cita rasa *red velvet* cake dalam segelas minuman susu yang manis dan lezat.",
    price: 23000,
    image:
      "https://images.unsplash.com/photo-1620189507963-39ac4d8a14b0?w=500&q=80",
    category: "Aneka Minuman",
  },
  {
    id: 16,
    name: "Lychee Iced Tea",
    description:
      "Teh melati dingin yang diseduh dengan buah leci asli yang menyegarkan dahaga.",
    price: 20000,
    image:
      "https://images.unsplash.com/photo-1556881286-fc6915169721?w=500&q=80",
    category: "Aneka Minuman",
  },
  {
    id: 17,
    name: "Lemon Tea",
    description:
      "Paduan teh hitam pekat dengan perasan jeruk lemon asli. Kaya vitamin C.",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1497534446932-c925b458310e?w=500&q=80",
    category: "Aneka Minuman",
  },

  // Roti (6)
  {
    id: 5,
    name: "Croissant Butter",
    description:
      "Roti croissant renyah dengan rasa mentega yang gurih. Pas untuk teman ngopi.",
    price: 20000,
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f40ce88ca?w=500&q=80",
    category: "Roti",
  },
  {
    id: 18,
    name: "Chocolatine",
    description:
      "Croissant autentik prancis dengan kepingan cokelat di dalamnya yang lumer.",
    price: 22000,
    image:
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=500&q=80",
    category: "Roti",
  },
  {
    id: 19,
    name: "Almond Croissant",
    description:
      "Croissant panggang bertabur irisan kacang almond panggang nan renyah ekstra.",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1626082987179-8473ba758063?w=500&q=80",
    category: "Roti",
  },
  {
    id: 20,
    name: "Cinnamon Roll",
    description:
      "Roti gulung *cinnamon* manis beraroma kayu manis dengan *glaze* lezat di atasnya.",
    price: 20000,
    image:
      "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=500&q=80",
    category: "Roti",
  },
  {
    id: 21,
    name: "Cheese Toast",
    description:
      "Roti panggang yang diisi keju mozzarella lumer. Kesukaan segala usia.",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=500&q=80",
    category: "Roti",
  },
  {
    id: 22,
    name: "Blueberry Muffin",
    description:
      "Kue basah lembut dengan taburan beri biru segar asli di setiap gigitan kecil.",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500&q=80",
    category: "Roti",
  },

  // Makanan Ringan (6)
  {
    id: 6,
    name: "French Fries",
    description:
      "Kentang goreng renyah dengan taburan bumbu gurih pilihan, disajikan dengan saus sambal.",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1576106195259-2c700941ca5f?w=500&q=80",
    category: "Makanan Ringan",
  },
  {
    id: 7,
    name: "Tahu Cabe Garam",
    description:
      "Tahu krispi yang ditumis dengan potongan cabai dan bawang putih yang harum.",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1548818556-3c0542ab3c4b?w=500&q=80",
    category: "Makanan Ringan",
  },
  {
    id: 23,
    name: "Onion Rings",
    description:
      "Cincin bawang bombay berbalut tepung renyah bumbu ala barat spesial.",
    price: 20000,
    image:
      "https://images.unsplash.com/photo-1639024471283-0351888251ad?w=500&q=80",
    category: "Makanan Ringan",
  },
  {
    id: 24,
    name: "Chicken Wings",
    description:
      "Sayap ayam goreng bumbu pedas manis *buffalo style*. Sangat pas untuk *sharing*.",
    price: 30000,
    image:
      "https://images.unsplash.com/photo-1569058242253-1df250a6e355?w=500&q=80",
    category: "Makanan Ringan",
  },
  {
    id: 25,
    name: "Nachos Cheese",
    description:
      "Keripik jagung khas meksiko berlumur saus keju pedas, *jalapeno*, dan daging sapi.",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1582169505937-b9992bd01ed9?w=500&q=80",
    category: "Makanan Ringan",
  },
  {
    id: 26,
    name: "Calamari Rings",
    description:
      "Cumi goreng tepung empuk yang disajikan dengan *tartar sauce* lemon segar.",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1631557026723-53d712ce6a84?w=500&q=80",
    category: "Makanan Ringan",
  },

  // Makanan Berat (6)
  {
    id: 8,
    name: "Nasi Goreng Spesial",
    description:
      "Nasi goreng bumbu rempah khas dengan tambahan telur lebak, ayam suwir, dan kerupuk.",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80",
    category: "Makanan Berat",
  },
  {
    id: 9,
    name: "Spaghetti Carbonara",
    description:
      "Pasta dengan saus krim susu spesial, smoked beef, dan taburan keju parmesan.",
    price: 38000,
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&q=80",
    category: "Makanan Berat",
  },
  {
    id: 27,
    name: "Nasi Ayam Mentega",
    description:
      "Potongan ayam digoreng krispi ditumis mentega, kecap manis, dan bawang bombay.",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1626804475297-4160aeea1a55?w=500&q=80",
    category: "Makanan Berat",
  },
  {
    id: 28,
    name: "Chicken Katsu Curry",
    description:
      "Kari kental khas Jepang dilengkapi ayam fillet katsu krispi dan wortel cincang.",
    price: 42000,
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80",
    category: "Makanan Berat",
  },
  {
    id: 29,
    name: "Mie Goreng Jawa",
    description:
      "Mie telur kenyal digoreng *smokey* dengan sayuran hijau, suwiran ayam, dan telor ceplok.",
    price: 30000,
    image:
      "https://images.unsplash.com/photo-1613564834361-9436940a5a54?w=500&q=80",
    category: "Makanan Berat",
  },
  {
    id: 30,
    name: "Beef Burger",
    description:
      "Roti bun keemasan dengan sapi cincang *juicy*, ditaburi racikan saus burger *signature*.",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
    category: "Makanan Berat",
  },
];
