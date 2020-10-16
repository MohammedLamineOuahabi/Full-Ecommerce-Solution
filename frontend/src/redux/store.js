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
  userLoginState: userLoginReducer,
  userRegisterState: userRegisterReducer,
  userProfileState: userProfileReducer,
  userUpdateState: userUpdateReducer,
  usersListState: userListReducer,
  userDeleteState: userDeleteReducer,

  productListState: productListReducer,
  productDetailsState: productDetailsReducer,
  productDeleteState: productDeleteReducer,
  productCreateState: productCreateReducer,
  productUpdateState: productUpdateReducer,
  productReviewState: productReviewReducer,
  productTopState: productTopReducer,

  cartState: cartReducer,

  orderCreateState: orderCreateReducer,
  orderDetailsState: orderDetailsReducer,
  orderPayState: orderPayReducer,
  orderDeliverState: orderDeliverReducer,
  orderListState: orderListReducer
});

//get cartItem from localStorage
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromLocalStorage = localStorage.getItem("userLoginInfo")
  ? JSON.parse(localStorage.getItem("userLoginInfo"))
  : null;
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null;

const initialState = {
  cartState: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
    paymentMethod: paymentMethodFromLocalStorage
  },
  userLoginState: { userLoginInfo: userInfoFromLocalStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
