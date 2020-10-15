import Axios from "axios";
import orderActionTypes from "../constants/orderActionTypes";

const addOrder = order => async (dispatch, getState) => {
  try {
    //send order creation request
    dispatch({ type: orderActionTypes.ORDER_CREATE_REQUEST });

    const {
      userLogin: { userLoggedInfo }
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoggedInfo.token}`
      }
    };
    console.log("order", order);
    //send data to the API
    const { data } = await Axios.post(`/api/v1/orders/`, order, config);

    //success
    dispatch({
      type: orderActionTypes.ORDER_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.ORDER_CREATE_FAILED,
      ///
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const getOrder = orderId => async (dispatch, getState) => {
  try {
    //send order creation request
    dispatch({ type: orderActionTypes.ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userLoggedInfo }
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoggedInfo.token}`
      }
    };
    //send data to the API
    const { data } = await Axios.get(`/api/v1/orders/${orderId}`, config);

    //success
    dispatch({
      type: orderActionTypes.ORDER_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.ORDER_DETAILS_FAILED,
      ///
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    //send request
    dispatch({ type: orderActionTypes.ORDER_PAY_REQUEST });

    const {
      userLogin: { userLoggedInfo }
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoggedInfo.token}`
      }
    };
    //console.log("orderId", orderId);
    //send data to the API
    const { data } = await Axios.put(`/api/v1/orders/${orderId}/pay`, paymentResult, config);

    //success
    dispatch({
      type: orderActionTypes.ORDER_PAY_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.ORDER_PAY_FAILED,
      ///
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const deliverOrder = orderId => async (dispatch, getState) => {
  try {
    //send request
    dispatch({ type: orderActionTypes.ORDER_DELIVERED_REQUEST });

    const {
      userLogin: { userLoggedInfo }
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoggedInfo.token}`
      }
    };

    //send data to the API
    const { data } = await Axios.put(`/api/v1/orders/${orderId}/delivered`, {}, config);

    //success
    dispatch({
      type: orderActionTypes.ORDER_DELIVERED_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.ORDER_DELIVERED_FAILED,
      ///
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const myOrders = () => async (dispatch, getState) => {
  try {
    //send request
    dispatch({ type: orderActionTypes.ORDER_LIST_RESET });
    //send request
    dispatch({ type: orderActionTypes.ORDER_LIST_REQUEST });

    const {
      userLogin: { userLoggedInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userLoggedInfo.token}`
      }
    };
    //console.log("orderId", orderId);
    //send data to the API
    const { data } = await Axios.get(`/api/v1/orders/myorders`, config);
    console.log(data);
    //success
    dispatch({
      type: orderActionTypes.ORDER_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.ORDER_LIST_FAILED,
      ///
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const getOrders = () => async (dispatch, getState) => {
  try {
    //send request
    dispatch({ type: orderActionTypes.ORDER_LIST_RESET });
    //send request
    dispatch({ type: orderActionTypes.ORDER_LIST_REQUEST });

    const {
      userLogin: { userLoggedInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userLoggedInfo.token}`
      }
    };
    //console.log("orderId", orderId);
    //send data to the API
    const { data } = await Axios.get(`/api/v1/orders/`, config);
    console.log("in get orders action");
    //success
    dispatch({
      type: orderActionTypes.ORDER_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.ORDER_LIST_FAILED,
      ///
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export { addOrder, getOrder, payOrder, myOrders, getOrders, deliverOrder };
