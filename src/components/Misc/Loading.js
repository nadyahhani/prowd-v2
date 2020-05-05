import React from "react";
import { CircularProgress } from "@material-ui/core";

export default function Loading(props) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.secondary ? (
        <CircularProgress color="secondary" size={11} />
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
