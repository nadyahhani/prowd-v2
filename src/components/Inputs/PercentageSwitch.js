import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "fit-content",
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    minWidth: "fit-content",
    minHeight: "2vh",
    backgroundColor: theme.palette.disabled.light,
  },
  tabs: {
    backgroundColor: theme.palette.disabled.light,
    minHeight: "2vh",
    // height: "5vh",
    // borderTop: `1px solid ${theme.palette.accent.main}`,
  },
}));

export default function PercentageSwitch(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        classes={{ root: classes.tabs }}
        aria-label="simple tabs example"
      >
        <Tab
          label={
            <Typography component="div">
              <Box fontWeight="bold">#</Box>
            </Typography>
          }
          {...a11yProps(0)}
          classes={{ root: classes.tab }}
        />
        <Tab
          label={
            <Typography component="div">
              <Box fontWeight="bold">%</Box>
            </Typography>
          }
          {...a11yProps(1)}
          classes={{ root: classes.tab }}
        />
      </Tabs>
    </div>
  );
}
