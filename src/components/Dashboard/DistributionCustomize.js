import React from "react";
import {
  Button,
  Dialog,
  Grid,
  Typography,
  makeStyles,
  Table,
  IconButton,
  TableRow,
  TableCell,
  TextField,
  Box,
  Paper,
  MenuItem,
} from "@material-ui/core";
import {
  KeyboardArrowRight,
  RemoveCircle,
  AddCircle,
} from "@material-ui/icons";
import theme from "../../theme";
import LineChart from "./LineChart";

export default function DistributionCustomize(props) {
  const useStyles = makeStyles(() => ({
    histogramChart: {
      paddingTop: theme.spacing(1),
      width: "100%",
      height: "100%",
    },
    dialogPaper: {
      padding: theme.spacing(2),
      maxWidth: "fit-content",
    },
    dialogRoot: {
      //   maxWidth: "fit-content",
    },
  }));
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
  });
  return (
    <React.Fragment>
      <Dialog
        open={state.open}
        onClose={() => setState((s) => ({ ...s, open: false }))}
        classes={{ paper: classes.dialogPaper, root: classes.dialogRoot }}
      >
        <Grid container spacing={1} direction="column">
          <Grid item>
            <Typography component="div">
              <Box fontWeight="bold">Properties Distribution</Box>
            </Typography>
          </Grid>
          <Grid
            item
            style={{ height: theme.spacing(30), width: theme.spacing(85) }}
          >
            <LineChart
              percentage
              data={{
                labels: [
                  "10",
                  "20",
                  "30",
                  "40",
                  "50",
                  "60",
                  "70",
                  "80",
                  "90",
                  "100",
                ],
                datasets: props.data.map((item) => ({
                  data: item.data,
                  // label: "Africa",
                  borderColor: item.color,
                  fill: false,
                })),
              }}
              // max={100}
              classes={{ ChartWrapper: classes.histogramChart }}
            />
          </Grid>
          <Grid item>
            <Typography>Legend</Typography>
            <Paper
              variant="outlined"
              elevation={0}
              style={{ height: theme.spacing(40), overflowY: "scroll" }}
            >
              <Table size="small" padding="none">
                {props.data.map((item) => (
                  <TableRow>
                    <TableCell>
                      <div
                        style={{
                          width: theme.spacing(5),
                          height: theme.spacing(5),
                          backgroundColor: item.color,
                        }}
                      />
                    </TableCell>
                    <TableCell colSpan={3}>
                      <div
                        style={{
                          padding: `${theme.spacing(1)}px ${theme.spacing(
                            2
                          )}px`,
                        }}
                      >
                        <Typography>{item.name}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary" size="small">
                        <RemoveCircle />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>
                    <div
                      style={{
                        width: theme.spacing(4),
                        height: theme.spacing(5),
                      }}
                    />
                  </TableCell>
                  <TableCell colSpan={3}>
                    <div
                      style={{
                        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
                      }}
                    >
                      <TextField
                        fullWidth
                        defaultValue={props.allData[0]}
                        variant="outlined"
                        size="small"
                        select
                      >
                        {props.allData.map((item, idx) => (
                          <MenuItem key={idx} value={item}>{`${
                            item.analysis_info.item_1_label
                              ? item.analysis_info.item_1_label
                              : ""
                          }${
                            item.analysis_info.item_2_label
                              ? `-${item.analysis_info.item_2_label}`
                              : ""
                          }${
                            item.analysis_info.item_3_label
                              ? `-${item.analysis_info.item_3_label}`
                              : ""
                          }`}</MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" size="small">
                      <AddCircle />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </Table>
            </Paper>
          </Grid>
          <Grid item></Grid>
        </Grid>
      </Dialog>
      <Button
        onClick={() => setState((s) => ({ ...s, open: true }))}
        color="primary"
        endIcon={<KeyboardArrowRight />}
        size="small"
      >
        Customize
      </Button>
    </React.Fragment>
  );
}

DistributionCustomize.defaultProps = {
  data: [],
  allData: [],
};
