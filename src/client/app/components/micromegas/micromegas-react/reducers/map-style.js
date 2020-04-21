import { handleActions } from "redux-actions";
import ActionTypes from "../constants/action-types";
import * as mapStyleUpdaters from "./map-style-updaters";

const actionHandler = {};

export const mapStyleReducerFactory = (initialState = {}) =>
  handleActions(actionHandler, {
    ...mapStyleUpdaters.INITIAL_MAP_STYLE,
    ...initialState,
    initialState,
  });

export default mapStyleReducerFactory();
