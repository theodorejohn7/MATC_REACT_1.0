import { createStore, combineReducers, applyMiddleware } from "redux";

import ReduxThunk from "redux-thunk";
import muttonReducer from "./reducer/muttonReducer";
import getProductReducer from "./reducer/getProductReducer";
import patchProductReducer from "./reducer/patchProductReducer";
import deleteProductReducer from "./reducer/deleteProductReducer";

const appReducer = combineReducers({
  muttonReducer: muttonReducer,
  patchProductReducer: patchProductReducer,
  getProductReducer: getProductReducer,
  deleteProductReducer: deleteProductReducer,
});

export const store = createStore(appReducer, applyMiddleware(ReduxThunk));

 