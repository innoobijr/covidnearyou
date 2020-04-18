import angular from "angular";
import uiRouter from "angular-ui-router";
import deckMapComponent from "./deckMap.component";

const deckMapModule = angular
  .module("deckmap", [uiRouter])
  .component("deckmap", deckMapComponent);

export default deckMapModule;
