import { takeEvery } from "@redux-saga/core/effects";
import {
  loginAPI,
  signupAPI,
  //   registerAPI,
} from "./authAPI";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} from "./authSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginPayload, RegisterPayload } from "../../types/auth.types";
import { call, put } from "redux-saga/effects";
import { hideLoader, showLoader } from "../loader/loaderSlice";

function* handleLogin(action: any): Generator<any, void, unknown> {
  try {
    yield put(showLoader());

    const user = yield call(loginAPI, action.payload);

    yield put(loginSuccess(user));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  } finally {
    yield put(hideLoader());
  }
}

function* handleRegister(action: PayloadAction<RegisterPayload>): Generator<any, void, any> {
  try {
    yield put(showLoader());

    const user = yield call(signupAPI, action.payload);
    yield put(registerSuccess(user));
  } catch (error: any) {
    yield put(registerFailure(error.message));
  } finally {
    yield put(hideLoader());
  }
}

export default function* authSaga() {
  yield takeEvery(loginRequest.type, handleLogin);
  yield takeEvery(registerRequest.type, handleRegister);
}
