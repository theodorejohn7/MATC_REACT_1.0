import axios from "axios";
import { Dispatch } from "redux";

export const DELETE_PRODUCT_DATA = "DELETE_PRODUCT_DATA";

export const deleteProductData = (id: string): any => {
  return async (dispatch: Dispatch) => {
    const apiURL = `http://localhost:7002/api/delete/${id}`;

    try {
      const deleteProductRecords = await axios
        .delete(apiURL)
        .then((response) => {
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
