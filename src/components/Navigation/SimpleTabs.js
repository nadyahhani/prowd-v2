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
      {value === index && <Box p={3}>{children}</Box>}
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
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    // borderLeft: `1px solid ${theme.palette.accent.main}`,
    borderRight: `1px solid ${theme.palette.accent.main}`,
    borderBottom: `1px solid ${theme.palette.accent.main}`,
    // borderRight: "0 solid #FFF",
    minHeight: "5vh",
    backgroundColor: theme.palette.disabled.main,
  },
  selectedTab: {
    backgroundColor: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.common.white}`,
  },
  fillerTab: {
    width: "100%",
    borderBottom: `1px solid ${theme.palette.accent.main}`,
  },
  indicator: {
    position: "absolute",
    backgroundColor: theme.palette.common.white,
    zIndex: theme.zIndex.speedDial,
    display: "none",
  },
  tabs: {
    backgroundColor: theme.palette.disabled.main,
    minHeight: "4vh",
    // height: "5vh",
    // borderTop: `1px solid ${theme.palette.accent.main}`,
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
      <Paper variant="outlined" elevation={0}>
        <Tabs
          value={value}
          // onChange={handleChange}
          aria-label="Dashboard Navigation"
          classes={{ root: classes.tabs }}
          TabIndicatorProps={{ className: classes.indicator }}
        >
          <Tab
            component="a"
            href={`/dashboards/${props.dashId}/profile`}
            classes={{ selected: classes.selectedTab, root: classes.tab }}
            label={<Typography>Profile</Typography>}
            {...a11yProps(0)}
          />
          <Tab
            component="a"
            href={`/dashboards/${props.dashId}/compare`}
            classes={{ selected: classes.selectedTab, root: classes.tab }}
            className={classes.tab}
            label={<Typography>Compare</Typography>}
            {...a11yProps(1)}
          />
          <Tab
            component="a"
            href={`/dashboards/${props.dashId}/analysis`}
            classes={{ selected: classes.selectedTab, root: classes.tab }}
            className={classes.tab}
            label={<Typography>Analysis</Typography>}
            {...a11yProps(2)}
          />
          <div className={classes.fillerTab} />
        </Tabs>

        <TabPanel className={classes.tabPanel} value={value} index={0}>
          <Profile
            data={props.data}
            hash={props.dashId}
            updateData={props.updateData}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Compare
            data={props.data}
            hash={props.dashId}
            updateData={props.updateData}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Analysis
            data={props.data}
            hash={props.dashId}
            updateData={props.updateData}
          />
        </TabPanel>
      </Paper>
    </div>
  );
}

SimpleTabs.propTypes = {
  content: PropTypes.object,
  dashId: PropTypes.string,
  selectedTab: PropTypes.string,
  updateData: PropTypes.func,
};

SimpleTabs.defaultProps = {
  content: { profile: "", compare: "", analysis: "" },
  dashId: "123",
  selectedTab: "profile",
  updateData: () => {},
};
