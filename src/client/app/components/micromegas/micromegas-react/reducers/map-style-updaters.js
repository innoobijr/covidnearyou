import {
  DEFAULT_MAP_STYLES,
  DEFAULT_LAYER_GROUPS,
  DEFAULT_MAPBOX_API_URL,
} from "../constants/default-settings";

import { rgb } from "d3-color";

const DEFAULT_BLDG_COLOR = "#D1CEC7";

const getDefaultState = () => {
  const visibleLayerGroups = {};
  const styleType = "dark";
  const topLayerGroups = {};

  return {
    styleType,
    visibleLayerGroups,
    topLayerGroups,
    mapStyles: DEFAULT_MAP_STYLES.reduce(
      (accu, curr) => ({
        ...accu,
        [curr.id]: curr,
      }),
      {}
    ),
    //save access token
    mapboxApiAccessToken: null,
    mapboxApiUrl: DEFAULT_MAPBOX_API_URL,
    mapStylesReplaceDefault: false,
    inputStyle: getInitialInputStyle(),
  };
};

const mapStyleUpdaters = null;

export const INITIAL_MAP_STYLE = getDefaultState();

/**
 * Return the initial input style
 * @return Object
 */
export function getInitialInputStyle() {
  return {
    accessToken: null,
    error: false,
    isValid: false,
    label: null,
    style: null,
    url: null,
    icon: null,
    custom: true,
  };
}
