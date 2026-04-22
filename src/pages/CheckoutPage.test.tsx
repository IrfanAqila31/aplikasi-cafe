import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import CheckoutPage from "./CheckoutPage";
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
// Helper: render CheckoutPage dengan MemoryRouter
// ---------------------------------------------------------------------------

function renderCheckoutPage(
  cartItems: CartItem[],
  onAddItem?: (product: Product) => void,
  onRemoveItem?: (productId: number) => void,
) {
  return render(
    <MemoryRouter>
      <CheckoutPage
        cartItems={cartItems}
        onAddItem={onAddItem ?? vi.fn()}
        onRemoveItem={onRemoveItem ?? vi.fn()}
        onClearCart={vi.fn()}
      />
    </MemoryRouter>,
  );
}

// ---------------------------------------------------------------------------
// Data fixture
// ---------------------------------------------------------------------------

const sampleItems: CartItem[] = [
  {
    id: 1,
    name: "Kopi Susu",
    price: 25000,
    quantity: 2,
    image: "https://example.com/kopi-susu.jpg",
    category: "Kopi",
  },
  {
    id: 2,
    name: "Croissant",
    price: 18000,
    quantity: 1,
    image: "https://example.com/croissant.jpg",
    category: "Pastry",
  },
  {
    id: 3,
    name: "Matcha Latte",
    price: 30000,
    quantity: 3,
    image: "https://example.com/matcha.jpg",
    category: "Minuman",
  },
];

// ---------------------------------------------------------------------------
// Requirement 4.4: Empty state saat cartItems = []
// ---------------------------------------------------------------------------

describe("Empty state saat cartItems kosong (Req 4.4)", () => {
  it("menampilkan pesan 'Keranjang belanja kamu masih kosong' saat cart kosong", () => {
    renderCheckoutPage([]);

    expect(
      screen.getByText(/keranjang masih kosong/i),
    ).toBeInTheDocument();
  });

  it("menampilkan link atau tombol untuk kembali ke halaman utama saat cart kosong", () => {
    renderCheckoutPage([]);

    // Link "Lihat Menu" mengarah ke halaman utama
    const homeLink = screen.getByRole("link", { name: /lihat menu/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("tidak menampilkan daftar item saat cart kosong", () => {
    renderCheckoutPage([]);

    // Tidak ada heading h3 (nama produk) yang dirender
    const itemHeadings = screen.queryAllByRole("heading", { level: 3 });
    expect(itemHeadings).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Requirement 6.3: Tombol "Konfirmasi Pesanan" tidak ada/disabled saat cart kosong
// ---------------------------------------------------------------------------

describe("Tombol 'Konfirmasi Pesanan' saat cart kosong (Req 6.3)", () => {
  it("tombol 'Konfirmasi Pesanan' tidak ada di DOM saat cart kosong", () => {
    renderCheckoutPage([]);

    const button = screen.queryByRole("button", {
      name: /konfirmasi pesanan/i,
    });

    // Tombol tidak ada (empty state ditampilkan, bukan section konfirmasi)
    expect(button).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Requirement 6.1 & 6.2: Tombol "Konfirmasi Pesanan" aktif saat cart tidak kosong
// ---------------------------------------------------------------------------

describe("Tombol 'Konfirmasi Pesanan' saat cart tidak kosong (Req 6.1, 6.2)", () => {
  it("menampilkan tombol 'Konfirmasi Pesanan' saat cart memiliki item", () => {
    renderCheckoutPage(sampleItems);

    const button = screen.getByRole("button", { name: /konfirmasi pesanan/i });
    expect(button).toBeInTheDocument();
  });

  it("tombol 'Konfirmasi Pesanan' tidak disabled saat cart memiliki item", () => {
    renderCheckoutPage(sampleItems);

    const button = screen.getByRole("button", { name: /konfirmasi pesanan/i });
    expect(button).not.toBeDisabled();
  });
});

// ---------------------------------------------------------------------------
// Requirement 6.4: Klik "Konfirmasi Pesanan" menampilkan notifikasi
// ---------------------------------------------------------------------------

describe("Klik 'Konfirmasi Pesanan' menampilkan notifikasi (Req 6.4)", () => {
  it("memanggil window.alert saat tombol 'Konfirmasi Pesanan' diklik", async () => {
    const user = userEvent.setup();
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    renderCheckoutPage(sampleItems);

    const button = screen.getByRole("button", { name: /konfirmasi pesanan/i });
    await user.click(button);

    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledWith(
      expect.stringContaining("berhasil dikonfirmasi"),
    );

    alertSpy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// Requirement 4.1 & 4.2: Semua CartItem dirender dengan nama, harga, dan quantity
// ---------------------------------------------------------------------------

describe("Semua CartItem dirender dengan data yang benar (Req 4.1, 4.2)", () => {
  it("menampilkan nama setiap CartItem", () => {
    renderCheckoutPage(sampleItems);

    for (const item of sampleItems) {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    }
  });

  it("menampilkan harga satuan setiap CartItem dalam format Rupiah", () => {
    renderCheckoutPage(sampleItems);

    // Kopi Susu: Rp 25.000 (harga satuan)
    expect(screen.getByText("Rp 25.000")).toBeInTheDocument();
    // Croissant: Rp 18.000 — harga satuan dan subtotal sama (quantity=1),
    // sehingga teks ini muncul dua kali; gunakan getAllByText
    const croissantPriceElements = screen.getAllByText("Rp 18.000");
    expect(croissantPriceElements.length).toBeGreaterThanOrEqual(1);
    // Matcha Latte: Rp 30.000 (harga satuan)
    expect(screen.getByText("Rp 30.000")).toBeInTheDocument();
  });

  it("menampilkan quantity setiap CartItem", () => {
    renderCheckoutPage(sampleItems);

    // Kopi Susu: quantity 2
    expect(screen.getByText("2")).toBeInTheDocument();
    // Croissant: quantity 1
    expect(screen.getByText("1")).toBeInTheDocument();
    // Matcha Latte: quantity 3
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("menampilkan subtotal setiap CartItem dalam format Rupiah", () => {
    renderCheckoutPage(sampleItems);

    // Kopi Susu: 25000 × 2 = 50000 → Rp 50.000
    expect(screen.getAllByText("Rp 50.000").length).toBeGreaterThanOrEqual(1);
    // Croissant: 18000 × 1 = 18000 → Rp 18.000
    // (harga satuan dan subtotal sama, keduanya muncul)
    // Matcha Latte: 30000 × 3 = 90000 → Rp 90.000
    expect(screen.getAllByText("Rp 90.000").length).toBeGreaterThanOrEqual(1);
  });

  it("menampilkan gambar setiap CartItem dengan alt text nama produk", () => {
    renderCheckoutPage(sampleItems);

    for (const item of sampleItems) {
      const img = screen.getByAltText(item.name);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", item.image);
    }
  });

  it("merender jumlah baris yang sama dengan jumlah CartItem", () => {
    renderCheckoutPage(sampleItems);

    // Setiap item memiliki tombol "Tambah {name}"
    const addButtons = screen.getAllByRole("button", { name: /^Tambah / });
    expect(addButtons).toHaveLength(sampleItems.length);
  });
});

// ---------------------------------------------------------------------------
// Requirement 4.3: Total keseluruhan pesanan ditampilkan
// ---------------------------------------------------------------------------

describe("Total keseluruhan pesanan (Req 4.3)", () => {
  it("menampilkan total yang benar dari semua CartItem", () => {
    renderCheckoutPage(sampleItems);

    // Total: (25000×2) + (18000×1) + (30000×3) = 50000 + 18000 + 90000 = 158000
    // Format: Rp 158.000
    const totalSpan = screen.getByText("Rp 158.000");
    expect(totalSpan).toBeInTheDocument();
  });
});
