import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createStoryModalOpen: false,
  storyInit: [],
  objects: [],
  image: [],
  storyViewer: false,
};

export const createStoryModal = createSlice({
  name: "CreatePost",
  initialState,
  reducers: {
    setCreateStoryOpen: (state, action) => {
      state.createStoryModalOpen = action.payload;
    },
    setStory: (state, action) => {
      state.storyInit = action.payload;
    },
    setObjects: (state, action) => {
      state.objects = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setStoryViewer: (state, action) => {
      state.storyViewer = action.payload;
    },
  },
});

export const {
  setCreateStoryOpen,
  setStory,
  setObjects,
  setImage,
  setStoryViewer,
} = createStoryModal.actions;

export default createStoryModal.reducer;
