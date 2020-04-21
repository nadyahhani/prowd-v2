import React from "react";
import {
  Typography,
  ThemeProvider,
  makeStyles,
  Input,
  CircularProgress,
  Box,
} from "@material-ui/core";
import theme from "../../theme";
import SimpleTabs from "../../components/Navigation/SimpleTabs";
import Navbar from "../../components/Navigation/Navbar";
import Profile from "./Profile";
import Compare from "./Compare";
import Analysis from "./Analysis";
import { getDashInfo } from "../../services/dashboard";

const useStyles = makeStyles(() => ({
  content: {
    padding: "1vh 1vw",
    paddingTop: "7vh",
    width: "98vw",
    height: "92vh",
    backgroundColor: theme.palette.background.main,
    overflow: "hidden",
  },
  titleInput: {
    fontSize: theme.typography.h2.fontSize,
    // backgroundColor: "black",
  },
  bold: {
    fontWeight: "bold",
  },
  tabs: {
    width: "100%",
  },
}));

export default function DashboardPage(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    loading: true,
    globalData: {},
  });
  React.useEffect(() => {
    console.log("getting info");

    getDashInfo(props.match.params.id, (r) => {
      console.log(r);
      r.success &&
        setState((s) => ({ ...s, loading: false, globalData: { ...r } }));
      console.log("success", r);
    });
  }, [props.match.params.id]);

  return (
    <ThemeProvider theme={theme} style={{ overflow: "hidden" }}>
      <Navbar />
      <div className={classes.content}>
        <div
          style={{
            marginBottom: theme.spacing(1),
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: "4vh",
          }}
        >
          {state.globalData.name && state.globalData.author ? (
            <React.Fragment>
              <Input
                classes={{ input: `${classes.titleInput} ${classes.bold}` }}
                defaultValue={`Dashboard ${props.match.params.id}`}
              />
              <Typography
                style={{ padding: "0 .4vw" }}
                variant="h2"
              >{` by `}</Typography>
              <Input
                classes={{ input: classes.titleInput }}
                defaultValue="Anonymous"
              />
            </React.Fragment>
          ) : (
            <Typography
              component="div"
              variant="h2"
              style={{
                display: "flex",
                flexDirection: "row",
                "& > *": { marginLeft: theme.spacing(1) },
              }}
            >
              <Box fontWeight="bold">Loading...</Box>
              <CircularProgress size={10} />
            </Typography>
          )}
        </div>
        <div>
          <SimpleTabs
            className={classes.tabs}
            dashId={props.match.params.id}
            selectedTab={props.match.params.page}
            data={state.globalData}
            updateData={setState}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
