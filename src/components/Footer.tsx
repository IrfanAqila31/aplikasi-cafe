import { Mail, Phone, MessageSquare, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer
      data-aos="fade-up"
      className="bg-[#231106] text-stone-400 border-t border-white/5"
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
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:border-amber-500/50 hover:bg-white/10 hover:text-amber-400 hover:shadow-[0_0_15px_rgba(217,119,6,0.2)] transition-all"
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
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {[
                { href: "#home", label: "Beranda" },
                { href: "#promo", label: "Promo" },
                { href: "#about", label: "Tentang" },
                { href: "#menu", label: "Menu" },
                { href: "#reservation", label: "Reservasi" },
                { href: "#faq", label: "FAQ" },
                { href: "#location", label: "Lokasi" },
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
                  Jl. Raden Puguh Puyung, Lombok Tengah
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
                    Senin - Jumat: 09.00 – 22.00 WITA
                    <br />
                    Sabtu - Minggu: 10.00 – 23.00 WITA
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} Palora Cafe. Hak Cipta Dilindungi.
          </p>
          <p>
            Dibuat oleh{" "}
            <span className="text-amber-600 font-medium tracking-wide">
              Irfan Aqila Utama
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
