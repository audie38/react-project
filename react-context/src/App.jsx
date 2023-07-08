import React, { useState } from "react";
import NavigationBar from "./components/UI/NavigationBar";
import Home from "./components/Home";
import Cart from "./components/Cart/Cart";

import MenuList from "./assets/data.json";

export default function App() {
  const menuItem = MenuList;
  const [cartItem, setCartItem] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const cartItemHandler = (data) => {
    let entry = data;
    const existingItem = cartItem.find((item) => item.id === data.id);
    if (existingItem) {
      setCartItem([...cartItem.filter((item) => item.id !== existingItem.id)]);
      entry = { ...existingItem, qty: existingItem.qty + data.qty };
      console.log("Entry: ", entry);
    }
    setCartItem((prevData) => [...prevData, entry]);
  };

  const toggleCartHandler = () => {
    setShowCart(!showCart);
  };

  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <React.Fragment>
      <NavigationBar onShow={toggleCartHandler} itemCount={cartItem.length} />
      {showCart ? <Cart data={cartItem} onHide={hideCartHandler} /> : <Home menu={menuItem} onAdd={cartItemHandler} />}
    </React.Fragment>
  );
}
