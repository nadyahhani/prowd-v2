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
import AllPropertiesModal from "../../components/Dashboard/AllPropertiesModal";
import { DiscoverIllustration } from "../../images/export";
import DistributionCustomize from "../../components/Dashboard/DistributionCustomize";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "66.3vh",
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
    height: "78%",
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
  outerGrid: {
    height: "100%",
  },
}));

export default function Analysis(props) {
  const classes = useStyles();
  const { state, setState } = props;

  React.useEffect(() => {
    if (!props.data.loaded.discover) {
      props.fetchData("discover");
      props.updateData((s) => ({
        ...s,
        loaded: { ...s.loaded, discover: true },
      }));
    }
  }, [state, props.data.loaded.discover, props.fetchData, props.updateData]);

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
  function itemCountChart() {
    if (!state.loading.gini) {
      let labels = [];
      let values = [];
      const sorted = [...state.gini].sort((b, a) => {
        if (a.amount > b.amount) {
          return 1;
        } else {
          return -1;
        }
      });
      sorted.forEach((item) => {
        labels.push(
          `${
            item.analysis_info.item_1_label
              ? item.analysis_info.item_1_label
              : ""
          }${
            item.analysis_info.item_2_label
              ? `-${item.analysis_info.item_2_label}`
              : ""
          }${
            item.analysis_info.item_3_label
              ? `-${item.analysis_info.item_3_label}`
              : ""
          }: ${item.amount}`
        );
        values.push(item.amount);
      });
      const dataTemp = {
        labels: [...labels].splice(0, 5),
        datasets: [
          {
            label: "Number of Entities",
            data: [...values].splice(0, 5),
            backgroundColor: theme.palette.chart.main,
          },
        ],
      };
      return (
        <React.Fragment>
          <Typography
            component="div"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box fontWeight="bold">Item Count </Box>
            <Typography
              component="div"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "fit-content",
              }}
            >
              <Box>
                <FormControl
                  variant="outlined"
                  size="small"
                  className={classes.formControl}
                >
                  <Select
                    value={0}
                    onChange={() => {
                      //TODO
                    }}
                  >
                    <MenuItem value={0}>Descending</MenuItem>
                    <MenuItem value={1}>Ascending</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Typography>
          </Typography>
          <HorizontalBarChart
            key={"item-0"}
            data={dataTemp}
            classes={{
              root: classes.horizontalbar,
              ChartWrapper: classes.horizontalbarchart,
            }}
            // max={10}
          />
          <AllPropertiesModal
            key="modal-desc"
            data={{
              labels: labels,
              values: values,
              // max: 10,
            }}
          />
        </React.Fragment>
      );
    } else {
      return <Loading />;
    }
  }
  function giniChart() {
    if (!state.loading.gini) {
      let labels = [];
      let values = [];
      const sorted = [...state.gini].sort((b, a) => {
        if (a.gini > b.gini) {
          return 1;
        } else {
          return -1;
        }
      });
      sorted.forEach((item) => {
        labels.push(
          `${
            item.analysis_info.item_1_label
              ? item.analysis_info.item_1_label
              : ""
          }${
            item.analysis_info.item_2_label
              ? `-${item.analysis_info.item_2_label}`
              : ""
          }${
            item.analysis_info.item_3_label
              ? `-${item.analysis_info.item_3_label}`
              : ""
          }: ${item.gini}`
        );
        values.push(item.gini);
      });
      const dataTemp = {
        labels: [...labels].splice(0, 5),
        datasets: [
          {
            label: "Gini Coefficient",
            data: [...values].splice(0, 5),
            backgroundColor: theme.palette.chart.main,
          },
        ],
      };
      return (
        <React.Fragment>
          <Typography
            component="div"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box fontWeight="bold">Imbalance Score</Box>
            <Typography
              component="div"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "fit-content",
              }}
            >
              <Box>
                <FormControl
                  variant="outlined"
                  size="small"
                  className={classes.formControl}
                >
                  <Select
                    value={0}
                    onChange={() => {
                      //TODO
                    }}
                  >
                    <MenuItem value={0}>Descending</MenuItem>
                    <MenuItem value={1}>Ascending</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Typography>
          </Typography>
          <HorizontalBarChart
            key={"gini-0"}
            data={dataTemp}
            classes={{
              root: classes.horizontalbar,
              ChartWrapper: classes.horizontalbarchart,
            }}
            max={1}
          />
          <AllPropertiesModal
            key="modal-desc"
            data={{
              labels: labels,
              values: values,
              max: 1,
            }}
          />
        </React.Fragment>
      );
    } else {
      return <Loading />;
    }
  }

  function propertyChart() {
    if (!state.loading.gini) {
      let labels = [];
      let values = [];

      const sorted = [...state.gini].sort((b, a) => {
        if (
          a.statistics.average_distinct_properties >
          b.statistics.average_distinct_properties
        ) {
          return 1;
        } else {
          return -1;
        }
      });
      sorted.forEach((item) => {
        labels.push(
          `${
            item.analysis_info.item_1_label
              ? item.analysis_info.item_1_label
              : ""
          }${
            item.analysis_info.item_2_label
              ? `-${item.analysis_info.item_2_label}`
              : ""
          }${
            item.analysis_info.item_3_label
              ? `-${item.analysis_info.item_3_label}`
              : ""
          }: ${item.statistics.average_distinct_properties}`
        );
        values.push(item.statistics.average_distinct_properties);
      });
      const dataTemp = {
        labels: [...labels].splice(0, 5),
        datasets: [
          {
            label: "Average Distinct Properties",
            data: [...values].splice(0, 5),
            backgroundColor: theme.palette.chart.main,
          },
        ],
      };
      return (
        <React.Fragment>
          <Typography
            component="div"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box fontWeight="bold">
              Property Frequency{" "}
              {/* <Help
                        text={
                          <Typography>{`For every distinct property, the number of items which possess that property is summed up. 
                      You can see which properties are the most common ones, and which are not as common.`}</Typography>
                        }
                      /> */}
            </Box>
            <Typography
              component="div"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "fit-content",
              }}
            >
              <Box>
                <FormControl
                  variant="outlined"
                  size="small"
                  className={classes.formControl}
                >
                  <Select
                    value={0}
                    onChange={() => {
                      //TODO
                    }}
                  >
                    <MenuItem value={0}>Descending</MenuItem>
                    <MenuItem value={1}>Ascending</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Typography>
          </Typography>
          <HorizontalBarChart
            key={"gini-0"}
            data={dataTemp}
            classes={{
              root: classes.horizontalbar,
              ChartWrapper: classes.horizontalbarchart,
            }}
          />
          <AllPropertiesModal
            key="modal-desc"
            data={{
              labels: labels,
              values: values,
            }}
          />
        </React.Fragment>
      );
    } else {
      return <Loading />;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={1}
        direction="row"
        classes={{ root: classes.root }}
      >
        <Grid item xs={3} classes={{ root: classes.outerGrid }}>
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
        {state.loading.dimensions || state.dimensions.length > 0 ? (
          <React.Fragment>
            <Grid item xs classes={{ root: classes.outerGrid }}>
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
                    // width: "100%",
                    height: "45%",
                    marginBottom: theme.spacing(1),
                    padding: theme.spacing(1),
                  }}
                >
                  {itemCountChart()}
                </Paper>
                <Paper
                  style={{
                    padding: theme.spacing(1),
                    flex: "1 1 auto",
                    height: "45%",
                  }}
                >
                  {giniChart()}
                </Paper>
              </div>
            </Grid>
            <Grid item xs={5} classes={{ root: classes.outerGrid }}>
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
                    // width: "100%",
                    height: "45%",
                    marginBottom: theme.spacing(1),
                    padding: theme.spacing(1),
                  }}
                >
                  {propertyChart()}
                </Paper>
                <Paper
                  style={{
                    flex: "1 1 auto",
                    height: "45%",
                    padding: theme.spacing(1),
                  }}
                >
                  {!state.loading.gini ? (
                    <React.Fragment>
                      <Typography component="div">
                        <Box fontWeight="bold">Property Distribution</Box>
                      </Typography>
                      <LineChart
                        percentage
                        data={{
                          labels: [
                            "10",
                            "20",
                            "30",
                            "40",
                            "50",
                            "60",
                            "70",
                            "80",
                            "90",
                            "100",
                          ],
                          datasets: state.distributions.map((item) => ({
                            data: item.data,
                            // label: "Africa",
                            borderColor: item.color,
                            fill: false,
                          })),
                        }}
                        // max={100}
                        classes={{ ChartWrapper: classes.histogramChart }}
                      />
                      <DistributionCustomize
                        data={state.distributions}
                        allData={state.gini}
                      />
                    </React.Fragment>
                  ) : (
                    <Loading />
                  )}
                </Paper>
              </div>
            </Grid>
          </React.Fragment>
        ) : (
          <Grid
            item
            xs
            style={{
              height: "60vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h2">
              Discover facts about all subclasses of the Profile
            </Typography>
            <DiscoverIllustration />
          </Grid>
        )}
      </Grid>
    </ThemeProvider>
  );
}
