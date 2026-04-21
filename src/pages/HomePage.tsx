import HeroSection from "../components/HeroSection";
import PromoSection from "../components/PromoSection";
import AboutSection from "../components/AboutSection";
import ProductSection from "../components/ProductSection";
import ReservationSection from "../components/ReservationSection";
import FaqSection from "../components/FaqSection";
import LocationSection from "../components/LocationSection";
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
      <PromoSection />
      <AboutSection />
      <ProductSection
        cartItems={cartItems}
        onAddItem={onAddItem}
        onRemoveItem={onRemoveItem}
      />
      <ReservationSection />
      <FaqSection />
      <LocationSection />
      <Footer />
    </main>
  );
};

export default Home;
