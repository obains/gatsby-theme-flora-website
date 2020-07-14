import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      main: "#174141"
    },
    secondary: {
      main: "#000000"
    },
    type: "light",
    text: {
      primary: "#101012",
      secondary: "#545456"
    },
    error: {
      main: "#d32f2f"
    },
    success: {
      main: "#28a745"
    }
  },
  typography: {
    fontFamily: [
      '"Heebo"'
    ].join(','),
  },
});
