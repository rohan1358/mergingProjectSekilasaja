import { createSlice } from "@reduxjs/toolkit";

export const ownedBooksSlice = createSlice({
  name: "ownedBooks",
  initialState: {
    ownedBooks: [],
  },
  reducers: {
    setOwnedBooks: (state, action) => {
      state.ownedBooks = action.payload;
    },
  },
});

export const { setOwnedBooks } = ownedBooksSlice.actions;
export const selectOwnedBooks = (state) => state.ownedBooksReducer.ownedBooks;
const ownedBooksReducer = ownedBooksSlice.reducer;
export default ownedBooksReducer;
