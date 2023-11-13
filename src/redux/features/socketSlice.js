// socketSlice.js
import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: null,
  reducers: {
    initializeSocket: (state, action) => {
      return action.payload;
    },
    closeSocket: (state) => {
      if (state) {
        state.disconnect();
      }
      return null;
    },
  },
});

export const { initializeSocket, closeSocket } = socketSlice.actions;
export default socketSlice.reducer;
