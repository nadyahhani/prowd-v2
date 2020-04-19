import React from "react";
import { Typography, Grid, Paper, makeStyles } from "@material-ui/core";
import VirtualizedTable from "../../components/Dashboard/VirtualizedTable";
import Histogram from "../../components/Dashboard/Histogram";
import GiniChart from "../../components/Dashboard/GiniChart";
import HorizontalBarChart from "../../components/Dashboard/HorizontalBarChart";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "79vh",
    padding: theme.spacing(1),
  },
  gridItem: {
    minWidth: "33.333333%",
    "& > *": {
      minHeight: "10vh",
      maxHeight: "40vh",
    },
  },
  tablePaper: {
    overflowY: "scroll",
    height: theme.spacing(45),
  },
  giniChart: {
    width: "35vh",
  },
}));

const temp = {
  gini: 0.125,
  data: [
    0,
    0.024738219895287957,
    0.11393979057591623,
    0.21230366492146596,
    0.3138743455497382,
    0.41852094240837695,
    0.5258507853403142,
    0.6361910994764398,
    0.7505235602094241,
    0.8716623036649215,
    1,
  ],
  insight:
    "The top 20% population of the class amounts to 23% cumulative number of properties.",
};

export default function Profile(props) {
  const classes = useStyles();
  return (
    <Grid
      container
      xs={12}
      spacing={1}
      direction="column"
      classes={{ root: classes.root }}
    >
      <Grid item xs={4} classes={{ root: classes.gridItem }}>
        <Paper variant="outlined">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper classes={{ root: classes.globalClass }}>
                <Typography variant="h2">Human - Q5</Typography>
                <Typography></Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <Typography>filter</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <Typography>Properties</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={4} classes={{ root: classes.gridItem }}>
        <Paper className={classes.tablePaper}>
          <VirtualizedTable />
        </Paper>
      </Grid>
      <Grid item xs={4} classes={{ root: classes.gridItem }}>
        <Paper>
          <Histogram />
        </Paper>
      </Grid>
      <Grid item xs={4} classes={{ root: classes.gridItem }}>
        <Paper>
          <GiniChart
            data={temp.data}
            gini={temp.gini}
            insight={temp.insight}
            classes={{ ChartWrapper: classes.giniChart }}
            // labels={temp.info.labels}
          />
        </Paper>
      </Grid>
      <Grid item xs={4} classes={{ root: classes.gridItem }}>
        <Paper>
          <HorizontalBarChart />
        </Paper>
      </Grid>
      <Grid item xs={4} classes={{ root: classes.gridItem }}>
        <Paper />
      </Grid>
    </Grid>
  );
}
