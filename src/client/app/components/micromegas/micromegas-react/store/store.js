import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combined } from "../../../../reducers/core";

export default createStore(combined(), {});
