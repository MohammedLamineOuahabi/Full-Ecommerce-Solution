import userActionTypes from "../constants/userActionTypes.js";

const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionTypes.USER_LOGIN_REQUEST:
      return { loading: true };
    case userActionTypes.USER_LOGIN_SUCCESS:
      return { loading: false, userLoggedInfo: action.payload };
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
      return { loading: false, userRegisterInfo: action.payload };
    case userActionTypes.USER_REGISTER_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionTypes.USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case userActionTypes.USER_DETAILS_SUCCESS:
      return { loading: false, userProfileInfo: action.payload };
    case userActionTypes.USER_DETAILS_FAILED:
      return { loading: false, error: action.payload };
    case userActionTypes.USER_DETAILS_RESET:
      return { userProfileInfo: {} };
    default:
      return state;
  }
};

const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionTypes.USER_UPDATE_REQUEST:
      return { loading: true };
    case userActionTypes.USER_UPDATE_SUCCESS:
      return { loading: false, success: true, userUpdatedInfo: action.payload };
    case userActionTypes.USER_UPDATE_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export { userLoginReducer, userRegisterReducer, userProfileReducer, userUpdateReducer };
