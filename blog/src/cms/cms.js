import CMS from "netlify-cms-app";
import React from "react";
import IframeControl from "../components/widgets/iframe/IframeControl";
import IframePreview from "../components/widgets/iframe/IframePreview";

//CMS.registerWidget("iframe", IframeControl, IframePreview);

CMS.registerEditorComponent({
  id: "iframe",
  label: "Iframe Tag",
  fields: [{ name: "id", label: "Embed Link", widget: "string" }],
  pattern: /^<iframe (\S+)$/,
  fromBlock: function(match) {
    return {
      id: match[1],
    };
  },
  toBlock: function(obj) {
    return "<iframe " + obj.id + " />";
  },
  toPreview: function(obj) {
    return <IframePreview obj />;
  },
});
