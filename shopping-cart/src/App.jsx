import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Product from "./components/Product/Product";
import ProductDetail from "./components/Product/ProductDetail";
import Cart from "./components/Cart/Cart";
import data from "./assets/data.json";

export default function App() {
  const [productData, setProductData] = useState([...data]);

  const updateProductData = (prod) => {
    const existingProdIdx = productData.findIndex((item) => item.id === prod.id);
    const existingProd = productData[existingProdIdx];
    let updatedList = [];
    if (!existingProd) {
      let updatedProd;
      if (existingProd.stock === 1) {
        updatedList = productData.filter((item) => item.id !== prod.id);
      } else {
        updatedProd = { ...existingProd, stock: existingProd.stock - prod.amount };
        updatedList = [...productData];
        updatedList[existingProdIdx] = updatedProd;
      }
      setProductData(updatedList);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <Routes>
          <Route path="/" element={<Product data={productData} />} />
          <Route path="/product/:slug" element={<ProductDetail data={productData} onAddToCart={updateProductData} />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </>
  );
}
