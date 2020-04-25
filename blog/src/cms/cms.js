import CMS from "netlify-cms-app";
import { Widget } from "../components/widgets/iframe";

CMS.registerWidget([Widget()]);

CMS.registerEditorComponent(
  {
    id: "iframe-tag",
    label: "Iframe",
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
