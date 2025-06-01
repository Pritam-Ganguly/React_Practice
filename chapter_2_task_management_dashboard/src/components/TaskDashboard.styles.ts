import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  header: {
    color: tokens.colorPaletteLightTealBackground2,
    backgroundColor: tokens.colorBrandBackground,
    padding: "30px 40px",
    border: `5px solid ${tokens.colorPaletteLightTealBackground2}`,
  },
  activeBody: {
    color: tokens.colorNeutralStrokeAccessible,
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexFlow: "wrap",
  },
  listBody: {
    color: tokens.colorNeutralStrokeAccessible,
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexFlow: "wrap",
    gap: '10px'
  },
  input: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "20px 40px",
    marginBottom: "10px",
    width: "500px",
    height: "100px",
    maxWidth: "600px",
  },
  inputLabel: {
    color: tokens.colorCompoundBrandBackgroundPressed,
  },
  createNewTaskButton: {
    height: "50px",
    marginTop: "50px",
  },
  card: {
    width: "auto",
    maxWidth: "100%",
    height: "fit-content",
    padding: "20px 30px",
    gap: '20px'
  },
  horizontalCardImage: {
    width: "64px",
    height: "64px",
  },
  caption: {
    color: tokens.colorNeutralForeground3,
  }
});

export default useStyles;
