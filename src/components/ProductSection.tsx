import { useState } from "react";
import { menuData } from "../data/Menu";
import type { Product } from "../data/Menu";
import { motion, AnimatePresence } from "framer-motion";
import type { CartItem } from "../types/cart";
import { ChevronDown } from "lucide-react";

interface ProductSectionProps {
  cartItems: CartItem[];
  onAddItem: (product: Product) => void;
  onRemoveItem: (productId: number) => void;
}

const ProductSection = ({
  cartItems,
  onAddItem,
  onRemoveItem,
}: ProductSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const categories = [
    "Semua",
    "Kopi",
    "Non Kopi",
    "Roti",
    "Makanan Ringan",
    "Makanan Berat",
  ];

  const filteredMenu =
    activeCategory === "Semua"
      ? menuData
      : menuData.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="relative overflow-hidden bg-[#2b1408] bg-grain">
      {/* Background decorative */}
      <div className="absolute inset-0 bg-dots opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-700/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-amber-500/10 pointer-events-none hidden xl:block" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-10 sm:mb-12 text-center"
        >
          <span className="inline-block text-xs font-semibold text-amber-300 bg-amber-900/30 border border-amber-500/20 px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Menu Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-50 drop-shadow-[0_2px_10px_rgba(251,191,36,0.1)] mb-3">
            Pilihan Terbaik untuk Kamu
          </h2>
          <p className="text-stone-400 text-sm sm:text-base max-w-md">
            Dari espresso klasik hingga minuman signature, semua dibuat dengan
            bahan pilihan.
          </p>
        </motion.div>

        {/* Filter Categories */}
        <div className="mb-8 flex justify-center sm:justify-start relative z-20">
          <div className="relative inline-block w-full max-w-[200px] text-left">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex justify-between items-center w-full bg-[#3d1d0c]/90 backdrop-blur-md text-amber-50 font-bold text-sm px-5 py-3 rounded-2xl border border-white/10 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:border-amber-500/30 hover:shadow-[0_6px_20px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer"
            >
              <span className="truncate">{activeCategory}</span>
              <ChevronDown
                className={`w-4 h-4 shrink-0 transition-transform duration-300 text-amber-400 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            
            {/* Backdrop for outside click */}
            {isDropdownOpen && (
              <div 
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" 
                onClick={() => setIsDropdownOpen(false)} 
                aria-label="Tutup dropdown kategori"
              />
            )}
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute z-50 left-0 right-0 mt-2 origin-top bg-[#3d1d0c]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.7)] overflow-hidden"
                >
                  <ul className="py-2">
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          onClick={() => {
                            setActiveCategory(category);
                            setIsDropdownOpen(false);
                            setVisibleCount(5);
                          }}
                          className={`w-full text-left px-5 py-2.5 text-sm transition-colors duration-200 outline-none focus:bg-white/5 ${
                            activeCategory === category
                              ? "text-amber-400 bg-white/5 font-bold"
                              : "text-stone-300 hover:bg-white/5 hover:text-amber-300 font-medium"
                          }`}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-3">
          {filteredMenu.slice(0, visibleCount).map((item: Product, index: number) => {
            const quantity =
              cartItems.find((i) => i.id === item.id)?.quantity ?? 0;

            return (
              <motion.article
                key={item.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-none hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-4 p-3 sm:p-4"
              >
                {/* Gambar kecil */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-white/5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm sm:text-base font-bold text-amber-50 leading-snug">
                      {item.name}
                    </h3>
                    <span className="shrink-0 text-[10px] sm:text-xs font-semibold text-amber-300 bg-white/10 border border-white/10 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed line-clamp-2 mb-2 hidden sm:block">
                    {item.description}
                  </p>
                  <span className="text-base sm:text-lg font-bold text-amber-400">
                    Rp {item.price.toLocaleString("id-ID")}
                  </span>
                </div>

                {/* QuantityCounter */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    disabled={quantity === 0}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-base font-bold transition-all
                      ${
                        quantity === 0
                          ? "bg-white/5 text-stone-600 cursor-not-allowed"
                          : "bg-white/10 text-amber-50 hover:bg-white/20 border border-white/5 shadow-sm hover:-translate-y-0.5"
                      }`}
                    aria-label={`Kurangi ${item.name}`}
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-bold text-amber-50 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onAddItem(item)}
                    className="w-8 h-8 rounded-lg bg-amber-600 text-amber-50 flex items-center justify-center text-base font-bold hover:bg-amber-500 transition-all shadow-[0_0_15px_rgba(217,119,6,0.2)] border border-amber-500/50 hover:shadow-[0_0_20px_rgba(217,119,6,0.4)] hover:-translate-y-0.5"
                    aria-label={`Tambah ${item.name}`}
                  >
                    +
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredMenu.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md text-amber-50 border border-white/10 font-bold text-sm rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/10 hover:border-amber-500/50 hover:text-amber-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden group"
            >
              <span className="relative z-10">Muat Lebih Banyak</span>
              <ChevronDown className="w-4 h-4 relative z-10 group-hover:translate-y-0.5 transition-transform text-amber-400" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
