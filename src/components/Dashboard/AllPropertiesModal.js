import React from "react";
import {
  Modal,
  Paper,
  makeStyles,
  Button,
  Grid,
  Select,
  Typography,
  MenuItem,
  Box,
  FormControl,
} from "@material-ui/core";
import HorizontalBarChart from "./HorizontalBarChart";
import PropTypes from "prop-types";

export default function AllPropertiesModal(props) {
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modalPaper: {
      width: "70vw",
      height: "fit-content",
      padding: theme.spacing(2),
    },
    chart: {
      height: `${props.data.labels.length * 4}vh`,
      width: "100%",
    },
    chartDiv: {
      width: "100%",
      maxHeight: "60vh",
      overflowY: "scroll",
    },
  }));

  const classes = useStyles();
  const [state, setState] = React.useState({
    modalIsOpen: false,
    sort: 0,
  });

  const setModal = (bool) => {
    setState((s) => ({ ...s, modalIsOpen: bool }));
  };

  return (
    <React.Fragment>
      <Modal
        className={classes.modal}
        open={state.modalIsOpen}
        onClose={() => setModal(false)}
      >
        <Paper classes={{ root: classes.modalPaper }}>
          <Grid
            container
            spacing={1}
            direction="column"
            style={{ height: "100%" }}
          >
            <Grid item>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Typography component="div">
                    <Box fontWeight="bold">All Properties</Box>
                  </Typography>
                </Grid>
                <Grid item>
                  <FormControl variant="outlined" size="small">
                    <Select
                      defaultValue={state.sort}
                      onChange={(e, child) => {
                        setState((s) => ({ ...s, sort: child.props.value }));
                      }}
                    >
                      <MenuItem value={0}>Descending</MenuItem>
                      <MenuItem value={1}>Ascending</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.chartDiv}>
              {state.sort === 0 ? (
                <HorizontalBarChart
                  key={3}
                  labels={props.data.labels}
                  values={props.data.values}
                  max={props.data.max}
                  classes={{ ChartWrapper: classes.chart }}
                />
              ) : (
                <HorizontalBarChart
                  key={4}
                  labels={[...props.data.labels].reverse()}
                  values={[...props.data.values].reverse()}
                  max={props.data.max}
                  classes={{ ChartWrapper: classes.chart }}
                />
              )}
            </Grid>
            <Grid item>
              <Button color="primary" onClick={() => setModal(false)}>
                Close
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
      <Button size="small" color="primary" onClick={() => setModal(true)}>
        See All...
      </Button>
    </React.Fragment>
  );
}

AllPropertiesModal.propTypes = {
  data: PropTypes.object,
};
