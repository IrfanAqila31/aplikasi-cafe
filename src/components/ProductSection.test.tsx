import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductSection from "./ProductSection";
import { menuData } from "../data/Menu";
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

// Produk pertama dari menuData digunakan sebagai subjek pengujian
const firstProduct = menuData[0];

// ---------------------------------------------------------------------------
// Helper: buat CartItem dari produk dengan quantity tertentu
// ---------------------------------------------------------------------------
function makeCartItems(productId: number, quantity: number): CartItem[] {
  const product = menuData.find((p) => p.id === productId)!;
  if (quantity === 0) return [];
  return [
    {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      category: product.category,
    },
  ];
}

// ---------------------------------------------------------------------------
// Requirement 2.4: Tombol − disabled saat quantity = 0
// ---------------------------------------------------------------------------

describe("Tombol − disabled saat quantity = 0 (Req 2.4)", () => {
  it("tombol − memiliki atribut disabled ketika quantity produk adalah 0", () => {
    render(
      <ProductSection
        cartItems={[]}
        onAddItem={vi.fn()}
        onRemoveItem={vi.fn()}
      />,
    );

    const minusBtn = screen.getByRole("button", {
      name: `Kurangi ${firstProduct.name}`,
    });

    expect(minusBtn).toBeDisabled();
  });
});

// ---------------------------------------------------------------------------
// Requirement 2.4: Tombol − aktif saat quantity > 0
// ---------------------------------------------------------------------------

describe("Tombol − aktif saat quantity > 0 (Req 2.4)", () => {
  it("tombol − tidak disabled ketika quantity produk lebih dari 0", () => {
    const cartItems = makeCartItems(firstProduct.id, 2);

    render(
      <ProductSection
        cartItems={cartItems}
        onAddItem={vi.fn()}
        onRemoveItem={vi.fn()}
      />,
    );

    const minusBtn = screen.getByRole("button", {
      name: `Kurangi ${firstProduct.name}`,
    });

    expect(minusBtn).not.toBeDisabled();
  });
});

// ---------------------------------------------------------------------------
// Requirement 2.2: Klik + memanggil onAddItem dengan produk yang benar
// ---------------------------------------------------------------------------

describe("Klik + memanggil onAddItem dengan produk yang benar (Req 2.2)", () => {
  it("onAddItem dipanggil dengan data produk yang sesuai saat tombol + diklik", async () => {
    const user = userEvent.setup();
    const onAddItem = vi.fn();

    render(
      <ProductSection
        cartItems={[]}
        onAddItem={onAddItem}
        onRemoveItem={vi.fn()}
      />,
    );

    const plusBtn = screen.getByRole("button", {
      name: `Tambah ${firstProduct.name}`,
    });

    await user.click(plusBtn);

    expect(onAddItem).toHaveBeenCalledTimes(1);
    expect(onAddItem).toHaveBeenCalledWith(firstProduct);
  });
});

// ---------------------------------------------------------------------------
// Requirement 2.3: Klik − memanggil onRemoveItem dengan productId yang benar
// ---------------------------------------------------------------------------

describe("Klik − memanggil onRemoveItem dengan productId yang benar (Req 2.3)", () => {
  it("onRemoveItem dipanggil dengan productId yang sesuai saat tombol − diklik dan quantity > 0", async () => {
    const user = userEvent.setup();
    const onRemoveItem = vi.fn();
    const cartItems = makeCartItems(firstProduct.id, 1);

    render(
      <ProductSection
        cartItems={cartItems}
        onAddItem={vi.fn()}
        onRemoveItem={onRemoveItem}
      />,
    );

    const minusBtn = screen.getByRole("button", {
      name: `Kurangi ${firstProduct.name}`,
    });

    await user.click(minusBtn);

    expect(onRemoveItem).toHaveBeenCalledTimes(1);
    expect(onRemoveItem).toHaveBeenCalledWith(firstProduct.id);
  });
});
