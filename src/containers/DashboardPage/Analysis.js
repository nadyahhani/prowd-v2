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
} from "@material-ui/core";
import HorizontalBarChart from "../../components/Dashboard/HorizontalBarChart";
import theme from "../../theme";
import Loading from "../../components/Misc/Loading";
import Help from "../../components/Misc/Help";
import { editDiscover } from "../../services/dashboard";
import LineChart from "../../components/Dashboard/LineChart";
import DiscoverDimension from "../../components/Dashboard/DiscoverDimension";
import AllPropertiesModal from "../../components/Dashboard/AllPropertiesModal";
import { DiscoverIllustration } from "../../images/export";
import DistributionCustomize from "../../components/Dashboard/DistributionCustomize";
import { selectDistribution } from "../../global";

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
    // height: "63.1vh",
    flex: "1 1 auto",
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
    height: "92%",
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
  const effectNeeds = {
    load: props.data.loaded.discover,
    fetchData: props.fetchData,
    updateData: props.updateData,
  };
  React.useEffect(() => {
    if (!effectNeeds.load) {
      effectNeeds.fetchData("discover");
      effectNeeds.updateData((s) => ({
        ...s,
        loaded: { ...s.loaded, discover: true },
      }));
    }
  }, [state, effectNeeds]);

  const applyFilter = (config) => {
    const data = config.data;
    let temp = [];

    data.forEach((item) => {
      temp.push(item.id);
    });
    console.log(config);

    if (!config.pull) {
      setState((s) => ({ ...s, loading: { ...s.loading, gini: true } }));
    }
    editDiscover(props.hash, temp, (r) => {
      if (r.success) {
        if (config.pull) {
          props.fetchData("discover");
        } else {
          setState((s) => {
            const filtered = [...s.gini].filter(
              (item) =>
                item.amount >= config.limit[0] && item.amount <= config.limit[1]
            );
            return {
              ...s,
              shown: filtered,
              distributions: selectDistribution(filtered),
              limit: config.limit,
              loading: { ...s.loading, gini: false },
            };
          });
        }
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
        if (!config.pull) {
          setState((s) => ({ ...s, loading: { ...s.loading, gini: false } }));
        }
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
      const sorted = [...state.shown].sort((b, a) => {
        if (state.sortCount === 0) {
          if (a.amount > b.amount) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (b.amount > a.amount) {
            return 1;
          } else {
            return -1;
          }
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
            label: "Number of Items",
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
              Item Count{" "}
              <Help
                text={
                  <Typography>{`Number of items of each subclass.`}</Typography>
                }
              />
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
                    value={state.sortCount}
                    onChange={(e, child) => {
                      setState((s) => ({ ...s, sortCount: child.props.value }));
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
            key={`item-${state.sortCount}`}
            data={dataTemp}
            classes={{
              root: classes.horizontalbar,
              ChartWrapper: classes.horizontalbarchart,
            }}
            max={state.maxAmount}
          />
          <AllPropertiesModal
            key="modal-desc"
            data={{
              labels: labels,
              values: values,
              max: state.maxAmount,
            }}
            title="Number of items of All Subclasses"
            label="Number of items with this value"
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
      const sorted = [...state.shown].sort((b, a) => {
        if (state.sortGini === 0) {
          if (a.gini > b.gini) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (b.gini > a.gini) {
            return 1;
          } else {
            return -1;
          }
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
            <Box fontWeight="bold">
              Imbalance Score{" "}
              <Help
                text={
                  <Typography>{`Gini coefficient for each subclass. Higher scores indicates a less imbalanced subclass.`}</Typography>
                }
              />
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
                    value={state.sortGini}
                    onChange={(e, child) => {
                      setState((s) => ({ ...s, sortGini: child.props.value }));
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
            key={`gini-${state.sortGini}`}
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
            title="Imbalance Score of All Subclasses"
            label="Imbalance Score (Gini Coefficient) for this value"
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

      const sorted = [...state.shown].sort((b, a) => {
        if (state.sortProps === 0) {
          if (
            a.statistics.average_distinct_properties >
            b.statistics.average_distinct_properties
          ) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (
            b.statistics.average_distinct_properties >
            a.statistics.average_distinct_properties
          ) {
            return 1;
          } else {
            return -1;
          }
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
              Average Number of Properties{" "}
              <Help
                text={
                  <Typography>{`The number of pieces of information (property) the items of the subclasses have.`}</Typography>
                }
              />
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
                    value={state.sortProps}
                    onChange={(e, child) => {
                      setState((s) => ({ ...s, sortProps: child.props.value }));
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
            key={`props-${state.sortProps}`}
            data={dataTemp}
            classes={{
              root: classes.horizontalbar,
              ChartWrapper: classes.horizontalbarchart,
            }}
            max={state.sortProps === 0 ? values[0] : values[values.length - 1]}
          />
          <AllPropertiesModal
            key="modal-desc"
            data={{
              labels: labels,
              values: values,
              max:
                state.sortProps === 0 ? values[0] : values[values.length - 1],
            }}
            title="Average Number of Properties of Items from All Subclasses"
            label="Average number of properties for items of this value"
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
        <Grid
          item
          xs={3}
          classes={{ root: classes.outerGrid }}
          style={{ display: "flex" }}
        >
          <Paper className={classes.tablePaper}>
            <DiscoverDimension
              classes={{ root: classes.dimensionTable }}
              appliedDimensions={{
                data: state.dimensions,
                limit: state.limit,
                maxLimit: state.maxAmount,
              }}
              onApply={applyFilter}
              loading={state.loading.dimensions}
            />
          </Paper>
        </Grid>
        {props.data.entity &&
        !state.loading.dimensions &&
        state.dimensions.length > 0 ? (
          <React.Fragment>
            <Grid item xs={4} classes={{ root: classes.outerGrid }}>
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
                        <Box fontWeight="bold">
                          Number of Property Distribution{" "}
                          <Help
                            text={
                              <Typography>{`The distribution shape of several subclasses. You can customize and select the classes shown in this chart.`}</Typography>
                            }
                          />
                        </Box>
                      </Typography>
                      <LineChart
                      multiple
                        data={{
                          labels: [
                            "0",
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
                            ...item,
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
                        allData={state.shown}
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
            {props.data.entity && props.data.entity.entityID !== "Q5" ? (
              <Typography
                style={{
                  width: theme.spacing(65),
                  marginTop: `-${theme.spacing(4)}px`,
                  textAlign: "justify",
                }}
              >
                <b>The above example is to discover facts about humans.</b>{" "}
                Select properties which corresponds to{" "}
                {props.data.entity.entityLabel} ({props.data.entity.entityID})
                which you can see in the Property Frequency section of the
                Profile tab.
              </Typography>
            ) : (
              <Typography
                style={{
                  width: theme.spacing(65),
                  marginTop: `-${theme.spacing(4)}px`,
                  textAlign: "justify",
                }}
              >
                <Loading variant="text" />
              </Typography>
            )}
          </Grid>
        )}
      </Grid>
    </ThemeProvider>
  );
}
