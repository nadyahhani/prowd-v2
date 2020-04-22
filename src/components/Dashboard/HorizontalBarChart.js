import React from "react";
import ChartWrapper from "./ChartWrapper";
import theme from "../../theme";

export default function HorizontalBarChart(props) {
  const config = {
    type: "horizontalBar",
    options: {
      responsive: true,
      // aspectRatio: 2.6,
      // maintainAspectRatio: true,
      legend: {
        display: false,
        position: "right",
      },
      title: {
        display: false,
        text: "Chart.js Horizontal Bar Chart",
      },
      scales: {
        xAxes: [
          {
            display: true,
            ticks: {
              autoSkip: false,
              beginAtZero: true,
              min: 0,
              max: props.max,
            },
            scaleLabel: {
              display: true,
              labelString: "Number of Entities",
              lineHeight: 1,
              padding: 0,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              autoSkip: false,
              mirror: true,
              z: 1,
              padding: -10,
              fontColor: theme.palette.common.black,
            },
          },
        ],
      },
    },
    data: {
      labels: props.labels,
      datasets: [
        {
          label: "# of Entities with this property",
          backgroundColor: theme.palette.chart.main,
          data: props.values,
        },
      ],
    },
  };
  return (
    <ChartWrapper
      className={props.classes.ChartWrapper}
      config={config}
      {...props}
    />
  );
}

HorizontalBarChart.defaultProps = {
  classes: { ChartWrapper: "" },
};
