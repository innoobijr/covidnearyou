import { Deck } from "@deck.gl/core";
import { GeoJsonLayer, ArcLayer } from "@deck.gl/layers";
import mapboxgl from "mapbox-gl";
import MapStyleActions from "../../actions/map-style-actions";

class DeckMapController {
  constructor(mapbox_api, $ngRedux, $scope) {
    this.mapbox_api = mapbox_api;
    //document.getElementById("key").innerText = this.mapbox_api;
    this.unsubscribe = $ngRedux.connect(this.mapStateToThis, {
      MapStyleActions,
    })(this);

    console.log($scope);

    const AIR_PORTS =
      "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";

    const INITIAL_VIEW_STATE = $scope.$ctrl.mapState;

    mapboxgl.accessToken = this.mapbox_api;

    const map = new mapboxgl.Map({
      container: "map",
      style: $scope.$ctrl.mapStyle.mapStyles.dark.url, //"mapbox://styles/mapbox/light-v9",
      // Note: deck.gl will be in charge of interaction and event handling
      interactive: false,
      center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
      zoom: INITIAL_VIEW_STATE.zoom,
      bearing: INITIAL_VIEW_STATE.bearing,
      pitch: INITIAL_VIEW_STATE.pitch,
    });
    const deck = new Deck({
      canvas: "deck-canvas",
      width: "100%",
      height: "100%",
      initialViewState: INITIAL_VIEW_STATE,
      controller: true,
      onViewStateChange: ({ viewState }) => {
        map.jumpTo({
          center: [viewState.longitude, viewState.latitude],
          zoom: viewState.zoom,
          bearing: viewState.bearing,
          pitch: viewState.pitch,
        });
      },
      layers: [
        new GeoJsonLayer({
          id: "airports",
          data: AIR_PORTS,
          // Styles
          filled: true,
          pointRadiusMinPixels: 2,
          pointRadiusScale: 2000,
          getRadius: (f) => 11 - f.properties.scalerank,
          getFillColor: [200, 0, 80, 180],
          // Interactive props
          pickable: true,
          autoHighlight: true,
          onClick: (info) =>
            // eslint-disable-next-line
            info.object &&
            alert(
              `${info.object.properties.name} (${info.object.properties.abbrev})`
            ),
        }),
        new ArcLayer({
          id: "arcs",
          data: AIR_PORTS,
          dataTransform: (d) =>
            d.features.filter((f) => f.properties.scalerank < 4),
          // Styles
          getSourcePosition: (f) => [-0.4531566, 51.4709959], // London
          getTargetPosition: (f) => f.geometry.coordinates,
          getSourceColor: [0, 128, 200],
          getTargetColor: [200, 0, 80],
          getWidth: 1,
        }),
      ],
    });
  }

  $onDestroy() {
    this.unsubscribe();
  }
  mapStateToThis(state) {
    //console.log(state);
    return { mapStyle: state.mapStyle, mapState: state.mapState };
  }
}

DeckMapController.$inject = ["mapbox_api", "$ngRedux", "$scope"];
export default DeckMapController;
