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
    height: "8vh",
    overflowY: "scroll",
    padding: theme.spacing(2),
  },
}));

export default function FilterBox(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    modalOpen: false,
  });
  return (
    <React.Fragment>
      {props.disableModal ? (
        <React.Fragment />
      ) : (
        <FilterModal
          open={state.modalOpen}
          onClose={() => setState((s) => ({ ...s, modalOpen: false }))}
          propertiesOptions={props.propertiesOptions}
          appliedFilters={props.options}
          selectedClass={props.selectedClass}
          onApply={props.onApply}
          onDelete={props.onDelete}
        />
      )}
      <InputLabel shrink={true}>Filters</InputLabel>
      <Paper
        className={classes.filters}
        variant="outlined"
        elevation={0}
        style={props.cols ? { height: `${props.cols * 4}vh` } : {}}
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
                label={<Typography>Add Filter</Typography>}
                onClick={() => {
                  setState((s) => ({ ...s, modalOpen: true }));
                }}
                icon={<AddCircleIcon style={{ fontSize: "3vh" }} />}
              />
            </Grid>
          )}
          {props.options.map((x, index) => (
            <Grid item key={index}>
              <AdvChip
                key={index}
                label={props.renderTagText ? props.renderTagText(x) : x.label}
                onDelete={() => props.onDelete(index)}
              />
            </Grid>
          ))}
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
};
