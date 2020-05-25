import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Typography,
  TextField,
  IconButton,
  Grid,
  Button,
  Box,
  Slider,
  Input,
} from "@material-ui/core";
import { getClasses, searchProperties } from "../../services/general";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import { getUnique, filterOptions } from "../../global";
import theme from "../../theme";
import Loading from "../Misc/Loading";
import Help from "../Misc/Help";

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
    "& > * > * > *": {
      // paddingTop: theme.spacing(1),
      // paddingBottom: theme.spacing(1),
      // paddingLeft: "1%",
      // paddingRight: "1%",
      padding: theme.spacing(1),
    },
  },
  inputCell: {
    // padding: 0,
  },
});

export default function DiscoverDimension(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    data: [],
    temp: "",
    selectedTemp: null,
    propertiesOptions: [],
    properties: [],
    entities: [],
    selectedProperty: null,
    inputProperty: "",
    loading: false,
    update: false,
    pull: false,
  });
  const [value, setValue] = React.useState([2, 110]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    setState((s) => ({
      ...s,
      update: true,
    }));
  };

  const handleInputChange = (event, num) => {
    let temp = [...value];
    temp[num] = event.target.value === "" ? "" : Number(event.target.value);
    setValue(temp);
    setState((s) => ({
      ...s,
      update: true,
    }));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > props.appliedDimensions.maxLimit) {
      setValue(props.appliedDimensions.maxLimit);
    }
  };

  React.useEffect(() => {
    setState((s) => ({ ...s, data: props.appliedDimensions.data }));
    setValue(props.appliedDimensions.limit);
  }, [props.appliedDimensions]);

  const eraseInput = () => {
    setState((s) => ({
      ...s,
      temp: "",
      selectedTemp: null,
    }));
  };

  const renderInput = (params, ph) => (
    <TextField
      {...params}
      variant="outlined"
      size="small"
      placeholder={ph}
      inputProps={{
        ...params.inputProps,
        autoComplete: "new-password",
      }}
    />
  );

  const onInputChange = (e, val, reason, col) => {
    // const input = val;
    // let t = { ...state.temp };
    // t[col] = val;
    setState((s) => ({
      ...s,
      temp: val,
      loading: { ...s.loading, properties: true },
    }));
    searchProperties(val, (r) => {
      if (r.success) {
        setState((s) => ({
          ...s,
          loading: { ...s.loading, properties: true },
          properties: getUnique([...s.properties, ...r.properties], "id"),
        }));
      }
    });
  };

  return (
    <React.Fragment>
      <Grid
        container
        spacing={1}
        direction="column"
        classes={{ root: props.classes.root }}
      >
        <Grid item>
          <Typography>
            <Box fontWeight="bold">
              DIMENSIONS{" "}
              <Help
                text={
                  <Typography>{`Select the piece of information (property) you would want to know more about.`}</Typography>
                }
              />
            </Box>
          </Typography>
        </Grid>
        <Grid item>
          <Paper
            // component={outlinedPaper}
            variant="outlined"
            elevation={0}
          >
            <Table
              className={`${classes.table} `}
              aria-label="simple table"
              size="small"
              padding="none"
            >
              <TableHead>
                <TableRow>
                  <TableCell key={1} colSpan={3}>
                    Property
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {!props.loading ? (
                  <React.Fragment>
                    {state.data.map((row, idx) => (
                      <TableRow key={idx} style={{ height: 52 }}>
                        <TableCell colSpan={2}>{row.label}</TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            edge="end"
                            onClick={() => {
                              let temp = [...state.data];
                              temp.splice(idx, 1);
                              setState((s) => ({
                                ...s,
                                data: temp,
                                update: true,
                                pull: true,
                              }));
                            }}
                          >
                            <RemoveCircle color="primary" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {state.data.length < 2 ? (
                      <TableRow key="input">
                        <TableCell
                          component="th"
                          scope="row"
                          colSpan={2}
                          className={classes.inputCell}
                        >
                          <Autocomplete
                            renderTags={(value) => (
                              <Typography>{value.label}</Typography>
                            )}
                            value={state.selectedTemp}
                            getOptionLabel={(option) => {
                              return `${option.label} (${option.id})${
                                option.aliases
                                  ? ` also known as ${option.aliases.join(
                                      ", "
                                    )}`
                                  : ""
                              }`;
                            }}
                            inputValue={state.temp}
                            renderOption={(option) => (
                              <div>
                                <Typography>{`${option.label} (${option.id})`}</Typography>
                                <Typography variant="caption">
                                  {option.description}
                                </Typography>
                              </div>
                            )}
                            noOptionsText={
                              state.properties.length === 0
                                ? "Type to search for a property"
                                : "There are no properties with that name"
                            }
                            onChange={(e, value, reason) => {
                              if (reason === "select-option") {
                                setState((s) => ({
                                  ...s,
                                  selectedTemp: value,
                                  temp: `${value.label} (${value.id})`,
                                }));
                              }
                            }}
                            onInputChange={(e, val, reason) =>
                              onInputChange(e, val, reason, "property")
                            }
                            options={state.properties}
                            loading={false}
                            renderInput={(params) =>
                              renderInput(params, "property")
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            edge="end"
                            onClick={() => {
                              if (state.selectedTemp) {
                                setState((s) => {
                                  let t = [...s.data];
                                  t.push(s.selectedTemp);
                                  return {
                                    ...s,
                                    data: t,
                                    update: true,
                                    pull: true,
                                  };
                                });
                                eraseInput();
                              }
                            }}
                          >
                            <AddCircle color="primary" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </React.Fragment>
                ) : (
                  [0, 0].map((item) => (
                    <TableRow style={{ height: 52 }}>
                      <TableCell colSpan={2}>
                        <Loading variant="text" />
                      </TableCell>
                      <TableCell>
                        <Loading variant="circle" width={30} height={30} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
                {!props.loading && state.data.length < 2
                  ? (function () {
                      const temp = new Array(2 - state.data.length - 1).fill(0);
                      return temp.map((item) => (
                        <TableRow style={{ height: 52 }}>
                          <TableCell colSpan={3} />
                        </TableRow>
                      ));
                    })()
                  : null}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        {!props.loading && props.appliedDimensions.data.length > 0 ? (
          <React.Fragment>
            <Grid item>
              <Typography>
                <Box fontWeight="bold">
                  FILTERS{" "}
                  {/* <Help
                text={<Typography>{`Only show data as selected`}</Typography>}
              /> */}
                </Box>
              </Typography>
            </Grid>
            <Grid item>
              <Paper
                // component={outlinedPaper}
                variant="outlined"
                elevation={0}
                style={{ padding: theme.spacing(1) }}
              >
                <Typography gutterBottom>Number of Items</Typography>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={2}>
                    <Input
                      disabled={
                        props.loading || !props.appliedDimensions.maxLimit
                      }
                      className={classes.input}
                      value={value[0]}
                      margin="dense"
                      onChange={(e) => handleInputChange(e, 0)}
                      onBlur={handleBlur}
                      inputProps={{
                        step: 1,
                        min: 0,
                        max: props.appliedDimensions.maxLimit,
                        type: "number",
                        "aria-labelledby": "input-slider",
                      }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Slider
                      disabled={
                        props.loading || !props.appliedDimensions.maxLimit
                      }
                      value={value}
                      onChange={handleSliderChange}
                      aria-labelledby="input-slider"
                      step={1}
                      min={0}
                      max={props.appliedDimensions.maxLimit}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Input
                      disabled={
                        props.loading || !props.appliedDimensions.maxLimit
                      }
                      className={classes.input}
                      value={value[1]}
                      margin="dense"
                      onChange={(e) => handleInputChange(e, 1)}
                      onBlur={handleBlur}
                      inputProps={{
                        step: 1,
                        min: 0,
                        max: props.appliedDimensions.maxLimit,
                        type: "number",
                        "aria-labelledby": "input-slider",
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>{" "}
          </React.Fragment>
        ) : null}
      </Grid>
      <Grid
        container
        spacing={1}
        direction="row"
        style={{ paddingTop: theme.spacing(1) }}
      >
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            disabled={!state.update}
            onClick={() => {
              props.onApply({
                data: state.data,
                limit: value,
                pull: state.pull,
              });
              setState((s) => ({
                ...s,
                pull: false,
                update: false,
              }));
              eraseInput();
            }}
          >
            Apply
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              setState((s) => ({
                ...s,
                data: props.appliedDimensions.data,

                update: false,
              }));
              setValue(props.appliedDimensions.limit);
            }}
            color="primary"
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

DiscoverDimension.defaultProps = {
  classes: { root: "" },
};
