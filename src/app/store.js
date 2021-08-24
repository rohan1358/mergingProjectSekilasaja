import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import bookReducer from "../feature/bookSlice";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  book: bookReducer,  
})

const persistReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistReducer
});

export const persistor = persistStore(store)

export default store