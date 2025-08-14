import { takeEvery } from "@redux-saga/core/effects";
import { call, put } from "redux-saga/effects";
import { createJobFailure, createJobRequest, createJobSuccess, updateJobFailure, updateJobRequest } from "./jobSlice";
import { createJobs, updateJobs } from "./jobAPI";

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
function* createJobSaga(action: any): Generator<any, void, any> {
  try {
    console.log("Creating profile with data:", action.payload);

    const profile = yield call(createJobs, action.payload);
    yield put(createJobSuccess(profile));
  } catch (error: any) {
    yield put(createJobFailure(error.message));
  }
}

// PUT
function* updatejobSaga(action: any): Generator<any, void, any> {
  console.log(action, "saga");

  try {
    const user = yield call(updateJobs, action.payload.id, action.payload);
    yield put(updateJobRequest(user));
  } catch (error: any) {
    yield put(updateJobFailure(error.message));
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
export default function* jobSaga() {
  yield takeEvery(createJobRequest.type, createJobSaga);
  //   yield takeEvery(createUserRequest.type, createUserSaga);
  yield takeEvery(updateJobRequest.type, updatejobSaga);
  //   yield takeEvery(deleteUserRequest.type, deleteUserSaga);
}
