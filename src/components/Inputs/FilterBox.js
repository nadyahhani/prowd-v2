import React from "react";
import PropTypes from "prop-types";
import theme from "../../theme";
import {
  Typography,
  makeStyles,
  Paper,
  Grid,
  Chip,
  InputLabel,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AdvChip from "../../components/Inputs/AdvChip";
import FilterModal from "../../components/Inputs/FilterModal";

const useStyles = makeStyles(() => ({
  filters: {
    height: theme.spacing(8),
    overflowY: "scroll",
    overflowX: "hidden",
    width: "100%",
    padding: theme.spacing(1),
  },
}));

export default function FilterBox(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    modalOpen: false,
    anchorEl: null,
  });
  return (
    <React.Fragment>
      {props.disableModal ? (
        <React.Fragment />
      ) : (
        <FilterModal
          open={state.modalOpen}
          anchorEl={state.anchorEl}
          onClose={() => setState((s) => ({ ...s, modalOpen: false }))}
          propertiesOptions={props.propertiesOptions}
          appliedFilters={props.options}
          renderTagText={props.renderTagText}
          selectedClass={props.selectedClass}
          onApply={props.onApply}
          onDelete={props.onDelete}
          onClear={props.onClear}
        />
      )}
      {props.hideLabel ? null : <InputLabel shrink={true}>Filters </InputLabel>}
      <Paper
        className={`${classes.filters}${
          props.classes.root ? " " + props.classes.root : ""
        }`}
        variant="outlined"
        elevation={0}
        style={props.cols ? { height: theme.spacing(props.cols * 3) } : {}}
      >
        <Grid container spacing={1}>
          {props.disableModal ? (
            <React.Fragment />
          ) : (
            <Grid item>
              <Chip
                size="small"
                disabled={props.disabled}
                color="primary"
                variant="outlined"
                label={<Typography>Add Filter</Typography>}
                onClick={(e) => {
                  setState((s) => ({
                    ...s,
                    modalOpen: true,
                    anchorEl: e.currentTarget,
                  }));
                }}
                icon={<AddCircleIcon style={{ fontSize: "3vh" }} />}
              />
            </Grid>
          )}
          {props.options.length > 0
            ? props.options.map((x, index) => (
                <Grid item key={index}>
                  <AdvChip
                    key={index}
                    label={
                      props.renderTagText ? props.renderTagText(x) : x.label
                    }
                    property={`${
                      x.property ? x.property.label : x.filterLabel
                    } (${x.property ? x.property.id : x.filterID})`}
                    value={`${x.value ? x.value.label : x.filterValueLabel} (${
                      x.value ? x.value.id : x.filterValueID
                    })`}
                    onDelete={() => props.onDelete(index)}
                    disabled={props.disabled}
                  />
                </Grid>
              ))
            : null}
          {props.options.length === 0 && !props.disabled ? (
            <Grid
              item
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography color="textSecondary">or leave empty</Typography>
            </Grid>
          ) : null}
        </Grid>
      </Paper>
    </React.Fragment>
  );
}

FilterBox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  disableModal: PropTypes.bool,
  cols: PropTypes.number,
  propertiesOptions: PropTypes.arrayOf(PropTypes.object),
  selectedClass: PropTypes.object,
  renderTagText: PropTypes.func,
  onApply: PropTypes.func,
  disabled: PropTypes.bool,
  onDelete: PropTypes.func,
  hideLabel: PropTypes.bool,
  classes: PropTypes.object,
};

FilterBox.defaultProps = {
  hideLabel: false,
  classes: { root: "" },
};
