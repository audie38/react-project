import { createSlice } from "@reduxjs/toolkit";

const counterInitialState = {
  counter: 0,
  showCounter: true,
};

const counterSlice = createSlice({
  name: "counter",
  initialState: counterInitialState,
  reducers: {
    increment(state, action) {
      let amount = action.payload || 1;
      state.counter = state.counter + amount;
    },
    decrement(state, action) {
      let amount = action.payload || 1;
      state.counter = state.counter - amount;
    },
    toggle(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
