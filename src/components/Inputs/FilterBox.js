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
  centerContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainLanding: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.palette.background.main,
  },
  mainDiv: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& > div": {
      marginTop: theme.spacing(2),
    },
  },
  inputBox: {
    width: "41.67vw",
    height: "33.33vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: theme.palette.common.white,
  },
  infoText: {
    width: "60%",
  },
  exampleList: {
    padding: theme.spacing(2),
  },
  inputs: {
    width: "100%",
    height: "100%",
  },
  inputInput: {
    width: "85%",
  },
  filters: {
    height: "8vh",
    overflowY: "scroll",
    padding: theme.spacing(2),
  },
}));

export default function FilterBox(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    modalOpen: true,
  });
  return (
    <React.Fragment>
      {props.disableModal ? (
        <React.Fragment />
      ) : (
        <FilterModal
          open={state.modalOpen}
          onClose={() => setState((s) => ({ ...s, modalOpen: false }))}
        />
      )}

      <InputLabel shrink="true">Filters</InputLabel>
      <Paper className={classes.filters} variant="outlined" disableElevation>
        <Grid container spacing={1}>
          {props.disableModal ? (
            <React.Fragment />
          ) : (
            <Grid item>
              <Chip
                size="small"
                color="primary"
                label={<Typography>Add Filter</Typography>}
                onClick={() => {
                  setState((s) => ({ ...s, modalOpen: true }));
                }}
                icon={<AddCircleIcon style={{ fontSize: "3vh" }} />}
              />
            </Grid>
          )}
          {props.options.map((x) => (
            <Grid item>
              <AdvChip label={<Typography>{x.label}</Typography>} />
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
};
