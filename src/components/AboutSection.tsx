import { motion } from "framer-motion";
import { CheckCircle2, Coffee } from "lucide-react";

const AboutSection = () => {
  return (
    // Jarak vertikal (py-16) agar tidak terlalu menempel dengan Hero section
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      
      {/* Flexbox responsif */}
      <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        
        {/* Bagian Kiri: Gambar Kafe */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 relative group"
        >
          <div className="absolute inset-0 bg-stone-900/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop"
            alt="Suasana Palora Cafe"
            className="rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] w-full object-cover h-[400px] border border-stone-100"
          />
        </motion.div>

        {/* Bagian Kanan: Teks Deskripsi */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold text-stone-900 mb-6 tracking-tight">
            Cerita di Balik Palora Cafe
          </h2>
          
          <p className="text-stone-600 text-lg mb-4 leading-relaxed">
            Berawal dari kecintaan kami terhadap kopi Nusantara, Palora Cafe hadir sebagai tempat bertemunya para penikmat kopi sejati. Kami percaya bahwa setiap cangkir kopi memiliki ceritanya sendiri yang patut dibagikan.
          </p>
          
          <p className="text-stone-600 text-lg leading-relaxed mb-8">
            Tempat ini bukan sekadar kedai kopi, melainkan ruang yang dirancang secara khusus agar Anda dapat bersantai, bekerja dengan fokus, maupun merayakan momen bersama orang-orang terdekat dengan pelayanan terbaik.
          </p>

          {/* Elemen tambahan: Statistik */}
          <div className="grid grid-cols-2 gap-6 border-t border-stone-200 pt-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Coffee className="w-6 h-6 text-amber-500" />
                <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-yellow-600">10+</h3>
              </div>
              <p className="text-stone-500 font-medium mt-1">Varian Kopi Spesial</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-6 h-6 text-amber-500" />
                <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-yellow-600">100%</h3>
              </div>
              <p className="text-stone-500 font-medium mt-1">Biji Kopi Pilihan</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;