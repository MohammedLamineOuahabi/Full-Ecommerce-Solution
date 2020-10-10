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

const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} }, ///
  action
) => {
  switch (action.type) {
    case orderActionTypes.ORDER_DETAILS_REQUEST:
      return { loading: true };
    case orderActionTypes.ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case orderActionTypes.ORDER_DETAILS_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export { orderCreateReducer, orderDetailsReducer };
