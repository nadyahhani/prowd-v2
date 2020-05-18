import React from "react";
import {
  IconButton,
  Popover,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getClasses } from "../../services/general";
import theme from "../../theme";
import { getUnique } from "../../global";

const useStyles = makeStyles(() => ({
  popoverPaper: {
    padding: theme.spacing(2),
    width: theme.spacing(40),
  },
}));
export default function EditClass(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    selected: null,
    inputValue: "",
    entities: [],
    loading: false,
    anchorEl: null,
  });
  const renderInput = (params, ph) => (
    <TextField
      {...params}
      variant="outlined"
      size="small"
      fullWidth
      placeholder={ph}
      inputProps={{
        ...params.inputProps,
        autoComplete: "new-password",
      }}
    />
  );

  const onInputChange = (e, val, reason) => {
    setState((s) => ({
      ...s,
      inputValue: val,
      loading: true,
    }));
    getClasses(val, (r) => {
      if (r.success) {
        setState((s) => ({
          ...s,
          loading: false,
          entities: getUnique([...s.entities, ...r.entities], "id"),
        }));
      }
    });
  };

  return (
    <React.Fragment>
      <IconButton
        size="small"
        color="primary"
        onClick={(e) =>
          setState((s) => ({ ...s, open: true, anchorEl: e.currentTarget }))
        }
      >
        <EditIcon />
      </IconButton>
      <Popover
        open={state.open}
        onClose={(e) =>
          setState((s) => ({ ...s, open: false, anchorEl: null }))
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        anchorEl={state.anchorEl}
        classes={{ paper: classes.popoverPaper }}
      >
        <Autocomplete
          renderTags={(value) => <Typography>{value.label}</Typography>}
          value={state.selected}
          getOptionLabel={(option) => {
            return `${option.label} (${option.id})${
              option.aliases
                ? ` also known as ${option.aliases.join(", ")}`
                : ""
            }`;
          }}
          noOptionsText={
            state.entities.length === 0
              ? "Type to search for an item"
              : "There are no items with that name"
          }
          inputValue={state.inputValue}
          renderOption={(option) => (
            <div>
              <Typography>{`${option.label} (${option.id})`}</Typography>
              <Typography variant="caption">{option.description}</Typography>
            </div>
          )}
          onChange={(e, value, reason) => {
            if (reason === "select-option") {
              setState((s) => ({
                ...s,
                selected: value,
                inputValue: `${value.label} (${value.id})`,
              }));
              props.onChange(value);
            }
          }}
          onInputChange={onInputChange}
          options={state.entities}
          loading={state.loading}
          renderInput={(params) =>
            renderInput(params, "Type and select a new class")
          }
        />
      </Popover>
    </React.Fragment>
  );
}

EditClass.defaultProps = {
  onChange: () => {},
};
