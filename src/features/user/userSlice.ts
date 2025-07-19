import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createUserSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    createUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.data = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getUserRequest,
  getUserSuccess,
  getUserFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
