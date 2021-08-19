import { createSlice, creacteAsyncThunk } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    book: [],
  },
  reducers: {
    setBook: (state, action) => {
      state.book = action.payload;
    },
  },
});

export const { setBook } = bookSlice.actions;
export const selectBook = (state) => state.bookReducer.book;
const bookReducer = bookSlice.reducer;
export default bookReducer;
