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
  });

  React.useEffect(() => {
    setState((s) => ({ ...s, data: props.appliedDimensions }));
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
              state.data.map((row, idx) => (
                <TableRow key={idx}>
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
                <TableCell colSpan={2}>
                  <Loading variant="text" />
                </TableCell>
                <TableCell>
                  <Loading variant="circle" width={30} height={30} />
                </TableCell>
              </TableRow>
            )}
            <TableRow key="input">
              <TableCell
                component="th"
                scope="row"
                colSpan={2}
                className={classes.inputCell}
              >
                <Autocomplete
                  renderTags={(value) => <Typography>{value.label}</Typography>}
                  value={state.selectedTemp}
                  getOptionLabel={(option) => {
                    return `${option.label} (${option.id})${
                      option.aliases
                        ? ` also known as ${option.aliases.join(", ")}`
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
                  renderInput={(params) => renderInput(params, "property")}
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

DiscoverDimension.defaultProps = {
  classes: { root: "" },
};
