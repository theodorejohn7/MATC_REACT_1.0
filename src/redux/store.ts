import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";

import ReduxThunk from "redux-thunk";
import muttonDataReducer from "./reducer/muttonDataReducer";
import getProductReducer from "./reducer/getProductReducer";
import patchProductReducer from "./reducer/patchProductReducer";
import deleteProductReducer from "./reducer/deleteProductReducer";

const appReducer = combineReducers({
  muttonDataReducer: muttonDataReducer,
  patchProductReducer: patchProductReducer,
  getProductReducer: getProductReducer,
  deleteProductReducer: deleteProductReducer
});

export const store = createStore(appReducer, applyMiddleware(ReduxThunk));
