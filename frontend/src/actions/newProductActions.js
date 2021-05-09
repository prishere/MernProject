import axios from "axios";
import {
  NEW_PRODUCT_ADDED_DB_FAIL,
  NEW_PRODUCT_ADDED_DB_REQUEST,
  NEW_PRODUCT_ADDED_DB_SUCCESS,
  NEW_PRODUCT_CREATE_FAIL,
  NEW_PRODUCT_CREATE_REQUEST,
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
  NEW_PRODUCT_LIST_MY_SUCCESS,
  NEW_PRODUCT_LIST_REQUEST,
  NEW_PRODUCT_LIST_SUCCESS,
  NEW_PRODUCT_UPDATE_FAIL,
  NEW_PRODUCT_UPDATE_REQUEST,
  NEW_PRODUCT_UPDATE_SUCCESS,
} from "../constants/newProductConstants";
import { logout } from "../actions/userActions";

export const listNewProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: NEW_PRODUCT_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/newproducts", config);

    dispatch({ type: NEW_PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyNewProducts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: NEW_PRODUCT_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/newproducts/details`, config);

    dispatch({
      type: NEW_PRODUCT_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: NEW_PRODUCT_LIST_MY_FAIL,
      payload: message,
    });
  }
};

export const deleteNewProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NEW_PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/newproducts/${id}`, config);

    dispatch({
      type: NEW_PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: NEW_PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createNewProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: NEW_PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/newproducts`, {}, config);

    dispatch({
      type: NEW_PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: NEW_PRODUCT_CREATE_FAIL,
      payload: message,
    });
  }
};

export const listNewProductDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEW_PRODUCT_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/newproducts/${id}`, config);
    dispatch({ type: NEW_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateNewProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NEW_PRODUCT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/newproducts/${product._id}`,
      product,
      config
    );

    dispatch({
      type: NEW_PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: NEW_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: NEW_PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const updateNewProductToDb = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NEW_PRODUCT_ADDED_DB_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/newproducts/${product._id}`,
      product,
      config
    );

    dispatch({
      type: NEW_PRODUCT_ADDED_DB_SUCCESS,
      payload: data,
    });
    dispatch({ type: NEW_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: NEW_PRODUCT_ADDED_DB_FAIL,
      payload: message,
    });
  }
};
