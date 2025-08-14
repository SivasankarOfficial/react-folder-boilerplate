import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginPayload, RegisterPayload } from "../../types/auth.types";

const initialState: AuthState = {
  user: {},
  loading: false,
  error: null,
  selectedRole: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(state, _action: PayloadAction<LoginPayload>) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.user = action.payload;
      localStorage.setItem("token", action.payload.token);
      state.loading = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    registerRequest(state, _action: PayloadAction<RegisterPayload>) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<any>) {
      state.user = action.payload;
      state.loading = false;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    logout(state) {
      state.user = {};
    },
    setRole: (state, action: PayloadAction<"client" | "freelancer">) => {
      state.selectedRole = action.payload;
    },
    resetRole: (state) => {
      state.selectedRole = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout,
  setRole,
  resetRole,
} = authSlice.actions;

export default authSlice.reducer;
