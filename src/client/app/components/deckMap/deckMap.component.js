import template from "./deckMap.html";
import controller from "./deckMap.controller";
import "./deckMap.scss";

let deckMapComponent = {
  restrict: "E",
  bindings: {},
  template,
  controller,
  //controllerAs: "$deck",
};

export default deckMapComponent;
