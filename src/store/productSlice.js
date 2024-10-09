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
        // Check if adding more would exceed stock
        const newQuantity = item.quantity + action.payload.quantity;
        if (newQuantity > action.payload.stock) {
          toast.error("Cannot add more than available stock");
        } else {
          item.quantity = newQuantity;
        }
      } else {
        if (action.payload.quantity > action.payload.stock) {
          toast.error("Cannot add more than available stock");
        } else {
          state.products.push(action.payload);
        }
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
