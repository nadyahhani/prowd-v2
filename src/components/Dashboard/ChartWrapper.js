import React, { Component } from "react";
import Chart from "chart.js";
import theme from "../../theme";

export default class ChartWrapper extends Component {
  chartRef = React.createRef();
  chart;

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    Chart.defaults.global.defaultFontSize = 10;
    Chart.defaults.global.defaultFontFamily = theme.typography.fontFamily;
    this.chart = new Chart(myChartRef, {
      ...this.props.config,
    });
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.config.data);

    this.chart.update();
  }

  render() {
    return (
      <div className={this.props.className}>
        <canvas
          id={this.props.key ? this.props.key : "myChart"}
          ref={this.chartRef}
          style={this.props.style}
        />
      </div>
    );
  }
}
