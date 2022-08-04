import { mongoInstance } from "../../axios/instance"; 
import { Dispatch } from "redux";

export const PATCH_PRODUCT_UPDATE = "PATCH_PRODUCT_UPDATE";
 

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


export const patchProductUpdate = (id: string, body: IPost): any => {
  const API_URL = process.env.REACT_APP_API_URL;

  return async (dispatch: Dispatch) => {
    const apiURL = `${API_URL}api/update/${id}`;
    try {
      const patchProductUpdateRecord = await mongoInstance
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
