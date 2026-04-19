import { menuData } from "../data/Menu";
import type { Product } from "../data/Menu";
import { motion } from "framer-motion";
import type { CartItem } from "../types/cart";

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
  return (
    <section id="menu" className="relative overflow-hidden bg-grain">
      {/* Background decorative */}
      <div className="absolute inset-0 bg-dots opacity-50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-100/30 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-amber-200/30 pointer-events-none hidden xl:block" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-10 sm:mb-12 text-center"
        >
          <span className="inline-block text-xs font-semibold text-[#7c4a1e] bg-amber-100 px-3 py-1 rounded-full mb-4 tracking-wide uppercase border border-amber-200">
            Menu Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#3d2b1f] mb-3">
            Pilihan Terbaik untuk Kamu
          </h2>
          <p className="text-stone-500 text-sm sm:text-base max-w-md">
            Dari espresso klasik hingga minuman signature, semua dibuat dengan
            bahan pilihan.
          </p>
        </motion.div>

        {/* List */}
        <div className="flex flex-col gap-3">
          {menuData.map((item: Product, index: number) => {
            const quantity =
              cartItems.find((i) => i.id === item.id)?.quantity ?? 0;

            return (
              <motion.article
                key={item.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-white rounded-2xl border border-amber-100/80 shadow-[0_2px_12px_rgba(124,74,30,0.06)] hover:shadow-[0_6px_24px_rgba(124,74,30,0.11)] hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-4 p-3 sm:p-4"
              >
                {/* Gambar kecil */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm sm:text-base font-bold text-[#3d2b1f] leading-snug">
                      {item.name}
                    </h3>
                    <span className="shrink-0 text-[10px] sm:text-xs font-semibold text-[#7c4a1e] bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed line-clamp-2 mb-2 hidden sm:block">
                    {item.description}
                  </p>
                  <span className="text-base sm:text-lg font-bold text-[#7c4a1e]">
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
                          ? "bg-stone-100 text-stone-300 cursor-not-allowed"
                          : "bg-[#7c4a1e] text-amber-50 hover:bg-[#6a3d18] shadow-sm hover:shadow-md hover:-translate-y-0.5"
                      }`}
                    aria-label={`Kurangi ${item.name}`}
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-bold text-[#3d2b1f] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onAddItem(item)}
                    className="w-8 h-8 rounded-lg bg-[#7c4a1e] text-amber-50 flex items-center justify-center text-base font-bold hover:bg-[#6a3d18] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    aria-label={`Tambah ${item.name}`}
                  >
                    +
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
