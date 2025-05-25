import { makeStyles } from "@fluentui/react-components";

export const useTaskFormStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    maxWidth: "400px",
    marginTop: "30px",
  },
  label: {
    display: "flex",
    gap: "5px",
    marginBottom: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "400px",
  },
  drawerFooter: {
    justifyContent: "end",
  },
});
