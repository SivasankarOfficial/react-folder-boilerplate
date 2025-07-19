import { takeEvery } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { getUserById, createUser, updateUser, deleteUser } from "./userAPI";
import {
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
} from "./userSlice";

// GET
function* fetchUserSaga(action: any): any {
  try {
    const user = yield call(getUserById, action.payload);
    yield put(getUserSuccess(user));
  } catch (error: any) {
    yield put(getUserFailure(error.message));
  }
}

// POST
function* createUserSaga(action: any): Generator<any, void, any> {
  try {
    const user = yield call(createUser, action.payload);
    yield put(createUserSuccess(user));
  } catch (error: any) {
    yield put(createUserFailure(error.message));
  }
}

// PUT
function* updateUserSaga(action: any): Generator<any, void, any> {
  try {
    const user = yield call(updateUser, action.payload.id, action.payload.data);
    yield put(updateUserSuccess(user));
  } catch (error: any) {
    yield put(updateUserFailure(error.message));
  }
}

// DELETE
function* deleteUserSaga(action: any) {
  try {
    if (typeof action.payload === "string") {
      yield call(deleteUser, action.payload);
    } else {
      throw new Error("Invalid payload: expected a string.");
    }
    yield put(deleteUserSuccess(null));
  } catch (error: any) {
    yield put(deleteUserFailure(error.message));
  }
}

// Root saga
export default function* userSaga() {
  yield takeEvery(getUserRequest.type, fetchUserSaga);
  yield takeEvery(createUserRequest.type, createUserSaga);
  yield takeEvery(updateUserRequest.type, updateUserSaga);
  yield takeEvery(deleteUserRequest.type, deleteUserSaga);
}
