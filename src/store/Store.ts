import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./sessionSlice";
const store = configureStore({
  reducer: {
    sessionSlice,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
