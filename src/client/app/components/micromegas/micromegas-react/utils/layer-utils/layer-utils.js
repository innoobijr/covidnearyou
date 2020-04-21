/**
 * Find default layers from fields
 *
 * @param {Object} dataset
 * @param {Object} layerClasses
 * @returns {Array} found layers
 */
export function findDefaultLayer(dataset, layerClasses = {}) {
  if (!dataset) {
    return [];
  }
  const layerProps = Object.keys(layerClasses).reduce((previous, lc) => {
    const result =
      typeof layerClasses[lc].findDefaultLayerProps === "function"
        ? layerClasses[lc].findDefaultLayerProps(dataset, previous)
        : { props: [] };

    const props = Array.isArray(result) ? result : result.props || [];
    const foundLayers = result.foundLayers || previous;

    return foundLayers.concat(
      props.map((p) => ({
        ...p,
        type: lc,
        dataId: dataset.id,
      }))
    );
  }, []);

  // go through all layerProps to create layer
  return layerProps.map((props) => {
    const layer = new layerClasses[props.type](props);
    return typeof layer.setInitialLayerConfig === "function"
      ? layer.setInitialLayerConfig(dataset.allData)
      : layer;
  });
}

/**
 * calculate layer data based on layer type, col Config,
 * return updated layer if colorDomain, dataMap has changed
 * @param {Object} layer
 * @param {Object} state
 * @param {Object} oldLayerData
 * @returns {{layerData: Array<Object>, layer: Object | undefined}}
 */
export function calculateLayerData(layer, state, oldLayerData) {
  const { type } = layer;

  if (!type || !layer.hasAllColumns() || !layer.config.dataId) {
    return { layer, layerData: {} };
  }

  const layerData = layer.formatLayerData(state.datasets, oldLayerData);
  return { layerData, layer };
}
