import React from "react";
import ChartWrapper from "./ChartWrapper";
import { prototype } from "chart.js";

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
      tooltips: {
        titleSpacing: 6,
        xPadding: 20,
        yPadding: 20,
        filter: function (tooltipItem, data) {
          if (data.datasets[tooltipItem.datasetIndex].show) {
            if (
              data.datasets[tooltipItem.datasetIndex].show[
                tooltipItem.index
              ] === 0
            ) {
              return false;
            } else {
              return true;
            }
          } else {
            return true;
          }
        },
        callbacks: {
          label: function (tooltipItem, data) {
            const maxItem = data.datasets[tooltipItem.datasetIndex].entityCount;
            let maxProps = "";
            let number = "";
            if (
              typeof data.datasets[tooltipItem.datasetIndex].actualLabels[0] ===
              "number"
            ) {
              maxProps = Math.max.apply(
                Math,
                data.datasets[tooltipItem.datasetIndex].actualLabels
              );
              number =
                data.datasets[tooltipItem.datasetIndex].actualLabels[
                  tooltipItem.index
                ];
            } else {
              maxProps =
                data.datasets[tooltipItem.datasetIndex].actualLabels[
                  data.datasets[tooltipItem.datasetIndex].actualLabels.length -
                    1
                ];

              number =
                data.datasets[tooltipItem.datasetIndex].actualLabels[
                  tooltipItem.index
                ];
            }

            const items =
              data.datasets[tooltipItem.datasetIndex].actualValues[
                tooltipItem.index
              ];

            const percent = data.datasets[tooltipItem.datasetIndex].data[
              tooltipItem.index
            ].toFixed(2);
            const labels = data.labels[tooltipItem.index];
            if (!props.multiple) {
              let label =
                `${items} item${
                  items > 1 ? "s" : ""
                } (${percent}% of ${maxItem}) has ${number} propert${
                  number > 1 ? "ies" : "y"
                } (${labels} of ${maxProps})` || "";
              return label;
            } else {
              let label2 =
                `${items} items (${percent}% of ${maxItem}) has ${number} propert${
                  number > 1 ? "ies" : "ies"
                }` || "";
              return label2;
            }
          },
        },
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
              labelString: "Percentage of Properties",
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
              labelString: "Percentage of Items",
            },
          },
        ],
      },
    },
  };
  const percentConfig = {
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
      elements: {
        point: {
          radius: 0,
        },
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
              labelString: "Percentage of Properties",
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
              labelString: "Percentage of Items",
            },
          },
        ],
      },
    },
  };
  return (
    <ChartWrapper
      config={props.percentage ? percentConfig : config}
      className={props.classes.ChartWrapper}
    />
  );
}

export default LineChart;

LineChart.defaultProps = {
  classes: { ChartWrapper: "", root: "" },
  percentage: false,
  multiple: false,
};
