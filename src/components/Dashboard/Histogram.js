import React from "react";
import ChartWrapper from "./ChartWrapper";
import theme from "../../theme";

function Histogram(props) {

  const config = {
    type: "bar",
    data: {
      labels: props.labels,
      datasets: [
        {
          barPercentage: 1.3,
          label: "# of Items",
          data: props.values,
          backgroundColor: theme.palette.chart.main,
        },
      ],
    },
    options: {
      legend: { display: false },
      scales: {
        xAxes: [
          {
            display: false,
            ticks: {
              // max: 10000,
              autoSkip: true,
            },
          },
          {
            display: true,
            ticks: {
              autoSkip: true,
              maxTicksLimit: 11,
              max: props.maxLabel,
            },
            scaleLabel: {
              display: true,
              labelString: "Number of Properties",
              lineHeight: 1,
              padding: 0,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              max: props.maxValue,
            },
            scaleLabel: {
              display: true,
              labelString: "Number of Items",
            },
          },
        ],
      },
    },
  };
  return (
    <div className={props.classes.root}>
      <ChartWrapper
        config={config}
        className={props.classes.ChartWrapper}
        style={{ height: "inherit", width: "inherit" }}
      />
    </div>
  );
}

export default Histogram;

Histogram.defaultProps = {
  classes: { ChartWrapper: "", root: "" },
};
