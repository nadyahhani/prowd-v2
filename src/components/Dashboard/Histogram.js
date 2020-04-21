import React from "react";
import ChartWrapper from "./ChartWrapper";
import theme from "../../theme";

function Histogram(props) {
  console.log(props);

  const config = {
    type: "bar",
    data: {
      labels: props.labels,
      datasets: [
        {
          label: "# of Entities",
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
            barPercentage: 1.3,
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
    <div style={{ paddingTop: theme.spacing(1) }}>
      <ChartWrapper config={config} />
    </div>
  );
}

export default Histogram;
