import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
};

export const forgetPasswordSlice = createSlice({
  name: "ForgetPassword",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setEmail } = forgetPasswordSlice.actions;

export default forgetPasswordSlice.reducer;
