import CMS from "netlify-cms-app";
import IframeControl from "../components/widgets/iframe/IframeControl";
import IframePreview from "../components/widgets/iframe/IframePreview";

CMS.registerWidget("iframe", IframeControl, IframePreview);

CMS.registerEditorComponent(
  {
    id: "iframe-tag",
    label: "Iframe Tag",
    fields: [{ name: "id", label: "Embed Link", widget: "string" }],
    widget: "iframe",
    //pattern: /^iframe (\S+)$/,
  } /*fromBlock: function (match) {
    return {
      id: match[1],
    };
  },
  toBlock: function (obj) {
    return "iframe " + obj.id;
  },
  toPreview: function (obj) {
    return `<iframe src=${obj.id} width="100%" height="auto"/>`;
  },
}*/
);
