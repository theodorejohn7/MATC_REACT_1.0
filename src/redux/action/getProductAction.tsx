import axios from "axios";
import { Dispatch } from "redux";

const API_URL = process.env.REACT_APP_API_URL;
export const GET_PRODUCT_DATA = "GET_PRODUCT_DATA";
export const RESET_PRODUCT_DATA = "RESET_PRODUCT_DATA";

export const getProductData = (category:string): any => {
  return async (dispatch: Dispatch) => {
    const apiURL = ` ${API_URL}api/category/${category}`;
    try {
      const productDataRecords = await axios.get(apiURL).then((response) => {
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

export const resetProductData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PRODUCT_DATA });
  };
};