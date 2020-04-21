import geoViewport from "@mapbox/geo-viewport";

/* eslint-disable no-unused-vars */
const mapStateUpdaters = null;
/* eslint-enable no-unused-vars */

/**
 * Default initial `mapState`
 * @memberof mapStateUpdaters
 * @constant
 * @property {number} pitch Default: `0`
 * @property {number} bearing Default: `0`
 * @property {number} latitude Default: `37.75043`
 * @property {number} longitude Default: `-122.34679`
 * @property {number} zoom Default: `9`
 * @property {boolean} dragRotate Default: `false`
 * @property {number} width Default: `800`
 * @property {number} height Default: `800`
 * @property {boolean} isSplit Default: `false`
 * @public
 */
export const INITIAL_MAP_STATE = {
  pitch: 0,
  bearing: 0,
  latitude: 37.75043,
  longitude: -122.34679,
  zoom: 9,
  dragRotate: false,
  width: 800,
  height: 800,
  isSplit: false,
};

/* Updates */
/**
 * Update map viewport
 * @memberof mapStateUpdaters
 * @param {Object} state
 * @param {Object} action
 * @param {Object} action.payload - viewport
 * @returns {Object} nextState
 * @public
 */
export const updateMapUpdater = (state, action) => ({
  ...state,
  ...(action.payload || {}),
});

/**
 * Fit map viewport to bounds
 * @memberof mapStateUpdaters
 * @param {Object} state
 * @param {Object} action
 * @param {number[]} action.payload - bounds as `[lngMin, latMin, lngMax, latMax]`
 * @returns {Object} nextState
 * @public
 */
export const fitBoundsUpdater = (state, action) => {
  const bounds = action.payload;
  const { center, zoom } = geoViewport.viewport(bounds, [
    state.width,
    state.height,
  ]);
  return {
    ...state,
    latitude: center[1],
    longitude: center[0],
    zoom,
  };
};

/**
 * Toggle between 3d and 2d map
 * @memberof mapStateUpdaters
 * @param {Object} state
 * @returns {Object} nextState
 * @public
 */
export const togglePerspectiveUpdater = (state) => ({
  ...state,
  ...{
    pitch: state.dragRotate ? 0 : 50,
    bearing: state.dragRotate ? 0 : 24,
  },
  dragRotate: !state.dragRotate,
});

/**
 * reset mapState to initial State
 * @memberof mapStateUpdaters
 * @param {Object} state `mapState`
 * @returns {Object} nextState
 * @public
 */
export const resetMapConfigUpdater = (state) => ({
  ...INITIAL_MAP_STATE,
  ...state.initialState,
  initialState: state.initialState,
});

// consider case where you have a split map and user wants to reset
/**
 * Update `mapState` to propagate a new config
 * @memberof mapStateUpdaters
 * @param {Object} state
 * @param {Object} action
 * @param {Object} action.payload - saved map config
 * @returns {Object} nextState
 * @public
 */
export const receiveMapConfigUpdater = (
  state,
  { payload: { config = {}, options = {}, bounds = null } }
) => {
  const { mapState } = config || {};

  // merged received mapstate with previous state
  let mergedState = { ...state, ...mapState };

  // if center map
  // center map will override mapState config
  if (options.centerMap && bounds) {
    mergedState = fitBoundsUpdater(mergedState, {
      payload: bounds,
    });
  }

  return {
    ...mergedState,
    // update width if `isSplit` has changed
    ...getMapDimForSplitMap(mergedState.isSplit, state),
  };
};

/**
 * Toggle between one or split maps
 * @memberof mapStateUpdaters
 * @param {Object} state
 * @returns {Object} nextState
 * @public
 */
export const toggleSplitMapUpdater = (state) => ({
  ...state,
  isSplit: !state.isSplit,
  ...getMapDimForSplitMap(!state.isSplit, state),
});

// Helpers
export function getMapDimForSplitMap(isSplit, state) {
  // cases:
  // 1. state split: true - isSplit: true
  // do nothing
  // 2. state split: false - isSplit: false
  // do nothing
  if (state.isSplit === isSplit) {
    return {};
  }

  const width =
    state.isSplit && !isSplit
      ? // 3. state split: true - isSplit: false
        // double width
        state.width * 2
      : // 4. state split: false - isSplit: true
        // split width
        state.width / 2;

  return {
    width,
  };
}
