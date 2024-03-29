import instance from "../../axios/instance";

import { Dispatch } from "redux";

const API_URL = process.env.REACT_APP_API_URL;

export const GET_MUTTON_DATA = "GET_MUTTON_DATA";
export const RESET_MUTTON_DATA = "RESET_MUTTON_DATA";
export const EDIT_MUTTON_DATA = "EDIT_MUTTON_DATA";

export const getMuttonData = (): any => {
  return async (dispatch: Dispatch) => {
    const apiURL = `${API_URL}api/category/mutton`;

    try {
      const muttonDataRecords = await instance.get(apiURL).then((response) => {
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

export const resetMuttonData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_MUTTON_DATA });
  };
};
