import React from "react";
import {
  Typography,
  ThemeProvider,
  //   Grid,
  Box,
  makeStyles,
} from "@material-ui/core";
import theme from "../../theme";
import SimpleTabs from "../../components/Navigation/SimpleTabs";
import Navbar from "../../components/Navigation/Navbar";
import Profile from "./Profile";
import Compare from "./Compare";
import Analysis from "./Analysis";

const useStyles = makeStyles(() => ({
  content: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(8),
    width: "100vw",
    height: "100vh",
    backgroundColor: theme.palette.background.main,
  },
  tabs: {
    width: "98vw",
  },
}));

export default function DashboardPage(props) {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div className={classes.content}>
        <div style={{ marginBottom: theme.spacing(1) }}>
          <Typography
            variant="h2"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Box
              fontWeight="bold"
              style={{ marginRight: theme.spacing(1) }}
            >{`Dashboard ${props.match.params.id}`}</Box>
            <Box> {` by Anonymous`}</Box>
          </Typography>
        </div>
        <div>
          <SimpleTabs
            className={classes.tabs}
            dashId={props.match.params.id}
            selectedTab={props.match.params.page}
            content={{ profile: Profile, compare: Compare, analysis: Analysis }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
