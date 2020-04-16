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
} from "@material-ui/core";
import FilterBox from "./FilterBox";

const useStyles = makeStyles((theme) => ({
  modalPaper: {
    height: "60vh",
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

export default function FilterModal(props) {
  const classes = useStyles();
  return (
    <Modal open={props.open} onClose={props.onClose} className={classes.modal}>
      <Paper className={classes.modalPaper}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography>Add Filter</Typography>
          </Grid>
          <Grid item>
            <TextField />
          </Grid>
          <Grid item>
            <TextField />
          </Grid>
          <Grid item>
            <Button color="primary">Add Filter</Button>
          </Grid>
          <Grid item>
            <Typography>Edit Filters</Typography>
          </Grid>
          <Grid item>
            <FilterBox
              disableModal
              options={[
                { code: "AD", label: "Andorra", phone: "376" },
                { code: "AE", label: "United Arab Emirates", phone: "971" },
                { code: "AF", label: "Afghanistan", phone: "93" },
                { code: "AG", label: "Antigua and Barbuda", phone: "1-268" },
                { code: "AI", label: "Anguilla", phone: "1-264" },
                { code: "AL", label: "Albania", phone: "355" },
                { code: "AM", label: "Armenia", phone: "374" },
                { code: "AO", label: "Angola", phone: "244" },
                { code: "AQ", label: "Antarctica", phone: "672" },
              ]}
            />
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
}

FilterModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
