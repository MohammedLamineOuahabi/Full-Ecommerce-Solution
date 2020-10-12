import Axios from "axios";
import userActionTypes from "../constants/userActionTypes";

const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: userActionTypes.USER_LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await Axios.post("/api/v1/users/login", { email, password }, config);
    dispatch({ type: userActionTypes.USER_LOGIN_SUCCESS, payload: data });
    //store user info to localStorage
    localStorage.setItem("userLoggedInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userActionTypes.USER_LOGIN_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

const register = (username, email, password) => async dispatch => {
  try {
    dispatch({ type: userActionTypes.USER_REGISTER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await Axios.post("/api/v1/users/", { username, email, password }, config);
    dispatch({ type: userActionTypes.USER_REGISTER_SUCCESS, payload: data });
    //login the new user
    dispatch({ type: userActionTypes.USER_LOGIN_SUCCESS, payload: data });
    //store user info to localStorage
    localStorage.setItem("userLoggedInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userActionTypes.USER_REGISTER_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userActionTypes.USER_DETAILS_REQUEST });

    const {
      userLogin: { userLoggedInfo }
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoggedInfo.token}`
      }
    };

    const { data } = await Axios.get("/api/v1/users/profile", config);

    dispatch({ type: userActionTypes.USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: userActionTypes.USER_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

const updateUserProfile = user => async (dispatch, getState) => {
  try {
    dispatch({ type: userActionTypes.USER_UPDATE_REQUEST });

    /// we get the user infos
    const {
      userLogin: { userLoggedInfo }
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoggedInfo.token}`
      }
    };

    const { data } = await Axios.put("/api/v1/users/profile", user, config);

    dispatch({ type: userActionTypes.USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: userActionTypes.USER_UPDATE_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const logout = () => dispatch => {
  localStorage.removeItem("userLoggedInfo");
  dispatch({ type: userActionTypes.USER_LOGIN_LOGOUT });
  dispatch({ type: userActionTypes.USER_DETAILS_RESET });
  dispatch({ type: userActionTypes.ORDER_LIST_RESET });
};
export { login, logout, register, getUserProfile, updateUserProfile };
