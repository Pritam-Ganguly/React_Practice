import { makeStyles, tokens } from "@fluentui/react-components";

const useStyle = makeStyles({
  header: {
    padding: "40px 20px",
    display: "flex",
    backgroundColor: tokens.colorBrandBackground,
  },
  title: {
    color: tokens.colorNeutralForegroundStaticInverted,
    flex: "auto",
  },
  createNewTaskButton: {
    maxWidth: "250px",
    color: tokens.colorPaletteLightGreenBackground1,
    backgroundColor: tokens.colorBrandBackground3Static,
    flex: "auto",
    border: "1px",
    gap: "20px",
  },
  bodyContent: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: tokens.colorNeutralBackground1Hover,
  },
  overlay: {
    width: "auto",
    maxWidth: "500px",
  },
});

export default useStyle;
