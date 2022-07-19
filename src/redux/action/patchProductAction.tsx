import axios from "axios";
import { Dispatch } from "redux";

export const PATCH_PRODUCT_UPDATE = "PATCH_PRODUCT_UPDATE";

export const patchProductUpdate = (id: string, body: any): any => {
  const API_URL = process.env.REACT_APP_API_URL;

  return async (dispatch: Dispatch) => {
    const apiURL = `${API_URL}api/update/${id}`;
    try {
      const patchProductUpdateRecord = await axios
        .patch(apiURL, body)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (patchProductUpdateRecord) {
        dispatch({
          type: PATCH_PRODUCT_UPDATE,
          data: patchProductUpdateRecord,
        });
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
};
