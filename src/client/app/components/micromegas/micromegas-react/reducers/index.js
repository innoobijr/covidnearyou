// Root Reducer, used to register, and remove core reducers of each instance
export { default } from "./root";
export { default as keplerGlReducer } from "./root";

export {
  default as keplerGlReducerCore,
  visStateLens,
  mapStateLens,
  mapStyleLens,
} from "./core";

// Individual reducer
export { default as mapStyleReducer } from "./map-style";
export { default as visStateReducer } from "./vis-state";
export { default as mapStateReducer } from "./map-state";

// reducer updaters
export * as visStateUpdaters from "./vis-state-updaters";
export * as mapStateUpdaters from "./map-state-updaters";
export * as mapStyleUpdaters from "./map-style-updaters";
