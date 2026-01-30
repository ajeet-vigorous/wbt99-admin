import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  SIGNIN_USER,
  SIGNOUT_USER,
  CHANGE_PASSWORD_REQUEST,
  USER_LOGIN_CHECK_REQUEST,

} from "../../constants/ActionTypes";
import {
  userLoginCheckFailure,
  userLoginCheckSuccess,
  changePasswordFailure,
  changePasswordSuccess,
  showAuthMessage,
  userSignInSuccess,
  userSignOut,
  userSignOutSuccess
} from "../../appRedux/actions/Auth";
import { apiCall } from "./HTTP";
import { message } from "antd";


const signOutRequest = () => {
  localStorage.removeItem('user_id');
  localStorage.removeItem('UserPriority');
  localStorage.removeItem('token');
};

function* signInUserWithEmailPassword({ payload }) {

  
  try {
    const signInUser = yield call(apiCall, "POST", 'user/login', payload)
    if (signInUser?.data?.data?.userType === 'client') {
      message.error('You Are Not Authorised');
      setTimeout(() => {
        window.location.href = '/signin';
      }, 1000); 
      return;
    }
    if (signInUser.message) {
      yield put(showAuthMessage(signInUser.message));
    }
    else {
      localStorage.setItem('user_id', JSON.stringify(signInUser.data));
      localStorage.setItem('token', JSON.stringify(signInUser.data.token));
      localStorage.setItem('modalopen' , true)
      yield put(userSignInSuccess(JSON.stringify(signInUser.data)));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
    message.error(error.data.message)
  }
}


function* signOut() {
  try {
    const signOutUser = yield call(signOutRequest);
    if (signOutUser === undefined) {
      localStorage.clear()
      localStorage.removeItem('user_id');
      localStorage.removeItem('client-wallet-balance');
      localStorage.removeItem('client-wallet-exposure');
      localStorage.removeItem('notification');
      yield put(userSignOutSuccess(signOutUser));
    }
    else {
      // yield put(showAuthMessage(signOutUser.message));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* changePasswordSaga({ payload }) {
  try {
    const response = yield call(apiCall, "patch", 'user/updateUserPassword', payload)
    if (response.status === 200) {
      yield put(changePasswordSuccess());
      yield put(userSignOut())
    } else {
      yield put(changePasswordFailure(response.data.message));
    }
  } catch (error) {
    yield put(changePasswordFailure(error));
  }
}
// LOGIN CHECK

function* userLoginCheckSaga({ payload }) {
  try {
    const response = yield call(apiCall, "POST", 'user/userLoginCheck', payload)
    if (response.status === 200) {
      yield put(userLoginCheckSuccess(response.data));
    } else {
      yield put(userLoginCheckFailure(response.data.message));
    }
  } catch (error) {
    yield put(userLoginCheckFailure(error));
    message.error(error.data.message)
  }
}


export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}
export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}
export function* watchChangePassword() {
  yield takeEvery(CHANGE_PASSWORD_REQUEST, changePasswordSaga);
}

export function* watchUserLoginCheck() {
  yield takeEvery(USER_LOGIN_CHECK_REQUEST, userLoginCheckSaga);
}



export default function* rootSaga() {
  yield all(
    [
      fork(signInUser),
      fork(signOutUser),
      fork(watchChangePassword),
      fork(watchUserLoginCheck),
    ]
  );
}
