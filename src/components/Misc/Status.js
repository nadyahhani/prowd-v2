import React from "react";
import { Typography, Box, makeStyles, Paper, Tooltip } from "@material-ui/core";
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
      return "Balanced";
    } else if (props.value >= 0.4) {
      return "Heavily Imbalanced";
    } else {
      return "Imbalanced";
    }
  };
  const getTooltip = (topic = "topic") => {
    if (props.value < 0.2) {
      return `The items of this ${topic} have a similar amount of information (property).`;
    } else if (props.value >= 0.4) {
      return `The items of this ${topic} have a very different amount of information (property). Several items have a high amount of information while some other items have a very low amount of information.`;
    } else {
      return `The items of this ${topic} have a different amount of information (property). Some items have a quite high amount of information while other items may not have as much .`;
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
    <Tooltip title={<Typography>{getTooltip()}</Typography>}>
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
    </Tooltip>
  );
}
