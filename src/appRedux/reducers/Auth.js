import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,

  USER_LOGIN_CHECK_REQUEST,
  USER_LOGIN_CHECK_SUCCESS,
  USER_LOGIN_CHECK_FAILURE,

} from "../../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  alertMessage: '',
  showMessage: false,
  initURL: '',
  authUser: localStorage.getItem('user_id'),
};


const AuthReducer = (state = INIT_STATE, action) => {
  switch (action.type) {

    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload,
        loginChek: null
      }
    }
    case INIT_URL: {
      return {
        ...state,
        initURL: action.payload
      }
    }
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        authUser: null,
        initURL: '/',
        loader: false
      }
    }

    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false
      }
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        alertMessage: '',
        showMessage: false,
        loader: false
      }
    }
    case ON_SHOW_LOADER: {
      return {
        ...state,
        loader: true
      }
    }
    case ON_HIDE_LOADER: {
      return {
        ...state,
        loader: false
      }
    }
    //..................
    case CHANGE_PASSWORD_REQUEST: {
      return {
        ...state,
        loader: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        loader: false,
        alertMessage: 'Password changed successfully',
        showMessage: true
      };
    }
    case CHANGE_PASSWORD_FAILURE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }

    // LOGIN CHECK

    case USER_LOGIN_CHECK_REQUEST: {
      return {
        ...state,
        loader: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case USER_LOGIN_CHECK_SUCCESS: {
      return {
        ...state,
        loader: false,
        loginChek: action.payload,
        showMessage: true
      };
    }
    case USER_LOGIN_CHECK_FAILURE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload.data,
        showMessage: true
      };
    }

    default:
      return state;
  }
}

export default AuthReducer;
