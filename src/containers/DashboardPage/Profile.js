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
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import VirtualizedTable from "../../components/Dashboard/VirtualizedTable";
import Histogram from "../../components/Dashboard/Histogram";
import GiniChart from "../../components/Dashboard/GiniChart";
import HorizontalBarChart from "../../components/Dashboard/HorizontalBarChart";
import FilterBox from "../../components/Inputs/FilterBox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getGiniEntity, getAllProperties } from "../../services/dashboard";
import { countProperties, sortProperties, getUnique } from "../../global";
import { searchProperties } from "../../services/general";
import theme from "../../theme";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "77vh",
    padding: theme.spacing(0),
  },
  gridItem: {
    minWidth: "33.333333%",
    "& > *": {
      padding: theme.spacing(1),
    },
  },
  tablePaper: {
    overflowY: "scroll",
    height: "40vh",
  },
  distPaper: { height: "32vh" },
  giniPaper: { height: "38vh" },
  propertiesPaper: { height: "30vh" },
  cardsPaper: { height: "40vh" },
  giniChart: {
    width: "98%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dashboardConfig: {
    height: "30vh",
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
    width: 280,
    label: "Entity",
    dataKey: "label",
    linkKey: "entityLink",
    link: true,
  },
  {
    width: 100,
    label: "# of Properties",
    dataKey: "propertyCount",
    numeric: true,
  },
];

export default function Profile(props) {
  const classes = useStyles();
  const { entity, properties, filters } = props.data;

  const [state, setState] = React.useState({
    entities: [],
    giniData: {},
    distribution: {},
    properties: [],
    propertySort: 0,

    // globalProperty
    inputProperty: "",
    selectedProperties: [],
    propertiesOptions: [],

    // loading states
    loading: { gini: true, properties: true, propertiesOptions: false },
  });

  React.useEffect(() => {
    console.log("effect");

    getAllProperties(props.hash, (r) => {
      if (r.success) {
        const temp = sortProperties(r.properties);
        setState((s) => ({
          ...s,
          properties: r.properties,
          mappedProperties: temp,
          loading: { ...s.loading, properties: false },
        }));
      }
    });
    getGiniEntity(props.hash, (r) => {
      if (r.success) {
        const distTemp = countProperties(r.entities);
        setState((s) => ({
          ...s,
          entities: [...r.entities.reverse()],
          giniData: {
            gini: r.gini,
            each_amount: r.each_amount,
            data: r.data,
            percentileData: r.percentileData,
            amount: r.amount,
            insight: r.insight,
          },
          distribution: {
            ...distTemp,
          },
          loading: { ...s.loading, gini: false },
        }));
      }
    });
  }, []);

  const propertiesChart = () => {
    if (!state.loading.properties) {
      if (state.propertySort === 0) {
        // Descending
        return (
          <HorizontalBarChart
            key={1}
            labels={state.mappedProperties.labels.slice(0, 5)}
            values={state.mappedProperties.values.slice(0, 5)}
            max={Math.max.apply(Math, state.mappedProperties.values)}
          />
        );
      } else {
        // Ascending
        return (
          <HorizontalBarChart
            key={2}
            labels={[...state.mappedProperties.labels].reverse().slice(0, 5)}
            values={[...state.mappedProperties.values].reverse().slice(0, 5)}
            max={Math.max.apply(Math, state.mappedProperties.values)}
          />
        );
      }
    } else {
      return <CircularProgress />;
    }
  };

  return (
    <Grid
      container
      xs={12}
      spacing={1}
      direction="column"
      classes={{ root: classes.root }}
    >
      <Grid item xs={4} classes={{ root: classes.gridItem }}>
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
                    // disabled={!state.selectedClass}
                    onApply={
                      (applied) => {}
                      // setState((s) => ({ ...s, appliedFilters: applied }))
                    }
                    renderTagText={(opt) =>
                      `${opt.filterLabel}: ${opt.filterValueLabel}`
                    }
                    onDelete={(idx) => {}}
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
                    <IconButton size="small" edge="end">
                      <EditIcon fontSize="small" color="primary" />
                    </IconButton>
                  </div>
                  <Paper
                    variant="outlined"
                    style={{
                      padding: theme.spacing(1),
                      marginTop: "1px",
                    }}
                  >
                    <Typography>
                      {properties.length === 0
                        ? "All"
                        : properties
                            .map(
                              (prop) =>
                                `${prop.propertyLabel} (${prop.propertyID})`
                            )
                            .join(", ")}
                    </Typography>
                  </Paper>
                </Paper>
              </Grid>
            </Grid>
          ) : (
            <CircularProgress />
          )}
        </Paper>
      </Grid>
      <Grid item xs={4} classes={{ root: classes.gridItem }}>
        <Paper className={classes.tablePaper}>
          {state.loading.gini ? (
            <CircularProgress />
          ) : (
            <VirtualizedTable rows={state.entities} columns={tableColumns} />
          )}
        </Paper>
      </Grid>
      <Grid item xs={4} classes={{ root: classes.gridItem }}>
        <Paper classes={{ root: classes.distPaper }}>
          <Typography component="div">
            <Box fontWeight="bold">Distribution</Box>
          </Typography>
          {!state.loading.gini ? (
            <Histogram {...state.distribution} />
          ) : (
            <CircularProgress />
          )}
        </Paper>
      </Grid>
      <Grid item xs={4} classes={{ root: classes.gridItem }}>
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
                classes={{ ChartWrapper: classes.giniChart }}
              />
            </React.Fragment>
          ) : (
            <CircularProgress />
          )}
        </Paper>
      </Grid>
      <Grid item xs={4} classes={{ root: classes.gridItem }}>
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
      <Grid item xs={4} classes={{ root: classes.gridItem }}>
        <Paper classes={{ root: classes.cardsPaper }} />
      </Grid>
    </Grid>
  );
}
