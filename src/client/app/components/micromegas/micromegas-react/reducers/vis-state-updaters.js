import { console as Console } from "global/window";
import { cloneDeep, uniq, get, xor } from "lodash";
import {
  loadFilesErr,
  loadNextFile,
  loadFileSuccess,
} from "../actions/vis-state-actions";

import { Layer, LayerClasses } from "../layers";
import { DEFAULT_TEXT_LABEL } from "../layers/layer-factory";

export const INITIAL_VIS_STATE = {
  // map info
  mapInfo: {
    title: "",
    description: "",
  },
  // layers
  layers: [],
  layerData: [],
  layerToBeMerged: [],
  layerOrder: [],
  layerBlending: "normal",
  hoverInfo: undefined,
  clicked: undefined,
  mousePos: {},
  layerClasses: LayerClasses,
};

function updateStateWithLayerAndData(state, { layerData, layer, idx }) {
  return {
    ...state,
    layers: state.layers.map((lyr, i) => (i === idx ? layer : lyr)),
    layerData: layerData
      ? state.layerData.map((d, i) => (i === idx ? layerData : d))
      : state.layerData,
  };
}

/**
 * User input to update the info of the map
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Object} action.info {title: 'hello'}
 * @returns {Object} nextState
 * @public
 */
export const setMapInfoUpdater = (state, action) => ({
  ...state,
  mapInfo: {
    ...state.mapInfo,
    ...action.info,
  },
});

export const addLayerUpdater = (state, action) => {
  const defaultDataset = Object.keys(state.datasets)[0];
  const newLayer = new Layer({
    isVisible: true,
    isConfigActive: true,
    dataId: defaultDataset,
    ...action.props,
  });

  return {
    ...state,
    layers: [...state.layers, newLayer],
    layerData: [...state.layerData, {}],
    layerOrder: [...state.layerOrder, state.layerOrder.length],
  };
};
