import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import theme from "../../theme";
import { Paper } from "@material-ui/core";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  root: {
    width: "fit-content",
    height: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    minWidth: "fit-content",
    minHeight: "100%",
    backgroundColor: theme.palette.accent.light,
  },
  selectedTab: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    // border: `1px solid ${theme.palette.primary.main}`,
    fontWeight: "bold",
  },
  fillerTab: {
    width: "100%",
    borderBottom: `1px solid ${theme.palette.accent.main}`,
  },
  indicator: {
    // display: "none",
    backgroundColor: theme.palette.primary.main,
  },
  tabs: {
    backgroundColor: theme.palette.accent.light,
    width: "fit-content",
    minHeight: "100%",
    border: `1px solid ${theme.palette.accent.light}`,
  },
}));

export default function PercentageSwitch(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.onChange(newValue);
  };

  return (
    <Paper className={classes.root} elevation={0} variant="outlined">
      <Tabs
        value={value}
        onChange={handleChange}
        classes={{ root: classes.tabs }}
        TabIndicatorProps={{ className: classes.indicator }}
        aria-label="simple tabs example"
        variant="fullWidth"
      >
        <Tab
          label={
            <Typography component="div">
              <Box fontWeight="bold">#</Box>
            </Typography>
          }
          {...a11yProps(0)}
          classes={{ selected: classes.selectedTab, root: classes.tab }}
        />
        <Tab
          label={
            <Typography component="div">
              <Box fontWeight="bold">%</Box>
            </Typography>
          }
          {...a11yProps(1)}
          classes={{ selected: classes.selectedTab, root: classes.tab }}
        />
      </Tabs>
    </Paper>
  );
}

PercentageSwitch.propTypes = {
  onChange: PropTypes.func,
};
PercentageSwitch.defaultProps = {
  onChange: () => {},
};
