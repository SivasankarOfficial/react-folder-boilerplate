import { combineReducers } from "@reduxjs/toolkit";
// import userReducer from '../features/user/userSlice';
// import more slices here

const rootReducer = combineReducers({
  // user: userReducer,
  // cart: cartReducer,
  // theme: themeReducer,
});

export default rootReducer;

// Optional: export RootState type here if preferred
export type RootState = ReturnType<typeof rootReducer>;
