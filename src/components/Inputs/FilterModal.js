import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Paper,
  Grid,
  Button,
  Modal,
  makeStyles,
  Box,
  Popover,
} from "@material-ui/core";
import VirtualAutocomp from "../../components/Inputs/VirtualAutocomp";
import FilterBox from "./FilterBox";
import { getUnique, cut } from "../../global";
import { searchProperties, getClasses } from "../../services/general";
import theme from "../../theme";

const useStyles = makeStyles((theme) => ({
  modalPaper: {
    height: "fit-content",
    width: "30vw",
    position: "absolute",
    padding: theme.spacing(2),
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popover: {
    height: "fit-content",
    width: theme.spacing(200),
    position: "absolute",
    padding: theme.spacing(2),
  },
  filterBox: { width: "96% !important" },
}));

export default function FilterModal(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    inputProperties: "",
    selectedProp: null,
    selectedValues: null,
    propertiesOptions: [],
    suggestedProperties: [],
    searchresults: [],
    propValueOptions: [],
    appliedFilters: [],
    inputValues: "",
    // loading states
    propertyLoading: false,
    valueLoading: false,
  });

  React.useEffect(() => {
    setState((s) => ({
      ...s,
      appliedFilters: props.appliedFilters,
    }));
  }, [props.open, props.appliedFilters]);

  return (
    // <Modal open={props.open} onClose={props.onClose} className={classes.modal}>
    //   <Paper className={classes.modalPaper}>
    <Popover
      classes={{ paper: classes.modalPaper }}
      open={props.open}
      onClose={props.onClose}
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: "center",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography component="div">
            <Box fontWeight="bold">Add Filters</Box>
          </Typography>
        </Grid>
        <Grid item>
          <VirtualAutocomp
            label="Property"
            placeholder="e.g. Sex or Gender, Date of Birth, Country"
            options={state.propertiesOptions}
            // loading={state.propertiesOptions.length === 0}
            renderOption={(option) => (
              <div>
                <Typography
                  noWrap
                >{`${option.label} (${option.id})`}</Typography>
                <Typography variant="caption">
                  {cut(option.description, 500)}
                </Typography>
              </div>
            )}
            inputValue={state.inputProperties}
            // getOptionSelected={(option) => option.id}
            // groupBy={(option) => option.category}
            loading={state.propertyLoading}
            noOptionsText="Type something to search"
            onInputChange={(e) => {
              if (e) {
                const tempval = e.target.value;
                setState((s) => ({
                  ...s,
                  inputProperties: tempval,
                  propertyLoading: true,
                }));
                searchProperties(tempval, (r) => {
                  setState((s) => ({
                    ...s,
                    propertyLoading: false,
                    propertiesOptions: getUnique(
                      [
                        ...s.propertiesOptions,
                        ...r.properties.map((item) => ({
                          ...item,
                          category: item.label[0].toUpperCase(),
                        })),
                      ],
                      "id"
                    ),
                  }));
                });
              }
              console.log(state);
            }}
            onChange={(event, newValue, reason) => {
              if (newValue) {
                setState((s) => ({
                  ...s,
                  selectedProp: newValue,
                  inputProperties: `${newValue.label} (${newValue.id})`,
                }));

                // getClasses("", (r) =>
                //   setState((s) => ({
                //     ...s,
                //     propValueOptions: r.entities,
                //   }))
                // );
              }
              if (reason === "clear") {
                setState((s) => ({
                  ...s,
                  selectedProp: null,
                  inputProperties: "",
                }));
              }
            }}
            onClose={(event, reason) => {
              if (reason !== "select-option" && !state.selectedProp) {
                setState((s) => ({
                  ...s,
                  inputProperties: "",
                  selectedProp: null,
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
          />
        </Grid>
        <Grid item>
          <VirtualAutocomp
            label="Value"
            options={state.propValueOptions}
            loading={state.valueLoading}
            noOptionsText="Type something to search"
            renderOption={(option) => (
              <div>
                <Typography
                  noWrap
                >{`${option.label} (${option.id})`}</Typography>
                <Typography variant="caption">
                  {option.description
                    ? cut(option.description, 500)
                    : "No description available"}
                </Typography>
              </div>
            )}
            inputValue={state.inputValues}
            // getOptionSelected={(option) => option.id}
            // groupBy={(option) => option.category}
            onInputChange={(e) => {
              if (e) {
                const tempval = e.target.value;
                setState((s) => ({
                  ...s,
                  inputValues: tempval,
                  valueLoading: true,
                }));
                getClasses(tempval, (r) => {
                  setState((s) => ({
                    ...s,
                    valueLoading: false,
                    propValueOptions: getUnique(
                      [...s.propValueOptions, ...r.entities],
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
                  selectedValues: newValue,
                  inputValues: `${newValue.label} (${newValue.id})`,
                }));
              }
              if (reason === "clear") {
                setState((s) => ({
                  ...s,
                  selectedValues: null,
                  inputValues: "",
                }));
              }
            }}
            onClose={(event, reason) => {
              if (reason !== "select-option" && !state.selectedValues) {
                setState((s) => ({
                  ...s,
                  inputValues: "",
                  selectedValues: null,
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
          />
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            disabled={!(state.selectedProp && state.selectedValues)}
            onClick={() => {
              props.onApply([
                ...state.appliedFilters,
                { property: state.selectedProp, value: state.selectedValues },
              ]);
              setState((s) => ({
                ...s,
                appliedFilters: [
                  ...s.appliedFilters,
                  { property: s.selectedProp, value: s.selectedValues },
                ],
                selectedProp: null,
                selectedValues: [],
                inputProperties: "",
                inputValues: "",
              }));
            }}
          >
            Add Filter
          </Button>
        </Grid>
        <Grid item>
          <Typography component="div">
            <Box fontWeight="bold">Applied Filters</Box>
          </Typography>
        </Grid>
        <Grid item>
          <FilterBox
            classes={{ root: classes.filterBox }}
            disableModal
            cols={4}
            options={state.appliedFilters}
            renderTagText={props.renderTagText}
            onDelete={(idx) => {
              const temp = [...state.appliedFilters];
              temp.splice(idx, 1);
              props.onApply(temp);
              setState((s) => ({ ...s, appliedFilters: temp }));
            }}
          />
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <Button
                style={{ color: theme.palette.error.main }}
                onClick={props.onClear}
              >
                Clear
              </Button>
              <Button color="primary" onClick={props.onClose}>
                close
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Popover>
    // </Paper>
    //</Modal>
  );
}

FilterModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  propertiesOptions: PropTypes.arrayOf(PropTypes.object),
  selectedClass: PropTypes.object,
  onApply: PropTypes.func,
  onDelete: PropTypes.func,
  appliedFilters: PropTypes.arrayOf(PropTypes.object),
  renderTagText: PropTypes.func,
};
