import { createSlice } from "@reduxjs/toolkit";

export const allBooksSlice = createSlice({
  name: "allBooks",
  initialState: {
    allBooks: [],
  },
  reducers: {
    setAllBooks: (state, action) => {
      state.allBooks = action.payload;
    },
  },
});

export const { setAllBooks } = allBooksSlice.actions;
export const selectAllBooks = (state) => state.allBooksReducer.allBooks;
const allBooksReducer = allBooksSlice.reducer;
export default allBooksReducer;
