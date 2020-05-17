import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, Box, Typography, Grid } from "@material-ui/core";
import Help from "./Help";
import theme from "../../theme";
import { NavigateNext } from "@material-ui/icons";

export default function Onboarding(props) {
  const [state, setState] = React.useState({
    currentPage: "profile",
    currentStep: 0,
    running: false,
    class: "",
    filters: "",
  });
  const steps = {
    profile: [
      {
        title: "Welcome to the Dashboard! Continue with the tour?",
        text: "You can always get a tour later from the dashboard settings.",
        action1: "Sure",
        action2: "Later",
        enableBackground: true,
        style: {},
      },
      {
        title: "Brief introduction to Wikidata",
        text:
          "The Wikidata repository consists mainly of items, each one having a label, a description and any number of aliases. Items are uniquely identified by a Q followed by a number, such as San Fransisco (Q62). Statements describe detailed characteristics of an Item and consist of a property and a value. Properties in Wikidata have a P followed by a number, such as with population (P1082). ",
        action1: "Next",
        action2: "Stop",
        enableBackground: true,
        style: { maxWidth: "fit-content" },
        customChild: (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: theme.spacing(100),
              padding: theme.spacing(2),
            }}
          >
            <div
              style={{
                width: "45%",
              }}
            >
              <Typography
                component="div"
                style={{ marginBottom: theme.spacing(1) }}
              >
                <Box fontWeight="bold">
                  Each items are linked to information which are referred to as
                  Properties.
                </Box>{" "}
              </Typography>
              <Typography
                component="div"
                style={{ marginBottom: theme.spacing(1) }}
              >
                As an example of this linked relationship,{" "}
                <a href="#">San Fransisco (Q62)</a> has information about its{" "}
                <a href="#">population</a>, and also other information such as{" "}
                <a href="#">mayor</a>, <a href="#">location</a>, and{" "}
                <a href="#">many more</a>.
              </Typography>
              <Typography style={{ marginBottom: theme.spacing(1) }}>
                The amount of information the items of a particular topic has
                can show just how well that topic is represented. Which you can
                explore in this dashboard.
              </Typography>
              <Button color="primary" endIcon={<NavigateNext />}>
                Read more about Wikidata
              </Button>
            </div>
            <div style={{ width: "45%" }}>
              <img
                style={{ width: "100%" }}
                src={`https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Linked_Data_-_San_Francisco.svg/2560px-Linked_Data_-_San_Francisco.svg.png`}
                alt="rdf illustration"
              />
            </div>
          </div>
        ),
      },
      {
        title: "",
        text: (
          <Typography component="div">
            {`These are the items of the ${state.class} class with the filters.`}
            <Box fontWeight="bold">
              Each item has information linked to them in the form of a
              property.
            </Box>
          </Typography>
        ),
        action1: "Next",
        action2: "Stop",
        enableBackground: false,
        style: {
          left: theme.spacing(-20),
          top: theme.spacing(30),
          width: theme.spacing(36),
        },
      },
      {
        title: "",
        text:
          "Give your dashboard a name and author so you can easily find it later. You can always change the class and filters to your needs later.",
        action1: "Next",
        action2: "Stop",
        enableBackground: false,
        style: { top: theme.spacing(-20), width: theme.spacing(36) },
      },
      {
        title: "",
        text: (
          <Typography component="div">
            These information can give you insights on the filtered{" "}
            {state.class}{" "}
            class condition.{" "}
            <Box fontWeight="bold">
              Hover over <Help text="Hello!" /> to learn about each piece of
              information
            </Box>
          </Typography>
        ),
        action1: "Next",
        action2: "Stop",
        enableBackground: false,
        style: {
          top: theme.spacing(8),
          left: theme.spacing(30),
          width: theme.spacing(50),
        },
      },
    ],
  };
  const useStyles = makeStyles(() => ({
    dialogRoot: {
      ...steps[state.currentPage][state.currentStep].style,
    },
  }));
  const classes = useStyles();

  React.useEffect(() => {
    setState((s) => ({
      ...s,
      currentStep: props.step,
      currentPage: props.page,
      running: props.running,
      class: props.class,
      filters: props.filters,
    }));
  }, [props.step, props.page, props.running, props.class, props.filters]);

  const handleClose = () => {
    // setState((s) => ({ ...s, running: false }));
    props.onChange({ reason: "stop", state });
  };

  return (
    <div>
      <Dialog
        open={state.running}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        hideBackdrop={
          !steps[state.currentPage][state.currentStep].enableBackground
        }
        classes={{ paper: classes.dialogRoot }}
      >
        <DialogTitle id="alert-dialog-title">
          {steps[state.currentPage][state.currentStep].title}
        </DialogTitle>
        <DialogContent
          style={
            steps[state.currentPage][state.currentStep].customChild
              ? { width: "fit-content" }
              : null
          }
        >
          {steps[state.currentPage][state.currentStep].customChild ? (
            steps[state.currentPage][state.currentStep].customChild
          ) : (
            <Typography>
              {steps[state.currentPage][state.currentStep].text}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (steps[state.currentPage].length > state.currentStep + 1) {
                setState((s) => ({ ...s, currentStep: s.currentStep + 1 }));
                props.onChange({ reason: "continue", state });
              } else {
                handleClose();
              }
            }}
            color="primary"
          >
            {steps[state.currentPage][state.currentStep].action1}
          </Button>
          <Button
            onClick={() => {
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            {steps[state.currentPage][state.currentStep].action2}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
