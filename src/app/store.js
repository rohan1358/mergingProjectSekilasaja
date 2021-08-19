import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../feature/bookSlice";

export const store = configureStore({
  reducer: {
    bookReducer,
  },
});
