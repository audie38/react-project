/* eslint-disable no-unused-vars */
import React from "react";

const CartContext = React.createContext({
  products: [],
  carts: [],
  cartItemCount: 0,
  onUpdateProduct: (prod) => {},
  onAddToCart: (prod) => {},
  onRestoreProduct: (id, restoredAmount) => {},
  onRemoveItemFromCart: (prod) => {},
  onUpdateCartItem: (prod) => {},
  currencyFormatter: (curr) => {},
});

export default CartContext;
