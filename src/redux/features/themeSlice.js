import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: localStorage.getItem("theme") || "dark",
};

export const themeModeSlice = createSlice({
  name: "ThemeMode",
  initialState,
  reducers: {
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;

      if (action.payload) localStorage.setItem("theme", action.payload);
    },
  },
});

export const { setThemeMode } = themeModeSlice.actions;

export default themeModeSlice.reducer;
