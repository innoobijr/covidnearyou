import { combineReducers } from "redux";

import { visStateReducerFactory } from "./vis-state";
import { mapStyleReducerFactory } from "./map-style";
import { mapStateReducerFactory } from "./map-state";

export const combined = (initialState = {}) =>
  combineReducers({
    visState: visStateReducerFactory(initialState.visState),
    mapState: mapStateReducerFactory(initialState.mapState),
    mapStyle: mapStyleReducerFactory(initialState.mapStyle),
  });
export const coreReducerFactory = (initialState = {}) => (state, action) => {
  return combined(initialState)(state, action);
};

export default coreReducerFactory();

/**
 * Connect subreducer `mapStyle`, used with `injectComponents`. Learn more at
 * [Replace UI Component](../advanced-usages/replace-ui-component.md#pass-custom-component-props)
 *
 * @param {*} reduxState
 * @public
 */
export const mapStyleLens = (reduxState) => ({ mapStyle: reduxState.mapStyle });

/**
 * Connect subreducer `mapState`, used with `injectComponents`. Learn more at
 * [Replace UI Component](../advanced-usages/replace-ui-component.md#pass-custom-component-props)
 *
 * @param {*} reduxState
 * @public
 */
export const mapStateLens = (reduxState) => ({ mapState: reduxState.mapState });

/**
 * Connect subreducer `visState`, used with `injectComponents`. Learn more at
 * [Replace UI Component](../advanced-usages/replace-ui-component.md#pass-custom-component-props)
 *
 * @param {*} reduxState
 * @public
 */
export const visStateLens = (reduxState) => ({ visState: reduxState.visState });
