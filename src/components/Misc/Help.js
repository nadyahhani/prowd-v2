import React from "react";
import { Tooltip, IconButton, Typography } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";

export default function Help(props) {
  return (
    <Tooltip
      title={
        typeof props.text === "string" ? (
          <Typography>{props.text}</Typography>
        ) : (
          props.text
        )
      }
    >
      <IconButton size="small">
        <HelpIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
}
