import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./AuthenticationSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
  },
});
