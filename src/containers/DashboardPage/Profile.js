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
import HorizontalBarChart from "../../components/Dashboard/HorizontalBarChart";
import theme from "../../theme";
import AllPropertiesModal from "../../components/Dashboard/AllPropertiesModal";
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
    height: "65.3vh",
  },
  distPaper: { height: "32vh" },
  giniPaper: {
    height: "46vh",
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
    height: "90%",
  },
  horizontalbar: { width: "100%", height: "72%" },
  horizontalbarchart: { width: "100%", height: "100%" },
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
    height: "92%",
  },
  tableToolbar: { height: "fit-content" },

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
    label: "Entity",
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

  React.useEffect(() => {}, [state]);

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

  const propertiesChart = () => {
    if (!state.loading.properties && !state.loading.gini) {
      let tempLabels = [...state.mappedProperties.labels];
      let tempValues = [...state.mappedProperties.values];
      tempLabels = tempLabels.map(
        (item, idx) => `${tempLabels[idx]}: ${tempValues[idx]}`
      );
      if (state.propertySort === 0) {
        // Descending
        return (
          <React.Fragment>
            <HorizontalBarChart
              key={1}
              data={{
                labels: tempLabels.slice(0, 5),
                datasets: [
                  {
                    label: "# of Entities with this property",
                    backgroundColor: theme.palette.chart.main,
                    data: tempValues.slice(0, 5),
                  },
                ],
              }}
              max={state.entities.length}
              classes={{
                root: classes.horizontalbar,
                ChartWrapper: classes.horizontalbarchart,
              }}
            />
            <AllPropertiesModal
              key="modal-desc"
              data={{
                labels: tempLabels,
                values: tempValues,
                max: state.entities.length,
              }}
            />
          </React.Fragment>
        );
      } else {
        // Ascending
        return (
          <React.Fragment>
            <HorizontalBarChart
              key={2}
              data={{
                labels: [...tempLabels].reverse().slice(0, 5),
                datasets: [
                  {
                    label: "# of Entities with this property",
                    backgroundColor: theme.palette.chart.main,
                    data: [...tempValues].reverse().slice(0, 5),
                  },
                ],
              }}
              max={state.entities.length}
              classes={{
                root: classes.horizontalbar,
                ChartWrapper: classes.horizontalbarchart,
              }}
            />
            <AllPropertiesModal
              key="modal-asc"
              data={{
                labels: tempLabels,
                values: tempValues,
                max: state.entities.length,
              }}
            />
          </React.Fragment>
        );
      }
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
        <Grid item xs={5}>
          <Grid container direction="column" spacing={1}>
            <Grid item xs={12}>
              <Paper className={classes.tablePaper}>
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
                      <Grid item xs={10}>
                        <TextField
                          placeholder="Search entity..."
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
                        rows={filterEntities(state.entities, state.tableSearch)}
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
        <Grid item xs={3}>
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
                          <Box fontWeight="bold">Entities</Box>
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
                    {!state.loading.gini ? (
                      <React.Fragment>
                        <Typography variant="h1" component="div">
                          <Box fontWeight="medium">
                            {state.distribution.maxLabel}
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

                  <Status>Imbalanced</Status>
                </div>
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
                      <MenuItem value={0}>Descending</MenuItem>
                      <MenuItem value={1}>Ascending</MenuItem>
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
                {!state.loading.gini ? (
                  <LineChart
                    data={{
                      labels: state.distribution.labels,
                      datasets: [
                        {
                          data: state.distribution.values,
                          // label: "Africa",
                          borderColor: theme.palette.chart.main,
                          backgroundColor: theme.palette.chart.main,
                          fill: true,
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
      </Grid>
    </ThemeProvider>
  );
}
