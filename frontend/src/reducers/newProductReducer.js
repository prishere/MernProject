import {
  NEW_PRODUCT_ADDED_DB_FAIL,
  NEW_PRODUCT_ADDED_DB_REQUEST,
  NEW_PRODUCT_ADDED_DB_RESET,
  NEW_PRODUCT_ADDED_DB_SUCCESS,
  NEW_PRODUCT_CREATE_FAIL,
  NEW_PRODUCT_CREATE_REQUEST,
  NEW_PRODUCT_CREATE_RESET,
  NEW_PRODUCT_CREATE_SUCCESS,
  NEW_PRODUCT_DELETE_FAIL,
  NEW_PRODUCT_DELETE_REQUEST,
  NEW_PRODUCT_DELETE_SUCCESS,
  NEW_PRODUCT_DETAILS_FAIL,
  NEW_PRODUCT_DETAILS_REQUEST,
  NEW_PRODUCT_DETAILS_SUCCESS,
  NEW_PRODUCT_LIST_FAIL,
  NEW_PRODUCT_LIST_MY_FAIL,
  NEW_PRODUCT_LIST_MY_REQUEST,
  NEW_PRODUCT_LIST_MY_RESET,
  NEW_PRODUCT_LIST_MY_SUCCESS,
  NEW_PRODUCT_LIST_REQUEST,
  NEW_PRODUCT_LIST_SUCCESS,
  NEW_PRODUCT_UPDATE_FAIL,
  NEW_PRODUCT_UPDATE_REQUEST,
  NEW_PRODUCT_UPDATE_RESET,
  NEW_PRODUCT_UPDATE_SUCCESS,
} from "../constants/newProductConstants";

const intialState = {
  loading: false,
  newProducts: [],
  error: "",
};

export const newProductListReducer = (state = intialState, action) => {
  switch (action.type) {
    case NEW_PRODUCT_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case NEW_PRODUCT_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        newProducts: action.payload,
      };
    }
    case NEW_PRODUCT_LIST_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const newProductListMyReducer = (state = { myProducts: [] }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case NEW_PRODUCT_LIST_MY_SUCCESS:
      return {
        loading: false,
        myProducts: action.payload,
      };
    case NEW_PRODUCT_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case NEW_PRODUCT_LIST_MY_RESET: {
      return { myProducts: [] };
    }
    default:
      return state;
  }
};

export const newProductDetailsReducer = (
  state = { newProduct: {} },
  action
) => {
  switch (action.type) {
    case NEW_PRODUCT_DETAILS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case NEW_PRODUCT_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        newProduct: action.payload,
      };
    }
    case NEW_PRODUCT_DETAILS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const newProductCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case NEW_PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, newProduct: action.payload };
    case NEW_PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case NEW_PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const newProductDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case NEW_PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case NEW_PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const newProductUpdateReducer = (state = { newProduct: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case NEW_PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, newProduct: action.payload };
    case NEW_PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case NEW_PRODUCT_UPDATE_RESET:
      return { newProduct: {} };
    default:
      return state;
  }
};

export const newProductUpdateDbReducer = (
  state = { newProduct: {} },
  action
) => {
  switch (action.type) {
    case NEW_PRODUCT_ADDED_DB_REQUEST:
      return { loading: true };
    case NEW_PRODUCT_ADDED_DB_SUCCESS:
      return { loading: false, success: true, newProduct: action.payload };
    case NEW_PRODUCT_ADDED_DB_FAIL:
      return { loading: false, error: action.payload };
    case NEW_PRODUCT_ADDED_DB_RESET:
      return { newProduct: {} };
    default:
      return state;
  }
};
