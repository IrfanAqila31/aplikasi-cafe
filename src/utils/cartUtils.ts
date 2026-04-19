import type { CartItem } from "../types/cart";
import type { Product } from "../data/Menu";

/**
 * Tambah quantity 1 jika produk sudah ada di cart,
 * atau tambah item baru dengan quantity 1 jika belum ada.
 */
export function addItem(prev: CartItem[], product: Product): CartItem[] {
  const existing = prev.find((i) => i.id === product.id);
  if (existing) {
    return prev.map((i) =>
      i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
    );
  }
  return [...prev, { ...product, quantity: 1 }];
}

/**
 * Kurangi quantity 1 untuk item dengan productId yang sesuai.
 * Hapus item dari cart jika quantity mencapai 0.
 */
export function removeItem(prev: CartItem[], productId: number): CartItem[] {
  return prev
    .map((i) => (i.id === productId ? { ...i, quantity: i.quantity - 1 } : i))
    .filter((i) => i.quantity > 0);
}

/**
 * Set quantity item ke nilai tertentu.
 * Hapus item dari cart jika quantity ≤ 0.
 */
export function updateQuantity(
  prev: CartItem[],
  productId: number,
  quantity: number,
): CartItem[] {
  if (quantity <= 0) {
    return prev.filter((i) => i.id !== productId);
  }
  return prev.map((i) => (i.id === productId ? { ...i, quantity } : i));
}

/**
 * Hitung jumlah seluruh quantity dari semua item di cart.
 */
export function getTotalItem(cartItems: CartItem[]): number {
  return cartItems.reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Hitung jumlah seluruh subtotal (price × quantity) dari semua item di cart.
 */
export function getTotalHarga(cartItems: CartItem[]): number {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
