import CMS from "netlify-cms-app";
import IframeCMSWidget from "../components/widgets/iframe";

CMS.registerWidget([IframeCMSWidget.Widget()]);

CMS.registerEditorComponent(
  {
    id: "iframe",
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
