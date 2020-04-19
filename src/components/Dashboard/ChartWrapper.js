import React, { Component } from "react";
import Chart from "chart.js";

export default class ChartWrapper extends Component {
  chartRef = React.createRef();
  chart;

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    this.chart = new Chart(myChartRef, {
      ...this.props.config,
      //   type: this.props.type,
      //   data: this.props.data,
      //   options: this.props.options,
    });
  }

  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}
