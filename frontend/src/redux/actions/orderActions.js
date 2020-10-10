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
    console.log("orderId", orderId);
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

export { addOrder, getOrder };
