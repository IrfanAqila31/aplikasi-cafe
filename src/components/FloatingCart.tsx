import { useNavigate } from "react-router";

interface FloatingCartProps {
  totalItem: number;
  totalHarga: number;
}

const FloatingCart = ({ totalItem, totalHarga }: FloatingCartProps) => {
  const navigate = useNavigate();

  if (totalItem === 0) return null;
  return (
    //Menggunakan <aside> untuk konten tambahan yang terpisah dari alur utama dokumen
    <aside className="fixed bottom-8 left-1/2 -translate-x-1/2 w-11/12 max-w-md z-50">
      {/* Menggunakan <button> karena elemen ini interaktif, dan menambahkan aria-label untuk alat bantu baca (Screen Reader) */}
      <button
        type="button"
        aria-label="Lihat isi keranjang belanja"
        onClick={() => navigate("/checkout")}
        className="w-full bg-orange-600 text-white rounded-full shadow-2xl hover:bg-orange-800  transition-transform hover:scale-105 flex justify-between items-center px-6 py-3"
      >
        <div className="flex flex-col text-left">
          <span className="text-sm text-orange-200 font-medium">
            {totalItem} item
          </span>
          <span className="text-sm text-orange-200 font-medium">
            Rp {totalHarga.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wide">Pesan</span>
          {/* Tambahkan aria-hidden="true" agar ikon SVG tidak dibaca dua kali oleh Screen Reader */}
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </button>
    </aside>
  );
};
export default FloatingCart;
