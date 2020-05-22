import React from "react";
import Tour from "reactour";
import { useHistory } from "react-router-dom";
import { Typography, Box, Button } from "@material-ui/core";
import { DouglasAdamsStructure } from "../../images/export";
import theme from "../../theme";
import { NavigateNext } from "@material-ui/icons";

export default function OnboardingTour(props) {
  const history = useHistory();
  const [state, setState] = React.useState({ isopen: false });

  const handleClose = () => {
    setState((s) => ({ ...s, isopen: false }));
    props.onChange("close");
  };

  React.useEffect(() => {
    setState((s) => ({ ...s, isopen: props.open }));
  }, [props.open]);

  const steps = [
    {
      content: ({ goTo, inDOM }) => (
        <div>
          <Typography variant="h2" gutterBottom>
            <Box fontWeight="bold">Welcome to ProWD!</Box>
          </Typography>
          <Typography gutterBottom>
            Would you like to learn about Wikidata?
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
              yes please
            </Button>
            <Button size="small" onClick={() => goTo(2)} color="primary">
              no thanks
            </Button>
          </div>
        </div>
      ),
    },
    {
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
            <Typography variant="h2" component="div" gutterBottom>
              <Box fontWeight="bold">
                So, how exactly does Wikidata store information?
              </Box>
            </Typography>
            <Typography
              component="div"
              style={{ margin: `${theme.spacing(1)} 0` }}
              align="justify"
            >
              <Box fontWeight="bold">
                Each and every item in Wikidata is linked to information about
                them in the form of{" "}
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
              style={{ marginBottom: theme.spacing(1), textAlign: "justify" }}
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
                href="https://www.wikidata.org/wiki/Property:P69"
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
              explore by creating a dashboard.
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
    {
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
            <Typography variant="h2" component="div" gutterBottom>
              <Box fontWeight="bold">How ProWD Visualize Knowledge </Box>
            </Typography>
            <Typography component="div" gutterBottom align="justify">
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
            <Typography
              style={{ marginBottom: theme.spacing(1), textAlign: "justify" }}
            >
              <b>
                To see how well writer-comedian human items are represented in
                Wikidata, we could analyze the Human (Q5) class, with two
                filters: (occupation: comedian) and (occupation: writer).
              </b>
            </Typography>
          </div>
          <div style={{ width: "50%", display: "flex", alignItems: "center" }}>
            <DouglasAdamsStructure style={{ width: "100%" }} />
          </div>
        </div>
      ),
    },
    {
      selector: "#input-box",
      content: (
        <div>
          <Typography gutterBottom align="justify">
            So, you are interested in a topic? Search for an item that best
            represent your topic to start configuring the Class and Filters of
            your topic.
          </Typography>
          <Typography gutterBottom align="justify">
            <Box fontWeight="bold">
              Hover over the examples to see a good object representation about
              a topic.
            </Box>
          </Typography>
        </div>
      ),
    },
    {
      selector: "#create-dashboard-tab",
      content: (
        <div>
          <Typography gutterBottom align="justify">
            If you already know the Class and Filters for your topic, you can go
            ahead and click here to input them and start creating your
            dashboard.
          </Typography>
        </div>
      ),
    },
    {
      selector: "#dashboards-nav-button",
      content: ({ goTo, inDOM }) => (
        <div>
          <Typography>
            Check out dashboards previously created by clicking here.
          </Typography>
          {inDOM}
        </div>
      ),
    },
    {
      content: ({ goTo, inDOM }) => (
        <div>
          <Typography variant="h2">
            <b>That's it!</b> Have fun exploring!
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
              variant="contained"
              size="small"
              color="primary"
              onClick={handleClose}
            >
              Finish
            </Button>
          </div>
          {inDOM}
        </div>
      ),
    },
  ];
  return (
    <Tour
      steps={steps}
      goToStep={0}
      isOpen={state.isopen}
      onRequestClose={handleClose}
      onAfterOpen={(target) => (document.body.style.overflow = "hidden")}
      onBeforeClose={(target) => (document.body.style.overflowY = "scroll")}
      // { ...props}
    />
  );
}
