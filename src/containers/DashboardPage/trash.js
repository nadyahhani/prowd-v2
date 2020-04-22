// const [state, setState] = React.useState({
//     entities: [],
//     giniData: {},
//     distribution: {},
//     properties: [],
//     propertySort: 0,

//     // loading states
//     loading: { gini: true, properties: true, propertiesOptions: false },
//   });

//   React.useEffect(() => {
//     console.log("effect");

//     getAllProperties(props.hash, (r) => {
//       if (r.success) {
//         const temp = sortProperties(r.properties);
//         setState((s) => ({
//           ...s,
//           properties: r.properties,
//           mappedProperties: temp,
//           loading: { ...s.loading, properties: false },
//         }));
//       }
//     });
//     getGiniEntity(props.hash, (r) => {
//       if (r.success) {
//         const distTemp = countProperties(r.entities);
//         setState((s) => ({
//           ...s,
//           entities: [...r.entities.reverse()],
//           giniData: {
//             gini: r.gini,
//             each_amount: r.each_amount,
//             data: r.data,
//             percentileData: r.percentileData,
//             amount: r.amount,
//             insight: r.insight,
//           },
//           distribution: {
//             ...distTemp,
//           },
//           loading: { ...s.loading, gini: false },
//         }));
//       }
//     });
//   }, []);
