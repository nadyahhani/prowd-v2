import React from "react";
import theme from "../../theme";
import {
  Box,
  Typography,
  ThemeProvider,
  makeStyles,
  Paper,
  Grid,
  Button,
  Card,
  ButtonBase,
} from "@material-ui/core";
import Navbar from "../../components/Navigation/Navbar";
import VirtualAutocomp from "../../components/Inputs/VirtualAutocomp";
import FilterBox from "../../components/Inputs/FilterBox";

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

const tempData = {
  examples: [
    "Actor and Actresses",
    "American Politicians",
    "Countries of the World",
    "Diseases",
  ],
  countries: [
    { code: "AD", label: "Andorra", phone: "376" },
    { code: "AE", label: "United Arab Emirates", phone: "971" },
    { code: "AF", label: "Afghanistan", phone: "93" },
    { code: "AG", label: "Antigua and Barbuda", phone: "1-268" },
    { code: "AI", label: "Anguilla", phone: "1-264" },
    { code: "AL", label: "Albania", phone: "355" },
    { code: "AM", label: "Armenia", phone: "374" },
    { code: "AO", label: "Angola", phone: "244" },
    { code: "AQ", label: "Antarctica", phone: "672" },
  ],
};

function Landing(props) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      {/* <FilterModal
        open={state.filterOptOpen}
        onClose={() => setState((s) => ({ ...s, filterOptOpen: false }))}
      /> */}
      <div className={classes.mainLanding}>
        <div className={`${classes.mainDiv} ${classes.centerContent}`}>
          <Typography variant="h2" className={classes.infoText}>
            ProWD is a tool which visualizes imbalance in Wikidata, a knowledge
            base
          </Typography>
        </div>
        <div className={classes.mainDiv}>
          <Typography variant="h2">
            <Box fontWeight="bold">What Imbalance do you want to check?</Box>
          </Typography>
          <Paper className={classes.inputBox} elevation={1}>
            <Grid
              container
              justify="center"
              spacing={2}
              direction="column"
              className={classes.inputInput}
            >
              <Grid item>
                <VirtualAutocomp
                  label="Class"
                  placeholder="e.g. Human, Disease, Country"
                  options={tempData.countries}
                  // groupBy={(option) => option.code.toUpperCase()}
                  getOptionLabel={(option) => option.label}
                  renderOption={(option) => (
                    <Typography noWrap>{option.label}</Typography>
                  )}
                />
              </Grid>
              <Grid item>
                <FilterBox options={tempData.countries} />
              </Grid>
              <Grid item xs={5}>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  fullWidth
                >
                  Check
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Grid container spacing={2} style={{ width: "41.67vw" }}>
            {tempData.examples.map((x, idx) => (
              <Grid item key={idx}>
                <ButtonBase onClick={() => {}}>
                  <Card className={classes.exampleList}>
                    <Typography variant="body1">{x}</Typography>
                  </Card>
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Landing;
