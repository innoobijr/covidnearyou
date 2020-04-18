import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import keplerGlReducer from "kepler.gl/reducers";
import { enhanceReduxMiddleware } from "kepler.gl/middleware";
import mapReducer from "./map-reducer";

const reducers = combineReducers({
  keplerGl: keplerGlReducer,
  app: mapReducer,
});

const middlewares = enhanceReduxMiddleware([]);
const enhancers = [applyMiddleware(...middlewares)];

export default createStore(reducers, {}, compose(...enhancers));
