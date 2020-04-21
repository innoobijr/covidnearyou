// libraries
import React, { Component } from "react";
import PropTypes from "prop-types";
import MapboxGLMap from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { createSelector } from "reselect";
import WebMercatorViewport from "@math.gl/web-mercator";
import { connect } from "react-redux";

import {
  generateMapboxLayers,
  updateMapboxLayers,
} from "../layers/mapbox-utils";
import { bindActionCreators } from "redux";

const MAP_STYLE = {
  container: {
    display: "inline-block",
    position: "relative",
  },
  top: {
    position: "absolute",
    top: "0px",
    pointerEvents: "none",
  },
};

//cconfigs
const MAPBOXGL_STYLE_UPDATE = "style.load";
const MAPBOXGL_RENDER = "render";
const TRANSITION_DURATION = 0;

class MapContainer extends Component {
  static propTypes = {
    //visState: PropTypes.object.isRequired,
    mapState: PropTypes.object.isRequired,
    mapStyle: PropTypes.object.isRequired,
    mapboxApiAccessToken: PropTypes.string.isRequired,
    layerBlending: PropTypes.string.isRequired,
    layerOrder: PropTypes.arrayOf(PropTypes.any).isRequired,
    layerData: PropTypes.arrayOf(PropTypes.any).isRequired,
    layers: PropTypes.arrayOf(PropTypes.any).isRequired, //mapboxApiUrl: PropTypes.string,    //mapStateActions: PropTypes.object.isRequired,
    visStateActions: PropTypes.object.isRequired,
    mapStateActions: PropTypes.object.isRequired,
  };

  static defaultProps = {
    MapComponent: MapboxGLMap,
    deckGLProps: {},
    index: 0,
  };

  constructor(props) {
    super(props);
  }

  _onViewportChange = (viewState) => {
    if (typeof this.props.onViewStateChange === "function") {
      this.props.onViewStateChange(viewState);
    }
    //console.log("ERROR");
    this.props.mapStateActions.updateMap(viewState);
  };

  layersSelector = (props) => props.layers;
  layerDataSelector = (props) => props.layerData;
  mapLayersSelector = (props) => props.mapLayers;
  layerOrderSelector = (props) => props.layerOrder;

  layersToRenderSelector = createSelector(
    this.layersSelector,
    this.layerDataSelector,
    this.mapLayersSelector,
    // {[id]: true \ false}
    (layers, layerData, mapLayers) =>
      layers.reduce(
        (accu, layer, idx) => ({
          ...accu,
          [layer.id]:
            layer.shouldRenderLayer(layerData[idx]) &&
            this._isVisibleMapLayer(layer, mapLayers),
        }),
        {}
      )
  );

  mapboxLayersSelector = createSelector(
    this.layersSelector,
    this.layerDataSelector,
    this.layerOrderSelector,
    this.layersToRenderSelector,
    generateMapboxLayers
  );

  /* component private functions */
  _isVisibleMapLayer(layer, mapLayers) {
    // if layer.id is not in mapLayers, don't render it
    return !mapLayers || (mapLayers && mapLayers[layer.id]);
  }

  _onMapboxStyleUpdate = () => {
    // force refresh mapboxgl layers
    this.previousLayers = {};
    //this._updateMapboxLayers();
  };

  _setMapboxMap = (mapbox) => {
    if (!this._map && mapbox) {
      this._map = mapbox.getMap();
      if (!this._map) {
        return;
      }
      // bind mapboxgl event listener
      this._map.on(MAPBOXGL_STYLE_UPDATE, this._onMapboxStyleUpdate);
    }
  };

  render() {
    const {
      mapState,
      mapStyle,
      MapComponent,
      mapboxApiAccessToken,
      mapboxApiUrl,
      index,
      height,
      width,
    } = this.props;

    const mapProps = {
      ...mapState,
      preserveDrawingBuffer: true,
      mapboxApiAccessToken,
      onViewportChange: this._onViewportChange,
      mapboxApiUrl,
      height,
      width,
    };

    //console.log(`url ${mapboxApiUrl}`);
    return (
      <MapComponent
        {...mapProps}
        key="bottom"
        ref={this._setMapboxMap}
        mapStyle={mapStyle.mapStyles.dark.url}
      ></MapComponent>
    );
  }
}

export default MapContainer;
