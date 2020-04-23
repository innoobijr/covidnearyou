// libraries
import React, { Component, createRef } from "react";
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
//ACTION CREATORS
import * as VisStateActions from "../actions/vis-state-actions";
import * as MapStateActions from "../actions/map-state-actions";
import * as MapStyleActions from "../actions/map-style-actions";

import MapContainer from "./map-container";

import {
  DIMENSIONS,
  MICROMEGAS_GL_NAME,
  MICROMEGAS_GL_VERSION,
  DEFAULT_MAPBOX_API_URL,
} from "../constants/default-settings";
//cconfigs
const MAPBOXGL_STYLE_UPDATE = "style.load";
const MAPBOXGL_RENDER = "render";
const TRANSITION_DURATION = 0;

class MicromegasGl extends Component {
  static defaultProps = {
    mapStyles: [],
    mapStylesReplaceDefault: false,
    mapboxApiUrl: DEFAULT_MAPBOX_API_URL,
    width: 800,
    height: 800,
    appName: MICROMEGAS_GL_NAME,
    version: MICROMEGAS_GL_VERSION,
    sidePanelWidth: DIMENSIONS.sidePanel.width,
    theme: {},
    cloudProviders: [],
  };

  componentDidMount() {
    //validateToken
    //loadMapStyle
    //handleResize
  }

  root = createRef();

  _handleResize({ width, height }) {
    if (!Number.isFinite(width) || !Number.isFinite(height)) {
      Console.warn("width and height is required");
      return;
    }
    this.props.mapStateActions.updateMap({
      width: width / (1 + Number(this.props.mapState.isSplit)),
      height,
    });
  }
  _loadMapStyle = () => {
    const defaultStyles = Object.values(this.props.mapStyle.mapStyles);
    // add id to custom map styles if not given
    const customStyles = (this.props.mapStyles || []).map((ms) => ({
      ...ms,
      id: ms.id || generateHashId(),
    }));

    const allStyles = [...customStyles, ...defaultStyles].reduce(
      (accu, style) => {
        const hasStyleObject = style.style && typeof style.style === "object";
        accu[hasStyleObject ? "toLoad" : "toRequest"][style.id] = style;

        return accu;
      },
      { toLoad: {}, toRequest: {} }
    );

    this.props.mapStyleActions.loadMapStyles(allStyles.toLoad);
    this.props.mapStyleActions.requestMapStyles(allStyles.toRequest);
  };

  render() {
    const {
      // props
      id,
      appName,
      version,
      appWebsite,
      onSaveMap,
      onViewStateChange,
      width,
      height,
      mapboxApiAccessToken,
      mapboxApiUrl,
      getMapboxRef,
      // redux state
      mapStyle,
      mapState,
      visState,
      // actions,
      visStateActions,
      mapStateActions,
      mapStyleActions,
    } = this.props;

    const {
      layers,
      layerOrder,
      layerBlending,
      layerClasses,
      datasets,
      layerData,
      mapInfo,
    } = visState;

    const mapFields = {
      preserveDrawingBuffer: true,
      datasets,
      getMapboxRef,
      mapboxApiAccessToken,
      mapboxApiUrl,
      mapState,
      //uiState,
      //editor: visState.editor,
      mapStyle,
      //mapControls: uiState.mapControls,
      layers,
      layerOrder,
      layerData,
      layerBlending,
      //filters,
      //interactionConfig,
      //hoverInfo,
      //clicked,
      //mousePos,
      //readOnly: uiState.readOnly,
      onViewStateChange,
      //uiStateActions,
      visStateActions,
      mapStateActions,
      width,
      height,
      //animationConfig
    };

    const mapProps = {
      ...mapState,
      preserveDrawingBuffer: true,
      mapboxApiAccessToken,
      onViewportChange: this._onViewportChange,
      mapboxApiUrl,
      height,
      width,
    };
    return (
      <MapContainer
        key={0}
        index={0}
        mapLayers={null}
        {...mapFields}
      ></MapContainer>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.visState);
  return {
    mapStyle: state.mapStyle,
    mapState: state.mapState,
    visState: state.visState,
  };
};

const defaultUserActions = {};
const getDispatch = (dispatch) => dispatch;
const getUserActions = (dispatch, props) => props.actions || defaultUserActions;

function makeGetActionCreator() {
  return createSelector(
    [getDispatch, getUserActions],
    (dispatch, userActions) => {
      const [visStateActions, mapStateActions, mapStyleActions] = [
        VisStateActions,
        MapStateActions,
        MapStyleActions,
      ].map((actions) =>
        bindActionCreators(mergeActions(actions, userActions), dispatch)
      );

      return {
        visStateActions,
        mapStateActions,
        mapStyleActions,
        dispatch,
      };
    }
  );
}

function makeMapDispatchToProps() {
  const getActionCreators = makeGetActionCreator();
  const mapDispatchToProps = (dispatch, ownProps) => {
    const groupedActionCreators = getActionCreators(dispatch, ownProps);
    return {
      ...groupedActionCreators,
      dispatch,
    };
  };

  return mapDispatchToProps;
}

const dispatchToProps = (dispatch) => {
  console.log(JSON.stringify(say));
  return { dispatch };
};

/**
 * Override default kepler.gl actions with user defined actions using the same key
 */
function mergeActions(actions, userActions) {
  const overrides = {};
  for (const key in userActions) {
    if (userActions.hasOwnProperty(key) && actions.hasOwnProperty(key)) {
      overrides[key] = userActions[key];
    }
  }

  return { ...actions, ...overrides };
}

export default connect(mapStateToProps, makeMapDispatchToProps)(MicromegasGl);
