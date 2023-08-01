import { createSlice } from "@reduxjs/toolkit";

const productInitialState = {
  cart: [],
  showCart: false,
};

const productSlice = createSlice({
  name: "product",
  initialState: productInitialState,
  reducers: {
    showCart(state) {
      state.showCart = true;
    },
    hideCart(state) {
      state.showCart = false;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.cart.findIndex((item) => item.id === newItem.id);
      const existingItem = state.cart[existingItemIndex];
      if (existingItem) {
        let updateItem = { ...existingItem, quantity: existingItem.quantity + newItem.quantity };
        let updatedCartItem = [...state.cart];
        updatedCartItem[existingItemIndex] = updateItem;
        state.cart = updatedCartItem;
      } else {
        state.cart.push(newItem);
      }
    },
    updateCartItemQuantity(state, action) {
      const existingItemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      const existingItem = state.cart[existingItemIndex];
      if (existingItem) {
        let updatedItem = { ...existingItem, quantity: existingItem.quantity + action.payload.quantity };
        let updatedList = [...state.cart];
        updatedList[existingItemIndex] = updatedItem;
        updatedList = updatedList.filter((item) => item.quantity > 0);
        state.cart = updatedList;
      }
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
