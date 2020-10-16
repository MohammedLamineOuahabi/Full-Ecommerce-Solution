import Axios from "axios";
import userActionTypes from "../constants/userActionTypes";
import orderActionTypes from "../constants/orderActionTypes";

const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: userActionTypes.USER_LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await Axios.post("/api/v1/users/login", { email, password }, config);
    dispatch({ type: userActionTypes.USER_LOGIN_SUCCESS, payload: data });
    //store user info to localStorage
    localStorage.setItem("userLoginInfo", JSON.stringify(data));
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
    localStorage.setItem("userLoginInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userActionTypes.USER_REGISTER_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

const getUser = id => async (dispatch, getState) => {
  try {
    dispatch({ type: userActionTypes.USER_DETAILS_REQUEST });

    const {
      userLoginState: { userLoginInfo }
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoginInfo.token}`
      }
    };

    const { data } = await Axios.get(`/api/v1/users/${id}`, config);

    dispatch({ type: userActionTypes.USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: userActionTypes.USER_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

const updateUser = user => async (dispatch, getState) => {
  try {
    dispatch({ type: userActionTypes.USER_UPDATE_REQUEST });

    /// we get the user infos
    const {
      userLoginState: { userLoginInfo }
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoginInfo.token}`
      }
    };

    const { data } = await Axios.put(`/api/v1/users/${user._id}`, user, config);

    dispatch({ type: userActionTypes.USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: userActionTypes.USER_UPDATE_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

const getUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userActionTypes.USER_LIST_REQUEST });

    const {
      userLoginState: { userLoginInfo }
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoginInfo.token}`
      }
    };

    const { data } = await Axios.get("/api/v1/users/", config);

    dispatch({ type: userActionTypes.USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: userActionTypes.USER_LIST_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const deleteUser = id => async (dispatch, getState) => {
  try {
    dispatch({ type: userActionTypes.USER_DELETE_REQUEST });

    const {
      userLoginState: { userLoginInfo }
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoginInfo.token}`
      }
    };

    await Axios.delete(`/api/v1/users/${id}`, config);

    dispatch({ type: userActionTypes.USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: userActionTypes.USER_DELETE_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const logout = () => dispatch => {
  localStorage.removeItem("userLoginInfo");
  dispatch({ type: userActionTypes.USER_LOGIN_LOGOUT });
  dispatch({ type: userActionTypes.USER_DETAILS_RESET });
  dispatch({ type: userActionTypes.USER_LIST_RESET });
  dispatch({ type: orderActionTypes.ORDER_LIST_RESET });
};
export { login, logout, register, getUser, updateUser, getUsers, deleteUser };
