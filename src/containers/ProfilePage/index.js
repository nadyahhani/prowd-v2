import React from "react";
import { Typography } from "@material-ui/core";

export default function ProfilePage(props) {
  return (
    <Typography>
      this is the profile page of dashboard id: {props.match.params.id}
    </Typography>
  );
}
