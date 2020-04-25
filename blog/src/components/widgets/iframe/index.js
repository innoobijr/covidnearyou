import IframeControl from "./IframeControl";
import IframePreview from "./IframePreview";

const Widget = (opts = {}) => ({
  name: "iframe",
  IframeControl,
  IframePreview,
  ...opts,
});

export const IframeCMSWidget = { Widget, IframeControl, IframePreview };
export default IframeCMSWidget;
