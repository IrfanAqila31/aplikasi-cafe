import { describe, it, expect } from "vitest";
import {
  addItem,
  removeItem,
  updateQuantity,
  getTotalItem,
  getTotalHarga,
} from "./cartUtils";
import type { CartItem } from "../types/cart";
import type { Product } from "../data/Menu";

// --- Fixtures ---

const productA: Product = {
  id: 1,
  name: "Kopi Susu Aren",
  description: "Espresso dengan gula aren.",
  price: 20000,
  image: "https://example.com/kopi.jpg",
  category: "Kopi",
};

const productB: Product = {
  id: 2,
  name: "Americano Dingin",
  description: "Espresso dengan air es.",
  price: 15000,
  image: "https://example.com/americano.jpg",
  category: "Kopi",
};

const cartItemA: CartItem = {
  id: productA.id,
  name: productA.name,
  price: productA.price,
  quantity: 1,
  image: productA.image,
  category: productA.category,
};

const cartItemAQty3: CartItem = { ...cartItemA, quantity: 3 };

const cartItemB: CartItem = {
  id: productB.id,
  name: productB.name,
  price: productB.price,
  quantity: 2,
  image: productB.image,
  category: productB.category,
};

// --- addItem ---

describe("addItem", () => {
  it("pada cart kosong → menambahkan CartItem baru dengan quantity 1", () => {
    const result = addItem([], productA);

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: productA.id,
      name: productA.name,
      price: productA.price,
      quantity: 1,
      image: productA.image,
      category: productA.category,
    });
  });

  it("pada produk yang belum ada di cart → menambahkan CartItem baru dengan quantity 1", () => {
    const result = addItem([cartItemA], productB);

    expect(result).toHaveLength(2);
    const newItem = result.find((i) => i.id === productB.id);
    expect(newItem).toBeDefined();
    expect(newItem!.quantity).toBe(1);
  });

  it("pada produk yang sudah ada di cart → quantity bertambah 1", () => {
    const result = addItem([cartItemA], productA);

    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(2);
  });

  it("tidak mengubah item lain saat menambah quantity produk yang sudah ada", () => {
    const result = addItem([cartItemA, cartItemB], productA);

    const itemB = result.find((i) => i.id === cartItemB.id);
    expect(itemB!.quantity).toBe(cartItemB.quantity);
  });

  it("tidak memutasi array asli (immutability)", () => {
    const original = [cartItemA];
    addItem(original, productA);

    expect(original[0].quantity).toBe(1);
  });
});

// --- removeItem ---

describe("removeItem", () => {
  it("pada quantity 1 → item dihapus dari array", () => {
    const result = removeItem([cartItemA], cartItemA.id);

    expect(result).toHaveLength(0);
  });

  it("pada quantity > 1 → quantity berkurang 1", () => {
    const result = removeItem([cartItemAQty3], cartItemA.id);

    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(2);
  });

  it("tidak mengubah item lain saat mengurangi quantity", () => {
    const result = removeItem([cartItemAQty3, cartItemB], cartItemA.id);

    const itemB = result.find((i) => i.id === cartItemB.id);
    expect(itemB!.quantity).toBe(cartItemB.quantity);
  });

  it("pada productId yang tidak ada di cart → cart tidak berubah", () => {
    const result = removeItem([cartItemA], 999);

    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(cartItemA.quantity);
  });

  it("tidak memutasi array asli (immutability)", () => {
    const original = [cartItemAQty3];
    removeItem(original, cartItemA.id);

    expect(original[0].quantity).toBe(3);
  });
});

// --- updateQuantity ---

describe("updateQuantity", () => {
  it("dengan nilai 0 → item dihapus dari array", () => {
    const result = updateQuantity([cartItemAQty3], cartItemA.id, 0);

    expect(result).toHaveLength(0);
  });

  it("dengan nilai negatif → item dihapus dari array", () => {
    const result = updateQuantity([cartItemAQty3], cartItemA.id, -1);

    expect(result).toHaveLength(0);
  });

  it("dengan nilai positif → quantity diperbarui ke nilai tersebut", () => {
    const result = updateQuantity([cartItemA], cartItemA.id, 5);

    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(5);
  });

  it("tidak mengubah item lain saat memperbarui quantity", () => {
    const result = updateQuantity([cartItemA, cartItemB], cartItemA.id, 5);

    const itemB = result.find((i) => i.id === cartItemB.id);
    expect(itemB!.quantity).toBe(cartItemB.quantity);
  });

  it("pada productId yang tidak ada di cart → cart tidak berubah", () => {
    const result = updateQuantity([cartItemA], 999, 5);

    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(cartItemA.quantity);
  });
});

// --- getTotalItem ---

describe("getTotalItem", () => {
  it("pada cart kosong → mengembalikan 0", () => {
    expect(getTotalItem([])).toBe(0);
  });

  it("pada satu item → mengembalikan quantity item tersebut", () => {
    expect(getTotalItem([cartItemAQty3])).toBe(3);
  });

  it("pada beberapa item → mengembalikan jumlah seluruh quantity", () => {
    // cartItemAQty3.quantity = 3, cartItemB.quantity = 2 → total = 5
    expect(getTotalItem([cartItemAQty3, cartItemB])).toBe(5);
  });
});

// --- getTotalHarga ---

describe("getTotalHarga", () => {
  it("pada cart kosong → mengembalikan 0", () => {
    expect(getTotalHarga([])).toBe(0);
  });

  it("pada satu item → mengembalikan price × quantity", () => {
    // cartItemAQty3: price=20000, quantity=3 → 60000
    expect(getTotalHarga([cartItemAQty3])).toBe(60000);
  });

  it("pada beberapa item → mengembalikan jumlah seluruh subtotal", () => {
    // cartItemAQty3: 20000×3=60000, cartItemB: 15000×2=30000 → total=90000
    expect(getTotalHarga([cartItemAQty3, cartItemB])).toBe(90000);
  });
});
