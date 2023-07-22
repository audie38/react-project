import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Product from "./components/Product/Product";
import ProductDetail from "./components/Product/ProductDetail";
import Cart from "./components/Cart/Cart";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </>
  );
}
