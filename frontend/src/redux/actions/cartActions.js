import Axios from "axios";
import cartActionTypes from "../constants/cartActionTypes";

const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/v1/products/${id}`);

  dispatch({
    type: cartActionTypes.CART_ADD_ITEM,
    payload: {
      productId: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      inStock: data.inStock,
      qty
    }
  });

  //save cart items to localStorage
  //we get them back in the initial state in store.js
  localStorage.setItem("cartItems", JSON.stringify(getState().cartState.cartItems));
};

const removeFromCart = id => (dispatch, getState) => {
  dispatch({
    type: cartActionTypes.CART_REMOVE_ITEM,
    payload: id
  });

  //overwrite the locale Storage
  localStorage.setItem("cartItems", JSON.stringify(getState().cartState.cartItems));
};

const saveShippingAddress = data => dispatch => {
  dispatch({
    type: cartActionTypes.CART_SAVE_SHIPPING_ADDRESS,
    payload: data
  });

  //overwrite the locale Storage
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
const savePaymentMethod = data => dispatch => {
  dispatch({
    type: cartActionTypes.CART_SAVE_PAYMENT_METHOD,
    payload: data
  });

  //overwrite the locale Storage
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod };
