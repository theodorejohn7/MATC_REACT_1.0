import { DELETE_PRODUCT_DATA } from "../action/deleteProductAction";

const initialState = {};

const deleteProductReducer = (
  state = initialState,
  action: { type: string; data: any } = { type: "", data: "" }
) => {
  if (action.type === DELETE_PRODUCT_DATA) {
    return { ...state, deleteProductData: action.data };
  } else {
    return state;
  }
};

export default deleteProductReducer;
