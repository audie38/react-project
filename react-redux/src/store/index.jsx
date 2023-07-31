import { createStore } from "redux";

export const INCREMENT = "increment";
export const DECREMENT = "decrement";
export const TOGGLE = "toggle";

const initialState = {
  counter: 0,
  showCounter: true,
};

const counterReducer = (state, action) => {
  const amount = action.value || 1;
  switch (action.type) {
    case INCREMENT:
      return { counter: state.counter + amount, showCounter: state.showCounter };
    case DECREMENT:
      return { counter: state.counter - amount, showCounter: state.showCounter };
    case TOGGLE:
      return { counter: state.counter, showCounter: !state.showCounter };
    default:
      return state;
  }
};

const store = createStore(counterReducer, initialState);
export default store;
