import { createSlice, creacteAsyncThunk } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = [...action.payload];
    }
  },
});

export const { setCart } = cartSlice.actions;

export const selectCart = (state) => state.cart;
const cartReducer = cartSlice.reducer;
export default cartReducer;
