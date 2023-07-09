/* eslint-disable no-unused-vars */
import React from "react";

const CartContext = React.createContext({
  items: [],
  updateCart: (item) => {},
  filterCart: (item) => {},
});

export default CartContext;
