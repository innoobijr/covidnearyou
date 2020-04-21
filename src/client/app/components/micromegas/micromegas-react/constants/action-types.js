import keyMirror from "keymirror";

export const ACTION_PREFIX = "@@kepler.gl/";
const ActionTypes = keyMirror({
  //visState
  ADD_DATA: null,
  ADD_FILTER: null,
  ADD_LAYER: null,
  INTERACTION_CONFIG_CHANGE: null,
  LAYER_CONFIG_CHANGE: null,
  LAYER_VISUAL_CHANNEL_CHANGE: null,
  LAYER_TYPE_CHANGE: null,
  LAYER_VIS_CONFIG_CHANGE: null,
  LAYER_TEXT_LABEL_CHANGE: null,
  LAYER_HOVER: null,
  LAYER_CLICK: null,
  MAP_CLICK: null,
  MOUSE_MOVE: null,
  REMOVE_FILTER: null,
  REMOVE_LAYER: null,
  REMOVE_DATASET: null,
  REORDER_LAYER: null,
  SET_FILTER: null,
  SHOW_DATASET_TABLE: null,
  UPDATE_LAYER_BLENDING: null,
  UPDATE_VIS_DATA: null,
  TOGGLE_FILTER_ANIMATION: null,
  UPDATE_FILTER_ANIMATION_SPEED: null,
  PLAY_ANIMATION: null,
  UPDATE_ANIMATION_TIME: null,
  UPDATE_ANIMATION_SPEED: null,
  UPDATE_LAYER_ANIMATION_SPEED: null,
  TOGGLE_LAYER_CONFIG_ACTIVE: null,
  ENLARGE_FILTER: null,
  TOGGLE_FILTER_FEATURE: null,
  SET_VISIBLE_LAYERS_FOR_MAP: null,
  TOGGLE_LAYER_FOR_MAP: null,
  SET_FILTER_PLOT: null,
  LOAD_FILES: null,
  LOAD_NEXT_FILE: null,
  LOAD_FILES_ERR: null,
  LOAD_FILES_SUCCESS: null,
  LAYER_COLOR_UI_CHANGE: null,
  TOGGLE_FEATURE_LAYER: null,
  APPLY_CPU_FILTER: null,
  SET_MAP_INFO: null,
  SORT_TABLE_COLUMN: null,
  PIN_TABLE_COLUMN: null,
  COPY_TABLE_COLUMN: null,

  // mapState
  UPDATE_MAP: null,
  FIT_BOUNDS: null,
  TOGGLE_PERSPECTIVE: null,
  TOGGLE_SPLIT_MAP: null,
  TOGGLE_FULLSCREEN: null,
  //OTHER
  REGISTER_ENTRY: null,
  // INIT actions
  INIT: null,
  ADD_DATA_TO_MAP: null,
  RESET_MAP_CONFIG: null,
  RECEIVE_MAP_CONFIG: null,

  //mapStyle
  MAP_CONFIG_CHANGE: null,
  SET_DEFAULT_MAP_STYLE: null,
  MAP_STYLE_CHANGE: null,
  LOAD_MAP_STYLES: null,
  LOAD_MAP_STYLE_ERR: null,
  INPUT_MAP_STYLE: null,
  LOAD_CUSTOM_MAP_STYLE: null,
  ADD_CUSTOM_MAP_STYLE: null,
  REQUEST_MAP_STYLES: null,
  SET_3D_BUILDING_COLOR: null,
});

export const addPrefix = (actions) =>
  Object.keys(actions).reduce(
    (accu, key) => ({
      ...accu,
      [key]: `${ACTION_PREFIX}${actions[key]}`,
    }),
    {}
  );

export default addPrefix(ActionTypes);
