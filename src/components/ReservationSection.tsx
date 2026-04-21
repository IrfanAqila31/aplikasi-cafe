import { useState, useRef, useEffect } from "react";
import { Users, Clock, User, Send, ChevronDown, Check } from "lucide-react";
import CustomDatePicker from "./CustomDatePicker";
import CustomTimePicker from "./CustomTimePicker";

const ReservationSection = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState("2");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const personOptions = [
    { value: "1", label: "1 Orang" },
    { value: "2", label: "2 Orang" },
    { value: "3", label: "3 Orang" },
    { value: "4", label: "4 Orang" },
    { value: "5", label: "5 Orang" },
    { value: "6", label: "6 Orang" },
    { value: "7", label: "7 Orang" },
    { value: "8", label: "8 Orang" },
    { value: "9", label: "9 Orang" },
    { value: "10+", label: "10+ Orang" },
  ];

  return (
    <section
      id="reservation"
      className="py-16 sm:py-24 bg-[#211107] relative overflow-hidden"
    >
      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-lines opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Teks Info */}
          <div data-aos="fade-right" className="w-full lg:w-1/2">
            <span className="inline-block text-xs font-semibold text-amber-300 bg-amber-900/30 border border-amber-500/20 px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
              Book a Table
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-50 mb-5 leading-snug">
              Reservasi Tempat <br />
              <span className="text-amber-500">Momen Spesial Anda</span>
            </h2>
            <p className="text-stone-400 mb-8 leading-relaxed">
              Baik untuk pertemuan bisnis, perayaan ulang tahun, atau sekadar
              kumpul bersama sahabat, kami siap menyediakan meja terbaik untuk
              Anda. Reservasi sekarang agar tidak kehabisan tempat.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-900/20 flex items-center justify-center border border-amber-500/10">
                  <Users className="text-amber-400 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-amber-100 font-semibold mb-1">
                    Kapasitas Fleksibel
                  </h4>
                  <p className="text-sm text-stone-500">
                    Dari meja berdua hingga acara 50+ orang.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-900/20 flex items-center justify-center border border-amber-500/10">
                  <Clock className="text-amber-400 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-amber-100 font-semibold mb-1">
                    Tepat Waktu
                  </h4>
                  <p className="text-sm text-stone-500">
                    Meja Anda akan siap 15 menit sebelum kedatangan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Reservasi */}
          <div
            data-aos="fade-left"
            data-aos-delay="200"
            className="w-full lg:w-1/2"
          >
            <div className="bg-[#2b1408]/80 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm text-stone-400 font-medium">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                      <input
                        type="text"
                        placeholder="Contoh: Budi Santoso"
                        className="w-full bg-[#1c0e06] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-stone-400 font-medium">
                      Jumlah Orang
                    </label>
                    <div className="relative" ref={dropdownRef}>
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 z-10 pointer-events-none" />

                      {/* Select Trigger */}
                      <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full bg-[#1c0e06] border transition-all rounded-xl py-3 pl-10 pr-4 text-sm cursor-pointer flex items-center justify-between ${isDropdownOpen ? "border-amber-500/50 ring-1 ring-amber-500/50 text-stone-200" : "border-white/10 text-stone-200 hover:border-amber-500/30"}`}
                      >
                        <span className="select-none pointer-events-none">
                          {personOptions.find(
                            (opt) => opt.value === selectedPerson,
                          )?.label || "Pilih jumlah orang"}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-stone-500 transition-transform duration-300 pointer-events-none ${isDropdownOpen ? "rotate-180 text-amber-500" : ""}`}
                        />
                      </div>

                      {/* Dropdown Options */}
                      <div
                        className={`absolute left-0 right-0 top-[calc(100%+0.5rem)] bg-[#2b1408]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl transition-all duration-300 z-50 origin-top max-h-56 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20 ${isDropdownOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}
                      >
                        {personOptions.map((option) => (
                          <div
                            key={option.value}
                            onClick={() => {
                              setSelectedPerson(option.value);
                              setIsDropdownOpen(false);
                            }}
                            className={`px-4 py-3 text-sm cursor-pointer transition-colors flex items-center justify-between ${selectedPerson === option.value ? "bg-amber-500/10 text-amber-400" : "text-stone-300 hover:bg-white/5 hover:text-stone-100"}`}
                          >
                            <span>{option.label}</span>
                            {selectedPerson === option.value && (
                              <Check className="w-4 h-4" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm text-stone-400 font-medium">
                      Tanggal
                    </label>
                    <CustomDatePicker
                      value={selectedDate}
                      onChange={setSelectedDate}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-stone-400 font-medium">
                      Jam
                    </label>
                    <CustomTimePicker
                      value={selectedTime}
                      onChange={setSelectedTime}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-stone-400 font-medium">
                    Catatan Khusus (Opsional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Contoh: Minta meja di dekat jendela atau smoking area..."
                    className="w-full bg-[#1c0e06] border border-white/10 rounded-xl p-4 text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="button"
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3.5 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Booking Sekarang
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;
