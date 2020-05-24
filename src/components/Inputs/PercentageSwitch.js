import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import theme from "../../theme";
import { Paper, ButtonGroup, Button } from "@material-ui/core";

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
  const [value, setValue] = React.useState(props.percentFirst ? 1 : 0);

  return (
    <ButtonGroup color="primary" {...props}>
      <Button
        onClick={() => {
          setValue(0);
          props.onChange(0);
        }}
        variant={value === 0 ? "contained" : "outlined"}
      >
        #
      </Button>
      <Button
        variant={value === 1 ? "contained" : "outlined"}
        onClick={() => {
          setValue(1);
          props.onChange(1);
        }}
      >
        %
      </Button>
    </ButtonGroup>
  );
}

PercentageSwitch.propTypes = {
  onChange: PropTypes.func,
};
PercentageSwitch.defaultProps = {
  onChange: () => {},
};
