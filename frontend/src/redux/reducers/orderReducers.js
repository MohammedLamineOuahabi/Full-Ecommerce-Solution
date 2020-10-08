import orderActionTypes from "../constants/orderActionTypes.js";

const orderCreateReducer = (state = { orderItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case orderActionTypes.ORDER_CREATE_REQUEST:
      return { loading: true };
    case orderActionTypes.ORDER_CREATE_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case orderActionTypes.ORDER_CREATE_FAILED:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
export { orderCreateReducer };
