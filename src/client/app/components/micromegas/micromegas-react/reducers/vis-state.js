import ActionTypes from "../constants/action-types";
import { handleActions } from "redux-actions";
import * as visStateUpdaters from "./vis-state-updaters";

const actionHandler = {
  [ActionTypes.SET_MAP_INFO]: visStateUpdaters.setMapInfoUpdater,
  [ActionTypes.ADD_LAYER]: visStateUpdaters.addLayerUpdater,
};
// construct vis-state reducer
export const visStateReducerFactory = (initialState = {}) =>
  handleActions(actionHandler, {
    ...visStateUpdaters.INITIAL_VIS_STATE,
    ...initialState,
    initialState,
  });

export default visStateReducerFactory();
