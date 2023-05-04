import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

// First, create the thunk equivalent to thunk function

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (postId) => {
    const { data } = await Axios.get(
      "http://localhost:3002/post/post_comments",
      { headers: { token: localStorage.getItem("token"), post_id: postId } }
    );
    if (data.message === "Success") {
      return {
        post_id: postId,
        comments: data.post_comments,
      };
    }
  }
);

export const newComment = createAsyncThunk(
  "comments/newComment",
  async (comment) => {
    const { data } = await Axios.post(
      `http://localhost:3002/comment/create`,
      comment,
      { headers: { token: localStorage.getItem("token") } }
    );
    console.log(data);
    if (data.message) {
      return data.newComment;
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async (comment) => {
    const { data } = await Axios.put(
      `http://localhost:3002/comment/update`,
      comment,
      { headers: { token: localStorage.getItem("token") } }
    );
    console.log(data);
    if (data.message) {
      return data.updatedComment;
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (comment) => {
    const commentToDelete = comment[0];

    const { data } = await Axios.delete(
      `http://localhost:3002/comment/delete`,
      {
        headers: { token: localStorage.getItem("token") },
        data: commentToDelete,
      }
    );
    console.log(data);
    if (data.message) {
      return comment;
    }
  }
);

const initialState = {
  comments: {},
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getComments.fulfilled, (state, action) => {
      const comments = action.payload.comments;
      const post_id = action.payload.post_id;
      state.comments[post_id] = comments;
    });

    ////////////////////////////////////////////////////////////////////

    builder.addCase(newComment.fulfilled, (state, action) => {
      const newComment = action.payload;
      const post_id = newComment.post_id;
      state.comments[post_id].push(newComment);
    });

    ////////////////////////////////////////////////////////////////////
    builder.addCase(updateComment.fulfilled, (state, action) => {
      const updatedComment = action.payload;
      console.log(updatedComment);
      const post_id = updatedComment.post_id;
      state.comments[post_id].forEach((commentObj) => {
        if (commentObj._id === updatedComment._id) {
          commentObj.content = updatedComment.content;
          commentObj.updatedAt = updatedComment.updatedAt;
        }
      });
    });
    ////////////////////////////////////////////////////////////////////

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      const comment = action.payload;
      const commentId = comment[0].comment_id;
      const postId = comment[1].post_id;
      const index = state.comments[postId].findIndex(
        (comment) => comment._id === commentId
      );
      state.comments[postId].splice(index, 1);
    });

    ////////////////////////////////////////////////////////////////////
  },
});

export const commentsReducer = commentsSlice.reducer;

export const selectAllComments = (state) => state.Comments.comments;
