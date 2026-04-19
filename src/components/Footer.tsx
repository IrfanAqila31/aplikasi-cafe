import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="bg-[#2c1a0e] text-stone-400 border-t border-stone-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-serif text-2xl font-bold text-amber-100 mb-3">
              Palora <span className="text-amber-500">Cafe</span>
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed mb-6 max-w-xs">
              Rumah bagi penikmat kopi otentik. Tempat merajut cerita hangat
              dengan cita rasa Nusantara pilihan.
            </p>
            <div className="flex gap-3">
              {[Mail, Phone, MessageSquare].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-stone-800 flex items-center justify-center hover:bg-amber-700 hover:text-amber-50 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="text-amber-100 font-semibold text-sm mb-5 uppercase tracking-wider">
              Jelajahi
            </h4>
            <ul className="space-y-3">
              {[
                { href: "#home", label: "Beranda" },
                { href: "#about", label: "Tentang Kami" },
                { href: "#menu", label: "Menu Kopi" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-500 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-amber-100 font-semibold text-sm mb-5 uppercase tracking-wider">
              Hubungi Kami
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-sm text-stone-500">
                  Jl. Majapahit No. 88, Mataram
                  <br />
                  Nusa Tenggara Barat
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-sm text-stone-500">
                  Setiap Hari
                  <br />
                  <span className="text-stone-300 font-medium">
                    08.00 – 22.00 WITA
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-stone-600">
          <p>
            &copy; {new Date().getFullYear()} Palora Cafe. Hak Cipta Dilindungi.
          </p>
          <p>
            Dibuat oleh{" "}
            <span className="text-amber-700 font-medium">
              Irfan Aqila Utama
            </span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
