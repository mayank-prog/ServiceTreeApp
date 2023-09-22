import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [
   
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.requests.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.requests.splice(action.payload, 1);
    },
    updateCartItem: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.requests.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;
