import React from "react";
import ChartWrapper from "./ChartWrapper";
import theme from "../../theme";

export default function HorizontalBarChart(props) {
  const config = {
    type: "horizontalBar",
    options: {
      responsive: true,
      aspectRatio: 2.2,
      maintainAspectRatio: true,
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
          // barThickness: 10,
          backgroundColor: theme.palette.chart.main,
          // borderColor: theme.palette.chart.main,
          // borderWidth: 0.5,
          data: props.values,
        },
      ],
    },
  };
  return (
    <div style={{ padding: theme.spacing(1) }}>
      <ChartWrapper style={{ width: "100%" }} config={config} {...props} />
    </div>
  );
}
