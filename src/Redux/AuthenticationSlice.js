import { createSlice } from "@reduxjs/toolkit";
const authenticationSlice = createSlice({
  name: "authentication",
  initialState: { jwt: localStorage.getItem("jwt") ?? "" },
  reducers: {
    updateJWT(state, action) {
      state.jwt = action.payload;
    },
  },
});
export const authenticationActions = authenticationSlice.actions;
export default authenticationSlice;
