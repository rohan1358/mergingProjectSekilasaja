import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import bookReducer from "../feature/bookSlice";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  book: bookReducer,
});

const persistReducer_ = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistReducer_,
});

export const persistor = persistStore(store);

export default store;
