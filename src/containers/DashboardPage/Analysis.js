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
import {
  AllIcon,
  AllAIcon,
  AllBIcon,
  ExclusiveAIcon,
  ExclusiveBIcon,
  IntersectionIcon,
} from "../../images/export";
import Loading from "../../components/Misc/Loading";
import Status from "../../components/Misc/Status";
import Help from "../../components/Misc/Help";
import { editCompare } from "../../services/dashboard";
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
    height: "100%",
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
    data.forEach((item) => {
      temp.push({
        propertyID: item.property.id,
        value: {
          item1: item.valueA.id,
          item2: item.valueB.id,
        },
      });
    });
    editCompare(props.hash, temp, (r) => {
      if (r.success) {
        props.fetchData("compare");
      }
    });
  };

  const propertiesChart = () => {
    if (!state.loading.properties) {
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
        <Grid item xs={3}>
          <Paper className={classes.tablePaper}>
            <Grid
              container
              spacing={1}
              direction="column"
              style={{ height: "100%" }}
            >
              <Grid item>
                <Typography>DIMENSIONS</Typography>
              </Grid>
              <Grid item style={{ height: "87%" }}>
                <DiscoverDimension
                  classes={{ root: classes.dimensionTable }}
                  appliedDimensions={[]}
                  onApply={applyFilter}
                  loading={false}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {false ? (
          <React.Fragment>
            <Grid item xs={4}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Paper classes={{ root: classes.card }}>
                        {!state.loading.giniA && !state.loading.giniB ? (
                          <div style={{ width: "100%", height: "100%" }}>
                            <Typography
                              component="div"
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Box fontWeight="bold">Entities</Box>
                            </Typography>
                            <HorizontalBarChart
                              key={3}
                              simple
                              data={{
                                labels: [
                                  `A: ${state.giniA.amount}`,
                                  `B: ${state.giniB.amount}`,
                                ],
                                datasets: [
                                  {
                                    label: "# of Entities",
                                    backgroundColor: [
                                      theme.palette.itemA.main,
                                      theme.palette.itemB.main,
                                    ],
                                    data: [
                                      state.giniA.amount,
                                      state.giniB.amount,
                                    ],
                                  },
                                ],
                              }}
                              classes={{
                                root: classes.horizontalbar,
                                ChartWrapper: classes.horizontalbarchart,
                              }}
                            />
                            <Button
                              color="primary"
                              endIcon={<KeyboardArrowRight />}
                              size="small"
                            >
                              read more
                            </Button>
                          </div>
                        ) : (
                          <Loading />
                        )}
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper classes={{ root: classes.card }}>
                        {!state.loading.giniA ? (
                          <div style={{ width: "100%", height: "100%" }}>
                            <Typography
                              component="div"
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Box fontWeight="bold">Distinct Properties</Box>
                            </Typography>
                            <HorizontalBarChart
                              key={3}
                              simple
                              data={{
                                labels: ["A", "B"],
                                datasets: [
                                  {
                                    label: "# of Distinct Properties",
                                    backgroundColor: [
                                      theme.palette.itemA.main,
                                      theme.palette.itemB.main,
                                    ],
                                    data: [10, 20],
                                  },
                                ],
                              }}
                              max={20}
                              classes={{
                                root: classes.horizontalbar,
                                ChartWrapper: classes.horizontalbarchart,
                              }}
                            />
                            <Button
                              color="primary"
                              endIcon={<KeyboardArrowRight />}
                              size="small"
                            >
                              read more
                            </Button>
                          </div>
                        ) : (
                          <Loading />
                        )}
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} classes={{ root: classes.gridItem }}>
                  <Paper classes={{ root: classes.giniPaper }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography
                        component="div"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box fontWeight="bold">Gini Coefficient</Box>
                        <Help text="//TODO" />
                      </Typography>
                    </div>
                    <Grid
                      container
                      direction="row"
                      spacing={1}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <Grid item xs={6}>
                        <Typography>
                          A:{" "}
                          {state.compareFilters.length > 0
                            ? state.compareFilters
                                .map((item) => `${item.valueA.label}`)
                                .join("-")
                            : "-"}
                        </Typography>
                        {!state.loading.giniA ? (
                          <Paper
                            variant="outlined"
                            elevation={0}
                            className={classes.giniSubPaper}
                          >
                            <Status value={state.giniA.gini}>Imbalanced</Status>

                            <GiniChart
                              labels={state.giniA.percentileData}
                              data={state.giniA.data}
                              gini={state.giniA.gini}
                              insight={state.giniA.insight}
                              classes={{
                                root: classes.giniChart,
                                ChartWrapper: classes.giniChart,
                              }}
                            />
                          </Paper>
                        ) : (
                          <Loading />
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          B:{" "}
                          {state.compareFilters.length > 0
                            ? state.compareFilters
                                .map((item) => `${item.valueB.label}`)
                                .join("-")
                            : "-"}
                        </Typography>
                        {!state.loading.giniB ? (
                          <Paper
                            variant="outlined"
                            elevation={0}
                            className={classes.giniSubPaper}
                          >
                            <Status value={state.giniB.gini}>Imbalanced</Status>
                            <GiniChart
                              labels={state.giniB.percentileData}
                              data={state.giniB.data}
                              gini={state.giniB.gini}
                              insight={state.giniB.insight}
                              classes={{
                                root: classes.giniChart,
                                ChartWrapper: classes.giniChart,
                              }}
                            />
                          </Paper>
                        ) : (
                          <Loading />
                        )}
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container spacing={1}>
                <Grid item xs={12} classes={{ root: classes.gridItem }}>
                  <Paper classes={{ root: classes.propertiesPaper }}>
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
                        <Select
                          value={state.propertySort}
                          defaultValue={0}
                          onChange={(e, child) => {
                            setState((s) => ({
                              ...s,
                              propertySort: child.props.value,
                            }));
                          }}
                        >
                          <MenuItem value={0}>
                            <ListItemIcon>
                              <AllIcon />
                            </ListItemIcon>
                            All
                          </MenuItem>
                          <MenuItem value={1}>
                            <ListItemIcon>
                              <ExclusiveAIcon />
                            </ListItemIcon>
                            Exclusive A
                          </MenuItem>
                          <MenuItem value={2}>
                            <ListItemIcon>
                              <ExclusiveBIcon />
                            </ListItemIcon>
                            Exclusive B
                          </MenuItem>
                          <MenuItem value={3}>
                            <ListItemIcon>
                              <AllAIcon />
                            </ListItemIcon>
                            All A
                          </MenuItem>
                          <MenuItem value={4}>
                            <ListItemIcon>
                              <AllBIcon />
                            </ListItemIcon>
                            All B
                          </MenuItem>
                          <MenuItem value={5}>
                            <ListItemIcon>
                              <IntersectionIcon />
                            </ListItemIcon>
                            Intersection
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Typography>
                    {propertiesChart()}
                  </Paper>
                </Grid>
                <Grid item xs={12} classes={{ root: classes.gridItem }}>
                  <Paper classes={{ root: classes.distPaper }}>
                    <Typography component="div">
                      <Box fontWeight="bold">Property Distribution</Box>
                    </Typography>
                    {!state.loading.giniA && !state.loading.giniB ? (
                      <LineChart
                        percentage
                        data={{
                          labels: state.giniA.percentileData,
                          datasets: [
                            {
                              data: state.giniA.histogramData.map(
                                (num) =>
                                  (num * 100) /
                                  Math.max.apply(
                                    Math,
                                    state.giniA.histogramData
                                  )
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
                                  Math.max.apply(
                                    Math,
                                    state.giniB.histogramData
                                  )
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
                </Grid>
              </Grid>
            </Grid>
          </React.Fragment>
        ) : (
          <Grid item xs={9}>
            <Typography>compare values</Typography>
          </Grid>
        )}
      </Grid>
    </ThemeProvider>
  );
}
