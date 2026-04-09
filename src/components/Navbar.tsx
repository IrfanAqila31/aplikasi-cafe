import { Link } from "react-router"; 
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    // Efek glassmorphism berkelas pada base terang dan animasi turun dari atas
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white/80 backdrop-blur-lg border-b border-stone-200 shadow-[0_2px_15px_rgba(0,0,0,0.03)] sticky top-0 z-50"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        
        {/* Identitas Merek */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-stone-900 drop-shadow-sm hover:text-amber-700 transition-colors">
          Palora Cafe
        </Link>

        {/* Daftar Navigasi */}
        <ul className="flex gap-8 font-medium text-stone-600">
          <li>
            <a href="#home" className="hover:text-amber-600 hover:-translate-y-0.5 inline-block transition-all">
              Beranda
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-amber-600 hover:-translate-y-0.5 inline-block transition-all">
              Tentang Kami
            </a>
          </li>
          <li>
            <a href="#menu" className="hover:text-amber-600 hover:-translate-y-0.5 inline-block transition-all">
              Pesan Menu
            </a>
          </li>
        </ul>

      </nav>
    </motion.header>
  );
};

export default Navbar;