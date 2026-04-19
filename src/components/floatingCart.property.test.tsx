import { describe, it, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import * as fc from "fast-check";
import FloatingCart from "./FloatingCart";

// ---------------------------------------------------------------------------
// Setup: mock useNavigate dari react-router
// ---------------------------------------------------------------------------

vi.mock("react-router", () => ({
  useNavigate: () => vi.fn(),
}));

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
// Property 7: Visibilitas FloatingCart bergantung pada totalItem
// Validates: Requirements 3.1, 3.2
// ---------------------------------------------------------------------------

describe("Property 7: Visibilitas FloatingCart bergantung pada totalItem", () => {
  it("FloatingCart ditampilkan jika dan hanya jika totalItem > 0", () => {
    fc.assert(
      fc.property(
        fc.nat({ max: 100 }),
        fc.nat({ max: 10_000_000 }),
        (totalItem, totalHarga) => {
          const { unmount } = render(
            <FloatingCart totalItem={totalItem} totalHarga={totalHarga} />,
          );

          // Tombol "Pesan" hanya ada saat totalItem > 0
          const button = screen.queryByRole("button", {
            name: /lihat isi keranjang belanja/i,
          });

          const isVisible = button !== null;
          const shouldBeVisible = totalItem > 0;

          unmount();
          return isVisible === shouldBeVisible;
        },
      ),
      { numRuns: 100 },
    );
  });

  it("FloatingCart tidak dirender sama sekali saat totalItem === 0", () => {
    fc.assert(
      fc.property(fc.nat({ max: 10_000_000 }), (totalHarga) => {
        const { container, unmount } = render(
          <FloatingCart totalItem={0} totalHarga={totalHarga} />,
        );

        const isEmpty = container.firstChild === null;
        unmount();
        return isEmpty;
      }),
      { numRuns: 100 },
    );
  });

  it("FloatingCart selalu dirender saat totalItem > 0", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }),
        fc.nat({ max: 10_000_000 }),
        (totalItem, totalHarga) => {
          const { unmount } = render(
            <FloatingCart totalItem={totalItem} totalHarga={totalHarga} />,
          );

          const button = screen.queryByRole("button", {
            name: /lihat isi keranjang belanja/i,
          });

          unmount();
          return button !== null;
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ---------------------------------------------------------------------------
// Property 8: Format harga Rupiah konsisten di seluruh tampilan
// Validates: Requirements 3.3
// ---------------------------------------------------------------------------

describe("Property 8: Format harga Rupiah konsisten di seluruh tampilan", () => {
  it("totalHarga ditampilkan dengan format Rp menggunakan toLocaleString id-ID", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }),
        fc.integer({ min: 0, max: 100_000_000 }),
        (totalItem, totalHarga) => {
          const { unmount } = render(
            <FloatingCart totalItem={totalItem} totalHarga={totalHarga} />,
          );

          // Format yang diharapkan: "Rp {toLocaleString('id-ID')}"
          const expectedFormatted = `Rp ${totalHarga.toLocaleString("id-ID")}`;

          // Cari teks yang mengandung format harga tersebut
          const priceElement = screen.queryByText(expectedFormatted);

          unmount();
          return priceElement !== null;
        },
      ),
      { numRuns: 100 },
    );
  });

  it("totalItem ditampilkan dalam format '{n} item'", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }),
        fc.nat({ max: 10_000_000 }),
        (totalItem, totalHarga) => {
          const { unmount } = render(
            <FloatingCart totalItem={totalItem} totalHarga={totalHarga} />,
          );

          // Format yang diharapkan: "{totalItem} item"
          const expectedText = `${totalItem} item`;
          const itemElement = screen.queryByText(expectedText);

          unmount();
          return itemElement !== null;
        },
      ),
      { numRuns: 100 },
    );
  });

  it("harga dengan nilai ribuan menggunakan titik sebagai pemisah (format id-ID)", () => {
    fc.assert(
      fc.property(fc.integer({ min: 1000, max: 100_000_000 }), (totalHarga) => {
        const { unmount } = render(
          <FloatingCart totalItem={1} totalHarga={totalHarga} />,
        );

        const expectedFormatted = `Rp ${totalHarga.toLocaleString("id-ID")}`;
        const priceElement = screen.queryByText(expectedFormatted);

        unmount();
        return priceElement !== null;
      }),
      { numRuns: 100 },
    );
  });
});
