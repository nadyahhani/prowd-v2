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
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TextField,
  TableBody,
  IconButton,
  TableRow,
  Badge,
  Popover,
  List,
  ListItem,
  Button,
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
import ScatterLineChart from "../../components/Dashboard/ScatterLineChart";
import { MoreHoriz } from "@material-ui/icons";
import Onboarding from "../../components/Misc/Onboarding";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "66.3vh",
    minHeight: "500px",
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
  table: { height: "87%", overflowY: "scroll", overflowX: "scroll" },
  // tableCell: {
  //   padding: `${theme.spacing(2)}px 4px`,
  // },
  // tableCellnum: {
  //   padding: `${theme.spacing(2)}px 4px ${theme.spacing(2)} 4px`,
  // },
  //charts
  histogramChart: {
    paddingTop: theme.spacing(1),
    width: "100%",
    height: "78%",
  },
  horizontalbar: { width: "100%", height: "72%" },
  horizontalbarchart: { width: "100%", height: "100%" },

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
  const history = useHistory();
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

    if (!config.pull) {
      setState((s) => ({
        ...s,
        limit: config.limit,
        loading: { ...s.loading, gini: true },
      }));
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

  function valueTable() {
    let sorted = [];
    let sorting = state.sortTable;
    if (!state.loading.gini) {
      sorted = [...state.shown].sort((b, a) => {
        // sort by prop 1
        if (sorting === 2) {
          return a.analysis_info.item_1_label > b.analysis_info.item_1_label
            ? 1
            : -1;
        } else if (sorting === 3) {
          return a.analysis_info.item_1_label < b.analysis_info.item_1_label
            ? 1
            : -1;
        }
        // sort by prop 2
        else if (a.analysis_info.item_2_label && sorting === 4) {
          return a.analysis_info.item_2_label > b.analysis_info.item_2_label
            ? 1
            : -1;
        } else if (a.analysis_info.item_2_label && sorting === 5) {
          return a.analysis_info.item_2_label < b.analysis_info.item_2_label
            ? 1
            : -1;
        }
        // sort by gini
        else if (sorting === 6) {
          return a.gini > b.gini ? 1 : -1;
        } else if (sorting === 7) {
          return a.gini < b.gini ? 1 : -1;
        }

        // sort by properties
        else if (sorting === 8) {
          return a.statistics.max > b.statistics.max ? 1 : -1;
        } else if (sorting === 9) {
          return a.statistics.max < b.statistics.max ? 1 : -1;
        }

        // sort by count
        else if (sorting === 1) {
          return a.amount < b.amount ? 1 : -1;
        } else {
          return a.amount > b.amount ? 1 : -1;
        }
      });
    } else {
    }
    return (
      <React.Fragment>
        <Typography
          component="div"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            margin: `0 ${theme.spacing(1)}px`,
          }}
        >
          <Box fontWeight="bold">
            Subclasses{" "}
            <Help
              text={
                <Typography>{`All possible values for the property dimensions.`}</Typography>
              }
            />
          </Box>
        </Typography>
        <Paper
          variant="outlined"
          elevation={0}
          style={{ flex: "1 1 auto", height: "45%", margin: theme.spacing(1) }}
        >
          <TableContainer component="div">
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={state.dimensions.length * 2 + 6}>
                    <Grid container direction="row" spacing={1}>
                      <Grid item xs={7}>
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="dense"
                          fullWidth
                          placeholder="Search..."
                          value={state.searchSubclassTable}
                          onChange={(e) => {
                            let val = e.target.value;
                            setState((s) => ({
                              ...s,
                              searchSubclassTable: val,
                            }));
                          }}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          select
                          fullWidth
                          value={state.sortTable}
                          onChange={(e, child) =>
                            setState((s) => ({
                              ...s,
                              sortTable: child.props.value,
                            }))
                          }
                          variant="outlined"
                          size="small"
                          margin="dense"
                          label="Sort by"
                        >
                          <MenuItem value={0}>Item Count (Highest)</MenuItem>
                          <MenuItem value={1}>Item Count (Lowest)</MenuItem>
                          <MenuItem value={6}>
                            Imbalance Score (Highest)
                          </MenuItem>
                          <MenuItem value={7}>
                            Imbalance Score (Lowest)
                          </MenuItem>
                          <MenuItem value={8}>
                            Max Properties (Highest)
                          </MenuItem>
                          <MenuItem value={9}>Max Properties (Lowest)</MenuItem>
                          <MenuItem value={3}>
                            {state.dimensions[0].label} (A-Z)
                          </MenuItem>
                          <MenuItem value={2}>
                            {state.dimensions[0].label} (Z-A)
                          </MenuItem>
                          {state.dimensions.length === 2 ? (
                            <MenuItem value={5}>
                              {state.dimensions[1].label} (A-Z)
                            </MenuItem>
                          ) : null}
                          {state.dimensions.length === 2 ? (
                            <MenuItem value={4}>
                              {state.dimensions[1].label} (Z-A)
                            </MenuItem>
                          ) : null}
                        </TextField>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
          <TableContainer component="div" className={classes.table}>
            <Table stickyHeader size="small" padding="default">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell} colSpan={2}>
                    {`${state.dimensions[0].label} (${state.dimensions[0].id})`}
                  </TableCell>
                  {state.dimensions.length === 2 ? (
                    <TableCell className={classes.tableCell} colSpan={2}>
                      {`${state.dimensions[1].label} (${state.dimensions[1].id})`}
                    </TableCell>
                  ) : null}
                  <TableCell className={classes.tableCell} align="right">
                    Item Count
                  </TableCell>
                  <TableCell className={classes.tableCell} align="right">
                    Imbalance Score
                  </TableCell>
                  <TableCell className={classes.tableCell} align="right">
                    Max Properties
                  </TableCell>
                  {/* <TableCell /> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {state.loading.gini
                  ? [0, 0, 0, 0, 0, 0, 0].map((item) => (
                      <TableRow>
                        <TableCell className={classes.tableCell} colSpan={2}>
                          <Loading variant="text" />
                        </TableCell>
                        {state.dimensions.length === 2 ? (
                          <TableCell className={classes.tableCell} colSpan={2}>
                            <Loading variant="text" />
                          </TableCell>
                        ) : null}
                        <TableCell
                          className={classes.tableCellnum}
                          align="right"
                        >
                          <Loading variant="text" />
                        </TableCell>
                        <TableCell
                          className={classes.tableCellnum}
                          align="right"
                        >
                          <Typography
                            component="div"
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Loading variant="text" />
                          </Typography>
                        </TableCell>
                        <TableCell
                          className={classes.tableCellnum}
                          align="right"
                        >
                          <Loading variant="text" />
                        </TableCell>
                      </TableRow>
                    ))
                  : sorted
                      .filter((item) =>
                        `${item.analysis_info.item_1_label} ${
                          state.dimensions.length === 2
                            ? item.analysis_info.item_2_label
                            : ""
                        }`
                          .toLowerCase()
                          .includes(state.searchSubclassTable.toLowerCase())
                      )
                      .map((row, idx) => {
                        return (
                          <TableRow>
                            <TableCell
                              className={classes.tableCell}
                              colSpan={2}
                            >
                              {`${row.analysis_info.item_1_label}`}
                            </TableCell>
                            {state.dimensions.length === 2 ? (
                              <TableCell
                                className={classes.tableCell}
                                colSpan={2}
                              >
                                {row.analysis_info.item_2_label}
                              </TableCell>
                            ) : null}
                            <TableCell
                              className={classes.tableCellnum}
                              align="right"
                            >
                              {row.amount}
                            </TableCell>
                            <TableCell
                              className={classes.tableCellnum}
                              align="right"
                            >
                              <Typography
                                component="div"
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <div
                                  style={{
                                    width: theme.spacing(1),
                                    height: theme.spacing(1),
                                    borderRadius: "50%",
                                    marginRight: theme.spacing(1),
                                    backgroundColor:
                                      row.gini < 0.2
                                        ? theme.palette.success.main
                                        : row.gini >= 0.4
                                        ? theme.palette.error.main
                                        : theme.palette.warning.main,
                                  }}
                                />{" "}
                                {row.gini.toFixed(3)}
                              </Typography>
                            </TableCell>
                            <TableCell
                              className={classes.tableCellnum}
                              align="right"
                            >
                              {Number.isNaN(Math.ceil(row.statistics.max))
                                ? 0
                                : Math.ceil(row.statistics.max)}
                            </TableCell>
                            {/* <TableCell>
                          <IconButton size="small" edge="end">
                            <MoreHoriz />
                          </IconButton>
                        </TableCell> */}
                          </TableRow>
                        );
                      })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </React.Fragment>
    );
  }

  function propertyChart() {
    if (!state.loading.gini) {
      let labels = [];
      let values = [];

      const sorted = [
        ...state.shown,
        // {
        //   amount: props.data.itemCount - state.totalAmount,
        //   analysis_info: {
        //     item_1_label: `no ${state.dimensions[0].label}`,
        //     item_2_label: `${
        //       state.dimensions[1] ? `no ${state.dimensions[1].label}` : ""
        //     }`,
        //   },
        // },
      ].sort((b, a) => {
        if (state.sortProps === 0) {
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
          }: ${((item.amount * 100) / props.data.itemCount).toFixed(1)}%`
        );
        values.push(((item.amount * 100) / props.data.itemCount).toFixed(1));
      });
      const dataTemp = {
        labels: [...labels].splice(0, 5),
        datasets: [
          {
            label: "Proportion of this subclass to the whole topic",
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
              Subclass Proportion{" "}
              <Help
                text={
                  <Typography>{`The proportion of each subclass to the whole topic. The rest of the percentage not shown here are of those items in the topic which may not possess the property dimensions selected.`}</Typography>
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
            percent
            data={dataTemp}
            classes={{
              root: classes.horizontalbar,
              ChartWrapper: classes.horizontalbarchart,
            }}
            xAxesTitle="Percentage of Proportion"
            max={100}
          />
          <AllPropertiesModal
            key="modal-desc"
            data={{
              labels: labels,
              values: values,
              max: 100,
            }}
            title="Proportion of each subclass to the whole topic"
            label="Proportion of this subclass to the whole topic"
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
                    flex: "1 1 auto",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {valueTable()}
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
                      <Typography
                        component="div"
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box fontWeight="bold">
                          Subclasses Property Distribution{" "}
                          <Help
                            text={
                              <Typography>{`The distribution shape of several subclasses. You can customize and select the classes shown in this chart.`}</Typography>
                            }
                          />
                        </Box>
                        <Box>
                          <Popover
                            open={state.openLegend}
                            anchorEl={state.legendAnchor}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "center",
                            }}
                            transformOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            onClose={() =>
                              setState((s) => ({ ...s, openLegend: false }))
                            }
                          >
                            <List>
                              {state.distributions.map((item) => (
                                <ListItem>
                                  <div
                                    style={{
                                      borderRadius: "50%",
                                      width: theme.spacing(2),
                                      height: theme.spacing(2),
                                      backgroundColor: item.color,
                                      marginRight: theme.spacing(1),
                                    }}
                                  />
                                  <Typography>{item.name}</Typography>
                                </ListItem>
                              ))}
                            </List>
                          </Popover>
                          <Button
                            color="primary"
                            size="small"
                            onClick={(e) =>
                              setState((s) => ({
                                ...s,
                                openLegend: true,
                                legendAnchor: e.currentTarget,
                              }))
                            }
                          >
                            View Legend
                          </Button>
                        </Box>
                      </Typography>
                      <ScatterLineChart
                        hideLegend
                        legendInDot
                        key={state.distributions
                          .map((item) => item.name)
                          .join("-")}
                        data={{
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
                        onApply={(newData) => {
                          setState((s) => ({ ...s, distributions: newData }));
                        }}
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
            {!props.data.entity ? (
              <Typography
                style={{
                  width: theme.spacing(65),
                  marginTop: `-${theme.spacing(4)}px`,
                  textAlign: "justify",
                }}
              >
                <Loading variant="text" />
              </Typography>
            ) : props.data.entity.entityID !== "Q5" ? (
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
            ) : null}
          </Grid>
        )}
      </Grid>
    </ThemeProvider>
  );
}
