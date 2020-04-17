import React from "react";
import theme from "../../theme";
import { useHistory } from "react-router-dom";
import {
  Box,
  Typography,
  ThemeProvider,
  makeStyles,
  Paper,
  Grid,
  Button,
  Card,
  ButtonBase,
} from "@material-ui/core";
import tempData from "./tempData";
import Navbar from "../../components/Navigation/Navbar";
import VirtualAutocomp from "../../components/Inputs/VirtualAutocomp";
import FilterBox from "../../components/Inputs/FilterBox";
// import { getClasses, getAllProperties } from "../../services/general";

const useStyles = makeStyles(() => ({
  centerContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainLanding: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.palette.background.main,
  },
  mainDiv: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& > div": {
      marginTop: theme.spacing(2),
    },
  },
  inputBox: {
    width: "41.67vw",
    height: "33.33vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: theme.palette.common.white,
  },
  infoText: {
    width: "60%",
  },
  exampleList: {
    padding: theme.spacing(2),
  },
  inputs: {
    width: "100%",
    height: "100%",
  },
  inputInput: {
    width: "85%",
  },
  filters: {
    height: "8vh",
    overflowY: "scroll",
    padding: theme.spacing(2),
  },
}));

// const cut = (sentence, length) => {
//   return `${sentence.slice(0, length)}${sentence.length > length ? "..." : ""}`;
// };

function Landing(props) {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    classes: [],
    selectedClass: "",
    propertiesOptions: [],
  });

  React.useEffect(() => {
    console.log("jalan");

    // getClasses(state.selectedClass, (response) => {
    //   console.log(response);
    //   setState((s) => ({ ...s, classes: response.entities }));
    // });
  }, [state.propertiesOptions]);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div className={classes.mainLanding}>
        <div className={`${classes.mainDiv} ${classes.centerContent}`}>
          <Typography variant="h2" className={classes.infoText}>
            ProWD is a tool which visualizes imbalance in Wikidata, a knowledge
            base
          </Typography>
        </div>
        <div className={classes.mainDiv}>
          <Typography variant="h2">
            <Box fontWeight="bold">What Imbalance do you want to check?</Box>
          </Typography>
          <Paper className={classes.inputBox} elevation={1}>
            <Grid
              container
              justify="center"
              spacing={2}
              direction="column"
              className={classes.inputInput}
            >
              <Grid item>
                <VirtualAutocomp
                  label="Class"
                  placeholder="e.g. Human, Disease, Country"
                  options={state.classes}
                  loading={state.classes.length === 0}
                  value={state.selectedClass}
                  onChange={(e) =>
                    setState((s) => ({ ...s, selectedClass: e.target.value }))
                  }
                  // groupBy={(option) => option.label[0].toUpperCase()}
                  getOptionLabel={(option) =>
                    `${option.entityLabel} (${option.entityID})`
                  }
                  renderOption={(option) => (
                    <div>
                      <Typography
                        noWrap
                      >{`${option.entityLabel} (${option.entityID})`}</Typography>
                    </div>
                  )}
                />
              </Grid>
              <Grid item>
                <FilterBox
                  options={tempData.countries}
                  propertiesOptions={state.propertiesOptions}
                />
              </Grid>
              <Grid item xs={5}>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  fullWidth
                  onClick={() => history.push("/dashboards/123/profile")}
                >
                  Check
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Grid container spacing={2} style={{ width: "41.67vw" }}>
            {tempData.examples.map((x, idx) => (
              <Grid item key={idx}>
                <ButtonBase onClick={() => {}}>
                  <Card className={classes.exampleList}>
                    <Typography variant="body1">{x}</Typography>
                  </Card>
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Landing;
