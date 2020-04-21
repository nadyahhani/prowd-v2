import React from "react";
import ChartWrapper from "./ChartWrapper";
import { linearLine } from "../../global";
import PropTypes from "prop-types";
import theme from "../../theme";

function GiniChart(props) {
  const data = {
    type: "line",
    labels: props.labels
      ? props.labels
      : [
          "0%",
          "10%",
          "20%",
          "30%",
          "40%",
          "50%",
          "60%",
          "70%",
          "80%",
          "90%",
          "100%",
        ],
    datasets: [
      {
        type: "line",
        data: props.data
          ? linearLine(
              props.data[0],
              props.data[props.data.length - 1],
              props.data.length
            )
          : null,
        fill: true,
        borderColor: "#EC932F",
        backgroundColor: "rgba(64, 190, 254,.2)",
        pointBorderColor: "#EC932F",
        pointBackgroundColor: "#EC932F",
        pointHoverBackgroundColor: "#EC932F",
        pointHoverBorderColor: "#EC932F",
        id: "1",
      },
      {
        type: "line",
        data: props.data,
        fill: true,
        borderColor: "#51945b",
        backgroundColor: "rgba(202, 154, 0,.2)",
        pointBorderColor: "#51945b",
        pointBackgroundColor: "#51945b",
        pointHoverBackgroundColor: "#51945b",
        pointHoverBorderColor: "#51945b",
        id: "2",
      },
    ],
  };

  const options = {
    responsive: true,
    aspectRatio: 1.6,
    maintainAspectRatio: true,
    legend: {
      display: false,
    },
    tooltips: {
      titleSpacing: 6,
      xPadding: 20,
      yPadding: 20,
    },
    elements: {
      line: {
        fill: false,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 1,
          },
        },
      ],
    },
  };

  React.useEffect(() => {});

  return (
    <div
      className={props.className}
      style={{
        // paddingTop: theme.spacing(1),
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.data ? (
        <ChartWrapper
          className={props.classes.ChartWrapper}
          config={{ type: "line", data: data, options: options }}
        />
      ) : (
        <React.Fragment />
      )}
    </div>
  );
}

export default GiniChart;

GiniChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number),
  labels: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.object,
  className: PropTypes.string,
};
