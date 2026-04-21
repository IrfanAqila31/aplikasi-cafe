import { ArrowRight, Coffee } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-[#2b1408] bg-grain">
      {/* Dot grid background */}
      <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />

      {/* Gradient blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-orange-700/20 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Decorative rings */}
      <div className="absolute top-16 right-16 w-40 h-40 rounded-full border border-amber-500/20 pointer-events-none hidden lg:block" />
      <div className="absolute top-20 right-20 w-28 h-28 rounded-full border border-orange-500/10 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-24 left-12 w-24 h-24 rounded-full border border-amber-500/20 pointer-events-none hidden lg:block" />

      {/* Floating dots */}
      <div className="absolute top-32 left-[15%] w-2.5 h-2.5 rounded-full bg-amber-400/50 pointer-events-none hidden sm:block shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
      <div className="absolute top-48 right-[20%] w-2 h-2 rounded-full bg-orange-400/40 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-32 right-[15%] w-3 h-3 rounded-full bg-amber-500/40 pointer-events-none hidden sm:block shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
      <div className="absolute bottom-20 left-[25%] w-1.5 h-1.5 rounded-full bg-amber-400/60 pointer-events-none hidden sm:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-24 text-center">
        <div>
          {/* Badge */}
          <div
            data-aos="fade-up"
            data-aos-delay="0"
            className="inline-flex items-center gap-2 bg-amber-900/30 bg-clip-padding backdrop-blur-sm border border-amber-500/30 shadow-[0_0_15px_rgba(217,119,6,0.15)] text-amber-200 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
          >
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
            <span>Specialty Coffee · Mataram, NTB</span>
          </div>

          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-amber-50 leading-[1.15] tracking-tight"
          >
            Momen Spesial
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-amber-400 to-amber-600 drop-shadow-[0_2px_10px_rgba(251,191,36,0.2)]">Dimulai Dari Sini</span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-6 text-base sm:text-lg text-stone-400 max-w-xl mx-auto leading-relaxed"
          >
            Biji kopi pilihan Nusantara, diseduh oleh barista berpengalaman.
            Setiap tegukan membawa cerita yang tak terlupakan.
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <a
              href="#menu"
              className="group w-full sm:w-auto flex items-center justify-center gap-2.5 bg-linear-to-r from-amber-600 to-orange-700 text-amber-50 px-7 py-3.5 rounded-xl text-base font-semibold hover:from-amber-500 hover:to-orange-600 transition-all shadow-[0_4px_20px_rgba(217,119,6,0.3)] hover:shadow-[0_6px_28px_rgba(217,119,6,0.5)] hover:-translate-y-0.5 border border-amber-500/50"
            >
              <Coffee className="w-4 h-4 opacity-90" />
              <span>Lihat Menu Kopi</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="#about"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 backdrop-blur-md text-amber-50 px-7 py-3.5 rounded-xl text-base font-semibold hover:bg-white/10 hover:text-amber-300 transition-all border border-white/10 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Tentang Kami
            </a>
          </div>

          {/* Stats */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="mt-14 sm:mt-16 flex flex-wrap justify-center gap-8 sm:gap-16"
          >
            {[
              { value: "10+", label: "Varian Menu" },
              { value: "500+", label: "Pelanggan Setia" },
              { value: "4.9★", label: "Rating Rata-rata" },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center relative">
                {i > 0 && (
                  <div className="absolute -left-4 sm:-left-8 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10 hidden sm:block" />
                )}
                <p className="text-2xl sm:text-3xl font-bold text-amber-400 drop-shadow-[0_2px_10px_rgba(251,191,36,0.2)]">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-stone-400 mt-1 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
