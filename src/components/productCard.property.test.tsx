import { describe, it, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import * as fc from "fast-check";
import ProductSection from "./ProductSection";
import { menuData } from "../data/Menu";
import type { CartItem } from "../types/cart";
import type { Product } from "../data/Menu";

// ---------------------------------------------------------------------------
// Setup: mock IntersectionObserver (dibutuhkan oleh framer-motion di jsdom)
// ---------------------------------------------------------------------------

beforeAll(() => {
  if (typeof window.IntersectionObserver === "undefined") {
    window.IntersectionObserver = class IntersectionObserver {
      root = null;
      rootMargin = "";
      thresholds = [];
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    } as unknown as typeof IntersectionObserver;
  }
});

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

// ---------------------------------------------------------------------------
// Property 5: Quantity yang ditampilkan di ProductCard sinkron dengan CartState
// Validates: Requirements 2.5
// ---------------------------------------------------------------------------

describe("Property 5: Quantity yang ditampilkan di ProductCard sinkron dengan CartState", () => {
  it("angka quantity yang ditampilkan selalu sama dengan cartItems.find(i => i.id === product.id)?.quantity ?? 0", () => {
    fc.assert(
      fc.property(productArb, fc.nat({ max: 50 }), (product, quantity) => {
        // Buat CartItem yang sesuai dengan product dan quantity yang digenerate
        const cartItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.image,
          category: product.category,
        };

        // Jika quantity > 0, masukkan ke cartItems; jika 0, biarkan kosong
        const cartItems: CartItem[] = quantity > 0 ? [cartItem] : [];

        const { unmount } = render(
          <ProductSection
            cartItems={cartItems}
            onAddItem={vi.fn()}
            onRemoveItem={vi.fn()}
          />,
        );

        // Verifikasi: untuk setiap item di menuData,
        // quantity yang ditampilkan harus sesuai dengan cartItems
        let allSynced = true;

        for (const menuItem of menuData) {
          // Expected quantity: cartItems.find(i => i.id === menuItem.id)?.quantity ?? 0
          const expectedQty =
            cartItems.find((i) => i.id === menuItem.id)?.quantity ?? 0;

          // Cari tombol minus untuk item ini (aria-label: "Kurangi {name}")
          const minusBtn = screen.queryByRole("button", {
            name: `Kurangi ${menuItem.name}`,
          });

          if (minusBtn) {
            // Span quantity adalah nextElementSibling dari tombol minus
            const quantitySpan = minusBtn.nextElementSibling;
            if (quantitySpan) {
              const displayedQty = parseInt(
                quantitySpan.textContent ?? "0",
                10,
              );
              if (displayedQty !== expectedQty) {
                allSynced = false;
                break;
              }
            }
          }
        }

        unmount();
        return allSynced;
      }),
      { numRuns: 100 },
    );
  });
});

// ---------------------------------------------------------------------------
// Property 6: Tombol minus di ProductCard disabled saat quantity 0
// Validates: Requirements 2.4
// ---------------------------------------------------------------------------

describe("Property 6: Tombol minus di ProductCard disabled saat quantity 0", () => {
  it("tombol − memiliki atribut disabled saat quantity produk adalah 0", () => {
    fc.assert(
      fc.property(productArb, () => {
        // Semua produk memiliki quantity 0 (cartItems kosong)
        const cartItems: CartItem[] = [];

        const { unmount } = render(
          <ProductSection
            cartItems={cartItems}
            onAddItem={vi.fn()}
            onRemoveItem={vi.fn()}
          />,
        );

        // Semua tombol minus harus disabled karena semua quantity = 0
        let allDisabled = true;

        for (const menuItem of menuData) {
          const minusBtn = screen.queryByRole("button", {
            name: `Kurangi ${menuItem.name}`,
          });

          if (minusBtn) {
            const isDisabled =
              (minusBtn as HTMLButtonElement).disabled === true;
            if (!isDisabled) {
              allDisabled = false;
              break;
            }
          }
        }

        unmount();
        return allDisabled;
      }),
      { numRuns: 100 },
    );
  });
});
