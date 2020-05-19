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
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  ThemeProvider,
} from "@material-ui/core";
import VirtualizedTable from "../../components/Dashboard/VirtualizedTable";
import GiniChart from "../../components/Dashboard/GiniChart";
import theme from "../../theme";
import {
  WarningOutlined as WarningOutlinedIcon,
  SaveAlt as SaveAltIcon,
  Fullscreen as FullscreenIcon,
  Search,
} from "@material-ui/icons";
import Loading from "../../components/Misc/Loading";
import Status from "../../components/Misc/Status";
import Help from "../../components/Misc/Help";
import LineChart from "../../components/Dashboard/LineChart";
import { getGiniEntity } from "../../services/dashboard";
import { filterEntities } from "../../global";
import PercentageSwitch from "../../components/Inputs/PercentageSwitch";
import ProfileProperties from "../../components/Dashboard/ProfileProperties";
import TableSort from "../../components/Misc/TableSort";
import Onboarding from "../../components/Misc/Onboarding";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "fit-content",
    // padding: theme.spacing(0),
  },
  columnGrid: { height: "100%" },
  gridItem: {
    minWidth: "33.333333%",
    "& > *": {
      padding: theme.spacing(1),
    },
  },
  tablePaper: {
    overflowY: "scroll",
    height: "fit-content",
  },
  tablePaperLoad: {
    overflowY: "hidden",
    height: "65vh",
  },
  distPaper: { height: "32vh" },
  giniPaper: {
    height: "45.85vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  propertiesPaper: { height: "28vh" },
  cardsPaper: { height: "40vh" },

  //charts
  giniChart: {
    paddingTop: theme.spacing(1),
    width: "40vh",
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
  card: {
    height: "12vh",
    // width: "100%",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "flex-start",
  },
  table: {
    height: "59vh",
  },
  tableToolbar: { height: "fit-content", marginTop: theme.spacing(1) },

  // =====
  dashboardConfig: {
    height: "31vh",
    padding: theme.spacing(1),
    "& > * > * > *": {
      padding: theme.spacing(1),
    },
  },
}));

const tableColumns = [
  {
    width: 80,
    label: "Percentile",
    dataKey: "percentile",
    numeric: true,
  },
  {
    width: 200,
    label: "Item",
    dataKey: "label",
    linkKey: "entityLink",
    link: true,
  },
  {
    width: 100,
    label: "# of Properties",
    dataKey: "propertyCount",
    numeric: true,
  },
  {
    width: 200,
    label: "Select a Property",
    dataKey: "entityProperties",
    dropdown: true,
    numeric: true,
  },
];

export default function Profile(props) {
  const classes = useStyles();
  const { state, setState } = props;

  React.useEffect(() => {
    if (!props.data.loaded.profile) {
      props.fetchData("profile");
      props.updateData((s) => ({
        ...s,
        loaded: { ...s.loaded, profile: true },
      }));
    }
  }, [state, props.data.loaded.profile, props.fetchData, props.updateData]);

  const checkProperty = (value) => {
    const id = value.slice(value.indexOf("(") + 1, value.indexOf(")"));
    setState((s) => ({
      ...s,
      loading: { ...s.loading, checkProperty: true },
    }));
    getGiniEntity(props.hash, id, (r) => {
      if (r.success) {
        setState((s) => ({
          ...s,
          entities: [...r.entities].reverse(),
          loading: { ...s.loading, checkProperty: false },
        }));
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <Onboarding /> */}
      <Grid
        container
        spacing={1}
        direction="row"
        classes={{ root: classes.root }}
      >
        <Grid item xs={5} classes={{ root: classes.columnGrid }}>
          <Grid container direction="column" spacing={1}>
            <Grid item xs={12} style={{ marginBottom: `-8vh` }}>
              <Paper
                className={
                  state.loading.gini || state.loading.properties
                    ? classes.tablePaperLoad
                    : classes.tablePaper
                }
              >
                {state.loading.gini || state.loading.properties ? (
                  <Loading />
                ) : (
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <Grid
                      container
                      className={classes.tableToolbar}
                      spacing={1}
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={7}>
                        <TextField
                          placeholder="Search for item..."
                          size="small"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Search />
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) => {
                            let temp = e.target.value;
                            setState((s) => ({ ...s, tableSearch: temp }));
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TableSort
                          onChange={(val) =>
                            setState((s) => ({ ...s, tableSort: val }))
                          }
                        />
                      </Grid>
                      <Grid item>
                        <IconButton size="small" edge="end">
                          <SaveAltIcon color="primary" />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton size="small" edge="end">
                          <FullscreenIcon color="primary" />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <div className={classes.table}>
                      <VirtualizedTable
                        rows={filterEntities(
                          state.entities,
                          state.tableSearch,
                          state.tableSort
                        )}
                        columns={tableColumns}
                        rowHeight={50}
                        headerHeight={60}
                        selectProperty={checkProperty}
                        options={state.mappedProperties.labels}
                        loading={state.loading.checkProperty}
                      />
                    </div>
                  </div>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} classes={{ root: classes.columnGrid }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Paper classes={{ root: classes.card }}>
                    {!state.loading.gini ? (
                      <React.Fragment>
                        <Typography variant="h1" component="div">
                          <Box fontWeight="medium">
                            {state.giniData.amount
                              ? state.giniData.amount
                              : state.entities.length}
                          </Box>
                        </Typography>
                        <Typography
                          component="div"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box fontWeight="bold">Items</Box>
                          {state.giniData.exceedLimit ? (
                            <Tooltip
                              title="This number is limited and is only a sample of the whole population"
                              aria-label="warning"
                            >
                              <IconButton
                                color="primary"
                                size="small"
                                edge="end"
                              >
                                <WarningOutlinedIcon
                                  style={{ color: theme.palette.warning.main }}
                                />
                              </IconButton>
                            </Tooltip>
                          ) : null}
                        </Typography>
                      </React.Fragment>
                    ) : (
                      <Loading />
                    )}
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper classes={{ root: classes.card }}>
                    {!state.loading.properties ? (
                      <React.Fragment>
                        <Typography variant="h1" component="div">
                          <Box fontWeight="medium">
                            {state.mappedProperties.labels.length}
                          </Box>
                        </Typography>
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
                      </React.Fragment>
                    ) : (
                      <Loading />
                    )}
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} classes={{ root: classes.gridItem }}>
              <Paper classes={{ root: classes.giniPaper }}>
                {!state.loading.gini ? (
                  <React.Fragment>
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
                        <Box fontWeight="bold">Topic Imbalance</Box>
                        <Help
                          text={
                            <Typography component="div">
                              {`A higher imbalance score indicates that items of the 
                          profile have less information (property) compared to other items of the same profile.
                           The imbalance rate is based on the Gini coefficient.`}
                              <Box fontWeight="bold">{`Click for more info...`}</Box>
                            </Typography>
                          }
                        />
                      </Typography>

                      <Status value={state.giniData.gini}>Imbalanced</Status>
                    </div>
                    <GiniChart
                      labels={state.giniData.percentileData}
                      data={state.giniData.data}
                      gini={state.giniData.gini}
                      actual={state.giniData.each_amount}
                      insight={state.giniData.insight}
                      classes={{
                        root: classes.giniChart,
                        ChartWrapper: classes.giniChart,
                      }}
                    />
                  </React.Fragment>
                ) : (
                  <Loading />
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} classes={{ root: classes.columnGrid }}>
          <Grid container spacing={1}>
            <Grid item xs={12} classes={{ root: classes.gridItem }}>
              <Paper classes={{ root: classes.propertiesPaper }}>
                {!state.loading.properties && !state.loading.gini ? (
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
                        <Help
                          text={
                            <Typography>{`Every item in Wikidata is linked with information (property). Property frequency is how many items possess a certain piece of information (property). 
                      You can see which properties are common, and those which are less common.`}</Typography>
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
                          width: "43%",
                        }}
                      >
                        <PercentageSwitch
                          onChange={(newVal) =>
                            setState((s) => ({ ...s, propertyPercent: newVal }))
                          }
                        />
                        <Box>
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
                              <MenuItem value={0}>Descending</MenuItem>
                              <MenuItem value={1}>Ascending</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Typography>
                    </Typography>
                    <ProfileProperties
                      max={state.giniData.amount}
                      labels={state.mappedProperties.labels}
                      values={state.mappedProperties.values}
                      propertySort={state.propertySort}
                      propertyPercent={state.propertyPercent}
                    />
                  </React.Fragment>
                ) : (
                  <Loading />
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} classes={{ root: classes.gridItem }}>
              <Paper classes={{ root: classes.distPaper }}>
                {!state.loading.gini ? (
                  <React.Fragment>
                    <Typography component="div">
                      <Box fontWeight="bold">
                        Property Distribution{" "}
                        <Help
                          text={
                            <Typography>{`Items with the same number of properties are counted and sorted. 
                    From the shape of the distribution, you can see whether each 
                    item of the class has the same amount of information (property) or not.`}</Typography>
                          }
                        />
                      </Box>
                    </Typography>
                    <LineChart
                      data={{
                        labels: state.distribution.labels.map(
                          (item) =>
                            `${(
                              (item * 100) /
                              state.distribution.maxLabel
                            ).toFixed(1)}%`
                        ),
                        datasets: [
                          {
                            data: state.distribution.values.map(
                              (item) => (item * 100) / state.giniData.amount
                            ),
                            actualLabels: state.distribution.labels,
                            actualValues: state.distribution.values,
                            entityCount: state.giniData.amount,
                            // label: "Africa",
                            borderColor: theme.palette.chart.main,
                            backgroundColor: theme.palette.chart.main,
                            fill: true,
                          },
                        ],
                      }}
                      // maxValue={}
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
      </Grid>
    </ThemeProvider>
  );
}
