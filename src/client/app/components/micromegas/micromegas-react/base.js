import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";
import { StatefulInput } from "baseui/input";
import React from "react";
import { connect } from "react-redux";

const engine = new Styletron();
const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

const Base = () => (
  <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
      <Centered>
        <StatefulInput />
      </Centered>
    </BaseProvider>
  </StyletronProvider>
);

const mapStateToProps = (state) => state;
const dispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(Base);
