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
  Search,
  OpenInNew,
} from "@material-ui/icons";
import Loading from "../../components/Misc/Loading";
import Status from "../../components/Misc/Status";
import Help from "../../components/Misc/Help";
import LineChart from "../../components/Dashboard/LineChart";
import { getGiniEntity } from "../../services/dashboard";
import { filterEntities, countProperties } from "../../global";
import PercentageSwitch from "../../components/Inputs/PercentageSwitch";
import ProfileProperties from "../../components/Dashboard/ProfileProperties";
import TableSort from "../../components/Misc/TableSort";
import Onboarding from "../../components/Misc/Onboarding";
import Link from "../../components/Misc/Link";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "66.3vh",
    minHeight: "500px",
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
  giniChartroot: {
    paddingTop: theme.spacing(1),
    // width: "40vh",
    height: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  giniChart: {
    height: "100%",
    width: "95%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  histogramChart: {
    height: "82%",
    width: "100%",
  },
  card: {
    // height: "14vh",
    flex: "1 1 auto",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "flex-start",
  },
  table: {
    flex: "1 1 auto",
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
  outerGrid: {
    height: "100%",
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
  const history = useHistory();
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
      <Grid
        container
        spacing={1}
        direction="row"
        classes={{ root: classes.root }}
        id="profile-info-block"
      >
        <Grid
          item
          xs={5}
          classes={{ root: classes.outerGrid }}
          style={{ display: "flex" }}
        >
          <Grid
            container
            direction="column"
            spacing={1}
            style={{ flex: "1 1 auto" }}
          >
            <Grid item xs={12} style={{ display: "flex" }}>
              <Paper
                style={{ width: "100%", overflowY: "scroll" }}
                id="profile-item-table"
              >
                {state.loading.gini || state.loading.properties ? (
                  <Loading />
                ) : (
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
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
                        <Tooltip title="Download items data">
                          <IconButton size="small" edge="end">
                            <SaveAltIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip title="Open query in Wikidata">
                          <a
                            href={state.giniData.query_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <IconButton size="small" edge="end" color="primary">
                              <OpenInNew />
                            </IconButton>
                          </a>
                        </Tooltip>
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

        <Grid item xs={3} classes={{ root: classes.outerGrid }}>
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
                height: "25%",
                marginBottom: theme.spacing(1),
              }}
            >
              <Grid item xs={5} style={{ display: "flex" }}>
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
                        {props.data.entity ? (
                          <Box fontWeight="bold">
                            Items{" "}
                            <Help
                              text={`The number of items which are instances of ${props.data.entity.entityLabel} (${props.data.entity.entityID}) with the applied filters.
                             This is also the number of items in the item table on the left.`}
                            />
                          </Box>
                        ) : (
                          <Loading variant="text" />
                        )}
                        {state.giniData.exceedLimit ? (
                          <Tooltip
                            title={
                              <Typography>
                                This number is limited and is only a sample of
                                the whole population{" "}
                              </Typography>
                            }
                            aria-label="warning"
                          >
                            <IconButton color="primary" size="small" edge="end">
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
              <Grid item xs={7} style={{ display: "flex" }}>
                <Paper classes={{ root: classes.card }}>
                  {!state.loading.properties && props.data.entity ? (
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
                        <Box fontWeight="bold">
                          Distinct Properties{" "}
                          <Help
                            text={`The amount of information (property) about items of the ${props.data.entity.entityLabel} (${props.data.entity.entityID}) class with the applied filters.
                             This is also the total number of properties in the property frequency chart on the right.`}
                          />
                        </Box>
                      </Typography>
                    </React.Fragment>
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
                            {`The imbalance score for this topic is ${
                              state.giniData.gini
                            } which is the area of the ${(() => {
                              if (state.giniData.gini < 0.2) {
                                return "green";
                              } else if (state.giniData.gini >= 0.4) {
                                return "red";
                              } else {
                                return "yellow";
                              }
                            })()} section of the chart. A balanced topic's score would be closer to 0 as the area gets smaller as well. 
                           A balanced topic indicates that items of the topic has similar amount of information. The imbalance score is based on the Gini Coefficient.`}
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
                      root: classes.giniChartroot,
                      ChartWrapper: classes.giniChart,
                    }}
                  />
                </React.Fragment>
              ) : (
                <Loading />
              )}
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
                        width: "50%",
                      }}
                    >
                      <PercentageSwitch
                        onChange={(newVal) =>
                          setState((s) => ({ ...s, propertyPercent: newVal }))
                        }
                      />
                      <Box style={{ marginLeft: theme.spacing(1) }}>
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

            <Paper
              style={{
                padding: theme.spacing(1),
                flex: "1 1 auto",
                height: "70%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {!state.loading.gini ? (
                <React.Fragment>
                  <Typography component="div" gutterBottom>
                    <Box fontWeight="bold">
                      Property Distribution{" "}
                      <Help
                        text={
                          <Typography>{`From the shape of the distribution, you can see whether most of the 
                          items are rich in information (property) or not. A peak in the distribution shows the number of properties most of the items in this profile has.`}</Typography>
                        }
                      />
                    </Box>
                  </Typography>
                  <LineChart
                    data={(function () {
                      const temp = countProperties(state.entities);
                      return {
                        labels: temp.labels.map(
                          (item) =>
                            `${((item * 100) / temp.maxLabel).toFixed(1)}%`
                        ),
                        datasets: [
                          {
                            data: temp.values.map(
                              (item) => (item * 100) / state.giniData.amount
                            ),
                            actualLabels: temp.labels,
                            actualValues: temp.values,
                            entityCount: state.giniData.amount,
                            // label: "Africa",
                            borderColor: theme.palette.chart.main,
                            backgroundColor: theme.palette.chart.main,
                            fill: true,
                          },
                        ],
                      };
                    })()}
                    // maxValue={}
                    classes={{ ChartWrapper: classes.histogramChart }}
                  />
                </React.Fragment>
              ) : (
                <Loading />
              )}
            </Paper>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
