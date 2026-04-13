import { menuData } from "../data/Menu";
// "Hei, menuData itu kan data sungguhan, sedangkan Product itu cuma aturan tipe (interface).
// Tolong pisahkan atau beri tanda mana yang cuma tipe, biar nanti mesin tidak bingung saat menerjemahkannya ke JavaScript biasa."
import type { Product } from "../data/Menu";
import { motion } from "framer-motion";

interface ProductSectionProps {
  onAddToCart: (harga: number) => void;
}

const ProductSection = ({ onAddToCart }: ProductSectionProps) => {
  return (
    <section id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-16 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-4 tracking-tight">
          Daftar Menu Kami
        </h2>
        <div className="w-24 h-1.5 bg-linear-to-r from-amber-500 to-yellow-500 rounded-full"></div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* map digunakan untuk  mengulang dara dari menuData */}
        {menuData.map((item: Product, index: number) => (
          <motion.article
            key={item.id}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="group bg-white border border-stone-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300"
          >
            {/* gambar dinamis */}
            <div className="h-60 overflow-hidden relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            {/* teks dinamis */}
            <div className="p-8 flex flex-col grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-stone-900 tracking-tight">
                  {item.name}
                </h3>
                <span className="bg-amber-50 text-amber-700 border border-amber-200/60 text-xs font-semibold px-3 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
              <p className="text-stone-500 mb-8 grow leading-relaxed">
                {item.description}
              </p>
              <div className="flex justify-between items-center mt-auto border-t border-stone-100 pt-6">
                {/* Mengubah format angka menjadi format Rupiah sederhana */}
                <span className="text-2xl font-black text-amber-600">
                  Rp {item.price.toLocaleString("id-ID")}
                </span>
                <button
                  type="button"
                  onClick={() => onAddToCart(item.price)}
                  className="bg-stone-900 text-white px-6 py-2.5 rounded-full hover:bg-stone-800 transition-all font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  Pesan
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
export default ProductSection;
