import { mongoInstance } from "../../axios/instance";
import { Dispatch } from "redux";

export const DELETE_PRODUCT_DATA = "DELETE_PRODUCT_DATA";

export const deleteProductData = (id: string): any => {
  const API_URL = process.env.REACT_APP_API_URL;

  return async (dispatch: Dispatch) => {
    const apiURL = `${API_URL}api/delete/${id}`;

    try {
      const deleteProductRecords = await mongoInstance.delete(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (deleteProductRecords) {
        dispatch({ type: DELETE_PRODUCT_DATA, data: deleteProductRecords });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
