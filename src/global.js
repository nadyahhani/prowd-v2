import theme from "./theme";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";

// API URL
export const url = "https://prowd.id/api";
// export const url = "http://localhost:5000";

// custom filter for item autocompletes
export const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) =>
    `${option.label} ${
      option.aliases ? ` also known as ${option.aliases.join(", ")}` : ""
    } ${option.id} ${option.description}`,
});

// custom function to create linear line
export const linearLine = (begin, end, points) => {
  let temp = [];
  let tempVal = begin;
  temp.push(begin);
  const dif = (end - begin) / (points - 1);
  for (let i = 0; i < points - 1; i++) {
    tempVal += dif;
    temp.push(tempVal);
  }
  return temp;
};

// custom function to shorten description
export const cut = (sentence, length) => {
  if (sentence) {
    return `${sentence.slice(0, length)}${
      sentence.length > length ? "..." : ""
    }`;
  } else {
    return "";
  }
};

// custom function to eliminate dupes
export const getUnique = (arr, comp) => {
  const unique = arr
    .map((e) => e[comp])

    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter((e) => arr[e])
    .map((e) => arr[e]);
  return unique;
};

// custom function to count properties
export const countProperties = (entities, max_props = null) => {
  const maxPropertyNum =
    typeof max_props === "number"
      ? max_props + 1
      : Math.max.apply(
          Math,
          entities.map((item) => item.propertyCount)
        );
  try {
    let propertyNums = new Array(maxPropertyNum + 1).fill(0);
    entities.forEach((item) => {
      propertyNums[item.propertyCount] += 1;
    });
    return {
      labels: Object.keys(propertyNums),
      values: Object.values(propertyNums),
      maxLabel: max_props ? max_props : maxPropertyNum,
      maxValue: Math.max.apply(Math, Object.values(propertyNums)),
    };
  } catch (error) {
    return { labels: [], values: [], maxLabel: [], maxValue: [] };
  }
};

// custom function to map properties for labels and values and sort ascending
export const sortProperties = (props, compare = false) => {
  const tempProps = Object.values(props);

  if (!compare) {
    tempProps.sort((b, a) =>
      parseInt(a.count) > parseInt(b.count)
        ? 1
        : parseInt(a.count) === parseInt(b.count)
        ? a.label > b.label
          ? 1
          : -1
        : -1
    );
    let labels = [];
    let values = [];
    tempProps.forEach((item) => {
      labels.push(`${item.label} (${item.id})`);
      values.push(item.count);
    });
    return { labels: labels, values: values };
  } else {
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
    let labels = [];
    let valuesA = [];
    let valuesB = [];
    let countA = 0;
    let countB = 0;
    tempProps.forEach((item) => {
      labels.push(`${item.label} (${item.id})`);
      valuesA.push(item.count1);
      valuesB.push(item.count2);
      if (item.count1 > 0) {
        countA += 1;
      }
      if (item.count2 > 0) {
        countB += 1;
      }
    });
    return {
      labels: labels,
      valuesA: valuesA,
      valuesB: valuesB,
      countA: countA,
      countB: countB,
    };
  }
};

// function to filter table
export const filterEntities = (data, param, sort = 0) => {
  let result = data.filter((item) =>
    `${item.label} ${item.propertyCount} ${item.percentile}`
      .toLowerCase()
      .includes(param.toLowerCase())
  );
  result.sort((b, a) => {
    // # of properties
    if (sort === 1) {
      if (a.propertyCount < b.propertyCount) {
        return 1;
      } else if (a.propertyCount === b.propertyCount) {
        if (
          parseInt(a.percentile.slice(0, -1)) <
          parseInt(b.percentile.slice(0, -1))
        ) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    }
    // property check
    else if (sort === 2) {
      return a.entityProperties ? 1 : -1;
    } else if (sort === 3) {
      return !a.entityProperties ? 1 : -1;
    }
    // entity label
    else if (sort === 4) {
      return b.label.toLowerCase() > a.label.toLowerCase() ? 1 : -1;
    } else if (sort === 5) {
      return b.label.toLowerCase() < a.label.toLowerCase() ? 1 : -1;
    }
    // # of properties
    else {
      if (a.propertyCount > b.propertyCount) {
        return 1;
      } else if (a.propertyCount === b.propertyCount) {
        if (
          parseInt(a.percentile.slice(0, -1)) >
          parseInt(b.percentile.slice(0, -1))
        ) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    }
  });
  return result;
};

// function to merge json
export const extend = (a, target, sources) => {
  sources.forEach(function (source) {
    for (var prop in source) {
      target[prop] = source[prop];
    }
  });
  return target;
};

// function to portion compare properties

export const compareDistinctProps = (properties) => {
  const tempProps = Object.values(properties);
  const result = {
    countA: 0,
    countB: 0,
    countAB: 0,
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
    if (count1int > 0 && count2int > 0) {
      result.countAB += 1;
    }
  });
  return result;
};

export const selectDistribution = (filtered) => {
  const colors = [
    theme.palette.itemA.opaque,
    theme.palette.itemB.opaque,
    theme.palette.itemMerge.opaque,
  ];
  let result = [];
  const sortedbyGini = [...filtered]
    .filter((item) => item.newHistogramData && item.newHistogramData.raw_data)
    .sort((b, a) => {
      if (a.gini > b.gini) {
        return 1;
      } else {
        return -1;
      }
    });
  const getName = (info) =>
    `${info.item_1_label ? info.item_1_label : ""}${
      info.item_2_label ? `-${info.item_2_label}` : ""
    }${info.item_3_label ? `-${info.item_3_label}` : ""}`;
  if (sortedbyGini.length > 2) {
    let tempIndex = [0, 0, 0];
    tempIndex[2] = sortedbyGini.includes((item) => item.gini === 0)
      ? sortedbyGini.findIndex((item) => item.gini === 0)
      : sortedbyGini.length - 1;
    tempIndex[1] = Math.ceil(tempIndex[2] / 2);
    tempIndex.forEach((idx, index) => {
      result.push({
        ...sortedbyGini[idx],
        raw: sortedbyGini[idx].newHistogramData.raw_data,
        data: sortedbyGini[idx].newHistogramData.raw_data.map((num, index) => ({
          x:
            (index * 100) /
            (sortedbyGini[idx].newHistogramData.raw_data.length - 1),
          y: (num * 100) / sortedbyGini[idx].amount,
        })),
        label: getName(sortedbyGini[idx].analysis_info),
        name: getName(sortedbyGini[idx].analysis_info),
        color: colors[index],
        borderColor: colors[index],
        borderWidth: 1.5,
        pointBackgroundColor: colors[index],
        pointBorderColor: colors[index],
        pointRadius: 2,
        pointHoverRadius: 3,
        fill: false,
        showLine: true,
      });
    });
  } else {
    result = sortedbyGini.map((item, idx) => ({
      ...item,
      raw: item.newHistogramData.raw_data,
      data: item.newHistogramData.raw_data.map((num, index) => ({
        x: (index * 100) / (item.newHistogramData.raw_data.length - 1),
        y: (num * 100) / item.amount,
      })),
      label: getName(item.analysis_info),
      name: getName(item.analysis_info),
      color: colors[idx],
      borderColor: colors[idx],
      borderWidth: 1.5,
      pointBackgroundColor: colors[idx],
      pointBorderColor: colors[idx],
      pointRadius: 2,
      pointHoverRadius: 3,
      fill: false,
      showLine: true,
    }));
  }
  return result;
};
