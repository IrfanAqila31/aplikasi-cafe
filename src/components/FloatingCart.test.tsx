import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FloatingCart from "./FloatingCart";

// ---------------------------------------------------------------------------
// Setup: mock useNavigate dari react-router
// ---------------------------------------------------------------------------

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
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
// Requirement 3.2: FloatingCart tidak dirender saat totalItem = 0
// ---------------------------------------------------------------------------

describe("FloatingCart tidak dirender saat totalItem = 0 (Req 3.2)", () => {
  it("mengembalikan null dan tidak merender elemen apapun saat totalItem = 0", () => {
    const { container } = render(<FloatingCart totalItem={0} totalHarga={0} />);

    expect(container.firstChild).toBeNull();
  });

  it("tombol Pesan tidak ada di DOM saat totalItem = 0", () => {
    render(<FloatingCart totalItem={0} totalHarga={50000} />);

    const button = screen.queryByRole("button", {
      name: /lihat isi keranjang belanja/i,
    });

    expect(button).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Requirement 3.1: FloatingCart dirender saat totalItem > 0
// ---------------------------------------------------------------------------

describe("FloatingCart dirender saat totalItem > 0 (Req 3.1)", () => {
  it("merender tombol Pesan saat totalItem = 1", () => {
    render(<FloatingCart totalItem={1} totalHarga={15000} />);

    const button = screen.getByRole("button", {
      name: /lihat isi keranjang belanja/i,
    });

    expect(button).toBeInTheDocument();
  });

  it("merender tombol Pesan saat totalItem lebih dari 1", () => {
    render(<FloatingCart totalItem={5} totalHarga={75000} />);

    const button = screen.getByRole("button", {
      name: /lihat isi keranjang belanja/i,
    });

    expect(button).toBeInTheDocument();
  });

  it("menampilkan teks 'Pesan' saat totalItem > 0", () => {
    render(<FloatingCart totalItem={3} totalHarga={45000} />);

    expect(screen.getByText("Pesan")).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Requirement 3.4: Klik "Pesan" memicu navigasi ke /checkout
// ---------------------------------------------------------------------------

describe("Klik 'Pesan' memicu navigasi ke /checkout (Req 3.4)", () => {
  it("memanggil navigate('/checkout') saat tombol Pesan diklik", async () => {
    const user = userEvent.setup();
    mockNavigate.mockClear();

    render(<FloatingCart totalItem={2} totalHarga={30000} />);

    const button = screen.getByRole("button", {
      name: /lihat isi keranjang belanja/i,
    });

    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/checkout");
  });
});
