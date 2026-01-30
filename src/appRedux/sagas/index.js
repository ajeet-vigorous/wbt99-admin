import { all } from "redux-saga/effects";
import authSagas from "./Auth";
import userSagas from "./User";
// import { watchSocket } from "./Socket";


export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    userSagas(),
    // watchSocket(),
  ]);
}
