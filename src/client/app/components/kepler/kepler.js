import angular from "angular";
import uiRouter from "angular-ui-router";
import keplerComponent from "./kepler.component";
import Root from "./react/main";
import ReactDOM from "react-dom";
import React from "react";

const keplerModule = angular
  .module("kepler", [uiRouter])
  .directive("reactDirective", function () {
    return {
      template: '<div id="reactapp" class="react-part"></div>',
      //scope: {
      //  greetings: "=greetings",
      //},
      link: function (scope, element, attrs) {
        const reactapp = document.getElementById("reactapp");
        ReactDOM.render(<Root />, reactapp);
      },
    };
  })
  .component("kepler", keplerComponent);

export default keplerModule;
