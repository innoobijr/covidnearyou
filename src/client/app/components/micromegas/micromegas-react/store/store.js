import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combined } from "../reducers/core";

/* eslint-disable no-underscore-dangle */
export default createStore(
  combined(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */
