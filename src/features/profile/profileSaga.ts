import { takeEvery } from "@redux-saga/core/effects";
import { call, put } from "redux-saga/effects";
import { createProfileFailure, createProfileRequest, createProfileSuccess, updateProfileRequest } from "./profileSlice";
import { createProfile, updateProfile } from "./profileAPI";
import { updateUserFailure, updateUserSuccess } from "../user/userSlice";

// // GET
// function* fetchProfileSaga(action: any): any {
//   try {
//     const user = yield call(getUserById, action.payload);
//     yield put(getUserSuccess(user));
//   } catch (error: any) {
//     yield put(getUserFailure(error.message));
//   }
// }

// POST
function* createProfileSaga(action: any): Generator<any, void, any> {
  try {
    console.log("Creating profile with data:", action.payload);

    const profile = yield call(createProfile, action.payload);
    yield put(createProfileSuccess(profile));
  } catch (error: any) {
    yield put(createProfileFailure(error.message));
  }
}

// PUT
function* updateProfileSaga(action: any): Generator<any, void, any> {
  console.log(action, "saga");

  try {
    const user = yield call(updateProfile, action.payload.id, action.payload);
    yield put(updateUserSuccess(user));
  } catch (error: any) {
    yield put(updateUserFailure(error.message));
  }
}

// // DELETE
// function* deleteProfileSaga(action: any) {
//   try {
//     if (typeof action.payload === "string") {
//       yield call(deleteUser, action.payload);
//     } else {
//       throw new Error("Invalid payload: expected a string.");
//     }
//     yield put(deleteUserSuccess(null));
//   } catch (error: any) {
//     yield put(deleteUserFailure(error.message));
//   }
// }

// Root saga
export default function* profileSaga() {
  yield takeEvery(createProfileRequest.type, createProfileSaga);
  //   yield takeEvery(createUserRequest.type, createUserSaga);
  yield takeEvery(updateProfileRequest.type, updateProfileSaga);
  //   yield takeEvery(deleteUserRequest.type, deleteUserSaga);
}
