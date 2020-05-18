// API URL
export const url = "http://prowd.id:5000";
// export const url = "http://localhost:5000";

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
export const countProperties = (entities) => {
  const tempProps = {};
  entities.forEach((item) => {
    if (!tempProps[item.propertyCount]) {
      tempProps[item.propertyCount] = 0;
    }
    tempProps[item.propertyCount] += 1;
  });
  let temp = [];
  Object.keys(tempProps).forEach((item) => {
    temp.push({
      propNumber: parseInt(item),
      entities: parseInt(tempProps[item]),
    });
  });
  // temp.sort((b, a) => (a.entities > b.entities ? 1 : -1));
  let labels = [];
  let values = [];
  temp.forEach((item) => {
    labels.push(item.propNumber);
    values.push(item.entities);
  });
  return {
    labels: labels,
    values: values,
    maxLabel: Math.max.apply(Math, labels),
    maxValue: Math.max.apply(Math, values),
  };
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
    console.log({ labels: labels, values: values });
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
    item.label.toLowerCase().includes(param.toLowerCase())
  );
  result.sort((b, a) => {
    // property check
    if (sort === 2) {
      return a.entityProperties ? 1 : -1;
    }
    // entity label
    else if (sort === 1) {
      return b.label.toLowerCase() > a.label.toLowerCase() ? 1 : -1;
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
