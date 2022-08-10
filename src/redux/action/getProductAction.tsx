import instance from "../../axios/instance";
import { Dispatch } from "redux";

export const GET_PRODUCT_DATA = "GET_PRODUCT_DATA";
export const GET_ALL_PRODUCT_DATA = "GET_ALL_PRODUCT_DATA";
export const RESET_PRODUCT_DATA = "RESET_PRODUCT_DATA";

export const getProductData = (category: string): any => {
  const API_URL = process.env.REACT_APP_API_URL;

  return async (dispatch: Dispatch) => {
    const apiURL = `${API_URL}api/category/${category}`;
    try {
      const productDataRecords = await instance.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (productDataRecords) {
        dispatch({ type: GET_PRODUCT_DATA, data: productDataRecords });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllProductData = (): any => {
  const API_URL = process.env.REACT_APP_API_URL;

  return async (dispatch: Dispatch) => {
    const apiURL = `${API_URL}api/getall`;
    try {
      const allProductDataRecords = await instance.get(apiURL).then((resp) => {
        if (resp) {
          return resp.data;
        } else {
          return false;
        }
      });
      if (allProductDataRecords) {
        dispatch({ type: GET_ALL_PRODUCT_DATA, data: allProductDataRecords });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetProductData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PRODUCT_DATA });
  };
};
