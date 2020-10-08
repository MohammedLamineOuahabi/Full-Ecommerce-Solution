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

export { addOrder };
