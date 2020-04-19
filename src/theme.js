import { createMuiTheme } from "@material-ui/core/styles";
import { green, amber, red, grey } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#006699" },
    green: { main: green[500] },
    yellow: { main: amber[500] },
    red: { main: red[700] },
    disabled: { main: grey[200] },
    accent: { main: grey[400] },
    background: { main: "#E8F1F5" },
  },
  //   spacing: 4,
  typography: {
    fontFamily: "Open Sans",
    // fontSize: "1.556vmin",
    fontSize: 11,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    body1: {
      // fontSize: "1.556vmin",
      fontSize: 11,
    },
    h1: {
      // fontSize: "3.889vmin",
      fontSize: 30,
    },
    h2: {
      // fontSize: "2.7vmin",
      fontSize: 20,
    },
    caption: {
      // fontSize: "1.3vmin",
      fontSize: 9,
    },
  },
  overrides: {
    MuiInputAdornment: {
      root: {
        fontSize: "3vh",
      },
    },
    MuiAutocomplete: {
      endAdornment: {
        fontSize: "3vh",
        "& > button": {
          fontSize: "3vh",
        },
      },
    },
  },
  contrastThreshold: 3,
  tonalOffset: 0.2,
});

export default theme;
