import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

// First, create the thunk equivalent to thunk function

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const { data } = await Axios.get("http://localhost:3002/post/all_posts", {
    headers: { token: localStorage.getItem("token") },
  });
  if (data.message === "Success") {
    return data.all_posts;
  }
});

export const newPost = createAsyncThunk("posts/newPost", async (post) => {
  const { data } = await Axios.post(
    `http://localhost:3002/post/create_post`,
    post,
    { headers: { token: localStorage.getItem("token") } }
  );
  if (data.message) {
    return data.newPost;
  }
});

export const updatePost = createAsyncThunk("posts/updatePost", async (post) => {
  const { data } = await Axios.put(
    `http://localhost:3002/post/update_post`,
    post,
    { headers: { token: localStorage.getItem("token") } }
  );
  if (data.message) {
    return data.updatedPost;
  }
});

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    const { data } = await Axios.delete(
      `http://localhost:3002/post/delete_post`,
      { headers: { token: localStorage.getItem("token"), post_id: postId } }
    );
    if (data.message) {
      return postId;
    }
  }
);

const initialState = {
  status: "idle",
  error: null,
  posts: {},
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let postsObj = {};
        action.payload.forEach((post) => {
          postsObj[post._id] = post;
        });
        state.posts = postsObj;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    ////////////////////////////////////////////////////////////////////

    builder.addCase(newPost.fulfilled, (state, action) => {
      let newPost = action.payload;
      state.posts[newPost._id] = newPost;
    });

    ////////////////////////////////////////////////////////////////////
    builder.addCase(updatePost.fulfilled, (state, action) => {
      let updatedPost = action.payload;
      console.log(updatedPost);
      state.posts[updatedPost._id] = updatedPost;
    });
    ////////////////////////////////////////////////////////////////////

    builder.addCase(deletePost.fulfilled, (state, action) => {
      const postID = action.payload;
      delete state.posts[postID];
    });

    ////////////////////////////////////////////////////////////////////
  },
});

export const postsReducer = postsSlice.reducer;

export const selectAllPosts = (state) => state.Posts.posts;
