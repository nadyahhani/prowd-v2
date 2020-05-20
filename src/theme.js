import { createMuiTheme } from "@material-ui/core/styles";
import { grey, green, amber, red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#006699" },
    // disabled: { light: grey[100], main: grey[200] },
    accent: { dark: grey[400], main: grey[200], light: grey[100] },
    background: { light: "#ecf3f7", main: "#E8F1F5", dark: "#a2a8ab" },
    chart: { main: "rgba(141, 185, 207,.5)", opaque: "rgba(141, 185, 207,1)" },
    itemB: { main: "rgba(219,127,103,.5)", opaque: "rgba(219,127,103,1)" },
    itemA: { main: "rgba(95,158,189,.5)", opaque: "rgba(95,158,189,1)" },
    giniArea: { main: "rgba(51,153,103,.2)", opaque: "rgba(51,153,103,1)" },
    itemMerge: {
      main: "rgba(173, 127, 137,.5)",
      opaque: "rgba(173, 127, 137,1)",
    },
    success: { main: green[500], transparent: "rgba(80,174,85,.2)" },
    warning: { main: amber[600], transparent: "rgba(254,192,47,.2)" },
    error: { main: red[500], transparent: "rgba(209,49,53,.2)" },
  },
  //   spacing: 4,
  typography: {
    fontFamily: "Open Sans",
    // fontSize: "1.556vmin",
    fontSize: 12,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    color: "#1A1A1A",
    body1: {
      // fontSize: "1.556vmin",
      fontSize: 12,
      // color: "#1A1A1A",
    },
    h1: {
      // fontSize: "3.889vmin",
      fontSize: 35,
      color: "#1A1A1A",
    },
    h2: {
      // fontSize: "2.7vmin",
      fontSize: 20,
      color: "#1A1A1A",
    },
    caption: {
      // fontSize: "1.3vmin",
      fontSize: 9,
      color: "#1A1A1A",
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
