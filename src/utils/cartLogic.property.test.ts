import { describe, it } from "vitest";
import * as fc from "fast-check";
import {
  addItem,
  removeItem,
  updateQuantity,
  getTotalItem,
  getTotalHarga,
} from "./cartUtils";
import type { CartItem } from "../types/cart";
import type { Product } from "../data/Menu";

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------

/** Arbitrary untuk Product yang valid */
const productArb = fc.record<Product>({
  id: fc.integer({ min: 1, max: 1000 }),
  name: fc.string({ minLength: 1, maxLength: 50 }),
  description: fc.string({ minLength: 0, maxLength: 100 }),
  price: fc.integer({ min: 1000, max: 500000 }),
  image: fc.constant("https://example.com/img.jpg"),
  category: fc.constantFrom("Kopi", "Pastry", "Minuman", "Makanan"),
});

/** Arbitrary untuk CartItem yang valid (quantity ≥ 1) */
const cartItemArb = fc.record<CartItem>({
  id: fc.integer({ min: 1, max: 1000 }),
  name: fc.string({ minLength: 1, maxLength: 50 }),
  price: fc.integer({ min: 1000, max: 500000 }),
  quantity: fc.integer({ min: 1, max: 100 }),
  image: fc.constant("https://example.com/img.jpg"),
  category: fc.constantFrom("Kopi", "Pastry", "Minuman", "Makanan"),
});

/**
 * Arbitrary untuk array CartItem dengan id unik.
 * Menggunakan fc.uniqueArray untuk memastikan tidak ada duplikat id.
 */
const uniqueCartItemsArb = fc
  .uniqueArray(cartItemArb, { selector: (item) => item.id })
  .filter((items) => items.length >= 0);

// ---------------------------------------------------------------------------
// Property 1: addItem menambah quantity atau membuat item baru
// Validates: Requirements 1.2
// ---------------------------------------------------------------------------

describe("Property 1: addItem menambah quantity atau membuat item baru", () => {
  it("jika produk sudah ada di cart, quantity bertambah tepat 1", () => {
    fc.assert(
      fc.property(uniqueCartItemsArb, productArb, (cartItems, product) => {
        // Pastikan produk sudah ada di cart dengan menyisipkan item yang sesuai
        const existingItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: fc.sample(fc.integer({ min: 1, max: 10 }), 1)[0],
          image: product.image,
          category: product.category,
        };
        // Buat cart yang sudah mengandung produk tersebut (ganti jika id sudah ada)
        const cartWithProduct = [
          ...cartItems.filter((i) => i.id !== product.id),
          existingItem,
        ];

        const result = addItem(cartWithProduct, product);
        const updatedItem = result.find((i) => i.id === product.id);

        return (
          updatedItem !== undefined &&
          updatedItem.quantity === existingItem.quantity + 1
        );
      }),
      { numRuns: 100 },
    );
  });

  it("jika produk belum ada di cart, item baru ditambahkan dengan quantity 1", () => {
    fc.assert(
      fc.property(uniqueCartItemsArb, productArb, (cartItems, product) => {
        // Pastikan produk TIDAK ada di cart
        const cartWithoutProduct = cartItems.filter((i) => i.id !== product.id);
        const sizeBefore = cartWithoutProduct.length;

        const result = addItem(cartWithoutProduct, product);
        const newItem = result.find((i) => i.id === product.id);

        return (
          result.length === sizeBefore + 1 &&
          newItem !== undefined &&
          newItem.quantity === 1
        );
      }),
      { numRuns: 100 },
    );
  });

  it("addItem tidak mengubah item lain di cart", () => {
    fc.assert(
      fc.property(uniqueCartItemsArb, productArb, (cartItems, product) => {
        const cartWithoutProduct = cartItems.filter((i) => i.id !== product.id);
        const result = addItem(cartWithoutProduct, product);

        // Semua item yang sudah ada sebelumnya harus tetap sama
        return cartWithoutProduct.every((original) => {
          const inResult = result.find((i) => i.id === original.id);
          return (
            inResult !== undefined && inResult.quantity === original.quantity
          );
        });
      }),
      { numRuns: 100 },
    );
  });

  it("addItem tidak memutasi array asli (immutability)", () => {
    fc.assert(
      fc.property(uniqueCartItemsArb, productArb, (cartItems, product) => {
        const snapshot = cartItems.map((i) => ({ ...i }));
        addItem(cartItems, product);

        // Array asli tidak boleh berubah
        return cartItems.every(
          (item, idx) => item.quantity === snapshot[idx].quantity,
        );
      }),
      { numRuns: 100 },
    );
  });
});

// ---------------------------------------------------------------------------
// Property 2: removeItem mengurangi quantity atau menghapus item
// Validates: Requirements 1.3
// ---------------------------------------------------------------------------

describe("Property 2: removeItem mengurangi quantity atau menghapus item", () => {
  it("jika quantity > 1, quantity berkurang tepat 1 setelah removeItem", () => {
    fc.assert(
      fc.property(
        uniqueCartItemsArb,
        fc.integer({ min: 2, max: 100 }),
        fc.integer({ min: 1, max: 1000 }),
        (otherItems, qty, targetId) => {
          const targetItem: CartItem = {
            id: targetId,
            name: "Target Item",
            price: 10000,
            quantity: qty,
            image: "https://example.com/img.jpg",
            category: "Kopi",
          };
          const cart = [
            ...otherItems.filter((i) => i.id !== targetId),
            targetItem,
          ];

          const result = removeItem(cart, targetId);
          const updatedItem = result.find((i) => i.id === targetId);

          return updatedItem !== undefined && updatedItem.quantity === qty - 1;
        },
      ),
      { numRuns: 100 },
    );
  });

  it("jika quantity === 1, item dihapus dari cart setelah removeItem", () => {
    fc.assert(
      fc.property(
        uniqueCartItemsArb,
        fc.integer({ min: 1, max: 1000 }),
        (otherItems, targetId) => {
          const targetItem: CartItem = {
            id: targetId,
            name: "Target Item",
            price: 10000,
            quantity: 1,
            image: "https://example.com/img.jpg",
            category: "Kopi",
          };
          const cart = [
            ...otherItems.filter((i) => i.id !== targetId),
            targetItem,
          ];

          const result = removeItem(cart, targetId);

          return result.find((i) => i.id === targetId) === undefined;
        },
      ),
      { numRuns: 100 },
    );
  });

  it("removeItem tidak mengubah item lain di cart", () => {
    fc.assert(
      fc.property(
        uniqueCartItemsArb,
        fc.integer({ min: 1, max: 1000 }),
        (otherItems, targetId) => {
          const targetItem: CartItem = {
            id: targetId,
            name: "Target Item",
            price: 10000,
            quantity: 3,
            image: "https://example.com/img.jpg",
            category: "Kopi",
          };
          const cart = [
            ...otherItems.filter((i) => i.id !== targetId),
            targetItem,
          ];

          const result = removeItem(cart, targetId);

          // Item lain tidak boleh berubah
          return otherItems
            .filter((i) => i.id !== targetId)
            .every((original) => {
              const inResult = result.find((i) => i.id === original.id);
              return (
                inResult !== undefined &&
                inResult.quantity === original.quantity
              );
            });
        },
      ),
      { numRuns: 100 },
    );
  });

  it("removeItem tidak memutasi array asli (immutability)", () => {
    fc.assert(
      fc.property(uniqueCartItemsArb, (cartItems) => {
        if (cartItems.length === 0) return true;
        const snapshot = cartItems.map((i) => ({ ...i }));
        const targetId = cartItems[0].id;
        removeItem(cartItems, targetId);

        return cartItems.every(
          (item, idx) => item.quantity === snapshot[idx].quantity,
        );
      }),
      { numRuns: 100 },
    );
  });
});

// ---------------------------------------------------------------------------
// Property 3: updateQuantity mengatur quantity atau menghapus item
// Validates: Requirements 1.4
// ---------------------------------------------------------------------------

describe("Property 3: updateQuantity mengatur quantity atau menghapus item", () => {
  it("jika quantity target > 0, CartItem memiliki quantity yang sama dengan target", () => {
    fc.assert(
      fc.property(
        uniqueCartItemsArb,
        fc.integer({ min: 1, max: 1000 }),
        fc.integer({ min: 1, max: 200 }),
        (otherItems, targetId, newQty) => {
          const targetItem: CartItem = {
            id: targetId,
            name: "Target Item",
            price: 10000,
            quantity: 5,
            image: "https://example.com/img.jpg",
            category: "Kopi",
          };
          const cart = [
            ...otherItems.filter((i) => i.id !== targetId),
            targetItem,
          ];

          const result = updateQuantity(cart, targetId, newQty);
          const updatedItem = result.find((i) => i.id === targetId);

          return updatedItem !== undefined && updatedItem.quantity === newQty;
        },
      ),
      { numRuns: 100 },
    );
  });

  it("jika quantity target === 0, item dihapus dari cart", () => {
    fc.assert(
      fc.property(
        uniqueCartItemsArb,
        fc.integer({ min: 1, max: 1000 }),
        (otherItems, targetId) => {
          const targetItem: CartItem = {
            id: targetId,
            name: "Target Item",
            price: 10000,
            quantity: 5,
            image: "https://example.com/img.jpg",
            category: "Kopi",
          };
          const cart = [
            ...otherItems.filter((i) => i.id !== targetId),
            targetItem,
          ];

          const result = updateQuantity(cart, targetId, 0);

          return result.find((i) => i.id === targetId) === undefined;
        },
      ),
      { numRuns: 100 },
    );
  });

  it("jika quantity target < 0, item dihapus dari cart", () => {
    fc.assert(
      fc.property(
        uniqueCartItemsArb,
        fc.integer({ min: 1, max: 1000 }),
        fc.integer({ min: -200, max: -1 }),
        (otherItems, targetId, negQty) => {
          const targetItem: CartItem = {
            id: targetId,
            name: "Target Item",
            price: 10000,
            quantity: 5,
            image: "https://example.com/img.jpg",
            category: "Kopi",
          };
          const cart = [
            ...otherItems.filter((i) => i.id !== targetId),
            targetItem,
          ];

          const result = updateQuantity(cart, targetId, negQty);

          return result.find((i) => i.id === targetId) === undefined;
        },
      ),
      { numRuns: 100 },
    );
  });

  it("updateQuantity tidak mengubah item lain di cart", () => {
    fc.assert(
      fc.property(
        uniqueCartItemsArb,
        fc.integer({ min: 1, max: 1000 }),
        fc.integer({ min: 0, max: 50 }),
        (otherItems, targetId, newQty) => {
          const targetItem: CartItem = {
            id: targetId,
            name: "Target Item",
            price: 10000,
            quantity: 5,
            image: "https://example.com/img.jpg",
            category: "Kopi",
          };
          const cart = [
            ...otherItems.filter((i) => i.id !== targetId),
            targetItem,
          ];

          const result = updateQuantity(cart, targetId, newQty);

          return otherItems
            .filter((i) => i.id !== targetId)
            .every((original) => {
              const inResult = result.find((i) => i.id === original.id);
              return (
                inResult !== undefined &&
                inResult.quantity === original.quantity
              );
            });
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ---------------------------------------------------------------------------
// Property 4: totalItem dan totalHarga adalah derived yang akurat
// Validates: Requirements 1.5
// ---------------------------------------------------------------------------

describe("Property 4: totalItem dan totalHarga adalah derived yang akurat", () => {
  it("getTotalItem selalu sama dengan jumlah semua quantity", () => {
    fc.assert(
      fc.property(uniqueCartItemsArb, (cartItems) => {
        const expected = cartItems.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
        return getTotalItem(cartItems) === expected;
      }),
      { numRuns: 100 },
    );
  });

  it("getTotalHarga selalu sama dengan jumlah semua price × quantity", () => {
    fc.assert(
      fc.property(uniqueCartItemsArb, (cartItems) => {
        const expected = cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
        return getTotalHarga(cartItems) === expected;
      }),
      { numRuns: 100 },
    );
  });

  it("getTotalItem pada cart kosong mengembalikan 0", () => {
    fc.assert(
      fc.property(fc.constant([] as CartItem[]), (emptyCart: CartItem[]) => {
        return getTotalItem(emptyCart) === 0;
      }),
      { numRuns: 100 },
    );
  });

  it("getTotalHarga pada cart kosong mengembalikan 0", () => {
    fc.assert(
      fc.property(fc.constant([] as CartItem[]), (emptyCart: CartItem[]) => {
        return getTotalHarga(emptyCart) === 0;
      }),
      { numRuns: 100 },
    );
  });

  it("getTotalItem tidak pernah negatif untuk cart yang valid", () => {
    fc.assert(
      fc.property(uniqueCartItemsArb, (cartItems) => {
        return getTotalItem(cartItems) >= 0;
      }),
      { numRuns: 100 },
    );
  });

  it("getTotalHarga tidak pernah negatif untuk cart yang valid", () => {
    fc.assert(
      fc.property(uniqueCartItemsArb, (cartItems) => {
        return getTotalHarga(cartItems) >= 0;
      }),
      { numRuns: 100 },
    );
  });

  it("menambah item baru ke cart meningkatkan totalItem sebesar quantity item tersebut", () => {
    fc.assert(
      fc.property(uniqueCartItemsArb, productArb, (cartItems, product) => {
        const cartWithoutProduct = cartItems.filter((i) => i.id !== product.id);
        const totalBefore = getTotalItem(cartWithoutProduct);

        const result = addItem(cartWithoutProduct, product);
        const totalAfter = getTotalItem(result);

        // addItem menambah quantity 1
        return totalAfter === totalBefore + 1;
      }),
      { numRuns: 100 },
    );
  });
});
