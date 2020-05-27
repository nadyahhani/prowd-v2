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
  Popover,
} from "@material-ui/core";
import {
  KeyboardArrowRight,
  RemoveCircle,
  AddCircle,
  Edit,
} from "@material-ui/icons";
import theme from "../../theme";
import ScatterLineChart from "./ScatterLineChart";
import { ChromePicker } from "react-color";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
    data: null,
    colorPicker: {
      open: false,
      anchorEl: null,
      selectedColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    },
    newLine: null,
    newLineInput: "",
  });

  React.useEffect(() => {
    let temp = props.allData.map((item) => ({
      ...item,
      name: `${
        item.analysis_info.item_1_label ? item.analysis_info.item_1_label : ""
      }${
        item.analysis_info.item_2_label
          ? `-${item.analysis_info.item_2_label}`
          : ""
      }${
        item.analysis_info.item_3_label
          ? `-${item.analysis_info.item_3_label}`
          : ""
      }`,
    }));
    if (temp.length > 0) {
      setState((s) => ({
        ...s,
        allData: temp,
        data: state.data ? state.data : props.data,
        newLine: temp[0],
        newLineInput: temp[0].name,
      }));
    }
  }, [state.open, state.data]);

  const handlePicker = (reason, data = null) => {
    switch (reason) {
      case "open":
        setState((s) => ({
          ...s,
          colorPicker: { ...s.colorPicker, open: true, anchorEl: data },
        }));
        return;
      case "change":
        setState((s) => ({
          ...s,
          colorPicker: { ...s.colorPicker, selectedColor: data },
        }));
        return;
      default:
        setState((s) => ({
          ...s,
          colorPicker: { ...s.colorPicker, open: false },
        }));
        return;
    }
  };

  const handleTable = (reason, data = null) => {
    let temp = [];
    switch (reason) {
      case "remove":
        temp = [...state.data];
        temp.splice(data, 1);
        setState((s) => ({ ...s, data: temp }));
        return;
      default:
        temp = [...state.data];
        temp.push({
          ...state.newLine,
          raw: state.newLine.newHistogramData.raw_data,
          data: state.newLine.newHistogramData.raw_data.map((num, index) => ({
            x:
              (index * 100) /
              (state.newLine.newHistogramData.raw_data.length - 1),
            y: (num * 100) / state.newLine.amount,
          })),
          color: state.colorPicker.selectedColor,
          borderColor: state.colorPicker.selectedColor,
          borderWidth: 1.5,
          pointBackgroundColor: state.colorPicker.selectedColor,
          pointBorderColor: state.colorPicker.selectedColor,
          pointRadius: 2,
          pointHoverRadius: 3,
          fill: false,
          showLine: true,
        });
        setState((s) => ({ ...s, data: temp }));
        return;
    }
  };
  return (
    <React.Fragment>
      {state.open ? (
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
              <ScatterLineChart
                hideLegend
                key={(function () {
                  return `${state.data
                    .map((item) => `${item.name}`)
                    .join("-")}`;
                })()}
                data={{
                  datasets: state.data.map((item) => ({
                    ...item,
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
              <Typography>
                <Box fontWeight="bold">Legend</Box>
              </Typography>
              <Paper
                variant="outlined"
                elevation={0}
                style={{ height: theme.spacing(30), overflowY: "scroll" }}
              >
                <Table size="small" padding="none">
                  {state.data.map((item, index) => (
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
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => handleTable("remove", index)}
                        >
                          <RemoveCircle />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>
                      <div
                        style={{
                          width: theme.spacing(5),
                          height: theme.spacing(5),
                          backgroundColor: state.colorPicker.selectedColor,
                        }}
                      >
                        <Popover
                          anchorOrigin={{
                            vertical: "center",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "center",
                            horizontal: "right",
                          }}
                          open={state.colorPicker.open}
                          anchorEl={state.colorPicker.anchorEl}
                          onClose={() => handlePicker("close")}
                        >
                          <ChromePicker
                            color={state.colorPicker.selectedColor}
                            onChangeComplete={(color, event) =>
                              handlePicker(
                                "change",
                                `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
                              )
                            }
                          />
                        </Popover>
                        <IconButton
                          style={{ color: theme.palette.common.white }}
                          onClick={(e) => handlePicker("open", e.currentTarget)}
                        >
                          <Edit />
                        </IconButton>
                      </div>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <div
                        style={{
                          padding: `${theme.spacing(1)}px ${theme.spacing(
                            2
                          )}px`,
                        }}
                      >
                        <Autocomplete
                          disableClearable
                          value={state.newLine}
                          inputValue={state.newLineInput}
                          getOptionLabel={(option) => {
                            return option.name;
                          }}
                          renderOption={(option) => (
                            <Typography>{`${option.name}`}</Typography>
                          )}
                          onInputChange={(e, value, reason) => {
                            if (value) {
                              setState((s) => ({ ...s, newLineInput: value }));
                            }
                          }}
                          onChange={(e, value, reason) => {
                            if (reason === "select-option") {
                              setState((s) => ({ ...s, newLine: value }));
                            }
                          }}
                          options={state.allData}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              margin="dense"
                              size="small"
                              placeholder="Select another subclass to show"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "new-password",
                              }}
                            />
                          )}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleTable("add")}
                      >
                        <AddCircle />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </Table>
              </Paper>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                style={{ marginLeft: theme.spacing(1) }}
                onClick={() => {
                  props.onApply(state.data);
                  setState((s) => ({ ...s, open: false }));
                }}
              >
                Apply
              </Button>
              <Button
                color="primary"
                onClick={() => setState((s) => ({ ...s, open: false }))}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </Dialog>
      ) : null}
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
