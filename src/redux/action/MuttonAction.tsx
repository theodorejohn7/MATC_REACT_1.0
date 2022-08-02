import axios from "axios";
import { Dispatch } from "redux";

const API_URL = process.env.REACT_APP_API_URL;

export const GET_MUTTON_DATA = "GET_MUTTON_DATA";
export const RESET_MUTTON_DATA = "RESET_MUTTON_DATA";
export const EDIT_MUTTON_DATA = "EDIT_MUTTON_DATA";

interface IPost {
  image: string;
  title: string;
  description: string;
  id: string;
  _id: string;
  userId?: number;
  discPrice: number;
  grossWeight: number;
  netWeight: number;
  price: number;
  getItemQuantity: (arg0: number) => number;

  increaseCartQuantity: (arg0: number) => void;
  decreaseCartQuantity: (arg0: number) => void;
  removeFromCart: (arg0: number) => void;
  isLoggedin: boolean;
  setNotLoggedinPopup: () => void;
}

export const getMuttonData = (): any => {
  return async (dispatch: Dispatch) => {
    const apiURL = `${API_URL}api/category/mutton`;

    try {
      const muttonDataRecords = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (muttonDataRecords) {
        dispatch({ type: GET_MUTTON_DATA, data: muttonDataRecords });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const editMuttonData = (data: IPost): any => {
  return async (dispatch: Dispatch) => {
    try {
      const muttonDataRecords = data;
      if (muttonDataRecords) {
        dispatch({ type: EDIT_MUTTON_DATA, data: muttonDataRecords });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetMuttonData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_MUTTON_DATA });
  };
};
