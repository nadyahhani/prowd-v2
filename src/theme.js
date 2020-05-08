import { createMuiTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#006699" },
    disabled: { light: grey[100], main: grey[200] },
    accent: { main: grey[400] },
    background: { light: "#ecf3f7", main: "#E8F1F5", dark: "#a2a8ab" },
    chart: { main: "rgba(141, 185, 207,.6)" },
    itemB: { main: "rgba(219,127,103,.6)" },
    itemA: { main: "rgba(95,158,189,.6)" },
    itemMerge: { main: "#AD7F89" },
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
      fontSize: 35,
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
