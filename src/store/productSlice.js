import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  subtotal: 0,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },

    removeItem: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
    },

    clearCart: (state) => {
      state.products = [];
      state.subtotal = 0;
    },
    setSubtotal: (state, action) => {
      state.subtotal = action.payload;
    },
  },
});

export const { addToCart, removeItem, clearCart, setSubtotal } =
  productSlice.actions;
