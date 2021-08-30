import { createSlice } from "@reduxjs/toolkit";

export const favoriteBookTitlesSlice = createSlice({
  name: "favoriteBookTitles",
  initialState: {
    favoriteBookTitles: [],
  },
  reducers: {
    setFavoriteBookTitles: (state, action) => {
      state.favoriteBookTitles = action.payload;
    },
  },
});

export const { setFavoriteBookTitles } = favoriteBookTitlesSlice.actions;
export const selectFavoriteBookTitles = (state) =>
  state.favoriteBookTitlesReducer.favoriteBookTitles;
const favoriteBookTitlesReducer = favoriteBookTitlesSlice.reducer;
export default favoriteBookTitlesReducer;
