import { useMemo } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import type { CartItem } from "../types/cart";
import type { Product } from "../data/Menu";

interface CheckoutPageProps {
  cartItems: CartItem[];
  onAddItem: (product: Product) => void;
  onRemoveItem: (productId: number) => void;
}

interface OrderItemRowProps {
  item: CartItem;
  onAddItem: (product: Product) => void;
  onRemoveItem: (productId: number) => void;
}

const OrderItemRow = ({ item, onAddItem, onRemoveItem }: OrderItemRowProps) => {
  const subtotal = item.price * item.quantity;

  const asProduct: Product = {
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    category: item.category,
    description: "",
  };

  return (
    <div className="flex items-center gap-3 sm:gap-4 py-4 border-b border-amber-50 last:border-b-0">
      <img
        src={item.image}
        alt={item.name}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0 shadow-sm"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm sm:text-base font-bold text-[#3d2b1f] truncate">
          {item.name}
        </h3>
        <p className="text-xs sm:text-sm text-stone-400 mt-0.5">
          Rp {item.price.toLocaleString("id-ID")}
        </p>
        <p className="text-sm font-bold text-[#7c4a1e] mt-1 sm:hidden">
          Rp {subtotal.toLocaleString("id-ID")}
        </p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => onRemoveItem(item.id)}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#7c4a1e] text-amber-50 flex items-center justify-center text-sm font-bold hover:bg-[#6a3d18] transition-all shadow-sm hover:-translate-y-0.5"
          aria-label={`Kurangi ${item.name}`}
        >
          −
        </button>
        <span className="w-6 text-center text-sm font-bold text-[#3d2b1f] tabular-nums">
          {item.quantity}
        </span>
        <button
          type="button"
          onClick={() => onAddItem(asProduct)}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#7c4a1e] text-amber-50 flex items-center justify-center text-sm font-bold hover:bg-[#6a3d18] transition-all shadow-sm hover:-translate-y-0.5"
          aria-label={`Tambah ${item.name}`}
        >
          +
        </button>
      </div>
      <div className="hidden sm:block text-right shrink-0 min-w-[88px]">
        <p className="text-sm sm:text-base font-bold text-[#7c4a1e]">
          Rp {subtotal.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
};

const CheckoutPage = ({
  cartItems,
  onAddItem,
  onRemoveItem,
}: CheckoutPageProps) => {
  const totalHarga = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const handleKonfirmasi = () => {
    window.alert(
      "Pesanan kamu berhasil dikonfirmasi! Terima kasih sudah memesan di Palora Cafe ☕",
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-grain pt-20 sm:pt-24 pb-14 px-4">
      {/* Background elements */}
      <div className="absolute inset-0 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-100/40 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-72 h-72 bg-orange-100/30 rounded-full blur-[70px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3d2b1f] mb-6">
            Ringkasan Pesanan
          </h1>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-2xl border border-amber-100 shadow-[0_4px_20px_rgba(124,74,30,0.07)] p-10 sm:p-14 text-center">
              <div className="text-5xl mb-4">☕</div>
              <p className="text-lg sm:text-xl font-bold text-[#3d2b1f] mb-2">
                Keranjang masih kosong
              </p>
              <p className="text-stone-400 text-sm mb-7">
                Yuk, pilih menu favoritmu dulu!
              </p>
              <Link
                to="/"
                className="inline-block bg-[#7c4a1e] text-amber-50 font-semibold px-7 py-3 rounded-xl hover:bg-[#6a3d18] transition-colors shadow-[0_4px_16px_rgba(124,74,30,0.3)]"
              >
                Lihat Menu
              </Link>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-2xl border border-amber-100 shadow-[0_4px_20px_rgba(124,74,30,0.07)] p-4 sm:p-6 mb-4">
                {cartItems.map((item) => (
                  <OrderItemRow
                    key={item.id}
                    item={item}
                    onAddItem={onAddItem}
                    onRemoveItem={onRemoveItem}
                  />
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-amber-100 shadow-[0_4px_20px_rgba(124,74,30,0.07)] p-4 sm:p-6">
                <div className="flex justify-between items-center pb-5 mb-5 border-b border-amber-50">
                  <span className="text-base font-semibold text-stone-600">
                    Total
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-[#7c4a1e]">
                    Rp {totalHarga.toLocaleString("id-ID")}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleKonfirmasi}
                  disabled={cartItems.length === 0}
                  className="w-full bg-[#7c4a1e] text-amber-50 font-bold text-base sm:text-lg py-3.5 rounded-xl hover:bg-[#6a3d18] transition-all shadow-[0_4px_16px_rgba(124,74,30,0.3)] hover:shadow-[0_6px_24px_rgba(124,74,30,0.4)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  Konfirmasi Pesanan
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default CheckoutPage;
