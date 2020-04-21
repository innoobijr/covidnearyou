import keyMirror from "keymirror";

import {
  scaleLinear,
  scaleQuantize,
  scaleQuantile,
  scaleOrdinal,
  scaleSqrt,
  scaleLog,
  scalePoint,
} from "d3-scale";

export const CLOUDFRONT = "https://d1a3f4spazzrp4.cloudfront.net/kepler.gl";
export const ICON_PREFIX = `${CLOUDFRONT}/geodude`;
export const DEFAULT_MAPBOX_API_URL = "https://api.mapbox.com";

export const MICROMEGAS_GL_NAME = "micromegas.gl";
export const MICROMEGAS_GL_VERSION = "__PACKAGE_VERSION__";
export const DIMENSIONS = {
  sidePanel: {
    width: 300,
    margin: { top: 20, left: 20, bottom: 30, right: 20 },
    headerHeight: 96,
  },
  mapControl: {
    width: 204,
    padding: 12,
  },
};

export const CHANNEL_SCALES = keyMirror({
  color: null,
  radius: null,
  size: null,
  colorAggr: null,
  sizeAggr: null,
});

export const DEFAULT_LAYER_GROUPS = [
  {
    slug: "label",
    filter: ({ id }) => id.match(/(?=(label|place-|poi-))/),
    defaultVisibility: true,
  },
  {
    slug: "road",
    filter: ({ id }) =>
      id.match(/(?=(road|railway|tunnel|street|bridge))(?!.*label)/),
    defaultVisibility: true,
  },
  {
    slug: "border",
    filter: ({ id }) => id.match(/border|boundaries/),
    defaultVisibility: false,
  },
  {
    slug: "building",
    filter: ({ id }) => id.match(/building/),
    defaultVisibility: true,
  },
  {
    slug: "water",
    filter: ({ id }) => id.match(/(?=(water|stream|ferry))/),
    defaultVisibility: true,
  },
  {
    slug: "land",
    filter: ({ id }) =>
      id.match(/(?=(parks|landcover|industrial|sand|hillshade))/),
    defaultVisibility: true,
  },
  {
    slug: "3d building",
    filter: () => false,
    defaultVisibility: false,
  },
];

export const DEFAULT_MAP_STYLES = [
  {
    id: "dark",
    label: "Dark",
    url: "mapbox://styles/uberdata/cjoqbbf6l9k302sl96tyvka09",
    icon: `${ICON_PREFIX}/UBER_DARK_V2.png`,
    layerGroups: DEFAULT_LAYER_GROUPS,
  },
  {
    id: "light",
    label: "Light",
    url: "mapbox://styles/uberdata/cjoqb9j339k1f2sl9t5ic5bn4",
    icon: `${ICON_PREFIX}/UBER_LIGHT_V2.png`,
    layerGroups: DEFAULT_LAYER_GROUPS,
  },
  {
    id: "muted",
    label: "Muted Light",
    url: "mapbox://styles/uberdata/cjfyl03kp1tul2smf5v2tbdd4",
    icon: `${ICON_PREFIX}/UBER_MUTED_LIGHT.png`,
    layerGroups: DEFAULT_LAYER_GROUPS,
  },
  {
    id: "muted_night",
    label: "Muted Night",
    url: "mapbox://styles/uberdata/cjfxhlikmaj1b2soyzevnywgs",
    icon: `${ICON_PREFIX}/UBER_MUTED_NIGHT.png`,
    layerGroups: DEFAULT_LAYER_GROUPS,
  },
  {
    id: "satellite",
    label: "Satellite",
    url: `mapbox://styles/mapbox/satellite-v9`,
    icon: `${ICON_PREFIX}/UBER_SATELLITE.png`,
  },
];

export const AGGREGATION_TYPES = {
  // default
  count: "count",
  // linear
  average: "average",
  maximum: "maximum",
  minimum: "minimum",
  median: "median",
  stdev: "stdev",
  sum: "sum",
  variance: "variance",
  // ordinal
  mode: "mode",
  countUnique: "count unique",
};

export const notSupportedScaleOpts = {
  [CHANNEL_SCALES.color]: [],
  [CHANNEL_SCALES.radius]: [],
  [CHANNEL_SCALES.size]: [],
};

export const notSupportAggrOpts = {
  [CHANNEL_SCALES.colorAggr]: {},
  [CHANNEL_SCALES.sizeAggr]: {},
};

export const ALL_FIELD_TYPES = keyMirror({
  boolean: null,
  date: null,
  geojson: null,
  integer: null,
  real: null,
  string: null,
  timestamp: null,
  point: null,
});

export const NO_VALUE_COLOR = [0, 0, 0, 0];

export const SCALE_TYPES = keyMirror({
  ordinal: null,
  quantile: null,
  quantize: null,
  linear: null,
  sqrt: null,
  log: null,

  // ordinal domain to linear range
  point: null,
});

export const linearFieldScaleFunctions = {
  [CHANNEL_SCALES.color]: [SCALE_TYPES.quantize, SCALE_TYPES.quantile],
  [CHANNEL_SCALES.radius]: [SCALE_TYPES.sqrt],
  [CHANNEL_SCALES.size]: [
    SCALE_TYPES.linear,
    SCALE_TYPES.sqrt,
    SCALE_TYPES.log,
  ],
};

export const linearFieldAggrScaleFunctions = {
  [CHANNEL_SCALES.colorAggr]: {
    [AGGREGATION_TYPES.average]: [SCALE_TYPES.quantize, SCALE_TYPES.quantile],
    [AGGREGATION_TYPES.maximum]: [SCALE_TYPES.quantize, SCALE_TYPES.quantile],
    [AGGREGATION_TYPES.minimum]: [SCALE_TYPES.quantize, SCALE_TYPES.quantile],
    [AGGREGATION_TYPES.median]: [SCALE_TYPES.quantize, SCALE_TYPES.quantile],
    [AGGREGATION_TYPES.stdev]: [SCALE_TYPES.quantize, SCALE_TYPES.quantile],
    [AGGREGATION_TYPES.sum]: [SCALE_TYPES.quantize, SCALE_TYPES.quantile],
    [AGGREGATION_TYPES.variance]: [SCALE_TYPES.quantize, SCALE_TYPES.quantile],
  },

  [CHANNEL_SCALES.sizeAggr]: {
    [AGGREGATION_TYPES.average]: [
      SCALE_TYPES.linear,
      SCALE_TYPES.sqrt,
      SCALE_TYPES.log,
    ],
    [AGGREGATION_TYPES.maximum]: [
      SCALE_TYPES.linear,
      SCALE_TYPES.sqrt,
      SCALE_TYPES.log,
    ],
    [AGGREGATION_TYPES.minimum]: [
      SCALE_TYPES.linear,
      SCALE_TYPES.sqrt,
      SCALE_TYPES.log,
    ],
    [AGGREGATION_TYPES.median]: [
      SCALE_TYPES.linear,
      SCALE_TYPES.sqrt,
      SCALE_TYPES.log,
    ],
    [AGGREGATION_TYPES.stdev]: [
      SCALE_TYPES.linear,
      SCALE_TYPES.sqrt,
      SCALE_TYPES.log,
    ],
    [AGGREGATION_TYPES.sum]: [
      SCALE_TYPES.linear,
      SCALE_TYPES.sqrt,
      SCALE_TYPES.log,
    ],
    [AGGREGATION_TYPES.variance]: [
      SCALE_TYPES.linear,
      SCALE_TYPES.sqrt,
      SCALE_TYPES.log,
    ],
  },
};

export const ordinalFieldScaleFunctions = {
  [CHANNEL_SCALES.color]: [SCALE_TYPES.ordinal],
  [CHANNEL_SCALES.radius]: [SCALE_TYPES.point],
  [CHANNEL_SCALES.size]: [SCALE_TYPES.point],
};

export const ordinalFieldAggrScaleFunctions = {
  // [CHANNEL_SCALES.colorAggr]: [SCALE_TYPES.ordinal, SCALE_TYPES.linear],
  [CHANNEL_SCALES.colorAggr]: {
    [AGGREGATION_TYPES.mode]: [SCALE_TYPES.ordinal],
    [AGGREGATION_TYPES.countUnique]: [
      SCALE_TYPES.quantize,
      SCALE_TYPES.quantile,
    ],
  },

  // Currently doesn't support yet
  [CHANNEL_SCALES.sizeAggr]: {},
};

export const FIELD_OPTS = {
  string: {
    type: "categorical",
    scale: {
      ...ordinalFieldScaleFunctions,
      ...ordinalFieldAggrScaleFunctions,
    },
    format: {
      legend: (d) => d,
    },
  },
  real: {
    type: "numerical",
    scale: {
      ...linearFieldScaleFunctions,
      ...linearFieldAggrScaleFunctions,
    },
    format: {
      legend: (d) => d,
    },
  },
  timestamp: {
    type: "time",
    scale: {
      ...linearFieldScaleFunctions,
      ...notSupportAggrOpts,
    },
    format: {
      legend: (d) => d,
    },
  },
  integer: {
    type: "numerical",
    scale: {
      ...linearFieldScaleFunctions,
      ...linearFieldAggrScaleFunctions,
    },
    format: {
      legend: (d) => d,
    },
  },
  boolean: {
    type: "boolean",
    scale: {
      ...ordinalFieldScaleFunctions,
      ...ordinalFieldAggrScaleFunctions,
    },
    format: {
      legend: (d) => d,
    },
  },
  date: {
    scale: {
      ...ordinalFieldScaleFunctions,
      ...ordinalFieldAggrScaleFunctions,
    },
    format: {
      legend: (d) => d,
    },
  },
  geojson: {
    type: "geometry",
    scale: {
      ...notSupportedScaleOpts,
      ...notSupportAggrOpts,
    },
    format: {
      legend: (d) => "...",
    },
  },
};

export const CHANNEL_SCALE_SUPPORTED_FIELDS = Object.keys(
  CHANNEL_SCALES
).reduce(
  (accu, key) => ({
    ...accu,
    [key]: Object.keys(FIELD_OPTS).filter(
      (ft) => Object.keys(FIELD_OPTS[ft].scale[key]).length
    ),
  }),
  {}
);

export const SCALE_FUNC = {
  [SCALE_TYPES.linear]: scaleLinear,
  [SCALE_TYPES.quantize]: scaleQuantize,
  [SCALE_TYPES.quantile]: scaleQuantile,
  [SCALE_TYPES.ordinal]: scaleOrdinal,
  [SCALE_TYPES.sqrt]: scaleSqrt,
  [SCALE_TYPES.log]: scaleLog,
  [SCALE_TYPES.point]: scalePoint,
};

export const FILTER_TYPES = keyMirror({
  range: null,
  select: null,
  timeRange: null,
  multiSelect: null,
  polygon: null,
});

export const MAX_GPU_FILTERS = 4;

export const GEOJSON_FIELDS = {
  geojson: ["_geojson", "all_points", "geojson"],
};

export const HIGHLIGH_COLOR_3D = [255, 255, 255, 60];
