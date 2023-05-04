import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "../Features/usersSlice";
import { postsReducer } from "../Features/postsSlice";
import { commentsReducer } from "../Features/commentsSlice";
import { currentUserReducer } from "../Features/currentUserSlice";

export const store = configureStore({
  reducer: {
    CurrentUser: currentUserReducer,
    Posts: postsReducer,
    Comments: commentsReducer,
  },
});
