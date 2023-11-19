import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice = createSlice({
  name: "sideBarOpen",
  initialState: {
    sideBarOpen: false,
  },
  reducers: {
    setSideBarOpen: (state, action) => {
      state.sideBarOpen = !state.sideBarOpen;
    },
  },
});

export const { setSideBarOpen } = sideBarSlice.actions;
export default sideBarSlice.reducer;
