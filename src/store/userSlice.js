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
    updateUser: (state, action) => {
      state.user.user = action.payload;
    },
  },
});

export const { login, signout, join, updateUser } = userSlice.actions;
