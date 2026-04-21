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
      "https://i.pinimg.com/736x/7f/94/20/7f94202f7ea02b30f68d6744ef580e2d.jpg",
    category: "Kopi",
  },
  {
    id: 2,
    name: "Americano",
    description:
      "Paduan espresso murni dengan air es. Sangat segar dan cocok untuk cuaca panas.",
    price: 15000,
    image:
      "https://i.pinimg.com/736x/e9/89/ee/e989eeb048a4d59cf0393d4e9bf2b2b3.jpg",
    category: "Kopi",
  },
  {
    id: 10,
    name: "Cafe Latte",
    description:
      "Espresso diseduh dengan susu *steamed* yang lembut, menghasilkan rasa seimbang.",
    price: 22000,
    image:
      "https://i.pinimg.com/736x/50/f1/7c/50f17c380525acf16c5ad8df185b1554.jpg",
    category: "Kopi",
  },
  {
    id: 11,
    name: "Cappuccino",
    description:
      "Kopi klasik italia dengan takaran espresso, susu, dan foam yang pas.",
    price: 22000,
    image:
      "https://i.pinimg.com/736x/63/9b/08/639b0874b7c1227a6c98cbeae656eba0.jpg",
    category: "Kopi",
  },
  {
    id: 12,
    name: "Caramel Macchiato",
    description:
      "Paduan sirup karamel manis dan espresso murni. Pilihan favorit banyak orang.",
    price: 26000,
    image:
      "https://i.pinimg.com/1200x/4a/8b/e1/4a8be1181973982ef71aca416448ff5e.jpg",
    category: "Kopi",
  },
  {
    id: 13,
    name: "Mocha Latte",
    description:
      "Paduan rasa espresso dan cokelat belgia pekat, disajikan panas atau dingin.",
    price: 25000,
    image:
      "https://i.pinimg.com/1200x/91/a8/7d/91a87dab2603e8cf69be1ecd143cab5a.jpg",
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
      "https://i.pinimg.com/1200x/60/a6/be/60a6bed284124c0cfccbcb4d597b0b58.jpg",
    category: "Aneka Minuman",
  },
  {
    id: 4,
    name: "Ice Chocolate",
    description:
      "Cokelat belgia asli yang kaya rasa disajikan dingin untuk menyegarkan harimu.",
    price: 22000,
    image:
      "https://i.pinimg.com/1200x/49/d2/1b/49d21be8b47cee64b48fbe15bdab109b.jpg",
    category: "Aneka Minuman",
  },
  {
    id: 14,
    name: "Taro Latte",
    description:
      "Minuman taro yang khas dan *creamy*. Manisnya pas, cocok untuk relaksasi.",
    price: 20000,
    image:
      "https://i.pinimg.com/1200x/95/95/75/9595752f6a294345dc18421d9e2666b2.jpg",
    category: "Aneka Minuman",
  },
  {
    id: 15,
    name: "Red Velvet Latte",
    description:
      "Cita rasa *red velvet* cake dalam segelas minuman susu yang manis dan lezat.",
    price: 23000,
    image:
      "https://i.pinimg.com/1200x/79/32/df/7932dfbef93d100f08f0b495b6b0f565.jpg",
    category: "Aneka Minuman",
  },
  {
    id: 16,
    name: "Lychee Iced Tea",
    description:
      "Teh melati dingin yang diseduh dengan buah leci asli yang menyegarkan dahaga.",
    price: 20000,
    image:
      "https://i.pinimg.com/736x/8d/43/37/8d4337f052681194d09bc7af73d93c44.jpg",
    category: "Aneka Minuman",
  },
  {
    id: 17,
    name: "Lemon Tea",
    description:
      "Paduan teh hitam pekat dengan perasan jeruk lemon asli. Kaya vitamin C.",
    price: 18000,
    image:
      "https://i.pinimg.com/1200x/40/c9/a1/40c9a16ffdf683b5820d6b678e027ae4.jpg",
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
      "https://i.pinimg.com/1200x/fb/5a/7b/fb5a7b4a04fe90e7ad03b98c79d6e836.jpg",
    category: "Roti",
  },
  {
    id: 18,
    name: "Chocolatine",
    description:
      "Croissant autentik prancis dengan kepingan cokelat di dalamnya yang lumer.",
    price: 22000,
    image:
      "https://i.pinimg.com/1200x/65/0a/7b/650a7b0a594bce1cb4423149329745fa.jpg",
    category: "Roti",
  },
  {
    id: 19,
    name: "Almond Croissant",
    description:
      "Croissant panggang bertabur irisan kacang almond panggang nan renyah ekstra.",
    price: 25000,
    image:
      "https://i.pinimg.com/236x/f8/36/3c/f8363c3279be605be78da26150646917.jpg",
    category: "Roti",
  },
  {
    id: 20,
    name: "Cinnamon Roll",
    description:
      "Roti gulung *cinnamon* manis beraroma kayu manis dengan *glaze* lezat di atasnya.",
    price: 20000,
    image:
      "https://i.pinimg.com/1200x/61/7c/70/617c70380bee4be660ab40ff02b5fedc.jpg",
    category: "Roti",
  },
  {
    id: 21,
    name: "Cheese Toast",
    description:
      "Roti panggang yang diisi keju mozzarella lumer. Kesukaan segala usia.",
    price: 25000,
    image:
      "https://i.pinimg.com/736x/11/e9/28/11e928e2b373f902e8b43dcb79e1e46e.jpg",
    category: "Roti",
  },
  {
    id: 22,
    name: "Blueberry Muffin",
    description:
      "Kue basah lembut dengan taburan beri biru segar asli di setiap gigitan kecil.",
    price: 18000,
    image:
      "https://i.pinimg.com/1200x/1c/41/e2/1c41e22d7076574154b7a6782aa948ef.jpg",
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
      "https://i.pinimg.com/736x/ee/bf/ea/eebfea0bf629ad744105ec5df0c2b01a.jpg",
    category: "Makanan Ringan",
  },
  {
    id: 7,
    name: "Tahu Cabe Garam",
    description:
      "Tahu krispi yang ditumis dengan potongan cabai dan bawang putih yang harum.",
    price: 15000,
    image:
      "https://i.pinimg.com/1200x/43/05/8a/43058aa88bd40f36f29d37b68ef957f4.jpg",
    category: "Makanan Ringan",
  },
  {
    id: 23,
    name: "Onion Rings",
    description:
      "Cincin bawang bombay berbalut tepung renyah bumbu ala barat spesial.",
    price: 20000,
    image:
      "https://i.pinimg.com/736x/ba/32/fc/ba32fc0b71b95205633a41f5ccdd1eb1.jpg",
    category: "Makanan Ringan",
  },
  {
    id: 24,
    name: "Chicken Wings",
    description:
      "Sayap ayam goreng bumbu pedas manis *buffalo style*. Sangat pas untuk *sharing*.",
    price: 30000,
    image:
      "https://i.pinimg.com/1200x/ec/8a/ee/ec8aee3d078af75d59d2065bb774903b.jpg",
    category: "Makanan Ringan",
  },
  {
    id: 25,
    name: "Nachos Cheese",
    description:
      "Keripik jagung khas meksiko berlumur saus keju pedas, *jalapeno*, dan daging sapi.",
    price: 35000,
    image:
      "https://i.pinimg.com/736x/10/b7/07/10b7076561649cf63c0b4c7f281760db.jpg",
    category: "Makanan Ringan",
  },
  {
    id: 26,
    name: "Calamari Rings",
    description:
      "Cumi goreng tepung empuk yang disajikan dengan *tartar sauce* lemon segar.",
    price: 35000,
    image:
      "https://i.pinimg.com/1200x/82/18/35/82183552a9adad429d834f4cee48a99c.jpg",
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
      "https://i.pinimg.com/1200x/cd/90/a4/cd90a4bcc1ba8ef5a35e162b4ad3ab70.jpg",
    category: "Makanan Berat",
  },
  {
    id: 28,
    name: "Chicken Katsu Curry",
    description:
      "Kari kental khas Jepang dilengkapi ayam fillet katsu krispi dan wortel cincang.",
    price: 42000,
    image:
      "https://i.pinimg.com/1200x/23/8a/31/238a31eb9505fe66c6bcd853f7a3f95d.jpg",
    category: "Makanan Berat",
  },
  {
    id: 29,
    name: "Mie Goreng Jawa",
    description:
      "Mie telur kenyal digoreng *smokey* dengan sayuran hijau, suwiran ayam, dan telor ceplok.",
    price: 30000,
    image:
      "https://i.pinimg.com/1200x/0f/76/e8/0f76e8e797bf5d4e40f004475ffdbe16.jpg",
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
