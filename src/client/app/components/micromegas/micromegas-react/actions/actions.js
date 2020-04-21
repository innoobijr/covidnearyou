import ActionTypes from "../constants/action-types";
import { createAction } from "redux-actions";

export const addDataToMap = createAction(
  ActionTypes.ADD_DATA_TO_MAP,
  (data) => data
);

export const resetMapConfig = createAction(ActionTypes.RESET_MAP_CONFIG);
export const receiveMapConfig = createAction(
  ActionTypes.RECEIVE_MAP_CONFIG,
  (config, options) => ({
    config,
    options,
  })
);

export const keplerGlInit = createAction(
  ActionTypes.INIT,
  ({ mapboxApiAccessToken, mapboxApiUrl, mapStylesReplaceDefault } = {}) => ({
    mapboxApiAccessToken,
    mapboxApiUrl,
    mapStylesReplaceDefault,
  })
);

/**
 * This declaration is needed to group actions in docs
 */
/**
 * Main kepler.gl actions, these actions handles loading data and config into kepler.gl reducer. These actions
 * is listened by all subreducers,
 * @public
 */
/* eslint-disable no-unused-vars */
const main = null;
/* eslint-enable no-unused-vars */
