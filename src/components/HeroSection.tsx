import { Link } from "react-router";
const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 pt-16 pb-6 text-center bg-white rounded-b-3xl shadow-lg mb-12">
      <h1 className="text-4xl md:text-6xl font-bold text-orange-950 leading-tight">
        Momen Spesial Dimulai Dengan <span className="block text-orange-600">Segelas Kopi Terbaik</span>
      </h1>
      <p className="mt-8 text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
        Selamat datang di Palora Cafe. Kami menghadirkan biji kopi pilihan dengan kualitas terbaik, diseduh oleh barista berpengalaman untuk memberikan pengalaman rasa yang tak terlupakan di setiap sesapan Anda.
      </p>
      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        
        <Link 
          to="#menu" 
          className="inline-block bg-orange-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-800 transition-colors shadow-lg"
        >
          Lihat Menu Kopi
        </Link>
        
        <Link 
          to="#"
          className="inline-block bg-white text-orange-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-100 transition-colors border border-orange-200"
        >
          Pelajari Lebih Lanjut
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;