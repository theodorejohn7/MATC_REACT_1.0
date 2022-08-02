import { PATCH_PRODUCT_UPDATE } from "../action/patchProductAction";

const initialState = {};

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

const patchProductReducer = (
  state = initialState,
  action: { type: string; data?: IPost } = { type: "" }
) => {
  if (action.type === PATCH_PRODUCT_UPDATE) {
    return { ...state, patchProductUpdate: action.data };
  } else {
    return state;
  }
};
export default patchProductReducer;
