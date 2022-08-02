import { DELETE_PRODUCT_DATA } from "../action/deleteProductAction";

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


const deleteProductReducer = (
  state = initialState,
  action: { type: string; data?: IPost } = { type: ""  }
) => {
  if (action.type === DELETE_PRODUCT_DATA) {
    return { ...state, deleteProductData: action.data };
  } else {
    return state;
  }
};

export default deleteProductReducer;
