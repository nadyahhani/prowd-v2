import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Paper } from "@material-ui/core";
import Profile from "../../containers/DashboardPage/Profile";
import Analysis from "../../containers/DashboardPage/Analysis";
import Compare from "../../containers/DashboardPage/Compare";
import { useHistory } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.main,
  },
  tab: {
    minHeight: "5vh",
    backgroundColor: theme.palette.accent.light,
  },
  selectedTab: {
    backgroundColor: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.common.white}`,
    fontWeight: "bold",
  },
  fillerTab: {
    width: "100%",
    borderBottom: `1px solid ${theme.palette.accent.main}`,
  },
  indicator: {
    display: "none",
  },
  tabs: {
    backgroundColor: theme.palette.accent.light,
    minHeight: "4vh",
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    switch (props.selectedTab) {
      case "compare":
        setValue(1);
        return;
      case "analysis":
        setValue(2);
        return;
      default:
        setValue(0);
        return;
    }
  }, [props.selectedTab]);

  return (
    <div
      className={`${classes.root} ${props.className ? props.className : ""}`}
    >
      {value === 0 || value === 1 || value === 2 ? (
        <Paper>
            <Tabs
              value={value}
              aria-label="Dashboard Navigation"
              classes={{ root: classes.tabs }}
              TabIndicatorProps={{ className: classes.indicator }}
            >
              <Tab
                component="a"
                onClick={() => {
                  history.push(`/dashboards/${props.dashId}/profile`);
                }}
                classes={{ selected: classes.selectedTab, root: classes.tab }}
                label={
                  <Typography component="div">
                    <Box fontWeight="bold">Profile</Box>
                  </Typography>
                }
                {...a11yProps(0)}
                id="profile-tab"
              />
              <Tab
                component="a"
                onClick={() => {
                  history.push(`/dashboards/${props.dashId}/compare`);
                }}
                classes={{ selected: classes.selectedTab, root: classes.tab }}
                className={classes.tab}
                label={
                  <Typography component="div">
                    <Box fontWeight="bold">Compare</Box>
                  </Typography>
                }
                {...a11yProps(1)}
                id="compare-tab"
              />
              <Tab
                component="a"
                onClick={() => {
                  history.push(`/dashboards/${props.dashId}/analysis`);
                }}
                classes={{ selected: classes.selectedTab, root: classes.tab }}
                className={classes.tab}
                label={
                  <Typography component="div">
                    <Box fontWeight="bold">Discover</Box>
                  </Typography>
                }
                {...a11yProps(2)}
                id="discover-tab"
              />
              {/* <div className={classes.fillerTab} /> */}
            </Tabs>
          <TabPanel value={value} index={0}>
            <Profile
              data={props.data}
              hash={props.dashId}
              fetchData={props.fetchData}
              updateData={props.updateData}
              state={props.states.profile}
              setState={props.setStates.profile}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Compare
              data={props.data}
              hash={props.dashId}
              fetchData={props.fetchData}
              updateData={props.updateData}
              state={props.states.compare}
              setState={props.setStates.compare}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Analysis
              data={props.data}
              hash={props.dashId}
              fetchData={props.fetchData}
              updateData={props.updateData}
              state={props.states.discover}
              setState={props.setStates.discover}
            />
          </TabPanel>
        </Paper>
      ) : null}
    </div>
  );
}

SimpleTabs.propTypes = {
  content: PropTypes.object,
  dashId: PropTypes.string,
  selectedTab: PropTypes.string,
  updateData: PropTypes.func,
  states: PropTypes.object,
  setStates: PropTypes.object,
};

SimpleTabs.defaultProps = {
  content: { profile: "", compare: "", analysis: "" },
  dashId: "123",
  selectedTab: "profile",
  updateData: () => {},
  states: {},
  setStates: {},
};
