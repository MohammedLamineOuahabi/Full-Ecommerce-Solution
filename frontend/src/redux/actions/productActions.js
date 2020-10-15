import Axios from "axios";
import productActionTypes from "../constants/productActionTypes";

const listProducts = (keyword = "", page = "") => async dispatch => {
  try {
    dispatch({ type: productActionTypes.PRODUCT_LIST_REQUEST });

    const { data } = await Axios.get(`/api/v1/products?keyword=${keyword}&page=${page}`);

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

const deleteProduct = id => async (dispatch, getState) => {
  try {
    dispatch({ type: productActionTypes.PRODUCT_DELETE_REQUEST });
    /// we get the user infos
    const {
      userLogin: { userLoggedInfo }
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoggedInfo.token}`
      }
    };
    await Axios.delete(`/api/v1/products/${id}`, config);

    dispatch({ type: productActionTypes.PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: productActionTypes.PRODUCT_DELETE_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: productActionTypes.PRODUCT_CREATE_REQUEST });
    /// we get the user infos
    const {
      userLogin: { userLoggedInfo }
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoggedInfo.token}`
      }
    };
    const data = await Axios.post(`/api/v1/products`, {}, config);
    console.log(data.data);
    dispatch({ type: productActionTypes.PRODUCT_CREATE_SUCCESS, payload: data.data }); ///
  } catch (error) {
    dispatch({
      type: productActionTypes.PRODUCT_CREATE_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

const updateProduct = product => async (dispatch, getState) => {
  try {
    dispatch({ type: productActionTypes.PRODUCT_UPDATE_REQUEST });

    /// we get the user infos
    const {
      userLogin: { userLoggedInfo }
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoggedInfo.token}`
      }
    };

    const { data } = await Axios.put(`/api/v1/products/${product._id}`, product, config);

    dispatch({ type: productActionTypes.PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: productActionTypes.PRODUCT_UPDATE_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const reviewProduct = (id, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: productActionTypes.PRODUCT_REVIEW_REQUEST });

    /// we get the user infos
    const {
      userLogin: { userLoggedInfo }
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoggedInfo.token}`
      }
    };

    await Axios.post(`/api/v1/products/${id}/review`, review, config);

    dispatch({ type: productActionTypes.PRODUCT_REVIEW_SUCCESS });
  } catch (error) {
    dispatch({
      type: productActionTypes.PRODUCT_REVIEW_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

const getTopProducts = () => async dispatch => {
  try {
    dispatch({ type: productActionTypes.PRODUCT_TOP_REQUEST });

    const { data } = await Axios.get(`/api/v1/products/top`);

    dispatch({ type: productActionTypes.PRODUCT_TOP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: productActionTypes.PRODUCT_TOP_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
export {
  listProducts,
  listProductDetails,
  deleteProduct,
  createProduct,
  updateProduct,
  reviewProduct,
  getTopProducts
};
