import { all } from "@redux-saga/core/effects";
import authSaga from "../features/auth/authSaga";
import profileSaga from "../features/profile/profileSaga";
import jobSaga from "../features/jobPosts/jobSaga";
// import userSaga from '../features/user/userSaga';
// import { call } from "redux-saga/effects";
export default function* rootSaga() {
  yield all([
    authSaga(),
    profileSaga(),
    jobSaga(),
    // add more sagas here
    ,
  ]);
}
