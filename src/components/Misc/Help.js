import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";

export default function Help(props) {
  return (
    <Tooltip title={props.text}>
      <IconButton size="small">
        <HelpIcon color="primary"/>
      </IconButton>
    </Tooltip>
  );
}
