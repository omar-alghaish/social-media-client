import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createPostModalOpen: false,
  postInit: [],
};

export const createPostModal = createSlice({
  name: "CreatePost",
  initialState,
  reducers: {
    setCreatePostOpen: (state, action) => {
      state.createPostModalOpen = action.payload;
    },
    setPost: (state, action) => {
      state.postInit = action.payload;
    },
  },
});

export const { setCreatePostOpen, setPost } = createPostModal.actions;

export default createPostModal.reducer;
