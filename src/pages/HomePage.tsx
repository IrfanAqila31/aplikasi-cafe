import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";
import FloatingCart from "../components/FloatingCart";
const Home = () => {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProductSection />
      <Footer />
      <FloatingCart totalItem={1} totalHarga={20000} />
    </main>
  );
};
export default Home;
