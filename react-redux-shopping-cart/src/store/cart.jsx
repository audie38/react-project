import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = {
  cart: [],
  showCart: false,
  itemsUpdated: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    showCart(state) {
      state.showCart = true;
    },
    hideCart(state) {
      state.showCart = false;
    },
    replaceCart(state, action) {
      state.cart = action.payload;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.cart.findIndex((item) => parseInt(item.productId) === parseInt(newItem.productId));
      const existingItem = state.cart[existingItemIndex];
      if (existingItem) {
        let updateItem = { ...existingItem, quantity: existingItem.quantity + newItem.quantity };
        let updatedCartItem = [...state.cart];
        updatedCartItem[existingItemIndex] = updateItem;
        state.cart = updatedCartItem;
      } else {
        state.cart.push(newItem);
      }
      state.itemsUpdated = true;
    },
    updateCartItemQuantity(state, action) {
      const existingItemIndex = state.cart.findIndex((item) => item.productId === action.payload.productId);
      const existingItem = state.cart[existingItemIndex];
      if (existingItem) {
        let updatedItem = { ...existingItem, quantity: existingItem.quantity + action.payload.quantity };
        let updatedList = [...state.cart];
        updatedList[existingItemIndex] = updatedItem;
        updatedList = updatedList.filter((item) => item.quantity > 0);
        state.cart = updatedList;
      }
      state.itemsUpdated = true;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
