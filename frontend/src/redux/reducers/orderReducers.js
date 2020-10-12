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

const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case orderActionTypes.ORDER_PAY_REQUEST:
      return { loading: true };
    case orderActionTypes.ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case orderActionTypes.ORDER_PAY_FAILED:
      return { loading: false, error: action.payload };
    case orderActionTypes.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};
const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderActionTypes.ORDER_LIST_REQUEST:
      return { loadingMyOrders: true };
    case orderActionTypes.ORDER_LIST_SUCCESS:
      return { loadingMyOrders: false, orders: action.payload };
    case orderActionTypes.ORDER_LIST_FAILED:
      return { loadingMyOrders: false, errorMyOrders: action.payload };
    case orderActionTypes.ORDER_LIST_RESET:
      return { orders: [] };

    default:
      return state;
  }
};
export { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListReducer };
