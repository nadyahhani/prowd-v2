import React from "react";
import {
  Modal,
  Paper,
  TextField,
  CircularProgress,
  IconButton,
  Typography,
  makeStyles,
  Chip,
  Button,
  Grid,
  Box,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getUnique, filterOptions } from "../../global";
import { searchProperties } from "../../services/general";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalPaper: {
    height: "fit-content",
    width: "60vw",
    padding: theme.spacing(2),
  },
  appliedPaper: { padding: theme.spacing(1), height: "18vh" },
}));

export default function PropertiesModal(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    modalIsOpen: false,
    inputProperty: "",
    selectedProperties: [],
    selectedProperty: null,
    propertiesOptions: [],
    loading: false,
  });

  React.useEffect(() => {
    setState((s) => ({
      ...s,
      selectedProperties: props.properties.map((item) => ({
        ...item,
        id: item.propertyID,
        label: item.propertyLabel,
      })),
    }));
  }, [state.modalIsOpen, props.properties]);

  const renderInput = (params) => (
    <TextField
      {...params}
      variant="outlined"
      size="small"
      placeholder="Type something to search..."
      inputProps={{
        ...params.inputProps,
        autoComplete: "new-password",
      }}
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <React.Fragment>
            {params.InputProps.endAdornment}
            {state.loading.propertiesOptions ? <CircularProgress /> : null}
          </React.Fragment>
        ),
      }}
    />
  );

  const handleDelete = (index) => {
    const temp = [...state.selectedProperties];
    temp.splice(index, 1);
    setState((s) => ({ ...s, selectedProperties: temp }));
  };

  const onInputChange = (e) => {
    const input = e.target.value;
    setState((s) => ({ ...s, inputProperty: input, loading: true }));
    searchProperties(input, (r) => {
      if (r.success) {
        setState((s) => ({
          ...s,
          loading: false,
          propertiesOptions: getUnique(
            [...s.propertiesOptions, ...r.properties],
            "id"
          ),
        }));
      }
    });
  };

  const setModal = (bool) => {
    setState((s) => ({ ...s, modalIsOpen: bool }));
  };

  const addProperty = () => {
    setState((s) => ({
      ...s,
      selectedProperties: [...s.selectedProperties, s.selectedProperty],
      selectedProperty: null,
      inputProperty: "",
    }));
  };

  return (
    <React.Fragment>
      <Modal
        className={classes.modal}
        open={state.modalIsOpen}
        onClose={() => setModal(false)}
      >
        <Paper classes={{ root: classes.modalPaper }}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Typography component="div">
                <Box fontWeight="bold">Add Properties</Box>
              </Typography>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing={1}>
                <Grid item xs={10}>
                  <Autocomplete
                    renderTags={(value) => (
                      <Typography>{value.label}</Typography>
                    )}
                    value={state.selectedProperty}
                    getOptionLabel={(option) => {
                      return `${option.label} (${option.id})${
                        option.aliases
                          ? ` also known as ${option.aliases.join(", ")}`
                          : ""
                      }`;
                    }}
                    inputValue={state.inputProperty}
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
                          selectedProperty: value,
                          inputProperty: `${value.label} (${value.id})`,
                        }));
                      }
                    }}
                    onInputChange={onInputChange}
                    options={state.propertiesOptions}
                    loading={state.loading}
                    renderInput={renderInput}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={addProperty}
                  >
                    Add Property
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography component="div">
                <Box fontWeight="bold">Applied Properties</Box>
              </Typography>
            </Grid>
            <Grid item>
              <Paper variant="outlined" className={classes.appliedPaper}>
                <Grid container spacing={1}>
                  {state.selectedProperties.length === 0 ? (
                    <Grid item>
                      <Chip size="small" variant="outlined" label="All" />
                    </Grid>
                  ) : (
                    state.selectedProperties.map((item, index) => (
                      <Grid item>
                        <Chip
                          size="small"
                          variant="outlined"
                          onDelete={() => handleDelete(index)}
                          label={`${item.label} (${item.id})`}
                        />
                      </Grid>
                    ))
                  )}
                </Grid>
              </Paper>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      props.onApply(state.selectedProperties);
                      setModal(false);
                    }}
                  >
                    Apply
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="primary" onClick={() => setModal(false)}>
                    Close
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
      <IconButton size="small" edge="end" onClick={() => setModal(true)}>
        <EditIcon fontSize="small" color="primary" />
      </IconButton>
    </React.Fragment>
  );
}

PropertiesModal.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.object),
  onApply: PropTypes.func,
};

PropertiesModal.defaultProps = {
  properties: [],
  onApply: () => {},
};
