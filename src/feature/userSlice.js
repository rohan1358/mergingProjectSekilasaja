import { createSlice, creacteAsyncThunk } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      console.log(action.payload)
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state) => state.user;
const userReducer = userSlice.reducer;
export default userReducer;
