import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import HorizontalBarChart from "./HorizontalBarChart";
import theme from "../../theme";
import Loading from "../Misc/Loading";
import AllPropertiesModal from "./AllPropertiesModal";

const useStyles = makeStyles(() => ({
  horizontalbar: { width: "100%", height: "72%" },
  horizontalbarchart: { width: "100%", height: "100%" },
}));

export default function VennProperties(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({});

  const portionProps = React.useCallback((properties, entityCount) => {
    const tempProps = Object.values(properties);
    const tempPropsA = Object.values(properties);
    const tempPropsB = Object.values(properties);
    tempProps.sort((b, a) =>
      parseInt(a.count1) + parseInt(a.count2) >
      parseInt(b.count1) + parseInt(b.count2)
        ? 1
        : parseInt(a.count1) + parseInt(a.count2) ===
          parseInt(b.count1) + parseInt(b.count2)
        ? parseInt(a.count1) > parseInt(b.count1)
          ? 1
          : -1
        : -1
    );
    tempPropsA.sort((b, a) =>
      parseInt(a.count1) > parseInt(b.count1)
        ? 1
        : parseInt(a.count1) === parseInt(b.count1)
        ? parseInt(a.count1) > parseInt(b.count1)
          ? 1
          : -1
        : -1
    );
    tempPropsB.sort((b, a) =>
      parseInt(a.count2) > parseInt(b.count2)
        ? 1
        : parseInt(a.count2) === parseInt(b.count2)
        ? parseInt(a.count2) > parseInt(b.count2)
          ? 1
          : -1
        : -1
    );
    const result = {
      countA: 0,
      countB: 0,
      all: { count: 0, labels: [], valuesA: [], valuesB: [] },
      excA: { count: 0, labels: [], valuesA: [], valuesB: [] },
      excB: { count: 0, labels: [], valuesA: [], valuesB: [] },
      allA: { count: false, labels: [], valuesA: [], valuesB: [] },
      allB: { count: false, labels: [], valuesA: [], valuesB: [] },
      intersection: { count: 0, labels: [], valuesA: [], valuesB: [] },
    };

    tempProps.forEach((item) => {
      const count1int = parseInt(item.count1);
      const count2int = parseInt(item.count2);
      //count
      if (count1int > 0) {
        result.countA += 1;
      }
      if (count2int > 0) {
        result.countB += 1;
      }
      // all
      result.all.labels.push(`${item.label} (${item.id})`);
      result.all.valuesA.push(count1int);
      result.all.valuesB.push(count2int);

      // intersection
      if (count1int > 0 && count2int > 0) {
        result.intersection.labels.push(`${item.label} (${item.id})`);
        result.intersection.valuesA.push(count1int);
        result.intersection.valuesB.push(count2int);
      }
      // all a
      if (count1int > 0) {
        result.allA.labels.push(`${item.label} (${item.id})`);
        result.allA.valuesA.push(count1int);
        result.allA.valuesB.push(count2int);
      }
      // all b
      if (count2int > 0) {
        result.allB.labels.push(`${item.label} (${item.id})`);
        result.allB.valuesA.push(count1int);
        result.allB.valuesB.push(count2int);
      }
    });
    tempPropsA.forEach((item) => {
      const count1int = parseInt(item.count1);
      const count2int = parseInt(item.count2);
      // exclusive A
      if (count1int > 0) {
        if (count2int === 0) {
          result.excA.labels.push(`${item.label} (${item.id})`);
          result.excA.valuesA.push(count1int);
          result.excA.valuesB.push(count2int);
        }
      }
    });
    tempPropsB.forEach((item) => {
      const count1int = parseInt(item.count1);
      const count2int = parseInt(item.count2);
      // exclusive B
      if (count2int > 0) {
        if (count1int === 0) {
          result.excB.labels.push(`${item.label} (${item.id})`);
          result.excB.valuesA.push(count1int);
          result.excB.valuesB.push(count2int);
        }
      }
    });
    result.all.count = entityCount.entityA + entityCount.entityB;
    result.excA.count = entityCount.entityA;
    result.excB.count = entityCount.entityB;
    return result;
  }, []);

  React.useEffect(() => {
    const temp = portionProps(props.properties, props.entityCount);

    setState((s) => ({ ...s, ...temp }));
  }, [props.properties, props.entityCount, portionProps]);

  const getType = (selected) => {
    switch (selected) {
      case 1:
        return "excA";
      case 2:
        return "excB";
      case 3:
        return "allA";
      case 4:
        return "allB";
      case 5:
        return "intersection";
      default:
        return "all";
    }
  };
  if (state.all) {
    let tempLabels = [...state[getType(props.selected)].labels];
    let tempValuesA = [...state[getType(props.selected)].valuesA];
    let tempValuesB = [...state[getType(props.selected)].valuesB];

    if (props.percent) {
      tempLabels = tempLabels.map(
        (item, idx) =>
          `${tempLabels[idx]} (A: ${(
            (tempValuesA[idx] * 100) /
            props.entityCount.entityA
          ).toFixed(1)}%, B: ${(
            (tempValuesB[idx] * 100) /
            props.entityCount.entityB
          ).toFixed(1)}%)`
      );
      tempValuesA = tempValuesA.map((num) =>
        ((num * 100) / props.entityCount.entityA).toFixed(1)
      );
      tempValuesB = tempValuesB.map((num) =>
        ((num * 100) / props.entityCount.entityB).toFixed(1)
      );
    } else {
      tempLabels = tempLabels.map(
        (item, idx) =>
          `${tempLabels[idx]} (A: ${tempValuesA[idx]}, B: ${tempValuesB[idx]})`
      );
    }
    if (tempLabels.length > 0) {
      return (
        <React.Fragment>
          <HorizontalBarChart
            key={`${getType(props.selected)}-${props.percent ? 1 : 0}`}
            percent={props.percent}
            data={{
              labels: tempLabels.slice(0, 5),

              datasets: [
                {
                  data: tempValuesA.slice(0, 5),
                  backgroundColor: theme.palette.itemA.main,
                },
                {
                  data: tempValuesB.slice(0, 5),
                  backgroundColor: theme.palette.itemB.main,
                },
              ],
            }}
            max={props.percent ? 100 : state[getType(props.selected)].count}
            stacked={!props.percent}
            classes={{
              root: classes.horizontalbar,
              ChartWrapper: classes.horizontalbarchart,
            }}
          />
          <AllPropertiesModal
            key="modal-asc"
            stacked={!props.percent}
            multiple
            data={{
              labels: tempLabels,
              valuesA: tempValuesA,
              valuesB: tempValuesB,
              max: props.percent ? 100 : state[getType(props.selected)].count,
            }}
          />
        </React.Fragment>
      );
    } else {
      return (
        <div
          className={classes.horizontalbar}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>No Properties</Typography>
        </div>
      );
    }
  } else {
    return <Loading />;
  }
}

VennProperties.defaultProps = {
  properties: {},
  selected: 0,
  percent: false,
  entityCount: { entityA: 0, entityB: 0 },
};
