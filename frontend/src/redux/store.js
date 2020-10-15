import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewReducer,
  productTopReducer
} from "./reducers/productReducers.js";

import { cartReducer } from "./reducers/cartReducers.js";
import {
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  userUpdateReducer,
  userListReducer,
  userDeleteReducer
} from "./reducers/userReducers.js";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListReducer,
  orderDeliverReducer
} from "./reducers/orderReducers.js";
///
const reducer = combineReducers({
  productListState: productListReducer,
  productDetailsState: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfileState: userProfileReducer,
  userUpdateState: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliverState: orderDeliverReducer,
  orderListState: orderListReducer,
  usersListState: userListReducer,
  userDeleteState: userDeleteReducer,
  productDeleteState: productDeleteReducer,
  productCreateState: productCreateReducer,
  productUpdateState: productUpdateReducer,
  productReviewState: productReviewReducer,
  productTopState: productTopReducer
});

//get cartItem from localStorage
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromLocalStorage = localStorage.getItem("userLoggedInfo")
  ? JSON.parse(localStorage.getItem("userLoggedInfo"))
  : null;
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
    paymentMethod: paymentMethodFromLocalStorage
  },
  userLogin: { userLoggedInfo: userInfoFromLocalStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
