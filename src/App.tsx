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
import LoginPage from "./pages/LoginPage";
import type { CartItem } from "./types/cart";
import { addItem, removeItem, getTotalItem } from "./utils/cartUtils";
import type { Product } from "./data/Menu";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#2b1408] flex items-center justify-center text-amber-50 font-bold">
        Memeriksa akses...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

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

  const handleClearCart = () => {
    setCartItems([]);
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
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/kasir"
          element={
            <ProtectedRoute>
              <Kasir />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cartItems={cartItems}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
