import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartFromLocalStorage } from "../../utils/getCartFromLocalStorage";


export type CartItem = {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
  imageUrl: string;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const { items, totalPrice} = getCartFromLocalStorage();

const initialState: CartSliceState = {
  totalPrice: totalPrice,
  items: items,
};

const calculateTotalPrice = (items: CartItem[]) => {
  return parseFloat(items.reduce((sum, obj) => obj.price * obj.count + sum, 0).toFixed(2));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calculateTotalPrice(state.items);
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        if (findItem.count > 1) {
          findItem.count--;
        } else {
          state.items = state.items.filter((obj) => obj.id !== action.payload);
        }
      }

      state.totalPrice = calculateTotalPrice(state.items);
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = calculateTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const selectCart = (state: RootState) => state.cart;

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
