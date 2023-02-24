import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listProduct: null,
  loading: false,
  error: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    startAddToCart: state => {
      state.loading = true;
    },
    addToCartSuccess: (state, action) => {
      state.loading = false;
      state.listProduct = action.payload;
    },
    fauilreAddToCart: state => {
      state.loading = false;
      state.error = true;
    },
    clearCart: state => {
      state.listProduct = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { startAddToCart, addToCartSuccess, fauilreAddToCart, clearCart } =
  productSlice.actions;

export default productSlice.reducer;
