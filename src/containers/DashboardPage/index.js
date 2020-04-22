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
} from "@material-ui/core";
import theme from "../../theme";
import SimpleTabs from "../../components/Navigation/SimpleTabs";
import Navbar from "../../components/Navigation/Navbar";
import { getDashInfo, getPropertyGap } from "../../services/dashboard";
import { getGiniEntity, getAllProperties } from "../../services/dashboard";
import { countProperties, sortProperties } from "../../global";
import SettingsIcon from "@material-ui/icons/Settings";

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
}));

export default function DashboardPage(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    loading: true,
    globalData: {},
    update: false,
  });

  const [profileState, setProfileState] = React.useState({
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

  React.useEffect(() => {
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
    getGiniEntity(props.match.params.id, (r) => {
      if (r.success) {
        const distTemp = countProperties(r.entities);
        setProfileState((s) => ({
          ...s,
          entities: [...r.entities.reverse()],
          giniData: {
            gini: r.gini,
            each_amount: r.each_amount,
            data: r.data,
            percentileData: r.percentileData,
            amount: r.amount,
            insight: r.insight,
          },
          distribution: {
            ...distTemp,
          },
          loading: { ...s.loading, gini: false },
        }));
      }
    });

    getPropertyGap(props.match.params.id, (r) => {
      if (r.success) {
        console.log(r);

        setProfileState((s) => ({
          ...s,
          gap: [...r.properties],
        }));
      }
    });
  }, [props.match.params.id]);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div className={classes.content}>
        <div
          style={{
            marginBottom: theme.spacing(2),
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
            >
              Refresh
            </Button>
            <IconButton size="small" edge="end">
              <SettingsIcon color="primary" />
            </IconButton>
          </div>
        </div>
        <div>
          <SimpleTabs
            className={classes.tabs}
            dashId={props.match.params.id}
            selectedTab={props.match.params.page}
            states={{ profile: profileState }}
            setStates={{ profile: setProfileState }}
            data={state.globalData}
            updateData={setState}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
