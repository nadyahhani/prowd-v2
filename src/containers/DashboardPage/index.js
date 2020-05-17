import React from "react";
import {
  Typography,
  ThemeProvider,
  makeStyles,
  Input,
  CircularProgress,
  Box,
  IconButton,
  Button,
  Grid,
  Paper,
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
} from "../../services/dashboard";
import { getGiniEntity, getAllProperties } from "../../services/dashboard";
import {
  countProperties,
  sortProperties,
  cut,
  compareDistinctProps,
} from "../../global";
import SettingsIcon from "@material-ui/icons/Settings";
import Loading from "../../components/Misc/Loading";
import FilterBox from "../../components/Inputs/FilterBox";
import Notif from "../../components/Misc/Notif";
import Onboarding from "../../components/Misc/Onboarding";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  content: {
    padding: "1vh 1vw",
    paddingTop: "1vh",
    width: "98vw",
    height: "91vh",
    // maxHeight: "800px",
    // minHeight: "722px",
    backgroundColor: theme.palette.background.main,
    overflowX: "hidden",
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
      class: "",
      filters: "",
    },
    loading: true,
    globalData: {},
    update: false,
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
    // loading states
    loading: {
      dimensions: true,
      gini: true,
    },
  });
  const onboardingChangeHandler = (e) => {
    if (e.reason === "stop") {
      setState((s) => ({
        ...s,
        onboarding: { ...s.onboarding, running: false },
      }));
      history.push(
        `/dashboards/${props.match.params.id}/${props.match.params.page}`
      );
    }
  };

  const fetchData = React.useCallback(
    (scope = "") => {
      console.log("scope: ", scope);

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
        }));
        setCompareState((s) => ({
          ...s,
          loading: { ...s.loading, compareFilters: true },
        }));
        setDiscoverState((s) => ({
          ...s,
          loading: { ...s.loading, dimensions: true },
        }));
        getDashInfo(props.match.params.id, (r) => {
          if (r.success) {
            setState((s) => ({
              ...s,
              loading: false,
              globalData: {
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
            const distTemp = countProperties(r.entities);
            setProfileState((s) => ({
              ...s,
              entities: [...r.entities].reverse(),
              giniData: {
                gini: r.gini,
                each_amount: r.each_amount,
                data: r.data,
                percentileData: r.percentileData,
                amount: r.amount ? r.amount : null,
                insight: r.insight,
                exceedLimit: r.exceedLimit,
              },
              distribution: {
                ...distTemp,
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
              giniA: { ...r },
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
              giniB: { ...r },
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
      if (scope === "" || scope === "discover") {
        console.log("discover pull");
        setDiscoverState((s) => ({
          ...s,
          loading: { ...s.loading, gini: true },
        }));
        getDiscoverGini(props.match.params.id, (r) => {
          if (r.success) {
            setDiscoverState((s) => ({
              ...s,
              gini: r.data,
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
        case "onboarding":
          setState((s) => ({
            ...s,
            onboarding: {
              page: "profile",
              step: 0,
              running: true,
              class: `${state.globalData.entity.entityLabel} (${state.globalData.entity.entityID})`,
              filters: "",
            },
          }));
          return;
        default:
          return;
      }
    }
  }, [props.match.params.subpage, state.globalData.entity]);

  return (
    <ThemeProvider theme={theme}>
      <Notif {...state.notif} />
      <Onboarding {...state.onboarding} onChange={onboardingChangeHandler} />
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
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "fit-content",
            }}
          >
            {!state.loading ? (
              <React.Fragment>
                <Input
                  classes={{ input: `${classes.titleInput} ${classes.bold}` }}
                  value={state.globalData.name}
                  onChange={(e) => {
                    let val = e.target.value;
                    setState((s) => ({
                      ...s,
                      globalData: { ...s.globalData, name: val },
                      update: true,
                    }));
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
                      update: true,
                    }));
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
                <Box fontWeight="bold">Loading...</Box>
                <CircularProgress size={10} />
              </Typography>
            )}
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              disabled={!state.update}
              style={{ marginRight: theme.spacing(1) }}
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
                  state.globalData.entity.entityID,
                  tempFilter,
                  {
                    name: state.globalData.name,
                    author: state.globalData.author,
                  },
                  (r) => {
                    if (r.success) {
                      setState((s) => ({
                        ...s,
                        loaded: {
                          global: false,
                          profile: false,
                          compare: false,
                          discover: false,
                        },
                      }));
                      fetchData(props.match.params.page);
                    }
                  }
                );
              }}
            >
              Apply
            </Button>
            <Settings
              onChange={(e) => {
                if (e.reason === "restart_onboarding") {
                  history.push(
                    `/dashboards/${props.match.params.id}/${props.match.params.page}/onboarding`
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
          }}
        >
          {state.globalData.entity ? (
            <Grid container spacing={1} style={{ height: "100%" }}>
              <Grid item style={{ height: "100%" }} xs={5}>
                <Paper style={{ height: "100%", padding: theme.spacing(1) }}>
                  <Typography
                    variant="h2"
                    component="div"
                    style={{ marginBottom: theme.spacing(1) }}
                  >
                    <a
                      style={{ textDecoration: "none" }}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.wikidata.org/wiki/${state.globalData.entity.entityID}`}
                    >{`${state.globalData.entity.entityLabel} (${state.globalData.entity.entityID})`}</a>
                  </Typography>
                  <Typography>
                    {cut(state.globalData.entity.entityDescription, 190)}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item style={{ height: "100%" }} xs={7}>
                <Paper style={{ height: "100%", padding: theme.spacing(1) }}>
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
                          filterValueDescription: item.values.description,
                          filterValueID: item.values.id,
                          filterValueLabel: item.values.label,
                        };
                      });
                      setState((s) => ({
                        ...s,
                        update: true,
                        globalData: { ...s.globalData, filters: temp },
                      }));
                    }}
                    renderTagText={(opt) =>
                      cut(
                        `${
                          opt.property ? opt.property.label : opt.filterLabel
                        }: ${
                          opt.values ? opt.values.label : opt.filterValueLabel
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
                        globalData: { ...s.globalData, filters: temp },
                      }));
                    }}
                  />
                </Paper>
              </Grid>
            </Grid>
          ) : (
            <Loading />
          )}
        </div>
        <div>
          <SimpleTabs
            className={classes.tabs}
            dashId={props.match.params.id}
            selectedTab={props.match.params.page}
            data={{ ...state.globalData, loaded: { ...state.loaded } }}
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
    </ThemeProvider>
  );
}
