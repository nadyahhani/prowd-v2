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
import { useHistory } from "react-router-dom";

export default function Onboarding(props) {
  const history = useHistory();
  const [state, setState] = React.useState({
    currentPage: "profile",
    currentStep: 0,
    running: false,
    class: "",
    filters: "",
  });

  const repeatingSteps = {
    wikidata: {
      title: "So, how exactly does Wikidata store information?",
      text: "",
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
                Each and every item in Wikidata is linked to information in the
                form of{" "}
                <a style={{ textDecoration: "none" }} href="#">
                  Statements
                </a>
                , a Statement consists of a{" "}
                <a style={{ textDecoration: "none" }} href="#">
                  Property
                </a>{" "}
                and a{" "}
                <a style={{ textDecoration: "none" }} href="#">
                  Value
                </a>
                .
              </Box>{" "}
            </Typography>
            <Typography
              component="div"
              style={{ marginBottom: theme.spacing(1) }}
            >
              In the illustration on the right,{" "}
              <a href="#">San Fransisco (Q62)</a> has a statement about its{" "}
              <a href="#">mayor</a> with <a href="#">Gavin Newsom</a> as the
              value.
            </Typography>
            <Typography style={{ marginBottom: theme.spacing(1) }}>
              The amount of information the items of a particular topic has can
              show just how well that topic is represented. Which you can
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
    tableIntro: {
      title: "",
      text: (
        <Typography component="div">
          {`These items are instances of ${state.class} and posses the statements as filtered above.`}
        </Typography>
      ),
      action1: "Next",
      action2: "Stop",
      enableBackground: false,
      style: {
        left: theme.spacing(-20),
        top: theme.spacing(30),
        width: theme.spacing(40),
      },
    },
    searchWiki: {
      title: "",
      text: (
        <Typography component="div">
          {`You can look up the statements of an item by using the searchbar above.`}
        </Typography>
      ),
      action1: "Next",
      action2: "Stop",
      enableBackground: false,
      style: {
        top: theme.spacing(-34),
        left: theme.spacing(65),
        width: theme.spacing(36),
      },
    },
    infoIntro: {
      title: "",
      text: (
        <Typography component="div">
          These information can give you insights on the filtered {state.class}{" "}
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
  };
  const steps = {
    example: [
      {
        title: "Welcome to ProWD!",
        text: "Are you familiar with Wikidata?",
        action1: "Not really",
        action2: "Yes",
        func: {
          action1: () => {
            setState((s) => ({ ...s, currentStep: s.currentStep + 1 }));

            props.onChange({ reason: "continue", state });
          },
          action2: () => {
            setState((s) => ({ ...s, currentStep: s.currentStep + 2 }));
            props.onChange({ reason: "continue", state });
          },
        },
        enableBackground: true,
        style: {},
      },
      repeatingSteps.wikidata,
      repeatingSteps.tableIntro,
      repeatingSteps.searchWiki,
      repeatingSteps.infoIntro,
      {
        title: "Now it's time to create your own Dashboard!",
        text: (
          <Typography component="div">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                history.push("/#home");
              }}
            >
              Back to main page
            </Button>{" "}
            or{" "}
            <Button
              color="primary"
              size="small"
              onClick={() => {
                history.push("/browse/search=");
              }}
            >
              Browse created Dashboards
            </Button>
          </Typography>
        ),
        action1: "Finish",
        action2: "Stop",
        hideAction1: true,
        hideAction2: true,
        enableBackground: true,
        style: { maxWidth: "fit-content" },
      },
    ],
    profile: [
      {
        title: "Welcome to your new Dashboard! Would you like a tour?",
        text: "You can always get a tour later from the dashboard settings.",
        action1: "Sure",
        action2: "Later",
        enableBackground: true,
        style: {},
      },
      {
        title: "Are you familiar with Wikidata?",
        text: "",
        action1: "Not really",
        action2: "Yes",
        func: {
          action1: () => {
            setState((s) => ({ ...s, currentStep: s.currentStep + 1 }));
            props.onChange({ reason: "continue", state });
          },
          action2: () => {
            setState((s) => ({ ...s, currentStep: s.currentStep + 2 }));
            props.onChange({ reason: "continue", state });
          },
        },
        enableBackground: true,
        style: {},
      },
      repeatingSteps.wikidata,
      repeatingSteps.tableIntro,
      repeatingSteps.searchWiki,
      {
        title: "",
        text:
          "Give your dashboard a name and author so you can easily find it later. You can always change the class and filters to your needs later.",
        action1: "Next",
        action2: "Stop",
        enableBackground: false,
        style: {
          left: theme.spacing(-20),
          top: theme.spacing(-20),
          width: theme.spacing(36),
        },
      },
      repeatingSteps.infoIntro,
      {
        title: "Now have fun exploring!",
        text: `Want to compare groups of items? Or discover dominant groups of items of the filtered ${state.class}? Check out these features.`,
        action1: "Finish",
        action2: "Stop",
        hideAction2: true,
        enableBackground: false,
        style: {
          left: theme.spacing(-20),
          top: theme.spacing(-20),
          width: theme.spacing(36),
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

    switch (state.currentPage) {
      case "profile":
        props.onChange({ reason: "stop", state });
        return;
      default:
        history.push("/#home");
        return;
    }
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
          {steps[state.currentPage][state.currentStep].hideAction1 ? null : (
            <Button
              onClick={() => {
                if (!steps[state.currentPage][state.currentStep].func) {
                  if (steps[state.currentPage].length > state.currentStep + 1) {
                    setState((s) => ({ ...s, currentStep: s.currentStep + 1 }));
                    props.onChange({ reason: "continue", state });
                  } else {
                    handleClose();
                  }
                } else {
                  steps[state.currentPage][state.currentStep].func.action1();
                }
              }}
              color="primary"
              variant="contained"
            >
              {steps[state.currentPage][state.currentStep].action1}
            </Button>
          )}
          {steps[state.currentPage][state.currentStep].hideAction2 ? null : (
            <Button
              onClick={() => {
                if (!steps[state.currentPage][state.currentStep].func) {
                  handleClose();
                } else {
                  steps[state.currentPage][state.currentStep].func.action2();
                }
              }}
              color="primary"
              autoFocus
            >
              {steps[state.currentPage][state.currentStep].action2}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
