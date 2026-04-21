import { useState, useMemo, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Routes, Route } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage";
import Kasir from "./pages/KasirPage";
import NotFound from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import CheckoutPage from "./pages/CheckoutPage";
import type { CartItem } from "./types/cart";
import { addItem, removeItem, getTotalItem } from "./utils/cartUtils";
import type { Product } from "./data/Menu";

function App() {
  useEffect(() => {
    AOS.init({ once: false, mirror: true, duration: 600, easing: "ease-out-cubic", offset: 100 });
  }, []);

  // CartState berbasis array CartItem[]
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Derived values dihitung dari cartItems
  const totalItem = useMemo(() => getTotalItem(cartItems), [cartItems]);

  // Handler menggunakan pure functions dari cartUtils.ts
  const handleAddItem = (product: Product) => {
    setCartItems((prev) => addItem(prev, product));
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems((prev) => removeItem(prev, productId));
  };

  return (
    <>
      <Navbar totalItem={totalItem} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              cartItems={cartItems}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
            />
          }
        />
        <Route path="/kasir" element={<Kasir />} />
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cartItems={cartItems}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
