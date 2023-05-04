import { createSlice } from "@reduxjs/toolkit";

// First, create the thunk equivalent to thunk function
const initialState = {
  value: {},
};

const CurrentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    userData: (state, action) => {
      const user = action.payload;
      state.value = user;
    },
    clearUser: (state) => {
      state.value = {};
    },
  },
});

export const { userData, clearUser, userToken } = CurrentUserSlice.actions;
export const currentUserReducer = CurrentUserSlice.reducer;

export const userSelector = (state) => state.CurrentUser.value;
