import colorbrewer from "colorbrewer";
import { VizColorPalette } from "./custom-color-ranges";

// Add colorbrewer color schemes (Data Science requirement)
// See http://colorbrewer2.org/

const colorBrewerMap = Object.entries(colorbrewer.schemeGroups).reduce(
  (accu, [type, palettes]) => ({
    ...accu,
    ...palettes.reduce(
      (group, name) => ({
        ...group,
        [name]: type,
      }),
      {}
    ),
  }),
  {}
);

const colorRanges = [...VizColorPalette];

for (const [keyName, colorScheme] of Object.entries(colorbrewer)) {
  if (keyName !== "schemeGroups") {
    for (const [lenKey, colors] of Object.entries(colorScheme)) {
      colorRanges.push({
        name: `ColorBrewer ${keyName}-${lenKey}`,
        type: colorBrewerMap[keyName],
        category: "ColorBrewer",
        colors,
      });
    }
  }
}

export const COLOR_RANGES = colorRanges;

export const DefaultColorRange = colorRanges.find(
  ({ name }) => name === "Global Warming"
);
