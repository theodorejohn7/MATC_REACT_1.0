import axios from "axios";
import { Dispatch } from "redux";
 

export const PATCH_PRODUCT_UPDATE = "PATCH_PRODUCT_UPDATE";

export const patchProductUpdate = (id: string, body: any) : any=> {
  console.log("@$# inside patch product update action");

  return async (dispatch:Dispatch) => {
    console.log("@$# 16 product action in "); 

    const apiURL = `http://localhost:7002/api/update/${id}`;
    try {
      const patchProductUpdateRecord = await axios.patch(apiURL,body ).then((response) => {
          if (response) {
            console.log("@$# 18",response.data)
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
      console.log("@$# ERROR", error);
    }
  };
};