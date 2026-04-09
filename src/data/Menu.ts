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
  {
    id: 1,
    name: "Kopi Susu Aren",
    description:
      "Espresso murni dipadukan dengan susu segar dan manisnya gula aren alami.",
    price: 20000,
    image:
      "https://images.unsplash.com/photo-1593443320739-77f742666729?q=80&w=500&auto=format&fit=crop", // Gambar ilustrasi dari Unsplash
    category: "Kopi",
  },
  {
    id: 2,
    name: "Americano Dingin",
    description:
      "Paduan espresso murni dengan air es. Sangat segar dan cocok untuk cuaca panas.",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=500&auto=format&fit=crop",
    category: "Kopi",
  },
  {
    id: 3,
    name: "Croissant Butter",
    description:
      "Roti croissant renyah dengan rasa mentega yang gurih. Pas untuk teman ngopi.",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1549903072-7e6e0d238a1c?q=80&w=500&auto=format&fit=crop",
    category: "Pastry",
  },
];
