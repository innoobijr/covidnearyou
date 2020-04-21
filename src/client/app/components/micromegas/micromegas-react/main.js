import React from "react";
import document from "global/document";
import { Provider } from "react-redux";
import { render } from "react-dom";
import store from "../micromegas-react/store/store";
import Base from "./base";
import App from "./app";

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
//render(<Root />, document.body.appendChild(document.createElement("div")));
