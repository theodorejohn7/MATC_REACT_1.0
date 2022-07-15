import { createStore, combineReducers, applyMiddleware } from "redux";

import ReduxThunk from "redux-thunk";
import testReducer from "./reducer/testReducer";
import patchProductReducer from "./reducer/patchProductReducer";
import getProductReducer from "./reducer/getProductReducer";
import deleteProductReducer from "./reducer/deleteProductReducer";

const appReducer = combineReducers({
  testReducer: testReducer,
  patchProductReducer: patchProductReducer,
  getProductReducer: getProductReducer,
  deleteProductReducer: deleteProductReducer,
});

export const store = createStore(appReducer, applyMiddleware(ReduxThunk));
 