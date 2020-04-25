import PropTypes from "prop-types";
import React from "react";

export default function IframePreview({ value }) {
  return `<iframe src=${value.id} width="100%" height="auto"/>`;
}

IframePreview.protoTypes = {
  value: PropTypes.node,
};
