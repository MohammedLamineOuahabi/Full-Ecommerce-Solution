import productActionTypes from "../constants/productActionTypes.js";

const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case productActionTypes.PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };

    case productActionTypes.PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page
      };

    case productActionTypes.PRODUCT_LIST_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
  switch (action.type) {
    case productActionTypes.PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };

    case productActionTypes.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };

    case productActionTypes.PRODUCT_DETAILS_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
const productDeleteReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case productActionTypes.PRODUCT_DELETE_REQUEST:
      return { loading: true };

    case productActionTypes.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };

    case productActionTypes.PRODUCT_DELETE_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const productCreateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case productActionTypes.PRODUCT_CREATE_REQUEST:
      return { loading: true };

    case productActionTypes.PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case productActionTypes.PRODUCT_CREATE_FAILED:
      return { loading: false, error: action.payload };

    case productActionTypes.PRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};
const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case productActionTypes.PRODUCT_UPDATE_REQUEST:
      return { loading: true };

    case productActionTypes.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case productActionTypes.PRODUCT_UPDATE_FAILED:
      return { loading: false, error: action.payload };

    case productActionTypes.PRODUCT_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};
const productReviewReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case productActionTypes.PRODUCT_UPDATE_REQUEST:
      return { loading: true };

    case productActionTypes.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };

    case productActionTypes.PRODUCT_UPDATE_FAILED:
      return { loading: false, error: action.payload };

    case productActionTypes.PRODUCT_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};
const productTopReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case productActionTypes.PRODUCT_TOP_REQUEST:
      return { loading: true };

    case productActionTypes.PRODUCT_TOP_SUCCESS:
      return { loading: false, success: true, products: action.payload };

    case productActionTypes.PRODUCT_TOP_FAILED:
      return { loading: false, error: action.payload };

    case productActionTypes.PRODUCT_TOP_RESET:
      return [];

    default:
      return state;
  }
};

export {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewReducer,
  productTopReducer
};
