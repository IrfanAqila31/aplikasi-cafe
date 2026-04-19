import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  totalItem?: number;
}

const Navbar = ({ totalItem = 0 }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Beranda" },
    { href: "#about", label: "Tentang Kami" },
    { href: "#menu", label: "Pesan Menu" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-[#fdf8f0]/90 backdrop-blur-md border-b border-amber-100 shadow-[0_1px_12px_rgba(124,74,30,0.07)]"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
          {/* Brand */}
          <Link
            to="/"
            className="font-serif text-xl sm:text-2xl font-bold text-[#7c4a1e] hover:text-amber-700 transition-colors tracking-wide"
          >
            Palora <span className="text-amber-500">Cafe</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <ul className="flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-stone-600 hover:text-[#7c4a1e] hover:bg-amber-50 transition-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="w-px h-5 bg-amber-200 mx-2" />

            {/* Tombol Pesanan */}
            <Link
              to="/checkout"
              aria-label={`Lihat pesanan, ${totalItem} item`}
              className="flex items-center gap-2 bg-[#7c4a1e] hover:bg-[#6a3d18] text-amber-50 font-semibold text-sm px-4 py-2.5 rounded-xl transition-all shadow-[0_2px_8px_rgba(124,74,30,0.3)] hover:shadow-[0_4px_16px_rgba(124,74,30,0.4)] hover:-translate-y-0.5"
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
                <span className="bg-amber-400 text-[#7c4a1e] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                  {totalItem > 99 ? "99+" : totalItem}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/checkout"
              aria-label={`Lihat pesanan, ${totalItem} item`}
              className="relative p-2.5 rounded-xl bg-[#7c4a1e] text-amber-50 hover:bg-[#6a3d18] transition-colors shadow-sm"
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
                <span className="absolute -top-1 -right-1 bg-amber-400 text-[#7c4a1e] text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {totalItem > 9 ? "9+" : totalItem}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Buka menu navigasi"
              aria-expanded={menuOpen}
              className="p-2 rounded-xl hover:bg-amber-50 transition-colors text-[#7c4a1e]"
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="md:hidden fixed inset-0 z-40 bg-black/10"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="md:hidden fixed top-[62px] left-3 right-3 z-40 rounded-2xl border border-amber-100 bg-[#fdf8f0] shadow-[0_8px_32px_rgba(124,74,30,0.12)]"
            >
              <ul className="px-2 py-2 flex flex-col gap-0.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl font-medium text-stone-700 hover:bg-amber-50 hover:text-[#7c4a1e] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
