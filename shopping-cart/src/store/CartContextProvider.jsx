import { useState } from "react";
import PropTypes from "prop-types";
import CartContext from "./CartContext";
import data from "../assets/data.json";

export default function CartContextProvider(props) {
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

  const restoreProductData = (id, restoredAmount) => {
    let updatedItem;
    let updatedList = [];
    const existingItemIdx = productData.findIndex((item) => item.id === +id);
    const existingItem = productData[existingItemIdx];
    if (existingItem) {
      updatedItem = { ...existingItem, stock: parseInt(existingItem.stock) + parseInt(restoredAmount) };
      updatedList = [...productData];
      updatedList[existingItemIdx] = updatedItem;
      setProductData(updatedList);
    }
  };

  const removeItemFromCart = (prod) => {
    let updatedCart = [...cartItem];
    updatedCart = updatedCart.filter((item) => item.id !== +prod.id);
    setCartItem(updatedCart);
    restoreProductData(prod.id, prod.amount);
  };

  const updateCartItemQty = (item) => {
    let existingItemIdx = cartItem.findIndex((prod) => prod.id === +item.id);
    let existingItem = cartItem[existingItemIdx];
    if (existingItem) {
      let updatedItem = { ...existingItem, amount: item.amount };
      let updatedList = [...cartItem];
      updatedList[existingItemIdx] = updatedItem;
      setCartItem(updatedList);
      restoreProductData(item.id, item.restored);
    }
  };

  const currencyFormatter = (curr) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    const priceAmt = formatter.format(curr.toFixed(2));
    return priceAmt;
  };

  const context = {
    products: productData,
    carts: cartItem,
    onUpdateProduct: updateProductData,
    onAddToCart: addToCartHandler,
    onRestoreProduct: restoreProductData,
    onRemoveItemFromCart: removeItemFromCart,
    onUpdateCartItem: updateCartItemQty,
    currencyFormatter: currencyFormatter,
  };
  return <CartContext.Provider value={context}>{props.children}</CartContext.Provider>;
}

CartContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
