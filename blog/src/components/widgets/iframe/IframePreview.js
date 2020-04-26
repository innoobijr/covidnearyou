import PropTypes from "prop-types";
import React from "react";

export default function IframePreview({ id }) {
  return `<iframe src=${id} width="100%" height="auto"/>`;
}

IframePreview.protoTypes = {
  id: PropTypes.string,
};
