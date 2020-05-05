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

const globalInfo = () => (
    <Paper variant="outlined" classes={{ root: classes.dashboardConfig }}>
      {entity && properties && filters ? (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper style={{ height: "8vh" }}>
              <Typography variant="h2">
                {`${entity.entityLabel} - ${entity.entityID}`}
              </Typography>
              <Typography>{entity.entityDescription}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper style={{ height: "17vh" }}>
              <Typography>Filters</Typography>
              <FilterBox
                options={filters}
                propertiesOptions={[]}
                selectedClass={entity}
                hideLabel
                cols={3}
                onApply={(applied) => {
                  let temp = [...applied];
                  temp = temp.map((item) => {
                    if (!item.property) {
                      return item;
                    }
                    return {
                      filterDescription: item.property.description,
                      filterID: item.property.id,
                      filterLabel: item.property.label,
                      filterValueDescription: item.values.description,
                      filterValueID: item.values.id,
                      filterValueLabel: item.values.label,
                    };
                  });
                  console.log(temp);
                  props.updateData((s) => ({
                    ...s,
                    update: true,
                    globalData: { ...s.globalData, filters: temp },
                  }));
                }}
                renderTagText={(opt) =>
                  cut(
                    `${opt.property ? opt.property.label : opt.filterLabel}: ${
                      opt.values ? opt.values.label : opt.filterValueLabel
                    }`,
                    43
                  )
                }
                onDelete={(idx) => {
                  let temp = [...filters];
                  temp.splice(idx, 1);
                  props.updateData((s) => ({
                    ...s,
                    update: true,
                    globalData: { ...s.globalData, filters: temp },
                  }));
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper style={{ height: "17vh" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography>Property Frequency</Typography>
                <PropertiesModal
                  properties={properties}
                  onApply={(applied) => {
                    let temp = [...applied];
                    temp = temp.map((item) => ({
                      propertyID: item.id,
                      propertyLabel: item.label,
                      propertyDescription: item.description,
                    }));
                    props.updateData((s) => ({
                      ...s,
                      update: true,
                      globalData: { ...s.globalData, properties: temp },
                    }));
                  }}
                />
              </div>
              <Paper
                variant="outlined"
                style={{
                  padding: theme.spacing(1),
                  marginTop: "1px",
                  height: "11vh",
                  overflowY: "scroll",
                }}
              >
                <Typography>
                  {properties.length === 0
                    ? "All"
                    : properties
                        .map(
                          (prop) => `${prop.propertyLabel} (${prop.propertyID})`
                        )
                        .join(", ")}
                </Typography>
              </Paper>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Loading />
      )}
    </Paper>
  );