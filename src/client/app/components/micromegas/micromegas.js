import angular from "angular";
import uiRouter from "angular-ui-router";
import micromegasComponent from "./micromegas.component";
import ReactDOM from "react-dom";
import React from "react";
import Micromegas from "./micromegas-react/main";

const micromegasModule = angular
  .module("micromegas", [uiRouter])
  .directive("microMegas", function () {
    return {
      template: '<div id="react-app" class="react-app"></div>',
      link: function (scope, element, attr) {
        const reactapp = document.getElementById("react-app");
        ReactDOM.render(<Micromegas />, reactapp);
      },
    };
  })
  .component("micromegas", micromegasComponent);

export default micromegasModule;
