import { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import type { Timestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../lib/firebase";
import type { CartItem } from "../types/cart";

interface Order {
  id: string;
  customerName: string;
  tableNumber?: string;
  paymentMethod?: string;
  items: CartItem[];
  total: number;
  status: "pending" | "completed";
  createdAt: Timestamp | null;
}

export default function KasirPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Listen for realtime updates from Firestore
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOrders: Order[] = [];
      snapshot.forEach((doc) => {
        fetchedOrders.push({ id: doc.id, ...doc.data() } as Order);
      });
      setOrders(fetchedOrders);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleToggleStatus = async (orderId: string, currentStatus: string) => {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, {
      status: currentStatus === "pending" ? "completed" : "pending"
    });
  };

  const handleDelete = async (orderId: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pesanan ini?")) {
      await deleteDoc(doc(db, "orders", orderId));
    }
  };

  const pendingOrders = orders.filter(o => o.status === "pending");
  const completedOrders = orders.filter(o => o.status === "completed");

  const OrderCard = ({ order }: { order: Order }) => (
    <div className={`bg-[#3d1d0c]/80 backdrop-blur-md rounded-2xl border ${order.status === "pending" ? "border-amber-500/30" : "border-green-500/30 opacity-70"} shadow-lg p-5 mb-4`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-amber-50">{order.customerName}</h3>
            {order.tableNumber && (
              <span className="bg-amber-600/90 text-amber-50 text-xs px-2 py-0.5 rounded-md font-bold shadow-[0_0_10px_rgba(217,119,6,0.3)]">
                Meja {order.tableNumber}
              </span>
            )}
            {order.paymentMethod === "qris" ? (
              <span className="bg-indigo-600/90 text-indigo-50 text-xs px-2 py-0.5 rounded-md font-bold border border-indigo-400/50 shadow-sm">
                📱 QRIS
              </span>
            ) : (
              <span className="bg-emerald-600/90 text-emerald-50 text-xs px-2 py-0.5 rounded-md font-bold border border-emerald-400/50 shadow-sm">
                💵 Tunai
              </span>
            )}
          </div>
          <p className="text-xs text-stone-400 mt-1">
            {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleString('id-ID') : 'Baru saja'}
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleToggleStatus(order.id, order.status)}
            className={`px-4 py-2 rounded-lg text-sm font-bold border transition-colors ${
              order.status === "pending" 
              ? "bg-green-600/20 text-green-400 border-green-500/30 hover:bg-green-600/40" 
              : "bg-stone-600/20 text-stone-400 border-stone-500/30 hover:bg-stone-600/40"
            }`}
          >
            {order.status === "pending" ? "Tandai Selesai ✓" : "Batalkan Selesai ↺"}
          </button>
          <button 
            onClick={() => handleDelete(order.id)}
            className="px-3 py-2 rounded-lg text-sm font-bold bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/40 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm">
            <span className="text-amber-100/80">{item.quantity}x {item.name}</span>
            <span className="text-amber-200">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
          </div>
        ))}
      </div>
      
      <div className="border-t border-white/5 pt-3 flex justify-between font-bold">
        <span className="text-stone-300">Total</span>
        <span className="text-amber-400">Rp {order.total.toLocaleString("id-ID")}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#2b1408] bg-grain p-4 sm:p-8 pt-24 pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-amber-50 drop-shadow-sm">Kasir Dashboard</h1>
            <p className="text-stone-400 mt-2">Daftar pesanan aktif pelanggan.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-600/20 text-red-100 hover:bg-red-600/40 px-5 py-2.5 rounded-xl border border-red-500/30 transition-colors font-semibold"
          >
            Keluar (Logout)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kolom Menunggu */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></div>
              <h2 className="text-xl font-bold text-amber-100">Pesanan Aktif ({pendingOrders.length})</h2>
            </div>
            {pendingOrders.length === 0 ? (
              <div className="bg-black/20 rounded-2xl p-8 text-center text-stone-500 border border-white/5 border-dashed">
                Belum ada pesanan masuk.
              </div>
            ) : (
              pendingOrders.map(order => <OrderCard key={order.id} order={order} />)
            )}
          </div>

          {/* Kolom Selesai */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <h2 className="text-xl font-bold text-stone-300">Selesai ({completedOrders.length})</h2>
            </div>
            {completedOrders.length === 0 ? (
               <div className="bg-black/20 rounded-2xl p-8 text-center text-stone-500 border border-white/5 border-dashed">
                 Belum ada riwayat pesanan selesai.
               </div>
            ) : (
              completedOrders.map(order => <OrderCard key={order.id} order={order} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
