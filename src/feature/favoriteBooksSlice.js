import { createSlice } from "@reduxjs/toolkit";

export const favoriteBooksSlice = createSlice({
  name: "favoriteBooks",
  initialState: {
    favoriteBooks: [],
  },
  reducers: {
    setFavoriteBooks: (state, action) => {
      state.favoriteBooks = action.payload;
    },
  },
});

export const { setFavoriteBooks } = favoriteBooksSlice.actions;
export const selectFavoriteBooks = (state) =>
  state.favoriteBooksReducer.favoriteBooks;
const favoriteBooksReducer = favoriteBooksSlice.reducer;
export default favoriteBooksReducer;
