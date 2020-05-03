import CMS from "netlify-cms-app";
import React from "react";
import IframeControl from "../components/widgets/iframe/IframeControl";
import IframePreview from "../components/widgets/iframe/IframePreview";

//CMS.registerWidget("iframe", IframeControl, IframePreview);

CMS.registerEditorComponent({
  id: "iframe",
  label: "Iframe Tag",
  fields: [
    { name: "id", label: "Embed Link", widget: "string" },
    { name: "title", label: "Title", widget: "string" },
    { name: "allow", label: "Allow", widget: "string" },
    { name: "src", label: "Source", widget: "string" },
  ],
  pattern: /^<iframe (\S+)$/,
  fromBlock: function(match) {
    return {
      id: match[0].split("=")[1],
      title: match[1].split("=")[1],
      allow: match[2].split("=")[1],
      src: match[3].split("=")[1],
    };
  },
  toBlock: function(obj) {
    return (
      '<iframe id="' +
      obj.id +
      '" title="' +
      obj.title +
      '" allow="' +
      obj.allow +
      '" src="' +
      obj.src +
      '" />'
    );
  },
  toPreview: function(obj) {
    return <IframePreview obj />;
  },
});
