import CMS from "netlify-cms-app";
import { SlidesControl, SlidesPreview } from "./Slides";

import CustomWidgetControl from "../components/customWidget/CustomWidgetControl";
import CustomWidgetPreview from "../components/customWidget/CustomWidgetPreview";

CMS.registerWidget("mywidget", CustomWidgetControl, CustomWidgetPreview);
CMS.registerWidget("slides", SlidesControl, SlidesPreview);
