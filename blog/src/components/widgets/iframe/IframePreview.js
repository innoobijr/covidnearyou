import PropTypes from "prop-types";
import React from "react";
import { StaticQuery, graphql } from "gatsby";

export default function IframePreview(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={(data) => <IframePreviewT data={data} {...props} />}
    />
  );
}

export function IframePreviewT({ data, id, title, allow, src }) {
  return [
    <iframe title={title} src={id} width="100%" height="375" allow={allow} />,
    // <p> {src.replace("./images/", "")}</p>,
    //<img src={src.replace("./images/", "")} />,
  ];
}

IframePreview.protoTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  allow: PropTypes.string,
};
