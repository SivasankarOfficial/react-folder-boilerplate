import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import loaderSlice from "../features/loader/loaderSlice";
import profileSlice from "../features/profile/profileSlice";
import jobReducer from "../features/jobPosts/jobSlice";
// import userReducer from '../features/user/userSlice';
// import more slices here

const rootReducer = combineReducers({
  auth: authSlice,
  load: loaderSlice,
  profile: profileSlice,
  jobs: jobReducer,
  // cart: cartReducer,
  // theme: themeReducer,
});

export default rootReducer;

// Optional: export RootState type here if preferred
export type RootState = ReturnType<typeof rootReducer>;
