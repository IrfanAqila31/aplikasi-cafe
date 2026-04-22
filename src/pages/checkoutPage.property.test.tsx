import { describe, it, vi, beforeAll, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import * as fc from "fast-check";
import CheckoutPage from "./CheckoutPage";
import type { CartItem } from "../types/cart";

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

// Bersihkan DOM setelah setiap test agar render tidak menumpuk
afterEach(() => {
  cleanup();
});

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------

/** Arbitrary untuk CartItem yang valid (quantity ≥ 1, name tidak hanya whitespace) */
const cartItemArb = fc.record<CartItem>({
  id: fc.integer({ min: 1, max: 1000 }),
  name: fc
    .string({ minLength: 1, maxLength: 50 })
    .filter((s) => s.trim().length > 0),
  price: fc.integer({ min: 1000, max: 500000 }),
  quantity: fc.integer({ min: 1, max: 100 }),
  image: fc.constant("https://example.com/img.jpg"),
  category: fc.constantFrom("Kopi", "Pastry", "Minuman", "Makanan"),
});

/** Arbitrary untuk array CartItem non-kosong dengan id unik */
const nonEmptyUniqueCartItemsArb = fc
  .uniqueArray(cartItemArb, { selector: (item) => item.id })
  .filter((items) => items.length >= 1);

/** Arbitrary untuk array CartItem (termasuk kosong) dengan id unik */
const uniqueCartItemsArb = fc.uniqueArray(cartItemArb, {
  selector: (item) => item.id,
});

// ---------------------------------------------------------------------------
// Helper: render CheckoutPage dengan MemoryRouter
// ---------------------------------------------------------------------------

function renderCheckoutPage(cartItems: CartItem[]) {
  return render(
    <MemoryRouter>
      <CheckoutPage
        cartItems={cartItems}
        onAddItem={vi.fn()}
        onRemoveItem={vi.fn()}
        onClearCart={vi.fn()}
      />
    </MemoryRouter>,
  );
}

// ---------------------------------------------------------------------------
// Property 9: CheckoutPage menampilkan semua CartItem
// Validates: Requirements 4.1, 4.2
// ---------------------------------------------------------------------------

describe("Property 9: CheckoutPage menampilkan semua CartItem", () => {
  it("setiap nama CartItem muncul di DOM saat CheckoutPage dirender", () => {
    fc.assert(
      fc.property(nonEmptyUniqueCartItemsArb, (cartItems) => {
        const { unmount } = renderCheckoutPage(cartItems);

        // Setiap nama item harus muncul di DOM (cari di heading h3)
        const allNamesVisible = cartItems.every((item) => {
          // Cari heading h3 yang berisi nama item (trim kedua sisi untuk toleransi whitespace)
          const headings = screen.queryAllByRole("heading", { level: 3 });
          return headings.some(
            (h) => h.textContent?.trim() === item.name.trim(),
          );
        });

        unmount();
        return allNamesVisible;
      }),
      { numRuns: 100 },
    );
  });

  it("jumlah baris OrderItemRow sama dengan jumlah CartItem", () => {
    fc.assert(
      fc.property(nonEmptyUniqueCartItemsArb, (cartItems) => {
        const { unmount } = renderCheckoutPage(cartItems);

        // Setiap item memiliki tombol "Tambah {name}" — gunakan sebagai penanda baris
        const addButtons = screen.queryAllByRole("button", {
          name: /^Tambah /,
        });

        unmount();
        return addButtons.length === cartItems.length;
      }),
      { numRuns: 100 },
    );
  });
});

// ---------------------------------------------------------------------------
// Property 10: Total di CheckoutPage sama dengan totalHarga
// Validates: Requirements 4.3
// ---------------------------------------------------------------------------

describe("Property 10: Total di CheckoutPage sama dengan totalHarga", () => {
  it("nilai Total yang ditampilkan sama dengan jumlah price × quantity semua CartItem", () => {
    fc.assert(
      fc.property(nonEmptyUniqueCartItemsArb, (cartItems) => {
        // Hitung total yang diharapkan
        const expectedTotal = cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
        const expectedFormatted = `Rp ${expectedTotal.toLocaleString("id-ID")}`;

        const { unmount } = renderCheckoutPage(cartItems);

        // Cari span total (elemen dengan class text-2xl yang menampilkan total)
        // Gunakan queryAllByText untuk menghindari error saat ada duplikat
        const allMatchingElements = screen.queryAllByText(expectedFormatted);

        // Periksa apakah ada elemen span dengan class total (text-2xl)
        const totalSpan = allMatchingElements.find(
          (el) => el.tagName === "SPAN" && el.className.includes("text-2xl"),
        );

        unmount();
        return totalSpan !== undefined;
      }),
      { numRuns: 100 },
    );
  });

  it("Total tidak pernah negatif untuk CartItem dengan price dan quantity positif", () => {
    fc.assert(
      fc.property(nonEmptyUniqueCartItemsArb, (cartItems) => {
        const expectedTotal = cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );

        const { unmount } = renderCheckoutPage(cartItems);

        // Cari semua span dengan class yang mengandung text-2xl (total display)
        const totalSpans = Array.from(document.querySelectorAll("span")).filter(span => span.className && typeof span.className === 'string' && span.className.includes("text-2xl"));

        let totalDisplayed = -1;
        totalSpans.forEach((span) => {
          const text = span.textContent?.replace(/\s+/g, "").replace("Rp", "");
          if (text) {
            // Parse angka dari format id-ID (titik sebagai pemisah ribuan)
            const parsed = parseInt(text.replace(/\./g, ""), 10);
            if (!isNaN(parsed)) {
              totalDisplayed = parsed;
            }
          }
        });

        unmount();
        return totalDisplayed === expectedTotal;
      }),
      { numRuns: 100 },
    );
  });
});

// ---------------------------------------------------------------------------
// Property 11: Tombol Konfirmasi aktif jika dan hanya jika CartState tidak kosong
// Validates: Requirements 6.2, 6.3
// ---------------------------------------------------------------------------

describe("Property 11: Tombol Konfirmasi aktif jika dan hanya jika CartState tidak kosong", () => {
  it("tombol Konfirmasi Pesanan aktif (tidak disabled) saat CartState tidak kosong", () => {
    fc.assert(
      fc.property(nonEmptyUniqueCartItemsArb, (cartItems) => {
        const { unmount } = renderCheckoutPage(cartItems);

        const button = screen.queryByRole("button", {
          name: /konfirmasi pesanan/i,
        });

        // Tombol harus ada dan tidak disabled
        const isActiveButton =
          button !== null && !(button as HTMLButtonElement).disabled;

        unmount();
        return isActiveButton;
      }),
      { numRuns: 100 },
    );
  });

  it("tombol Konfirmasi Pesanan disabled atau tidak ada saat CartState kosong", () => {
    fc.assert(
      fc.property(fc.constant([] as CartItem[]), (emptyCart) => {
        const { unmount } = renderCheckoutPage(emptyCart);

        const button = screen.queryByRole("button", {
          name: /konfirmasi pesanan/i,
        });

        // Tombol harus tidak ada atau disabled
        const isDisabledOrAbsent =
          button === null || (button as HTMLButtonElement).disabled;

        unmount();
        return isDisabledOrAbsent;
      }),
      { numRuns: 100 },
    );
  });

  it("status tombol Konfirmasi Pesanan selalu sesuai dengan keadaan CartState", () => {
    fc.assert(
      fc.property(uniqueCartItemsArb, (cartItems) => {
        const { unmount } = renderCheckoutPage(cartItems);

        const button = screen.queryByRole("button", {
          name: /konfirmasi pesanan/i,
        });

        let result: boolean;

        if (cartItems.length > 0) {
          // Harus ada dan aktif
          result = button !== null && !(button as HTMLButtonElement).disabled;
        } else {
          // Harus tidak ada atau disabled
          result = button === null || (button as HTMLButtonElement).disabled;
        }

        unmount();
        return result;
      }),
      { numRuns: 100 },
    );
  });
});
