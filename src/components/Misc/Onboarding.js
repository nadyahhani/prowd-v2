import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, Box, Typography } from "@material-ui/core";
import Help from "./Help";

export default function Onboarding(props) {
  const useStyles = makeStyles(() => ({
    screen: {},
  }));
  const classes = useStyles();
  const steps = {
    profile: [
      {
        title: "Welcome to the Dashboard! Would you like a tour?",
        text: "You can always get a tour later from the dashboard settings.",
        action1: "Sure",
        action2: "Later",
        enableBackground: true,
      },
      {
        title: "Wikidata stores information as linked items",
        text:
          "The Wikidata repository consists mainly of items, each one having a label, a description and any number of aliases. Items are uniquely identified by a Q followed by a number, such as San Fransisco (Q62). Statements describe detailed characteristics of an Item and consist of a property and a value. Properties in Wikidata have a P followed by a number, such as with population (P1082). ",
        action1: "Next",
        action2: "Stop",
        enableBackground: true,
      },
      {
        title: "",
        text:
          "These are the items of the filtered class. Each item has information linked to them in the form of a property.",
        action1: "Next",
        action2: "Stop",
        enableBackground: false,
      },
      {
        title: "",
        text:
          "You can always change the class and filters to your needs. Make sure to apply your changes.",
        action1: "Next",
        action2: "Stop",
        enableBackground: false,
      },
      {
        title: "",
        text: (
          <Typography component="div">
            These information can give you insights on the filtered human (Q5)
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
      },
    ],
  };
  const [state, setState] = React.useState({
    currentPage: "profile",
    currentStep: 0,
    running: true,
  });
  const handleClose = () => {
    setState((s) => ({ ...s, running: false }));
  };
  return (
    <div>
      <Dialog
        open={state.running}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {steps[state.currentPage][state.currentStep].title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {steps[state.currentPage][state.currentStep].text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (steps[state.currentPage].length > state.currentStep + 1) {
                setState((s) => ({ ...s, currentStep: s.currentStep + 1 }));
              } else {
                setState((s) => ({ ...s, currentStep: 0, running: false }));
              }
            }}
            color="primary"
          >
            {steps[state.currentPage][state.currentStep].action1}
          </Button>
          <Button
            onClick={() => setState((s) => ({ ...s, running: false }))}
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
