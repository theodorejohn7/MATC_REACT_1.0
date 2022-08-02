import {
  GET_MUTTON_DATA,
  RESET_MUTTON_DATA,
  EDIT_MUTTON_DATA,
} from "../action/MuttonAction";

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


const muttonDataReducer = (
  state = initialState,
  action: { type: string; data?: IPost } = { type: ""  }
) => {
  switch (action.type) {
    case GET_MUTTON_DATA:
      return { ...state, getMuttonData: action.data };
    case EDIT_MUTTON_DATA:
      return { ...state, getMuttonData: action.data };
    case RESET_MUTTON_DATA:
      return { ...state, getMuttonData: [] };
    default:
      return state;
  }
};

export default muttonDataReducer;
