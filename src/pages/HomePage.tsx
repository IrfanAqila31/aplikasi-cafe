import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";
import type { CartItem } from "../types/cart";
import type { Product } from "../data/Menu";

interface HomeProps {
  cartItems: CartItem[];
  onAddItem: (product: Product) => void;
  onRemoveItem: (productId: number) => void;
}

const Home = ({ cartItems, onAddItem, onRemoveItem }: HomeProps) => {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProductSection
        cartItems={cartItems}
        onAddItem={onAddItem}
        onRemoveItem={onRemoveItem}
      />
      <Footer />
    </main>
  );
};

export default Home;
