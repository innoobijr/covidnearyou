import angular from "angular";
import uiRouter from "angular-ui-router";
import ngRedux from "ng-redux";
import AppComponent from "./app.component";
import KeplerComponent from "./components/kepler/kepler";
import DeckMapComponent from "./components/deckMap/deckMap";
import MicromegasComponent from "./components/micromegas/micromegas";
import coreReducerFactory from "./reducers/core";
import "normalize.css";
import "bootstrap/dist/css/bootstrap.css";

angular
  .module("app", [
    uiRouter,
    ngRedux,
    KeplerComponent.name,
    DeckMapComponent.name,
    MicromegasComponent.name,
  ])
  .config(
    (
      $locationProvider,
      $stateProvider,
      $urlRouterProvider,
      $ngReduxProvider
    ) => {
      "ngInject";

      $stateProvider
        .state("app", {
          url: "",
          abstract: true,
          template: "<app></app>",
        })
        .state("app.deckmap", {
          url: "/deckmap",
          template: "<deckmap></deckmap>",
        })
        .state("app.kepler", {
          url: "/kepler",
          template: "<kepler></kepler>",
        })
        .state("app.micromegas", {
          url: "/micromegas",
          template: "<micromegas></micromegas>",
        });

      $urlRouterProvider.otherwise("/kepler");
      $ngReduxProvider.createStoreWith(coreReducerFactory);
    }
  )
  .value(
    "mapbox_api",
    "pk.eyJ1Ijoibm9kZXRyYWZmaWMiLCJhIjoiY2poMG9ma2Z1MHRsZTMzbzFqcGhtbGE3aSJ9.N4As8KJSgQQakQepEm2TDw"
  )
  .component("app", AppComponent);
