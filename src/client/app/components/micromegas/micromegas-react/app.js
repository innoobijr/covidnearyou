import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";
import React from "react";
import { connect } from "react-redux";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

import MicromegasGl from "../micromegas-react/components/micromegas-gl";
const engine = new Styletron();

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoibm9kZXRyYWZmaWMiLCJhIjoiY2poMG9ma2Z1MHRsZTMzbzFqcGhtbGE3aSJ9.N4As8KJSgQQakQepEm2TDw";

const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

const StyledWrapper = styled("div", {
  position: "absolute",
  width: "100vw",
  height: "100vh",
});

const App = () => (
  <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
      <StyledWrapper>
        <AutoSizer>
          {({ height, width }) => (
            <MicromegasGl
              width={width}
              height={height}
              mapboxApiAccessToken={MAPBOX_TOKEN}
            />
          )}
        </AutoSizer>
      </StyledWrapper>
    </BaseProvider>
  </StyletronProvider>
);

export default App;
