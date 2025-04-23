import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SAVE_PROFILE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  user: {},
  isLoggedIn: false,
  token: "",
  successMsg: "",
  errorMsg: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...initialState,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        isLoggedIn: true,
        token: action.payload.token,
        successMsg: action.payload.msg || "Login successful",
        errorMsg: "",
      };

    case LOGIN_FAILURE:
      return {
        ...initialState,
        errorMsg: action.payload.msg || "Login failed",
      };

    case LOGOUT:
      return {
        ...initialState,
      };

    case SAVE_PROFILE:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
        loading: false,
        errorMsg: "",
      };

    default:
      return state;
  }
};

export default authReducer;
