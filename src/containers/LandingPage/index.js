import React from "react";
import theme from "../../theme";
import { useHistory } from "react-router-dom";
import {
  Box,
  Typography,
  ThemeProvider,
  makeStyles,
  Paper,
  Grid,
  Button,
  Chip,
} from "@material-ui/core";
import tempData from "./tempData";
import Navbar from "../../components/Navigation/Navbar";
import VirtualAutocomp from "../../components/Inputs/VirtualAutocomp";
import FilterBox from "../../components/Inputs/FilterBox";
import { getClasses } from "../../services/general";
import { createDashboard } from "../../services/dashboard";
import { cut, getUnique } from "../../global";
import {
  LandingTopIcon,
  FoldersIcon,
  AnalysisIcon,
  MindMapIcon,
  UnibzLogo,
  MpiiLogo,
  UILogo,
} from "../../images/export";
import { NavigateNext, ExpandMore } from "@material-ui/icons";
import Help from "../../components/Misc/Help";

const useStyles = makeStyles(() => ({
  centerContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainLanding: {
    marginTop: "8vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.main,
  },
  mainDiv: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    "& > div": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  inputBox: {
    minWidth: theme.spacing(70),
    width: "90%",
    maxWidth: theme.spacing(100),
    height: theme.spacing(30),
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
    width: "100%",
  },
  inputs: {
    width: "100%",
    height: "100%",
  },
  inputInput: {
    width: "85%",
  },
  filters: {
    width: "97%",
  },
  tagline: {
    fontSize: 90,
    fontWeight: "bold",
    lineHeight: "112.7%",
    zIndex: 1,
  },
  landingRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "85vh",
  },
  mainDivLeft: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  subText: {
    zIndex: 1,
    width: "50%",
    marginBottom: theme.spacing(2),
  },
  subTextDesc: {
    zIndex: 1,
    width: "70%",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  exampleCarousel: {
    width: "90%",
    flexWrap: "nowrap",
    minWidth: theme.spacing(70),
    maxWidth: theme.spacing(100),
    margin: `4px 0 !important`,
    overflowX: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  textAccent: {
    position: "absolute",
    marginTop: `-${theme.spacing(2)}px`,
    width: theme.spacing(50),
    height: theme.spacing(3),
    zIndex: -1,
    backgroundColor: theme.palette.common.white,
  },
  searchBox: {
    minWidth: theme.spacing(70),
    width: "90%",
    maxWidth: theme.spacing(100),
    height: "fit-content",
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  footerLogo: {
    width: theme.spacing(20),
  },
}));

function Landing(props) {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    classes: [],
    classInput: "",
    selectedClass: null,
    searchInput: "",
    selectedSearch: null,
    propertiesOptions: [],
    classOfSearch: null,
    filtersOfSearch: [],
    selectedProps: "",
    appliedFilters: [],
    searchisloading: false,
    popper: {
      open: false,
      anchorEl: null,
    },
  });

  React.useEffect(() => {
    console.log("jalan");

    getClasses("", (response) => {
      setState((s) => ({ ...s, classes: response.entities }));
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.mainLanding} id="home">
        <LandingTopIcon style={{ position: "absolute", width: "100%" }} />
        <Navbar />
        <div
          style={{
            width: "85%",
            maxWidth: theme.spacing(162),
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
          }}
        >
          <div className={classes.landingRow}>
            <div className={classes.mainDivLeft}>
              <Typography
                className={classes.tagline}
                style={{
                  marginBottom: theme.spacing(2),
                }}
              >
                Visualize Knowledge
              </Typography>
              <Typography
                variant="h2"
                className={classes.subText}
                component="div"
              >
                See how well certain topics are represented in{" "}
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.wikidata.org/wiki/Wikidata:Main_Page"
                  style={{ textDecoration: "none" }}
                >
                  Wikidata
                </a>
              </Typography>
              <Button
                style={{
                  marginBottom: theme.spacing(2),
                }}
                color="primary"
                endIcon={<NavigateNext />}
                onClick={() =>
                  history.push(
                    "/dashboards/8ce49fd3001b/profile/onboarding-example"
                  )
                }
              >
                Show me
              </Button>
            </div>
            <div className={classes.mainDiv}>
              <Typography
                style={{ width: "90%", marginRight: theme.spacing(2) }}
              >
                Examples:{" "}
              </Typography>
              {/* <GridList
                spacing={2}
                cols={4}
                cellHeight="auto"
                className={classes.exampleCarousel}
              > */}
              <Grid container spacing={1} className={classes.exampleCarousel}>
                {[...tempData.ex, ...tempData.ex].map((x, idx) => (
                  // <GridListTile key={idx}>
                  <Grid item key={idx}>
                    <Chip
                      size="small"
                      variant="outlined"
                      clickable
                      style={{ width: "98%" }}
                      color="primary"
                      onClick={() => {
                        setState((s) => ({
                          ...s,
                          selectedClass: x.class,
                          classInput: `${x.class.label} (${x.class.id})`,
                          appliedFilters: x.filters,
                        }));
                      }}
                      label={<Typography variant="body1">{x.label}</Typography>}
                    />
                  </Grid>
                  // </GridListTile>
                ))}
              </Grid>
              {/* </GridList> */}
              <Paper className={classes.inputBox} elevation={1}>
                <Grid
                  container
                  justify="center"
                  spacing={2}
                  direction="column"
                  className={classes.inputInput}
                >
                  <Grid
                    item
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ width: "94%" }}>
                      <VirtualAutocomp
                        label="Class"
                        placeholder="e.g. Human, Disease, Country"
                        options={state.classes}
                        loading={state.classes.length === 0}
                        inputValue={state.classInput}
                        value={state.selectedClass}
                        onInputChange={(e) => {
                          // console.log(e);
                          if (e) {
                            const tempval = e.target.value;
                            setState((s) => ({
                              ...s,
                              classInput: tempval,
                              // classes: [],
                            }));

                            getClasses(e.target.value, (response) => {
                              response.success &&
                                setState((s) => ({
                                  ...s,
                                  classes: getUnique(
                                    [...s.classes, ...response.entities],
                                    "id"
                                  ),
                                }));
                            });
                          }
                        }}
                        onChange={(event, newValue, reason) => {
                          if (newValue) {
                            setState((s) => ({
                              ...s,
                              selectedClass: newValue,
                              classInput: `${newValue.label} (${newValue.id})`,
                            }));
                          }
                          if (reason === "clear") {
                            setState((s) => ({
                              ...s,
                              selectedClass: null,
                              classInput: "",
                            }));
                          }
                        }}
                        onClose={(event, reason) => {
                          console.log(reason, state.selectedClass);

                          if (
                            reason !== "select-option" &&
                            !state.selectedClass
                          ) {
                            setState((s) => ({
                              ...s,
                              classInput: "",
                              selectedClass: null,
                            }));
                          }
                        }}
                        getOptionLabel={(option) => {
                          return `${option.label} (${option.id})${
                            option.aliases
                              ? ` also known as ${option.aliases.join(", ")}`
                              : ""
                          }`;
                        }}
                        renderOption={(option) => (
                          <div>
                            <Typography
                              noWrap
                            >{`${option.label} (${option.id})`}</Typography>
                            <Typography
                              variant="caption"
                              style={{ lineHeight: "1.3vmin" }}
                            >
                              {cut(option.description, 500)}
                            </Typography>
                          </div>
                        )}
                      />
                    </div>
                    <Help
                      text={
                        <Typography component="div">
                          Click on the examples above to get a hint.{" "}
                          <Box fontWeight="bold">
                            Use 'Search for Wikidata Item' on the navbar to find
                            the class and filters of a specific object.
                          </Box>
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item>
                    <FilterBox
                      class={state.selectedClass}
                      classes={{ root: classes.filters }}
                      options={state.appliedFilters}
                      propertiesOptions={state.propertiesOptions}
                      selectedClass={state.selectedClass}
                      // disabled={!state.selectedClass}

                      onApply={(applied) =>
                        setState((s) => ({ ...s, appliedFilters: applied }))
                      }
                      renderTagText={(opt) =>
                        cut(`${opt.property.label}: ${opt.value.label}`, 1000)
                      }
                      onDelete={(idx) => {
                        const temp = [...state.appliedFilters];
                        temp.splice(idx, 1);
                        setState((s) => ({ ...s, appliedFilters: temp }));
                      }}
                      onClear={() =>
                        setState((s) => ({ ...s, appliedFilters: [] }))
                      }
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div
                        style={{ width: "42%", marginRight: theme.spacing(1) }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          disableElevation
                          fullWidth
                          disabled={state.selectedClass === null}
                          onClick={() => {
                            createDashboard(
                              state.selectedClass.id,
                              state.appliedFilters.map((x) => {
                                let temp = {};
                                temp[x.property.id] = x.value.id;
                                return temp;
                              }),
                              (response) =>
                                history.push(
                                  `/dashboards/${response.hashCode}/profile/onboarding-profile`
                                )
                            );
                          }}
                        >
                          CREATE DASHBOARD
                        </Button>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </div>
          <div className={classes.landingRow}>
            <div
              style={{
                position: "absolute",
                width: theme.spacing(20),
                marginLeft: `-${theme.spacing(10)}px`,
                left: "50%",
                bottom: "5%",
              }}
            >
              <Button
                color="primary"
                fullWidth
                endIcon={<ExpandMore />}
                id="about"
                onClick={() => {
                  history.push("/");
                  window.location.hash = "about";
                }}
              >
                Learn More
              </Button>
            </div>
            <div className={classes.mainDivLeft}>
              <Typography variant="h2" component="div">
                <Box fontSize={40} fontWeight="bold">
                  Explore
                  <div className={classes.textAccent} />
                </Box>

                <Box className={classes.subTextDesc}>
                  Find dominant topics and existing imbalance in general
                  knowledge on Wikidata with ProWD
                </Box>
              </Typography>
            </div>
            <div className={classes.mainDiv}>
              <MindMapIcon />
            </div>
          </div>
          <div className={classes.landingRow}>
            <div className={classes.mainDivLeft}>
              <AnalysisIcon />
            </div>
            <div className={classes.mainDiv}>
              <div style={{ width: "70%" }}>
                <Typography variant="h2" component="div">
                  <Box fontSize={40} fontWeight="bold">
                    About Wikidata
                    <div className={classes.textAccent} />
                  </Box>
                  <Box
                    className={classes.subTextDesc}
                    style={{ width: "100%" }}
                  >
                    Wikidata is a crowdsourced knowledge base platform under the{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://wikimediafoundation.org/"
                      style={{ textDecoration: "none" }}
                    >
                      Wikimedia Foundation
                    </a>
                  </Box>
                </Typography>
              </div>
            </div>
          </div>
          <div className={classes.landingRow}>
            <div className={classes.mainDivLeft}>
              <Typography variant="h2" component="div">
                <Box fontSize={40} fontWeight="bold">
                  Analytics
                  <div className={classes.textAccent} />
                </Box>

                <Box className={classes.subTextDesc}>
                  Using SPARQL query, data is processed and calculated to help
                  you form insights
                </Box>
              </Typography>
            </div>
            <div className={classes.mainDiv}>
              <FoldersIcon />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          height: "fit-content",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          // width: "100vw",
          backgroundColor: theme.palette.common.white,
        }}
      >
        <div
          style={{
            height: "fit-content",
            display: "flex",
            padding: `${theme.spacing(2)}px 0`,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80%",
            maxWidth: "1225px",
            backgroundColor: theme.palette.common.white,
          }}
        >
          <Grid
            container
            spacing={1}
            justify="center"
            alignItems="center"
            direction="row"
            style={{ width: "50%" }}
          >
            <Grid item xs={6}>
              <UILogo className={classes.footerLogo} />
            </Grid>
            <Grid item xs={6}>
              <UnibzLogo className={classes.footerLogo} />
            </Grid>
            <Grid item xs={6}>
              <MpiiLogo className={classes.footerLogo} />
            </Grid>
            <Grid item xs={6}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/66/Wikidata-logo-en.svg"
                alt="wikidata-logo"
                className={classes.footerLogo}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Button size="small">Dashboard example</Button>
            </Grid>
          </Grid>
        </div>
        <Typography style={{ width: "100%", textAlign: "center" }}>
          2020 - Free University of Bozen-Bolzano, Universitas Indonesia and
          Max-Planck Institute for Informatics.
        </Typography>
      </div>
    </ThemeProvider>
  );
}

export default Landing;
