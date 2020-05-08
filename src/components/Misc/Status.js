import React from "react";
import { Typography, Box, makeStyles, Paper } from "@material-ui/core";
import theme from "../../theme";

export default function Status(props) {
  const getColor = () => {
    if (props.value < 0.2) {
      return theme.palette.success.main;
    } else if (props.value >= 0.4) {
      return theme.palette.error.main;
    } else {
      return theme.palette.warning.main;
    }
  };
  const getLabel = () => {
    if (props.value < 0.2) {
      return "BALANCED";
    } else if (props.value >= 0.4) {
      return "HEAVILY IMBALANCED";
    } else {
      return "IMBALANCED";
    }
  };
  const useStyles = makeStyles(() => ({
    root: {
      backgroundColor: getColor(),
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    },
  }));
  const classes = useStyles();
  return (
    <Paper classes={{ root: classes.root }} elevation={0}>
      <Typography component="div">
        <Box
          fontWeight="bold"
          style={{ color: theme.palette.common.white }}
          textAlign="center"
        >
          {`${getLabel()}`}
        </Box>
      </Typography>
    </Paper>
  );
}
