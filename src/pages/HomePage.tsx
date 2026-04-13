

import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";
import FloatingCart from "../components/FloatingCart";

//Buat antarmuka (interface) untuk menerima Props dari App.tsx
interface HomeProps {
  totalItem: number;
  totalHarga: number;
  onAddToCart: (harga: number) => void;
}

const Home = ({ totalItem, totalHarga, onAddToCart }: HomeProps) => {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProductSection onAddToCart={onAddToCart} />
      <Footer />
      <FloatingCart totalItem={totalItem} totalHarga={totalHarga} />
    </main>
  );
};
export default Home;
