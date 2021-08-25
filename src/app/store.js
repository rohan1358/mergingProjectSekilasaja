import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import cartReducer from "../feature/cartSlice";
import storage from "redux-persist/lib/storage";
import userReducer from "../feature/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  cart: cartReducer,
  user: userReducer
});

const persistReducer_ = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistReducer_,
});

export const persistor = persistStore(store);

export default store;
