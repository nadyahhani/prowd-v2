import React from "react";
import {
  Typography,
  Grid,
  Paper,
  makeStyles,
  Box,
  FormControl,
  Select,
  MenuItem,
  ThemeProvider,
  Button,
  ListItemIcon,
} from "@material-ui/core";
import GiniChart from "../../components/Dashboard/GiniChart";
import HorizontalBarChart from "../../components/Dashboard/HorizontalBarChart";
import theme from "../../theme";
import { KeyboardArrowRight } from "@material-ui/icons";
import Loading from "../../components/Misc/Loading";
import Status from "../../components/Misc/Status";
import Help from "../../components/Misc/Help";
import { editCompare, editDiscover } from "../../services/dashboard";
import LineChart from "../../components/Dashboard/LineChart";
import DiscoverDimension from "../../components/Dashboard/DiscoverDimension";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "fit-content",
    // padding: theme.spacing(0),
  },
  gridItem: {
    minWidth: "33.333333%",
    "& > *": {
      padding: theme.spacing(1),
    },
  },
  tablePaper: {
    overflowY: "scroll",
    overflowX: "hidden",
    height: "63.1vh",
    padding: theme.spacing(1),
  },
  distPaper: { height: "32vh" },
  giniPaper: {
    height: "44vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  propertiesPaper: { height: "28vh" },
  giniSubPaper: {
    height: "fit-content",
    width: "94%",
    padding: theme.spacing(1),
  },
  //charts
  giniChart: {
    paddingTop: theme.spacing(1),
    width: "97.5%",
    // height: "95%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  histogramChart: {
    paddingTop: theme.spacing(1),
    width: "100%",
    height: "90%",
  },
  horizontalbar: { width: "100%", height: "72%" },
  horizontalbarchart: { width: "100%", height: "100%" },
  card: {
    height: "14vh",
    // width: "100%",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "flex-start",
  },
  dimensionTable: {
    width: "100%",
    height: "97%",
  },

  // =====
  dashboardConfig: {
    height: "31vh",
    padding: theme.spacing(1),
    "& > * > * > *": {
      padding: theme.spacing(1),
    },
  },
}));

export default function Analysis(props) {
  const classes = useStyles();
  const { state, setState } = props;

  React.useEffect(() => {}, [state]);

  const applyFilter = (data) => {
    let temp = [];
    console.log(data);

    data.forEach((item) => {
      temp.push(item.id);
    });
    editDiscover(props.hash, temp, (r) => {
      if (r.success) {
        props.fetchData("discover");
        props.updateData((s) => ({
          ...s,
          notif: {
            open: true,
            message: "Dashboard Successfully Edited",
            severity: "success",
            action: () => {},
          },
        }));
      } else {
        props.updateData((s) => ({
          ...s,
          notif: {
            open: true,
            message: "Dashboard Edit Failed",
            severity: "error",
            action: () => {},
          },
        }));
      }
    });
  };

  const propertiesChart = () => {
    if (false) {
      const dataStacked = {
        labels: state.mappedProperties.labels.slice(0, 5),

        datasets: [
          {
            data: state.mappedProperties.valuesA.slice(0, 5),
            backgroundColor: theme.palette.itemA.main,
          },
          {
            data: state.mappedProperties.valuesB.slice(0, 5),
            backgroundColor: theme.palette.itemB.main,
          },
        ],
      };
      return (
        <React.Fragment>
          <HorizontalBarChart
            key={0}
            data={dataStacked}
            stacked
            classes={{
              root: classes.horizontalbar,
              ChartWrapper: classes.horizontalbarchart,
            }}
          />
          {/* <AllPropertiesModal
            key="modal-desc"
            data={{
              labels: tempLabels,
              values: tempValues,
              max: state.giniData.amount,
            }}
          /> */}
        </React.Fragment>
      );
    } else {
      return <Loading />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={1}
        direction="row"
        classes={{ root: classes.root }}
      >
        <Grid item xs={2}>
          <Paper className={classes.tablePaper}>
            <Grid
              container
              spacing={1}
              direction="column"
              style={{ height: "100%" }}
            >
              <Grid item>
                <Typography>
                  <Box fontWeight="bold">
                    DIMENSIONS{" "}
                    <Help
                      text={
                        <Typography>{`Select the piece of information (property) you would want to know more about.`}</Typography>
                      }
                    />
                  </Box>
                </Typography>
              </Grid>
              <Grid item style={{ height: "87%" }}>
                <DiscoverDimension
                  classes={{ root: classes.dimensionTable }}
                  appliedDimensions={state.dimensions}
                  onApply={applyFilter}
                  loading={state.loading.dimensions}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {true ? (
          <React.Fragment>
            <Grid item xs={4}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Paper
                  style={{
                    width: "100%",
                    height: "50%",
                    marginBottom: theme.spacing(1),
                  }}
                />
                <Paper style={{ width: "100%", flex: "1 1 auto" }} />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Paper
                  style={{
                    width: "100%",
                    height: "45%",
                    marginBottom: theme.spacing(1),
                  }}
                >
                  <Typography
                    component="div"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box fontWeight="bold">Property Frequency</Box>
                    <FormControl
                      variant="outlined"
                      size="small"
                      className={classes.formControl}
                    >
                      <Select defaultValue={0} onChange={() => {}}></Select>
                    </FormControl>
                  </Typography>
                  {propertiesChart()}
                </Paper>
                <Paper style={{ width: "100%", flex: "1 1 auto" }}>
                  <Typography component="div">
                    <Box fontWeight="bold">Property Distribution</Box>
                  </Typography>
                  {false ? (
                    <LineChart
                      percentage
                      data={{
                        labels: state.giniA.percentileData,
                        datasets: [
                          {
                            data: state.giniA.histogramData.map(
                              (num) =>
                                (num * 100) /
                                Math.max.apply(Math, state.giniA.histogramData)
                            ),
                            // label: "Africa",
                            borderColor: theme.palette.itemA.main,
                            backgroundColor: theme.palette.itemA.main,
                            fill: false,
                          },
                          {
                            data: state.giniB.histogramData.map(
                              (num) =>
                                (num * 100) /
                                Math.max.apply(Math, state.giniB.histogramData)
                            ),
                            // label: "Africa",
                            borderColor: theme.palette.itemB.main,
                            backgroundColor: theme.palette.itemB.main,
                            fill: false,
                          },
                        ],
                      }}
                      classes={{ ChartWrapper: classes.histogramChart }}
                    />
                  ) : (
                    <Loading />
                  )}
                </Paper>
              </div>
            </Grid>
          </React.Fragment>
        ) : (
          <Grid item xs={9}>
            <Typography>compare values</Typography>
          </Grid>
        )}
        <Grid item xs={2}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Paper
              style={{
                width: "100%",
                height: "50%",
                marginBottom: theme.spacing(1),
              }}
            />
            <Paper style={{ width: "100%", flex: "1 1 auto" }} />
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
