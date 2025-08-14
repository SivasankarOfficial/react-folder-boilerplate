import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jobState, ProfileState } from "../../types/profile.types";
const initialState: jobState = {
  jobs: {},
  loading: false,
  error: null,
};
const jobReducer = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    createJobRequest(state, action: PayloadAction<any>) {
      console.log("Creating job with data:", action.payload);
      state.loading = true;
      state.error = null;
    },
    createJobSuccess(state, action: PayloadAction<any>) {
      state.jobs = action.payload;
      state.loading = false;
    },
    createJobFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // fetchProfileRequest(state) {
    //   state.loading = true;
    //   state.error = null;
    // },
    // fetchProfileSuccess(state, action: PayloadAction<any>) {
    //   state.profile = action.payload;
    //   state.loading = false;
    // },
    // fetchProfileFailure(state, action: PayloadAction<string>) {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
    updateJobRequest(state, action: any) {
      console.log(action, "pooo");

      state.loading = true;
      state.error = null;
    },
    // updateProfileSuccess(state, action: PayloadAction<any>) {
    //   state.profile = { ...state.profile, ...action.payload };
    //   state.loading = false;
    // },
    updateJobFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createJobRequest,
  createJobSuccess,
  createJobFailure,
  //   fetchProfileRequest,
  //   fetchProfileSuccess,
  //   fetchProfileFailure,
  updateJobRequest,
  //   updateProfileSuccess,
  updateJobFailure,
} = jobReducer.actions;

export default jobReducer.reducer;
