import React from "react";
import PropTypes from "prop-types";
import HorizontalBarChart from "./HorizontalBarChart";
import theme from "../../theme";
import { makeStyles } from "@material-ui/core";
import AllPropertiesModal from "./AllPropertiesModal";
import Loading from "../Misc/Loading";

const useStyles = makeStyles(() => ({
  horizontalbar: { width: "100%", height: "72%" },
  horizontalbarchart: { width: "100%", height: "100%" },
}));

export default function ProfileProperties(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    ascNum: {},
    descNum: {},
    ascPer: {},
    descPer: {},
    loading: true,
  });
  React.useEffect(() => {
    setState((s) => {
      const result = { ascNum: {}, descNum: {}, ascPer: {}, descPer: {} };
      const percentVals = props.values.map((item) =>
        ((item * 100) / props.max).toFixed(1)
      );
      result.ascNum.labels = [...props.labels].reverse();
      result.ascNum.values = [...props.values].reverse();
      result.ascNum.max = props.max;
      result.descNum.labels = [...props.labels];
      result.descNum.values = [...props.values];
      result.descNum.max = props.max;
      result.ascPer.labels = [...props.labels].reverse();
      result.ascPer.values = [...percentVals].reverse();
      result.ascPer.max = 100;
      result.descPer.labels = [...props.labels];
      result.descPer.values = [...percentVals];
      result.descPer.max = 100;
      return { ...s, ...result, loading: false };
    });
  }, [props.labels, props.values, props.max]);

  const getKey = () => {
    switch (`${props.propertySort}${props.propertyPercent}`) {
      case "01":
        return "descPer";
      case "10":
        return "ascNum";
      case "11":
        return "ascPer";
      default:
        return "descNum";
    }
  };

  if (!state.loading) {
    const key = getKey();
    let tempLabels = state[key].labels.map(
      (item, idx) =>
        `${item}: ${state[key].values[idx]}${
          props.propertyPercent === 1 ? "%" : ""
        }`
    );

    return (
      <React.Fragment>
        <HorizontalBarChart
          percent={props.propertyPercent === 1}
          key={`${key}-chart`}
          data={{
            labels: tempLabels.slice(0, 5),
            datasets: [
              {
                label:
                  props.propertyPercent === 1
                    ? "Percentage of items with this property"
                    : "Number of Items with this property",
                backgroundColor: theme.palette.chart.main,
                data: state[key].values.slice(0, 5),
              },
            ],
          }}
          max={state[key].max}
          classes={{
            root: classes.horizontalbar,
            ChartWrapper: classes.horizontalbarchart,
          }}
        />
        <AllPropertiesModal
        ascending
          key={`${key}-modal`}
          data={{
            labels: tempLabels,
            values: state[key].values,
            max: state[key].max,
          }}
          label={
            props.propertyPercent === 1
              ? "Percentage of items with this property"
              : "Number of Items with this property"
          }
        />
      </React.Fragment>
    );
  } else {
    return <Loading />;
  }
}

ProfileProperties.propTypes = {
  max: PropTypes.number || PropTypes.bool,
  labels: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.number),
  propertySort: PropTypes.number,
  propertyPercent: PropTypes.number,
};

ProfileProperties.defaultProps = {
  max: false,
  labels: [],
  values: [],
  propertySort: 0,
  propertyPercent: 0,
};
