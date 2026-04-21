import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Apakah Palora Cafe memiliki area khusus merokok (Smoking Area)?",
    answer:
      "Ya, kami menyediakan area merokok (smoking area) yang nyaman di bagian luar (outdoor) dan semi-outdoor, lengkap dengan sirkulasi udara yang baik agar tidak mengganggu pelanggan lain.",
  },
  {
    question: "Apakah tersedia WiFi dan colokan listrik untuk bekerja?",
    answer:
      "Tentu saja! Kami menyediakan WiFi berkecepatan tinggi gratis untuk semua pelanggan, serta colokan listrik yang tersedia di hampir setiap meja, cocok untuk Anda yang ingin WFC (Work From Cafe).",
  },
  {
    question: "Apakah Palora Cafe ramah hewan peliharaan (Pet Friendly)?",
    answer:
      "Ya, kami sangat ramah terhadap hewan peliharaan! Anda diizinkan membawa anjing atau kucing peliharaan Anda di area outdoor kami. Mohon pastikan hewan peliharaan Anda dalam pengawasan.",
  },
  {
    question:
      "Apakah bisa reservasi seluruh cafe untuk acara private seperti ulang tahun?",
    answer:
      "Sangat bisa! Kami melayani penyewaan area (sebagian atau seluruh cafe) untuk acara private. Silakan hubungi nomor WhatsApp kami minimal 1 minggu sebelum acara untuk detail paket dan harga.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#2b1408] border-t border-white/5 relative z-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-aos="fade-up" className="text-center mb-12">
          <span className="inline-block text-xs font-semibold text-amber-300 bg-amber-900/30 border border-amber-500/20 px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Tanya Jawab
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-50 drop-shadow-[0_2px_10px_rgba(251,191,36,0.1)] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-400">
            Hal-hal yang paling sering ditanyakan oleh pelanggan kami.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div
                  className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-[#3d1d0c]/80 border-amber-500/30"
                      : "bg-[#1c0e06]/50 border-white/5 hover:border-white/10"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  >
                    <span
                      className={`font-semibold text-sm sm:text-base pr-4 ${isOpen ? "text-amber-400" : "text-amber-100"}`}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-stone-400 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-amber-400" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-[500px]" : "max-h-0"
                    }`}
                  >
                    <div
                      className={`px-5 pb-5 text-stone-400 text-sm leading-relaxed transition-all duration-500 transform ${
                        isOpen
                          ? "translate-y-0 opacity-100 delay-100"
                          : "-translate-y-2 opacity-0"
                      }`}
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
