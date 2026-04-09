import { Routes, Route } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage";
import Kasir from "./pages/KasirPage";
import NotFound from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kasir" element={<Kasir />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
