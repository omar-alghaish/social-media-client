import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import themeModeSlice from "./features/themeSlice";
import globalLoadingSlice from "./features/globalLodaingSlice";
import createPostSlice from "./features/creatPostModalSlice";
import appStateSlice from "./features/appStateSlice";
import forgetPasswordSlice from "./features/forgetPasswordSlice";
import socketSlice from "./features/socketSlice";
import sideBarSlice from "./features/sideBar";
import createStorySlice from "./features/createStoryModalSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    themeMode: themeModeSlice,
    createPost: createPostSlice,
    createStory: createStorySlice,
    globalLoading: globalLoadingSlice,
    appState: appStateSlice,
    forgetPassword: forgetPasswordSlice,
    socket: socketSlice,
    sideBar: sideBarSlice,
  },
});

export default store;
