import { handleActions } from "redux-actions";
import ActionTypes from "../constants/action-types";
import * as mapStateUpdaters from "./map-state-updaters";

const actionHandler = {
  [ActionTypes.UPDATE_MAP]: mapStateUpdaters.updateMapUpdater,
  [ActionTypes.FIT_BOUNDS]: mapStateUpdaters.fitBoundsUpdater,
  [ActionTypes.TOGGLE_PERSPECTIVE]: mapStateUpdaters.togglePerspectiveUpdater,
  [ActionTypes.RECEIVE_MAP_CONFIG]: mapStateUpdaters.receiveMapConfigUpdater,
  [ActionTypes.RESET_MAP_CONFIG]: mapStateUpdaters.resetMapConfigUpdater,
  [ActionTypes.TOGGLE_SPLIT_MAP]: mapStateUpdaters.toggleSplitMapUpdater,
};

export const mapStateReducerFactory = (initialState = {}) =>
  handleActions(actionHandler, {
    ...mapStateUpdaters.INITIAL_MAP_STATE,
    ...initialState,
    initialState,
  });

export default mapStateReducerFactory();
