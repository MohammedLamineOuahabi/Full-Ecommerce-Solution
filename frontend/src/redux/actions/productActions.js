import Axios from "axios";
import productActionTypes from "../constants/productActionTypes";

const listProducts = () => async dispatch => {
  try {
    dispatch({ type: productActionTypes.PRODUCT_LIST_REQUEST });

    const { data } = await Axios.get("/api/v1/products");

    dispatch({ type: productActionTypes.PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: productActionTypes.PRODUCT_LIST_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

const listProductDetails = id => async dispatch => {
  try {
    dispatch({ type: productActionTypes.PRODUCT_DETAILS_REQUEST });

    const { data } = await Axios.get(`/api/v1/products/${id}`);

    dispatch({ type: productActionTypes.PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: productActionTypes.PRODUCT_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
export { listProducts, listProductDetails };
