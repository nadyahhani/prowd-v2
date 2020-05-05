import React from "react";
import { Typography, Box, makeStyles, Paper } from "@material-ui/core";
import theme from "../../theme";

export default function Status(props) {
  const getColor = () => {
    let temp = props.children.toLowerCase();
    switch (temp) {
      case "balanced":
        return theme.palette.success.main;
      case "imbalanced":
        return theme.palette.warning.main;
      default:
        return theme.palette.error.main;
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
          {props.children.toUpperCase()}
        </Box>
      </Typography>
    </Paper>
  );
}
