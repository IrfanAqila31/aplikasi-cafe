import { MapPin, Phone, Mail, Clock } from "lucide-react";

const LocationSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#211107] relative z-10 border-t border-white/5">
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
                    Jl. Kopi Nusantara No. 99, Kecamatan Sedap, Kota Bahagia 12345
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
                  <p className="text-sm text-stone-400">Senin - Jumat: 08.00 - 22.00</p>
                  <p className="text-sm text-stone-400">Sabtu - Minggu: 07.00 - 23.00</p>
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
                  <p className="text-sm text-stone-400">hello@paloracafe.com</p>
                </div>
              </div>

            </div>
          </div>

          {/* Map Side */}
          <div data-aos="fade-left" className="w-full lg:w-2/3 h-[400px] lg:h-auto min-h-[400px] relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126938.83490796333!2d106.74418652435552!3d-6.229740134449833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" 
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
