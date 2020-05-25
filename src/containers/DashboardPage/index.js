import React from "react";
import {
  Typography,
  ThemeProvider,
  makeStyles,
  Input,
  Box,
  IconButton,
  Button,
  Grid,
  Paper,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Settings from "../../components/Misc/Settings";
import theme from "../../theme";
import SimpleTabs from "../../components/Navigation/SimpleTabs";
import Navbar from "../../components/Navigation/Navbar";
import {
  getDashInfo,
  editGlobal,
  getCompareGini,
  getCompareProperties,
  getDiscoverGini,
  getActualItemCount,
  copyDashboard,
} from "../../services/dashboard";
import { getGiniEntity, getAllProperties } from "../../services/dashboard";
import {
  sortProperties,
  cut,
  compareDistinctProps,
  selectDistribution,
} from "../../global";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import Loading from "../../components/Misc/Loading";
import FilterBox from "../../components/Inputs/FilterBox";
import Notif from "../../components/Misc/Notif";
import Onboarding from "../../components/Misc/Onboarding";
import { useHistory } from "react-router-dom";
import EditClass from "../../components/Inputs/EditClass";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: theme.palette.background.main,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: "0 1vw",
    width: "98vw",
    minWidth: "1316px",
    height: "92vh",
    // maxHeight: "800px",
    // minHeight: "722px",
    backgroundColor: theme.palette.background.main,
    overflowX: "scroll",
    overflowY: "scroll",
  },
  titleInput: {
    fontSize: theme.typography.h2.fontSize,
    // backgroundColor: "black",
  },
  bold: {
    fontWeight: "bold",
  },
  tabs: {
    width: "100%",
  },
  filters: {
    width: "97%",
  },
}));

export default function DashboardPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    loaded: {
      global: false,
      profile: false,
      compare: false,
      discover: false,
    },
    onboarding: {
      page: "profile",
      step: 0,
      running: false,
      dashclass: "",
      filters: [],
    },
    openLegend: false,
    legendAnchor: null,
    copyDialogOpen: false,
    loading: true,
    globalData: {},
    oldGlobal: {},
    update: false,
    itemCount: 0,
    notif: { open: false, severity: "info", message: "" },
  });

  const [profileState, setProfileState] = React.useState({
    loaded: false,
    entities: [],
    giniData: {},
    distribution: {},
    properties: [],
    propertySort: 0,
    gap: [],
    tableSearch: "",
    tableSort: 0,
    chartNumberPercent: 1,
    // loading states
    loading: {
      gini: true,
      properties: true,
      propertiesOptions: false,
      gap: true,
      checkProperty: false,
    },
  });

  const [compareState, setCompareState] = React.useState({
    loaded: false,
    giniA: {},
    giniB: {},
    compareFilters: [],
    properties: {},
    mappedProperties: {},
    propertySort: 0,
    propertyPercent: 0,
    distinctProps: {},
    chartNumberPercent: 1,
    propertyNumberPercent: 0,
    // loading states
    loading: {
      giniA: true,
      giniB: true,
      compareFilters: true,
      properties: true,
      propertiesOptions: false,
      gap: true,
    },
  });

  const [discoverState, setDiscoverState] = React.useState({
    loaded: false,
    dimensions: [],
    gini: [],
    distributions: [],
    maxAmount: null,
    limit: [1, 2],
    sortTable: 0,
    searchSubclassTable: "",
    sortProps: 0,
    // loading states
    loading: {
      dimensions: true,
      gini: true,
    },
  });

  const fetchData = React.useCallback(
    (scope = "") => {
      console.log("scope: ", scope);
      console.log(props.match.params.id);

      // Global
      if (
        !state.loaded.global &&
        (scope === "" ||
          scope === "profile" ||
          scope === "compare" ||
          scope === "info" ||
          scope === "discover")
      ) {
        console.log("global pull");

        setState((s) => ({
          ...s,
          loading: true,
          loaded: { ...s.loaded, global: true },
          update: false,
        }));
        setCompareState((s) => ({
          ...s,
          loading: { ...s.loading, compareFilters: true },
        }));
        setDiscoverState((s) => ({
          ...s,
          loading: { ...s.loading, dimensions: true },
        }));

        getActualItemCount(props.match.params.id, (r) => {
          if (r.success) {
            setState((s) => ({ ...s, itemCount: r.entityCount }));
          } else {
            setState((s) => ({
              ...s,
              notif: {
                open: true,
                message: "An Error Occured",
                severity: "error",
                action: () => {
                  fetchData("info");
                  setState((s) => ({
                    ...s,
                    notif: {
                      open: true,
                      message: "Retrying... Please Wait.",
                      severity: "Warning",
                    },
                  }));
                },
              },
            }));
          }
        });

        getDashInfo(props.match.params.id, (r) => {
          if (r.success) {
            setState((s) => ({
              ...s,
              loading: false,
              oldGlobal: {
                ...s.globalData,
                public: r.public,
                entity: r.entityInfo,
                filters: r.filtersInfo ? r.filtersInfo : [],
                name: r.name === "" ? "Untitled Dashboard" : r.name,
                author: r.author === "" ? "Anonymous" : r.author,
              },
              globalData: {
                ...s.globalData,
                public: r.public,
                entity: r.entityInfo,
                filters: r.filtersInfo ? r.filtersInfo : [],
                name: r.name === "" ? "Untitled Dashboard" : r.name,
                author: r.author === "" ? "Anonymous" : r.author,
              },
            }));
            setCompareState((s) => ({
              ...s,
              compareFilters: r.compareInfo.map((item) => ({
                property: {
                  description: item.description,
                  id: item.id,
                  label: item.label,
                },
                valueA: item.value.item1,
                valueB: item.value.item2,
              })),
              loading: { ...s.loading, compareFilters: false },
            }));
            setDiscoverState((s) => ({
              ...s,
              dimensions: r.analysisInfo,
              loading: { ...s.loading, dimensions: false },
            }));
          } else {
            setState((s) => ({
              ...s,
              notif: {
                open: true,
                message: "An Error Occured",
                severity: "error",
                action: () => {
                  fetchData("info");
                  setState((s) => ({
                    ...s,
                    notif: {
                      open: true,
                      message: "Retrying... Please Wait.",
                      severity: "Warning",
                    },
                  }));
                },
              },
            }));
          }
        });
      }

      // Profile
      if (scope === "" || scope === "profile") {
        console.log("profile pull");
        setProfileState((s) => ({
          ...s,
          loading: {
            gini: true,
            properties: true,
            propertiesOptions: false,
            gap: true,
            checkProperty: false,
          },
        }));
        getAllProperties(props.match.params.id, (r) => {
          if (r.success) {
            const temp = sortProperties(r.result);

            setProfileState((s) => ({
              ...s,
              properties: r.properties,
              mappedProperties: temp,
              loading: { ...s.loading, properties: false },
            }));
          } else {
            setState((s) => ({
              ...s,
              notif: {
                open: true,
                message: "An Error Occured",
                severity: "error",
                action: () => {
                  fetchData("profile");
                  setState((s) => ({
                    ...s,
                    notif: {
                      open: true,
                      message: "Retrying... Please Wait.",
                      severity: "Warning",
                    },
                  }));
                },
              },
            }));
          }
        });
        getGiniEntity(props.match.params.id, null, (r) => {
          if (r.success) {
            const max = Math.max.apply(
              Math,
              r.entities.map((item) => item.propertyCount)
            );
            setProfileState((s) => ({
              ...s,
              entities: [
                ...r.entities.map((item) => ({
                  ...item,
                  percentile: `${((item.propertyCount * 100) / max).toFixed(
                    0
                  )}%`,
                })),
              ].reverse(),
              giniData: {
                gini: r.gini,
                each_amount: r.each_amount,
                data: r.data,
                percentileData: r.percentileData,
                amount: r.amount ? r.amount : null,
                insight: r.insight,
                exceedLimit: r.exceedLimit,
                query_link: r.query_link,
              },
              loading: { ...s.loading, gini: false },
            }));
          } else {
            setState((s) => ({
              ...s,
              notif: {
                open: true,
                message: "An Error Occured",
                severity: "error",
                action: () => {
                  fetchData("profile");
                  setState((s) => ({
                    ...s,
                    notif: {
                      open: true,
                      message: "Retrying... Please Wait.",
                      severity: "Warning",
                    },
                  }));
                },
              },
            }));
          }
        });
      }
      // Compare
      if (scope === "" || scope === "compare") {
        console.log("compare pull");
        setCompareState((s) => ({
          ...s,
          loading: {
            ...s.loading,
            giniA: true,
            giniB: true,
            properties: true,
          },
        }));
        getCompareGini(props.match.params.id, 1, (r) => {
          if (r.success) {
            setCompareState((s) => ({
              ...s,
              giniA: { amount: 0, newHistogramData: { raw_data: [] }, ...r },
              loading: { ...s.loading, giniA: false },
            }));
          } else {
            setState((s) => ({
              ...s,
              notif: {
                open: true,
                message: "An Error Occured",
                severity: "error",
                action: () => {
                  fetchData("compare");
                  setState((s) => ({
                    ...s,
                    notif: {
                      open: true,
                      message: "Retrying... Please Wait.",
                      severity: "Warning",
                    },
                  }));
                },
              },
            }));
          }
        });
        getCompareGini(props.match.params.id, 2, (r) => {
          if (r.success) {
            setCompareState((s) => ({
              ...s,
              giniB: { amount: 0, newHistogramData: { raw_data: [] }, ...r },
              loading: { ...s.loading, giniB: false },
            }));
          } else {
            setState((s) => ({
              ...s,
              notif: {
                open: true,
                message: "An Error Occured",
                severity: "error",
                action: () => {
                  fetchData("compare");
                  setState((s) => ({
                    ...s,
                    notif: {
                      open: true,
                      message: "Retrying... Please Wait.",
                      severity: "Warning",
                    },
                  }));
                },
              },
            }));
          }
        });

        getCompareProperties(props.match.params.id, (r) => {
          if (r.success) {
            const temp = sortProperties(r.result, true);
            setCompareState((s) => ({
              ...s,
              properties: r.result,
              distinctProps: compareDistinctProps(r.result),
              mappedProperties: temp,
              loading: { ...s.loading, properties: false },
            }));
          } else {
            setState((s) => ({
              ...s,
              notif: {
                open: true,
                message: "An Error Occured",
                severity: "error",
                action: () => {
                  fetchData("compare");
                  setState((s) => ({
                    ...s,
                    notif: {
                      open: true,
                      message: "Retrying... Please Wait.",
                      severity: "Warning",
                    },
                  }));
                },
              },
            }));
          }
        });
      }

      // discover
      if (scope === "" || scope === "discover") {
        console.log("discover pull");
        setDiscoverState((s) => ({
          ...s,
          loading: { ...s.loading, gini: true },
        }));
        getDiscoverGini(props.match.params.id, (r) => {
          if (r.success) {
            const filtered = [...r.data].filter(
              (item) => item.amount >= 1 && item.amount <= r.max_number
            );
            setDiscoverState((s) => ({
              ...s,
              gini: r.data,
              totalAmount: r.total_entities_amount,
              shown: filtered,
              maxAmount: r.max_number,
              limit: [1, r.max_number],
              distributions: selectDistribution(filtered),
              loading: { ...s.loading, gini: false },
            }));
          } else {
            setState((s) => ({
              ...s,
              notif: {
                open: true,
                message: "An Error Occured",
                severity: "error",
                action: () => {
                  fetchData("discover");
                  setState((s) => ({
                    ...s,
                    notif: {
                      open: true,
                      message: "Retrying... Please Wait.",
                      severity: "Warning",
                    },
                  }));
                },
              },
            }));
          }
        });
      }
    },
    [props.match.params.id]
  );

  React.useEffect(() => {
    if (props.match.params.subpage && state.globalData.entity) {
      switch (props.match.params.subpage) {
        case "onboarding-profile":
          setState((s) => ({
            ...s,
            onboarding: {
              page: "profile",
              step: 0,
              running: true,
              dashclass: `${state.globalData.entity.entityLabel} (${state.globalData.entity.entityID})`,
              filters: state.globalData.filtersInfo,
            },
          }));
          return;
        case "onboarding-example":
          setState((s) => ({
            ...s,
            onboarding: {
              page: "example",
              step: 0,
              running: true,
              dashclass: `${state.globalData.entity.entityLabel} (${state.globalData.entity.entityID})`,
              filters: state.globalData.filtersInfo,
            },
          }));
          return;
        default:
          return;
      }
    }
  }, [
    props.match.params.id,
    props.match.params.subpage,
    state.globalData.entity,
  ]);

  return (
    <ThemeProvider theme={theme}>
      {state.onboarding.running ? (
        <Onboarding
          {...state.onboarding}
          onChange={({ reason, state }) => {
            if (reason === "stop") {
              history.push(`/dashboards/${props.match.params.id}/profile`);
              setState((s) => ({
                ...s,
                onboarding: { ...s.onboarding, running: false },
              }));
            }
          }}
        />
      ) : null}
      <div className={classes.root}>
        {/* modals */}
        <Notif {...state.notif} />
        <Dialog
          open={state.copyDialogOpen}
          onClose={() => setState((s) => ({ ...s, copyDialogOpen: false }))}
        >
          <DialogContent>
            <Typography variant="h2" component="div">
              <Box fontWeight="bold">
                Do you want to create a copy of this Dashboard?
              </Box>
            </Typography>
          </DialogContent>
          <DialogContent>
            <Typography>
              This will create a new dashboard with the same configuration. You
              can change the configuration of the new dashboard later on.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setState((s) => ({ ...s, copyDialogOpen: false }));
                copyDashboard(props.match.params.id, (r) => {
                  if (r.success) {
                    history.push(`/dashboards/${r.hash_code}/profile`);
                    fetchData(props.match.params.page);
                    setState((s) => ({
                      ...s,
                      pull: false,
                      loaded: {
                        global: false,
                        profile: false,
                        compare: false,
                        discover: false,
                      },
                      notif: {
                        open: true,
                        message: "Dashboard Successfully Duplicated. Welcome!",
                        severity: "success",
                        action: () => {},
                      },
                    }));
                  }
                });
              }}
              size="small"
              color="primary"
              variant="contained"
            >
              yes
            </Button>
            <Button
              style={{ color: theme.palette.error.main }}
              size="small"
              onClick={() => setState((s) => ({ ...s, copyDialogOpen: false }))}
            >
              no
            </Button>
          </DialogActions>
        </Dialog>
        {/* modals end */}
        <Navbar />
        <div className={classes.content}>
          <div
            style={{
              marginBottom: theme.spacing(1),
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              height: "4vh",
              minHeight: theme.spacing(4),
            }}
          >
            <div
              id="dashboard-name-author"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "50%",
              }}
            >
              {state.globalData.entity ? (
                <React.Fragment>
                  <Input
                    classes={{ input: `${classes.titleInput} ${classes.bold}` }}
                    value={state.globalData.name}
                    fullWidth
                    onChange={(e) => {
                      let val = e.target.value;
                      setState((s) => ({
                        ...s,
                        globalData: { ...s.globalData, name: val },
                        // update: true,
                      }));
                      let tempFilter = [];
                      state.globalData.filters.forEach((item) => {
                        let t = {};
                        t[item.filterID] = item.filterValueID;
                        tempFilter.push(t);
                      });
                      editGlobal(
                        props.match.params.id,
                        state.globalData.public,
                        state.globalData.entity.entityID,
                        tempFilter,
                        {
                          name: val,
                          author: state.globalData.author,
                        },
                        (r) => {}
                      );
                    }}
                  />
                  <Typography
                    style={{ padding: "0 .4vw" }}
                    variant="h2"
                  >{` by `}</Typography>
                  <Input
                    classes={{ input: classes.titleInput }}
                    value={state.globalData.author}
                    onChange={(e) => {
                      let val = e.target.value;
                      setState((s) => ({
                        ...s,
                        globalData: { ...s.globalData, author: val },
                      }));
                      let tempFilter = [];
                      state.globalData.filters.forEach((item) => {
                        let t = {};
                        t[item.filterID] = item.filterValueID;
                        tempFilter.push(t);
                      });
                      editGlobal(
                        props.match.params.id,
                        state.globalData.public,
                        state.globalData.entity.entityID,
                        tempFilter,
                        {
                          name: state.globalData.name,
                          author: val,
                        },
                        (r) => {}
                      );
                    }}
                  />
                </React.Fragment>
              ) : (
                <Typography
                  component="div"
                  variant="h2"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    "& > *": { marginLeft: theme.spacing(1) },
                  }}
                >
                  <Loading
                    variant="text"
                    style={{ width: theme.spacing(80) }}
                  />
                  <Typography
                    style={{ padding: "0 .4vw" }}
                    variant="h2"
                  >{` by `}</Typography>
                  <Loading
                    variant="text"
                    style={{ width: theme.spacing(15) }}
                  />
                </Typography>
              )}
            </div>
            <div>
              {state.update ? (
                <Button
                  color="primary"
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      update: false,
                      globalData: {
                        ...s.oldGlobal,
                        pull: false,
                      },
                    }))
                  }
                >
                  RESET
                </Button>
              ) : null}
              <Button
                variant="contained"
                color="primary"
                disabled={!state.update}
                style={{ margin: `0 ${theme.spacing(1)}px` }}
                onClick={() => {
                  const hash = props.match.params.id;
                  let tempFilter = [];
                  state.globalData.filters.forEach((item) => {
                    let t = {};
                    t[item.filterID] = item.filterValueID;
                    tempFilter.push(t);
                  });
                  setState((s) => ({
                    ...s,
                    loading: {
                      gini: true,
                      properties: true,
                      propertiesOptions: false,
                      gap: true,
                    },
                  }));

                  editGlobal(
                    hash,
                    state.globalData.public,
                    state.globalData.entity.entityID,
                    tempFilter,
                    {
                      name: state.globalData.name,
                      author: state.globalData.author,
                    },
                    (r) => {
                      if (r.success) {
                        state.pull && fetchData(props.match.params.page);
                        setState((s) => ({
                          ...s,
                          pull: false,
                          loaded: {
                            global: false,
                            profile: false,
                            compare: false,
                            discover: false,
                          },
                          notif: {
                            open: true,
                            message: "Dashboard Successfully Edited",
                            severity: "success",
                            action: () => {},
                          },
                        }));
                      } else {
                        setState((s) => ({
                          ...s,
                          pull: false,
                          notif: {
                            open: true,
                            message: "Dashboard Edit Failed",
                            severity: "error",
                            action: () => {},
                          },
                        }));
                      }
                    }
                  );
                }}
              >
                Apply
              </Button>
              {/* <IconButton
                color="primary"
                size="small"
                onClick={() =>
                  setState((s) => ({ ...s, copyDialogOpen: true }))
                }
              >
                <FileCopyOutlinedIcon />
              </IconButton> */}
              <Settings
                hash={props.match.params.id}
                updateData={setState}
                onChange={(e) => {
                  if (e.reason === "restart_onboarding") {
                    history.push(
                      `/dashboards/${props.match.params.id}/profile/onboarding-profile`
                    );
                  }
                }}
              />
            </div>
          </div>
          <div
            style={{
              marginBottom: theme.spacing(3),
              height: "10vh",
              minHeight: theme.spacing(12),
            }}
          >
            <Grid
              container
              spacing={1}
              style={{ height: "100%" }}
              id="global-dashboard-data"
            >
              <Grid item style={{ height: "100%" }} xs={5}>
                <Paper style={{ height: "100%", padding: theme.spacing(1) }}>
                  {state.globalData.entity ? (
                    <React.Fragment>
                      <Typography
                        variant="h2"
                        component="div"
                        style={{
                          marginBottom: theme.spacing(1),
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <a
                          style={{ textDecoration: "none" }}
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://www.wikidata.org/wiki/${state.globalData.entity.entityID}`}
                        >{`${state.globalData.entity.entityLabel} (${state.globalData.entity.entityID})`}</a>
                        <EditClass
                          onChange={(value) => {
                            setState((s) => ({
                              ...s,
                              update: true,
                              globalData: {
                                ...s.globalData,
                                pull: true,
                                entity: {
                                  entityLabel: value.label,
                                  entityID: value.id,
                                  entityDescription: value.description,
                                },
                              },
                            }));
                          }}
                        />
                      </Typography>
                      <Typography>
                        {cut(state.globalData.entity.entityDescription, 190)}
                      </Typography>
                    </React.Fragment>
                  ) : (
                    <Loading />
                  )}
                </Paper>
              </Grid>
              <Grid item style={{ height: "100%" }} xs={7}>
                <Paper style={{ height: "100%", padding: theme.spacing(1) }}>
                  {state.globalData.entity ? (
                    <React.Fragment>
                      <Typography>Filters</Typography>

                      <FilterBox
                        classes={{ root: classes.filters }}
                        options={state.globalData.filters}
                        selectedClass={state.globalData.entity}
                        hideLabel
                        cols={1}
                        onApply={(applied) => {
                          let temp = [...applied];
                          temp = temp.map((item) => {
                            if (!item.property) {
                              return item;
                            }
                            return {
                              filterDescription: item.property.description,
                              filterID: item.property.id,
                              filterLabel: item.property.label,
                              filterValueDescription: item.value.description,
                              filterValueID: item.value.id,
                              filterValueLabel: item.value.label,
                            };
                          });
                          setState((s) => ({
                            ...s,
                            update: true,
                            pull: true,
                            globalData: { ...s.globalData, filters: temp },
                          }));
                        }}
                        renderTagText={(opt) =>
                          cut(
                            `${
                              opt.property
                                ? opt.property.label
                                : opt.filterLabel
                            }: ${
                              opt.value ? opt.value.label : opt.filterValueLabel
                            }`,
                            43
                          )
                        }
                        onDelete={(idx) => {
                          let temp = [...state.globalData.filters];
                          temp.splice(idx, 1);
                          setState((s) => ({
                            ...s,
                            update: true,
                            pull: true,
                            globalData: { ...s.globalData, filters: temp },
                          }));
                        }}
                        onClear={() =>
                          setState((s) => ({
                            ...s,
                            update: true,
                            pull: true,
                            globalData: { ...s.globalData, filters: [] },
                          }))
                        }
                      />
                    </React.Fragment>
                  ) : (
                    <Loading />
                  )}
                </Paper>
              </Grid>
            </Grid>
          </div>
          <div>
            <SimpleTabs
              className={classes.tabs}
              dashId={props.match.params.id}
              selectedTab={props.match.params.page}
              data={{
                ...state.globalData,
                itemCount: state.itemCount,
                loaded: { ...state.loaded },
                onboarding: { ...state.onboarding },
              }}
              updateData={setState}
              fetchData={fetchData}
              states={{
                profile: profileState,
                compare: compareState,
                discover: discoverState,
              }}
              setStates={{
                profile: setProfileState,
                compare: setCompareState,
                discover: setDiscoverState,
              }}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
