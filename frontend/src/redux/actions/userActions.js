import Axios from "axios";
import userActionTypes from "../constants/userActionTypes";

const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: userActionTypes.USER_LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await Axios.post("/api/v1/users/login", { email, password }, config);
    dispatch({ type: userActionTypes.USER_LOGIN_SUCCESS, payload: data });
    //store user info to localStorage
    localStorage.setItem("userInfo", JSON.stringify(data));
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
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userActionTypes.USER_REGISTER_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const logout = () => dispatch => {
  localStorage.removeItem("userInfo");
  dispatch({ type: userActionTypes.USER_LOGIN_LOGOUT });
  // dispatch({ type: USER_DETAILS_RESET })
  // dispatch({ type: ORDER_LIST_MY_RESET })
};
export { login, logout, register };
