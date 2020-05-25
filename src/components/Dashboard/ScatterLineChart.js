import React from "react";
import ChartWrapper from "./ChartWrapper";

function ScatterLineChart(props) {
  // React.useEffect(() => {
  //   console.log(props.data);
  // }, [props.data]);
  const config = {
    type: "scatter",
    data: {
      ...props.data,
    },
    options: {
      fontSize: 10,
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: !props.hideLegend },
      title: {
        display: false,
        text: "Distribution Comparison",
      },
      tooltips: {
        mode: "nearest",
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
            const index = tooltipItem.index;
            const current = data.datasets[tooltipItem.datasetIndex];
            const propertyPercent = Object.keys(current.raw).map(
              (item) => (parseInt(item) * 100) / (current.raw.length - 1)
            );
            const propertyActual = Object.keys(current.raw);
            const dataPercent = current.raw.map(
              (item) => (parseInt(item) * 100) / current.amount
            );
            const maxItem = current.amount;
            const maxProps = propertyActual[propertyActual.length - 1];

            let label = `${current.name}: ${current.raw[index]} item${
              parseInt(current.raw[index]) > 1 ? "s" : ""
            } (${dataPercent[index].toFixed(1)}% of ${maxItem}) has ${
              propertyActual[index]
            } propert${
              propertyActual[index] > 1 ? "ies" : "y"
            } (${propertyPercent[index].toFixed(1)}% of ${maxProps})`;
            return label;
          },
        },
      },
      scales: {
        xAxes: [
          {
            drawOnChartArea: false,
            display: true,
            ticks: {
              autoSkip: true,
              maxTicksLimit: 11,
              min: 0,
              max: 100,
              callback: function (value, index, values) {
                return value + "%";
              },
            },
            scaleLabel: {
              display: true,
              labelString: "Percentage of Properties (of max # of properties)",
              lineHeight: 1,
              padding: 0,
            },
          },
        ],
        yAxes: [
          {
            drawOnChartArea: false,
            ticks: {
              beginAtZero: true,
              callback: function (value, index, values) {
                if (props.numeric) {
                  return value;
                }
                return value + "%";
              },
            },
            scaleLabel: {
              display: true,
              labelString: props.numeric
                ? "Number of Items"
                : "Percentage of Items (of # of items)",
            },
          },
        ],
      },
    },
  };

  return (
    <ChartWrapper
      key={props.key}
      config={config}
      className={props.classes.ChartWrapper}
    />
  );
}

export default ScatterLineChart;

ScatterLineChart.defaultProps = {
  hideLegend: false,
};
