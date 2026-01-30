import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER,
  SIGNOUT_USER_SUCCESS,
  
  //.........................
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,

  USER_LOGIN_CHECK_REQUEST,
  USER_LOGIN_CHECK_SUCCESS,
  USER_LOGIN_CHECK_FAILURE,

  //.......................

} from "../../constants/ActionTypes";


export const userSignIn = (user) => {
  return {
    type: SIGNIN_USER,
    payload: user
  };
};
export const userSignOut = () => {
  return {
    type: SIGNOUT_USER
  };
};

export const userSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: authUser
  }
};
export const userSignOutSuccess = () => {
  return {
    type: SIGNOUT_USER_SUCCESS,
  }
};

export const showAuthMessage = (data) => {

  return {
    type: SHOW_MESSAGE,
    payload: data.data.message
  };
};



export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};


export const showAuthLoader = () => {
  return {
    type: ON_SHOW_LOADER,
  };
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE,
  };
};
export const hideAuthLoader = () => {
  return {
    type: ON_HIDE_LOADER,
  };
};
//.................

export const changePassword = (payload) => ({

  type: CHANGE_PASSWORD_REQUEST,
  payload: payload,
});

export const changePasswordSuccess = () => ({
  type: CHANGE_PASSWORD_SUCCESS,
});

export const changePasswordFailure = (error) => ({
  type: CHANGE_PASSWORD_FAILURE,
  payload: error,
});

//............................


export const userLoginCheck = (payload) => ({
  type: USER_LOGIN_CHECK_REQUEST,
  payload: payload,
});

export const userLoginCheckSuccess = (payload) => ({
  type: USER_LOGIN_CHECK_SUCCESS,
  payload,
});

export const userLoginCheckFailure = (error) => ({
  type: USER_LOGIN_CHECK_FAILURE,
  payload: error,
});
