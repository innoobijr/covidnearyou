import React from "react";
import { connect } from "react-redux";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import styled from "styled-components";
import KeplerGL from "kepler.gl";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoibm9kZXRyYWZmaWMiLCJhIjoiY2poMG9ma2Z1MHRsZTMzbzFqcGhtbGE3aSJ9.N4As8KJSgQQakQepEm2TDw";

const StyledWrapped = styled.div`
  postiion: absolute;
  width: 100vw;
  height: 100vh;
`;

const Map = () => (
  <StyledWrapped>
    <AutoSizer>
      {({ height, width }) => (
        <KeplerGL
          mapboxApiAccessToken={MAPBOX_TOKEN}
          id="map1"
          width={width}
          height={height}
        />
      )}
    </AutoSizer>
  </StyledWrapped>
);

//export default Map;

const mapStateToProps = (state) => state;
const dispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, dispatchToProps)(Map);
