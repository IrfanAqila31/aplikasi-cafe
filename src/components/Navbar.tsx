import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

interface NavbarProps {
  totalItem?: number;
}

const Navbar = ({ totalItem = 0 }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { href: "#home", label: "Beranda" },
    { href: "#promo", label: "Promo" },
    { href: "#about", label: "Tentang" },
    { href: "#menu", label: "Menu" },
    { href: "#reservation", label: "Reservasi" },
    { href: "#faq", label: "FAQ" },
    { href: "#location", label: "Lokasi" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/" + href);
      // Tunggu sebentar agar halaman home termuat, kemudian scroll.
      setTimeout(() => {
        const elem = document.getElementById(href.substring(1));
        if (elem) elem.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      const elem = document.getElementById(href.substring(1));
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", href);
      }
    }
  };

  return (
    <>
      <header
        data-aos="fade-down"
        className="sticky top-0 z-50 bg-[#31170a]/80 backdrop-blur-lg border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
          {/* Brand */}
          <Link
            to="/"
            className="font-serif text-xl sm:text-2xl font-bold text-amber-50 hover:text-amber-300 transition-colors tracking-wide drop-shadow-[0_2px_10px_rgba(251,191,36,0.2)]"
          >
            Palora <span className="text-amber-500">Cafe</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            <ul className="flex items-center gap-0.5 lg:gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="px-2.5 py-1.5 rounded-lg text-[13px] lg:text-sm font-medium text-stone-300 hover:text-amber-400 hover:bg-white/5 transition-all cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="w-px h-5 bg-white/10 mx-2" />

            {/* Tombol Pesanan */}
            <Link
              to="/checkout"
              aria-label={`Lihat pesanan, ${totalItem} item`}
              className="flex items-center gap-2 bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-amber-50 font-semibold text-sm px-4 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(217,119,6,0.3)] hover:shadow-[0_0_25px_rgba(217,119,6,0.5)] hover:-translate-y-0.5"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <span>Pesanan</span>
              {totalItem > 0 && (
                <span className="bg-amber-400 text-[#31170a] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                  {totalItem > 99 ? "99+" : totalItem}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Layout (Visible up to md screens) */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/checkout"
              aria-label={`Lihat pesanan, ${totalItem} item`}
              className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 text-amber-50 hover:bg-white/10 hover:border-amber-500/50 transition-colors shadow-sm"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              {totalItem > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-[#31170a] text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                  {totalItem > 9 ? "9+" : totalItem}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Buka menu navigasi"
              aria-expanded={menuOpen}
              className="relative p-2 w-10 h-10 rounded-xl hover:bg-white/5 transition-colors text-amber-50 flex items-center justify-center overflow-hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`absolute w-6 h-6 transition-all duration-300 transform ${
                  menuOpen ? "opacity-0 scale-50 -rotate-90" : "opacity-100 scale-100 rotate-0"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`absolute w-6 h-6 transition-all duration-300 transform ${
                  menuOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-90"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Dropdown */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />
      <div
        className={`lg:hidden fixed top-[62px] left-3 right-3 z-40 rounded-2xl border border-white/10 bg-[#3d1d0c]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 origin-top transform ${
          menuOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <ul className="px-2 py-2 flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block px-4 py-3 rounded-xl font-medium text-stone-300 hover:bg-white/5 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
