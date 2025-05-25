import { makeStyles, tokens } from "@fluentui/react-components";

export const useTaskITemStyles = makeStyles({
  card: {
    width: "100%",
    maxWidth: "420px",  
    height: "fit-content",
  },
  text: { margin: "0" },
  iconCompleted: { color: tokens.colorPaletteLightGreenForeground2 },
  iconInProgress: { color: tokens.colorPaletteLightTealForeground2 },
  iconNotStarted: { color: tokens.colorPaletteForestForeground2 },
  footer: {
    fontSize: tokens.fontSizeBase100
  }
});
