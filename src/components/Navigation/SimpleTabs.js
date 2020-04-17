import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Paper } from "@material-ui/core";

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
    // borderTop: `1px solid ${theme.palette.accent.main}`,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Paper variant="outlined" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          classes={{ root: classes.tabs }}
          TabIndicatorProps={{ className: classes.indicator }}
        >
          <Tab
            component="a"
            href="/dashboards/123/profile"
            classes={{ selected: classes.selectedTab, root: classes.tab }}
            label={<Typography>Profile</Typography>}
            {...a11yProps(0)}
          />
          <Tab
            component="a"
            href="/dashboards/123/compare"
            classes={{ selected: classes.selectedTab, root: classes.tab }}
            className={classes.tab}
            label={<Typography>Compare</Typography>}
            {...a11yProps(1)}
          />
          <Tab
            component="a"
            href="/dashboards/123/analysis"
            classes={{ selected: classes.selectedTab, root: classes.tab }}
            className={classes.tab}
            label={<Typography>Analysis</Typography>}
            {...a11yProps(2)}
          />
          <div className={classes.fillerTab} />
        </Tabs>

        <TabPanel className={classes.tabPanel} value={value} index={0}>
          Profile
        </TabPanel>
        <TabPanel value={value} index={1}>
          Compare
        </TabPanel>
        <TabPanel value={value} index={2}>
          Analysis
        </TabPanel>
      </Paper>
    </div>
  );
}
