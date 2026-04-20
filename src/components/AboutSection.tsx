import { motion } from "framer-motion";
import { Leaf, Award, Clock } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Biji Kopi Pilihan",
    desc: "Dipilih langsung dari petani lokal terbaik di Nusantara.",
  },
  {
    icon: Award,
    title: "Barista Berpengalaman",
    desc: "Tim kami terlatih untuk menghadirkan cita rasa terbaik.",
  },
  {
    icon: Clock,
    title: "Buka Setiap Hari",
    desc: "Hadir untuk kamu dari pagi hingga malam, 08.00–22.00.",
  },
];

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#2b1408] border-y border-white/5 shadow-inner"
    >
      {/* Diagonal lines background */}
      <div className="absolute inset-0 bg-lines opacity-10 pointer-events-none" />

      {/* Gradient accent kiri */}
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      {/* Gradient accent kanan */}
      <div className="absolute -right-40 top-1/4 w-[400px] h-[400px] bg-orange-700/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative corner shapes */}
      <div className="absolute top-8 right-8 w-20 h-20 rounded-2xl border border-amber-500/10 rotate-12 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-8 left-8 w-14 h-14 rounded-xl border border-amber-500/20 -rotate-6 pointer-events-none hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Gambar */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative"
          >
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-amber-500/30 -z-10" />
            {/* Dot accent */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-dots rounded-xl opacity-20 -z-10" />
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop"
              alt="Suasana Palora Cafe"
              className="rounded-2xl w-full object-cover h-64 sm:h-80 lg:h-[420px] shadow-[0_16px_48px_rgba(0,0,0,0.6)] border border-white/5"
            />
            {/* Badge overlay */}
            <div className="absolute bottom-6 left-6 bg-[#3d1d0c]/80 backdrop-blur-md border border-white/10 text-amber-400 px-4 py-2.5 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <p className="text-base font-bold leading-none drop-shadow-md">Sejak 2019</p>
              <p className="text-xs text-stone-300 mt-0.5">
                Melayani dengan ❤️
              </p>
            </div>
          </motion.div>

          {/* Teks */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="w-full lg:w-1/2"
          >
            <span className="inline-block text-xs font-semibold text-amber-300 bg-amber-900/30 border border-amber-500/20 px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
              Tentang Kami
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-50 drop-shadow-[0_2px_10px_rgba(251,191,36,0.1)] mb-5 leading-snug">
              Cerita di Balik
              <br />
              Palora Cafe
            </h2>
            <p className="text-stone-400 leading-relaxed mb-4">
              Berawal dari kecintaan terhadap kopi Nusantara, Palora Cafe hadir
              sebagai tempat bertemunya para penikmat kopi sejati. Kami percaya
              setiap cangkir memiliki ceritanya sendiri.
            </p>
            <p className="text-stone-400 leading-relaxed mb-8">
              Bukan sekadar kedai kopi — ini adalah ruang untuk bersantai,
              bekerja, dan merayakan momen bersama orang-orang terdekat.
            </p>

            {/* Feature list */}
            <div className="flex flex-col gap-4">
              {features.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all shadow-none hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(217,119,6,0.1)]">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-100 text-sm">
                      {title}
                    </p>
                    <p className="text-stone-400 text-sm mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
