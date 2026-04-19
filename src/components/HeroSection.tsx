import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, Coffee } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.15 } as never,
  },
};

const itemVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } as never,
  },
};

const HeroSection = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-grain">
      {/* Dot grid background */}
      <div className="absolute inset-0 bg-dots opacity-60 pointer-events-none" />

      {/* Gradient blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-amber-200/25 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-orange-200/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-100/30 rounded-full blur-[80px] pointer-events-none" />

      {/* Decorative rings */}
      <div className="absolute top-16 right-16 w-40 h-40 rounded-full border border-amber-200/40 pointer-events-none hidden lg:block" />
      <div className="absolute top-20 right-20 w-28 h-28 rounded-full border border-amber-300/30 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-24 left-12 w-24 h-24 rounded-full border border-amber-200/40 pointer-events-none hidden lg:block" />

      {/* Floating dots */}
      <div className="absolute top-32 left-[15%] w-2.5 h-2.5 rounded-full bg-amber-300/50 pointer-events-none hidden sm:block" />
      <div className="absolute top-48 right-[20%] w-2 h-2 rounded-full bg-orange-300/40 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-32 right-[15%] w-3 h-3 rounded-full bg-amber-400/30 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-20 left-[25%] w-1.5 h-1.5 rounded-full bg-amber-300/50 pointer-events-none hidden sm:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-24 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-amber-100 text-[#7c4a1e] text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-amber-200 shadow-sm"
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Specialty Coffee · Mataram, NTB</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#3d2b1f] leading-[1.15] tracking-tight"
          >
            Momen Spesial
            <br />
            <span className="text-[#7c4a1e]">Dimulai Dari Sini</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-base sm:text-lg text-stone-500 max-w-xl mx-auto leading-relaxed"
          >
            Biji kopi pilihan Nusantara, diseduh oleh barista berpengalaman.
            Setiap tegukan membawa cerita yang tak terlupakan.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <a
              href="#menu"
              className="group w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#7c4a1e] text-amber-50 px-7 py-3.5 rounded-xl text-base font-semibold hover:bg-[#6a3d18] transition-all shadow-[0_4px_20px_rgba(124,74,30,0.35)] hover:shadow-[0_6px_28px_rgba(124,74,30,0.45)] hover:-translate-y-0.5"
            >
              <Coffee className="w-4 h-4 opacity-90" />
              <span>Lihat Menu Kopi</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="#about"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[#7c4a1e] px-7 py-3.5 rounded-xl text-base font-semibold hover:bg-amber-50 transition-all border border-amber-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Tentang Kami
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-14 sm:mt-16 flex flex-wrap justify-center gap-8 sm:gap-16"
          >
            {[
              { value: "10+", label: "Varian Menu" },
              { value: "500+", label: "Pelanggan Setia" },
              { value: "4.9★", label: "Rating Rata-rata" },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center relative">
                {i > 0 && (
                  <div className="absolute -left-4 sm:-left-8 top-1/2 -translate-y-1/2 w-px h-8 bg-amber-200 hidden sm:block" />
                )}
                <p className="text-2xl sm:text-3xl font-bold text-[#7c4a1e]">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
