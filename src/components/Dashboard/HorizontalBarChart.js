import React from "react";
import ChartWrapper from "./ChartWrapper";
import theme from "../../theme";

export default function HorizontalBarChart(props) {
  const config = {
    type: "horizontalBar",
    options: {
      animation: {
        duration: 0, // general animation time
      },
      hover: {
        animationDuration: 0, // duration of animations when hovering an item
      },
      responsiveAnimationDuration: 0, // animation duration after a resize
      responsive: true,
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
            display: !props.simple,
            ticks: {
              autoSkip: false,
              beginAtZero: true,
              min: 0,
              max: props.max,
              callback: function (value, index, values) {
                if (props.percent) {
                  return value + "%";
                }
                return value;
              },
            },
            scaleLabel: {
              display: !props.simple,
              labelString: props.percent
                ? "Percentage of Items"
                : "Number of Items",
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
    data: props.data,
  };

  var barOptions_stacked = {
    animation: false,
    tooltips: {
      enabled: true,
    },
    hover: {
      animationDuration: 0,
    },
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontFamily: "'Open Sans Bold', sans-serif",
            fontSize: 11,
          },
          scaleLabel: {
            display: !props.simple,
            labelString: props.percent
              ? "Percentage of Items"
              : "Number of Items",
            lineHeight: 1,
            padding: 0,
          },
          gridLines: {},
          stacked: true,
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
            color: "#fff",
            zeroLineColor: "#fff",
            zeroLineWidth: 0,
          },
          ticks: {
            autoSkip: false,
            mirror: true,
            z: 1,
            padding: -10,
            fontColor: theme.palette.common.black,
          },
          stacked: true,
        },
      ],
    },
    legend: {
      display: false,
    },
  };

  const stacked = {
    type: "horizontalBar",
    data: props.data,

    options: barOptions_stacked,
  };
  return (
    <div className={props.classes.root}>
      <ChartWrapper
        className={props.classes.ChartWrapper}
        style={{ height: "100%", width: "100%" }}
        config={props.stacked ? stacked : config}
        {...props}
      />
    </div>
  );
}

HorizontalBarChart.defaultProps = {
  classes: { ChartWrapper: "", root: "" },
  simple: false,
  stacked: false,
  percent: false,
};
