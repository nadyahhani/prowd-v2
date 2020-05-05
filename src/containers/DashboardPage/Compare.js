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
import DimensionTable from "../../components/Dashboard/DimensionTable";
import { editCompare } from "../../services/dashboard";

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
  histogram: {
    paddingTop: theme.spacing(1),
    width: "100%",
    height: "94%",
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

export default function Compare(props) {
  const classes = useStyles();
  const { state, setState } = props;

  React.useEffect(() => {}, [state]);

  const applyFilter = (data) => {
    alert("apply");
    let temp = [];
    let tempFilter = [];
    props.data.filters.forEach((item) => {
      let t = {};
      t[item.filterID] = item.filterValueID;
      tempFilter.push(t);
    });
    data.forEach((item) => {
      temp.push({
        propertyID: item.property.id,
        value: {
          item1: item.valueA.id,
          item2: item.valueB.id,
        },
      });
    });
    editCompare(
      props.hash,
      props.data.entity.entityID,
      tempFilter,
      temp,
      (r) => {
        console.log(r);
      }
    );
  };

  const propertiesChart = () => {
    return <Typography>TODO</Typography>;
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
                <Typography>DIMENSIONS</Typography>
              </Grid>
              <Grid item style={{ height: "87%" }}>
                <DimensionTable
                  classes={{ root: classes.dimensionTable }}
                  onApply={applyFilter}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {true ? (
          <React.Fragment>
            <Grid item xs={4}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Paper classes={{ root: classes.card }}>
                        {!state.loading.gini ? (
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
                                labels: ["A", "B"],
                                datasets: [
                                  {
                                    label: "# of Entities",
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
                    <Grid item xs={6}>
                      <Paper classes={{ root: classes.card }}>
                        {!state.loading.gini ? (
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
                        <Typography>A</Typography>
                        <Paper
                          variant="outlined"
                          elevation={0}
                          className={classes.giniSubPaper}
                        >
                          <Status>Imbalanced</Status>
                          {!state.loading.gini ? (
                            <GiniChart
                              data={state.giniData.data}
                              gini={state.giniData.gini}
                              insight={state.giniData.insight}
                              classes={{
                                root: classes.giniChart,
                                ChartWrapper: classes.giniChart,
                              }}
                            />
                          ) : (
                            <Loading />
                          )}
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>A</Typography>
                        <Paper
                          variant="outlined"
                          elevation={0}
                          className={classes.giniSubPaper}
                        >
                          <Status>Imbalanced</Status>
                          {!state.loading.gini ? (
                            <GiniChart
                              data={state.giniData.data}
                              gini={state.giniData.gini}
                              insight={state.giniData.insight}
                              classes={{
                                root: classes.giniChart,
                                ChartWrapper: classes.giniChart,
                              }}
                            />
                          ) : (
                            <Loading />
                          )}
                        </Paper>
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
                    {/* {!state.loading.gini ? (
                ) : (
                  <Loading />
                )} */}
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </React.Fragment>
        ) : (
          <Grid item xs={8}>
            <Typography>compare values</Typography>
          </Grid>
        )}
      </Grid>
    </ThemeProvider>
  );
}
