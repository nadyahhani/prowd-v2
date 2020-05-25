import React from "react";
import ChartWrapper from "./ChartWrapper";
import { linearLine } from "../../global";
import PropTypes from "prop-types";
import { Typography, Box } from "@material-ui/core";
import theme from "../../theme";

function GiniChart(props) {
  const getColor = (type = "") => {
    if (type === "") {
      if (props.item === "single") {
        return theme.palette.chart.opaque;
      } else if (props.item === "A") {
        return theme.palette.itemA.opaque;
      } else {
        return theme.palette.itemB.opaque;
      }
    } else {
      if (props.item === "single") {
        return theme.palette.chart.main;
      } else if (props.item === "A") {
        return theme.palette.itemA.main;
      } else {
        return theme.palette.itemB.main;
      }
    }
  };

  const getGiniAreaColor = (type = "") => {
    if (type === "") {
      if (props.gini < 0.2) {
        return theme.palette.success.transparent;
      } else if (props.gini >= 0.4) {
        return theme.palette.error.transparent;
      } else {
        return theme.palette.warning.transparent;
      }
    } else {
      if (props.gini < 0.2) {
        return theme.palette.success.main;
      } else if (props.gini >= 0.4) {
        return theme.palette.error.main;
      } else {
        return theme.palette.warning.main;
      }
    }
  };
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
        data: props.data,
        actual: [0, ...props.actual],
        fill: true,
        borderColor: getColor(),
        backgroundColor: getColor("transparent"),
        pointBorderColor: getColor(),
        pointBackgroundColor: getColor(),
        pointHoverBackgroundColor: getColor(),
        pointHoverBorderColor: getColor(),
        id: "2",
      },
      {
        type: "line",
        data: props.data
          ? linearLine(
              props.data[0],
              props.data[props.data.length - 1],
              props.data.length
            )
          : null,
        pointRadius: 0,
        hoverRadius: 0,
        actual: [],
        fill: true,
        borderColor: getGiniAreaColor("transparent"),
        backgroundColor: getGiniAreaColor(),
        pointBorderColor: getGiniAreaColor("transparent"),
        pointBackgroundColor: getGiniAreaColor("transparent"),
        pointHoverBackgroundColor: getGiniAreaColor("transparent"),
        pointHoverBorderColor: getGiniAreaColor("transparent"),
        id: "1",
      },
    ],
  };
  const options = {
    responsive: true,
    aspectRatio: 1,
    maintainAspectRatio: true,
    legend: {
      display: false,
    },
    tooltips: {
      mode: "nearest",
      titleSpacing: 6,
      xPadding: 20,
      yPadding: 20,
      callbacks: {
        label: function (tooltipItem, data) {
          let label = `${
            data.datasets[tooltipItem.datasetIndex].actual[tooltipItem.index]
          } items possess ${(
            data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] *
            100
          ).toFixed(1)}% `;

          return label;
        },
        afterLabel: function (tooltipItem, data) {
          return `of the total number of properties.`;
        },
      },
    },
    elements: {
      line: {
        fill: false,
      },
      point: {
        radius: props.simple ? 2 : 3,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 1,
            display: !props.simple,
            callback: function (value, index, values) {
              return value * 100 + "%";
            },
          },
          scaleLabel: {
            labelString: "Cumulative Share of Properties Owned",
            lineHeight: 1,
            padding: 0,
            display: !props.simple,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            display: !props.simple,
          },
          scaleLabel: {
            labelString:
              "Cumulative Share of Items (Lowest to Highest # of Properties)",
            lineHeight: 1,
            padding: 0,
            display: !props.simple,
          },
        },
      ],
    },
  };

  React.useEffect(() => {});

  return (
    <React.Fragment>
      <div className={props.classes.root} style={{ position: "relative" }}>
        <Typography
          variant="h2"
          component="div"
          style={{ position: "absolute", left: "25%", top: "35%" }}
        >
          <Box fontWeight="bold">{props.gini}</Box>
        </Typography>
        <ChartWrapper
          // style={{ height: "inherit", width: "inherit" }}
          className={props.classes.ChartWrapper}
          config={{ type: "line", data: data, options: options }}
        />
      </div>
    </React.Fragment>
  );
}

export default GiniChart;

GiniChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number),
  gini: PropTypes.number,
  labels: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.object,
  className: PropTypes.string,
  ratio: PropTypes.number,
  simple: PropTypes.bool,
  item: PropTypes.string,
};

GiniChart.defaultProps = {
  classes: { root: "", ChartWrapper: "" },
  ratio: 1,
  simple: false,
  item: "single",
  actual: [],
};
