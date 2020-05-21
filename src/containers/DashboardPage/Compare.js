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
  ListItemIcon,
} from "@material-ui/core";
import GiniChart from "../../components/Dashboard/GiniChart";
import HorizontalBarChart from "../../components/Dashboard/HorizontalBarChart";
import theme from "../../theme";
import {
  AllIcon,
  AllAIcon,
  AllBIcon,
  ExclusiveAIcon,
  ExclusiveBIcon,
  IntersectionIcon,
  CompareIllustrationIcon,
} from "../../images/export";
import Loading from "../../components/Misc/Loading";
import Status from "../../components/Misc/Status";
import Help from "../../components/Misc/Help";
import DimensionTable from "../../components/Dashboard/DimensionTable";
import { editCompare } from "../../services/dashboard";
import LineChart from "../../components/Dashboard/LineChart";
import VennProperties from "../../components/Dashboard/VennProperties";
import ScatterLineChart from "../../components/Dashboard/ScatterLineChart";

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
    height: "43.7vh",
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
    width: "100%",
    height: "82%",
  },
  horizontalbar: { width: "100%", height: "72%" },
  horizontalbarchart: { width: "100%", height: "100%" },
  card: {
    // height: "14vh",
    flex: "1 1 auto",
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
  venn: {
    height: "fit-content",
    width: "fit-content",
  },
  outerGrid: {
    height: "100%",
  },
}));

export default function Compare(props) {
  const classes = useStyles();
  const { state, setState } = props;
  const effectNeeds = {
    load: props.data.loaded.compare,
    fetchData: props.fetchData,
    updateData: props.updateData,
  };

  React.useEffect(() => {
    if (!effectNeeds.load) {
      effectNeeds.fetchData("compare");
      effectNeeds.updateData((s) => ({
        ...s,
        loaded: { ...s.loaded, compare: true },
      }));
    }
  }, [state, effectNeeds]);

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
          xs={4}
          classes={{ root: classes.outerGrid }}
          style={{ display: "flex" }}
        >
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
                        <Typography>{`Compare A and B by selecting the property you want to base the comparison on, then determine the value of that property for both A and B. 
                    Click 'Apply' to set your changes. You can search an item of the profile using the search bar on top of this page to view possible property and values of the profile.`}</Typography>
                      }
                    />
                  </Box>
                </Typography>
              </Grid>
              <Grid item style={{ height: "87%" }}>
                <DimensionTable
                  classes={{ root: classes.dimensionTable }}
                  appliedDimensions={state.compareFilters}
                  onApply={applyFilter}
                  loading={state.loading.compareFilters}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {!props.data.entity ||
        state.loading.compareFilters ||
        state.compareFilters.length > 0 ? (
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
                <Grid
                  container
                  spacing={1}
                  style={{
                    // width: "100%",
                    height: "30%",
                    marginBottom: theme.spacing(1),
                  }}
                >
                  <Grid item xs={6} style={{ display: "flex" }}>
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
                            <Box fontWeight="bold">
                              Item Count{" "}
                              <Help text="The number of items of subclass A and subclass B" />
                            </Box>
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
                                  label: "Number of Items",
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
                          {/* <Button
                              color="primary"
                              endIcon={<KeyboardArrowRight />}
                              size="small"
                            >
                              read more
                            </Button> */}
                        </div>
                      ) : (
                        <Loading />
                      )}
                    </Paper>
                  </Grid>
                  <Grid item xs={6} style={{ display: "flex" }}>
                    <Paper classes={{ root: classes.card }}>
                      {!state.loading.properties ? (
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
                            <Box fontWeight="bold">
                              Distinct Properties{" "}
                              <Help text="The number of distinct properties of subclass A and subclass B, and the number of properties which are present in both of them" />
                            </Box>
                          </Typography>
                          <HorizontalBarChart
                            key={3}
                            simple
                            data={{
                              labels: [
                                `A: ${state.distinctProps.countA}`,
                                `B: ${state.distinctProps.countB}`,
                                `A and B: ${state.distinctProps.countAB}`,
                              ],
                              datasets: [
                                {
                                  label: "# of Distinct Properties",
                                  backgroundColor: [
                                    theme.palette.itemA.main,
                                    theme.palette.itemB.main,
                                    theme.palette.itemMerge.main,
                                  ],
                                  data: [
                                    state.distinctProps.countA,
                                    state.distinctProps.countB,
                                    state.distinctProps.countAB,
                                  ],
                                },
                              ],
                            }}
                            classes={{
                              root: classes.horizontalbar,
                              ChartWrapper: classes.horizontalbarchart,
                            }}
                          />
                          {/* <Button
                              color="primary"
                              endIcon={<KeyboardArrowRight />}
                              size="small"
                            >
                              read more
                            </Button> */}
                        </div>
                      ) : (
                        <Loading />
                      )}
                    </Paper>
                  </Grid>
                </Grid>

                <Paper
                  style={{
                    padding: theme.spacing(1),
                    flex: "1 1 auto",
                    height: "50%",
                  }}
                >
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
                      <Box fontWeight="bold">Subclass Imbalance</Box>
                      <Help
                        text={
                          <Typography>{`Comparing imbalances can show you which subclass is more even in terms
                     of the amount of information each items of the subclass possess.`}</Typography>
                        }
                      />
                    </Typography>
                  </div>
                  <Grid
                    container
                    direction="row"
                    spacing={1}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <Grid item xs={6}>
                      <Typography style={{ marginBottom: theme.spacing(1) }}>
                        A:{" "}
                        {state.compareFilters.length > 0 ||
                        !state.loading.compareFilters
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
                            simple
                            item="A"
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
                        <Loading
                          style={{ width: "100%", height: theme.spacing(30) }}
                        />
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <Typography style={{ marginBottom: theme.spacing(1) }}>
                        B:{" "}
                        {state.compareFilters.length > 0 ||
                        !state.loading.compareFilters
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
                            simple
                            item="B"
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
                        <Loading
                          style={{ width: "100%", height: theme.spacing(30) }}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Paper>
              </div>
            </Grid>
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
                    height: "40%",
                    marginBottom: theme.spacing(1),
                    padding: theme.spacing(1),
                  }}
                >
                  {state.loading.properties ||
                  state.loading.giniA ||
                  state.loading.giniB ? (
                    <Loading />
                  ) : (
                    <React.Fragment>
                      <Typography
                        component="div"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box fontWeight="bold">
                          Property Frequency{" "}
                          <Help
                            text={
                              <Typography>{`This shows whether the amount of information present in both A and B. You can switch the set operation on the right to see the properties present only in A or only in B and more.`}</Typography>
                            }
                          />
                        </Box>
                        <FormControl
                          variant="outlined"
                          size="small"
                          className={classes.formControl}
                        >
                          <Select
                            value={state.propertySort}
                            onChange={(e, child) => {
                              setState((s) => ({
                                ...s,
                                propertySort: child.props.value,
                              }));
                            }}
                          >
                            {[
                              { label: "All", icon: <AllIcon /> },
                              {
                                label: "Exclusive A",
                                icon: <ExclusiveAIcon />,
                              },
                              {
                                label: "Exclusive B",
                                icon: <ExclusiveBIcon />,
                              },
                              { label: "All A", icon: <AllAIcon /> },
                              { label: "All B", icon: <AllBIcon /> },
                              {
                                label: "Intersection",
                                icon: <IntersectionIcon />,
                              },
                            ].map((item, index) => (
                              <MenuItem key={index} value={index} dense>
                                <ListItemIcon className={classes.venn}>
                                  {item.icon}
                                </ListItemIcon>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Typography>
                      <VennProperties
                        properties={state.properties}
                        entityCount={{
                          entityA: state.giniA.amount,
                          entityB: state.giniB.amount,
                        }}
                        selected={state.propertySort}
                      />
                    </React.Fragment>
                  )}
                </Paper>

                <Paper
                  style={{
                    padding: theme.spacing(1),
                    flex: "1 1 auto",
                    height: "70%",
                  }}
                >
                  {!state.loading.giniA &&
                  !state.loading.giniB &&
                  state.giniA.newHistogramData &&
                  state.giniB.newHistogramData ? (
                    <React.Fragment>
                      <Typography component="div">
                        <Box fontWeight="bold">
                          Property Distribution{" "}
                          <Help
                            text={
                              <Typography>
                                {`A peak on the left indicates that most items of that subclass has a low number of information (properties),
                                 while a peak on the right indicates a high number of information which is ideal.`}
                              </Typography>
                            }
                          />
                        </Box>
                      </Typography>
                      <ScatterLineChart
                        hideLegend
                        data={{
                          datasets: [
                            {
                              raw: state.giniA.newHistogramData.raw_data,
                              data: state.giniA.newHistogramData.raw_data.map(
                                (num, index) => ({
                                  x:
                                    (index * 100) /
                                    (state.giniA.newHistogramData.raw_data
                                      .length -
                                      1),
                                  y: (num * 100) / state.giniA.amount,
                                })
                              ),
                              amount: state.giniA.amount,
                              borderColor: theme.palette.itemA.main,
                              backgroundColor: theme.palette.itemA.main,
                              fill: true,
                              showLine: true,
                            },
                            {
                              raw: state.giniB.newHistogramData.raw_data,
                              data: state.giniB.newHistogramData.raw_data.map(
                                (num, index) => ({
                                  x:
                                    (index * 100) /
                                    (state.giniB.newHistogramData.raw_data
                                      .length -
                                      1),
                                  y: (num * 100) / state.giniB.amount,
                                })
                              ),
                              amount: state.giniA.amount,
                              borderColor: theme.palette.itemB.main,
                              backgroundColor: theme.palette.itemB.main,
                              fill: true,
                              showLine: true,
                            },
                          ],
                        }}
                        // maxValue={100}
                        classes={{ ChartWrapper: classes.histogramChart }}
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
            xs={8}
            style={{
              height: "60vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h2">
              Compare two subclasses of the Profile
            </Typography>
            <CompareIllustrationIcon />
            {props.data.entity && props.data.entity.entityID !== "Q5" ? (
              <Typography
                style={{
                  width: theme.spacing(65),
                  marginTop: `-${theme.spacing(3)}px`,
                  textAlign: "justify",
                }}
              >
                <b>The above example is to compare humans.</b> This example
                compares writers and artists. Select properties and values which
                corresponds to {props.data.entity.entityLabel} (
                {props.data.entity.entityID}) which you can see in the Property
                Frequency section of the Profile tab .
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
