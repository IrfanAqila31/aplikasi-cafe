import { useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage";
import Kasir from "./pages/KasirPage";
import NotFound from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import CheckoutPage from "./pages/CheckoutPage"; 

function App() {
  // 1. Memori keranjang disini
  const [totalItem, setTotalItem] = useState(0);
  const [totalHarga, setTotalHarga] = useState(0);

  // 2. Fungsi remot kontrolnya disini
  const handleTambahPesanan = (harga: number) => {
    setTotalItem((prev) => prev + 1);
    setTotalHarga((prev) => prev + harga);
  };
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              totalItem={totalItem}
              totalHarga={totalHarga}
              onAddToCart={handleTambahPesanan}
            />
          }
        />
        <Route path="/kasir" element={<Kasir />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
