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
} from "@material-ui/core";
import { getClasses, searchProperties } from "../../services/general";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import { getUnique } from "../../global";
import theme from "../../theme";
import Loading from "../Misc/Loading";

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
    "& > * > * > *": {
      paddingLeft: "1%",
      paddingRight: "1%",
    },
  },
  inputCell: {
    // width: ""
  },
  popperPaper: {
    width: "200%",
  },
});
// const options = { properties: [], entities: [] };
// const setOptions = (val) => {
//   options = val;
// };
export default function DimensionTable(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    data: [],
    temp: { property: "", valueA: "", valueB: "" },
    selectedTemp: { property: null, valueA: null, valueB: null },
    propertiesOptions: [],
    properties: [],
    entities: [],
    selectedProperty: null,
    inputProperty: "",
    loading: false,
    update: false,
  });

  React.useEffect(() => {
    setState((s) => ({ ...s, data: props.appliedDimensions }));
  }, [props.appliedDimensions]);

  const eraseInput = () => {
    setState((s) => ({
      ...s,
      temp: { property: "", valueA: "", valueB: "" },
      selectedTemp: { property: null, valueA: null, valueB: null },
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
    const input = val;
    let t = { ...state.temp };
    t[col] = val;
    setState((s) => ({
      ...s,
      temp: t,
      loading: { ...s.loading, properties: true },
    }));
    if (col === "property") {
      searchProperties(input, (r) => {
        if (r.success) {
          setState((s) => ({
            ...s,
            loading: { ...s.loading, properties: true },
            properties: getUnique([...s.properties, ...r.properties], "id"),
          }));
        }
      });
    } else {
      getClasses(input, (r) => {
        if (r.success) {
          setState((s) => ({
            ...s,
            entities: getUnique([...s.entities, ...r.entities], "id"),
          }));
        }
      });
    }
  };

  return (
    <React.Fragment>
      <Paper
        // component={outlinedPaper}
        variant="outlined"
        elevation={0}
        classes={{ root: props.classes.root }}
      >
        <Table
          className={`${classes.table} `}
          aria-label="simple table"
          size="small"
          padding="default"
        >
          <TableHead>
            <TableRow>
              <TableCell key={1}>Property</TableCell>
              <TableCell key={2}>Value A</TableCell>
              <TableCell key={3}>Value B</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {!props.loading ? (
              state.data.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.property.label}</TableCell>
                  <TableCell>{row.valueA.label}</TableCell>
                  <TableCell>{row.valueB.label}</TableCell>
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
                        }));
                      }}
                    >
                      <RemoveCircle color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <Loading />
                </TableCell>
              </TableRow>
            )}
            <TableRow key="input">
              <TableCell
                component="th"
                scope="row"
                className={classes.inputCell}
              >
                <Autocomplete
                  renderTags={(value) => <Typography>{value.label}</Typography>}
                  value={state.selectedTemp["property"]}
                  getOptionLabel={(option) => {
                    return `${option.label} (${option.id})${
                      option.aliases
                        ? ` also known as ${option.aliases.join(", ")}`
                        : ""
                    }`;
                  }}
                  inputValue={state.temp["property"]}
                  renderOption={(option) => (
                    <div>
                      <Typography>{`${option.label} (${option.id})`}</Typography>
                      <Typography variant="caption">
                        {option.description}
                      </Typography>
                    </div>
                  )}
                  onChange={(e, value, reason) => {
                    if (reason === "select-option") {
                      setState((s) => ({
                        ...s,
                        selectedTemp: { ...s.selectedTemp, property: value },
                        temp: {
                          ...s.temp,
                          property: `${value.label} (${value.id})`,
                        },
                      }));
                    }
                  }}
                  onInputChange={(e, val, reason) =>
                    onInputChange(e, val, reason, "property")
                  }
                  classes={{ paper: classes.popperPaper }}
                  options={state.properties}
                  loading={false}
                  renderInput={(params) => renderInput(params, "property")}
                />
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                className={classes.inputCell}
              >
                <Autocomplete
                  renderTags={(value) => <Typography>{value.label}</Typography>}
                  value={state.selectedTemp["valueA"]}
                  getOptionLabel={(option) => {
                    return `${option.label} (${option.id})${
                      option.aliases
                        ? ` also known as ${option.aliases.join(", ")}`
                        : ""
                    }`;
                  }}
                  inputValue={state.temp["valueA"]}
                  renderOption={(option) => (
                    <div>
                      <Typography>{`${option.label} (${option.id})`}</Typography>
                      <Typography variant="caption">
                        {option.description}
                      </Typography>
                    </div>
                  )}
                  onChange={(e, value, reason) => {
                    if (reason === "select-option") {
                      setState((s) => ({
                        ...s,
                        selectedTemp: { ...s.selectedTemp, valueA: value },
                        temp: {
                          ...s.temp,
                          valueA: `${value.label} (${value.id})`,
                        },
                      }));
                    }
                  }}
                  onInputChange={(e, val, reason) =>
                    onInputChange(e, val, reason, "valueA")
                  }
                  classes={{ paper: classes.popperPaper }}
                  options={state.entities}
                  loading={false}
                  renderInput={(params) => renderInput(params, "Value A")}
                />
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                className={classes.inputCell}
              >
                <Autocomplete
                  renderTags={(value) => <Typography>{value.label}</Typography>}
                  value={state.selectedTemp["valueB"]}
                  getOptionLabel={(option) => {
                    return `${option.label} (${option.id})${
                      option.aliases
                        ? ` also known as ${option.aliases.join(", ")}`
                        : ""
                    }`;
                  }}
                  inputValue={state.temp["valueB"]}
                  renderOption={(option) => (
                    <div>
                      <Typography>{`${option.label} (${option.id})`}</Typography>
                      <Typography variant="caption">
                        {option.description}
                      </Typography>
                    </div>
                  )}
                  onChange={(e, value, reason) => {
                    if (reason === "select-option") {
                      setState((s) => ({
                        ...s,
                        selectedTemp: { ...s.selectedTemp, valueB: value },
                        temp: {
                          ...s.temp,
                          valueB: `${value.label} (${value.id})`,
                        },
                      }));
                    }
                  }}
                  onInputChange={(e, val, reason) =>
                    onInputChange(e, val, reason, "valueB")
                  }
                  classes={{ paper: classes.popperPaper }}
                  options={state.entities}
                  loading={false}
                  renderInput={(params) => renderInput(params, "Value B")}
                />
              </TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  edge="end"
                  onClick={() => {
                    if (
                      state.selectedTemp.property &&
                      state.selectedTemp.valueA &&
                      state.selectedTemp.valueB
                    ) {
                      setState((s) => {
                        let t = [...s.data];
                        t.push(s.selectedTemp);
                        console.log(t);
                        return { ...s, data: t, update: true };
                      });
                      eraseInput();
                    }
                  }}
                >
                  <AddCircle color="primary" />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
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
              props.onApply(state.data);
              setState((s) => ({
                ...s,
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
            onClick={() =>
              setState((s) => ({
                ...s,
                data: props.appliedDimensions,
                update: false,
              }))
            }
            color="primary"
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

DimensionTable.defaultProps = {
  classes: { root: "" },
};
