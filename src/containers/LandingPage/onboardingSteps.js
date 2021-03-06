import { Typography, Box, Button } from "@material-ui/core";
import ReactImageMagnify from "react-image-magnify";
import { DouglasAdamsStructure } from "../../images/export";
import React from "react";
import theme from "../../theme";
import { NavigateNext } from "@material-ui/icons";

export const steps = [
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
          <Typography component="div" gutterBottom>
            <Box fontWeight="bold">
              The Wikidata repository consists mainly of{" "}
              <a
                style={{ textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.wikidata.org/wiki/Help:Items"
              >
                items
              </a>
              .
            </Box>
          </Typography>
          <Typography
            component="div"
            style={{ margin: `${theme.spacing(1)} 0` }}
            align="justify"
          >
            <Box fontWeight="bold">
              On the right is an example of an{" "}
              <a
                style={{ textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.wikidata.org/wiki/Help:Items"
              >
                Item
              </a>{" "}
              labeled{" "}
              <a
                style={{ textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.wikidata.org/wiki/Q62"
              >
                Douglas Adams (Q42)
              </a>{" "}
              which has information about it in the form of{" "}
              <a
                style={{ textDecoration: "none" }}
                href="https://www.wikidata.org/wiki/Special:MyLanguage/Help:Statements"
                target="_blank"
                rel="noopener noreferrer"
              >
                Statements
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
              Douglas Adams (Q42)
            </a>{" "}
            has a{" "}
            <a
              style={{ textDecoration: "none" }}
              href="https://www.wikidata.org/wiki/Special:MyLanguage/Help:Statements"
              target="_blank"
              rel="noopener noreferrer"
            >
              statement
            </a>{" "}
            about its{" "}
            <a
              style={{ textDecoration: "none" }}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.wikidata.org/wiki/Property:P69"
            >
              educated at (P69)
            </a>{" "}
            <a
              style={{ textDecoration: "none" }}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.wikidata.org/wiki/Special:MyLanguage/Help:Properties"
            >
              property
            </a>{" "}
            with{" "}
            <a
              style={{ textDecoration: "none" }}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.wikidata.org/wiki/Q461391"
            >
              St. John's College (Q691283)
            </a>{" "}
            as the{" "}
            <a
              style={{ textDecoration: "none" }}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.wikidata.org/wiki/Special:MyLanguage/Help:Statements#Values"
            >
              value
            </a>
            .
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
          <ReactImageMagnify
            style={{ width: "100%" }}
            enlargedImagePosition="over"
            enlargedImageStyle={{
              backgroundColor: theme.palette.common.white,
            }}
            smallImage={{
              alt: 'wikidata item illustration"',
              isFluidWidth: true,
              src:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Datamodel_in_Wikidata.svg/1200px-Datamodel_in_Wikidata.svg.png",
            }}
            largeImage={{
              width: 1063,
              height: 764,
              src:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Datamodel_in_Wikidata.svg/1200px-Datamodel_in_Wikidata.svg.png",
            }}
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
            Douglas Adams has other statements about itself on Wikidata. On the
            right, you can see that Douglas Adams is an instance of Human (Q5),
            which means that{" "}
            <a href="https://www.wikidata.org/wiki/Q42">Douglas Adams (Q42)</a>{" "}
            is a member of the{" "}
            <a href="https://www.wikidata.org/wiki/Q5">Human (Q5)</a> class. You
            can also see that Douglas Adams has two statements about his{" "}
            <a href="https://www.wikidata.org/wiki/P106">occupation</a>{" "}
            property, he is a{" "}
            <a href="https://www.wikidata.org/wiki/Q36180">writer</a> and also,
            a <a href="https://www.wikidata.org/wiki/Q245068">comedian</a>.
          </Typography>
          <Typography
            style={{ marginBottom: theme.spacing(1), textAlign: "justify" }}
          >
            <b>
              To see how well writer-comedian human items are represented in
              Wikidata, we could analyze the Human (Q5) class, with two filters:
              (occupation: comedian) and (occupation: writer).
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
          So, you are interested in a topic? Select the class and filters for
          your topic of interest.
        </Typography>
        <Typography gutterBottom align="justify">
          <Box fontWeight="bold">
            Click on the examples on the bottom for an input example.
          </Box>
        </Typography>
      </div>
    ),
  },
  {
    selector: "#topic-item-tab",
    content: (
      <div>
        <Typography gutterBottom align="justify">
          If you don't know the class and filters for your topic, you can find
          them by using the feature in this tab.
        </Typography>
      </div>
    ),
  },
  {
    selector: "#dashboards-nav-button",
    content: ({ goTo, inDOM }) => (
      <div>
        <Typography>
          Want some inspiration? You can check out dashboards previously created
          by clicking here.
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
        {inDOM}
      </div>
    ),
  },
];
