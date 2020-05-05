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
import theme from "../../theme";
import SimpleTabs from "../../components/Navigation/SimpleTabs";
import Navbar from "../../components/Navigation/Navbar";
import {
  getDashInfo,
  getPropertyGap,
  editGlobal,
} from "../../services/dashboard";
import { getGiniEntity, getAllProperties } from "../../services/dashboard";
import { countProperties, sortProperties, cut } from "../../global";
import SettingsIcon from "@material-ui/icons/Settings";
import Loading from "../../components/Misc/Loading";
import FilterBox from "../../components/Inputs/FilterBox";

const useStyles = makeStyles(() => ({
  content: {
    padding: "1vh 1vw",
    paddingTop: "1vh",
    width: "98vw",
    height: "91vh",
    backgroundColor: theme.palette.background.main,
    overflow: "hidden",
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
    // width: "100%",
  },
}));

export default function DashboardPage(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    loading: true,
    globalData: {},
    update: false,
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
    entities: [],
    giniData: {},
    distribution: {},
    properties: [],
    propertySort: 0,
    gap: [],

    // loading states
    loading: {
      gini: true,
      properties: true,
      propertiesOptions: false,
      gap: true,
    },
  });

  const fetchData = React.useCallback(() => {
    // Global
    getDashInfo(props.match.params.id, (r) => {
      if (r.success) {
        setState((s) => ({ ...s, loading: false, globalData: { ...r } }));
      }
    });

    // Profile
    getAllProperties(props.match.params.id, (r) => {
      if (r.success) {
        const temp = sortProperties(r.properties);
        setProfileState((s) => ({
          ...s,
          properties: r.properties,
          mappedProperties: temp,
          loading: { ...s.loading, properties: false },
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
        getPropertyGap(props.match.params.id, (r) => {
          if (r.success) {
            console.log(r);

            setProfileState((s) => ({
              ...s,
              loading: { ...s.loading, gap: false },
              gap: [...r.properties],
            }));
          }
        });
      }
    });
  }, [props.match.params.id]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <ThemeProvider theme={theme}>
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
            {state.globalData.name && state.globalData.author ? (
              <React.Fragment>
                <Input
                  classes={{ input: `${classes.titleInput} ${classes.bold}` }}
                  value={state.globalData.name}
                />
                <Typography
                  style={{ padding: "0 .4vw" }}
                  variant="h2"
                >{` by `}</Typography>
                <Input
                  classes={{ input: classes.titleInput }}
                  value={state.globalData.author}
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
                  (r) => {
                    if (r.success) {
                      fetchData();
                    }
                  }
                );
              }}
            >
              Apply
            </Button>
            <IconButton size="small" edge="end">
              <SettingsIcon color="primary" />
            </IconButton>
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
                  <Typography variant="h2">
                    {`${state.globalData.entity.entityLabel} (${state.globalData.entity.entityID})`}
                  </Typography>
                  <Typography>
                    {state.globalData.entity.entityDescription}
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
            data={state.globalData}
            states={{ profile: profileState, compare: compareState }}
            setStates={{ profile: setProfileState, compare: setCompareState }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
