import React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import store from "./store";
import Map from "./Map";

export default class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("Did mount");
  }

  render() {
    return (
      <Provider store={store}>
        <Map />
      </Provider>
    );
  }
}
