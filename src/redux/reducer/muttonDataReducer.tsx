import { GET_MUTTON_DATA, RESET_MUTTON_DATA, EDIT_MUTTON_DATA } from "../action/MuttonAction";

const initialState = {};

const muttonDataReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_MUTTON_DATA:
      return { ...state, getMuttonData: action.data };
      case EDIT_MUTTON_DATA :
        return { ...state, getMuttonData: action.data};
    case RESET_MUTTON_DATA:
      return { ...state, getMuttonData: [] };
    default:
      return state;
  }
};

export default muttonDataReducer;
