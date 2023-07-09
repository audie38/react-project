import NavigationBar from "./components/UI/NavigationBar";
import Home from "./components/Home";
import Cart from "./components/Cart/Cart";

import CartProvider from "./store/CartProvider";
import MenuList from "./assets/data.json";
import { useState } from "react";

export default function App() {
  const menuItem = MenuList;
  const [show, setShow] = useState(false);
  const setShowHandler = () => {
    setShow(!show);
  };
  const hideCartHandler = () => {
    setShow(false);
  };

  return (
    <CartProvider>
      <NavigationBar toggle={setShowHandler} />
      {show ? <Cart onClose={hideCartHandler} /> : <Home menu={menuItem} />}
    </CartProvider>
  );
}
