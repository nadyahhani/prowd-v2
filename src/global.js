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
export const sortProperties = (props) => {
  const tempProps = [...props];
  tempProps.sort((b, a) =>
    parseInt(a.entitiesCount) > parseInt(b.entitiesCount)
      ? 1
      : parseInt(a.entitiesCount) === parseInt(b.entitiesCount)
      ? a.propertyLabel > b.propertyLabel
        ? 1
        : -1
      : -1
  );
  let labels = [];
  let values = [];
  tempProps.forEach((item) => {
    labels.push(item.propertyLabel);
    values.push(item.entitiesCount);
  });
  console.log({ labels: labels, values: values });
  return { labels: labels, values: values };
};
