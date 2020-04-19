import React from "react";
import ChartWrapper from "./ChartWrapper";

const config = {
  type: "horizontalBar",
  options: {
    elements: {
      rectangle: {
        borderWidth: 2,
      },
    },
    responsive: true,
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Chart.js Horizontal Bar Chart",
    },
  },
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dataset 1",
        backgroundColor: "cyan",
        borderColor: "cyan",
        borderWidth: 1,
        data: [0, 1, 2, 3, 4, 5, 6, 7],
      },
      {
        label: "Dataset 2",
        backgroundColor: "cyan",
        borderColor: "cyan",
        data: [0, 1, 2, 3, 4, 5, 6, 7],
      },
    ],
  },
};

export default function HorizontalBarChart(props) {
  return <ChartWrapper config={config} {...props} />;
}
