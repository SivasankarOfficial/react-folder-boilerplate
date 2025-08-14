import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileState } from "../../types/profile.types";
const initialState: ProfileState = {
  profile: {},
  loading: false,
  error: null,
};
const profileReducer = createSlice({
  name: "profile",
  initialState,
  reducers: {
    createProfileRequest(state, action: PayloadAction<any>) {
      state.loading = true;
      state.error = null;
    },
    createProfileSuccess(state, action: PayloadAction<any>) {
      state.profile = action.payload;
      state.loading = false;
    },
    createProfileFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProfileRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess(state, action: PayloadAction<any>) {
      state.profile = action.payload;
      state.loading = false;
    },
    fetchProfileFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileRequest(state, action: any) {
      console.log(action, "pooo");

      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess(state, action: PayloadAction<any>) {
      state.profile = { ...state.profile, ...action.payload };
      state.loading = false;
    },
    updateProfileFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createProfileRequest,
  createProfileSuccess,
  createProfileFailure,
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
} = profileReducer.actions;

export default profileReducer.reducer;
