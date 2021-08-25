import { createSlice, creacteAsyncThunk } from "@reduxjs/toolkit";

export const ownedBookTitlesSlice = createSlice({
  name: "ownedBookTitles",
  initialState: {
    ownedBookTitles: [],
  },
  reducers: {
    setOwnedBookTitles: (state, action) => {
      state.ownedBookTitles = action.payload;
    },
  },
});

export const { setOwnedBookTitles } = ownedBookTitlesSlice.actions;
export const selectOwnedBookTitles = (state) =>
  state.ownedBookTitlesReducer.ownedBookTitles;
const ownedBookTitlesReducer = ownedBookTitlesSlice.reducer;
export default ownedBookTitlesReducer;
