import Axios from "axios";
import cartActionTypes from "../constants/cartActionTypes";

const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/v1/products/${id}`);

  dispatch({
    type: cartActionTypes.CART_ADD_ITEM,
    payload: {
      id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      inStock: data.inStock,
      qty
    }
  });

  //save cart items to localStorage
  //we get them back in the initial state in store.js
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

const removeFromCart = id => (dispatch, getState) => {
  dispatch({
    type: cartActionTypes.CART_REMOVE_ITEM,
    payload: id
  });

  //overwrite the locale Storage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export { addToCart, removeFromCart };
