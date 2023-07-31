import { createStore } from "redux";

const initialState = {
  counter: 0,
  showCounter: true,
};

const counterReducer = (state, action) => {
  const amount = action.value || 1;
  switch (action.type) {
    case "increment":
      return { counter: state.counter + amount, showCounter: state.showCounter };
    case "decrement":
      return { counter: state.counter - amount, showCounter: state.showCounter };
    case "toggle":
      return { counter: state.counter, showCounter: !state.showCounter };
    default:
      return state;
  }
};

const store = createStore(counterReducer, initialState);
export default store;
