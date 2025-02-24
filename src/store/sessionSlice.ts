import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  session: null,
};
const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.session = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.session = null;
    },
  },
});

export const { login, logout } = sessionSlice.actions;

export default sessionSlice.reducer;
