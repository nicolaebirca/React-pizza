import { configureStore } from "@reduxjs/toolkit";

import filterReducer from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import pizza from "./slices/pizzasSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cart,
    pizza: pizza,
  },
});

console.log(store);
