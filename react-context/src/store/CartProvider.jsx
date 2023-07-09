import PropTypes from "prop-types";
import CartContext from "./CartContext";
import { useState } from "react";

export default function CartProvider(props) {
  const [cartItem, setCartItem] = useState([]);

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

  const updateCartItemHandler = (updatedItem) => {
    const existingItem = cartItem.find((item) => item.id === updatedItem.id);
    if (existingItem) {
      const existingItemId = existingItem.id;
      if (parseInt(updatedItem.qty) <= 0) {
        const newCartItem = cartItem.filter((item) => item.id !== existingItemId);
        setCartItem([...newCartItem]);
      }
    }
  };

  const context = {
    items: cartItem,
    updateCart: cartItemHandler,
    filterCart: updateCartItemHandler,
  };
  return <CartContext.Provider value={context}>{props.children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
