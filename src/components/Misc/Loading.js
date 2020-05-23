import React from "react";
import { CircularProgress } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

export default function Loading(props) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: props.alignLeft ? "flex-statrt" : "center",
        alignItems: "center",
      }}
    >
      {props.secondary ? (
        <CircularProgress color="secondary" size={11} />
      ) : (
        <Skeleton
          variant={props.variant}
          animation="wave"
          style={
            props.notfill
              ? {}
              : {
                  height: "100%",
                  width: "100%",
                }
          }
          {...props}
        />
      )}
    </div>
  );
}

Loading.defaultProps = {
  variant: "rect",
  notfill: false,
};
