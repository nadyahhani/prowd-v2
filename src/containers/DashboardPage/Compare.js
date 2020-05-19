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
  CompareIllustrationIcon,
} from "../../images/export";
import Loading from "../../components/Misc/Loading";
import Status from "../../components/Misc/Status";
import Help from "../../components/Misc/Help";
import DimensionTable from "../../components/Dashboard/DimensionTable";
import { editCompare } from "../../services/dashboard";
import LineChart from "../../components/Dashboard/LineChart";
import VennProperties from "../../components/Dashboard/VennProperties";

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
    overflow: "hidden",
    height: "63.1vh",
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
    paddingTop: theme.spacing(1),
    width: "100%",
    height: "85%",
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

  venn: {
    height: "fit-content",
    width: "fit-content",
  },
}));

export default function Compare(props) {
  const classes = useStyles();
  const { state, setState } = props;

  React.useEffect(() => {
    if (!props.data.loaded.compare) {
      props.fetchData("compare");
      props.updateData((s) => ({
        ...s,
        loaded: { ...s.loaded, compare: true },
      }));
    }
  }, [state, props.data.loaded.compare, props.fetchData, props.updateData]);

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
        <Grid item xs={4}>
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
                    Click 'Apply' to set your changes.`}</Typography>
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
        {state.loading.compareFilters || state.compareFilters.length > 0 ? (
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
                              <Box fontWeight="bold">Item Count</Box>
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
                    <Grid item xs={6}>
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
                              <Box fontWeight="bold">Distinct Properties</Box>
                            </Typography>
                            <HorizontalBarChart
                              key={3}
                              simple
                              data={{
                                labels: [
                                  `A: ${state.distinctProps.countA}`,
                                  `B: ${state.distinctProps.countB}`,
                                  `Shared: ${state.distinctProps.countAB}`,
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
                        <Box fontWeight="bold">Subtopic Imbalance</Box>
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
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container spacing={1}>
                <Grid item xs={12} classes={{ root: classes.gridItem }}>
                  <Paper classes={{ root: classes.propertiesPaper }}>
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
                                <Typography>{`This shows whether a particular information about the items are only present in a subclass. You can switch whether you want to see all 
                            properties or only those presented in A or B by selecting the set operation on the right.`}</Typography>
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
                </Grid>
                <Grid item xs={12} classes={{ root: classes.gridItem }}>
                  <Paper classes={{ root: classes.distPaper }}>
                    {!state.loading.giniA && !state.loading.giniB ? (
                      <React.Fragment>
                        <Typography component="div">
                          <Box fontWeight="bold">
                            Property Distribution{" "}
                            <Help
                              text={
                                <Typography>
                                  {`Comparing distributions can show you whether
                              items of a subclass have an uneven amount of
                              information compared to the other subclass.`}
                                </Typography>
                              }
                            />
                          </Box>
                        </Typography>
                        <LineChart
                          percentage
                          data={{
                            labels: state.giniA.percentileData,
                            datasets: [
                              {
                                data: state.giniA.histogramData
                                  ? state.giniA.histogramData.map(
                                      (num) => (num * 100) / state.giniA.amount
                                    )
                                  : [],
                                borderColor: theme.palette.itemA.main,
                                backgroundColor: theme.palette.itemA.main,
                                fill: true,
                              },
                              {
                                data: state.giniB.histogramData
                                  ? state.giniB.histogramData.map(
                                      (num) => (num * 100) / state.giniB.amount
                                    )
                                  : [],
                                borderColor: theme.palette.itemB.main,
                                backgroundColor: theme.palette.itemB.main,
                                fill: true,
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
                </Grid>
              </Grid>
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
          </Grid>
        )}
      </Grid>
    </ThemeProvider>
  );
}
