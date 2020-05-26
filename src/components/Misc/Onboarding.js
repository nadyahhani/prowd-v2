import React from "react";
import Button from "@material-ui/core/Button";
import {
  makeStyles,
  Box,
  Typography as TypographyMui,
} from "@material-ui/core";
import Help from "./Help";
import theme from "../../theme";
import { useHistory } from "react-router-dom";
import Tour from "reactour";

function Typography(props) {
  return <TypographyMui style={{ textAlign: "justify" }} {...props} />;
}
export default function Onboarding(props) {
  const { step, page, running, dashclass, hash, filters } = props;
  const [state, setState] = React.useState({
    currentPage: "profile",
    currentStep: 0,
    running: false,
    hash: "",
    class: "",
    filters: [],
  });

  const steps = {
    profile: [
      {
        content: ({ goTo, inDOM }) => (
          <div className={classes.contentdiv}>
            <Typography variant="h2" gutterBottom style={{ textAlign: "left" }}>
              <Box fontWeight="bold">
                Welcome to your new Dashboard! Would you like a tour?
              </Box>
            </Typography>
            <Typography gutterBottom>
              You can always get a tour later from the dashboard settings.
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                marginTop: theme.spacing(2),
              }}
            >
              <Button
                size="small"
                onClick={() => goTo(1)}
                variant="contained"
                color="primary"
                style={{ marginRight: theme.spacing(1) }}
              >
                sure
              </Button>
              <Button size="small" onClick={handleClose} color="primary">
                maybe later
              </Button>
            </div>
          </div>
        ),
      },
      {
        selector: "#global-dashboard-data",
        content: ({ goTo, inDOM }) => (
          <div className={classes.contentdiv}>
            <Typography>
              These are the configurations of your dashboard. You can edit these
              configurations anytime.
            </Typography>
          </div>
        ),
      },
      {
        selector: "#dashboard-name-author",
        content: ({ goTo, inDOM }) => (
          <div className={classes.contentdiv}>
            <Typography>
              Give your dashboard a name and author so you can easily find it
              later on.
            </Typography>
          </div>
        ),
      },
      {
        selector: "#profile-item-table",
        content: ({ goTo, inDOM }) => (
          <div className={classes.contentdiv}>
            <Typography component="div" gutterBottom>
              {`These are the items of your topic of interest based on the configuration you made`}
            </Typography>
            <Typography component="div">
              {`Analysis made in this dashboard will be based off of these items`}
            </Typography>
          </div>
        ),
      },
      {
        selector: "#search-wikidata-navbar",
        position: "bottom",
        content: ({ goTo, inDOM }) => (
          <div className={classes.contentdiv}>
            <Typography component="div">
              {`Curious about an item? You can look up information about an item by using this searchbar.`}
            </Typography>
          </div>
        ),
      },
      {
        selector: "#profile-info-block",
        content: ({ goTo, inDOM }) => (
          <div className={classes.contentdiv}>
            <Typography component="div">
              These pieces of information can give you insights on your topic.{" "}
              <b>
                Hover over <Help text="Hello!" /> and the chart components to
                learn about each piece of information
              </b>
            </Typography>
          </div>
        ),
      },
      {
        selector: "#compare-tab",
        content: ({ goTo, inDOM }) => (
          <div className={classes.contentdiv}>
            <Typography component="div">
              <b>
                You can compare two subclasses of your topic by using this
                feature.
              </b>{" "}
            </Typography>
          </div>
        ),
      },
      {
        selector: "#discover-tab",
        content: ({ goTo, inDOM }) => (
          <div className={classes.contentdiv}>
            <Typography component="div" gutterBottom>
              <b>Want to discover more about your topic?</b> This feature will
              generate all the possible values of your chosen properties.
            </Typography>
          </div>
        ),
      },
      {
        content: ({ goTo, inDOM }) => (
          <div className={classes.contentdiv}>
            <Typography variant="h2" component="div" gutterBottom>
              Now have fun exploring!
            </Typography>
          </div>
        ),
      },
    ],
  };
  const useStyles = makeStyles(() => ({
    contentdiv: {
      padding: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  React.useEffect(() => {
    setState((s) => ({
      ...s,
      currentStep: step,
      currentPage: page,
      running: running,
      class: dashclass,
      hash: hash,
      filters: filters,
    }));
  }, [step, page, running, dashclass, filters, hash]);

  const handleClose = () => {
    props.onChange({ reason: "stop", state });
  };

  const current = steps[state.currentPage];

  return (
    <Tour
      goTo={0}
      steps={current}
      isOpen={state.running}
      onRequestClose={handleClose}
      disableInteraction
      onAfterOpen={(target) => (document.body.style.overflow = "hidden")}
      onBeforeClose={(target) => (document.body.style.overflow = "scroll")}
      lastStepNextButton={
        <Button size="small" variant="contained" color="primary">
          ok!
        </Button>
      }
      {...props}
    />
  );
}
