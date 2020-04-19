import React from "react";
import ChartWrapper from "./ChartWrapper";

const dataValues = [12, 19, 3, 5];
const dataLabels = [0, 1, 2, 3, 4];
const data = {
  labels: dataLabels,
  datasets: [
    {
      label: "Group A",
      data: dataValues,
      backgroundColor: "rgba(255, 99, 132, 1)",
    },
  ],
};
const config = {
  type: "bar",
  data: {
    labels: dataLabels,
    datasets: [
      {
        label: "Group A",
        data: dataValues,
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  },
  options: {
    scales: {
      xAxes: [
        {
          display: false,
          barPercentage: 1.3,
          ticks: {
            max: 3,
          },
        },
        {
          display: true,
          ticks: {
            autoSkip: false,
            max: 4,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
};

function Histogram(props) {
  return <ChartWrapper config={config} />;
}

export default Histogram;
