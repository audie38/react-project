import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Product from "./components/Product/Product";
import ProductDetail from "./components/Product/ProductDetail";
import Cart from "./components/Cart/Cart";
import data from "./assets/data.json";

export default function App() {
  const [productData, setProductData] = useState([...data]);
  const [cartItem, setCartItem] = useState([]);

  const updateProductData = (prod) => {
    const existingProdIdx = productData.findIndex((item) => item.id === +prod.id);
    const existingProd = productData[existingProdIdx];
    let updatedList = [];
    if (existingProd) {
      let updatedProd;
      if (existingProd.stock >= 1) {
        updatedProd = { ...existingProd, stock: existingProd.stock - prod.amount };
        updatedList = [...productData];
        updatedList[existingProdIdx] = updatedProd;
      }
      setProductData(updatedList);
    }
  };

  const addToCartHandler = (item) => {
    const existingCartItemIdx = cartItem.findIndex((prod) => prod.id === +item.id);
    const existingCartItem = cartItem[existingCartItemIdx];
    if (existingCartItem) {
      let updatedCartList = [...cartItem];
      let updatedItem = { ...existingCartItem, amount: parseInt(existingCartItem.amount) + parseInt(item.amount) };
      updatedCartList[existingCartItemIdx] = updatedItem;
      setCartItem(updatedCartList);
    } else {
      setCartItem((existing) => [...existing, item]);
    }
    updateProductData(item);
  };

  const removeItemFromCart = (prod) => {
    let updatedCart = [...cartItem];
    updatedCart = updatedCart.filter((item) => item.id !== +prod.id);
    setCartItem(updatedCart);
    // Restore Product Stock
    let updatedItem;
    let updatedList = [];
    const existingItemIdx = productData.findIndex((item) => item.id === +prod.id);
    const existingItem = productData[existingItemIdx];
    if (existingItem) {
      updatedItem = { ...existingItem, stock: parseInt(existingItem.stock) + parseInt(prod.amount) };
      updatedList = [...productData];
      updatedList[existingItemIdx] = updatedItem;
      setProductData(updatedList);
    }
  };

  return (
    <>
      <Navbar cartItemCount={cartItem.length} />
      <div className="container my-5">
        <Routes>
          <Route path="/" element={<Product data={productData} onAddToCart={addToCartHandler} />} />
          <Route path="/product/:slug" element={<ProductDetail data={productData} onAddToCart={addToCartHandler} />} />
          <Route path="/cart" element={<Cart data={cartItem} removeItem={removeItemFromCart} />} />
        </Routes>
      </div>
    </>
  );
}
