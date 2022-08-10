import {
  GET_PRODUCT_DATA,
  GET_ALL_PRODUCT_DATA,
  RESET_PRODUCT_DATA
} from "../action/getProductAction";

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

const getProductReducer = (
  state = initialState,
  action: { type: string; data?: IPost } = { type: "" }
) => {
  switch (action.type) {
    case GET_PRODUCT_DATA:
      return { ...state, getProductData: action.data };
    case GET_ALL_PRODUCT_DATA:
      return { ...state, getAllProductData: action.data };
    case RESET_PRODUCT_DATA:
      return { ...state, getProductData: [] };
    default:
      return state;
  }
};

export default getProductReducer;
