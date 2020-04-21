import React from "react";
import { Modal, Paper, TextField, CircularProgress } from "@material-ui/core";
import { getUnique } from "../../global";
import { searchProperties } from "../../services/general";

renderInput = (params) => (
  <TextField
    {...params}
    variant="outlined"
    size="small"
    // placeholder={props.placeholder}
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

onInputChange = (e) => {
  const input = e.target.value;
  setState((s) => ({ ...s, inputProperty: input }));
  searchProperties(input, (r) => {
    if (r.success) {
      setState((s) => ({
        ...s,
        propertiesOptions: getUnique(
          [...s.propertiesOptions, ...r.properties],
          "id"
        ),
      }));
    }
  });
};

export default function PropertiesModal(props) {
  const [state, useState] = React.useState({
    inputProperty: "",
    selectedProperties: [],
    propertiesOptions: [],
    loading: false,
  });

  return (
    <React.Fragment>
      <Modal>
        <Paper>
          <Autocomplete
            multiple
            renderTags={(value) => <Typography>{value.label}</Typography>}
            value={state.selectedProperties}
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
                <Typography>{`${option.label} ${option.id}`}</Typography>
                <Typography variant="caption">{option.description}</Typography>
              </div>
            )}
            onInputChange={onInputChange}
            options={state.propertiesOptions}
            loading={state.loading}
            renderInput={renderInput}
          />
        </Paper>
      </Modal>
      <IconButton size="small" edge="end">
        <EditIcon fontSize="small" color="primary" />
      </IconButton>
    </React.Fragment>
  );
}
