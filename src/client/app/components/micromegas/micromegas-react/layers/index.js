import { default as GeojsonLayer } from "./geojson-layer/geojson-layer";
export { default as Layer } from "./base-layer";
export const KeplerGlLayers = {
  GeojsonLayer,
};

export const LayerClasses = {
  geojson: GeojsonLayer,
};
