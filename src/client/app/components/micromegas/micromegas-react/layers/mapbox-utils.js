import { OVERLAY_TYPE } from "./base-layer";

/**
 * This function will convert layers to mapbox layers
 * @param {Array<Object>} layers the layers to be converted
 * @param {Array<Object>} layerData extra layer information
 * @param {Array<Number>} layerOrder the order by which we should convert layers
 * @param {Object} layersToRender {[id]: true | false} object whether each layer should be rendered
 * @returns {Object} {[id]: layer}
 */
export function generateMapboxLayers(
  layers = [],
  layerData = [],
  layerOrder = [],
  layersToRender = {}
) {
  if (layerData.length > 0) {
    return layerOrder
      .slice()
      .reverse()
      .filter(
        (idx) =>
          layers[idx].overlayType === OVERLAY_TYPE.mapboxgl &&
          layerToRender[layers[idx].id]
      )
      .reduce((accu, index) => {
        const layer = layers[index];
        return {
          ...accu,
          [layer.id]: {
            id: layer.id,
            data: layerData[index].data,
            isVisible: layer.config.isVisible,
            config: layerData[index].config,
            sourceId: layerData[index].config.source,
          },
        };
      }, {});
  }
  return {};
}

/**
 * Update mapbox layers on the given map
 * @param {Object} map
 * @param {Object} newLayers Map of new mapbox layers to be displayed
 * @param {Object} oldLayers Map of the old layers to be compare with the current ones to detect deleted layers
 *                  {layerId: sourceId}
 */
export function updateMapboxLayers(map, newLayers = {}, oldLayers = null) {
  // delete no longer existed old layers
  if (oldLayers) {
    checkAndRemoveOldLayers(map, oldLayers, newLayers);
  }

  // insert or update new layer
  Object.values(newLayers).forEach((overlay) => {
    const { id: layerId, config, data, sourceId, isVisible } = overlay;
    if (!data && !config) {
      return;
    }

    const { data: oldData, config: oldConfig } =
      (oldLayers && oldLayers[layerId]) || {};

    if (data && data !== oldData) {
      updateSourceData(map, sourceId, data);
    }

    // compare with previous configs
    if (oldConfig !== config) {
      updateLayerConfig(map, layerId, config, isVisible);
    }
  });
}

function checkAndRemoveOldLayers(map, oldLayers, newLayers) {
  Object.keys(oldLayers).forEach((layerId) => {
    if (!newLayers[layerId]) {
      map.removeLayer(layerId);
    }
  });
}

function updateLayerConfig(map, layerId, config, isVisible) {
  const mapboxLayer = map.getLayer(layerId);

  if (mapboxLayer) {
    // check if layer already is set
    // remove it if exists
    map.removeLayer(layerId);
  }

  map.addLayer(config);
  map.setLayoutProperty(layerId, "visibility", isVisible ? "visible" : "none");
}

function updateSourceData(map, sourceId, data) {
  const source = map.getSource(sourceId);

  if (!source) {
    map.addSource(sourceId, {
      type: "geojson",
      data,
    });
  } else {
    source.setData(data);
  }
}
/**
 *
 * @param points
 * @param columns {
 * lat: {fieldIdx},
 * lng: {fieldIdx},
 * alt: {fieldIdx}
 * }
 * @param properties [{label: {fieldIdx}]
 * @returns {{type: string, properties: {}, features: {type: string, properties: {}, geometry: {type: string, coordinates: *[]}}[]}}
 */
export function geoJsonFromData(
  allData = [],
  filteredIndex = [],
  getGeometry,
  getProperties = (d, i) => {}
) {
  const geojson = {
    type: "FeatureCollection",
    features: [],
  };

  for (let i = 0; i < filteredIndex.length; i++) {
    const index = filteredIndex[i];
    const point = allData[index];
    const geometry = getGeometry(point);

    if (geometry) {
      geojson.features.push({
        type: "Feature",
        properties: {
          index,
          ...getProperties(point, index),
        },
        geometry,
      });
    }
  }

  return geojson;
}

export const prefixGpuField = (name) => `gpu:${name}`;

export function gpuFilterToMapboxFilter(gpuFilter) {
  const { filterRange, filterValueUpdateTriggers } = gpuFilter;

  const hasFilter = Object.values(filterValueUpdateTriggers).filter((d) => d);

  if (!hasFilter.length) {
    return null;
  }

  const condition = ["all"];

  // [">=", key, value]
  // ["<=", key, value]
  const expressions = Object.values(filterValueUpdateTriggers).reduce(
    (accu, name, i) =>
      name
        ? [
            ...accu,
            [">=", prefixGpuField(name), filterRange[i][0]],
            ["<=", prefixGpuField(name), filterRange[i][1]],
          ]
        : accu,
    condition
  );

  return expressions;
}
