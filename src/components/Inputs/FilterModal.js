import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Modal,
  makeStyles,
  Checkbox,
  InputLabel,
  Box,
} from "@material-ui/core";
import VirtualAutocomp from "../../components/Inputs/VirtualAutocomp";
import FilterBox from "./FilterBox";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  modalPaper: {
    height: "fit-content",
    width: "65vw",
    position: "absolute",
    padding: theme.spacing(2),
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const temp = [
  { code: "AD", label: "Andorra", phone: "376" },
  { code: "AE", label: "United Arab Emirates", phone: "971" },
  { code: "AF", label: "Afghanistan", phone: "93" },
  { code: "AG", label: "Antigua and Barbuda", phone: "1-268" },
  { code: "AI", label: "Anguilla", phone: "1-264" },
  { code: "AL", label: "Albania", phone: "355" },
  { code: "AM", label: "Armenia", phone: "374" },
  { code: "AO", label: "Angola", phone: "244" },
  { code: "AQ", label: "Antarctica", phone: "672" },
];

export default function FilterModal(props) {
  const classes = useStyles();
  return (
    <Modal open={props.open} onClose={props.onClose} className={classes.modal}>
      <Paper className={classes.modalPaper}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography>
              <Box fontWeight="bold">Add Filters</Box>
            </Typography>
          </Grid>
          <Grid item>
            <VirtualAutocomp
              label="Property"
              placeholder="e.g. Sex or Gender, Date of Birth, Country"
              options={props.propertiesOptions ? props.propertiesOptions : []}
              getOptionLabel={(option) => option.label}
              renderOption={(option) => (
                <Typography noWrap>{option.label}</Typography>
              )}
            />
          </Grid>
          <Grid item>
            <InputLabel shrink="true">Value</InputLabel>
            <Autocomplete
              multiple
              size="small"
              id="tags-filled"
              options={temp.map((option) => option.label)}
              disableCloseOnSelect
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox checked={selected} style={{ fontSize: "2.5vh" }} />
                  {option}
                </React.Fragment>
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Typography
                    {...getTagProps({ index })}
                  >{`${option}, `}</Typography>
                ))
              }
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
              )}
            />
          </Grid>
          <Grid item>
            <Button color="primary" variant="contained">
              Add Filter
            </Button>
          </Grid>
          <Grid item>
            <Typography>
              <Box fontWeight="bold">Applied Filters</Box>
            </Typography>
          </Grid>
          <Grid item>
            <FilterBox disableModal cols={4} options={temp} />
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={props.onClose}
                >
                  Apply
                </Button>
                <Button color="primary" onClick={props.onClose}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
}

FilterModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  propertiesOptions: PropTypes.arrayOf(PropTypes.object),
};
