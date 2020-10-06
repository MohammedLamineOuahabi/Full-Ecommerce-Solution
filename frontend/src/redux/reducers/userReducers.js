import userActionTypes from "../constants/userActionTypes.js";

const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionTypes.USER_LOGIN_REQUEST:
      return { loading: true };
    case userActionTypes.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case userActionTypes.USER_LOGIN_FAILED:
      return { loading: false, error: action.payload };
    case userActionTypes.USER_LOGIN_LOGOUT:
      return {};

    default:
      return state;
  }
};

const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionTypes.USER_REGISTER_REQUEST:
      return { loading: true };
    case userActionTypes.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case userActionTypes.USER_REGISTER_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { userLoginReducer, userRegisterReducer };
