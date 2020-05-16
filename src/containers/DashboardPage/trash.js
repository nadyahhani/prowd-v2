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

const temp = {
  itemA: [
    0,
    0.04081632653061224,
    0.08163265306122448,
    0.12244897959183673,
    0.16326530612244897,
    0.20408163265306123,
    0.2653061224489796,
    0.3469387755102041,
    0.4897959183673469,
    0.7551020408163265,
    1,
  ],
  itemB: [
    0,
    0.04081632653061224,
    0.08163265306122448,
    0.12244897959183673,
    0.16326530612244897,
    0.20408163265306123,
    0.2653061224489796,
    0.3469387755102041,
    0.4897959183673469,
    0.7551020408163265,
    1,
  ],
  exceedLimit: false,
  percentileData: [
    "0%",
    "10%",
    "20%",
    "30%",
    "40%",
    "50%",
    "60%",
    "70%",
    "80%",
    "90%",
    "100%",
  ],
};

// LANDING TRASH

<div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
            <div className={`${classes.mainDiv} ${classes.centerContent}`}>
              <Typography className={classes.tagline}>
                Visualize Knowledge
              </Typography>
            </div>
            <div className={classes.mainDiv}>
              <Typography variant="h2">
                <Box fontWeight="bold">
                  What Imbalance do you want to check?
                </Box>
              </Typography>
              <Paper className={classes.inputBox} elevation={1}>
                <Grid
                  container
                  justify="center"
                  spacing={2}
                  direction="column"
                  className={classes.inputInput}
                >
                  <Grid item>
                    <VirtualAutocomp
                      label="Class"
                      placeholder="e.g. Human, Disease, Country"
                      options={state.classes}
                      loading={state.classes.length === 0}
                      inputValue={state.classInput}
                      value={state.selectedClass}
                      onInputChange={(e) => {
                        // console.log(e);
                        if (e) {
                          const tempval = e.target.value;
                          setState((s) => ({
                            ...s,
                            classInput: tempval,
                            // classes: [],
                          }));

                          getClasses(e.target.value, (response) => {
                            response.success &&
                              setState((s) => ({
                                ...s,
                                classes: getUnique(
                                  [...s.classes, ...response.entities],
                                  "id"
                                ),
                              }));
                          });
                        }
                      }}
                      onChange={(event, newValue, reason) => {
                        if (newValue) {
                          setState((s) => ({
                            ...s,
                            selectedClass: newValue,
                            classInput: `${newValue.label} (${newValue.id})`,
                          }));
                        }
                        if (reason === "clear") {
                          setState((s) => ({
                            ...s,
                            selectedClass: null,
                            classInput: "",
                          }));
                        }
                      }}
                      onClose={(event, reason) => {
                        console.log(reason, state.selectedClass);

                        if (
                          reason !== "select-option" &&
                          !state.selectedClass
                        ) {
                          setState((s) => ({
                            ...s,
                            classInput: "",
                            selectedClass: null,
                          }));
                        }
                      }}
                      getOptionLabel={(option) => {
                        return `${option.label} (${option.id})${
                          option.aliases
                            ? ` also known as ${option.aliases.join(", ")}`
                            : ""
                        }`;
                      }}
                      renderOption={(option) => (
                        <div>
                          <Typography
                            noWrap
                          >{`${option.label} (${option.id})`}</Typography>
                          <Typography
                            variant="caption"
                            style={{ lineHeight: "1.3vmin" }}
                          >
                            {cut(option.description, 500)}
                          </Typography>
                        </div>
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <FilterBox
                      class={state.selectedClass}
                      options={state.appliedFilters}
                      propertiesOptions={state.propertiesOptions}
                      selectedClass={state.selectedClass}
                      disabled={!state.selectedClass}
                      onApply={(applied) =>
                        setState((s) => ({ ...s, appliedFilters: applied }))
                      }
                      renderTagText={(opt) =>
                        cut(`${opt.property.label}: ${opt.values.label}`, 1000)
                      }
                      onDelete={(idx) => {
                        const temp = [...state.appliedFilters];
                        temp.splice(idx, 1);
                        setState((s) => ({ ...s, appliedFilters: temp }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      fullWidth
                      disabled={state.selectedClass === null}
                      onClick={() => {
                        createDashboard(
                          state.selectedClass.id,
                          state.appliedFilters.map((x) => {
                            let temp = {};
                            temp[x.property.id] = x.values.id;
                            return temp;
                          }),
                          (response) =>
                            history.push(
                              `/dashboards/${response.hashCode}/profile`
                            )
                        );
                      }}
                    >
                      Check
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
              <Grid container spacing={2} style={{ width: "41.67vw" }}>
                {tempData.ex.map((x, idx) => (
                  <Grid item key={idx}>
                    <ButtonBase
                      onClick={() => {
                        setState((s) => ({
                          ...s,
                          selectedClass: x.class,
                          classInput: `${x.class.label} (${x.class.id})`,
                          appliedFilters: x.filters,
                        }));
                      }}
                    >
                      <Card className={classes.exampleList}>
                        <Typography variant="body1" color="primary">
                          {x.label}
                        </Typography>
                      </Card>
                    </ButtonBase>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </div>