import { MapPin, Phone, Mail, Clock } from "lucide-react";

const LocationSection = () => {
  return (
    <section id="location" className="py-16 sm:py-24 bg-[#211107] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-aos="fade-up" className="text-center mb-12 lg:mb-16">
          <span className="inline-block text-xs font-semibold text-amber-300 bg-amber-900/30 border border-amber-500/20 px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Kunjungi Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-50 drop-shadow-[0_2px_10px_rgba(251,191,36,0.1)] mb-4">
            Lokasi & Kontak
          </h2>
          <p className="text-stone-400">
            Temukan kami dan rasakan langsung hangatnya secangkir kopi di Palora Cafe.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-[#2b1408] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
          
          {/* Info Side */}
          <div className="w-full lg:w-1/3 p-8 sm:p-10 flex flex-col justify-center bg-gradient-to-br from-[#3d1d0c] to-[#2b1408]">
            <div className="space-y-8">
              
              <div 
                data-aos="fade-right"
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-amber-900/30 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <MapPin className="text-amber-400 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-amber-100 font-semibold mb-1">Alamat</h4>
                  <p className="text-sm text-stone-400 leading-relaxed">
                    Jl. Raden Puguh Puyung, Lombok Tengah, Nusa Tenggara Barat
                  </p>
                </div>
              </div>

              <div 
                data-aos="fade-right"
                data-aos-delay="100"
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-amber-900/30 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <Clock className="text-amber-400 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-amber-100 font-semibold mb-1">Jam Operasional</h4>
                  <p className="text-sm text-stone-400">Senin - Jumat: 09.00 - 22.00</p>
                  <p className="text-sm text-stone-400">Sabtu - Minggu: 10.00 - 23.00</p>
                </div>
              </div>

              <div 
                data-aos="fade-right"
                data-aos-delay="200"
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-amber-900/30 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <Phone className="text-amber-400 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-amber-100 font-semibold mb-1">Telepon / WA</h4>
                  <p className="text-sm text-stone-400">+62 812 3456 7890</p>
                </div>
              </div>

              <div 
                data-aos="fade-right"
                data-aos-delay="300"
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-amber-900/30 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <Mail className="text-amber-400 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-amber-100 font-semibold mb-1">Email</h4>
                  <p className="text-sm text-stone-400">paloracafe@gmail.com</p>
                </div>
              </div>

            </div>
          </div>

          {/* Map Side */}
          <div data-aos="fade-left" className="w-full lg:w-2/3 h-[400px] lg:h-auto min-h-[400px] relative">
            <iframe 
              src="https://maps.google.com/maps?q=Jalan+Raden+Puguh,+Puyung,+Lombok+Tengah,+Nusa+Tenggara+Barat&t=&z=14&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale contrast-125 opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LocationSection;
