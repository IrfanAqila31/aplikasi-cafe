import { Tag, Coffee, Gift } from "lucide-react";

const promos = [
  {
    icon: Coffee,
    title: "Morning Coffee Bundling",
    desc: "Nikmati Kopi Tubruk + Roti Bakar Coklat hanya Rp 35.000 (08.00 - 11.00)",
    color: "from-amber-600 to-orange-500",
  },
  {
    icon: Tag,
    title: "Happy Hour Diskon 20%",
    desc: "Diskon 20% untuk semua varian Es Kopi Kawan Lama setiap jam 14.00 - 17.00.",
    color: "from-amber-500 to-yellow-500",
  },
  {
    icon: Gift,
    title: "Voucher Member Baru",
    desc: "Daftar member di kasir dan dapatkan gratis 1 cup Kopi Susu gula aren.",
    color: "from-orange-500 to-red-500",
  },
];

const PromoSection = () => {
  return (
    <section className="py-12 sm:py-20 bg-[#2b1408] border-b border-white/5 relative overflow-hidden">
      {/* Decorative blurry gradients */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-700/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          data-aos="fade-up"
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-50 drop-shadow-[0_2px_10px_rgba(251,191,36,0.1)] mb-4">
            Penawaran Spesial
          </h2>
          <p className="text-stone-400 max-w-2xl mx-auto">
            Nikmati berbagai promo menarik yang menanti Anda di Palora Cafe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promos.map((promo, index) => {
            const Icon = promo.icon;
            return (
              <div
                key={promo.title}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className="relative group bg-[#3d1d0c]/60 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
              >
                {/* Accent line on top */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${promo.color} opacity-80 rounded-t-2xl`}
                />
                <div className="w-12 h-12 rounded-xl bg-amber-900/40 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-amber-100 mb-2">
                  {promo.title}
                </h3>
                <p className="text-sm text-stone-400 leading-relaxed font-medium">
                  {promo.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
