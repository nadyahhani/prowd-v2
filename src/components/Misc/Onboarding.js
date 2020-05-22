import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  makeStyles,
  Box,
  Typography as TypographyMui,
} from "@material-ui/core";
import Help from "./Help";
import theme from "../../theme";
import { NavigateNext } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { DouglasAdamsStructure } from "../../images/export";
import Tour from "reactour";

function Typography(props) {
  return <TypographyMui style={{ textAlign: "justify" }} {...props} />;
}
export default function Onboarding(props) {
  const history = useHistory();
  const { step, page, running, dashclass, hash, filters } = props;
  const [state, setState] = React.useState({
    currentPage: "profile",
    currentStep: 0,
    running: false,
    hash: "",
    class: "",
    filters: [],
  });

  const repeatingSteps = {
    wikidata: {
      title: "So, how exactly does Wikidata store information?",
      style: { maxWidth: "fit-content" },
      content: (
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
                <a
                  style={{ textDecoration: "none" }}
                  href="https://www.wikidata.org/wiki/Special:MyLanguage/Help:Statements"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Statements
                </a>
                , a Statement consists of a{" "}
                <a
                  style={{ textDecoration: "none" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.wikidata.org/wiki/Special:MyLanguage/Help:Properties"
                >
                  Property
                </a>{" "}
                and a{" "}
                <a
                  style={{ textDecoration: "none" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.wikidata.org/wiki/Special:MyLanguage/Help:Statements#Values"
                >
                  Value
                </a>
                .
              </Box>{" "}
            </Typography>
            <Typography
              component="div"
              style={{ marginBottom: theme.spacing(1) }}
            >
              In the illustration on the right, the item{" "}
              <a
                style={{ textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.wikidata.org/wiki/Q62"
              >
                Douglas Adams (Q62)
              </a>{" "}
              has a statement about its{" "}
              <a
                style={{ textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.wikidata.org/wiki/Property:P6"
              >
                educated at (P69)
              </a>{" "}
              property with{" "}
              <a
                style={{ textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.wikidata.org/wiki/Q461391"
              >
                St. John's College (Q691283)
              </a>{" "}
              as the value.
            </Typography>
            <Typography style={{ marginBottom: theme.spacing(1) }}>
              The amount of information the items of a particular topic has can
              show just how well that topic is represented. Which you can
              explore in this dashboard.
            </Typography>
            <Button
              color="primary"
              endIcon={<NavigateNext />}
              target="_blank"
              href={"https://www.wikidata.org/wiki/Wikidata:Introduction"}
            >
              Read more about Wikidata
            </Button>
          </div>
          <div style={{ width: "50%" }}>
            <img
              style={{ width: "100%" }}
              src={`https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Datamodel_in_Wikidata.svg/1200px-Datamodel_in_Wikidata.svg.png`}
              alt="wikidata item illustration"
            />
          </div>
        </div>
      ),
    },
    prowd: (show = false) => {
      return {
        title: "How ProWD Visualize Knowledge",
        text: "",
        action1: "Next",
        action2: "Stop",
        enableBackground: true,
        style: { maxWidth: "fit-content" },
        content: (
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
              <Typography component="div" gutterBottom>
                On the right, you can see that Douglas Adams is an instance of
                Human (Q5), which means that{" "}
                <a href="https://www.wikidata.org/wiki/Q42">
                  Douglas Adams (Q42)
                </a>{" "}
                is a member of the{" "}
                <a href="https://www.wikidata.org/wiki/Q5">Human (Q5)</a> class.
                You can also see that Douglas Adams has two statements about his{" "}
                <a href="https://www.wikidata.org/wiki/P106">occupation</a>{" "}
                property, he is a{" "}
                <a href="https://www.wikidata.org/wiki/Q36180">writer</a> and
                also, a{" "}
                <a href="https://www.wikidata.org/wiki/Q245068">comedian</a>.
              </Typography>
              {show ? (
                <Typography style={{ marginBottom: theme.spacing(1) }}>
                  <b>
                    There are many other writer-comedians human items out there,
                    how can we see how well each and everyone of them is
                    represented in Wikidata?
                  </b>
                </Typography>
              ) : null}
            </div>
            <div
              style={{ width: "50%", display: "flex", alignItems: "center" }}
            >
              <DouglasAdamsStructure style={{ width: "100%" }} />
            </div>
          </div>
        ),
      };
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
      // style: {
      //   left: theme.spacing(-20),
      //   top: theme.spacing(30),
      //   width: theme.spacing(40),
      // },
    },
    searchWiki: {
      title: "",
      selector: "#search-wikidata-navbar",
      position: "bottom",
      content: (
        <Typography component="div">
          {`You can look up the statements of an item by using the searchbar above.`}
        </Typography>
      ),
      action1: "Next",
      action2: "Stop",
      enableBackground: false,
      // style: {
      //   top: theme.spacing(-34),
      //   left: theme.spacing(65),
      //   width: theme.spacing(36),
      // },
    },
    infoIntro: {
      title: "",
      text: (
        <Typography component="div">
          These information can give you insights on the filtered {state.class}{" "}
          class condition.
          <b>
            Hover over <Help text="Hello!" /> to learn about each piece of
            information
          </b>
        </Typography>
      ),
      action1: "Next",
      action2: "Stop",
      enableBackground: false,
    },
  };
  const steps = {
    example: [
      {
        content: ({ goTo, inDOM }) => (
          <div>
            <Typography>Are you familiar with Wikidata?</Typography>
            <div>
              <Button onClick={() => goTo(2)}>Not really</Button>
              <Button onClick={() => goTo(3)}>Yes</Button>
            </div>
          </div>
        ),
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
      repeatingSteps.prowd(true),
      {
        title:
          "Creating a dashboard will show you all about writer-comedian human items",
        content: (
          <Typography>
            This dashboard is configured with{" "}
            <a href="https://www.wikidata.org/wiki/Q5">Human (Q5)</a> as its
            class, and filters applied to specify the humans to those who has
            occupations as a writer and also a comedian
          </Typography>
        ),
        selector: "#global-dashboard-data",
        enableBackground: false,
        style: {},
      },
      {
        title: "",
        selector: "#profile-item-table",
        content: (
          <Typography component="div">
            {`These items are those writer-comedian humans. There's Douglas Adams right over there!`}
          </Typography>
        ),
      },
      repeatingSteps.searchWiki,
      {
        title: "",
        selector: "#profile-info-block",
        content: (
          <Typography component="div">
            These information can give you insights on the writer-comedian
            humans.{" "}
            <b>
              Hover over <Help text="Hello!" /> to learn about each piece of
              information
            </b>
          </Typography>
        ),
      },
      {
        content: (
          <Typography component="div">
            <b>Compare two subclasses of the writer-comedian human topic.</b>{" "}
            Right here, you can see the difference between writer-comedian human
            items from Germany and from the United States of America
          </Typography>
        ),
        redirect: `/dashboards/${state.hash}/profile/onboarding-example`,
      },
      {
        content: (
          <React.Fragment>
            <Typography component="div" gutterBottom>
              <b>Want to discover more about writer-comedians?</b> This example
              shows you all the values of educated at for the writer-comedian
              human items.
            </Typography>
            <Typography>
              From the information here, you can see where most of them were
              educated at and many more.
            </Typography>
          </React.Fragment>
        ),
        redirect: `/dashboards/${state.hash}/analysis/onboarding-example`,
      },
      {
        title: "Now it's time to create your own Dashboard!",
        content: (
          <React.Fragment>
            <Typography variant="h2">
              Now it's time to create your own Dashboard!
            </Typography>
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
          </React.Fragment>
        ),
        action1: "Finish",
        action2: "Stop",
        hideAction1: true,
        hideAction2: true,
        enableBackground: true,
        // style: {},
      },
    ],
    profile: [
      {
        title: "Welcome to your new Dashboard! Would you like a tour?",
        text: "You can always get a tour later from the dashboard settings.",
        action1: "Sure",
        action2: "Later",
        enableBackground: true,
        // style: {},
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
        // style: {},
      },
      repeatingSteps.wikidata,
      repeatingSteps.prowd(),
      repeatingSteps.tableIntro,
      repeatingSteps.searchWiki,
      repeatingSteps.infoIntro,
      {
        title: "",
        text: (
          <Typography component="div">
            <b>
              Compare two subclasses of the {state.filters} {state.class} topic.
            </b>{" "}
            Right here, you can see the difference between a subclass A and B of{" "}
            {state.filters} {state.class} items from based on the property and
            value of subclass A and B, which you can input right here.
          </Typography>
        ),
        action1: "Next",
        action2: "Stop",
        redirect: `/dashboards/${state.hash}/compare/onboarding-profile`,
      },
      {
        title: "",
        text: (
          <React.Fragment>
            <Typography component="div" gutterBottom>
              <b>
                Want to discover more about {state.filters} {state.class} items?
              </b>{" "}
              Select properties you want to explore right here, you can select
              up to 3 properties.
            </Typography>
            <Typography>
              This page will then generate all the possible values of the chosen
              properties.
            </Typography>
          </React.Fragment>
        ),
        action1: "Next",
        action2: "Stop",
        redirect: `/dashboards/${state.hash}/analysis/onboarding-profile`,
        func: {
          action1: () => {
            history.push(
              `/dashboards/${state.hash}/profile/onboarding-profile`
            );
            setState((s) => ({ ...s, currentStep: s.currentStep + 1 }));
            props.onChange({ reason: "continue", state });
          },
          action2: () => {
            handleClose();
          },
        },
        enableBackground: false,
      },
      {
        title: "Now have fun exploring!",
        text: `Want to compare groups of items? Or discover dominant groups of items of the filtered ${state.class}? Check out these features.`,
        action1: "Finish",
        action2: "Stop",
        hideAction2: true,
        enableBackground: false,
      },
    ],
  };
  const useStyles = makeStyles(() => ({
    dialogRoot: {
      ...steps[state.currentPage][state.currentStep].style,
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
    switch (state.currentPage) {
      case "profile":
        props.onChange({ reason: "stop", state });
        return;
      default:
        history.push("/#home");
        return;
    }
  };
  const current = steps[state.currentPage];

  return (
    <Tour
      steps={current}
      isOpen={state.running}
      onRequestClose={handleClose}
      {...props}
    />
  );
}

