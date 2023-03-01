import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listProduct: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCartSuccess: (state, action) => {
      state.listProduct = action.payload;
    },
    clearCart: state => {
      state.listProduct = null;
    },
  },
});

export const { addToCartSuccess, clearCart } = productSlice.actions;

export default productSlice.reducer;
