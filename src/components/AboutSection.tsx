const AboutSection = () => {
  return (
    // Jarak vertikal (py-16) agar tidak terlalu menempel dengan Hero section
    <section className="container mx-auto px-4 py-16">
      
      {/* Flexbox responsif: 
        Di layar HP (default) akan menumpuk dari atas ke bawah (flex-col).
        Di layar tablet/komputer (md) akan bersebelahan kiri-kanan (md:flex-row).
      */}
      <div className="flex flex-col md:flex-row items-center gap-12">
        
        {/* Bagian Kiri: Gambar Kafe */}
        <div className="w-full md:w-1/2">
          <img
            // Menggunakan gambar placeholder dari Unsplash agar langsung terlihat hasilnya
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop"
            alt="Suasana Palora Cafe"
            className="rounded-2xl shadow-xl w-full object-cover h-[400px]"
          />
        </div>

        {/* Bagian Kanan: Teks Deskripsi */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-orange-950 mb-6">
            Cerita di Balik Palora Cafe
          </h2>
          
          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            Berawal dari kecintaan kami terhadap kopi Nusantara, Palora Cafe hadir sebagai tempat bertemunya para penikmat kopi sejati. Kami percaya bahwa setiap cangkir kopi memiliki ceritanya sendiri yang patut dibagikan.
          </p>
          
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Tempat ini bukan sekadar kedai kopi, melainkan ruang yang dirancang secara khusus agar Anda dapat bersantai, bekerja dengan fokus, maupun merayakan momen bersama orang-orang terdekat dengan pelayanan terbaik.
          </p>

          {/* Elemen tambahan: Statistik kecil untuk menambah nilai jual (Selling Point) */}
          <div className="grid grid-cols-2 gap-6 border-t border-orange-200 pt-6">
            <div>
              <h3 className="text-2xl font-extrabold text-orange-700">10+</h3>
              <p className="text-gray-600 font-medium">Varian Kopi Spesial</p>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-orange-700">100%</h3>
              <p className="text-gray-600 font-medium">Biji Kopi Pilihan</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;