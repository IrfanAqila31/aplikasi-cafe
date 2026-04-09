import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare, MapPin, Clock, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-stone-950 text-stone-400 pt-20 pb-8 mt-auto border-t border-stone-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Kolom 1: Brand & Tentang */}
          <div className="col-span-1">
            <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
              Palora <span className="text-amber-600">Cafe</span>
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed mb-6 pe-4">
              Rumah bagi penikmat kopi otentik. Tempat persinggahan sejenak merajut cerita manis dengan cita rasa Nusantara premium pilihan para pakar. 
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all">
                <Phone className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Kolom 2: Navigasi Singkat */}
          <div className="col-span-1">
            <h4 className="text-white font-bold text-lg mb-6">Jelajahi</h4>
            <ul className="space-y-4">
              <li>
                <a href="#home" className="hover:text-amber-500 transition-colors flex items-center gap-2 group cursor-pointer">
                  <ArrowRight className="w-4 h-4 text-stone-600 group-hover:text-amber-500 transition-colors" /> Beranda
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-500 transition-colors flex items-center gap-2 group cursor-pointer">
                  <ArrowRight className="w-4 h-4 text-stone-600 group-hover:text-amber-500 transition-colors" /> Tentang Kami
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-500 transition-colors flex items-center gap-2 group cursor-pointer">
                  <ArrowRight className="w-4 h-4 text-stone-600 group-hover:text-amber-500 transition-colors" /> Menu Kopi
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Info & Kontak */}
          <div className="col-span-1">
            <h4 className="text-white font-bold text-lg mb-6">Hubungi Kami</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-sm">
                  Jl. Majapahit No. 88, Mataram <br /> Nusa Tenggara Barat, Indonesia.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-sm">
                  Buka Setiap Hari <br /> <strong className="text-stone-300 font-medium">08.00 - 22.00 WITA</strong>
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bagian Bawah: Hak Cipta */}
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-stone-500">
            &copy; {new Date().getFullYear()} Palora Cafe. Hak Cipta Dilindungi.
          </p>
          <p className="text-stone-600">
            Dibuat dengan <span className="text-amber-600 text-lg opacity-80">☕</span> oleh Irfan
          </p>
        </div>

      </div>
    </motion.footer>
  );
};

export default Footer;
