import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, Coffee } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
};

const HeroSection = () => {
  return (
    <section id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center relative">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-100/40 via-stone-50/0 to-transparent -z-10 blur-3xl"
      ></motion.div>
      
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 w-full">
        <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-stone-900 leading-tight tracking-tight drop-shadow-sm">
          Momen Spesial Dimulai Dengan <br className="hidden md:block" /> 
          <span className="inline-block text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-yellow-600 mt-2">
            Segelas Kopi Terbaik
          </span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="mt-8 text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed">
          Selamat datang di Palora Cafe. Kami menghadirkan biji kopi pilihan dengan kualitas premium, diseduh oleh barista berpengalaman untuk memberikan perpaduan rasa yang tak terlupakan di setiap sesapan Anda.
        </motion.p>
        
        <motion.div variants={itemVariants} className="mt-14 flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link 
            to="#menu" 
            className="group flex items-center justify-center gap-2 bg-stone-900 text-white px-8 py-3.5 rounded-full text-lg font-medium hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/20 hover:shadow-2xl hover:shadow-stone-900/40 hover:-translate-y-1"
          >
            <Coffee className="w-5 h-5 opacity-90" />
            <span>Lihat Menu Kopi</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
          
          <Link 
            to="#"
            className="flex items-center justify-center gap-2 bg-white text-stone-800 px-8 py-3.5 rounded-full text-lg font-medium hover:bg-stone-100 transition-all border border-stone-200 shadow-md hover:shadow-lg hover:-translate-y-1"
          >
            Pelajari Lebih Lanjut
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;