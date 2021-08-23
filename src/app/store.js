import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../feature/bookSlice";
import ownedBookTitlesReducer from "../feature/ownedBookTitlesSlice";
import ownedBooksReducer from "../feature/ownedBooksSlice";

export const store = configureStore({
  reducer: {
    bookReducer,
    ownedBookTitlesReducer,
    ownedBooksReducer
  },
});
