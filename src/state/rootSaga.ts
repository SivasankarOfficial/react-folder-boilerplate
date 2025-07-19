import { all } from "@redux-saga/core/effects";
// import userSaga from '../features/user/userSaga';
// import { call } from "redux-saga/effects";
export default function* rootSaga() {
  yield all([
    // userSaga(),
    // add more sagas here
  ]);
}
