import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import noteReducer from "../slices/noteSlice";
import blogReducer from "../slices/blogSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: noteReducer,
    blogs: blogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
