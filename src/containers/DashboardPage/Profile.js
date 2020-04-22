import React from "react";
import {
  Typography,
  Grid,
  Paper,
  makeStyles,
  Box,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Button,
} from "@material-ui/core";
import VirtualizedTable from "../../components/Dashboard/VirtualizedTable";
import Histogram from "../../components/Dashboard/Histogram";
import GiniChart from "../../components/Dashboard/GiniChart";
import HorizontalBarChart from "../../components/Dashboard/HorizontalBarChart";
import FilterBox from "../../components/Inputs/FilterBox";
import theme from "../../theme";
import PropertiesModal from "../../components/Inputs/PropertiesModal";
import AllPropertiesModal from "../../components/Dashboard/AllPropertiesModal";
import { cut } from "../../global";
import Loading from "../../components/Misc/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "fit-content",
    // padding: theme.spacing(0),
  },
  gridItem: {
    minWidth: "33.333333%",
    "& > *": {
      padding: theme.spacing(1),
    },
  },
  tablePaper: {
    overflowY: "scroll",
    height: "41vh",
  },
  distPaper: { height: "32vh" },
  giniPaper: { height: "38vh" },
  propertiesPaper: { height: "30vh" },
  cardsPaper: { height: "40vh" },

  //charts
  giniChart: {
    paddingTop: theme.spacing(1),
    width: "100%",
    height: "95%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  histogram: {
    paddingTop: theme.spacing(1),
    width: "100%",
    height: "96%",
  },
  horizontalbar: { width: "100%", height: "75%" },
  card: {
    height: theme.spacing(10),
    width: theme.spacing(15),
    padding: theme.spacing(1),
  },

  // =====
  dashboardConfig: {
    height: "31vh",
    padding: theme.spacing(1),
    "& > * > * > *": {
      padding: theme.spacing(1),
    },
  },
}));

const tableColumns = [
  {
    width: 100,
    label: "Percentile",
    dataKey: "percentile",
    numeric: true,
  },
  {
    width: 230,
    label: "Entity",
    dataKey: "label",
    linkKey: "entityLink",
    link: true,
  },
  {
    width: 120,
    label: "# of Properties",
    dataKey: "propertyCount",
    numeric: true,
  },
];

export default function Profile(props) {
  const classes = useStyles();
  const { entity, properties, filters } = props.data;
  const { state, setState } = props;

  React.useEffect(() => {}, [state]);

  const propertiesChart = () => {
    if (!state.loading.properties) {
      if (state.propertySort === 0) {
        // Descending
        return (
          <React.Fragment>
            <HorizontalBarChart
              key={1}
              labels={state.mappedProperties.labels.slice(0, 5)}
              values={state.mappedProperties.values.slice(0, 5)}
              max={Math.max.apply(Math, state.mappedProperties.values)}
              classes={{ ChartWrapper: classes.horizontalbar }}
            />
            <AllPropertiesModal
              data={{
                labels: state.mappedProperties.labels,
                values: state.mappedProperties.values,
                max: Math.max.apply(Math, state.mappedProperties.values),
              }}
            />
          </React.Fragment>
        );
      } else {
        // Ascending
        return (
          <React.Fragment>
            <HorizontalBarChart
              key={2}
              labels={[...state.mappedProperties.labels].reverse().slice(0, 5)}
              values={[...state.mappedProperties.values].reverse().slice(0, 5)}
              max={Math.max.apply(Math, state.mappedProperties.values)}
              classes={{ ChartWrapper: classes.horizontalbar }}
            />
            <AllPropertiesModal
              data={{
                labels: state.mappedProperties.labels,
                values: state.mappedProperties.values,
                max: Math.max.apply(Math, state.mappedProperties.values),
              }}
            />
          </React.Fragment>
        );
      }
    } else {
      return <Loading />;
    }
  };

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
                  `${opt.property ? opt.property.label : opt.filterLabel}: ${
                    opt.values ? opt.values.label : opt.filterValueLabel
                  }`
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
                <Typography>Properties</Typography>
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

  return (
    <Grid
      container
      spacing={1}
      direction="row"
      classes={{ root: classes.root }}
    >
      <Grid item xs={4}>
        <Grid container direction="column" spacing={1}>
          <Grid item xs={12}>
            {globalInfo()}
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.tablePaper}>
              {state.loading.gini ? (
                <Loading />
              ) : (
                <VirtualizedTable
                  rows={state.entities}
                  columns={tableColumns}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container spacing={1}>
          <Grid item xs={12} classes={{ root: classes.gridItem }}>
            <Paper classes={{ root: classes.distPaper }}>
              <Typography component="div">
                <Box fontWeight="bold">Distribution</Box>
              </Typography>
              {!state.loading.gini ? (
                <Histogram
                  {...state.distribution}
                  classes={{ root: classes.histogram }}
                />
              ) : (
                <Loading />
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} classes={{ root: classes.gridItem }}>
            <Paper classes={{ root: classes.giniPaper }}>
              {!state.loading.gini ? (
                <React.Fragment>
                  <Typography component="div">
                    <Box fontWeight="bold">
                      Gini Coefficient= {state.giniData.gini}
                    </Box>
                  </Typography>
                  <GiniChart
                    data={state.giniData.data}
                    gini={state.giniData.gini}
                    insight={state.giniData.insight}
                    classes={{ root: classes.giniChart }}
                  />
                </React.Fragment>
              ) : (
                <Loading />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container spacing={1}>
          <Grid item xs={12} classes={{ root: classes.gridItem }}>
            <Paper classes={{ root: classes.propertiesPaper }}>
              <Typography
                component="div"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Box fontWeight="bold">Properties</Box>
                <FormControl
                  variant="outlined"
                  size="small"
                  className={classes.formControl}
                >
                  <Select
                    value={state.propertySort}
                    onChange={(e, child) => {
                      setState((s) => ({
                        ...s,
                        propertySort: child.props.value,
                      }));
                    }}
                  >
                    <MenuItem value={0}>Descending</MenuItem>
                    <MenuItem value={1}>Ascending</MenuItem>
                  </Select>
                </FormControl>
              </Typography>
              {propertiesChart()}
            </Paper>
          </Grid>
          <Grid item xs={12} classes={{ root: classes.gridItem }}>
            <Paper classes={{ root: classes.cardsPaper }}>
              <Grid container spacing={1}>
                <Grid item>
                  <Paper classes={{ root: classes.card }}>
                    <Typography component="div">
                      <Box fontWeight="bold">Number of Entities:</Box>
                    </Typography>
                    <Typography variant="h2" component="div">
                      {!state.loading.gini ? (
                        state.giniData.amount
                      ) : (
                        <Loading />
                      )}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper classes={{ root: classes.card }}>
                    <Typography component="div">
                      <Box fontWeight="bold">Property Gap</Box>
                    </Typography>
                    {!state.loading.gap ? (
                      <React.Fragment>
                        <Typography variant="h2" component="div">
                          {cut(state.gap.join(", "), 100)}
                        </Typography>
                        <Button color="primary">More...</Button>
                      </React.Fragment>
                    ) : (
                      <Loading />
                    )}
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
