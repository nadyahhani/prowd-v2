import React from "react";
import ChartWrapper from "./ChartWrapper";

function LineChart(props) {
  console.log(props);

  const config = {
    type: "line",
    data: props.data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      title: {
        display: false,
        text: "Distribution Comparison",
      },
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
              labelString: "Number of Entities",
            },
          },
        ],
      },
    },
  };
  return (
    <ChartWrapper config={config} className={props.classes.ChartWrapper} />
  );
}

export default LineChart;

LineChart.defaultProps = {
  classes: { ChartWrapper: "", root: "" },
};
