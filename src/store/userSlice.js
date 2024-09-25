import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    signout: (state) => {
      state.user = null;
      state.token = null;
    },
    join: (state, action) => {
      state.user.user.checkpost = action.payload;
    },
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload }; // Merge updated data
    },
    updateUserPhoto: (state, action) => {
      if (state.user) {
        state.user.user.photoUrl = action.payload; // Update the user's photo URL
      }
    },
  },
});

export const { login, signout, join, updateUser, updateUserPhoto } =
  userSlice.actions;
