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
import theme from "../../theme";
import { NavigateNext } from "@material-ui/icons";

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
                    <Box fontWeight="bold">{props.title}</Box>
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
                      <MenuItem value={props.ascending ? 1 : 0}>
                        Descending
                      </MenuItem>
                      <MenuItem value={props.ascending ? 0 : 1}>
                        Ascending
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.chartDiv}>
              {state.sort === 0 ? (
                <HorizontalBarChart
                  key={`${props.key}-${3}`}
                  stacked={props.stacked}
                  data={
                    props.multiple
                      ? {
                          labels: props.data.labels,

                          datasets: [
                            {
                              data: props.data.valuesA,
                              backgroundColor: theme.palette.itemA.main,
                            },
                            {
                              data: props.data.valuesB,
                              backgroundColor: theme.palette.itemB.main,
                            },
                          ],
                        }
                      : {
                          labels: props.data.labels,
                          datasets: [
                            {
                              label: props.label,
                              backgroundColor: theme.palette.chart.main,
                              data: props.data.values,
                            },
                          ],
                        }
                  }
                  max={props.data.max}
                  classes={{ ChartWrapper: classes.chart }}
                />
              ) : (
                <HorizontalBarChart
                  key={`${props.key}-${4}`}
                  stacked={props.stacked}
                  data={
                    props.stacked
                      ? {
                          labels: props.data.labels,

                          datasets: [
                            {
                              data: [...props.data.valuesA].reverse(),
                              backgroundColor: theme.palette.itemA.main,
                            },
                            {
                              data: [...props.data.valuesB].reverse(),
                              backgroundColor: theme.palette.itemB.main,
                            },
                          ],
                        }
                      : {
                          labels: [...props.data.labels].reverse(),
                          datasets: [
                            {
                              label: "# of Items with this property",
                              backgroundColor: theme.palette.chart.main,
                              data: [...props.data.values].reverse(),
                            },
                          ],
                        }
                  }
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
      <Button
        size="small"
        color="primary"
        onClick={() => setModal(true)}
        endIcon={<NavigateNext />}
      >
        See All
      </Button>
    </React.Fragment>
  );
}

AllPropertiesModal.propTypes = {
  data: PropTypes.object,
  stacked: false,
  title: "All Properties",
  label: "Number of Items with this property",
};
